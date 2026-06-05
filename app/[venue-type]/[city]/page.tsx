import { getVenues, getCityBySlug } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import { notFound } from 'next/navigation';
import CommonHero from '@/components/common/CommonHero';

export async function generateMetadata({ params }: { params: Promise<{ 'venue-type': string; city: string }> }) {
  const { 'venue-type': venueType, city } = await params;
  const cityData = await getCityBySlug(city);
  
  if (!cityData) return { title: 'Not Found' };
  
  const formattedType = venueType.replace(/-/g, ' ');
  
  return {
    title: `${formattedType} in ${cityData.name} | Eventibe`,
    description: `Find the best ${formattedType} in ${cityData.name} for your next corporate event.`,
  };
}

export default async function VenueTypeCityPage({ params }: { params: Promise<{ 'venue-type': string; city: string }> }) {
  const { 'venue-type': venueType, city } = await params;
  const cityData = await getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const formattedType = venueType.replace(/-/g, ' ');
  const venues = await getVenues({ city: city, type: venueType });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText={`Explore ${cityData.name}`}
        badgeIcon="mappin"
        titleMain={`${formattedType} in`}
        titleHighlight={cityData.name}
        subtitle={`Browse our curated selection of premium ${formattedType} in ${cityData.name}.`}
        bgSrc="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop"
        bgType="image"
      />

      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
            {venues.length === 0 && (
              <p className="text-soft-slate col-span-full">No venues found for this category in {cityData.name} at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

