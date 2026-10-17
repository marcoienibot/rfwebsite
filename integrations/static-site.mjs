// Glue between EmDash (which expects a server) and a static GitHub Pages
// deployment:
//
// - In `astro dev`, renders pages on request (fresh content) and serves uploaded media from `content/media` at `/media/*`,
//   the public URL the local storage adapter hands out.
// - After `astro build`, copies the media library next to the prerendered
//   pages, builds the search index, drops the admin's client bundles that no
//   public page references,
//   and, when the site lives under a sub-path (GitHub Pages project sites are
//   served from `/<repo>/`), prefixes every root-relative URL with that path.
import { createReadStream } from "node:fs";
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";

import { DatabaseSync } from "node:sqlite";

import * as pagefind from "pagefind";

const MIME_TYPES = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".mp4": "video/mp4",
	".pdf": "application/pdf",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webm": "video/webm",
	".webp": "image/webp",
};

/**
 * @param {{ database: string, mediaDir: string, mediaUrl: string, basePath?: string }} options
 *   basePath: e.g. "/rfwebsite"; empty when the site is served from the root.
 */
export default function staticSite({ database, mediaDir, mediaUrl, basePath = "" }) {
	const base = basePath.replace(/\/+$/, "");
	let root;
	let command;

	return {
		name: "static-site",
		hooks: {
			"astro:config:setup": (options) => {
				command = options.command;
			},
			"astro:config:done": ({ config }) => {
				root = fileURLToPath(config.root);
			},
			// In the editor, render every page on request so new and changed
			// content shows up immediately. `astro build` still prerenders them.
			"astro:route:setup": ({ route }) => {
				if (command === "dev" && route.component.startsWith("src/pages/")) route.prerender = false;
			},
			"astro:server:setup": ({ server }) => {
				const prefix = `${mediaUrl}/`;
				server.middlewares.use(async (req, res, next) => {
					const pathname = decodeURIComponent((req.url ?? "").split("?")[0]);
					if (!pathname.startsWith(prefix)) return next();
					const dir = join(root, mediaDir);
					const file = normalize(join(dir, pathname.slice(prefix.length)));
					if (!file.startsWith(dir + sep)) return next();
					try {
						const info = await stat(file);
						if (!info.isFile()) return next();
						res.setHeader("Content-Type", MIME_TYPES[extname(file).toLowerCase()] ?? "application/octet-stream");
						res.setHeader("Content-Length", info.size);
						createReadStream(file).pipe(res);
					} catch {
						next();
					}
				});
			},
			"astro:build:done": async ({ dir, logger }) => {
				const outDir = fileURLToPath(dir).replace(/\/$/, "");
				await cp(join(root, mediaDir), join(outDir, mediaUrl), { recursive: true }).catch(
					(error) => {
						if (error.code !== "ENOENT") throw error;
					},
				);
				const redirects = await writeRedirects(join(root, database), outDir);
				logger.info(`Wrote ${redirects} redirect pages`);
				const files = await listFiles(outDir);
				const pruned = await pruneUnusedAssets(outDir, files);
				logger.info(`Removed ${pruned} admin-only assets from the static output`);
				const indexed = await buildSearchIndex(outDir);
				logger.info(`Indexed ${indexed} pages for search`);
				if (base) {
					await rebase(files, base);
					logger.info(`Prefixed root-relative URLs with ${base}`);
				}
			},
		},
	};
}

/**
 * Redirects managed in the admin (Redirects screen). A static host can't
 * answer with a 301, so each one becomes a page that forwards the visitor.
 */
async function writeRedirects(databaseFile, outDir) {
	const db = new DatabaseSync(databaseFile, { readOnly: true });
	let rows;
	try {
		rows = db
			.prepare("SELECT source, destination FROM _emdash_redirects WHERE enabled = 1 AND is_pattern = 0")
			.all();
	} finally {
		db.close();
	}
	let written = 0;
	for (const { source, destination } of rows) {
		const dir = join(outDir, normalize(source.replace(/^\/+|\/+$/g, "")));
		if (!dir.startsWith(outDir + sep)) continue;
		const file = join(dir, "index.html");
		// Never replace a real page.
		if (await stat(file).then(() => true, () => false)) continue;
		const href = destination.replace(/"/g, "&quot;");
		await mkdir(dir, { recursive: true });
		await writeFile(
			file,
			`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>` +
				`<meta name="robots" content="noindex"><link rel="canonical" href="${href}">` +
				`<meta http-equiv="refresh" content="0; url=${href}"></head>` +
				`<body><a href="${href}">Continue to ${href}</a></body></html>`,
		);
		written++;
	}
	return written;
}

/** Static full-text search: Pagefind writes its index to /pagefind/. */
async function buildSearchIndex(outDir) {
	const { index } = await pagefind.createIndex();
	const { page_count } = await index.addDirectory({ path: outDir });
	await index.writeFiles({ outputPath: join(outDir, "pagefind") });
	await pagefind.close();
	return page_count;
}

async function listFiles(dir) {
	const entries = await readdir(dir, { recursive: true, withFileTypes: true });
	return entries.filter((e) => e.isFile()).map((e) => join(e.parentPath, e.name));
}

const TEXT_EXTENSIONS = new Set([".html", ".css", ".js", ".xml", ".txt", ".json", ".webmanifest"]);

/**
 * The client output also contains the EmDash admin's JavaScript, which no
 * public page loads. Keep only `_astro` files reachable from the HTML.
 * Removes the pruned files from `files` and returns how many were removed.
 */
async function pruneUnusedAssets(outDir, files) {
	const assetDir = join(outDir, "_astro");
	const assets = new Set(files.filter((f) => f.startsWith(assetDir + sep)));
	const reachable = new Set();
	const queue = files.filter((f) => !assets.has(f) && TEXT_EXTENSIONS.has(extname(f)));
	while (queue.length > 0) {
		const file = queue.pop();
		const text = await readFile(file, "utf8");
		for (const match of text.matchAll(/_astro\/([\w./@-]+?\.[a-z0-9]+)(?=["'`)\s?#,]|$)/g)) {
			const asset = join(assetDir, match[1]);
			if (assets.has(asset) && !reachable.has(asset)) {
				reachable.add(asset);
				if (TEXT_EXTENSIONS.has(extname(asset))) queue.push(asset);
			}
		}
	}
	let removed = 0;
	for (const asset of assets) {
		if (reachable.has(asset)) continue;
		await rm(asset);
		removed++;
	}
	files.splice(0, files.length, ...files.filter((f) => !assets.has(f) || reachable.has(f)));
	return removed;
}

const URL_ATTRIBUTE =
	/(\s(?:href|src|action|poster|content|component-url|renderer-url|before-hydration-url|data-src)=["'])\/(?!\/)/g;
const SRCSET = /(\ssrcset=["'])([^"']*)(["'])/g;
const META_REFRESH = /(content=["']\d+;\s*url=)\/(?!\/)/gi;
const CSS_URL = /url\((["']?)\/(?!\/)/g;
const JS_ASSET = /(["'`])\/_astro\//g;

async function rebase(files, base) {
	for (const file of files) {
		const ext = extname(file);
		if (!TEXT_EXTENSIONS.has(ext)) continue;
		let text = await readFile(file, "utf8");
		const original = text;
		if (ext === ".html" || ext === ".xml") {
			text = text
				.replace(URL_ATTRIBUTE, `$1${base}/`)
				.replace(META_REFRESH, `$1${base}/`)
				.replace(SRCSET, (_, open, value, close) =>
					`${open}${value.replace(/(^|,\s*)\/(?!\/)/g, `$1${base}/`)}${close}`,
				)
				.replace(CSS_URL, `url($1${base}/`);
		} else if (ext === ".css") {
			text = text.replace(CSS_URL, `url($1${base}/`);
		} else if (ext === ".js") {
			text = text.replace(JS_ASSET, `$1${base}/_astro/`);
		}
		if (text !== original) await writeFile(file, text);
	}
}
