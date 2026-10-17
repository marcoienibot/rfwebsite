// Starts the website editor (EmDash admin) on this computer:
//
//   1. downloads changes other people published, when it's safe to do so,
//   2. installs dependencies when they changed,
//   3. starts the local server and opens the admin in the browser.
//
// Run with `npm run cms`, or double-click "Start editor" in the repository.
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";

import { committedFingerprint, fingerprint } from "../plugins/publish/src/fingerprint.mjs";

const PORT = 4321;
const ADMIN_URL = `http://localhost:${PORT}/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin`;
const DATABASE = "content/data.db";
const isWindows = process.platform === "win32";

function say(message) {
	console.log(`\x1b[36m›\x1b[0m ${message}`);
}

function git(...args) {
	return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function checkpoint() {
	if (!existsSync(DATABASE)) return;
	const db = new DatabaseSync(DATABASE);
	db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
	db.close();
}

function getLatest() {
	try {
		checkpoint();
		const mediaChanged = git("status", "--porcelain", "--", "content", `:!${DATABASE}`);
		const contentChanged = existsSync(DATABASE) && fingerprint(DATABASE) !== committedFingerprint(DATABASE);
		if (mediaChanged || contentChanged) {
			say("You have changes that aren't published yet, so I won't download other people's changes now.");
			return;
		}
		// Only bookkeeping data changed (opening the admin writes some): drop it.
		git("checkout", "--", DATABASE);
		say("Downloading the latest published version…");
		git("pull", "--ff-only", "--quiet");
	} catch (error) {
		say(`Couldn't download the latest version (${String(error.stderr ?? error.message).trim()}). Continuing with the copy on this computer.`);
	}
}

function installDependencies() {
	const lock = readFileSync("package-lock.json");
	const hash = createHash("sha1").update(lock).digest("hex");
	const marker = "node_modules/.installed-lock-hash";
	if (existsSync(marker) && readFileSync(marker, "utf8") === hash) return;
	say("Installing what the editor needs (only the first time, or after updates)…");
	execFileSync(isWindows ? "npm.cmd" : "npm", ["ci", "--no-audit", "--no-fund"], { stdio: "inherit", shell: isWindows });
	writeFileSync(marker, hash);
}

function openBrowser(url) {
	if (process.env.CMS_NO_BROWSER) return;
	const [command, args] =
		process.platform === "darwin"
			? ["open", [url]]
			: isWindows
				? ["cmd", ["/c", "start", "", url]]
				: ["xdg-open", [url]];
	spawn(command, args, { stdio: "ignore", detached: true }).unref();
}

async function waitForServer() {
	for (let attempt = 0; attempt < 120; attempt++) {
		try {
			await fetch(`http://localhost:${PORT}/`);
			return true;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
	}
	return false;
}

getLatest();
installDependencies();

say("Starting the editor…");
const server = spawn(isWindows ? "npx.cmd" : "npx", ["astro", "dev", "--port", String(PORT)], {
	stdio: "inherit",
	shell: isWindows,
});

if (await waitForServer()) {
	say(`The editor is ready. Opening ${ADMIN_URL}`);
	say("Keep this window open while you edit. Press Ctrl+C to stop the editor.");
	openBrowser(ADMIN_URL);
}

for (const signal of ["SIGINT", "SIGTERM"]) {
	process.on(signal, () => server.kill(signal));
}
server.on("exit", (code) => {
	checkpoint();
	process.exit(code ?? 0);
});
