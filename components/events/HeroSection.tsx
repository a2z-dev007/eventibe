'use client'

import { useState, Fragment, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Calendar, Users, Home, X, Sparkles } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import PremiumDatePicker from '../ui/PremiumDatePicker'
import PremiumSelect from '../ui/PremiumSelect'
import PremiumLocationSelect from '../ui/PremiumLocationSelect'
import { fetchVenueTypes, fetchEventTypes, type VenueTypesResponse, type EventTypesResponse } from '@/lib/api/eventsEndpoints'
import { IMAGES } from '@/assets/images'
import PremiumSearchBar from './PremiumSearchBar'

export default function HeroSection() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Fetch Venue Types
  const { data: venueTypesData } = useQuery<VenueTypesResponse>({
    queryKey: ['venueTypes'],
    queryFn: () => fetchVenueTypes()
  })

  // Fetch Event Types
  const { data: eventTypesData } = useQuery<EventTypesResponse>({
    queryKey: ['eventTypes'],
    queryFn: () => fetchEventTypes()
  })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Prefill from URL
  useEffect(() => {
    if (venueTypesData?.records && eventTypesData?.records) {
      const cityId = searchParams.get('city')
      const cityName = searchParams.get('cityName')
      const venueTypeId = searchParams.get('venue_type')
      const eventTypeId = searchParams.get('event_type')
      const dateStr = searchParams.get('date')
      const guestsVal = searchParams.get('guests')

      if (cityId && cityName) {
        setLocation({ value: cityId, label: cityName })
      }
      
      if (venueTypeId) {
        const found = venueTypesData.records.find(r => String(r.id) === venueTypeId)
        if (found) setVenueType({ value: found.id, label: found.name })
      }

      if (eventTypeId) {
        const found = eventTypesData.records.find(r => String(r.id) === eventTypeId)
        if (found) setEventType({ value: found.id, label: found.name })
      }

      if (dateStr) {
        setDate(new Date(dateStr))
      }

      if (guestsVal) {
        setGuests(guestOptions.find(o => o.value === guestsVal) || null)
      }
    }
  }, [searchParams, venueTypesData, eventTypesData])

  const handleSearch = () => {
    if (!location?.value) {
      toast.error('Location is required', {
        description: 'Please select a city or area to find venues.',
        duration: 3000,
      });
      return;
    }
    const params = new URLSearchParams()
    if (location?.value) {
      params.set('city', String(location.value))
      params.set('cityName', location.label)
    }
    if (venueType?.value) params.set('venue_type', String(venueType.value))
    if (eventType?.value) params.set('event_type', String(eventType.value))
    if (date) params.set('date', date.toISOString().split('T')[0])
    if (guests?.value) params.set('guests', guests.value)
    router.push(`/events/search${params.toString() ? '?' + params.toString() : ''}`)
  }

  const venueOptions = venueTypesData?.records?.map(r => ({ value: r.id, label: r.name })) || []
  const eventOptions = eventTypesData?.records?.map(r => ({ value: r.id, label: r.name })) || []
  
  const guestOptions = [
    { value: '100', label: '0-100' },
    { value: '300', label: '100-300' },
    { value: '600', label: '300-600' },
    { value: '601', label: '600+' },
  ]

  return (
    <section className="relative flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16 md:pt-28 md:pb-20 bg-white">
      {/* Immersive Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black z-0">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.5, ease: 'easeInOut' },
            scale: { duration: 10, ease: 'linear' },
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={IMAGES.eventHero.src}
            alt="Luxury Event Backdrop"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </motion.div>
        {/* Stronger gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Subtle grid pattern for added tech/modern depth */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center mt-6 md:mt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center w-full"
        >
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/15 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-bold mb-6 backdrop-blur-sm shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#FF9530] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9530]"></span>
            </span>
            <span className="uppercase tracking-widest">India's Most Trusted Venue Booking Platform</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 md:mb-6 max-w-5xl leading-tight drop-shadow-xl">
            Craft Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
              Perfect Event
            </span>{' '}
            in Exceptional Spaces
          </h1>

          <p className="text-sm md:text-xl text-white/95 mb-8 md:mb-10 max-w-3xl font-medium drop-shadow-md leading-relaxed">
            From intimate gatherings to grand celebrations. Book verified venues with transparent pricing and instant confirmation.
          </p>

          {/* Reusable Search Bar with Snake Border */}
          <div className="w-full">
            <PremiumSearchBar
              location={location}
              setLocation={setLocation}
              eventType={eventType}
              setEventType={setEventType}
              venueType={venueType}
              setVenueType={setVenueType}
              date={date}
              setDate={setDate}
              guests={guests}
              setGuests={setGuests}
              handleSearch={handleSearch}
              eventOptions={eventOptions}
              venueOptions={venueOptions}
              guestOptions={guestOptions}
              className="lg:max-w-6xl"
              requiredLocation={true}
            />
          </div>
        </motion.div>
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
