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
}

export function EventSeatingLayouts({ venueConfigurations, getImageUrl }: EventSeatingLayoutsProps) {
  const [isLayoutsExpanded, setIsLayoutsExpanded] = useState(false)

  if (!venueConfigurations || venueConfigurations.length === 0) return null

  return (
    <div className="mt-12 pt-10 border-t border-gray-100">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-[#FF9530] rounded-full" />
          <h4 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight">Premium Seating Layouts</h4>
        </div>
        {venueConfigurations.length > 2 && (
          <button 
            onClick={() => setIsLayoutsExpanded(!isLayoutsExpanded)} 
            className="text-[#FF9530] text-[10px] font-black uppercase tracking-widest px-4 py-2 border border-orange-100 rounded-xl hover:bg-orange-50 transition-colors"
          >
            {isLayoutsExpanded ? "Show Less" : `View All ${venueConfigurations.length} Layouts`}
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {venueConfigurations.slice(0, isLayoutsExpanded ? undefined : 2).map((conf) => (
          <div key={conf.id} className="group flex flex-col bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden hover:border-[#FF9530] hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/3] relative bg-gray-50 flex items-center justify-center overflow-hidden">
              {conf.file ? (
                <img 
                  src={getImageUrl(conf.file)} 
                  alt={conf.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Layout+View';
                  }}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-gray-200">
                  <LayoutTemplate className="w-8 h-8" />
                  <span className="text-[8px] font-black uppercase tracking-widest">No Preview</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-4 flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <p className="font-black text-gray-900 text-xs truncate leading-none mb-1">{conf.name}</p>
                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.1em]">Verified Layout</p>
              </div>
              <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF9530] flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
