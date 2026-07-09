"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Home as HomeIcon, Users, Building2, Calendar, X } from 'lucide-react';
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
  const [venueType, setVenueType] = useState<any>(null);
  const [eventType, setEventType] = useState<any>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<any>(null);

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

  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties | null>(null);

  useEffect(() => {
    if (!activeMenu) {
      setDropdownStyle(null);
      return;
    }

    const handlePositionUpdate = () => {
      if (!searchContainerRef.current) return;
      const isDesktop = window.innerWidth >= 1024;
      const parentContainer = searchContainerRef.current.querySelector(
        isDesktop ? '.hidden.lg\\:flex' : '.lg\\:hidden'
      ) as HTMLElement;

      if (!parentContainer) return;

      const activeElement = parentContainer.querySelector(`[data-field-id="${activeMenu}"]`) as HTMLElement;
      if (!activeElement) return;

      const parentRect = parentContainer.getBoundingClientRect();
      const fieldRect = activeElement.getBoundingClientRect();
      const leftOffset = fieldRect.left - parentRect.left;

      setDropdownStyle({
        width: `${parentRect.width}px`,
        left: `${-leftOffset}px`,
        transform: 'none',
      });
    };

    handlePositionUpdate();
    const rafId = requestAnimationFrame(handlePositionUpdate);
    const timeoutId = setTimeout(handlePositionUpdate, 50);

    window.addEventListener('resize', handlePositionUpdate);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handlePositionUpdate);
    };
  }, [activeMenu]);

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
      params.set('city', location.value.toString());
      if (location.label) params.set('cityName', location.label.toString());
    }
    if (venueType?.value) params.set('venue_type', venueType.value.toString());
    if (eventType?.value) params.set('event_type', eventType.value.toString());
    if (date) {
      params.set('date', date.toISOString().split('T')[0]);
    }
    if (guests?.value) params.set('guests', guests.value.toString());

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
              className={`absolute -top-40 left-1/4 w-[500px] h-[300px] bg-blue-500/10 blur-[130px] rounded-full transition-opacity duration-700 ${searchMode === 'corporate' ? 'opacity-100' : 'opacity-0'
                }`}
            />
            {/* Orange Social Glow */}
            <div
              className={`absolute -top-40 right-1/4 w-[500px] h-[300px] bg-orange-500/10 blur-[130px] rounded-full transition-opacity duration-700 ${searchMode === 'social' ? 'opacity-100' : 'opacity-0'
                }`}
            />
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10 relative">
              <button
                onClick={() => setSearchMode('corporate')}
                className={`relative z-10 px-6 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${searchMode === 'corporate' ? 'text-white' : 'text-white/60 hover:text-white/80'
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
                className={`relative z-10 px-6 py-2.5 text-xs md:text-sm font-bold rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer ${searchMode === 'social' ? 'text-white' : 'text-white/60 hover:text-white/80'
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
              data-field-id="location"
              className={`relative flex-[1.4] min-w-0 transition-all duration-300 py-3 pl-6 pr-4 rounded-full ${activeMenu === 'location' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : hoveredField === 0 ? 'bg-white/5 z-20' : 'z-10'
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
                dropdownStyle={activeMenu === 'location' ? dropdownStyle || undefined : undefined}
              />
            </div>

            {/* Divider 0 */}
            {showDivider(0) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Event Type Wrapper */}
            <div
              data-field-id="eventType"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${activeMenu === 'eventType' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : hoveredField === 1 ? 'bg-white/5 z-20' : 'z-10'
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
                  dropdownStyle={activeMenu === 'eventType' ? dropdownStyle || undefined : undefined}
                />
              )}
            </div>

            {/* Divider 1 */}
            {showDivider(1) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Venue Type Wrapper */}
            <div
              data-field-id="venueType"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${activeMenu === 'venueType' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : hoveredField === 2 ? 'bg-white/5 z-20' : 'z-10'
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
                  dropdownStyle={activeMenu === 'venueType' ? dropdownStyle || undefined : undefined}
                />
              )}
            </div>

            {/* Divider 2 */}
            {showDivider(2) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Date Wrapper */}
            <div
              data-field-id="date"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full cursor-pointer ${activeMenu === 'date' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : hoveredField === 3 ? 'bg-white/5 z-20' : 'z-10'
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
                onClose={() => setActiveMenu(null)}
                placeholder="Select Date"
                label="Date"
                containerClassName="w-full"
                variant="glass"
                monthsShown={1}
                isOpen={activeMenu === 'date'}
                dropdownStyle={activeMenu === 'date' ? dropdownStyle || undefined : undefined}
              />
            </div>

            {/* Divider 3 */}
            {showDivider(3) && <div className="w-[1px] h-8 bg-white/10 self-center shrink-0 transition-opacity duration-300" />}

            {/* Guests Wrapper */}
            <div
              data-field-id="guests"
              className={`relative flex-[0.9] min-w-0 transition-all duration-300 py-3 pl-4 pr-2 rounded-full ${activeMenu === 'guests' ? 'bg-white/12 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : hoveredField === 4 ? 'bg-white/5 z-20' : 'z-10'
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
                dropdownStyle={activeMenu === 'guests' ? dropdownStyle || undefined : undefined}
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
                  <span className="hidden xl:inline text-sm font-bold tracking-tight">Search</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Search Bar (Cohesive Stacked Card) */}
          <div className="lg:hidden w-full max-w-xl mx-auto bg-black/45 border border-white/10 backdrop-blur-3xl rounded-[2rem] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.65)] flex flex-col gap-4 text-left relative">
            {/* Header/Title */}
            <h3 className="text-white text-sm font-black tracking-[0.06em] uppercase px-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
              Find Your Venue & Services
            </h3>

            {/* Location (Full Width) */}
            <div 
              data-field-id="location"
              onClick={(e) => {
                if ((e.target as HTMLElement).closest('.premium-select-container')) {
                  return;
                }
                setActiveMenu(activeMenu === 'location' ? null : 'location');
              }}
              className={`relative w-full cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 ${activeMenu === 'location' ? 'border-accent-orange bg-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : 'z-10'}`}
            >
              <PremiumLocationSelect
                value={location}
                onChange={(val) => {
                  setLocation(val);
                  setActiveMenu(null);
                }}
                className="w-full"
                variant="glass"
                menuIsOpen={activeMenu === 'location'}
                onMenuOpen={() => setActiveMenu('location')}
                onMenuClose={() => setActiveMenu(null)}
                menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                dropdownStyle={activeMenu === 'location' ? dropdownStyle || undefined : undefined}
              />
            </div>

            {/* Event Type & Venue Type (Stack or Row on Tablet) */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              {/* Event Type */}
              <div 
                data-field-id="event"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) {
                    return;
                  }
                  setActiveMenu(activeMenu === 'event' ? null : 'event');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 ${activeMenu === 'event' ? 'border-accent-orange bg-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : 'z-10'}`}
              >
                {eventLoading ? (
                  <DropdownSkeleton label="Event Type" />
                ) : (
                  <PremiumSelect
                    label="Event Type"
                    icon={<Sparkles className="w-5 h-5 text-accent-orange" />}
                    options={filteredEventOptions}
                    value={eventType}
                    onChange={(val) => {
                      setEventType(val);
                      setActiveMenu(null);
                    }}
                    placeholder="Any Event"
                    className="w-full"
                    variant="glass"
                    menuIsOpen={activeMenu === 'event'}
                    onMenuOpen={() => setActiveMenu('event')}
                    onMenuClose={() => setActiveMenu(null)}
                    menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                    dropdownStyle={activeMenu === 'event' ? dropdownStyle || undefined : undefined}
                  />
                )}
              </div>

              {/* Venue Type */}
              <div 
                data-field-id="venue"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) {
                    return;
                  }
                  setActiveMenu(activeMenu === 'venue' ? null : 'venue');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 ${activeMenu === 'venue' ? 'border-accent-orange bg-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : 'z-10'}`}
              >
                {venueLoading ? (
                  <DropdownSkeleton label="Venue Type" />
                ) : (
                  <PremiumSelect
                    label="Venue Type"
                    icon={<HomeIcon className="w-5 h-5 text-accent-orange" />}
                    options={filteredVenueOptions}
                    value={venueType}
                    onChange={(val) => {
                      setVenueType(val);
                      setActiveMenu(null);
                    }}
                    placeholder="Any Type"
                    className="w-full"
                    variant="glass"
                    menuIsOpen={activeMenu === 'venue'}
                    onMenuOpen={() => setActiveMenu('venue')}
                    onMenuClose={() => setActiveMenu(null)}
                    menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                    dropdownStyle={activeMenu === 'venue' ? dropdownStyle || undefined : undefined}
                  />
                )}
              </div>
            </div>

            {/* Date & Guests (Stack or Row on Tablet) */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              {/* Date */}
              <div 
                data-field-id="date"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.react-datepicker') || (e.target as HTMLElement).closest('button')) {
                    return;
                  }
                  setActiveMenu(activeMenu === 'date' ? null : 'date');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 ${activeMenu === 'date' ? 'border-accent-orange bg-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : 'z-10'}`}
              >
                <PremiumDatePicker
                  selected={date}
                  onChange={(d: Date | null) => {
                    setDate(d);
                    setActiveMenu(null);
                  }}
                  onClose={() => setActiveMenu(null)}
                  placeholder="Select Date"
                  label="Date"
                  containerClassName="w-full"
                  variant="glass"
                  monthsShown={1}
                  isOpen={activeMenu === 'date'}
                  dropdownStyle={activeMenu === 'date' ? dropdownStyle || undefined : undefined}
                />
              </div>

              {/* Guests */}
              <div 
                data-field-id="guests"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) {
                    return;
                  }
                  setActiveMenu(activeMenu === 'guests' ? null : 'guests');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-white/5 border border-white/10 ${activeMenu === 'guests' ? 'border-accent-orange bg-white/10 shadow-[inset_0_1.5px_3px_rgba(255,255,255,0.08)] z-30' : 'z-10'}`}
              >
                <PremiumSelect
                  label="Guests"
                  icon={<Users className="w-5 h-5 text-accent-orange" />}
                  options={GUEST_OPTIONS}
                  value={guests}
                  onChange={(val) => {
                    setGuests(val);
                    setActiveMenu(null);
                  }}
                  placeholder="Count"
                  className="w-full"
                  variant="glass"
                  menuIsOpen={activeMenu === 'guests'}
                  onMenuOpen={() => setActiveMenu('guests')}
                  onMenuClose={() => setActiveMenu(null)}
                  menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                  menuPlacement="auto"
                  dropdownStyle={activeMenu === 'guests' ? dropdownStyle || undefined : undefined}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="group/btn w-full mt-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF610D] to-[#EDBA82] hover:opacity-95 text-white font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer text-sm"
            >
              <Search className="w-5 h-5 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              <span className="font-bold tracking-tight">Search Venues</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
