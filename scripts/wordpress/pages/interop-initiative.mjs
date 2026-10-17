// Interop Initiative: https://rustfoundation.org/interop-initiative/
export default async ({ richText }) => ({
	slug: "interop-initiative",
	title: "Interop Initiative",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust-C++ Interoperability Initiative",
			intro:
				"In 2024, Rust Foundation Platinum Member Google generously contributed $1M USD to help the Rust Foundation improve the state of interoperability between the Rust and C++ programming languages. Meaningful work on this Interop Initiative has begun. Updates will be shared here and through our blog.",
			jump_links: [
				{ label: "About", url: "#about" },
				{ label: "News", url: "#news" },
				{ label: "Press", url: "#press" },
				{ label: "Get Involved", url: "#get-involved" },
			],
			buttons: [{ label: "Blog", url: "/media/category/blog/" }],
		},
		{
			_type: "quotes",
			items: [
				{
					quote: "“Despite the growing popularity and adoption of Rust, it would be unrealistic to expect even the most technically advanced organization to easily pivot to Rust and away from the architecture of existing codebases. The Rust Foundation wants to help address this need in a harmonious and methodical way.”",
					name: "Dr. Rebecca Rumbul",
					role: "Executive Director & CEO of the Rust Foundation",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "about",
			body: await richText(
				`<p>As the steward of the Rust programming language and its global community, the Rust Foundation believes that Rust offers critical advantages that can help the world achieve a safer, more secure, and sustainable technical future. But for organizations with millions of lines of C++ in a flagship product, rewriting that code in Rust within a reasonable timeframe may not be practical due to a myriad of business-related or technical factors.</p>
<p>To aid in our effort, the Foundation has engaged <a href="https://github.com/teor2345">Teor</a> as a contractor to help advance the initiative in collaboration with the Rust Project and ecosystem stakeholders. Their work includes making concrete progress on the Rust/C++ Interop Problem Space Mapping <a href="https://rust-lang.github.io/rust-project-goals/2026/interop-problem-map.html">goal</a>, facilitating discussions across communities, and helping coordinate technical efforts.</p>
<p>With the support of Google, the Rust Foundation created its Interop Initiative to make the decision and process of investing in Rust smoother for organizations across the globe that are invested in C++.</p>`,
			),
			width: "wide",
		},
		{
			_type: "logo_wall",
			headline: "Supported by:",
			source: "interop-supporter",
		},
		{
			_type: "rich_text",
			headline: "Rust/C++ Interoperability Problem Statement",
			body: await richText(
				`<p>In November 2024, we released a Rust/C++ interoperability problem statement, which lays out a strategic vision for improving language interoperability and calls for community input.</p>
<p>The problem statement outlines three key strategic approaches:</p>
<ul>
<li>Improve existing tools and address tactical issues within the Rust Project to reduce interoperability friction and risk in the short term.</li>
<li>Build consensus around long-term goals requiring changes to Rust itself and develop the tactical approaches to begin pursuing them.</li>
<li>Engage with the C++ community and committee to improve the quality of interoperation for both languages to help realize the mutual goals of safety and performance.</li>
</ul>
<p><a href="/media/rust-foundation-releases-problem-statement-on-c-rust-interoperability/">Read Announcement</a> · <a href="https://github.com/rustfoundation/interop-initiative/blob/main/problem-statement.md">Read Problem Statement</a> · <a href="https://rust-lang.zulipchat.com/#narrow/stream/427678-t-lang.2Finterop">Join Discussion in Zulip</a></p>`,
			),
			background: "navy",
			width: "wide",
		},
		{
			_type: "post_cards",
			anchor_id: "news",
			headline: "Rust/C++ Interoperability Initiative News",
			// Hand-picked, as on the old site.
			posts: "/media/rust-cpp-interop-initiative-progress-update/\n/media/experimenting-with-function-overloading-in-rust-why-it-matters/\n/media/rust-foundation-interop-initiative-update-from-research-to-implementation/\n/media/google-contributes-1m-to-rust-foundation-to-support-c-rust-interop-initiative/",
		},
		{
			_type: "post_cards",
			anchor_id: "press",
			headline: "Recent Press",
			category: "press",
			tag: "interop-initiative",
			count: 6,
		},
		{
			_type: "statement",
			anchor_id: "get-involved",
			text: "Have a question about the Interop Initiative? Interested in supporting this work? Email us at interop@rustfoundation.org to start a conversation.",
			buttons: [{ label: "interop@rustfoundation.org", url: "mailto:interop@rustfoundation.org" }],
			background: "white",
		},
	],
});
