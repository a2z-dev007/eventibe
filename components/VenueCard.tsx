import ListingCard from '@/components/listings/ListingCard';
import { mapLegacyVenueToListingCard } from '@/lib/listings/mapLegacyVenueToListingCard';
import type { ListingAccent } from '@/lib/listings/types';
import { Venue } from '@/lib/api';

export default function VenueCard({
  venue,
  accent,
}: {
  venue: Venue;
  accent?: ListingAccent;
}) {
  return <ListingCard {...mapLegacyVenueToListingCard(venue, { accent })} />;
}
