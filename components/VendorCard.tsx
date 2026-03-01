import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Briefcase, Star } from 'lucide-react';
import { Vendor } from '@/lib/api';

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={vendor.images[0] || 'https://picsum.photos/seed/placeholder/800/600'}
          alt={vendor.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary-navy flex items-center gap-1">
          <Star size={12} className="fill-accent-orange text-accent-orange" />
          <span>{vendor.rating || '4.5'}</span>
        </div>
        <div className="absolute top-3 left-3 bg-corporate-blue/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-white uppercase tracking-wider">
          {vendor.category.replace('-', ' ')}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-primary-navy mb-2 line-clamp-1">{vendor.name}</h3>
        
        <div className="flex items-center text-soft-slate text-sm mb-4">
          <MapPin size={14} className="mr-1 text-corporate-blue" />
          <span className="capitalize">{vendor.city}</span>
        </div>
        
        <div className="text-sm text-soft-slate mb-6 line-clamp-2">
          {vendor.description}
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-primary-navy">
            {vendor.price_range || 'Custom Quotes'}
          </div>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="text-sm font-medium text-corporate-blue hover:text-mid-blue transition-colors flex items-center group-hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
