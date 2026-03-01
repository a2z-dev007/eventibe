'use client'

import { useState, Fragment, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, MapPin, Calendar, Users, Home, X, Sparkles } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import PremiumDatePicker from '../ui/PremiumDatePicker'
import PremiumSelect from '../ui/PremiumSelect'
import PremiumLocationSelect from '../ui/PremiumLocationSelect'
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import { IMAGES } from '@/assets/images'

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
  const { data: venueTypesData } = useQuery({
    queryKey: ['venueTypes'],
    queryFn: () => fetchVenueTypes()
  })

  // Fetch Event Types
  const { data: eventTypesData } = useQuery({
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
    <section className="relative   flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-10 md:pt-10  bg-white">
      {/* Immersive Background Container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={IMAGES.eventHero.src}
          alt="Luxury Event Backdrop"
          className="w-full h-full object-cover object-center scale-105 animate-slow-zoom origin-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-white" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-white" />
      </div>

      <div className="relative z-10 max-w-6xl w-full text-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-white text-[11px] sm:text-sm font-medium mb-4 animate-fade-in-up">
          <span className="flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-[#FF9530] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9530]"></span>
          </span>
          India's Most Trusted Venue Booking Platform
        </div>

        {/* Hero Title */}
        <h1 className="text-[28px] sm:text-4xl lg:text-6xl font-extrabold text-white leading-tight lg:leading-[1.1] mb-4  drop-shadow-2xl animate-fade-in-up [animation-delay:200ms]">
          Craft Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9530] to-[#FFB770]">Perfect Event</span> <br className="hidden sm:block" />
          in Exceptional Spaces
        </h1>

        <p className="text-sm sm:text-xl text-white/90 max-w-2xl mx-auto mb-4 drop-shadow-md animate-fade-in-up [animation-delay:400ms]">
          From intimate gatherings to grand celebrations. Book verified venues with transparent pricing and instant confirmation.
        </p>

        {/* Floating Search Bar with Animated Snake Border */}
        <div className="relative w-full lg:max-w-6xl mx-auto z-40 p-[4px] md:p-[5px] rounded-[32px] lg:rounded-full group/search-bar overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.25)] animate-fade-in-up [animation-delay:600ms]">
           {/* Animated Snake Border Gradient (Right to Left) */}
           <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinite_reverse] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_45deg,#FF9530_90deg,transparent_135deg)]" />
           <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_180deg,transparent_225deg,#FF9530_270deg,transparent_315deg)] opacity-40" />

          <div className="bg-white/95 backdrop-blur-2xl rounded-[31px] lg:rounded-full p-2 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
            {/* Location */}
            <div className="flex-[1.8] py-4 lg:py-0">
              <PremiumLocationSelect
                value={location}
                onChange={setLocation}
                className="w-full"
                containerClassName="px-6 lg:px-5 py-2 lg:py-0"
              />
            </div>

            {/* Event Type */}
            <PremiumSelect
              label="Event Type"
              icon={<Sparkles className="w-5 h-5 text-[#FF9530]" />}
              options={eventOptions}
              value={eventType}
              onChange={setEventType}
              placeholder="Any Event"
              className="flex-1"
              containerClassName="px-6 lg:px-4 py-2 lg:py-0"
            />

            {/* Venue Type */}
            <PremiumSelect
              label="Venue Type"
              icon={<Home className="w-5 h-5 text-[#FF9530]" />}
              options={venueOptions}
              value={venueType}
              onChange={setVenueType}
              placeholder="Any Type"
              className="flex-1"
              containerClassName="px-6 lg:px-4 py-2 lg:py-0"
            />

            {/* Premium Date Picker */}
            <div className="flex-1 flex items-center px-6 lg:px-4 py-4 lg:py-0">
              <PremiumDatePicker
                selected={date}
                onChange={(d: Date | null) => setDate(d)}
                placeholder="Select Date"
                label="Date"
              />
            </div>

            {/* Guests */}
            <PremiumSelect
              label="Guests"
              icon={<Users className="w-5 h-5 text-[#FF9530]" />}
              options={guestOptions}
              value={guests}
              onChange={setGuests}
              placeholder="Guest Count"
              className="flex-1"
              containerClassName="px-6 lg:px-4 py-2 lg:py-0"
            />

            {/* Search Button */}
            <div className="p-2 lg:p-1.5 lg:pl-2">
              <button
                onClick={handleSearch}
                className="w-full lg:w-[60px] lg:h-[60px] bg-gradient-to-r from-[#FF9530] to-[#FF8000] hover:from-[#FF8000] hover:to-[#F97316] text-white rounded-2xl lg:rounded-full px-8 lg:px-0 py-2 lg:py-0 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.01] lg:hover:scale-110 active:scale-95 shadow-lg shadow-orange-500/20 group"
              >
                <Search className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-500 group-hover:rotate-12" strokeWidth={3} />
                <span className="lg:hidden tracking-tight font-bold">Find Spaces</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

      <style jsx global>{`
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
