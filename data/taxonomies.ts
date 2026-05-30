import __taxonomies from "./jsons/__taxonomies.json";
import { TaxonomyType } from "./types";

const DEMO_CATEGORIES: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "category" as const,
  href: `/blog?category=${item.id}`,
}));

const DEMO_TAGS: TaxonomyType[] = __taxonomies.map((item) => ({
  ...item,
  taxonomy: "tag" as const,
  href: `/blog?tag=${item.id}`,
}));

export {
  DEMO_CATEGORIES,
  DEMO_TAGS,
};
