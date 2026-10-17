// Converts WordPress HTML into EmDash Portable Text, uploading the images and
// documents it references to the EmDash media library on the way.
import { htmlToPortableText } from "@emdash-cms/gutenberg-to-portable-text";

import { imageValue, mediaUrl } from "./media.mjs";

export const SITE = "https://rustfoundation.org";

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—" };

export function decodeEntities(text) {
	return text
		.replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
		.replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
		.replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

export function stripTags(html) {
	return decodeEntities(html.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

const used = new Set();

/** URL-safe, unique slug from a title. */
export function uniqueSlug(text) {
	const base =
		text
			.normalize("NFKD")
			.replace(/[\u0300-\u036f]/g, "")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "")
			.slice(0, 80) || "item";
	let slug = base;
	for (let i = 2; used.has(slug); i++) slug = `${base}-${i}`;
	used.add(slug);
	return slug;
}

/** /resource/<slug>/ URL → the file or page it redirects to. */
let resourceLinks = {};
export function setResourceLinks(map) {
	resourceLinks = map;
}

/** Old foundation.rust-lang.org URL → where it redirects on rustfoundation.org. */
let oldLinks = {};
export function setOldLinks(map) {
	oldLinks = map;
}

let keyCounter = 0;
const key = () => `k${(keyCounter++).toString(36)}`;

const DOCUMENT = /\.(pdf|docx?|pptx?|xlsx?|zip)$/i;

/** Map a link on the old site to its path on the new one. */
export function localizeHref(href, documents) {
	if (!href) return href;
	if (documents.has(href)) return documents.get(href);
	const old = href.match(/^https?:\/\/foundation\.rust-lang\.org[^#]*/)?.[0];
	if (old && oldLinks[old]) href = oldLinks[old] + href.slice(old.length);
	const match = href.match(/^https?:\/\/(?:www\.)?rustfoundation\.org(\/.*)?$/);
	if (!match) return href;
	const path = match[1] || "/";
	if (path.startsWith("/wp-content/")) return href;
	return path;
}

/**
 * WordPress wraps YouTube iframes and code in markup the HTML converter
 * doesn't keep, so cut them out first and convert the HTML in between.
 */
function splitSpecialBlocks(html) {
	const parts = [];
	const pattern =
		/<figure[^>]*wp-block-embed[^>]*>[\s\S]*?<\/figure>|<iframe[^>]*>[\s\S]*?<\/iframe>|<pre[^>]*>[\s\S]*?<\/pre>/gi;
	let last = 0;
	for (const match of html.matchAll(pattern)) {
		parts.push({ html: html.slice(last, match.index) });
		const chunk = match[0];
		const iframe = chunk.match(/<iframe[^>]*src="([^"]+)"/i);
		if (iframe) {
			const src = decodeEntities(iframe[1]);
			const youtube = src.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]{11})/);
			parts.push({
				block: {
					_type: "embed",
					_key: key(),
					url: youtube ? `https://www.youtube.com/watch?v=${youtube[1]}` : src,
					provider: youtube ? "youtube" : undefined,
				},
			});
		} else if (/^<pre/i.test(chunk)) {
			parts.push({ block: { _type: "code", _key: key(), code: stripPreservingLines(chunk) } });
		} else {
			parts.push({ html: chunk });
		}
		last = match.index + chunk.length;
	}
	parts.push({ html: html.slice(last) });
	return parts;
}

function stripPreservingLines(html) {
	return decodeEntities(html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "")).trim();
}

/**
 * @param {string} html  WordPress `content.rendered`
 * @param {import("./media.mjs").MediaLibrary} media
 */
export async function convertHtml(html, media) {
	// "Resources" were redirects to files: link to the file itself.
	html = html.replace(/https?:\/\/(?:www\.)?rustfoundation\.org\/resource\/[^"'#?]+/g, (url) => {
		const key = url.endsWith("/") ? url : `${url}/`;
		return resourceLinks[key] ?? url;
	});
	// Upload linked documents (annual reports, minutes, …) to the media library.
	const documents = new Map();
	for (const [, href] of html.matchAll(/href="(https?:\/\/(?:www\.)?rustfoundation\.org\/wp-content\/uploads\/[^"]+)"/g)) {
		if (!DOCUMENT.test(href) || documents.has(href)) continue;
		const item = await media.add(href);
		if (item) documents.set(href, mediaUrl(item));
	}

	const blocks = [];
	for (const part of splitSpecialBlocks(html)) {
		if (part.block) {
			blocks.push(part.block);
			continue;
		}
		if (!part.html.trim()) continue;
		blocks.push(...htmlToPortableText(part.html, { keyGenerator: key }));
	}

	for (const block of blocks) {
		for (const def of block.markDefs ?? []) {
			if (def._type === "link") def.href = localizeHref(def.href, documents);
		}
		if (block._type === "image") {
			const src = block.asset?.url ?? block.asset?._ref;
			const item = src ? await media.add(src, block.alt) : null;
			if (item) {
				const value = imageValue(item, block.alt);
				block.asset = { _type: "reference", _ref: item.id, url: mediaUrl(item) };
				block.width = value.width;
				block.height = value.height;
				if (item.blurhash) block.blurhash = item.blurhash;
				if (item.dominantColor) block.dominantColor = item.dominantColor;
			}
			if (typeof block.link === "string") block.link = localizeHref(block.link, documents);
		}
	}
	return blocks.filter((block) => !(block._type === "image" && !block.asset?.url));
}
