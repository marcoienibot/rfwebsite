// Rust Community: https://rustfoundation.org/community/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "community",
	title: "Rust Community",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Community",
			intro:
				"The Rust community and Project are central to the Rust Foundation’s mission. Below, you’ll find more information about how the Rust community drives everything we do.",
			jump_links: [
				{ label: "Commitments", url: "#commitments" },
				{ label: "Rust Representation", url: "#representation" },
				{ label: "Initiatives", url: "#community-initiatives" },
				{ label: "Training", url: "#training" },
				{ label: "Contact", url: "#contact" },
			],
		},
		{
			_type: "rich_text",
			anchor_id: "commitments",
			headline: "Rust Community Commitments",
			body: await richText(`
				<p>As an independent nonprofit steward of the Rust programming language and ecosystem, the Rust Foundation is committed to...</p>
				<ul>
					<li>Remaining dedicated to prioritizing the needs and interests of the Rust community.</li>
					<li>Upholding bylaws that represent the Rust Project and community.</li>
					<li>Weighing Rust Foundation Project Director perspectives and opinions in equal measure to those of Rust Foundation members in board decisions</li>
					<li>Consulting with Rust Foundation Project Directors about relevant community and Project matters in and outside of board meetings.</li>
					<li>Remaining accessible to the Rust Project’s Leadership Council and their feedback/questions/comments.</li>
					<li>Striving for utmost transparency in all key Foundation decisions and activities.</li>
					<li>Enabling Project Directors to act as dedicated representatives for the wider Rust community and Project</li>
					<li>Enabling Project Directors to liaise between the Rust Foundation, Project, and community members</li>
					<li>Enabling Project Directors to serve as key points of contact for community-related matters</li>
				</ul>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "representation",
			headline: "Rust Community Representation",
			body: await richText(`
				<p>Rust Foundation “Project Directors” are elected representatives of the Rust Project and community on our board of directors, serving two-year terms.</p>
				<p>Project Directors attend all board meetings where they vote on Foundation measures, raise Project topics for discussion, and lend a critical Rust Project/community perspective to all board discussions. Project Directors may volunteer to serve on board sub-committees centered around important Foundation-community topics that require focused discussion.</p>
				<p>Outside of board meetings, Rust Foundation Project Directors participate in bi-weekly discussions with Foundation staff and together serve as a liaison and point of contact between the Rust Project and the Rust Foundation.</p>
				<p>You can view the Rust Foundation’s current Project Directors on our <a href="/about/">About</a> page.</p>
			`),
		},
		{
			_type: "link_list",
			links: [
				{
					label: "Board Director Roles & Responsibilities",
					url: await file(`${U}/2023/12/board-director-role-description.pdf`),
				},
				{
					label: "Rust Project Director Election Process",
					url: "https://blog.rust-lang.org/2023/08/30/electing-new-project-directors.html",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "community-initiatives",
			headline: "Community Initiatives",
			background: "blush",
		},
		{
			_type: "feature_band",
			color: "navy",
			image_side: "right",
			headline: "Rust Project Support",
			text: "The Rust Foundation offers financial awards and benefits to Rust Project contributors, maintainers, groups, community organizers, and community members facing hardship.",
			button_label: "Learn More",
			button_url: "/project-support/",
			image: await image(`${U}/2024/01/community-grants.png`, "Ferris the crab holding a card with a heart icon"),
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "left",
			headline: "Cloud Compute Program",
			text: "The Rust Foundation’s initiative to provide free cloud compute to Rust maintainers around the world",
			button_label: "Learn More",
			button_url: "/cloud-compute-program/",
			image: await image(`${U}/2024/01/project-grant.png`, "Ferris the crab with lightbulb icon"),
		},
		{
			_type: "feature_band",
			anchor_id: "training",
			color: "slate",
			image_side: "right",
			headline: "Training",
			text: "The Rust Foundation offers a “Trusted Training Program”: the first formal accreditation and quality recognition program for Rust training providers.",
			button_label: "Learn More",
			button_url: "/rust-foundation-trusted-training/",
			image: await image(`${U}/2024/01/fellowships.png`, "Ferris the crab with an award rosette icon"),
		},
		{
			_type: "logo_wall",
			headline: "Community Organizer Support",
			text: "The Rust Foundation is constantly striving to provide resources to Rustaceans all over the world. Global Rust Community Coordinator Ernest Kissiedu is particularly focused on connecting with community leaders in regions that are underrepresented in open source leadership spaces.\n\nRecent outreach efforts have included working with the following Rust communities:",
			source: "pick below",
			logos: [
				{
					name: "Rust Africa",
					logo: await image(`${U}/2024/12/unnamed.jpg`, "Rust Africa logo"),
					url: "https://rustafrica.org/",
				},
				{
					name: "Ukrainian Rust Community",
					logo: await image(`${U}/2024/12/Untitled-design.png`, "Ukrainian Rust Community logo"),
					url: "https://github.com/rust-lang-ua",
				},
				{
					name: "Rust India",
					logo: await image(`${U}/2024/12/HDYfSpaM_400x400.jpg`, "Rust India logo"),
					url: "https://rustindia.github.io/",
				},
				{
					name: "Rust Nigeria",
					logo: await image(
						`${U}/2024/12/original_ratio_extra_large_48e5d06d-c6fb-464d-873d-6f149593a874.png`,
						"Rust Nigeria logo",
					),
					url: "https://rustnigeria.curated.co/",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "contact",
			headline: "Contact",
			body: await richText(`
				<p>If you are a Rust community member with a question about the Rust Foundation, you can email our staff directly at <a href="mailto:contact@rustfoundation.org">contact@rustfoundation.org</a>. You may also email the Rust Project Leadership Council <a href="mailto:council@rust-lang.org">council@rust-lang.org</a> or get in touch with them through <a href="https://rust-lang.zulipchat.com/#narrow/stream/392734-council">Zulip</a>.</p>
			`),
		},
	],
});
