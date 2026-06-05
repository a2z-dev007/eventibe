import { getVendors, getCityBySlug } from '@/lib/api';
import VendorCard from '@/components/VendorCard';
import { notFound } from 'next/navigation';
import CommonHero from '@/components/common/CommonHero';

export async function generateMetadata({ params }: { params: Promise<{ category: string; city: string }> }) {
  const { category, city } = await params;
  const cityData = await getCityBySlug(city);
  
  if (!cityData) return { title: 'Not Found' };

  return {
    title: `${category.replace('-', ' ')} Services in ${cityData.name} | Eventibe`,
    description: `Find top-rated ${category.replace('-', ' ')} services in ${cityData.name} for your corporate event.`,
  };
}

export default async function VendorCategoryCityPage({ params }: { params: Promise<{ category: string; city: string }> }) {
  const { category, city } = await params;
  const cityData = await getCityBySlug(city);

  if (!cityData) {
    notFound();
  }

  const vendors = await getVendors({ category, city });
  const formattedCategory = category.replace(/-/g, ' ');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonHero
        badgeText={`Explore ${cityData.name}`}
        badgeIcon="mappin"
        titleMain={`${formattedCategory} Services in`}
        titleHighlight={cityData.name}
        subtitle={`Browse our curated selection of premium ${formattedCategory} providers in ${cityData.name}.`}
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
              <p className="text-soft-slate col-span-full">No vendors found in this category and city at the moment.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

