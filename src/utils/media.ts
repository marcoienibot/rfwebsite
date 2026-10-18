/** An image field value, as stored by EmDash. */
export interface ImageValue {
	id?: string;
	provider?: string;
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
	meta?: { storageKey?: string; [key: string]: unknown };
}

const INTERNAL_PREFIX = "/_emdash/api/media/file/";

/**
 * Public URL of an image or file. Local media is published as plain files
 * under /media/ so the static site doesn't need EmDash's media route.
 */
export function mediaSrc(image: ImageValue | null | undefined): string | undefined {
	if (!image) return undefined;
	if (image.provider && image.provider !== "local") return image.src;
	const key =
		image.meta?.storageKey ??
		(image.src?.startsWith(INTERNAL_PREFIX) ? image.src.slice(INTERNAL_PREFIX.length) : undefined) ??
		(image.src?.startsWith("/media/") ? image.src.slice("/media/".length) : undefined);
	if (key) return `/media/${key}`;
	return image.src;
}

/** Turn an internal media URL found in rich text into its public URL. */
export function publicMediaUrl(url: string | undefined): string | undefined {
	if (!url) return url;
	return url.startsWith(INTERNAL_PREFIX) ? `/media/${url.slice(INTERNAL_PREFIX.length)}` : url;
}
