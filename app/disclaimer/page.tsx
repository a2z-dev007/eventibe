"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ShieldAlert,
  Info,
  AlertTriangle,
  CheckCircle2,
  Settings,
  CreditCard,
  AlertCircle,
  FileText,
  MessageSquare,
  HelpCircle,
  MapPin,
  Edit3,
  Mail,
  ListX,
  RefreshCcw,
  Scale,
  CheckSquare,
  Search,
  Zap,
  FileSignature,
  BookOpen,
  ThumbsUp,
  Phone,
  Clock,
  MessageCircle,
  Sparkles,
  Send,
  ChevronRight,
  Files,
} from "lucide-react";

const contactData = {
  phone: "+91-8800842084",
  alternatePhone: "+91-7399-666688",
  email: "support@eventibe.com",
  whatsapp: "+91-8800842084",
  address:
    "Plot No-18, D Block, Qutub Vihar Phase-1, Sector 19, South West Delhi, New Delhi – 110071, India",
};

const sections = [
  { id: "role", title: "Role of the Platform", icon: <Settings size={24} /> },
  {
    id: "booking",
    title: "No Booking Guarantee",
    icon: <AlertCircle size={24} />,
  },
  { id: "accuracy", title: "Information Accuracy", icon: <Search size={24} /> },
  { id: "performance", title: "Vendor Performance", icon: <Zap size={24} /> },
  { id: "third-party", title: "Third-Party Links", icon: <Scale size={24} /> },
  {
    id: "payment",
    title: "Payment Disclaimer",
    icon: <CreditCard size={24} />,
  },
  { id: "risks", title: "Event Risks", icon: <AlertTriangle size={24} /> },
  { id: "advice", title: "Professional Advice", icon: <BookOpen size={24} /> },
  { id: "reviews", title: "Reviews Disclaimer", icon: <ThumbsUp size={24} /> },
  { id: "warranties", title: "No Warranties", icon: <ListX size={24} /> },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: <ShieldAlert size={24} />,
  },
  {
    id: "responsibility",
    title: "User Responsibility",
    icon: <CheckSquare size={24} />,
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    icon: <AlertTriangle size={24} />,
  },
  { id: "jurisdiction", title: "Jurisdiction", icon: <MapPin size={24} /> },
  { id: "changes", title: "Changes", icon: <RefreshCcw size={24} /> },
  { id: "contact-us", title: "Contact Us", icon: <Mail size={24} /> },
];

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export default function DisclaimerPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -45% 0px",
      threshold: [0, 0.1, 0.5, 1.0],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      activeSection &&
      navItemsRef.current[activeSection] &&
      scrollContainerRef.current
    ) {
      const scrollContainer = scrollContainerRef.current;
      const navItem = navItemsRef.current[activeSection];

      const containerTop = scrollContainer.getBoundingClientRect().top;
      const navItemTop = navItem!.getBoundingClientRect().top;
      const relativeTop = navItemTop - containerTop;

      scrollContainer.scrollTo({
        top:
          scrollContainer.scrollTop +
          relativeTop -
          scrollContainer.clientHeight / 2 +
          navItem!.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 scroll-smooth">
      {/* ── HERO SECTION ── */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-56 bg-primary-navy overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Legal Disclaimer"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/50 via-transparent to-primary-navy" />
          <div className="absolute inset-0 bg-primary-navy/40" />
          {/* Subtle Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-4 md:mb-6 animate-fade-in shadow-xl backdrop-blur-sm uppercase tracking-widest">
              <Sparkles size={14} className="text-accent-orange" />
              <span>Platform Governance</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] animate-fade-in tracking-tight drop-shadow-md break-words">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-300">
                Legal
              </span>{" "}
              Disclaimer
            </h1>
            <div className="space-y-3 md:space-y-4 mb-8">
              <p className="text-xl md:text-4xl text-white font-bold tracking-tight break-words">
                Eventibe.com & VenueForEvent.com
              </p>
              <p className="text-base md:text-xl text-orange-200/90 font-bold border-x-4 border-orange-500 px-4 md:px-8 py-2 bg-orange-500/5 backdrop-blur-sm rounded-xl max-w-2xl mx-auto">
                Official Marketplace Terms & Information Accuracy Disclaimer
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-accent-orange" />
                <span>Effective: March 08, 2026</span>
              </div>
              <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <RefreshCcw size={14} className="text-accent-orange" />
                <span>Last Updated: March 08, 2026</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Navigation Side */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
      {/* ── CONTENT SECTION ── */}
      <section className="py-16 md:py-24 bg-slate-50 relative z-20 -mt-12 md:-mt-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation - Sticky */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="p-8 pb-6 border-b border-slate-50 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                      <Files size={14} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      DOCUMENT INDEX
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-primary-navy tracking-tight">
                    Quick Navigation
                  </h3>
                </div>

                <nav
                  ref={scrollContainerRef}
                  className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar scroll-smooth"
                >
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        ref={(el) => {
                          navItemsRef.current[section.id] = el;
                        }}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                          isActive
                            ? "bg-primary-navy/5 text-primary-navy shadow-[inset_0_0_0_1px_rgba(11,31,58,0.05)]"
                            : "text-slate-500 hover:text-primary-navy hover:bg-slate-50"
                        }`}
                      >
                        {/* Status Indicator */}
                        <div
                          className={`absolute left-0 w-1.5 bg-accent-orange rounded-r-full transition-all duration-300 ${
                            isActive
                              ? "h-6 opacity-100"
                              : "h-0 opacity-0 group-hover:h-2"
                          }`}
                        ></div>

                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-primary-navy text-white shadow-lg shadow-blue-900/20"
                              : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary-navy group-hover:shadow-sm"
                          }`}
                        >
                          <div className="scale-75 origin-center">
                            {section.icon}
                          </div>
                        </div>

                        <span
                          className={`text-[13px] font-bold truncate transition-all leading-snug flex-1 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                        >
                          {section.title}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -right-1 w-1 h-1 rounded-full bg-accent-orange"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-6 bg-slate-50/80 mt-auto border-t border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    LEGAL COMPLIANCE
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                </div>
              </div>
            </aside>

            {/* Content Cards */}
            <div className="lg:w-3/4 space-y-8 md:space-y-20">
              {/* Sections Container */}
              <div className="space-y-16 md:space-y-20">
                {/* SECTION 1 */}
                <motion.div
                  {...fadeInUp}
                  id="role"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "role")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <Settings size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      ROLE OF THE PLATFORM
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-6 font-medium text-primary-navy">
                      Eventibe.com and VenueForEvent.com operate as online event
                      discovery and marketplace platforms.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="font-black text-primary-navy mb-4 flex items-center gap-2">
                          <CheckCircle2
                            className="text-emerald-500"
                            size={20}
                          />{" "}
                          We:
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Provide venue listings.",
                            "Display event-related services.",
                            "Facilitate inquiry submissions.",
                            "Connect users with venue owners and vendors.",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                        <h3 className="font-black text-primary-navy mb-4 flex items-center gap-2">
                          <ListX className="text-red-500" size={20} /> We do
                          not:
                        </h3>
                        <ul className="space-y-3">
                          {[
                            "Own most listed venues.",
                            "Operate listed venues.",
                            "Control vendor execution.",
                            "Guarantee service delivery.",
                            "Act as event planners unless explicitly mentioned.",
                          ].map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm"
                            >
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-orange-50/50 rounded-xl border-l-4 border-accent-orange text-primary-navy font-bold">
                      The Platform serves as an intermediary only.
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 2 */}
                <motion.div
                  {...fadeInUp}
                  id="booking"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "booking")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <AlertCircle size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      NO BOOKING GUARANTEE
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-4">Submission of an inquiry does not:</p>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        "Confirm availability.",
                        "Confirm pricing.",
                        "Guarantee booking.",
                        "Create a contractual obligation.",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-gray-50 py-2 px-4 rounded-lg border border-gray-100 text-sm md:text-base"
                        >
                          <span className="w-2 h-2 rounded-full bg-accent-orange" />
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="mb-3 font-medium text-primary-navy">
                      All final agreements are strictly between:
                    </p>
                    <ul className="list-none space-y-2">
                      <li className="flex items-center gap-3 font-bold text-primary-navy bg-white border border-gray-200 shadow-sm p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-corporate-blue/10 flex items-center justify-center">
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue"
                          />
                        </div>{" "}
                        The user (event host/organizer)
                      </li>
                      <li className="flex items-center gap-3 font-bold text-primary-navy bg-white border border-gray-200 shadow-sm p-3 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-corporate-blue/10 flex items-center justify-center">
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue"
                          />
                        </div>{" "}
                        The venue owner or vendor.
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* SECTION 3 */}
                <motion.div
                  {...fadeInUp}
                  id="accuracy"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "accuracy")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <Search size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      INFORMATION ACCURACY DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-4 font-medium text-primary-navy">
                      While we strive to ensure accuracy:
                    </p>
                    <ul className="space-y-2 mb-6 ml-2">
                      {[
                        "Pricing may change without notice.",
                        "Availability may change.",
                        "Venue policies may be updated by owners.",
                        "Images may be representative.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="mb-4 font-medium text-primary-navy">
                      We do not guarantee that:
                    </p>
                    <ul className="space-y-2 mb-6 ml-2">
                      {[
                        "All listings are error-free.",
                        "All descriptions are complete.",
                        "All venue data is up to date at all times.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-corporate-blue/5 p-4 md:p-5 rounded-2xl border border-corporate-blue/10 text-primary-navy">
                      <div className="flex items-start gap-3">
                        <AlertTriangle
                          size={20}
                          className="text-corporate-blue shrink-0 mt-0.5"
                        />
                        <p className="font-bold text-sm md:text-base">
                          Users are advised to verify all details directly with
                          the venue or vendor before making decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 4 */}
                <motion.div
                  {...fadeInUp}
                  id="performance"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "performance")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <Zap size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      VENDOR PERFORMANCE DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-5 font-medium text-primary-navy">
                      The Platform is not responsible for:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                      {[
                        "Quality of catering.",
                        "Decoration execution.",
                        "Photography results.",
                        "Service delays.",
                        "Staff behavior.",
                        "Event mismanagement.",
                        "Venue maintenance issues.",
                        "Technical failures at venues.",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm"
                        >
                          <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="font-bold text-primary-navy bg-orange-50 p-4 rounded-xl border border-accent-orange/20">
                      Any dispute regarding performance must be resolved
                      directly between the parties involved.
                    </p>
                  </div>
                </motion.div>

                {/* SECTION 5 */}
                <motion.div
                  {...fadeInUp}
                  id="third-party"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "third-party")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <Scale size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      THIRD-PARTY CONTENT & LINKS
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-6 font-medium text-primary-navy">
                      The Platform may contain:
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Links to third-party websites.",
                        "Social media links.",
                        "External vendor pages.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-corporate-blue shrink-0 mt-0.5">
                            <CheckCircle2 size={14} />
                          </div>
                          <span className="font-bold text-primary-navy/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mb-6 font-medium text-primary-navy">
                      We are not responsible for:
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Third-party policies.",
                        "Third-party content.",
                        "Third-party privacy practices.",
                        "External website accuracy.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                            <ListX size={14} />
                          </div>
                          <span className="font-bold text-primary-navy/80">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-5 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                      <Info className="text-accent-orange shrink-0" size={24} />
                      <p className="font-bold text-primary-navy text-sm md:text-lg">
                        Visiting external links is at your own discretion.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 6 */}
                <motion.div
                  {...fadeInUp}
                  id="payment"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "payment")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <CreditCard size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      PAYMENT DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                      <p className="mb-4 font-black text-primary-navy">
                        If payments are processed outside the Platform:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "We are not responsible for transaction security.",
                          "We are not responsible for refund disputes.",
                          "We do not guarantee payment recovery.",
                        ].map((item, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-3 text-sm font-medium"
                          >
                            <span className="w-2 h-2 bg-accent-orange rounded-full" />{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 rounded-2xl bg-white border border-gray-200">
                      <p className="mb-3 font-black text-primary-navy">
                        If payment systems are integrated in the future:
                      </p>
                      <p className="text-sm font-medium flex items-center gap-2">
                        <FileSignature
                          size={18}
                          className="text-corporate-blue"
                        />
                        Terms will be governed by separate policies.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 7 */}
                <motion.div
                  {...fadeInUp}
                  id="risks"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "risks")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <AlertTriangle size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      EVENT RISKS DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-5 font-bold text-primary-navy">
                      Event planning involves inherent risks, including:
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {[
                        "Weather conditions.",
                        "Vendor cancellations.",
                        "Government restrictions.",
                        "Permit issues.",
                        "Technical failures.",
                        "Public safety risks.",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mb-5 font-bold text-primary-navy">
                      The Platform is not liable for:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {[
                        "Event cancellation.",
                        "Financial losses.",
                        "Emotional distress.",
                        "Business interruption.",
                        "Reputation damage.",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm"
                        >
                          <span className="text-red-500 font-bold">×</span>{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="font-black text-primary-navy text-xl border-l-4 border-corporate-blue pl-4 py-1">
                      Users assume full responsibility for due diligence.
                    </p>
                  </div>
                </motion.div>

                {/* SECTION 8 */}
                <motion.div
                  {...fadeInUp}
                  id="advice"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "advice")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <BookOpen size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      PROFESSIONAL ADVICE DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-4">
                      Information on the Platform, including blog articles,
                      guides, or recommendations:
                    </p>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                      <ul className="space-y-3 font-medium text-sm">
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" />{" "}
                          Is for informational purposes only.
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" />{" "}
                          Does not constitute legal advice.
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" />{" "}
                          Does not constitute financial advice.
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" />{" "}
                          Does not constitute event planning guarantees.
                        </li>
                      </ul>
                    </div>
                    <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                      <Info
                        size={24}
                        className="text-corporate-blue shrink-0"
                      />
                      <p className="font-bold text-primary-navy text-sm md:text-base">
                        Users should consult professionals for legal, financial,
                        and contractual matters.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 9 */}
                <motion.div
                  {...fadeInUp}
                  id="reviews"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "reviews")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <ThumbsUp size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      TESTIMONIALS & REVIEWS DISCLAIMER
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-4">
                      Reviews and testimonials displayed on the Platform:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Reflect personal experiences.",
                        "May not represent typical outcomes.",
                        "Are submitted by users or vendors.",
                        "We do not independently verify all reviews.",
                      ].map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium"
                        >
                          <span className="w-2 h-2 bg-gray-300 rounded-full" />{" "}
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* SECTION 10 */}
                <motion.div
                  {...fadeInUp}
                  id="warranties"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "warranties")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <ListX size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      NO WARRANTIES
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-4">The Platform is provided on an:</p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-10">
                      <div className="bg-gray-100 px-8 py-4 rounded-2xl font-black text-primary-navy text-xl text-center border border-gray-200">
                        “AS IS”
                      </div>
                      <div className="bg-gray-100 px-8 py-4 rounded-2xl font-black text-primary-navy text-xl text-center border border-gray-200">
                        “AS AVAILABLE”
                      </div>
                    </div>
                    <p className="mb-4 text-xl">basis.</p>
                    <div className="p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="mb-5 font-bold text-primary-navy">
                        We make no warranties, express or implied, regarding:
                      </p>
                      <ul className="space-y-3 text-sm md:text-base">
                        {[
                          "Continuous availability.",
                          "Uninterrupted service.",
                          "Error-free performance.",
                          "Data security guarantees.",
                        ].map((item, i) => (
                          <li key={i} className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />{" "}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 11 */}
                <motion.div
                  {...fadeInUp}
                  id="liability"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "liability")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <AlertCircle size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      LIMITATION OF LIABILITY
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-5 font-medium">
                      To the maximum extent permitted by law, Eventibe.com and
                      VenueForEvent.com shall not be liable for:
                    </p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {[
                        "Direct damages.",
                        "Indirect damages.",
                        "Incidental damages.",
                        "Consequential damages.",
                        "Loss of revenue.",
                        "Loss of event opportunity.",
                        "Loss of goodwill.",
                      ].map((item, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="font-black text-white bg-primary-navy p-4 rounded-xl text-center shadow-lg uppercase tracking-wider text-sm mt-8">
                      Your use of the Platform is at your sole risk.
                    </p>
                  </div>
                </motion.div>

                {/* SECTION 12 */}
                <motion.div
                  {...fadeInUp}
                  id="responsibility"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "responsibility")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <CheckSquare size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      USER RESPONSIBILITY
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-5 font-bold text-primary-navy">
                      Users are responsible for:
                    </p>
                    <ul className="space-y-3 mb-8">
                      {[
                        "Verifying venue licenses.",
                        "Checking safety compliance.",
                        "Reviewing vendor contracts.",
                        "Understanding cancellation policies.",
                        "Negotiating terms independently.",
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-md bg-corporate-blue/10 flex items-center justify-center text-corporate-blue font-bold text-xs shrink-0 mt-0.5">
                            {i + 1}
                          </span>{" "}
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-3">
                      <Info className="text-accent-orange shrink-0" size={20} />
                      <p className="font-bold text-primary-navy text-sm md:text-base">
                        The Platform does not replace independent verification.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 13 */}
                <motion.div
                  {...fadeInUp}
                  id="force-majeure"
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">
                      {sections.find((s) => s.id === "force-majeure")?.icon}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      <AlertTriangle size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words">
                      FORCE MAJEURE
                    </h2>
                  </div>
                  <div className="text-soft-slate text-base md:text-lg leading-relaxed">
                    <p className="mb-5 font-medium">
                      We are not responsible for delays or failures due to:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Natural disasters.",
                        "Pandemic restrictions.",
                        "Government orders.",
                        "Internet outages.",
                        "Cyberattacks.",
                        "Civil unrest.",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 border border-gray-100 p-3 rounded-lg flex items-center gap-2 text-sm justify-center text-center font-medium"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 14: JURISDICTION */}
                <motion.div
                  {...fadeInUp}
                  id="jurisdiction"
                  className="scroll-mt-28 group"
                >
                  <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                      <MapPin size={28} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                      JURISDICTION
                    </h2>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-6 p-10 bg-white rounded-[3rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm text-center md:text-left">
                    <div className="w-20 h-20 md:w-auto md:h-auto flex items-center justify-center rounded-3xl bg-slate-50 md:bg-transparent shadow-sm md:shadow-none border md:border-none border-gray-50">
                      <MapPin
                        size={48}
                        className="text-corporate-blue opacity-60 md:opacity-20 shrink-0"
                      />
                    </div>
                    <div className="space-y-3 md:space-y-2">
                      <p className="text-sm md:text-base text-soft-slate font-bold md:font-medium leading-relaxed">
                        This Disclaimer and your use of the Platform shall be
                        governed by the laws of India. Any disputes arising from
                        these terms shall be subject to the exclusive
                        jurisdiction of the courts located in{" "}
                        <span className="text-primary-navy font-black text-lg">
                          New Delhi, India
                        </span>
                        .
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-widest text-corporate-blue">
                        Judicial Center: India
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* SECTION 15: CHANGES & COMPLIANCE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div
                    {...fadeInUp}
                    id="changes"
                    className="p-10 md:p-8 bg-white rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group items-center md:items-start text-center md:text-left scroll-mt-28"
                  >
                    <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-corporate-blue mb-6 border border-gray-100 group-hover:bg-accent-orange group-hover:text-white transition-all">
                      <RefreshCcw size={28} className="md:w-6 md:h-6" />
                    </div>
                    <h2 className="text-lg md:text-lg font-black text-primary-navy mb-4 uppercase">
                      CHANGES TO THIS DISCLAIMER
                    </h2>
                    <div className="space-y-3">
                      <p className="text-base md:text-sm text-soft-slate font-bold md:font-medium leading-relaxed flex-grow">
                        We may update this Disclaimer at any time. Continued use
                        of the Platform signifies acceptance of updated terms.
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-corporate-blue opacity-70">
                        Revised: March 08, 2026
                      </p>
                    </div>
                  </motion.div>

                  <div className="p-10 md:p-8 bg-primary-navy text-white rounded-[3rem] md:rounded-[2.5rem] shadow-xl flex flex-col group items-center md:items-start text-center md:text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full -mt-12 -mr-12"></div>
                    <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 border border-white/10 group-hover:bg-white group-hover:text-primary-navy transition-all">
                      <ShieldAlert size={28} className="md:w-6 md:h-6" />
                    </div>
                    <h2 className="text-lg md:text-lg font-black mb-4 uppercase">
                      LEGAL COMPLIANCE
                    </h2>
                    <p className="text-base md:text-sm text-gray-300 font-bold md:font-medium leading-relaxed mb-6">
                      This document is designed to comply with Indian IT Laws
                      and Digital Marketplace Regulations.
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-green-400">
                        Active Policy
                      </span>
                    </div>
                  </div>
                </div>

                {/* SECTION 16: CONTACT US */}
                <motion.div
                  {...fadeInUp}
                  id="contact-us"
                  className="relative scroll-mt-28"
                >
                  <div className="bg-white border border-slate-100 rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all overflow-hidden group relative">
                    <div className="absolute -right-8 -top-8 text-slate-200/50 group-hover:text-corporate-blue/10 transition-colors duration-500">
                      <Mail size={240} />
                    </div>

                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-corporate-blue/10 border border-corporate-blue/20 text-corporate-blue text-[10px] font-bold mb-6 uppercase tracking-widest">
                            <MessageSquare size={12} />
                            <span>Get in Touch</span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black text-primary-navy mb-4">
                            CONTACT{" "}
                            <span className="text-corporate-blue">
                              INFORMATION
                            </span>
                          </h2>
                          <p className="text-slate-600 text-lg">
                            For questions regarding this Disclaimer, please
                            reach out through the following channels:
                          </p>
                        </div>

                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`mailto:${contactData.email}`}
                          className="inline-flex items-center gap-3 bg-primary-navy text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-900/20 hover:bg-corporate-blue transition-all whitespace-nowrap"
                        >
                          <Send size={18} />
                          Contact Legal Team
                        </motion.a>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                            Email Address
                          </p>
                          <a
                            href={`mailto:${contactData.email}`}
                            className="font-bold text-primary-navy hover:text-corporate-blue transition-colors break-words"
                          >
                            {contactData.email}
                          </a>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                            Phone Number
                          </p>
                          <a
                            href={`tel:${contactData.phone.replace(/[^0-9+]/g, "")}`}
                            className="font-bold text-primary-navy hover:text-corporate-blue transition-colors"
                          >
                            {contactData.phone}
                          </a>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                            Registered Office
                          </p>
                          <p className="font-bold text-primary-navy leading-relaxed text-sm">
                            {contactData.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* FINAL NOTE & ACKNOWLEDGEMENT */}
                <motion.div {...fadeInUp}>
                  <div className="relative p-8 md:p-16 bg-gradient-to-br from-primary-navy to-[#07172F] text-white rounded-2xl md:rounded-[4rem] overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-corporate-blue/10 rounded-full blur-[120px] -ml-48 -mb-48 pointer-events-none" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <ShieldAlert
                            className="text-accent-orange"
                            size={32}
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h2 className="text-2xl md:text-4xl font-black tracking-tight">
                            FINAL NOTE
                          </h2>
                          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[12px] mt-1">
                            BINDING ACCEPTANCE
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          {
                            title: "Intermediary Role",
                            text: "You acknowledge that you understand the Platform’s role as an intermediary only.",
                            icon: (
                              <Scale size={24} className="text-accent-orange" />
                            ),
                          },
                          {
                            title: "Operational Risks",
                            text: "You accept all the inherent risks of event planning associated with vendor performance and logistical factors.",
                            icon: (
                              <AlertTriangle
                                size={24}
                                className="text-accent-orange"
                              />
                            ),
                          },
                          {
                            title: "Independent Verification",
                            text: "You agree to independently verify all venue and vendor information provided on the platform.",
                            icon: (
                              <CheckCircle2
                                size={24}
                                className="text-accent-orange"
                              />
                            ),
                          },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
                          >
                            <div className="mb-6 inline-block p-4 bg-white/10 rounded-2xl">
                              {item.icon}
                            </div>
                            <h3 className="text-lg md:text-xl font-black mb-4">
                              {item.title}
                            </h3>
                            <p className="text-slate-300 leading-relaxed text-sm">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-16 pt-8 border-t border-white/10 text-center">
                        <p className="text-slate-400 text-sm italic font-medium">
                          By using Eventibe.com or VenueForEvent.com, you
                          acknowledge that you have read, understood, and agreed
                          to these terms.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
