const prefix = "https://ik.imagekit.io/rajadain";

export default function resizeImageKitUrl(url: string, px = 160): string {
  if (!url.startsWith(prefix)) {
    return url;
  }

  const suffix = url.substring(prefix.length + 1);

  return `${prefix}/tr:w-${px}/${suffix}`;
}
