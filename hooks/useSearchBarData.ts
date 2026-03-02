import { useQuery } from '@tanstack/react-query';
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api';
import { QUERY_KEYS } from '@/lib/queryKeys';

/** Shape of a single option for the HeroSearch dropdowns */
export interface SearchOption {
  value: string;
  label: string;
}

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function getVenueTypeOptions(): Promise<SearchOption[]> {
  const data = await fetchVenueTypes();
  return (data?.records ?? []).map((vt: any) => ({
    value: String(vt.id),
    label: vt.name,
  }));
}

async function getEventTypeOptions(): Promise<SearchOption[]> {
  const data = await fetchEventTypes();
  return (data?.records ?? []).map((et: any) => ({
    value: String(et.id),
    label: et.name,
  }));
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

/**
 * Fetches venue types and caches them for 1 hour.
 * The data is stable (changes rarely), so we set a long staleTime.
 */
export function useVenueTypes() {
  return useQuery<SearchOption[]>({
    queryKey: QUERY_KEYS.venueTypes,
    queryFn: getVenueTypeOptions,
    staleTime: 60 * 60 * 1000,        // 1 hour — data in cache is fresh, no refetch
    gcTime: 24 * 60 * 60 * 1000,      // 24 hours — keep in memory even when unused
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    placeholderData: [],              // show empty list instantly while loading
  });
}

/**
 * Fetches event types and caches them for 1 hour.
 */
export function useEventTypes() {
  return useQuery<SearchOption[]>({
    queryKey: QUERY_KEYS.eventTypes,
    queryFn: getEventTypeOptions,
    staleTime: 60 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 2,
    placeholderData: [],
  });
}
