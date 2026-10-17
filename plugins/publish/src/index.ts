/**
 * Publish plugin
 *
 * The public website is a static build of whatever is committed to `main`.
 * This plugin gives editors a "Publish website" button in the EmDash admin:
 * it saves the content database and media library to git, pushes the commit
 * to GitHub, and then reports the progress of the GitHub Actions deployment.
 *
 * It runs in-process (native plugin) because it needs the filesystem and the
 * `git` executable, which sandboxed plugins cannot use.
 */

import { execFile } from "node:child_process";
import { resolve } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { promisify } from "node:util";

import type { PluginDescriptor } from "emdash";
import { definePlugin } from "emdash";

const run = promisify(execFile);

const PLUGIN_ID = "publish";
const VERSION = "0.1.0";

export interface PublishPluginOptions {
	/** Directory with the content database and media, relative to the project root. */
	contentDir: string;
	/** SQLite database file, relative to the project root. */
	database: string;
	/** Branch the website is deployed from. */
	branch: string;
	/** Public URL of the deployed website, shown after publishing. */
	siteUrl?: string;
}

export function publishPlugin(options: PublishPluginOptions): PluginDescriptor<PublishPluginOptions> {
	return {
		id: PLUGIN_ID,
		version: VERSION,
		format: "native",
		entrypoint: "@rfwebsite/plugin-publish",
		adminEntry: "@rfwebsite/plugin-publish/admin",
		options,
	};
}

async function git(args: string[], timeout = 60_000): Promise<string> {
	const { stdout } = await run("git", args, { cwd: process.cwd(), timeout });
	return stdout.trim();
}

async function tryGit(args: string[], timeout?: number): Promise<string | null> {
	try {
		return await git(args, timeout);
	} catch {
		return null;
	}
}

function errorText(error: unknown): string {
	if (error && typeof error === "object" && "stderr" in error && error.stderr) {
		return String(error.stderr).trim();
	}
	return error instanceof Error ? error.message : String(error);
}

/**
 * SQLite keeps recent writes in a `-wal` side file, which is not committed.
 * Fold them into the main database file so git sees every change.
 */
function checkpoint(database: string): void {
	const db = new DatabaseSync(resolve(process.cwd(), database));
	try {
		db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
	} finally {
		db.close();
	}
}

/** `git@github.com:owner/repo.git` or `https://github.com/owner/repo` → `owner/repo` */
async function githubRepo(): Promise<string | null> {
	const url = await tryGit(["remote", "get-url", "origin"]);
	const match = url?.match(/github\.com[:/]([^/]+\/[^/]+?)(?:\.git)?$/);
	return match?.[1] ?? null;
}

interface Deployment {
	status: "queued" | "in_progress" | "success" | "failure" | "unknown";
	commit: string;
	title: string;
	startedAt: string;
	url: string;
}

async function latestDeployment(repo: string, branch: string): Promise<Deployment | null> {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${repo}/actions/workflows/deploy.yml/runs?branch=${branch}&per_page=1`,
			{ headers: { Accept: "application/vnd.github+json", "User-Agent": "emdash-publish-plugin" } },
		);
		if (!response.ok) return null;
		const body = (await response.json()) as {
			workflow_runs?: Array<{
				status: string;
				conclusion: string | null;
				head_sha: string;
				display_title: string;
				run_started_at: string;
				html_url: string;
			}>;
		};
		const latest = body.workflow_runs?.[0];
		if (!latest) return null;
		let status: Deployment["status"] = "unknown";
		if (latest.status === "completed") {
			status = latest.conclusion === "success" ? "success" : "failure";
		} else if (latest.status === "in_progress") {
			status = "in_progress";
		} else if (["queued", "waiting", "pending", "requested"].includes(latest.status)) {
			status = "queued";
		}
		return {
			status,
			commit: latest.head_sha.slice(0, 7),
			title: latest.display_title,
			startedAt: latest.run_started_at,
			url: latest.html_url,
		};
	} catch {
		return null;
	}
}

export function createPlugin(options: PublishPluginOptions) {
	const { contentDir, database, branch, siteUrl } = options;

	async function status() {
		checkpoint(database);
		const changed = (await git(["status", "--porcelain", "--", contentDir]))
			.split("\n")
			.filter(Boolean);
		// Fetching can fail offline; the rest of the status is still useful.
		const fetched = (await tryGit(["fetch", "--quiet", "origin", branch], 20_000)) !== null;
		const counts = await tryGit(["rev-list", "--left-right", "--count", `HEAD...origin/${branch}`]);
		const [ahead = 0, behind = 0] = counts?.split(/\s+/).map(Number) ?? [];
		const lastPublish = await tryGit(["log", "-1", "--format=%h%x1f%an%x1f%aI%x1f%s", `origin/${branch}`]);
		const [commit, author, date, message] = lastPublish?.split("\x1f") ?? [];
		const repo = await githubRepo();
		return {
			unpublishedChanges: changed.length,
			unpushedCommits: ahead,
			newerVersionAvailable: behind > 0,
			online: fetched,
			lastPublish: commit ? { commit, author, date, message } : null,
			deployment: repo ? await latestDeployment(repo, branch) : null,
			repo,
			siteUrl: siteUrl ?? null,
		};
	}

	async function publish(message: string, userName: string | undefined) {
		checkpoint(database);
		await git(["add", "--all", "--", contentDir]);
		const staged = await git(["diff", "--cached", "--name-only"]);
		const ahead = Number((await tryGit(["rev-list", "--count", `origin/${branch}..HEAD`])) ?? 0);
		if (!staged && ahead === 0) {
			return { outcome: "nothing-to-publish" as const };
		}
		if (staged) {
			const subject = message.trim() || "Update website content";
			const body = userName ? `\n\nPublished from the EmDash admin by ${userName}.` : "";
			await git(["commit", "--quiet", "-m", `${subject}${body}`, "--", contentDir]);
		}

		try {
			await git(["push", "--quiet", "origin", `HEAD:${branch}`], 120_000);
		} catch (pushError) {
			const text = errorText(pushError);
			if (!/rejected|fetch first|non-fast-forward/i.test(text)) {
				return { outcome: "saved-not-pushed" as const, detail: text };
			}
			// Someone else published first. Bring their changes in, unless they
			// touched the same content database, which git cannot merge.
			await git(["fetch", "--quiet", "origin", branch], 60_000);
			const theirs = await git(["diff", "--name-only", `HEAD...origin/${branch}`]);
			if (theirs.split("\n").includes(database)) {
				return { outcome: "conflict" as const };
			}
			await git(["rebase", "--quiet", `origin/${branch}`]);
			await git(["push", "--quiet", "origin", `HEAD:${branch}`], 120_000);
		}
		return { outcome: "published" as const, commit: await git(["rev-parse", "--short", "HEAD"]) };
	}

	return definePlugin({
		id: PLUGIN_ID,
		version: VERSION,
		admin: {
			entry: "@rfwebsite/plugin-publish/admin",
			pages: [{ path: "/", label: "Publish website", icon: "rocket-launch" }],
			widgets: [{ id: "publish", title: "Website", size: "half" }],
		},
		routes: {
			status: {
				methods: ["GET"],
				permission: "content:read",
				handler: async () => status(),
			},
			publish: {
				methods: ["POST"],
				permission: "content:publish_any",
				handler: async (ctx) => {
					const input = (ctx.input ?? {}) as { message?: unknown };
					const message = typeof input.message === "string" ? input.message.slice(0, 200) : "";
					try {
						return await publish(message, ctx.user?.name ?? undefined);
					} catch (error) {
						ctx.log.error("Publishing failed", { error: errorText(error) });
						return { outcome: "failed" as const, detail: errorText(error) };
					}
				},
			},
		},
	});
}

export default createPlugin;
