// Pages, menus and settings for the import. Each page is described in
// `pages/<slug>.mjs` as a list of EmDash blocks (see seed/seed.json for the
// fields of every block type).
import { readdir } from "node:fs/promises";

import { convertHtml } from "./convert.mjs";
import { imageValue, mediaUrl } from "./media.mjs";
import { menus } from "./menus.mjs";

/**
 * Helpers handed to every page module:
 * - `image(url, alt)`: upload an image, returns the value for an image field
 * - `file(url)`: upload a document (PDF…), returns its public URL for links
 * - `richText(html)`: convert HTML to the value of a Portable Text field
 */
function helpers(media) {
	return {
		image: async (url, alt) => (url ? imageValue(await media.add(url, alt), alt) : undefined),
		file: async (url) => {
			const item = await media.add(url);
			return item ? mediaUrl(item) : url;
		},
		richText: (html) => convertHtml(html, media),
	};
}

let keyCounter = 0;

export async function buildPages({ media }) {
	const dir = new URL("./pages/", import.meta.url);
	const files = (await readdir(dir)).filter((file) => file.endsWith(".mjs")).sort();
	const pages = [];
	for (const file of files) {
		const { default: define } = await import(new URL(file, dir));
		const page = await define(helpers(media));
		console.log(`page: ${page.slug}`);
		pages.push({
			id: `page-${page.slug}`,
			slug: page.slug,
			status: "published",
			data: {
				title: page.title,
				// Without a `_version`, EmDash uses the block type's current version.
				content: page.blocks.filter(Boolean).map((block) => ({
					_key: `b${(keyCounter++).toString(36)}`,
					...block,
				})),
			},
		});
	}
	return {
		pages,
		menus,
		settings: {},
	};
}
