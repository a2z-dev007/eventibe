import { getVenues, getVendors } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import ListingGrid from '@/components/listings/ListingGrid';
import VendorCard from '@/components/VendorCard';
import CommonHero from '@/components/common/CommonHero';

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
  const searchDetail = [
    city && `City: ${city}`,
    type && `Type: ${type.replace(/-/g, ' ')}`,
    q && `Query: ${q}`
  ].filter(Boolean).join(' | ') || 'All Listings';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText="Search Results"
        badgeIcon="search"
        titleMain="Your Search"
        titleHighlight="Results"
        subtitle={`Showing matched options for: ${searchDetail}`}
        bgSrc="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=crop"
        bgType="image"
      />

      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          {!hasResults && (
            <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-primary-navy mb-4">No results found</h2>
              <p className="text-soft-slate">Try adjusting your search filters or browse our categories.</p>
            </div>
          )}

          {venues.length > 0 && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-primary-navy mb-6">Venues</h2>
              <ListingGrid>
                {venues.map((venue) => (
                  <VenueCard key={venue.id} venue={venue} />
                ))}
              </ListingGrid>
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
    </div>
  );
}

