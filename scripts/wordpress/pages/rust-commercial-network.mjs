// Rust Commercial Network: https://rustfoundation.org/rust-commercial-network/
const U = "https://rustfoundation.org/wp-content/uploads";
const ZULIP = "https://rust-lang.zulipchat.com/#narrow/channel/594428-rcn";
const GITHUB = "https://github.com/Rust-Commercial-Network/rcn";
const EMAIL = "mailto:rust-commercial-network@rustfoundation.org";

export default async ({ image, richText }) => ({
	slug: "rust-commercial-network",
	title: "Rust Commercial Network",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Commercial Network",
			intro:
				"Where companies and community members work together to advance Rust adoption, share real-world experience, solve shared problems, and support the long-term health of Rust in production together.",
			jump_links: [
				{ label: "About", url: "#about" },
				{ label: "Participating Organizations", url: "#orgs" },
				{ label: "Steering Committee", url: "#committee" },
				{ label: "Get Involved", url: "#get-involved" },
			],
			buttons: [
				{ label: "GitHub", url: GITHUB },
				{ label: "Email", url: EMAIL },
			],
		},
		{
			_type: "split",
			anchor_id: "about",
			headline: "The collective voice of Rust in production",
			text: "The Rust Commercial Network (RCN) gives organizations that depend on Rust in production a direct line to the people building the language, and gives the Rust Project insight into the real-world challenges industrial users face.\n\nBeneath the RCN sit topic-specific working groups and consortiums where focused work happens. Members gather monthly for an opportunity to learn from one another, discuss shared challenges, and brainstorm solutions for the Rust ecosystem.\n\nMembership is free and open to companies, academic institutions, and organizations using or looking to adopt Rust. You do not need to be a Rust Foundation member to join.",
			image: await image(
				`${U}/2026/06/54020584167_d39087e01d_k.jpg`,
				"Audience in a grand hall lit in red, with the Rust logo projected on the wall behind the stage",
			),
			image_position: "right",
		},
		{
			_type: "rich_text",
			headline: "Meetings & Collaboration",
			body: await richText(`
				<p>The network meets monthly on Google Meet (view and copy upcoming meetings <a href="https://calendar.google.com/calendar/u/0/newembed?src=c_4a1145af4cd496bfe0e40526ece9203925c671c6bfd24bb22cb31a23d6ae180c@group.calendar.google.com&amp;ctz=America/New_York">here</a>). Between meetings, members connect through the <a href="${ZULIP}">#commercial-network Zulip channel</a>: an open-source messaging platform used by the Rust Project for collaboration. Zulip threads are publicly accessible, so anyone can follow along before deciding to join.</p>
				<blockquote><p><em>RCN meetings follow the Chatham House Rule: participants are free to share what was discussed, but not who said it. Recordings and transcriptions are not permitted, so everyone can speak candidly.</em></p></blockquote>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "orgs",
			headline: "Meet the RCN’s Members",
			width: "wide",
			columns: "2",
			body: await richText(`
				<p>The following organizations are official founding members of the Rust Commercial Network, committed to advancing Rust adoption and supporting the long-term health of the Rust ecosystem.</p>
				<ul>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/23">adorsys</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/64">aleph0</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/159">Amazon Web Services</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/20">Anori Tech</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/24">Aonyx</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/33">Arm Ltd</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/152">atvari</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/38">AWS</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/129">Bitpanda</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/147">BuiltRight Software Solutions</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/29">Bytecode Alliance</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/80">Canonical</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/134">Centricular</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/145">CrabNebula</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/32">Databricks</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/27">Defined Once</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/155">Devolutions</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/72">Eden Development Inc.</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/166">Encore</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/51">ExpressVPN</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/79">Ferrous Systems GmbH</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/54">Futurewei Technologies</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/43">globalized</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/111">Google</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/77">gRPC</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/74">Hexcat</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/49">Hydro</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/140">in-tech (an Infosys company)</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/164">Integer 32, LLC</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/94">JBnSE GmbH</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/11">JetBrains</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/10">KDAB</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/69">LaserData, Inc</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/133">LHi Group</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/137">M. Engvall &amp; Co.</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/9">Mainmatter</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/42">Microsoft</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/87">Nidulabs</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/90">Nyas</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/66">OpenAI</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/5">OxidOS Automotive</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/84">Plabayo BV</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/127">probe-rs</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/16">Processing Foundation</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/12">PROMOTIC</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/169">PT Tripower Solar Nusantara</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/73">Ratatui</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/132">Rust NYC</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/141">Rustaholics Thailand</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/89">Scalable Solutions</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/99">SKIDATA</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/149">Slint</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/75">Stichting Rust Nederland aka RustNL</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/17">Tag1 Consulting, Inc.</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/88">TandemDrive</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/6">Tock Foundation</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/68">Trifecta Tech Foundation</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/22">Tweede Golf</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/50">Woven by Toyota</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/19">WyeWorks</a></li>
					<li><a href="https://github.com/Rust-Commercial-Network/rcn/issues/135">Zcash Foundation</a></li>
				</ul>
				<p><strong>Missing from the list? Fill out a <a href="https://github.com/Rust-Commercial-Network/rcn#:~:text=membership%20application">membership application</a> today!</strong></p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "committee",
			headline: "Steering Committee:",
			body: await richText(`
				<ul>
					<li><a href="https://github.com/emilhernvall"><strong>Emil Hernvall</strong></a> (<a href="https://aws.amazon.com/">Amazon Web Services</a>)</li>
					<li><a href="https://github.com/rmcnew/"><strong>Scott McNew</strong></a> (<a href="https://canonical.com/">Canonical</a>)</li>
					<li><a href="https://github.com/bravit/"><strong>Vitaly Bragilevsky</strong></a> (<a href="https://www.jetbrains.com/">JetBrains</a>)</li>
					<li><a href="https://github.com/JonasKruckenberg"><strong>Jonas Kruckenberg</strong></a> (<a href="https://mainmatter.com/">Mainmatter</a>)</li>
					<li><a href="https://github.com/Roxi09"><strong>Roxana Hadad, Ph.D.</strong></a> (<a href="https://processingfoundation.org/">Processing Foundation</a>)</li>
					<li><a href="https://github.com/davidtwco"><strong>David Wood</strong></a> (<a href="https://rust-lang.org/governance/teams/compiler/">Rust Project Compiler Team Co-Lead</a>, Rust Foundation Project Director)</li>
					<li><a href="https://github.com/LoriLorusso"><strong>Lori Lorusso</strong></a> (Rust Foundation — advisory seat)</li>
				</ul>
			`),
		},
		{
			_type: "quotes",
			items: [
				{
					quote:
						"In true open source fashion, multiple companies will now work together on shared problems with a direct line to the Rust Project. That connection is mutually beneficial: members of the RCN gain real insight into how the Project works, and the Project can surface its own needs. My biggest hope is that it brings corporate funding and development help to the table, sustaining the language and the people behind it, and driving more adoption.",
					name: "Lori Lorusso",
					role: "Rust Foundation — advisor",
					photo: await image(`${U}/2026/02/Lori-Lorusso-300x298-1.png`, "Lori Lorusso"),
				},
				{
					quote:
						"What excites me most about the Rust Commercial Network is the amount of common ground that already exists. Many of these challenges are shared, which means we can make meaningful progress by tackling them together.",
					name: "Jess Izen",
					role: "Amazon Web Services",
					photo: await image(`${U}/2026/06/44884346.jpeg`, "Jess Izen"),
				},
				{
					quote:
						"The Rust Commercial Network provides a way for enterprises to work together to solve common problems, establish standards, and share best practices in the ways that they adopt, develop, and deploy Rust software.",
					name: "Scott McNew",
					role: "Canonical",
					photo: await image(`${U}/2026/06/86623_2.jpeg`, "Scott McNew"),
				},
				{
					quote:
						"The RCN is a great opportunity to put the ecosystem on a solid, long-term footing of shared ownership and active collaboration between companies, maintainers, and the Rust project. We’re proud to be part of it.",
					name: "Jonas Kruckenberg",
					role: "Mainmatter",
					photo: await image(`${U}/2026/06/25329995.jpeg`, "Jonas Kruckenberg"),
				},
				{
					quote:
						"Industry adoption is critical to the continued success of Rust, and the RCN is a great opportunity for the Rust Project to learn more about the challenges that industrial users run into when adopting the language and how we can better support these users. I’m very excited to represent the Rust Project on the RCN’s Steering Committee.",
					name: "David Wood",
					role: "Rust Project Compiler Team Co-Lead, Rust Foundation Project Director",
					photo: await image(`${U}/2025/10/IMG_0095-1.jpeg`, "David Wood"),
				},
				{
					quote:
						"Open source tools thrive when the communities depending on them have a voice in their future. The RCN is a chance to make sure Rust’s ecosystem is wide enough to include the artists, educators, and learners we serve.",
					name: "Roxana Hadad, PhD",
					role: "Processing Foundation",
					photo: await image(`${U}/2026/06/1776037182598.jpeg`, "Roxana Hadad"),
				},
				{
					quote:
						"Rust is fully mature and ready for widespread adoption across many industries, yet its uptake among small and mid-sized companies remains below its potential. I believe that RCN and its initiatives can help change this by providing the information, success stories, and tooling needed to persuade and support organizations that are still on the fence.",
					name: "Vitaly Bragilevsky",
					role: "JetBrains",
					photo: await image(`${U}/2026/06/bravit-3ab1fa3f.jpg`, "Vitaly Bragilevsky"),
				},
			],
		},
		{
			_type: "cards",
			anchor_id: "get-involved",
			headline: "Get Involved in the RCN",
			text: "There are a variety of entry points to getting involved with the Rust Commercial Network:",
			style: "boxed",
			background: "teal",
			cards: [
				{
					title: "View the conversation on Zulip",
					text: "Zulip threads are publicly accessible. Browse the #rcn Zulip channel to see what the network is working on.",
					url: ZULIP,
					link_label: "View Zulip Channel",
				},
				{
					title: "Attend a monthly meeting",
					text: "Open to all. No membership required to come to your first meeting!",
					url: "https://bit.ly/4xngeHr",
					link_label: "Attend a Meeting",
				},
				{
					title: "Apply for membership",
					text: "Fill out the application on GitHub. You’ll receive a Zulip invitation, be added to the #rcn channel, and listed as a member.",
					url: "https://github.com/Rust-Commercial-Network/rcn/issues/new?assignees=lorilorusso&labels=membership%2Cstatus%3A+needs+review&projects=&template=membership.yml",
					link_label: "Apply For Membership",
				},
				{
					title: "Explore Funding Directory",
					text: "The RCN’s Funding Directory lists critical areas where Rust maintainers are in need of funding, production data, or feedback from companies using Rust at scale.",
					url: "https://rust-commercial-network.github.io/rcn/funding-directory.html",
					link_label: "Explore Funding Directory",
				},
			],
		},
		{
			_type: "statement",
			text: "To discuss funding, procurement, or sharing private production feedback, contact rust-commercial-network@rustfoundation.org. For public discussion, use the RCN channel in the Rust Project Zulip.",
			buttons: [
				{ label: "Learn More On GitHub", url: GITHUB },
				{ label: "Email: rust-commercial-network@rustfoundation.org", url: EMAIL },
			],
			background: "white",
		},
		{
			_type: "post_cards",
			headline: "Further Reading:",
			category: "all",
			tag: "rcn",
			count: 5,
		},
	],
});
