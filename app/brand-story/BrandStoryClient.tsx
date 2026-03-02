"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, Sparkles, Building2, Heart, Mic2,
  Camera, Palette, Users, ShieldCheck, Star, Quote,
} from "lucide-react";

/* ═══ GSAP Parallax ═══ */
function useGsapParallax() {
  useEffect(() => {
    let ctx: any = null;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {

        /* 1 ▸ Background image parallax – moves slower than scroll */
        gsap.utils.toArray<HTMLElement>(".parallax-bg").forEach((el) => {
          gsap.to(el, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.5 },
          });
        });

        /* 2 ▸ Hero / closing slow zoom on scroll */
        gsap.utils.toArray<HTMLElement>(".hero-zoom").forEach((el) => {
          gsap.fromTo(el, { scale: 1 }, {
            scale: 1.15,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top top", end: "bottom top", scrub: 0.8 },
          });
        });

        /* 3 ▸ Gradient orbs float in opposite direction */
        gsap.utils.toArray<HTMLElement>(".parallax-orb").forEach((el) => {
          gsap.to(el, {
            y: -80,
            x: 30,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1.2 },
          });
        });

        /* 4 ▸ Text parallax – text moves slightly slower for depth */
        gsap.utils.toArray<HTMLElement>(".parallax-text").forEach((el) => {
          gsap.to(el, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 0.6 },
          });
        });

        /* 5 ▸ Horizontal line grow */
        gsap.utils.toArray<HTMLElement>(".line-grow").forEach((el) => {
          gsap.fromTo(el, { scaleX: 0 }, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 85%", end: "top 50%", scrub: true },
          });
        });

        /* 6 ▸ Fade-on-scroll for hero text (fades out as you scroll away) */
        gsap.utils.toArray<HTMLElement>(".scroll-fade-out").forEach((el) => {
          gsap.to(el, {
            opacity: 0,
            y: -40,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "center center", end: "bottom top", scrub: 0.3 },
          });
        });

        /* 7 ▸ Decorative element horizontal drift */
        gsap.utils.toArray<HTMLElement>(".parallax-drift").forEach((el) => {
          const dir = el.dataset.direction === "right" ? 60 : -60;
          gsap.to(el, {
            x: dir,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: 1.5 },
          });
        });

        /* 8 ▸ Stagger reveal for grid children */
        gsap.utils.toArray<HTMLElement>(".parallax-stagger-grid").forEach((grid) => {
          const children = grid.children;
          gsap.fromTo(children, { y: 60, opacity: 0 }, {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: grid, start: "top 80%", end: "top 30%", scrub: 0.5 },
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
      initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}

function SlideIn({ children, delay = 0, from = "left", className = "" }: { children: React.ReactNode; delay?: number; from?: "left" | "right"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const x = from === "left" ? -80 : 80;
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function StaggerLines({ lines, className = "", lineClass = "" }: { lines: string[]; className?: string; lineClass?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div key={i} className={lineClass}
          initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}>
          {line}
        </motion.div>
      ))}
    </div>
  );
}

/* ═══ Decorative Components ═══ */
function GradientOrb({ className }: { className: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} />;
}

function SectionDivider({ variant = "light" }: { variant?: "light" | "dark" }) {
  return (
    <div className="line-grow origin-left mx-auto" style={{ width: "120px", height: "2px", background: variant === "dark" ? "linear-gradient(90deg, transparent, #F97316, transparent)" : "linear-gradient(90deg, transparent, #1E3A8A, transparent)" }} />
  );
}

/* ═══ Micro-Interaction Components ═══ */

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
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    // Position glow
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(249,115,22,0.15) 0%, transparent 60%)`;
      glowEl.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) glowEl.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-glow absolute inset-0 rounded-inherit pointer-events-none opacity-0 z-10" style={{ transition: 'opacity 0.3s' }} />
      {children}
    </div>
  );
}

/** Magnetic button that subtly follows cursor */
function MagneticButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0, 0)';
  };

  const content = (
    <div
      ref={btnRef}
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

/* ═══ MAIN ═══ */
export default function BrandStoryClient() {
  useGsapParallax();

  return (
    <div className="brand-story-page overflow-hidden bg-[#030a14]">

      {/* ━━━ 1. HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="brand-hero">
        {/* Layer 1: Slow-panning background image */}
        <div className="hero-zoom absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" alt="Event energy" className="hero-bg-pan w-full h-full object-cover scale-110" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a14]/85 via-[#0B1F3A]/75 to-[#030a14]/95" />
        </div>

        {/* Layer 2: Animated gradient mesh */}
        <div className="absolute inset-0 z-[1]">
          <div className="hero-gradient-mesh absolute inset-0 opacity-40" />
        </div>

        {/* Layer 3: Animated pulsing orbs */}
        <div className="parallax-orb absolute w-[700px] h-[700px] rounded-full bg-[#F97316]/10 blur-[200px] hero-orb-1 z-[1]" />
        <div className="parallax-orb absolute w-[500px] h-[500px] rounded-full bg-[#1E3A8A]/20 blur-[180px] hero-orb-2 z-[1]" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-[#FBBF24]/8 blur-[140px] hero-orb-3 z-[1]" />

        {/* Layer 4: Light beams / rays */}
        <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
          <div className="hero-beam hero-beam-1" />
          <div className="hero-beam hero-beam-2" />
          <div className="hero-beam hero-beam-3" />
        </div>

        {/* Layer 5: Floating particles */}
        <div className="absolute inset-0 z-[2] pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/20"
              style={{
                left: `${5 + (i * 47) % 90}%`,
                top: `${10 + (i * 31) % 80}%`,
              }}
              animate={{
                y: [0, -30 - (i % 4) * 15, 0],
                opacity: [0.1, 0.4, 0.1],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + (i % 3) * 2,
                repeat: Infinity,
                delay: (i * 0.4) % 3,
                ease: "easeInOut",
              }}
            />
          ))}
          {/* Larger accent particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`lg-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#F97316]/30"
              style={{
                left: `${15 + (i * 67) % 70}%`,
                top: `${20 + (i * 41) % 60}%`,
              }}
              animate={{
                y: [0, -50 - (i % 3) * 20, 0],
                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                opacity: [0.15, 0.5, 0.15],
              }}
              transition={{
                duration: 6 + (i % 2) * 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Layer 6: Animated grid lines */}
        <div className="absolute inset-0 z-[1] hero-grid-animated opacity-[0.03]" />

        {/* Content */}
        <div className="scroll-fade-out relative z-10 text-center px-6 max-w-5xl mx-auto">
          <FadeUp delay={0.2}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
              <div className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
              <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em]">Brand Story</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-white/40 text-sm md:text-base font-medium tracking-[0.4em] uppercase mb-6">Eventibe.com</p>
          </FadeUp>
          <FadeUp delay={0.6}>
            <h1 className="parallax-text text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black text-white leading-[0.95] tracking-tight mb-10">
              Where Every Event<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FBBF24] to-[#F97316]">Finds Its Energy</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.9}>
            <div className="flex items-center justify-center gap-4">
              <div className="parallax-drift w-16 h-[1px] bg-gradient-to-r from-transparent to-white/30" data-direction="left" />
              <Sparkles size={16} className="text-[#F97316]" />
              <div className="parallax-drift w-16 h-[1px] bg-gradient-to-l from-transparent to-white/30" data-direction="right" />
            </div>
          </FadeUp>
        </div>

        {/* Scroll indicator */}
        <FadeUp delay={1.2} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/30 text-[10px] uppercase tracking-[0.3em]">Scroll to explore</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-2 rounded-full bg-[#F97316]" />
            </motion.div>
          </div>
        </FadeUp>
      </section>

      {/* ━━━ 2. BEFORE THE LIGHTS TURN ON ━━━ */}
      <section className="relative py-0 bg-[#030a14]" id="before-lights">
        {/* Full-bleed image strip */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <div className="parallax-bg absolute inset-0 -top-[20%] -bottom-[20%]">
            <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="Corporate event stage" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a14] via-transparent to-[#030a14]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FadeUp>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center leading-[1] tracking-tight">
                Before the<br /><span className="text-[#F97316]">Lights Turn On</span>
              </h2>
            </FadeUp>
          </div>
        </div>

        {/* Editorial content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left column - poetic lines */}
            <div className="lg:col-span-5">
              <SlideIn from="left">
                <div className="sticky top-32 space-y-8">
                  <div className="space-y-2">
                    <p className="text-white/30 text-xs font-bold uppercase tracking-[0.3em]">Chapter 01</p>
                    <div className="w-8 h-[2px] bg-[#F97316]" />
                  </div>
                  <div className="space-y-4">
                    {["Every unforgettable event", "begins in silence."].map((l, i) => (
                      <p key={i} className="text-2xl md:text-3xl lg:text-4xl font-black text-white/90 leading-tight">{l}</p>
                    ))}
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                    <Quote size={20} className="text-[#F97316] mb-3" />
                    <p className="text-white/60 text-sm leading-relaxed italic">
                      Events are never just gatherings.<br />They are turning points.
                    </p>
                  </div>
                </div>
              </SlideIn>
            </div>

            {/* Right column - narrative */}
            <div className="lg:col-span-7 space-y-6">
              <SlideIn from="right" delay={0.2}>
                <div className="space-y-5 text-base md:text-lg text-white/50 leading-relaxed">
                  <p>Before the music plays.<br />Before the stage lights glow.<br />Before guests walk into a beautifully prepared space.</p>
                  <p>There is a thought.<br />A vision.<br />A feeling.</p>
                  <p>A bride imagining her perfect wedding venue.<br />A CEO preparing for a transformational corporate event.<br />A brand planning an impactful product launch venue.<br />A family searching for elegant banquet halls to celebrate a milestone.</p>
                </div>
              </SlideIn>

              <FadeUp delay={0.3}>
                <div className="my-10 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#F97316]/10 to-transparent border border-[#F97316]/20 relative overflow-hidden">
                  <GradientOrb className="w-[200px] h-[200px] bg-[#F97316]/10 blur-[100px] -top-20 -right-20" />
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed font-medium relative z-10">
                    At Eventibe.com, we believe events are powered by energy — by emotion, by ambition, by connection. That invisible force is what we call the <span className="text-[#F97316] font-bold">vibe</span>.
                  </p>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed">
                  And our purpose is simple:<br />
                  <span className="text-white font-bold text-xl md:text-2xl block mt-3">
                    To help you find the right space, the right partners, and the right energy for your moment.
                  </span>
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 3. THE GAP WE COULDN'T IGNORE ━━━ */}
      <section className="relative py-24 md:py-36 overflow-hidden" id="the-gap">
        <div className="parallax-bg absolute inset-0 -top-[20%] -bottom-[20%]">
          <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" alt="Conference" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0B1F3A]/92" />
        <GradientOrb className="w-[500px] h-[500px] bg-[#1E3A8A]/20 blur-[160px] -top-32 -left-32" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 02</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-8">
                  The Gap We<br />Couldn&apos;t Ignore
                </h2>
              </FadeUp>
              <StaggerLines lineClass="text-base md:text-lg text-gray-300/80 leading-relaxed" className="space-y-4" lines={[
                "Event planning in India has always been deeply personal — yet the digital tools available were impersonal, cluttered, and incomplete.",
                "Couples scrolled through outdated directories.",
                "Corporate teams called dozens of venues just to get basic pricing.",
                "Small business owners had no way to compare event spaces by layout, capacity, or vibe.",
              ]} />
            </div>

            <FadeUp delay={0.3}>
              <div className="space-y-6">
                <div className="p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                  <p className="text-white/70 text-lg leading-relaxed">The gap wasn&apos;t in events — it was in <span className="text-white font-bold">how people found and planned them</span>.</p>
                </div>
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 border border-[#F97316]/20">
                  <p className="text-white font-bold text-xl mb-3">Eventibe was born to fill that gap.</p>
                  <p className="text-white/50 text-sm leading-relaxed">Not as another listing directory. Not as another marketplace with too many options and no guidance.</p>
                  <p className="text-[#F97316] font-semibold text-base mt-4">But as a curated discovery platform — where every venue is verified, every listing is meaningful, and every decision is easier.</p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ━━━ 4. WHY EVENTIBE ━━━ */}
      <section className="relative py-24 md:py-36 bg-white overflow-hidden" id="why-eventibe">
        <GradientOrb className="w-[400px] h-[400px] bg-[#F97316]/5 blur-[120px] top-0 right-0" />
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 03</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] leading-[1.05] tracking-tight mb-4">
                Why &ldquo;Eventibe&rdquo;?
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#F97316] to-[#FBBF24] mx-auto rounded-full" />
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <FadeUp delay={0.1}>
              <div className="text-center p-10 rounded-3xl bg-gradient-to-b from-[#0B1F3A] to-[#0f2847] text-white relative overflow-hidden group">
                <GradientOrb className="w-[200px] h-[200px] bg-[#F97316]/15 blur-[80px] -bottom-20 -right-20 group-hover:bg-[#F97316]/25 transition-all duration-700" />
                <p className="text-5xl md:text-6xl font-black mb-2 relative z-10">Event</p>
                <p className="text-white/40 text-sm tracking-wider uppercase relative z-10">The occasion</p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="flex items-center justify-center">
                <div className="text-6xl md:text-7xl font-black text-[#F97316]">+</div>
              </div>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="text-center p-10 rounded-3xl bg-gradient-to-b from-[#F97316] to-[#EA580C] text-white relative overflow-hidden group">
                <GradientOrb className="w-[200px] h-[200px] bg-white/10 blur-[80px] -top-20 -left-20" />
                <p className="text-5xl md:text-6xl font-black mb-2 relative z-10">Vibe</p>
                <p className="text-white/70 text-sm tracking-wider uppercase relative z-10">The energy</p>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.4}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-xl md:text-2xl text-[#0B1F3A] font-bold mb-8">Every event has a vibe — a pulse, a rhythm, an energy.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { label: "A wedding has", vibe: "warmth", color: "from-pink-500 to-rose-500" },
                  { label: "A summit has", vibe: "precision", color: "from-blue-500 to-indigo-500" },
                  { label: "A launch has", vibe: "electricity", color: "from-amber-500 to-yellow-500" },
                  { label: "A celebration has", vibe: "togetherness", color: "from-emerald-500 to-green-500" },
                ].map((v, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-gray-50 border border-gray-100 text-center group hover:shadow-xl transition-shadow duration-500">
                    <p className="text-xs text-[#334155] mb-1">{v.label}</p>
                    <p className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${v.color}`}>{v.vibe}</p>
                  </div>
                ))}
              </div>
              <p className="text-base md:text-lg text-[#334155] leading-relaxed">Because when the right space meets the right moment —<br /><span className="text-[#0B1F3A] font-bold text-xl">The vibe comes alive.</span></p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 5. OUR MISSION ━━━ */}
      <section className="relative py-24 md:py-36 bg-[#F8FAFC] overflow-hidden" id="our-mission">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(#0B1F3A 1px, transparent 1px), linear-gradient(90deg, #0B1F3A 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 04</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] leading-[1.05] tracking-tight">Our Mission</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SlideIn from="left">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-[#0B1F3A] font-bold leading-relaxed">To simplify and elevate how people in India discover, compare, and book event venues and services — by combining technology with trust, and data with design.</p>
                <div className="space-y-4">
                  {["Couples planning weddings and receptions", "Corporate teams organizing conferences, retreats, and launches", "Families celebrating milestones", "Event professionals seeking verified venue partners"].map((t, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                      <div className="w-8 h-8 rounded-lg bg-[#F97316] flex items-center justify-center text-white shrink-0 mt-0.5"><span className="text-xs font-black">{String(i + 1).padStart(2, "0")}</span></div>
                      <p className="text-[#334155] font-medium">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>

            <SlideIn from="right" delay={0.2}>
              <div className="bg-[#0B1F3A] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden">
                <GradientOrb className="w-[300px] h-[300px] bg-[#1E3A8A]/20 blur-[100px] -top-20 -right-20" />
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#F97316] mb-8 relative z-10">Our Commitment</h3>
                <div className="space-y-4 relative z-10">
                  {["Verified venues with authentic photos and details", "Smart search by event type, capacity, budget, and style", "Transparent information — no hidden surprises", "Direct connection with venue managers", "Curated content that inspires and educates", "A platform built for speed, clarity, and trust"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <CheckCircle2 size={18} className="text-[#F97316] shrink-0 mt-0.5" />
                      <span className="text-white/70 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ━━━ 6. DESIGNED FOR EVERY CELEBRATION ━━━ */}
      <section className="relative py-0 overflow-hidden" id="every-celebration">
        <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="parallax-bg absolute inset-0 -top-[25%] -bottom-[25%]">
            <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" alt="Grand celebration" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a14] via-[#0B1F3A]/60 to-[#030a14]" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-6">
              <FadeUp><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 05</p></FadeUp>
              <FadeUp delay={0.1}><h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tight mb-6">Designed for<br /><span className="text-[#F97316]">Every Celebration</span></h2></FadeUp>
            </div>
          </div>
        </div>

        <div className="bg-[#030a14] py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="parallax-stagger-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Heart, title: "Weddings & Receptions", desc: "Dream venues — from intimate lawns to grand ballrooms", img: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" },
                { icon: Building2, title: "Corporate Events", desc: "Conferences, summits, team retreats, and product launches", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400&auto=format&fit=crop" },
                { icon: Users, title: "Social Gatherings", desc: "Birthday parties, anniversaries, reunions, and celebrations", img: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=400&auto=format&fit=crop" },
                { icon: Star, title: "Exclusive Experiences", desc: "Destination events, gala dinners, and luxury affairs", img: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc8?q=80&w=400&auto=format&fit=crop" },
              ].map((item, i) => (
                <FadeUp key={i} delay={i * 0.1}>
                  <TiltCard className="rounded-2xl overflow-hidden h-[320px] md:h-[380px]">
                    <div className="group relative h-full">
                      <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/40 to-transparent group-hover:from-[#0B1F3A]/95 transition-all duration-500" />
                      {/* Shimmer line */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                        <div className="shimmer-line absolute inset-0" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform group-hover:translate-y-[-8px] transition-transform duration-500">
                        <div className="icon-bounce"><item.icon size={24} className="text-[#F97316] mb-3" /></div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-white/50 text-sm group-hover:text-white/70 transition-colors duration-500">{item.desc}</p>
                        <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#F97316] to-transparent mt-3 transition-all duration-700" />
                      </div>
                    </div>
                  </TiltCard>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 7. FOR HOSTS ━━━ */}
      <section className="relative py-24 md:py-36 bg-white overflow-hidden" id="for-hosts">
        <GradientOrb className="w-[400px] h-[400px] bg-[#1E3A8A]/5 blur-[120px] bottom-0 left-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <FadeUp>
                <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 06</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] leading-[1.05] tracking-tight mb-6">For <span className="text-[#F97316]">Hosts</span></h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-base md:text-lg text-[#334155] leading-relaxed mb-8">If you own or manage an event venue — a banquet hall, a resort, a rooftop space, or a convention center — Eventibe gives you a digital storefront that works.</p>
              </FadeUp>
              <div className="space-y-3">
                {["A fully branded venue profile with photos, details, and descriptions", "Exposure to thousands of event planners, couples, and corporate teams", "Inquiry management — receive and respond to genuine leads", "SEO-optimized listing pages that rank on search engines", "Analytics and insights to understand visitor behavior", "Support from our team to optimize your listing"].map((item, i) => (
                  <FadeUp key={i} delay={0.15 + i * 0.06}>
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-lg hover:border-[#F97316]/20 hover:translate-x-1 transition-all duration-500 group cursor-default">
                      <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shrink-0 group-hover:bg-[#F97316] group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500"><CheckCircle2 size={16} /></div>
                      <p className="text-[#334155] font-medium text-sm md:text-base group-hover:text-[#0B1F3A] transition-colors duration-300">{item}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
              <FadeUp delay={0.6}>
                <div className="mt-8 p-6 rounded-2xl border-l-4 border-[#1E3A8A] bg-[#1E3A8A]/5">
                  <p className="text-[#0B1F3A] font-semibold">We don&apos;t just list your venue — we position it for discovery.</p>
                </div>
              </FadeUp>
            </div>

            <SlideIn from="right" delay={0.3}>
              <div className="relative rounded-3xl overflow-hidden h-[500px] md:h-[600px]">
                <div className="parallax-bg absolute inset-0 -top-[15%] -bottom-[15%]">
                  <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" alt="Venue" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/70 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                  <p className="text-white font-bold text-lg">Your venue. Our platform.</p>
                  <p className="text-white/60 text-sm mt-1">The right audience for the right space.</p>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ━━━ 8. FOR CREATORS ━━━ */}
      <section className="relative py-24 md:py-36 bg-[#0B1F3A] overflow-hidden" id="for-creators">
        <GradientOrb className="w-[500px] h-[500px] bg-[#F97316]/8 blur-[160px] top-0 right-0" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 07</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">For <span className="text-[#F97316]">Creators</span></h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-12 max-w-2xl">Eventibe isn&apos;t just for venues. We&apos;re building a space for the people who make events happen.</p>
          </FadeUp>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {[
              { icon: Camera, label: "Photographers", img: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?q=80&w=300&auto=format&fit=crop" },
              { icon: Palette, label: "Decorators", img: "https://images.unsplash.com/photo-1478146059778-26a4c8c12ee8?q=80&w=300&auto=format&fit=crop" },
              { icon: Mic2, label: "Entertainers", img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=300&auto=format&fit=crop" },
              { icon: Users, label: "Caterers & Planners", img: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=300&auto=format&fit=crop" },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <TiltCard className="rounded-2xl overflow-hidden h-[180px] md:h-[220px]">
                  <div className="group relative h-full">
                    <img src={item.img} alt={item.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:brightness-110 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 to-[#0B1F3A]/20 group-hover:from-[#0B1F3A]/95 transition-all duration-500" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden"><div className="shimmer-line absolute inset-0" /></div>
                    <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3 transform group-hover:translate-y-[-4px] transition-transform duration-500">
                      <div className="w-10 h-10 rounded-lg bg-[#F97316]/20 backdrop-blur-sm flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:scale-110 transition-all duration-500"><item.icon size={20} /></div>
                      <p className="text-white font-bold text-sm">{item.label}</p>
                    </div>
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <div className="max-w-2xl p-8 rounded-2xl bg-white/[0.04] border border-white/[0.08]">
              <p className="text-white/60 text-base leading-relaxed mb-4">Event vendors will soon be able to create detailed service profiles, showcase portfolios, receive inquiries from planners directly, and get featured in curated vendor lists.</p>
              <p className="text-[#F97316] font-semibold">Because behind every unforgettable event is a creative team — and they deserve visibility too.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 9. TECHNOLOGY WITH A HUMAN HEART ━━━ */}
      <section className="relative py-24 md:py-36 bg-white overflow-hidden" id="tech-human">
        <GradientOrb className="w-[500px] h-[500px] bg-[#1E3A8A]/5 blur-[160px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 08</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] leading-[1.05] tracking-tight">Technology with a<br /><span className="text-[#1E3A8A]">Human Heart</span></h2>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-center text-base md:text-lg text-[#334155] leading-relaxed max-w-3xl mx-auto mb-12">
              We use modern technology — from intelligent search algorithms to responsive design — but we never forget that events are deeply human.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Speed", desc: "Fast, lightweight pages that load instantly", icon: "⚡" },
              { label: "Clarity", desc: "Clean design that makes decisions easier", icon: "💎" },
              { label: "Trust", desc: "Verified data, curated photos, honest descriptions", icon: "🛡️" },
              { label: "Empathy", desc: "We design for the emotions behind the event", icon: "❤️" },
            ].map((v, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <TiltCard className="rounded-2xl">
                  <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-[#1E3A8A]/20 transition-all duration-500 group cursor-default">
                    <span className="text-3xl mb-4 block group-hover:scale-125 inline-block transition-transform duration-500">{v.icon}</span>
                    <h3 className="text-xl font-black text-[#0B1F3A] mb-2 group-hover:text-[#1E3A8A] transition-colors duration-300">{v.label}</h3>
                    <p className="text-[#334155] text-sm leading-relaxed">{v.desc}</p>
                    <div className="h-0.5 w-0 group-hover:w-1/2 bg-gradient-to-r from-[#1E3A8A] to-transparent mt-4 transition-all duration-700" />
                  </div>
                </TiltCard>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.5}>
            <div className="mt-12 text-center p-8 rounded-2xl bg-[#0B1F3A] text-white">
              <p className="text-base md:text-lg leading-relaxed text-white/70">Behind every filter, every search result, and every venue profile, there&apos;s a team that understands what it means to plan something <span className="text-[#F97316] font-bold">meaningful</span>.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 10. BUILT ON TRUST ━━━ */}
      <section className="relative py-24 md:py-36 overflow-hidden" id="trust">
        <div className="parallax-bg absolute inset-0 -top-[20%] -bottom-[20%]">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" alt="Trust" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[#0B1F3A]/95" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 09</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.05] tracking-tight">Built on <span className="text-[#F97316]">Trust</span></h2>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SlideIn from="left">
              <div className="p-8 md:p-10 rounded-3xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#1E3A8A] flex items-center justify-center"><ShieldCheck size={20} /></div>For Event Planners</h3>
                <div className="space-y-3">
                  {["Every venue is vetted and verified before listing", "Photos are authentic — no stock images", "Pricing information is transparent and accessible", "Reviews and ratings from real users", "Direct contact with venue managers — no middlemen"].map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <CheckCircle2 size={16} className="text-[#1E3A8A] shrink-0 mt-1" />
                      <p className="text-white/60 text-sm">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
            <SlideIn from="right" delay={0.2}>
              <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#F97316]/15 to-[#F97316]/5 border border-[#F97316]/20 h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-[#F97316] flex items-center justify-center"><Building2 size={20} /></div>For Venue Partners</h3>
                <div className="space-y-3">
                  {["Genuine inquiries from serious planners", "No spam, no irrelevant traffic", "Full control over your listing content", "Dedicated support for onboarding and optimization", "Analytics dashboard to track performance"].map((t, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      <CheckCircle2 size={16} className="text-[#F97316] shrink-0 mt-1" />
                      <p className="text-white/60 text-sm">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ━━━ 11. EMOTIONAL POWER OF SPACE ━━━ */}
      <section className="relative py-0 overflow-hidden" id="power-of-space">
        <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          <div className="parallax-bg absolute inset-0 -top-[25%] -bottom-[25%]">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc8?q=80&w=2069&auto=format&fit=crop" alt="Grand ballroom" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a14]/60 via-[#0B1F3A]/40 to-[#030a14]/80" />
          <div className="absolute inset-0 flex items-center z-10">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
              <FadeUp>
                <p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 10</p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tight mb-8">The Emotional<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#FBBF24]">Power of Space</span></h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <div className="max-w-2xl space-y-4">
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed">A venue is never just four walls and a roof. It&apos;s the first thing your guests see. It sets the tone for everything.</p>
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mt-6">
                    <p className="text-white font-bold text-lg">The right space doesn&apos;t just host an event — it amplifies it.</p>
                    <p className="text-white/50 text-sm mt-2">That&apos;s why we obsess over helping you find the right one.</p>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 12. INDUSTRY STANDARDS ━━━ */}
      <section className="relative py-24 md:py-36 bg-white" id="industry-standards">
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(#0B1F3A 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp><div className="text-center mb-16"><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 11</p><h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] tracking-tight">Setting <span className="text-[#F97316]">Industry Standards</span></h2></div></FadeUp>
          <div className="parallax-stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Verified Listings Only", desc: "Every venue goes through our verification process before appearing on the platform." },
              { title: "Authentic Photography", desc: "No stock photos. Every image represents the actual venue experience." },
              { title: "Transparent Pricing", desc: "Clear pricing structures so planners can make informed decisions." },
              { title: "SEO-Optimized Discovery", desc: "Our content is built for search engines — so planners find venues when they need them." },
              { title: "Mobile-First Design", desc: "Optimized for on-the-go planning — because inspiration strikes anywhere." },
              { title: "Responsive Support", desc: "Dedicated assistance for both planners and venue partners." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:border-[#F97316]/20 transition-all duration-500 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-[#0B1F3A] flex items-center justify-center text-white mb-5 group-hover:bg-[#F97316] transition-colors duration-500">
                    <span className="text-sm font-black">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0B1F3A] mb-2">{item.title}</h3>
                  <p className="text-[#334155] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 13. VISION FOR THE FUTURE ━━━ */}
      <section className="relative py-24 md:py-36 overflow-hidden" id="vision-future">
        <div className="hero-zoom absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="Future vision" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#050d1a]/90 via-[#0B1F3A]/80 to-[#050d1a]/95" />
        </div>
        <GradientOrb className="w-[500px] h-[500px] bg-[#1E3A8A]/15 blur-[160px] top-1/3 right-0 z-[1]" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
          <FadeUp><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">Chapter 12</p><h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tight mb-12 text-center">Our Vision for<br /><span className="text-[#F97316]">the Future</span></h2></FadeUp>
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["A full-service event planning platform", "AI-powered recommendations", "Real-time availability & instant booking", "Virtual venue tours", "Event budget planning tools", "Trusted partner network for every event type"].map((t, i) => (
                <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#F97316]/20 flex items-center justify-center text-[#F97316] shrink-0"><ArrowRight size={14} /></div>
                  <p className="text-white/70 font-medium text-sm">{t}</p>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.4}><p className="text-center text-white/50 text-base md:text-lg mt-12 max-w-3xl mx-auto">Our ambition is to become the default starting point for anyone planning an event in India — and eventually, beyond.</p></FadeUp>
        </div>
      </section>

      {/* ━━━ 14. MORE THAN LOGISTICS ━━━ */}
      <section className="relative py-24 md:py-36 bg-white overflow-hidden" id="more-than-logistics">
        <GradientOrb className="w-[600px] h-[600px] bg-[#F97316]/5 blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <FadeUp><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 13</p></FadeUp>
          <FadeUp delay={0.1}><h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0B1F3A] leading-[1] tracking-tight mb-12">More Than<br /><span className="text-[#1E3A8A]">Logistics</span></h2></FadeUp>
          <FadeUp delay={0.2}><p className="text-2xl md:text-3xl text-[#0B1F3A] font-bold mb-8">Events are emotional milestones.</p></FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {["A first dance", "A keynote speech", "A standing ovation", "A family reunion", "A brand reveal"].map((t, i) => (
                <span key={i} className="px-5 py-3 rounded-full bg-gray-50 border border-gray-200 text-[#334155] font-semibold text-sm hover:bg-[#F97316] hover:text-white hover:border-[#F97316] hover:scale-105 hover:shadow-lg hover:shadow-[#F97316]/20 active:scale-95 transition-all duration-500 cursor-default select-none">{t}</span>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-b from-[#0B1F3A] to-[#0f2847] text-white relative overflow-hidden">
              <GradientOrb className="w-[300px] h-[300px] bg-[#F97316]/10 blur-[120px] -bottom-20 -right-20" />
              <p className="text-lg md:text-xl text-white/70 leading-relaxed relative z-10 mb-4">Eventibe is built around this belief — that event planning shouldn&apos;t feel like logistics.</p>
              <p className="text-2xl md:text-3xl font-black text-[#F97316] relative z-10">It should feel like storytelling.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ━━━ 15. EVENTIBE PROMISE ━━━ */}
      <section className="relative py-24 md:py-36 bg-[#F8FAFC]" id="eventibe-promise">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp><div className="text-center mb-16"><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-4">Chapter 14</p><h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1F3A] tracking-tight">The Eventibe <span className="text-[#F97316]">Promise</span></h2></div></FadeUp>
          <div className="parallax-stagger-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Every venue on our platform is real, verified, and ready", "Every photo is authentic — what you see is what you get", "Every search is designed to save you time and bring you closer to your ideal venue", "Every inquiry is handled with care and urgency", "Every feature we build is rooted in making your experience better", "Every interaction with Eventibe should feel seamless, trustworthy, and inspiring"].map((item, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-xl hover:border-[#F97316]/20 transition-all duration-500 h-full group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#FBBF24] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500"><Sparkles size={18} className="text-white" /></div>
                  <p className="text-[#334155] font-medium text-sm md:text-base leading-relaxed">{item}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 16. THREE PILLARS ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="three-pillars">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" alt="Energy" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[#0B1F3A]/90" />
        </div>
        <GradientOrb className="parallax-orb w-[600px] h-[600px] bg-[#1E3A8A]/15 blur-[180px] -top-32 -left-32" />
        <GradientOrb className="parallax-orb w-[500px] h-[500px] bg-[#F97316]/8 blur-[150px] -bottom-32 -right-32" />
        <div className="relative z-10 text-center px-6">
          <FadeUp><p className="text-[#F97316] text-xs font-bold uppercase tracking-[0.3em] mb-12">Our Three Pillars</p></FadeUp>
          <div className="space-y-4 md:space-y-6">
            {["Connection.", "Clarity.", "Celebration."].map((word, i) => (
              <FadeUp key={i} delay={0.15 + i * 0.15}>
                <p className="parallax-text text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight leading-none">{word}</p>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.7}>
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="parallax-drift w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F97316]/50" data-direction="left" />
              <div className="w-3 h-3 rounded-full bg-[#F97316]" />
              <div className="parallax-drift w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F97316]/50" data-direction="right" />
            </div>
          </FadeUp>
          <FadeUp delay={0.8}><p className="text-white/40 text-base md:text-lg mt-8 max-w-2xl mx-auto">These three pillars guide everything we build, every feature we design, and every partnership we form.</p></FadeUp>
        </div>
      </section>

      {/* ━━━ 17. FINAL CINEMATIC CLOSING ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="brand-closing">
        <div className="hero-zoom absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop" alt="Event energy" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030a14]/80 via-[#0B1F3A]/70 to-[#030a14]/90" />
        </div>
        <GradientOrb className="parallax-orb w-[800px] h-[800px] bg-[#F97316]/5 blur-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]" />
        <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <FadeUp><h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-10">Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] via-[#FBBF24] to-[#F97316]">Energy</span></h2></FadeUp>
          <FadeUp delay={0.2}>
            <div className="space-y-4 mb-12">
              <p className="text-lg md:text-xl text-white/60 leading-relaxed">The world doesn&apos;t remember events by their dates.<br />It remembers how they felt.</p>
              <p className="text-base md:text-lg text-white/50">Eventibe.com helps you find the right venue, the right team, and the right energy to create something unforgettable.</p>
              <p className="text-base md:text-lg text-white/50">Because when the right space meets the right vision —</p>
              <p className="text-2xl md:text-3xl font-black text-white mt-4">Magic happens.</p>
            </div>
          </FadeUp>
          <FadeUp delay={0.4}>
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
              <p className="text-white/40 text-base md:text-lg font-medium tracking-[0.3em] uppercase">Eventibe.com</p>
              <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </FadeUp>
          <FadeUp delay={0.5}><p className="text-white/30 text-sm mb-12 italic">Discover the Energy. Create the Experience. Celebrate the Moment.</p></FadeUp>
          <FadeUp delay={0.6}>
            <MagneticButton>
              <Link href="/corporate-venues" className="group/cta inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold text-lg rounded-2xl shadow-[0_8px_32px_-4px_rgba(249,115,22,0.4)] hover:shadow-[0_16px_48px_-4px_rgba(249,115,22,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-500 relative overflow-hidden">
                <span className="absolute inset-0 shimmer-line opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10">Explore Corporate Venues</span>
                <ArrowRight size={22} className="relative z-10 group-hover/cta:translate-x-1 group-hover/cta:animate-pulse transition-transform duration-300" />
              </Link>
            </MagneticButton>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
