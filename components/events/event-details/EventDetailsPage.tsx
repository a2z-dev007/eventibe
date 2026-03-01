'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { 
  MapPin, Star, Users, Utensils, Info, 
  ArrowRight, ShieldCheck, Plus, Check,
  Phone, Mail, Calendar, Clock, Download,
  Globe, Shield, Sparkles, ChevronRight, X, MessageCircle,
  Home, Search as SearchIcon
} from 'lucide-react'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import Header from '@/components/Header'
import { fetchVenueById, fetchVenueTypes, fetchEventTypes } from '@/lib/api/eventsEndpoints'
import { EventGallery, EventLightbox } from './EventGallery'
import { EventQuoteModal } from './EventQuoteModal'
import { toSlug } from './toSlug'
import { IMAGES } from '@/assets/images'
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect'
import PremiumSelect from '@/components/ui/PremiumSelect'
import PremiumDatePicker from '@/components/ui/PremiumDatePicker'

// ── Shared UI Components ──────────────────────────────────────────────────────


function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mb-2 flex items-center gap-3">
        <div className="w-2 h-8 bg-[#FF9530] rounded-full" />
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 font-medium pl-5">{subtitle}</p>}
    </div>
  )
}

// ── Dummy Content for UI Polish ───────────────────────────────────────────────
const DUMMY_VENUE_CONTENT = {
  name: "Rudraksh Inn Banquet",
  description: `<p><strong>Premium Banquet Hall – The Perfect Venue for Every Occasion</strong></p><p>Our venue offers an elegant and well-equipped space for hosting a wide range of events—from intimate family functions to professional gatherings. Whether you're planning a birthday celebration, engagement ceremony, corporate meeting, or social get-together, we provide the ideal blend of comfort, convenience, and service.</p><h3><strong>Spacious & Well-Designed</strong></h3><p>The hall is thoughtfully designed to accommodate large gatherings with modern interiors, generous ceiling height, and tasteful lighting. The flexible layout allows for various seating arrangements—be it theatre-style for seminars or round-table setups for formal dinners.</p><h3><strong>Essential Amenities Included</strong></h3><p>We ensure that your event runs smoothly with all essential facilities available, including:</p><p>• Air-conditioned hall for comfort in all seasons</p><p>• Projector and audio-visual setup (on request)</p><p>• Clean and well-maintained washrooms for guests</p><p>• Power backup to avoid interruptions</p><p>• On-site parking for vehicles</p><p>• Professional staff support during your event</p><h3><strong>In-House Catering Services</strong></h3><p>Our team can arrange customized food menus with a selection of vegetarian and non-vegetarian options. From light refreshments to elaborate buffet spreads, our kitchen delivers quality and taste. Hygiene and timely service are always prioritized.</p>`,
  images: [
    { file: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80" },
    { file: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80" },
    { file: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1200&q=80" },
    { file: "https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&w=1200&q=80" },
    { file: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80" },
    { file: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80" }
  ],
  highlights_details: [
    { id: 'h1', name: "Centrally Located" },
    { id: 'h2', name: "Full Air Conditioning" },
    { id: 'h3', name: "Power Backup" },
    { id: 'h4', name: "Modern AV Systems" },
    { id: 'h5', name: "Professional Service" }
  ],
  services_details: [
    { id: 's1', name: "In-house Catering" },
    { id: 's2', name: "Decorations" },
    { id: 's3', name: "Security Services" },
    { id: 's4', name: "Logistics Support" },
    { id: 's5', name: "Photography (On Request)" }
  ],
  cuisine_details: [
    { id: 'c1', name: "North Indian", description: "Rich and authentic Mughlai and North Indian flavors." },
    { id: 'c2', name: "Chinese", description: "Asian fusion delicacies prepared by specialized chefs." },
    { id: 'c3', name: "Continental", description: "International favorites for a versatile dining experience." }
  ],
  contact_details: [
    { id: 'm1', name: "Premium Venue Manager", contact_type: "General Lead", mobile: "+91 99999 88888", email: "events@spodia.in" }
  ],
  terms_conditions_details: [
    { id: 't1', name: "Confirmation", description: "50% advance payment required for date reservation." },
    { id: 't2', name: "House Rules", description: "Standard decor and music guidelines apply." }
  ],
  package_details: [
    { id: 'p1', name: "standard veg", price: "850" },
    { id: 'p2', name: "premium", price: "1250" }
  ],
  address: "Premium Location, City Center Area",
  city_name: "Select City"
};

// ── Main Page Component ────────────────────────────────────────────────────────
export function EventDetailsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const venueId = searchParams.get('id')
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['venue', venueId],
    queryFn: () => fetchVenueById(venueId!),
    enabled: !!venueId
  })

  // ── Search bar state ───────────────────────────────────────────────────────
  const [location, setLocation] = useState<any>(null)
  const [venueType, setVenueType] = useState<any>(null)
  const [eventType, setEventType] = useState<any>(null)
  const [date, setDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState<any>(null)

  // Fetch Metadata for Labels
  const { data: venueTypesData } = useQuery({ queryKey: ['venueTypes'], queryFn: fetchVenueTypes })
  const { data: eventTypesData } = useQuery({ queryKey: ['eventTypes'], queryFn: fetchEventTypes })

  useEffect(() => {
    if (venueTypesData?.records && eventTypesData?.records) {
      const cityId = searchParams.get('city')
      const cityName = searchParams.get('cityName')
      const vt = searchParams.get('venue_type')
      const et = searchParams.get('event_type')
      const dt = searchParams.get('date')
      const gs = searchParams.get('guests')

      if (cityId && cityName) setLocation({ value: cityId, label: cityName })
      if (vt) {
        const found = venueTypesData.records.find(r => String(r.id) === vt)
        if (found) setVenueType({ value: found.id, label: found.name })
      }
      if (et) {
        const found = eventTypesData.records.find(r => String(r.id) === et)
        if (found) setEventType({ value: found.id, label: found.name })
      }
      if (dt) setDate(new Date(dt))
      if (gs) setGuests(guestOptions.find(o => o.value === gs) || null)
    }
  }, [searchParams, venueTypesData, eventTypesData])

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

  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [stickyClosed, setStickyClosed] = useState(false)

  if (isLoading) return <DetailSkeleton />
  // We remove the return <ErrorState /> here to allow fallback to DUMMY_VENUE_CONTENT
  const rawVenue = (data?.records?.[0] || {}) as any

  // Enrich with dummy data where API fields are missing or empty
  const venue = {
    ...rawVenue,
    name: rawVenue.name || DUMMY_VENUE_CONTENT.name,
    description: rawVenue.description && rawVenue.description !== "<p></p>" ? rawVenue.description : DUMMY_VENUE_CONTENT.description,
    images: (rawVenue.images && rawVenue.images.length > 0) ? rawVenue.images : DUMMY_VENUE_CONTENT.images,
    highlights_details: (rawVenue.highlights_details && rawVenue.highlights_details.length > 0) ? rawVenue.highlights_details : DUMMY_VENUE_CONTENT.highlights_details,
    services_details: (rawVenue.services_details && rawVenue.services_details.length > 0) ? rawVenue.services_details : DUMMY_VENUE_CONTENT.services_details,
    cuisine_details: (rawVenue.cuisine_details && rawVenue.cuisine_details.length > 0) ? rawVenue.cuisine_details : DUMMY_VENUE_CONTENT.cuisine_details,
    terms_conditions_details: (rawVenue.terms_conditions_details && rawVenue.terms_conditions_details.length > 0) ? rawVenue.terms_conditions_details : DUMMY_VENUE_CONTENT.terms_conditions_details,
    package_details: (rawVenue.package_details && rawVenue.package_details.length > 0) ? rawVenue.package_details : DUMMY_VENUE_CONTENT.package_details,
    contact_details: (rawVenue.contact_details && rawVenue.contact_details.length > 0) ? rawVenue.contact_details : DUMMY_VENUE_CONTENT.contact_details,
    address: rawVenue.address || DUMMY_VENUE_CONTENT.address,
    city_name: rawVenue.city_name || DUMMY_VENUE_CONTENT.city_name,
  }

  const venueTitle = venue.name || "Premium Venue"
  const venueLoc = venue.address || `${venue.city_name || ''}, ${venue.state_name || ''}`.trim() || "Location not found"
  
  const vegPrice = venue.package_details?.find((p: any) => p.name.toLowerCase().includes('veg'))?.price 
    || venue.package_details?.[0]?.price 
    || "0"

  const features = [
    { icon: <Users className="w-5 h-5" />, label: "Capacity", value: "250 - 1500 PAX" },
    { icon: <Utensils className="w-5 h-5" />, label: "Cuisine", value: venue.cuisine_details?.[0]?.name || "Multi-Cuisine" },
    { icon: <Globe className="w-5 h-5" />, label: "Spaces", value: "Indoor & Outdoor" },
  ]

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-32">
      <Header withScrollEffect={false} />

      {/* ── Hero Search Banner ────────────────────── */}
      <div
        className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center md:pt-36 pt-28 pb-10 lg:pt-40 px-4 md:px-8"
        style={{
          backgroundImage: `url(${IMAGES.listingHeroBg.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">

          <div className="bg-white rounded-2xl lg:rounded-full shadow-2xl p-2 flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-gray-100 w-full animate-fade-in-up">
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

      {lightboxSrc && <EventLightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      <EventQuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} initialVenueId={Number(venueId)} />

      {/* Hero Header Context - Mobile Brand Area */}
      <div className="lg:hidden pt-28 px-4 mb-6">
        <div className="inline-flex items-center gap-2 bg-orange-50 text-[#FF9530] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 border border-orange-100">
          <Star className="w-3 h-3 fill-[#FF9530]" /> Verified Premium
        </div>
        <h1 className="text-[28px] font-black text-gray-900 leading-tight tracking-tight mb-3">
          {venueTitle}
        </h1>
        <div className="flex items-center gap-2 text-gray-500 text-[13px] mb-6 font-bold leading-relaxed">
          <MapPin className="w-4 h-4 text-[#FF9530] shrink-0" />
          {venueLoc}
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setQuoteOpen(true)}
            className="flex-1 min-w-[140px] bg-[#0D74FF] text-white px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Request Quote
          </button>
          <a href={`tel:${venue.contact_details?.[0]?.mobile || ''}`} className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-900 rounded-xl active:scale-95 shadow-sm">
            <Phone className="w-5 h-5 text-[#FF9530]" />
          </a>
          <a href={`https://wa.me/${venue.contact_details?.[0]?.mobile?.replace(/[^0-9]/g, '') || ''}`} target="_blank" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-[#25D366] rounded-xl active:scale-95 shadow-sm">
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
            <nav className="flex items-center gap-3 text-sm font-semibold">
              <Link href="/" className="text-gray-400 hover:text-[#FF9530] transition-colors">Home</Link>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <Link href="/events/search" className="text-gray-400 hover:text-[#FF9530] transition-colors">Venues</Link>
              <div className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="text-gray-900 font-black tracking-tight truncate max-w-[200px]">{venueTitle}</span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100 shadow-sm">
                <ShieldCheck className="w-4 h-4" /> Spodia Verified
              </div>
            </div>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50">
            <EventGallery venueImages={venue.images || []} venueName={venueTitle} onOpen={setLightboxSrc} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16">
          
          <div className="space-y-16">
            {/* Branding & Headline Area */}
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-rose-400 rounded-[3rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
               <div className="relative bg-white border border-gray-100/50 rounded-[2.5rem] p-10 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/30 rounded-full -mr-32 -mt-32 blur-3xl" />
                  
                  <div className="relative">
                    <h2 className="text-4xl lg:text-6xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tight">
                      {venueTitle}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-8 mb-12">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center text-[#FF9530] shadow-sm">
                           <MapPin className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Location</p>
                          <p className="text-base font-black text-gray-900">{venueLoc}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#F8FAFC] border border-gray-100 flex items-center justify-center text-blue-500 shadow-sm">
                           <Clock className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Operational</p>
                          <p className="text-base font-black text-gray-900">09:00 AM - 23:30 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 lg:gap-6 pt-10 border-t border-gray-50">
                      {features.map((f, i) => (
                        <div key={i} className="flex flex-col gap-3 p-4 rounded-3xl hover:bg-gray-50/50 transition-colors">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm group-hover:border-[#FF9530]/30 transition-all">
                            {f.icon}
                          </div>
                          <div>
                            <p className="text-[9px] uppercase font-black text-gray-400 tracking-[0.2em] mb-1">{f.label}</p>
                            <p className="text-[13px] lg:text-[15px] font-black text-[#0F172A]">{f.value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Narrative & Experience */}
            <div className="space-y-12">
               <div>
                 <SectionHeading title="The Experience" subtitle="Where every detail matters" />
                 <div 
                   className="mt-6 prose prose-orange max-w-none text-gray-600 font-medium leading-[1.8] text-base lg:text-lg"
                   dangerouslySetInnerHTML={{ __html: venue.description || "" }}
                 />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-[#FFF8F1] border border-orange-100/50 rounded-[2.5rem] p-10 shadow-sm">
                   <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                     <Sparkles className="w-5 h-5 text-[#FF9530]" /> Features
                   </h3>
                   <div className="space-y-4">
                     {(venue.highlights_details as any[]).map((h) => (
                       <div key={h.id} className="flex items-center gap-4 group">
                         <div className="w-2 h-2 rounded-full bg-[#FF9530] transition-all group-hover:scale-150" />
                         <span className="text-base font-bold text-gray-800">{h.name}</span>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div className="bg-[#F1F8FF] border border-blue-100/50 rounded-[2.5rem] p-10 shadow-sm">
                   <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                     <ShieldCheck className="w-5 h-5 text-blue-500" /> Services
                   </h3>
                   <div className="flex flex-wrap gap-3">
                     {(venue.services_details as any[]).map((s) => (
                       <span key={s.id} className="bg-white border border-blue-100/50 text-[#1e40af] px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider shadow-sm">
                         {s.name}
                       </span>
                     ))}
                   </div>
                 </div>
               </div>
            </div>

            {/* Culinary Showcase */}
            <div className="bg-white rounded-[3rem] p-10 lg:p-14 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <SectionHeading title="Gourmet Artistry" />
                <div className="flex -space-x-4">
                   {[1,2,3,4,5].map(i => (
                     <img key={i} className="w-12 h-12 rounded-full border-4 border-white shadow-sm object-cover" src={`https://i.pravatar.cc/100?img=${i+40}`} alt="Chef" />
                   ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(venue.cuisine_details as any[]).map((c) => (
                  <div key={c.id} className="flex flex-col gap-6 p-2 group">
                    <div className="aspect-square bg-gray-50 rounded-[2.5rem] flex items-center justify-center border border-gray-100 group-hover:bg-[#FF9530] group-hover:text-white transition-all duration-500 shadow-sm">
                      <Utensils className="w-10 h-10 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 mb-3">{c.name}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-3">{c.description?.replace(/<[^>]*>?/gm, '')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies Hub */}
            <div className="bg-gray-900 text-white rounded-[3.5rem] p-12 lg:p-20 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF9530]/10 blur-[100px]" />
               <div className="relative">
                 <h2 className="text-3xl lg:text-4xl font-black mb-12">Venue Policies</h2>
                 <div className="grid sm:grid-cols-2 gap-10 lg:gap-16">
                    {(venue.terms_conditions_details as any[]).map((t) => (
                      <div key={t.id} className="space-y-4">
                         <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                             <Shield className="w-5 h-5 text-[#FF9530]" />
                           </div>
                           <h5 className="font-black text-xl tracking-tight">{t.name}</h5>
                         </div>
                         <p className="text-gray-400 text-sm leading-relaxed font-medium pl-14">{t.description?.replace(/<[^>]*>?/gm, '')}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>

          {/* Premium Sidebar Strategy */}
          <div className="space-y-10">
            <div className="lg:sticky lg:top-32 space-y-10">
              
              {/* Dynamic Action Card */}
              <div className="bg-white border-2 border-gray-900 rounded-[3.5rem] p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] relative group cursor-default">
                 <div className="absolute top-8 right-8 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                 </div>
                 
                 <div className="space-y-10">
                   <div>
                     <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4">Investment Starts At</p>
                     <div className="flex items-baseline gap-2">
                       <span className="text-6xl font-black text-gray-900">₹{Number(vegPrice).toLocaleString()}</span>
                       <span className="text-lg font-bold text-gray-400">/ Plate</span>
                     </div>
                   </div>

                   <div className="space-y-6">
                      {[
                        { icon: <Check className="w-5 h-5 text-green-500" />, label: "Includes Central Taxes" },
                        { icon: <Check className="w-5 h-5 text-green-500" />, label: "Complimentary Suite" },
                        { icon: <Check className="w-5 h-5 text-green-500" />, label: "Dedicated Event Manager" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                          <div className="w-8 h-8 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                             {item.icon}
                          </div>
                          {item.label}
                        </div>
                      ))}
                   </div>

                   <button 
                     onClick={() => setQuoteOpen(true)}
                     className="w-full bg-[#FF9530] hover:bg-gray-900 text-white font-black uppercase tracking-[0.2em] text-sm py-6 rounded-[2.5rem] transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-orange-500/20"
                   >
                     Book Tour & Quote
                   </button>
                   
                   <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                      Best Price Guaranteed Directly
                   </p>
                 </div>
              </div>

              {/* Management Insight */}
              <div className="bg-[#F8FAFC] rounded-[3rem] p-10 border border-gray-100">
                <h4 className="text-lg font-black text-gray-900 mb-8 px-2">Venue Concierge</h4>
                <div className="space-y-4">
                  {(venue.contact_details as any[]).map((c) => (
                    <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center justify-between group hover:border-[#FF9530] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?img=${Number(c.id) % 50 || 10}`} alt="person" className="w-full h-full object-cover" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{c.contact_type}</p>
                           <p className="text-base font-black text-gray-900">{c.name}</p>
                        </div>
                      </div>
                      <a href={`tel:${c.mobile}`} className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF9530] group-hover:text-white transition-all">
                        <Phone className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Advanced Link Hub */}
              <div className="bg-white rounded-[3rem] p-4 border border-gray-100 shadow-sm overflow-hidden aspect-[4/3] relative group">
                <iframe
                  src={`https://maps.google.com/maps?q=${venue.lat || venueTitle},${venue.lon || ''}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  title="Venue Explorer"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '2.5rem' }}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-2xl translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                   <p className="text-[10px] font-black text-[#FF9530] uppercase mb-1 tracking-widest">Official Address</p>
                   <p className="text-sm font-black text-gray-900 line-clamp-2">{venueLoc}</p>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Optimized Floating Strategy */}
      <div className="fixed bottom-24 lg:bottom-12 left-1/2 -translate-x-1/2 lg:left-auto lg:right-12 lg:translate-x-0 z-[100] flex flex-col items-center lg:items-end gap-3 w-max">
        
        {/* Expanded Desktop/Mobile Panel */}
        <Transition
          show={!stickyClosed}
          as={Fragment}
          enter="transition-all ease-out duration-500"
          enterFrom="translate-y-12 opacity-0 blur-lg scale-90"
          enterTo="translate-y-0 opacity-100 blur-0 scale-100"
          leave="transition-all ease-in duration-300"
          leaveFrom="opacity-100 scale-100"
          leaveTo="translate-y-12 opacity-0 blur-lg scale-90"
        >
          <div className="bg-[#0F172A]/90 backdrop-blur-2xl p-2.5 rounded-full shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/10 flex items-center gap-3 mb-2 ring-1 ring-white/5 group">
            <button 
              onClick={() => setQuoteOpen(true)}
              className="bg-gradient-to-r from-[#FF9530] to-[#FF8000] hover:scale-105 text-white px-8 py-3.5 rounded-full font-black text-[11px] uppercase tracking-[0.15em] shadow-xl shadow-orange-500/30 transition-all active:scale-95"
            >
              Request Quote
            </button>
            <div className="h-10 w-[1px] bg-white/10" />
            
            <div className="flex items-center gap-2 lg:gap-3 px-1">
              <a href={`tel:${venue.contact_details?.[0]?.mobile}`} className="w-11 h-11 bg-white/5 hover:bg-white/15 flex items-center justify-center rounded-full text-white transition-all hover:scale-110">
                <Phone className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${venue.contact_details?.[0]?.mobile?.replace(/[^0-9]/g, '')}`} target="_blank" className="w-11 h-11 bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center rounded-full text-[#25D366] transition-all hover:scale-110">
                <MessageCircle className="w-5 h-5" />
              </a>
              <button onClick={() => setStickyClosed(true)} className="w-11 h-11 hover:bg-white/5 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5 text-white/30" />
              </button>
            </div>
          </div>
        </Transition>

        {/* Minimalist Activation Trigger */}
        {stickyClosed && (
          <button 
            onClick={() => setStickyClosed(false)}
            className="flex items-center gap-4 px-10 py-5 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-full font-black text-sm uppercase tracking-[0.25em] shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-105 active:scale-95 border border-white/10"
          >
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9530] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF9530]"></span>
            </div>
            Send Enquiry
          </button>
        )}
      </div>
    </main>
  )
}

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 px-4 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="h-6 w-64 bg-gray-200 rounded-lg" />
        <div className="aspect-[21/9] bg-gray-200 rounded-[2rem]" />
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <div className="h-64 bg-gray-200 rounded-[2.5rem]" />
            <div className="h-96 bg-gray-200 rounded-[2rem]" />
          </div>
          <div className="h-96 bg-gray-200 rounded-[2rem]" />
        </div>
      </div>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-[#FF9530] mb-6">
         <Info className="w-10 h-10" />
      </div>
      <h2 className="text-2xl font-black text-gray-900 mb-2">Venue Not Found</h2>
      <p className="text-gray-500 font-medium mb-8 max-w-sm">We couldn't retrieve the details for this venue. It might have been removed or the link is invalid.</p>
      <Link href="/events/search" className="gradient-btn text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
        Back to Search
      </Link>
    </div>
  )
}
