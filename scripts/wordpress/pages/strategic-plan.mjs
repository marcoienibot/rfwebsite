// Strategic Plan page: https://rustfoundation.org/strategic-plan/
export default async ({ richText }) => ({
	slug: "strategic-plan",
	title: "Rust Foundation Strategic Plan: 2026-2028",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Foundation Strategic Plan: 2026-2028",
			intro:
				"A three-year plan to strengthen Rust’s infrastructure, sustain its maintainers, grow adoption, and empower the global community.",
			jump_links: [
				{ label: "Pillars", url: "#pillars" },
				{ label: "Vision/Mission", url: "#vision" },
				{ label: "Activity Breakdown", url: "#breakdown" },
				{ label: "Direction", url: "#direction" },
				{ label: "Support", url: "#support" },
			],
		},
		{
			_type: "cards",
			anchor_id: "pillars",
			headline: "Core Strategic Pillars:",
			style: "plain",
			cards: [
				{ title: "Stable Infrastructure", url: "#infra" },
				{ title: "Sustainable Maintenance", url: "#maintenance" },
				{ title: "Adoption & Innovation", url: "#innovation" },
				{ title: "Maximizing Membership", url: "#membership" },
				{ title: "Empowering the Community", url: "#community" },
			],
		},
		{
			_type: "statement",
			anchor_id: "vision",
			label: "OUR VISION",
			text: "is for critical software systems around the world to be more secure, efficient, and reliable through the power of Rust.",
			background: "navy",
		},
		{
			_type: "statement",
			anchor_id: "mission",
			label: "OUR MISSION",
			text: "is to steward the Rust programming language and its global community.\n\nTo achieve this, it is essential that:\n\n• Rust is universally considered a safe, secure, and sustainable language, and trusted by individuals, organizations, and governments\n\n• There is a well-resourced, well-supported, inclusive, and diverse community of people who maintain, support, and develop Rust and associated initiatives.\n\n• The adoption and use of Rust continues to grow, with the development of the language, projects, interoperability, and infrastructure evolving and scaling to meet demand and power innovation.\n\n• The governments, organizations, and companies that benefit most from the Rust language actively invest in its ongoing maintenance, its future development, and cross-industry adoption.\n\n• The Rust Foundation is recognised as a prominent, transparent, and proactive OSS not-for-profit organization that expertly drives strategic investment in the Rust language to ensure its stability, versatility, and continuity.\n\n• The Rust Foundation continues to build a skilled and trusted staff whose expertise strengthens the Rust Project and community.",
			background: "navy",
		},
		{
			_type: "rich_text",
			anchor_id: "breakdown",
			headline: "Activity Breakdown",
			body: await richText(
				"<p>To meet these conditions, the Rust Foundation has designed five pillars of strategic action that will guide its financial and resource investment decisions over the period January 2026 - December 2028: Stable Infrastructure, Sustainable Maintenance, Adoption &amp; Innovation, Maintaining Membership, &amp; Empowering the Community. Learn more about each below.</p>",
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "infra",
			headline: "Stable Infrastructure",
			body: await richText(
				`<p>VISION: The infrastructure that underpins Rust’s development and distribution continues to be secure, reliable, efficient, and scalable. At End 2028: We’ve met or exceeded industry standards for supply chain security and have diversified sources of funding and years of runway.</p>
<p>KEY ACTIVITIES: Maintain, upgrade, and secure infrastructure; partner with community teams; invest in reliability engineering and modernization; strengthen security and compliance; measure/report on infra performance; build partnerships for in-kind support; develop sustainability plans for <a href="https://crates.io">crates.io</a> and release downloads; implement best-practice security, including OpenSSF principles, resolving threat model findings, signed crates, and official mirrors.</p>`,
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "maintenance",
			headline: "Sustainable Maintenance",
			body: await richText(
				`<p>VISION: Rust maintainers are recognized, supported, and resourced. At End 2028: A durable model exists that sustains and recognizes the people who maintain and evolve Rust.</p>
<p>KEY ACTIVITIES: Implement funding models for ongoing maintenance; support maintainers with grants/stipends; create transparent criteria for support; align with Rust Project on priorities and governance; develop contributor→maintainer pathways; build industry pathways to reduce maintainer burden; communicate impact of maintenance funding; align Foundation technology strategy with Project goals; support under-resourced core crate owners.</p>`,
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "innovation",
			headline: "Adoption & Innovation",
			body: await richText(
				`<p>VISION: Rust adoption grows across industries with continuous innovation. At End 2028: Rust adoption continues to grow, driven by industry Rust innovation and new applications of Rust.</p>
<p>KEY ACTIVITIES: Incubate high-potential projects via Innovation Lab; support the Specification WG; showcase adoption/innovation via RustConf and Rust Global; partner on case studies and thought leadership; form a global Rust User Group; collaborate with C++ community on safe interop; embrace relevant technology trends, positioning Rust as a first-class solution.</p>`,
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "membership",
			headline: "Maximising Membership",
			body: await richText(
				`<p>VISION: More engaged and supportive members. At End 2028: Membership income grows 10% and engagement sustains collaboration.</p>
<p>KEY ACTIVITIES: Develop tier-specific engagement programs; pilot annual Member Summit and roundtables; align sponsorships with measurable outcomes; increase access to Foundation engineering staff.</p>`,
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "community",
			headline: "Empowering the Community",
			body: await richText(
				`<p>VISION: Rust communities are empowered to learn, meet, and collaborate. At End 2028: Global communities strengthened through resources, visibility, and opportunities to connect.</p>
<p>KEY ACTIVITIES: Support vertical/regional events like Rust Global; amplify local leadership; use consistent branding; highlight achievements through storytelling and recognition.</p>`,
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "direction",
			headline: "Direction",
			body: await richText(
				`<p>These strategic pillars are supported by the Rust Foundation’s commitment to serving as a strong, competent, and compliant organization.</p>
<p>The Rust Foundation will continue to support and develop a capable, trusted, and influential staff team whose expertise strengthens the Rust Project and supports the global Rust ecosystem, ensuring that the Rust Foundation:</p>
<ul>
<li>Is solvent, legally compliant, and demonstrates excellence in financial and organizational planning and delivery</li>
<li>Can support growth in internal expertise in key areas of need, including engineering, program delivery, and ecosystem development.</li>
<li>Identifies and pursues opportunities to improve its financial sustainability.</li>
<li>Maintains a healthy, values-driven culture that supports staff to work confidently and competently.</li>
<li>Demonstrates its impact on members, partners, and the community through clear storytelling and reporting.</li>
</ul>`,
			),
			background: "teal",
			width: "wide",
		},
		{
			_type: "cta",
			anchor_id: "support",
			headline: "Interested in supporting the work described in this strategy?",
			buttons: [{ label: "Get Involved", url: "/get-involved/" }],
			background: "teal",
		},
	],
});
