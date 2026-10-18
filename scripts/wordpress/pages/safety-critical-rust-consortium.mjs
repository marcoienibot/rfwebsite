// Safety-Critical Rust Consortium: https://rustfoundation.org/safety-critical-rust-consortium/
export default async ({ richText }) => ({
	slug: "safety-critical-rust-consortium",
	title: "Safety-Critical Rust Consortium",
	blocks: [
		{
			_type: "page_header",
			headline: "Safety-Critical Rust Consortium",
			intro:
				"The Rust Foundation partnered with 10 founding organizations and member companies in June 2024 to create the Safety-Critical Rust Consortium — a group dedicated to supporting the responsible use of the Rust programming language in safety-critical software. Learn more about the consortium and stay tuned for updates here.",
			jump_links: [
				{ label: "Learn More", url: "#learn-more" },
				{ label: "Members", url: "#members" },
				{ label: "Get Involved", url: "#get-involved" },
			],
		},
		{
			_type: "rich_text",
			headline: "Our world relies on complex systems and software whose failure can have grave consequences.",
			body: await richText(
				"<p>The Rust Foundation and its partners in the Safety-Critical Rust Consortium are committed to the responsible use of the Rust programming language in safety-critical software to avoid devastating harm to human life, property, and the environment we live in.</p><p>The Consortium’s scope will be fully delineated in the upcoming charter, but may include the development of guidelines, linters, libraries, static analysis tools, formal methods and language subsets to meet industrial and legal requirements. The Consortium’s deliverables will be developed and licensed in a manner compatible with other Rust Project endeavors.</p>",
			),
			width: "wide",
		},
		{
			_type: "post_cards",
			anchor_id: "learn-more",
			headline: "Learn more:",
			posts: "/media/announcing-the-safety-critical-rust-consortium/",
		},
		{
			_type: "logo_wall",
			anchor_id: "members",
			headline: "Founding Members",
			text: "The Rust Foundation is pleased to partner with the following founding members of the Safety-Critical Rust Consortium…",
			source: "scrc-founder",
		},
		{
			_type: "rich_text",
			anchor_id: "get-involved",
			body: await richText(
				`<p>Safety-Critical Rust Consortium Membership is open to Rust Foundation member organizations and other invitees, such as industry, academic, and legal experts.</p>
<p>Interested in joining or supporting this program? Membership is free. Please <a href="https://github.com/rustfoundation/safety-critical-rust-consortium?tab=readme-ov-file#consortium-membership">visit GitHub</a> to learn more and <a href="https://github.com/rustfoundation/safety-critical-rust-consortium/issues/new?assignees=joelmarcey&amp;labels=membership%2Cstatus%3A+needs+review&amp;projects=&amp;template=membership.yml">file this issue</a> to submit your membership application.</p>`,
			),
			width: "wide",
		},
	],
});
