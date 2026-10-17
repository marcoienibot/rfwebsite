import { paragraphs } from "./text";

/**
 * Fallbacks for a page's SEO description: the introduction of its page
 * header, used when the SEO panel in the admin is empty.
 */
export function pageSeoDefaults(blocks: unknown[] | null | undefined) {
	const header = blocks?.find(
		(block): block is { _type: string; intro?: string } =>
			typeof block === "object" && block !== null && (block as { _type?: string })._type === "page_header",
	);
	const description = paragraphs(header?.intro)[0];
	return { defaultDescription: description?.slice(0, 300) };
}
