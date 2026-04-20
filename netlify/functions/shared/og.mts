import ogs from "open-graph-scraper";

export interface OgMeta {
  title?: string;
  description?: string;
  image?: string;
}

export function isYouTube(url: URL): boolean {
  return (
    url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")
  );
}

export function isTwitter(url: URL): boolean {
  return url.hostname.includes("twitter.com") || url.hostname.includes("x.com");
}

export function extractYouTubeVideoId(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] || null;
  }
  const vParam = url.searchParams.get("v");
  if (vParam) return vParam;
  const segments = url.pathname.split("/").filter(Boolean);
  const prefixes = ["shorts", "live", "embed", "v"];
  const idx = segments.findIndex(s => prefixes.includes(s));
  if (idx !== -1 && segments[idx + 1]) return segments[idx + 1];
  return null;
}

export function extractTweetId(url: URL): string | null {
  const segments = url.pathname.split("/").filter(Boolean);
  const statusIdx = segments.indexOf("status");
  if (statusIdx !== -1 && segments[statusIdx + 1]) {
    return segments[statusIdx + 1];
  }
  return null;
}

export function extractTwitterUsername(url: URL): string | null {
  const segments = url.pathname.split("/").filter(Boolean);
  return segments[0] || null;
}

export function generateId(url: URL): string {
  if (isYouTube(url)) {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) return `youtube-${videoId}`;
  }
  if (isTwitter(url)) {
    const tweetId = extractTweetId(url);
    if (tweetId) return `tweet-${tweetId}`;
  }
  const raw = `${url.hostname}${url.pathname}`
    .replace(/^www\./, "")
    .replace(/\/+$/, "");
  const slug = raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug;
}

// --- OG Metadata Fetching ---

async function fetchWithOgs(url: string): Promise<OgMeta> {
  try {
    const { result } = await ogs({ url, timeout: 10000 });
    const image = result.ogImage?.[0]?.url;
    return {
      title: result.ogTitle || result.dcTitle || undefined,
      description: result.ogDescription || result.dcDescription || undefined,
      image: image || undefined,
    };
  } catch {
    return {};
  }
}

async function fetchYouTubeOg(url: URL): Promise<OgMeta> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return fetchWithOgs(url.toString());
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) return fetchWithOgs(url.toString());
    const data = await res.json();
    return {
      title: data.title || undefined,
      description: data.author_name
        ? `Video by ${data.author_name}`
        : undefined,
      image: data.thumbnail_url || undefined,
    };
  } catch {
    return fetchWithOgs(url.toString());
  }
}

function buildTwitterOg(url: URL): OgMeta {
  const username = extractTwitterUsername(url);
  return {
    title: username ? `Tweet by @${username}` : "Tweet",
  };
}

export async function fetchOgMeta(url: URL): Promise<OgMeta> {
  if (isYouTube(url)) return fetchYouTubeOg(url);
  if (isTwitter(url)) return buildTwitterOg(url);
  return fetchWithOgs(url.toString());
}
