'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Sparkles, SlidersHorizontal, MapPin, Building2 } from 'lucide-react';
import PremiumCard, { PremiumCardData } from '@/components/ui/PremiumCard';
import { searchVenues, VenueRecord } from '@/lib/api/eventsEndpoints';
import { Pagination } from '@/components/ui/pagination';

const RECORDS_PER_PAGE = 6;

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
      {Array.from({ length: RECORDS_PER_PAGE }).map((_, i) => (
        <PremiumSkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function CorporateVenuesClient() {
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
    
    // Fetch live corporate venues (event_type: 120)
    searchVenues({
      event_type: 120,
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
        console.error('Failed to load corporate venues:', err);
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

  // Map API records to card props (PremiumCardData)
  const cards = filteredVenues.map((v, i) => {
    const coverImage = v.images?.find((img) => img.cover_photo) || v.images?.[0];
    const image = coverImage?.file || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80';
    
    const rawPrice = v.package_details?.[0]?.price;
    const priceNum = rawPrice ? Number(rawPrice) : 0;
    const price = priceNum > 0 && !isNaN(priceNum)
      ? `₹${priceNum.toLocaleString('en-IN')}/day`
      : undefined;
      
    const parsedCapacity = Number(v.venue_configuration);
    const capacity = !isNaN(parsedCapacity) && parsedCapacity > 0
      ? parsedCapacity
      : undefined;
    const tag = v.venue_type?.[0]?.name || 'Corporate';
    const amenity = v.amenities_details?.[0]?.name || 'Premium Service';
    const cuisines = v.cuisine_details?.slice(0, 2).map((c: any) => c.name) || [];
    const highlights = v.highlights_details?.slice(0, 2).map((h: any) => h.name) || [];
    const packageName = v.package_details?.[0]?.name || '';

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
    <div className="relative min-h-screen bg-[#f8fafc] py-16 overflow-hidden">
      {/* Decorative Corporate Blue/Indigo Swirl Orbs */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-blue-200" />
      <div className="absolute bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15 bg-indigo-200" />
      
      {/* Dot Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgba(30,58,138,0.035) 1.5px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Hero Header */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[2px] bg-corporate-blue" />
            <span className="text-[11px] font-black text-corporate-blue uppercase tracking-[0.25em] flex items-center gap-1.5">
              <Building2 size={12} className="animate-pulse" />
              Corporate Elite
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-primary-navy tracking-tight leading-none mb-6">
            Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Event Spaces</span>
          </h1>
          <p className="text-lg text-soft-slate/90 leading-relaxed font-medium max-w-2xl">
            Discover premium conference halls, breakout rooms, and exhibition hubs tailored for high-performance corporate gatherings.
          </p>
        </div>

        {/* Premium Filters Section */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-blue-100/50 shadow-xl shadow-blue-100/5 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-corporate-blue w-4 h-4" />
              <input
                type="text"
                placeholder="Search conference hubs, cities..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-blue-100/70 rounded-xl pl-11 pr-4 py-3 text-sm text-primary-navy placeholder:text-soft-slate/70 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
              />
            </div>
            
            {/* City Selector */}
            <div className="relative min-w-[180px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-corporate-blue w-4 h-4 pointer-events-none" />
              <select
                value={selectedCity}
                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                className="w-full bg-white border border-blue-100/70 rounded-xl pl-11 pr-8 py-3 text-sm text-primary-navy appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all shadow-sm"
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-corporate-blue">
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
          <div className="py-20 flex flex-col items-center justify-center text-center bg-white/40 border border-dashed border-blue-200/50 rounded-[2.5rem]">
            <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-300 mb-6 border border-blue-100">
              <Search className="w-10 h-10" strokeWidth={1.5} />
            </div>
            <h4 className="text-2xl font-black text-primary-navy mb-2">No Corporate Spaces Found</h4>
            <p className="text-soft-slate font-medium max-w-sm mx-auto mb-6">
              We couldn't find any business venues matching your search criteria. Try updating your filters.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCity(''); }}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
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
              <div className="mt-20">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  variant="corporate"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
