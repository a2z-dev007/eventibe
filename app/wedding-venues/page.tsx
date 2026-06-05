import { getVenues } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import CommonHero from '@/components/common/CommonHero';

export const metadata = {
  title: 'Wedding Venues | Eventibe',
  description: 'Browse and book premium wedding venues, banquet halls, and resorts.',
};

export default async function WeddingVenuesPage() {
  const allVenues = await getVenues();
  const venues = allVenues.filter(v => v.type === 'wedding-venues' || v.type === 'banquet-halls' || v.type === 'resorts');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText="Dream Celebrations"
        badgeIcon="heart"
        titleMain="Elegant Wedding"
        titleHighlight="Venues"
        subtitle="Discover the perfect space for your dream wedding. Filter by city, capacity, and amenities to find exactly what you need."
        bgSrc="https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=2070&auto=format&fit=crop"
        bgType="image"
      />

      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filters (Static UI for demo) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10 flex flex-wrap gap-4">
            <select className="bg-gray-50 border border-gray-200 text-primary-navy text-sm rounded-lg focus:ring-corporate-blue focus:border-corporate-blue block p-2.5">
              <option value="">All Cities</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 text-primary-navy text-sm rounded-lg focus:ring-corporate-blue focus:border-corporate-blue block p-2.5">
              <option value="">Any Capacity</option>
              <option value="50">Up to 50</option>
              <option value="200">Up to 200</option>
              <option value="500">500+</option>
            </select>
            <select className="bg-gray-50 border border-gray-200 text-primary-navy text-sm rounded-lg focus:ring-corporate-blue focus:border-corporate-blue block p-2.5">
              <option value="">All Types</option>
              <option value="wedding-venues">Wedding Venues</option>
              <option value="banquet-halls">Banquet Halls</option>
              <option value="resorts">Resorts</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

