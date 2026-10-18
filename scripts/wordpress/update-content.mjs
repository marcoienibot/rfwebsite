// Re-applies parts of the migration to an existing site through the EmDash
// API, without re-importing everything (so edits made in the admin to other
// content are kept, and media isn't duplicated).
//
//   npm run dev   (in another terminal)
//   node scripts/wordpress/update-content.mjs [cacheDir] [page-slug…]
//       page definitions (all pages, event data and the pinned post if no slug is given)
//   node scripts/wordpress/update-content.mjs [cacheDir] --posts post-or-policy-slug…
//       converts these posts and policies again (replaces their content: only
//       name posts nobody has edited in the admin)
//   node scripts/wordpress/update-content.mjs [cacheDir] --people
//       biographies with their links, profile links, and the people and
//       organisations shown with other details on another page
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { convertHtml, decodeEntities, uniqueSlug } from "./convert.mjs";
import { loadLinks } from "./links.mjs";
import { MediaLibrary, imageValue, mediaUrl } from "./media.mjs";
import { scrapeOrganizations, scrapePeople } from "./scrape.mjs";

const [cacheDir = ".cache/wordpress", ...args] = process.argv.slice(2);
const mode = args[0]?.startsWith("--") ? args.shift() : "--pages";
const baseUrl = process.env.EMDASH_URL ?? "http://localhost:4321";
const media = new MediaLibrary({ baseUrl, cacheDir });
await media.login();
await loadLinks(cacheDir);

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

const loadJson = async (name) => JSON.parse(await readFile(join(cacheDir, `${name}.json`), "utf8"));

async function updatePages(onlyPages) {
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
	if (onlyPages.length > 0) return;

	// Dates as local wall-clock time at the event (the first import used UTC,
	// which moved all-day events by a day).
	const wpEvents = await loadJson("events");
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

	// The pinned post.
	const posts = await entriesBySlug("posts");
	for (const post of (await loadJson("posts")).filter((p) => p.sticky)) {
		const entry = posts.get(post.slug);
		if (entry) await update("posts", entry, { featured: true });
		console.log(`featured: ${post.slug}`);
	}
}

async function updatePosts(slugs) {
	if (slugs.length === 0) throw new Error("Name the posts or policies to convert again.");
	for (const [collection, source] of [
		["posts", "posts"],
		["policies", "policy"],
	]) {
		const entries = await entriesBySlug(collection);
		for (const item of await loadJson(source)) {
			const entry = slugs.includes(item.slug) && entries.get(item.slug);
			if (!entry) continue;
			await update(collection, entry, { content: await convertHtml(item.content.rendered, media) });
			console.log(`${collection}: ${item.slug}`);
		}
	}
}

/** Text as an editor sees it: links as their label, any whitespace as one space. */
const plainText = (text) =>
	(text ?? "")
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1")
		.replace(/\s+/g, " ")
		.trim();

async function updateDirectory(collection, scraped, { matchField, data }) {
	const entries = [...(await entriesBySlug(collection)).values()];
	for (const item of scraped) {
		const named = entries.filter((entry) => entry.data.title === item.name);
		const variants = scraped.filter((other) => other.name === item.name);
		const entry =
			variants.length === 1 && named.length === 1
				? named[0]
				: named.find((candidate) => (candidate.data[matchField] ?? "") === (item[matchField] ?? ""));
		if (!entry) {
			// Shown with other details on another page: an entry of its own, which
			// takes over that page's list from the other entries (in the same place).
			await api("POST", `/content/${collection}`, {
				data: { ...(await data(item)), order: named[0]?.data.order ?? item.order },
				slug: uniqueSlug(`${item.name} ${item.groups.join(" ")}`),
			}).then(({ item: created }) => api("POST", `/content/${collection}/${created.id}/publish`));
			for (const other of named) {
				const groups = other.data.groups.filter((group) => !item.groups.includes(group));
				if (groups.length !== other.data.groups.length) await update(collection, other, { groups });
			}
			console.log(`${collection}: added ${item.name} (${item.groups.join(", ")})`);
			continue;
		}
		const changes = {};
		if (item.bio && item.bio !== entry.data.bio) {
			if (plainText(item.bio) === plainText(entry.data.bio)) changes.bio = item.bio;
			else console.warn(`${collection}: ${entry.slug}: biography edited in the admin, not updated`);
		}
		if (item.links?.length && !entry.data.links) changes.links = item.links.join("\n");
		if (Object.keys(changes).length === 0) continue;
		await update(collection, entry, changes);
		console.log(`${collection}: ${entry.slug} (${Object.keys(changes).join(", ")})`);
	}
}

async function uploadImage(url, alt) {
	return url ? imageValue(await media.add(url, alt), alt) : undefined;
}

async function updatePeople() {
	await updateDirectory("people", await scrapePeople(cacheDir), {
		matchField: "role",
		data: async (person) => ({
			title: person.name,
			role: person.role || undefined,
			groups: person.groups,
			photo: await uploadImage(person.photo, person.name),
			bio: person.bio || undefined,
			links: person.links.join("\n") || undefined,
		}),
	});
	await updateDirectory("organizations", await scrapeOrganizations(cacheDir), {
		matchField: "website",
		data: async (org) => ({
			title: org.name,
			logo: await uploadImage(org.logo, `${org.name} logo`),
			groups: org.groups,
			website: org.website,
			joined: org.joined,
			bio: org.bio || undefined,
		}),
	});
}

if (mode === "--posts") await updatePosts(args);
else if (mode === "--people") await updatePeople();
else if (mode === "--pages") await updatePages(args);
else throw new Error(`Unknown option ${mode}`);
