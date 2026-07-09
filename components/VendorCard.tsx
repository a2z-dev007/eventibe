import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, ArrowUpRight } from 'lucide-react';
import { Vendor } from '@/lib/api';

export default function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-md hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={vendor.images[0] || 'https://picsum.photos/seed/placeholder/800/600'}
          alt={vendor.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Rating Badge */}
        {vendor.rating !== undefined && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-black text-primary-navy flex items-center gap-1 border border-white/60 shadow-sm">
            <Star size={11} className="fill-accent-orange text-accent-orange" />
            <span>{(Number(vendor.rating) || 4.5).toFixed(1)}</span>
          </div>
        )}
        {/* Category Tag */}
        <div className="absolute top-3 left-3 bg-corporate-blue text-white text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl shadow-sm">
          {vendor.category.replace('-', ' ')}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow gap-3">
        <h3 className="text-[16px] font-black text-primary-navy leading-snug line-clamp-2 group-hover:text-corporate-blue transition-colors duration-300">
          {vendor.name}
        </h3>
        
        <div className="flex items-center text-soft-slate text-xs font-semibold gap-1.5">
          <MapPin size={12} className="text-corporate-blue flex-shrink-0" />
          <span className="capitalize">{vendor.city}</span>
        </div>
        
        <p className="text-xs text-soft-slate/90 leading-relaxed font-medium line-clamp-2">
          {vendor.description}
        </p>
        
        <div className="flex-grow" />
        
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-1">
          <div className="text-sm font-black text-primary-navy">
            {vendor.price_range || 'Custom Quotes'}
          </div>
          <Link
            href={`/vendor/${vendor.slug}`}
            className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider text-corporate-blue group-hover:gap-2 transition-all duration-300"
          >
            View
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
