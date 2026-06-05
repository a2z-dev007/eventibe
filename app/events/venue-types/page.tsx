'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { 
  ChevronRight, Home as HomeIcon, LayoutGrid, Search, 
  ChevronLeft, Users, Sparkles as SparklesIcon, Calendar,
  Search as SearchIcon, ArrowRight, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import type { VenueTypeRecord } from '@/lib/api/eventsEndpoints'
import { useLenis } from 'lenis/react'
import { IMAGES } from '@/assets/images'
import PremiumSearchBar from '@/components/events/PremiumSearchBar'
import CommonHero from '@/components/common/CommonHero'

function VenueTypesContent() {
  const router = useRouter()
  const lenis = useLenis()
  const searchParams = useSearchParams()
  
  const [types, setTypes] = useState<VenueTypeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(20)

  // ── Search bar state (Shared with Event Search) ───────────────────────────
  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)

  const { data: venueTypesData } = useQuery({ queryKey: ['venueTypes'], queryFn: () => fetchVenueTypes() })
  const { data: eventTypesData } = useQuery({ queryKey: ['eventTypes'], queryFn: () => fetchEventTypes() })

  useEffect(() => {
    fetchVenueTypes()
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

  const scrollToTopListing = () => {
    if (lenis) {
      lenis.scrollTo('#type-list-section', { offset: -140 })
    } else {
      const element = document.getElementById('type-list-section')
      if (element) {
        const offset = 140
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      }
    }
  }

  const goToPage = (p: number) => {
    if (p < 1 || p > totalPages) return
    setCurrentPage(p)
    scrollToTopListing()
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <CommonHero
        badgeText="Venue Directory"
        badgeIcon="sparkles"
        titleMain="Explore Premium"
        titleHighlight="Venues"
        subtitle="Discover grand halls, scenic resorts, and intimate spaces tailored for your unique celebrations."
        bgSrc={IMAGES.listingHeroBg.src}
        bgType="image"
      >
        <div className="max-w-6xl mx-auto mt-6">
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
            handleSearch={handleTopSearch}
            eventOptions={eventOptions}
            venueOptions={venueOptions}
            guestOptions={guestOptions}
          />
        </div>
      </CommonHero>

      <div id="type-list-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white/50 backdrop-blur-xl border border-white rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-2xl shadow-gray-200/50">
          <div>
            <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#FF9530]/50 mb-3">
              <Link href="/" className="hover:text-[#FF9530] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/events" className="hover:text-[#FF9530] transition-colors">Events</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[#FF9530]">Venue List</span>
            </nav>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Browse Categories</h2>
              <span className="px-3 py-1 bg-[#FF9530]/10 text-[#FF9530] text-[10px] font-black rounded-full uppercase tracking-tighter">
                {filteredTypes.length} types found
              </span>
            </div>
          </div>

          <div className="relative group min-w-[320px]">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#FF9530] transition-colors" />
            <input 
              type="search" 
              placeholder="Search by category name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
                scrollToTopListing()
              }}
              className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-[#FF9530]/5 transition-all shadow-sm group-hover:shadow-md"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="">
                <div className="aspect-[4/5] skeleton-shimmer !rounded-[1.5rem] md:!rounded-[2rem] mb-4" />
                <div className="h-6 w-3/4 skeleton-shimmer !rounded-lg mx-auto md:mx-0" />
              </div>
            ))}
          </div>
        ) : filteredTypes.length > 0 ? (
          <>
            <AnimatePresence mode="popLayout">
              <motion.div 
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6"
              >
                {paginatedTypes.map((type, idx) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: idx * 0.03, duration: 0.5 }}
                  >
                    <Link 
                      href={`/events/search?venue_type=${type.id}`}
                      className="group block"
                    >
                      <div className="relative aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-4 shadow-xl shadow-gray-200/40 group-hover:shadow-[0_40px_80px_rgba(255,149,48,0.25)] group-hover:-translate-y-3 transition-all duration-700">
                        <img 
                          src={type.file || IMAGES.placeholder.src} 
                          alt={type.name}
                          className="w-full h-[115%] object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = IMAGES.placeholder.src
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9530]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-700" />
                        
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                           <div className="overflow-hidden">
                             <p className="text-[10px] font-black text-[#FFCF52] uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                               See Catalog
                             </p>
                           </div>
                           <div className="flex items-end justify-between gap-4">
                             <h3 className="text-white text-lg lg:text-xl font-black tracking-tight leading-tight">{type.name}</h3>
                             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                               <ArrowRight className="w-5 h-5 text-white" />
                             </div>
                           </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Custom Theme Pagination Dashboard - Always shown when results exist */}
            <div className="mt-16 md:mt-24 flex items-center justify-center">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 px-6 md:px-10 py-4 md:py-5 bg-white border border-gray-100 rounded-[2rem] md:rounded-full shadow-2xl shadow-gray-200/50 w-full max-w-fit">
                {/* Left / Page Numbers / Right */}
                <div className="flex items-center gap-2 md:gap-4">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-gray-900 disabled:opacity-30 transition-opacity p-2"
                  >
                    <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`w-9 h-9 flex items-center justify-center text-sm font-bold transition-all rounded-full ${
                            isActive 
                              ? 'bg-[#FF9530]/10 text-[#FF9530] border border-[#FF9530]/30 shadow-sm' 
                              : 'text-gray-900 hover:text-[#FF9530]'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="text-gray-900 disabled:opacity-30 transition-opacity p-1"
                  >
                    <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>

                {/* Items per page selector */}
                <div className="relative group">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value))
                      setCurrentPage(1)
                      scrollToTopListing()
                    }}
                    className="bg-transparent pl-4 pr-10 py-2.5 rounded-full border border-[#FF9530]/30 text-sm font-bold text-gray-900 cursor-pointer appearance-none outline-none hover:border-[#FF9530] transition-colors"
                  >
                    <option value={10}>10 / page</option>
                    <option value={20}>20 / page</option>
                    <option value={50}>50 / page</option>
                    <option value={100}>100 / page</option>
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="py-24 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <LayoutGrid className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">No results found</h3>
            <p className="text-gray-400 font-medium max-w-xs mx-auto">Try refining your filter or browse our other categories for inspiration.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default function VenueTypesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9530]"></div>
      </div>
    }>
      <VenueTypesContent />
    </Suspense>
  )
}
