import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) =>
  posts
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date_published).getTime() / 1000) -
        Math.floor(new Date(a.data.date_published).getTime() / 1000)
    );

export default getSortedPosts;
