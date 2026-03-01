import { getVenues, getVendors } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import VendorCard from '@/components/VendorCard';

export const metadata = {
  title: 'Search Results | Eventibe',
  description: 'Search results for corporate venues and services.',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ city?: string; type?: string; q?: string }> }) {
  const { city, type, q } = await searchParams;
  
  // Basic search logic for demo purposes
  const venues = await getVenues({ city, type });
  const vendors = await getVendors({ city, category: type });

  const hasResults = venues.length > 0 || vendors.length > 0;

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight">Search Results</h1>
          <p className="text-lg text-soft-slate">
            Showing results for {city ? `city: ${city}` : ''} {type ? `type: ${type}` : ''} {q ? `query: ${q}` : ''}
          </p>
        </div>

        {!hasResults && (
          <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-primary-navy mb-4">No results found</h2>
            <p className="text-soft-slate">Try adjusting your search filters or browse our categories.</p>
          </div>
        )}

        {venues.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-primary-navy mb-6">Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        )}

        {vendors.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-primary-navy mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vendors.map((vendor) => (
                <VendorCard key={vendor.id} vendor={vendor} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
