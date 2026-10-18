// Converts WordPress HTML into EmDash Portable Text, uploading the images and
// documents it references to the EmDash media library on the way.
import { gutenbergToPortableText, htmlToPortableText } from "@emdash-cms/gutenberg-to-portable-text";

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
	// Resource URLs not resolved to an imported document must keep pointing
	// at the source site; there is no general /resource/ route in the port.
	if (path.startsWith("/wp-content/") || path.startsWith("/resource/")) return href;
	return path;
}

/** A row of WordPress buttons (`wp-block-buttons`) → a Portable Text `buttons` block. */
function buttonsBlock(html) {
	const buttons = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map(([, attrs, label]) => ({
		_type: "button",
		_key: key(),
		text: stripTags(label) || "Button",
		url: decodeEntities(attrs.match(/href="([^"]*)"/i)?.[1] ?? ""),
		style: /is-style-outline/.test(html) ? "outline" : "default",
	}));
	const justify = html.match(/is-content-justification-(left|center|right)/)?.[1];
	return { _type: "buttons", _key: key(), buttons, layout: "horizontal", ...(justify && { justify }) };
}

/**
 * WordPress wraps YouTube iframes, code, tables, pull quotes and buttons in
 * markup the HTML converter doesn't keep, so cut them out first and convert
 * the HTML in between.
 */
function splitSpecialBlocks(html) {
	const parts = [];
	const pattern =
		/<figure[^>]*wp-block-embed[^>]*>[\s\S]*?<\/figure>|<iframe[^>]*>[\s\S]*?<\/iframe>|<pre[^>]*>[\s\S]*?<\/pre>|<figure[^>]*wp-block-(?:table|pullquote)[^>]*>[\s\S]*?<\/figure>|<table[^>]*>[\s\S]*?<\/table>|<div[^>]*wp-block-buttons[^>]*>[\s\S]*?<\/div>\s*<\/div>/gi;
	let last = 0;
	for (const match of html.matchAll(pattern)) {
		parts.push({ html: html.slice(last, match.index) });
		const chunk = match[0];
		const iframe = chunk.match(/<iframe[^>]*src="([^"]+)"/i);
		if (/^<figure[^>]*wp-block-pullquote/i.test(chunk)) {
			// A pull quote is a highlighted <blockquote>, which the converter keeps (links included).
			parts.push({ html: chunk.replace(/^<figure[^>]*>|<\/figure>$/gi, "") });
		} else if (/^<figure[^>]*wp-block-table|^<table/i.test(chunk)) {
			// Tables with formatting or line breaks in their cells are only kept by the block-editor converter.
			parts.push({ blocks: gutenbergToPortableText(`<!-- wp:table -->${chunk}<!-- /wp:table -->`, { keyGenerator: key }) });
		} else if (/^<div/i.test(chunk)) {
			parts.push({ block: buttonsBlock(chunk) });
		} else if (iframe) {
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
	// The converter drops protocol-relative links (href="//example.com"), so give them a scheme.
	html = html.replace(/\b(href|src)=(["'])\/\//gi, "$1=$2https://");
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
		if (part.blocks) {
			blocks.push(...part.blocks);
			continue;
		}
		if (!part.html.trim()) continue;
		blocks.push(...htmlToPortableText(part.html, { keyGenerator: key }));
	}

	for (const block of blocks) {
		const cells = block.rows?.flatMap((row) => row.cells) ?? [];
		for (const cell of cells) {
			// Cells often start with a <br>: drop the blank lines around their text.
			while (cell.content.length > 1 && !cell.content[0].text.trim()) cell.content.shift();
			while (cell.content.length > 1 && !cell.content.at(-1).text.trim()) cell.content.pop();
		}
		for (const def of [block, ...cells].flatMap((item) => item.markDefs ?? [])) {
			if (def._type === "link") def.href = localizeHref(def.href, documents);
		}
		for (const button of block.buttons ?? []) button.url = localizeHref(button.url, documents);
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
