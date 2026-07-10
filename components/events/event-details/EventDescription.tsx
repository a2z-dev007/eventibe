'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight, Building2, PartyPopper } from 'lucide-react'
import { SectionHeading, ExpandableHtml } from './SharedComponents'

interface EventDescriptionProps {
  description: string
  venueTags: any[]
  eventTags: any[]
  venueCity: string
  venueName: string
}

export function EventDescription({ description, venueTags, eventTags, venueCity, venueName }: EventDescriptionProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTagsExpanded, setIsTagsExpanded] = useState(false)
  const pathname = usePathname()
  const isVenuePage = pathname?.includes('/venue')

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const hasContent = !!description || (venueTags && venueTags.length > 0) || (eventTags && eventTags.length > 0)
  if (!hasContent) return null

  return (
    <section id="overview" className="scroll-mt-32">
      <SectionHeading
        title={isVenuePage ? `Find the Perfect Venue in ${venueCity}` : `Craft Unforgettable Events in ${venueCity}`}
        titleClassName="text-gray-900"
        subtitle={isVenuePage ? `Explore Venues for Corporate & Social Events – Weddings, Exhibitions & Anniversaries at ${venueName}, ${venueCity}` : `Celebrate Corporate & Social Events – Weddings, Exhibitions & Anniversaries at ${venueName}, ${venueCity}`}
        subtitleClassName="text-[#FF9530]"
      />

      <div className="space-y-8">
        {description && <ExpandableHtml htmlContent={description} />}

        {((venueTags && venueTags.length > 0) || (eventTags && eventTags.length > 0)) && (
          <div className={`pt-8 border-t border-gray-100 ${!description ? 'border-t-0 pt-0' : ''}`}>
            <div className="flex items-center gap-3 mb-8">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                {isVenuePage ? `Explore Premium Venue at ${venueName}, ${venueCity}` : `Celebrate Premium Events at ${venueName}, ${venueCity}`}
              </h4>
            </div>

            <div className="space-y-8">
              {/* {venueTags && venueTags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Building2 className="w-4 h-4 text-gray-400" />
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Venue Type</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {venueTags.map((tag: any) => (
                    <div key={tag.id} className="bg-white text-gray-700 border border-gray-200 text-xs md:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:border-gray-300 flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            )} */}

              {eventTags && eventTags.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <PartyPopper className="w-4 h-4 text-[#FF9530]" />
                    <p className="text-[11px] font-black text-[#FF9530] uppercase tracking-widest">Ideal For Events</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {(isTagsExpanded ? eventTags : eventTags.slice(0, isMobile ? 5 : 8)).map((tag: any) => (
                      <div key={tag.id} className="bg-gradient-to-br from-orange-50/50 to-white text-gray-800 border border-orange-100/50 text-xs md:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-[0_2px_10px_rgba(255,149,48,0.05)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(255,149,48,0.1)] hover:border-orange-200 flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF9530]" />
                        {tag.name}
                      </div>
                    ))}

                    {eventTags.length > (isMobile ? 5 : 8) && (
                      <button
                        onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                        className="bg-white text-[#FF9530] border border-orange-100 text-xs md:text-sm font-bold px-5 py-2.5 rounded-2xl shadow-sm hover:bg-orange-50 transition-all flex items-center gap-2 active:scale-95 group"
                      >
                        {isTagsExpanded ? 'Show Less' : `+${eventTags.length - (isMobile ? 5 : 8)} More`}
                        <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isTagsExpanded ? '-rotate-90' : 'rotate-90'}`} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
