import type { CollectionEntry } from "astro:content";

const getSimilarPostsToPost = (
  posts: CollectionEntry<"blog">[],
  givenPost: CollectionEntry<"blog">,
  numPosts: number = 3
): CollectionEntry<"blog">[] => {
  // Calculate Jaccard similarity for each post
  const similarityScores = posts.map(post => {
    const commonTags = post.data.tags.filter(tag =>
      givenPost.data.tags.includes(tag)
    );
    const similarity =
      commonTags.length /
      (post.data.tags.length + givenPost.data.tags.length - commonTags.length);
    return { post, similarity };
  });

  // Sort posts by similarity in descending order
  similarityScores.sort((a, b) => b.similarity - a.similarity);

  // Return the top `numPosts` most similar posts
  // with at least one common tag, excluding the given post itself
  const mostSimilarPosts = similarityScores
    .filter(({ post, similarity }) => similarity > 0 && post.id != givenPost.id)
    .slice(0, numPosts)
    .map(item => item.post);
  return mostSimilarPosts;
};

export default getSimilarPostsToPost;
