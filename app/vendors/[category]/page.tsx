import { getVendors } from '@/lib/api';
import VendorCard from '@/components/VendorCard';

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

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight capitalize">
            {category.replace('-', ' ')} Services
          </h1>
          <p className="text-lg text-soft-slate max-w-3xl">
            Browse our curated selection of premium {category.replace('-', ' ')} providers for corporate events.
          </p>
        </div>

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
  );
}
