"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, TrendingUp, Target, Layers, 
  BarChart3, Settings, ShieldCheck, PieChart, Users, 
  Globe, Zap, Briefcase, Rocket, Sparkles, Building2, Star
} from "lucide-react";
import Image from "next/image";

/* ═══ GSAP Parallax Hook (Same Logic as Brand Story) ═══ */
function useGsapParallax() {
  useEffect(() => {
    let ctx: any = null;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((el) => {
          gsap.to(el, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 },
          });
        });
        gsap.utils.toArray<HTMLElement>(".parallax-text").forEach((el) => {
          gsap.to(el, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.8 },
          });
        });
        gsap.utils.toArray<HTMLElement>(".line-grow").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 90%", end: "top 60%", scrub: true },
          });
        });
      });
    })();
    return () => { ctx?.revert(); };
  }, []);
}

/* ═══ Animation Wrappers ═══ */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function SectionHeading({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) {
  return (
    <div className="mb-16">
      <FadeUp>
        {subtitle && <p className={`text-xs font-bold uppercase tracking-[0.3em] mb-4 ${light ? 'text-white/40' : 'text-[#F97316]'}`}>{subtitle}</p>}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] tracking-tight ${light ? 'text-white' : 'text-[#0B1F3A]'}`}>
          {title}
        </h2>
        <div className={`w-20 h-1.5 mt-6 rounded-full ${light ? 'bg-white/10' : 'bg-gradient-to-r from-[#F97316] to-[#FBBF24]'}`} />
      </FadeUp>
    </div>
  );
}

/** 3D tilt card with glow effect on hover */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -5;
    const rotateY = (x - centerX) / centerX * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(249,115,22,0.08) 0%, transparent 70%)`;
      glowEl.style.opacity = '1';
    }
  };
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) glowEl.style.opacity = '0';
  };
  return (
    <div ref={cardRef} className={`relative transition-transform duration-200 ease-out ${className}`} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="tilt-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 z-0 transition-opacity duration-300" />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}

export default function InvestorRelationsClient() {
  useGsapParallax();

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-[#F97316]/30">
      
      {/* ━━━ 1. HERO & EXECUTIVE SUMMARY ━━━ */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 overflow-hidden bg-[#0B1F3A]">
        {/* Hero Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Homocation Asia"
            fill
            className="parallax-bg object-cover brightness-[0.2] scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/40 via-transparent to-[#0B1F3A]" />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#1e3a8a,transparent_70%)] opacity-30" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#F97316]/5 blur-[150px] rounded-full translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#2563EB]/10 blur-[130px] rounded-full -translate-x-1/2" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-[0.25em]">Investor Relations Profile</span>
            </div>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
              Homocation Asia<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FBBF24] to-[#F97316]">Private Limited</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.4}>
            <p className="text-white/50 text-base md:text-xl font-medium tracking-widest uppercase mb-12">
              (Parent Company of Eventibe.com & VenueForEvent.com)
            </p>
          </FadeUp>

          <div className="max-w-4xl mx-auto">
            <FadeUp delay={0.6}>
              <div className="p-8 md:p-12 rounded-[40px] bg-white text-left shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <TrendingUp className="text-[#F97316]/20 w-16 h-16" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mb-6">Executive Summary</h2>
                <div className="space-y-6 text-[#334155] text-base md:text-lg leading-relaxed">
                  <p>
                    Homocation Asia Private Limited is building a next-generation digital marketplace focused on event venues and the expanding event services ecosystem. Our core brands — **Eventibe.com** and **VenueForEvent.com** — are designed to address long-standing inefficiencies in event discovery, vendor connection, and event planning workflows, particularly in emerging markets such as India.
                  </p>
                  <p>
                    With a structured inquiry-based model, strong SEO architecture, and future-ready vendor & CRM integration, the company is positioned to capture significant growth in the emerging experiential economy.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap gap-4">
                   <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100">
                      <Zap className="text-[#F97316]" size={20} />
                      <span className="font-bold text-[#0B1F3A]">Scalable Growth</span>
                   </div>
                   <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-gray-50 border border-gray-100">
                      <Target className="text-[#1E3A8A]" size={20} />
                      <span className="font-bold text-[#0B1F3A]">Market Leader</span>
                   </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
          <span className="text-white/20 text-[10px] uppercase tracking-[0.4em]">Slide to Explore</span>
          <div className="w-6 h-10 rounded-full border border-white/10 flex justify-center p-1.5">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-[#F97316] rounded-full" />
          </div>
        </div>
      </section>

      {/* ━━━ 2. MARKET OPPORTUNITY ━━━ */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading title="Market Opportunity — Why Now?" subtitle="Market Analysis" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Global Market */}
            <div className="lg:col-span-12 mb-16">
               <FadeUp>
                 <h3 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mb-8 flex items-center gap-4">
                   <Globe className="text-[#F97316]" /> Global Event Economy Growth
                 </h3>
               </FadeUp>
               
                <FadeUp>
                  <p className="text-[#334155] mb-8 leading-relaxed">
                    The global events industry is experiencing robust expansion due to:
                  </p>
                </FadeUp>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    "Rebounding post-pandemic demand",
                    "Corporate demand for conferences & experiential marketing",
                    "Rising consumer spending on weddings and milestone celebrations",
                    "Increased digital discoverability and planning behavior"
                  ].map((text, i) => (
                    <FadeUp key={i} delay={0.1 * i}>
                      <div className="p-6 h-full rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all duration-300">
                        <p className="text-sm font-bold text-[#334155] leading-relaxed">{text}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>

                <FadeUp>
                  <p className="text-[#334155] mb-8 text-sm font-bold italic">According to multiple industry reports:</p>
                </FadeUp>

               <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <FadeUp>
                    <div className="p-8 md:p-10 rounded-[32px] bg-[#0B1F3A] text-white relative overflow-hidden group">
                       <div className="absolute top-0 right-0 p-8 scale-150 opacity-10 group-hover:opacity-20 transition-opacity">📈</div>
                       <div className="space-y-4">
                          <p className="text-white/60 text-lg">The global live events market was valued at <span className="text-white font-black">$1.13 trillion</span> in 2024.</p>
                          <p className="text-white/60 text-lg">Forecasted to reach over <span className="text-[#F97316] font-black">$1.6 trillion</span> by 2032 (CAGR 4.4%).</p>
                          <div className="h-2 w-full bg-white/10 rounded-full mt-4">
                             <motion.div initial={{ width: 0 }} whileInView={{ width: "70%" }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-[#F97316] rounded-full" />
                          </div>
                          <p className="text-xs text-white/40 italic">Weddings, corporate conferences, and large-scale celebrations are among the fastest-growing segments.</p>
                       </div>
                    </div>
                  </FadeUp>
                   <FadeUp delay={0.2}>
                    <div className="p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white relative overflow-hidden">
                       <h4 className="text-xl font-black mb-6">Reflecting a rising demand for:</h4>
                       <ul className="space-y-4">
                          {[
                            "Event booking platforms",
                            "Vendor marketplaces",
                            "Venue discovery networks",
                            "Integrated event planning tools"
                          ].map((text, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <CheckCircle2 size={18} className="text-white" />
                              <span className="font-bold">{text}</span>
                            </li>
                          ))}
                       </ul>
                    </div>
                  </FadeUp>
               </div>
            </div>

            {/* Indian Market */}
            <div className="lg:col-span-12">
               <div className="line-grow w-full h-[1px] bg-gray-200 mb-16" />
                <FadeUp>
                   <h3 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mb-8 flex items-center gap-4">
                     <Building2 className="text-[#F97316]" /> India’s Event Economy — A Rapidly Expanding Market
                   </h3>
                </FadeUp>
                <FadeUp>
                  <p className="text-[#334155] mb-8 leading-relaxed">
                    India represents a uniquely high-growth demand center:
                  </p>
                </FadeUp>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       { icon: "💍", title: "10 Million+", desc: "More than 10 million weddings annually with an estimated market size exceeding $50 billion." },
                       { icon: "🏢", title: "Corporate Hub", desc: "Corporate events sector growing due to increasing globalization, startup ecosystem growth, and regional business expansion." },
                       { icon: "🏙️", title: "Tier-2/3 Growth", desc: "Tier-2 and Tier-3 urbanization driving localized event demand." }
                     ].map((item, i) => (
                       <FadeUp key={i} delay={0.1*i} className={i === 0 ? "md:col-span-2" : ""}>
                         <div className="flex gap-5 p-6 rounded-3xl bg-gray-50 hover:bg-white border border-gray-100 hover:shadow-xl transition-all duration-500">
                           <span className="text-4xl">{item.icon}</span>
                           <div>
                             <p className="text-sm text-[#334155] leading-relaxed">{item.desc}</p>
                           </div>
                         </div>
                       </FadeUp>
                     ))}
                  </div>
                  <FadeUp delay={0.4}>
                     <div className="h-full p-8 md:p-10 rounded-[40px] bg-[#1E3A8A] text-white flex flex-col justify-center">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Forecasts show:</p>
                        <p className="text-4xl md:text-5xl font-black mb-4">12–15% <span className="text-lg font-normal text-white/60 block">CAGR</span></p>
                        <p className="text-lg leading-relaxed text-white/80">Indian event planning & wedding industry expected to grow over the next 5 years.</p>
                       <div className="mt-8 flex items-center gap-2">
                          <div className="w-12 h-1 bg-[#F97316] rounded-full" />
                          <div className="w-3 h-1 bg-white/20 rounded-full" />
                          <div className="w-3 h-1 bg-white/20 rounded-full" />
                       </div>
                    </div>
                  </FadeUp>
               </div>

               <FadeUp>
                  <p className="text-[#334155] leading-relaxed mt-12 bg-white p-6 rounded-2xl border border-gray-100 italic">
                    This makes India one of the most attractive markets for event marketplaces, especially with the rise of digital research behavior among younger demographics.
                  </p>
               </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3. TRENDS & PROBLEM STATEMENT ━━━ */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
             <div>
                 <SectionHeading title="Digital & Behavioral Trends Driving Growth" subtitle="Trends Analysis" />
                <div className="space-y-8">
                   {[
                     { 
                       title: "Digital Discovery", 
                       stat: "72%", 
                       desc: "of event planners research venues online prior to site visits.",
                       icon: <Globe className="text-[#F97316]" />
                     },
                     { 
                       title: "Mobile Usage", 
                       stat: "Primary", 
                       desc: "Event discovery and vendor search are increasingly mobile-driven.",
                       icon: <Zap className="text-[#F97316]" />
                     },
                     { 
                       title: "Experience-Led", 
                       stat: "Priority", 
                       desc: "Planning weddings and corporate events as emotional experiences — requiring visuals and comparisons.",
                       icon: <Sparkles className="text-[#F97316]" />
                     }
                   ].map((item, i) => (
                     <FadeUp key={i} delay={0.2 * i}>
                        <div className="group flex items-start gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                           <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                              {item.icon}
                           </div>
                           <div>
                              <p className="text-xs font-bold text-[#F97316] uppercase tracking-tighter mb-1">{item.title}</p>
                              <p className="text-2xl font-black text-[#0B1F3A] mb-2">{item.stat}</p>
                              <p className="text-[#334155] leading-relaxed">{item.desc}</p>
                           </div>
                        </div>
                     </FadeUp>
                   ))}
                 <FadeUp delay={0.6}>
                   <p className="mt-12 text-[#334155] font-bold text-center p-6 border-t border-gray-100">
                     These behavioral patterns significantly favor structured digital marketplaces over traditional directories.
                   </p>
                 </FadeUp>
                </div>
             </div>

             <div>
                 <SectionHeading title="Problem Statement — What Are We Solving?" subtitle="The Challenge" />
                 <div className="p-8 md:p-10 bg-white rounded-[40px] border border-gray-200 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                       <Target className="text-red-500/10 w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-black text-[#0B1F3A] mb-8">Fragmented Discovery Landscape</h3>
                    <p className="text-[#334155] mb-6 text-sm">Current venue and event vendor listings are scattered across generic listing portals, social media, local directories, and aggregator platforms.</p>
                    <h4 className="text-sm font-bold text-[#0B1F3A] mb-4">Problems include:</h4>
                   <div className="space-y-4">
                      {[
                        "Unverified information",
                        "Inconsistent visual presentation",
                        "Lack of structured search filters",
                        "Poor SEO findability",
                        "Non-specific category mappings"
                      ].map((text, i) => (
                        <FadeUp key={i} delay={0.1*i}>
                           <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 text-red-700 font-bold border border-red-100">
                              <span className="text-lg">❌</span>
                              <span>{text}</span>
                           </div>
                        </FadeUp>
                      ))}
                   </div>
                   
                   <div className="mt-12 pt-12 border-t border-gray-100">
                      <h3 className="text-xl font-black text-[#0B1F3A] mb-8">Complexity in Event Services</h3>
                      <p className="text-[#334155] leading-relaxed mb-6">
                        Finding vendors such as caterers, decor specialists, mehndi artists, photographers, DJs & lighting, and corporate AV teams often requires manual referrals, social networking, and offline negotiation.
                      </p>
                      <div className="p-6 rounded-3xl bg-[#0B1F3A] text-white mb-8">
                         <p className="font-bold leading-relaxed italic opacity-80">
                           "There is no unified digital marketplace for this ecosystem yet in the Indian context."
                         </p>
                      </div>

                      <h3 className="text-xl font-black text-[#0B1F3A] mb-6">Corporate Event Fragmentation</h3>
                       <p className="text-[#334155] leading-relaxed mb-4">Corporate event planners spend excessive time on:</p>
                       <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                          {[
                            "Manual venue research",
                            "Multi-vendor coordination",
                            "Event layout & capacity mapping",
                            "AV & technical requirement fulfillment"
                          ].map((t, i) => (
                            <li key={i} className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 border border-gray-100 text-sm font-bold text-[#0B1F3A]">
                               <CheckCircle2 size={14} className="text-[#F97316]" /> {t}
                            </li>
                          ))}
                       </ul>
                       <p className="text-[#F97316] font-black text-sm italic underline decoration-2 underline-offset-4">There is an opportunity for streamlined digital workflows.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ━━━ 4. PRODUCT ARCHITECTURE ━━━ */}
      <section className="py-24 md:py-36 px-6 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
           <SectionHeading title="Product Architecture & Value Proposition" subtitle="Our Solution" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
             <div>
                <FadeUp>
                   <h3 className="text-2xl md:text-4xl font-black text-[#0B1F3A] mb-8 leading-tight">
                     Dual Brand<br /><span className="text-[#F97316]">Strategy</span>
                   </h3>
                </FadeUp>
                <div className="space-y-12">
                   <div className="relative pl-8 border-l-2 border-[#F97316]">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#F97316]" />
                      <h4 className="text-xl font-black text-[#0B1F3A] mb-3">Eventibe.com</h4>
                      <p className="text-[#334155] leading-relaxed">
                        Focused on a premium experience with strong SEO, category segmentation, visual storytelling, and inspiration-driven discovery.
                      </p>
                   </div>
                   <div className="relative pl-8 border-l-2 border-[#1E3A8A]">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#1E3A8A]" />
                       <h4 className="text-xl font-black text-[#0B1F3A] mb-3">VenueForEvent.com</h4>
                       <p className="text-[#334155] leading-relaxed">
                         A twin brand with a slightly different SEO, content, and market outreach strategy, allowing cross-brand discoverability and search dominance.
                       </p>
                    </div>
                 </div>
                 <FadeUp delay={0.4} className="mt-8">
                    <p className="text-sm font-bold text-[#0B1F3A]">This dual-brand strategy offers:</p>
                 </FadeUp>
              </div>

             <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Keyword Footprint", value: "Greater" },
                  { label: "Market Capture", value: "Increased" },
                  { label: "Brand Diversification", value: "Strategic" },
                  { label: "Algorithmic Shifts", value: "Redundancy" }
                ].map((item, i) => (
                  <FadeUp key={i} delay={0.1*i}>
                    <div className="p-8 rounded-[32px] bg-gray-50 flex flex-col items-center justify-center text-center hover:bg-[#0B1F3A] hover:text-white transition-all duration-500 group">
                       <span className="text-[#F97316] font-black text-2xl mb-1">{item.value}</span>
                       <span className="text-xs uppercase font-bold tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</span>
                    </div>
                  </FadeUp>
                ))}
             </div>
          </div>

          <div className="mb-20">
             <FadeUp>
                <div className="p-8 md:p-10 rounded-[40px] bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm">
                   <h3 className="text-xl font-black text-[#0B1F3A] mb-6 flex items-center gap-3"><Globe className="text-[#F97316]" size={20} /> Scalable Content Architecture</h3>
                   <p className="text-[#334155] leading-relaxed mb-8 max-w-3xl">The platforms are designed to rank organically for key SEO clusters, ensuring long-term organic traffic growth.</p>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {["Wedding venues + city", "Corporate venues + city", "Venue type + city", "Vendor categories + city"].map((t, i) => (
                        <div key={i} className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-center">
                           <span className="text-sm font-bold text-[#0B1F3A] tracking-tight">{t}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <TiltCard className="rounded-[40px] bg-[#0B1F3A] text-white p-10 h-full">
                <Building2 className="text-[#F97316] w-12 h-12 mb-8" />
                <h3 className="text-2xl font-black mb-6">Venue Listing Platform</h3>
                <ul className="space-y-4 text-white/60">
                    {[
                      "City landing pages",
                      "Event type filters",
                      "Capacity filters",
                      "Visual galleries",
                      "Inquiry forms",
                      "Structured metadata",
                      "Schema markup for SEO"
                    ].map((t, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-[#F97316] shrink-0" />
                        <span className="font-medium text-sm">{t}</span>
                      </li>
                    ))}
                </ul>
             </TiltCard>

             <TiltCard className="rounded-[40px] bg-gray-50 p-10 h-full border border-gray-100 shadow-sm">
                <Layers className="text-[#1E3A8A] w-12 h-12 mb-8" />
                <h3 className="text-2xl font-black text-[#0B1F3A] mb-6">Vendor Marketplace</h3>
                 <div className="grid grid-cols-2 gap-2 mb-8">
                    {[
                      "Catering", "Photography", "Decor & Theme", "Lighting", 
                      "Sound & DJ", "Mehndi & Bridal services", 
                      "Corporate event agencies", "AV and tech support providers"
                    ].map((v, i) => (
                      <span key={i} className="px-3 py-2 rounded-xl bg-white text-[9px] font-black text-[#0B1F3A] border border-gray-100 uppercase tracking-tighter shadow-sm">{v}</span>
                    ))}
                 </div>
                <div className="mt-auto p-4 rounded-2xl bg-[#1E3A8A]/5 border border-[#1E3A8A]/10">
                   <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest mb-2">Primary Benefit</p>
                   <p className="text-[#334155] text-sm">Creates a full-stack event ecosystem — increasing average revenue per user (ARPU).</p>
                </div>
             </TiltCard>

             <TiltCard className="rounded-[40px] bg-gradient-to-br from-[#F97316] to-[#EA580C] text-white p-10 h-full">
                <Zap className="text-white w-12 h-12 mb-8" />
                <h3 className="text-2xl font-black mb-6">Inquiry-Based Model</h3>
                 <p className="text-white/80 leading-relaxed mb-8">Unlike transactional booking platforms, Eventibe and VenueForEvent operate on a lead generation and inquiry model.</p>
                 <div className="space-y-3">
                    {[
                      "Higher quality leads",
                      "Structured lead details (event date, headcount, event type)",
                      "Reduced friction for venue owners",
                      "Higher conversion potential"
                    ].map((t, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                         <CheckCircle2 size={16} className="text-white shrink-0" />
                         <span className="font-bold text-sm tracking-tight">{t}</span>
                      </div>
                    ))}
                 </div>
             </TiltCard>
          </div>
        </div>
      </section>

      {/* ━━━ 5. COMPETITIVE LANDSCAPE ━━━ */}
      <section className="py-24 md:py-32 px-6 bg-[#0B1F3A] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
           <SectionHeading title="Competitive Landscape" subtitle="Market Position" light />
          
          <div className="overflow-x-auto rounded-[32px] border border-white/10 backdrop-blur-md bg-white/5">
            <table className="w-full text-left">
                <thead>
                   <tr className="border-b border-white/10">
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">Platform</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">Marketplace</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">Inquiry Capable</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">Vendor Ecosystem</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">SEO Focus</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">India Market</th>
                      <th className="p-8 font-black text-sm uppercase tracking-widest text-white/40">Corporate Support</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-medium">
                   {[
                     { name: "Eventibe.com", marketplace: "Yes", inquiry: "Yes", ecosystem: "Developing", seo: "Strong", india: "Primary", corporate: "Yes", active: true },
                     { name: "VenueForEvent.com", marketplace: "Yes", inquiry: "Yes", ecosystem: "Developing", seo: "Strong", india: "Primary", corporate: "Yes", active: true },
                     { name: "WeddingWire", marketplace: "Yes", inquiry: "Yes", ecosystem: "Yes", seo: "Strong", india: "Limited India", corporate: "Partial" },
                     { name: "WedmeGood", marketplace: "Yes", inquiry: "Yes", ecosystem: "Yes", seo: "Strong", india: "Strong India", corporate: "Partial" },
                     { name: "Cvent", marketplace: "Yes", inquiry: "Yes", ecosystem: "Yes", seo: "SEO Moderate", india: "Global", corporate: "Enterprise" }
                   ].map((row, i) => (
                     <tr key={i} className={`${row.active ? 'bg-white/5 text-white' : 'text-white/50'} hover:bg-white/10 transition-colors`}>
                        <td className="p-8 font-black">{row.name} {row.active && <span className="ml-2 px-2 py-0.5 bg-[#F97316] text-[8px] rounded-sm align-middle">PROPRIETARY</span>}</td>
                        <td className="p-8">{row.marketplace}</td>
                        <td className="p-8">{row.inquiry}</td>
                        <td className="p-8">{row.ecosystem}</td>
                        <td className="p-8 text-[#FBBF24]">{row.seo}</td>
                        <td className="p-8">{row.india}</td>
                        <td className="p-8">{row.corporate}</td>
                     </tr>
                   ))}
                </tbody>
            </table>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
             {[
               "Localized content focus",
               "Dual-brand SEO strategy",
               "Inquiry + Marketplace",
               "Customizable Vendor Architecture",
               "Social + Corporate segments"
             ].map((text, i) => (
               <FadeUp key={i} delay={0.1*i}>
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="font-bold text-xs uppercase tracking-tighter text-[#F97316] mb-1">Advantage {i+1}</p>
                    <p className="text-sm font-medium">{text}</p>
                 </div>
               </FadeUp>
             ))}
          </div>
        </div>
      </section>

      {/* ━━━ 6. MONETIZATION & GTM ━━━ */}
      <section className="py-24 md:py-36 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
             {/* Business Model */}
             <div>
                 <SectionHeading title="Business Model & Monetization" subtitle="Revenue Strategy" />
                <div className="space-y-6">
                   <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 group hover:shadow-2xl hover:bg-white transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-xl bg-[#F97316] flex items-center justify-center text-white"><PieChart size={24} /></div>
                         <h4 className="text-xl font-black text-[#0B1F3A]">Lead-Based Revenue</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         {["Pay-per-lead", "Premium leads", "Priority access", "Advanced analytics"].map((t, i) => (
                           <div key={i} className="px-4 py-2 rounded-xl bg-white border border-gray-100 text-sm font-bold text-[#334155]">{t}</div>
                         ))}
                      </div>
                   </div>

                   <div className="p-8 rounded-[40px] bg-gray-50 border border-gray-100 group hover:shadow-2xl hover:bg-white transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-xl bg-[#1E3A8A] flex items-center justify-center text-white"><Settings size={24} /></div>
                         <h4 className="text-xl font-black text-[#0B1F3A]">Subscription Plans</h4>
                      </div>
                       <div className="space-y-3">
                          {[
                            "Pay-per-lead",
                            "Premium leads",
                            "Priority access",
                            "Advanced analytics"
                          ].map((t, i) => (
                            <div key={i} className="flex gap-3 text-[#334155] font-medium text-sm">
                               <CheckCircle2 size={16} className="text-[#F97316] shrink-0" />
                               <span>{t}</span>
                            </div>
                          ))}
                          <p className="text-xs font-bold text-[#0B1F3A]/40 pt-4">This creates predictable revenue streams.</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100">
                          <h4 className="text-sm font-black text-[#065F46] mb-2">Commission Sharing (Future)</h4>
                          <p className="text-xs text-[#065F46]/80">If integrated with transactional payments or referral systems.</p>
                       </div>
                       <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
                          <h4 className="text-sm font-black text-[#1E3A8A] mb-2">Additional Monetization Channels</h4>
                          <ul className="text-xs text-[#1E3A8A]/80 space-y-1">
                             {["Featured blog integrations", "Sponsored SEO pages", "Partner promotions", "Analytics dashboard"].map((item, i) => (
                               <li key={i}>• {item}</li>
                             ))}
                          </ul>
                       </div>
                    </div>
                 </div>
              </div>

             {/* GTM Strategy */}
             <div>
                 <SectionHeading title="Go-to-Market Strategy" subtitle="Growth Plan" />
                <div className="space-y-12">
                   {[
                     { 
                       title: "Organic SEO", 
                       items: ["City landing pages", "Venue categories", "Blog stories", "Schema markup"],
                       color: "border-[#F97316]"
                     },
                     { 
                       title: "Paid Campaigns", 
                       items: ["Google Ads", "Social campaigns", "Influencer collab"],
                       color: "border-[#1E3A8A]"
                     },
                     { 
                       title: "Partnerships", 
                       items: ["Wedding planners", "Event firms", "Agencies", "DMCs"],
                       color: "border-emerald-500"
                     }
                   ].map((item, i) => (
                     <FadeUp key={i} delay={0.2*i}>
                        <div className={`relative pl-8 border-l-4 ${item.color}`}>
                           <h4 className="text-xl font-black text-[#0B1F3A] mb-4">{item.title.replace(/^6\.\d+\s+/, '')}</h4>
                           <div className="flex flex-wrap gap-2">
                             {item.items.map((sub, j) => (
                               <span key={j} className="px-4 py-1.5 rounded-full bg-gray-100 text-[10px] font-bold text-[#334155] uppercase tracking-widest">{sub}</span>
                             ))}
                           </div>
                        </div>
                     </FadeUp>
                   ))}
                    <FadeUp delay={0.8}>
                       <div className="p-6 rounded-3xl bg-[#F97316]/5 border border-[#F97316]/10 italic text-[#0B1F3A] font-bold">
                         Strategic alliances to boost referral traffic and co-marketing.
                       </div>
                    </FadeUp>
                 </div>
              </div>
          </div>
        </div>
      </section>

      {/* ━━━ 7. TECHNOLOGY ━━━ */}
      <section className="py-24 md:py-32 px-6 bg-[radial-gradient(circle_at_50%_0%,#0B1F3A,#030a14)] text-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto relative z-10">
            <SectionHeading title="Technology & Scalability" subtitle="Technical Infrastructure" light />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <div className="p-10 rounded-[48px] border border-white/10 backdrop-blur-3xl bg-white/5 relative overflow-hidden group">
                  <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                     <Rocket className="text-[#F97316]" /> Modern Web Stack
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       "Django backend for data architecture",
                       "Next.js for frontend performance",
                       "Angular admin panel",
                       "API-first strategy"
                     ].map((item, i) => (
                       <FadeUp key={i} delay={0.1*i}>
                         <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors h-full flex items-center">
                            <p className="text-sm font-black leading-relaxed">{item}</p>
                         </div>
                       </FadeUp>
                     ))}
                  </div>
                  <div className="mt-12 group">
                     <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-6">This ensures:</p>
                     <div className="flex flex-wrap gap-3">
                        {[
                          "Scalability",
                          "SEO-friendly infrastructure",
                          "Fast rendering",
                          "Clean URL architecture",
                          "Multi-brand support"
                        ].map((t, i) => (
                           <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 text-[10px] font-bold uppercase tracking-widest border border-white/10 group-hover:border-[#F97316]/50 transition-colors">
                              <CheckCircle2 size={12} className="text-[#F97316]" /> {t}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-black mb-10 flex items-center gap-4">
                     <Layers className="text-[#2563EB]" /> Future Technology Roadmap
                  </h3>
                  <div className="space-y-6">
                     {[
                       { title: "ElasticSearch", desc: "For advanced venue & vendor search" },
                       { title: "Redis Caching", desc: "High performance & low latency" },
                       { title: "Partner CRM", desc: "Integrated dashboard for vendors" },
                       { title: "AI Recommendations", desc: "Driven by user behavior (future phase)" }
                     ].map((item, i) => (
                       <FadeUp key={i} delay={0.2*i}>
                         <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all group">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">{i+1}</div>
                            <div>
                               <p className="text-lg font-black">{item.title}</p>
                               <p className="text-sm text-white/40 font-medium">{item.desc}</p>
                            </div>
                         </div>
                       </FadeUp>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* ━━━ 8. TRACTION & GROWTH PROJECTIONS ━━━ */}
      <section className="py-24 md:py-36 px-6 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <SectionHeading title="Traction, Metrics & Projections" subtitle="Growth Metrics" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
               {[
                 { label: "Traffic", title: "Organic Growth", icon: <Globe size={20} /> },
                 { label: "Leads", title: "Conversion Rate", icon: <Target size={20} /> },
                 { label: "Profiles", title: "Quality Score", icon: <Star size={20} /> },
                 { label: "Vendors", title: "Onboarding Pace", icon: <Users size={20} /> },
                 { label: "Expansion", title: "City Reach", icon: <Building2 size={20} /> }
               ].map((item, i) => (
                 <FadeUp key={i} delay={0.1*i}>
                   <div className="p-6 rounded-[32px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
                      <div className="mb-4 text-[#F97316]">{item.icon}</div>
                      <p className="text-[10px] font-black uppercase text-[#334155]/40 tracking-widest mb-1">{item.label}</p>
                      <p className="font-black text-[#0B1F3A]">{item.title}</p>
                   </div>
                 </FadeUp>
               ))}
            </div>

            <div className="bg-[#0B1F3A] rounded-[48px] p-8 md:p-12 text-white relative overflow-hidden">
               <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#2563EB]/10 blur-[100px] rounded-full" />
               <h3 className="text-2xl font-black mb-12 flex items-center gap-4">
                  <BarChart3 className="text-[#FBBF24]" /> Growth Projections (3–5 Years)
               </h3>

               <div className="overflow-x-auto">
                  <table className="w-full text-center">
                     <thead>
                        <tr className="border-b border-white/10">
                           <th className="p-6 text-left font-black text-sm uppercase text-white/40">Metric</th>
                           <th className="p-6 font-black text-[#F97316]">Year 1</th>
                           <th className="p-6 font-black text-[#F97316]">Year 2</th>
                           <th className="p-6 font-black text-[#F97316]">Year 3</th>
                           <th className="p-6 font-black text-[#FBBF24]">Year 4</th>
                           <th className="p-6 font-black text-[#FBBF24]">Year 5</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5 font-bold">
                        {[
                          { metric: "Visits", y1: "50K", y2: "120K", y3: "250K", y4: "500K", y5: "1M+" },
                          { metric: "Inquiries", y1: "1K", y2: "3K", y3: "8K", y4: "20K", y5: "50K+" },
                          { metric: "Venues", y1: "500", y2: "1.5K", y3: "3K", y4: "5K", y5: "10K+" },
                          { metric: "Vendors", y1: "200", y2: "800", y3: "2.5K", y4: "6K", y5: "15K+" }
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="p-6 text-left text-white/60 font-medium uppercase tracking-widest text-xs">{row.metric}</td>
                              <td className="p-6">{row.y1}</td>
                              <td className="p-6">{row.y2}</td>
                              <td className="p-6">{row.y3}</td>
                              <td className="p-6 text-[#FBBF24]">{row.y4}</td>
                              <td className="p-6 text-[#FBBF24]">{row.y5}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </section>

      {/* ━━━ 9. USE OF FUNDS ━━━ */}
      <section className="py-24 md:py-36 px-6 bg-gray-50 relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <SectionHeading title="Use of Funds (If Investing)" subtitle="Investment Allocation" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Technology", icon: "🧠", items: ["Scalability", "Search improvements", "CRM platform", "Analytics", "AI/ML recommendations"] },
                  { title: "Content & SEO", icon: "📍", items: ["City pages", "Venue descriptions", "Vendor categories", "Blog strategy"] },
                  { title: "Sales & Partnerships", icon: "🤝", items: ["Team expansion", "Partner liaison", "Lead growth programs"] },
                  { title: "Marketing", icon: "📢", items: ["Paid campaigns", "Influencer relationships", "Seasonal promotions"] }
                ].map((box, i) => (
                  <FadeUp key={i} delay={0.15*i}>
                    <div className="h-full p-8 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                       <div className="text-4xl mb-6">{box.icon}</div>
                       <h4 className="text-xl font-black text-[#0B1F3A] mb-6">{box.title}</h4>
                       <ul className="space-y-4 mt-auto">
                          {box.items.map((item, j) => (
                            <li key={j} className="flex items-center gap-3 text-[#334155] text-sm font-medium">
                               <div className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0" />
                               {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                  </FadeUp>
                ))}
            </div>
         </div>
      </section>

      {/* ━━━ 10. RISK ANALYSIS ━━━ */}
      <section className="py-24 md:py-32 px-6 bg-white overflow-hidden">
         <div className="max-w-4xl mx-auto text-center mb-20">
             <SectionHeading title="Risk Analysis & Mitigation" subtitle="Risk Management" />
         </div>
         
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Market Risk", solution: "Strong SEO positioning + diversified revenue" },
              { label: "Competitive Risk", solution: "Dual-brand SEO strategy + vendor ecosystem" },
              { label: "Operational Risk", solution: "Scalable backend + API-based data flow" },
              { label: "Regulatory Risk", solution: "Compliance with data protection laws" }
            ].map((risk, i) => (
               <FadeUp key={i} delay={0.1*i}>
                 <div className="p-8 rounded-[32px] bg-[#0B1F3A] text-white flex flex-col justify-between h-full group hover:bg-[#1E3A8A] transition-colors">
                    <div>
                       <p className="text-xs font-bold text-[#F97316] uppercase tracking-widest mb-4">Risk Identifier {i+1}</p>
                       <p className="text-lg font-black mb-8">{risk.label}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-[#FBBF24] mb-2">Mitigation Strategy</p>
                       <p className="text-xs font-medium text-white/70">{risk.solution}</p>
                    </div>
                 </div>
               </FadeUp>
            ))}
         </div>
      </section>

        {/* ━━━ 11. LEADERSHIP & TEAM ━━━ */}
        <section className="py-24 md:py-36 px-6 bg-[#030a14] relative overflow-hidden text-left">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
           
           <div className="max-w-7xl mx-auto relative z-10">
               <SectionHeading title="Leadership & Team Strength" subtitle="Our Team" light />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="grid grid-cols-2 gap-4">
                    {["Hospitality", "Technology", "SEO & Content", "Event Planning", "Marketplace Strategy", "Partner Ecosystems"].map((item, i) => (
                      <FadeUp key={i} delay={0.1*i}>
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#F97316]/30 transition-all text-center">
                           <p className="font-bold text-white text-sm tracking-tight">{item}</p>
                        </div>
                      </FadeUp>
                    ))}
                 </div>
                 
                 <div className="space-y-8">
                    <FadeUp>
                      <p className="text-2xl font-black text-white leading-relaxed">
                        Homocation Asia Private Limited is governed by a team with deep expertise across the event ecosystem. 
                      </p>
                    </FadeUp>
                    <FadeUp delay={0.2}>
                      <p className="text-lg text-white/50 leading-relaxed italic">
                        "This blend positions the company to execute the ambitious roadmap and dominate the South Asian event marketplace."
                      </p>
                    </FadeUp>
                 </div>
              </div>
           </div>
        </section>

        {/* ━━━ 12. STRATEGIC PARTNERSHIPS ━━━ */}
        <section className="py-24 md:py-32 px-6 bg-white overflow-hidden text-left">
           <div className="max-w-7xl mx-auto">
               <SectionHeading title="Strategic Partnerships & Alliances" subtitle="Collaboration Network" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                 {[
                   { label: "Wedding Planners", icon: "💍" },
                   { label: "Corporate Agencies", icon: "🏢" },
                   { label: "Hospitality Associations", icon: "🏨" },
                   { label: "Local Vendor Networks", icon: "🤝" },
                   { label: "Media Partners", icon: "📰" }
                 ].map((item, i) => (
                   <FadeUp key={i} delay={0.1*i}>
                     <div className="p-8 rounded-[32px] bg-gray-50 border border-gray-100 flex flex-col items-center text-center group hover:bg-[#0B1F3A] transition-all duration-500">
                        <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{item.icon}</div>
                        <p className="font-black text-[#0B1F3A] text-sm group-hover:text-white">{item.label}</p>
                     </div>
                   </FadeUp>
                 ))}
              </div>
              <FadeUp delay={0.6}>
                 <div className="mt-12 p-8 rounded-[40px] bg-[#F97316]/5 border border-[#F97316]/10 text-center">
                    <p className="text-[#0B1F3A] font-bold leading-relaxed max-w-3xl mx-auto">
                       Strategic alliances to boost referral traffic and co-marketing are core to our execution strategy.
                    </p>
                 </div>
              </FadeUp>
           </div>
        </section>

      {/* ━━━ 12. CLOSING & WHY INVEST ━━━ */}
      <section className="py-24 md:py-48 px-6 bg-white overflow-hidden text-center relative">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-500px] left-[-200px] w-[1000px] h-[1000px] bg-[#F97316]/5 rounded-full blur-[150px]" />
            <div className="absolute bottom-[-500px] right-[-200px] w-[1000px] h-[1000px] bg-[#1E3A8A]/5 rounded-full blur-[150px]" />
         </div>

         <div className="max-w-5xl mx-auto relative z-10">
            <SectionHeading title="Why Invest in Us" subtitle="Investment Opportunity" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
               {[
                 "Strong growth potential in a large market",
                 "Dual-brand digital strategy",
                 "Long-term SEO moat",
                 "Scalable technology infrastructure",
                 "Focus on high-intent inquiries",
                 "Future-ready vendor ecosystem"
               ].map((text, i) => (
                 <FadeUp key={i} delay={0.1*i}>
                   <div className="flex items-start gap-4 p-6 rounded-[32px] bg-gray-50 border border-gray-100 hover:shadow-xl transition-all text-left group">
                      <div className="w-10 h-10 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white transition-colors">
                        <CheckCircle2 size={18} />
                      </div>
                      <p className="font-bold text-[#0B1F3A] leading-tight">{text}</p>
                   </div>
                 </FadeUp>
               ))}
            </div>

            <FadeUp delay={0.6}>
               <div className="flex flex-col items-center">
                  <div className="w-20 h-[1px] bg-gray-200 mb-12" />
                  <h3 className="text-2xl md:text-3xl font-black text-[#0B1F3A] mb-8">Closing Vision</h3>
                  <div className="p-8 md:p-12 rounded-[48px] bg-gradient-to-br from-[#0B1F3A] to-[#1E3A8A] text-white shadow-2xl relative overflow-hidden group">
                     <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')] opacity-5 scale-110" />
                      <p className="text-lg md:text-2xl leading-relaxed relative z-10 font-medium">
                        "Homocation Asia Private Limited is not merely building a website — it is building a <span className="text-[#F97316] font-black underline decoration-4 underline-offset-8">structured, sustainable, digital event ecosystem</span>."
                      </p>
                      
                      <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                         <p className="text-white/80 text-sm md:text-xl font-medium leading-relaxed max-w-4xl mx-auto">
                           With increasing digital behavior, rising experiential spending, and unmet demand in India & South Asia, Eventibe.com and VenueForEvent.com are well-positioned to become industry leaders in event venue and services discovery.
                         </p>
                      </div>
                  </div>
                  
                  <div className="mt-16 group">
                     <Link href="/contact-us" className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-[#F97316] text-white font-black text-lg shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.5)] hover:-translate-y-1 transition-all duration-300">
                        Discuss Investment Opportunities <ArrowRight />
                     </Link>
                  </div>
               </div>
            </FadeUp>
         </div>
      </section>

      {/* Footer-like Branding Strip */}
      <section className="py-12 bg-gray-50 border-t border-gray-100 px-6 text-center">
         <p className="text-xs font-black text-[#0B1F3A]/20 uppercase tracking-[1rem] ml-[1rem]">HOMOCATION ASIA</p>
      </section>
    </div>
  );
}
