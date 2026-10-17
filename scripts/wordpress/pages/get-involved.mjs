// Get Involved page: https://rustfoundation.org/get-involved/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "get-involved",
	title: "Get Involved",
	blocks: [
		{
			_type: "page_header",
			headline: "Get Involved",
			intro:
				"Whether you’re interested in membership, making a donation, having the Rust Foundation host your open source project, or getting involved in a network, our team is ready to help you pick the best path forward.",
			jump_links: [
				{ label: "Membership Overview", url: "#membership-info" },
				{ label: "Why Join?", url: "#why-join" },
				{ label: "Download Info Deck", url: "#deck" },
				{ label: "Make a Donation", url: "#donations" },
				{ label: "Support Rust Maintainers", url: "#maintainers" },
				{ label: "Project Hosting", url: "#ril" },
				{ label: "Rust Commercial Network", url: "#rcn" },
			],
		},
		{
			_type: "cards",
			anchor_id: "membership-info",
			headline: "Interested in Becoming a Rust Foundation Member?",
			text: "Rust Foundation membership is the best way to directly support the Rust programming language and provide critical tools to the Rust Project and community. Our membership opportunities are divided into four tiers: Platinum, Gold, Silver, and Associate. Below, you’ll find more information about each category:",
			style: "boxed",
			cards: [
				{
					title: "Platinum Membership",
					text: "$325k per year.\n\nRust Foundation Platinum Membership demonstrates the highest level of commitment to supporting the Rust programming language. Platinum Members receive an exclusive package of benefits, which includes:\n\n• Dedicated spotlight announcement.\n\n• Dedicated seat on the Rust Foundation Board of Directors.\n\n• Prioritized promotion in our editorial calendar.\n\n• Exclusive opportunities to collaborate on important Foundation initiatives benefiting Rust.",
					url: "#deck",
					link_label: "Inquire",
				},
				{
					title: "Gold Membership",
					text: "$150k per year.\n\nRust Foundation Gold Membership demonstrates an advanced level of investment in the future of the Rust programming language. This tier is ideal for small to mid-size organizations. Gold benefits include:\n\n• Inclusion in group member announcement post.\n\n• Rust Foundation Board of Directors access via dedicated representative.\n\n• Prioritized promotion on our editorial calendar.\n\n• Opportunities to collaborate on important Foundation initiatives benefitting Rust.",
					url: "#deck",
					link_label: "Inquire",
				},
				{
					title: "Silver Membership",
					text: "$5k - $85k per year.\n\nRust Foundation Silver Membership is the perfect way for smaller organizations to take on a new level of involvement in the Rust ecosystem with access to a variety of benefits. Sliding scale below.\n\n• 1-99 full-time employees: $5k per year.\n\n• 100-499 full-time employees: $15k per year.\n\n• 500-999 full-time employees: $30k per year.\n\n• 1,000-2,999 full-time employees: $55k per year.\n\n• 3,000+ full-time employees: $85k per year.\n\n• Benefits include feature in group member announcement, Rust Foundation Board of Directors access via dedicated rep., and more.",
					url: "#deck",
					link_label: "Inquire",
				},
				{
					title: "Associate Membership",
					text: "Free for relevant institutions.\n\nAssociate Membership is reserved for nonprofit and educational institutions (not individuals) committed to the Rust language and interested in cross-collaboration with the Foundation. Associate benefits include:\n\n• Inclusion in group member announcement post.\n\n• Access to the Rust Foundation team for research, collaboration, and thought leadership opportunities.\n\n• Promotion opportunities via our editorial calendar.",
					url: "#deck",
					link_label: "Inquire",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "why-join",
			headline: "Why Join?",
			body: await richText(
				"<p>Hear from a few of our staff and representatives about why the Rust Foundation is worth joining.</p>",
			),
		},
		{
			_type: "video",
			url: "https://www.youtube.com/watch?v=WSNKISHx8bw",
		},
		{
			_type: "split",
			anchor_id: "deck",
			headline: "Learn More",
			text: "Click below to find our overview deck, which contains the key information you’ll need to make an informed membership decision.",
			image: await image(`${U}/2024/01/Screen-Shot-2024-01-30-at-3.14.42-PM.png`, "Rust Foundation Membership Overview Deck cover"),
			image_position: "left",
			buttons: [{ label: "Review Membership Deck", url: await file(`${U}/2025/10/Membership-Overview-Deck.pdf`) }],
		},
		{
			_type: "cta",
			anchor_id: "donations",
			headline: "Make a Donation",
			text: "The Rust Foundation gratefully accepts donations from individuals and non-member organizations alike!\n\nIf you would like to make a tax-deductible monetary donation or if you would like to offer us a non-monetary (“in-kind”) donation, please email us:",
			buttons: [{ label: "Start a Donation Discussion", url: "mailto:contact@rustfoundation.org" }],
			background: "teal",
		},
		{
			_type: "cta",
			anchor_id: "maintainers",
			headline: "Support Rust Maintainers",
			text: "You can also donate directly to the Rust Foundation Maintainers Fund through our GitHub Sponsorship page. Donations received through this platform help fund the hardworking people maintaining the Rust programming language.",
			buttons: [{ label: "Explore Our Maintainers Fund", url: "https://github.com/sponsors/rustfoundation" }],
			background: "teal",
		},
		{
			_type: "cta",
			anchor_id: "ril",
			headline: "Host Your Project at the Rust Foundation",
			text: "The Rust Foundation has the tools, resources, network, and professional expertise to build and scale open source projects through the Rust Innovation Lab.\n\nInterested in how the Rust Foundation can benefit your project through hosting? Learn more here.",
			buttons: [{ label: "Explore the Rust Innovation Lab", url: "/rust-innovation-lab/" }],
			background: "teal",
		},
		{
			_type: "cta",
			anchor_id: "rcn",
			headline: "Join the Rust Commercial Network",
			text: "The Rust Commercial Network (RCN) is where companies and community members work together to advance Rust adoption, share real-world experience, solve shared problems, and support the long-term health of Rust in production together. Rust Foundation membership is not required.",
			buttons: [{ label: "Join the RCN", url: "/rust-commercial-network/" }],
			background: "teal",
		},
	],
});
