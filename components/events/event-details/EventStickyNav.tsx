'use client'

import React from 'react'
import { Camera, LayoutGrid, Sparkles, ShieldCheck, Utensils, MapPin, Heart, MessageCircle, Info } from 'lucide-react'

interface EventStickyNavProps {
  activeTab: string
  scrollToSection: (id: string) => void
}

export function EventStickyNav({ activeTab, scrollToSection }: EventStickyNavProps) {
  const tabs = [
    { id: 'gallery', label: 'Gallery', icon: <Camera className="w-4 h-4" /> },
    { id: 'overview', label: 'Overview', icon: <LayoutGrid className="w-4 h-4" /> },
    { id: 'amenities', label: 'Amenities', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'policies', label: 'Policies', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'cuisines', label: 'Cuisines', icon: <Utensils className="w-4 h-4" /> },
    { id: 'location', label: 'Location', icon: <MapPin className="w-4 h-4" /> },
    { id: 'stories', label: 'Stories', icon: <Heart className="w-4 h-4" /> },
    { id: 'faqs', label: 'FAQs', icon: <MessageCircle className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ]

  return (
    <div className="sticky top-[72px] lg:top-[100px] xl:top-[112px] z-[50] bg-white border-b border-gray-100 shadow-sm overflow-x-auto scrollbar-hide pt-5 pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start lg:justify-center gap-6 md:gap-8 whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => scrollToSection(tab.id)}
            className={`text-[11px] md:text-[13px] font-black uppercase tracking-widest transition-all relative flex items-center gap-2 py-1 px-1 ${
              activeTab === tab.id ? 'text-[#FF9530]' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute -bottom-3 md:-bottom-4 left-0 right-0 h-1 bg-[#FF9530] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
