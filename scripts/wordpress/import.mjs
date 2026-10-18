// One-off migration of rustfoundation.org (WordPress) into EmDash.
//
//   node scripts/wordpress/fetch.mjs .cache/wordpress     # download the WordPress data
//   npm run dev                                           # in another terminal, on an empty content/ dir
//   node scripts/wordpress/import.mjs .cache/wordpress    # build and apply the content seed
//
// Posts and policies are converted from the WordPress API. Pages were built
// with a page builder whose markup doesn't map to anything useful, so they
// are recreated by hand as EmDash blocks in `pages.mjs`.
import { execFileSync } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

import { convertHtml, decodeEntities, stripTags, uniqueSlug } from "./convert.mjs";
import { loadLinks } from "./links.mjs";
import { MediaLibrary, imageValue, mediaUrl } from "./media.mjs";
import { buildPages } from "./pages.mjs";
import { scrapeFaqs, scrapeOrganizations, scrapePeople } from "./scrape.mjs";

const cacheDir = process.argv[2] ?? ".cache/wordpress";
const baseUrl = process.env.EMDASH_URL ?? "http://localhost:4321";
const DATABASE = "content/data.db";

const load = async (name) => JSON.parse(await readFile(join(cacheDir, `${name}.json`), "utf8"));

const [posts, policies, categories, tags, users, wpMedia, externalLinks, wpEvents] = await Promise.all([
	load("posts"),
	load("policy"),
	load("categories"),
	load("tags"),
	load("users"),
	load("media"),
	load("external-links"),
	load("events"),
]);
const wpDocuments = await loadLinks(cacheDir);

const media = new MediaLibrary({ baseUrl, cacheDir });
await media.login();

const mediaById = new Map(wpMedia.map((item) => [item.id, item]));
const categoryById = new Map(categories.map((c) => [c.id, c]));
const tagById = new Map(tags.map((t) => [t.id, t]));

async function featuredImage(wpId) {
	const item = mediaById.get(wpId);
	if (!item) return undefined;
	const alt = decodeEntities(item.alt_text || "");
	return imageValue(await media.add(item.source_url, alt), alt);
}

// ---------------------------------------------------------------- bylines
const authorIds = new Set(posts.map((p) => p.author));
const bylines = [];
for (const user of users) {
	if (!authorIds.has(user.id)) continue;
	// Ask Gravatar for a 404 instead of its default silhouette.
	const avatarUrl = user.avatar_urls?.["96"]?.replace(/\?.*$/, "?s=200&d=404");
	const avatar = avatarUrl ? await media.add(avatarUrl, user.name) : null;
	bylines.push({
		id: `author-${user.id}`,
		slug: user.slug,
		displayName: decodeEntities(user.name),
		bio: stripTags(user.description || "") || undefined,
		...(avatar && {
			avatar: {
				storageKey: avatar.storageKey,
				alt: user.name,
				mimeType: avatar.mimeType,
				width: avatar.width,
				height: avatar.height,
			},
		}),
	});
}

// ---------------------------------------------------------------- posts
const postEntries = [];
for (const [index, post] of posts.entries()) {
	if (index % 25 === 0) console.log(`posts: ${index}/${posts.length}`);
	const categorySlugs = post.categories
		.map((id) => categoryById.get(id)?.slug)
		.filter((slug) => slug && slug !== "uncategorized");
	postEntries.push({
		id: `post-${post.id}`,
		slug: post.slug,
		status: "published",
		data: {
			title: decodeEntities(post.title.rendered),
			excerpt: stripTags(post.excerpt.rendered).replace(/\s*\[…\]$|\s*…\s*Continue reading.*$/, "") || undefined,
			featured_image: post.featured_media ? await featuredImage(post.featured_media) : undefined,
			content: await convertHtml(post.content.rendered, media),
			external_url: externalLinks[post.id] ?? undefined,
		},
		taxonomies: {
			category: categorySlugs.length ? categorySlugs : ["blog"],
			tag: post.tags.map((id) => tagById.get(id)?.slug).filter(Boolean),
		},
		bylines: authorIds.has(post.author) && bylines.some((b) => b.id === `author-${post.author}`)
			? [{ byline: `author-${post.author}` }]
			: [],
	});
}

// ---------------------------------------------------------------- policies
const policyEntries = [];
for (const policy of policies) {
	policyEntries.push({
		id: `policy-${policy.id}`,
		slug: policy.slug,
		status: "published",
		data: {
			title: decodeEntities(policy.title.rendered),
			content: await convertHtml(policy.content.rendered, media),
		},
	});
}

// ---------------------------------------------------------------- people
const people = [];
for (const person of await scrapePeople(cacheDir)) {
	people.push({
		id: `person-${people.length}`,
		slug: uniqueSlug(person.name),
		status: "published",
		data: {
			title: person.name,
			role: person.role || undefined,
			groups: person.groups,
			photo: person.photo ? imageValue(await media.add(person.photo, person.name), person.name) : undefined,
			bio: person.bio || undefined,
			order: person.order,
		},
	});
}

// ---------------------------------------------------------------- organisations
const organizations = [];
for (const org of await scrapeOrganizations(cacheDir)) {
	const logo = org.logo ? imageValue(await media.add(org.logo, `${org.name} logo`), `${org.name} logo`) : undefined;
	if (!logo) continue;
	organizations.push({
		id: `org-${organizations.length}`,
		slug: uniqueSlug(org.name),
		status: "published",
		data: {
			title: org.name,
			logo,
			groups: org.groups,
			website: org.website,
			joined: org.joined,
			bio: org.bio || undefined,
			order: org.order,
		},
	});
}

// ---------------------------------------------------------------- FAQs
const faqs = [];
for (const faq of await scrapeFaqs(cacheDir)) {
	faqs.push({
		id: `faq-${faqs.length}`,
		slug: uniqueSlug(faq.question),
		status: "published",
		data: {
			title: faq.question,
			category: faq.category,
			answer: await convertHtml(faq.answer, media),
			order: faq.order,
		},
	});
}

// ---------------------------------------------------------------- events
const EVENT_CATEGORY = { "hosted-events": "hosted", sponsored: "sponsored", attending: "attending", speaking: "speaking", suggested: "suggested" };
const eventEntries = [];
for (const event of wpEvents) {
	const category = event.categories?.map((c) => EVENT_CATEGORY[c.slug]).find(Boolean);
	const location = [event.venue?.city, event.venue?.country].filter(Boolean).join(", ") || event.venue?.venue;
	eventEntries.push({
		id: `event-${event.id}`,
		slug: event.slug,
		status: "published",
		data: {
			title: decodeEntities(event.title),
			// Local wall-clock time at the event, so dates read as on the old site.
			starts: `${event.start_date.replace(" ", "T")}Z`,
			ends: event.end_date ? `${event.end_date.replace(" ", "T")}Z` : undefined,
			organizer: event.organizer?.[0]?.organizer ? decodeEntities(event.organizer[0].organizer) : undefined,
			organizer_url: event.organizer?.[0]?.website || undefined,
			location: location ? decodeEntities(location) : undefined,
			category: category ?? "attending",
			website: event.website || undefined,
			image: event.image?.url ? imageValue(await media.add(event.image.url, ""), "") : undefined,
			description: await convertHtml(event.description ?? "", media),
		},
	});
}

// ---------------------------------------------------------------- documents
const MONTHS = "january|february|march|april|may|june|july|august|september|october|november|december";
const documentEntries = [];
for (const doc of wpDocuments) {
	const isFile = /\/wp-content\/uploads\/.+\.[a-z0-9]+$/i.test(doc.target);
	const fileItem = isFile ? await media.add(doc.target) : null;
	// Dates: minutes are named 2026-09-08-minutes.pdf; reports carry the year in the title.
	const fromFile = doc.target.match(/(\d{4})-(\d{2})-(\d{2})/);
	const fromTitle = doc.title.match(new RegExp(`(${MONTHS})\\s+(\\d{4})`, "i"));
	const year = doc.title.match(/\b(20\d\d)\b/);
	const date = fromFile
		? `${fromFile[1]}-${fromFile[2]}-${fromFile[3]}T00:00:00.000Z`
		: fromTitle
			? new Date(`${fromTitle[1]} 1, ${fromTitle[2]} UTC`).toISOString()
			: year
				? `${year[1]}-01-01T00:00:00.000Z`
				: undefined;
	documentEntries.push({
		id: `doc-${documentEntries.length}`,
		slug: (doc.slug = uniqueSlug(doc.link.split("/").filter(Boolean).pop() ?? doc.title)),
		status: "published",
		data: {
			title: decodeEntities(doc.title),
			category: doc.category,
			file: fileItem ? { ...imageValue(fileItem), alt: undefined } : undefined,
			// The AI position statement's page is empty on the live site and has no
			// file, so it keeps pointing there.
			link: fileItem
				? undefined
				: doc.target.includes("/resource/")
					? doc.target
					: doc.target.replace(/^https:\/\/rustfoundation\.org(?=\/)/, ""),
			summary: doc.summary ? decodeEntities(doc.summary) : undefined,
			date,
		},
	});
}

// ---------------------------------------------------------------- pages & co
const { pages, menus, settings } = await buildPages({ media, posts, wpMedia });

// Old URLs that must keep working (GitHub Pages serves them as redirect pages).
const redirects = [
	["/training", "/rust-foundation-trusted-training/"],
	["/rftt", "/rust-foundation-trusted-training/"],
	["/brand-guide-2", "/brand-guide/"],
	["/mastodon", "/"],
	["/board", "/about/"],
	["/news", "/media/category/news/"],
	["/blog", "/media/category/blog/"],
	["/press", "/media/category/press/"],
	["/grants", "/project-support/"],
	["/support", "/project-support/"],
	["/membership", "/get-involved/"],
	["/feed", "/feed.xml"],
	["/policy/trademark-policy", "/policy/rust-trademark-policy/"],
	["/info/contact", "/contact/"],
	["/grants/fellowships", "/project-support/"],
].map(([source, destination]) => ({ source, destination, type: 301, groupName: "Migration" }));

// Old /resource/<slug>/ URLs pointed at files.
for (const entry of documentEntries) {
	const doc = wpDocuments.find((d) => d.slug === entry.slug);
	const destination = entry.data.file ? mediaUrl({ storageKey: entry.data.file.meta.storageKey }) : entry.data.link;
	if (doc && destination && !destination.includes("/resource/")) {
		redirects.push({ source: new URL(doc.link).pathname.replace(/\/$/, ""), destination, type: 301, groupName: "Documents" });
	}
}

// ---------------------------------------------------------------- seed
const schema = JSON.parse(await readFile("seed/seed.json", "utf8"));
const seed = {
	...schema,
	settings: { ...schema.settings, ...settings },
	menus: menus ?? schema.menus,
	taxonomies: schema.taxonomies.map((taxonomy) => ({
		...taxonomy,
		terms:
			taxonomy.name === "tag"
				? tags.filter((t) => t.count > 0).map((t) => ({ slug: t.slug, label: decodeEntities(t.name) }))
				: taxonomy.terms,
	})),
	bylines,
	redirects,
	content: {
		pages,
		posts: postEntries,
		policies: policyEntries,
		organizations,
		people,
		faqs,
		events: eventEntries,
		documents: documentEntries,
	},
};
const seedFile = join(cacheDir, "import-seed.json");
await writeFile(seedFile, JSON.stringify(seed, null, 1));
console.log(`Wrote ${seedFile}; applying it…`);

execFileSync(
	"npx",
	["emdash", "seed", seedFile, "--database", DATABASE, "--uploads-dir", "content/media", "--media-base-url", "/media", "--on-conflict", "update"],
	{ stdio: "inherit" },
);

// ---------------------------------------------------------------- dates
// Seeding stamps everything with today's date; restore the WordPress ones.
const db = new DatabaseSync(DATABASE);
const setDates = db.prepare(
	"UPDATE ec_posts SET published_at = ?, created_at = ?, updated_at = ? WHERE slug = ?",
);
for (const post of posts) {
	setDates.run(`${post.date_gmt}Z`.replace("ZZ", "Z"), `${post.date_gmt}Z`, `${post.modified_gmt}Z`, post.slug);
}
const setPolicyDates = db.prepare("UPDATE ec_policies SET published_at = ?, updated_at = ? WHERE slug = ?");
for (const policy of policies) {
	setPolicyDates.run(`${policy.date_gmt}Z`, `${policy.modified_gmt}Z`, policy.slug);
}
db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
db.close();
console.log("Done.");
