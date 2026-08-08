import type { VenueRecord } from '@/lib/api/eventsEndpoints';
import type { Venue } from '@/components/events/event-search/types';
import type { ListingAccent, ListingCardData } from './types';
import { extractCapacity } from './extractCapacity';
import { formatPackagePrice } from './formatListingPrice';
import { toSlug } from '@/components/events/event-details/toSlug';

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80';

function resolveImage(images?: Array<{ file: string; cover_photo?: boolean }>): string {
  const cover = images?.find((img) => img.cover_photo) || images?.[0];
  return cover?.file || PLACEHOLDER_IMAGE;
}

function resolveHref(slug?: string, name?: string, id?: number | string): string {
  const path = slug || (name ? toSlug(name) : String(id ?? ''));
  return `/events/details/${path}`;
}

function resolveTag(
  venueType?: Array<{ name: string }> | number,
  eventType?: Array<{ name: string }> | number,
  fallback = 'Venue',
): string {
  if (Array.isArray(venueType) && venueType[0]?.name) return venueType[0].name;
  if (Array.isArray(eventType) && eventType[0]?.name) return eventType[0].name;
  return fallback;
}

function resolveAmenity(record: VenueRecord): string | undefined {
  return (
    record.amenities_details?.[0]?.name ||
    record.services_details?.[0]?.name ||
    record.highlights_details?.[0]?.name
  );
}

export function mapVenueRecordToListingCard(
  v: VenueRecord,
  options?: { accent?: ListingAccent; href?: string; tag?: string },
): ListingCardData {
  const price = formatPackagePrice(v.package_details?.[0]?.price);
  const rating = typeof v.rating === 'number' ? v.rating : undefined;
  const reviewCount = typeof v.reviews === 'number' ? v.reviews : undefined;

  return {
    id: v.id,
    name: v.name,
    slug: v.slug,
    city: v.city_name || 'India',
    image: resolveImage(v.images),
    rating,
    reviewCount,
    price,
    capacity: extractCapacity(v),
    tag: options?.tag ?? resolveTag(v.venue_type, v.event_type),
    amenity: resolveAmenity(v),
    href: options?.href ?? resolveHref(v.slug, v.name, v.id),
    accent: options?.accent ?? 'orange',
    cuisines: v.cuisine_details?.slice(0, 2).map((c) => c.name) || [],
    highlights: v.highlights_details?.slice(0, 2).map((h) => h.name) || [],
    packageName: v.package_details?.[0]?.name || '',
  };
}

/** Map search-page Venue type to ListingCardData */
export function mapSearchVenueToListingCard(
  v: Venue,
  options?: { accent?: ListingAccent },
): ListingCardData {
  const price = formatPackagePrice(v.package_details?.[0]?.price);
  const rating = v.rating ? Number(v.rating) : undefined;
  const reviewCount = v.reviews ? Number(v.reviews) : undefined;

  return {
    id: v.id,
    name: v.name,
    slug: v.slug,
    city: v.city_name || 'India',
    image: resolveImage(v.images),
    rating: rating && !isNaN(rating) ? rating : undefined,
    reviewCount: reviewCount && !isNaN(reviewCount) ? reviewCount : undefined,
    price,
    capacity: extractCapacity(v as unknown as VenueRecord),
    tag: v.highlights_details?.[0]?.name || v.cuisine_details?.[0]?.name || 'Venue',
    amenity: v.highlights_details?.[0]?.name || v.cuisine_details?.[0]?.name,
    href: resolveHref(v.slug, v.name, v.id),
    accent: options?.accent ?? 'orange',
    cuisines: v.cuisine_details?.slice(0, 2).map((c) => c.name) || [],
    highlights: v.highlights_details?.slice(0, 2).map((h) => h.name) || [],
    packageName: v.package_details?.[0]?.name || '',
  };
}
