import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import icon from "astro-icon";
import imagekit from "@imagekit/astro/integration";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import remarkImageKitUrls from "./src/utils/remarkImageKitUrls.mjs";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { SITE } from "./src/config";

const imageKitUrlEndpoint =
  process.env.IMAGEKIT_URL_ENDPOINT ??
  process.env.PUBLIC_IMAGEKIT_URL_ENDPOINT ??
  "https://ik.imagekit.io/rajadain";

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  scopedStyleStrategy: "where",
  site: SITE.website,
  integrations: [
    icon(),
    react(),
    sitemap(),
    mdx(),
    imagekit({
      urlEndpoint: imageKitUrlEndpoint,
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [
        [remarkImageKitUrls, { urlEndpoint: imageKitUrlEndpoint }],
        remarkToc,
        [
          remarkCollapse,
          {
            test: "Table of contents",
          },
        ],
      ],
    }),
    shikiConfig: {
      langAlias: {
        ssh: "bash",
      },
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
