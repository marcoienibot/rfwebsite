// A fingerprint of the content in an EmDash SQLite database.
//
// Just opening the admin writes housekeeping data to the database (sessions,
// update checks, scheduler timestamps…), so "the file changed" doesn't mean
// "someone edited content". This hashes every table except that bookkeeping,
// so two databases with the same content have the same fingerprint.
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const IGNORED_TABLES = [
	/^_emdash_404_log$/,
	/^_emdash_rate_limits$/,
	/^_emdash_entry_locks$/,
	/^_emdash_cron_tasks$/,
	/^_emdash_migrations/,
	/^_emdash_media_usage/,
	/^_emdash_revision_prune_queue$/,
	/^_emdash_(api_tokens|device_codes|authorization_codes|oauth_clients|oauth_tokens)$/,
	/^(audit_logs|auth_challenges|auth_tokens|credentials|oauth_accounts|users|allowed_domains)$/,
	/^sqlite_/,
];

// Settings rows that change on their own.
const IGNORED_OPTIONS = /^(system:|emdash:core_update_check|emdash:site_url|emdash:setup_complete)/;

export function fingerprint(databaseFile) {
	const db = new DatabaseSync(databaseFile, { readOnly: true });
	try {
		const hash = createHash("sha256");
		const tables = db
			.prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
			.all()
			.map((row) => row.name)
			.filter((name) => !IGNORED_TABLES.some((pattern) => pattern.test(name)));
		for (const table of tables) {
			hash.update(`\n#${table}\n`);
			const columns = table === "options" ? "name, value" : "*";
			for (const row of db.prepare(`SELECT ${columns} FROM "${table}" ORDER BY 1`).iterate()) {
				if (table === "options" && IGNORED_OPTIONS.test(row.name)) continue;
				hash.update(JSON.stringify(row, (_, value) => (typeof value === "bigint" ? String(value) : value)));
			}
		}
		return hash.digest("hex");
	} finally {
		db.close();
	}
}

/** Fingerprint of the database as committed in `rev` (e.g. "HEAD"). */
export function committedFingerprint(databasePath, rev = "HEAD", cwd = process.cwd()) {
	const dir = mkdtempSync(join(tmpdir(), "emdash-publish-"));
	try {
		const file = join(dir, "data.db");
		writeFileSync(file, execFileSync("git", ["show", `${rev}:${databasePath}`], { cwd, maxBuffer: 1 << 30 }));
		return fingerprint(file);
	} catch {
		return null;
	} finally {
		rmSync(dir, { recursive: true, force: true });
	}
}
