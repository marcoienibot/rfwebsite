import { getAllTermsForEntries, getEmDashCollection, type TaxonomyTerm } from "emdash";

type Entry<C extends string> = Awaited<ReturnType<typeof getEmDashCollection<C>>>["entries"][number];

/** Every published entry of a collection (follows pagination cursors). */
export async function allEntries<C extends string>(
	collection: C,
	options: Omit<NonNullable<Parameters<typeof getEmDashCollection>[1]>, "cursor"> = {},
): Promise<Entry<C>[]> {
	const entries: Entry<C>[] = [];
	let cursor: string | undefined;
	do {
		const result = await getEmDashCollection(collection, { ...options, limit: 100, cursor });
		if (result.error) throw result.error;
		entries.push(...result.entries);
		cursor = result.nextCursor ?? undefined;
	} while (cursor);
	return entries;
}

export type Post = Entry<"posts"> & { categories: TaxonomyTerm[]; tags: TaxonomyTerm[] };

// During `astro build` every page asks for the same posts, so query them once.
// In the editor (`astro dev`) always re-read, so saved changes show up.
let postsCache: Promise<Post[]> | undefined;

async function loadPosts(): Promise<Post[]> {
	const entries = await allEntries("posts", { orderBy: { published_at: "desc" } });
	const terms = await getAllTermsForEntries(
		"posts",
		entries.map((entry) => entry.data.id),
	);
	return entries.map((entry) => ({
		...entry,
		categories: terms.get(entry.data.id)?.category ?? [],
		tags: terms.get(entry.data.id)?.tag ?? [],
	}));
}

export function allPosts(): Promise<Post[]> {
	if (import.meta.env.DEV) return loadPosts();
	postsCache ??= loadPosts();
	return postsCache;
}

export async function postsWhere({ category, tag, author }: { category?: string; tag?: string; author?: string }) {
	const posts = await allPosts();
	return posts.filter(
		(post) =>
			(!category || category === "all" || post.categories.some((term) => term.slug === category)) &&
			(!tag || post.tags.some((term) => term.slug === tag)) &&
			(!author || post.data.bylines?.some((credit) => credit.byline.slug === author)),
	);
}

/** Authors with at least one post: slug → display name. */
export async function authors() {
	const names = new Map<string, string>();
	for (const post of await allPosts()) {
		for (const credit of post.data.bylines ?? []) names.set(credit.byline.slug, credit.byline.displayName);
	}
	return names;
}

/** Pages with their own routes: "home" is the front page and "media" the header of the news listing. */
export const RESERVED_PAGES = new Set(["home", "media"]);

type Ordered = { data: { order?: number | null; title: string } };
const byOrder = (a: Ordered, b: Ordered) =>
	(a.data.order ?? 100) - (b.data.order ?? 100) || a.data.title.localeCompare(b.data.title);

const inGroup = (groups: unknown, group: string) => Array.isArray(groups) && groups.includes(group);

export const MEMBER_TIERS = ["platinum", "gold", "silver", "associate"];

/** Organisations shown in a group ("platinum", "infrastructure-donor", "all members"…). */
export async function organizations(group: string) {
	const all = (await allEntries("organizations")).sort(byOrder);
	if (group === "all members") return all.filter((org) => MEMBER_TIERS.some((tier) => inGroup(org.data.groups, tier)));
	return all.filter((org) => inGroup(org.data.groups, group));
}

export async function people(group: string) {
	return (await allEntries("people")).filter((person) => inGroup(person.data.groups, group)).sort(byOrder);
}

export async function faqs(category: string) {
	return (await allEntries("faqs", { where: { category } })).sort(byOrder);
}

/** Custom date fields arrive as ISO strings. */
export function toDate(value: unknown): Date | undefined {
	if (value instanceof Date) return value;
	if (typeof value !== "string" || !value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

export async function documents(category: string) {
	const all = (await allEntries("documents", { where: { category } })).map((doc) => ({
		...doc,
		date: toDate(doc.data.date),
	}));
	return all.sort((a, b) => (b.date?.getTime() ?? 0) - (a.date?.getTime() ?? 0));
}

export async function events() {
	const all = (await allEntries("events")).flatMap((event) => {
		const starts = toDate(event.data.starts);
		return starts ? [{ ...event, starts, ends: toDate(event.data.ends) }] : [];
	});
	return all.sort((a, b) => a.starts.getTime() - b.starts.getTime());
}
