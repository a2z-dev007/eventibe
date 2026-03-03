"use client";

import Image from "next/image";
import Link from "next/link";
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
} from "lucide-react";

export default function TermsAndConditionsPage() {
  const sections = [
    { id: "about", label: "1. About the Platform", icon: Info },
    { id: "eligibility", label: "2. Eligibility", icon: UserCheck },
    { id: "accounts", label: "3. User Accounts", icon: Lock },
    { id: "role", label: "4. Platform Role & Limitation", icon: ShieldAlert },
    { id: "inquiry", label: "5. Inquiry Submission Terms", icon: FileText },
    { id: "listing", label: "6. Listing Terms", icon: Briefcase },
    {
      id: "payments",
      label: "7. Payments & Commissions",
      icon: CircleDollarSign,
    },
    { id: "conduct", label: "8. User Conduct", icon: UserX },
    { id: "property", label: "9. Intellectual Property", icon: Copyright },
    { id: "third-party", label: "10. Third-Party Content", icon: ExternalLink },
    {
      id: "disclaimer",
      label: "11. Disclaimer of Warranties",
      icon: AlertTriangle,
    },
    { id: "liability", label: "12. Limitation of Liability", icon: Scale },
    { id: "indemnification", label: "13. Indemnification", icon: ShieldCheck },
    { id: "refund", label: "14. Cancellation & Refund", icon: RefreshCw },
    { id: "termination", label: "15. Termination", icon: Power },
    { id: "force-majeure", label: "16. Force Majeure", icon: CloudLightning },
    { id: "law", label: "17. Governing Law", icon: Gavel },
    { id: "modifications", label: "18. Modifications", icon: Edit },
    { id: "privacy", label: "19. Privacy", icon: Shield },
    { id: "contact", label: "20. Contact Information", icon: Mail },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center overflow-hidden bg-primary-navy">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Terms and Conditions"
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

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
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

            <div className="inline-flex items-center gap-2 px-4 py-2 ml-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 animate-fade-in shadow-xl backdrop-blur-sm">
              <ShieldAlert size={14} />
              <span>Legal Agreement</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in tracking-tight">
              Terms &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Conditions
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium mx-auto md:mx-0">
              Please read these terms carefully before using our platform. By
              accessing Eventibe, you agree to be bound by these rules.
            </p>
          </div>
        </div>
      </section>

      {/* Meta Info Section */}
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

            <div className="hidden lg:flex items-center gap-2 text-soft-slate text-sm font-medium italic">
              <FileText size={16} className="text-corporate-blue" />
              Applies to Eventibe.com & VenueForEvent.com
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-16 pb-12 md:pb-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-6">
              <div className="bg-light-bg p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="text-primary-navy font-black text-lg mb-6 border-b border-gray-200 pb-4">
                  Quick Navigation
                </h3>
                <nav className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {sections.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-2 text-soft-slate hover:text-accent-orange font-bold text-sm transition-colors group py-1.5"
                    >
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform shrink-0"
                      />
                      <span className="truncate">{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-primary-navy text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-corporate-blue/20 rounded-full -mt-12 -mr-12"></div>
                <h4 className="text-xl font-bold mb-4 relative z-10">
                  Legal Questions?
                </h4>
                <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                  Our legal team is here to help you understand our terms.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                >
                  Contact Us <Mail size={16} />
                </Link>
              </div>
            </aside>

            {/* Main Content */}
            <main className="lg:col-span-8 space-y-16">
              {/* Introduction */}
              <div className="bg-light-bg p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <div className="space-y-6 text-soft-slate text-base md:text-lg leading-relaxed font-bold text-center md:text-left">
                  <p>
                    These Terms & Conditions (&quot;Terms&quot;) govern your
                    access to and use of:
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 bg-white/50 p-6 md:p-0 rounded-2xl md:rounded-none border border-gray-100 md:border-none">
                    <div className="flex flex-col items-center md:items-start gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-black">
                        Official URL
                      </span>
                      <span className="text-primary-navy font-black text-lg md:text-base underline decoration-accent-orange/30">
                        Eventibe.com
                      </span>
                    </div>
                    <div className="w-12 h-px md:w-px md:h-10 bg-gray-200"></div>
                    <div className="flex flex-col items-center md:items-start gap-1">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-accent-orange font-black">
                        Official URL
                      </span>
                      <span className="text-primary-navy font-black text-lg md:text-base underline decoration-accent-orange/30">
                        VenueForEvent.com
                      </span>
                    </div>
                  </div>
                  <p className="text-xs md:text-sm font-medium opacity-70">
                    (collectively referred to as the “Platform”, “Website”,
                    “We”, “Us”, or “Our”).
                  </p>
                  <p className="border-l-0 md:border-l-4 border-accent-orange px-6 md:pl-4 text-primary-navy font-black italic bg-white p-6 md:bg-white/50 py-5 md:py-3 rounded-2xl md:rounded-r-lg text-sm md:text-base shadow-sm md:shadow-none border border-gray-100 md:border-none">
                    By accessing or using the Platform, you agree to be legally
                    bound by these Terms. If you do not agree, you must not use
                    the Platform.
                  </p>
                </div>
              </div>

              {/* 1. ABOUT THE PLATFORM */}
              <div id="about" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Info size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    1. ABOUT THE PLATFORM
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
              </div>

              {/* 2. ELIGIBILITY */}
              <div id="eligibility" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <UserCheck size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    2. ELIGIBILITY
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
              </div>

              {/* 3. USER ACCOUNTS */}
              <div id="accounts" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Lock size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    3. USER ACCOUNTS (IF APPLICABLE)
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
              </div>

              {/* 4. PLATFORM ROLE & LIMITATION */}
              <div id="role" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <ShieldAlert size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    4. PLATFORM ROLE & LIMITATION
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
              </div>

              {/* 5. INQUIRY SUBMISSION TERMS */}
              <div id="inquiry" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <FileText size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    5. INQUIRY SUBMISSION TERMS
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
              </div>

              {/* 6. LISTING TERMS */}
              <div id="listing" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Briefcase size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    6. LISTING TERMS (FOR VENDORS)
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
              </div>

              {/* 7. PAYMENTS & COMMISSIONS */}
              <div id="payments" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <CircleDollarSign size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    7. PAYMENTS & COMMISSIONS
                  </h2>
                </div>
                <div className="space-y-6">
                  <div className="p-8 bg-gradient-to-br from-accent-orange to-orange-600 rounded-[2.5rem] text-white shadow-xl">
                    <h3 className="text-lg font-bold mb-4">
                      If future payment integrations are enabled:
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "The Platform may charge listing fees, subscription fees, or commissions.",
                        "Applicable taxes will be added as per law.",
                        "Refund policies will apply as per the Refund Policy page.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-medium text-sm md:text-base text-gray-100"
                        >
                          <Zap
                            size={18}
                            className="text-white shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl italic text-soft-slate text-sm font-medium">
                    We are not responsible for disputes between users and
                    vendors unless payment was processed directly through us.
                  </div>
                </div>
              </div>

              {/* 8. USER CONDUCT */}
              <div id="conduct" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                    <UserX size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    8. USER CONDUCT
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
              </div>

              {/* 9. INTELLECTUAL PROPERTY */}
              <div id="property" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Copyright size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    9. INTELLECTUAL PROPERTY
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                      {[
                        "Copy",
                        "Modify",
                        "Distribute",
                        "Reproduce",
                        "Republish",
                      ].map((item) => (
                        <div
                          key={item}
                          className="p-5 md:p-3 bg-white rounded-2xl md:rounded-xl text-center shadow-sm border border-gray-100 text-sm md:text-xs font-black md:font-bold text-soft-slate"
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
              </div>

              {/* 10. THIRD-PARTY CONTENT */}
              <div id="third-party" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <ExternalLink size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    10. THIRD-PARTY CONTENT
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
              </div>

              {/* 11 & 12: DISCLAIMER & LIABILITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  id="disclaimer"
                  className="scroll-mt-32 p-10 bg-white rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-orange-50 flex items-center justify-center text-accent-orange mb-8 group-hover:scale-110 transition-transform">
                    <AlertTriangle size={32} className="md:w-7 md:h-7" />
                  </div>
                  <h2 className="text-xl md:text-xl font-black text-primary-navy mb-6 uppercase leading-[1.1] md:leading-tight">
                    11. DISCLAIMER
                  </h2>
                  <p className="text-base md:text-sm text-soft-slate font-bold md:font-medium leading-relaxed mb-6 flex-grow">
                    The Platform is provided on an &quot;as is&quot; and
                    &quot;as available&quot; basis. We do not warrant
                    uninterrupted service or 100% accuracy of listings.
                  </p>
                  <p className="text-xs md:text-xs text-accent-orange font-black italic bg-orange-50 p-6 md:p-4 rounded-2xl md:rounded-xl w-full">
                    Users engage with vendors at their own discretion and risk.
                  </p>
                </div>

                <div
                  id="liability"
                  className="scroll-mt-32 p-10 bg-primary-navy text-white rounded-[3rem] md:rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all group relative overflow-hidden flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full -mt-16 -mr-16"></div>
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white/10 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform relative z-10">
                    <Scale size={32} className="md:w-7 md:h-7" />
                  </div>
                  <h2 className="text-xl md:text-xl font-black mb-6 uppercase relative z-10 leading-[1.1] md:leading-tight">
                    12. LIABILITY
                  </h2>
                  <p className="text-base md:text-sm text-gray-400 font-bold md:font-medium leading-relaxed mb-6 flex-grow relative z-10">
                    To the maximum extent permitted by law, the Platform shall
                    not be liable for direct or indirect damages, loss of
                    business, or disputes between parties.
                  </p>
                  <p className="text-xs md:text-xs text-gray-300 font-bold border-t border-white/10 pt-6 md:pt-4 relative z-10 w-full">
                    Liability is limited to amount paid directly to the
                    Platform.
                  </p>
                </div>
              </div>

              {/* 13. INDEMNIFICATION */}
              <div id="indemnification" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    13. INDEMNIFICATION
                  </h2>
                </div>
                <div className="p-8 md:p-8 bg-green-50 rounded-[3rem] md:rounded-[2.5rem] border border-green-100 text-center md:text-left">
                  <p className="text-soft-slate font-bold md:font-medium leading-relaxed text-sm md:text-base">
                    You agree to indemnify and hold harmless the Platform, its
                    owners, and affiliates against any claims, losses, or
                    liabilities arising from misrepresentation, violation of
                    law, or breach of these Terms.
                  </p>
                </div>
              </div>

              {/* 14 & 15: REFUND & TERMINATION */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  id="refund"
                  className="scroll-mt-32 p-10 md:p-8 bg-light-bg rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center md:items-start text-center md:text-left"
                >
                  <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-6 border border-gray-100">
                    <RefreshCw size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-lg md:text-lg font-black text-primary-navy mb-4 leading-[1.1] md:leading-tight">
                    14. CANCELLATION
                  </h2>
                  <p className="text-base md:text-sm text-soft-slate font-bold md:font-medium leading-relaxed mb-6 flex-grow">
                    Inquiry submissions are non-binding. Listing fee refunds
                    follow the Refund Policy.
                  </p>
                  <p className="text-[10px] uppercase tracking-widest font-black text-corporate-blue bg-corporate-blue/10 p-4 md:p-3 rounded-xl md:rounded-lg text-center w-full">
                    Check Refund Policy
                  </p>
                </div>

                <div
                  id="termination"
                  className="scroll-mt-32 p-10 md:p-8 bg-gray-50 rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group items-center md:items-start text-center md:text-left"
                >
                  <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-600 mb-6 border border-gray-100 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Power size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-lg md:text-lg font-black text-primary-navy mb-4 leading-[1.1] md:leading-tight">
                    15. TERMINATION
                  </h2>
                  <p className="text-base md:text-sm text-soft-slate font-bold md:font-medium leading-relaxed mb-6 flex-grow">
                    We reserve the right to suspend access, remove listings, or
                    block IP access for policy violations without prior notice.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-600">
                      Strict Enforcement
                    </span>
                  </div>
                </div>
              </div>

              {/* 16. FORCE MAJEURE */}
              <div id="force-majeure" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <CloudLightning size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    16. FORCE MAJEURE
                  </h2>
                </div>
                <div className="p-10 md:p-8 bg-primary-navy text-white rounded-[3rem] md:rounded-[2.5rem] relative overflow-hidden text-center md:text-left">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-corporate-blue/10 rounded-full -mt-16 -ml-16"></div>
                  <p className="text-gray-400 font-bold mb-8 md:mb-6 text-base md:text-sm relative z-10">
                    We are not liable for delays or failure caused by:
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-3 relative z-10">
                    {[
                      "Natural disasters",
                      "Government actions",
                      "Internet failures",
                      "Pandemics",
                      "War",
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-6 py-3 md:px-4 md:py-2 bg-white/10 rounded-2xl md:rounded-xl text-sm md:text-xs font-black md:font-bold text-gray-100 border border-white/10 shadow-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 17. GOVERNING LAW */}
              <div id="law" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Gavel size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    17. GOVERNING LAW
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-6 p-10 bg-light-bg rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 text-center md:text-left">
                  <div className="w-20 h-20 md:w-auto md:h-auto flex items-center justify-center rounded-3xl bg-white md:bg-transparent shadow-xl md:shadow-none border md:border-none border-gray-50">
                    <MapPin
                      size={48}
                      className="text-accent-orange opacity-60 md:opacity-20 shrink-0"
                    />
                  </div>
                  <div className="space-y-3 md:space-y-2">
                    <p className="text-sm md:text-base text-soft-slate font-bold md:font-medium leading-relaxed">
                      These Terms shall be governed by the laws of India. Any
                      disputes shall be subject to the exclusive jurisdiction of
                      courts located in{" "}
                      <span className="text-primary-navy font-black">
                        Indore, Madhya Pradesh
                      </span>
                      .
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] md:tracking-widest text-corporate-blue">
                      Judicial Center: India
                    </p>
                  </div>
                </div>
              </div>

              {/* 18 & 19: MODIFICATIONS & PRIVACY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  id="modifications"
                  className="scroll-mt-32 p-10 md:p-8 bg-white rounded-[3rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col group items-center md:items-start text-center md:text-left"
                >
                  <div className="w-14 h-14 md:w-12 md:h-12 shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-corporate-blue mb-6 border border-gray-100 group-hover:bg-accent-orange group-hover:text-white transition-all">
                    <Edit size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-lg md:text-lg font-black text-primary-navy mb-4">
                    18. MODIFICATIONS
                  </h2>
                  <p className="text-base md:text-sm text-soft-slate font-bold md:font-medium leading-relaxed mb-4 flex-grow">
                    We may update these Terms at any time. Continued use of the
                    platform indicates acceptance of revised terms.
                  </p>
                </div>

                <div
                  id="privacy"
                  className="scroll-mt-32 p-10 md:p-8 bg-corporate-blue rounded-[3rem] md:rounded-[2.5rem] text-white shadow-lg flex flex-col group items-center md:items-start text-center md:text-left"
                >
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 border border-white/10 group-hover:bg-white group-hover:text-corporate-blue transition-all">
                    <Shield size={28} className="md:w-6 md:h-6" />
                  </div>
                  <h2 className="text-lg md:text-lg font-black mb-4 uppercase leading-[1.1] md:leading-tight">
                    19. PRIVACY
                  </h2>
                  <p className="text-base md:text-sm text-gray-200 font-bold md:font-medium leading-relaxed mb-8 flex-grow">
                    Use of the Platform is also governed by our Privacy Policy.
                    Please review it carefully.
                  </p>
                  <Link
                    href="/privacy-policy"
                    className="w-full md:w-auto text-center md:text-left text-xs font-black uppercase tracking-[0.2em] text-accent-orange hover:text-white flex items-center justify-center md:justify-start gap-2 group-hover:translate-x-1 transition-all"
                  >
                    View Privacy Policy <ChevronRight size={16} />
                  </Link>
                </div>
              </div>

              {/* 20. CONTACT INFORMATION */}
              <div id="contact" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="w-16 h-16 md:w-14 md:h-14 shrink-0 rounded-[1.5rem] md:rounded-2xl bg-white shadow-xl md:shadow-lg border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Mail size={28} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-[1.1] md:leading-tight">
                    20. CONTACT INFORMATION
                  </h2>
                </div>
                <div className="bg-light-bg rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
                  <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="space-y-3 text-center md:text-left">
                      <div className="flex items-center gap-2 text-corporate-blue font-black text-xs uppercase tracking-widest justify-center md:justify-start">
                        <Globe size={14} /> Platform
                      </div>
                      <p className="text-soft-slate font-bold text-sm">
                        Eventibe.com / VenueForEvent.com
                      </p>
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                      <div className="flex items-center gap-2 text-corporate-blue font-black text-xs uppercase tracking-widest justify-center md:justify-start">
                        <Mail size={14} /> Email
                      </div>
                      <a
                        href="mailto:support@eventibe.com"
                        className="text-soft-slate font-bold text-sm hover:text-accent-orange transition-colors underline md:no-underline"
                      >
                        support@eventibe.com
                      </a>
                    </div>
                    <div className="space-y-3 text-center md:text-left">
                      <div className="flex items-center gap-2 text-corporate-blue font-black text-xs uppercase tracking-widest justify-center md:justify-start">
                        <Phone size={14} /> Phone
                      </div>
                      <p className="text-soft-slate font-bold text-sm">
                        +91-8800842084
                      </p>
                    </div>
                  </div>
                  <div className="bg-white p-8 border-t border-gray-100 text-center md:text-left">
                    <div className="flex items-center gap-2 text-corporate-blue font-black text-xs uppercase tracking-widest mb-4 justify-center md:justify-start">
                      <MapPin size={14} /> Registered Office
                    </div>
                    <p className="text-soft-slate font-bold text-sm leading-relaxed max-w-lg mx-auto md:mx-0">
                      Samta Enclave, Near Mother Dairy, Qutub Vihar, Phase 1,
                      Sector 19, Dwarka, New Delhi – 110071, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Acceptance */}
              <div className="bg-primary-navy p-10 md:p-16 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-64 h-64 bg-accent-orange/10 rounded-full -mt-32 -ml-32 blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-corporate-blue/20 rounded-full -mb-32 -mr-32 blur-3xl"></div>

                <h2 className="text-3xl md:text-4xl font-black mb-6 relative z-10 leading-tight">
                  ACCEPTANCE
                </h2>
                <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
                  By accessing or using Eventibe.com or VenueForEvent.com, you
                  acknowledge that you have read, understood, and agreed to
                  these Terms & Conditions.
                </p>
                <Link
                  href="/"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-orange text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-[13px] md:text-sm uppercase tracking-[0.15em] md:tracking-widest hover:scale-105 transition-all shadow-2xl hover:shadow-accent-orange/40 relative z-10"
                >
                  I Understand & Accept
                </Link>
              </div>
            </main>
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
