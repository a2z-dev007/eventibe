import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import Header from '@/components/Header'
import { IMAGES } from '@/assets/images'
import { searchVenues, fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect'
import PremiumSelect from '@/components/ui/PremiumSelect'
import PremiumDatePicker from '@/components/ui/PremiumDatePicker'
import { MapPin, Home, Sparkles, Users, Search as SearchIcon, SlidersHorizontal, ChevronRight } from 'lucide-react'

import type { Filters, Venue } from './types'
import { PER_PAGE } from './data'
import { VenueResultCard } from './VenueResultCard'
import { VenueFilterSidebar } from './VenueFilterSidebar'

import { useDebounce } from '@/hooks/useDebounce'

export function VenueSearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // ── UI state ────────────────────────────────────────────────────────────────
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [sort, setSort] = useState('recommended')

  // ── Search bar state (pre-filled from URL params) ───────────────────────────
  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)

  // Fetch Metadata for Labels
  const { data: venueTypesData } = useQuery({
    queryKey: ['venueTypes'],
    queryFn: () => fetchVenueTypes()
  })
  const { data: eventTypesData } = useQuery({
    queryKey: ['eventTypes'],
    queryFn: () => fetchEventTypes()
  })

  const [filtersState, setFiltersState] = useState<Filters>({
    location: '',
    venueTypes: [],
    eventTypes: [],
    minCap: 0,
    maxCap: 10000,
    minVeg: 0,
    maxVeg: 5000,
  })

  // Debouncing for Sliders & Text Search
  const debouncedFilters = useDebounce(filtersState, 500)
  const debouncedLocationValue = useDebounce(location?.value, 500)

  // Prefill from URL (also update filtersState)
  useEffect(() => {
    if (venueTypesData?.records && eventTypesData?.records) {
      const cityId = searchParams.get('city')
      const cityName = searchParams.get('cityName')
      const vtId = searchParams.get('venue_type')
      const etId = searchParams.get('event_type')
      const dStr = searchParams.get('date')
      const gVal = searchParams.get('guests')

      if (cityId && cityName) setLocation({ value: cityId, label: cityName })
      
      const newFilters = { ...filtersState }
      if (vtId) {
        const found = venueTypesData.records.find(r => String(r.id) === vtId)
        if (found) {
          setVenueType({ value: found.id, label: found.name })
          newFilters.venueTypes = [found.id]
        }
      }
      if (etId) {
        const found = eventTypesData.records.find(r => String(r.id) === etId)
        if (found) {
          setEventType({ value: found.id, label: found.name })
          newFilters.eventTypes = [found.id]
        }
      }
      if (dStr) setDate(new Date(dStr))
      if (gVal) {
        const opt = guestOptions.find(o => o.value === gVal)
        if (opt) setGuests(opt)
      }
      setFiltersState(newFilters)
    }
  }, [searchParams, venueTypesData, eventTypesData])

  const guestOptions = [
    { value: '100', label: '0-100' },
    { value: '300', label: '100-300' },
    { value: '600', label: '300-600' },
    { value: '601', label: '600+' },
  ]

  const venueOptions = venueTypesData?.records?.map(r => ({ value: r.id, label: r.name })) || []
  const eventOptions = eventTypesData?.records?.map(r => ({ value: r.id, label: r.name })) || []

  const updateFilters = (partial: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }))
    setPage(1)
  }

  const filters: Filters = {
    ...filtersState,
    location: location?.label || filtersState.location,
  }

  // ── API Data Fetching ──────────────────────────────────────────────────────
  const { data, isLoading, isError } = useQuery({
    queryKey: ['venues', page, debouncedLocationValue, venueType?.value, eventType?.value, debouncedFilters.venueTypes, debouncedFilters.eventTypes, debouncedFilters.minCap, debouncedFilters.maxCap, debouncedFilters.minVeg, debouncedFilters.maxVeg],
    queryFn: () => searchVenues({
      page_number: page,
      number_of_records: PER_PAGE,
      city: debouncedLocationValue,
      // Priority: sidebar checkboxes if present, else top dropdown
      venue_type: debouncedFilters.venueTypes.length > 0 ? debouncedFilters.venueTypes.join(',') : (venueType?.value || ''),
      event_type: debouncedFilters.eventTypes.length > 0 ? debouncedFilters.eventTypes.join(',') : (eventType?.value || ''),
    }),
    placeholderData: (previousData) => previousData
  })

  const results = data?.records || []
  const totalRecords = data?.totalRecords || 0
  const totalPages = Math.max(1, Math.ceil(totalRecords / PER_PAGE))
  const locationLabel = location?.label || 'India'

  const clearFilters = () => {
    setLocation(null); setVenueType(null); setEventType(null); setDate(null); setGuests(null)
    setFiltersState({
      location: '',
      venueTypes: [],
      eventTypes: [],
      minCap: 0,
      maxCap: 10000,
      minVeg: 0,
      maxVeg: 5000,
    })
    setPage(1)
    router.push('/events/search')
  }

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
    params.set('page', '1')
    setPage(1)
    router.push(`/events/search${params.toString() ? '?' + params.toString() : ''}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) params.set('page', String(page))
    else params.delete('page')
  }, [page, searchParams])

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <div
        className="relative  bg-cover bg-center bg-no-repeat flex items-center justify-center md:pt-36 pt-28 pb-10 lg:pt-40  px-4 md:px-8"
        style={{
          backgroundImage: `url(${IMAGES.listingHeroBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl">
          <h1 className="text-white font-extrabold text-2xl sm:text-3xl mb-5 drop-shadow  md:text-left text-center">
            Banquet Halls &amp; Event Venues in {locationLabel}
          </h1>

          {/* Premium Search Bar Integration */}
          <div className="bg-white rounded-2xl lg:rounded-full shadow-2xl p-2 flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 w-full">
            
            <PremiumLocationSelect
              value={location}
              onChange={setLocation}
              className="flex-[1.5]"
              containerClassName="px-4 py-3 lg:py-0"
              placeholder="Where is the event?"
            />

            <PremiumSelect
              label="Event Type"
              icon={<Sparkles className="w-5 h-5 text-[#FF9530]" />}
              options={eventOptions}
              value={eventType}
              onChange={setEventType}
              placeholder="Any Event"
              className="flex-1"
              containerClassName="px-4 py-3 lg:py-0"
            />

            <PremiumSelect
              label="Venue Type"
              icon={<Home className="w-5 h-5 text-[#FF9530]" />}
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

      {/* ── Results container ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">

        {/* Sub-header row */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm sm:text-base text-gray-600">{totalRecords} venues found</p>
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile filter btn */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#FF9530] hover:bg-[#e8851c] text-white font-semibold rounded-full px-4 py-2.5 text-sm shadow-md transition-all active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              Filters
            </button>
            {/* Sort */}
            <select
              value={sort}
              onChange={e => { setSort(e.target.value); setPage(1) }}
              className="border border-gray-200 bg-white text-gray-700 font-semibold rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9530]/30 shadow-sm cursor-pointer"
            >
              <option value="recommended">Sort: Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="low-high">Price: Low → High</option>
              <option value="high-low">Price: High → Low</option>
              <option value="capacity-high">Capacity: High → Low</option>
            </select>
          </div>
        </div>

        {/* Mobile sidebar bottom-sheet */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-[99] bg-black/50"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden flex flex-col"
              onClick={e => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b px-4 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-gray-900">Filter Venues</h3>
                <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <VenueFilterSidebar filters={filters} location={location} setLocation={setLocation} onChange={updateFilters} onClear={clearFilters} />
              </div>
              <div className="sticky bottom-0 bg-white border-t px-4 py-4 flex gap-3">
                <button onClick={clearFilters} className="flex-1 border border-[#FF9530] text-[#FF9530] hover:bg-[#FF9530]/10 font-semibold rounded-xl py-2.5 text-sm transition-colors">
                  Clear All
                </button>
                <button onClick={() => setSidebarOpen(false)} className="flex-1 gradient-btn text-white font-semibold rounded-xl py-2.5 text-sm">
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Grid: sidebar (col-1) + results (col-3) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Desktop sticky sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <VenueFilterSidebar filters={filters} location={location} setLocation={setLocation} onChange={updateFilters} onClear={clearFilters} />
            </div>
          </div>

          {/* Venue cards */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex flex-col gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row h-auto md:min-h-[320px] animate-pulse">
                    <div className="md:w-80 lg:w-96 shrink-0 aspect-[4/3] md:aspect-auto bg-gray-200" />
                    <div className="flex-1 p-6 lg:p-7 flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 space-y-2">
                             <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
                             <div className="h-4 w-1/2 bg-gray-100 rounded-lg" />
                          </div>
                          <div className="w-12 h-12 bg-gray-200 rounded-2xl" />
                        </div>
                        <div className="h-10 w-full bg-gray-50 rounded-xl" />
                        <div className="flex gap-2">
                          <div className="h-6 w-20 bg-gray-100 rounded-full" />
                          <div className="h-6 w-20 bg-gray-100 rounded-full" />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-8 border-t border-gray-50 pt-5">
                        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
                        <div className="flex gap-3 w-full sm:w-auto">
                           <div className="h-12 flex-1 sm:w-32 bg-gray-100 rounded-2xl" />
                           <div className="h-12 flex-1 sm:w-40 bg-gray-200 rounded-2xl" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <p className="text-4xl mb-3">⚠️</p>
                <h3 className="font-extrabold text-gray-900 text-lg mb-1">Error loading venues</h3>
                <p className="text-gray-500 text-sm">Please try again later.</p>
              </div>
            ) : results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <p className="text-4xl mb-3">🔍</p>
                <h3 className="font-extrabold text-gray-900 text-lg mb-1">No venues found</h3>
                <p className="text-gray-500 text-sm">Try relaxing your filters or searching a different location.</p>
                <button onClick={clearFilters} className="mt-4 gradient-btn text-white font-semibold rounded-full px-6 py-2.5 text-sm hover:scale-105 transition-transform">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {results.map((v: any) => <VenueResultCard key={v.id || v.name} venue={v} />)}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
                <p className="text-sm text-gray-500 font-medium">
                  Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, totalRecords)} of {totalRecords} venues
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled={page === 1}
                    onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40 hover:border-[#FF9530] hover:text-[#FF9530] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => { setPage(pageNum); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className={`w-8 h-8 rounded-lg text-sm font-bold transition-all ${pageNum === page ? 'gradient-btn text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:border-[#FF9530] hover:text-[#FF9530]'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && <span className="text-gray-400 mx-1">...</span>}
                  <button
                    disabled={page === totalPages}
                    onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className="w-8 h-8 rounded-lg border border-gray-200 text-gray-600 flex items-center justify-center disabled:opacity-40 hover:border-[#FF9530] hover:text-[#FF9530] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Average ratings & reviews — full-width below grid ── */}
        <section className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5">
            Average Rating &amp; Reviews for Venues in {locationLabel}
          </h2>
          <div className="flex items-center gap-6 pb-5 border-b border-dashed border-gray-200">
            <div>
              <p className="text-5xl font-extrabold text-[#0c9a49] leading-none">4.1</p>
              <p className="text-gray-400 text-sm font-semibold mt-0.5">/5</p>
            </div>
            <div>
              <div className="flex gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <svg key={i} className={`w-5 h-5 ${i <= 4 ? 'text-[#0c9a49]' : 'text-gray-200'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.922-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.196-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 font-bold">905 Ratings &amp; Reviews</p>
              <p className="text-gray-400 text-xs italic mt-0.5">Last review updated on 2026-01-12</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {[
              { venue: 'The Legacy Banquet', rating: 5, reviewer: 'XXXXXXXX3559', date: '12 Jan 2026', text: 'Beautiful venue and wonderful service — will highly recommend.' },
              { venue: 'Fairfield Convention', rating: 5, reviewer: 'XXXXXXXX7112', date: '08 Jan 2026', text: 'Great experience, quick and smooth from booking to event day.' },
              { venue: 'Orchid Lawn & Hall', rating: 5, reviewer: 'XXXXXXXX2923', date: '08 Jan 2026', text: "I'd like to express my heartfelt thanks to the team for their continuous support throughout the entire event journey." },
              { venue: 'The Circle Club', rating: 5, reviewer: 'XXXXXXXX5540', date: '07 Jan 2026', text: 'Booked lawn and banquet for marriage function and everything was smooth and professionally managed.' },
            ].map(r => (
              <div key={r.reviewer} className="border-t border-dashed border-gray-200 pt-4">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <Link href="#" className="font-bold text-gray-900 hover:text-[#FF9530] transition-colors">{r.venue}</Link>
                  <span className="text-[#078ED8] text-xs font-bold">✓ Verified</span>
                  <span className="bg-[#0eb488] text-white text-xs font-bold rounded px-2 py-0.5">{r.rating}/5</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">Reviewed by: {r.reviewer} | Event: {r.date}</p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">{r.text}</p>
              </div>
            ))}
          </div>
          
          {/* Quick Navigation Links */}
          <div className="mt-10 pt-8 border-t border-dashed border-gray-100 grid sm:grid-cols-2 gap-4">
            <Link 
              href="/event/list"
              className="group bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-[#FF9530] hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-[#FF9530] uppercase tracking-widest mb-1">Browse Selection</p>
                  <h3 className="text-gray-900 font-bold">Event Categories</h3>
                  <p className="text-gray-400 text-[10px] font-mono mt-1">/event/list</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#FF9530] group-hover:bg-[#FF9530] group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>

            <Link 
              href="/venue/list"
              className="group bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-[#FF9530] hover:bg-white transition-all shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black text-[#FF9530] uppercase tracking-widest mb-1">Browse Selection</p>
                  <h3 className="text-gray-900 font-bold">Venue Categories</h3>
                  <p className="text-gray-400 text-[10px] font-mono mt-1">/venue/list</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#FF9530] group-hover:bg-[#FF9530] group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* ── Area reviews ── */}
        <section className="mt-4 bg-orange-50 border border-[#FF9530]/20 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#FF9530]/20">
            <h2 className="font-extrabold text-gray-900">Area Reviews — {locationLabel}</h2>
            <span className="text-sm text-gray-500 font-semibold">Avg: 4.4 / 5 · 1,200+ visitors</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 p-4">
            {[
              { area: 'Sector 62', rating: '4.6', desc: 'Best for premium banquet halls. Easy metro reach and strong parking options.' },
              { area: 'Sector 137', rating: '4.3', desc: 'Popular for lawns and mid-budget wedding events with larger gathering capacity.' },
              { area: 'Sector 18', rating: '4.5', desc: 'Preferred for corporate events and centrally located conference venues.' },
            ].map(a => (
              <div key={a.area} className="bg-white border border-[#FF9530]/15 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">{a.area}</h3>
                  <span className="bg-green-50 border border-green-200 text-[#0c9a49] text-xs font-bold rounded-full px-2 py-0.5">{a.rating}/5</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SEO insight grid ── */}
        <section className="mt-4 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="font-extrabold text-gray-900">{locationLabel} — Areas, Budgets &amp; Insights</h2>
            <p className="text-sm text-gray-500 mt-0.5">Compare venues by locality, event type, guests, and price range.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 p-5">
            {[
              { title: 'Popular Areas', links: ['Sector 18', 'Sector 62', 'Sector 75', 'Sector 137', 'Sector 150'] },
              { title: 'Top Event Searches', links: ['Wedding Banquets', 'Corporate Halls', 'Engagement Venues', 'Birthday Banquets', 'Reception Venues'] },
              { title: 'Budget Links', links: ['Under ₹1,800/plate', '₹1,800–₹2,200', 'Above ₹2,200', 'Low Budget', 'Luxury'] },
            ].map(block => (
              <div key={block.title} className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
                <h3 className="font-bold text-gray-900 text-sm mb-3">{block.title}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {block.links.map(l => (
                    <Link key={l} href="#" className="border border-gray-200 text-gray-600 rounded-full py-1 px-2.5 text-xs hover:border-[#FF9530] hover:text-[#FF9530] transition-colors">
                      {l}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5 grid gap-2">
            {[
              { q: `What is the average price per plate in ${locationLabel}?`, a: 'Most venues range from ₹1,500 to ₹2,700 for veg menus, depending on package and date.' },
              { q: `Best areas for banquet halls in ${locationLabel}?`, a: 'Sector 18, 62, 75, 137, and 150 are commonly shortlisted for a mix of budget and premium venues.' },
              { q: 'How to shortlist a venue quickly?', a: 'Filter by guest count, veg budget, and venue type, then compare reviews and menu package details side by side.' },
            ].map(faq => (
              <details key={faq.q} className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 group [&>summary::-webkit-details-marker]:hidden">
                <summary className="font-semibold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between [&::marker]:hidden">
                  {faq.q}
                  <svg className="w-4 h-4 text-gray-400 shrink-0 ml-2 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── SEO internal links ── */}
        <section className="mt-4 mb-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-extrabold text-gray-900">Discover More Venues</h2>
            <p className="text-sm text-gray-500 mt-0.5">Nearby and same-city discovery lists for stronger venue discovery.</p>
          </div>
          {[
            { label: 'Nearby Hotels', items: ['Hotel Alpha — 0.8 km', 'Hotel Beta — 1.0 km', 'Hotel Gamma — 1.2 km', 'Hotel Delta — 1.3 km', 'Hotel Epsilon — 1.5 km'] },
            { label: 'Same City Venues', items: ['Noida Venue 1', 'Noida Venue 2', 'Noida Venue 3', 'Noida Venue 4', 'Noida Venue 5'] },
            { label: 'Nearby Banquet Halls', items: ['Hall 1 — 0.5 km', 'Hall 2 — 0.9 km', 'Hall 3 — 1.1 km', 'Hall 4 — 1.4 km', 'Hall 5 — 1.7 km'] },
            { label: 'Best Venues Across India', items: ['Delhi Premium', 'Mumbai Grand', 'Bengaluru Elite', 'Jaipur Royal', 'Kolkata Heritage'] },
          ].map(row => (
            <div key={row.label} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-5 py-3 border-b border-gray-100 last:border-b-0">
              <h3 className="font-bold text-gray-800 text-sm shrink-0 w-40">{row.label}</h3>
              {row.items.map(item => (
                <Link key={item} href="#" className="text-sm text-gray-500 hover:text-[#FF9530] transition-colors">{item}</Link>
              ))}
              <Link href="#" className="text-[#078ED8] text-xs font-bold ml-1 hover:underline shrink-0">See more</Link>
            </div>
          ))}
        </section>

      </div>
      <div className="lg:hidden fixed bottom-20 right-6 z-[60] animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => setSidebarOpen(true)}
          className="relative flex items-center justify-center bg-[#FF9530] text-white w-14 h-14 rounded-full shadow-[0_12px_40px_rgba(255,149,48,0.4)] border border-white/20 active:scale-90 hover:scale-105 transition-all duration-300 group ring-4 ring-orange-500/10"
        >
          <SlidersHorizontal className="w-6 h-6" />
          
          <div className="absolute -top-1 -right-1 flex items-center justify-center bg-white text-[#FF9530] w-6 h-6 rounded-full text-[11px] font-black shadow-lg border-2 border-[#FF9530]">
            {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : !!v && v !== 0 && v !== 10000 && v !== 5000).length}
          </div>
        </button>
      </div>
    </main>
  )
}
