'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Star, MapPin, ChevronLeft, ChevronRight, X, Info, Play } from 'lucide-react'
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
  onWatchVideo
}: EventHeroProps) {
  const [isEventsModalOpen, setIsEventsModalOpen] = React.useState(false)
  const [displayCount, setDisplayCount] = React.useState(2) // Initialize with mobile default

  React.useEffect(() => {
    const updateDisplayCount = () => {
      setDisplayCount(window.innerWidth < 768 ? 3 : 6)
    }

    // Set initial display count
    updateDisplayCount()

    // Add event listener
    window.addEventListener('resize', updateDisplayCount)

    // Clean up event listener
    return () => window.removeEventListener('resize', updateDisplayCount)
  }, [])

  const displayEventTypes = eventTypes?.slice(0, displayCount) || []
  const hasMoreEvents = (eventTypes?.length || 0) > displayCount
  return (
    <section className="relative w-full overflow-hidden bg-gray-900 flex items-center h-[100vh]">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentHeroIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img 
            src={heroSlideImages[currentHeroIdx]} 
            alt={venueTitle} 
            className="w-full h-full object-cover brightness-[0.8]"
          />
          {/* Advanced Gradients - Centered focus */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Centered Vertically */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center py-6 md:py-10 pt-[90px] md:pt-[100px] lg:pt-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >


          <div className="flex flex-col items-center gap-2 md:gap-4 lg:gap-6">
            <div className="flex flex-wrap mb-4 justify-center items-center gap-2 md:gap-3">
            
              {videoCount > 0 && (
                <button 
                  onClick={onWatchVideo}
                  className="bg-white/10 backdrop-blur-md text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/20 hover:bg-[#FF9530] hover:border-[#FF9530] transition-all flex items-center gap-1.5 md:gap-2 active:scale-95 shadow-xl"
                >
                  <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#FF9530] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Play className="w-2 md:w-2.5 h-2 md:h-2.5 text-white fill-white" />
                  </div>
                   Watch Tour
                </button>
              )}
              
            </div>

            <h1 className="text-[clamp(1.5rem,4vw,3rem)] sm:text-[clamp(1.5rem,2vw,3rem)] md:text-[clamp(2.5rem,5vh,4rem)] font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl px-4">
              {venueTitle}
            </h1>

            <div className="flex flex-col items-center gap-3 mt-1 md:mt-2">
              <div 
                className="flex items-center justify-center text-white/90 font-bold cursor-pointer max-w-[90vw]" 
                onClick={() => scrollToSection('location')}
              >
                <div className="flex items-center gap-2 px-4 py-2 ">
                  <span className="text-center leading-normal text-sm sm:text-base md:text-lg lg:text-xl drop-shadow-md">{venueLoc}</span>
                </div>
              </div>
            </div>

            {/* Suitable for Section - Now in Flow */}
            {eventTypes && eventTypes.length > 0 && (
              <div className="flex flex-col items-center gap-2 md:gap-3 text-white text-center mt-4 md:mt-6">
                {/* Centered Small Heading */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FF9530] animate-pulse" />
                  <span className="text-[10px] md:text-[14px] font-black uppercase tracking-[0.2em] text-[#FF9530]">Suitable for</span>
                </div>
                
                {/* Items and Button in one centered wrap line */}
                <div className="flex flex-wrap items-center justify-center gap-x-2 md:gap-x-4 gap-y-2.5 leading-none">
                  <p className=" text-xl md:text-2xl font-black tracking-tight leading-tight drop-shadow-xl">
                    {displayEventTypes.map((type, idx) => (
                      <React.Fragment key={type.id || idx}>
                        {type.name}{idx < displayEventTypes.length - 1 ? <span className="text-white/60 ml-0.5">, </span> : ''}
                      </React.Fragment>
                    ))}
                  </p>
                  
                  {hasMoreEvents && (
                    <button 
                      onClick={() => setIsEventsModalOpen(true)}
                      className="px-2.5 py-1 md:px-4 md:py-1.5 rounded-full bg-[#FF9530]/10 border border-[#FF9530]/30 text-[#FF9530] text-[9px] md:text-[11px] font-black uppercase tracking-widest hover:bg-[#FF9530]/20 transition-all active:scale-95"
                    >
                      +{eventTypes.length - displayCount} See All
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Visual Indicators - Slide bars */}
            <div className="flex items-center justify-center gap-1.5 md:gap-2 mt-4 md:mt-8">
              {heroSlideImages.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentHeroIdx(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroIdx ? 'w-8 md:w-12 bg-[#FF9530]' : 'w-3 md:w-4 bg-white/40 hover:bg-white/60'}`} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <ItemGridModal 
        isOpen={isEventsModalOpen} 
        onClose={() => setIsEventsModalOpen(false)} 
        title="Perfect Occasions" 
        subtitle={`Discover every event category available at ${venueTitle}`}
        items={(eventTypes as any) || []}
        type="info"
      />

      {/* Hero Navigation Buttons */}
      <div className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev - 1 + heroSlideImages.length) % heroSlideImages.length) }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-[#FF9530] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
      <div className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev + 1) % heroSlideImages.length) }}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black/30 hover:bg-[#FF9530] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  )
}
