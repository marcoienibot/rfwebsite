// Rust Foundation Trusted Training: https://rustfoundation.org/rust-foundation-trusted-training/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, richText }) => ({
	slug: "rust-foundation-trusted-training",
	title: "Rust Foundation Trusted Training",
	blocks: [
		{
			_type: "page_header",
			headline: "A Quality Standard for Rust Training",
			intro:
				"The Rust Foundation Trusted Training program (RFTT) recognizes organizations whose Rust training meets our bar for technical accuracy, instructor quality, and learner experience.",
			icon: await image(`${U}/2026/05/rftt-round-white.png`, "Rust Foundation Trusted Training logo"),
			jump_links: [
				{ label: "Rust Learners: View RFTT Providers", url: "#rftt-providers" },
				{ label: "Rust Training Providers: Get Accredited", url: "#for-training-providers" },
			],
		},
		{
			_type: "cards",
			anchor_id: "about",
			headline: "What Is Rust Foundation Trusted Training?",
			style: "plain",
			cards: [
				{
					title: "A Credible, Foundation-Backed Signal",
					text: "Accreditation demonstrates to the open source ecosystem that a training program meets a documented standard established by a trustworthy nonprofit foundation.",
				},
				{
					title: "Built With Trainers and Members",
					text: "Process and criteria were developed with a steering committee of active Rust training providers and Rust Foundation members. A quality standard for Rust training, shaped by the organizations who’ve been in this space for years.",
				},
				{
					title: "Reviewed By Experts",
					text: "A committee of active Rust training providers assesses every application independently against published criteria. We work with what you’re comfortable sharing — applicants are never required to submit sensitive materials.",
				},
				{
					title: "Trustworthy Assessments",
					text: "Every application is scored against the same documented standard, applied consistently to all applicants.",
				},
			],
		},
		{
			_type: "photo",
			image: await image(`${U}/2026/06/54021505721_26e6b67155_o.jpg`, "Speaker presenting on stage at a Rust conference"),
		},
		{
			_type: "rich_text",
			anchor_id: "for-learners",
			headline: "For Rust Learners:",
		},
		{
			_type: "logo_wall",
			anchor_id: "rftt-providers",
			headline: "Find Rust Foundation Trusted Training",
			text: "The organizations below have been officially accredited as Rust Foundation Trusted Training Providers. Click the logos below to learn more and discover their high-quality Rust training products.",
			source: "rftt-provider",
		},
		{
			_type: "cta",
			headline: "Stay In The Know!",
			text: "Subscribe to our mailing list to receive learner-specific news and updates about the RFTT program, including deals from RFTT providers.",
			buttons: [
				{ label: "Opt-In For Email Updates", url: "https://mailchi.mp/rustfoundation.org/rftt-email-signup" },
			],
			background: "teal",
		},
		{
			_type: "cta",
			anchor_id: "for-training-providers",
			headline: "For Rust Training Providers:",
			text: "Earn the Rust Foundation’s mark of quality for your Rust training programs! Learn more below and consider submitting your training material for RFTT consideration.",
			buttons: [{ label: "Request Application", url: "#apply" }],
			background: "blush",
		},
		{
			_type: "link_list",
			headline: "Jump to:",
			links: [
				{ label: "Benefits", url: "#benefits" },
				{ label: "Eligibility & Criteria", url: "#eligibility" },
				{ label: "Pricing", url: "#pricing" },
				{ label: "Process Overview", url: "#process" },
				{ label: "Application Resources", url: "#resources" },
				{ label: "About Our Reviewers", url: "#reviewers" },
				{ label: "FAQs", url: "#faqs" },
				{ label: "Contact", url: "#contact" },
			],
		},
		{
			_type: "cards",
			anchor_id: "benefits",
			headline: "What RFTT Partners Receive",
			text: "The credential itself is the core benefit of RFTT, but accredited providers also gain visibility, marketing support, and business development opportunities through the Foundation.",
			style: "plain",
			background: "blush",
			cards: [
				{
					title: "Official Designation",
					text: "Market your organization as a Rust Foundation Trusted Training Provider. Display marks in association with your offerings to signal trust.",
				},
				{
					title: "Visibility of Services",
					text: "Rust training offerings publicly listed on the Rust Foundation website, so developers and organizations can find and evaluate your training.",
				},
				{
					title: "Amplification",
					text: "Dedicated spotlight upon announcement, plus up to one social media repost per month across Foundation channels on request.",
				},
				{
					title: "Referral Opportunities",
					text: "When organizations contact the Foundation seeking training, accredited providers are the ones we point them to.",
				},
				{
					title: "Exclusive Event Benefits",
					text: "15% RustConf sponsorship discount, priority consideration for conference workshops, and inclusion in the post-event digital gift bag.",
				},
				{
					title: "Coordinated Sales",
					text: "Opportunities to participate in special coordinated sales promotions (e.g. Cyber Week).",
				},
			],
		},
		{
			_type: "cards",
			anchor_id: "eligibility",
			headline: "Requirements",
			text: "Applicants must be Rust Foundation members in good standing*, with at least two years in business and one year offering Rust training. Applications are reviewed across five areas:",
			style: "boxed",
			background: "blush",
			cards: [
				{
					title: "Credibility & Ethical Practices",
					text: "A demonstrable training track record, clear business practices, and alignment with the Rust Foundation’s Code of Conduct.",
				},
				{
					title: "Content Quality",
					text: "Accurate, up-to-date curriculum with clear learning outcomes, appropriate depth, and a regular update process.",
				},
				{
					title: "Instructor Competence",
					text: "Verifiable Rust expertise and relevant teaching experience for all instructors delivering accredited courses.",
				},
				{
					title: "Transparency & Accessibility",
					text: "Clear public-facing information on course content, structure, prerequisites, pricing, and cancellation policies. Consideration of diverse learners, delivery formats, and geographic and language coverage is a plus.",
				},
				{
					title: "Evaluation & Feedback",
					text: "Mechanisms for assessing learner progress and collecting feedback to support continuous improvement of the program.",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "pricing",
			headline: "RFTT Fees",
			body: await richText(
				`<p>RFTT accreditation is generally only available to member organizations of the Rust Foundation offering Rust training*. All fees are separate from existing Rust Foundation membership dues, which continue on their normal billing schedule.</p>
<p><em>* If you are an individual trainer, a micro-business (up to 3 employees and less than $100,000 USD in annual revenue), and/or a non-member organization interested in pursuing RFTT accreditation, please email us at <a href="mailto:training@rustfoundation.org">training@rustfoundation.org</a> to explore potential options.</em></p>`,
			),
			width: "wide",
		},
		{
			_type: "stats",
			headline: "Accreditation Fee",
			items: [{ value: "$3,000 USD", label: "per year + $500 one-time application fee*" }],
			background: "navy",
		},
		{
			_type: "rich_text",
			body: await richText(
				`<ul>
<li>Invoiced on approval, billed annually over your two-year accreditation period.</li>
<li>Can be prorated onto your existing membership invoice if preferred.</li>
<li>*Application fee is non-refundable &amp; due on submission. Covers the cost of initial review. Review begins once payment is received in full.</li>
</ul>`,
			),
			background: "navy",
		},
		{
			_type: "rich_text",
			anchor_id: "process",
			headline: "About the Process",
			body: await richText(
				"<p>The path to RFTT accreditation takes several weeks from submission to decision. Here’s what to expect at each stage. Click any step to expand and learn more.</p>",
			),
			background: "blush",
		},
		{
			_type: "faq",
			background: "blush",
			items: [
				{
					question: "1. Request Application",
					answer: "Fill out the initial interest form below.",
				},
				{
					question: "2. Apply",
					answer: "The Rust Foundation verifies your eligibility. If eligible, you will receive the application form and instructions for submitting all required materials for review.\n\nYou will then submit the required materials through the application form and pay the initial application fee.",
				},
				{
					question: "3. Independent Review",
					answer: "Foundation staff and the steering committee (a group of active Rust training providers committed to unbiased review) score your application.",
				},
				{
					question: "4. Decision & Agreement",
					answer: "You’ll be informed of the outcome with any relevant feedback. If approved, we send the accreditation agreement and issue an invoice for the annual fee.",
				},
				{
					question: "5. Accreditation Issued",
					answer: "Once the agreement is signed and the annual fee received, your two-year accreditation period starts, and benefit fulfillment begins, starting with a dedicated announcement.",
				},
			],
		},
		{
			_type: "rich_text",
			anchor_id: "resources",
			headline: "Application Support",
			body: await richText(
				`<p>Once we’ve approved your request for the full application, here’s what you need to know before submitting your materials.</p>
<h3>Application Guide &amp; Checklist</h3>
<p><a href="${U}/2026/06/RFTT-Applicant-Checklist-Best-Practices.pdf">↓ View as PDF</a></p>
<p><strong>Best Practices</strong></p>
<p>Before starting the application form, take time to gather all required materials - it’s easy to underestimate. This will help you complete the form efficiently and avoid delays during review.</p>
<ul>
<li><strong>Prepare materials in advance</strong><br>The application form auto-saves responses, allowing you to leave and revisit later, but having everything ready will make it much easier to complete in one sitting.</li>
<li><strong>Prepare translations if needed</strong><br>As committee members from multiple countries will review your application, all materials need to be submitted in English. Please include translations for any materials that are not in English.</li>
<li><strong>Anonymize or redact confidential information</strong><br>Remove or obscure any sensitive client or learner information that you are not permitted to share with third parties.</li>
<li><strong>Provide as much detail as possible</strong><br>Detailed responses help avoid follow-up questions and speed up the review process.</li>
<li><strong>Refrain from AI-generated content</strong><br>We discourage low-effort AI-generated form responses and training materials.</li>
<li><strong>Ask questions before submitting</strong><br>If anything is unclear or doesn’t apply to your organization, reach out to <a href="mailto:training@rustfoundation.org">training@rustfoundation.org</a> in advance. We’re happy to provide guidance.</li>
<li><strong>Pay the $500 application fee by credit card</strong><br>Credit card payment (via Stripe) ensures the fastest processing. Bank transfer is available as an alternative payment option, but it may delay your application. Reviews only begin after full payment is received.</li>
</ul>
<p><strong>Application Checklist</strong></p>
<p>Use this checklist to gather all required information and materials before starting the form.</p>
<p>Note: Materials marked with an asterisk (*) will be evaluated by Rust Foundation staff and the review committee. Materials without an asterisk will be evaluated by Rust Foundation staff only and will not be shared with the review committee.</p>
<p><strong>1. Applicant Information</strong></p>
<ul>
<li>Organization name and DBA (if applicable)*</li>
<li>Any subsidiaries seeking accreditation (if applicable)*</li>
<li>Main contact details (first name, last name, email)</li>
<li>Organization website*</li>
<li>Country of registration</li>
<li>Organization’s legal address</li>
<li>Years in business</li>
<li>Years of offering Rust training</li>
<li>Approximate number of learners trained per year</li>
<li>Types of training programs offered*</li>
</ul>
<p><strong>2. Training Program Overview</strong></p>
<ul>
<li>High-level description of Rust training offerings*</li>
<li>Content update process and frequency*</li>
<li>Approach to evaluating learner understanding and learner success*</li>
<li>Public-facing marketing materials (URLs or document upload)*</li>
<li>Cancellation and refund policy</li>
<li>Methods for collecting and evaluating learner feedback*</li>
<li>If using learner surveys: Submit sample survey (file upload)*</li>
<li>At least two (2) written testimonials from clients or learners, including their names and companies*</li>
<li>Approximate number of training products (courses)*</li>
<li>If multiple courses: Full list of all Rust training programs (document upload)*</li>
</ul>
<p><strong>3. Training Product Information</strong></p>
<p>Applicants offering more than one training product (e.g., multiple different courses) will be asked to share detailed information about at least two (2) sample products. For each submitted training product:</p>
<ul>
<li>Course title*</li>
<li>Detailed course description and outline of covered topics (file upload)*</li>
<li>Training structure (progression of topics, teaching methods)*</li>
<li>Target audience*</li>
<li>Learning outcomes/goals*</li>
<li>Prerequisites (prior knowledge/skills and/or equipment needed)*</li>
<li>Details on hands-on components, if applicable (e.g., coding exercises, projects)*</li>
<li>Details on assessments, if applicable (e.g., quizzes, labs, exams)*</li>
<li>Sample course materials shared with learners (slides, readings, exercises, etc. - file upload)*</li>
</ul>
<p><strong>4. Instructor Information (for each sample product)</strong></p>
<ul>
<li>Full professional biography/curriculum vitae (CV) (file upload)*</li>
<li>Instructor’s technical certifications and credentials, if available*</li>
<li>Description of instructor’s teaching experience and didactic skills*</li>
<li>Any other relevant Rust experience or contributions*</li>
</ul>
<p><strong>5. Acknowledgements</strong></p>
<p>You will need to confirm that:</p>
<ul>
<li>The submitted information is accurate</li>
<li>Additional information or an interview may be required if the submitted materials are deemed insufficient by the review committee</li>
<li>Your organization agrees to report any major changes to its business model or training offerings</li>
<li>Your organization’s training program does not infringe on any third-party intellectual property</li>
<li>Your organization will abide by the Rust Foundation Code of Conduct</li>
<li>The Rust Foundation may collect feedback from your clients/learners in the future</li>
</ul>
<p><strong>6. Fees &amp; Payment</strong></p>
<p>Confirm preferred payment option for annual accreditation fee:</p>
<ul>
<li>Pay $3,000 in full once application is approved</li>
<li>Pay a partial prorated amount once application is approved, and the rest will be added to your annual Rust Foundation membership invoice.</li>
</ul>
<p>Confirm preferred payment option for $500 USD application fee:</p>
<ul>
<li>Pay by credit card (via Stripe) immediately</li>
<li>Pay by bank transfer (provide billing contact for invoice)</li>
</ul>
<h3>Application Criteria</h3>
<p><a href="${U}/2026/06/RFTT-Accreditation-Criteria.pdf">↓ View as PDF</a></p>
<p>All training programs submitted for accreditation must meet the following criteria:</p>
<p><strong>1. Eligibility</strong></p>
<ul>
<li>Rust Foundation member organizations or self-employed/independent individuals who are providing Rust training are eligible to apply.</li>
<li>Participant must have paid the initial application fee.</li>
<li>Participant must be in business for at least 2 years and offer Rust training for at least 1 year.</li>
</ul>
<p><strong>2. Credibility and Ethics</strong></p>
<ul>
<li>Participant must demonstrate professional conduct and credibility.</li>
<li>Participant must disclose any major changes in business model or training products to the Rust Foundation immediately.</li>
<li>Participant’s training products may not infringe on third-party intellectual property.</li>
<li>Participant must abide by the Rust Foundation’s <a href="/policy/code-of-conduct/">Code of Conduct</a>.</li>
</ul>
<p><strong>3. Curriculum Quality</strong></p>
<ul>
<li>Participant demonstrates a commitment to factually correct and relevant Rust content.</li>
<li>Participant demonstrates commitment to following Rust Language best practices and documentation (including but not limited to Official Rust Language <a href="https://doc.rust-lang.org/stable/">documentation</a>, <a href="https://doc.rust-lang.org/stable/reference/index.html">The Rust Reference</a>, <a href="https://rust-lang.github.io/unsafe-code-guidelines/">Unsafe Code Guidelines</a>)</li>
<li>Participant demonstrates a commitment to updating content regularly.</li>
</ul>
<p><strong>4. Instructional Design</strong></p>
<ul>
<li>Participant’s training products must have clear learning objectives and measurable outcomes.</li>
<li>Participant’s training products must offer a logical program structure with aligning learning objectives, materials, and assessments.</li>
</ul>
<p><strong>5. Instructor Qualifications</strong></p>
<ul>
<li>Instructors must demonstrate proficiency in Rust that aligns with the programs they are teaching.</li>
<li>Instructors must demonstrate excellent didactic qualifications.</li>
<li>Instructors must demonstrate professionalism and credibility.</li>
</ul>
<p><strong>6. Transparency and Accessibility</strong></p>
<ul>
<li>Participant’s marketing materials must accurately describe the training products.</li>
<li>Participant must clearly define and communicate target audiences for each training product.</li>
<li>Participant must communicate cancellation and refund policies to learners or clients.</li>
<li>Participant must be considerate of accessibility needs.</li>
<li>Participant must demonstrate commitment to non-discrimination practices and inclusivity.</li>
</ul>
<p><strong>7. Evaluation and Feedback</strong></p>
<ul>
<li>Participant must have mechanisms for collecting learner feedback.</li>
<li>Participant must provide testimonials from learners or clients.</li>
<li>Participant acknowledges that the Rust Foundation reserves the right to collect direct feedback from clients/learners in the future and that this feedback must be made available to the Rust Foundation.</li>
</ul>`,
			),
			background: "blush",
		},
		{
			_type: "people_grid",
			anchor_id: "reviewers",
			headline: "Meet The Review Committee",
			text: "RFTT applications are assessed by a committee of active Rust training professionals and several members of the Foundation staff. Recommendations from the committee are reviewed by Rust Foundation senior management.",
			group: "rftt-reviewers",
			note: "Interested in joining the RFTT review committee? Contact us to express your interest. If there’s a good fit, our team will reach out when a spot opens up.",
		},
		{
			_type: "cta",
			anchor_id: "apply",
			headline: "For Rust Training Providers: Submit Your Interest",
			buttons: [{ label: "Request Application", url: "https://form.typeform.com/to/XCuTt2kh" }],
			background: "white",
		},
		{
			_type: "faq",
			anchor_id: "faqs",
			headline: "FAQs",
			category: "rftt",
			background: "blush",
		},
		{
			_type: "cta",
			anchor_id: "contact",
			headline: "Other Questions?",
			text: "If you are a learner or an organization with other questions about the Rust Foundation Trusted Training Program, feel free to email us at training@rustfoundation.org.",
			buttons: [{ label: "training@rustfoundation.org", url: "mailto:training@rustfoundation.org" }],
			background: "white",
		},
	],
});
