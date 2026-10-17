// Downloads every public object from the WordPress REST API into a cache
// directory, so the import can be re-run without hitting the live site.
//
//   node scripts/wordpress/fetch.mjs [cacheDir]
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

import * as cheerio from "cheerio";

const SITE = "https://rustfoundation.org";
const cacheDir = process.argv[2] ?? ".cache/wordpress";

const TYPES = [
	"posts",
	"pages",
	"media",
	"categories",
	"tags",
	"users",
	"job",
	"policy",
	"membership",
	"tribe_events",
	"faq_category",
	"resource_category",
];

async function fetchAll(type) {
	const items = [];
	for (let page = 1; ; page++) {
		const url = `${SITE}/wp-json/wp/v2/${type}?per_page=100&page=${page}`;
		const res = await fetch(url, { headers: { "User-Agent": "rfwebsite-migration" } });
		if (res.status === 400 && page > 1) break; // past the last page
		if (!res.ok) {
			console.warn(`  ${type}: HTTP ${res.status}`);
			break;
		}
		const batch = await res.json();
		items.push(...batch);
		const totalPages = Number(res.headers.get("x-wp-totalpages") ?? 1);
		if (page >= totalPages) break;
	}
	return items;
}

await mkdir(cacheDir, { recursive: true });
for (const type of TYPES) {
	const items = await fetchAll(type);
	await writeFile(join(cacheDir, `${type}.json`), JSON.stringify(items, null, 1));
	console.log(`${type}: ${items.length}`);
}

// Press items have no body: WordPress redirects their permalink to the
// external article. Record where each one points.
const posts = JSON.parse(await readFile(join(cacheDir, "posts.json"), "utf8"));
const redirects = {};
for (const post of posts) {
	if (post.content.rendered.trim()) continue;
	const res = await fetch(post.link, { redirect: "manual", headers: { "User-Agent": "rfwebsite-migration" } });
	const location = res.headers.get("location");
	if (location && !location.startsWith(SITE)) redirects[post.id] = location;
}
await writeFile(join(cacheDir, "external-links.json"), JSON.stringify(redirects, null, 1));
console.log(`external links: ${Object.keys(redirects).length}`);

// Page HTML: pages are built with a page builder whose layout isn't in the
// API, so the import reads people, organisations, documents and FAQs from
// the rendered pages.
const pages = JSON.parse(await readFile(join(cacheDir, "pages.json"), "utf8"));
await mkdir(join(cacheDir, "html"), { recursive: true });
async function savePage(url, name) {
	const res = await fetch(url, { headers: { "User-Agent": "rfwebsite-migration" } });
	if (res.ok) await writeFile(join(cacheDir, "html", `${name}.html`), await res.text());
	return res.ok;
}
for (const page of pages) await savePage(page.link, page.slug);
await savePage(`${SITE}/events/`, "events");
console.log(`page html: ${pages.length + 1}`);

// Events live in The Events Calendar's own API (wp/v2 only lists upcoming ones).
const events = [];
for (let page = 1; ; page++) {
	const res = await fetch(`${SITE}/wp-json/tribe/events/v1/events?start_date=2019-01-01&per_page=50&page=${page}`);
	if (!res.ok) break;
	const body = await res.json();
	events.push(...body.events);
	if (page >= body.total_pages) break;
}
await writeFile(join(cacheDir, "events.json"), JSON.stringify(events, null, 1));
console.log(`events: ${events.length}`);

// Documents ("resources"): listed per category; each item redirects to its file.
const resourceCategories = JSON.parse(await readFile(join(cacheDir, "resource_category.json"), "utf8"));
const documents = [];
for (const category of resourceCategories) {
	for (let page = 1; ; page++) {
		const url = `${SITE}/resource_category/${category.slug}/${page > 1 ? `page/${page}/` : ""}`;
		const res = await fetch(url, { headers: { "User-Agent": "rfwebsite-migration" } });
		if (!res.ok) break;
		const html = await res.text();
		const $ = cheerio.load(html);
		const items = $(".cmp-post-cards__item");
		if (items.length === 0) break;
		items.each((_, el) => {
			const item = $(el);
			const title = item.find(".cmp-post-cards__item-name").text().trim();
			const summary = item.find(".cmp-post-cards__item-content").text().trim();
			const link = item.find(".cmp-post-cards__item-btn").attr("href");
			// Skip the pinned "Featured" news post that every archive shows.
			if (title && link?.includes("/resource/") && !documents.some((d) => d.link === link)) {
				documents.push({ title, summary, link, category: category.slug });
			}
		});
		if (!html.includes(`/page/${page + 1}/`)) break;
	}
}
for (const doc of documents) {
	const res = await fetch(doc.link, { redirect: "manual", headers: { "User-Agent": "rfwebsite-migration" } });
	doc.target = res.headers.get("location") ?? doc.link;
}
await writeFile(join(cacheDir, "documents.json"), JSON.stringify(documents, null, 1));
console.log(`documents: ${documents.length}`);

// Many posts still link to the old foundation.rust-lang.org site, which
// redirects to rustfoundation.org. Record where each old link ends up so the
// import can point it at the new page directly.
const policies = JSON.parse(await readFile(join(cacheDir, "policy.json"), "utf8"));
const oldLinks = new Set();
for (const item of [...posts, ...policies]) {
	for (const [, href] of item.content.rendered.matchAll(/href="(https?:\/\/foundation\.rust-lang\.org[^"#]*)/g)) {
		oldLinks.add(href);
	}
}
const resolved = {};
for (const href of oldLinks) {
	try {
		const res = await fetch(href, { headers: { "User-Agent": "rfwebsite-migration" } });
		if (res.ok && res.url.startsWith(SITE)) resolved[href] = res.url;
	} catch {
		// Leave the link as it is.
	}
}
await writeFile(join(cacheDir, "old-links.json"), JSON.stringify(resolved, null, 1));
console.log(`old links resolved: ${Object.keys(resolved).length}/${oldLinks.size}`);
