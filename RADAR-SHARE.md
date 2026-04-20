# Radar Quick-Share Setup

## Environment Variables (Netlify UI)

Set these in **Netlify → Site settings → Environment variables**:

| Variable          | Description                                                                         |
| ----------------- | ----------------------------------------------------------------------------------- |
| `RADAR_API_TOKEN` | Random secret string for bearer auth. Generate with: `openssl rand -hex 32`         |
| `GITHUB_TOKEN`    | Fine-grained GitHub PAT scoped to this repo with **Contents** read/write permission |
| `GITHUB_REPO`     | `rajadain/astro.tuhinanshu.com`                                                     |
| `GITHUB_BRANCH`   | `main` by default, but can be configured to any valid value                         |

## Desktop: Bookmarklet

Create a browser bookmark with this URL

```js
javascript: void window.open("https://deploy-preview-3--astro-tuhinanshu-com.netlify.app/radar/add?url=" + encodeURIComponent(location.href));
```

This opens the `/radar/add` form pre-filled with the current page URL. The form
remembers your API token in `localStorage` after first use.

## iPhone: Apple Shortcut — "Share to Radar"

Create a new Shortcut with these actions:

1. **Receive** input from **Share Sheet**
   - Accept: URLs, Safari web pages
2. **Get URLs from** Shortcut Input
3. **Set variable** `Link` to URLs
4. **Ask for Input** with prompt "Context (markdown):"
   - Input Type: Text
5. **Set variable** `Context` to Provided Input
6. **Ask for Input** with prompt "Tags (comma-separated):"
   - Input Type: Text
7. **Split Text** by `,` (comma)
8. **Set variable** `Tags` to Split Text
9. **Get Contents of URL**: `https://tuhinanshu.com/api/add-link`
   - Method: **POST**
   - Headers:
     - `Content-Type`: `application/json`
     - `Authorization`: `Bearer YOUR_TOKEN_HERE`
   - Request Body (JSON):
     - `url`: `Link`
     - `context`: `Context`
     - `tags`: `Tags`
10. **Get Dictionary Value** for key `url` from Contents of URL
11. **Show Notification**: `Added to Radar: [Dictionary Value]`

### Share Sheet Usage

- In Safari, YouTube, or Twitter/X app → tap Share → "Share to Radar"
- Enter your context and tags when prompted
- The shortcut POSTs to the API, which fetches OG metadata, commits to GitHub,
  and triggers a Netlify rebuild

## API Reference

### `POST /api/add-link`

**Headers:**

- `Authorization: Bearer <RADAR_API_TOKEN>`
- `Content-Type: application/json`

**Body:**

```json
{
  "url": "https://example.com/article",
  "context": "Why this is interesting — supports **markdown**.",
  "tags": ["web-dev", "frontend"]
}
```

**Success Response (200):**

```json
{
  "success": true,
  "id": "example-com-article",
  "url": "/radar/item/example-com-article",
  "og": {
    "title": "Example Article",
    "description": "A great article.",
    "image": "https://example.com/og.png"
  }
}
```

**Error Responses:**

- `400` — Invalid/missing fields
- `401` — Bad or missing token
- `405` — Not a POST request
- `409` — URL already exists on the radar
- `500` — Server/GitHub error

## URL-Specific Behavior

| URL Type                            | ID Format               | OG Source             |
| ----------------------------------- | ----------------------- | --------------------- |
| YouTube (`youtube.com`, `youtu.be`) | `youtube-{videoId}`     | YouTube oEmbed API    |
| Twitter/X (`twitter.com`, `x.com`)  | `tweet-{tweetId}`       | Constructed from URL  |
| Generic                             | Slugified hostname+path | HTML `<meta>` OG tags |
