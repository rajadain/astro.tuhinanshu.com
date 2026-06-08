const IMAGEKIT_FALLBACK_ENDPOINT = "https://ik.imagekit.io/rajadain";

const IMAGEKIT_URL_ENDPOINT = (
  import.meta.env.PUBLIC_IMAGEKIT_URL_ENDPOINT ??
  import.meta.env.IMAGEKIT_URL_ENDPOINT ??
  IMAGEKIT_FALLBACK_ENDPOINT
).replace(/\/$/, "");

const ABSOLUTE_URL_REGEX = /^https?:\/\//;

export function getImageKitUrlEndpoint(): string {
  return IMAGEKIT_URL_ENDPOINT;
}

export function toImageKitUrl(url: string): string {
  if (!url) {
    return url;
  }

  if (url.startsWith(IMAGEKIT_URL_ENDPOINT)) {
    return url;
  }

  if (ABSOLUTE_URL_REGEX.test(url)) {
    return url;
  }

  if (url.startsWith("/")) {
    return `${IMAGEKIT_URL_ENDPOINT}${url}`;
  }

  return url;
}
