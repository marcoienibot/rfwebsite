import type { APIRoute } from "astro";
import { events } from "../utils/content";

// Event dates are stored as local wall-clock time, so all-day calendar
// entries use the date as written.
const day = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, "");
const escape = (text: string) => text.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");

export const GET: APIRoute = async ({ site, url }) => {
	const root = (site ?? url).href.replace(/\/?$/, "/");
	const lines = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"PRODID:-//Rust Foundation//Events//EN",
		"X-WR-CALNAME:Rust Foundation events",
	];
	for (const event of await events()) {
		const end = new Date((event.ends ?? event.starts).getTime());
		end.setUTCDate(end.getUTCDate() + 1);
		lines.push(
			"BEGIN:VEVENT",
			`UID:${event.data.id}@rustfoundation.org`,
			`DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
			`DTSTART;VALUE=DATE:${day(event.starts)}`,
			`DTEND;VALUE=DATE:${day(end)}`,
			`SUMMARY:${escape(event.data.title)}`,
			...(event.data.location ? [`LOCATION:${escape(event.data.location)}`] : []),
			`URL:${new URL(`event/${event.id}/`, root).href}`,
			"END:VEVENT",
		);
	}
	lines.push("END:VCALENDAR");
	return new Response(lines.join("\r\n"), { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
};
