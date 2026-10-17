// 2025 | Year in Review: https://rustfoundation.org/2025/
const U = "https://rustfoundation.org/wp-content/uploads";

export default async ({ image, file, richText }) => ({
	slug: "2025",
	title: "2025 | Year in Review",
	blocks: [
		{
			_type: "page_header",
			headline: "2025 in Review",
			intro:
				"A high-level look at what the Rust Foundation accomplished this year, in collaboration with the Rust Project and with support from our members.",
		},
		{
			_type: "statement",
			label: "TL;DR:",
			text: "2025 was all about supporting the people who make Rust amazing. We invested in the infrastructure and security the ecosystem depends on, strengthened our support for the fantastic maintainer community, engaged with Rust communities worldwide, and celebrated 10 years of stable Rust together at our widest-reaching RustConf yet.",
			background: "teal",
		},
		{
			_type: "rich_text",
			headline: "Executive Director’s Summary",
			background: "teal",
			body: await richText(`
				<p>As we close out 2025, our team is delighted to share a look back at the work the Foundation carried out this year in partnership with the Rust Project, communities across the world, and the organizations that champion Rust every single day. This update reflects what we achieved together, where Foundation support truly moved the needle, and how we are preparing the ecosystem for its next decade. Below you’ll hear directly from the Foundation team whose dedication made this work possible.</p>
				<p>Rust’s momentum this year has been extraordinary. More and more critical systems depend on it, and adoption continues to accelerate across industries. That growth brings both opportunity and responsibility. For the Rust Foundation, it means doubling down on support for maintainers, security, infrastructure, and the communities that shape Rust’s culture and values. I hope the reflections on this page make clear just how seriously we take that role.</p>
				<p>With gratitude,</p>
				<img src="${U}/2025/12/Rebecca.png.png" alt="Rebecca Rumbul’s signature">
				<p><em>Dr Rebecca Rumbul,<br>Executive Director &amp; CEO, the Rust Foundation</em></p>
			`),
		},
		{
			_type: "rich_text",
			headline: "How This Page Works",
			body: await richText(`
				<p>The information on this page comes straight from the Rust Foundation staff. Each section includes:</p>
				<ul>
					<li>Key accomplishments</li>
					<li>What we aimed to improve this year</li>
					<li>What this work meant for the Rust Project</li>
					<li>What it means for Rust users and industry</li>
					<li>Why it matters to Rust’s future</li>
				</ul>
				<p><strong>We invite you to explore what our team worked on throughout 2025 and how it benefited the Rust ecosystem:</strong></p>
			`),
		},
		{
			_type: "link_list",
			links: [
				{ label: "Infrastructure Support", url: "#infra" },
				{ label: "Security", url: "#security" },
				{ label: "Project Support", url: "#project" },
				{ label: "Interoperability", url: "#interop" },
				{ label: "crates.io", url: "#crates" },
				{ label: "Safety-Critical Rust Consortium", url: "#safety" },
				{ label: "Global Community Engagement", url: "#community" },
				{ label: "Rust Learning", url: "#learning" },
				{ label: "Events", url: "#events" },
				{ label: "Acknowledgements", url: "#acknowledgements" },
				{ label: "What’s Next", url: "#next" },
				{ label: "Get Involved", url: "#get-involved" },
			],
		},
		{
			_type: "rich_text",
			anchor_id: "infra",
			headline: "Infrastructure Support",
			body: await richText(`
				<p><strong>Marco Ieni</strong><br><em>Rust Foundation Infrastructure Engineer</em></p>
				<p>Rust requires stable, scalable infrastructure to keep everything running smoothly. A lot of that work is invisible by design: if infrastructure works well, nobody notices. But when it doesn’t? The entire ecosystem can grind to a halt.</p>
				<p>In 2025, I collaborated with the rest of the Rust Project infra team to improve Rust’s infrastructure while reducing friction for maintainers. Their help was invaluable to me. In particular, I’d like to thank my former colleague, Jan David Nose, for his collaboration prior to moving on from the Foundation to pursue new opportunities.</p>
				<h3>Our Goal</h3>
				<p>To ensure Rust’s core infrastructure is more secure, reliable, and cost-efficient than ever — and able to scale with Rust’s global adoption.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Achieved a 75% reduction in Rust Project CI costs by moving jobs to GitHub standard runners, and gave a <a href="https://www.youtube.com/watch?v=Gzk4uG-YzJI&amp;pp=ygULcnVzdGNvbmYgY2k%3D">talk</a> about it</li>
					<li>Implemented secure, out-of-band daily backups for critical Rust assets, such as releases and crates</li>
					<li>Created the <a href="https://github.com/rust-lang/crates-io-auth-action">crates-io-auth-action</a>, which can be used to publish to crates.io using <a href="https://crates.io/docs/trusted-publishing">trusted publishing</a></li>
					<li>Improved the <a href="https://github.com/rust-lang/team">team</a> repository by implementing new automations and adding a changes preview</li>
					<li>Kept cloud costs under control by optimizing the infrastructure</li>
					<li>Supported initiatives from other Rust Project members, such as converting <a href="https://rust-lang.org">rust-lang.org</a> to a static website or improving the <a href="https://github.com/rust-lang/bors">bors rewrite</a></li>
				</ul>
				<h3>Why This Matters</h3>
				<p>For the Rust Project, these improvements reduce operational load, prevent outages, and streamline the processes that keep Rust shipping reliably. For Rust users, more stable infrastructure means faster releases, fewer disruptions, and higher trust in the tools they use daily. A stronger infrastructure foundation ensures Rust continues to grow at global scale with confidence. Keeping Rust cloud cost under control ensures Rust is sustainable for the long term.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "security",
			headline: "Security",
			body: await richText(`
				<p><strong>Adam Harvey</strong><br><em>Software Developer</em></p>
				<p><strong>Walter Pearce</strong><br><em>Security Engineer</em></p>
				<p>We spent 2025 working within the Rust Project, Rust ecosystem, and in collaboration with other language ecosystems via initiatives including <a href="https://alpha-omega.dev/">Alpha-Omega</a> and <a href="https://openssf.org/">OpenSSF</a> to respond to present and emerging threats, building tools that will be necessary for Rust to remain secure in the future, and developing and evangelising best practices for Rustaceans everywhere.</p>
				<h3>Our Goal</h3>
				<p>Ensuring that the Rust ecosystem uses and promotes the best security practices, both in terms of Rust itself and the broader world of crates.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Moved towards consensus on implementing the <a href="https://theupdateframework.com/">TUF protocol</a> for Rust releases and <a href="https://crates.io">crates.io</a>, with an out-of-tree experimental deployment expected to start in 2026.</li>
					<li>Built out crate analysis tooling to more rapidly identify and handle malicious crates, along with starting development on automated dashboards to identify and analyse suspicious user patterns.</li>
					<li>Collaborated with the <a href="https://crates.io">crates.io</a> team, Rust security response working group, and other ecosystems via Alpha-Omega to better handle emerging security threats and to improve our ability to respond to them.</li>
					<li>Built experimental static and runtime capability analysis tooling for Rust as part of the <a href="https://github.com/google/capslock">Capslock project</a>.</li>
					<li>Assisted the <a href="https://crates.io">crates.io</a> team in responding to 18 different malicious or suspicious crate files in the ecosystem.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>Three-quarters of Rust users in the <a href="https://blog.rust-lang.org/2025/02/13/2024-State-Of-Rust-Survey-results/">2024 State of Rust survey</a> indicated that security was a key reason for their use of Rust. Rust usage is also increasing rapidly, both in commercial and individual contexts.</p>
				<p>All of those users rely on a secure, trustworthy ecosystem. Our work in 2025 meant safer crate dependencies, earlier detection of malicious activity, and a more trustworthy supply chain. Strengthening Rust’s security today ensures that as adoption grows, Rust remains safe, resilient, and ready for the future.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "project",
			headline: "Project Support",
			body: await richText(`
				<p><strong>Lori Lorusso</strong><br><em>Director of Outreach</em></p>
				<p>2025 was a big year for the Rust Project as it celebrated its 10th anniversary, with the Foundation joining the excitement at the All Hands and contributing $100,000 to help fund the event. It was also a significant year for the Foundation as we said a fond farewell to Paul Lenz, Director of Finance, and welcomed… me! My new role as Director of Outreach was created to handle part of Paul’s former funding-coordination work while serving as a liaison between the Foundation, the Project, and the broader tech community. Since starting in August, I’ve been connecting with Rust users in a variety of industries and engaging with Project Members whose passion for enhancing and innovating in Rust has been inspiring. I look forward to meeting more Project Members and continuing to bring the Project, Rust users, and the Foundation closer together in 2026 and beyond.</p>
				<h3>Our Goal</h3>
				<p>Direct financial support of Rust Project members and to foster community and partnership between the Project, the Foundation, and the users of Rust.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>The Rust Foundation worked with the Leadership Council to contract a full-time Rust Project Manager, Tomas Sedovic, and part-time Compiler-ops contract work with Antonio Piraino.</li>
					<li>Under the guidance of the Leadership Council, the Foundation provided over $100,000 in travel grants to 50+ Project Members, giving them an opportunity to share learnings and join their peers in person.</li>
					<li>The Foundation funded 5 Fellows and 1 Project Grantee, and sponsored several community events.</li>
					<li>I joined the Rust Project’s Content Team, Vision Team, and the Rust Foundation Maintainers Fund subcommittee, and have attended several Leadership Council meetings.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>The Rust Foundation continues to play a vital role in strengthening and expanding the Rust ecosystem, and my work helps connect support programs with the contributors who need them most. By actively engaging with Project teams and working groups, I help identify needs and implement targeted initiatives that provide strategic financial support, tools, professional development, or other resources. All of this empowers maintainers, community members, and organizers to do their best work and move the Rust language forward in a collaborative way.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "interop",
			headline: "Rust & C++ Interoperability",
			body: await richText(`
				<p><strong>Jon Bauman</strong><br><em>Interoperability Engineer</em></p>
				<p>As Rust gains maturity and finds broader application in all system software contexts, it is increasingly used alongside C++. The importance of ergonomic and efficient interoperability is growing, and as calls for transitions to memory-safe languages continue to rise, the essentiality of effectively using Rust and C++ together to meet performance and safety goals is coming into focus.</p>
				<p>In the year since the <a href="https://github.com/rustfoundation/interop-initiative/blob/main/problem-statement.md">C++/Rust Interoperability Problem Statement</a> was published, there have been remarkable successes in “<a href="https://github.com/rustfoundation/interop-initiative/blob/main/problem-statement.md#social-interoperability">the most ambitious and least certain</a>” strategy of engaging with the C++ community and ISO standardization committee (<a href="https://en.wikipedia.org/wiki/C%2B%2B#Standardization">WG21</a>) directly, culminating in the “<a href="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3874r0.pdf">Safety Strategy Requirements for C++</a>” proposal.</p>
				<p><a href="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3651r0.pdf">Though WG21 has taken the issue of memory safety extremely seriously</a>, building the necessary consensus around a solution applicable to the many billions of lines of legacy C++ has proven difficult. Through collaboration, relationship-building, and mutual education, the interop initiative pursued a mutually productive course for both languages as well as their interoperability: focus on committing to adding memory safety to C++ so it remains a viable choice for new development. Pursuing this <a href="https://stroustrup.com/SELLrationale.pdf">subset-of-superset approach</a> advocated by <a href="https://en.wikipedia.org/wiki/Bjarne_Stroustrup">Bjarne Stroustrup</a> for over 20 years (also the basis for Rust’s safe/unsafe dichotomy) has the potential to deliver a future where interoperability between the languages can occur with end-to-end memory safety.</p>
				<h3>Our Goal</h3>
				<p>To define and advance a long-term, collaborative strategy for safe, practical, and widely-adopted Rust–C++ interoperability.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Joined WG21; attended 3 meetings, <a href="https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3874r0.pdf">authored one proposal</a>, and <a href="https://github.com/camio/trivially_relocate_primitives">co-authored a second</a></li>
					<li>Organized the first face-to-face meeting between WG21 and Rust Project members during RustWeek and an interop-focused session during RustConf</li>
					<li>Proposed a 2025H2 project goal: “<a href="https://github.com/rust-lang/rust-project-goals/blob/main/src/2025h2/interop-problem-map.md">C++/Rust Interop Problem Space Mapping</a>”</li>
					<li>Spoke on “<a href="https://www.youtube.com/watch?v=mJr8qgnLvpw">High-Performance Software Security and Memory Safety</a>” at the <a href="https://events.linuxfoundation.org/open-source-finance-forum-london/">Open Source in Finance Forum</a></li>
					<li>Secured funding for <a href="https://borrowsanitizer.com">BorrowSanitizer</a> development, a project to help detect memory-safety violations at the unsafe interop boundary</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>Memory safety problems are both the most significant source of vulnerabilities and lead to issues that have caused injury, death and catastrophic financial harm for decades. The proven viability of memory-safe systems languages makes it incumbent upon technologists to bring these benefits to all the humans affected in our modern technology-infused society. The initiative’s proposal presented in the November meeting received <a href="https://github.com/cplusplus/papers/issues/2475#issuecomment-3505486005">virtually unanimous consensus</a> and will progress to the final stage of the Evolution Working Group at the next meeting in March. Paving the way to this better future and forging cooperation across different technology communities demonstrates the commitment of the Rust Foundation to not just bring about a better future for Rust, but for all of humanity.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "crates",
			headline: "crates.io",
			body: await richText(`
				<p><strong>Tobias Bieniek</strong><br><em>crates.io Engineer</em></p>
				<p>As the Rust Foundation’s crates.io engineer, my work this year focused on making the platform more secure, faster, and easier to maintain. With the Rust ecosystem growing rapidly, keeping crates.io reliable while shipping meaningful improvements is a constant balancing act. I spent 2025 delivering new features, strengthening security, and modernizing core systems to ensure crates.io can scale with Rust’s continued growth.</p>
				<h3>Our Goal</h3>
				<p>To keep crates.io fast, secure, and reliable as the ecosystem grows, while reducing friction for both crate authors and contributors.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Delivered Trusted Publishing for GitHub Actions and GitLab CI, allowing crate authors to publish without long-lived API tokens. This eliminates credential management in CI/CD workflows and reduces the risk of token leaks.</li>
					<li>Implemented crate deletion, allowing users to remove their crates under specific conditions.</li>
					<li>Rolled out OpenGraph image generation for crate pages, making shared links more visually appealing on social media. The rendering system was extracted into a separate repository for docs.rs to reuse.</li>
					<li>Added Source Lines of Code (SLoC) counting to the API and UI, with a background task system to process both new and existing crates.</li>
					<li>Made major performance improvements: in-database semver sorting eliminates the need to load all versions into memory, background worker query fixes delivered 10,000x speedups for long queues, and pipelined database queries reduced latency across the board.</li>
					<li>Completed the async/await migration for most backend code using diesel-async, modernizing the codebase and improving maintainability.</li>
					<li>Shipped multiple security improvements: encrypted GitHub OAuth tokens, publish notification emails to detect unauthorized publications, default token expiration on the creation form, and resurrection attack prevention for Trusted Publishing.</li>
					<li>Extracted several internal crates and moved integration tests to a dedicated compile unit, significantly reducing build times for contributors.</li>
					<li>Generated an OpenAPI specification for the crates.io API using utoipa.</li>
					<li>Made upstream contributions to diesel, utoipa, serde_html_form, and other ecosystem crates.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>crates.io is critical infrastructure for Rust. Every “cargo build” depends on it, and many developers cite the crates ecosystem as a major reason they successfully use Rust. As a small team managing a platform with 2-3x annual growth, we have to be strategic: invest in security before threats materialize, keep the codebase maintainable so we can move fast, and reduce friction for maintainers so the ecosystem stays healthy. This year’s work moves us forward on all three fronts.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "safety",
			headline: "Safety-Critical Rust Consortium",
			body: await richText(`
				<p><strong>Joel Marcey</strong><br><em>Director of Technology</em></p>
				<p>As Rust gains traction in industries where failure is not an option, organizations increasingly need pathways to adopt Rust in safety-critical systems. The Safety-Critical Rust Consortium brings together companies, experts, and stakeholders to coordinate priorities, deepen shared understanding, and accelerate the development of tools and practices needed for Rust in high-assurance environments.</p>
				<h3>Our Goal</h3>
				<p>To support the responsible use of the Rust programming language in safety-critical software systems whose failure can impact human life or cause severe environmental or property harm.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Convened partners across aerospace, automotive, finance, and defense, exploring memory-safe languages for their applications.</li>
					<li>Advanced shared priorities for safety-critical Rust adoption.</li>
					<li>Began establishing common coding guidelines and tooling to support the use of Rust in safety-critical systems.</li>
					<li>Delivered a self-sustaining entity managed and run by safety-critical experts.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>For the Rust Project, this work surfaces important requirements for tooling, testing, and language ergonomics required for safety-critical applications. For Rust users in high-assurance industries, it accelerates adoption and provides clearer pathways to building safe, certifiable systems. Long term, this positions Rust as a leader in safety-critical software for decades to come.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "community",
			headline: "Global Community Engagement",
			body: await richText(`
				<p><strong>Ernest Kissiedu</strong><br><em>Global Rust Communities Coordinator</em></p>
				<p>Working with Rust communities worldwide has been a genuinely inspiring part of my ongoing work with the Rust Foundation. Every region has its own stories, challenges, and strengths — and supporting organizers as they build those local connections has made it even clearer how essential community leadership is to Rust’s long-term health. In 2025, my focus was not only on helping communities grow sustainably, but also on shaping a more intentional global strategy for how the Foundation supports organizers, especially in regions where Rust adoption is accelerating.</p>
				<h3>Our Goal</h3>
				<p>To ensure Rust communities everywhere have the resources, visibility, and support they need to grow, connect, and lead.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Provided grants and practical support for community-run meetups, conferences, and workshops around the world</li>
					<li>Offered mentorship and resources for new and emerging event organizers</li>
					<li>Expanded support in historically underserved regions with rapidly growing Rust communities</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>For Rust, strong global communities help distribute knowledge, surface new contributors, and expand the diversity of voices shaping Rust’s direction. For Rust users, accessible and regionally-rooted communities make it easier to learn, collaborate, and feel represented in the ecosystem. Long term, global community strength ensures that Rust’s growth is sustainable, inclusive, and reflective of the people who use it worldwide.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "learning",
			headline: "Rust Learning",
			body: await richText(`
				<p><strong>Tina Krauss</strong><br><em>Program Manager</em></p>
				<p>Joining the Foundation this past summer gave me the chance to jump right into one of our emerging areas of work: Rust learning. My first few months were spent researching what it would take for the Foundation to support clearer, more consistent learning pathways — not by reinventing what the community already does well, but by understanding how we can complement it. That early groundwork helped shape our initial development efforts this year, including the exploration of a Rust Foundation Trusted Training Program. More to share in 2026!</p>
				<h3>Our Goal</h3>
				<p>To understand where the Foundation can meaningfully support and expand the ecosystem of Rust learning — especially for contributors, production users, and organizations adopting Rust at scale.</p>
				<h3>Key Accomplishments</h3>
				<ul>
					<li>Conducted research into how developers learn Rust today — and where gaps and friction persist</li>
					<li>Engaged with member companies and training providers to understand industry needs</li>
					<li>Explored models for a Rust Foundation Trusted Training Program, a major initiative for next year that will elevate high-quality Rust training providers without duplicating existing community work</li>
					<li>Laid groundwork for future educational offerings focused on contributor skills, secure Rust development, and organizational Rust adoption.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>Clear, reliable learning pathways help everyone who touches Rust. For the Rust Project, better-prepared contributors and adopters increase code quality and lighten the load on maintainers. For Rust users — whether individual developers or entire engineering teams — trustworthy training options make it easier to learn Rust well, onboard teammates, and adopt the language with confidence.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "events",
			headline: "Events",
			body: await richText(`
				<p><strong>Gracie Gregory</strong><br><em>Director of Communications &amp; Marketing</em></p>
				<p>Helping shape and drive our events this year has been one of the most interesting and challenging parts of my work at the Foundation. Over time, I’ve learned that RustConf and Rust Global aren’t just events that come and go— they’re places where people finally meet face to face, share ideas, and get reconnected with why they care about Rust in the first place. As Rust’s ecosystem continues to grow more global and more professional, it’s become even clearer how important it is for the Foundation to create spaces that bring people together, spark collaboration, and help Rust communities feel seen and supported.</p>
				<h3>Our Goal</h3>
				<p>To strengthen the future of Rust Foundation events so they serve not only as celebrations of Rust’s achievements, but also as intentional spaces for collaboration, meaningful networking, job discovery, adoption-focused dialogue, and cultivate community leadership.</p>
				<h3>Key Accomplishments</h3>
				<p>In 2025, we brought RustConf to Seattle, Washington and online. This installment of RustConf featured:</p>
				<ul>
					<li>Amazing talks from Rust maintainers and other real-world users.</li>
					<li>The chance for people who’ve collaborated online for years to finally meet in person</li>
					<li>Exciting announcements onstage, like Arm becoming a Platinum Member, and the launch of Rust Innovation Lab – a new program designed to host critical Rust projects within the Foundation and provide them long-term support, structure, and stability.</li>
					<li>Massive growth in virtual attendance between 2024 and 2025. RustConf reached more people around the world than ever!</li>
					<li>Continued building out Rust Global, our series designed to bring Rust professionals together for connection, collaboration, and open learning, hosting events in the UK, China, and Japan — with Asia emerging as a standout moment given the community’s incredible growth there.</li>
				</ul>
				<h3>Why This Matters</h3>
				<p>Events help bring the Rust ecosystem closer together in really tangible ways. For the Rust Project, they create opportunities for maintainers and contributors to align, share context, and strengthen relationships that make collaboration smoother year-round. For Rust users, they offer access to new ideas, new peers, and new opportunities — whether that’s learning from experts, meeting future teammates, or finding their place in the community. And for Rust’s future, creating spaces where people can connect and grow together is essential to keep the ecosystem strong, vibrant, and welcoming as it continues to expand.</p>
			`),
		},
		{
			_type: "rich_text",
			anchor_id: "next",
			headline: "What’s Next",
			background: "teal",
			body: await richText(`
				<p>Rust is showing up in more critical places every day, and our goal for 2026 is to ensure the ecosystem behind it grows just as strong, stable, and supported. Starting in 2026, you can expect continued focus on the following areas in particular:</p>
				<ul>
					<li><strong>Supporting maintainers</strong> — the people doing the hard, essential work that keeps Rust moving.</li>
					<li><strong>Strengthening infrastructure and security</strong> — so Rust remains reliable and safe at every layer.</li>
					<li><strong>Growing community leadership around the globe.</strong></li>
					<li><strong>Creating clear pathways for organizations to contribute back responsibly</strong> — whether through funding, engineering time, or partnership</li>
				</ul>
			`),
		},
		{
			_type: "statement",
			text: "Read our 2025 Annual Report to learn how support from our members and collaborators helped fund the work highlighted on this page. Visit our 2026-2028 Strategy page to find out how we’re carrying out our mission in this chapter:\n\nThe next chapter of Rust is going to be extraordinary — and we are committed to supporting and stewarding it responsibly.",
			buttons: [
				{ label: "2025 Annual Report", url: await file(`${U}/2026/01/2025-Annual-Report.pdf`) },
				{ label: "2026-2028 Strategy", url: "/strategic-plan/" },
			],
			background: "teal",
		},
		{
			_type: "rich_text",
			anchor_id: "acknowledgements",
			headline: "To Our Supporters & Collaborators: Thank You",
			background: "teal",
			body: await richText(`
				<p>We’re grateful to everyone who played a role in Rust’s progress this year — maintainers, contributors, community organizers, working groups, and partners across the ecosystem. And a special thank you to our <a href="/members/">members</a>: your support directly powers the programs and investments highlighted throughout this page.</p>
			`),
		},
		{
			_type: "cta",
			anchor_id: "get-involved",
			headline: "Help us sustain the future of Rust!",
			text: "If your company uses Rust and wants to be part of sustaining the work behind this amazing ecosystem, we’d love to collaborate.",
			buttons: [{ label: "Get Involved", url: "/get-involved/" }],
			background_image: await image(`${U}/2024/07/about-graphic.png`, ""),
		},
	],
});
