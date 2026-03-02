/**
 * Centralised TanStack Query key factory.
 * Using arrays ensures proper cache invalidation granularity.
 */
export const QUERY_KEYS = {
  /** All venue types (used in HeroSearch dropdown) */
  venueTypes: ['venueTypes'] as const,

  /** All event types (used in HeroSearch dropdown) */
  eventTypes: ['eventTypes'] as const,
} as const;
