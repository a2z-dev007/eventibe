import { getVenues, getCityBySlug } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCityBySlug(city);
  
  if (!cityData) return { title: 'City Not Found' };
  
  return {
    title: `Wedding Venues in ${cityData.name} | Eventibe`,
    description: `Find the perfect wedding venues, banquet halls, and resorts in ${cityData.name}.`,
  };
}

export default async function CityWeddingVenuesPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = await getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const allVenues = await getVenues({ city: city });
  const venues = allVenues.filter(v => v.type === 'wedding-venues' || v.type === 'banquet-halls' || v.type === 'resorts');

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight capitalize">
            Wedding Venues in {cityData.name}
          </h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Browse our curated selection of premium wedding spaces in {cityData.name}. Perfect for your dream wedding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
          {venues.length === 0 && (
            <p className="text-soft-slate col-span-full">No wedding venues found in {cityData.name} at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}
