'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { TiltCard } from '@/components/micro-interactions';
import { fetchVenueTypes } from '@/lib/api/eventsEndpoints';
import type { VenueTypeRecord } from '@/lib/api/eventsEndpoints';

// Curated fallback images per event type keyword
const FALLBACK_IMAGES: Record<string, string> = {
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  corporate: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  conference: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  birthday: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  party: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
  social: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80',
  gala: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  exhibition: 'https://images.unsplash.com/photo-1561489401-fc2876ced162?w=800&q=80',
  concert: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80',
  seminar: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80',
  default: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
};

function getImageForType(name: string, file?: string): string {
  if (file) return file;
  const key = Object.keys(FALLBACK_IMAGES).find((k) =>
    name.toLowerCase().includes(k)
  );
  return FALLBACK_IMAGES[key ?? 'default'];
}

function SkeletonCard() {
  return (
    <div className="shrink-0 w-[220px] sm:w-[260px] md:w-[280px] animate-pulse">
      <div className="relative aspect-[3/4] rounded-3xl bg-gray-200 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
      </div>
      <div className="mt-4 space-y-2 px-1">
        <div className="h-5 w-2/3 rounded-full bg-gray-200" />
        <div className="h-3 w-1/2 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

export default function FeaturedVenuesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [venueTypes, setVenueTypes] = useState<VenueTypeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchVenueTypes({ page_number: 1, number_of_records: 20 })
      .then((res) => {
        if (!cancelled && res?.records) setVenueTypes(res.records);
      })
      .catch(() => {
        // silently fail — skeleton disappears
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const updateNavState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 10);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 10);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('scroll', updateNavState, { passive: true });
    updateNavState();
    return () => track.removeEventListener('scroll', updateNavState);
  }, [venueTypes, updateNavState]);

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.et-card') as HTMLElement | null;
    if (!card) return;
    const gap = 24;
    const step = (card.getBoundingClientRect().width + gap) * 3;
    track.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' });
  };

  const [isDragging, setIsDragging] = useState(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    setIsDragging(true);
    dragMoved.current = false;
    startX.current = e.pageX - track.offsetLeft;
    scrollLeft.current = track.scrollLeft;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(x - startX.current) > 5) {
      dragMoved.current = true;
    }
    track.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section className="py-20 bg-light-bg overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-accent-orange" />
              <span className="text-xs font-bold text-accent-orange uppercase tracking-[0.2em]">
                Explore Venue Types
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy tracking-tight leading-tight">
              Find Venues for Every <br className="hidden md:block" />
              <span className="text-accent-orange">Occasion</span>
            </h2>
            <p className="text-soft-slate mt-3 max-w-lg text-base">
              From grand banquet halls to cozy corporate spaces — discover curated venues for every style of event.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/venues"
              className="group hidden sm:inline-flex items-center gap-2 text-sm font-bold text-accent-orange uppercase tracking-widest hover:text-orange-600 transition-colors"
            >
              See All Venues
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            {/* Nav Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll('prev')}
                disabled={!canPrev}
                aria-label="Scroll left"
                className={`h-11 w-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                  canPrev
                    ? 'border-gray-200 bg-white shadow-md hover:bg-accent-orange hover:text-white hover:border-accent-orange'
                    : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('next')}
                disabled={!canNext}
                aria-label="Scroll right"
                className={`h-11 w-11 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
                  canNext
                    ? 'border-gray-200 bg-white shadow-md hover:bg-accent-orange hover:text-white hover:border-accent-orange'
                    : 'border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
          style={{
            scrollSnapType: isDragging ? 'none' : 'x mandatory',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Left spacer — keeps first card off the edge on mobile */}
          <div className="shrink-0 w-1 md:hidden" aria-hidden />
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          ) : venueTypes.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-soft-slate w-full">
              No venue types available.
            </div>
          ) : (
            venueTypes.map((vt) => (
              <VenueTypeCard
                key={vt.id}
                id={vt.id}
                name={vt.name}
                image={getImageForType(vt.name, vt.file)}
                onLinkClick={(e) => {
                  if (dragMoved.current) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              />
            ))
          )}
          {/* Right spacer */}
          <div className="shrink-0 w-1 md:hidden" aria-hidden />
        </div>

        {/* Mobile See All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/venues"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent-orange uppercase tracking-widest"
          >
            See All Venues <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function VenueTypeCard({
  id,
  name,
  image,
  onLinkClick,
}: {
  id: number;
  name: string;
  image: string;
  onLinkClick?: (e: React.MouseEvent) => void;
}) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <TiltCard className="et-card shrink-0 w-[220px] sm:w-[260px] md:w-[280px] rounded-3xl">
    <Link
      href={`/events/search?venue_type=${id}`}
      className="block group cursor-pointer"
      style={{ scrollSnapAlign: 'start' }}
      onClick={onLinkClick}
    >
      {/* Image card */}
      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGES.default)}
        />

        {/* Gradient overlay — always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Shimmer sweep on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-[1]">
          <div className="shimmer-line absolute inset-0" />
        </div>

        {/* Floating accent badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-2.5 py-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <Sparkles size={10} className="text-accent-orange" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Featured</span>
        </div>

        {/* Name overlaid on image bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Glass blur pill — slides up from bottom on hover */}
          <div className="relative rounded-2xl px-4 py-3 overflow-hidden">
            {/* The frosted glass background layer — animates independently */}
            <div className="
              absolute inset-0 rounded-2xl
              bg-white/0 backdrop-blur-0
              border border-white/0
              group-hover:bg-white/15 group-hover:backdrop-blur-md
              group-hover:border-white/25
              group-hover:shadow-[0_4px_24px_rgba(0,0,0,0.25)]
              transition-all duration-400 ease-out
            " />
            {/* Text always visible, just changes color on hover */}
            <div className="relative z-10">
              <h3 className="text-lg font-extrabold text-white leading-tight group-hover:text-accent-orange transition-colors duration-300">
                {name}
              </h3>
              <p className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mt-1 flex items-center gap-1 group-hover:text-accent-orange/80 transition-colors duration-300">
                Explore venues
                <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </TiltCard>
  );
}
