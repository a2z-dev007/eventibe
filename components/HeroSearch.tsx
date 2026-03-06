"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Home as HomeIcon, Users } from 'lucide-react';
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect';
import PremiumSelect from '@/components/ui/PremiumSelect';
import PremiumDatePicker from '@/components/ui/PremiumDatePicker';
import { useVenueTypes, useEventTypes } from '@/hooks/useSearchBarData';

const GUEST_OPTIONS = [
  { value: '100', label: '0–100' },
  { value: '300', label: '100–300' },
  { value: '600', label: '300–600' },
  { value: '601', label: '600+' },
];

/** Thin glass skeleton shown while a dropdown is loading from the API */
function DropdownSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col px-4 py-2.5">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">{label}</span>
      <div className="h-4 w-24 rounded-full bg-white/20 animate-pulse" />
    </div>
  );
}

export default function HeroSearch() {
  const router = useRouter();

  // ── Local form state ────────────────────────────────────────────────────────
  const [location, setLocation] = useState<any>(null);
  const [venueType, setVenueType]  = useState<any>(null);
  const [eventType, setEventType]  = useState<any>(null);
  const [date, setDate]            = useState<Date | null>(null);
  const [guests, setGuests]        = useState<any>(null);

  // ── TanStack Query — cached for 1 hour, refetch-free ───────────────────────
  const {
    data: venueOptions = [],
    isLoading: venueLoading,
  } = useVenueTypes();

  const {
    data: eventOptions = [],
    isLoading: eventLoading,
  } = useEventTypes();
  
  // -- Dropdown management state to ensure only one is open at a time --
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (menuName: string | null) => {
    setActiveMenu(prev => prev === menuName ? null : menuName);
  };

  // ── Search handler ──────────────────────────────────────────────────────────
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location?.value) {
      params.set('city',       location.value.toString());
      if (location.label) params.set('cityName', location.label.toString());
    }
    if (venueType?.value)  params.set('venue_type', venueType.value.toString());
    if (eventType?.value)  params.set('event_type', eventType.value.toString());
    if (date) {
      params.set('date', date.toISOString().split('T')[0]);
    }
    if (guests?.value)     params.set('guests',     guests.value.toString());

    router.push(`/events/search${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div 
      className="relative w-full lg:max-w-6xl mx-auto z-40 animate-fade-in-up [animation-delay:600ms] mt-4 shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-[31px] lg:rounded-full"
      ref={searchContainerRef}
    >
      <div
        className="border border-white/40 rounded-[31px] lg:rounded-full p-2 relative z-10 w-full shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-white/30">

          {/* Location */}
          <div className="flex-[1.5] py-2.5 lg:py-0 hover:bg-white/12 transition-colors group lg:rounded-l-[31px]">
            <PremiumLocationSelect
              value={location}
              onChange={setLocation}
              className="w-full"
              containerClassName="px-5 lg:px-7 py-3 lg:py-4"
              variant="glass"
              menuIsOpen={activeMenu === 'location'}
              onMenuOpen={() => setActiveMenu('location')}
              onMenuClose={() => setActiveMenu(null)}
            />
          </div>

          {/* Event Type — show skeleton while loading */}
          {eventLoading ? (
            <div className="flex-1 py-3 lg:py-4">
              <DropdownSkeleton label="Event Type" />
            </div>
          ) : (
            <PremiumSelect
              label="Event Type"
              icon={<Sparkles className="w-5 h-5 text-accent-orange" />}
              options={eventOptions}
              value={eventType}
              onChange={setEventType}
              placeholder="Any Event"
              className="flex-1 hover:bg-white/12 transition-colors group"
              containerClassName="px-5 lg:px-6 py-3 lg:py-4"
              variant="glass"
              menuIsOpen={activeMenu === 'eventType'}
              onMenuOpen={() => setActiveMenu('eventType')}
              onMenuClose={() => setActiveMenu(null)}
            />
          )}

          {/* Venue Type — show skeleton while loading */}
          {venueLoading ? (
            <div className="flex-1 py-3 lg:py-4">
              <DropdownSkeleton label="Venue Type" />
            </div>
          ) : (
            <PremiumSelect
              label="Venue Type"
              icon={<HomeIcon className="w-5 h-5 text-accent-orange" />}
              options={venueOptions}
              value={venueType}
              onChange={setVenueType}
              placeholder="Any Type"
              className="flex-1 hover:bg-white/12 transition-colors group"
              containerClassName="px-5 lg:px-6 py-3 lg:py-4"
              variant="glass"
              menuIsOpen={activeMenu === 'venueType'}
              onMenuOpen={() => setActiveMenu('venueType')}
              onMenuClose={() => setActiveMenu(null)}
            />
          )}

          {/* Date */}
          <div 
            className="flex-1 flex items-center hover:bg-white/12 transition-colors group relative"
            onClick={() => setActiveMenu(prev => prev === 'date' ? null : 'date')}
          >
            <PremiumDatePicker
              selected={date}
              onChange={(d: Date | null) => {
                setDate(d);
                if (!d) return; // if just cleared
                setActiveMenu(null);
              }}
              placeholder="Select Date"
              label="Date"
              containerClassName="px-5 lg:px-6 py-3 lg:py-4"
              variant="glass"
              monthsShown={1}
              isOpen={activeMenu === 'date'}
            />
          </div>

          {/* Guests */}
          <PremiumSelect
            label="Guests"
            icon={<Users className="w-5 h-5 text-accent-orange" />}
            options={GUEST_OPTIONS}
            value={guests}
            onChange={setGuests}
            placeholder="Guest Count"
            className="flex-1 hover:bg-white/12 transition-colors group"
            containerClassName="px-5 lg:px-6 py-3 lg:py-4"
            variant="glass"
            menuIsOpen={activeMenu === 'guests'}
            onMenuOpen={() => setActiveMenu('guests')}
            onMenuClose={() => setActiveMenu(null)}
          />

          {/* Search Button */}
          <div className="p-2 lg:p-1.5 lg:pl-2">
            <button
              onClick={handleSearch}
              className="w-full lg:w-[60px] lg:h-[60px] bg-cta-gradient hover:opacity-90 text-white rounded-2xl lg:rounded-full px-8 lg:px-0 py-3 lg:py-0 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.01] lg:hover:scale-110 active:scale-95 shadow-lg shadow-orange-500/20 group/btn"
            >
              <Search className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              <span className="lg:hidden tracking-tight font-bold">Find Spaces</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
