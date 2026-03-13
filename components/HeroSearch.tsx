"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Home as HomeIcon, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="relative w-full lg:max-w-6xl mx-auto z-40 mt-4 px-4 lg:px-0" ref={searchContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={(definition) => {
          // Forcefully clear the transform to ensure backdrop-filter works perfectly
          if (typeof window !== 'undefined') {
            const container = searchContainerRef.current?.firstChild as HTMLElement;
            if (container) container.style.transform = 'none';
          }
        }}
        className="w-full"
      >
        <div
          className="glass-dark rounded-3xl p-4 md:p-6 lg:p-8 relative z-10 w-full shadow-[0_40px_80px_rgba(0,0,0,0.6)] bg-black/30 border border-white/20 backdrop-blur-2xl"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">

          {/* Location */}
          <div className="flex items-center hover:bg-white/10 transition-colors group rounded-2xl border border-white/10 bg-white/5">
            <PremiumLocationSelect
              value={location}
              onChange={setLocation}
              className="w-full"
              containerClassName="px-4 py-2"
              variant="glass"
              menuIsOpen={activeMenu === 'location'}
              onMenuOpen={() => setActiveMenu('location')}
              onMenuClose={() => setActiveMenu(null)}
            />
          </div>

          {/* Event Type — show skeleton while loading */}
          {eventLoading ? (
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
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
              className="flex-1 transition-all group"
              containerClassName="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30"
              variant="glass"
              menuIsOpen={activeMenu === 'eventType'}
              onMenuOpen={() => setActiveMenu('eventType')}
              onMenuClose={() => setActiveMenu(null)}
            />
          )}

          {/* Venue Type — show skeleton while loading */}
          {venueLoading ? (
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2">
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
              className="flex-1 transition-all group"
              containerClassName="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30"
              variant="glass"
              menuIsOpen={activeMenu === 'venueType'}
              onMenuOpen={() => setActiveMenu('venueType')}
              onMenuClose={() => setActiveMenu(null)}
            />
          )}

          {/* Date */}
          <div 
            className="flex-1 flex items-center hover:bg-white/10 hover:border-accent-orange/30 transition-all group relative rounded-2xl border border-white/10 bg-white/5"
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
              containerClassName="px-4 py-2"
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
            className="flex-1 transition-all group"
            containerClassName="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30"
            variant="glass"
            menuIsOpen={activeMenu === 'guests'}
            onMenuOpen={() => setActiveMenu('guests')}
            onMenuClose={() => setActiveMenu(null)}
          />

          {/* Search Button */}
          <div className="flex">
            <button
              onClick={handleSearch}
              className="w-full cursor-pointer bg-cta-gradient hover:opacity-90 text-white rounded-2xl px-8 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.02] shadow-2xl group/btn"
            >
              <Search className="w-5 h-5 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              <span className="tracking-tight font-black uppercase text-sm">Find Spaces</span>
            </button>
          </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
