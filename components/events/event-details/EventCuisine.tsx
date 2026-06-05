'use client'

import React, { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, FileText, Download, Utensils } from 'lucide-react'
import { SectionHeading, ExpandableText } from './SharedComponents'

interface CuisineDetail {
  id: string | number
  name: string
  file: string | null
  description: string | null
}

interface MenuDetail {
  id: string | number
  name: string
  file: string | null
  suitable_for?: string
}

interface EventCuisineProps {
  cuisines: CuisineDetail[]
  menus: MenuDetail[]
  getImageUrl: (path: string | null | undefined) => string
  venueTitle: string
  venueLoc: string
}

export function EventCuisine({ cuisines, menus, getImageUrl, venueTitle, venueLoc }: EventCuisineProps) {
  const cuisinesScrollRef = useRef<HTMLDivElement>(null)
  const [isDraggingCuisine, setIsDraggingCuisine] = useState(false)
  const [isHoveringCuisine, setIsHoveringCuisine] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleCuisineMouseDown = (e: React.MouseEvent) => {
    if (!cuisinesScrollRef.current) return
    setIsDraggingCuisine(true)
    setStartX(e.pageX - cuisinesScrollRef.current.offsetLeft)
    setScrollLeft(cuisinesScrollRef.current.scrollLeft)
  }

  const handleCuisineMouseLeave = () => {
    setIsDraggingCuisine(false)
    setIsHoveringCuisine(false)
  }

  const handleCuisineMouseUp = () => {
    setIsDraggingCuisine(false)
  }

  const handleCuisineMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingCuisine || !cuisinesScrollRef.current) return
    e.preventDefault()
    const x = e.pageX - cuisinesScrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    cuisinesScrollRef.current.scrollLeft = scrollLeft - walk
  }

  const scrollCuisines = (dir: 'left' | 'right') => {
    if (cuisinesScrollRef.current) {
      const amount = window.innerWidth > 768 ? 600 : 300
      cuisinesScrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }

  // Auto-scroll cuisines
  useEffect(() => {
    if (!cuisines?.length || isDraggingCuisine || isHoveringCuisine) return
    const timer = setInterval(() => {
      if (cuisinesScrollRef.current) {
        const amount = window.innerWidth > 768 ? 600 : 300
        const { scrollLeft, scrollWidth, clientWidth } = cuisinesScrollRef.current
        
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) {
          cuisinesScrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          cuisinesScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' })
        }
      }
    }, 4000)
    return () => clearInterval(timer)
  }, [cuisines, isDraggingCuisine, isHoveringCuisine])

  const hasCuisines = cuisines && cuisines.length > 0;
  const hasMenus = menus && menus.length > 0;

  if (!hasCuisines && !hasMenus) return null;

  return (
    <section id="cuisines" className="scroll-mt-[142px] pt-16 md:pt-10 w-full border-t border-gray-100">
      {hasCuisines && (
        <>
          <SectionHeading 
            title={`Global Cuisine Options at ${venueTitle}, ${venueLoc}`}
            action={
              <div className="hidden md:flex items-center gap-3">
                <button onClick={() => scrollCuisines('left')} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF9530] hover:border-[#FF9530] hover:shadow-lg transition-all active:scale-95 bg-white">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={() => scrollCuisines('right')} className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF9530] hover:border-[#FF9530] hover:shadow-lg transition-all active:scale-95 bg-white">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            }
          />
          <div 
            ref={cuisinesScrollRef} 
            className={`flex gap-4 md:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-8 -mx-4 px-4 md:px-0 md:mx-0 scroll-smooth ${isDraggingCuisine ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
            onMouseDown={handleCuisineMouseDown}
            onMouseEnter={() => setIsHoveringCuisine(true)}
            onMouseLeave={handleCuisineMouseLeave}
            onMouseUp={handleCuisineMouseUp}
            onMouseMove={handleCuisineMouseMove}
          >
            {cuisines.map((c) => (
              <div key={c.id} className="snap-center shrink-0 w-[75vw] sm:w-[45vw] md:w-[35vw] lg:w-[25vw] xl:w-[22vw] group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-[#FF9530]/50 transition-all duration-300 flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-orange-50 shrink-0 border border-orange-100/50 flex items-center justify-center">
                    {c.file ? (
                      <img src={getImageUrl(c.file)} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <Utensils className="w-5 h-5 text-[#FF9530]" />
                    )}
                  </div>
                  <h4 className="font-bold text-gray-900 text-base md:text-lg leading-tight group-hover:text-[#FF9530] transition-colors">{c.name}</h4>
                </div>
                <div className="mt-2 text-gray-500 text-xs md:text-sm leading-relaxed line-clamp-3">
                  {c.description?.replace(/<[^>]*>?/gm, '') || `Authentic ${c.name} delicacies specially crafted by our culinary experts.`}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {hasMenus && (
        <div className="mt-12 md:mt-10 pt-10 border-t border-gray-100">
          <div className="mb-8 flex items-center gap-3">
            <div className="w-8 h-1 bg-[#FF9530] rounded-full" />
            <h4 className="text-[12px] md:text-xl font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF9530]" />
              Download Event & Banquet Menu at <span className="text-[#FF9530]">{venueTitle}, {venueLoc}</span>
            </h4>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menus.map((m) => (
              <a 
                key={m.id} 
                href={getImageUrl(m.file)} 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-4 bg-white border border-gray-200 hover:border-[#FF9530] p-6 rounded-[2rem] transition-all duration-500 group shadow-lg hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Accent line on top of card */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#FF9530] opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 group-hover:bg-[#FF9530] group-hover:text-white transition-all duration-500">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-black text-gray-900 text-[14px] md:text-[15px] leading-tight mb-1 truncate group-hover:text-[#FF9530] transition-colors">{m.name}</p>
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest truncate leading-none">Access Full PDF Menu</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-orange-50/50 flex items-center justify-center shrink-0 group-hover:bg-[#FF9530] transition-all duration-500">
                  <Download className="w-4 h-4 text-[#FF9530] group-hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
