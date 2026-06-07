import type { Context } from "@netlify/functions";
import { fetchOgMeta, generateId } from "./shared/og.mts";

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(
  req: Request,
  _context: Context
): Promise<Response> {
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

  let body: { url: string };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  if (!body.url || typeof body.url !== "string") {
    return jsonResponse({ error: "Missing or invalid 'url'" }, 400);
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(body.url);
  } catch {
    return jsonResponse({ error: "Invalid URL" }, 400);
  }

  try {
    const og = await fetchOgMeta(parsedUrl);
    const id = generateId(parsedUrl);
    return jsonResponse({ og, id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ error: message }, 500);
  }
}
