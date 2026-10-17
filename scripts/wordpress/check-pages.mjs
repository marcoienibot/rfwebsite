// Validates page modules in `pages/` against the block types in
// seed/seed.json without uploading anything.
//
//   node scripts/wordpress/check-pages.mjs [slug…]
import { readFile, readdir } from "node:fs/promises";

const seed = JSON.parse(await readFile(new URL("../../seed/seed.json", import.meta.url), "utf8"));
const types = new Map(seed.blockTypes.map((b) => [b.slug, b.versions.at(-1).fields]));
const stubs = {
	image: async (url, alt) => (url ? { provider: "local", id: "stub", alt, meta: { storageKey: url } } : undefined),
	file: async (url) => `/media/${url.split("/").pop()}`,
	richText: async (html) => {
		if (typeof html !== "string") throw new Error("richText() expects an HTML string");
		return [{ _type: "block", children: [{ _type: "span", text: html }] }];
	},
};

function checkField(field, value, where, problems) {
	if (value === undefined || value === null || value === "") {
		if (field.required) problems.push(`${where}.${field.slug} is required`);
		return;
	}
	const options = field.validation?.options ?? field.options;
	switch (field.type) {
		case "string":
		case "text":
		case "url":
			if (typeof value !== "string") problems.push(`${where}.${field.slug} must be a string`);
			else if (field.validation?.pattern && !new RegExp(field.validation.pattern).test(value))
				problems.push(`${where}.${field.slug} "${value}" doesn't match ${field.validation.pattern}`);
			break;
		case "integer":
			if (!Number.isInteger(value)) problems.push(`${where}.${field.slug} must be an integer`);
			break;
		case "boolean":
			if (typeof value !== "boolean") problems.push(`${where}.${field.slug} must be a boolean`);
			break;
		case "select":
			if (!options.includes(value)) problems.push(`${where}.${field.slug} "${value}" isn't one of ${options.join(", ")}`);
			break;
		case "image":
			if (typeof value !== "object" || !value.id) problems.push(`${where}.${field.slug} must come from image()`);
			break;
		case "portableText":
			if (!Array.isArray(value)) problems.push(`${where}.${field.slug} must come from richText()`);
			break;
		case "repeater":
			if (!Array.isArray(value)) problems.push(`${where}.${field.slug} must be an array`);
			else
				value.forEach((row, i) => {
					const subFields = field.validation.subFields;
					for (const key of Object.keys(row)) {
						if (!subFields.some((f) => f.slug === key)) problems.push(`${where}.${field.slug}[${i}] has unknown field "${key}"`);
					}
					for (const sub of subFields) checkField(sub, row[sub.slug], `${where}.${field.slug}[${i}]`, problems);
				});
			break;
	}
}

const wanted = process.argv.slice(2);
const dir = new URL("./pages/", import.meta.url);
let failed = false;
for (const file of (await readdir(dir)).filter((f) => f.endsWith(".mjs"))) {
	if (wanted.length && !wanted.includes(file.replace(/\.mjs$/, ""))) continue;
	const problems = [];
	try {
		const { default: define } = await import(new URL(file, dir));
		const page = await define(stubs);
		if (!page.slug || !page.title) problems.push("page needs slug and title");
		page.blocks.filter(Boolean).forEach((block, i) => {
			const fields = types.get(block._type);
			const where = `block ${i} (${block._type})`;
			if (!fields) return problems.push(`${where}: unknown block type`);
			for (const key of Object.keys(block)) {
				if (key !== "_type" && !fields.some((f) => f.slug === key)) problems.push(`${where} has unknown field "${key}"`);
			}
			for (const field of fields) checkField(field, block[field.slug], where, problems);
		});
		console.log(`${problems.length ? "✗" : "✓"} ${file} (${page.blocks.length} blocks)`);
	} catch (error) {
		problems.push(error.stack);
	}
	for (const problem of problems) console.log(`    ${problem}`);
	failed ||= problems.length > 0;
}
process.exit(failed ? 1 : 0);
