'use client'

import React, { useState } from 'react'
import { Check, Plus, ShieldCheck, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from './SharedComponents'

interface Amenity {
  id: string | number
  name: string
}

interface EventAmenitiesProps {
  highlights: Amenity[]
  amenities: Amenity[]
  services: Amenity[]
  venueTitle: string
}

export function EventAmenities({ highlights, amenities, services, venueTitle }: EventAmenitiesProps) {
  const [amenityModalType, setAmenityModalType] = useState<'features' | 'services' | 'amenities' | null>(null)

  const hasContent = (highlights?.length || 0) > 0 || (amenities?.length || 0) > 0 || (services?.length || 0) > 0
  if (!hasContent) return null

  return (
    <section id="amenities" className="scroll-mt-32 pt-12 md:pt-16 border-t border-gray-100">
      <div className="flex items-center gap-3 mb-10 md:mb-14">
        <div className="w-1 h-8 bg-black rounded-full" />
        <SectionHeading title="Elite Amenities & Services" />
      </div>
      
      <div className="grid lg:grid-cols-3 gap-10 md:gap-16">
        {/* 1. HIGHLIGHTS / FEATURES */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-6 h-[1px] bg-orange-200" />
            <h4 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Venue Highlights</h4>
          </div>
          <div className="flex flex-col gap-3">
            {(highlights || []).slice(0, 2).map(h => (
              <div key={h.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-50 shadow-sm hover:border-[#FF9530] hover:shadow-md transition-all group cursor-default">
                <div className="w-6 h-6 rounded-lg bg-green-50 text-[#039c4d] flex items-center justify-center shrink-0 group-hover:bg-[#039c4d] group-hover:text-white transition-all">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-[13px] font-bold text-gray-800 tracking-tight">{h.name}</span>
              </div>
            ))}
            
            {(highlights?.length || 0) > 2 && (
              <button 
                onClick={() => setAmenityModalType('features')}
                className="w-full mt-2 p-4 rounded-2xl border border-dashed border-gray-200 text-gray-400 font-extrabold text-[9px] uppercase tracking-widest hover:border-[#FF9530] hover:text-[#FF9530] hover:bg-orange-50/30 transition-all flex items-center justify-center gap-2 group"
              >
                <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                {highlights.length - 2}+ Exclusive Highlights
              </button>
            )}
          </div>
        </div>

        {/* 2. CORE AMENITIES */}
        {amenities && amenities.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-[1px] bg-blue-200" />
              <h4 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">Property Amenities</h4>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(amenities || []).slice(0, 2).map((a) => (
                <span key={a.id} className="bg-gray-50 text-gray-600 border border-gray-100 text-[9px] md:text-[10px] font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:bg-white hover:border-[#FF9530] hover:text-[#FF9530] transition-all cursor-default">{a.name}</span>
              ))}
              
              {(amenities || []).length > 2 && (
                <button 
                  onClick={() => setAmenityModalType('amenities')}
                  className="text-[#FF9530] font-black text-[9px] uppercase tracking-widest px-4 py-2.5 rounded-xl border border-dashed border-orange-200 hover:bg-orange-50 transition-all"
                >
                  +{amenities.length - 2} facilities
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* 3. PREMIUM SERVICES */}
        {services && services.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-[1px] bg-gray-200" />
              <h4 className="text-[10px] md:text-[11px] font-black text-gray-400 uppercase tracking-widest">In-house Services</h4>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {(services || []).slice(0, 2).map(s => (
                <span key={s.id} className="bg-gray-900 text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-xl hover:bg-[#FF9530] hover:scale-105 transition-all cursor-default shadow-lg shadow-black/5">{s.name}</span>
              ))}
              
              {(services || []).length > 2 && (
                <button 
                  onClick={() => setAmenityModalType('services')}
                  className="bg-white border-2 border-dashed border-gray-100 text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest px-6 py-4 rounded-xl hover:border-[#FF9530] hover:text-[#FF9530] hover:bg-orange-50/30 transition-all flex items-center gap-2 group"
                >
                  <Plus className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
                  {services.length - 2}+ view all
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {amenityModalType && (
          <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setAmenityModalType(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative bg-white w-full sm:max-w-4xl xl:max-w-6xl max-h-[85vh] rounded-2xl sm:rounded-[3rem] shadow-4xl flex flex-col overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="shrink-0 flex items-start justify-between p-6 md:px-16 md:pt-12 md:pb-6 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2 md:mb-4 pr-10">
                    {amenityModalType === 'features' ? 'Exclusive Highlights' : amenityModalType === 'amenities' ? 'Property Amenities' : 'Premium Services'}
                  </h3>
                  <p className="text-gray-500 font-bold text-sm sm:text-base">Discover every premium {amenityModalType === 'features' ? 'highlight' : amenityModalType === 'amenities' ? 'amenity' : 'service'} available at {venueTitle}</p>
                </div>
                <button 
                  onClick={() => setAmenityModalType(null)} 
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 hover:bg-black hover:text-white transition-all shrink-0 ml-4"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-16 md:pt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                {amenityModalType === 'features' ? (
                  (highlights || []).map((h) => (
                    <div key={h.id} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-white border border-orange-50/50 shadow-sm hover:border-[#FF9530]/30 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-green-50 text-[#039c4d] flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm md:text-[14px] font-bold text-gray-800 leading-tight">{String(h.name || 'Highlight')}</span>
                    </div>
                  ))
                ) : amenityModalType === 'amenities' ? (
                  (amenities || []).map((a) => (
                    <div key={a.id} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-gray-50 border border-gray-100 shadow-sm hover:bg-white hover:border-orange-100 transition-all">
                      <div className="w-2 h-2 rounded-full bg-[#FF9530] shrink-0" />
                      <span className="text-xs sm:text-sm md:text-[14px] font-bold text-gray-700 leading-tight">{String(a.name || 'Amenity')}</span>
                    </div>
                  ))
                ) : (
                  (services || []).map((s) => (
                    <div key={s.id} className="flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-2xl bg-gray-900 border border-gray-800 shadow-sm hover:shadow-xl transition-all">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF9530] shrink-0" />
                      <span className="text-xs sm:text-sm md:text-[14px] font-bold text-white tracking-tight leading-tight">{String(s.name || 'Service')}</span>
                    </div>
                  ))
                )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
