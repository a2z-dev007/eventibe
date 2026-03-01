'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Star, Users, ArrowUpRight, Tag } from 'lucide-react';

export interface PremiumCardData {
  id: number | string;
  name: string;
  slug: string;
  city: string;
  image: string;
  rating?: number;
  price?: string;
  capacity?: number;
  tag?: string;          // e.g. "Wedding", "Catering", "Corporate"
  amenity?: string;      // single highlight amenity
  href: string;
  accent?: 'orange' | 'blue'; // accent colour for hover glow
}

const FALLBACK = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80';

export default function PremiumCard({
  name,
  city,
  image,
  rating,
  price,
  capacity,
  tag,
  amenity,
  href,
  accent = 'orange',
}: PremiumCardData) {
  const [src, setSrc] = useState(image || FALLBACK);
  const isOrange = accent === 'orange';
  const accentColor = isOrange
    ? 'text-accent-orange'
    : 'text-corporate-blue';
  const accentBg = isOrange
    ? 'bg-accent-orange'
    : 'bg-corporate-blue';
  const glowClass = isOrange
    ? 'group-hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.35)]'
    : 'group-hover:shadow-[0_20px_60px_-10px_rgba(30,58,138,0.35)]';

  return (
    <Link
      href={href}
      className={`group relative flex flex-col rounded-[28px] overflow-hidden bg-white shadow-md hover:-translate-y-2 transition-all duration-500 ${glowClass} h-full`}
    >
      {/* ── Image area ──────────────────────────────── */}
      <div className="relative h-52 overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={() => setSrc(FALLBACK)}
        />

        {/* Top-left category tag */}
        {tag && (
          <div className={`absolute top-3 left-3 ${accentBg} text-white text-[10px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl shadow-sm`}>
            {tag}
          </div>
        )}

        {/* Top-right rating badge — frosted glass */}
        {rating !== undefined && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/80 backdrop-blur-md border border-white/60 rounded-xl px-2.5 py-1 shadow-sm">
            <Star size={11} className="fill-accent-orange text-accent-orange flex-shrink-0" />
            <span className="text-[12px] font-black text-primary-navy">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Bottom gradient for text legibility when peeking */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* ── Content area ────────────────────────────── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">

        {/* Name */}
        <h3 className={`text-[15px] font-black text-primary-navy leading-snug line-clamp-2 group-hover:${accentColor} transition-colors duration-300`}>
          {name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-soft-slate text-xs font-semibold">
          <MapPin size={12} className={`${accentColor} flex-shrink-0`} />
          <span className="capitalize truncate">{city}</span>
        </div>

        {/* Chips row — capacity + amenity */}
        {(capacity || amenity) && (
          <div className="flex flex-wrap gap-2">
            {capacity && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                <Users size={10} className={accentColor} />
                Up to {capacity}
              </span>
            )}
            {amenity && (
              <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                <Tag size={10} className={accentColor} />
                {amenity}
              </span>
            )}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── Footer strip ────────────────────────────── */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {price ? (
            <span className="text-sm font-black text-primary-navy">{price}</span>
          ) : (
            <span className="text-sm font-bold text-soft-slate/60 italic">Custom Quote</span>
          )}

          <span className={`inline-flex items-center gap-1 text-xs font-black uppercase tracking-wider ${accentColor} group-hover:gap-2 transition-all duration-300`}>
            View
            <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>

      {/* ── Hover accent line at bottom ─────────────── */}
      <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${accentBg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
    </Link>
  );
}
