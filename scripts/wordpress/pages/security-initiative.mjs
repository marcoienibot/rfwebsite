// Security Initiative: https://rustfoundation.org/security-initiative/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "security-initiative",
	title: "Security Initiative",
	blocks: [
		{
			_type: "page_header",
			headline: "The Rust Foundation Security Initiative",
			intro:
				"The Rust Foundation created its Security Initiative in 2021 to advance the state of security in the Rust programming language ecosystem. Thanks to our sponsors and collaborators, we have made a number of critical improvements to Rust’s security landscape through this program – and we’re just getting started.",
			jump_links: [
				{ label: "Key Program Activities", url: "#key-program-activities" },
				{ label: "Key Contributors", url: "#contributors" },
				{ label: "Program Sponsors", url: "#sponsors" },
				{ label: "Reports", url: "#reports" },
				{ label: "Press", url: "#press" },
			],
			buttons: [{ label: "Get Involved", url: "#get-involved" }],
		},
		{
			_type: "rich_text",
			headline: "Rust has many built-in safety advantages – but broader ecosystem security is a moving target.",
			body: await richText(
				"<p>In recent years, the Rust programming language has experienced rapid growth in global popularity and adoption. But as software engineers, business leaders, and global governments become more aware of the many advantages of Rust, the need for more scalable security systems and safeguards against bad actors has become urgent.</p><p>Through the Security Initiative, we’ve created new open source security tools for Rust developers, conducted audits and threat models, developed a collaborative team of Rust security experts, and much more.</p>",
			),
			width: "wide",
		},
		{
			_type: "rich_text",
			anchor_id: "key-program-activities",
			headline: "Key Program Activities",
		},
		{
			_type: "feature_band",
			color: "navy",
			image_side: "right",
			headline: "Developing Rust Security Expertise",
			text: "Through the Security Initiative, we have hired a full-time Security Engineer and a security-focused Software Engineer who help lead the program and regularly collaborate with members of the Rust Project’s [crates.io Team](https://www.rust-lang.org/governance/teams/crates-io), [Infrastructure Team](https://www.rust-lang.org/governance/teams/infra), [Security Response Working Group](https://www.rust-lang.org/governance/wgs/wg-security-response), and [Secure Code Working Group](https://www.rust-lang.org/governance/wgs/wg-secure-code), in addition to specific external stakeholders.",
			image: await image(`${U}/2024/09/expertise.png`, "Brain and magnifying glass icon"),
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "left",
			headline: "Threat-Modeling",
			text: "Threat modeling exercises enable the Rust Foundation and Rust Project to better understand the risks identified by the Security Audit. Details of the threat models we have conducted so far can be found in the progress reports linked below.",
			image: await image(`${U}/2024/09/threat-modeling.png`, "Tower with warning sign icon"),
		},
		{
			_type: "feature_band",
			color: "slate",
			image_side: "right",
			headline: "Rust Security Auditing",
			text: "An audit of the state of security within the Rust ecosystem will allow both the Rust Foundation and Project to anticipate risks better and define how security can be economically maintained on an ongoing basis. Given the size of our team, the community, and the ecosystem at large, we have a unique opportunity to learn hard lessons from other ecosystems and implement appropriate remediations for them at a smaller scale.",
			image: await image(`${U}/2024/09/auditing.png`, "Checkmark icon"),
		},
		{
			_type: "feature_band",
			color: "navy",
			image_side: "left",
			headline: "Actionable Security Research",
			text: "The findings of our work under the Security Initiative have revealed the need for new open source tools and features to enhance maintainers’ security workflows and unlock greater insight into vulnerabilities. To date, our team has created the following new open source Rust security tools:\n\n- [Painter](https://github.com/rustfoundation/painter) – Creates a complete call graph across the entire crates ecosystem to reveal how crates relate to each other.\n- [Typomania](https://github.com/rustfoundation/typomania) – Detects potential typosquatting as a reusable library that can be adapted to any registry.",
			image: await image(`${U}/2024/09/research.png`, "Book with lock icon"),
		},
		{
			_type: "people_grid",
			anchor_id: "contributors",
			headline: "Key Contributors",
			group: "security-contributors",
		},
		{
			_type: "statement",
			text: "The Security Initiative Team Collaborates with these Rust Project Teams & Working Groups:",
			buttons: [
				{ label: "Infrastructure Team", url: "https://www.rust-lang.org/governance/teams/infra" },
				{ label: "crates.io Team", url: "https://www.rust-lang.org/governance/teams/crates-io" },
				{
					label: "Rust Project Security Response Team",
					url: "https://rust-lang.org/governance/teams/#team-security-response",
				},
				{
					label: "Rust Project Secure Code Working Group",
					url: "https://rust-lang.org/governance/teams/#team-wg-secure-code",
				},
			],
			background: "white",
		},
		{
			_type: "logo_wall",
			anchor_id: "sponsors",
			headline: "Program Sponsors",
			source: "security-sponsor",
		},
		{
			_type: "cards",
			anchor_id: "reports",
			headline: "Security Initiative Progress Reports",
			text: "More details on Security Initiative activities and progress can be found in the following reports:",
			style: "boxed",
			cards: [
				{ title: "2025 | Year in Review", url: "/2025/", link_label: "Learn more" },
				{
					title: "Technology Report | 2025",
					url: await file(`${U}/2025/08/technology-report-2025.pdf`),
					link_label: "Learn more",
				},
				{
					title: "Technology Report | 2024",
					url: await file(`${U}/2025/01/technology-report-2024-2.pdf`),
					link_label: "Learn more",
				},
				{
					title: "Security Initiative Report | February 2024",
					url: await file(`${U}/2024/06/security-initiative-report-february-2024.pdf`),
					link_label: "Learn more",
				},
				{
					title: "Security Initiative Report | July 2023",
					url: await file(`${U}/2024/01/security-initiative-report-july-2023.pdf`),
					link_label: "Learn more",
				},
			],
		},
		{
			_type: "post_cards",
			anchor_id: "press",
			headline: "In the News:",
			category: "press",
			tag: "security-initiative",
			count: 4,
		},
		{
			_type: "post_cards",
			headline: "Security Initiative Stories",
			category: "all",
			tag: "security-initiative",
			count: 8,
		},
		{
			_type: "cta",
			anchor_id: "get-involved",
			headline: "Get Involved",
			text: "Interested in supporting the Security Initiative as a sponsor or in-kind donor? Email us at contact@rustfoundation.org to start a conversation.",
			buttons: [{ label: "contact@rustfoundation.org", url: "mailto:contact@rustfoundation.org" }],
			background: "light",
		},
	],
});
