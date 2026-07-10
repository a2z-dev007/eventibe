'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import WeddingVenueCard, { WeddingVenueCardData } from '@/components/ui/WeddingVenueCard';
import { searchVenues, VenueRecord } from '@/lib/api/eventsEndpoints';
import { Pagination } from '@/components/ui/pagination';

const RECORDS_PER_PAGE = 6;

function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: RECORDS_PER_PAGE }).map((_, i) => (
        <div key={i} className="relative w-full h-[400px] rounded-2xl bg-gray-100 overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gray-200" />
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3 bg-gradient-to-t from-gray-300 via-gray-200/50 to-transparent">
            <div className="h-4 w-3/4 rounded bg-gray-300" />
            <div className="h-3 w-1/2 rounded bg-gray-300" />
            <div className="h-10 w-full rounded-xl bg-gray-300/60 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WeddingVenuesClient() {
  const [venues, setVenues] = useState<VenueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    // Fetch live wedding venues (event_type: 26)
    searchVenues({
      event_type: 26,
      page_number: currentPage,
      number_of_records: RECORDS_PER_PAGE
    })
      .then((res) => {
        if (!active) return;
        if (res && res.records) {
          setVenues(res.records);
          setTotalRecords(res.totalRecords || res.records.length);
        } else {
          setVenues([]);
          setTotalRecords(0);
        }
      })
      .catch((err) => {
        console.error('Failed to load wedding venues:', err);
        if (active) {
          setVenues([]);
          setTotalRecords(0);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [currentPage]);

  // Client-side filtration for search query and city
  const filteredVenues = venues.filter((v) => {
    const matchesSearch = searchQuery === '' || 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (v.city_name && v.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = selectedCity === '' || 
      (v.city_name && v.city_name.toLowerCase() === selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  // Map API records to card props
  const cards = filteredVenues.map((v, i) => {
    const coverImage = v.images?.find((img) => img.cover_photo) || v.images?.[0];
    const image = coverImage?.file || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';
    
    const rawPrice = v.package_details?.[0]?.price;
    const priceNum = rawPrice ? Number(rawPrice) : 0;
    const price = priceNum > 0 && !isNaN(priceNum)
      ? `From ₹${priceNum.toLocaleString('en-IN')}`
      : undefined;
      
    const parsedCapacity = Number(v.venue_configuration);
    const capacity = !isNaN(parsedCapacity) && parsedCapacity > 0
      ? parsedCapacity
      : undefined;
    const tag = v.venue_type?.[0]?.name || v.event_type?.[0]?.name || 'Wedding Venue';
    const cuisines = v.cuisine_details?.slice(0, 2).map((c: any) => c.name) || [];
    const highlights = v.highlights_details?.slice(0, 2).map((h: any) => h.name) || [];
    const packageName = v.package_details?.[0]?.name || '';

    return {
      id: v.id,
      name: v.name,
      city: v.city_name || 'Delhi',
      image,
      rating: typeof v.rating === 'number' ? v.rating : undefined,
      price,
      capacity,
      tag,
      href: `/venue/${v.slug || v.id}`,
      variant: 'portrait' as const,
      cuisines,
      highlights,
      packageName,
    };
  });

  const totalPages = Math.ceil(totalRecords / RECORDS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Extract unique cities from currently fetched list for static dropdown options
  const uniqueCities = Array.from(new Set(venues.map(v => v.city_name).filter(Boolean)));

  return (
    <div className="relative min-h-screen bg-[#fdf8f6] py-16 overflow-hidden">
      {/* Decorative Blush Swirl Orbs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-25 bg-rose-200" />
      <div className="absolute bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-pink-200" />
      
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(180,60,60,0.035) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-accent-orange" />
            <span className="text-[11px] font-black text-accent-orange uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles size={12} className="animate-spin-slow" />
              Exquisite Collection
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-navy tracking-tight leading-none mb-6">
            Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">Wedding Venues</span>
          </h1>
          <p className="text-lg text-soft-slate/90 leading-relaxed font-medium max-w-2xl">
            From majestic palaces to serene resorts, discover the perfect premium venue to celebrate your love story.
          </p>
        </div>

        {/* Premium Filters Section */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-rose-100/50 shadow-xl shadow-rose-100/10 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by venue name or location..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-rose-100 rounded-xl pl-11 pr-4 py-3 text-sm text-primary-navy placeholder:text-soft-slate/70 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all shadow-sm"
              />
            </div>
            
            {/* City Selector */}
            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400 w-4 h-4 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-rose-100 rounded-xl pl-11 pr-8 py-3 text-sm text-primary-navy appearance-none focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 transition-all shadow-sm"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-rose-400">
                <SlidersHorizontal size={12} />
              </div>
            </div>
          </div>
          
          <div className="text-xs font-bold text-soft-slate shrink-0 px-2">
            Showing {filteredVenues.length} of {totalRecords} spaces
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <ListingSkeleton />
        ) : filteredVenues.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white/40 border border-dashed border-rose-200/50 rounded-[2.5rem]">
            <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-300 mb-6 border border-rose-100">
              <Search className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-black text-primary-navy mb-2">No Venues Found</h4>
            <p className="text-soft-slate font-medium max-w-sm mx-auto mb-6">
              We couldn't find any wedding venues matching your search. Try resetting your search query or city filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCity(''); }}
              className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-500/20 active:scale-95 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => (
                <div key={card.id} className="h-[400px]">
                  <WeddingVenueCard {...card} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  variant="wedding"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
