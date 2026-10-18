import type { APIRoute } from "astro";
import { allPosts } from "../utils/content";
import { postUrl } from "../utils/links";

const escape = (text: string) =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const GET: APIRoute = async ({ site, url }) => {
	const root = (site ?? url).href.replace(/\/?$/, "/");
	const absolute = (path: string) => new URL(path.replace(/^\//, ""), root).href;
	const posts = (await allPosts()).slice(0, 30);
	const items = posts
		.map((post) => {
			const link = post.data.external_url || absolute(postUrl(post.id));
			return `<item>
<title>${escape(post.data.title)}</title>
<link>${escape(link)}</link>
<guid isPermaLink="false">${escape(post.data.id)}</guid>
<pubDate>${(post.data.publishedAt ?? post.data.createdAt).toUTCString()}</pubDate>
${post.tags.map((t) => `<category>${escape(t.label)}</category>`).join("")}
${post.data.excerpt ? `<description>${escape(post.data.excerpt)}</description>` : ""}
</item>`;
		})
		.join("\n");
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
<title>Rust Foundation</title>
<link>${escape(root)}</link>
<description>News from the Rust Foundation</description>
${items}
</channel>
</rss>`;
	return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
};
