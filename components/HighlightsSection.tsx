import React from 'react';
import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import PremiumCard, { PremiumCardData } from '@/components/ui/PremiumCard';
import WeddingVenueCard, { WeddingVenueCardData } from '@/components/ui/WeddingVenueCard';

interface HighlightsSectionProps {
  subtitle: string;
  title: string;
  linkText: string;
  linkUrl: string;
  type: 'wedding-venue' | 'corporate-venue' | 'vendor';
  theme?: 'light' | 'dark';
}

// ── Image Banks ──────────────────────────────────────────────────────────────

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

// ── Data Builders ────────────────────────────────────────────────────────────

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
  const names = ['Spice Route Caterers', 'Frozen Frame Studios', 'SoundSync AV', 'Marigold Decor Co.', 'Bloom & Petal Florals', 'Dhol Baaje Entertainment', 'LightWorks India', 'Shutter Stories'];
  const categories = ['Catering', 'Photography', 'AV & Tech', 'Décor', 'Floral', 'Entertainment', 'Lighting', 'Photography'];
  const prices = ['₹45,000/event', '₹60,000/event', '₹35,000/event', '₹80,000/event', '₹25,000/event', '₹50,000/event', '₹40,000/event', '₹55,000/event'];
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

// ── Wedding Masonry Layout ───────────────────────────────────────────────────

function WeddingLayout({ cards, isDark }: { cards: WeddingVenueCardData[]; isDark: boolean }) {
  // Layout: [feature | 2 portrait stacked ] [ landscape | landscape ] [feature | 2 portrait stacked]
  // Row 1: col-span-2 feature + col-span-1 (two portraits stacked)
  // Row 2: two landscapes side by side spanning 3 cols, then 1 portrait + 1 feature on right
  const [a, b, c, d, e, f, g, h] = cards;

  return (
    <div className="space-y-4">
      {/*
        Strict CSS grid — heights set exclusively at grid level.
        Cards use h-full to fill their cell. Zero fixed heights on cards.
        Block 1: 3-col × 2-row. Feature spans both rows.
        Block 2: 4-col × 1-row, all equal height.
      */}

      {/* BLOCK 1 — Feature left (spans 2 rows) + 2×2 grid right */}
      <div
        className="hidden md:grid gap-4"
        style={{
          gridTemplateColumns: '1fr 1fr 1fr',
          gridTemplateRows: '300px 200px',
        }}
      >
        {/* Feature — spans both rows; height = 300 + 16(gap) + 200 = 516px */}
        <div className="h-full" style={{ gridRow: '1 / 3' }}>
          <WeddingVenueCard {...a} variant="feature" />
        </div>
        {/* Row 1, cols 2–3 */}
        <div className="h-full"><WeddingVenueCard {...b} variant="portrait" /></div>
        <div className="h-full"><WeddingVenueCard {...c} variant="portrait" /></div>
        {/* Row 2, cols 2–3 */}
        <div className="h-full"><WeddingVenueCard {...d} variant="landscape" /></div>
        <div className="h-full"><WeddingVenueCard {...e} variant="landscape" /></div>
      </div>

      {/* BLOCK 2 — 4 equal-height portrait cards */}
      <div
        className="hidden md:grid gap-4 mt-4"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '300px',
        }}
      >
        <div className="h-full"><WeddingVenueCard {...f} variant="portrait" /></div>
        <div className="h-full"><WeddingVenueCard {...g} variant="portrait" /></div>
        <div className="h-full"><WeddingVenueCard {...h} variant="portrait" /></div>
        <div className="h-full"><WeddingVenueCard {...a} variant="portrait" /></div>
      </div>

      {/* Mobile fallback: simple 2-col stack */}
      <div className="grid grid-cols-2 gap-3 md:hidden" style={{ gridAutoRows: '240px' }}>
        {[a, b, c, d, e, f, g, h].map((card, i) => (
          <div key={i} className="h-full">
            <WeddingVenueCard {...card} variant="portrait" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ subtitle, title, linkText, linkUrl, isDark }: {
  subtitle: string; title: string; linkText: string; linkUrl: string; isDark: boolean;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-[2px] bg-accent-orange" />
          <span className="text-[11px] font-black text-accent-orange uppercase tracking-[0.25em]">{subtitle}</span>
        </div>
        <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] ${isDark ? 'text-white' : 'text-primary-navy'}`}>
          {title}
        </h2>
      </div>
      <Link
        href={linkUrl}
        className="group inline-flex items-center gap-3 text-[11px] font-black text-accent-orange uppercase tracking-[0.2em] hover:text-orange-500 transition-colors"
      >
        {linkText}
        <div className="w-8 h-8 rounded-full border border-accent-orange/30 flex items-center justify-center group-hover:bg-accent-orange group-hover:border-accent-orange group-hover:text-white transition-all duration-300">
          <ArrowRight size={14} />
        </div>
      </Link>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────

export default function HighlightsSection({ subtitle, title, linkText, linkUrl, type, theme = 'light' }: HighlightsSectionProps) {
  const isDark = theme === 'dark';

  const isWedding = type === 'wedding-venue';

  // Wedding gets a special creamy blush-tinged background
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

      {/* Wedding: decorative blush swirl top-right */}
      {isWedding && (
        <>
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-20 bg-rose-200" />
          <div className="absolute -bottom-24 -left-24 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-15 bg-pink-200" />
          {/* Small decorative hearts */}
          <div className="absolute top-12 right-1/4 opacity-[0.07] pointer-events-none select-none text-rose-400 text-[80px]">♡</div>
          <div className="absolute bottom-16 left-1/3 opacity-[0.05] pointer-events-none select-none text-rose-400 text-[120px]">♡</div>
        </>
      )}

      {!isWedding && (
        <div className={`absolute -top-40 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-[0.12] ${blobClass}`} />
      )}

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader subtitle={subtitle} title={title} linkText={linkText} linkUrl={linkUrl} isDark={isDark} />

        {isWedding ? (
          <WeddingLayout cards={buildWeddingCards()} isDark={isDark} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(type === 'corporate-venue' ? buildCorpCards() : buildVendorCards()).map((card) => (
              <PremiumCard key={card.id} {...card} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
