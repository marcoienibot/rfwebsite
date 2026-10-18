// Where old links should point: the converter needs these maps before it
// converts any WordPress HTML (the import and the content updates share them).
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { setOldLinks, setResourceLinks } from "./convert.mjs";

// Documents whose old target is broken or isn't a file.
const DOCUMENT_TARGET_FIXES = {
	// The live resource page is empty; the survey was announced in this post.
	"https://rustfoundation.org/resource/slsa-a-survey-of-software-supply-chain-security-practices-and-beliefs-2023/":
		"https://rustfoundation.org/media/new-slsa-survey-reveals-real-world-developer-approaches-to-software-supply-chain-security/",
	// 404 on the live site; this is the current deck.
	"https://rustfoundation.org/wp-content/uploads/2025/07/Membership-Overview-Deck.pdf":
		"https://rustfoundation.org/wp-content/uploads/2025/10/Membership-Overview-Deck.pdf",
};

/** Set up the converter's link maps and return the documents ("resources") with their fixed targets. */
export async function loadLinks(cacheDir) {
	const load = async (name) => JSON.parse(await readFile(join(cacheDir, `${name}.json`), "utf8"));
	setOldLinks(await load("old-links").catch(() => ({})));
	const documents = await load("documents");
	for (const doc of documents) {
		doc.target = DOCUMENT_TARGET_FIXES[doc.target] ?? DOCUMENT_TARGET_FIXES[doc.link] ?? doc.target;
	}
	setResourceLinks(Object.fromEntries(documents.map((doc) => [doc.link, doc.target])));
	return documents;
}
