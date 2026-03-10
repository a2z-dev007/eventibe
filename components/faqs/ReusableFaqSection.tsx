'use client'

import React from 'react'
import SectionHeader from '@/components/events/SectionHeader'
import FaqItem from '@/components/events/FaqItem'
import { HelpCircle, MessageCircle, PhoneIcon } from 'lucide-react'
import { FAQShimmer } from '@/components/faqs/FAQShimmers'

export interface FaqData {
  q: string
  a: string
}

interface ReusableFaqSectionProps {
  faqs?: FaqData[]
  isLoading?: boolean
  eyebrow?: string
  title?: string
  subtitle?: string
}

export default function ReusableFaqSection({
  faqs = [],
  isLoading = false,
  eyebrow = "Expert Guidance",
  title = "Everything You Need to Know",
  subtitle = "Providing clarity and confidence for your venue booking journey."
}: ReusableFaqSectionProps) {

  const hasData = faqs && faqs.length > 0
  
  const midPoint = Math.ceil((hasData ? faqs.length : 0) / 2)
  const leftFaqs = hasData ? faqs.slice(0, midPoint) : []
  const rightFaqs = hasData ? faqs.slice(midPoint) : []

  return (
    <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12">
          <SectionHeader 
            eyebrow={eyebrow}
            title={title} 
            subtitle={subtitle}
          />
        </div>

        {isLoading ? (
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
               <FAQShimmer />
            </div>
            <div className="space-y-4">
               <FAQShimmer />
            </div>
          </div>
        ) : hasData ? (
          <div className="max-h-[500px] overflow-y-auto pb-4 pt-2 scroll-smooth decorative-scrollbar">
            <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-start">
              {/* Left Column */}
              <div className="space-y-4">
                {leftFaqs.map((f, idx) => (
                  <FaqItem key={`left-${idx}`} q={f.q} a={f.a} />
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {rightFaqs.map((f, idx) => (
                  <FaqItem key={`right-${idx}`} q={f.q} a={f.a} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500 py-10 font-medium">
            No frequently asked questions available at the moment.
          </div>
        )}
        
        <div className="mt-16 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-300">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-orange-500/20">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-xl tracking-tight">Still have questions?</h4>
              <p className="text-slate-500 text-sm max-w-md">Our concierge team is available 24/7 to help you find the perfect space.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-md shadow-orange-500/10">
               Chat With Support
            </button>
            <button className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 px-8 py-3 rounded-xl font-bold text-sm transition-all active:scale-95">
               Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
