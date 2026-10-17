// Re-applies the migration's page definitions and event data to an existing
// site through the EmDash API, without re-importing everything (so edits
// made in the admin to other content are kept, and media isn't duplicated).
//
//   npm run dev   (in another terminal)
//   node scripts/wordpress/update-content.mjs [cacheDir] [page-slug…]
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { convertHtml, decodeEntities } from "./convert.mjs";
import { MediaLibrary, imageValue, mediaUrl } from "./media.mjs";

const [cacheDir = ".cache/wordpress", ...onlyPages] = process.argv.slice(2);
const baseUrl = process.env.EMDASH_URL ?? "http://localhost:4321";
const media = new MediaLibrary({ baseUrl, cacheDir });
await media.login();

async function api(method, path, body) {
	const res = await fetch(`${baseUrl}/_emdash/api${path}`, {
		method,
		headers: { Cookie: media.cookie, "X-EmDash-Request": "1", "Content-Type": "application/json" },
		body: body ? JSON.stringify(body) : undefined,
	});
	const json = await res.json().catch(() => ({}));
	if (!res.ok || json.success === false) throw new Error(`${method} ${path}: ${res.status} ${JSON.stringify(json).slice(0, 300)}`);
	return json.data;
}

async function entriesBySlug(collection) {
	const map = new Map();
	for (let page = 1; ; page++) {
		const data = await api("GET", `/content/${collection}?limit=100&page=${page}`);
		for (const item of data.items) map.set(item.slug, item);
		if (data.items.length < 100) break;
	}
	return map;
}

async function update(collection, entry, data) {
	await api("PUT", `/content/${collection}/${entry.id}`, { data });
	await api("POST", `/content/${collection}/${entry.id}/publish`);
}

// ---------------------------------------------------------------- pages
const helpers = {
	image: async (url, alt) => (url ? imageValue(await media.add(url, alt), alt) : undefined),
	file: async (url) => {
		const item = await media.add(url);
		return item ? mediaUrl(item) : url;
	},
	richText: (html) => convertHtml(html, media),
};
const pages = await entriesBySlug("pages");
const dir = new URL("./pages/", import.meta.url);
let key = 0;
for (const slug of onlyPages.length ? onlyPages : [...pages.keys()]) {
	const entry = pages.get(slug);
	if (!entry) {
		console.warn(`no page "${slug}"`);
		continue;
	}
	const { default: define } = await import(new URL(`${slug}.mjs`, dir)).catch(() => ({}));
	if (!define) continue;
	const page = await define(helpers);
	const content = page.blocks
		.filter(Boolean)
		.map((block) => ({ _version: 1, _key: `u${Date.now().toString(36)}${(key++).toString(36)}`, ...block }));
	await update("pages", entry, { title: page.title, content });
	console.log(`page: ${slug}`);
}

if (onlyPages.length === 0) {
	// ------------------------------------------------------------ events
	// Dates as local wall-clock time at the event (the first import used UTC,
	// which moved all-day events by a day).
	const wpEvents = JSON.parse(await readFile(join(cacheDir, "events.json"), "utf8"));
	const events = await entriesBySlug("events");
	for (const event of wpEvents) {
		const entry = events.get(event.slug);
		if (!entry) continue;
		await update("events", entry, {
			starts: `${event.start_date.replace(" ", "T")}Z`,
			ends: event.end_date ? `${event.end_date.replace(" ", "T")}Z` : undefined,
			organizer: event.organizer?.[0]?.organizer ? decodeEntities(event.organizer[0].organizer) : undefined,
			organizer_url: event.organizer?.[0]?.website || undefined,
		});
	}
	console.log(`events: ${wpEvents.length}`);

	// ------------------------------------------------------------ pinned post
	const wpPosts = JSON.parse(await readFile(join(cacheDir, "posts.json"), "utf8"));
	const posts = await entriesBySlug("posts");
	for (const post of wpPosts.filter((p) => p.sticky)) {
		const entry = posts.get(post.slug);
		if (entry) await update("posts", entry, { featured: true });
		console.log(`featured: ${post.slug}`);
	}
}
