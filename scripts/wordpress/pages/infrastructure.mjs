// Infrastructure Support: https://rustfoundation.org/infrastructure/
export default async ({ richText }) => ({
	slug: "infrastructure",
	title: "Infrastructure Support",
	blocks: [
		{
			_type: "page_header",
			headline: "Infrastructure Support at the Rust Foundation",
			intro:
				"One of the key pillars of the Rust Foundation’s mission is to provide robust infrastructure support to the Rust Project and community, particularly as the popularity and use of Rust continues to rise. In doing so, we help ensure that the infrastructure of Rust and related projects is reliable, efficient, productive, and secure.",
			jump_links: [
				{ label: "About", url: "#about-infra" },
				{ label: "Team", url: "#infra-team" },
				{ label: "Video", url: "#video" },
				{ label: "Donors", url: "#infra-donors" },
				{ label: "Stories", url: "#infra-stories" },
				{ label: "Contact", url: "#infra-contact" },
			],
		},
		{
			_type: "rich_text",
			anchor_id: "about-infra",
			headline: "Rust is one of the fastest-growing programming languages available today.",
			body: await richText(
				"<p>This growth is associated with infrastructure challenges and consequences that the Rust Foundation helps address through infrastructure support initiatives.</p><p>Our mission-critical Rust infrastructure work is made possible by our team’s infrastructure engineers, their collaborators within the Rust Project, and generous infrastructure donations from the organizations listed below.</p>",
			),
			width: "wide",
		},
		{
			_type: "people_grid",
			anchor_id: "infra-team",
			headline: "Key Contributors",
			text: "The following team members help direct and carry out the Rust Foundation’s infrastructure contributions to the Rust language ecosystem. They remain in constant collaboration with the Rust Project’s Infrastructure Team.",
			group: "infrastructure-contributors",
		},
		{
			_type: "rich_text",
			anchor_id: "video",
			headline: "What it Takes to Keep Rust Running",
			body: await richText(
				"<p>Learn more about the infrastructure requirements of Rust in this recording of Jan David Nose’s talk at Rust Nation UK 2024:</p>",
			),
		},
		{
			_type: "video",
			url: "https://www.youtube.com/watch?v=GnLZMJ2r7sk",
		},
		{
			_type: "logo_wall",
			anchor_id: "infra-donors",
			headline: "Donors",
			text: "The following organizations have generously donated in-kind infrastructure services to the Rust Foundation. Our Technology Team is grateful for the benefits they provide to the Foundation and Rust ecosystem:",
			source: "infrastructure-donor",
		},
		{
			_type: "post_cards",
			anchor_id: "infra-stories",
			headline: "Related Stories",
			category: "all",
			tag: "infrastructure",
			count: 4,
		},
		{
			_type: "cta",
			anchor_id: "infra-contact",
			headline: "Contact",
			text: "Interested in supporting the Rust Foundation’s infrastructure efforts? Get in touch with us via email at contact@rustfoundation.org today!",
			buttons: [{ label: "contact@rustfoundation.org", url: "mailto:contact@rustfoundation.org" }],
			background: "white",
		},
	],
});
