// Cloud Compute Program: https://rustfoundation.org/cloud-compute-program/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "cloud-compute-program",
	title: "Cloud Compute Program",
	blocks: [
		{
			_type: "page_header",
			headline: "Cloud Compute Program",
			intro: "Free cloud compute infrastructure for Rust Project maintainers around the world.",
			buttons: [{ label: "Cloud Compute Program Policy", url: "/policy/cloud-compute-program/" }],
		},
		{
			_type: "rich_text",
			body: await richText(
				`<p>The rapid adoption of the Rust programming language has made the Rust developer community the fastest growing in recent history. This interest, usage, and adoption has created unprecedented demand for the work of the engineers maintaining and contributing to the open source Rust Project and its ecosystem.</p>
<p>Committing code to the Rust Project is a multi-step process where one change request frequently takes as long as an hour to complete, usually tying up maintainers’ private, local machines.</p>
<p><strong>Compiling the Rust compiler on a 4-core CPU (typically found in a standard laptop) takes up to 25 minutes, including testing. A 96-core cloud virtual machine can complete the same build in less than five minutes with tests completed in 35 seconds.</strong></p>
<p>With the Cloud Compute Program, the Rust Foundation is providing maintainers around the world with access to free cloud compute, allowing them to build and test code more efficiently which is saving them money and personal time.</p>`,
			),
			width: "wide",
		},
		{
			_type: "logo_wall",
			headline: "Providers",
			source: "cloud-provider",
		},
		{
			_type: "statement",
			text: "If you have questions about the Cloud Compute Program or if you’re interested in supporting it as a provider, please contact us at contact@rustfoundation.org.",
			buttons: [{ label: "contact@rustfoundation.org", url: "mailto:contact@rustfoundation.org" }],
			background: "white",
		},
		{
			_type: "quotes",
			headline: "Perspectives",
			items: [
				{
					quote: "“An Open Source ecosystem is only as strong as its maintainers and their ability to contribute. We are proud to provide compute power on Microsoft Azure to support the continued development of the Rust language.”",
					name: "Nell Shamrell-Harrington",
					role: "Principal Software Engineer at Microsoft, Rust Foundation Member Director, Rust Foundation Board of Directors Vice-Chair",
					photo: await image(`${U}/2023/09/nell.png`, "Nell Shamrell-Harrington"),
				},
				{
					quote: "“It has been fantastic to finally have access to a beefy machine for rustc builds that I don’t have to spend time managing personally. It’s 2-3 times faster than my laptop and helps me stay focused on fewer tasks for longer with shorter interruptions from test cycles.”",
					name: "Jane Losare-Lusby",
					role: "Rust Project Member, Error Handling Project Group Lead, Former Rust Foundation Project Director of Collaboration, Principal Rust Open Source Engineer @ Futurewei Tech",
					photo: await image(`${U}/2023/09/jane.jpg`, "Jane Losare-Lusby"),
				},
				{
					quote: "“Giving all maintainers access to powerful cloud compute will mean that developers are spending their time on code, not waiting for builds. This can save the Rust compiler team thousands of hours every month.”",
					name: "Shane Miller",
					role: "Former Rust Foundation Chair",
					photo: await image(`${U}/2023/09/shane.jpg`, "Shane Miller"),
				},
			],
			background: "navy",
		},
		{
			_type: "cta",
			anchor_id: "contact",
			headline: "Want to learn more or support the program?",
			text: "Email us at contact@rustfoundation.org today.",
			buttons: [{ label: "contact@rustfoundation.org", url: "mailto:contact@rustfoundation.org" }],
			background: "white",
		},
	],
});
