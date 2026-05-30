import __posts from "./jsons/__posts.json";
import { DEMO_CATEGORIES } from "./taxonomies";
import { PostDataType, AuthorType } from "./types";
import { DEMO_AUTHORS } from "./authors";

const FALLBACK_AUTHOR: AuthorType = {
  id: "fallback",
  firstName: "Eventibe",
  lastName: "Team",
  displayName: "Eventibe Editor",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eventibe",
  count: 10,
  desc: "Expert event planners and community organizers at Eventibe.",
  jobName: "Senior Editor",
  href: "/blog",
};

const DEMO_POSTS: PostDataType[] = __posts.map((post): PostDataType => {
  // Map categories, filter out undefined values, and fallback to a default if none match
  const categories = (post.categoriesId || [])
    .map((id) => DEMO_CATEGORIES.find((taxonomy) => taxonomy.id === id))
    .filter((cat): cat is typeof DEMO_CATEGORIES[number] => !!cat);

  const matchedAuthor = DEMO_AUTHORS.find((user) => user.id === post.authorId);

  // Generate a clean SEO slug based on the title to make URLs extremely premium and unique!
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

  return {
    ...post,
    href: `/blog/${slug}`,
    author: matchedAuthor || FALLBACK_AUTHOR,
    categories: categories.length > 0 ? categories : [DEMO_CATEGORIES[0]],
    featuredImage: post.featuredImage || "https://picsum.photos/seed/eventibe/800/600",
  } as PostDataType;
});

export { DEMO_POSTS };
