'use client'

import React, { useState } from 'react'
import { Check, ShieldCheck, ChevronRight, Sparkles, Building2, ConciergeBell } from 'lucide-react'
import { ItemGridModal } from '@/components/ui/ItemGridModal'

interface Amenity {
  id: string | number
  name: string
}

interface EventAmenitiesProps {
  highlights: Amenity[]
  amenities: Amenity[]
  services: Amenity[]
  venueTitle: string
  venueLoc: string
}

export function EventAmenities({ highlights, amenities, services, venueTitle, venueLoc }: EventAmenitiesProps) {
  const [amenityModalType, setAmenityModalType] = useState<'features' | 'services' | 'amenities' | null>(null)

  const hasContent = (highlights?.length || 0) > 0 || (amenities?.length || 0) > 0 || (services?.length || 0) > 0
  if (!hasContent) return null

  const sections = [
    {
      id: 'features',
      title: 'Venue Highlights',
      icon: Sparkles,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-50',
      checkIcon: Check,
      items: highlights,
      modalType: 'features' as const,
    },
    {
      id: 'amenities',
      title: 'Property Amenities',
      icon: Building2,
      iconColor: 'text-[#FF9530]',
      iconBg: 'bg-orange-50',
      checkIcon: Check,
      items: amenities,
      modalType: 'amenities' as const,
    },
    {
      id: 'services',
      title: 'In-house Services',
      icon: ConciergeBell,
      iconColor: 'text-gray-600',
      iconBg: 'bg-gray-100',
      checkIcon: ShieldCheck,
      items: services,
      modalType: 'services' as const,
    },
  ].filter(s => s.items && s.items.length > 0)

  return (
    <section id="amenities" className="scroll-mt-[142px] py-10 md:py-14 border-t border-gray-100">

      {/* Section header */}
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-[2px] w-8 bg-gray-900 rounded-full" />
          <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.35em]">
            What's Included
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight leading-snug">
          Amenities &amp; Services
        </h2>
      </div>

      {/* Sections stacked */}
      <div className="space-y-8 md:space-y-10">
        {sections.map((section) => {
          const Icon = section.icon
          const CheckIcon = section.checkIcon
          const preview = section.items.slice(0, 8)
          const hasMore = section.items.length > 8

          return (
            <div key={section.id} className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 md:p-6">

              {/* Sub-header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${section.iconBg}`}>
                    <Icon className={`w-4 h-4 ${section.iconColor}`} />
                  </div>
                  <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest">
                    {section.title}
                  </h3>
                </div>

                {hasMore && (
                  <button
                    onClick={() => setAmenityModalType(section.modalType)}
                    className="flex items-center gap-1 text-[11px] font-black text-[#FF9530] hover:text-orange-600 uppercase tracking-widest transition-colors shrink-0"
                  >
                    All {section.items.length}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Items — responsive wrapping pills */}
              <div className="flex flex-wrap gap-2">
                {preview.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3.5 py-2 shadow-sm"
                  >
                    <CheckIcon className={`w-3.5 h-3.5 shrink-0 ${section.iconColor}`} />
                    <span className="text-[13px] font-semibold text-gray-800 whitespace-nowrap">
                      {item.name}
                    </span>
                  </div>
                ))}

                {hasMore && (
                  <button
                    onClick={() => setAmenityModalType(section.modalType)}
                    className="flex items-center gap-1.5 bg-white border border-dashed border-gray-300 rounded-full px-3.5 py-2 text-[12px] font-bold text-gray-400 hover:border-[#FF9530] hover:text-[#FF9530] transition-colors"
                  >
                    +{section.items.length - 8} more
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <ItemGridModal
        isOpen={amenityModalType !== null}
        onClose={() => setAmenityModalType(null)}
        title={amenityModalType === 'features' ? 'Exclusive Highlights' : amenityModalType === 'amenities' ? 'Property Amenities' : 'Premium Services'}
        subtitle={`Discover every premium ${amenityModalType === 'features' ? 'highlight' : amenityModalType === 'amenities' ? 'amenity' : 'service'} available at ${venueTitle}`}
        items={amenityModalType === 'features' ? highlights : amenityModalType === 'amenities' ? amenities : services}
        type={amenityModalType === 'features' ? 'check' : amenityModalType === 'amenities' ? 'bullet' : 'shield'}
      />
    </section>
  )
}
