'use client'

import { useState, useEffect, Suspense } from 'react'
import Header from '@/components/Header'
import Link from 'next/link'
import { 
  ChevronRight, Home as HomeIcon, LayoutGrid, Search, 
  ChevronLeft, Users, Sparkles as SparklesIcon, Calendar,
  Search as SearchIcon
} from 'lucide-react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import type { EventTypeRecord } from '@/lib/api/eventsEndpoints'
import { IMAGES } from '@/assets/images'
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect'
import PremiumSelect from '@/components/ui/PremiumSelect'
import PremiumDatePicker from '@/components/ui/PremiumDatePicker'

function EventTypesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [types, setTypes] = useState<EventTypeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // ── Search bar state (Shared with Event Search) ───────────────────────────
  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)

  const { data: venueTypesData } = useQuery({ queryKey: ['venueTypes'], queryFn: () => fetchVenueTypes() })
  const { data: eventTypesData } = useQuery({ queryKey: ['eventTypes'], queryFn: () => fetchEventTypes() })

  useEffect(() => {
    fetchEventTypes()
      .then(res => {
        if (res.records) setTypes(res.records)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleTopSearch = () => {
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

  const filteredTypes = types.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTypes.length / itemsPerPage)
  const paginatedTypes = filteredTypes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return
    setCurrentPage(p)
    const element = document.getElementById('experience-list-section')
    if (element) {
        const offset = 100
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      {/* Premium Hero with Shared Search */}
      <div 
        className="relative bg-cover bg-center bg-no-repeat pt-36 pb-20 lg:pt-48 lg:pb-32 px-4 md:px-8"
        style={{
          backgroundImage: `url(${IMAGES.listingHeroBg.src})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
              Celebrate Every <span className="text-[#FF9530]">Moment</span>
            </h1>
            <p className="text-white/80 text-lg lg:text-xl font-medium max-w-2xl mx-auto drop-shadow">
              From luxury weddings to high-stakes corporate summits, find venues designed for your specific needs.
            </p>
          </div>

          {/* Shared Search Bar */}
          <div className="bg-white rounded-2xl lg:rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.3)] p-2 flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 w-full animate-fade-in-up">
            <PremiumLocationSelect
              value={location}
              onChange={setLocation}
              className="flex-[1.5]"
              containerClassName="px-4 py-3 lg:py-0"
              placeholder="Where is the event?"
            />
            <PremiumSelect
              label="Event Type"
              icon={<SparklesIcon className="w-5 h-5 text-[#FF9530]" />}
              options={eventOptions}
              value={eventType}
              onChange={setEventType}
              placeholder="Any Event"
              className="flex-1"
              containerClassName="px-4 py-3 lg:py-0"
            />
            <PremiumSelect
              label="Venue Type"
              icon={<HomeIcon className="w-5 h-5 text-[#FF9530]" />}
              options={venueOptions}
              value={venueType}
              onChange={setVenueType}
              placeholder="Any Type"
              className="flex-1"
              containerClassName="px-4 py-3 lg:py-0"
            />
            <PremiumDatePicker
              label="Event Date"
              selected={date}
              onChange={setDate}
              className="flex-1"
              containerClassName="px-4 py-3 lg:py-0"
            />
            <PremiumSelect
              label="Guests"
              icon={<Users className="w-5 h-5 text-[#FF9530]" />}
              options={guestOptions}
              value={guests}
              onChange={setGuests}
              placeholder="Pax Count"
              className="flex-1"
              containerClassName="px-4 py-3 lg:py-0"
            />
            <div className="">
              <button
                onClick={handleTopSearch}
                className="w-full lg:w-[60px] h-14 lg:h-[60px] bg-[#FF9530] hover:bg-[#FF8000] text-white rounded-2xl lg:rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/30 group py-4 lg:py-0"
              >
                <SearchIcon className="w-5 h-5 transition-transform group-hover:rotate-12 duration-500" />
                <span className="lg:hidden ml-2.5 font-bold uppercase tracking-wider text-sm">Search Venues</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="experience-list-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <nav className="flex items-center gap-2 text-sm font-bold text-gray-400">
            <Link href="/" className="hover:text-[#FF9530] transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/events" className="hover:text-[#FF9530] transition-colors">Events</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Event Types</span>
          </nav>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#FF9530] transition-colors" />
            <input 
              type="text" 
              placeholder="Filter experiences..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#FF9530]/5 transition-all shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 rounded-[2.5rem] mb-4" />
                <div className="h-6 w-3/4 bg-gray-200 rounded-lg mx-auto md:mx-0" />
              </div>
            ))}
          </div>
        ) : filteredTypes.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
              {paginatedTypes.map((type) => (
                <Link 
                  key={type.id} 
                  href={`/events/search?event_type=${type.id}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl shadow-gray-200/40 group-hover:shadow-[0_20px_50px_rgba(255,149,48,0.2)] group-hover:-translate-y-2 transition-all duration-500">
                    <img 
                      src={type.file || ''} 
                      alt={type.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="absolute bottom-6 left-6 right-6">
                       <p className="text-[10px] font-black text-[#FF9530] uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                         View Collection
                       </p>
                       <h3 className="text-white text-xl font-black tracking-tight">{type.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination with Next/Prev */}
            {totalPages > 1 && (
              <div className="mt-24 flex items-center justify-center gap-4">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                      : 'bg-white text-gray-900 border border-gray-100 hover:border-[#FF9530] hover:text-[#FF9530] shadow-xl shadow-gray-200/50 hover:-translate-x-1 active:scale-95'
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`hidden sm:flex items-center justify-center w-14 h-14 rounded-2xl font-black text-sm transition-all duration-300 ${
                        currentPage === i + 1 
                          ? 'bg-[#FF9530] text-white shadow-xl shadow-orange-500/30 scale-110' 
                          : 'bg-white text-gray-400 border border-gray-100 hover:border-[#FF9530] hover:text-[#FF9530] active:scale-95'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <div className="sm:hidden bg-white px-6 py-4 rounded-2xl border border-gray-100 font-bold text-sm">
                    {currentPage} / {totalPages}
                  </div>
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                    currentPage === totalPages 
                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed shadow-none' 
                      : 'bg-white text-gray-900 border border-gray-100 hover:border-[#FF9530] hover:text-[#FF9530] shadow-xl shadow-gray-200/50 hover:translate-x-1 active:scale-95'
                  }`}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SparklesIcon className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">No event types found</h3>
            <p className="text-gray-500 font-medium">Try adjusting your search to find what you're looking for.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function EventTypesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9530]"></div>
      </div>
    }>
      <EventTypesContent />
    </Suspense>
  )
}
