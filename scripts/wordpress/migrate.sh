#!/usr/bin/env bash
# Rebuilds content/ from scratch out of the live WordPress site.
#
#   scripts/wordpress/migrate.sh [cacheDir]
#
# Downloads the WordPress data (unless the cache exists), starts a fresh
# EmDash dev server on an empty database, imports everything and stops.
set -euo pipefail
cd "$(dirname "$0")/../.."
CACHE="${1:-.cache/wordpress}"
PORT=4399

[ -f "$CACHE/posts.json" ] || node scripts/wordpress/fetch.mjs "$CACHE"

# The server must not outlive the database it has open: stop any old one.
npx astro dev stop > /dev/null 2>&1 || true
rm -rf content && mkdir -p content/media
npx astro dev --background --port "$PORT" > "$CACHE/dev-server.log" 2>&1
trap 'npx astro dev stop > /dev/null 2>&1 || true' EXIT
until curl -sf -o /dev/null "http://localhost:$PORT/"; do sleep 1; done

EMDASH_URL="http://localhost:$PORT" node scripts/wordpress/import.mjs "$CACHE"
