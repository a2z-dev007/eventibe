'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { fetchEventTypes } from '@/lib/api/eventsEndpoints'
import type { EventTypeRecord } from '@/lib/api/eventsEndpoints'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { IMAGES } from '@/assets/images'

export default function EventTypesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [eventTypes, setEventTypes] = useState<EventTypeRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchEventTypes()
      .then((res) => {
        if (!cancelled && res.records) setEventTypes(res.records)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Failed to load event types')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [])

  const scroll = (dir: 'prev' | 'next') => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('.event-type-item') as HTMLElement | null
    if (!card) return
    const gap = parseFloat(getComputedStyle(track).columnGap || '0')
    const step = (card.getBoundingClientRect().width + gap) * 3
    track.scrollBy({ left: dir === 'prev' ? -step : step, behavior: 'smooth' })
  }

  return (
    <section className="py-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
          <SectionHeader
            eyebrow="Moments that Matter"
            title="Plan Your Perfect Celebration"
            subtitle="From magical weddings and surprise birthdays to professional corporate meets, find the vibe that fits."
          />
          <div className="hidden sm:block mt-2">
            <p className="text-[10px] font-mono text-gray-300">Route: /event/list</p>
          </div>
          {/* Scroll & See All Navigation */}
          <div className="flex items-center gap-6 shrink-0 sm:mb-8">
            <Link 
              href="/event/list" 
              className="text-sm font-black text-gray-400 uppercase tracking-widest hover:text-[#FF9530] transition-colors"
            >
              See All
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('prev')}
                className="h-12 w-12 rounded-2xl flex items-center justify-center border border-gray-100 bg-white shadow-xl shadow-gray-200/50 hover:bg-[#FF9530] hover:text-white transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 group-hover:scale-110" />
              </button>
              <button
                onClick={() => scroll('next')}
                className="h-12 w-12 rounded-2xl flex items-center justify-center border border-gray-100 bg-white shadow-xl shadow-gray-200/50 hover:bg-[#FF9530] hover:text-white transition-all duration-300 group"
              >
                <ChevronRight className="w-6 h-6 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={trackRef} 
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-10 -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {loading ? (
            <div className="flex gap-6 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="shrink-0 w-[160px] sm:w-[200px] flex flex-col items-center">
                  <div className="w-full aspect-[4/5] rounded-[2rem] bg-gray-100 animate-pulse" />
                  <div className="mt-4 h-5 w-24 rounded-lg bg-gray-100 animate-pulse" />
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="py-10 text-gray-500 text-sm font-medium">{error}</p>
          ) : (
            eventTypes.map((v) => (
              <Link
                key={v.id}
                href={`/events/search?event_type=${v.id}`}
                className="event-type-item shrink-0 w-[160px] sm:w-[200px] group cursor-pointer transition-all duration-500"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] group-hover:-translate-y-2 transition-all duration-500">
                  <img
                    src={v.file || IMAGES.placeholder.src}
                    alt={v.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = IMAGES.placeholder.src
                    }}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute top-4 right-4 bg-[#FF9530] rounded-xl px-2.5 py-1 text-[9px] font-black text-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    VIEW
                  </div>
                </div>
                
                <div className="text-center sm:text-left transition-all duration-300">
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-[#FF9530] transition-colors leading-tight">
                    {v.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mt-1 opacity-100 group-hover:text-[#FF9530]/70 transition-colors">
                    Start Planning →
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
