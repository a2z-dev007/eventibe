import { getVendors } from '@/lib/api';
import VendorCard from '@/components/VendorCard';
import CommonHero from '@/components/common/CommonHero';

export const metadata = {
  title: 'Event Services & Vendors | Eventibe',
  description: 'Find top-rated corporate event services including catering, AV, and planners.',
};

export default async function VendorsPage() {
  const vendors = await getVendors();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText="Expert Services"
        badgeIcon="sparkles"
        titleMain="Event Services &"
        titleHighlight="Vendors"
        subtitle="Partner with the best in the business. From gourmet catering to cutting-edge AV solutions, find trusted vendors for your corporate event."
        bgSrc="https://images.unsplash.com/photo-1472653431158-6364773b2a56?q=80&w=2069&auto=format&fit=crop"
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
    </div>
  );
}
