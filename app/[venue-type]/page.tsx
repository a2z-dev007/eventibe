import { getVenues } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import ListingGrid from '@/components/listings/ListingGrid';
import CommonHero from '@/components/common/CommonHero';

export async function generateMetadata({ params }: { params: Promise<{ 'venue-type': string }> }) {
  const { 'venue-type': venueType } = await params;
  const formattedType = venueType.replace(/-/g, ' ');
  
  return {
    title: `${formattedType} | Eventibe`,
    description: `Browse our curated selection of premium ${formattedType} for your next event.`,
  };
}

export default async function VenueTypePage({ params }: { params: Promise<{ 'venue-type': string }> }) {
  const { 'venue-type': venueType } = await params;
  const formattedType = venueType.replace(/-/g, ' ');
  const venues = await getVenues({ type: venueType });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText="Venue Category"
        badgeIcon="building2"
        titleMain="Premium"
        titleHighlight={formattedType}
        subtitle={`Browse our curated selection of premium ${formattedType}. Find the perfect match for your event.`}
        bgSrc="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop"
        bgType="image"
      />

      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <ListingGrid>
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
            {venues.length === 0 && (
              <p className="text-soft-slate col-span-full">No venues found for this category at the moment.</p>
            )}
          </ListingGrid>
        </div>
      </div>
    </div>
  );
}

