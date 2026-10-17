// Media Room header: https://rustfoundation.org/media/
// Only the editable introduction; the post listing below it comes from the
// /media/ template.
export default async () => ({
	slug: "media",
	title: "Media Room",
	blocks: [
		{
			_type: "page_header",
			headline: "Media Room",
			intro:
				"Learn more about the Rust Foundation’s initiatives, areas of focus, and priorities as an organization through recent announcements, blogs, media pieces, and publications.",
			buttons: [
				{ label: "News", url: "/media/category/news/" },
				{ label: "Blog", url: "/media/category/blog/" },
				{ label: "Press", url: "/media/category/press/" },
				{ label: "Publications", url: "/publications/" },
			],
		},
	],
});
