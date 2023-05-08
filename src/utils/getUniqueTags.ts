import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";

const getUniqueTags = (posts: CollectionEntry<"blog">[]): string[] => {
  const tagCountMap: { [tag: string]: number } = {};
  const filteredPosts = posts.filter(({ data }) => !data.draft);
  filteredPosts.forEach(post => {
    post.data.tags.forEach(t => (tagCountMap[t] = (tagCountMap[t] || 0) + 1));
  });

  // Sort tags by frequency in descending order
  const sortedTags = Object.keys(tagCountMap).sort(
    (a, b) => tagCountMap[b] - tagCountMap[a]
  );

  return sortedTags.map(slugifyStr);
};

export default getUniqueTags;
