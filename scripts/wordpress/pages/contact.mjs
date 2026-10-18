// Contact page: https://rustfoundation.org/contact/
export default async ({ richText }) => ({
	slug: "contact",
	title: "Contact",
	blocks: [
		{
			_type: "page_header",
			headline: "Contact",
			intro: "Our team always aims to reply to emails as soon as possible. We look forward to hearing from you!",
		},
		{
			_type: "rich_text",
			body: await richText(
				`<h2>General</h2>
<p>Please email general questions and comments to <a href="mailto:contact@rustfoundation.org">contact@rustfoundation.org</a>.</p>
<h2>Company Address</h2>
<p>While the Rust Foundation is a remote and globally distributed organization, you can use the following information if an address is required:</p>
<p>Rust Foundation</p>
<p>8 The Green, Suite # 11976</p>
<p>Dover, DE 19901 USA</p>
<h2>Media/Press</h2>
<p>If you are a member of the press and would like to get in touch with us about a story about the Rust programming language and/or the Rust Foundation, please email <a href="mailto:media@rustfoundation.org">media@rustfoundation.org</a>.</p>
<h2>Membership &amp; Donations</h2>
<p>Interested in becoming a member of the Rust Foundation or making a donation? Click <a href="/get-involved/">here</a>.</p>
<h2>RustConf</h2>
<p>Have a question about RustConf? Please visit <a href="https://rustconf.com">https://rustconf.com</a>.</p>
<h2>Rust Project</h2>
<p>Please note that the Rust Foundation generally will not answer technical questions on behalf of the Rust Project. To learn more about the Rust Project or to file a Rust language bug report, please visit <a href="https://rust-lang.org">rust-lang.org</a>.</p>
<h2>Website</h2>
<p>If you would like to contact us with a comment or concern about our website and its accessibility, please email us at <a href="mailto:website@rustfoundation.org">website@rustfoundation.org</a>. Our Accessibility Statement can be found <a href="/policy/web-content-accessibility-statement/">here</a>.</p>`,
			),
		},
		{
			_type: "link_list",
			headline: "Follow the Rust Foundation on social media:",
			links: [
				{ label: "LinkedIn", url: "https://www.linkedin.com/company/rust-foundation/" },
				{ label: "GitHub", url: "https://github.com/rustfoundation" },
				{ label: "Mastodon", url: "https://mastodon.social/@rustfoundation" },
				{ label: "Bluesky", url: "https://bsky.app/profile/rustfoundation.org" },
			],
		},
		{
			_type: "rich_text",
			body: await richText(
				`<p>Because the Rust Foundation is operated by a small team, we are not always able to keep up with comments and DMs on social media. If you need a response, we ask that you email us. We will follow up with you as soon as possible!</p>
<p><em>The Rust Foundation supports the <a href="https://github.com/rust-lang">Rust programming language</a> and community — we have no affiliation with the Rust multiplayer game.</em></p>`,
			),
		},
	],
});
