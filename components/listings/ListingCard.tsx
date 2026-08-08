'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Star, Users, ArrowUpRight, Tag, Heart } from 'lucide-react';
import type { ListingCardData } from '@/lib/listings/types';
import { cleanListingPrice, isDisplayablePrice } from '@/lib/listings/formatListingPrice';

const FALLBACK = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80';

const ACCENT_STYLES = {
  orange: {
    text: 'text-accent-orange',
    titleHover: 'group-hover:text-accent-orange',
    bg: 'bg-accent-orange',
    glow: 'group-hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.35)]',
    heart: 'bg-rose-500 border-rose-400',
  },
  blue: {
    text: 'text-corporate-blue',
    titleHover: 'group-hover:text-corporate-blue',
    bg: 'bg-corporate-blue',
    glow: 'group-hover:shadow-[0_20px_60px_-10px_rgba(30,58,138,0.35)]',
    heart: 'bg-corporate-blue border-corporate-blue',
  },
  rose: {
    text: 'text-rose-500',
    titleHover: 'group-hover:text-rose-500',
    bg: 'bg-rose-500',
    glow: 'group-hover:shadow-[0_20px_60px_-10px_rgba(244,63,94,0.3)]',
    heart: 'bg-rose-500 border-rose-400',
  },
} as const;

export default function ListingCard({
  name,
  city,
  image,
  rating,
  reviewCount,
  price,
  capacity,
  tag,
  amenity,
  href,
  accent = 'orange',
  cuisines = [],
  highlights = [],
  packageName,
}: ListingCardData) {
  const [src, setSrc] = useState(image || FALLBACK);
  const [liked, setLiked] = useState(false);
  const styles = ACCENT_STYLES[accent];
  const displayPrice = price ? cleanListingPrice(price) : undefined;

  return (
    <div className="h-full rounded-[28px]">
      <Link
        href={href}
        className={`group relative flex flex-col rounded-[28px] overflow-hidden bg-white shadow-md hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-500 ${styles.glow} h-full touch-manipulation`}
      >
        <div className="relative aspect-[4/3] overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={() => setSrc(FALLBACK)}
          />

          {tag && (
            <div className={`absolute top-3 left-3 max-w-[calc(100%-88px)] truncate ${styles.bg} text-white text-[10px] font-extrabold uppercase tracking-[0.15em] px-2.5 py-1 rounded-xl shadow-sm`}>
              {tag}
            </div>
          )}

          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            {rating !== undefined && (
              <div className="flex items-center gap-1 bg-white/85 backdrop-blur-md border border-white/60 rounded-xl px-2.5 py-1 shadow-sm">
                <Star size={11} className="fill-accent-orange text-accent-orange flex-shrink-0" />
                <span className="text-[12px] font-extrabold text-primary-navy">{rating.toFixed(1)}</span>
              </div>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-300 ${
                liked ? `${styles.heart} text-white` : 'bg-black/30 border-white/20 text-white'
              }`}
              aria-label="Save to wishlist"
            >
              <Heart size={13} className={liked ? 'fill-white' : ''} />
            </button>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-[1]">
            <div className="shimmer-line absolute inset-0" />
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5 gap-2.5">
          <h3 className={`text-[15px] font-bold text-primary-navy leading-snug line-clamp-2 ${styles.titleHover} transition-colors duration-300`}>
            {name}
          </h3>

          <div className="flex items-center gap-1.5 text-soft-slate text-xs font-semibold">
            <MapPin size={12} className={`${styles.text} flex-shrink-0`} />
            <span className="capitalize truncate">{city}</span>
          </div>

          {((capacity && !isNaN(Number(capacity)) && Number(capacity) > 0) || amenity) && (
            <div className="flex flex-wrap items-center gap-2">
              {capacity && !isNaN(Number(capacity)) && Number(capacity) > 0 && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1">
                  <Users size={10} className={styles.text} />
                  Up to {capacity}
                </span>
              )}
              {amenity && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-soft-slate bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1 truncate max-w-full">
                  <Tag size={10} className={`${styles.text} shrink-0`} />
                  <span className="truncate">{amenity}</span>
                </span>
              )}
            </div>
          )}

          {((cuisines && cuisines.length > 0) || (highlights && highlights.length > 0)) && (
            <div
              className="text-[11px] text-soft-slate/70 font-medium truncate"
              title={[...(cuisines || []), ...(highlights || [])].join(' • ')}
            >
              {[...(cuisines || []), ...(highlights || [])].join(' • ')}
            </div>
          )}

          {packageName && (
            <div className="text-[11px] font-semibold text-soft-slate truncate" title={packageName}>
              Package: <span className="text-primary-navy font-bold">{packageName}</span>
            </div>
          )}

          {reviewCount !== undefined && reviewCount > 0 && (
            <p className="text-[10px] font-bold text-soft-slate/60 uppercase tracking-wide">
              {reviewCount} verified reviews
            </p>
          )}

          <div className="flex-1" />

          <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-2">
            {displayPrice && isDisplayablePrice(displayPrice) ? (
              <span className="text-sm font-bold text-primary-navy truncate">{displayPrice}</span>
            ) : (
              <span className="text-xs font-bold text-soft-slate">Price on request</span>
            )}

            <span className={`inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider ${styles.text} group-hover:gap-2 transition-all duration-300 shrink-0`}>
              View
              <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 h-[3px] ${styles.bg} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
      </Link>
    </div>
  );
}
