'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, Heart, Users } from 'lucide-react';

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
  /** 'feature' = tall hero card, 'portrait' = standard tall, 'landscape' = wide short */
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
      className="group relative block w-full h-full rounded-[22px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_24px_64px_rgba(180,80,100,0.22)] transition-all duration-600 hover:-translate-y-1"
    >
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        loading="lazy"
        onError={() => setSrc(FALLBACK)}
      />

      {/* Layer 1: Strong base gradient — covers bottom 65% of card */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      {/* Layer 2: Extra dark scrim only on the bottom third (where text lives) */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
      {/* Layer 3: Blush pink tint on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row: tag + wishlist */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
        {tag && (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 shadow-sm">
            {tag}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className={`ml-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${liked ? 'bg-rose-500 border-rose-400 text-white' : 'bg-white/15 border-white/20 text-white'}`}
          aria-label="Save to wishlist"
        >
          <Heart size={13} className={liked ? 'fill-white' : ''} />
        </button>
      </div>

      {/* Bottom content — always readable */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Decorative divider — only on tall cards, hidden on landscape */}
        {variant !== 'landscape' && (
          <div className="flex items-center gap-2 mb-2.5 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-400">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
            <Heart size={7} className="text-rose-300 fill-rose-300 flex-shrink-0" />
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent" />
          </div>
        )}

        {/* Name */}
        <h3
          className="font-extrabold text-white leading-tight mb-1 tracking-tight transition-colors duration-300 group-hover:text-rose-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          style={{ fontSize: variant === 'feature' ? '1.25rem' : variant === 'landscape' ? '0.9rem' : '1rem' }}
        >
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-white/70 font-semibold mb-3"
          style={{ fontSize: variant === 'landscape' ? '10px' : '11px' }}
        >
          <MapPin size={9} className="text-rose-300 flex-shrink-0" />
          <span className="capitalize">{city}</span>
        </div>

        {/* Footer strip — solid glass pill for maximum legibility */}
        <div className="flex items-center justify-between bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2.5">
            {price && (
              <span className="font-black text-white"
                style={{ fontSize: variant === 'landscape' ? '10px' : '11px' }}
              >
                {price}
              </span>
            )}
            {capacity && variant !== 'landscape' && (
              <span className="flex items-center gap-1 text-white/50 font-semibold text-[10px]">
                <Users size={9} className="text-rose-300" />
                {capacity} guests
              </span>
            )}
          </div>
          <span className="font-black uppercase tracking-[0.15em] text-rose-300 group-hover:text-rose-200 transition-colors"
            style={{ fontSize: variant === 'landscape' ? '9px' : '10px' }}
          >
            View →
          </span>
        </div>
      </div>
    </Link>
  );
}
