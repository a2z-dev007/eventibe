import type { Venue } from '@/lib/api';
import type { ListingAccent, ListingCardData } from './types';

export function mapLegacyVenueToListingCard(
  venue: Venue,
  options?: { accent?: ListingAccent },
): ListingCardData {
  const accent =
    options?.accent ??
    (venue.type.includes('corporate') || venue.type.includes('conference') ? 'blue' : 'orange');

  return {
    id: venue.id,
    name: venue.name,
    slug: venue.slug,
    city: venue.city,
    image: venue.images[0] || 'https://picsum.photos/seed/placeholder/800/600',
    rating: venue.rating,
    reviewCount: venue.reviews,
    price: venue.price_range,
    capacity: venue.capacity,
    tag: venue.type.replace(/-/g, ' '),
    amenity: venue.amenities[0] || 'WiFi',
    href: `/venue/${venue.slug}`,
    accent,
    highlights: venue.amenities.slice(0, 2),
  };
}
