// Policies & Resources: https://rustfoundation.org/policies-resources/
export default async () => ({
	slug: "policies-resources",
	title: "Policies & Resources",
	blocks: [
		{
			_type: "page_header",
			headline: "Policies & Resources",
			intro: "A collection of informative Rust Foundation policies, resources, & references.",
			jump_links: [
				{ label: "Policies", url: "#policies" },
				{ label: "Informational Resources", url: "#resources" },
				{ label: "Board Meeting Minutes", url: "#minutes" },
				{ label: "Financial Filings", url: "#filings" },
			],
		},
		{
			_type: "policies",
			anchor_id: "policies",
			headline: "Policies",
		},
		{
			_type: "documents",
			anchor_id: "resources",
			headline: "Informational Resources",
			category: "informational-resources",
			style: "cards",
			count: 0,
		},
		// The live "Informational Resources" carousel also has a Brand Guide card,
		// which is a page rather than a document.
		{
			_type: "cards",
			style: "boxed",
			cards: [{ title: "Rust Foundation Brand Guide", url: "/brand-guide/", link_label: "Learn more" }],
		},
		{
			_type: "documents",
			anchor_id: "minutes",
			headline: "Board Meeting Minutes",
			text: "Minutes from Rust Foundation Board of Directors meetings are available below. The board typically meets on the second Tuesday of each month.\n\nMinutes from the previous month are ratified at the beginning of each meeting and then published here.",
			category: "board-meeting-minutes",
			style: "list",
			count: 0,
		},
		{
			_type: "documents",
			anchor_id: "filings",
			headline: "Financial Filings",
			category: "financial-filings",
			style: "cards",
			count: 0,
		},
	],
});
