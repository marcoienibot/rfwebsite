/** A YouTube or Vimeo video, ready for `VideoEmbed.astro`. */
export interface VideoPlayer {
	provider: "YouTube" | "Vimeo";
	/** The player, which autoplays because it only loads after a click on play. */
	embedUrl: string;
	/** The video on the provider's website. */
	watchUrl: string;
}

const YOUTUBE_ID = /(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/;
const VIMEO_ID = /vimeo\.com\/(?:video\/)?(\d+)/;

export function videoPlayer(url: unknown): VideoPlayer | undefined {
	const link = String(url ?? "");
	const youtube = link.match(YOUTUBE_ID)?.[1];
	if (youtube) {
		return {
			provider: "YouTube",
			embedUrl: `https://www.youtube-nocookie.com/embed/${youtube}?autoplay=1`,
			watchUrl: `https://www.youtube.com/watch?v=${youtube}`,
		};
	}
	const vimeo = link.match(VIMEO_ID)?.[1];
	if (vimeo) {
		return {
			provider: "Vimeo",
			embedUrl: `https://player.vimeo.com/video/${vimeo}?autoplay=1&dnt=1`,
			watchUrl: `https://vimeo.com/${vimeo}`,
		};
	}
	return undefined;
}
