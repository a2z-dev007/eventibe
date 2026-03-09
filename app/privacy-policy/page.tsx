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
  Files,
} from "lucide-react";

const sections = [
  { id: "about", title: "About Us", icon: <Info size={24} /> },
  {
    id: "collect",
    title: "Information We Collect",
    icon: <Database size={24} />,
  },
  {
    id: "use",
    title: "How We Use Information",
    icon: <ShieldCheck size={24} />,
  },
  { id: "share", title: "Sharing Information", icon: <Share2 size={24} /> },
  { id: "retention", title: "Data Retention", icon: <Clock size={24} /> },
  { id: "security", title: "Data Security", icon: <Lock size={24} /> },
  { id: "links", title: "Third-Party Links", icon: <ExternalLink size={24} /> },
  { id: "children", title: "Children's Privacy", icon: <UserX size={24} /> },
  { id: "rights", title: "Your Rights", icon: <UserCheck size={24} /> },
  {
    id: "international",
    title: "International Transfers",
    icon: <Globe size={24} />,
  },
  {
    id: "business",
    title: "Business Transfers",
    icon: <Briefcase size={24} />,
  },
  { id: "changes", title: "Changes to Policy", icon: <RefreshCw size={24} /> },
  { id: "contact", title: "Contact Information", icon: <Mail size={24} /> },
  { id: "consent", title: "Consent", icon: <CheckCircle2 size={24} /> },
];

export default function PrivacyPolicyPage() {
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
    <div className="flex flex-col min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center overflow-hidden bg-primary-navy">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Privacy and Security"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/50"></div>

          {/* Subtle Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
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

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 animate-fade-in shadow-xl backdrop-blur-sm">
              <ShieldCheck size={14} />
              <span>Trust & Transparency</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Policy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium text-center">
              At Eventibe, your privacy is our priority. We are committed to
              protecting your data and being transparent about how we handle
              your information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Meta Info */}
      <section className="bg-light-bg py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-6 md:py-5 px-6 bg-white rounded-3xl md:rounded-2xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
              <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0">
                <Clock size={24} className="md:w-5 md:h-5" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-soft-slate uppercase tracking-[0.2em] md:tracking-wider font-bold mb-1 md:mb-0">
                  Effective Date
                </p>
                <p className="text-sm md:text-base font-black text-primary-navy">
                  March 2024
                </p>
              </div>
            </div>

            <div className="w-full h-px md:w-px md:h-8 bg-gray-100"></div>

            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
              <div className="w-12 h-12 md:w-10 md:h-10 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange shrink-0">
                <RefreshCw size={24} className="md:w-5 md:h-5" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-soft-slate uppercase tracking-[0.2em] md:tracking-wider font-bold mb-1 md:mb-0">
                  Last Updated
                </p>
                <p className="text-sm md:text-base font-black text-primary-navy">
                  March 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="pt-16 pb-12 md:pb-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
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
                  <div className="w-2 h-2 rounded-full bg-accent-orange shadow-[0_0_8px_rgba(249,115,22,0.4)]"></div>
                </div>
              </div>
            </aside>

            {/* Content Column */}
            <main className="lg:w-3/4 space-y-12 md:space-y-16">
              {/* Section 1: ABOUT US */}
              <div id="about" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Info size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    ABOUT US
                  </h2>
                </div>
                <p className="text-soft-slate text-base md:text-lg mb-6 leading-relaxed">
                  Eventibe.com and VenueForEvent.com operate as online event
                  venue and vendor marketplaces that connect:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    "Event hosts",
                    "Wedding planners",
                    "Corporate organizers",
                    "Venue owners",
                    "Event service providers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 p-5 md:p-4 bg-gray-50 rounded-3xl md:rounded-2xl border border-transparent hover:border-corporate-blue/20 transition-all font-bold text-primary-navy text-sm text-center md:text-left"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-orange flex-shrink-0 md:mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-soft-slate text-base leading-relaxed bg-corporate-blue/5 p-6 rounded-2xl border border-corporate-blue/10 italic font-medium text-center md:text-left">
                  We facilitate discovery and inquiries. We do not directly
                  organize, manage, or execute events unless explicitly stated
                  under a separate agreement.
                </p>
              </div>

              {/* Section 2: INFORMATION WE COLLECT */}
              <div id="collect" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Database size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    INFORMATION WE COLLECT
                  </h2>
                </div>
                <p className="text-soft-slate text-base md:text-lg mb-8">
                  We collect information to provide better services, improve
                  user experience, and facilitate venue/vendor inquiries.
                </p>

                <div className="space-y-8">
                  {/* 2.1 */}
                  <div>
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      Information You Provide Directly
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          A. When You Submit an Inquiry
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Full Name",
                            "Email Address",
                            "Phone Number",
                            "Event Type",
                            "Event Date",
                            "Guest Count",
                            "Budget (if provided)",
                            "Message/Requirements",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          B. When You List Your Venue
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Venue Name",
                            "Business Address",
                            "Contact Person",
                            "Contact Details",
                            "Pricing Information",
                            "Capacity Details",
                            "Venue Description",
                            "Images",
                            "Legal/Business Information (if required)",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          C. When You List Your Service
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Vendor Name",
                            "Category",
                            "Service Area",
                            "Pricing Range",
                            "Portfolio Images",
                            "Contact Information",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          D. When You Contact Us
                        </p>
                        <ul className="space-y-2">
                          {["Name", "Email", "Phone", "Message Content"].map(
                            (item) => (
                              <li
                                key={item}
                                className="text-soft-slate text-sm font-medium flex items-start gap-2"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-accent-orange flex-shrink-0 mt-0.5"
                                />{" "}
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 2.2 */}
                  <div className="bg-light-bg p-8 rounded-[2.5rem] border border-gray-100">
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      Automatically Collected Information
                    </h3>
                    <p className="text-soft-slate text-sm mb-6 font-medium">
                      When you use our websites, we may collect:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "IP address",
                        "Device type",
                        "Browser type",
                        "Operating system",
                        "Pages visited",
                        "Time spent on pages",
                        "Referring URL",
                        "Cookies and tracking identifiers",
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-white rounded-full border border-gray-100 text-xs font-bold text-primary-navy shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2.3 */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-accent-orange/20 shadow-sm">
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      Cookies & Tracking Technologies
                    </h3>
                    <p className="text-soft-slate text-sm mb-4 font-medium">
                      We use cookies to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        "Improve performance",
                        "Remember preferences",
                        "Analyze traffic",
                        "Enhance user experience",
                        "Support marketing campaigns",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm font-bold text-soft-slate"
                        >
                          <Zap
                            size={16}
                            className="text-accent-orange flex-shrink-0 mt-0.5"
                          />{" "}
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-soft-slate italic bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                      You may disable cookies via your browser settings.
                      However, certain features may not function properly
                      without them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: HOW WE USE YOUR INFORMATION */}
              <div id="use" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    HOW WE USE INFORMATION
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      To Facilitate Inquiries
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Your details may be shared with relevant venue owners or vendors.",
                        "We may contact you to clarify your requirements.",
                        "We may track inquiry performance for quality improvement.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      To Operate the Platform
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Display venue and vendor listings.",
                        "Improve search and filtering.",
                        "Optimize SEO performance.",
                        "Enhance platform functionality.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      Communication
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Respond to inquiries.",
                        "Send service updates.",
                        "Share important notifications.",
                        "Provide support.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      Marketing & Promotions
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Event planning tips.",
                        "Vendor recommendations.",
                        "Promotional campaigns.",
                        "Newsletter updates.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                      <li className="text-xs text-soft-slate italic pt-2 border-t border-gray-200 mt-2 font-bold uppercase tracking-widest">
                        You may unsubscribe at any time.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-8 rounded-[2rem] bg-primary-navy text-white">
                  <p className="font-bold mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                    Legal & Compliance
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Prevent fraud.",
                      "Enforce terms.",
                      "Comply with legal obligations.",
                      "Resolve disputes.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm font-medium text-gray-300"
                      >
                        <ShieldCheck
                          size={16}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: HOW WE SHARE INFORMATION */}
              <div id="share" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Lock size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    SHARING INFORMATION
                  </h2>
                </div>
                <p className="text-base md:text-lg text-primary-navy font-black mb-8 p-6 bg-accent-orange/5 border-l-4 border-accent-orange rounded-r-2xl">
                  We do not sell personal information.
                </p>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-primary-navy mb-4 text-lg flex items-center gap-3 leading-tight">
                      With Venue Owners & Vendors
                    </h3>
                    <p className="text-soft-slate text-sm font-medium leading-relaxed">
                      When you submit an inquiry, your details are shared with
                      relevant partners to respond to your request.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-primary-navy mb-4 text-lg flex items-center gap-3 leading-tight">
                      With Service Providers
                    </h3>
                    <p className="text-soft-slate text-sm font-medium mb-4">
                      We may use third-party service providers for:
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {[
                        "Hosting services",
                        "Email communication",
                        "Analytics",
                        "CRM management",
                        "Payment processing (future integrations)",
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-corporate-blue border border-gray-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-soft-slate font-bold uppercase tracking-widest border-t border-gray-100 pt-4">
                      These providers are obligated to protect your data.
                    </p>
                  </div>

                  <div className="bg-white border border-red-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-red-600 mb-4 text-lg flex items-center gap-3 leading-tight">
                      Legal Disclosure
                    </h3>
                    <p className="text-soft-slate text-sm font-medium mb-4 leading-relaxed">
                      We may disclose information if required:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "By law",
                        "By court order",
                        "For fraud investigation",
                        "To protect rights or safety",
                      ].map((item) => (
                        <div
                          key={item}
                          className="p-3 bg-red-50 rounded-xl text-[10px] font-black text-red-700 text-center uppercase tracking-wider"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid for shorter sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 5 & 6 */}
                <div
                  id="retention"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <Clock size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    DATA RETENTION
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 flex-grow leading-relaxed font-medium">
                    We retain personal data only as long as necessary for
                    inquiry management, legal compliance, business operations,
                    and record-keeping.
                  </p>
                  <p className="text-xs text-primary-navy font-extrabold italic bg-white p-4 rounded-xl border border-gray-200">
                    You may request deletion of your data subject to legal and
                    contractual limitations.
                  </p>
                </div>

                <div
                  id="security"
                  className="scroll-mt-32 p-8 bg-primary-navy text-white rounded-[2.5rem] flex flex-col items-center text-center md:items-start md:text-left h-full shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-corporate-blue/20 rounded-full -mt-10 -mr-10"></div>
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight">
                    DATA SECURITY
                  </h2>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">
                    We implement reasonable technical and organizational
                    measures including:
                  </p>
                  <ul className="space-y-2 mb-6 text-sm font-bold">
                    {[
                      "Secure hosting environments",
                      "HTTPS encryption",
                      "Access controls",
                      "Administrative safeguards",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <ShieldCheck
                          size={14}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 italic pt-4 border-t border-white/10">
                    However, no internet transmission is 100% secure. Users are
                    advised to exercise caution when sharing sensitive
                    information.
                  </p>
                </div>

                {/* Section 7 & 8 */}
                <div
                  id="links"
                  className="scroll-mt-32 p-8 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100 shadow-inner">
                    <ExternalLink size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    THIRD-PARTY LINKS
                  </h2>
                  <p className="text-sm text-soft-slate mb-4 leading-relaxed font-medium">
                    Our websites may contain links to external venue and vendor
                    websites, and social media platforms.
                  </p>
                  <p className="text-xs text-soft-slate leading-relaxed bg-gray-50 p-6 rounded-2xl border border-dotted border-gray-300 italic font-medium">
                    We are not responsible for the privacy practices of
                    third-party websites. Users are encouraged to review their
                    respective privacy policies.
                  </p>
                </div>

                <div
                  id="children"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <UserX size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    CHILDREN’S PRIVACY
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 font-bold uppercase tracking-widest text-corporate-blue">
                    Our platforms are not intended for individuals under the age
                    of 18.
                  </p>
                  <p className="text-sm text-soft-slate leading-relaxed font-medium">
                    We do not knowingly collect personal information from
                    minors. If we become aware of such collection, we will
                    delete it promptly.
                  </p>
                </div>
              </div>

              {/* Section 9: YOUR RIGHTS */}
              <div id="rights" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <UserCheck size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    YOUR RIGHTS
                  </h2>
                </div>
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mb-32 -mr-32"></div>
                  <p className="text-soft-slate text-sm md:text-base mb-8 leading-relaxed font-medium relative z-10">
                    Depending on applicable laws, you may have the right to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {[
                      "Access your personal data",
                      "Request correction",
                      "Request deletion",
                      "Withdraw consent",
                      "Object to processing",
                      "Request data portability",
                    ].map((right) => (
                      <div
                        key={right}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-corporate-blue/20 transition-all font-bold text-primary-navy text-sm shadow-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />{" "}
                        {right}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100 relative z-10">
                    <p className="text-sm text-soft-slate font-extrabold italic text-center">
                      To exercise your rights, please contact us at the email
                      listed below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10 & 11 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  id="international"
                  className="scroll-mt-32 p-8 bg-corporate-blue text-white rounded-[2.5rem] flex flex-col items-center text-center md:items-start md:text-left h-full shadow-lg group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight">
                    INTERNATIONAL TRANSFER
                  </h2>
                  <p className="text-sm text-blue-100 mb-6 leading-relaxed font-medium">
                    If you access our platform from outside India, your
                    information may be transferred to and processed in India or
                    other jurisdictions where our service providers operate.
                  </p>
                  <p className="text-xs text-blue-200 font-bold uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/10">
                    By using our services, you consent to such transfer.
                  </p>
                </div>

                <div
                  id="business"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    BUSINESS TRANSFERS
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 leading-relaxed font-bold uppercase tracking-widest">
                    In the event of:
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      "Merger",
                      "Acquisition",
                      "Restructuring",
                      "Asset sale",
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-black text-primary-navy flex items-start gap-2"
                      >
                        <ChevronRight
                          size={12}
                          className="text-accent-orange flex-shrink-0 mt-1"
                        />{" "}
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-soft-slate font-medium text-center pb-4 border-b border-gray-200">
                    User information may be transferred as part of the
                    transaction.
                  </p>
                </div>
              </div>

              {/* Section 12: CHANGES TO THIS POLICY */}
              <div id="changes" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <ExternalLink size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    CHANGES TO THIS POLICY
                  </h2>
                </div>
                <div className="bg-light-bg rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                  <div className="space-y-4 flex-grow">
                    <p className="text-soft-slate text-sm md:text-base font-medium leading-relaxed">
                      We may update this Privacy Policy periodically. Updates
                      will be posted on this page with a revised “Last Updated”
                      date.
                    </p>
                    <p className="p-4 bg-white rounded-2xl border border-corporate-blue/20 text-corporate-blue text-sm font-black text-center shadow-sm">
                      Continued use of the platform after changes indicates
                      acceptance.
                    </p>
                  </div>
                  <div className="w-24 h-24 bg-corporate-blue/10 rounded-full flex items-center justify-center text-corporate-blue group-hover:rotate-180 transition-transform duration-1000 shrink-0">
                    <RefreshCw size={40} />
                  </div>
                </div>
              </div>

              {/* Section 13: CONTACT INFORMATION */}
              <div id="contact" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Mail size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    CONTACT INFORMATION
                  </h2>
                </div>
                <div className="bg-primary-navy text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-[80px] -mt-32 -mr-32"></div>
                  <p className="text-gray-300 text-sm md:text-base mb-10 font-medium relative z-10 max-w-lg">
                    If you have questions regarding this Privacy Policy, please
                    contact our data protection team:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Company
                          </p>
                          <p className="font-bold">
                            Eventibe.com / VenueForEvent.com
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Email
                          </p>
                          <p className="font-bold text-sm md:text-base">
                            support@eventibe.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Phone
                          </p>
                          <p className="font-bold text-sm md:text-base">
                            +91-8800842084
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Office Address
                          </p>
                          <p className="font-bold text-xs md:text-sm">
                            Samta Enclave, Near Mother Dairy, Dwarka, New Delhi
                            – 110071
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 pt-10 border-t border-white/10 relative z-10 text-center">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center gap-2 text-accent-orange font-black hover:text-white transition-colors group"
                    >
                      Visit Our Contact Us Page{" "}
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Section 14: CONSENT */}
              <div id="consent" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-16 h-16 md:w-12 md:h-12 flex-shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    CONSENT
                  </h2>
                </div>
                <div className="bg-light-bg rounded-[2.5rem] p-8 md:p-10 border-2 border-dashed border-gray-200 shadow-inner flex flex-col md:flex-row items-center gap-8">
                  <p className="text-soft-slate text-sm md:text-lg font-black text-center md:text-left leading-relaxed">
                    By using Eventibe.com or VenueForEvent.com, submitting
                    forms, or listing your venue or services, you consent to the
                    collection and use of information in accordance with this
                    Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-white border-2 border-red-50 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">
                    DISCLAIMER
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-soft-slate leading-relaxed font-bold italic">
                  This Privacy Policy is a general template aligned with
                  marketplace and inquiry-based platform operations. For full
                  legal compliance under applicable laws (including India IT
                  Act, DPDP Act, GDPR if applicable), consultation with a
                  qualified legal professional is recommended.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Footer CTA (Subtle) */}
      <section className="py-8 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-black text-primary-navy mb-4">
            Any Doubts?
          </h2>
          <p className="text-soft-slate max-w-xl mx-auto mb-8 font-medium">
            Our team is here to help you understand how we protect your data.
            Feel free to reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact-us"
              className="bg-cta-gradient text-white px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              Contact Us Now <Mail size={20} />
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent-orange text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-[13px] md:text-sm uppercase tracking-[0.15em] md:tracking-widest hover:scale-105 transition-all shadow-xl hover:shadow-accent-orange/20"
            >
              I Understand & Accept
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-10 md:py-16 bg-light-bg border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-navy flex items-center justify-center text-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
              <div className="text-primary-navy font-black text-2xl tracking-tighter">
                EVEN<span className="text-accent-orange">TIBE</span>
              </div>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
            <p className="text-soft-slate text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
              India&apos;s Premium Venue Marketplace
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Additional Lucide Icon not in standard set but used above
function Building2({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function ArrowRight({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
