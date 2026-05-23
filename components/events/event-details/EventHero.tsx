'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'

interface EventHeroProps {
  currentHeroIdx: number
  setCurrentHeroIdx: (idx: number | ((prev: number) => number)) => void
  heroSlideImages: string[]
  venueTitle: string
  venueRating?: string | number
  venueLoc: string
  venueImagesLength: number
  openLightbox: (images: string[], index: number) => void
  venueImagesList: string[]
  scrollToSection: (id: string) => void
}

export function EventHero({
  currentHeroIdx,
  setCurrentHeroIdx,
  heroSlideImages,
  venueTitle,
  venueRating,
  venueLoc,
  venueImagesLength,
  openLightbox,
  venueImagesList,
  scrollToSection
}: EventHeroProps) {
  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:h-[70vh] lg:h-[75vh] xl:h-[80vh] w-full overflow-hidden bg-gray-900 flex items-center">
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
            className="w-full h-full object-cover brightness-[0.6]"
          />
          {/* Advanced Gradients - Centered focus */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/60" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay - Centered Vertically */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center pt-20 md:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Elegant Breadcrumbs */}
          <nav className="hidden sm:flex items-center justify-center gap-3 mb-6 md:mb-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-[9px] md:text-xs font-black uppercase tracking-widest text-white/80">
              <Link href="/" className="hover:text-[#FF9530] transition-colors">home</Link>
              <ChevronRight className="w-3 h-3 inline mx-1.5 text-white/30" />
              <Link href="/events/search" className="hover:text-[#FF9530] transition-colors">venues</Link>
              <ChevronRight className="w-3 h-3 inline mx-1.5 text-[#FF9530]" />
              <span className="text-[#FF9530]">{venueTitle}</span>
            </div>
          </nav>

          <div className="flex flex-col items-center gap-4 md:gap-10">
            <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">
              <span className="bg-[#FF9530] text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1.5 md:px-4 md:py-1.5 rounded-full shadow-lg flex items-center gap-1.5 md:gap-2">
                <ShieldCheck className="w-3 md:w-3.5 h-3 md:h-3.5" /> Spodia Elite Partner
              </span>
              
              {venueRating && (
                <div className="flex items-center gap-1.5 text-white font-black text-[10px] md:text-xs bg-[#039c4d] px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-xl shadow-lg">
                  <Star className="w-3 md:w-3.5 h-3 md:h-3.5 fill-current" />
                  <span>{String(venueRating)}</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[1.1] tracking-tight drop-shadow-2xl px-2">
              {venueTitle}
            </h1>

            <div className="flex flex-col items-center gap-4 mt-1 md:mt-2">
              <div 
                className="flex items-start md:items-center justify-center gap-2 md:gap-2.5 text-white font-bold text-sm sm:text-base md:text-xl cursor-pointer max-w-[280px] sm:max-w-md md:max-w-none" 
                onClick={() => scrollToSection('location')}
              >
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#FF9530] mt-0.5 md:mt-0 shrink-0" />
                <span className="hover:text-[#FF9530] transition-colors text-center line-clamp-2 md:line-clamp-none leading-relaxed md:leading-normal">{venueLoc}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Visual Indicators - Slide bars */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {heroSlideImages.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentHeroIdx(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === currentHeroIdx ? 'w-8 md:w-12 bg-[#FF9530]' : 'w-3 md:w-4 bg-white/40'}`} 
          />
        ))}
      </div>

      {/* Hero Navigation Buttons */}
      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev - 1 + heroSlideImages.length) % heroSlideImages.length) }}
          className="w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-[#FF9530] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
        <button 
          onClick={(e) => { e.stopPropagation(); setCurrentHeroIdx((prev: number) => (prev + 1) % heroSlideImages.length) }}
          className="w-10 h-10 md:w-12 md:h-12 bg-black/30 hover:bg-[#FF9530] backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white transition-all shadow-lg"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </section>
  )
}
