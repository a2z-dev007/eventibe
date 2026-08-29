'use client';

import React from 'react';
import { ShieldCheck, Zap, BarChart3, Clock, Globe2, HeartHandshake, CheckCircle2, Sparkles, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from '@/components/micro-interactions';
import Link from 'next/link';

const FEATURES = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
    title: "Enterprise Grade Sourcing",
    desc: "Every venue in our corporate network is manually verified for technical readiness, soundproofing, and professional service standards."
  },
  {
    icon: <Clock className="w-7 h-7 text-blue-600" />,
    title: "Rapid Response Units",
    desc: "Our dedicated corporate concierge team guarantees custom quotes and site visits arranged within 24 hours of your inquiry."
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-blue-600" />,
    title: "Simplified Direct Access",
    desc: "Skip middlemen and commissions. Connect directly with top venue decision-makers for competitive corporate pricing."
  },
  {
    icon: <Globe2 className="w-7 h-7 text-blue-600" />,
    title: "National Network",
    desc: "From tier-1 metros to emerging business hubs, discover verified quality spaces for leadership summits and annual expos."
  },
  {
    icon: <Zap className="w-7 h-7 text-blue-600" />,
    title: "Tech-Ready Spaces",
    desc: "Filter venues for dedicated high-speed optical fiber, 4K LED walls, sound isolation, and hybrid video conferencing equipment."
  },
  {
    icon: <HeartHandshake className="w-7 h-7 text-blue-600" />,
    title: "Vendor Ecosystem",
    desc: "Instantly discover top-rated corporate caterers, AV production tech partners, and security planners to complete your event team."
  }
];

export default function CorporateTrustSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 text-[300px] font-black leading-none rotate-12 -translate-x-1/4 -translate-y-1/4">CORPORATE</div>
        <div className="absolute bottom-0 right-0 text-[300px] font-black leading-none -rotate-12 translate-x-1/4 translate-y-1/4">EXCELLENCE</div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              <span className="text-xs font-black text-blue-700 uppercase tracking-[0.2em]">
                The Eventibe Enterprise Advantage
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy tracking-tight leading-tight mb-4">
              Why Corporate Planners <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
                Trust Eventibe
              </span>
            </h2>
            <p className="text-soft-slate text-base md:text-lg leading-relaxed">
              We've redesigned event sourcing for busy professionals. Zero cold calls, zero unverified listings — just high-performance spaces built for your high-impact corporate milestones.
            </p>
          </div>

          {/* Concierge Guarantee Badge */}
          <div className="shrink-0 bg-white border border-blue-100 p-5 rounded-2xl shadow-xl shadow-blue-500/5 max-w-xs flex flex-col gap-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>Concierge Guarantee SLA</span>
            </div>
            <p className="text-xs text-soft-slate leading-relaxed">
              Dedicated corporate support manager assigned within <strong className="text-primary-navy">15 minutes</strong> of request.
            </p>
            <Link 
              href="/contact-us"
              className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Talk to Corporate Concierge</span>
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
            >
              <TiltCard className="h-full rounded-2xl">
                <div className="h-full bg-white border border-gray-100 hover:border-blue-200/80 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 flex flex-col justify-between group">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50/80 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 shadow-sm mb-6">
                      {feature.icon && React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, {
                         className: "w-7 h-7 group-hover:text-white transition-colors"
                      })}
                    </div>
                    <h3 className="text-xl font-extrabold text-primary-navy mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-soft-slate text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

