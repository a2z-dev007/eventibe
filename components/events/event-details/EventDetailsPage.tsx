'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { useLenis } from 'lenis/react'
import {
  Utensils, ShieldCheck
} from 'lucide-react'



import {
  fetchVenueBySlug,
  VenuesResponse,
  VenueRecord,
} from '@/lib/api/eventsEndpoints'
import { EventQuoteModal } from './EventQuoteModal'
import { EventEnquirySidebarForm } from './EventEnquirySidebarForm'
import { Lightbox, useLightbox } from '@/components/ui/Lightbox'
import { IMAGE_BASE_URL } from '@/lib/api/apiClient'
import { IMAGES } from '@/assets/images'
import { ClientStoriesSection, FaqSection } from '../BottomSections'

// Extracted Components
import { DetailSkeleton, ErrorState } from './SharedComponents'
import { EventHero } from './EventHero'
import { EventGallery } from './EventGallery'
import { VenueHeaderInfo } from './VenueHeaderInfo'
import { EventStats } from './EventStats'
import { EventDescription } from './EventDescription'
import { EventSeatingLayouts } from './EventSeatingLayouts'
import { EventAmenities } from './EventAmenities'
import { EventPackages } from './EventPackages'
import { EventConcierge } from './EventConcierge'
import { EventPolicies } from './EventPolicies'
import { EventCuisine } from './EventCuisine'
import { EventLocation } from './EventLocation'
import { EventLandmarks } from './EventLandmarks'
import { EventVenueInfo } from './EventVenueInfo'
import { EventDetailedSpecs } from './EventDetailedSpecs'
import { EventSpeedDial } from './EventSpeedDial'
import { VideoLightbox } from '@/components/ui/VideoLightbox'

import { CONTACT_INFO } from '@/utils/const'

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
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0)
  const lenis = useLenis()

  // Auto-play hero slideshow
  useEffect(() => {
    if (!data?.records?.[0]?.images?.length) return
    const timer = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % Math.min(data.records[0].images!.length, 5))
    }, 6000)
    return () => clearInterval(timer)
  }, [data])

  // Listen for package selection to open quote modal
  useEffect(() => {
    const handleOpenQuote = () => setQuoteOpen(true);
    window.addEventListener('OPEN_QUOTE_MODAL', handleOpenQuote);
    return () => window.removeEventListener('OPEN_QUOTE_MODAL', handleOpenQuote);
  }, []);

  const videoList = useMemo(() => {
    const targetVenue = data?.records?.[0];
    if (!targetVenue) return [];

    const videoSource = (targetVenue as any).videos || (targetVenue as any).video_details || (targetVenue as any).video;

    if (Array.isArray(videoSource)) {
      return videoSource
        .map(item => item?.video_url || item?.url || (typeof item === 'string' ? item : null))
        .filter(url => url && url.length > 5) as string[];
    }

    const singleVideo = videoSource?.video_url || videoSource?.url || (typeof videoSource === 'string' ? videoSource : null);
    return singleVideo ? [singleVideo as string] : [];
  }, [data?.records?.[0]]);

  const videoUrl = videoList[0] || null;

  const getImageUrl = (path: string | null | undefined) => {
    if (!path) return IMAGES.placeholder.src
    if (path.startsWith('http')) return path
    return `${IMAGE_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el && lenis) {
      lenis.scrollTo(el, {
        offset: -142,
        duration: 1.5,
      })
    } else if (el) {
      // Fallback
      window.scrollTo({
        top: el.offsetTop - 142,
        behavior: 'smooth'
      })
    }
  }

  const venue = data?.records?.[0] as VenueRecord
  const venueTitle = venue?.name
  // Location logic - User wants Area, City, State, Country and NOT address key
  const locParts = [
    (venue as any)?.location_name,
    venue?.city_name,
    venue?.state_name,
    venue?.country_name
  ].filter(val => val && val !== 'null');

  const heroLoc = locParts.length > 0 ? locParts.join(', ') : (venue?.address || venue?.location_name || "Location not available");
  const venueLoc = venue?.address ? venue?.address : (venue?.location_name || "Location not available");
  const location = venue?.location_name;

  const packageDetail = venue?.package_details?.find((p) => p.name?.toLowerCase().includes('veg')) || venue?.package_details?.[0]
  const packagePrice = Number(packageDetail?.price || 2500)

  const venueImagesList = React.useMemo(() => (venue?.images || []).map(img => getImageUrl(img.file)), [venue?.images])
  const heroSlideImages = React.useMemo(() => venueImagesList?.slice(0, 5), [venueImagesList])

  const venueCity = venue?.city_name || ''

  const phoneNum = CONTACT_INFO.mobile2
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
            venueLoc={heroLoc}
            venueLocation={location}
            venueImagesLength={venueImagesList.length}
            openLightbox={openLightbox}
            venueImagesList={venueImagesList}
            scrollToSection={scrollToSection}
            eventTypes={(venue as any).event_type || (venue as any).event_type_details || []}
            videoCount={videoList.length}
            onWatchVideo={() => {
              setCurrentVideoIdx(0);
              setIsVideoModalOpen(true);
            }}
          />

          <div className="pt-2 md:pt-4" />

          <main className="w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:pt-3 md-pb-12 max-w-[1600px] mx-auto">
            <VenueHeaderInfo
              venueName={venueTitle || ""}
              venueLoc={venueLoc}
              onSelection={() => setQuoteOpen(true)}
            />
            <EventGallery
              venueImagesList={venueImagesList}
              venueVideosList={videoList}
              openLightbox={openLightbox}
              openVideoModal={(idx: number) => {
                setCurrentVideoIdx(idx);
                setIsVideoModalOpen(true);
              }}
            />


            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8 md:mt-12">
              <div className="flex-1 min-w-0 space-y-8 md:space-y-8 bg-white">
                <section className="scroll-mt-[142px]">
                  <EventStats venue={venue} />

                  <EventDescription
                    description={venue.description || ""}
                    venueTags={(venue as any).venue_type}
                    eventTags={(venue as any).event_type}
                    venueCity={venueCity}
                    venueName={venueTitle || ''}
                  />

                  <EventSeatingLayouts
                    venueConfigurations={(venue as any).venue_configuration}
                    getImageUrl={getImageUrl}
                    venueTitle={venueTitle || ''}
                    venueLoc={venueCity || ''}
                  />
                </section>


              </div>

              {/* Sidebar Enquiry Form */}
              <div className="hidden lg:block w-[400px] xl:w-[420px] shrink-0">
                <div className="sticky top-24">
                  <EventEnquirySidebarForm venueName={venueTitle || ''} venueId={venue?.id} />
                </div>
              </div>
            </div>
          </main>

          <div className='w-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 md:py-12 max-w-[1600px] mx-auto space-y-16'>
            <EventPackages
              packages={(venue as any).package_details || []}
              getImageUrl={getImageUrl}
              venueTitle={venueTitle || ""}
            />

            <EventAmenities
              highlights={venue.highlights_details || []}
              amenities={(venue as any).amenities_details || []}
              services={venue.services_details || []}
              venueTitle={venueTitle || ''}
              venueLoc={venueCity || ''}
            />


            <EventCuisine
              cuisines={venue.cuisine_details || []}
              menus={(venue as any).menu_details || []}
              getImageUrl={getImageUrl}
              venueTitle={venueTitle || ''}
              venueLoc={venueCity || ''}
            />

            <EventPolicies
              policies={venue.terms_conditions_details || []}
              setQuoteOpen={setQuoteOpen}
              venueTitle={venueTitle || ''}
              venueLoc={venueCity || ''}
            />

          </div>

          <EventVenueInfo
            venueId={venue.id}
            venueTitle={venueTitle || ''}
            venueLoc={venueLoc}
            venueCity={venueCity || ''}
          />

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

          <ClientStoriesSection />
          <FaqSection venueId={venue.id} />
          <div id="landmarks" className="scroll-mt-[142px]">
            <EventLandmarks
              venueId={venue.id}
              venueTitle={venueTitle || ''}
              venueLoc={venueLoc}
              venueCity={venueCity || ''}
            />
          </div>

          <div className="px-4 sm:px-6 md:px-12 lg:px-20 max-w-[1600px] mx-auto pb-16">
            <EventDetailedSpecs content={(venue as any).content} />
          </div>



          <Lightbox images={lightboxImages} isOpen={isOpen} currentIndex={currentIndex} onClose={closeLightbox} onIndexChange={setIndex} />
          <EventQuoteModal
            isOpen={quoteOpen}
            onClose={() => setQuoteOpen(false)}
            initialVenueId={venue.id}
            venueName={venueTitle || ''}
            venueType={String((venue as any)?.venue_type_details?.[0]?.name || "Venue")}
          />

          <VideoLightbox
            isOpen={isVideoModalOpen}
            onClose={() => setIsVideoModalOpen(false)}
            videoUrls={videoList}
            initialIndex={currentVideoIdx}
          />
        </>
      )}
    </div>
  )
}
