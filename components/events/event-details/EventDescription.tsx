'use client'

import React, { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { SectionHeading, ExpandableHtml } from './SharedComponents'

interface EventDescriptionProps {
  description: string
  venueTags: any[]
  eventTags: any[]
}

export function EventDescription({ description, venueTags, eventTags }: EventDescriptionProps) {
  const [isTagsExpanded, setIsTagsExpanded] = useState(false)
  
  const allTags = [
    ...(venueTags?.map((vt: any) => ({ ...vt, type: 'venue' })) || []),
    ...(eventTags?.map((et: any) => ({ ...et, type: 'event' })) || [])
  ]
  const displayTags = isTagsExpanded ? allTags : allTags.slice(0, 2)

  return (
    <section id="overview" className="scroll-mt-32">
      <SectionHeading title="The Venue Experience" subtitle="A masterpiece of premium architecture and hospitality" />
      <ExpandableHtml htmlContent={description || "Relish an elite atmosphere tailored for grand celebrations."} />
      
      <div className="mt-10 pt-10 border-t border-gray-100">
        <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Venue & Event Category</h4>
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag: any) => (
            <span 
              key={`${tag.type}-${tag.id}`} 
              className={`${tag.type === 'venue' ? 'bg-gray-100 text-gray-700 border-gray-200' : 'bg-orange-50 text-[#FF9530] border-orange-100'} text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border shadow-sm cursor-default transition-all hover:scale-105`}
            >
              {tag.name}
            </span>
          ))}
          {allTags.length > 2 && (
            <button 
              onClick={() => setIsTagsExpanded(!isTagsExpanded)}
              className="text-[#FF9530] text-[10px] font-black uppercase tracking-widest px-4 py-2 flex items-center gap-1 hover:underline"
            >
              {isTagsExpanded ? 'See Less' : `+${allTags.length - 2} More`}
              <ChevronRight className={`w-3 h-3 transition-transform ${isTagsExpanded ? '-rotate-90' : 'rotate-90'}`} />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
