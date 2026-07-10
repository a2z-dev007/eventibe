'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Star, MapPin, ChevronLeft, ChevronRight, X, Info, Play, Sparkles, Building2, Flame, Heart, Calendar } from 'lucide-react'
import { ItemGridModal } from '@/components/ui/ItemGridModal'

interface EventHeroProps {
  currentHeroIdx: number
  setCurrentHeroIdx: (idx: number | ((prev: number) => number)) => void
  heroSlideImages: string[]
  venueTitle: string
  venueRating?: string | number
  venueLocation?: string;
  venueLoc: string
  venueImagesLength: number
  openLightbox: (images: string[], index: number) => void
  venueImagesList: string[]
  scrollToSection: (id: string) => void
  eventTypes?: { id: string | number, name: string }[]
  videoCount?: number
  onWatchVideo?: () => void
  venue?: any
}

export function EventHero({
  currentHeroIdx,
  setCurrentHeroIdx,
  heroSlideImages,
  venueLocation,
  venueTitle,
  venueRating,
  venueLoc,
  venueImagesLength,
  openLightbox,
  venueImagesList,
  scrollToSection,
  eventTypes,
  videoCount = 0,
  onWatchVideo,
  venue
}: EventHeroProps) {
  const pathname = usePathname()
  const isVenuePage = pathname?.includes('/venue')
  const [isEventsModalOpen, setIsEventsModalOpen] = React.useState(false)
  const [displayCount, setDisplayCount] = React.useState(2)

  React.useEffect(() => {
    const updateDisplayCount = () => {
      setDisplayCount(window.innerWidth < 768 ? 3 : 5)
    }
    updateDisplayCount()
    window.addEventListener('resize', updateDisplayCount)
    return () => window.removeEventListener('resize', updateDisplayCount)
  }, [])

  const displayEventTypes = eventTypes?.slice(0, displayCount) || []
  const hasMoreEvents = (eventTypes?.length || 0) > displayCount

  // Extract starting price from packages if available
  const packageDetail = venue?.package_details?.find((p: any) => p.name?.toLowerCase().includes('veg')) || venue?.package_details?.[0]

  const parsePrice = (priceVal: any): number | null => {
    if (!priceVal) return null;
    const str = String(priceVal).replace(/[^\d]/g, '');
    const num = parseInt(str, 10);
    return isNaN(num) ? null : num;
  };

  const packagePrice = packageDetail ? parsePrice(packageDetail.price) : null

  return (
    <section className="relative w-full overflow-hidden bg-gray-950 flex items-center py-12 md:py-20 min-h-[500px] md:min-h-[600px]">
      {/* Background Slider - Zoom Ken Burns Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroIdx}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroSlideImages[currentHeroIdx]}
            alt={venueTitle}
            className="w-full h-full object-cover brightness-[0.75]"
          />
          {/* Multi-layered cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[450px] md:min-h-[500px] py-6">
        <div className="flex flex-col items-center justify-center gap-6 w-full">

          {/* Centered Immersive Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            className="w-full md:max-w-2xl bg-black/10 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col gap-4 text-center items-center mx-auto"
          >
            {/* Top Badge Indicators Row */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-md border border-amber-500/30 rounded-full text-[10px] font-black text-amber-300 uppercase tracking-widest shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300/30" />
                Premium Partner
              </span>

              {venue?.is_hotel_venue && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-white/90 uppercase tracking-widest shadow-md">
                  <Building2 className="w-3.5 h-3.5 text-white/70" />
                  Hotel Property
                </span>
              )}

              {packagePrice !== null && packagePrice > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FF9530]/15 border border-[#FF9530]/30 rounded-full text-[10px] font-black text-[#FF9530] uppercase tracking-widest shadow-md">
                  ₹{packagePrice.toLocaleString('en-IN')}/Plate Starts
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-[1.15] tracking-tight drop-shadow-xl">
              {venueTitle}
            </h1>

            {/* Location (Interactive Link) */}
            <button
              onClick={() => scrollToSection('location')}
              className="flex items-center justify-center gap-2 text-white/90 hover:text-[#FF9530] text-sm md:text-base font-bold transition-colors drop-shadow-md group w-fit mx-auto"
            >
              <MapPin className="w-4.5 h-4.5 text-[#FF9530] shrink-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="border-b border-transparent group-hover:border-[#FF9530] transition-colors">{venueLoc}</span>
            </button>

            {/* Suitable Occasions / Ideal For */}
            {eventTypes && eventTypes.length > 0 && (
              <div className="flex flex-col items-center gap-2 mt-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Perfect Occasions</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {displayEventTypes.map((type, idx) => (
                    <span key={type.id || idx} className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/5 rounded-xl text-xs font-bold text-white transition-all">
                      {type.name}
                    </span>
                  ))}

                  {hasMoreEvents && (
                    <button
                      onClick={() => setIsEventsModalOpen(true)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FF9530]/20 border border-[#FF9530]/40 text-[#FF9530] text-xs font-black uppercase tracking-wider hover:bg-[#FF9530]/30 transition-all active:scale-95"
                    >
                      +{eventTypes.length - displayCount} More
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
              <button
                onClick={() => {
                  const formEl = document.getElementById('inquiry-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.dispatchEvent(new CustomEvent('OPEN_QUOTE_MODAL'));
                  }
                }}
                className="flex-1 max-w-xs bg-gradient-to-r from-[#FF9530] to-orange-600 hover:from-orange-500 hover:to-orange-600 text-white font-black text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-2xl shadow-xl shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-[1.01] active:scale-95 transition-all text-center"
              >
                Send Enquiry
              </button>

              {videoCount > 0 && (
                <button
                  onClick={onWatchVideo}
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-black text-xs uppercase tracking-[0.15em] px-6 py-4 rounded-2xl active:scale-95 transition-all shadow-lg"
                >
                  <Play className="w-4 h-4 fill-white text-white" />
                  Watch Tour
                </button>
              )}
            </div>
          </motion.div>

          {/* Centered Carousel Thumbnails below Card (Desktop) */}
          {heroSlideImages.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="hidden md:flex items-center justify-center gap-2 bg-black/45 backdrop-blur-2xl p-2.5 rounded-3xl border border-white/10 shadow-2xl mx-auto mt-2"
            >
              {heroSlideImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentHeroIdx(i)}
                  className={`relative w-16 h-12 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${i === currentHeroIdx ? 'border-[#FF9530] scale-105 shadow-[0_0_15px_rgba(255,149,48,0.5)]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
              <button
                onClick={() => openLightbox(venueImagesList, currentHeroIdx)}
                className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-[#FF9530] text-white flex items-center justify-center border border-white/10 hover:scale-105 active:scale-95 transition-all font-black text-xs"
                title="View all photos"
              >
                +{venueImagesLength}
              </button>
            </motion.div>
          )}
        </div>

        {/* Mobile Dot Indicators */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-6 w-full">
          {heroSlideImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentHeroIdx(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${i === currentHeroIdx ? 'w-6 bg-[#FF9530]' : 'w-1.5 bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      <ItemGridModal
        isOpen={isEventsModalOpen}
        onClose={() => setIsEventsModalOpen(false)}
        title="Perfect Occasions"
        subtitle={isVenuePage ? `Discover every category available at ${venueTitle}` : `Discover every event category available at ${venueTitle}`}
        items={(eventTypes as any) || []}
        type="info"
      />

      {/* Hero Interactive Arrow Buttons (Floating edges) */}
      <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev - 1 + heroSlideImages.length) % heroSlideImages.length) }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-black/35 hover:bg-[#FF9530] backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:text-white transition-all shadow-lg active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20">
        <button
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev + 1) % heroSlideImages.length) }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-black/35 hover:bg-[#FF9530] backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:text-white transition-all shadow-lg active:scale-90"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  )
}
