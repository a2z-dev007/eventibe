'use client'
import React from 'react'
import { EVENT_SPECS_MAPPING, EventSpecSection } from '@/utils/const'
import { Check, X, Users, Utensils, ShieldCheck, Music, Info } from 'lucide-react'

export function EventDetailedSpecs({ content }: { content?: any }) {
  if (!content || Object.keys(content).length === 0) return null

  const data = content

  const iconsMap: Record<string, any> = {
    Users, Utensils, ShieldCheck, Music
  }

  const renderFieldValue = (val: any, type: string, prefix?: string, suffix?: string) => {
    if (val === undefined || val === null || val === '') return <span className="text-gray-300 font-bold text-xs uppercase">N/A</span>
    
    if (type === 'boolean') {
      return val ? (
        <span className="text-green-600 font-black text-[10px] uppercase tracking-widest bg-green-50 px-2 py-1 rounded-md border border-green-100">Yes</span>
      ) : (
        <span className="text-gray-400 font-black text-[10px] uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-md border border-gray-100">No</span>
      )
    }
    
    return (
      <span className="text-gray-900 font-bold text-sm md:text-base">
        {prefix}{val}{suffix}
      </span>
    )
  }

  return (
    <section className="mt-24 md:mt-32 scroll-mt-[142px]" id="detailed-specs">
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-6">
          <span className="h-[2px] w-12 bg-gray-900 rounded-full" />
          <p className="text-[12px] font-black text-gray-900 uppercase tracking-[0.4em]">
            Technical Details
          </p>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
          Property Specifications & <br className="hidden md:block" />
          <span className="text-[#FF9530]">Standard Operating Protocols</span>
        </h2>
      </div>

      <div className="space-y-24 md:space-y-32">
        {EVENT_SPECS_MAPPING.map((section: EventSpecSection) => {
          const Icon = iconsMap[section.icon] || Info
          return (
            <div key={section.id} className="group">
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
                {/* Left side: Section Title */}
                <div className="lg:w-1/3">
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF9530] flex items-center justify-center mb-6 border border-orange-100 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 tracking-tight">{section.title}</h3>
                  <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-xs">Essential operational data and venue constraints for event planning.</p>
                </div>

                {/* Right side: Fields Grid */}
                <div className="lg:w-2/3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                    {section.fields.filter(f => f.type !== 'notes').map((field) => (
                      <div key={field.key} className="flex flex-col gap-1.5 pb-4 border-b border-gray-100/60">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{field.label}</span>
                        <div className="flex items-center gap-2">
                          {renderFieldValue(data[field.key], field.type, field.prefix, field.suffix)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notes for this section */}
                  <div className="mt-10 space-y-4">
                    {section.fields.filter(f => f.type === 'notes').map(field => {
                      if (!data[field.key]) return null;
                      return (
                        <div key={field.key} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex gap-4 items-start">
                          <Info className="w-5 h-5 text-[#FF9530] shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{field.label}</h5>
                            <p className="text-sm text-gray-700 leading-relaxed font-semibold">{data[field.key]}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
