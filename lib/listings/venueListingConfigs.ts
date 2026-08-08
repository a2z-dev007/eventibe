export type VenueListingVariant = 'all' | 'corporate' | 'wedding';

export type ListingAccent = 'orange' | 'blue' | 'rose';

export interface VenueListingHeroConfig {
  badge: string;
  badgeIcon?: 'sparkles' | 'building' | 'heart';
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export interface VenueListingThemeConfig {
  pageBg: string;
  orbPrimary: string;
  orbSecondary: string;
  dotColor: string;
  accentLine: string;
  badgeColor: string;
  filterBorder: string;
}

export interface VenueListingPageConfig {
  variant: VenueListingVariant;
  defaultEventTypeId?: number;
  accent: ListingAccent;
  recordsPerPage: number;
  paginationVariant: 'default' | 'corporate' | 'wedding';
  hero: VenueListingHeroConfig;
  theme: VenueListingThemeConfig;
  searchButtonText?: string;
  emptyTitle: string;
  emptyDescription: string;
}

export const VENUE_LISTING_CONFIGS: Record<VenueListingVariant, VenueListingPageConfig> = {
  all: {
    variant: 'all',
    accent: 'blue',
    recordsPerPage: 12,
    paginationVariant: 'default',
    hero: {
      badge: 'Verified Portfolio',
      badgeIcon: 'sparkles',
      title: 'Discover',
      titleHighlight: 'Premium Spaces',
      subtitle:
        'Browse corporate convention centers, luxury wedding banquets, and scenic retreats — all in one curated marketplace.',
    },
    theme: {
      pageBg: 'bg-[#fafbfc]',
      orbPrimary: 'bg-blue-100',
      orbSecondary: 'bg-slate-100',
      dotColor: 'rgba(15,23,42,0.025)',
      accentLine: 'bg-primary-navy',
      badgeColor: 'text-primary-navy',
      filterBorder: 'border-slate-100',
    },
    searchButtonText: 'Search Venues',
    emptyTitle: 'No Spaces Found',
    emptyDescription: 'Try adjusting your filters or explore popular cities below.',
  },
  corporate: {
    variant: 'corporate',
    defaultEventTypeId: 120,
    accent: 'blue',
    recordsPerPage: 12,
    paginationVariant: 'corporate',
    hero: {
      badge: 'Corporate Elite',
      badgeIcon: 'building',
      title: 'Executive',
      titleHighlight: 'Event Spaces',
      subtitle:
        'Conference halls, breakout rooms, and exhibition hubs built for offsites, AGMs, product launches, and MICE events.',
    },
    theme: {
      pageBg: 'bg-[#f8fafc]',
      orbPrimary: 'bg-blue-200',
      orbSecondary: 'bg-indigo-200',
      dotColor: 'rgba(30,58,138,0.035)',
      accentLine: 'bg-corporate-blue',
      badgeColor: 'text-corporate-blue',
      filterBorder: 'border-blue-100/50',
    },
    searchButtonText: 'Find Corporate Venues',
    emptyTitle: 'No Corporate Spaces Found',
    emptyDescription: 'Relax your filters or browse popular business hubs below.',
  },
  wedding: {
    variant: 'wedding',
    defaultEventTypeId: 26,
    accent: 'rose',
    recordsPerPage: 12,
    paginationVariant: 'wedding',
    hero: {
      badge: 'Exquisite Collection',
      badgeIcon: 'heart',
      title: 'Dream',
      titleHighlight: 'Wedding Venues',
      subtitle:
        'From heritage palaces to beachfront resorts — find venues that match your vision, guest count, and celebration style.',
    },
    theme: {
      pageBg: 'bg-[#fdf8f6]',
      orbPrimary: 'bg-rose-200',
      orbSecondary: 'bg-pink-200',
      dotColor: 'rgba(180,60,60,0.035)',
      accentLine: 'bg-accent-orange',
      badgeColor: 'text-accent-orange',
      filterBorder: 'border-rose-100/50',
    },
    searchButtonText: 'Find Wedding Venues',
    emptyTitle: 'No Wedding Venues Found',
    emptyDescription: 'Try different cities or browse popular wedding destinations below.',
  },
};

export const POPULAR_CITIES: Record<VenueListingVariant, string[]> = {
  all: ['Delhi', 'Mumbai', 'Bengaluru', 'Jaipur', 'Hyderabad', 'Chennai'],
  corporate: ['Gurugram', 'Mumbai', 'Bengaluru', 'Hyderabad', 'Pune', 'Chennai'],
  wedding: ['Udaipur', 'Jaipur', 'Delhi', 'Goa', 'Jodhpur', 'Mumbai'],
};
