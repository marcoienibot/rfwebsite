// Generates seed/seed.json: the content model of the site (collections,
// page blocks, taxonomies, menus). EmDash applies it to an empty database.
//
//   node scripts/schema.mjs
import { writeFile } from "node:fs/promises";

const LINK_PATTERN = "^(?:$|(?:https?://|mailto:|tel:|/(?!/)|#).+)$";

const string = (slug, label, extra = {}) => ({ slug, label, type: "string", ...extra });
// Multi-line text: a blank line starts a new paragraph, lines starting with
// "- " become a list, and [link text](https://…) makes a link.
const text = (slug, label, extra = {}) => ({ slug, label, type: "text", ...extra });
const PARAGRAPHS = "(blank line = new paragraph, “- ” = list item, [text](https://…) = link)";
const link = (slug, label) => ({
	slug,
	label: `${label} (starts with /, https://, mailto: or #)`,
	type: "string",
	validation: { pattern: LINK_PATTERN },
});
// Repeater rows only support plain sub-fields (no validation rules).
const subLink = (slug, label) => ({ slug, label: `${label} (starts with /, https://, mailto: or #)`, type: "string" });
const image = (slug, label, extra = {}) => ({ slug, label, type: "image", ...extra });
const select = (slug, label, options, defaultValue) => ({
	slug,
	label,
	type: "select",
	validation: { options },
	...(defaultValue && { defaultValue }),
});
const repeater = (slug, label, subFields, extra = {}) => ({
	slug,
	label,
	type: "repeater",
	validation: { subFields, ...extra },
});
const anchor = {
	slug: "anchor_id",
	label: "Section ID (lowercase, for “Jump to” links like #initiatives)",
	type: "string",
	validation: { pattern: "^(?:$|[a-z][a-z0-9_-]*)$" },
};
const buttons = repeater(
	"buttons",
	"Buttons",
	[string("label", "Text", { required: true }), subLink("url", "Link")],
	{ maxItems: 6 },
);

// Long lists start collapsed, with a "Show all" button for the rest.
const showFirst = {
	slug: "show_first",
	label: "Show only the first … and a “Show all” button for the rest (0 = show them all)",
	type: "integer",
	defaultValue: 0,
};

const BACKGROUNDS = ["white", "light", "navy", "teal", "slate", "blush"];

// Which lists an organisation appears in (members by tier, donors, sponsors…)
export const ORGANIZATION_GROUPS = [
	"platinum",
	"gold",
	"silver",
	"associate",
	"infrastructure-donor",
	"security-sponsor",
	"cloud-provider",
	"scrc-founder",
	"rftt-provider",
	"interop-supporter",
	"open-source-partnership",
];
export const PEOPLE_GROUPS = [
	"member-directors",
	"project-directors",
	"staff",
	"security-contributors",
	"infrastructure-contributors",
	"rftt-reviewers",
];
export const DOCUMENT_CATEGORIES = [
	"board-meeting-minutes",
	"rust-foundation-reports",
	"informational-resources",
	"financial-filings",
];
export const FAQ_CATEGORIES = [
	"mission-purpose-leadership",
	"definitions",
	"finance-funding-membership",
	"legal-administrative",
	"decision-making-collaboration",
	"transparency-communication",
	"initiatives",
	"rust-innovation-lab",
	"rftt",
];
export const EVENT_CATEGORIES = ["hosted", "sponsored", "attending", "speaking", "suggested"];

// Each list of fields is one version of the block type, oldest first.
// Removing a field or a select option is a breaking change, which needs a new
// version. Keep the old versions: old revisions still use them.
const block = (slug, label, description, ...versions) => ({
	slug,
	label,
	description,
	category: "Rust Foundation",
	currentVersion: versions.length,
	versions: versions.map((fields, i) => ({ version: i + 1, fields })),
});

const documentsFields = (categories) => [
	string("headline", "Headline"),
	text("text", "Text above the documents"),
	select("category", "Which documents", categories, "rust-foundation-reports"),
	select("style", "Style", ["cards", "list"], "cards"),
	{ slug: "count", label: "How many (0 = all)", type: "integer", defaultValue: 0 },
	showFirst,
	select("background", "Background", BACKGROUNDS, "white"),
	anchor,
];

const blockTypes = [
	block("page_header", "Page header", "The dark blue introduction at the top of a page", [
		string("headline", "Headline", { required: true }),
		text("intro", `Introduction ${PARAGRAPHS}`),
		image("icon", "Small round icon next to the introduction"),
		repeater("jump_links", "“Jump to” links", [
			string("label", "Text", { required: true }),
			subLink("url", "Link (usually #section-id)"),
		]),
		buttons,
	]),
	block("feature_band", "Feature band", "A coloured band with a heading, text, button and a round illustration", [
		string("headline", "Headline", { required: true }),
		text("text", `Text ${PARAGRAPHS}`),
		string("button_label", "Button text"),
		link("button_url", "Button link"),
		image("image", "Round illustration"),
		select("color", "Colour", ["navy", "teal", "slate"], "navy"),
		select("image_side", "Illustration side", ["right", "left"], "right"),
		anchor,
	]),
	block("statement", "Statement", "A short emphasised statement such as the mission", [
		string("label", "Label in capitals (e.g. OUR MISSION)"),
		text("text", `Text ${PARAGRAPHS}`, { required: true }),
		buttons,
		select("background", "Background", BACKGROUNDS, "light"),
		anchor,
	]),
	block("rich_text", "Text", "Headings, paragraphs, lists, links and images", [
		string("headline", "Headline"),
		repeater("authors", "Written by (shown with their photo)", [
			string("name", "Name", { required: true }),
			string("role", "Role"),
			image("photo", "Photo"),
		]),
		select("authors_position", "Where “Written by” appears", ["above the text", "below the text"], "above the text"),
		{ slug: "body", label: "Text", type: "portableText" },
		select("background", "Background", BACKGROUNDS, "white"),
		select("width", "Width", ["narrow", "wide"], "narrow"),
		select("columns", "Columns (long lists read better in 2 or 3)", ["1", "2", "3"], "1"),
		{ slug: "collapsible", label: "Collapsed: the headline opens and closes the text", type: "boolean", defaultValue: false },
		anchor,
	]),
	block("split", "Text and image", "Text next to (or below) a large photo", [
		string("headline", "Headline", { required: true }),
		text("text", `Text ${PARAGRAPHS}`),
		image("image", "Photo", { required: true }),
		select("image_position", "Photo position", ["above", "left", "right"], "above"),
		buttons,
		anchor,
	]),
	block("logo_wall", "Logo wall", "A grid of logos from the Organisations list (or picked by hand)", [
		string("headline", "Headline"),
		text("text", "Text"),
		select("source", "Which logos (from the Organisations list)", [...ORGANIZATION_GROUPS, "all members", "pick below"], "platinum"),
		repeater("logos", "Logos (only when “pick below”)", [
			string("name", "Name", { required: true }),
			image("logo", "Logo"),
			subLink("url", "Link"),
		]),
		select("layout", "Layout (a carousel shows one row with arrows, for long lists)", ["grid", "carousel"], "grid"),
		buttons,
		select("background", "Background", BACKGROUNDS, "white"),
		anchor,
	]),
	block("members_directory", "Members directory", "All members grouped by tier, from the Organisations list", [
		string("headline", "Headline"),
		buttons,
		anchor,
	]),
	block("people_grid", "People", "Photos and roles of people from the People list", [
		string("headline", "Headline", { required: true }),
		text("text", "Text above the people"),
		select("group", "Which people", PEOPLE_GROUPS, "staff"),
		text("note", "Small print below the people"),
		anchor,
	]),
	block(
		"post_cards",
		"Latest news",
		"The most recent posts, optionally only those with one tag",
		// Version 1 could also show only one category of posts (News, Blog or Press).
		[
			string("headline", "Headline", { required: true }),
			select("category", "Category", ["all", "news", "blog", "press"], "all"),
			string("tag", "Only posts with this tag (tag slug, optional)"),
			text("posts", "Or pick posts: one post link or slug per line (overrides category and tag)"),
			{ slug: "count", label: "How many", type: "integer", defaultValue: 4 },
			buttons,
			select("background", "Background", BACKGROUNDS, "white"),
			anchor,
		],
		[
			string("headline", "Headline", { required: true }),
			string("tag", "Only posts with this tag (tag slug, optional)"),
			text("posts", "Or pick posts: one post link or slug per line (overrides the tag)"),
			{ slug: "count", label: "How many", type: "integer", defaultValue: 4 },
			buttons,
			select("background", "Background", BACKGROUNDS, "white"),
			anchor,
		],
	),
	block("cards", "Cards", "A grid of cards with an optional image, text and link", [
		string("headline", "Headline"),
		text("text", "Text above the cards"),
		repeater("cards", "Cards", [
			string("title", "Title", { required: true }),
			text("text", "Text"),
			image("image", "Image"),
			subLink("url", "Link"),
			string("link_label", "Link text"),
		]),
		select("style", "Style (pricing: the first paragraph is the price, the link becomes a button)", ["boxed", "plain", "pricing"], "boxed"),
		select("background", "Background", BACKGROUNDS, "white"),
		anchor,
	]),
	block("cta", "Call to action", "A band with a question or invitation and buttons", [
		string("headline", "Headline", { required: true }),
		text("text", "Text"),
		buttons,
		image("background_image", "Background photo (optional)"),
		select("background", "Background", BACKGROUNDS, "light"),
		anchor,
	]),
	block("quotes", "Quotes", "Testimonials or a highlighted quote, with optional photos", [
		string("headline", "Headline"),
		repeater("items", "Quotes", [
			text("quote", "Quote", { required: true }),
			string("name", "Name"),
			string("role", "Role or organisation"),
			image("photo", "Photo"),
		]),
		select("background", "Background", BACKGROUNDS, "white"),
		anchor,
	]),
	block("photo", "Photo", "A wide photo with an optional caption", [
		image("image", "Photo", { required: true }),
		string("caption", "Caption"),
	]),
	block("link_list", "Link list", "A heading followed by a row of links", [
		string("headline", "Headline"),
		repeater("links", "Links", [string("label", "Text", { required: true }), subLink("url", "Link")]),
	]),
	block("faq", "Questions and answers", "Expandable questions and answers from the FAQs list", [
		string("headline", "Headline"),
		select("category", "Questions from the FAQs list", ["none", ...FAQ_CATEGORIES], "none"),
		repeater("items", "Extra questions for this page only", [
			string("question", "Question", { required: true }),
			text("answer", `Answer ${PARAGRAPHS}`, { required: true }),
		]),
		select("background", "Background", BACKGROUNDS, "white"),
		anchor,
	]),
	block(
		"documents",
		"Documents",
		"Reports, minutes and other files from the Documents list",
		// Version 1 also had the Publications page's "partnered-publications" and
		// "year-in-review" categories, now part of "rust-foundation-reports". Its
		// list is spelled out, not built from DOCUMENT_CATEGORIES: a version must
		// never change once it is in the database, and applying the seed fails if
		// it loses an option.
		documentsFields([
			"board-meeting-minutes",
			"rust-foundation-reports",
			"informational-resources",
			"financial-filings",
			"partnered-publications",
			"year-in-review",
		]),
		documentsFields(DOCUMENT_CATEGORIES),
	),
	block("events", "Events", "Events from the Events list", [
		string("headline", "Headline"),
		select("show", "Which events", ["upcoming", "past", "all"], "upcoming"),
		{ slug: "count", label: "How many (0 = all)", type: "integer", defaultValue: 0 },
		showFirst,
		anchor,
	]),
	block("policies", "Policies", "Cards linking to every policy", [
		string("headline", "Headline"),
		anchor,
	]),
	block("stats", "Numbers", "A row of big numbers with labels", [
		string("headline", "Headline"),
		repeater("items", "Numbers", [string("value", "Number", { required: true }), string("label", "Label", { required: true })]),
		select("background", "Background", BACKGROUNDS, "navy"),
		anchor,
	]),
	block("video", "Video", "An embedded YouTube video", [
		string("headline", "Headline"),
		{ slug: "url", label: "YouTube link", type: "string", required: true },
		anchor,
	]),
];

const collections = [
	{
		slug: "pages",
		label: "Pages",
		labelSingular: "Page",
		icon: "file",
		urlPattern: "/{slug}/",
		supports: ["drafts", "revisions", "preview", "seo", "search"],
		fields: [
			string("title", "Title", { required: true, searchable: true }),
			{
				slug: "content",
				label: "Sections",
				type: "blocks",
				validation: { allowedTypes: blockTypes.map((b) => b.slug), maxItems: 40 },
			},
		],
	},
	{
		slug: "posts",
		label: "News",
		labelSingular: "Post",
		icon: "newspaper",
		urlPattern: "/media/{slug}/",
		supports: ["drafts", "revisions", "preview", "scheduling", "seo", "search"],
		fields: [
			string("title", "Title", { required: true, searchable: true }),
			text("excerpt", "Summary (shown on cards and in search results)", { searchable: true }),
			image("featured_image", "Featured image"),
			{ slug: "content", label: "Content", type: "portableText", searchable: true },
			{
				slug: "external_url",
				label: "External article (press coverage: the post links straight to this URL)",
				type: "url",
			},
			{ slug: "featured", label: "Pin as the featured post at the top of the News page", type: "boolean", defaultValue: false },
		],
	},
	{
		slug: "policies",
		label: "Policies",
		labelSingular: "Policy",
		icon: "scales",
		urlPattern: "/policy/{slug}/",
		supports: ["drafts", "revisions", "preview", "seo", "search"],
		fields: [
			string("title", "Title", { required: true, searchable: true }),
			{ slug: "content", label: "Content", type: "portableText", searchable: true },
		],
	},
	{
		slug: "organizations",
		label: "Organisations",
		labelSingular: "Organisation",
		description: "Members, donors, sponsors and partners. The groups decide where the logo appears.",
		icon: "buildings",
		supports: ["drafts", "revisions"],
		fields: [
			string("title", "Name", { required: true }),
			image("logo", "Logo", { required: true }),
			{ slug: "groups", label: "Shown as", type: "multiSelect", validation: { options: ORGANIZATION_GROUPS } },
			{ slug: "website", label: "Website", type: "url" },
			string("joined", "Joined (e.g. November, 2021)"),
			text("bio", `About ${PARAGRAPHS}`),
			{ slug: "order", label: "Order (lower comes first)", type: "integer", defaultValue: 100 },
		],
	},
	{
		slug: "people",
		label: "People",
		labelSingular: "Person",
		description: "Board, staff and contributors. The groups decide where the person appears.",
		icon: "users-three",
		supports: ["drafts", "revisions"],
		fields: [
			string("title", "Name", { required: true }),
			string("role", "Role"),
			{ slug: "groups", label: "Shown in", type: "multiSelect", validation: { options: PEOPLE_GROUPS } },
			image("photo", "Photo"),
			text("bio", `Biography ${PARAGRAPHS}`),
			text("links", "Profile links shown as icons: one URL per line (LinkedIn, GitHub, Mastodon, X, Bluesky…)"),
			{ slug: "order", label: "Order (lower comes first)", type: "integer", defaultValue: 100 },
		],
	},
	{
		slug: "events",
		label: "Events",
		labelSingular: "Event",
		icon: "calendar",
		urlPattern: "/event/{slug}/",
		supports: ["drafts", "revisions", "preview", "seo", "search"],
		fields: [
			string("title", "Name", { required: true, searchable: true }),
			{ slug: "starts", label: "Starts (local time at the event)", type: "datetime", required: true },
			{ slug: "ends", label: "Ends (local time at the event)", type: "datetime" },
			string("location", "Location (e.g. Barcelona, Spain)"),
			select("category", "Our involvement", EVENT_CATEGORIES, "attending"),
			{ slug: "website", label: "Event website", type: "url" },
			string("organizer", "Organizer"),
			{ slug: "organizer_url", label: "Organizer website", type: "url" },
			image("image", "Banner image"),
			{ slug: "description", label: "Description", type: "portableText", searchable: true },
		],
	},
	{
		slug: "documents",
		label: "Documents",
		labelSingular: "Document",
		description: "Reports, board minutes, filings and other files.",
		icon: "file-pdf",
		supports: ["drafts", "revisions", "search"],
		fields: [
			string("title", "Title", { required: true, searchable: true }),
			select("category", "Category", DOCUMENT_CATEGORIES, "rust-foundation-reports"),
			{ slug: "file", label: "File", type: "file" },
			{ slug: "link", label: "…or a link instead of a file", type: "url" },
			text("summary", "Summary", { searchable: true }),
			{ slug: "date", label: "Date", type: "datetime" },
		],
	},
	{
		slug: "faqs",
		label: "FAQs",
		labelSingular: "FAQ",
		icon: "question",
		supports: ["drafts", "revisions", "search"],
		fields: [
			string("title", "Question", { required: true, searchable: true }),
			select("category", "Category", FAQ_CATEGORIES, "mission-purpose-leadership"),
			{ slug: "answer", label: "Answer", type: "portableText", searchable: true },
			{ slug: "order", label: "Order (lower comes first)", type: "integer", defaultValue: 100 },
		],
	},
];

const seed = {
	$schema: "https://emdashcms.com/seed.schema.json",
	version: "1",
	meta: {
		name: "Rust Foundation",
		description: "Content model for rustfoundation.org",
		author: "Rust Foundation",
	},
	settings: {
		title: "Rust Foundation",
		tagline:
			"The Rust Foundation is an independent, non-profit organization that provides the infrastructure, tooling, administration, & community-investment that the Rust programming language needs to grow and thrive.",
		postsPerPage: 12,
		dateFormat: "MMMM d, yyyy",
		seo: { titleSeparator: "–" },
	},
	blockTypes,
	collections,
	taxonomies: [
		{
			name: "tag",
			label: "Tags",
			labelSingular: "Tag",
			hierarchical: false,
			collections: ["posts"],
			terms: [],
		},
	],
	menus: [],
};

await writeFile(new URL("../seed/seed.json", import.meta.url), `${JSON.stringify(seed, null, "\t")}\n`);
console.log("Wrote seed/seed.json");
