'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, SlidersHorizontal, MapPin } from 'lucide-react';
import PremiumCard, { PremiumCardData } from '@/components/ui/PremiumCard';
import { searchVenues, VenueRecord } from '@/lib/api/eventsEndpoints';

const RECORDS_PER_PAGE = 20;

function PremiumSkeletonCard() {
  return (
    <div className="rounded-[28px] bg-white border border-gray-100 overflow-hidden shadow-sm h-[420px] flex flex-col p-5 animate-pulse">
      <div className="h-52 w-full rounded-2xl bg-gray-100 mb-4" />
      <div className="h-5 w-3/4 rounded-md bg-gray-200 mb-2" />
      <div className="h-4 w-1/2 rounded-md bg-gray-200 mb-6" />
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        <div className="h-4 w-1/3 rounded-md bg-gray-200" />
        <div className="h-4 w-1/4 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <PremiumSkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function VenuesClient() {
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

    // Fetch all venues from the API (no event_type filter)
    searchVenues({
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
        console.error('Failed to load venues:', err);
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

  // Client-side filtration for search query and city filter
  const filteredVenues = venues.filter((v) => {
    const matchesSearch = searchQuery === '' || 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (v.city_name && v.city_name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCity = selectedCity === '' || 
      (v.city_name && v.city_name.toLowerCase() === selectedCity.toLowerCase());
    return matchesSearch && matchesCity;
  });

  // Map API records to card props (PremiumCardData)
  const cards = filteredVenues.map((v, i) => {
    const coverImage = v.images?.find((img) => img.cover_photo) || v.images?.[0];
    const image = coverImage?.file || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80';
    
    const rawPrice = v.package_details?.[0]?.price;
    const priceNum = rawPrice ? Number(rawPrice) : 0;
    const price = priceNum > 0 && !isNaN(priceNum)
      ? `₹${priceNum.toLocaleString('en-IN')}/day`
      : undefined;
      
    const parsedCapacity = Number(v.venue_configuration);
    const capacity = !isNaN(parsedCapacity) && parsedCapacity > 0
      ? parsedCapacity
      : undefined;
      
    const tag = v.venue_type?.[0]?.name || 'Venue';
    const amenity = v.amenities_details?.[0]?.name || 'Premium Service';

    return {
      id: v.id,
      name: v.name,
      slug: v.slug || String(v.id),
      city: v.city_name || 'Delhi',
      image,
      rating: typeof v.rating === 'number' ? v.rating : undefined,
      price,
      capacity,
      tag,
      amenity,
      href: `/venue/${v.slug || v.id}`,
      accent: 'blue' as const,
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
    <div className="relative min-h-screen bg-[#fafbfc] py-16 overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-blue-100" />
      <div className="absolute bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15 bg-slate-100" />
      
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(15,23,42,0.025) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-primary-navy" />
            <span className="text-[11px] font-black text-primary-navy uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Sparkles size={12} className="animate-pulse" />
              Verified Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-navy tracking-tight leading-none mb-6">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-950">Premium Spaces</span>
          </h1>
          <p className="text-lg text-soft-slate/90 leading-relaxed font-medium max-w-2xl">
            Browse and secure corporate convention centers, luxury wedding banquets, and scenic retreats for your next occasion.
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100/5 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search venue portfolio..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-primary-navy placeholder:text-soft-slate/70 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all shadow-sm"
              />
            </div>
            
            {/* City Selector */}
            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-slate-200 rounded-xl pl-11 pr-8 py-3 text-sm text-primary-navy appearance-none focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all shadow-sm"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
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
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white border border-dashed border-slate-200 rounded-[2.5rem]">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6 border border-slate-100">
              <Search className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-black text-primary-navy mb-2">No Spaces Found</h4>
            <p className="text-soft-slate font-medium max-w-sm mx-auto mb-6">
              We couldn't find any premium spaces matching your search query. Try clearing your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCity(''); }}
              className="px-6 py-2.5 bg-primary-navy text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cards.map((card) => (
                <div key={card.id}>
                  <PremiumCard {...card} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-3">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    currentPage === 1
                      ? 'border-slate-200/50 bg-white/40 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 bg-white text-primary-navy hover:bg-primary-navy hover:text-white shadow-md active:scale-95'
                  }`}
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNumber = idx + 1;
                  const isCurrent = pageNumber === currentPage;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-12 h-12 rounded-xl text-sm font-black transition-all ${
                        isCurrent
                          ? 'bg-primary-navy text-white shadow-lg shadow-slate-900/10 scale-105'
                          : 'border border-slate-200 bg-white text-primary-navy hover:bg-slate-50/50 shadow-sm active:scale-95'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${
                    currentPage === totalPages
                      ? 'border-slate-200/50 bg-white/40 text-slate-300 cursor-not-allowed'
                      : 'border-slate-200 bg-white text-primary-navy hover:bg-primary-navy hover:text-white shadow-md active:scale-95'
                  }`}
                  aria-label="Next Page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
