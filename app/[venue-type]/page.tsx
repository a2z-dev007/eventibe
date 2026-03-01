import { getVenues } from '@/lib/api';
import VenueCard from '@/components/VenueCard';

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
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight capitalize">
            {formattedType}
          </h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Browse our curated selection of premium {formattedType}. Find the perfect match for your event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
          {venues.length === 0 && (
            <p className="text-soft-slate col-span-full">No venues found for this category at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
