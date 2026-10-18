// News header (the old site's Media Room): https://rustfoundation.org/media/
// Only the editable introduction; the post listing below it comes from the
// /media/ template. The old site split posts into News, Blog and Press; here
// they are one list.
export default async () => ({
	slug: "media",
	title: "News",
	blocks: [
		{
			_type: "page_header",
			headline: "News",
			intro: "Learn more about the Rust Foundation’s initiatives, areas of focus, and priorities as an organization.",
		},
	],
});
