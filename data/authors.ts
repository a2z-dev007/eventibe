import __authors from "./jsons/__users.json";
import { AuthorType } from "./types";

const DEMO_AUTHORS: AuthorType[] = __authors.map((item, index) => {
  // Use a reliable avatar placeholder or the item's avatar
  const avatarUrl = item.avatar && item.avatar.startsWith("http") 
    ? item.avatar 
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(item.displayName || String(index))}`;

  return {
    ...item,
    avatar: avatarUrl,
    href: `/blog?author=${item.id}`,
  } as AuthorType;
});

export { DEMO_AUTHORS };
