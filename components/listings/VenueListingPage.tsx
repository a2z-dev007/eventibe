'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import PremiumSearchBar from '@/components/events/PremiumSearchBar';
import VenueSearchResultsPanel from '@/components/events/event-search/VenueSearchResultsPanel';
import type { Filters, Venue } from '@/components/events/event-search/types';
import { PER_PAGE } from '@/components/events/event-search/data';
import {
  VenueListingTopSections,
  VenueListingBottomSections,
  HeroBadgeIcon,
} from '@/components/listings/VenueListingSections';
import { searchVenues, fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints';
import { useDebounce } from '@/hooks/useDebounce';
import {
  VENUE_LISTING_CONFIGS,
  type VenueListingVariant,
} from '@/lib/listings/venueListingConfigs';

interface VenueListingPageProps {
  variant: VenueListingVariant;
}

export default function VenueListingPage({ variant }: VenueListingPageProps) {
  const config = VENUE_LISTING_CONFIGS[variant];
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('recommended');
  const [viewType, setViewType] = useState<'grid' | 'list'>('list');

  const [location, setLocation] = useState<{ value: string | number; label: string } | null>(null);
  const [venueType, setVenueType] = useState<{ value: number; label: string } | null>(null);
  const [eventType, setEventType] = useState<{ value: number; label: string } | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<{ value: string; label: string } | null>(null);

  const [filtersState, setFiltersState] = useState<Filters>(() => ({
    location: '',
    venueTypes: [],
    eventTypes: config.defaultEventTypeId ? [config.defaultEventTypeId] : [],
    minCap: 0,
    maxCap: 10000,
    minVeg: 0,
    maxVeg: 5000,
  }));

  const debouncedFilters = useDebounce(filtersState, 500);
  const debouncedLocationValue = useDebounce(location?.value, 500);

  const { data: venueTypesData } = useQuery({ queryKey: ['venueTypes'], queryFn: () => fetchVenueTypes() });
  const { data: eventTypesData } = useQuery({ queryKey: ['eventTypes'], queryFn: () => fetchEventTypes() });

  useEffect(() => {
    if (!config.defaultEventTypeId || !eventTypesData?.records || eventType) return;
    const found = eventTypesData.records.find((r) => r.id === config.defaultEventTypeId);
    if (found) setEventType({ value: found.id, label: found.name });
  }, [config.defaultEventTypeId, eventTypesData, eventType]);

  const guestOptions = [
    { value: '100', label: '0-100' },
    { value: '300', label: '100-300' },
    { value: '600', label: '300-600' },
    { value: '601', label: '600+' },
  ];

  const venueOptions = venueTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || [];
  const eventOptions = eventTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || [];

  const updateFilters = (partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
    setPage(1);
  };

  const filters: Filters = {
    ...filtersState,
    location: location?.label || filtersState.location,
  };

  const eventTypeFilter =
    debouncedFilters.eventTypes.length > 0
      ? debouncedFilters.eventTypes
      : config.defaultEventTypeId || undefined;

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'venueListing',
      variant,
      page,
      debouncedLocationValue,
      debouncedFilters.venueTypes,
      debouncedFilters.eventTypes,
      eventTypeFilter,
    ],
    queryFn: () =>
      searchVenues({
        page_number: page,
        number_of_records: PER_PAGE,
        city: location?.value,
        venue_type: debouncedFilters.venueTypes.length > 0 ? debouncedFilters.venueTypes : undefined,
        event_type: eventTypeFilter,
      }),
    placeholderData: (previousData) => previousData,
  });

  const results = data?.records || [];

  const processedResults = useMemo(() => {
    let list = [...results] as Venue[];

    if (sort === 'rating') {
      list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (sort === 'low-high') {
      list.sort(
        (a, b) =>
          Number(a.package_details?.[0]?.price || 0) - Number(b.package_details?.[0]?.price || 0),
      );
    } else if (sort === 'high-low') {
      list.sort(
        (a, b) =>
          Number(b.package_details?.[0]?.price || 0) - Number(a.package_details?.[0]?.price || 0),
      );
    } else if (sort === 'capacity-high') {
      list.sort((a, b) => Number(b.venue_configuration || 0) - Number(a.venue_configuration || 0));
    }

    return list;
  }, [results, sort]);

  const totalRecords = data?.totalRecords || 0;
  const totalPages = Math.max(1, Math.ceil(totalRecords / PER_PAGE));

  const isAnyFilterActive =
    location !== null ||
    venueType !== null ||
    (eventType !== null && eventType.value !== config.defaultEventTypeId) ||
    date !== null ||
    guests !== null ||
    filtersState.venueTypes.length > 0 ||
    (filtersState.eventTypes.length > 0 &&
      (!config.defaultEventTypeId ||
        filtersState.eventTypes.some((id) => id !== config.defaultEventTypeId))) ||
    filtersState.minCap !== 0 ||
    filtersState.maxCap !== 10000 ||
    filtersState.minVeg !== 0 ||
    filtersState.maxVeg !== 5000;

  const clearFilters = () => {
    setLocation(null);
    setVenueType(null);
    setDate(null);
    setGuests(null);
    if (config.defaultEventTypeId && eventTypesData?.records) {
      const found = eventTypesData.records.find((r) => r.id === config.defaultEventTypeId);
      if (found) setEventType({ value: found.id, label: found.name });
      else setEventType(null);
    } else {
      setEventType(null);
    }
    setFiltersState({
      location: '',
      venueTypes: [],
      eventTypes: config.defaultEventTypeId ? [config.defaultEventTypeId] : [],
      minCap: 0,
      maxCap: 10000,
      minVeg: 0,
      maxVeg: 5000,
    });
    setPage(1);
  };

  const handleTopSearch = () => {
    const params = new URLSearchParams();
    if (location?.value) {
      params.set('city', String(location.value));
      params.set('cityName', location.label);
    }
    if (venueType?.value) params.set('venue_type', String(venueType.value));
    const et = eventType?.value ?? config.defaultEventTypeId;
    if (et) params.set('event_type', String(et));
    if (date) params.set('date', date.toISOString().split('T')[0]);
    if (guests?.value) params.set('guests', guests.value);
    router.push(`/events/search${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const onCityChip = (cityName: string) => {
    setLocation({ value: cityName, label: cityName });
    setPage(1);
  };

  const { hero, theme } = config;
  const titleGradient =
    variant === 'wedding'
      ? 'from-rose-500 to-orange-500'
      : variant === 'corporate'
        ? 'from-blue-600 to-indigo-600'
        : 'from-slate-900 via-blue-900 to-indigo-950';

  return (
    <div className={`relative min-h-screen ${theme.pageBg} pb-24 md:pb-8 overflow-hidden`}>
      <div
        className={`absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20 ${theme.orbPrimary}`}
      />
      <div
        className={`absolute bottom-24 -left-24 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-15 ${theme.orbSecondary}`}
      />
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${theme.dotColor} 1.5px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-12 md:pt-16">
        {/* Page hero */}
        <div className="max-w-4xl mb-10 md:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-[2px] ${theme.accentLine}`} />
            <span
              className={`text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5 ${theme.badgeColor}`}
            >
              <HeroBadgeIcon type={hero.badgeIcon} />
              {hero.badge}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy tracking-tight leading-none mb-4 md:mb-6">
            {hero.title}{' '}
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
              {hero.titleHighlight}
            </span>
          </h1>
          <p className="text-base md:text-lg text-soft-slate/90 leading-relaxed font-medium max-w-2xl">
            {hero.subtitle}
          </p>
        </div>

        {/* Search bar — same as /events/search */}
        <div className="mb-10 md:mb-12">
          <PremiumSearchBar
            location={location}
            setLocation={setLocation}
            eventType={eventType}
            setEventType={setEventType}
            venueType={venueType}
            setVenueType={setVenueType}
            date={date}
            setDate={setDate}
            guests={guests}
            setGuests={setGuests}
            handleSearch={handleTopSearch}
            eventOptions={eventOptions}
            venueOptions={venueOptions}
            guestOptions={guestOptions}
            searchButtonText={config.searchButtonText}
            requiredLocation={false}
          />
        </div>

        <VenueListingTopSections variant={variant} onCitySelect={onCityChip} />

        {/* Same filter + list UI as search page */}
        <VenueSearchResultsPanel
          totalRecords={totalRecords}
          processedResults={processedResults}
          isLoading={isLoading}
          isError={isError}
          page={page}
          totalPages={totalPages}
          sort={sort}
          viewType={viewType}
          sidebarOpen={sidebarOpen}
          isAnyFilterActive={isAnyFilterActive}
          filters={filters}
          location={location}
          cityName={location?.label}
          venueTypeRecords={venueTypesData?.records?.map((r) => ({ id: r.id, name: r.name }))}
          eventTypeRecords={eventTypesData?.records?.map((r) => ({ id: r.id, name: r.name }))}
          setLocation={setLocation}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onViewTypeChange={setViewType}
          onSidebarOpen={setSidebarOpen}
          onUpdateFilters={updateFilters}
          onClearFilters={clearFilters}
          onPageChange={setPage}
        />

        <VenueListingBottomSections variant={variant} />
      </div>
    </div>
  );
}
