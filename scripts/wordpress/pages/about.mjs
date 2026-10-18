// About page: https://rustfoundation.org/about/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "about",
	title: "About",
	blocks: [
		{
			_type: "page_header",
			headline: "About",
			intro:
				"THE RUST FOUNDATION is an independent non-profit organization dedicated to stewarding the Rust programming language, supporting Rust communities worldwide, and investing in the Rust talent pool.",
			jump_links: [
				{ label: "Mission", url: "#mission-and-priorities" },
				{ label: "Board of Directors", url: "#board-of-directors" },
				{ label: "Team", url: "#our-team" },
				{ label: "Tech & Engineering", url: "#tech" },
				{ label: "Careers", url: "#careers" },
			],
		},
		{
			_type: "statement",
			anchor_id: "mission-and-priorities",
			label: "OUR MISSION",
			text: "is for global computer systems to be more secure, sustainable, scalable, and efficient through the use of the Rust programming language.\n\nTo learn more about how this mission has recently translated into tangible impact for the Rust ecosystem, read our 2025 Annual report. For insight into how it is shaping the work we prioritize today, visit our 2026-2028 Strategy Plan:",
			buttons: [
				{ label: "2025 Annual Report", url: await file(`${U}/2026/01/2025-Annual-Report.pdf`) },
				{ label: "2026-2028 Strategic Plan", url: "/strategic-plan/" },
			],
			background: "light",
		},
		{
			_type: "rich_text",
			anchor_id: "board-of-directors",
			headline: "Board of Directors",
			body: await richText(
				`<p>The Rust Foundation’s Board of Directors is composed of representatives from our member organizations (“Member Directors”) and the Rust Project (“Project Directors”) who share equal voting power and act collectively to govern the Foundation in accordance with our <a href="/policy/bylaws/">Bylaws</a> and their <a href="${U}/2024/01/board-terms-of-reference.pdf">Terms of Reference</a>.</p>`,
			),
		},
		{
			_type: "people_grid",
			headline: "Member Directors",
			group: "member-directors",
		},
		{
			_type: "rich_text",
			body: await richText(
				`<p><em>Each Platinum Member of the Rust Foundation holds a dedicated seat on our board. For Gold Members, representation depends on their total number: if there are between four and seven Gold Members, they are collectively represented by one Gold Member Representative. If there are eight or more Gold Members, they are represented by two Gold Member Directors. There is one Representative dedicated to all Silver Members. <a href="${U}/2024/01/board-director-role-description.pdf">Click here</a> to learn more about the roles and responsibilities of our Member Directors.</em></p>`,
			),
		},
		{
			_type: "people_grid",
			headline: "Project Directors",
			group: "project-directors",
		},
		{
			_type: "rich_text",
			body: await richText(
				`<p><em>The Rust Foundation board has five seats reserved for Project Directors. Project Directors serve two year terms and are elected by the Rust Project through a process developed by the Rust Project Leadership Council. <a href="${U}/2024/01/board-director-role-description.pdf">Click here</a> to learn more about the roles and responsibilities of our Project Directors.</em></p>`,
			),
		},
		{
			_type: "people_grid",
			anchor_id: "our-team",
			headline: "Our Team",
			group: "staff",
		},
		{
			_type: "photo",
			image: await image(`${U}/2024/09/RustConf-2024-Montreal-Day-2-1-1.jpg`, "Attendee working on a laptop at RustConf 2024 in Montréal"),
		},
		{
			_type: "rich_text",
			anchor_id: "tech",
			headline: "Technology and Engineering at the Foundation",
			body: await richText(
				`<p>The Rust Foundation’s engineering staff are dedicated to supporting the technical needs of the Rust Foundation through software development and administering strategic initiatives in partnership with the Rust Project and wider Rust Ecosystem. Our engineering staff are currently three primary areas of focus:</p>
<ul>
<li>A <a href="/security-initiative/">Security Initiative</a>, helping ensure that the Rust ecosystem is as secure as possible, including by releasing valuable tools such as <a href="https://github.com/rustfoundation/painter">Painter</a>.</li>
<li><a href="/infrastructure/">Infrastructure support</a>, driving engineering and efficiency efforts to ensure that the growing number of Rust developers have a great experience while also managing costs.</li>
<li>An <a href="https://github.com/rust-lang/rfcs/pull/3355">approved Rust specification effort</a>, providing people and resources to help the Project deliver a useful and quality language specification.</li>
</ul>`,
			),
		},
		{
			_type: "logo_wall",
			anchor_id: "donors",
			headline: "Infrastructure and Technology Donors",
			text: "The following organizations have generously donated in-kind infrastructure and technology services to the Rust Foundation. Our Technology Team is grateful for the benefits they provide to the Foundation and Rust ecosystem.",
			source: "infrastructure-donor",
		},
		{
			_type: "rich_text",
			anchor_id: "careers",
			headline: "Careers",
			body: await richText(
				`<p>Interested in working with our team? Visit our <a href="/careers/">Careers</a> page to view any current openings and to learn more about life at the Rust Foundation.</p>`,
			),
		},
		{
			_type: "cta",
			headline: "Want to learn more about the work we’re doing?",
			buttons: [
				{ label: "Read Recent News", url: "/media/" },
				{ label: "Browse Initiatives", url: "/initiatives/" },
			],
			background: "white",
		},
	],
});
