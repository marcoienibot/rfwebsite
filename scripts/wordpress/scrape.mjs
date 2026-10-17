// Reads structured data out of the rendered WordPress pages: people (board,
// staff, contributors), organisations (members, donors, sponsors, partners)
// and FAQs. Their custom post types aren't exposed in the WordPress API.
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import * as cheerio from "cheerio";

import { decodeEntities } from "./convert.mjs";

// [page, heading above the module] → group in EmDash
const PEOPLE_GROUPS = {
	"about|Member Directors": "member-directors",
	"about|Project Directors": "project-directors",
	"about|Our Team": "staff",
	"security-initiative|Key Contributors": "security-contributors",
	"infrastructure|Key Contributors": "infrastructure-contributors",
	"rust-foundation-trusted-training|Meet The Review Committee": "rftt-reviewers",
};

const ORGANIZATION_GROUPS = {
	"members|Platinum": "platinum",
	"members|Gold": "gold",
	"members|Silver": "silver",
	"members|Associate": "associate",
	"members|Open Source Partnerships": "open-source-partnership",
	"about|Infrastructure and Technology Donors": "infrastructure-donor",
	"infrastructure|Donors": "infrastructure-donor",
	"security-initiative|Program Sponsors": "security-sponsor",
	"cloud-compute-program|Providers": "cloud-provider",
	"safety-critical-rust-consortium|Founding Members": "scrc-founder",
	"rust-foundation-trusted-training|Find Rust Foundation Trusted Training": "rftt-provider",
	"interop-initiative|Supported by:": "interop-supporter",
};

const FAQ_GROUPS = {
	"faq|Mission, Purpose, & Leadership": "mission-purpose-leadership",
	"faq|Definitions": "definitions",
	"faq|Finance, Funding, & Membership": "finance-funding-membership",
	"faq|Legal & Administrative Information": "legal-administrative",
	"faq|Decision-Making & Collaboration": "decision-making-collaboration",
	"faq|Transparency & Communication": "transparency-communication",
	"faq|Initiatives": "initiatives",
	"rust-innovation-lab|Curious About Joining the RIL?": "rust-innovation-lab",
	"rust-foundation-trusted-training|FAQs": "rftt",
};

const clean = (text) => decodeEntities(text ?? "").replace(/\s+/g, " ").trim();

/** Largest image in an <img>'s srcset (lazy-loaded images keep it in data-lazy-*). */
function bestImage($img) {
	const srcset = $img.attr("data-lazy-srcset") ?? $img.attr("srcset") ?? "";
	const candidates = srcset
		.split(",")
		.map((part) => part.trim().split(/\s+/))
		.filter(([url, width]) => url && width)
		.map(([url, width]) => ({ url, width: Number.parseInt(width, 10) }))
		.sort((a, b) => b.width - a.width);
	const src = $img.attr("data-lazy-src") ?? $img.attr("src");
	return candidates[0]?.url ?? (src?.startsWith("data:") ? undefined : src);
}

/** Paragraph text of a modal or accordion body, links dropped. */
function paragraphsOf($, $el) {
	const blocks = $el.find("p, li");
	if (blocks.length === 0) return clean($el.text());
	return blocks
		.map((_, p) => clean($(p).text()))
		.get()
		.filter(Boolean)
		.join("\n\n");
}

async function eachModule(cacheDir, page, selector, groups, callback) {
	const html = await readFile(join(cacheDir, "html", `${page}.html`), "utf8").catch(() => null);
	if (!html) return;
	const $ = cheerio.load(html);
	let heading = "";
	$(`h1,h2,h3,h4,${selector}`).each((_, el) => {
		const $el = $(el);
		if (/^h[1-4]$/.test(el.tagName)) {
			if (!$el.closest(".cmp-team, .cmp-roles, .cmp-modal, .fl-accordion").length) heading = clean($el.text());
			return;
		}
		const group = groups[`${page}|${heading}`];
		if (group) callback($, $el, group);
	});
}

export async function scrapePeople(cacheDir) {
	const people = new Map();
	const pages = [...new Set(Object.keys(PEOPLE_GROUPS).map((key) => key.split("|")[0]))];
	for (const page of pages) {
		await eachModule(cacheDir, page, ".cmp-team", PEOPLE_GROUPS, ($, $module, group) => {
			$module.find(".cmp-team__item").each((index, item) => {
				const $item = $(item);
				const name = clean($item.find(".cmp-team__item-name").first().text());
				if (!name) return;
				const person = people.get(name) ?? {
					name,
					role: clean($item.find(".cmp-team__item-position").first().text()),
					photo: bestImage($item.find("img.cmp-team__item-img").first()),
					bio: paragraphsOf($, $item.find(".cmp-modal__content").first()),
					groups: [],
					order: (people.size + 1) * 10,
				};
				if (!person.groups.includes(group)) person.groups.push(group);
				people.set(name, person);
			});
		});
	}
	// Ferris placeholders stand in for missing photos on the live site.
	for (const person of people.values()) {
		if (person.photo?.includes("ferris")) person.photo = undefined;
	}
	return [...people.values()];
}

export async function scrapeOrganizations(cacheDir) {
	const organizations = new Map();
	const pages = [...new Set(Object.keys(ORGANIZATION_GROUPS).map((key) => key.split("|")[0]))];
	for (const page of pages) {
		await eachModule(cacheDir, page, ".cmp-roles", ORGANIZATION_GROUPS, ($, $module, group) => {
			$module.find(".cmp-roles__item").each((_, item) => {
				const $item = $(item);
				const name =
					clean($item.find(".cmp-modal__title").first().text()) ||
					clean($item.find("img").first().attr("alt"));
				if (!name) return;
				const key = name.toLowerCase();
				const org = organizations.get(key) ?? {
					name,
					logo: bestImage($item.find("img.cmp-roles__item-img").first()),
					website: $item.find(".cmp-modal__btn-primary").attr("href") || undefined,
					joined: clean($item.find(".cmp-modal__position").first().text()).replace(/^Joined\s*/i, "") || undefined,
					bio: paragraphsOf($, $item.find(".cmp-modal__content").first()),
					groups: [],
					order: (organizations.size + 1) * 10,
				};
				if (!org.groups.includes(group)) org.groups.push(group);
				organizations.set(key, org);
			});
		});
	}
	return [...organizations.values()];
}

export async function scrapeFaqs(cacheDir) {
	const faqs = [];
	const pages = [...new Set(Object.keys(FAQ_GROUPS).map((key) => key.split("|")[0]))];
	for (const page of pages) {
		await eachModule(cacheDir, page, ".fl-accordion", FAQ_GROUPS, ($, $module, category) => {
			$module.find(".fl-accordion-item").each((index, item) => {
				const $item = $(item);
				const question = clean($item.find(".fl-accordion-button-label").first().text()).replace(/^Q:\s*/, "");
				const answer = $item.find(".fl-accordion-content").first().html() ?? "";
				if (question) faqs.push({ question, answer, category, order: (index + 1) * 10 });
			});
		});
	}
	return faqs;
}
