import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Users, Wifi, Star } from 'lucide-react';
import { Venue } from '@/lib/api';

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={venue.images[0] || 'https://picsum.photos/seed/placeholder/800/600'}
          alt={venue.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-primary-navy flex items-center gap-1">
          <Star size={12} className="fill-accent-orange text-accent-orange" />
          <span>{venue.rating || '4.5'}</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-primary-navy line-clamp-1">{venue.name}</h3>
        </div>
        
        <div className="flex items-center text-soft-slate text-sm mb-4">
          <MapPin size={14} className="mr-1 text-corporate-blue" />
          <span className="capitalize">{venue.city}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm text-soft-slate mb-6">
          <div className="flex items-center">
            <Users size={14} className="mr-2 text-corporate-blue" />
            <span>Up to {venue.capacity}</span>
          </div>
          <div className="flex items-center">
            <Wifi size={14} className="mr-2 text-corporate-blue" />
            <span className="truncate">{venue.amenities[0] || 'WiFi'}</span>
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm font-semibold text-primary-navy">
            {venue.price_range}
          </div>
          <Link
            href={`/venue/${venue.slug}`}
            className="text-sm font-medium text-corporate-blue hover:text-mid-blue transition-colors flex items-center group-hover:underline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
