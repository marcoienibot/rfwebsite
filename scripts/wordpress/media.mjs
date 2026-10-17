// Media handling for the WordPress import: download each referenced file
// once, shrink images to a sensible web size, and upload them to the EmDash
// media library of a running dev server.
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";

import sharp from "sharp";

const MAX_WIDTH = 1600;
const RASTER = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const MIME = {
	".avif": "image/avif",
	".gif": "image/gif",
	".jpeg": "image/jpeg",
	".jpg": "image/jpeg",
	".pdf": "application/pdf",
	".png": "image/png",
	".svg": "image/svg+xml",
	".webp": "image/webp",
	".zip": "application/zip",
};

/** `https://site/wp-content/uploads/a/b/name-1024x576.png` → `…/name.png` */
export function originalUploadUrl(url) {
	return url.replace(/-\d+x\d+(\.[a-z0-9]+)$/i, "$1");
}

function cacheName(url) {
	const ext = extname(new URL(url).pathname).toLowerCase() || ".bin";
	return `${createHash("sha1").update(url).digest("hex").slice(0, 16)}${ext}`;
}

async function download(url, file) {
	const res = await fetch(url, { headers: { "User-Agent": "rfwebsite-migration" } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	await writeFile(file, Buffer.from(await res.arrayBuffer()));
}

/**
 * Download `url` (preferring the full-size original of a WordPress resized
 * image) and return the path of a web-optimized copy.
 */
export async function fetchOptimized(url, cacheDir) {
	const rawDir = join(cacheDir, "files");
	const outDir = join(cacheDir, "optimized");
	await mkdir(rawDir, { recursive: true });
	await mkdir(outDir, { recursive: true });

	let source = originalUploadUrl(url);
	let raw = join(rawDir, cacheName(source));
	if (!existsSync(raw)) {
		try {
			await download(source, raw);
		} catch {
			// No original under that name; use the URL as given.
			source = url;
			raw = join(rawDir, cacheName(source));
			if (!existsSync(raw)) await download(source, raw);
		}
	}

	let ext = extname(raw);
	if (ext === ".bin") {
		// No extension in the URL (e.g. Gravatar): look at the bytes.
		const format = await sharp(raw).metadata().then((m) => m.format, () => undefined);
		if (["jpeg", "png", "webp", "gif"].includes(format)) ext = `.${format}`;
	}
	// Images become WebP (much smaller than the PNG screenshots and graphics
	// the old site used; transparency is kept). EmDash doesn't accept SVG
	// uploads, since they can carry scripts, so those are rasterized first.
	const convert = RASTER.has(ext) || ext === ".svg";
	const out = join(outDir, convert ? `${basename(raw, extname(raw))}.webp` : basename(raw));
	if (!existsSync(out)) {
		if (convert) {
			const input = await readFile(raw);
			const image = sharp(input, { failOn: "none", density: ext === ".svg" ? 300 : undefined }).rotate();
			const meta = await image.metadata();
			const maxWidth = ext === ".svg" ? 800 : MAX_WIDTH;
			const resized = meta.width > maxWidth ? image.resize({ width: maxWidth }) : image;
			await writeFile(out, await resized.webp({ quality: 80, alphaQuality: 90, effort: 5 }).toBuffer());
		} else {
			await writeFile(out, await readFile(raw));
		}
	}
	const name = basename(new URL(source).pathname);
	const filename = convert ? `${name.replace(/\.[a-z0-9]+$/i, "")}.webp` : name;
	return { file: out, filename, mimeType: MIME[extname(out)] ?? "application/octet-stream" };
}

export class MediaLibrary {
	/** @param {{ baseUrl: string, cacheDir: string }} options */
	constructor({ baseUrl, cacheDir }) {
		this.baseUrl = baseUrl;
		this.cacheDir = cacheDir;
		this.cookie = "";
		/** @type {Map<string, Promise<object | null>>} */
		this.uploads = new Map();
	}

	async login() {
		const res = await fetch(`${this.baseUrl}/_emdash/api/setup/dev-bypass`, {
			method: "POST",
			headers: { "X-EmDash-Request": "1" },
		});
		if (!res.ok) throw new Error(`Dev login failed: HTTP ${res.status} ${await res.text()}`);
		this.cookie = res.headers
			.getSetCookie()
			.map((c) => c.split(";")[0])
			.join("; ");
	}

	/**
	 * Upload (once) the file behind `url` and return its EmDash media record,
	 * or null when the file can't be fetched.
	 */
	add(url, alt = "") {
		if (!this.uploads.has(url)) this.uploads.set(url, this.#upload(url, alt));
		return this.uploads.get(url);
	}

	async #upload(url, alt) {
		let local;
		try {
			local = await fetchOptimized(url, this.cacheDir);
		} catch (error) {
			console.warn(`  ! skipped ${url}: ${error.message}`);
			return null;
		}
		const body = new FormData();
		const bytes = await readFile(local.file);
		body.append("file", new Blob([bytes], { type: local.mimeType }), local.filename);
		if (alt) body.append("alt", alt);
		if (local.mimeType.startsWith("image/") && local.mimeType !== "image/svg+xml") {
			const { width, height } = await sharp(bytes).metadata();
			body.append("width", String(width));
			body.append("height", String(height));
			const thumbnail = await sharp(bytes).resize({ width: 32 }).png().toBuffer();
			body.append("thumbnail", new Blob([thumbnail], { type: "image/png" }), "thumbnail.png");
		}
		const res = await fetch(`${this.baseUrl}/_emdash/api/media`, {
			method: "POST",
			headers: { Cookie: this.cookie, "X-EmDash-Request": "1" },
			body,
		});
		if (!res.ok) {
			console.warn(`  ! upload failed for ${url}: HTTP ${res.status} ${(await res.text()).slice(0, 200)}`);
			return null;
		}
		const { data } = await res.json();
		return data.item ?? data;
	}
}

/** Shape stored in image fields. */
export function imageValue(item, alt) {
	if (!item) return undefined;
	return {
		provider: "local",
		id: item.id,
		alt: alt || item.alt || undefined,
		width: item.width ?? undefined,
		height: item.height ?? undefined,
		mimeType: item.mimeType,
		filename: item.filename,
		meta: { storageKey: item.storageKey },
	};
}

/** Public URL of a stored media file. */
export function mediaUrl(item) {
	return `/media/${item.storageKey}`;
}
