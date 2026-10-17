// Careers page: https://rustfoundation.org/careers/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "careers",
	title: "Careers",
	blocks: [
		{
			_type: "page_header",
			headline: "Rust Foundation Careers",
			intro:
				"Interested in joining our team? Learn more about working at the Rust Foundation and check for new opportunities on this page.",
		},
		{
			_type: "rich_text",
			headline: "Life at the Rust Foundation",
		},
		{
			_type: "feature_band",
			color: "teal",
			image_side: "right",
			headline: "Flexibility",
			text: "We are a small (but growing!) team of global professionals with diverse backgrounds and skill sets. We work entirely remotely, across several time zones, and frequently while on the move. Team members are free to work wherever they have an internet connection.",
			image: await image(`${U}/2024/09/flexibility.png`, "Shuffle arrows icon"),
		},
		{
			_type: "feature_band",
			color: "slate",
			image_side: "left",
			headline: "Transformative Opportunities",
			text: "Working at the Rust Foundation means you’ll have the chance to help shape the future of the most admired and exciting programming language in open source (can you tell what we’re passionate about around here?). Our leadership team is always eager to discuss your career path – at the Rust Foundation and beyond.",
			image: await image(`${U}/2024/09/impact-1.png`, "Seedling icon"),
		},
		{
			_type: "feature_band",
			color: "navy",
			image_side: "right",
			headline: "Competitive Benefits",
			text: "Our benefits vary by location due to the distributed nature of our organization. We offer a robust package of benefits, generally including:\n\n• Medical and dental coverage\n\n• Life, accident, and disability insurance\n\n• Paid vacation days\n\n• Paid sick days\n\n• Paid personal leave\n\n• Paid parental leave\n\n• Retirement plans",
			image: await image(`${U}/2024/09/benefits.png`, "Hands around a health cross icon"),
		},
		{
			_type: "rich_text",
			headline: "Current Openings",
			body: await richText(
				`<p><em>The Rust Foundation is not actively hiring at the moment, but if you feel you’d be a great fit here, please follow our social media accounts (<a href="https://www.linkedin.com/company/rust-foundation">LinkedIn</a>; <a href="https://mastodon.social/@rustfoundation">Mastodon</a>; <a href="https://bsky.app/profile/rustfoundation.org">Bluesky</a>) to hear about new vacancies.</em></p>`,
			),
		},
	],
});
