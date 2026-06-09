"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Target,
  Layers,
  BarChart3,
  Settings,
  ShieldCheck,
  PieChart,
  Users,
  Globe,
  Zap,
  Briefcase,
  Rocket,
  Sparkles,
  Building2,
  Star,
  Heart,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import CommonHero from "@/components/common/CommonHero";
import { TiltCard, MagneticButton } from "@/components/micro-interactions";

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
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          });
        });
        gsap.utils.toArray<HTMLElement>(".parallax-text").forEach((el) => {
          gsap.to(el, {
            yPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        });
        gsap.utils.toArray<HTMLElement>(".line-grow").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 60%",
                scrub: true,
              },
            },
          );
        });
      });
    })();
    return () => {
      ctx?.revert();
    };
  }, []);
}

/* ═══ Animation Wrappers ═══ */
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mb-16 text-center md:text-left">
      <FadeUp>
        {subtitle && (
          <p
            className={`text-xs font-bold uppercase tracking-[0.3em] mb-4 ${light ? "text-white/40" : "text-accent-orange"}`}
          >
            {subtitle}
          </p>
        )}
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight ${light ? "text-white" : "text-primary-navy"}`}
        >
          {title}
        </h2>
        <div
          className={`w-20 h-1.5 mt-6 rounded-full mx-auto md:mx-0 ${light ? "bg-white/10" : "bg-cta-gradient"}`}
        />
      </FadeUp>
    </div>
  );
}

export default function InvestorRelationsClient() {
  useGsapParallax();

  return (
    <div className="min-h-screen bg-white overflow-hidden selection:bg-accent-orange/30">
      {/* ━━━ 1. HERO ━━━ */}
      <CommonHero
        badgeText="Investor Relations Profile"
        badgeIcon="sparkles"
        titleMain="Homocation Asia"
        titleHighlight="Private Limited"
        subtitle="(Parent Company of Eventibe.com & VenueForEvent.com)"
        bgSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
        bgType="image"
      />

      {/* ━━━ 1.5 EXECUTIVE SUMMARY ━━━ */}
      <section className="py-16 mt-8 container mx-auto px-6 relative z-20">
        <div className="w-full">
          <FadeUp delay={0.4}>
            <div className="p-8 md:p-12 lg:p-16 rounded-[40px] bg-white text-left shadow-md border border-slate-100 relative overflow-hidden group">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mr-32 -mt-32 blur-3xl transition-all duration-500 group-hover:bg-accent-orange/10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-corporate-blue/5 rounded-full -ml-32 -mb-32 blur-3xl transition-all duration-500 group-hover:bg-corporate-blue/10" />

              <div className="absolute top-0 right-0 p-8 lg:p-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 text-accent-orange shadow-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-primary-navy mb-8 leading-tight tracking-tight">
                  Executive <span className="text-corporate-blue">Summary</span>
                </h2>

                <div className="space-y-6 text-soft-slate text-lg lg:text-xl leading-relaxed w-full">
                  <p>
                    Homocation Asia Private Limited is building a next-generation
                    digital marketplace focused on event venues and the expanding
                    event services ecosystem. Our core brands —{" "}
                    <strong className="text-primary-navy font-extrabold border-b-2 border-accent-orange/30">Eventibe.com</strong> and{" "}
                    <strong className="text-primary-navy font-extrabold border-b-2 border-corporate-blue/30">VenueForEvent.com</strong> — are designed to address
                    long-standing inefficiencies in event discovery, vendor
                    connection, and event planning workflows, particularly in
                    emerging markets such as India.
                  </p>
                  <p className="p-6 md:p-8 rounded-3xl bg-slate-50 border border-slate-100 text-primary-navy/80 font-medium shadow-sm">
                    With a structured inquiry-based model, strong SEO
                    architecture, and future-ready vendor & CRM integration, the
                    company is positioned to capture significant growth in the
                    emerging experiential economy.
                  </p>
                </div>

                <div className="mt-10 lg:mt-12 flex flex-wrap gap-4 lg:gap-6">
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-50/50 border border-blue-100 hover:border-corporate-blue/30 hover:bg-blue-50 transition-colors shadow-sm">
                    <Target className="text-corporate-blue w-6 h-6 shrink-0" />
                    <span className="font-bold text-primary-navy text-sm lg:text-base">
                      Market Leader
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-orange-50/50 border border-orange-100 hover:border-accent-orange/30 hover:bg-orange-50 transition-colors shadow-sm">
                    <Zap className="text-accent-orange w-6 h-6 shrink-0" />
                    <span className="font-bold text-primary-navy text-sm lg:text-base">
                      Scalable Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 2. MARKET OPPORTUNITY ━━━ */}
      <section className="relative py-20 md:py-28 px-6 container mx-auto">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Market Opportunity — Why Now?"
            subtitle="Market Analysis"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Global Market */}
            <div className="lg:col-span-12 mb-16">
              <FadeUp>
                <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-8 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
                  <Globe className="text-accent-orange shrink-0 w-8 h-8" /> Global Event
                  Economy Growth
                </h3>
              </FadeUp>

              <FadeUp>
                <p className="text-soft-slate mb-8 leading-relaxed text-base md:text-lg">
                  The global events industry is experiencing robust expansion
                  due to:
                </p>
              </FadeUp>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  "Rebounding post-pandemic demand",
                  "Corporate demand for conferences & experiential marketing",
                  "Rising consumer spending on weddings and milestone celebrations",
                  "Increased digital discoverability and planning behavior",
                ].map((text, i) => (
                  <FadeUp key={i} delay={0.1 * i}>
                    <div className="p-6 h-full rounded-2xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-accent-orange/30 hover:shadow-xl transition-all duration-300">
                      <p className="text-sm font-semibold text-soft-slate leading-relaxed">
                        {text}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>

              <FadeUp>
                <p className="text-primary-navy/80 mb-8 text-sm font-bold uppercase tracking-wider">
                  According to multiple industry reports:
                </p>
              </FadeUp>

              <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FadeUp>
                  <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-8 md:p-10 bg-primary-navy text-white relative h-full overflow-hidden group">
                      <div className="absolute top-0 right-0 p-8 scale-150 opacity-10 group-hover:opacity-20 transition-opacity">
                        📈
                      </div>
                      <div className="space-y-6">
                        <p className="text-white/80 text-lg leading-relaxed">
                          The global live events market was valued at{" "}
                          <span className="text-white font-extrabold block text-2xl mt-1">
                            $1.13 trillion
                          </span>{" "}
                          in 2024.
                        </p>
                        <p className="text-white/80 text-lg leading-relaxed">
                          Forecasted to reach over{" "}
                          <span className="text-accent-orange font-extrabold block text-2xl mt-1">
                            $1.6 trillion
                          </span>{" "}
                          by 2032 (CAGR 4.4%).
                        </p>
                        <div className="h-2 w-full bg-white/10 rounded-full mt-4">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "70%" }}
                            transition={{ duration: 1.5, delay: 0.5 }}
                            className="h-full bg-accent-orange rounded-full"
                          />
                        </div>
                        <p className="text-xs text-white/50 italic leading-relaxed">
                          Weddings, corporate conferences, and large-scale
                          celebrations are among the fastest-growing segments.
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                    <div className="p-8 md:p-10 bg-cta-gradient text-white relative h-full overflow-hidden flex flex-col justify-between">
                      <div>
                        <h4 className="text-2xl font-extrabold mb-6">
                          Reflecting a rising demand for:
                        </h4>
                        <ul className="space-y-4">
                          {[
                            "Event booking platforms",
                            "Vendor marketplaces",
                            "Venue discovery networks",
                            "Integrated event planning tools",
                          ].map((text, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <CheckCircle2 size={18} className="text-white shrink-0" />
                              <span className="font-bold text-base">{text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-8 pt-6 border-t border-white/20 text-xs text-white/80">
                        Eventibe addresses this demand through an integrated visual discovery portal.
                      </div>
                    </div>
                  </TiltCard>
                </FadeUp>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 1.6 INDIA'S EVENT ECONOMY ━━━ */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            badge="MARKET ANALYSIS"
            title="India’s Event Economy"
            description="India represents a uniquely high-growth demand center. Our primary focus is this highly fragmented market, characterized by immense demand but unstructured supply."
          />

          <div className="mt-20">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Heart className="w-7 h-7" />,
                    title: "10 Million+",
                    desc: "More than 10 million weddings annually with an estimated market size exceeding $50 billion.",
                    color: "text-rose-500",
                    bg: "bg-rose-50",
                    borderColor: "group-hover:border-rose-200"
                  },
                  {
                    icon: <Briefcase className="w-7 h-7" />,
                    title: "Corporate Hub",
                    desc: "Corporate events sector growing due to increasing globalization and startup ecosystem growth.",
                    color: "text-corporate-blue",
                    bg: "bg-blue-50",
                    borderColor: "group-hover:border-blue-200"
                  },
                  {
                    icon: <MapPin className="w-7 h-7" />,
                    title: "Tier-2/3 Growth",
                    desc: "Tier-2 and Tier-3 urbanization driving localized event demand.",
                    color: "text-accent-orange",
                    bg: "bg-orange-50",
                    borderColor: "group-hover:border-orange-200"
                  },
                ].map((item, i) => (
                  <FadeUp
                    key={i}
                    delay={0.1 * i}
                    className={i === 0 ? "md:col-span-2" : ""}
                  >
                    <div className={`group flex items-start gap-6 p-8 rounded-3xl bg-white border border-slate-100 shadow-sm ${item.borderColor} hover:shadow-xl transition-all duration-500 h-full`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xl font-bold text-primary-navy mb-2">{item.title}</p>
                        <p className="text-sm text-soft-slate leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <FadeUp delay={0.4}>
                <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                  <div className="h-full p-8 md:p-10 bg-primary-navy text-white flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute -right-12 -top-12 w-48 h-48 bg-corporate-blue/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                    <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-accent-orange/20 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8">
                        <TrendingUp className="text-accent-orange w-6 h-6" />
                        <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                          Forecasts show
                        </p>
                      </div>
                      <p className="text-5xl md:text-6xl font-black mb-2 flex items-baseline gap-2">
                        12–15<span className="text-accent-orange">%</span>
                      </p>
                      <p className="text-lg font-medium text-white/70 mb-6">
                        CAGR
                      </p>
                      <p className="text-base leading-relaxed text-white/90 pb-8 border-b border-white/10">
                        Indian event planning & wedding industry expected to grow
                        over the next 5 years.
                      </p>
                      <div className="mt-8 flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-accent-orange rounded-full" />
                        <div className="w-3 h-1.5 bg-white/20 rounded-full" />
                        <div className="w-3 h-1.5 bg-white/20 rounded-full" />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </FadeUp>
            </div>

            <FadeUp>
              <div className="mt-12 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden flex items-center gap-6 max-w-4xl mx-auto">
                <div className="w-2 h-full absolute left-0 top-0 bg-accent-orange" />
                <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                  <Star className="text-accent-orange w-6 h-6" />
                </div>
                <p className="text-soft-slate leading-relaxed font-medium text-base">
                  This makes India one of the most attractive markets for event
                  marketplaces, especially with the rise of digital research
                  behavior among younger demographics.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━ 1.7 COMPETITIVE LANDSCAPE ━━━ */}
      <section className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-blue/10 text-corporate-blue text-xs font-bold tracking-widest uppercase mb-6">
                <Target className="w-4 h-4" />
                <span>Industry Positioning</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
                Competitive Landscape
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-soft-slate leading-relaxed">
                Eventibe & VenueForEvent differentiate by focusing exclusively on quality and B2B/B2C vendor workflow, rather than simply listing contacts like legacy platforms.
              </p>
            </FadeUp>
          </div>

          <div className="mt-20 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  type: "Legacy Platforms",
                  focus: "Pure Discovery (Directory Listings)",
                  issues: [
                    "Cluttered interface",
                    "No curation",
                    "Poor lead qualification",
                  ],
                },
                {
                  type: "Our Advantage",
                  focus: "Discovery + Workflow (SaaS-enabled Marketplace)",
                  issues: [
                    "Curated quality",
                    "Direct vendor tools",
                    "Structured inquiries",
                  ],
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.2 * i}>
                  <div className="p-8 md:p-10 rounded-[32px] bg-white shadow-xl shadow-slate-200/20 border border-slate-100 h-full hover:border-accent-orange/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      {i === 0 ? (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                          <Layers className="w-6 h-6" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-accent-orange">
                          <Target className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-soft-slate">
                          {item.type}
                        </p>
                      </div>
                    </div>
                    <p className="text-2xl font-extrabold text-primary-navy mb-8 leading-snug">
                      {item.focus}
                    </p>
                    <ul className="space-y-4">
                      {item.issues.map((issue, j) => (
                        <li key={j} className="flex items-center gap-4">
                          {i === 0 ? (
                            <div className="w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                              <span className="w-2 h-2 rounded-full bg-rose-400" />
                            </div>
                          ) : (
                            <CheckCircle2 className="text-emerald-500 w-6 h-6 shrink-0" />
                          )}
                          <span className="text-soft-slate text-lg font-medium">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3. TRENDS ━━━ */}
      <section className="bg-white border-t border-slate-100 py-24 px-6 overflow-hidden relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-bold tracking-widest uppercase mb-6">
                <Globe className="w-4 h-4" />
                <span>Trends Analysis</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
                Digital & Behavioral Trends Driving Growth
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-soft-slate leading-relaxed">
                These behavioral patterns significantly favor structured digital marketplaces over traditional directories.
              </p>
            </FadeUp>
          </div>
          
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Digital Discovery",
                  stat: "72%",
                  desc: "of event planners research venues online prior to site visits.",
                  icon: <Globe className="text-accent-orange w-8 h-8 group-hover:text-white" />,
                },
                {
                  title: "Mobile Usage",
                  stat: "Primary",
                  desc: "Event discovery and vendor search are increasingly mobile-driven.",
                  icon: <Zap className="text-accent-orange w-8 h-8 group-hover:text-white" />,
                },
                {
                  title: "Experience-Led",
                  stat: "Priority",
                  desc: "Planning weddings and corporate events as emotional experiences — requiring visuals and comparisons.",
                  icon: <Sparkles className="text-accent-orange w-8 h-8 group-hover:text-white" />,
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.2 * i}>
                  <div className="group flex flex-col items-start gap-6 p-10 rounded-[32px] bg-slate-50/50 border border-slate-100 shadow-sm hover:shadow-xl hover:border-accent-orange/20 hover:-translate-y-2 transition-all duration-500 h-full">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-accent-orange transition-colors shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-accent-orange uppercase tracking-wider mb-2">
                        {item.title}
                      </p>
                      <p className="text-4xl font-extrabold text-primary-navy mb-4">
                        {item.stat}
                      </p>
                      <p className="text-soft-slate text-base leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3.1 PROBLEM STATEMENT ━━━ */}
      <section className="bg-slate-50 relative border-t border-slate-100 py-24 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold tracking-widest uppercase mb-6">
                <Target className="w-4 h-4" />
                <span>The Challenge</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
                Problem Statement — What Are We Solving?
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-soft-slate leading-relaxed">
                Finding vendors and venues often requires manual referrals, social networking, and offline negotiation. There is no unified digital marketplace for this ecosystem yet in the Indian context.
              </p>
            </FadeUp>
          </div>
          
          <div className="mt-20 max-w-6xl mx-auto">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Fragmented Discovery */}
               <FadeUp>
                 <div className="p-10 md:p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl relative overflow-hidden h-full">
                   <div className="absolute top-0 right-0 p-8">
                     <Target className="text-rose-500/10 w-32 h-32" />
                   </div>
                   <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-6 relative z-10">
                     Fragmented Discovery Landscape
                   </h3>
                   <p className="text-soft-slate mb-10 text-lg leading-relaxed relative z-10">
                     Current venue and event vendor listings are scattered across
                     generic listing portals, social media, local directories, and
                     aggregator platforms.
                   </p>
                   <h4 className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-6 relative z-10">
                     Problems include:
                   </h4>
                   <div className="space-y-4 relative z-10">
                     {[
                       "Unverified information",
                       "Inconsistent visual presentation",
                       "Lack of structured search filters",
                       "Poor SEO findability",
                       "Non-specific category mappings",
                     ].map((text, i) => (
                       <FadeUp key={i} delay={0.1 * i}>
                         <div className="flex items-center gap-4 p-5 rounded-2xl bg-rose-50/50 text-rose-700 font-semibold border border-rose-100/70 text-base hover:bg-rose-50 transition-colors cursor-default">
                           <span className="shrink-0 flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm text-rose-500 text-lg leading-none">✕</span>
                           <span>{text}</span>
                         </div>
                       </FadeUp>
                     ))}
                   </div>
                 </div>
               </FadeUp>

               <div className="space-y-12">
                 <FadeUp delay={0.2}>
                   <div className="p-10 md:p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl h-full relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/5 rounded-full blur-3xl -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-150" />
                     <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-6 relative z-10">
                       Complexity in Event Services
                     </h3>
                     <p className="text-soft-slate leading-relaxed mb-8 text-lg relative z-10">
                       Finding vendors such as caterers, decor specialists, mehndi
                       artists, photographers, DJs & lighting, and corporate AV
                       teams often requires manual referrals, social networking,
                       and offline negotiation.
                     </p>
                   </div>
                 </FadeUp>

                 <FadeUp delay={0.4}>
                   <div className="p-10 md:p-12 bg-white rounded-[40px] border border-slate-100 shadow-xl h-full relative overflow-hidden group">
                     <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-orange/5 rounded-full blur-3xl -mr-10 -mb-10 transition-transform duration-700 group-hover:scale-150" />
                     <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-6 relative z-10">
                       Corporate Event Fragmentation
                     </h3>
                     <p className="text-soft-slate leading-relaxed mb-8 text-lg relative z-10">
                       Corporate event planners spend excessive time on:
                     </p>
                     <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10">
                       {[
                         "Manual venue research",
                         "Multi-vendor coordination",
                         "Event layout & mapping",
                         "AV & tech requirements",
                       ].map((t, i) => (
                         <li
                           key={i}
                           className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-primary-navy"
                         >
                           <CheckCircle2 size={18} className="text-accent-orange shrink-0" />{" "}
                           <span>{t}</span>
                         </li>
                       ))}
                     </ul>
                     <p className="text-accent-orange font-bold text-base italic underline decoration-2 underline-offset-4 relative z-10">
                       There is an opportunity for streamlined digital workflows.
                     </p>
                   </div>
                 </FadeUp>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ━━━ 4. PRODUCT ARCHITECTURE ━━━ */}
      <section className="py-20 md:py-28 px-6 relative bg-white overflow-hidden container mx-auto">
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            title="Product Architecture & Value Proposition"
            subtitle="Our Solution"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <FadeUp>
                <h3 className="text-2xl md:text-4xl font-extrabold text-primary-navy mb-8 leading-tight">
                  Dual Brand
                  <br />
                  <span className="text-accent-orange">Strategy</span>
                </h3>
              </FadeUp>
              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-accent-orange">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-orange" />
                  <h4 className="text-xl font-extrabold text-primary-navy mb-3">
                    Eventibe.com
                  </h4>
                  <p className="text-soft-slate leading-relaxed text-sm md:text-base">
                    Focused on a premium experience with strong SEO, category
                    segmentation, visual storytelling, and inspiration-driven
                    discovery.
                  </p>
                </div>
                <div className="relative pl-8 border-l-2 border-corporate-blue">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-corporate-blue" />
                  <h4 className="text-xl font-extrabold text-primary-navy mb-3">
                    VenueForEvent.com
                  </h4>
                  <p className="text-soft-slate leading-relaxed text-sm md:text-base">
                    A twin brand with a slightly different SEO, content, and
                    market outreach strategy, allowing cross-brand
                    discoverability and search dominance.
                  </p>
                </div>
              </div>
              <FadeUp delay={0.4} className="mt-8">
                <p className="text-sm font-bold text-primary-navy uppercase tracking-wider mb-2">
                  This dual-brand strategy offers:
                </p>
              </FadeUp>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Keyword Footprint", value: "Greater" },
                { label: "Market Capture", value: "Increased" },
                { label: "Brand Diversification", value: "Strategic" },
                { label: "Algorithmic Shifts", value: "Redundancy" },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.1 * i}>
                  <div className="p-6 md:p-8 rounded-3xl bg-slate-50/50 border border-slate-100 flex flex-col items-center justify-center text-center hover:bg-primary-navy hover:text-white transition-all duration-500 group">
                    <span className="text-accent-orange font-extrabold text-base md:text-2xl mb-1 leading-tight group-hover:text-accent-orange transition-colors">
                      {item.value}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-soft-slate group-hover:text-white/80 transition-colors">
                      {item.label}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <FadeUp>
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-slate-50 to-white border border-slate-100 shadow-sm">
                <h3 className="text-xl font-extrabold text-primary-navy mb-6 flex items-center gap-3">
                  <Globe className="text-accent-orange" size={24} /> Scalable Content Architecture
                </h3>
                <p className="text-soft-slate leading-relaxed mb-8 max-w-3xl text-sm md:text-base">
                  The platforms are designed to rank organically for key SEO
                  clusters, ensuring long-term organic traffic growth.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    "Wedding venues + city",
                    "Corporate venues + city",
                    "Venue type + city",
                    "Vendor categories + city",
                  ].map((t, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-white border border-slate-100/80 shadow-sm flex items-center justify-center text-center hover:border-accent-orange/30 hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-sm font-semibold text-primary-navy tracking-tight">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FadeUp>
              <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-primary-navy text-white p-10 h-full flex flex-col justify-between">
                  <div>
                    <Building2 className="text-accent-orange w-12 h-12 mb-8" />
                    <h3 className="text-2xl font-extrabold mb-6">
                      Venue Listing Platform
                    </h3>
                    <ul className="space-y-4 text-white/70">
                      {[
                        "City landing pages",
                        "Event type filters",
                        "Capacity filters",
                        "Visual galleries",
                        "Inquiry forms",
                        "Structured metadata",
                        "Schema markup for SEO",
                      ].map((t, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <CheckCircle2
                            size={16}
                            className="text-accent-orange shrink-0"
                          />
                          <span className="font-semibold text-sm">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/40">
                    Proprietary search and discovery system
                  </div>
                </div>
              </TiltCard>
            </FadeUp>

            <FadeUp delay={0.1}>
              <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-slate-50/50 p-10 h-full border border-slate-100 flex flex-col justify-between">
                  <div>
                    <Layers className="text-corporate-blue w-12 h-12 mb-8" />
                    <h3 className="text-2xl font-extrabold text-primary-navy mb-6">
                      Vendor Marketplace
                    </h3>
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {[
                        "Catering",
                        "Photography",
                        "Decor & Theme",
                        "Lighting",
                        "Sound & DJ",
                        "Mehndi & Bridal services",
                        "Corporate event agencies",
                        "AV and tech support providers",
                      ].map((v, i) => (
                        <span
                          key={i}
                          className="px-3 py-2 rounded-xl bg-white text-[9px] font-bold text-primary-navy border border-slate-100 uppercase tracking-tighter shadow-sm hover:border-corporate-blue/30 transition-colors"
                        >
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto p-4 rounded-2xl bg-corporate-blue/5 border border-corporate-blue/10">
                    <p className="text-xs font-bold text-corporate-blue uppercase tracking-widest mb-2">
                      Primary Benefit
                    </p>
                    <p className="text-soft-slate text-xs leading-relaxed">
                      Creates a full-stack event ecosystem — increasing average
                      revenue per user (ARPU).
                    </p>
                  </div>
                </div>
              </TiltCard>
            </FadeUp>

            <FadeUp delay={0.2}>
              <TiltCard className="h-full rounded-3xl overflow-hidden shadow-xl">
                <div className="bg-cta-gradient text-white p-10 h-full flex flex-col justify-between">
                  <div>
                    <Zap className="text-white w-12 h-12 mb-8 animate-pulse" />
                    <h3 className="text-2xl font-extrabold mb-6">Inquiry-Based Model</h3>
                    <p className="text-white/80 leading-relaxed mb-8 text-sm">
                      Unlike transactional booking platforms, Eventibe and
                      VenueForEvent operate on a lead generation and inquiry model.
                    </p>
                    <div className="space-y-3">
                      {[
                        "Higher quality leads",
                        "Structured lead details (event date, headcount, event type)",
                        "Reduced friction for venue owners",
                        "Higher conversion potential",
                      ].map((t, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-white shrink-0" />
                          <span className="font-bold text-sm tracking-tight">
                            {t}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/20 text-xs text-white/70">
                    Low-friction client onboarding framework
                  </div>
                </div>
              </TiltCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━ 5. COMPETITIVE LANDSCAPE ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-primary-navy text-white overflow-hidden">
        <div className="max-w-7xl mx-auto container">
          <SectionHeading
            title="Competitive Landscape"
            subtitle="Market Position"
            light
          />

          <div className="overflow-x-auto rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 shadow-2xl">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    Platform
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    Marketplace
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    Inquiry Capable
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    Vendor Ecosystem
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    SEO Focus
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    India Market
                  </th>
                  <th className="px-6 py-5 md:px-8 md:py-6 font-extrabold text-xs uppercase tracking-widest text-white/60">
                    Corporate Support
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-semibold text-sm">
                {[
                  {
                    name: "Eventibe.com",
                    marketplace: "Yes",
                    inquiry: "Yes",
                    ecosystem: "Developing",
                    seo: "Strong",
                    india: "Primary",
                    corporate: "Yes",
                    active: true,
                  },
                  {
                    name: "VenueForEvent.com",
                    marketplace: "Yes",
                    inquiry: "Yes",
                    ecosystem: "Developing",
                    seo: "Strong",
                    india: "Primary",
                    corporate: "Yes",
                    active: true,
                  },
                  {
                    name: "WeddingWire",
                    marketplace: "Yes",
                    inquiry: "Yes",
                    ecosystem: "Yes",
                    seo: "Strong",
                    india: "Limited India",
                    corporate: "Partial",
                  },
                  {
                    name: "WedmeGood",
                    marketplace: "Yes",
                    inquiry: "Yes",
                    ecosystem: "Yes",
                    seo: "Strong",
                    india: "Strong India",
                    corporate: "Partial",
                  },
                  {
                    name: "Cvent",
                    marketplace: "Yes",
                    inquiry: "Yes",
                    ecosystem: "Yes",
                    seo: "SEO Moderate",
                    india: "Global",
                    corporate: "Enterprise",
                  },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`${row.active ? "bg-white/10 text-white" : "text-white/50"} hover:bg-white/15 transition-colors`}
                  >
                    <td className="px-6 py-5 md:px-8 md:py-6 font-extrabold flex items-center gap-2">
                      {row.name}{" "}
                      {row.active && (
                        <span className="px-2 py-0.5 bg-accent-orange text-[8px] rounded font-black text-white align-middle tracking-wider">
                          PROPRIETARY
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 md:px-8 md:py-6">{row.marketplace}</td>
                    <td className="px-6 py-5 md:px-8 md:py-6">{row.inquiry}</td>
                    <td className="px-6 py-5 md:px-8 md:py-6">{row.ecosystem}</td>
                    <td className="px-6 py-5 md:px-8 md:py-6 text-amber-400 font-extrabold">{row.seo}</td>
                    <td className="px-6 py-5 md:px-8 md:py-6">{row.india}</td>
                    <td className="px-6 py-5 md:px-8 md:py-6">{row.corporate}</td>
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
              "Social + Corporate segments",
            ].map((text, i) => (
              <FadeUp key={i} delay={0.1 * i} className="h-full">
                <div className="p-4 xl:p-6 rounded-2xl bg-white/5 border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-center h-full">
                  <p className="font-bold text-[10px] xl:text-xs uppercase tracking-wider text-accent-orange mb-2">
                    Advantage {i + 1}
                  </p>
                  <p className="text-[11px] xl:text-[13px] font-semibold text-white/95 whitespace-nowrap tracking-tight">
                    {text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 6. MONETIZATION ━━━ */}
      <section className="py-24 px-6 bg-white border-t border-slate-100 overflow-hidden relative">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold tracking-widest uppercase mb-6">
                <PieChart className="w-4 h-4" />
                <span>Revenue Strategy</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
                Business Model & Monetization
              </h2>
            </FadeUp>
          </div>

          <div className="mt-20 max-w-6xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Lead-Based Revenue */}
               <FadeUp>
                 <div className="p-8 md:p-10 rounded-[32px] bg-slate-50/50 border border-slate-100 group hover:shadow-2xl hover:bg-white hover:border-accent-orange/20 transition-all duration-500 h-full">
                   <div className="w-16 h-16 rounded-2xl bg-accent-orange flex items-center justify-center text-white mb-8">
                     <PieChart size={28} />
                   </div>
                   <h4 className="text-2xl font-extrabold text-primary-navy mb-6">
                     Lead-Based Revenue
                   </h4>
                   <div className="flex flex-col gap-4">
                     {["Pay-per-lead", "Premium leads", "Priority access", "Advanced analytics"].map((t, i) => (
                       <div key={i} className="flex gap-4 text-soft-slate font-semibold text-base">
                         <CheckCircle2 size={20} className="text-accent-orange shrink-0 mt-0.5" />
                         <span>{t}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               </FadeUp>

               {/* Subscription Plans */}
               <FadeUp delay={0.2}>
                 <div className="p-8 md:p-10 rounded-[32px] bg-slate-50/50 border border-slate-100 group hover:shadow-2xl hover:bg-white hover:border-accent-orange/20 transition-all duration-500 h-full flex flex-col">
                   <div className="w-16 h-16 rounded-2xl bg-corporate-blue flex items-center justify-center text-white mb-8">
                     <Settings size={28} />
                   </div>
                   <h4 className="text-2xl font-extrabold text-primary-navy mb-6">
                     Subscription Plans
                   </h4>
                   <div className="flex flex-col gap-4 mb-8">
                     {[
                       "Priority listing placements",
                       "Premium analytics dashboard",
                       "Advanced CRM integration",
                       "Verified badge & boost",
                     ].map((t, i) => (
                       <div key={i} className="flex gap-4 text-soft-slate font-semibold text-base">
                         <CheckCircle2 size={20} className="text-accent-orange shrink-0 mt-0.5" />
                         <span>{t}</span>
                       </div>
                     ))}
                   </div>
                   <div className="mt-auto p-5 rounded-2xl bg-corporate-blue/5 border border-corporate-blue/10">
                     <p className="text-[11px] font-bold text-corporate-blue uppercase tracking-wider leading-relaxed">
                       Creates predictable recurring revenue streams.
                     </p>
                   </div>
                 </div>
               </FadeUp>

               {/* Additional Channels */}
               <FadeUp delay={0.4}>
                 <div className="flex flex-col gap-8 h-full">
                   <div className="p-8 rounded-[32px] bg-emerald-50/50 border border-emerald-100/80 flex-1 flex flex-col justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <h4 className="text-xl font-extrabold text-emerald-800 mb-3">
                       Commission Sharing
                     </h4>
                     <p className="text-sm text-emerald-800/80 leading-relaxed font-semibold">
                       Future integration with transactional booking payments or referral vendor systems.
                     </p>
                   </div>
                   <div className="p-8 rounded-[32px] bg-blue-50/50 border border-blue-100/80 flex-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                     <h4 className="text-xl font-extrabold text-corporate-blue mb-4">
                       Other Channels
                     </h4>
                     <ul className="text-sm text-corporate-blue/80 space-y-2 font-semibold">
                       {["Featured blog integrations", "Sponsored landing pages", "Partner promotions", "Analytics dashboard"].map((item, i) => (
                         <li key={i}>• {item}</li>
                       ))}
                     </ul>
                   </div>
                 </div>
               </FadeUp>
             </div>
          </div>
        </div>
      </section>

      {/* ━━━ 6.1 GTM STRATEGY ━━━ */}
      <section className="py-24 px-6 bg-slate-50 relative border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <FadeUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-xs font-bold tracking-widest uppercase mb-6">
                <Rocket className="w-4 h-4" />
                <span>Growth Plan</span>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
                Go-to-Market Strategy
              </h2>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-soft-slate leading-relaxed">
                Strategic alliances and targeted marketing to accelerate vendor onboarding and capture high-intent user traffic.
              </p>
            </FadeUp>
          </div>

          <div className="mt-20 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Organic SEO Focus",
                  items: ["City landing pages", "Venue categories", "Blog stories", "Schema markup"],
                  color: "border-accent-orange",
                  bg: "bg-orange-50/50",
                  textColor: "text-accent-orange"
                },
                {
                  title: "Paid Campaigns",
                  items: ["Google Ads", "Social campaigns", "Influencer collab"],
                  color: "border-corporate-blue",
                  bg: "bg-blue-50/50",
                  textColor: "text-corporate-blue"
                },
                {
                  title: "Partnerships",
                  items: ["Wedding planners", "Event firms", "Agencies", "DMCs"],
                  color: "border-emerald-500",
                  bg: "bg-emerald-50/50",
                  textColor: "text-emerald-600"
                },
              ].map((item, i) => (
                <FadeUp key={i} delay={0.2 * i}>
                  <div className={`p-8 md:p-10 rounded-[32px] bg-white border-t-4 border-x border-b border-slate-100 shadow-xl ${item.color} h-full hover:-translate-y-2 transition-transform duration-500`}>
                    <h4 className="text-2xl font-extrabold text-primary-navy mb-8">
                      {item.title}
                    </h4>
                    <div className="flex flex-col gap-4">
                      {item.items.map((sub, j) => (
                        <div key={j} className={`px-4 py-3 rounded-2xl ${item.bg} text-sm font-bold ${item.textColor} tracking-tight text-center`}>
                          {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
            
            <FadeUp delay={0.6}>
              <div className="mt-12 p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
                <div className="w-16 h-16 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange shrink-0">
                  <Globe className="w-8 h-8" />
                </div>
                <p className="text-lg text-primary-navy font-semibold leading-relaxed">
                  Strategic alliances will boost referral traffic and co-marketing opportunities across target regions.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━ 7. TECHNOLOGY ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-[radial-gradient(circle_at_50%_0%,var(--color-primary-navy),#030a14)] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto container relative z-10">
          <SectionHeading
            title="Technology & Scalability"
            subtitle="Technical Infrastructure"
            light
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="p-6 md:p-10 rounded-3xl border border-white/10 backdrop-blur-3xl bg-white/5 relative overflow-hidden group shadow-2xl">
              <h3 className="text-2xl font-extrabold mb-10 flex items-center gap-4">
                <Rocket className="text-accent-orange w-7 h-7" /> Modern Web Stack
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Django backend for data architecture",
                  "Next.js for frontend performance",
                  "Angular admin panel",
                  "API-first strategy",
                ].map((item, i) => (
                  <FadeUp key={i} delay={0.1 * i}>
                    <div className="p-4 md:p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-orange/30 transition-all duration-300 h-full flex items-center">
                      <p className="text-xs md:text-sm font-bold leading-snug">
                        {item}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <div className="mt-12 group">
                <p className="text-white/40 text-xs font-bold uppercase tracking-wider mb-6">
                  This ensures:
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Scalability",
                    "SEO-friendly infrastructure",
                    "Fast rendering",
                    "Clean URL architecture",
                    "Multi-brand support",
                  ].map((t, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-white/80 text-[10px] font-bold uppercase tracking-wider border border-white/10 group-hover:border-accent-orange/50 transition-colors"
                    >
                      <CheckCircle2 size={12} className="text-accent-orange" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold mb-10 flex items-center gap-4">
                <Layers className="text-mid-blue w-7 h-7" /> Future Technology Roadmap
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "ElasticSearch",
                    desc: "For advanced venue & vendor search",
                  },
                  {
                    title: "Redis Caching",
                    desc: "High performance & low latency",
                  },
                  {
                    title: "Partner CRM",
                    desc: "Integrated dashboard for vendors",
                  },
                  {
                    title: "AI Recommendations",
                    desc: "Driven by user behavior (future phase)",
                  },
                ].map((item, i) => (
                  <FadeUp key={i} delay={0.2 * i}>
                    <div className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-lg font-extrabold">{item.title}</p>
                        <p className="text-sm text-white/50 font-semibold mt-1">
                          {item.desc}
                        </p>
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
      <section className="py-20 md:py-28 px-6 bg-white overflow-hidden container mx-auto">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Traction, Metrics & Projections"
            subtitle="Growth Metrics"
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20">
            {[
              {
                label: "Traffic",
                title: "Organic Growth",
                icon: <Globe size={20} />,
              },
              {
                label: "Leads",
                title: "Conversion Rate",
                icon: <Target size={20} />,
              },
              {
                label: "Profiles",
                title: "Quality Score",
                icon: <Star size={20} />,
              },
              {
                label: "Vendors",
                title: "Onboarding Pace",
                icon: <Users size={20} />,
              },
              {
                label: "Expansion",
                title: "City Reach",
                icon: <Building2 size={20} />,
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.1 * i} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
                <div className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:bg-white hover:border-accent-orange/30 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center h-full">
                  <div className="mb-4 text-accent-orange">{item.icon}</div>
                  <p className="text-[10px] font-bold uppercase text-soft-slate/50 tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="font-extrabold text-primary-navy text-sm">{item.title}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="bg-primary-navy rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-mid-blue/10 blur-[100px] rounded-full" />
            <h3 className="text-2xl font-extrabold mb-12 flex items-center gap-4">
              <BarChart3 className="text-amber-400 w-7 h-7" /> Growth Projections (3–5 Years)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-center min-w-[600px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 md:px-8 md:py-5 text-left font-extrabold text-xs uppercase text-white/50 tracking-wider">
                      Metric
                    </th>
                    <th className="px-6 py-4 md:px-8 md:py-5 font-extrabold text-accent-orange">Year 1</th>
                    <th className="px-6 py-4 md:px-8 md:py-5 font-extrabold text-accent-orange">Year 2</th>
                    <th className="px-6 py-4 md:px-8 md:py-5 font-extrabold text-accent-orange">Year 3</th>
                    <th className="px-6 py-4 md:px-8 md:py-5 font-extrabold text-amber-400">Year 4</th>
                    <th className="px-6 py-4 md:px-8 md:py-5 font-extrabold text-amber-400">Year 5</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-extrabold text-base">
                  {[
                    {
                      metric: "Visits",
                      y1: "50K",
                      y2: "120K",
                      y3: "250K",
                      y4: "500K",
                      y5: "1M+",
                    },
                    {
                      metric: "Inquiries",
                      y1: "1K",
                      y2: "3K",
                      y3: "8K",
                      y4: "20K",
                      y5: "50K+",
                    },
                    {
                      metric: "Venues",
                      y1: "500",
                      y2: "1.5K",
                      y3: "3K",
                      y4: "5K",
                      y5: "10K+",
                    },
                    {
                      metric: "Vendors",
                      y1: "200",
                      y2: "800",
                      y3: "2.5K",
                      y4: "6K",
                      y5: "15K+",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 md:px-8 md:py-5 text-left text-white/60 font-semibold uppercase tracking-widest text-xs">
                        {row.metric}
                      </td>
                      <td className="px-6 py-4 md:px-8 md:py-5">{row.y1}</td>
                      <td className="px-6 py-4 md:px-8 md:py-5">{row.y2}</td>
                      <td className="px-6 py-4 md:px-8 md:py-5">{row.y3}</td>
                      <td className="px-6 py-4 md:px-8 md:py-5 text-amber-400">{row.y4}</td>
                      <td className="px-6 py-4 md:px-8 md:py-5 text-amber-400">{row.y5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 9. USE OF FUNDS ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-slate-50/50 border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto container">
          <SectionHeading
            title="Use of Funds (If Investing)"
            subtitle="Investment Allocation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Technology",
                icon: "🧠",
                items: [
                  "Scalability",
                  "Search improvements",
                  "CRM platform",
                  "Analytics",
                  "AI/ML recommendations",
                ],
              },
              {
                title: "Content & SEO",
                icon: "📍",
                items: [
                  "City pages creation",
                  "Venue descriptions",
                  "Vendor categories",
                  "Blog strategy",
                ],
              },
              {
                title: "Sales & Partners",
                icon: "🤝",
                items: [
                  "Team expansion",
                  "Partner liaison",
                  "Lead growth programs",
                ],
              },
              {
                title: "Marketing",
                icon: "📢",
                items: [
                  "Paid campaigns",
                  "Influencer relationships",
                  "Seasonal promotions",
                ],
              },
            ].map((box, i) => (
              <FadeUp key={i} delay={0.15 * i}>
                <TiltCard className="h-full rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-500">
                  <div className="h-full p-8 bg-white border border-slate-100 flex flex-col justify-between">
                    <div>
                      <div className="text-4xl mb-6">{box.icon}</div>
                      <h4 className="text-xl font-extrabold text-primary-navy mb-6">
                        {box.title}
                      </h4>
                    </div>
                    <ul className="space-y-4 mt-auto">
                      {box.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-center gap-3 text-soft-slate text-sm font-semibold"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-orange shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 10. RISK ANALYSIS ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-white overflow-hidden container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-orange/10 text-accent-orange text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6">
              <span>Risk Management</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 leading-tight">
              Risk Analysis & Mitigation
            </h2>
          </FadeUp>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Market Risk",
              solution: "Strong SEO positioning + diversified revenue",
            },
            {
              label: "Competitive Risk",
              solution: "Dual-brand SEO strategy + vendor ecosystem",
            },
            {
              label: "Operational Risk",
              solution: "Scalable backend + API-based data flow",
            },
            {
              label: "Regulatory Risk",
              solution: "Compliance with data protection laws",
            },
          ].map((risk, i) => (
            <FadeUp key={i} delay={0.1 * i}>
              <TiltCard className="h-full rounded-3xl overflow-hidden shadow-md">
                <div className="p-8 bg-primary-navy text-white flex flex-col justify-between h-full group hover:bg-accent-orange transition-colors duration-500">
                  <div>
                    <p className="text-xs font-bold text-accent-orange group-hover:text-white uppercase tracking-wider mb-4 transition-colors">
                      Risk Identifier {i + 1}
                    </p>
                    <p className="text-lg font-extrabold mb-8">{risk.label}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/20 group-hover:border-white/20 transition-colors">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 group-hover:text-white mb-2 transition-colors">
                      Mitigation Strategy
                    </p>
                    <p className="text-xs font-semibold text-white/80 group-hover:text-white leading-relaxed transition-colors">
                      {risk.solution}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ━━━ 11. LEADERSHIP & TEAM ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-[#030a14] relative overflow-hidden text-left text-white">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto container relative z-10">
          <SectionHeading
            title="Leadership & Team Strength"
            subtitle="Our Team"
            light
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                "Hospitality",
                "Technology",
                "SEO & Content",
                "Event Planning",
                "Marketplace Strategy",
                "Partner Ecosystems",
              ].map((item, i) => (
                <FadeUp key={i} delay={0.1 * i}>
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-orange/30 transition-all duration-300 text-center">
                    <p className="font-semibold text-white text-sm tracking-tight">
                      {item}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <div className="space-y-8">
              <FadeUp>
                <p className="text-2xl font-extrabold text-white leading-relaxed">
                  Homocation Asia Private Limited is governed by a team with
                  deep expertise across the event ecosystem.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-lg text-white/60 leading-relaxed italic border-l-4 border-accent-orange pl-4">
                  "This blend positions the company to execute the ambitious
                  roadmap and dominate the South Asian event marketplace."
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 12. STRATEGIC PARTNERSHIPS ━━━ */}
      <section className="py-20 md:py-28 px-6 bg-white overflow-hidden text-left container mx-auto">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Strategic Partnerships & Alliances"
            subtitle="Collaboration Network"
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: "Wedding Planners", icon: "💍" },
              { label: "Corporate Agencies", icon: "🏢" },
              { label: "Hospitality Associations", icon: "🏨" },
              { label: "Local Vendor Networks", icon: "🤝" },
              { label: "Media Partners", icon: "📰" },
            ].map((item, i) => (
              <FadeUp key={i} delay={0.1 * i} className={i === 4 ? "col-span-2 md:col-span-1" : ""}>
                <div className="p-8 rounded-3xl bg-slate-50/50 border border-slate-100 flex flex-col items-center text-center group hover:bg-primary-navy hover:shadow-xl transition-all duration-500 h-full justify-center">
                  <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">
                    {item.icon}
                  </div>
                  <p className="font-extrabold text-primary-navy text-sm group-hover:text-white transition-colors">
                    {item.label}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.6}>
            <div className="mt-12 p-8 rounded-3xl bg-accent-orange/5 border border-accent-orange/10 text-center">
              <p className="text-primary-navy font-bold leading-relaxed max-w-3xl mx-auto text-sm md:text-base">
                Strategic alliances to boost referral traffic and co-marketing
                are core to our execution strategy.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 13. CLOSING & WHY INVEST ━━━ */}
      <section className="py-20 md:py-32 px-6 bg-slate-50/50 border-t border-slate-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[-500px] left-[-200px] w-[1000px] h-[1000px] bg-accent-orange/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-500px] right-[-200px] w-[1000px] h-[1000px] bg-corporate-blue/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10 container">
          <SectionHeading
            title="Why Invest in Us"
            subtitle="Investment Opportunity"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[
              "Strong growth potential in a large market",
              "Dual-brand digital strategy",
              "Long-term SEO moat",
              "Scalable technology infrastructure",
              "Focus on high-intent inquiries",
              "Future-ready vendor ecosystem",
            ].map((text, i) => (
              <FadeUp key={i} delay={0.1 * i}>
                <div className="flex items-start gap-4 p-6 rounded-3xl bg-white border border-slate-100 hover:border-accent-orange/20 hover:shadow-xl transition-all duration-300 text-left group h-full">
                  <div className="w-10 h-10 rounded-xl bg-primary-navy flex items-center justify-center text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-colors shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <p className="font-bold text-primary-navy text-sm md:text-base leading-tight mt-2">
                    {text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.6}>
            <div className="flex flex-col items-center">
              <div className="w-20 h-[1px] bg-slate-200 mb-12" />
              <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-8">
                Closing Vision
              </h3>
              <div className="p-8 md:p-12 rounded-3xl bg-hero-gradient text-white shadow-2xl relative overflow-hidden group">
                <div className="parallax-bg absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop')] opacity-5 scale-110" />
                <p className="text-lg md:text-2xl leading-relaxed relative z-10 font-semibold">
                  "Homocation Asia Private Limited is not merely building a
                  website — it is building a{" "}
                  <span className="text-accent-orange font-extrabold underline decoration-4 underline-offset-8">
                    structured, sustainable, digital event ecosystem
                  </span>
                  ."
                </p>

                <div className="mt-12 pt-12 border-t border-white/10 relative z-10">
                  <p className="text-white/80 text-sm md:text-lg font-semibold leading-relaxed max-w-4xl mx-auto">
                    With increasing digital behavior, rising experiential
                    spending, and unmet demand in India & South Asia,
                    Eventibe.com and VenueForEvent.com are well-positioned to
                    become industry leaders in event venue and services
                    discovery.
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <MagneticButton
                  href="/contact-us"
                  className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-cta-gradient text-white font-extrabold text-lg shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.5)] cursor-pointer"
                >
                  <span>Discuss Investment Opportunities</span> <ArrowRight className="w-5 h-5" />
                </MagneticButton>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Footer-like Branding Strip */}
      <section className="py-12 bg-slate-100 border-t border-slate-200 px-6 text-center">
        <p className="text-xs font-black text-primary-navy/20 uppercase tracking-[1rem] ml-[1rem]">
          HOMOCATION ASIA
        </p>
      </section>
    </div>
  );
}
