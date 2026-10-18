// Navigation menus, as on rustfoundation.org (broken links fixed).
const link = (label, url, extra = {}) => ({ type: "custom", label, url, ...extra });

export const menus = [
	{
		name: "announcement",
		label: "Announcement bar (the first link is shown above the header)",
		items: [link("Help Fund the Maintainers Behind Rust", "/media/help-fund-the-people-who-build-rust/")],
	},
	{
		name: "header",
		label: "Header buttons",
		items: [link("About", "/about/"), link("Get Involved", "/get-involved/")],
	},
	{
		name: "primary",
		label: "Main menu (each top-level item is a column; CSS class “button” makes it an orange button)",
		items: [
			{
				...link("About", "/about/"),
				children: [
					link("Mission & Strategy", "/about/#mission-and-priorities"),
					link("Our Members", "/members/"),
					link("Team", "/about/#our-team"),
					link("Policies & Resources", "/policies-resources/"),
					link("Careers", "/careers/"),
				],
			},
			{
				...link("Initiatives", "/initiatives/"),
				children: [
					link("All Initiatives", "/initiatives/"),
					link("Rust Innovation Lab", "/rust-innovation-lab/"),
					link("Security Initiative", "/security-initiative/"),
					link("Interop Initiative", "/interop-initiative/"),
					link("Infrastructure Support", "/infrastructure/"),
					link("Rust Foundation Trusted Training", "/rust-foundation-trusted-training/"),
				],
			},
			{
				...link("Rust Community", "/community/"),
				children: [
					link("Commitments", "/community/#commitments"),
					link("Rust Project Support", "/project-support/"),
					link("Rust Commercial Network", "/rust-commercial-network/"),
					link("Events", "/events/"),
				],
			},
			{
				...link("Media", "/media/"),
				children: [
					link("News", "/media/category/news/"),
					link("Blog", "/media/category/blog/"),
					link("Press", "/media/category/press/"),
					link("Publications", "/publications/"),
				],
			},
			{
				...link("Get Involved", "/get-involved/", { cssClasses: "button" }),
				children: [link("Contact", "/contact/"), link(">> Rust Language Repository", "https://github.com/rust-lang/rust")],
			},
		],
	},
	{
		name: "footer",
		label: "Footer links",
		items: [
			link("About", "/about/"),
			link("Membership & Donations", "/get-involved/"),
			link("News", "/media/category/news/"),
			link("Blog", "/media/category/blog/"),
			link("Press", "/media/category/press/"),
			link("Publications", "/publications/"),
			link("Events", "/events/"),
			link("Community Resources", "/community/"),
			link("Brand Guide", "/brand-guide/"),
			link("Careers", "/careers/"),
			link("Contact", "/contact/"),
		],
	},
	{
		name: "footer_legal",
		label: "Footer policy links",
		items: [
			link("Accessibility Statement", "/policy/web-content-accessibility-statement/"),
			link("Anti-Bribery and Anti-Corruption Policy", "/policy/anti-bribery-and-anti-corruption-policy/"),
			link("Anti-Trust Policy", "/policy/anti-trust-policy/"),
			link("Bylaws", "/policy/bylaws/"),
			link("Code of Conduct", "/policy/code-of-conduct/"),
			link("Donation Acceptance Policy", "/policy/donation-acceptance-policy/"),
			link("Privacy Policy", "/policy/privacy-policy/"),
			link(">> More Policies & Resources", "/policies-resources/"),
		],
	},
	{
		name: "social",
		label: "Social links (footer icons)",
		items: [
			link("LinkedIn", "https://www.linkedin.com/company/rust-foundation"),
			link("Bluesky", "https://bsky.app/profile/rustfoundation.org"),
			link("Mastodon", "https://mastodon.social/@rustfoundation"),
			link("GitHub", "https://github.com/rustfoundation"),
			link("YouTube", "https://www.youtube.com/@rustfoundation"),
		],
	},
];
