'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchVenueContent } from '@/lib/api/eventsEndpoints'
import { MapPin, Navigation } from 'lucide-react'

interface EventLandmarksProps {
  venueId: number | string;
  venueTitle: string;
  venueLoc: string; // e.g. "Sector 10 Dwarka, New Delhi"
  venueCity: string;
}

export function EventLandmarks({ venueId, venueTitle, venueLoc, venueCity }: EventLandmarksProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['venueContent', venueId],
    queryFn: () => fetchVenueContent(venueId),
    enabled: !!venueId,
    staleTime: 1000 * 60 * 5, // 5 mins
  })

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto animate-pulse space-y-6">
          <div className="h-10 w-3/4 bg-gray-100 rounded-lg" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-48 bg-gray-50 rounded-2xl" />
            <div className="h-48 bg-gray-50 rounded-2xl" />
          </div>
        </div>
      </section>
    )
  }

  if (isError || !data?.venue_content) return null

  const landmarks: any[] = data.venue_content.nearby_landmarks || []
  const area = venueLoc.split(',')[0]?.trim() || venueLoc
  const city = venueCity

  // Filter helper
  const getLandmarksByCategories = (categories: string[]) => {
    return landmarks.filter(l => categories.includes(l.category_id))
  }

  const sectionConfig = [
    {
      id: 'landmarks',
      title: `Nearby Landmarks from ${venueTitle}, ${area}, ${city}`,
      desc: `List all important landmarks, tourist attractions, and key places nearby:`,
      categories: ['city_center', 'corporate_office', 'business_district', 'it_park', 'convention_center', 'exhibition_center', 'university', 'school', 'industrial', 'government_office', 'embassy', 'cinema', 'highway']
    },
    {
      id: 'airports',
      title: `Nearby Airports from ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['airport']
    },
    {
      id: 'metro',
      title: `Nearby Metro Stations from ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['metro_station']
    },
    {
      id: 'railway',
      title: `Nearby Railway Stations from ${venueTitle}, ${city}`,
      desc: null,
      categories: ['railway_station']
    },
    {
      id: 'bus',
      title: `Nearby Bus Stands from ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['bus_terminal']
    },
    {
      id: 'tourist',
      title: `Places to Visit near ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['tourist_attraction', 'temple', 'mosque', 'church', 'gurudwara', 'park', 'lake', 'river', 'beach', 'mountain', 'stadium']
    },
    {
      id: 'shopping',
      title: `Shopping & Markets near ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['shopping_mall', 'market_area']
    },
    {
      id: 'hospitals',
      title: `Nearby Hospitals from ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['hospital']
    },
    {
      id: 'restaurants',
      title: `Restaurants near ${venueTitle}, ${area}, ${city}`,
      desc: null,
      categories: ['restaurant']
    }
  ]

  // Name mapping for fallback text
  const headingNameMap: Record<string, string> = {
    'landmarks': 'Nearby Landmarks',
    'airports': 'Nearby Airports',
    'metro': 'Nearby Metro Stations',
    'railway': 'Nearby Railway Stations',
    'bus': 'Nearby Bus Stands',
    'tourist': 'Tourist Attractions',
    'shopping': 'Markets & Shopping',
    'hospitals': 'Hospitals',
    'restaurants': 'Restaurants',
  }

  // Render a list item
  const renderItem = (item: any) => {
    // Determine driving time / distance text
    let distStr = item.distance_km ? `Approx. ${item.distance_km} away` : '';
    let durationStr = item.duration_mins ? `(${item.duration_mins} drive)` : '';
    if (distStr && durationStr) {
      distStr = `${distStr} ${durationStr}`
    } else if (durationStr) {
      distStr = durationStr
    }

    // Google Maps link
    const query = encodeURIComponent(item.name + " " + (item.vicinity || ''))
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${query}${item.place_id ? '&query_place_id=' + item.place_id : ''}`

    return (
      <li key={item.place_id || item.name} className="flex items-start gap-4 text-gray-700 leading-relaxed group">
        <div className="mt-0.5 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0 border border-orange-100 group-hover:scale-110 transition-transform shadow-sm">
          {item.emoji ? (
            <span className="text-base leading-none">{item.emoji}</span>
          ) : (
            <Navigation className="w-4 h-4 text-[#FF9530]" />
          )}
        </div>
        <div>
          <a href={mapLink} target="_blank" rel="noreferrer" className="text-base font-bold text-gray-900 hover:text-[#FF9530] transition-colors border-b border-transparent hover:border-[#FF9530]">
            {item.name}
          </a>
          {distStr && <p className="text-gray-500 text-sm font-medium mt-1">{distStr}</p>}
        </div>
      </li>
    )
  }

  // Helper for generating fallback
  const renderFallback = (id: string) => {
    const headingName = headingNameMap[id] || 'places'
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex items-start gap-3">
        <span className="text-gray-400 text-lg">ℹ️</span>
        <p className="text-gray-500 text-sm font-medium leading-relaxed">
          Information for {headingName} near the {venueTitle}, {city} is currently not available in our database. We are continuously updating our listings to provide accurate details for guests.
        </p>
      </div>
    )
  }

  return (
    <section id="landmarks" className="scroll-mt-[142px] py-12 md:py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 lg:mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
              <span className="h-[2px] w-8 bg-[#FF9530] rounded-full" />
              <p className="text-[11px] font-black text-[#FF9530] uppercase tracking-[0.3em]">
                Location Overview
              </p>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              Nearby Landmarks from <br className="hidden md:block" />
              <span className="text-[#FF9530]">{venueTitle}</span>, {area}, {city}
            </h1>
            <p className="mt-4 text-gray-500 font-medium max-w-3xl leading-relaxed mx-auto md:mx-0">
              List all Important Landmarks, Places to Visit and Important Places near, Airport, Railway Stations, Bus Stands, Government Offices and other places near {venueTitle}, {area}, {city}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-12 lg:space-y-16">
          {sectionConfig.map((section, index) => {
            const items = getLandmarksByCategories(section.categories)
            return (
              <div key={section.id} className={index !== sectionConfig.length - 1 ? "pb-12 lg:pb-16 border-b border-gray-100" : ""}>
                <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-2 tracking-tight">
                  {section.title}
                </h2>
                
                {section.desc && (
                  <p className="text-gray-500 text-sm font-medium mb-6 max-w-3xl">
                    {section.desc}
                  </p>
                )}
                
                {!section.desc && <div className="h-6" />}

                <div>
                  {items.length > 0 ? (
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
                      {items.map(renderItem)}
                    </ul>
                  ) : (
                    renderFallback(section.id)
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
