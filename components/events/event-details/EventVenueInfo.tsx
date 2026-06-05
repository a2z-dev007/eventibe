'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchVenueContent } from '@/lib/api/eventsEndpoints'
import {
  Building2, Utensils, Shield, Zap,
  Check, X, Clock, Users, Car, Wifi,
  Camera, Eye, Music, GlassWater
} from 'lucide-react'

interface EventVenueInfoProps {
  venueId: number | string;
  venueTitle: string;
  venueLoc: string;
  venueCity: string;
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  fullWidth?: boolean;
}

function InfoCard({ icon, label, value, fullWidth }: InfoCardProps) {
  return (
    <div className={`bg-white rounded-xl p-4 border border-gray-100 shadow-sm ${fullWidth ? 'col-span-full' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[#FF9530]">{icon}</span>
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <div className="text-gray-900 font-bold">{value}</div>
    </div>
  )
}

function YesNoBadge({ value }: { value: boolean | undefined }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">
        <Check className="w-3 h-3" /> Yes
      </span>
    )
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-md">
        <X className="w-3 h-3" /> No
      </span>
    )
  }
  return <span className="text-gray-400 text-sm">—</span>
}

function TagList({ items }: { items: string[] }) {
  if (!items?.length) return <span className="text-gray-400">—</span>
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span key={i} className="px-2 py-1 bg-[#FF9530]/10 text-[#FF9530] text-xs font-semibold rounded-md">
          {item}
        </span>
      ))}
    </div>
  )
}

export function EventVenueInfo({ venueId, venueTitle, venueLoc, venueCity }: EventVenueInfoProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['venueContent', venueId],
    queryFn: () => fetchVenueContent(venueId),
    enabled: !!venueId,
    staleTime: 1000 * 60 * 5,
  })

  if (isLoading) {
    return (
      <section className="py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-gray-100">
        <div className="max-w-[1600px] mx-auto animate-pulse">
          <div className="h-8 w-1/3 bg-gray-100 rounded mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(5)].map((_, i) => <div key={i} className="h-40 bg-gray-50 rounded-xl" />)}
          </div>
        </div>
      </section>
    )
  }

  if (isError || !data?.venue_content) return null

  const v = data.venue_content
  const area = venueLoc.split(',')[0]?.trim() || venueLoc

  return (
    <section className="py-10 md:py-12 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-[1600px] mx-auto">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-1.5 w-6 bg-[#FF9530] rounded-full" />
            <span className="text-[10px] font-black text-[#FF9530] uppercase tracking-widest">Venue Details</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-gray-900">
            Everything about <span className="text-[#FF9530]">{venueTitle}</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">{area}, {venueCity}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
          {/* Capacity Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4 text-[#FF9530]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Capacity & Space</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Spaces</span>
                <span className="font-bold">{v.event_spaces_count || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Area</span>
                <span className="font-bold">{v.total_event_area || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Max Guests</span>
                <span className="font-bold text-[#FF9530]">{v.maximum_guest_capacity || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Theatre</span>
                <span className="font-bold">{v.theatre_capacity || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Banquet</span>
                <span className="font-bold">{v.banquet_capacity || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Indoor</span>
                <YesNoBadge value={v.indoor_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outdoor</span>
                <YesNoBadge value={v.outdoor_available} />
              </div>
              {v.rooms_available_at_property && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rooms</span>
                  <span className="font-bold">{v.total_rooms || '—'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Catering Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                <Utensils className="w-4 h-4 text-[#FF9530]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Catering & Decor</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">In-house Catering</span>
                <YesNoBadge value={v.inhouse_catering} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Veg / Plate</span>
                <span className="font-bold">₹{v.veg_price_per_plate || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Non-Veg / Plate</span>
                <span className="font-bold">₹{v.nonveg_price_per_plate || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">In-house Decor</span>
                <YesNoBadge value={v.inhouse_decor} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outside Decor</span>
                <YesNoBadge value={v.outside_decor_allowed} />
              </div>
              <div className="text-sm">
                <span className="text-gray-500 block mb-1">Styles</span>
                <TagList items={v.decoration_style} />
              </div>
            </div>
          </div>

          {/* Access Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                <Car className="w-4 h-4 text-[#FF9530]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Guest Access</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Parking</span>
                <span className="font-bold">{v.parking_capacity ? `${v.parking_capacity} cars` : '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Valet</span>
                <YesNoBadge value={v.valet_parking_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Separate Entrance</span>
                <YesNoBadge value={v.separate_event_entrance} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Private Booking</span>
                <YesNoBadge value={v.private_booking_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Outside Vendors</span>
                <YesNoBadge value={v.outside_vendors_allowed} />
              </div>
            </div>
          </div>

          {/* Policies Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-[#FF9530]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Policies & Safety</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Alcohol</span>
                <YesNoBadge value={v.alcohol_allowed} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Music Till</span>
                <span className="font-bold">{v.music_allowed_till || '—'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Family Friendly</span>
                <YesNoBadge value={v.family_friendly} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Couple Friendly</span>
                <YesNoBadge value={v.couple_friendly} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Wheelchair</span>
                <YesNoBadge value={v.wheelchair_accessible} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Fire Safety</span>
                <YesNoBadge value={v.fire_safety_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Security</span>
                <YesNoBadge value={v.security_staff_available} />
              </div>
            </div>
          </div>

          {/* Technical Section */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#FF9530]" />
              </div>
              <span className="font-bold text-gray-900 text-sm">Technical Setup</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Generator</span>
                <YesNoBadge value={v.generator_backup_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sound System</span>
                <YesNoBadge value={v.professional_sound_available} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">High Speed WiFi</span>
                <YesNoBadge value={v.high_speed_wifi_available} />
              </div>
              <div className="text-sm">
                <span className="text-gray-500 block mb-1">Views</span>
                <TagList items={v.view_type} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Pre-wedding Shoot</span>
                <YesNoBadge value={v.prewedding_shoot_allowed} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Drone Photography</span>
                <YesNoBadge value={v.drone_photography_allowed} />
              </div>
            </div>
          </div>

          {/* Notes Section - Full Width */}
          {(v.space_notes || v.catering_notes || v.decor_notes || v.access_notes || v.policy_notes || v.safety_notes || v.ambience_notes) && (
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm col-span-1 sm:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[#FF9530]/10 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4 text-[#FF9530]" />
                </div>
                <span className="font-bold text-gray-900 text-sm">Notes & More</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {v.space_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Space</span>
                    <p className="text-sm text-gray-700 mt-1">{v.space_notes}</p>
                  </div>
                )}
                {v.catering_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Catering</span>
                    <p className="text-sm text-gray-700 mt-1">{v.catering_notes}</p>
                  </div>
                )}
                {v.decor_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Decor</span>
                    <p className="text-sm text-gray-700 mt-1">{v.decor_notes}</p>
                  </div>
                )}
                {v.ambience_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Ambience</span>
                    <p className="text-sm text-gray-700 mt-1">{v.ambience_notes}</p>
                  </div>
                )}
                {v.policy_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Policies</span>
                    <p className="text-sm text-gray-700 mt-1">{v.policy_notes}</p>
                  </div>
                )}
                {v.safety_notes && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="text-[10px] font-black text-[#FF9530] uppercase">Safety</span>
                    <p className="text-sm text-gray-700 mt-1">{v.safety_notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}