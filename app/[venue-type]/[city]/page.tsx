import { getVenues, getCityBySlug } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ type: string; city: string }> }) {
  const { type, city } = await params;
  const cityData = await getCityBySlug(city);
  
  if (!cityData) return { title: 'Not Found' };
  
  const formattedType = type.replace('-', ' ');
  
  return {
    title: `${formattedType} in ${cityData.name} | Eventibe`,
    description: `Find the best ${formattedType} in ${cityData.name} for your next corporate event.`,
  };
}

export default async function VenueTypeCityPage({ params }: { params: Promise<{ type: string; city: string }> }) {
  const { type, city } = await params;
  const cityData = await getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const venues = await getVenues({ city: city, type: type });

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight capitalize">
            {type.replace('-', ' ')} in {cityData.name}
          </h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Browse our curated selection of premium {type.replace('-', ' ')} in {cityData.name}.
          </p>
        </div>

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
  );
}
