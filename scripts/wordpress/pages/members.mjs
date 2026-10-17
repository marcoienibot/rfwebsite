// Members page: https://rustfoundation.org/members/
export default async () => ({
	slug: "members",
	title: "Our Members",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Foundation Members",
			intro:
				"Rust Foundation members directly support our mission of stewarding the Rust programming language and providing critical support to the Rust Project and the wider Rust community. Membership tiers include Platinum, Gold, Silver, and Associate in descending order of investment.\n\nTo learn more about our members, click on their logos below.",
			// The tier sections of the members directory have the ids platinum, gold, silver and associate.
			jump_links: [
				{ label: "Platinum", url: "#platinum" },
				{ label: "Gold", url: "#gold" },
				{ label: "Silver", url: "#silver" },
				{ label: "Associate", url: "#associate" },
			],
			buttons: [{ label: "Become a Member", url: "/get-involved/" }],
		},
		{
			_type: "members_directory",
			buttons: [
				{ label: "Explore Membership", url: "/get-involved/" },
				{ label: "Other Partnership Opportunities", url: "/get-involved/#donations" },
			],
		},
		{
			_type: "post_cards",
			anchor_id: "stories",
			headline: "Member Stories",
			category: "all",
			tag: "member-announcements",
			count: 4,
			background: "teal",
		},
		{
			_type: "logo_wall",
			headline: "Open Source Partnerships",
			text: "The Rust Foundation is proud to be an associate member of the following organizations that share our vision for open collaboration and a resilient software ecosystem:",
			source: "open-source-partnership",
		},
	],
});
