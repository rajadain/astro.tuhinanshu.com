const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const DATA_URL_REGEX = /^data:/i;

function visit(node, callback) {
  callback(node);

  if (!node || !Array.isArray(node.children)) {
    return;
  }

  for (const child of node.children) {
    visit(child, callback);
  }
}

export default function remarkImageKitUrls(options = {}) {
  const endpoint = (options.urlEndpoint || "").replace(/\/$/, "");

  return function transformer(tree) {
    if (!endpoint) {
      return;
    }

    visit(tree, node => {
      if (node.type !== "image" || typeof node.url !== "string") {
        return;
      }

      if (
        !node.url.startsWith("/") ||
        ABSOLUTE_URL_REGEX.test(node.url) ||
        DATA_URL_REGEX.test(node.url)
      ) {
        return;
      }

      node.url = `${endpoint}${node.url}`;
    });
  };
}
