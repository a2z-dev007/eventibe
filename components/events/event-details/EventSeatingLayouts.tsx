'use client'

import React, { useState } from 'react'
import { LayoutTemplate, Users } from 'lucide-react'

interface SeatingLayout {
  id: string
  name: string
  file: string | null
}

interface EventSeatingLayoutsProps {
  venueConfigurations: SeatingLayout[]
  getImageUrl: (path: string | null | undefined) => string
  venueTitle: string
  venueLoc: string
}

export function EventSeatingLayouts({ venueConfigurations, getImageUrl, venueTitle, venueLoc }: EventSeatingLayoutsProps) {
  const [isLayoutsExpanded, setIsLayoutsExpanded] = useState(false)

  if (!venueConfigurations || venueConfigurations.length === 0) return null
  const hasMore = venueConfigurations.length > 4

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-8">
        <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2 md:gap-3 ">Flexible Event Layouts for Every Occasion in {venueLoc}</h4>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {venueConfigurations.slice(0, isLayoutsExpanded ? undefined : 8).map((conf) => (
          <div
            key={conf.id}
            className="flex flex-row items-center p-3 px-4 gap-4 bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:border-[#FF9530] hover:shadow-md transition-all duration-300 group"
          >
            <div className="   w-20 h-20 shrink-0 relative bg-gray-50 hidden xl:flex items-center justify-center rounded-xl overflow-hidden">
              {conf.file ? (
                <img
                  src={getImageUrl(conf.file)}
                  alt={conf.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=No+Preview';
                  }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 text-gray-300">
                  <LayoutTemplate className="w-6 h-6" />
                  <span className="text-[7px] font-bold uppercase tracking-wider">No Image</span>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-hidden flex flex-col justify-center">
              <p className="font-bold text-gray-900 text-sm truncate mb-1" title={conf.name}>{conf.name}</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-orange-50 text-[#FF9530] flex items-center justify-center shrink-0">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {venueConfigurations.length > 8 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsLayoutsExpanded(!isLayoutsExpanded)}
            className="text-[#FF9530] text-[10px] sm:text-[11px] font-black uppercase tracking-widest px-8 py-3 border border-orange-100 rounded-2xl hover:bg-orange-50 transition-all active:scale-95 shadow-sm"
          >
            {isLayoutsExpanded ? "Show Less" : `View All ${venueConfigurations.length} Layouts`}
          </button>
        </div>
      )}
    </div>
  )
}
