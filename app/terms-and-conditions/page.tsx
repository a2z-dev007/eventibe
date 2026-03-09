"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  Globe,
  Mail,
  Phone,
  Info,
  Database,
  Zap,
  Share2,
  ExternalLink,
  UserX,
  UserCheck,
  Briefcase,
  RefreshCw,
  CheckCircle2,
  MapPin,
  ChevronRight,
  ArrowLeft,
  ShieldAlert,
  Gavel,
  Scale,
  AlertTriangle,
  Copyright,
  Power,
  CloudLightning,
  Edit,
  Shield,
  CircleDollarSign,
  Sparkles,
  Files,
  ListX,
  RefreshCcw,
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const [activeSection, setActiveSection] = useState("about");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const sections = [
    { id: "about", label: "About the Platform", icon: <Info size={24} /> },
    { id: "eligibility", label: "Eligibility", icon: <UserCheck size={24} /> },
    { id: "accounts", label: "User Accounts", icon: <Lock size={24} /> },
    {
      id: "role",
      label: "Platform Role & Limitation",
      icon: <ShieldAlert size={24} />,
    },
    {
      id: "inquiry",
      label: "Inquiry Submission Terms",
      icon: <FileText size={24} />,
    },
    { id: "listing", label: "Listing Terms", icon: <Briefcase size={24} /> },
    {
      id: "payments",
      label: "Payments & Commissions",
      icon: <CircleDollarSign size={24} />,
    },
    { id: "conduct", label: "User Conduct", icon: <UserX size={24} /> },
    {
      id: "property",
      label: "Intellectual Property",
      icon: <Copyright size={24} />,
    },
    {
      id: "third-party",
      label: "Third-Party Content",
      icon: <ExternalLink size={24} />,
    },
    {
      id: "disclaimer",
      label: "Disclaimer of Warranties",
      icon: <AlertTriangle size={24} />,
    },
    {
      id: "liability",
      label: "Limitation of Liability",
      icon: <Scale size={24} />,
    },
    {
      id: "indemnification",
      label: "Indemnification",
      icon: <ShieldCheck size={24} />,
    },
    {
      id: "refund",
      label: "Cancellation & Refund",
      icon: <RefreshCw size={24} />,
    },
    { id: "termination", label: "Termination", icon: <Power size={24} /> },
    {
      id: "force-majeure",
      label: "Force Majeure",
      icon: <CloudLightning size={24} />,
    },
    { id: "law", label: "Governing Law", icon: <Gavel size={24} /> },
    { id: "modifications", label: "Modifications", icon: <Edit size={24} /> },
    { id: "privacy", label: "Privacy", icon: <Shield size={24} /> },
    { id: "contact", label: "Contact Information", icon: <Mail size={24} /> },
  ];

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
  }, [sections]);

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

  const fadeInUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 scroll-smooth">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-56 bg-primary-navy overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Terms and Conditions"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/50 via-transparent to-primary-navy"></div>
          <div className="absolute inset-0 bg-primary-navy/40"></div>

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
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-4 md:mb-6 animate-fade-in shadow-xl backdrop-blur-sm uppercase tracking-widest">
              <Sparkles size={14} className="text-accent-orange" />
              <span>Legal Agreement</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] animate-fade-in tracking-tight drop-shadow-md">
              Terms &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Conditions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium mx-auto">
              Please read these terms carefully before using our platform. By
              accessing Eventibe, you agree to be bound by these rules.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
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

      {/* Content Section Overlay Style */}
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

      {/* Content Section */}
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
                          {section.label}
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

            {/* Main Content */}
            <div className="lg:w-3/4 space-y-8 md:space-y-20">
              {/* ABOUT THE PLATFORM */}
              <motion.div
                {...fadeInUp}
                id="about"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <Info size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <Info size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    ABOUT THE PLATFORM
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-soft-slate text-base md:text-lg leading-relaxed text-center md:text-left">
                    Eventibe.com and VenueForEvent.com are online event
                    marketplace platforms that connect:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Event hosts",
                      "Wedding planners",
                      "Corporate organizers",
                      "Venue owners",
                      "Event service providers",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 p-5 md:p-4 bg-gray-50 rounded-3xl md:rounded-2xl border border-transparent hover:border-corporate-blue/10 transition-all font-bold text-primary-navy text-sm md:text-base text-center md:text-left"
                      >
                        <div className="w-2 h-2 rounded-full bg-accent-orange shrink-0 md:mt-2"></div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-corporate-blue/5 p-6 md:p-8 rounded-[2rem] border border-corporate-blue/10">
                    <p className="text-soft-slate text-xs md:text-sm font-black mb-4 uppercase tracking-wider text-corporate-blue text-center md:text-left">
                      The Platform enables users to:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Discover venues and vendors",
                        "Submit inquiries",
                        "List venues or services",
                        "Communicate with potential clients",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex flex-col md:flex-row items-center gap-3 text-soft-slate text-sm font-bold text-center md:text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                            <CheckCircle2
                              size={16}
                              className="text-accent-orange"
                            />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-soft-slate text-sm italic font-medium text-center md:text-left">
                    We act only as an intermediary and do not own, manage, or
                    operate listed venues unless explicitly stated.
                  </p>
                </div>
              </motion.div>

              {/* ELIGIBILITY */}
              <motion.div
                {...fadeInUp}
                id="eligibility"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <UserCheck size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <UserCheck size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    ELIGIBILITY
                  </h2>
                </div>
                <div className="p-8 bg-light-bg rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                  <p className="text-soft-slate font-bold mb-4">
                    By using the Platform, you represent that:
                  </p>
                  <ul className="space-y-4">
                    {[
                      "You are at least 18 years of age.",
                      "You have the legal capacity to enter into binding agreements.",
                      "All information you provide is accurate and complete.",
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col md:flex-row items-center md:items-start gap-4 p-6 md:p-4 bg-white rounded-[2rem] md:rounded-xl border border-gray-100 shadow-sm text-center md:text-left"
                      >
                        <div className="w-10 h-10 md:w-8 md:h-8 shrink-0 rounded-xl bg-accent-orange/10 text-accent-orange flex items-center justify-center font-black text-sm md:text-xs">
                          0{idx + 1}
                        </div>
                        <span className="text-soft-slate font-bold md:font-medium text-sm md:text-base">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* USER ACCOUNTS */}
              <motion.div
                {...fadeInUp}
                id="accounts"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <Lock size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <Lock size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    USER ACCOUNTS (IF APPLICABLE)
                  </h2>
                </div>
                <div className="bg-primary-navy p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full -mb-16 -mr-16"></div>
                  <p className="text-gray-400 font-bold mb-6 text-sm uppercase tracking-widest">
                    If account creation is enabled:
                  </p>
                  <div className="space-y-6 relative z-10">
                    {[
                      "You are responsible for maintaining confidentiality of login credentials.",
                      "You are responsible for all activity under your account.",
                      "We reserve the right to suspend or terminate accounts for misuse.",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left"
                      >
                        <div className="w-10 h-10 md:w-6 md:h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <CheckCircle2
                            size={20}
                            className="text-accent-orange"
                          />
                        </div>
                        <p className="text-gray-200 font-bold md:font-medium text-sm md:text-base leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* PLATFORM ROLE & LIMITATION */}
              <motion.div
                {...fadeInUp}
                id="role"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <ShieldAlert size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <ShieldAlert size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    PLATFORM ROLE & LIMITATION
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Provides listing and inquiry facilitation services.",
                    "Does not guarantee booking confirmations.",
                    "Does not guarantee venue availability.",
                    "Does not guarantee vendor performance.",
                    "Does not participate in negotiation unless explicitly stated.",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 md:p-5 bg-gray-50 rounded-3xl md:rounded-2xl border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-3 md:gap-4 text-center md:text-left"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-orange shrink-0 md:mt-2"></div>
                      <p className="text-soft-slate text-sm font-black md:font-bold">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-6 bg-red-50 border border-red-100 rounded-2xl">
                  <p className="text-red-700 font-extrabold text-sm md:text-base leading-relaxed">
                    Any agreement, contract, payment, or arrangement made
                    between users and venue owners/vendors is strictly between
                    those parties.
                  </p>
                </div>
              </motion.div>

              {/* INQUIRY SUBMISSION TERMS */}
              <motion.div
                {...fadeInUp}
                id="inquiry"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <FileText size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <FileText size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    INQUIRY SUBMISSION TERMS
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-soft-slate font-medium">
                    When a user submits an inquiry:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "The information will be shared with relevant venues/vendors.",
                      "The Platform may contact the user for clarification.",
                      "Submission of inquiry does not constitute a booking.",
                      "The Platform does not guarantee response time.",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-8 md:p-6 rounded-[2.5rem] md:rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center md:items-start gap-4 text-center md:text-left"
                      >
                        <div className="w-12 h-12 md:w-8 md:h-8 rounded-2xl bg-corporate-blue/10 text-corporate-blue flex items-center justify-center font-black text-sm md:text-xs">
                          0{idx + 1}
                        </div>
                        <p className="text-soft-slate text-sm md:text-base font-black md:font-bold leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* LISTING TERMS */}
              <motion.div
                {...fadeInUp}
                id="listing"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <Briefcase size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <Briefcase size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    LISTING TERMS (FOR VENDORS)
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <h3 className="text-lg font-black text-primary-navy mb-6 uppercase tracking-tight">
                      By listing on the Platform, you agree that:
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "All submitted information is accurate.",
                        "You have legal rights to list the venue/service.",
                        "Images and content do not infringe intellectual property rights.",
                        "Pricing information is truthful and updated.",
                        "You comply with local laws and regulations.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex flex-col md:flex-row items-center md:items-start gap-3 text-soft-slate font-bold md:font-medium text-sm md:text-base text-center md:text-left"
                        >
                          <div className="w-8 h-8 rounded-full bg-accent-orange/10 flex items-center justify-center shrink-0">
                            <CheckCircle2
                              size={18}
                              className="text-accent-orange"
                            />
                          </div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-200">
                    <h3 className="text-lg font-black text-primary-navy mb-6 uppercase tracking-tight text-corporate-blue">
                      We reserve the right to:
                    </h3>
                    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center md:items-start">
                      {[
                        "Edit formatting for consistency",
                        "Reject or remove listings",
                        "Suspend accounts for misleading content",
                      ].map((item) => (
                        <div
                          key={item}
                          className="w-full md:w-auto px-6 py-4 md:px-5 md:py-3 bg-corporate-blue/5 rounded-2xl md:rounded-full border border-corporate-blue/10 text-sm font-black md:font-bold text-corporate-blue text-center"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* PAYMENTS & COMMISSIONS */}
              <motion.div
                {...fadeInUp}
                id="payments"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
              >
                {/* Decorative Background Icon */}
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <CircleDollarSign size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <CircleDollarSign size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    PAYMENTS & COMMISSIONS
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-corporate-blue/5 p-8 rounded-[2rem] border border-corporate-blue/10">
                    <h3 className="text-corporate-blue font-black mb-6 uppercase tracking-wider text-sm">
                      Financial Provisions:
                    </h3>
                    <ul className="space-y-4">
                      {[
                        "We may charge listing fees or commissions as per the selected plan.",
                        "All fees paid to the Platform are non-refundable unless stated otherwise.",
                        "Direct transactions between users and vendors are not managed by us.",
                        "Taxes and gateway charges may apply to Platform payments.",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-soft-slate font-medium text-sm md:text-base"
                        >
                          <div className="w-6 h-6 rounded-full bg-corporate-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                            <CircleDollarSign
                              size={14}
                              className="text-corporate-blue"
                            />
                          </div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* USER CONDUCT */}
              <motion.div
                {...fadeInUp}
                id="conduct"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 group overflow-hidden relative scroll-mt-28"
              >
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <UserX size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-red-50 border border-red-100 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <UserX size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    USER CONDUCT
                  </h2>
                </div>
                <div className="bg-red-50 p-8 rounded-[2.5rem] border border-red-100">
                  <h3 className="text-red-700 font-black mb-6 uppercase tracking-wider text-sm">
                    Users agree NOT to:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Provide false information",
                      "Post misleading pricing",
                      "Engage in fraud",
                      "Harass other users",
                      "Use Platform for unlawful activities",
                      "Copy, scrape, or extract data",
                      "Attempt to hack or disrupt",
                    ].map((item) => (
                      <div
                        key={item}
                        className="p-5 md:p-4 bg-white rounded-2xl md:rounded-xl border border-red-100 flex flex-col md:flex-row items-center md:items-start gap-3 text-center md:text-left"
                      >
                        <div className="w-10 h-10 md:w-6 md:h-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <UserX
                            size={20}
                            className="text-red-500 md:w-4 md:h-4"
                          />
                        </div>
                        <span className="text-soft-slate font-black md:font-bold text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-red-200">
                    <h4 className="text-red-800 font-black text-xs uppercase tracking-widest mb-4">
                      Violation may result in:
                    </h4>
                    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center md:items-start justify-center md:justify-start">
                      {[
                        "Immediate suspension",
                        "Legal action",
                        "Permanent ban",
                      ].map((item) => (
                        <span
                          key={item}
                          className="w-full md:w-auto px-6 py-4 md:px-4 md:py-2 bg-red-600 text-white rounded-2xl md:rounded-lg text-xs md:text-xs font-black uppercase text-center"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* INTELLECTUAL PROPERTY */}
              <motion.div
                {...fadeInUp}
                id="property"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 group overflow-hidden relative scroll-mt-28"
              >
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <Copyright size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <Copyright size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    INTELLECTUAL PROPERTY
                  </h2>
                </div>
                <div className="space-y-6">
                  <p className="text-soft-slate font-medium">
                    All content on the Platform including logos, design, layout,
                    text, branding, and software is the intellectual property of
                    the Platform.
                  </p>
                  <div className="bg-light-bg p-8 rounded-[2rem] border border-gray-100">
                    <p className="text-primary-navy font-black text-sm uppercase tracking-widest mb-4">
                      Users may not:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                      {[
                        "Copy",
                        "Modify",
                        "Distribute",
                        "Reproduce",
                        "Republish",
                      ].map((item) => (
                        <div
                          key={item}
                          className="p-3 bg-white rounded-xl text-center shadow-sm border border-gray-100 text-sm md:text-xs font-bold text-soft-slate"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-soft-slate italic bg-white/50 p-4 rounded-xl border border-gray-200">
                      Venue owners retain ownership of their content but grant
                      us a royalty-free license to display and promote their
                      listings.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* THIRD-PARTY CONTENT */}
              <motion.div
                {...fadeInUp}
                id="third-party"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 group overflow-hidden relative scroll-mt-28"
              >
                <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                  <div className="scale-[8]">
                    <ExternalLink size={28} />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                    <ExternalLink size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight break-words uppercase">
                    THIRD-PARTY CONTENT
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                    <p className="text-soft-slate text-sm md:text-base font-medium leading-relaxed">
                      The Platform may contain links to external websites,
                      social media, and vendor sites. We are not responsible for
                      third-party content, policies, or practices.
                    </p>
                  </div>
                  <div className="w-full md:w-48 flex flex-col justify-center items-center gap-3">
                    <Globe
                      size={40}
                      className="text-corporate-blue opacity-20"
                    />
                    <span className="text-[10px] uppercase tracking-widest font-black text-soft-slate">
                      External Links
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* DISCLAIMER & LIABILITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  {...fadeInUp}
                  id="disclaimer"
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 flex items-center justify-center text-accent-orange mb-8 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={32} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-6 uppercase tracking-tight">
                    DISCLAIMER
                  </h2>
                  <p className="text-sm text-soft-slate font-medium leading-relaxed mb-6 flex-grow">
                    The Platform is provided on an &quot;as is&quot; and
                    &quot;as available&quot; basis. We do not warrant
                    uninterrupted service or 100% accuracy of listings.
                  </p>
                  <div className="text-xs text-accent-orange font-black italic bg-orange-50 p-6 rounded-2xl w-full">
                    Users engage with vendors at their own discretion and risk.
                  </div>
                </motion.div>

                <motion.div
                  {...fadeInUp}
                  id="liability"
                  className="bg-primary-navy text-white rounded-[3rem] p-10 shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full -mt-16 -mr-16"></div>
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform relative z-10">
                    <Scale size={32} />
                  </div>
                  <h2 className="text-xl font-black mb-6 uppercase relative z-10 tracking-tight">
                    LIABILITY
                  </h2>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6 flex-grow relative z-10">
                    To the maximum extent permitted by law, the Platform shall
                    not be liable for direct or indirect damages, loss of
                    business, or disputes between parties.
                  </p>
                  <div className="text-xs text-gray-300 font-bold border-t border-white/10 pt-6 relative z-10 w-full">
                    Liability is limited to amount paid directly to the
                    Platform.
                  </div>
                </motion.div>
              </div>

              {/* INDEMNIFICATION */}
              <motion.div
                {...fadeInUp}
                id="indemnification"
                className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm border border-slate-100 text-center md:text-left scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                    <ShieldCheck size={32} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-primary-navy mb-4 border-b border-slate-50 pb-4 inline-block">
                      INDEMNIFICATION
                    </h2>
                    <p className="text-soft-slate font-medium leading-relaxed text-sm md:text-base">
                      You agree to indemnify and hold harmless the Platform, its
                      owners, and affiliates against any claims, losses, or
                      liabilities arising from misrepresentation, violation of
                      law, or breach of these Terms.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* REFUND & TERMINATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  {...fadeInUp}
                  id="refund"
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-corporate-blue mb-6 border border-slate-100">
                    <RefreshCw size={28} />
                  </div>
                  <h2 className="text-lg font-black text-primary-navy mb-4">
                    CANCELLATION
                  </h2>
                  <p className="text-sm text-soft-slate font-medium leading-relaxed mb-6 flex-grow">
                    Inquiry submissions are non-binding. Listing fee refunds
                    follow the Refund Policy.
                  </p>
                  <Link
                    href="/refund-policy"
                    className="w-full text-center text-xs font-black uppercase tracking-widest text-accent-orange bg-accent-orange/10 p-4 rounded-xl"
                  >
                    Check Refund Policy
                  </Link>
                </motion.div>

                <motion.div
                  {...fadeInUp}
                  id="termination"
                  className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm flex flex-col group items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 mb-6 border border-slate-100 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Power size={28} />
                  </div>
                  <h2 className="text-lg font-black text-primary-navy mb-4 uppercase">
                    TERMINATION
                  </h2>
                  <p className="text-sm text-soft-slate font-medium leading-relaxed mb-6 flex-grow">
                    We reserve the right to suspend access, remove listings, or
                    block IP access for policy violations without prior notice.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                      Strict Enforcement
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* FORCE MAJEURE */}
              <motion.div
                {...fadeInUp}
                id="force-majeure"
                className="bg-primary-navy text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden text-center md:text-left scroll-mt-28"
              >
                <div className="absolute top-0 left-0 w-32 h-32 bg-corporate-blue/10 rounded-full -mt-16 -ml-16"></div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="w-20 h-20 rounded-[2rem] bg-white/10 flex items-center justify-center text-white shrink-0">
                    <CloudLightning size={40} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">
                      FORCE MAJEURE
                    </h2>
                    <p className="text-gray-400 font-medium mb-8 text-sm md:text-base">
                      We are not liable for delays or failure caused by:
                    </p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                      {[
                        "Natural disasters",
                        "Government actions",
                        "Internet failures",
                        "Pandemics",
                        "War",
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-white/10 rounded-xl text-xs font-bold text-gray-100 border border-white/10"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* GOVERNING LAW */}
              <motion.div
                {...fadeInUp}
                id="law"
                className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 flex flex-col md:flex-row items-center gap-10 text-center md:text-left scroll-mt-28 shadow-sm"
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-[2rem] bg-slate-50">
                  <Gavel size={48} className="text-accent-orange opacity-60" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-primary-navy mb-6 uppercase tracking-tight">
                    GOVERNING LAW
                  </h2>
                  <p className="text-sm md:text-base text-soft-slate font-medium leading-relaxed mb-4">
                    These Terms shall be governed by the laws of India. Any
                    disputes shall be subject to the exclusive jurisdiction of
                    courts located in{" "}
                    <span className="text-primary-navy font-black">
                      Indore, Madhya Pradesh
                    </span>
                    .
                  </p>
                  <div className="inline-block px-4 py-2 bg-corporate-blue/5 rounded-full text-[10px] font-black uppercase tracking-widest text-corporate-blue">
                    Judicial Center: India
                  </div>
                </div>
              </motion.div>

              {/* MODIFICATIONS & PRIVACY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  {...fadeInUp}
                  id="modifications"
                  className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex flex-col group items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-corporate-blue mb-6 border border-slate-100 group-hover:bg-accent-orange group-hover:text-white transition-all">
                    <Edit size={28} />
                  </div>
                  <h2 className="text-lg font-black text-primary-navy mb-4 tracking-tight uppercase">
                    MODIFICATIONS
                  </h2>
                  <p className="text-sm text-soft-slate font-medium leading-relaxed mb-4 flex-grow">
                    We may update these Terms at any time. Continued use of the
                    platform indicates acceptance of revised terms.
                  </p>
                </motion.div>

                <motion.div
                  {...fadeInUp}
                  id="privacy"
                  className="bg-corporate-blue rounded-[2.5rem] p-10 text-white shadow-lg flex flex-col group items-center md:items-start text-center md:text-left scroll-mt-28"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 border border-white/10 group-hover:bg-white group-hover:text-corporate-blue transition-all">
                    <Shield size={28} />
                  </div>
                  <h2 className="text-lg font-black mb-4 uppercase tracking-tight">
                    PRIVACY
                  </h2>
                  <p className="text-sm text-gray-200 font-medium leading-relaxed mb-6 flex-grow">
                    Use of the Platform is also governed by our Privacy Policy.
                    Please review it carefully.
                  </p>
                  <Link
                    href="/privacy-policy"
                    className="w-full text-center text-xs font-black uppercase tracking-widest text-accent-orange hover:text-white flex items-center justify-center gap-2"
                  >
                    View Privacy Policy <ChevronRight size={16} />
                  </Link>
                </motion.div>
              </div>

              {/* CONTACT INFORMATION */}
              <motion.div
                {...fadeInUp}
                id="contact"
                className="bg-white rounded-[3rem] p-10 md:p-16 border border-slate-100 shadow-sm scroll-mt-28"
              >
                <div className="flex flex-col md:flex-row items-center md:items-center gap-6 mb-12 border-b border-slate-50 pb-12 text-center md:text-left">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-corporate-blue/5 flex items-center justify-center text-corporate-blue">
                    <Mail size={32} />
                  </div>
                  <h2 className="text-3xl font-black text-primary-navy tracking-tight uppercase">
                    CONTACT INFORMATION
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
                  <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center gap-2 text-corporate-blue font-black text-[10px] uppercase tracking-widest justify-center md:justify-start">
                      <Globe size={14} /> PLATFORM
                    </div>
                    <p className="text-primary-navy font-bold text-sm">
                      Eventibe.com / VenueForEvent.com
                    </p>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center gap-2 text-corporate-blue font-black text-[10px] uppercase tracking-widest justify-center md:justify-start">
                      <Mail size={14} /> EMAIL
                    </div>
                    <a
                      href="mailto:support@eventibe.com"
                      className="text-primary-navy font-bold text-sm hover:text-accent-orange transition-colors underline"
                    >
                      support@eventibe.com
                    </a>
                  </div>
                  <div className="space-y-4 text-center md:text-left">
                    <div className="flex items-center gap-2 text-corporate-blue font-black text-[10px] uppercase tracking-widest justify-center md:justify-start">
                      <Phone size={14} /> PHONE
                    </div>
                    <p className="text-primary-navy font-bold text-sm">
                      +91-8800842084
                    </p>
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-corporate-blue font-black text-[10px] uppercase tracking-widest mb-4 justify-center md:justify-start">
                    <MapPin size={14} /> REGISTERED OFFICE
                  </div>
                  <p className="text-soft-slate font-medium text-sm leading-relaxed max-w-2xl text-center md:text-left">
                    Samta Enclave, Near Mother Dairy, Qutub Vihar, Phase 1,
                    Sector 19, Dwarka, New Delhi – 110071, India
                  </p>
                </div>
              </motion.div>

              {/* ACCEPTANCE */}
              <motion.div
                {...fadeInUp}
                className="bg-primary-navy p-10 md:p-20 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-64 h-64 bg-accent-orange/10 rounded-full -mt-32 -ml-32 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-corporate-blue/20 rounded-full -mb-32 -mr-32 blur-3xl"></div>

                <h2 className="text-3xl md:text-5xl font-black mb-8 relative z-10 leading-tight uppercase tracking-tight">
                  ACCEPTANCE
                </h2>
                <p className="text-gray-400 text-base md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed relative z-10">
                  By accessing or using Eventibe.com or VenueForEvent.com, you
                  acknowledge that you have read, understood, and agreed to
                  these Terms & Conditions.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 bg-accent-orange text-white px-6 py-4 md:px-10 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl hover:shadow-accent-orange/40 relative z-10"
                >
                  <span className="hidden md:inline">
                    I Understand & Accept
                  </span>
                  <span className="md:hidden">Accept</span>
                  <CheckCircle2 size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary-navy flex items-center justify-center text-white shadow-xl shadow-blue-900/20">
                <ShieldCheck size={24} />
              </div>
              <div className="text-primary-navy font-black text-3xl tracking-tighter">
                EVEN<span className="text-accent-orange">TIBE</span>
              </div>
            </div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.4em] opacity-80">
              India&apos;s Premium Venue Marketplace
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ea580c;
        }
      `}</style>
    </div>
  );
}
