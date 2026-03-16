import type { Context } from "@netlify/functions";
import yaml from "js-yaml";
import {
  type OgMeta,
  fetchOgMeta,
  generateId,
  isYouTube,
  isTwitter,
  extractYouTubeVideoId,
  extractTweetId,
} from "./shared/og.mts";

const YAML_PATH = "src/content/radar/links.yaml";

interface AddLinkBody {
  url: string;
  context: string;
  tags: string[];
  og?: OgMeta;
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
    // Fetch OG metadata (use overrides from body if provided, else auto-fetch)
    const autoOg = await fetchOgMeta(parsedUrl);
    const og: OgMeta = {
      title: body.og?.title || autoOg.title,
      description: body.og?.description || autoOg.description,
      image: body.og?.image || autoOg.image,
    };

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
