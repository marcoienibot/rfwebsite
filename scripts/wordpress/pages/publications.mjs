// Publications: https://rustfoundation.org/publications/
export default async () => ({
	slug: "publications",
	title: "Publications",
	blocks: [
		{
			_type: "page_header",
			headline: "Publications",
			intro: "Published reports from the Rust Foundation.",
		},
		// The live page shows these three document categories mixed in one grid.
		{
			_type: "documents",
			headline: "Rust Foundation Reports",
			category: "rust-foundation-reports",
			style: "cards",
			count: 0,
		},
		{
			_type: "documents",
			headline: "Year In Review",
			category: "year-in-review",
			style: "cards",
			count: 0,
		},
		{
			_type: "documents",
			headline: "Partnered Publications",
			category: "partnered-publications",
			style: "cards",
			count: 0,
		},
		{
			_type: "cards",
			headline: "Looking for...",
			style: "plain",
			cards: [
				{
					title: "Official news from the Rust Foundation?",
					url: "/media/category/news/",
					link_label: "Visit News Page",
				},
				{
					title: "Press clips mentioning the Rust Foundation?",
					url: "/media/category/press/",
					link_label: "Visit Press Page",
				},
				{
					title: "Board minutes, tax filings, or policy documents?",
					url: "/policies-resources/",
					link_label: "Visit Resource Hub",
				},
			],
		},
	],
});
