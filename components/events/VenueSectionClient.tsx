'use client';

import ListingCard from '@/components/listings/ListingCard';
import ListingGrid from '@/components/listings/ListingGrid';
import ListingCardSkeleton from '@/components/listings/ListingCardSkeleton';
import { mapVenueRecordToListingCard } from '@/lib/listings/mapVenueRecordToListingCard';
import type { ListingAccent } from '@/lib/listings/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionHeader from './SectionHeader';
import { fetchVenues, type VenueRecord } from '@/lib/api/eventsEndpoints';
import { ArrowRight, Search } from 'lucide-react';

export interface VenueSectionClientProps {
  venueType: number;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllText?: string;
  bgClass?: string;
  accent?: ListingAccent;
}

export default function VenueSectionClient({
  venueType,
  eyebrow,
  title,
  subtitle,
  viewAllHref = '/events/search',
  viewAllText = 'View all venues',
  bgClass = 'bg-gray-50/50',
  accent = 'orange',
}: VenueSectionClientProps) {
  const [venues, setVenues] = useState<VenueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchVenues({ venue_type: venueType })
      .then((res) => {
        if (!cancelled && res.records) setVenues(res.records);
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load venues');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [venueType]);

  const cards = venues.map((v) => mapVenueRecordToListingCard(v, { accent }));

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 ${bgClass}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 text-sm font-black text-[#FF9530] uppercase tracking-widest hover:text-[#FF8000] transition-all shrink-0 sm:mb-8"
          >
            {viewAllText}
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#FF9530] group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>

        {loading ? (
          <ListingGrid>
            {[...Array(4)].map((_, i) => (
              <ListingCardSkeleton key={i} delay={i} />
            ))}
          </ListingGrid>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest">{error}</p>
          </div>
        ) : cards.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-gray-300 mb-6 border border-gray-100/50">
              <Search className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">No Venues Found</h4>
            <p className="text-gray-500 font-medium max-w-sm mx-auto">
              We couldn&apos;t find any premium venues in this category at the moment. Please check back later or explore other categories.
            </p>
          </div>
        ) : (
          <ListingGrid>
            {cards.map((card) => (
              <ListingCard key={card.id} {...card} />
            ))}
          </ListingGrid>
        )}
      </div>
    </section>
  );
}
