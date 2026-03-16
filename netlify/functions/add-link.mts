import type { Context } from "@netlify/functions";
import yaml from "js-yaml";

const YAML_PATH = "src/content/radar/links.yaml";

interface AddLinkBody {
  url: string;
  context: string;
  tags: string[];
}

interface OgMeta {
  title?: string;
  description?: string;
  image?: string;
}

interface RadarEntry {
  id: string;
  url: string;
  timestamp: string;
  context: string;
  tags: string[];
  og: OgMeta;
}

// --- Helpers ---

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function isYouTube(url: URL): boolean {
  return (
    url.hostname.includes("youtube.com") || url.hostname.includes("youtu.be")
  );
}

function isTwitter(url: URL): boolean {
  return url.hostname.includes("twitter.com") || url.hostname.includes("x.com");
}

function extractYouTubeVideoId(url: URL): string | null {
  if (url.hostname.includes("youtu.be")) {
    return url.pathname.split("/").filter(Boolean)[0] || null;
  }
  // youtube.com/watch?v=ID, /shorts/ID, /live/ID, /embed/ID
  const vParam = url.searchParams.get("v");
  if (vParam) return vParam;
  const segments = url.pathname.split("/").filter(Boolean);
  const prefixes = ["shorts", "live", "embed", "v"];
  const idx = segments.findIndex(s => prefixes.includes(s));
  if (idx !== -1 && segments[idx + 1]) return segments[idx + 1];
  return null;
}

function extractTweetId(url: URL): string | null {
  // twitter.com/{user}/status/{id} or x.com/{user}/status/{id}
  const segments = url.pathname.split("/").filter(Boolean);
  const statusIdx = segments.indexOf("status");
  if (statusIdx !== -1 && segments[statusIdx + 1]) {
    return segments[statusIdx + 1];
  }
  return null;
}

function extractTwitterUsername(url: URL): string | null {
  const segments = url.pathname.split("/").filter(Boolean);
  return segments[0] || null;
}

function generateId(url: URL): string {
  if (isYouTube(url)) {
    const videoId = extractYouTubeVideoId(url);
    if (videoId) return `youtube-${videoId}`;
  }
  if (isTwitter(url)) {
    const tweetId = extractTweetId(url);
    if (tweetId) return `tweet-${tweetId}`;
  }
  // Generic: slugify hostname + pathname
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

async function fetchYouTubeOg(url: URL): Promise<OgMeta> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return {};
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`;
    const res = await fetch(oembedUrl);
    if (!res.ok) return {};
    const data = await res.json();
    return {
      title: data.title || undefined,
      description: data.author_name
        ? `Video by ${data.author_name}`
        : undefined,
      image: data.thumbnail_url || undefined,
    };
  } catch {
    return {};
  }
}

function buildTwitterOg(url: URL): OgMeta {
  const username = extractTwitterUsername(url);
  return {
    title: username ? `Tweet by @${username}` : "Tweet",
  };
}

async function fetchGenericOg(url: URL): Promise<OgMeta> {
  try {
    const res = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; RadarBot/1.0; +https://tuhinanshu.com)",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return {};
    const html = await res.text();
    // Only look in the <head> section to avoid false matches
    const head = html.match(/<head[\s>][\s\S]*?<\/head>/i)?.[0] || html;

    const getMetaContent = (property: string): string | undefined => {
      // Match both property="og:..." and name="og:..."
      const re = new RegExp(
        `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']*?)["']` +
          `|<meta[^>]+content=["']([^"']*?)["'][^>]+(?:property|name)=["']${property}["']`,
        "i"
      );
      const m = head.match(re);
      return m?.[1] || m?.[2] || undefined;
    };

    return {
      title: getMetaContent("og:title"),
      description: getMetaContent("og:description"),
      image: getMetaContent("og:image"),
    };
  } catch {
    return {};
  }
}

async function fetchOgMeta(url: URL): Promise<OgMeta> {
  if (isYouTube(url)) return fetchYouTubeOg(url);
  if (isTwitter(url)) return buildTwitterOg(url);
  return fetchGenericOg(url);
}

// --- GitHub API ---

async function getFileFromGitHub(
  repo: string,
  path: string,
  token: string,
  branch: string
): Promise<{ content: string; sha: string }> {
  const apiUrl = `https://api.github.com/repos/${repo}/contents/${path}?ref=${branch}`;
  console.log(`GitHub GET: ${apiUrl}`);
  const res = await fetch(apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "radar-add-link-function",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `GitHub GET failed: ${res.status} for ${apiUrl} — ${body}`
    );
  }
  const data = await res.json();
  const content = Buffer.from(data.content, "base64").toString("utf-8");
  return { content, sha: data.sha };
}

async function commitFileToGitHub(
  repo: string,
  path: string,
  token: string,
  content: string,
  sha: string,
  message: string,
  branch: string
): Promise<void> {
  const res = await fetch(
    `https://api.github.com/repos/${repo}/contents/${path}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "radar-add-link-function",
      },
      body: JSON.stringify({
        message,
        content: Buffer.from(content, "utf-8").toString("base64"),
        sha,
        branch,
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`GitHub PUT failed: ${res.status} ${await res.text()}`);
  }
}

// --- YAML Serialization ---

function serializeEntry(entry: RadarEntry): string {
  // Hand-craft the YAML to match the existing format exactly
  const lines: string[] = [];
  lines.push(`- id: ${entry.id}`);
  lines.push(`  url: ${entry.url}`);
  lines.push(`  timestamp: ${entry.timestamp}`);
  lines.push(`  context: |`);
  for (const line of entry.context.trimEnd().split("\n")) {
    lines.push(`    ${line}`);
  }
  lines.push(`  tags:`);
  for (const tag of entry.tags) {
    lines.push(`    - ${tag}`);
  }
  lines.push(`  og:`);
  if (entry.og.title) {
    lines.push(`    title: ${JSON.stringify(entry.og.title)}`);
  }
  if (entry.og.description) {
    lines.push(`    description: ${JSON.stringify(entry.og.description)}`);
  }
  if (entry.og.image) {
    lines.push(`    image: ${entry.og.image}`);
  }
  // If no og fields at all, emit empty object markers
  if (!entry.og.title && !entry.og.description && !entry.og.image) {
    // Astro expects og to exist; emit empty sub-keys
    lines.push(`    title: ""`);
  }
  return lines.join("\n");
}

// --- Duplicate Detection ---

function isDuplicate(
  entries: RadarEntry[],
  newUrl: URL,
  newId: string
): boolean {
  // Check by ID first
  if (entries.some(e => e.id === newId)) return true;

  // For YouTube, match on video ID across URL variations
  if (isYouTube(newUrl)) {
    const newVideoId = extractYouTubeVideoId(newUrl);
    if (newVideoId) {
      return entries.some(e => {
        try {
          const existingUrl = new URL(e.url);
          return (
            isYouTube(existingUrl) &&
            extractYouTubeVideoId(existingUrl) === newVideoId
          );
        } catch {
          return false;
        }
      });
    }
  }

  // For Twitter/X, match on tweet ID across twitter.com and x.com
  if (isTwitter(newUrl)) {
    const newTweetId = extractTweetId(newUrl);
    if (newTweetId) {
      return entries.some(e => {
        try {
          const existingUrl = new URL(e.url);
          return (
            isTwitter(existingUrl) && extractTweetId(existingUrl) === newTweetId
          );
        } catch {
          return false;
        }
      });
    }
  }

  // Generic: match on exact URL
  return entries.some(e => e.url === newUrl.toString());
}

// --- Main Handler ---

export default async function handler(
  req: Request,
  _context: Context
): Promise<Response> {
  // Only allow POST
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  // Auth check
  const token = process.env.RADAR_API_TOKEN;
  if (!token) {
    return jsonResponse({ error: "Server misconfigured" }, 500);
  }
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || authHeader !== `Bearer ${token}`) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  // Parse body
  let body: AddLinkBody;
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  // Validate fields
  if (!body.url || typeof body.url !== "string") {
    return jsonResponse({ error: "Missing or invalid 'url'" }, 400);
  }
  if (!body.context || typeof body.context !== "string") {
    return jsonResponse({ error: "Missing or invalid 'context'" }, 400);
  }
  if (
    !body.tags ||
    !Array.isArray(body.tags) ||
    body.tags.length === 0 ||
    !body.tags.every(t => typeof t === "string")
  ) {
    return jsonResponse(
      { error: "'tags' must be a non-empty array of strings" },
      400
    );
  }

  // Parse URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(body.url);
  } catch {
    return jsonResponse({ error: "Invalid URL" }, 400);
  }

  // GitHub config
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPO;
  const githubBranch = process.env.GITHUB_BRANCH || "main";
  if (!githubToken || !githubRepo) {
    return jsonResponse(
      {
        error: "Server misconfigured (GitHub)",
        debug: {
          hasGithubToken: !!githubToken,
          githubRepo: githubRepo || "(not set)",
        },
      },
      500
    );
  }

  try {
    // Fetch OG metadata
    const og = await fetchOgMeta(parsedUrl);

    // Generate ID
    const id = generateId(parsedUrl);

    // Get current file from GitHub
    const { content: yamlContent, sha } = await getFileFromGitHub(
      githubRepo,
      YAML_PATH,
      githubToken,
      githubBranch
    );

    // Parse existing entries
    const existingEntries = (yaml.load(yamlContent) as RadarEntry[]) || [];

    // Duplicate check
    if (isDuplicate(existingEntries, parsedUrl, id)) {
      return jsonResponse(
        { error: "Duplicate: this URL is already on the radar", id },
        409
      );
    }

    // Build new entry
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const newEntry: RadarEntry = {
      id,
      url: body.url,
      timestamp: today,
      context: body.context,
      tags: body.tags.map(t => t.trim().toLowerCase()),
      og,
    };

    // Append to YAML
    const newYaml =
      yamlContent.trimEnd() + "\n\n" + serializeEntry(newEntry) + "\n";

    // Commit to GitHub
    await commitFileToGitHub(
      githubRepo,
      YAML_PATH,
      githubToken,
      newYaml,
      sha,
      `radar: add ${id}`,
      githubBranch
    );

    return jsonResponse({
      success: true,
      id,
      url: `/radar/item/${id}`,
      og,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("add-link error:", message);
    return jsonResponse(
      {
        error: message,
        debug: {
          githubRepo,
          yamlPath: YAML_PATH,
          tokenPrefix: githubToken.slice(0, 8) + "...",
        },
      },
      500
    );
  }
}
