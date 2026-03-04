'use client'

import Header from '@/components/Header'
import VenueTypesCarousel from '@/components/events/VenueTypesCarousel'
import EventTypesCarousel from '@/components/events/EventTypesCarousel'
import { FeaturedVenuesSection, WeddingVenuesSection, CorporateVenuesSection } from '@/components/events/VenueSections'
import WhySpodiaSection from '@/components/events/WhySpodiaSection'
import GoogleReviewsSection from '@/components/events/GoogleReviewsSection'
import { ClientStoriesSection, SeoContentSection, FaqSection, SeoLinksSection } from '@/components/events/BottomSections'
import StatStrip from '@/components/events/StatStrip'

export default function EventVenuesClient() {
  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-28 bg-white">
        <VenueTypesCarousel />
        <StatStrip />
        <FeaturedVenuesSection />
        <WeddingVenuesSection />
        <CorporateVenuesSection />
        <EventTypesCarousel />
        <WhySpodiaSection />
        <GoogleReviewsSection />
        <ClientStoriesSection />
        <SeoContentSection />
        <FaqSection />
        <SeoLinksSection />
      </main>
    </>
  )
}
