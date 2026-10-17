/** Split a multi-line text field into paragraphs (blank line = new paragraph). */
export function paragraphs(text: string | null | undefined): string[] {
	return (text ?? "")
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean);
}

/**
 * The site often opens a paragraph with a phrase in capitals ("OUR MISSION is
 * to…", "THE RUST FOUNDATION is…"). Split that lead-in off so it can be styled.
 */
export function leadIn(paragraph: string): { lead?: string; rest: string } {
	const match = paragraph.match(/^([A-Z][A-Z0-9 &'’-]{3,}[A-Z])(\s+.*)$/s);
	return match ? { lead: match[1], rest: match[2] } : { rest: paragraph };
}

const dateFormat = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });

export function formatDate(date: Date | string | null | undefined): string {
	if (!date) return "";
	return dateFormat.format(typeof date === "string" ? new Date(date) : date);
}
