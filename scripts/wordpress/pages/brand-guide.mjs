// Brand Guide page: https://rustfoundation.org/brand-guide/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "brand-guide",
	title: "Brand Guide",
	blocks: [
		{
			_type: "page_header",
			headline: "Brand Guide",
			intro: "How to use the Rust Foundation’s logo and visual brand elements.",
			jump_links: [
				{ label: "Rust Foundation Brand Guide", url: "#brand" },
				{ label: "Download Logos", url: "#logos" },
			],
		},
		{
			_type: "rich_text",
			anchor_id: "brand",
			headline: "Rust Foundation Brand Guide",
		},
		{
			_type: "split",
			headline: "Colors",
			text: "The Rust Foundation palette contains two core colors, with three secondary colors. Core colors should be used for defining core design elements of Rust Foundation materials. “Rust Dark Blue” is the key brand color, and “Rust Orange” is a key color to contrast with Rust Dark Blue.\n\nSecondary colors can be used for additional accents or complementary elements. They should not be used on their own or without at least one core color being dominant within a piece of design. Pure black and pure white can additionally be used to define space, hierarchy and design style. Tints of all colors can be used to add variety and depth to design. All core and secondary colors are WCAG AA accessible if used at 100% tint for setting text on a white background. Please use your judgement when setting text at small sizes, to ensure good contrast between foreground and background colors. Larger, bolder text will ensure readability when using some color combinations. Special color Rust Green should only be used as part of designs specifically related to database sustainability. It is not part of the core color set.\n\nRust Dark Blue — CMYK: 100, 90, 30, 40, RGB: 30, 38, 80, Hex: #1E2650\n\nRust Orange — CMYK: 11, 83, 100, 2, RGB: 211, 69, 22, Hex: #D34516\n\nRust Blue — CMYK: 90, 60, 40, 0, RGB: 40, 96, 127, Hex: #28607F\n\nRust Silver — CMYK: 20, 0, 0, 65, RGB: 103, 115, 122, Hex: #67737A\n\nRust Green — CMYK: 40, 0, 60, 55, RGB: 97, 120, 77, Hex: #61784D",
			image: await image(`${U}/2024/07/brand-kit-colors.png`, "Rust Foundation brand colors listed visually and by HEX"),
			image_position: "right",
		},
		{
			_type: "split",
			headline: "Typography",
			text: "Two complementary typefaces have been chosen for the Rust Foundation.\n\nNoto Serif is suitable for setting headings and larger text. Noto Sans is suitable for setting body and smaller text.\n\nBoth typefaces are available free of charge from Google Fonts, and can be used both in print and online. They include a wide variety of multilingual support.\n\nText should be left-aligned or equally justified wherever possible. Centered and right-aligned text should generally be avoided.",
			image: await image(`${U}/2024/07/typography-brand-kit.png`, "Noto Serif and Noto Sans alphabets"),
			image_position: "left",
		},
		{
			_type: "rich_text",
			headline: "Logos",
			body: await richText(
				`<p>The Rust Foundation’s updated, primary logo was introduced in 2023. It features a stylized version of the classic Rust language cog design with our organization’s name inside.</p>
<p>The original Rust Foundation logo, featuring our name beside the Rust language logo, is now a secondary, supporting logo.</p>
<p>The secondary logo should only be used when spacing does not allow for a centered design.</p>
<p>Each version of the logo is available in black, white, and our signature Rust-y orange.</p>`,
			),
		},
		{
			_type: "logo_wall",
			headline: "Primary Logo",
			source: "pick below",
			logos: [
				{ name: "Rust Foundation primary logo in white", logo: await image(`${U}/2023/09/Rust-Foundation-Logo-v.png`, "Rust Foundation primary logo in white") },
				{ name: "Rust Foundation primary logo in black", logo: await image(`${U}/2024/07/rf-logo-primary-black-1.png`, "Rust Foundation primary logo in black") },
				{ name: "Rust Foundation primary logo in Rust orange", logo: await image(`${U}/2024/07/rf–logo-primary-rust-1.png`, "Rust Foundation primary logo in Rust orange") },
			],
			background: "light",
		},
		{
			_type: "logo_wall",
			headline: "Secondary Logo",
			source: "pick below",
			logos: [
				{ name: "Rust Foundation secondary logo in white", logo: await image(`${U}/2023/09/Rust-Foundation-Logo.png`, "Rust Foundation secondary logo in white") },
				{ name: "Rust Foundation secondary logo in black", logo: await image(`${U}/2023/10/Rust-Foundation-Black.png`, "Rust Foundation secondary logo in black") },
				{ name: "Rust Foundation secondary logo in Rust orange", logo: await image(`${U}/2024/07/rf-logo-secondary1-rust.png`, "Rust Foundation secondary logo in Rust orange") },
			],
			background: "light",
		},
		{
			_type: "split",
			anchor_id: "logos",
			headline: "Logo Usage",
			text: "The Rust Foundation’s updated, primary logo was introduced in 2023. It features a stylized version of the classic Rust language cog design with our organization’s name inside.\n\nNever flip, rotate, skew, or otherwise alter the Rust Foundation logo. It should always be used in its original form, with no modifications. Leave space around all edges of the Rust Foundation logo that is at least the x-height of the logo’s text, as shown on this page by green squares.",
			image: await image(
				`${U}/2024/07/logo-usage.png`,
				"Rust Foundation logo usage guidelines featuring do’s and don’ts: 1) Do leave space around the logo, 2) the logo should be taller than 10mm, 3) don’t flip the logo, 4) don’t rotate the logo, 5) don’t skew the logo, 6) don’t modify the logo",
			),
			image_position: "left",
			buttons: [
				{ label: "Download Foundation + Language Logos", url: "/downloads/Rust-Foundation-Logo-Pack.zip" /* ZIPs aren't allowed in the media library */ },
				{ label: "View Rust Trademark Policy", url: "/policy/rust-trademark-policy/" },
			],
		},
	],
});
