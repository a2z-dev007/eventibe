'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DynamicHeroBackground, { ASSETS } from '@/components/DynamicHeroBackground'
import HeroSearch from '@/components/HeroSearch'

const EVENT_ASSETS_CONTENT = [
  {
    title: { main: "Plan Extraordinary Events &", highlight: "Corporate Offsites." },
    desc: "The trusted marketplace to find, plan, and book premium events, team offsites, and expert vendors for high-impact company gatherings."
  },
  {
    title: { main: "Flawless Execution for", highlight: "Business Conferences." },
    desc: "Host successful meetings, product launches, and industry conferences with top-tier stage production, AV systems, and services."
  },
  {
    title: { main: "Celebrate Memorable", highlight: "Social Gatherings." },
    desc: "Plan anniversaries, themed birthday parties, and festive celebrations with curated catering, decor, and entertainment."
  },
  {
    title: { main: "Create Magical &", highlight: "Grand Weddings." },
    desc: "Design your dream wedding ceremony, engagement, or reception with elite decorators, caterers, and complete event coordination."
  }
];

export default function HeroSection() {
  const [index, setIndex] = useState(0);
  const [isVideoDone, setIsVideoDone] = useState(false);

  useEffect(() => {
    if (isVideoDone || ASSETS[index].type === 'image') {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1 >= ASSETS.length ? 1 : prev + 1));
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isVideoDone, index]);

  const current = ASSETS[index];
  const currentText = EVENT_ASSETS_CONTENT[index];

  return (
    <section className="relative z-20 w-full min-h-[100dvh] lg:h-[100dvh] lg:min-h-[750px] flex items-center justify-center text-white pt-24 pb-16 lg:py-0 overflow-visible bg-black">
      {/* Background Dynamic Content (Video + Images) */}
      <DynamicHeroBackground currentIndex={index} onVideoEnd={() => {
        setIsVideoDone(true);
        setIndex(1);
      }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        <div className="relative w-full flex flex-col items-center min-h-[140px] sm:min-h-[160px] md:min-h-[220px] lg:min-h-[280px]">
          <AnimatePresence>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-0 flex flex-col items-center"
            >
              <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-2 md:mb-4 max-w-5xl leading-tight drop-shadow-xl font-display">
                {currentText.title.main} <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
                  {currentText.title.highlight}
                </span>
              </h1>
              <p className="text-sm md:text-xl text-white/95 md:mb-10 max-w-2xl font-medium drop-shadow-md">
                {currentText.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="w-full">
          {/* Floating Search Bar */}
          <HeroSearch />
        </div>
      </div>

      {/* Bounce scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
