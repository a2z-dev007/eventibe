'use client';
import React, { useState, useEffect } from 'react';
import HeroSearch from '@/components/HeroSearch';
import DynamicHeroBackground, { ASSETS } from '@/components/DynamicHeroBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users2, MapPin, Star, Sparkles } from 'lucide-react';
import HighlightsSection from '@/components/HighlightsSection';
import CorporateTrustSection from '@/components/CorporateTrustSection';
import FeaturedVenuesCarousel from '@/components/FeaturedVenuesCarousel';
import { HowItWorksSection, CTASection, TestimonialsSection } from '@/components/HomeInteractiveSections';
import VideoReelTestimonials from '@/components/VideoReelTestimonials';

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
    <div className="flex flex-col min-h-screen">
      <section className="relative z-20 w-full h-[100dvh] min-h-[550px] flex items-center justify-center text-white">
        {/* Background Dynamic Content (Video + Images) */}
        <DynamicHeroBackground currentIndex={index} onVideoEnd={() => {
          setIsVideoDone(true);
          setIndex(1);
        }} />

        <div className="container mx-auto px-4 mt-4 md:px-6 relative flex flex-col items-center text-center mt-12 md:mt-16">
          <div className="relative w-full flex flex-col items-center min-h-[160px] md:min-h-[280px]">
            <AnimatePresence>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 flex flex-col items-center"
              >
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-2 md:mb-4 max-w-5xl leading-tight drop-shadow-xl">
                  {current.title.main} <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
                    {current.title.highlight}
                  </span>
                </h1>
                <p className="text-[12px] md:text-xl text-white/95 md:mb-10 max-w-2xl font-medium drop-shadow-md">
                  {current.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full">
            {/* Floating Search Bar with Animated Snake Border from event APIs */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Trust Strip — Enhanced with Icons & Interactivity */}
      <section className="py-12 bg-white relative z-10 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "Partner Venues", value: "2,500+", icon: <Building2 className="w-6 h-6" />, color: "from-blue-50 to-blue-100/50" },
              { label: "Corporate Clients", value: "1,200+", icon: <Users2 className="w-6 h-6" />, color: "from-orange-50 to-orange-100/50" },
              { label: "Cities Covered", value: "45+", icon: <MapPin className="w-6 h-6" />, color: "from-emerald-50 to-emerald-100/50" },
              { label: "Verified Reviews", value: "15k+", icon: <Star className="w-6 h-6" />, color: "from-yellow-50 to-yellow-100/50" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100"
              >
                {/* Background Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all duration-500 shadow-sm">
                  {stat.icon}
                </div>
                
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-none mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-soft-slate uppercase tracking-widest whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className="hidden lg:block absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="w-4 h-4 text-accent-orange" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Venue Highlights — Primary Focus (70%) */}
      <HighlightsSection 
        subtitle="Corporate Elite"
        title="Premium Business & Conference Spaces"
        linkText="View all corporate venues"
        linkUrl="/corporate-event-venues"
        type="corporate-venue"
        theme="light"
      />

      {/* Why Corporate Planners Trust Us — Enterprise Focus */}
      <CorporateTrustSection />

      {/* Featured Venues — Event Types Carousel */}
      <FeaturedVenuesCarousel />

      {/* Vendor Highlights — General Utility */}
      <HighlightsSection 
        subtitle="Professional Services"
        title="Top-Tier Event Vendors"
        linkText="Discover expert vendors"
        linkUrl="/vendors"
        type="vendor"
        theme="dark"
      />

      {/* Wedding & Social Venue Highlights — Secondary Focus (30%) */}
      <HighlightsSection 
        subtitle="Celebration Signature"
        title="Exquisite Wedding & Social Venues"
        linkText="Browse celebration venues"
        linkUrl="/wedding-venues"
        type="wedding-venue"
        theme="light"
      />

      {/* How It Works – Interactive */}
      <HowItWorksSection />

      {/* Testimonials – Interactive */}
      <TestimonialsSection/>
  {/* Video Reel Testimonials – Cinematic Social Proof */}
      <VideoReelTestimonials />
      {/* CTA – Interactive */}
      <CTASection />
    </div>
  );
}
