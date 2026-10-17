/**
 * Publish plugin: admin page and dashboard widget.
 */

import { Banner, Button, Input, Loader } from "@cloudflare/kumo";
import { ArrowSquareOut, RocketLaunch } from "@phosphor-icons/react";
import type { PluginAdminExports } from "emdash";
import { apiFetch, parseApiResponse } from "emdash/plugin-utils";
import * as React from "react";

const API = "/_emdash/api/plugins/publish";

interface Status {
	unpublishedChanges: boolean;
	unpushedCommits: number;
	newerVersionAvailable: boolean;
	online: boolean;
	lastPublish: { commit: string; author: string; date: string; message: string } | null;
	deployment: {
		status: "queued" | "in_progress" | "success" | "failure" | "unknown";
		commit: string;
		title: string;
		startedAt: string;
		url: string;
	} | null;
	repo: string | null;
	siteUrl: string | null;
}

type PublishResult =
	| { outcome: "published"; commit: string }
	| { outcome: "nothing-to-publish" }
	| { outcome: "conflict" }
	| { outcome: "saved-not-pushed"; detail: string }
	| { outcome: "failed"; detail: string };

const timeFormat = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

function ago(iso: string): string {
	const minutes = Math.round((new Date(iso).getTime() - Date.now()) / 60_000);
	if (Math.abs(minutes) < 60) return timeFormat.format(minutes, "minute");
	const hours = Math.round(minutes / 60);
	if (Math.abs(hours) < 48) return timeFormat.format(hours, "hour");
	return timeFormat.format(Math.round(hours / 24), "day");
}

function messageOf(cause: unknown, fallback: string): string {
	return cause instanceof Error && cause.message ? cause.message : fallback;
}

function useStatus() {
	const [status, setStatus] = React.useState<Status>();
	const [error, setError] = React.useState<string>();

	const load = React.useCallback(async () => {
		try {
			const response = await apiFetch(`${API}/status`);
			setStatus(await parseApiResponse<Status>(response, "Could not load the publishing status"));
			setError(undefined);
		} catch (cause) {
			setError(messageOf(cause, "Could not load the publishing status"));
		}
	}, []);

	React.useEffect(() => {
		void load();
	}, [load]);

	// While a deployment is running, check on it every few seconds.
	const deploying =
		status?.deployment?.status === "queued" || status?.deployment?.status === "in_progress";
	React.useEffect(() => {
		const timer = setInterval(() => void load(), deploying ? 5_000 : 30_000);
		return () => clearInterval(timer);
	}, [deploying, load]);

	return { status, error, reload: load };
}

function DeploymentLine({ status }: { status: Status }) {
	const deployment = status.deployment;
	if (!deployment) return null;
	const label = {
		queued: "⏳ Waiting to start building the website…",
		in_progress: "🔨 Building and deploying the website (usually 1–2 minutes)…",
		success: "✅ The website is live",
		failure: "❌ The last deployment failed. Ask a developer to have a look.",
		unknown: "The deployment status is unknown",
	}[deployment.status];
	return (
		<p className="text-sm">
			{label}
			{" · "}
			<a href={deployment.url} target="_blank" rel="noreferrer" className="underline">
				details
			</a>
		</p>
	);
}

function PublishPanel({ compact = false }: { compact?: boolean }) {
	const { status, error, reload } = useStatus();
	const [message, setMessage] = React.useState("");
	const [busy, setBusy] = React.useState(false);
	const [result, setResult] = React.useState<PublishResult>();

	const publish = async () => {
		setBusy(true);
		setResult(undefined);
		try {
			const response = await apiFetch(`${API}/publish`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message }),
			});
			setResult(await parseApiResponse<PublishResult>(response, "Publishing failed"));
			setMessage("");
		} catch (cause) {
			setResult({ outcome: "failed", detail: messageOf(cause, "Publishing failed") });
		} finally {
			setBusy(false);
			void reload();
		}
	};

	if (error) return <Banner variant="error" title="Publishing is unavailable" description={error} />;
	if (!status) return <Loader />;

	const pending = status.unpublishedChanges || status.unpushedCommits > 0;

	return (
		<div className="space-y-4">
			{status.newerVersionAvailable && (
				<Banner
					variant="alert"
					title="Someone else published changes"
					description="Close the editor and start it again to load them before you edit. Publishing now may conflict."
				/>
			)}
			{!status.online && (
				<Banner
					variant="alert"
					title="You're offline"
					description="You can keep editing. Publishing needs an internet connection."
				/>
			)}

			<p className={compact ? "text-sm" : ""}>
				{pending
					? "You have changes that aren't on the public website yet."
					: "Everything you've saved is published."}
			</p>

			{!compact && (
				<Input
					label="What did you change? (optional)"
					placeholder="e.g. Added the October board update"
					value={message}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
				/>
			)}

			<div className="flex flex-wrap items-center gap-3">
				<Button
					variant="primary"
					icon={RocketLaunch}
					loading={busy}
					disabled={busy || !pending}
					onClick={() => void publish()}
				>
					Publish website
				</Button>
				{status.siteUrl && (
					<a
						href={status.siteUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-1 text-sm underline"
					>
						Open the live website <ArrowSquareOut />
					</a>
				)}
			</div>

			{result?.outcome === "published" && (
				<Banner
					title="Published!"
					description="Your changes are on their way. The website updates in about a minute or two."
				/>
			)}
			{result?.outcome === "nothing-to-publish" && (
				<Banner variant="secondary" title="Nothing new to publish" />
			)}
			{result?.outcome === "conflict" && (
				<Banner
					variant="error"
					title="Someone else published at the same time"
					description="Your changes are saved on this computer but not published. Ask a developer to combine both sets of changes."
				/>
			)}
			{result?.outcome === "saved-not-pushed" && (
				<Banner
					variant="alert"
					title="Saved, but not uploaded"
					description={`Your changes are saved on this computer. Open GitHub Desktop and click "Push origin" to publish them. (${result.detail})`}
				/>
			)}
			{result?.outcome === "failed" && (
				<Banner variant="error" title="Publishing failed" description={result.detail} />
			)}

			<DeploymentLine status={status} />

			{!compact && status.lastPublish && (
				<p className="text-sm text-kumo-subtle">
					Last published {ago(status.lastPublish.date)} by {status.lastPublish.author}: “
					{status.lastPublish.message}” ({status.lastPublish.commit})
				</p>
			)}
		</div>
	);
}

function PublishPage() {
	return (
		<section className="max-w-2xl space-y-6">
			<header className="space-y-2">
				<h1 className="text-2xl font-semibold">Publish website</h1>
				<p className="text-kumo-subtle">
					Saving and publishing an entry here updates your copy of the website. Click{" "}
					<strong>Publish website</strong> to send all your changes to the public site. GitHub
					rebuilds it automatically.
				</p>
			</header>
			<PublishPanel />
		</section>
	);
}

function PublishWidget() {
	return <PublishPanel compact />;
}

export const pages: PluginAdminExports["pages"] = {
	"/": PublishPage,
};

export const widgets: PluginAdminExports["widgets"] = {
	publish: PublishWidget,
};
