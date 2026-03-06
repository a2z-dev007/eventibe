'use client';

import React from 'react';
import { ShieldCheck, Zap, BarChart3, Clock, Globe2, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
    title: "Enterprise Grade Sourcing",
    desc: "Every venue in our corporate network is manually verified for technical readiness and professional service standards."
  },
  {
    icon: <Clock className="w-8 h-8 text-blue-500" />,
    title: "Rapid Response Units",
    desc: "Our dedicated corporate concierge ensures quotes and site visits are arranged within 24 hours of inquiry."
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
    title: "Simplified Direct Access",
    desc: "Skip the middlemen. Connect directly with venue decision-makers for the most competitive corporate pricing."
  },
  {
    icon: <Globe2 className="w-8 h-8 text-blue-500" />,
    title: "National Network",
    desc: "From tier-1 cities to emerging business hubs, find consistent quality for regional meetings and national summits."
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    title: "Tech-Ready Spaces",
    desc: "Filter for specific requirements like high-speed dedicated internet, LED walls, and hybrid meeting capabilities."
  },
  {
    icon: <HeartHandshake className="w-8 h-8 text-blue-500" />,
    title: "Vendor Ecosystem",
    desc: "Instantly discover top-rated corporate caterers, AV tech partners, and event planners to complete your team."
  }
];

export default function CorporateTrustSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <div className="absolute top-0 left-0 text-[300px] font-black leading-none rotate-12 -translate-x-1/4 -translate-y-1/4">CORPORATE</div>
        <div className="absolute bottom-0 right-0 text-[300px] font-black leading-none -rotate-12 translate-x-1/4 translate-y-1/4">EXCELLENCE</div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-blue-600" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-[0.25em]">
              The Eventibe Advantage
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy tracking-tight leading-tight mb-6">
            Why Corporate Planners <br className="hidden md:block" />
            <span className="text-blue-600">Trust Eventibe</span>
          </h2>
          <p className="text-soft-slate text-lg leading-relaxed">
            We've redesigned the event sourcing experience for busy professionals. No more endless phone calls or unverified listings. Just high-performance spaces for your next high-impact event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col gap-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm">
                {feature.icon && React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, {
                   className: "w-8 h-8 group-hover:text-white transition-colors"
                })}
              </div>
              <div>
                <h3 className="text-xl font-bold text-primary-navy mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-soft-slate text-base leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
