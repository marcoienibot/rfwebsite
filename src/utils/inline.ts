import { leadIn } from "./text";

const escapeHtml = (text: string) =>
	text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SAFE_HREF = /^(?:https?:\/\/|mailto:|tel:|\/|#)/i;
const EXTERNAL = /^https?:\/\//i;

/**
 * Inline formatting for plain text fields: [link text](url) and **bold**.
 * Everything else is escaped, so editors can't inject HTML.
 */
export function inlineHtml(text: string): string {
	return escapeHtml(text)
		.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, href) => {
			const url = href.replace(/&amp;/g, "&");
			if (!SAFE_HREF.test(url)) return match;
			const attrs = EXTERNAL.test(url) && !url.startsWith("https://rustfoundation.org") ? ' target="_blank" rel="noopener"' : "";
			return `<a href="${escapeHtml(url)}"${attrs}>${label}</a>`;
		})
		.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export type TextBlock = { type: "p"; html: string } | { type: "ul"; items: string[] };

/**
 * Split a multi-line text field into paragraphs and lists. A blank line
 * starts a new paragraph; lines starting with "- " or "• " form a list.
 */
export function textBlocks(text: string | null | undefined, { emphasiseLeadIn = false } = {}): TextBlock[] {
	const blocks: TextBlock[] = [];
	for (const chunk of (text ?? "").split(/\n\s*\n/)) {
		const lines = chunk.split("\n").map((line) => line.trim()).filter(Boolean);
		if (lines.length === 0) continue;
		const isItem = (line: string) => /^[-•]\s+/.test(line);
		let paragraph: string[] = [];
		const flush = () => {
			if (paragraph.length === 0) return;
			const joined = paragraph.join(" ");
			const { lead, rest } = emphasiseLeadIn ? leadIn(joined) : { lead: undefined, rest: joined };
			blocks.push({ type: "p", html: (lead ? `<span class="lead-in">${escapeHtml(lead)}</span>` : "") + inlineHtml(rest) });
			paragraph = [];
		};
		for (const line of lines) {
			if (isItem(line)) {
				flush();
				const item = inlineHtml(line.replace(/^[-•]\s+/, ""));
				const last = blocks.at(-1);
				if (last?.type === "ul" && !paragraph.length) last.items.push(item);
				else blocks.push({ type: "ul", items: [item] });
			} else {
				paragraph.push(line);
			}
		}
		flush();
	}
	return blocks;
}
