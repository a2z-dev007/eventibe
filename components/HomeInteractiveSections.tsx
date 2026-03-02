'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, CalendarCheck, MessageSquare, Star, Quote, ArrowRight } from 'lucide-react';
import { TiltCard, MagneticButton } from '@/components/micro-interactions';

/* ═══════════════════════════════════════════════════════════════════
   How It Works – Auto-advancing stepper (Fixed Iteration)
   ═══════════════════════════════════════════════════════════════════ */
export function HowItWorksSection() {
  const [totalProgress, setTotalProgress] = React.useState(0); // 0 to 300
  const [isPaused, setIsPaused] = React.useState(false);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const STAGE_DURATION = 5000; // 5 seconds per stage
  const TICK = 16; // 60fps updates

  const steps = [
    { icon: <Search size={36} />, color: 'text-corporate-blue', activeColor: 'border-corporate-blue', bgActive: 'bg-corporate-blue/10', title: '1. Discover', desc: 'Browse our curated selection of premium venues and professional vendors.' },
    { icon: <MessageSquare size={36} />, color: 'text-accent-orange', activeColor: 'border-accent-orange', bgActive: 'bg-accent-orange/10', title: '2. Connect', desc: 'Send inquiries, request quotes, and communicate directly with partners.' },
    { icon: <CalendarCheck size={36} />, color: 'text-corporate-blue', activeColor: 'border-corporate-blue', bgActive: 'bg-corporate-blue/10', title: '3. Book & Host', desc: 'Secure your booking and host a memorable event for your team or clients.' },
  ];

  React.useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(() => {
      setTotalProgress((prev) => (prev >= 300 ? 0 : prev + (100 / (STAGE_DURATION / TICK))));
    }, TICK);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused]);

  // Derived state
  const activeStep = Math.min(Math.floor(totalProgress / 100), 2);
  const line1Progress = totalProgress <= 100 ? totalProgress : 100;
  const line2Progress = totalProgress <= 100 ? 0 : totalProgress <= 200 ? (totalProgress - 100) : 100;

  const handleStepClick = (index: number) => {
    setTotalProgress(index * 100);
  };

  return (
    <section className="py-20 bg-white border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">How It Works</h2>
          <p className="text-soft-slate text-lg max-w-2xl mx-auto mb-4">Planning a corporate event has never been this simple.</p>
          <Link 
            href="/how-it-works" 
            className="inline-flex items-center gap-2 text-corporate-blue font-bold hover:text-accent-orange transition-colors group"
          >
            Learn more about our process
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* ── MOBILE: horizontal snap carousel ─────────────────────────── */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          <div className="shrink-0 w-1" aria-hidden />
          {steps.map((step, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 flex flex-col items-center text-center rounded-3xl p-8 transition-all duration-500 ${
                activeStep === i
                  ? 'bg-white shadow-xl border-2 border-accent-orange/30'
                  : 'bg-gray-50 border-2 border-transparent opacity-60'
              }`}
              style={{ width: '75vw', maxWidth: '300px' }}
              onClick={() => handleStepClick(i)}
            >
              <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mb-6 transition-all duration-500 ${
                activeStep === i
                  ? `${step.bgActive} ${step.activeColor} shadow-lg scale-110 ${step.color}`
                  : `bg-white border-gray-100 shadow-sm ${step.color}`
              }`}>
                {step.icon}
              </div>
              <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${activeStep === i ? 'text-primary-navy' : 'text-gray-400'}`}>{step.title}</h3>
              <p className={`text-sm transition-colors duration-300 ${activeStep === i ? 'text-soft-slate' : 'text-gray-300'}`}>{step.desc}</p>
            </div>
          ))}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* ── DESKTOP: auto-advancing stepper ─────────────────────────── */}
        <div
          className="hidden md:block max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex justify-between items-start">
            
            {/* BACKGROUND LINE */}
            <div className="absolute top-[48px] left-[16.66%] right-[16.66%] h-[3px] bg-gray-100 z-0" />

            {/* PROGRESS LINE 1 (Step 1 to 2) */}
            <div className="absolute top-[48px] z-10" style={{ left: '16.66%', width: '33.33%' }}>
               <div className="relative h-[3px] w-full">
                  <div
                    className="h-full bg-gradient-to-r from-corporate-blue to-accent-orange"
                    style={{ width: `${line1Progress}%`, transition: 'none' }}
                  />
                  {line1Progress > 0 && line1Progress < 100 && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-orange shadow-[0_0_10px_#F97316]"
                      style={{ left: `${line1Progress}%`, transform: 'translate(-50%, -50%)', transition: 'none' }}
                    />
                  )}
               </div>
            </div>

            {/* PROGRESS LINE 2 (Step 2 to 3) */}
            <div className="absolute top-[48px] z-10" style={{ left: '50%', width: '33.33%' }}>
               <div className="relative h-[3px] w-full">
                  <div
                    className="h-full bg-gradient-to-r from-accent-orange to-corporate-blue"
                    style={{ width: `${line2Progress}%`, transition: 'none' }}
                  />
                  {line2Progress > 0 && line2Progress < 100 && (
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent-orange shadow-[0_0_10px_#F97316]"
                      style={{ left: `${line2Progress}%`, transform: 'translate(-50%, -50%)', transition: 'none' }}
                    />
                  )}
               </div>
            </div>

            {/* Steps icons & text */}
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              const isCompleted = activeStep > i;
              return (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center text-center cursor-pointer relative z-20"
                  onClick={() => handleStepClick(i)}
                >
                  {/* Icon circle */}
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mb-8 transition-all duration-700 bg-white ${
                    isActive
                      ? `${step.bgActive} ${step.activeColor} shadow-2xl scale-125 z-30 ${step.color}`
                      : isCompleted
                        ? `${step.activeColor} shadow-md ${step.color}`
                        : `border-gray-100 shadow-sm text-gray-300`
                  }`}>
                    <div className={isActive ? 'animate-pulse' : ''}>{step.icon}</div>
                  </div>

                  {/* Text */}
                  <div className={`transition-all duration-700 ${isActive ? 'translate-y-1' : ''}`}>
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                      isActive ? 'text-primary-navy' : isCompleted ? 'text-primary-navy/80' : 'text-gray-300'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`max-w-[240px] text-sm leading-relaxed transition-colors duration-500 ${
                      isActive ? 'text-soft-slate' : isCompleted ? 'text-soft-slate/60' : 'text-gray-400'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Testimonials – with tilt cards and shimmer
   ═══════════════════════════════════════════════════════════════════ */
export function TestimonialsSection() {
  const testimonials = [
    { quote: '"Eventibe completely transformed how we organize our annual executive retreats. The quality of venues and seamless booking process saved us weeks of planning."', name: 'Sarah Jenkins', role: 'VP of Operations, TechCorp', seed: 'user1' },
    { quote: '"Finding reliable AV and catering vendors in new cities used to be a nightmare. Now, we just use Eventibe and know we\'re getting top-tier professionals every time."', name: 'David Chen', role: 'Event Director, Global Media', seed: 'user2' },
    { quote: '"As a venue owner, partnering with Eventibe has significantly increased our corporate bookings. The platform connects us directly with serious, high-budget clients."', name: 'Elena Rodriguez', role: 'General Manager, The Grand Hotel', seed: 'user3' },
  ];

  return (
    <section className="py-20 bg-primary-navy text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Trusted by Industry Leaders</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">See what event planners and corporate leaders are saying about Eventibe.</p>
        </div>

        {/* ── MOBILE: horizontal snap carousel ─────────────────────────── */}
        <div
          className="md:hidden flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' } as React.CSSProperties}
        >
          <div className="shrink-0 w-1" aria-hidden />
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="snap-start shrink-0 bg-white/5 p-6 rounded-2xl border border-white/10 relative flex flex-col group active:scale-[0.98] transition-transform duration-300"
              style={{ width: '80vw', maxWidth: '320px' }}
            >
              <Quote className="absolute top-5 right-5 text-white/10" size={36} />
              <div className="flex gap-1 text-accent-orange mb-4">
                {Array(5).fill(0).map((_, s) => <Star key={s} size={16} className="fill-current" />)}
              </div>
              <p className="text-white mb-6 relative z-10 font-medium leading-relaxed text-sm flex-1">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden relative shrink-0">
                  <Image src={`https://picsum.photos/seed/${t.seed}/100/100`} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{t.name}</h4>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="shrink-0 w-1" aria-hidden />
        </div>

        {/* ── DESKTOP: 3-col tilt cards ──────────────────────────────── */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TiltCard key={i} className="rounded-2xl">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative group hover:bg-white/10 hover:border-white/20 transition-all duration-500 h-full cursor-default">
                {/* Shimmer on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                  <div className="shimmer-line absolute inset-0" />
                </div>
                <Quote className="absolute top-6 right-6 text-white/10 group-hover:text-white/20 transition-colors duration-500" size={48} />
                <div className="flex gap-1 text-accent-orange mb-6">
                  {Array(5).fill(0).map((_, s) => (
                    <Star key={s} size={20} className="fill-current group-hover:scale-110 transition-transform duration-300" style={{ transitionDelay: `${s * 50}ms` }} />
                  ))}
                </div>
                <p className="text-white mb-8 relative z-10 font-medium leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative group-hover:ring-2 group-hover:ring-accent-orange/40 transition-all duration-500">
                    <Image src={`https://picsum.photos/seed/${t.seed}/100/100`} alt={t.name} fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{t.role}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   CTA Section – with magnetic buttons and glow
   ═══════════════════════════════════════════════════════════════════ */
export function CTASection() {
  return (
    <section className="py-24 bg-light-bg text-primary-navy relative overflow-hidden border-t border-gray-200">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-corporate-blue rounded-full blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent-orange rounded-full blur-3xl opacity-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-primary-navy">Ready to host an unforgettable event?</h2>
        <p className="text-xl text-soft-slate mb-10 max-w-2xl mx-auto">
          Join thousands of companies who trust Eventibe to find the perfect venue and services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <MagneticButton>
            <Link href="/venues" className="group/cta inline-flex items-center gap-2 bg-cta-gradient text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-all duration-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 relative overflow-hidden">
              <span className="absolute inset-0 shimmer-line opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" />
              <span className="relative z-10">Find a Venue</span>
              <ArrowRight size={18} className="relative z-10 group-hover/cta:translate-x-1 transition-transform duration-300" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link href="/list-your-venue" className="group/cta2 bg-white border text-primary-navy border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transition-all duration-500 shadow-sm inline-flex items-center gap-2 relative overflow-hidden">
              <span className="relative z-10">List Your Venue</span>
              <ArrowRight size={18} className="relative z-10 group-hover/cta2:translate-x-1 transition-transform duration-300" />
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
