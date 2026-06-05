'use client'

import HeroSection from '@/components/events/HeroSection'
import VenueTypesCarousel from '@/components/events/VenueTypesCarousel'
import EventTypesCarousel from '@/components/events/EventTypesCarousel'
import { FeaturedVenuesSection, WeddingVenuesSection, CorporateVenuesSection } from '@/components/events/VenueSections'
import WhySpodiaSection from '@/components/events/WhySpodiaSection'
import GoogleReviewsSection from '@/components/events/GoogleReviewsSection'
import { ClientStoriesSection, SeoContentSection, FaqSection } from '@/components/events/BottomSections'
import StatStrip from '@/components/events/StatStrip'
import WhyChooseSpodiaVenues from '@/components/events/WhyChooseSpodiaVenues'
import RecentlyAddedVenues from '@/components/events/RecentlyAddedVenues'
import TrendingVenues from '@/components/events/TrendingVenues'

export default function EventVenuesClient() {
  return (
    <>
      <main className="pt-24 lg:pt-28 bg-white">
        <HeroSection />
        <VenueTypesCarousel />
        {/* <WhyChooseSpodiaVenues /> */}
        <RecentlyAddedVenues />
        <TrendingVenues />
        <StatStrip />
        {/* <FeaturedVenuesSection /> */}
        {/* <WeddingVenuesSection /> */}
        {/* <CorporateVenuesSection /> */}
        <EventTypesCarousel />
        <WhySpodiaSection />
        <GoogleReviewsSection />
        <ClientStoriesSection />
        <SeoContentSection />
        {/* <FaqSection /> */}
      </main>
    </>
  )
}
