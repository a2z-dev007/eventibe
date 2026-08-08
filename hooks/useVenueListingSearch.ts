'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints';

const GUEST_OPTIONS = [
  { value: '100', label: '0-100' },
  { value: '300', label: '100-300' },
  { value: '600', label: '300-600' },
  { value: '601', label: '600+' },
];

export interface AppliedVenueFilters {
  city?: string | number;
  venue_type?: string | number;
  event_type?: string | number;
}

export function useVenueListingSearch(defaultEventTypeId?: number) {
  const router = useRouter();
  const [location, setLocation] = useState<{ value: string | number; label: string } | null>(null);
  const [venueType, setVenueType] = useState<{ value: number; label: string } | null>(null);
  const [eventType, setEventType] = useState<{ value: number; label: string } | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<{ value: string; label: string } | null>(null);
  const [applied, setApplied] = useState<AppliedVenueFilters>(() =>
    defaultEventTypeId ? { event_type: defaultEventTypeId } : {},
  );

  const { data: venueTypesData } = useQuery({
    queryKey: ['venueTypes'],
    queryFn: () => fetchVenueTypes(),
  });
  const { data: eventTypesData } = useQuery({
    queryKey: ['eventTypes'],
    queryFn: () => fetchEventTypes(),
  });

  useEffect(() => {
    if (!defaultEventTypeId || !eventTypesData?.records || eventType) return;
    const found = eventTypesData.records.find((r) => r.id === defaultEventTypeId);
    if (found) setEventType({ value: found.id, label: found.name });
  }, [defaultEventTypeId, eventTypesData, eventType]);

  const venueOptions = venueTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || [];
  const eventOptions = eventTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || [];

  const applyFilters = useCallback(() => {
    setApplied({
      city: location?.value,
      venue_type: venueType?.value,
      event_type: eventType?.value ?? defaultEventTypeId,
    });
  }, [location, venueType, eventType, defaultEventTypeId]);

  const handleSearch = useCallback(() => {
    applyFilters();
  }, [applyFilters]);

  const handleAdvancedSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (location?.value) {
      params.set('city', String(location.value));
      params.set('cityName', location.label);
    }
    if (venueType?.value) params.set('venue_type', String(venueType.value));
    const et = eventType?.value ?? defaultEventTypeId;
    if (et) params.set('event_type', String(et));
    if (date) params.set('date', date.toISOString().split('T')[0]);
    if (guests?.value) params.set('guests', guests.value);
    router.push(`/events/search${params.toString() ? `?${params.toString()}` : ''}`);
  }, [location, venueType, eventType, date, guests, defaultEventTypeId, router]);

  const setCityByName = useCallback((cityName: string) => {
    setLocation({ value: cityName, label: cityName });
    setApplied((prev) => ({
      ...prev,
      city: cityName,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setLocation(null);
    setVenueType(null);
    setDate(null);
    setGuests(null);
    if (defaultEventTypeId && eventTypesData?.records) {
      const found = eventTypesData.records.find((r) => r.id === defaultEventTypeId);
      if (found) setEventType({ value: found.id, label: found.name });
      else setEventType(null);
    } else {
      setEventType(null);
    }
    setApplied(defaultEventTypeId ? { event_type: defaultEventTypeId } : {});
  }, [defaultEventTypeId, eventTypesData]);

  return {
    location,
    setLocation,
    venueType,
    setVenueType,
    eventType,
    setEventType,
    date,
    setDate,
    guests,
    setGuests,
    applied,
    applyFilters,
    handleSearch,
    handleAdvancedSearch,
    setCityByName,
    clearFilters,
    venueOptions,
    eventOptions,
    guestOptions: GUEST_OPTIONS,
  };
}
