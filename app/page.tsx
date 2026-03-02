import React from 'react';
import HeroSearch from '@/components/HeroSearch';
import HeroVideo from '@/components/HeroVideo';
import HighlightsSection from '@/components/HighlightsSection';
import FeaturedVenuesCarousel from '@/components/FeaturedVenuesCarousel';
import { HowItWorksSection, TestimonialsSection, CTASection } from '@/components/HomeInteractiveSections';

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative z-20 w-full h-[100dvh] min-h-[550px] flex items-center justify-center text-white">
        {/* Background Video Content */}
        <HeroVideo playbackRate={0.7} />
        {/* Dark Overlay for clear reading visibility */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        <div className="container mx-auto px-4 mt-4 md:px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-16">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-2 md:mb-4 max-w-5xl leading-tight drop-shadow-xl animate-fade-in-up">
            Extraordinary Spaces for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">Corporate Excellence.</span>
          </h1>
          <p className="text-[12px] md:text-xl text-white/95  md:mb-10 max-w-2xl font-medium drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
            The trusted marketplace to discover and book premium venues, offsites, and expert vendors for your next high-impact corporate event.
          </p>

          <div className="w-full">
            {/* Floating Search Bar with Animated Snake Border from event APIs */}
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* Featured Venues — Event Types Carousel */}
      <FeaturedVenuesCarousel />

      {/* Wedding Venue Highlights */}
      <HighlightsSection 
        subtitle="Wedding Signature"
        title="Wedding Venue Highlights"
        linkText="Browse all wedding venues"
        linkUrl="/wedding-venues"
        type="wedding-venue"
        theme="dark"
      />

      {/* Corporate Venue Highlights */}
      <HighlightsSection 
        subtitle="Corporate Elite"
        title="Corporate & Conference Picks"
        linkText="Browse all corporate venues"
        linkUrl="/corporate-event-venues"
        type="corporate-venue"
        theme="light"
      />

      {/* Vendor Highlights */}
      <HighlightsSection 
        subtitle="Top Rated"
        title="Featured Event Vendors"
        linkText="Browse all event vendors"
        linkUrl="/vendors"
        type="vendor"
        theme="dark"
      />

      {/* How It Works – Interactive */}
      <HowItWorksSection />

      {/* Testimonials – Interactive */}
      <TestimonialsSection />

      {/* CTA – Interactive */}
      <CTASection />
    </div>
  );
}
