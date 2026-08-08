'use client';

import Link from 'next/link';
import {
  MapPin,
  Building2,
  Heart,
  Sparkles,
  Wifi,
  Projector,
  Utensils,
  Car,
  ShieldCheck,
  Star,
  Users,
  CheckCircle2,
  ArrowRight,
  Castle,
  Palmtree,
  PartyPopper,
} from 'lucide-react';
import type { VenueListingVariant } from '@/lib/listings/venueListingConfigs';
import { POPULAR_CITIES } from '@/lib/listings/venueListingConfigs';

interface VenueListingSectionsProps {
  variant: VenueListingVariant;
  onCitySelect: (city: string) => void;
  totalRecords?: number;
}

function TrustStrip({ variant }: { variant: VenueListingVariant }) {
  const accent =
    variant === 'wedding' ? 'text-rose-500' : variant === 'corporate' ? 'text-corporate-blue' : 'text-[#FF9530]';

  const stats = [
    { val: '2,500+', lbl: 'Partner Venues', icon: Building2 },
    { val: '4.8/5', lbl: 'Avg. Rating', icon: Star },
    { val: '45+', lbl: 'Cities', icon: MapPin },
    { val: '24/7', lbl: 'Expert Support', icon: Users },
  ];

  return (
    <section className="py-10 px-4 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ val, lbl, icon: Icon }) => (
          <div key={lbl} className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className={`mb-3 p-2.5 rounded-xl bg-gray-50 ${accent}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-black text-primary-navy">{val}</p>
            <p className="text-[10px] font-bold text-soft-slate uppercase tracking-widest">{lbl}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PopularCities({
  variant,
  onCitySelect,
}: {
  variant: VenueListingVariant;
  onCitySelect: (city: string) => void;
}) {
  const cities = POPULAR_CITIES[variant];
  const title =
    variant === 'wedding'
      ? 'Popular Wedding Destinations'
      : variant === 'corporate'
        ? 'Top Corporate Hubs'
        : 'Browse by City';

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-black text-primary-navy tracking-tight">{title}</h2>
        <Link
          href="/events/search"
          className="text-xs font-bold text-[#FF9530] uppercase tracking-wider flex items-center gap-1 hover:gap-2 transition-all"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => onCitySelect(city)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-gray-100 text-sm font-bold text-primary-navy shadow-sm hover:border-[#FF9530]/40 hover:bg-orange-50/50 active:scale-95 transition-all touch-manipulation"
          >
            <MapPin className="w-3.5 h-3.5 text-[#FF9530]" />
            {city}
          </button>
        ))}
      </div>
    </section>
  );
}

function CategoryChips({ variant }: { variant: VenueListingVariant }) {
  if (variant === 'corporate') {
    const items = [
      { icon: Projector, label: 'AV & Stage', href: '/events/search?event_type=120' },
      { icon: Wifi, label: 'High-Speed WiFi', href: '/events/search?event_type=120' },
      { icon: Utensils, label: 'In-house Catering', href: '/events/search?event_type=120' },
      { icon: Car, label: 'Valet Parking', href: '/events/search?event_type=120' },
    ];
    return (
      <section className="mb-10">
        <h2 className="text-lg font-black text-primary-navy tracking-tight mb-4">Must-Have for Corporate Events</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {items.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-blue-100/60 shadow-sm hover:shadow-md hover:border-corporate-blue/30 transition-all group"
            >
              <div className="p-2 rounded-xl bg-blue-50 text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-navy">{label}</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'wedding') {
    const styles = [
      { icon: Castle, label: 'Heritage Palaces', href: '/events/search?event_type=26' },
      { icon: Palmtree, label: 'Beach & Resorts', href: '/events/search?event_type=26' },
      { icon: PartyPopper, label: 'Banquet Halls', href: '/events/search?event_type=26' },
      { icon: Heart, label: 'Destination Weddings', href: '/events/search?event_type=26' },
    ];
    return (
      <section className="mb-10">
        <h2 className="text-lg font-black text-primary-navy tracking-tight mb-4">Shop by Celebration Style</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {styles.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-rose-100/60 shadow-sm hover:shadow-md hover:border-rose-300/50 transition-all group"
            >
              <div className="p-2 rounded-xl bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-primary-navy">{label}</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const types = [
    { label: 'Corporate Events', href: '/corporate-event-venues' },
    { label: 'Weddings', href: '/wedding-venues' },
    { label: 'Social Gatherings', href: '/events/search' },
    { label: 'All Venues', href: '/venues' },
  ];
  return (
    <section className="mb-10">
      <h2 className="text-lg font-black text-primary-navy tracking-tight mb-4">Explore by Occasion</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {types.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#FF9530]/40 hover:bg-orange-50/30 text-sm font-bold text-primary-navy transition-all text-center"
          >
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}

function WhyBookSection({ variant }: { variant: VenueListingVariant }) {
  const items =
    variant === 'corporate'
      ? [
          { title: 'Verified Listings', desc: 'Real photos, capacities, and amenities checked by our team.' },
          { title: 'Transparent Pricing', desc: 'Package rates upfront — no hidden venue fees.' },
          { title: 'Dedicated Planners', desc: 'Corporate event specialists from inquiry to event day.' },
        ]
      : variant === 'wedding'
        ? [
            { title: 'Curated Shortlists', desc: 'Palace, resort, and banquet options matched to your vision.' },
            { title: 'Guest-Ready Packages', desc: 'Per-plate pricing and capacity clearly listed.' },
            { title: 'Site Visit Support', desc: 'Schedule walkthroughs and compare venues side by side.' },
          ]
        : [
            { title: 'One Marketplace', desc: 'Corporate, wedding, and social venues in a single search.' },
            { title: 'Real Reviews', desc: 'Ratings from verified bookings and site visits.' },
            { title: 'Instant Enquiries', desc: 'Send requests to multiple venues in minutes.' },
          ];

  return (
    <section className="mt-16 py-12 px-6 md:px-10 rounded-[2.5rem] bg-primary-navy text-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#FF9530]/10 rounded-full blur-[80px]" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-5 h-5 text-[#FF9530]" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF9530]">Why Eventibe</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black mb-8 tracking-tight">
          {variant === 'corporate'
            ? 'Built for Business Event Planners'
            : variant === 'wedding'
              ? 'Plan Your Perfect Day with Confidence'
              : 'India\'s Trusted Venue Marketplace'}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map(({ title, desc }) => (
            <div key={title} className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-[#FF9530] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/events/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF9530] text-white text-sm font-black uppercase tracking-wider hover:bg-[#FF8000] transition-colors"
          >
            Start Exploring <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function VenueListingTopSections({ variant, onCitySelect }: VenueListingSectionsProps) {
  return (
    <>
      <TrustStrip variant={variant} />
      <div className="mt-10">
        <CategoryChips variant={variant} />
        <PopularCities variant={variant} onCitySelect={onCitySelect} />
      </div>
    </>
  );
}

export function VenueListingBottomSections({ variant }: { variant: VenueListingVariant }) {
  return <WhyBookSection variant={variant} />;
}

export function HeroBadgeIcon({ type }: { type?: 'sparkles' | 'building' | 'heart' }) {
  if (type === 'building') return <Building2 size={12} className="animate-pulse" />;
  if (type === 'heart') return <Heart size={12} className="animate-pulse" />;
  return <Sparkles size={12} className="animate-pulse" />;
}
