'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Heart, Users, ArrowUpRight } from 'lucide-react';

export interface WeddingVenueCardData {
  id: number | string;
  name: string;
  city: string;
  image: string;
  rating?: number;
  price?: string;
  capacity?: number;
  tag?: string;
  href: string;
  variant?: 'feature' | 'portrait' | 'landscape';
}

const FALLBACK = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';

export default function WeddingVenueCard({
  name,
  city,
  image,
  rating,
  price,
  capacity,
  tag,
  href,
  variant = 'portrait',
}: WeddingVenueCardData) {
  const [src, setSrc] = useState(image || FALLBACK);
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={href}
      className="group relative flex flex-col w-full h-full rounded-2xl overflow-hidden shadow-md hover:shadow-[0_20px_60px_rgba(180,60,80,0.2)] transition-all duration-500 hover:-translate-y-1 bg-gray-900"
    >
      {/* ── Image ──────────────────────────────── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        loading="lazy"
        onError={() => setSrc(FALLBACK)}
      />

      {/* Gradient scrim — strong at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/10" />

      {/* ── Top row ────────────────────────────── */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
        {tag && (
          <span className="shrink-0 max-w-[calc(100%-40px)] truncate text-[9px] font-black uppercase tracking-[0.18em] text-white bg-black/50 backdrop-blur-sm border border-white/15 rounded-full px-2.5 py-1">
            {tag}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className={`ml-auto shrink-0 w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${liked ? 'bg-rose-500 border-rose-400 text-white' : 'bg-black/40 border-white/15 text-white'}`}
          aria-label="Save to wishlist"
        >
          <Heart size={11} className={liked ? 'fill-white' : ''} />
        </button>
      </div>

      {/* ── Bottom content ──────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        {/* Name */}
        <h3 className="font-black text-white leading-tight tracking-tight line-clamp-2 mb-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] transition-colors duration-300 group-hover:text-rose-100"
          style={{ fontSize: variant === 'feature' ? '1.15rem' : '0.9rem' }}
        >
          {name}
        </h3>

        {/* City */}
        <div className="flex items-center gap-1 text-white/60 text-[10px] font-semibold mb-2.5">
          <MapPin size={8} className="text-rose-400 shrink-0" />
          <span className="capitalize truncate">{city}</span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2">
          <div className="min-w-0">
            {price && (
              <p className="text-[10px] font-black text-white truncate">{price}</p>
            )}
            {capacity && (
              <p className="flex items-center gap-1 text-[9px] text-white/45 font-medium">
                <Users size={7} className="text-rose-400 shrink-0" />
                {capacity} guests
              </p>
            )}
          </div>
          <div className="shrink-0 w-7 h-7 rounded-full bg-rose-500/20 border border-rose-400/30 flex items-center justify-center group-hover:bg-rose-500 group-hover:border-rose-500 transition-all duration-300">
            <ArrowUpRight size={12} className="text-rose-300 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
}
