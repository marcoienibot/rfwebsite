// Events: https://rustfoundation.org/events/
// The calendar itself comes from the Events collection (`events` blocks).
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "events",
	title: "Events",
	blocks: [
		{
			_type: "page_header",
			headline: "Events",
			intro:
				"The Rust language ecosystem is fueled by collaboration and a common belief in the power of open source software. That’s why the Rust Foundation invests in hosting, sponsoring, and attending meaningful events around the world.\n\nBelow, you’ll find information about how we help power the Rust event landscape.",
			buttons: [
				{ label: "Event Calendar", url: "#calendar" },
				{ label: "Hosted Events", url: "#hosted" },
				{ label: "Rust Foundation Event Sponsorship", url: "#sponsorship" },
			],
		},
		{
			_type: "events",
			anchor_id: "calendar",
			headline: "Browse our events calendar to find upcoming events we’re hosting, sponsoring, and attending:",
			show: "upcoming",
			count: 0,
		},
		{
			_type: "events",
			headline: "Previous Events",
			show: "past",
			count: 0,
		},
		{
			_type: "rich_text",
			body: await richText(`
				<p><em>Please note that we only list events on this calendar that the Rust Foundation is sponsoring or supporting through a grant — or those that our staff members are attending and/or speaking at. We do not accept calendar submissions from the public at this time.</em></p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "hosted",
			headline: "Rust Foundation-Hosted Events",
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "right",
			headline: "RustConf",
			text: "The Rust Foundation is proud to serve as the host of RustConf since 2024. This much-loved event is one of the longest-running in the Rust ecosystem and caters to Rustaceans of all backgrounds and levels of experience. RustConf 2026 is taking place from September 8-11! Visit the RustConf website to learn more.",
			button_label: "Visit Website",
			button_url: "https://rustconf.com",
			image: await image(
				`${U}/2024/02/Screenshot-2024-09-23-at-10.52.39%E2%80%AFAM.png`,
				"Speaker on stage at RustConf with the Rust logo projected behind the audience",
			),
		},
		{
			_type: "feature_band",
			color: "slate",
			image_side: "left",
			headline: "Rust Global",
			text: "Rust Global is a new series of events and event tracks created and hosted by the Rust Foundation. Rust Global events cater to the people and organizations using Rust in production all over the world. Our last Rust Global event was co-located with RustConf 2024 in Montreal, Canada. Stay tuned for future installments!",
			image: await image(
				`${U}/2024/02/Screenshot-2024-09-23-at-10.54.47%E2%80%AFAM.png`,
				"Ernest Kissiedu speaking at Rust Global",
			),
		},
		{
			_type: "cta",
			anchor_id: "sponsorship",
			headline: "Interested in Supporting a Rust Foundation Event?",
			text: "The Rust Foundation has begun hosting Rust-focused events with plans to expand access to communities around the world.\n\nIf you are interested in supporting one of our upcoming events (listed above) as an organization or individual sponsor, we would love to hear from you!",
			buttons: [{ label: "Email Us", url: "mailto:contact@rustfoundation.org" }],
			background: "white",
		},
	],
});
