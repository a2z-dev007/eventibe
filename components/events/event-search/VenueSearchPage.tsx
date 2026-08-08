import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { IMAGES } from '@/assets/images'
import { searchVenues, fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import { toast } from 'sonner'
import PremiumSearchBar from '@/components/events/PremiumSearchBar'
import VenueSearchResultsPanel from './VenueSearchResultsPanel'
import { FAQSectionClient } from '@/components/common/FAQSectionClientWrapper'
import { useDebounce } from '@/hooks/useDebounce'
import type { Filters, Venue } from './types'
import { PER_PAGE } from './data'

export function VenueSearchPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
  const [sort, setSort] = useState('recommended')
  const [viewType, setViewType] = useState<'grid' | 'list'>('list')

  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)

  const { data: venueTypesData } = useQuery({ queryKey: ['venueTypes'], queryFn: () => fetchVenueTypes() })
  const { data: eventTypesData } = useQuery({ queryKey: ['eventTypes'], queryFn: () => fetchEventTypes() })

  const [filtersState, setFiltersState] = useState<Filters>({
    location: '',
    venueTypes: [],
    eventTypes: [],
    minCap: 0,
    maxCap: 10000,
    minVeg: 0,
    maxVeg: 5000,
  })

  const debouncedFilters = useDebounce(filtersState, 500)
  const debouncedLocationValue = useDebounce(location?.value, 500)

  const guestOptions = [
    { value: '100', label: '0-100' },
    { value: '300', label: '100-300' },
    { value: '600', label: '300-600' },
    { value: '601', label: '600+' },
  ]

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
        const found = venueTypesData.records.find((r) => String(r.id) === vtId)
        if (found) {
          setVenueType({ value: found.id, label: found.name })
          newFilters.venueTypes = [found.id]
        }
      }
      if (etId) {
        const found = eventTypesData.records.find((r) => String(r.id) === etId)
        if (found) {
          setEventType({ value: found.id, label: found.name })
          newFilters.eventTypes = [found.id]
        }
      }
      if (dStr) setDate(new Date(dStr))
      if (gVal) {
        const opt = guestOptions.find((o) => o.value === gVal)
        if (opt) setGuests(opt)
      }
      setFiltersState(newFilters)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, venueTypesData, eventTypesData])

  const venueOptions = venueTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || []
  const eventOptions = eventTypesData?.records?.map((r) => ({ value: r.id, label: r.name })) || []

  const updateFilters = (partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }))
    setPage(1)
  }

  const filters: Filters = {
    ...filtersState,
    location: location?.label || filtersState.location,
  }

  const cityIdFromUrl = searchParams.get('city') || ''
  const vtIdFromUrl = searchParams.get('venue_type') || ''
  const etIdFromUrl = searchParams.get('event_type') || ''

  const { data, isLoading, isError } = useQuery({
    queryKey: [
      'venues',
      page,
      cityIdFromUrl,
      vtIdFromUrl,
      etIdFromUrl,
      debouncedLocationValue,
      debouncedFilters.venueTypes,
      debouncedFilters.eventTypes,
      debouncedFilters.minCap,
      debouncedFilters.maxCap,
      debouncedFilters.minVeg,
      debouncedFilters.maxVeg,
      sort,
    ],
    queryFn: () =>
      searchVenues({
        page_number: page,
        number_of_records: PER_PAGE,
        city: location?.value || cityIdFromUrl,
        venue_type: debouncedFilters.venueTypes.length > 0 ? debouncedFilters.venueTypes : vtIdFromUrl,
        event_type: debouncedFilters.eventTypes.length > 0 ? debouncedFilters.eventTypes : etIdFromUrl,
      }),
    placeholderData: (previousData) => previousData,
  })

  const results = data?.records || []

  const processedResults = useMemo(() => {
    let list = [...results] as Venue[]

    if (sort === 'rating') {
      list.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0))
    } else if (sort === 'low-high') {
      list.sort(
        (a, b) =>
          Number(a.package_details?.[0]?.price || 0) - Number(b.package_details?.[0]?.price || 0),
      )
    } else if (sort === 'high-low') {
      list.sort(
        (a, b) =>
          Number(b.package_details?.[0]?.price || 0) - Number(a.package_details?.[0]?.price || 0),
      )
    } else if (sort === 'capacity-high') {
      list.sort((a, b) => Number(b.venue_configuration || 0) - Number(a.venue_configuration || 0))
    }

    return list
  }, [results, sort])

  const totalRecords = data?.totalRecords || 0
  const totalPages = Math.max(1, Math.ceil(totalRecords / PER_PAGE))

  const isAnyFilterActive =
    location !== null ||
    venueType !== null ||
    eventType !== null ||
    date !== null ||
    guests !== null ||
    filtersState.venueTypes.length > 0 ||
    filtersState.eventTypes.length > 0 ||
    filtersState.minCap !== 0 ||
    filtersState.maxCap !== 10000 ||
    filtersState.minVeg !== 0 ||
    filtersState.maxVeg !== 5000

  const clearFilters = () => {
    setLocation(null)
    setVenueType(null)
    setEventType(null)
    setDate(null)
    setGuests(null)
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
    if (!location?.value) {
      toast.error('Location is required', {
        description: 'Please select a city to search venues.',
        duration: 3000,
      })
      return
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
    params.set('page', '1')
    setPage(1)
    router.push(`/events/search${params.toString() ? `?${params.toString()}` : ''}`)
  }

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (page > 1) params.set('page', String(page))
    else params.delete('page')
  }, [page, searchParams])

  return (
    <main className="min-h-screen bg-gray-50 pb-24 md:pb-8">
      {/* Hero — keep search section as-is */}
      <div
        className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center py-6 md:py-8 lg:py-10 px-4 md:px-8 overflow-hidden"
        style={{
          backgroundImage: `url(${IMAGES.listingHeroBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />
        <div className="max-w-6xl w-full text-center relative z-10">
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
            searchButtonText="Search Venues"
            requiredLocation={true}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-4">
        <VenueSearchResultsPanel
          totalRecords={totalRecords}
          processedResults={processedResults}
          isLoading={isLoading}
          isError={isError}
          page={page}
          totalPages={totalPages}
          sort={sort}
          viewType={viewType}
          sidebarOpen={sidebarOpen}
          isAnyFilterActive={isAnyFilterActive}
          filters={filters}
          location={location}
          cityName={location?.label || searchParams.get('cityName') || undefined}
          venueTypeRecords={venueTypesData?.records?.map((r) => ({ id: r.id, name: r.name }))}
          eventTypeRecords={eventTypesData?.records?.map((r) => ({ id: r.id, name: r.name }))}
          setLocation={setLocation}
          onSortChange={(value) => {
            setSort(value)
            setPage(1)
          }}
          onViewTypeChange={setViewType}
          onSidebarOpen={setSidebarOpen}
          onUpdateFilters={updateFilters}
          onClearFilters={clearFilters}
          onPageChange={setPage}
        />

        {location?.label && cityIdFromUrl && (
          <div className="mt-16">
            <FAQSectionClient cityId={Number(cityIdFromUrl)} title={`${location.label} Event Venues FAQs`} />
          </div>
        )}
      </div>
    </main>
  )
}
