'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { 
  Users, Utensils, ShieldCheck, LayoutGrid
} from 'lucide-react'

// Layout & UI Components
import Header from '@/components/Header'

import { 
  fetchVenueBySlug, 
  VenuesResponse, 
  VenueRecord,
} from '@/lib/api/eventsEndpoints'
import { EventQuoteModal } from './EventQuoteModal'
import { Lightbox, useLightbox } from '@/components/ui/Lightbox'
import { IMAGE_BASE_URL } from '@/lib/api/apiClient'
import { IMAGES } from '@/assets/images'
import { ClientStoriesSection, FaqSection, SeoContentSection } from '../BottomSections'

// Extracted Components
import { DetailSkeleton, ErrorState } from './SharedComponents'
import { EventHero } from './EventHero'
import { EventStickyNav } from './EventStickyNav'
import { EventGallery } from './EventGallery'
import { EventVideoTour } from './EventVideoTour'
import { EventStats } from './EventStats'
import { EventDescription } from './EventDescription'
import { EventSeatingLayouts } from './EventSeatingLayouts'
import { EventAmenities } from './EventAmenities'
import { EventPricingCard } from './EventPricingCard'
import { EventConcierge } from './EventConcierge'
import { EventPolicies } from './EventPolicies'
import { EventCuisine } from './EventCuisine'
import { EventLocation } from './EventLocation'
import { EventSpeedDial } from './EventSpeedDial'
import { EventVideoModal } from './EventVideoModal'

// ── Main Page Component ────────────────────────────────────────────────────────

export function EventDetailsPage() {
  const { slug } = useParams()
  
  const { data, isLoading, isError } = useQuery<VenuesResponse>({
    queryKey: ['venue', slug],
    queryFn: () => fetchVenueBySlug(slug as string),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  })
  
  const { isOpen, images: lightboxImages, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox()
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Auto-play hero slideshow
  useEffect(() => {
    if (!data?.records?.[0]?.images?.length) return
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % Math.min(data.records[0].images!.length, 5))
    }, 6000)
    return () => clearInterval(timer)
  }, [data])

  // Scroll detection for active tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['gallery', 'overview', 'amenities', 'policies', 'cuisines', 'location', 'stories', 'faqs', 'about']
      const currentSection = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 172 && rect.bottom >= 172
        }
        return false
      })
      if (currentSection) setActiveTab(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const videoUrl = useMemo(() => {
    const targetVenue = data?.records?.[0];
    if (!targetVenue) return null;

    const videoSource = (targetVenue as any).videos || (targetVenue as any).video_details || (targetVenue as any).video;
    
    // Search for the first valid-looking video source in the array
    if (Array.isArray(videoSource)) {
      for (const item of videoSource) {
        const url = item?.video_url || item?.url || (typeof item === 'string' ? item : null);
        if (url && url.length > 5) return url;
      }
      return null;
    }

    const videoObj = videoSource;
    return videoObj?.video_url || videoObj?.url || (typeof videoObj === 'string' ? videoObj : null);
  }, [data?.records?.[0]]);

  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return IMAGES.placeholder.src
    if (path.startsWith('http')) return path
    return `${IMAGE_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 172,
        behavior: 'smooth'
      })
    }
  }

  const venue = data?.records?.[0] as VenueRecord
  const venueTitle = venue?.name 
  const venueLoc = venue?.address || `${venue?.city_name || ''}, ${venue?.state_name || ''}`.trim() || "Location not available"
  
  const packageDetail = venue?.package_details?.find((p) => p.name?.toLowerCase().includes('veg')) || venue?.package_details?.[0]
  const packagePrice = Number(packageDetail?.price || 2500)

  const venueImagesList = React.useMemo(() => (venue?.images || []).map(img => getImageUrl(img.file)), [venue?.images])
  const heroSlideImages = React.useMemo(() => venueImagesList.slice(0, 5), [venueImagesList])

  const coreStats = React.useMemo(() => [
    { icon: <Users className="w-5 h-5" />, label: "Capacity", value: venue?.capacity ? String(venue.capacity) : "500-1500 PAX" },
    { icon: <LayoutGrid className="w-5 h-5" />, label: "Space Type", value: String((venue as any)?.venue_type_details?.[0]?.name || "Venue") },
    { icon: <Utensils className="w-5 h-5" />, label: "Cuisine", value: String((venue as any)?.cuisine_details?.[0]?.name || "Global") },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Status", value: "Verified" },
  ], [venue])

  const phoneNum = venue?.contact_details?.[0]?.mobile || ""
  const whatsappLink = `https://wa.me/${phoneNum.replace(/[^0-9]/g, '')}`

  return (
    <div className="min-h-screen bg-white">
    

      {isLoading ? (
        <DetailSkeleton />
      ) : isError || !venue ? (
        <ErrorState />
      ) : (
        <>
          <EventHero 
            currentHeroIdx={currentHeroIdx}
            setCurrentHeroIdx={setCurrentHeroIdx}
            heroSlideImages={heroSlideImages}
            venueTitle={venueTitle}
            venueRating={(venue as any).rating}
            venueLoc={venueLoc}
            venueImagesLength={venueImagesList.length}
            openLightbox={openLightbox}
            venueImagesList={venueImagesList}
            scrollToSection={scrollToSection}
          />

          <EventStickyNav 
            activeTab={activeTab}
            scrollToSection={scrollToSection}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <EventGallery 
              venueImagesList={venueImagesList}
              openLightbox={openLightbox}
            />

            <EventVideoTour videoUrl={videoUrl} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-8 md:gap-12 lg:gap-20">
              
              <div className="space-y-10 md:space-y-16 lg:space-y-20 bg-white">
                <section className="scroll-mt-32">
                  <EventStats coreStats={coreStats} />
                  
                  <EventDescription 
                    description={venue.description || ""}
                    venueTags={(venue as any).venue_type}
                    eventTags={(venue as any).event_type}
                  />
                  
                  <EventSeatingLayouts 
                    venueConfigurations={(venue as any).venue_configuration}
                    getImageUrl={getImageUrl}
                  />
                </section>

                <EventAmenities 
                  highlights={venue.highlights_details || []}
                  amenities={(venue as any).amenities_details || []}
                  services={venue.services_details || []}
                  venueTitle={venueTitle}
                />
              </div>

              <aside className="relative">
                <div className="sticky top-[150px] space-y-8">
                  <EventPricingCard 
                    packagePrice={packagePrice}
                    packageDetails={(venue as any).package_details || []}
                    getImageUrl={getImageUrl}
                    setQuoteOpen={setQuoteOpen}
                  />

                  <EventConcierge contacts={venue.contact_details || []} />
                </div>
              </aside>
            </div>

            <EventPolicies 
              policies={venue.terms_conditions_details || []}
              setQuoteOpen={setQuoteOpen}
            />

            <EventCuisine 
              cuisines={venue.cuisine_details || []}
              menus={(venue as any).menu_details || []}
              getImageUrl={getImageUrl}
            />
          </main>

          <EventLocation 
            venueTitle={venueTitle}
            venueLoc={venueLoc}
            lat={venue.lat}
            lon={venue.lon}
          />

          <EventSpeedDial 
            whatsappLink={whatsappLink}
            phoneNum={phoneNum}
            setQuoteOpen={setQuoteOpen}
          />

          <div id="stories" className="scroll-mt-32">
            <ClientStoriesSection />
          </div>
          <div id="faqs" className="scroll-mt-32">
            <FaqSection />
          </div>
          <div id="about" className="scroll-mt-32">
            <SeoContentSection />
          </div>
       
          <Lightbox images={lightboxImages} isOpen={isOpen} currentIndex={currentIndex} onClose={closeLightbox} onIndexChange={setIndex} />
          <EventQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} initialVenueId={venue.id} />

          <EventVideoModal 
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrl={videoUrl}
          />
        </>
      )}
    </div>
  )
}
