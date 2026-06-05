import { getVendors } from '@/lib/api';
import VendorCard from '@/components/VendorCard';
import CommonHero from '@/components/common/CommonHero';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return {
    title: `${category.replace('-', ' ')} Services | Eventibe`,
    description: `Find top-rated ${category.replace('-', ' ')} services for your corporate event.`,
  };
}

export default async function VendorCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const vendors = await getVendors({ category });
  const formattedCategory = category.replace(/-/g, ' ');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText="Event Services"
        badgeIcon="users"
        titleMain="Premium"
        titleHighlight={`${formattedCategory} Services`}
        subtitle={`Browse our curated selection of premium ${formattedCategory} providers for corporate events.`}
        bgSrc="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
        bgType="image"
      />

      <div className="bg-slate-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
            {vendors.length === 0 && (
              <p className="text-soft-slate col-span-full">No vendors found in this category at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

