// Home page: https://rustfoundation.org/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image }) => ({
	slug: "home",
	title: "Home",
	blocks: [
		{
			_type: "page_header",
			headline: "Investing in the success, sustainability, and positive impact of Rust.",
			intro:
				"THE RUST FOUNDATION is an independent nonprofit committed to a safe, secure, and sustainable future powered by the Rust programming language.\n\nWe believe that investing in the global open-source community is essential to maintaining a healthy and performant technological ecosystem – for individuals and organizations alike.",
			icon: await image(`${U}/2025/01/Untitled-design-1.png`, "Rust Foundation emblem"),
			jump_links: [
				{ label: "Initiatives", url: "#initiatives" },
				{ label: "Community Resources", url: "#community-resources" },
				{ label: "Get Involved", url: "#get-involved" },
			],
		},
		{
			_type: "feature_band",
			anchor_id: "initiatives",
			color: "teal",
			image_side: "right",
			headline: "Explore Our Work",
			text: "The Rust Foundation initiatives support the infrastructure, maintenance, and innovation, of the Rust programming language.",
			button_label: "Browse Initiatives",
			button_url: "/initiatives/",
			image: await image(`${U}/2024/09/explore-1.png`, "Binoculars icon"),
		},
		{
			_type: "feature_band",
			anchor_id: "community-resources",
			color: "navy",
			image_side: "left",
			headline: "See Our Impact",
			text: "The Rust ecosystem is complex, multifaceted, and growing every day. Explore how we help nurture the dynamic, open source community surrounding the Rust programming language.",
			button_label: "Visit Community Hub",
			button_url: "/community/",
			image: await image(`${U}/2024/09/impact-1.png`, "Seedling icon"),
		},
		{
			_type: "feature_band",
			anchor_id: "get-involved",
			color: "slate",
			image_side: "right",
			headline: "Get Involved",
			text: "The Rust Foundation’s members and donors are key to our mission. Together, we help keep the Rust programming language running and expand its access to users and organizations across the world. We also offer free opportunities to collaborate with other organizations invested in Rust, a project hosting program, and more.",
			button_label: "Explore Membership, Support, & Collaboration",
			button_url: "/get-involved/",
			image: await image(`${U}/2024/09/involved.png`, "Globe with a cursor icon"),
		},
		{
			_type: "logo_wall",
			headline: "Our members believe in the power of Rust.",
			source: "platinum",
		},
		{ _type: "logo_wall", source: "gold" },
		{
			_type: "logo_wall",
			source: "silver",
			layout: "carousel",
			buttons: [{ label: "Browse Full Membership Base", url: "/members/" }],
		},
		{
			_type: "video",
			headline: "Why become a member?",
			url: "https://www.youtube.com/watch?v=WSNKISHx8bw",
		},
		{
			_type: "cta",
			headline: "Support a safe, secure, and sustainable future for Rust",
			buttons: [{ label: "Learn More About Membership", url: "/get-involved/#membership-info" }],
			background_image: await image(`${U}/2024/09/RustConf-2024-Montreal-Day-1-31.jpg`, "RustConf 2024 audience"),
		},
		{
			_type: "photo",
			image: await image(`${U}/2024/12/54021494051_75278bbb9d_o.jpg`, "Speaker on stage at a Rust event"),
		},
		{
			_type: "link_list",
			headline: "More about the Rust Foundation:",
			links: [
				{ label: "About", url: "/about/" },
				{ label: "News", url: "/media/category/news/" },
				{ label: "Blog", url: "/media/category/blog/" },
				{ label: "Press", url: "/media/category/press/" },
				{ label: "Publications", url: "/publications/" },
				{ label: "Careers", url: "/careers/" },
				{ label: "Policies & Resources", url: "/policies-resources/" },
				{ label: "Contact", url: "/contact/" },
			],
		},
	],
});
