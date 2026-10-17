/** Links that leave the site open in a new tab. */
export function isExternal(url: string | undefined): boolean {
	return !!url && /^https?:\/\//.test(url) && !url.startsWith("https://rustfoundation.org");
}

export function linkAttrs(url: string | undefined) {
	return isExternal(url) ? { href: url, target: "_blank", rel: "noopener" } : { href: url };
}

export const postUrl = (slug: string) => `/media/${slug}/`;
export const policyUrl = (slug: string) => `/policy/${slug}/`;
export const categoryUrl = (slug: string) => `/media/category/${slug}/`;
export const tagUrl = (slug: string) => `/media/tag/${slug}/`;
