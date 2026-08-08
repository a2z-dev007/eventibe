export type ListingAccent = 'orange' | 'blue' | 'rose';

export interface ListingCardData {
  id: number | string;
  name: string;
  slug?: string;
  city: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  price?: string;
  capacity?: number;
  tag?: string;
  amenity?: string;
  href: string;
  accent?: ListingAccent;
  cuisines?: string[];
  highlights?: string[];
  packageName?: string;
}
