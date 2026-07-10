import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Wifi, Star, ArrowUpRight } from 'lucide-react';
import { Venue } from '@/lib/api';

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="group bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-md hover:shadow-xl hover:shadow-slate-100/60 transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Image Area */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={venue.images[0] || 'https://picsum.photos/seed/placeholder/800/600'}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {/* Rating Badge */}
        {venue.rating !== undefined && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-xl text-xs font-black text-primary-navy flex items-center gap-1 border border-white/60 shadow-sm">
            <Star size={11} className="fill-accent-orange text-accent-orange" />
            <span>{(Number(venue.rating) || 4.5).toFixed(1)}</span>
          </div>
        )}
        {/* Type Tag */}
        <div className="absolute top-3 left-3 bg-corporate-blue text-white text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl shadow-sm">
          {venue.type.replace('-', ' ')}
        </div>
      </div>
      
      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow gap-3">
        <h3 className="text-[16px] font-bold text-primary-navy leading-snug line-clamp-2 group-hover:text-corporate-blue transition-colors duration-300">
          {venue.name}
        </h3>
        
        <div className="flex items-center text-soft-slate text-xs font-semibold gap-1.5">
          <MapPin size={12} className="text-corporate-blue flex-shrink-0" />
          <span className="capitalize">{venue.city}</span>
        </div>
        
        {/* Capacity & Core Amenity Row */}
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
            <Users size={10} className="text-corporate-blue" />
            Up to {venue.capacity}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
            <Wifi size={10} className="text-corporate-blue" />
            {venue.amenities[0] || 'WiFi'}
          </span>
        </div>
        
        <div className="flex-grow" />
        
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-1">
          <div className="text-sm font-black text-primary-navy">
            {venue.price_range}
          </div>
          <Link
            href={`/venue/${venue.slug}`}
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
