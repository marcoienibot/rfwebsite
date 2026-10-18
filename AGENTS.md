This is the Rust Foundation website: an Astro site whose content is managed with EmDash CMS and
published as a **static site** to GitHub Pages. See README.md for the architecture.

## Commands

```bash
npm run cms     # editor launcher: git pull, npm ci when needed, astro dev, open the admin
npm run dev     # Astro dev server; admin at http://localhost:4321/_emdash/admin
npm run build   # static build into dist/client (also builds the Pagefind index)
npm run typecheck                           # astro check
node scripts/schema.mjs                     # regenerate seed/seed.json from the content model
node scripts/wordpress/check-pages.mjs      # validate page definitions used by the migration
```

## Things that are different from a stock EmDash site

- `output: "static"`. Public pages are prerendered at build time from `content/data.db`, so
  dynamic routes have `getStaticPaths()`. In `astro dev`, `integrations/static-site.mjs` switches every
  route to on-demand rendering so editors see changes immediately. Routes must therefore work both
  ways: don't rely on props from `getStaticPaths()`, read `Astro.params` and query.
- The content database (`content/data.db`) and media (`content/media/`) are committed. Publishing
  means committing them (see `plugins/publish`).
- Media is served from `/media/<storageKey>` (local storage `baseUrl`), not EmDash's media route.
  Use `src/components/Img.astro` / `mediaSrc()`, not `Image` from `emdash/ui`. Rich text goes through
  `src/components/RichText.astro`, which overrides the image renderer.
- Write root-relative links (`/about/`). The build rewrites them when the site lives under a sub-path.
- Content model: `scripts/schema.mjs` (collections `pages`, `posts`, `policies`, `organizations`,
  `people`, `events`, `documents`, `faqs`, and the page block types). Each block type has a component
  in `src/components/blocks/` registered in `src/components/Blocks.astro`.
- Menus used by the layout: `announcement`, `header`, `primary` (mega-menu), `footer`,
  `footer_legal`, `social`.

## EmDash references

Agent skills are in `.agents/skills/` (building-emdash-site, creating-plugins, emdash-cli). The EmDash
docs are available as an MCP server at `https://docs.emdashcms.com/mcp`.

- Image fields are objects (`{ id, alt, width, height, meta: { storageKey } }`), not strings.
- `entry.id` is the slug, and `entry.data.id` is the database ULID.
- Posts have one taxonomy, `tag`. There are no categories: news, blog posts and press clips are one
  list (press clips are posts with an *External article* link).
