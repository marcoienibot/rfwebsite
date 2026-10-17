import node from "@astrojs/node";
import react from "@astrojs/react";
import { publishPlugin } from "@rfwebsite/plugin-publish";
import icon from "astro-iconset";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { local } from "emdash/astro";
import { sqlite } from "emdash/db";
import staticSite from "./integrations/static-site.mjs";

// Where the built site will be served from. GitHub Actions sets this to the
// GitHub Pages URL (which includes the repository name as a sub-path).
const SITE_URL = process.env.SITE_URL ?? "http://localhost:4321";
// Shown in the admin after publishing.
const PUBLIC_SITE_URL = "https://marcoienibot.github.io/rfwebsite/";

export default defineConfig({
	site: SITE_URL,
	// Every public page is prerendered to HTML at build time. The EmDash admin
	// still needs a server, which is why editing happens locally (`npm run cms`).
	output: "static",
	adapter: node({ mode: "standalone" }),
	integrations: [
		react(),
		icon({
			include: {
				ph: [
					"arrow-right",
					"arrow-up-right",
					"caret-down",
					"list",
					"x",
				],
			},
		}),
		emdash({
			database: sqlite({ url: "file:./content/data.db" }),
			storage: local({ directory: "./content/media", baseUrl: "/media" }),
			plugins: [
				publishPlugin({
					contentDir: "content",
					database: "content/data.db",
					branch: "main",
					siteUrl: PUBLIC_SITE_URL,
				}),
			],
		}),
		staticSite({
			database: "content/data.db",
			mediaDir: "content/media",
			mediaUrl: "/media",
			basePath: new URL(SITE_URL).pathname,
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Noto Sans",
			cssVariable: "--font-noto-sans",
			weights: [300, 400, 700],
			styles: ["normal", "italic"],
			fallbacks: ["system-ui", "sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "Noto Serif",
			cssVariable: "--font-noto-serif",
			weights: [400, 700],
			fallbacks: ["Georgia", "serif"],
		},
	],
	devToolbar: { enabled: false },
});
