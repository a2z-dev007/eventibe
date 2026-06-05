'use client'

import React from 'react'
import { Building2, Bed, Car, MapPin, Home } from 'lucide-react'

interface VenueTypeDetail {
  id: number
  name: string
}

interface AmenityDetail {
  id: number
  name: string
}

interface EventStatsProps {
  venue?: {
    venue_type?: VenueTypeDetail[]
    amenities_details?: AmenityDetail[]
    address?: string
    city_name?: string
    state_name?: string
    is_hotel_venue?: boolean
  }
}

interface StatItem {
  icon: React.ReactNode
  label: string
  value: string
  bgColor: string
  borderColor: string
  iconColor: string
}

export function EventStats({ venue }: EventStatsProps) {
  // Extract data from actual API fields
  const venueType = venue?.venue_type?.[0]?.name || null
  
  // Check amenities for specific values
  const hasRooms = venue?.amenities_details?.some(
    (a: AmenityDetail) => a.name?.toLowerCase() === 'rooms available'
  )
  
  const hasParking = venue?.amenities_details?.some(
    (a: AmenityDetail) => a.name?.toLowerCase() === 'parking'
  )
  
  const isIndoorOnly = venue?.amenities_details?.some(
    (a: AmenityDetail) => a.name?.toLowerCase() === 'indoor only'
  )
  
  const hasRooftop = venue?.amenities_details?.some(
    (a: AmenityDetail) => a.name?.toLowerCase() === 'roof top'
  )
  
  const address = venue?.address || ''
  const city = venue?.city_name || ''
  const state = venue?.state_name || ''

  // Build stats array only with actual API data
  const stats: StatItem[] = []

  // Venue Type (from venue_type array)
  if (venueType) {
    stats.push({
      icon: <Building2 className="w-5 h-5" />,
      label: "Venue Type",
      value: venueType,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600",
    })
  }

  // Indoor + Outdoor (from amenities)
  if (isIndoorOnly || hasRooftop) {
    let spaceType = 'Indoor'
    if (isIndoorOnly && hasRooftop) {
      spaceType = 'Indoor + Outdoor'
    } else if (hasRooftop) {
      spaceType = 'Outdoor (Rooftop)'
    }
    stats.push({
      icon: <Home className="w-5 h-5" />,
      label: "Space Type",
      value: spaceType,
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      iconColor: "text-green-600",
    })
  }

  // Rooms (only for hotel venues)
  if (venue?.is_hotel_venue && hasRooms) {
    stats.push({
      icon: <Bed className="w-5 h-5" />,
      label: "Rooms",
      value: 'Available',
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600",
    })
  }

  // Parking (from amenities)
  if (hasParking) {
    stats.push({
      icon: <Car className="w-5 h-5" />,
      label: "Parking",
      value: 'Available',
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      iconColor: "text-orange-600",
    })
  }

  // Don't render if no stats available
  if (stats.length === 0) {
    return null
  }

  // Adjust grid columns based on number of stats
  const gridCols = stats.length <= 2 ? 'grid-cols-2' : stats.length <= 3 ? 'md:grid-cols-3' : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className="space-y-6 mb-6">
      {/* Quick Highlights Cards */}
      <div className={`grid ${gridCols} gap-3 md:gap-4`}>
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={`${stat.bgColor} p-4 md:p-5 rounded-2xl md:rounded-3xl border ${stat.borderColor} flex flex-col items-center text-center group hover:shadow-lg hover:scale-[1.02] transition-all`}
          >
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white flex items-center justify-center mb-2 md:mb-3 shadow-sm ${stat.iconColor} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className="text-[10px] md:text-[11px] font-black uppercase tracking-wider text-gray-400 mb-0.5">{stat.label}</p>
            <p className="text-sm md:text-base font-black text-gray-900 leading-tight">{stat.value}</p>
          </div>
        ))}
      </div>

     
    </div>
  )
}