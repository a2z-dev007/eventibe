'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { fetchPopularVenues, type VenueRecord } from '@/lib/api/eventsEndpoints'
import { IMAGES } from '@/assets/images'
import { ChevronRight, MapPin, Sparkles, Users, ArrowRight } from 'lucide-react'

export default function TrendingVenues() {
  const { data: popularData, isLoading } = useQuery({
    queryKey: ['popularVenues'],
    queryFn: () => fetchPopularVenues({ number_of_records: 12 }),
  })

  if (isLoading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
                Trending <span className="text-[#FF9530]">Venues</span>
              </h2>
              <p className="text-gray-500 font-medium mt-2">Most popular venues based on customer enquiries</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-2xl mb-3" />
                <div className="h-4 w-full bg-gray-200 rounded-lg mb-2" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const venues = popularData?.records || []
  if (venues.length === 0) return null

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Trending <span className="text-[#FF9530]">Venues</span>
            </h2>
            <p className="text-gray-500 font-medium mt-2">Most popular venues based on customer enquiries</p>
          </div>
          <Link 
            href="/events/search" 
            className="hidden md:flex items-center gap-2 text-[#FF9530] font-bold hover:gap-3 transition-all"
          >
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Small Cards Grid - 6 per row (Airbnb style) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {venues.map((venue: VenueRecord) => (
            <Link 
              key={venue.id} 
              href={`/events/details/${venue.slug}`}
            >
              {/* Small Card */}
              <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={venue.images?.[0]?.file || IMAGES.placeholder.src} 
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { (e.target as HTMLImageElement).src = IMAGES.placeholder.src }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Top: Trending Badge */}
                  <div className="absolute top-2 right-2 bg-[#FF9530] rounded-full p-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                    {/* Venue Name */}
                    <h3 className="text-white font-bold text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#FF9530] transition-colors drop-shadow-md">
                      {venue.name}
                    </h3>
                    
                    {/* Location */}
                    <p className="text-white/90 text-xs font-medium flex items-center gap-1 mb-2 drop-shadow-md">
                      <MapPin className="w-3 h-3 flex-shrink-0" /> 
                      <span className="line-clamp-1">{venue.city_name}</span>
                    </p>
                    
                    {/* Quick Info Pills */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-[9px] font-bold inline-flex items-center gap-1">
                        <Users className="w-3 h-3" />50-500
                      </span>
                      {venue.venue_type?.[0] && (
                        <span className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 text-white text-[9px] font-medium">
                          {venue.venue_type[0].name}
                        </span>
                      )}
                    </div>
                    
                    {/* CTA */}
                    <div className="bg-[#FF9530] hover:bg-[#FF8000] rounded-full py-1.5 text-center transition-all">
                      <span className="text-white text-[10px] font-bold flex items-center justify-center gap-1">
                        Get Quote <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden">
          <Link 
            href="/events/search" 
            className="block w-full bg-gray-900 text-white text-center py-4 rounded-full font-bold"
          >
            View All Trending Venues
          </Link>
        </div>
      </div>
    </section>
  )
}
