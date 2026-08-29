"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Home as HomeIcon, Users, Calendar, Building2, Briefcase, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect';
import PremiumSelect from '@/components/ui/PremiumSelect';
import PremiumDatePicker from '@/components/ui/PremiumDatePicker';
import { useVenueTypes, useEventTypes } from '@/hooks/useSearchBarData';
import { MagneticButton } from '@/components/micro-interactions';

const GUEST_OPTIONS = [
  { value: '100', label: '0–100 Guests' },
  { value: '300', label: '100–300 Guests' },
  { value: '600', label: '300–600 Guests' },
  { value: '601', label: '600+ Guests' },
];

const POPULAR_CHIPS = [
  { label: 'Banquet Halls', type: 'venue', value: 'banquet-hall' },
  { label: 'Corporate Conference', type: 'event', value: 'corporate' },
  { label: 'Rooftop Spaces', type: 'venue', value: 'rooftop' },
  { label: 'Luxury Resorts', type: 'venue', value: 'resort' },
  { label: 'Catering & AV', type: 'category', value: 'vendor' },
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

  // ── Mode and Tab State ───────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState<'venues' | 'vendors' | 'corporate'>('venues');

  // ── Local form state ────────────────────────────────────────────────────────
  const [isSearching, setIsSearching] = useState(false);
  const [location, setLocation] = useState<any>(null);
  const [venueType, setVenueType] = useState<any>(null);
  const [eventType, setEventType] = useState<any>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<any>(null);

  // ── Mode and Interaction state ──────────────────────────────────────────────
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

  const filteredEventOptions = React.useMemo(() => {
    return eventOptions || [];
  }, [eventOptions]);

  const filteredVenueOptions = React.useMemo(() => {
    return venueOptions || [];
  }, [venueOptions]);

  const showDivider = (index: number) => {
    const keys = ['location', 'eventType', 'venueType', 'date', 'guests'];
    const isFieldActiveOrHovered = (i: number) => {
      return hoveredField === i || activeMenu === keys[i];
    };
    return !isFieldActiveOrHovered(index) && !isFieldActiveOrHovered(index + 1);
  };

  // ── Search handler ──────────────────────────────────────────────────────────
  const handleSearch = () => {
    setIsSearching(true);
    const params = new URLSearchParams();

    if (activeTab === 'vendors') {
      if (location?.value) {
        params.set('city', location.value.toString());
        if (location.label) params.set('cityName', location.label.toString());
      }
      if (eventType?.value) params.set('service_type', eventType.value.toString());
      router.push(`/vendors${params.toString() ? '?' + params.toString() : ''}`);
      return;
    }

    if (activeTab === 'corporate') {
      params.set('category', 'corporate');
    }

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

  const handleChipClick = (chip: typeof POPULAR_CHIPS[0]) => {
    if (chip.type === 'category' && chip.value === 'vendor') {
      setActiveTab('vendors');
      router.push('/vendors');
    } else {
      router.push(`/events/search?query=${encodeURIComponent(chip.label)}`);
    }
  };

  return (
    <div className="relative w-full lg:max-w-6xl mx-auto z-40 mt-4 px-2 sm:px-4 lg:px-0" ref={searchContainerRef}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full"
      >
        <div className="relative w-full z-10 flex flex-col items-center">

          {/* Search Category Tabs */}
          <div className="inline-flex items-center gap-1.5 p-1.5 bg-white/20 backdrop-blur-2xl border border-white/30 rounded-full mb-3 shadow-xl">
            <button
              onClick={() => setActiveTab('venues')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'venues'
                  ? 'bg-white text-primary-navy shadow-md scale-[1.02]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Venues</span>
            </button>
            <button
              onClick={() => setActiveTab('vendors')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'vendors'
                  ? 'bg-white text-primary-navy shadow-md scale-[1.02]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-orange" />
              <span>Event Vendors</span>
            </button>
            <button
              onClick={() => setActiveTab('corporate')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === 'corporate'
                  ? 'bg-white text-primary-navy shadow-md scale-[1.02]'
                  : 'text-white/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-blue-500" />
              <span>Corporate Events</span>
            </button>
          </div>

          {/* Desktop Search Bar (Unified Pill with Glass Refraction) */}
          <div className="hidden lg:flex items-center w-full bg-white/95 border border-gray-200/80 backdrop-blur-3xl rounded-full p-2 relative shadow-[0_30px_70px_rgba(0,0,0,0.18)] hover:border-gray-300/90 transition-all duration-300">
            {/* Location Wrapper */}
            <div
              data-field-id="location"
              className={`relative flex-[1.4] min-w-0 transition-all duration-300 py-3 pl-6 pr-4 rounded-full ${
                activeMenu === 'location' ? 'bg-gray-100/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)] z-30' : hoveredField === 0 ? 'bg-gray-50/90' : 'z-10'
              }`}
              onMouseEnter={() => setHoveredField(0)}
              onMouseLeave={() => setHoveredField(null)}
            >
              <PremiumLocationSelect
                value={location}
                onChange={setLocation}
                className="w-full"
                containerClassName=""
                variant="default"
                menuIsOpen={activeMenu === 'location'}
                onMenuOpen={() => setActiveMenu('location')}
                onMenuClose={() => setActiveMenu(null)}
                dropdownStyle={activeMenu === 'location' ? dropdownStyle || undefined : undefined}
              />
            </div>

            {/* Divider 0 */}
            {showDivider(0) && <div className="w-[1px] h-8 bg-gray-200/60 self-center shrink-0 transition-opacity duration-300" />}

            {/* Event Type Wrapper */}
            <div
              data-field-id="eventType"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${
                activeMenu === 'eventType' ? 'bg-gray-100/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)] z-30' : hoveredField === 1 ? 'bg-gray-50/90' : 'z-10'
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
                  placeholder={activeTab === 'corporate' ? "Corporate Summit" : "Any Event"}
                  className="w-full"
                  containerClassName=""
                  variant="default"
                  menuIsOpen={activeMenu === 'eventType'}
                  onMenuOpen={() => setActiveMenu('eventType')}
                  onMenuClose={() => setActiveMenu(null)}
                  dropdownStyle={activeMenu === 'eventType' ? dropdownStyle || undefined : undefined}
                />
              )}
            </div>

            {/* Divider 1 */}
            {showDivider(1) && <div className="w-[1px] h-8 bg-gray-200/60 self-center shrink-0 transition-opacity duration-300" />}

            {/* Venue Type Wrapper */}
            <div
              data-field-id="venueType"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full ${
                activeMenu === 'venueType' ? 'bg-gray-100/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)] z-30' : hoveredField === 2 ? 'bg-gray-50/90' : 'z-10'
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
                  placeholder={activeTab === 'corporate' ? "Convention Center" : "Any Type"}
                  className="w-full"
                  containerClassName=""
                  variant="default"
                  menuIsOpen={activeMenu === 'venueType'}
                  onMenuOpen={() => setActiveMenu('venueType')}
                  onMenuClose={() => setActiveMenu(null)}
                  dropdownStyle={activeMenu === 'venueType' ? dropdownStyle || undefined : undefined}
                />
              )}
            </div>

            {/* Divider 2 */}
            {showDivider(2) && <div className="w-[1px] h-8 bg-gray-200/60 self-center shrink-0 transition-opacity duration-300" />}

            {/* Date Wrapper */}
            <div
              data-field-id="date"
              className={`relative flex-[1.1] min-w-0 transition-all duration-300 py-3 px-4 rounded-full cursor-pointer ${
                activeMenu === 'date' ? 'bg-gray-100/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)] z-30' : hoveredField === 3 ? 'bg-gray-50/90' : 'z-10'
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
                variant="default"
                monthsShown={1}
                isOpen={activeMenu === 'date'}
              />
            </div>

            {/* Divider 3 */}
            {showDivider(3) && <div className="w-[1px] h-8 bg-gray-200/60 self-center shrink-0 transition-opacity duration-300" />}

            {/* Guests Wrapper */}
            <div
              data-field-id="guests"
              className={`relative flex-[0.9] min-w-0 transition-all duration-300 py-3 pl-4 pr-2 rounded-full ${
                activeMenu === 'guests' ? 'bg-gray-100/90 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.05)] z-30' : hoveredField === 4 ? 'bg-gray-50/90' : 'z-10'
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
                variant="default"
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
                  disabled={isSearching}
                  className={`h-14 cursor-pointer bg-cta-gradient text-white rounded-full px-7 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-xl hover:shadow-[0_8px_24px_rgba(249,115,22,0.45)] group/btn ${isSearching ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isSearching ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                  ) : (
                    <Search className="w-4 h-4 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
                  )}
                  <span className="hidden xl:inline text-sm font-extrabold tracking-tight">
                    {isSearching ? 'Searching...' : 'Explore'}
                  </span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Mobile Search Card */}
          <div className="lg:hidden w-full max-w-xl mx-auto bg-white/95 border border-gray-200/60 backdrop-blur-3xl rounded-[2rem] p-5 shadow-[0_25px_65px_rgba(0,0,0,0.15)] flex flex-col gap-4 text-left relative">
            <h3 className="text-gray-900 text-xs font-bold tracking-[0.08em] uppercase px-1 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                Find Venues & Services
              </span>
              <span className="text-[10px] text-gray-500 font-semibold uppercase">{activeTab}</span>
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
              className={`relative w-full cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-gray-50/70 border border-gray-100 ${activeMenu === 'location' ? 'border-accent-orange bg-orange-50/30 shadow-[inset_0_1.5px_3px_rgba(255,149,48,0.05)] z-30' : 'z-10'}`}
            >
              <PremiumLocationSelect
                value={location}
                onChange={(val) => {
                  setLocation(val);
                  setActiveMenu(null);
                }}
                className="w-full"
                variant="default"
                menuIsOpen={activeMenu === 'location'}
                onMenuOpen={() => setActiveMenu('location')}
                onMenuClose={() => setActiveMenu(null)}
                menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                dropdownStyle={activeMenu === 'location' ? dropdownStyle || undefined : undefined}
              />
            </div>

            {/* Event Type & Venue Type */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <div 
                data-field-id="event"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) return;
                  setActiveMenu(activeMenu === 'event' ? null : 'event');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-gray-50/70 border border-gray-100 ${activeMenu === 'event' ? 'border-accent-orange bg-orange-50/30 shadow-[inset_0_1.5px_3px_rgba(255,149,48,0.05)] z-30' : 'z-10'}`}
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
                    variant="default"
                    menuIsOpen={activeMenu === 'event'}
                    onMenuOpen={() => setActiveMenu('event')}
                    onMenuClose={() => setActiveMenu(null)}
                    menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                    dropdownStyle={activeMenu === 'event' ? dropdownStyle || undefined : undefined}
                  />
                )}
              </div>

              <div 
                data-field-id="venue"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) return;
                  setActiveMenu(activeMenu === 'venue' ? null : 'venue');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-gray-50/70 border border-gray-100 ${activeMenu === 'venue' ? 'border-accent-orange bg-orange-50/30 shadow-[inset_0_1.5px_3px_rgba(255,149,48,0.05)] z-30' : 'z-10'}`}
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
                    variant="default"
                    menuIsOpen={activeMenu === 'venue'}
                    onMenuOpen={() => setActiveMenu('venue')}
                    onMenuClose={() => setActiveMenu(null)}
                    menuPortalTarget={typeof window !== 'undefined' && window.innerWidth >= 1024 ? document.body : undefined}
                    dropdownStyle={activeMenu === 'venue' ? dropdownStyle || undefined : undefined}
                  />
                )}
              </div>
            </div>

            {/* Date & Guests */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <div 
                data-field-id="date"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.react-datepicker') || (e.target as HTMLElement).closest('button')) return;
                  setActiveMenu(activeMenu === 'date' ? null : 'date');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-gray-50/70 border border-gray-100 ${activeMenu === 'date' ? 'border-accent-orange bg-orange-50/30 shadow-[inset_0_1.5px_3px_rgba(255,149,48,0.05)] z-30' : 'z-10'}`}
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
                  variant="default"
                  monthsShown={1}
                  isOpen={activeMenu === 'date'}
                />
              </div>

              <div 
                data-field-id="guests"
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest('.premium-select-container')) return;
                  setActiveMenu(activeMenu === 'guests' ? null : 'guests');
                }}
                className={`relative flex-1 cursor-pointer transition-all duration-300 py-3 px-5 rounded-2xl bg-gray-50/70 border border-gray-100 ${activeMenu === 'guests' ? 'border-accent-orange bg-orange-50/30 shadow-[inset_0_1.5px_3px_rgba(255,149,48,0.05)] z-30' : 'z-10'}`}
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
                  variant="default"
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
              disabled={isSearching}
              className={`group/btn w-full mt-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FF610D] to-[#EDBA82] hover:opacity-95 text-white font-bold flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer text-sm ${isSearching ? 'opacity-80 cursor-not-allowed' : ''}`}
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
              ) : (
                <Search className="w-5 h-5 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              )}
              <span className="font-extrabold tracking-tight">
                {isSearching ? 'Searching...' : 'Search Venues'}
              </span>
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-white/90">
            <span className="font-bold text-white/70 text-[11px] uppercase tracking-wider hidden sm:inline">Popular:</span>
            {POPULAR_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium backdrop-blur-md transition-all duration-300 hover:scale-105 flex items-center gap-1 cursor-pointer"
              >
                <span>{chip.label}</span>
                <ChevronRight className="w-3 h-3 text-white/60" />
              </button>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
