import { getImageKitUrlEndpoint, toImageKitUrl } from "@utils/imageKitUrl";

const endpoint = getImageKitUrlEndpoint();
const endpointUrl = new URL(endpoint);
const endpointPath = endpointUrl.pathname.replace(/\/$/, "");

export default function resizeImageKitUrl(url: string, px = 160): string {
  const absoluteUrl = toImageKitUrl(url);

  if (!absoluteUrl.startsWith(endpoint)) {
    return url;
  }

  const parsed = new URL(absoluteUrl);

  const pathRemainder = endpointPath
    ? parsed.pathname.slice(endpointPath.length) || "/"
    : parsed.pathname;

  if (pathRemainder.startsWith("/tr:")) {
    return parsed.toString();
  }

  parsed.pathname = `${endpointPath}/tr:w-${px},f-auto${pathRemainder}`;

  return parsed.toString();
}
