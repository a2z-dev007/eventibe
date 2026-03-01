import { getVendors } from '@/lib/api';
import VendorCard from '@/components/VendorCard';

export const metadata = {
  title: 'Event Services & Vendors | Eventibe',
  description: 'Find top-rated corporate event services including catering, AV, and planners.',
};

export default async function VendorsPage() {
  const vendors = await getVendors();

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight">Event Services</h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Partner with the best in the business. From gourmet catering to cutting-edge AV solutions, find trusted vendors for your corporate event.
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
            <option value="">All Categories</option>
            <option value="catering">Catering</option>
            <option value="av-services">AV Services</option>
            <option value="planners">Event Planners</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      </div>
    </div>
  );
}
