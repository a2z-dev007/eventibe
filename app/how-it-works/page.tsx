"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  Briefcase,
  Landmark,
  Camera,
  Search,
  Image as ImageIcon,
  Send,
  CheckCircle,
  Filter,
  FileText,
  Handshake,
  PlusSquare,
  Zap,
  TrendingUp,
  Truck,
  Scissors,
  Star,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Rocket,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { TiltCard } from "@/components/micro-interactions";

// ── Persona Definitions ──────────────────────────────
const roles = [
  {
    id: "hosts",
    label: "Event Hosts",
    icon: <Users size={20} />,
    title:
      "How It Works for Event Hosts (Weddings, Social Events & Celebrations)",
    subtitle:
      "Planning a wedding, reception, engagement party, birthday, anniversary, or cultural celebration? Here’s how Eventibe helps you find the perfect space.",
    steps: [
      {
        icon: <Search size={32} />,
        title: "Step 1: Search",
        desc: "Search by City, Event Type or Venue Type. Browse categories like Wedding Venues, Banquet Halls, Farmhouses, Resorts, Lawns, and more. Filter by Capacity, Budget, and Amenities to find relevant venues.",
      },
      {
        icon: <ImageIcon size={32} />,
        title: "Step 2: Explore",
        desc: "View high-quality image galleries, capacity information, event suitability (Wedding/Corporate), amenities (AV, Parking), and starting prices. Compare venues confidently with structured information.",
      },
      {
        icon: <Send size={32} />,
        title: "Step 3: Inquire",
        desc: "Click 'Send Inquiry' and fill out a form with your date, guest count, and catering needs. Our team reviews and coordinates with the venue for faster, professional follow-up.",
      },
      {
        icon: <CheckCircle size={32} />,
        title: "Step 4: Finalize",
        desc: "Get connected with the venue, receive proposals, schedule site visits, and finalize directly. Eventibe acts as a structured bridge ensuring smooth coordination throughout.",
      },
    ],
  },
  {
    id: "corporate",
    label: "Corporate Planners",
    icon: <Briefcase size={20} />,
    title: "How It Works for Corporate Event Planners",
    subtitle:
      "Corporate events demand precision, professionalism, and operational clarity. We support conferences, offsites, exhibitions, and product launches.",
    steps: [
      {
        icon: <Filter size={32} />,
        title: "Step 1: Filter",
        desc: "Filter by Corporate Suitability: Seating layouts (Theatre, Boardroom, Classroom), AV availability, Parking, and Wi-Fi. Search under Corporate Event Venues for business-friendly facilities.",
      },
      {
        icon: <FileText size={32} />,
        title: "Step 2: RFP Inquiry",
        desc: "Submit a Structured RFP with company name, event format, seating layout, and GST requirements. This ensured venues receive clear, professional briefs for your business needs.",
      },
      {
        icon: <Handshake size={32} />,
        title: "Step 3: Proposal",
        desc: "Receive quotations and negotiate directly. Inquiry is tagged as Corporate, and a sales executive may assist if required to ensure smooth coordination and documentation.",
      },
    ],
  },
  {
    id: "owners",
    label: "Venue Owners",
    icon: <Landmark size={20} />,
    title: "How It Works for Venue Owners",
    subtitle:
      "If you own or manage banquet halls, resorts, hotels, farmhouses or lawns, Eventibe helps you reach high-intent event planners.",
    steps: [
      {
        icon: <PlusSquare size={32} />,
        title: "Step 1: List",
        desc: "Click “List Your Venue” and submit your venue name, location, capacity, and photos. Our onboarding team reviews your submission for suitability and quality.",
      },
      {
        icon: <Zap size={32} />,
        title: "Step 2: Optimize",
        desc: "We assist with profile optimization: improving descriptions, SEO content, and structuring amenities clearly. Unlike generic portals, we focus on presentation quality.",
      },
      {
        icon: <TrendingUp size={32} />,
        title: "Step 3: Leads",
        desc: "Receive qualified, structured leads with clear event details. Save time, avoid incomplete requests, and respond directly with availability and pricing.",
      },
      {
        icon: <Star size={32} />,
        title: "Step 4: Grow",
        desc: "Grow visibility with featured placements, category highlighting, and premium positioning as the platform scales to reach more high-intent planners.",
      },
    ],
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: <Camera size={20} />,
    title: "How It Works for Vendors & Service Providers",
    subtitle:
      "Event planning goes beyond venues. Eventibe supports caterers, photographers, decorators, DJs, Mehndi artists, and event planners.",
    steps: [
      {
        icon: <Star size={32} />,
        title: "Step 1: List",
        desc: "Click “List Your Service” and submit your category, city, portfolio, and starting price. Showcase your work and service coverage to potential clients professionally.",
      },
      {
        icon: <ShieldCheck size={32} />,
        title: "Step 2: Approval",
        desc: "Our team reviews your profile for content quality, authenticity, and service clarity to ensure you match the right category and quality standards.",
      },
      {
        icon: <Users size={32} />,
        title: "Step 3: Inquiries",
        desc: "Users search by category + city and view your portfolio. They send structured inquiries directly to you, so you can respond and finalize details directly.",
      },
    ],
  },
];

// ── FAQ Items ─────────────────────────────────────────
const faqs = [
  {
    question: "Is Eventibe free to use?",
    answer: "Yes. Searching and sending inquiries is completely free.",
  },
  {
    question: "Does Eventibe charge commission from customers?",
    answer: "No. Customers do not pay to send inquiries.",
  },
  {
    question: "Can I contact multiple venues?",
    answer: "Yes. You can send inquiries to multiple venues.",
  },
  {
    question: "Is booking done through Eventibe?",
    answer: "Final agreement is directly between you and the venue.",
  },
  {
    question: "Are vendors verified?",
    answer:
      "We review listings, but we recommend conducting your own due diligence as well.",
  },
];

// ── Role Specific Steps Component (Static & Clean) ────────────────────
function RoleSteps({ role }: { role: (typeof roles)[0] }) {
  return (
    <div className="mb-20">
      <div className="text-center mb-16">
        <h3 className="text-2xl md:text-4xl font-bold text-primary-navy mb-4">
          {role.title}
        </h3>
        <p className="text-lg text-soft-slate max-w-2xl mx-auto leading-relaxed">
          {role.subtitle}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {role.steps.map((step, idx) => (
          <TiltCard key={idx} className="rounded-[32px] h-full">
            <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col group relative overflow-hidden">
              {/* Step Number Badge */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-8xl font-black text-primary-navy line-height-none leading-none">
                  {idx + 1}
                </span>
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white transition-all duration-500 ring-4 ring-gray-50 group-hover:ring-corporate-blue/10">
                {step.icon}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-primary-navy mb-4 group-hover:text-corporate-blue transition-colors">
                  {step.title}
                </h4>
                <p className="text-soft-slate leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom Accent */}
              <div className="mt-8 h-1 w-0 group-hover:w-12 bg-accent-orange rounded-full transition-all duration-500" />
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}

// ── Main Page Component ──────────────────────────────
export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState("hosts");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const selectedRole = roles.find((r) => r.id === activeTab) || roles[0];

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO SECTION ────────────────────────────── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Dark navy base */}
        <div className="absolute inset-0 bg-primary-navy z-0" />
        {/* Overlays */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-orange/10 blur-[160px] rounded-full -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-corporate-blue/20 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10 px-6 text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-6 uppercase tracking-widest backdrop-blur-sm shadow-xl">
            <Zap size={14} className="text-accent-orange" />
            <span>Simplify Your Planning</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight leading-[1.05]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-300">
              How Eventibe
            </span>{" "}
            Works
          </h1>
          <p className="text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-4 text-gray-200 leading-relaxed">
            Planning an event — whether it’s a grand wedding celebration or a
            corporate conference — involves countless decisions. The most
            important one? Choosing the right venue. Eventibe simplifies that
            process.
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are a curated event venue marketplace connecting hosts, venue
            owners, and service providers through a structured inquiry-driven
            system.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE ROLES & STEPS SECTION ────────────────────────────── */}
      <div className="relative">
        {/* ── TABS NAVIGATION (Segmented Control UI) ────────────────────────────── */}
        <section className="container mx-auto px-4 md:px-6 sticky top-24 z-40 mb-20 pointer-events-none">
          <div className="flex justify-center pointer-events-auto">
            <div className="bg-white/80 backdrop-blur-xl p-2 rounded-[32px] shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center justify-center gap-1">
              {roles.map((role) => {
                const isActive = activeTab === role.id;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActiveTab(role.id)}
                    className={`relative flex items-center justify-center gap-3 px-6 py-3.5 rounded-[22px] font-bold transition-all duration-500 w-full md:w-auto min-w-[220px] md:min-w-[180px] overflow-hidden group ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 hover:text-primary-navy hover:bg-gray-50/50"
                    }`}
                  >
                    {/* Active Background Slide */}
                    {isActive && (
                      <div className="absolute inset-0 bg-primary-navy shadow-[0_8px_20px_rgba(30,58,138,0.25)] rounded-[18px]" />
                    )}

                    <span
                      className={`relative z-10 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                    >
                      {role.icon}
                    </span>
                    <span className="relative z-10">{role.label}</span>

                    {/* Mobile active indicator (bottom dot) */}
                    {isActive && (
                      <div className="absolute bottom-1 w-1 h-1 bg-accent-orange rounded-full md:hidden" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── STEPS SECTION ────────────────────────────── */}
        <section className="container mx-auto px-4 md:px-6 mb-32 relative z-10">
          <RoleSteps role={selectedRole} />
        </section>
      </div>

      {/* ── INQUIRY MODEL SECTION ────────────────────────────── */}
      <section className="py-24 bg-gray-50 rounded-[60px] md:rounded-[100px] mx-4 md:mx-10 mb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-primary-navy mb-12 text-center tracking-tight">
              Our Inquiry-Based Model <br />
              <span className="text-corporate-blue">— Why It’s Different</span>
            </h2>
            <p className="text-lg text-soft-slate text-center mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Eventibe is not a direct booking OTA. We follow an inquiry-first
              model because event planning requires flexibility and custom
              proposals that standard booking systems can't provide.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-corporate-blue">
                    <HelpCircle size={22} />
                  </div>
                  Why Inquiry-First?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Event pricing varies by date and customization",
                    "Weddings require flexible arrangements",
                    "Corporate events require RFP structure",
                    "Vendor services vary per requirement",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 items-start text-soft-slate"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle
                          size={12}
                          className="text-corporate-blue"
                        />
                      </div>
                      <span className="font-medium text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-xl transition-all duration-500">
                <h3 className="text-2xl font-bold text-primary-navy mb-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-accent-orange">
                    <Zap size={22} />
                  </div>
                  What This Ensures
                </h3>
                <ul className="space-y-4">
                  {[
                    "Better negotiation & customized proposals",
                    "Reduced misunderstandings",
                    "Transparent communication",
                    "Professional follow-up with the venue",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-4 items-start text-soft-slate"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                        <CheckCircle size={12} className="text-accent-orange" />
                      </div>
                      <span className="font-medium text-sm leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ────────────────────────────── */}
      <section className="py-24 bg-primary-navy text-white rounded-[60px] md:rounded-[100px] mx-4 md:mx-10 my-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
                What Makes Eventibe Different?
              </h2>
              <p className="text-white/80 mb-8 leading-relaxed">
                We combine the inspiration-focused approach of platforms like
                WeddingWire and WedMeGood with the structured corporate
                methodology of Cvent. But we adapt it to regional markets and
                practical needs.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Clean Structure",
                    desc: "Organized and transparent layout to reduce noise and show only relevant venues.",
                  },
                  {
                    title: "Verified Listings",
                    desc: "Authentic profiles with quality information over clutter, ensuring confidence in comparison.",
                  },
                  {
                    title: "Quality over Clutter",
                    desc: "We focus on presentation quality rather than just listing quantity.",
                  },
                  {
                    title: "City-Level SEO",
                    desc: "Targeted regional optimization that connects you with local event opportunities.",
                  },
                  {
                    title: "Dual Support",
                    desc: "Built to support the unique requirements of both Social and Corporate event planners.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 bg-white/10 rounded-lg flex items-center justify-center text-accent-orange">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-accent-orange">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-slate-300 mb-8">
                To simplify venue discovery and event planning through
                structured listings, transparent communication, and scalable
                marketplace technology.
              </p>
              <p className="text-lg leading-relaxed text-slate-300">
                We aim to become the most reliable event venue and vendor
                discovery platform across emerging Indian markets and beyond.
              </p>
              <div className="mt-10 pt-10 border-t border-white/10 flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-primary-navy bg-slate-400"
                    />
                  ))}
                </div>
                <p className="text-white/60 font-medium">
                  Join 500+ venues already listed
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── END-TO-END JOURNEY (Connected Path) ────────────────────────────── */}
      <section className="py-32 bg-[#F8F9FF] relative overflow-hidden">
        {/* Subtle background text */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.03]">
          <span className="text-[20vw] font-black text-primary-navy whitespace-nowrap">
            TIMELINE
          </span>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy mb-6 tracking-tight">
              End-to-End Event Journey
            </h2>
            <p className="text-lg text-soft-slate max-w-xl mx-auto">
              From the first search to the final applause, we&apos;re with you
              every step of the way.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Desktop Horizontal Connecting Line (Centered through Icons) */}
            <div className="hidden lg:block absolute top-[6rem] left-[5%] right-[5%] h-[3px] bg-corporate-blue/20 z-0">
              <div className="h-full bg-corporate-blue/40 w-full rounded-full" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-y-16 lg:gap-4 lg:items-start">
              {[
                {
                  label: "Discover venue",
                  icon: <Search size={22} />,
                  desc: "Find your ideal space",
                },
                {
                  label: "Compare options",
                  icon: <Filter size={22} />,
                  desc: "Evaluate your choices",
                },
                {
                  label: "Send inquiry",
                  icon: <Send size={22} />,
                  desc: "Submit event details",
                },
                {
                  label: "Receive proposal",
                  icon: <FileText size={22} />,
                  desc: "Get custom quotes",
                },
                {
                  label: "Site Visit",
                  icon: <Landmark size={22} />,
                  desc: "Experience the venue",
                },
                {
                  label: "Finalize agreement",
                  icon: <Handshake size={22} />,
                  desc: "Confirm your booking",
                },
                {
                  label: "Success",
                  icon: <Star size={22} />,
                  desc: "Conduct event successfully",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center group relative px-2"
                >
                  {/* Step Badge (Top Centered) */}
                  <div className="mb-4 h-8 flex items-center">
                    <span className="text-[10px] font-black text-corporate-blue uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 shadow-sm transition-all duration-300 group-hover:bg-corporate-blue group-hover:text-white">
                      Step {idx + 1}
                    </span>
                  </div>

                  {/* Step Bubble */}
                  <div className="relative z-10 mb-8 w-20 md:w-24 h-20 md:h-24">
                    {/* Ring backdrop */}
                    <div className="absolute inset-0 rounded-full bg-white shadow-xl scale-125 -z-10 border border-gray-50" />

                    {/* Icon container */}
                    <div className="w-full h-full rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-primary-navy group-hover:text-corporate-blue group-hover:border-corporate-blue group-hover:scale-110 transition-all duration-500 shadow-sm relative">
                      {item.icon}
                    </div>

                    {/* Leading arrow (Desktop only, except last) */}
                    {idx < 6 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-0">
                        <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-corporate-blue transition-colors" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Label & Desc */}
                  <div className="text-center max-w-[140px] relative z-20">
                    <span className="font-extrabold text-primary-navy block text-sm md:text-base mb-2 group-hover:text-corporate-blue transition-colors">
                      {item.label}
                    </span>
                    <p className="text-[10px] md:text-xs font-semibold text-soft-slate opacity-60 group-hover:opacity-100 transition-opacity leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-gray-100 shadow-sm">
              <span className="flex h-3 w-3 rounded-full bg-accent-orange animate-ping" />
              <span className="text-primary-navy font-bold text-sm tracking-wide uppercase">
                Simple . Transparent . Structured
              </span>
            </div>
          </div>
        </div>

        {/* Floating background decorative shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl -translate-x-1/2 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl translate-x-1/2 -z-10" />
      </section>

      {/* ── FAQ SECTION ────────────────────────────── */}
      <section className="py-20 md:py-28 bg-gray-50/60 relative overflow-hidden">
        {/* Background decorative */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-corporate-blue/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
            {/* Left: Header Panel */}
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-orange/10 border border-accent-orange/20 text-accent-orange text-[10px] font-black uppercase tracking-widest mb-6">
                <HelpCircle size={12} />
                <span>Got Questions?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy tracking-tight leading-tight mb-6">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-accent-orange">
                  Questions
                </span>
              </h2>
              <p className="text-soft-slate leading-relaxed mb-10 text-base md:text-lg">
                Everything you need to know about how Eventibe works — for
                hosts, venue owners, and vendors alike.
              </p>

              {/* Trust Stats */}
              <div className="space-y-4">
                {[
                  { value: "500+", label: "Venues Listed" },
                  { value: "Free", label: "To Search & Inquire" },
                  { value: "0%", label: "Commission from Customers" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-navy/5 flex items-center justify-center shrink-0">
                      <span className="text-lg font-black text-primary-navy">
                        {stat.value}
                      </span>
                    </div>
                    <span className="text-soft-slate font-medium text-sm">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "border-accent-orange/30 bg-white shadow-[0_8px_30px_-8px_rgba(249,115,22,0.15)]"
                        : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() =>
                        setActiveFaq(activeFaq === idx ? null : idx)
                      }
                      className="w-full flex items-center gap-4 p-6 text-left group"
                    >
                      {/* Number Badge */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-accent-orange text-white shadow-md shadow-orange-200"
                            : "bg-gray-100 text-gray-400 group-hover:bg-primary-navy/5 group-hover:text-primary-navy"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      <span
                        className={`flex-1 text-base md:text-lg font-bold transition-colors ${
                          isOpen ? "text-primary-navy" : "text-primary-navy/80"
                        }`}
                      >
                        {faq.question}
                      </span>

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? "bg-accent-orange/10 text-accent-orange rotate-180"
                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                        }`}
                      >
                        <ChevronDown size={16} />
                      </div>
                    </button>

                    <div
                      className={`transition-all duration-500 overflow-hidden ${
                        isOpen ? "max-h-64" : "max-h-0"
                      }`}
                    >
                      <div className="px-6 pb-6 pl-[4.25rem]">
                        <div className="h-px w-full bg-gray-100 mb-4" />
                        <p className="text-soft-slate leading-relaxed text-sm md:text-base">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bottom note */}
              <div className="flex items-center gap-3 p-4 bg-primary-navy/3 rounded-2xl border border-primary-navy/8 mt-2">
                <div className="w-2 h-2 rounded-full bg-accent-orange animate-pulse shrink-0" />
                <p className="text-soft-slate text-sm font-medium">
                  Still have questions?{" "}
                  <a
                    href="/contact-us"
                    className="text-corporate-blue font-bold hover:text-accent-orange transition-colors"
                  >
                    Contact our team →
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────── */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-6 mb-20">
        <div className="bg-primary-navy rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
          {/* Orange glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-orange/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-corporate-blue/20 rounded-full blur-[80px]" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] rounded-[40px] overflow-hidden"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5">
            <Globe size={160} />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-6 uppercase tracking-widest">
              <Rocket size={14} />
              <span>Get Started Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto">
              Whether you are planning a wedding celebration 💍, a corporate
              conference 🏢, a private party 🎉, or a business seminar 📊,
              Eventibe is built to guide you from search to success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cta-gradient hover:opacity-90 text-white px-10 py-4 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-95">
                Explore Venues
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-xl font-bold transition-all backdrop-blur-sm active:scale-95">
                Send Inquiry
              </button>
            </div>
            <p className="mt-12 text-white/50 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
              Explore Venues • Send Inquiries • Plan Confidently
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
