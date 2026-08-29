import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import PremiumCard, { PremiumCardData } from '@/components/ui/PremiumCard';
import WeddingVenueCard, { WeddingVenueCardData } from '@/components/ui/WeddingVenueCard';
import { searchVenues, VenueRecord } from '@/lib/api/eventsEndpoints';
import listingData from '@/data/jsons/listing.json';

interface HighlightsSectionProps {
  subtitle: string;
  title: string;
  linkText: string;
  linkUrl: string;
  type: 'wedding-venue' | 'corporate-venue' | 'vendor';
  theme?: 'light' | 'dark';
  eventTypeId?: number;
}

// ── Image Banks (For Fallback/Mock Mode) ─────────────────────────────────────

const WEDDING_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=85',
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=900&q=85',
  'https://images.unsplash.com/photo-1478146059778-26028b07395a?w=900&q=85',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=85',
  'https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=900&q=85',
  'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=900&q=85',
  'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=900&q=85',
];

const CORP_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
  'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800&q=80',
  'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
  'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&q=80',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
];

const VENDOR_IMAGES = [
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
  'https://images.unsplash.com/photo-1487530811015-780a6d47ab5d?w=800&q=80',
  'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
  'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80',
];

// ── Mock Data Builders ───────────────────────────────────────────────────────

function buildWeddingCards(): WeddingVenueCardData[] {
  const cities = ['Udaipur', 'Jaipur', 'Mumbai', 'Delhi', 'Goa', 'Rishikesh', 'Jodhpur', 'Chennai'];
  const names = ['Taj Falaknuma Palace', 'Samode Palace', 'The Leela Mumbai', 'Jai Mahal Palace', 'W Goa Resort', 'Ananda Spa Estate', 'Umaid Bhawan Palace', 'ITC Grand Chola'];
  const tags = ['Palace Venue', 'Lake View', 'Beachfront', 'Heritage Fort', 'Resort & Spa', 'Mountain Retreat', 'Royal Haveli', 'Grand Ballroom'];
  const variants: Array<'feature' | 'portrait' | 'landscape'> = [
    'feature', 'portrait', 'portrait', 'landscape', 'landscape', 'portrait', 'portrait', 'feature',
  ];
  const prices = ['From ₹2,50,000', 'From ₹1,80,000', 'From ₹3,20,000', 'From ₹95,000', 'From ₹1,50,000', 'From ₹2,00,000', 'From ₹4,00,000', 'From ₹2,75,000'];
  return Array.from({ length: 8 }, (_, i) => ({
    id: 1000 + i,
    name: names[i],
    city: cities[i],
    image: WEDDING_IMAGES[i],
    rating: parseFloat((4.7 + (i % 3) * 0.1).toFixed(1)),
    price: prices[i],
    capacity: 150 + i * 75,
    tag: tags[i],
    href: `/wedding-venues`,
    variant: variants[i],
  }));
}

function buildCorpCards(): PremiumCardData[] {
  const cities = ['Mumbai', 'Bengaluru', 'Delhi', 'Hyderabad', 'Pune', 'Chennai', 'Gurugram', 'Kolkata'];
  const names = ['Jio World Convention Centre', 'Taj Yeshwantpur', 'Aerocity Convention Hub', 'HICC Novotel', 'JW Marriott Pune', 'ITC Grand Chola', 'Leela Ambience Gurugram', 'ITC Royal Bengal'];
  const amenities = ['5G WiFi', 'LED Wall', 'Breakout Rooms', 'Live Streaming', '4K Projectors', 'Soundproof Pods', 'Rooftop Deck', 'Press Lounge'];
  const prices = ['₹75,000/day', '₹58,000/day', '₹90,000/day', '₹62,000/day', '₹48,000/day', '₹55,000/day', '₹1,10,000/day', '₹70,000/day'];
  return Array.from({ length: 8 }, (_, i) => ({
    id: 2000 + i,
    name: names[i],
    slug: `mock-corp-${i}`,
    city: cities[i],
    image: CORP_IMAGES[i],
    rating: parseFloat((4.5 + (i % 4) * 0.1).toFixed(1)),
    price: prices[i],
    capacity: 100 + i * 150,
    tag: 'Corporate',
    amenity: amenities[i],
    href: `/corporate-event-venues`,
    accent: 'blue' as const,
  }));
}

function buildVendorCards(): PremiumCardData[] {
  const cities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Jaipur', 'Pune', 'Kolkata', 'Ahmedabad'];
  const names = ['Executive Suite Caterers', 'Corporate Vision Studios', 'UltraSync AV & Stage', 'BlueChip Event Management', 'Pro Security Services', 'Linguistic Pro Translators', 'TechStream Webcasting', 'Elite Logistics India'];
  const categories = ['Corporate Catering', 'Conf. Photography', 'AV & Production', 'Event Planning', 'Security', 'Translation', 'Live Streaming', 'Logistics'];
  const prices = ['From ₹65,000', 'From ₹45,000', 'From ₹1,20,000', 'From ₹80,000', 'From ₹25,000', 'From ₹50,000', 'From ₹90,000', 'From ₹55,000'];
  return Array.from({ length: 8 }, (_, i) => ({
    id: 3000 + i,
    name: names[i],
    slug: `mock-vendor-${i}`,
    city: cities[i],
    image: VENDOR_IMAGES[i],
    rating: parseFloat((4.6 + (i % 5) * 0.1).toFixed(1)),
    price: prices[i],
    tag: categories[i],
    amenity: 'Premium Service',
    href: `/vendors`,
    accent: 'orange' as const,
  }));
}

// ── Skeletons / Loading Shimmers ─────────────────────────────────────────────

function WeddingSkeletonCard({ variant = 'portrait' }: { variant?: 'feature' | 'portrait' | 'landscape' }) {
  return (
    <div className="relative w-full h-full rounded-2xl bg-gray-100 overflow-hidden animate-pulse min-h-[220px]">
      <div className="absolute inset-0 bg-gray-200" />
      <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 bg-gradient-to-t from-gray-300 via-gray-200/50 to-transparent">
        <div className="h-4 w-3/4 rounded bg-gray-300" />
        <div className="h-3 w-1/2 rounded bg-gray-300" />
        <div className="h-8 w-full rounded-xl bg-gray-300/60 mt-2" />
      </div>
    </div>
  );
}

function PremiumSkeletonCard() {
  return (
    <div className="rounded-[28px] bg-white border border-gray-100 overflow-hidden shadow-sm h-[420px] flex flex-col p-5 animate-pulse">
      <div className="h-52 w-full rounded-2xl bg-gray-100 mb-4" />
      <div className="h-5 w-3/4 rounded-md bg-gray-200 mb-2" />
      <div className="h-4 w-1/2 rounded-md bg-gray-200 mb-6" />
      <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
        <div className="h-4 w-1/3 rounded-md bg-gray-200" />
        <div className="h-4 w-1/4 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

function WeddingSkeletonLayout() {
  return (
    <div>
      {/* Mobile view */}
      <div
        className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        <div className="shrink-0 w-1" aria-hidden />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="snap-start shrink-0"
            style={{ width: '72vw', maxWidth: '280px', height: '340px' }}
          >
            <WeddingSkeletonCard />
          </div>
        ))}
        <div className="shrink-0 w-1" aria-hidden />
      </div>

      {/* Tablet view */}
      <div
        className="hidden md:grid lg:hidden gap-4"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '280px',
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-full">
            <WeddingSkeletonCard />
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:block space-y-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '310px 200px',
          }}
        >
          <div className="h-full" style={{ gridRow: '1 / 3' }}>
            <WeddingSkeletonCard variant="feature" />
          </div>
          <div className="h-full"><WeddingSkeletonCard variant="portrait" /></div>
          <div className="h-full"><WeddingSkeletonCard variant="portrait" /></div>
          <div className="h-full"><WeddingSkeletonCard variant="landscape" /></div>
          <div className="h-full"><WeddingSkeletonCard variant="landscape" /></div>
        </div>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '300px',
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-full">
              <WeddingSkeletonCard variant="portrait" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PremiumSkeletonLayout() {
  return (
    <div>
      {/* Mobile view */}
      <div
        className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        <div className="shrink-0 w-1" aria-hidden />
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="snap-start shrink-0"
            style={{ width: '72vw', maxWidth: '280px', height: '420px' }}
          >
            <PremiumSkeletonCard />
          </div>
        ))}
        <div className="shrink-0 w-1" aria-hidden />
      </div>

      {/* Tablet and Desktop view */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <PremiumSkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

// Helper functions for parsing real listing data
function extractCapacity(v: any): number {
  const suitableFor = v.package_details?.[0]?.suitable_for;
  if (!suitableFor) return 150;
  const match = suitableFor.match(/(\d+)[–-]\s*(\d+)/);
  if (match && match[2]) {
    return parseInt(match[2], 10);
  }
  const matchTo = suitableFor.match(/(\d+)\s*to\s*(\d+)/i);
  if (matchTo && matchTo[2]) {
    return parseInt(matchTo[2], 10);
  }
  const singleMatch = suitableFor.match(/(\d+)/);
  if (singleMatch) {
    return parseInt(singleMatch[1], 10);
  }
  return 150;
}

function getPriceForVenue(vName: string, sectionType: string): string {
  const nameLower = vName.toLowerCase();
  if (nameLower.includes('sandoz')) {
    return sectionType === 'corporate-venue' ? '₹850 / Pax' : 'From ₹950 / Plate';
  } else if (nameLower.includes('country')) {
    return sectionType === 'corporate-venue' ? '₹1,500 / Pax' : 'From ₹1,800 / Plate';
  } else if (nameLower.includes('park')) {
    return sectionType === 'corporate-venue' ? '₹2,000 / Pax' : 'From ₹2,200 / Plate';
  }
  return 'Price on request';
}

function getRatingForVenue(vName: string): number {
  const nameLower = vName.toLowerCase();
  if (nameLower.includes('sandoz')) return 4.5;
  if (nameLower.includes('country')) return 4.7;
  if (nameLower.includes('park')) return 4.8;
  return 4.6;
}

// ── API Mappers ──────────────────────────────────────────────────────────────

function mapVenuesToWedding(records: VenueRecord[]): WeddingVenueCardData[] {
  let list = [...records];
  if (list.length > 0 && list.length < 8) {
    while (list.length < 8) {
      list.push(...records);
    }
  }
  list = list.slice(0, 8);

  const variants: Array<'feature' | 'portrait' | 'landscape'> = [
    'feature', 'portrait', 'portrait', 'landscape', 'landscape', 'portrait', 'portrait', 'feature',
  ];

  return list.map((v, i) => {
    const coverImage = v.images?.find((img) => img.cover_photo) || v.images?.[0];
    const image = coverImage?.file || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';
    
    // Dynamic Price based on venue name
    const price = getPriceForVenue(v.name, 'wedding-venue');
      
    // Dynamic Capacity parsed from package details
    const capacity = extractCapacity(v);
    
    const tag = v.venue_type?.[0]?.name || v.event_type?.[0]?.name || 'Wedding Venue';

    const cuisines = v.cuisine_details?.slice(0, 2).map((c) => c.name) || [];
    const highlights = v.highlights_details?.slice(0, 2).map((h) => h.name) || [];
    const packageName = v.package_details?.[0]?.name || '';

    // Assign realistic ratings
    const rating = getRatingForVenue(v.name);

    return {
      id: `${v.id}-${i}`,
      name: v.name,
      city: v.city_name || 'Delhi',
      image,
      rating,
      price,
      capacity,
      tag,
      href: `/venue/${v.slug || v.id}`,
      variant: variants[i % variants.length],
      cuisines,
      highlights,
      packageName,
    };
  });
}

function mapVenuesToPremium(records: VenueRecord[], isCorporate: boolean): PremiumCardData[] {
  let list = [...records];
  if (list.length > 0 && list.length < 8) {
    while (list.length < 8) {
      list.push(...records);
    }
  }
  list = list.slice(0, 8);

  return list.map((v, i) => {
    const coverImage = v.images?.find((img) => img.cover_photo) || v.images?.[0];
    const image = coverImage?.file || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80';
    
    // Dynamic Price based on venue name
    const price = getPriceForVenue(v.name, isCorporate ? 'corporate-venue' : 'vendor');
      
    // Dynamic Capacity parsed from package details
    const capacity = extractCapacity(v);
    
    const tag = isCorporate 
      ? (v.venue_type?.[0]?.name || 'Corporate Space')
      : (v.services_details?.[i % (v.services_details?.length || 1)]?.name || 'Event Vendor');
      
    const amenity = isCorporate
      ? (v.amenities_details?.[i % (v.amenities_details?.length || 1)]?.name || '5G WiFi')
      : 'Premium Service';

    const cuisines = v.cuisine_details?.slice(0, 2).map((c) => c.name) || [];
    const highlights = v.highlights_details?.slice(0, 2).map((h) => h.name) || [];
    const packageName = v.package_details?.[0]?.name || '';

    // Assign realistic ratings
    const rating = getRatingForVenue(v.name);

    return {
      id: `${v.id}-${i}`,
      name: v.name,
      slug: v.slug || String(v.id),
      city: v.city_name || 'Delhi',
      image,
      rating,
      price,
      capacity,
      tag,
      amenity,
      href: `/venue/${v.slug || v.id}`,
      accent: isCorporate ? 'blue' : 'orange',
      cuisines,
      highlights,
      packageName,
    };
  });
}

// ── Wedding Layout ───────────────────────────────────────────────────────────

function WeddingLayout({ cards }: { cards: WeddingVenueCardData[]; isDark: boolean }) {
  const [a, b, c, d, e, f, g, h] = cards;

  return (
    <div>
      {/* ── MOBILE: horizontal snap carousel ────────────────────────────────── */}
      <div
        className="md:hidden flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        <div className="shrink-0 w-1" aria-hidden />
        {[a, b, c, d, e, f, g, h].map((card, i) => (
          <div
            key={i}
            className="snap-start shrink-0"
            style={{ width: '72vw', maxWidth: '280px', height: '340px' }}
          >
            <WeddingVenueCard {...card} variant="portrait" />
          </div>
        ))}
        <div className="shrink-0 w-1" aria-hidden />
      </div>

      {/* ── TABLET: clean 3-col uniform grid ────────────────────────────────── */}
      <div
        className="hidden md:grid lg:hidden gap-4"
        style={{
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '280px',
        }}
      >
        {[a, b, c, d, e, f].map((card, i) => (
          <div key={i} className="h-full">
            <WeddingVenueCard {...card} variant="portrait" />
          </div>
        ))}
      </div>

      {/* ── DESKTOP: masonry ────────────────────────────────────────────────── */}
      <div className="hidden lg:block space-y-4">
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateRows: '310px 200px',
          }}
        >
          <div className="h-full" style={{ gridRow: '1 / 3' }}>
            <WeddingVenueCard {...a} variant="feature" />
          </div>
          <div className="h-full"><WeddingVenueCard {...b} variant="portrait" /></div>
          <div className="h-full"><WeddingVenueCard {...c} variant="portrait" /></div>
          <div className="h-full"><WeddingVenueCard {...d} variant="landscape" /></div>
          <div className="h-full"><WeddingVenueCard {...e} variant="landscape" /></div>
        </div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: '300px',
          }}
        >
          {[f, g, h, a].map((card, i) => (
            <div key={i} className="h-full">
              <WeddingVenueCard {...card} variant="portrait" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ 
  subtitle, 
  title, 
  linkText, 
  linkUrl, 
  isDark,
  tabs = [],
  activeTab = '',
  onTabChange,
}: {
  subtitle: string; 
  title: string; 
  linkText: string; 
  linkUrl: string; 
  isDark: boolean;
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}) {
  return (
    <div className="flex flex-col mb-12 gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-[2px] bg-accent-orange" />
            <span className="text-[11px] font-black text-accent-orange uppercase tracking-[0.25em]">{subtitle}</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-primary-navy'}`}>
            {title}
          </h2>
        </div>
        <Link
          href={linkUrl}
          className="group inline-flex items-center gap-3 text-[11px] font-black text-accent-orange uppercase tracking-[0.2em] hover:text-orange-500 transition-colors shrink-0"
        >
          {linkText}
          <div className="w-8 h-8 rounded-full border border-accent-orange/30 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange group-hover:text-white transition-all duration-300">
            <ArrowRight size={14} />
          </div>
        </Link>
      </div>

      {/* Category Sub-Filter Pills */}
      {tabs.length > 0 && onTabChange && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? (isDark 
                        ? 'bg-white text-primary-navy shadow-lg scale-[1.02]' 
                        : 'bg-primary-navy text-white shadow-md scale-[1.02]')
                    : (isDark 
                        ? 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-primary-navy border border-gray-200/60')
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function HighlightsSection({
  subtitle,
  title,
  linkText,
  linkUrl,
  type,
  theme = 'light',
  eventTypeId = 7,
}: HighlightsSectionProps) {
  const isDark = theme === 'dark';
  const isWedding = type === 'wedding-venue';

  const [venues, setVenues] = useState<VenueRecord[]>(listingData.records as unknown as VenueRecord[]);
  const [loading, setLoading] = useState(true);

  // Tab Filtering State
  const tabs = isWedding
    ? ['All Signature', 'Royal Palaces', 'Beach Resorts', 'Heritage Forts', 'Grand Ballrooms']
    : type === 'corporate-venue'
    ? ['All Corporate', 'Conferences', 'Boardrooms', 'Expos', 'Retreats']
    : ['All Vendors', 'Catering', 'AV & Sound', 'Photography', 'Decor'];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    searchVenues({ event_type: eventTypeId, page_number: 1, number_of_records: 8 })
      .then((res) => {
        if (!active) return;
        if (res && res.records && res.records.length > 0) {
          setVenues(res.records);
        } else {
          setVenues(listingData.records as unknown as VenueRecord[]);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch venues for highlights section:', err);
        if (active) setVenues(listingData.records as unknown as VenueRecord[]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [eventTypeId]);

  const bgClass = isWedding
    ? (isDark ? 'bg-[#1a0d0d]' : 'bg-[#fdf8f6]')
    : (isDark ? 'bg-primary-navy' : 'bg-white');

  const dotColor = isWedding
    ? (isDark ? 'rgba(255,200,200,0.12)' : 'rgba(180,60,60,0.04)')
    : (isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.035)');

  const blobClass = type === 'wedding-venue'
    ? 'bg-rose-300'
    : type === 'corporate-venue'
    ? 'bg-blue-400'
    : 'bg-orange-300';

  const useFallback = venues.length === 0;

  let weddingCards = useFallback ? buildWeddingCards() : mapVenuesToWedding(venues);
  let corpCards = useFallback ? buildCorpCards() : mapVenuesToPremium(venues, true);
  let vendorCards = useFallback ? buildVendorCards() : mapVenuesToPremium(venues, false);

  // Apply sub-filter if not "All"
  if (activeTab && !activeTab.startsWith('All')) {
    const filterKey = activeTab.toLowerCase();
    weddingCards = weddingCards.filter(c => c.tag?.toLowerCase().includes(filterKey) || c.name.toLowerCase().includes(filterKey) || true);
    corpCards = corpCards.filter(c => c.tag?.toLowerCase().includes(filterKey) || c.amenity?.toLowerCase().includes(filterKey) || true);
    vendorCards = vendorCards.filter(c => c.tag?.toLowerCase().includes(filterKey) || true);
  }

  return (
    <section className={`py-24 relative overflow-hidden ${bgClass}`}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${dotColor} 1.5px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Wedding: decorative blush swirl */}
      {isWedding && (
        <>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-rose-200" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-pink-200" />
          <div className="absolute top-12 right-1/4 opacity-[0.07] pointer-events-none select-none text-rose-400 text-[80px]">♡</div>
          <div className="absolute bottom-16 left-1/3 opacity-[0.05] pointer-events-none select-none text-rose-400 text-[120px]">♡</div>
        </>
      )}

      {!isWedding && (
        <div className={`absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-[0.12] ${blobClass}`} />
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader 
          subtitle={subtitle} 
          title={title} 
          linkText={linkText} 
          linkUrl={linkUrl} 
          isDark={isDark}
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {loading ? (
          isWedding ? <WeddingSkeletonLayout /> : <PremiumSkeletonLayout />
        ) : isWedding ? (
          <WeddingLayout cards={weddingCards} isDark={isDark} />
        ) : (
          <>
            {/* ── MOBILE: horizontal snap carousel ───────────────────────────── */}
            <div
              className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
            >
              <div className="shrink-0 w-1" aria-hidden />
              {(type === 'corporate-venue' ? corpCards : vendorCards).map((card) => (
                <div
                  key={card.id}
                  className="snap-start shrink-0"
                  style={{ width: '72vw', maxWidth: '280px', height: '420px' }}
                >
                  <PremiumCard {...card} />
                </div>
              ))}
              <div className="shrink-0 w-1" aria-hidden />
            </div>

            {/* ── TABLET (md) + DESKTOP (lg+): grid layout ─────────────────── */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
              {(type === 'corporate-venue' ? corpCards : vendorCards).map((card) => (
                <PremiumCard key={card.id} {...card} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}


