// The parts of Pagefind's Component UI (loaded by src/layouts/Base.astro) that the site's scripts use.
interface Window {
	PagefindComponents: {
		getInstanceManager(): {
			getInstance(name: string): {
				triggerSearch(term: string): void;
				on(event: "search", callback: (term: string) => void): void;
			};
		};
	};
}

interface HTMLElementTagNameMap {
	"pagefind-modal": HTMLElement & { open(): void };
}
