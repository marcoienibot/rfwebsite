// FAQ page: https://rustfoundation.org/faq/
// The questions and answers live in the FAQs collection; each block shows one category.
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "faq",
	title: "General FAQ",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Foundation FAQs",
			intro:
				"Below, you will find some of the most frequently asked questions we hear about the Rust Foundation. Scroll through or use the jump-to buttons below to self-select your category of interest:",
			jump_links: [
				{ label: "Mission, Purpose, & Leadership", url: "#mission-purpose-leadership" },
				{ label: "Definitions", url: "#definitions" },
				{ label: "Finance, Funding, & Membership", url: "#finance-funding-membership" },
				{ label: "Legal & Admin", url: "#legal-admin" },
				{ label: "Decision-Making & Collaboration", url: "#decision-making-collaboration" },
				{ label: "Transparency & Communication", url: "#transparency-communication" },
				{ label: "Initiatives", url: "#initiatives-faq" },
			],
		},
		{
			_type: "photo",
			image: await image(`${U}/2024/01/foundation-faq.jpg`, "Network of connected lights over a world map at night"),
		},
		{
			_type: "faq",
			anchor_id: "mission-purpose-leadership",
			headline: "Mission, Purpose, & Leadership",
			category: "mission-purpose-leadership",
			background: "white",
		},
		{
			_type: "faq",
			anchor_id: "definitions",
			headline: "Definitions",
			category: "definitions",
			background: "light",
		},
		{
			_type: "faq",
			anchor_id: "finance-funding-membership",
			headline: "Finance, Funding, & Membership",
			category: "finance-funding-membership",
			background: "white",
		},
		{
			_type: "faq",
			anchor_id: "legal-admin",
			headline: "Legal & Administrative Information",
			category: "legal-administrative",
			background: "light",
		},
		{
			_type: "faq",
			anchor_id: "decision-making-collaboration",
			headline: "Decision-Making & Collaboration",
			category: "decision-making-collaboration",
			background: "white",
		},
		{
			_type: "faq",
			anchor_id: "transparency-communication",
			headline: "Transparency & Communication",
			category: "transparency-communication",
			background: "light",
		},
		{
			_type: "faq",
			anchor_id: "initiatives-faq",
			headline: "Initiatives",
			category: "initiatives",
			background: "white",
		},
		{
			_type: "rich_text",
			headline: "Other Questions?",
			body: await richText(
				`<p>If you have another question that we have not addressed here or if you would like to contact us for any other reason, please feel free to reach out to our team at <a href="mailto:contact@rustfoundation.org">contact@rustfoundation.org</a>.</p>`,
			),
			background: "light",
		},
	],
});
