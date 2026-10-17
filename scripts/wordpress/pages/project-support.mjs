// Rust Project Support: https://rustfoundation.org/project-support/
export default async ({ richText }) => ({
	slug: "project-support",
	title: "Rust Project Support",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Project Support",
			intro:
				"Good software is built by happy, well-supported people. The Rust Foundation is proud to help further the development and innovation of Rust through financial, administrative, and career-development opportunities for the people behind the language.",
		},
		{
			_type: "rich_text",
			anchor_id: "donate",
			headline: "Maintainers Fund",
			body: await richText(`
				<p>In November 2025, we announced the Rust Foundation Maintainers Fund. To learn more about this initiative and discover how you can support our effort to support the hardworking maintainers powering Rust, please read <a href="/media/announcing-the-rust-foundation-maintainers-fund/">the program announcement</a>.</p>
			`),
		},
		{
			_type: "rich_text",
			headline: "Donations",
			body: await richText(`
				<p>If your organization is interested in supporting the hardworking maintainers of Rust, please <a href="/contact/">contact us</a>. Donations in any amount are greatly appreciated. Learn more about funding the Rust Project at <a href="https://rust-lang.org/funding/">rust-lang.org/funding</a></p>
				<p>You can also support Rust Project maintainers through our <a href="https://github.com/sponsors/rustfoundation">GitHub Sponsors page</a>.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "other-questions",
			headline: "Other Questions?",
			body: await richText(`
				<p>If you’d like to get in touch with us about supporting a particular Rust community program or initiative, please <a href="/contact/">contact us</a>.</p>
			`),
		},
	],
});
