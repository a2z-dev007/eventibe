import { getVenues } from '@/lib/api';
import VenueCard from '@/components/VenueCard';

export const metadata = {
  title: 'All Venues | Eventibe',
  description: 'Browse and book premium venues for corporate events, conferences, and offsites.',
};

export default async function AllVenuesPage() {
  const venues = await getVenues();

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight">All Venues</h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Discover the perfect space for your next event. Filter by city, capacity, and amenities to find exactly what you need.
          </p>
        </div>

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
            <option value="corporate-event-venues">Corporate Venues</option>
            <option value="resorts">Resorts</option>
            <option value="hotels">Hotels</option>
            <option value="conference-centers">Conference Centers</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      </div>
    </div>
  );
}
