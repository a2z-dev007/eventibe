"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Home as HomeIcon, Users, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect';
import PremiumSelect from '@/components/ui/PremiumSelect';
import PremiumDatePicker from '@/components/ui/PremiumDatePicker';
import { useVenueTypes, useEventTypes } from '@/hooks/useSearchBarData';
import { MagneticButton } from '@/components/micro-interactions';

const GUEST_OPTIONS = [
  { value: '100', label: '0–100' },
  { value: '300', label: '100–300' },
  { value: '600', label: '300–600' },
  { value: '601', label: '600+' },
];

/** Thin glass skeleton shown while a dropdown is loading from the API */
function DropdownSkeleton({ label }: { label: string }) {
  return (
    <div className="flex flex-col px-4 py-1">
      <span className="text-[10px] uppercase tracking-widest text-white/50 font-black mb-1">{label}</span>
      <div className="h-4 w-20 rounded-full bg-white/20 animate-pulse" />
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

  // ── Mode and Interaction state ──────────────────────────────────────────────
  const [searchMode, setSearchMode] = useState<'corporate' | 'social'>('corporate');
  const [hoveredField, setHoveredField] = useState<number | null>(null);

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

  // Clear type selection when changing modes to prevent filter mismatch
  useEffect(() => {
    setEventType(null);
    setVenueType(null);
  }, [searchMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter event types depending on corporate vs social selection
  const filteredEventOptions = React.useMemo(() => {
    if (!eventOptions) return [];
    if (searchMode === 'corporate') {
      const corporateKeywords = ['corporate', 'conference', 'meeting', 'seminar', 'launch', 'exhibition', 'summit', 'workshop', 'office', 'business'];
      const corporateOptions = eventOptions.filter(opt => 
        corporateKeywords.some(kw => opt.label.toLowerCase().includes(kw))
      );
      return corporateOptions.length > 0 ? corporateOptions : eventOptions;
    } else {
      const socialKeywords = ['wedding', 'reception', 'birthday', 'party', 'social', 'anniversary', 'celebration', 'gathering', 'dinner', 'engagement', 'sangeet', 'mehendi'];
      const socialOptions = eventOptions.filter(opt => 
        socialKeywords.some(kw => opt.label.toLowerCase().includes(kw))
      );
      return socialOptions.length > 0 ? socialOptions : eventOptions;
    }
  }, [eventOptions, searchMode]);

  // Filter venue types depending on corporate vs social selection
  const filteredVenueOptions = React.useMemo(() => {
    if (!venueOptions) return [];
    if (searchMode === 'corporate') {
      const corporateKeywords = ['corporate', 'conference', 'meeting', 'boardroom', 'hotel', 'hall', 'center', 'coworking', 'office'];
      const corporateOptions = venueOptions.filter(opt => 
        corporateKeywords.some(kw => opt.label.toLowerCase().includes(kw))
      );
      return corporateOptions.length > 0 ? corporateOptions : venueOptions;
    } else {
      const socialKeywords = ['banquet', 'lawn', 'resort', 'farmhouse', 'villa', 'wedding', 'palace', 'garden'];
      const socialOptions = venueOptions.filter(opt => 
        socialKeywords.some(kw => opt.label.toLowerCase().includes(kw))
      );
      return socialOptions.length > 0 ? socialOptions : venueOptions;
    }
  }, [venueOptions, searchMode]);

  const showDivider = (index: number) => {
    const keys = ['location', 'eventType', 'venueType', 'date', 'guests'];
    const isFieldActiveOrHovered = (i: number) => {
      return hoveredField === i || activeMenu === keys[i];
    };
    return !isFieldActiveOrHovered(index) && !isFieldActiveOrHovered(index + 1);
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
        onAnimationComplete={() => {
          // Forcefully clear the transform to ensure backdrop-filter works perfectly
          if (typeof window !== 'undefined') {
            const container = searchContainerRef.current?.firstChild as HTMLElement;
            if (container) container.style.transform = 'none';
          }
        }}
        className="w-full"
      >
        <div className="relative w-full z-10">
          
          {/* Background Ambient Glows */}
          <div className="absolute inset-0 -z-10 overflow-hidden rounded-[32px] pointer-events-none">
            {/* Blue Corporate Glow */}
            <div 
              className={`absolute -top-40 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[130px] rounded-full transition-opacity duration-700 ${
                searchMode === 'corporate' ? 'opacity-100' : 'opacity-0'
              }`} 
            />
            {/* Orange Social Glow */}
            <div 
              className={`absolute -top-40 right-1/4 w-[500px] h-[300px] bg-orange-500/10 blur-[130px] rounded-full transition-opacity duration-700 ${
                searchMode === 'social' ? 'opacity-100' : 'opacity-0'
              }`} 
            />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 relative">
              <button
                onClick={() => setSearchMode('corporate')}
                className={`relative z-10 px-6 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  searchMode === 'corporate' ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Building2 className={`w-4 h-4 transition-transform ${searchMode === 'corporate' ? 'scale-110 text-blue-400' : 'text-white/60'}`} />
                <span>Corporate Venues</span>
                {searchMode === 'corporate' && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full -z-10 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              <button
                onClick={() => setSearchMode('social')}
                className={`relative z-10 px-6 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  searchMode === 'social' ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Sparkles className={`w-4 h-4 transition-transform ${searchMode === 'social' ? 'scale-110 text-orange-400' : 'text-white/60'}`} />
                <span>Weddings & Socials</span>
                {searchMode === 'social' && (
                  <motion.div
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full -z-10 shadow-[0_2px_10px_rgba(255,255,255,0.05)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Search Bar (Unified Pill) */}
          <div className="hidden lg:flex items-center w-full bg-black/35 border border-white/10 backdrop-blur-3xl rounded-full p-2 relative shadow-[0_30px_70px_rgba(0,0,0,0.65)] hover:border-white/15 transition-all duration-300">
            {/* Location Wrapper */}
            <div 
              className={`relative flex-[1.4] min-w-0 transition-all duration-300 py-3 pl-6 pr-4 rounded-full ${
                activeMenu === 'location' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)]' : hoveredField === 0 ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHoveredField(0)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <PremiumLocationSelect
                value={location}
                onChange={setLocation}
                className="w-full"
                containerClassName=""
                variant="glass"
                menuIsOpen={activeMenu === 'location'}
                onMenuOpen={() => setActiveMenu('location')}
                onMenuClose={() => setActiveMenu(null)}
              />
            </div>

            {/* Divider 0 */}
            {showDivider(0) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Event Type Wrapper */}
            <div 
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${
                activeMenu === 'eventType' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)]' : hoveredField === 1 ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHoveredField(1)}
              onMouseLeave={() => setHoveredField(null)}
            >
              {eventLoading ? (
                <DropdownSkeleton label="Event Type" />
              ) : (
                <PremiumSelect
                  label="Event Type"
                  icon={<Sparkles className="w-5 h-5 text-accent-orange" />}
                  options={filteredEventOptions}
                  value={eventType}
                  onChange={setEventType}
                  placeholder="Any Event"
                  className="w-full"
                  containerClassName=""
                  variant="glass"
                  menuIsOpen={activeMenu === 'eventType'}
                  onMenuOpen={() => setActiveMenu('eventType')}
                  onMenuClose={() => setActiveMenu(null)}
                />
              )}
            </div>

            {/* Divider 1 */}
            {showDivider(1) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Venue Type Wrapper */}
            <div 
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${
                activeMenu === 'venueType' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)]' : hoveredField === 2 ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHoveredField(2)}
              onMouseLeave={() => setHoveredField(null)}
            >
              {venueLoading ? (
                <DropdownSkeleton label="Venue Type" />
              ) : (
                <PremiumSelect
                  label="Venue Type"
                  icon={<HomeIcon className="w-5 h-5 text-accent-orange" />}
                  options={filteredVenueOptions}
                  value={venueType}
                  onChange={setVenueType}
                  placeholder="Any Type"
                  className="w-full"
                  containerClassName=""
                  variant="glass"
                  menuIsOpen={activeMenu === 'venueType'}
                  onMenuOpen={() => setActiveMenu('venueType')}
                  onMenuClose={() => setActiveMenu(null)}
                />
              )}
            </div>

            {/* Divider 2 */}
            {showDivider(2) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Date Wrapper */}
            <div 
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full cursor-pointer ${
                activeMenu === 'date' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)]' : hoveredField === 3 ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHoveredField(3)}
              onMouseLeave={() => setHoveredField(null)}
              onClick={() => setActiveMenu(activeMenu === 'date' ? null : 'date')}
            >
              <PremiumDatePicker
                selected={date}
                onChange={(d: Date | null) => {
                  setDate(d);
                  if (!d) return;
                  setActiveMenu(null);
                }}
                placeholder="Select Date"
                label="Date"
                containerClassName="w-full"
                variant="glass"
                monthsShown={1}
                isOpen={activeMenu === 'date'}
              />
            </div>

            {/* Divider 3 */}
            {showDivider(3) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Guests Wrapper */}
            <div 
              className={`relative flex-[0.9] min-w-0 transition-all duration-300 py-3 pl-4 pr-2 rounded-full ${
                activeMenu === 'guests' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)]' : hoveredField === 4 ? 'bg-white/5' : ''
              }`}
              onMouseEnter={() => setHoveredField(4)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <PremiumSelect
                label="Guests"
                icon={<Users className="w-5 h-5 text-accent-orange" />}
                options={GUEST_OPTIONS}
                value={guests}
                onChange={setGuests}
                placeholder="Count"
                className="w-full"
                containerClassName=""
                variant="glass"
                menuIsOpen={activeMenu === 'guests'}
                onMenuOpen={() => setActiveMenu('guests')}
                onMenuClose={() => setActiveMenu(null)}
              />
            </div>

            {/* Search Button */}
            <div className="shrink-0 pr-2 pl-1">
              <MagneticButton>
                <button
                  onClick={handleSearch}
                  className="h-14 cursor-pointer bg-cta-gradient text-white rounded-full px-6 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-lg hover:shadow-[0_8px_24px_rgba(249,115,22,0.4)] group/btn"
                >
                  <Search className="w-4 h-4 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
                 
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Search Bar (Cohesive Stacked Card) */}
          <div className="lg:hidden w-full bg-black/35 border border-white/12 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.55)] flex flex-col gap-4">
            
            {/* Location (Full Width) */}
            <div className="w-full flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30 transition-all p-3.5">
              <PremiumLocationSelect
                value={location}
                onChange={setLocation}
                className="w-full"
                containerClassName=""
                variant="glass"
                menuIsOpen={activeMenu === 'location'}
                onMenuOpen={() => setActiveMenu('location')}
                onMenuClose={() => setActiveMenu(null)}
              />
            </div>

            {/* Event Type & Venue Type (Grid 2 cols on tablet/sm, 1 col on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30 transition-all p-3.5">
                {eventLoading ? (
                  <DropdownSkeleton label="Event Type" />
                ) : (
                  <PremiumSelect
                    label="Event Type"
                    icon={<Sparkles className="w-5 h-5 text-accent-orange" />}
                    options={filteredEventOptions}
                    value={eventType}
                    onChange={setEventType}
                    placeholder="Any Event"
                    className="w-full"
                    containerClassName=""
                    variant="glass"
                    menuIsOpen={activeMenu === 'eventType'}
                    onMenuOpen={() => setActiveMenu('eventType')}
                    onMenuClose={() => setActiveMenu(null)}
                  />
                )}
              </div>

              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30 transition-all p-3.5">
                {venueLoading ? (
                  <DropdownSkeleton label="Venue Type" />
                ) : (
                  <PremiumSelect
                    label="Venue Type"
                    icon={<HomeIcon className="w-5 h-5 text-accent-orange" />}
                    options={filteredVenueOptions}
                    value={venueType}
                    onChange={setVenueType}
                    placeholder="Any Type"
                    className="w-full"
                    containerClassName=""
                    variant="glass"
                    menuIsOpen={activeMenu === 'venueType'}
                    onMenuOpen={() => setActiveMenu('venueType')}
                    onMenuClose={() => setActiveMenu(null)}
                  />
                )}
              </div>
            </div>

            {/* Date & Guests (Grid 2 cols on tablet/sm, 1 col on mobile) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30 transition-all p-3.5 cursor-pointer"
                onClick={() => setActiveMenu(prev => prev === 'date' ? null : 'date')}
              >
                <PremiumDatePicker
                  selected={date}
                  onChange={(d: Date | null) => {
                    setDate(d);
                    if (!d) return;
                    setActiveMenu(null);
                  }}
                  placeholder="Select Date"
                  label="Date"
                  containerClassName="w-full"
                  variant="glass"
                  monthsShown={1}
                  isOpen={activeMenu === 'date'}
                />
              </div>

              <div className="flex items-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-orange/30 transition-all p-3.5">
                <PremiumSelect
                  label="Guests"
                  icon={<Users className="w-5 h-5 text-accent-orange" />}
                  options={GUEST_OPTIONS}
                  value={guests}
                  onChange={setGuests}
                  placeholder="Guest Count"
                  className="w-full"
                  containerClassName=""
                  variant="glass"
                  menuIsOpen={activeMenu === 'guests'}
                  onMenuOpen={() => setActiveMenu('guests')}
                  onMenuClose={() => setActiveMenu(null)}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full cursor-pointer bg-cta-gradient hover:opacity-95 text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] shadow-xl group/btn mt-2"
            >
              <Search className="w-5 h-5 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              {/* <span className="tracking-tight font-black uppercase text-sm">Find </span> */}
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
