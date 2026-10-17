// Rust Innovation Lab: https://rustfoundation.org/rust-innovation-lab/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "rust-innovation-lab",
	title: "Rust Innovation Lab",
	blocks: [
		{
			_type: "page_header",
			headline: "Welcome to the Rust Innovation Lab.",
			intro:
				"Guided by Rust values. Designed for your project’s success — The Rust Innovation Lab is the Rust Foundation’s home for projects that power critical infrastructure—providing trusted support, stability, and space to grow.",
			jump_links: [
				{ label: "About", url: "#about" },
				{ label: "Benefits", url: "#benefits" },
				{ label: "Projects", url: "#projects" },
				{ label: "FAQ", url: "#faq" },
				{ label: "Apply/Contact", url: "#apply" },
			],
		},
		{
			_type: "statement",
			anchor_id: "about",
			text: "As the most impactful Rust projects evolve into essential infrastructure for the ecosystem, the Rust Innovation Lab (RIL) provides fiscal stewardship, governance, and administrative support for fully funded initiatives, helping them thrive while safeguarding their independence and vision.\n\nThrough the Rust Innovation Lab, funded projects gain the strength of a neutral nonprofit organization, expert guidance, and access to the wider Rust ecosystem. Together, the Rust Foundation and projects hosted through the Rust Innovation Lab can ensure that key Rust tools and efforts remain secure, sustainable, and independent for the long term.\n\nThe Rust Innovation Lab is just getting started. Stay tuned for more information, resources, case studies, and stories about the Foundation’s hosted projects.",
			buttons: [
				{
					label: "Read the Announcement",
					url: "/media/rust-foundation-launches-rust-innovation-lab-with-rustls-as-inaugural-project/",
				},
			],
			background: "white",
		},
		{
			_type: "rich_text",
			anchor_id: "benefits",
			headline: "The Rust Innovation Lab Advantage",
			body: await richText(
				"<p>Open source isn’t just about code—it’s about people, knowledge-sharing, and collaboration. At the Rust Foundation, we believe that when maintainers and their projects are supported, the entire ecosystem benefits. The Rust Innovation Lab was created to provide that support. Here’s what hosted projects will gain from the Rust Foundation as this program evolves…</p>",
			),
			width: "wide",
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "right",
			headline: "A Stable, Neutral Home",
			text: "The Rust Foundation is an independent nonprofit dedicated to stewarding the Rust Programming Language. Hosting your project with us ensures that it is supported by transparent governance and vendor-neutral backing, building confidence among contributors, partners, and users.",
			image: await image(`${U}/2025/04/neutrality.png`, "Checkmark icon"),
		},
		{
			_type: "feature_band",
			color: "slate",
			image_side: "left",
			headline: "Governance Support",
			text: "As projects grow, so do questions about leadership, decision-making, and sustainability. Innovation Lab projects receive guidance to set up structures that keep momentum strong while protecting long-term health.",
			image: await image(`${U}/2025/04/governance.png`, "Brain with electricity icon"),
		},
		{
			_type: "feature_band",
			color: "navy",
			image_side: "right",
			headline: "Legal & Administrative Confidence",
			text: "Open source shouldn’t mean facing complex legal and administrative challenges alone. We help projects navigate licensing, contributor agreements, and related issues with clarity and confidence.",
			image: await image(`${U}/2025/04/support.png`, "Headset icon"),
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "left",
			headline: "Community & Visibility",
			text: "Through the Rust Innovation Lab, projects gain visibility across the Rust ecosystem, increasing their ability to attract contributors, partners, and financial support. Participants also benefit from peer networking opportunities to share hard-earned lessons and best practices.",
			image: await image(`${U}/2025/04/community.png`, "Community icon"),
		},
		{
			_type: "feature_band",
			color: "slate",
			image_side: "right",
			headline: "Fiscal Sponsorship",
			text: "The Rust Foundation functions as the fiscal sponsor of all projects in the Rust Innovation Lab. Through this role, we can accept donations, grants, and sponsorships on your behalf under our nonprofit status. This means you don’t need to create a separate legal entity or open a bank account or handle taxes. All the while, incoming funds will be earmarked for your project.\n\nOur team will keep clear records and provide reporting so funders know where their money is going, and you know what’s available. This allows you to build trust with sponsors, contributors, and your community while focusing on what matters to you: the code.\n\nThe Rust Foundation does not provide fiscal support to hosted projects through our core funds.",
			image: await image(`${U}/2025/04/fiscal.png`, "Piggy bank icon"),
		},
		{
			_type: "rich_text",
			anchor_id: "projects",
			headline: "RIL Projects:",
		},
		{
			_type: "split",
			headline: "Rustls",
			text: "Rustls is a memory-safe, high-performance TLS library that is by far the most popular way to build secure connections in the Rust ecosystem and is one of the top 100 packages on crates.io.",
			image: await image(`${U}/2025/08/rustacean-flat-happy-lock-resize-e1756413130658.png`, "Rustls logo: Ferris the crab holding a padlock"),
			image_position: "right",
			buttons: [
				{
					label: "Announcement",
					url: "/media/rust-foundation-launches-rust-innovation-lab-with-rustls-as-inaugural-project/",
				},
				{ label: "Rustls GitHub", url: "https://github.com/rustls/rustls" },
			],
		},
		{
			_type: "quotes",
			items: [
				{
					quote: "“We are excited by the opportunities to sustain and support the long-term development and maintenance of Rustls as a part of the Rust Innovation Lab. We look forward to working with the Rust Foundation toward these goals.”",
					name: "Joe Birr-Pixton",
					role: "Project Founder",
				},
			],
		},
		{
			_type: "split",
			headline: "Symposium",
			text: "Symposium is a tool that automatically installs skills, MCP servers, or other extensions based on the dependencies in your Rust crate. These extensions help agents make the best use of Rust and of the crates in your project. Symposium’s ultimate goal is to make agentic development more interoperable, reliable, and token-efficient.",
			image: await image(`${U}/2026/04/symposium5_vase-ferris-1.png`, "Symposium logo: a vase decorated with Ferris the crab"),
			image_position: "right",
			buttons: [
				{ label: "Announcement", url: "/media/welcoming-symposium-to-the-rust-innovation-lab/" },
				{ label: "symposium.dev", url: "https://symposium.dev/" },
			],
		},
		{
			_type: "quotes",
			items: [
				{
					quote: "“What I’m excited about with Symposium is the idea that crate authors can ship more than just code. I want to see crate authors able to control more aspects of the development experience. The main Rust project has been adding extensions to allow tweaking things like diagnostics, and that’s awesome. As agentic programming becomes more common, crates need the ability to influence that as well, and Symposium targets that gap.”",
					name: "Nicholas Matsakis",
					role: "Symposium Lead; Rust language design team co-lead",
				},
			],
		},
		{
			_type: "split",
			headline: "Wild",
			text: "Wild is a linker with the goal of being very fast for iterative development. Wild is Linux-only today, but cross-platform support is a clear priority: ports to Windows and macOS are on the roadmap. The project is licensed under MIT and Apache 2.0 (the same dual license used by the Rust project itself), so the code remains freely available to everyone. Wild is maintained by David Lattimore (lead maintainer) along with a growing group of contributors. Development is supported financially by AWS.",
			image: await image(`${U}/2026/06/wild.png`, "Wild logo"),
			image_position: "right",
			buttons: [
				{ label: "Announcement", url: "/media/welcoming-wild-to-the-rust-innovation-lab/" },
				{ label: "github.com/wild-linker/wild", url: "https://github.com/wild-linker/wild" },
			],
		},
		{
			_type: "quotes",
			items: [
				{
					quote: "“Becoming part of the Rust Innovation Lab, with support from AWS, will enable us to bring faster linking to more Rust developers and to continue innovating in the linker space.”",
					name: "David Lattimore",
					role: "Wild Lead Maintainer",
				},
			],
		},
		{
			_type: "split",
			headline: "Josh",
			text: "Josh (“Just One Single History”) is a Rust-based platform for scaling Git to codebases of any size, with any number of contributors, without slowing down the pace of change. Josh is one of those projects many Rust contributors rely on every day without ever thinking about it. It quietly keeps the compiler and some of the most important tools in sync, at a scale that pushed traditional Git tooling past its limits. Its maintainers have been great partners to the Rust Project, improving Josh to meet the Project’s demanding needs. It also shows the rest of the industry what a Rust-built approach to version control at scale can look like. Bringing Josh into the Rust Innovation Lab hopefully provides this critical piece of infrastructure a stable, long-term home.",
			image: await image(`${U}/2026/10/fc1ff215-6a68-4564-9662-b552cf2e9729-1.png`, "Josh (Just One Single History) logo"),
			image_position: "right",
			buttons: [
				{ label: "Announcement", url: "/media/welcoming-the-josh-project-to-the-rust-innovation-lab/" },
				{ label: "github.com/josh-project/josh", url: "https://github.com/josh-project/josh" },
			],
		},
		{
			_type: "quotes",
			items: [
				{
					quote: "“Joining the Rust Innovation Lab is both a practical and a symbolic step for the Josh Project. We believe that a stable home with the Rust Foundation reflects our long-term commitment to support Josh as a piece of reliable infrastructure for today’s demanding projects such as the Rust compiler. At the same time we think that it puts us in an even better position to explore ways in which the technology we are building can reshape how the industry thinks about Git, version control and distributed collaboration in general. For code and beyond.”",
					name: "Christian Schilling",
					role: "Josh Lead Maintainer",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "faq",
			headline: "Curious About Joining the RIL?",
			body: await richText(
				"<p>Browse these questions - frequently asked by prospective RIL projects like yours - to get better acquainted before applying.</p>",
			),
			background: "blush",
		},
		{
			_type: "faq",
			category: "rust-innovation-lab",
			background: "blush",
		},
		{
			_type: "cta",
			anchor_id: "apply",
			headline: "Apply",
			text: "If your project is interested in joining the Rust Innovation Lab, visit our GitHub Repo to learn more and apply.\n\nYou can also email us at ril@rustfoundation.org with questions about the Rust Innovation Lab.",
			buttons: [
				{ label: "GitHub Repo", url: "https://github.com/rustfoundation/rust-innovation-lab" },
				{ label: "ril@rustfoundation.org", url: "mailto:ril@rustfoundation.org" },
			],
			background: "navy",
		},
	],
});
