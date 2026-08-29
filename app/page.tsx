'use client';
import React, { useState, useEffect } from 'react';
import HeroSearch from '@/components/HeroSearch';
import DynamicHeroBackground, { ASSETS } from '@/components/DynamicHeroBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users2, MapPin, Star, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import HighlightsSection from '@/components/HighlightsSection';
import CorporateTrustSection from '@/components/CorporateTrustSection';
import FeaturedVenuesCarousel from '@/components/FeaturedVenuesCarousel';
import { HowItWorksSection, CTASection, TestimonialsSection } from '@/components/HomeInteractiveSections';
import VideoReelTestimonials from '@/components/VideoReelTestimonials';
import Link from 'next/link';

const BRAND_LOGOS = [
  { name: 'TECHCORP', category: 'Fortune 500' },
  { name: 'DELOITTE', category: 'Enterprise' },
  { name: 'MICROSOFT', category: 'Technology' },
  { name: 'RELIANCE', category: 'Conglomerate' },
  { name: 'TATA GROUP', category: 'Enterprise' },
  { name: 'AMAZON', category: 'Cloud & Commerce' },
  { name: 'LUMINA', category: 'Global Media' },
  { name: 'GROWTHSCALE', category: 'Unicorn' },
];

export default function Home() {
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO SECTION ───────────────────────────────────────────────────────────── */}
      <section className="relative z-20 w-full min-h-[100dvh] lg:h-[100dvh] lg:min-h-[780px] flex items-center justify-center text-white pt-20 pb-16 lg:py-0 overflow-visible">
        {/* Background Dynamic Content (Video + Images) */}
        <DynamicHeroBackground currentIndex={index} onVideoEnd={() => {
          setIsVideoDone(true);
          setIndex(1);
        }} />

        <div className="container mx-auto px-4 md:px-6 relative flex flex-col items-center text-center">
          
          {/* Top Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <Link 
              href="/corporate-event-venues"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 hover:bg-white/25 transition-all duration-300 shadow-xl group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent-orange animate-pulse" />
              <span className="text-xs font-bold text-white tracking-wide">
                ✨ 2,500+ Verified Spaces Across 45+ Cities
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:translate-x-1 group-hover:text-white transition-all" />
            </Link>
          </motion.div>

          <div className="relative w-full flex flex-col items-center min-h-[140px] sm:min-h-[160px] md:min-h-[220px] lg:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 flex flex-col items-center"
              >
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 md:mb-4 max-w-5xl leading-[1.15] drop-shadow-2xl font-display">
                  {current.title.main} <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-amber-400 to-yellow-300">
                    {current.title.highlight}
                  </span>
                </h1>
                <p className="text-sm md:text-xl text-white/95 md:mb-8 max-w-2xl font-medium drop-shadow-md leading-relaxed">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full">
            {/* Elevated Hero Search Pill */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* ── TRUST METRICS & BRAND MARQUEE ───────────────────────────────────────────── */}
      <section className="py-14 bg-gradient-to-b from-white via-gray-50/50 to-white relative z-10 overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12">
            {[
              { label: "Partner Venues", value: "2,500+", sub: "Verified Spaces", icon: <Building2 className="w-6 h-6" />, color: "from-blue-50 to-blue-100/50" },
              { label: "Corporate Clients", value: "1,200+", sub: "Top Enterprises", icon: <Users2 className="w-6 h-6" />, color: "from-orange-50 to-orange-100/50" },
              { label: "Cities Covered", value: "45+", sub: "Across India", icon: <MapPin className="w-6 h-6" />, color: "from-emerald-50 to-emerald-100/50" },
              { label: "Verified Reviews", value: "15k+", sub: "4.9 ★ Rating", icon: <Star className="w-6 h-6" />, color: "from-yellow-50 to-yellow-100/50" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="group relative flex flex-col md:flex-row items-center gap-3 md:gap-4 p-5 md:p-6 rounded-2xl transition-all duration-500 bg-white shadow-sm hover:shadow-xl hover:shadow-gray-200/60 border border-gray-100"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />

                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all duration-500 shadow-sm shrink-0">
                  {stat.icon}
                </div>

                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-none mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {stat.value}
                  </p>
                  <p className="text-xs font-extrabold text-primary-navy/90 uppercase tracking-wider mb-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[10px] text-gray-500 font-semibold">
                    {stat.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Corporate Brand Partner Logos */}
          <div className="pt-6 border-t border-gray-100">
            <div className="text-center mb-6">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400">
                Trusted By Top Corporate Event Teams
              </span>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {BRAND_LOGOS.map((brand, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <span className="text-base sm:text-lg md:text-xl font-black text-primary-navy tracking-tighter hover:text-accent-orange transition-colors">
                    {brand.name}
                  </span>
                  <span className="text-[9px] text-gray-400 uppercase tracking-widest font-semibold">{brand.category}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CORPORATE VENUE HIGHLIGHTS (PRIMARY FOCUS 70%) ───────────────────────────── */}
      <HighlightsSection
        subtitle="Corporate Elite"
        title="Premium Business & Conference Spaces"
        linkText="View all corporate venues"
        linkUrl="/corporate-event-venues"
        type="corporate-venue"
        theme="light"
        eventTypeId={7}
      />

      {/* ── WHY CORPORATE PLANNERS TRUST US ───────────────────────────────────────────── */}
      <CorporateTrustSection />

      {/* ── FEATURED OCCASIONS CAROUSEL ───────────────────────────────────────────── */}
      <FeaturedVenuesCarousel />

      {/* ── VENDOR HIGHLIGHTS (SERVICES) ───────────────────────────────────────────── */}
      <HighlightsSection
        subtitle="Professional Services"
        title="Top-Tier Event Vendors & Creators"
        linkText="Discover expert vendors"
        linkUrl="/vendors"
        type="vendor"
        theme="dark"
        eventTypeId={7}
      />

      {/* ── WEDDING & SOCIAL VENUE HIGHLIGHTS ───────────────────────────────────────────── */}
      <HighlightsSection
        subtitle="Celebration Signature"
        title="Exquisite Wedding & Social Venues"
        linkText="Browse celebration venues"
        linkUrl="/wedding-venues"
        type="wedding-venue"
        theme="light"
        eventTypeId={7}
      />

      {/* ── HOW IT WORKS STEPPER ───────────────────────────────────────────── */}
      <HowItWorksSection />

      {/* ── TESTIMONIALS (PERSONA SWITCHER) ───────────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── VIDEO REEL TESTIMONIALS ───────────────────────────────────────────── */}
      <VideoReelTestimonials />

      {/* ── HIGH-CONVERTING DUAL-PERSONA CTA ───────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}

