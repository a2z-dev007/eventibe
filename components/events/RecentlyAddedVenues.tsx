'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetchRecentlyAddedVenues, type VenueRecord } from '@/lib/api/eventsEndpoints'
import { IMAGES } from '@/assets/images'
import { ChevronRight, MapPin, Users, Heart, Calendar, Sparkles } from 'lucide-react'

export default function RecentlyAddedVenues() {
  const { data: recentlyAddedData, isLoading } = useQuery({
    queryKey: ['recentlyAddedVenues'],
    queryFn: () => fetchRecentlyAddedVenues({ number_of_records: 4 }),
  })

  if (isLoading) {
    return (
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                Recently Added <span className="text-[#FF9530]">Event</span> Venues
              </h2>
              <p className="text-gray-500 font-medium mt-2">Latest additions to our venue collection</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] bg-gray-200 rounded-[2.5rem] mb-4" />
                <div className="h-6 w-3/4 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const venues = recentlyAddedData?.records || []
  if (venues.length === 0) return null

  return (
    <section className="bg-[#F8FAFC] py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
              Recently Added <span className="text-[#FF9530]">Event</span> Venues
            </h2>
            <p className="text-gray-500 font-medium mt-2">Latest additions to our venue collection</p>
          </div>
          <Link 
            href="/events/search" 
            className="hidden md:flex items-center gap-2 text-[#FF9530] font-bold hover:gap-3 transition-all"
          >
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue: VenueRecord) => (
            <Link 
              key={venue.id} 
              href={`/events/details/${venue.slug}`}
              className="group block"
            >
              {/* Card */}
              <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg shadow-gray-200/40 hover:shadow-[0_25px_60px_rgba(255,149,48,0.15)] hover:-translate-y-2 transition-all duration-500">
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={venue.images?.[0]?.file || IMAGES.placeholder.src} 
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = IMAGES.placeholder.src }}
                  />
                
                  {/* Stronger Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                    <div className="flex flex-col gap-2">
                      <span className="bg-[#FF9530] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/30">
                        Newly Added
                      </span>
                      {venue.venue_type?.[0] && (
                        <span className="bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1 rounded-full">
                          {venue.venue_type[0].name}
                        </span>
                      )}
                    </div>
                    {/* Wishlist Button */}
                    <button 
                      className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-md hover:bg-[#FF9530] hover:text-white transition-all"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    {/* Venue Name with text shadow */}
                    <h3 className="text-white text-xl font-bold leading-tight line-clamp-2 mb-2 drop-shadow-lg">
                      {venue.name}
                    </h3>
                    
                    {/* Location with text shadow */}
                    <p className="text-gray-200 text-sm font-medium flex items-center gap-1.5 mb-3 drop-shadow-md">
                      <MapPin className="w-4 h-4 flex-shrink-0" /> 
                      <span className="line-clamp-1">{venue.city_name}, {venue.state_name}</span>
                    </p>

                    {/* Rich attributes: Cuisines & Highlights */}
                    <div className="flex flex-col gap-1.5 mb-3">
                      {venue.cuisine_details && venue.cuisine_details.length > 0 && (
                        <p className="text-white/80 text-[10px] font-semibold truncate drop-shadow">
                          🍽️ {venue.cuisine_details.slice(0, 2).map((c) => c.name).join(', ')}
                        </p>
                      )}
                      {venue.highlights_details && venue.highlights_details.length > 0 && (
                        <p className="text-white/80 text-[10px] font-semibold truncate drop-shadow">
                          ✨ {venue.highlights_details.slice(0, 2).map((h) => h.name).join(', ')}
                        </p>
                      )}
                    </div>

                    {/* Quick Info Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-white" />
                        <span className="text-white text-[10px] font-bold">
                          {venue.venue_configuration ? `${venue.venue_configuration} Guests` : '50-500'}
                        </span>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-white" />
                        <span className="text-white text-[10px] font-bold">
                          {venue.package_details?.[0]?.price
                            ? `₹${Number(venue.package_details[0].price).toLocaleString('en-IN')}`
                            : 'Available'}
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="bg-[#FF9530] hover:bg-[#FF8000] text-white font-bold py-3 px-4 rounded-full text-center transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/30">
                      <span className="flex items-center justify-center gap-2">
                        {venue.package_details?.[0]?.price
                          ? `Book Package`
                          : 'Get Best Quote'}
                        <Sparkles className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
