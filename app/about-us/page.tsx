import Image from "next/image";
import Link from "next/link";
import {
  Users,
  MapPin,
  CheckCircle2,
  Target,
  Zap,
  Heart,
  ShieldCheck,
  Globe,
  Award,
  ChevronRight,
  MessageSquare,
  Phone,
  ArrowRight,
  Sparkles,
  Search,
  Building2,
  CalendarCheck,
  TrendingUp,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Quote,
  Layout,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CommonHero from "@/components/common/CommonHero";

export const metadata = {
  title: "About Us | Eventibe - India’s Premier Event & Venue Discovery",
  description:
    "Learn how Eventibe is transforming venue discovery and event planning across India with trust, transparency, and innovation.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen  bg-white">
      {/* Hero Section */}
      <CommonHero
        badgeText="India's Fastest Growing Venue Marketplace"
        badgeIcon="sparkles"
        titleMain="Welcome to Eventibe – India’s"
        titleHighlight="Premier Event & Venue"
        titleSuffix="Discovery Marketplace"
        subtitle="At Eventibe, we believe every celebration — whether a dream wedding, an unforgettable corporate event, or a heartfelt social gathering — deserves the perfect canvas. Choosing the right venue can truly make or break the experience, and that’s where Eventibe steps in."
        bgSrc="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
        alignment="center"
      >
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mt-3 sm:mt-6 w-full sm:w-auto justify-center">
          <Link
            href="/venues"
            className="bg-cta-gradient text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-center"
          >
            Explore Venues <ArrowRight size={20} />
          </Link>
          <Link
            href="/contact-us"
            className="bg-white/5 border border-white/10 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold hover:bg-white/10 transition-colors flex items-center justify-center text-center backdrop-blur-sm"
          >
            Contact Our Team
          </Link>
        </div>
      </CommonHero>

      {/* Intro Context */}
      <section className="flex items-center py-10 md:py-28 bg-light-bg overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Image Column - 60% Width */}
            <div className="relative w-full mx-auto lg:mx-0 lg:col-span-7 order-2 lg:order-1">
              <div className="aspect-[4/3] md:aspect-[3/2] max-h-[500px] md:max-h-[650px] rounded-[10px] md:rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] relative z-10 group">
                <Image
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                  alt="Corporate Event Planning"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/40 to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-accent-orange/15 rounded-full blur-[80px] md:blur-[100px] -z-10 animate-pulse-slow"></div>
              <div className="absolute -top-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-corporate-blue/10 rounded-full blur-[80px] md:blur-[100px] -z-10 animate-pulse-slow [animation-delay:1.5s]"></div>

              <div className="absolute top-1/2 -left-4 md:-left-12 bg-white p-4 md:p-8 rounded-[10px] md:rounded-3xl shadow-[0_20px_40px_-5px_rgba(0,0,0,0.1)] border border-gray-50 hidden sm:block animate-float z-30">
                <div className="flex items-center gap-3 md:gap-4 mb-2 md:mb-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 shadow-inner">
                    <CheckCircle2 size={20} className="md:w-6 md:h-6" />
                  </div>
                  <span className="font-extrabold text-primary-navy text-base md:text-lg">
                    100% Verified
                  </span>
                </div>
                <p className="text-xs md:text-sm text-soft-slate font-medium">
                  Thousands of Premium Venues across India
                </p>
              </div>
            </div>

            {/* Text Column - 40% Width */}
            <div className="space-y-6 md:space-y-10 lg:col-span-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-corporate-blue/5 border border-corporate-blue/10 text-corporate-blue text-[10px] md:text-xs font-bold uppercase tracking-widest">
                Our Foundation
              </div>
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-primary-navy leading-tight tracking-tight">
                  Discover Your{" "}
                  <span className="text-corporate-blue">Perfect Canvas</span>
                </h2>
                <p className="text-sm md:text-lg text-soft-slate leading-relaxed text-left">
                  We are India’s fastest-growing event and venue discovery
                  platform, built with the singular mission of connecting event
                  planners, couples, corporate teams, and experience seekers
                  with the best venues and services across cities.
                </p>
                <p className="text-sm md:text-lg text-soft-slate segment-highlight border-l-4 border-accent-orange pl-5 md:pl-6 my-6 md:my-8 py-2 font-semibold text-primary-navy text-left">
                  From lush wedding lawns to contemporary corporate conference
                  spaces — our platform curates locations tailored to your
                  unique needs.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
                <div className="p-4 md:p-6 rounded-[10px] md:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-corporate-blue/20 transition-all group">
                  <div className="text-3xl md:text-4xl font-black text-corporate-blue mb-1 md:mb-2 group-hover:scale-110 transition-transform origin-left">
                    500+
                  </div>
                  <div className="text-[10px] text-soft-slate font-extrabold uppercase tracking-widest">
                    Verified Venues
                  </div>
                </div>
                <div className="p-4 md:p-6 rounded-[10px] md:rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent-orange/20 transition-all group">
                  <div className="text-3xl md:text-4xl font-black text-accent-orange mb-1 md:mb-2 group-hover:scale-110 transition-transform origin-left">
                    20+
                  </div>
                  <div className="text-[10px] text-soft-slate font-extrabold uppercase tracking-widest">
                    Cities Covered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story & Mission */}
      <section className="flex items-center py-10 md:py-28 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center mb-6 md:mb-10">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Our Foundation
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-navy mb-6 tracking-tight text-center">
              Our Story – Why We Built Eventibe
            </h3>
            <p className="text-sm md:text-lg text-soft-slate text-left sm:text-center">
              Eventibe was founded by a team of passionate event professionals,
              tech innovators, and wedding industry strategists who have spent
              years working with venues, planners, and couples. We saw a
              recurring challenge in the event planning journey:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-primary-navy text-white rounded-[10px] md:rounded-[2rem] p-8 md:p-10 relative overflow-hidden group shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/20 rounded-full -mt-16 -mr-16 transition-transform group-hover:scale-150 duration-500"></div>
              <h4 className="text-2xl font-bold mb-4">Who We Are</h4>
              <p className="text-gray-300 mb-6 leading-relaxed italic text-xs md:text-base py-4 border-y border-white/10 uppercase font-light tracking-wide text-left">
                “Beautiful venues exist, but discovering them — in a trusted,
                transparent, and tailored way — is difficult.”
              </p>
              <p className="text-gray-400 mb-6 text-xs md:text-base leading-relaxed text-left">
                Unlike traditional directories or simple listing sites, we
                envisioned a platform that would be visual, inspiring, and
                searchable by real requirements.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Visual and inspiring",
                  "Searchable by real requirements",
                  "Trusted through curated content",
                  "Easy to explore without clutter",
                  "Focused on authentic user experience",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-sm font-medium"
                  >
                    <div className="w-5 h-5 rounded-full bg-accent-orange/20 flex items-center justify-center text-accent-orange">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gray-400 mb-6 mt-5 text-xs md:text-base leading-relaxed text-left">
                And so Eventibe was born — not just a directory, but a discovery
                engine for celebrations and professional experiences.
              </p>
            </div>

            <div className="bg-light-bg rounded-[10px] md:rounded-[2rem] p-8 md:p-10 relative overflow-hidden group border border-gray-100 shadow-sm">
              <h4 className="text-2xl font-bold text-primary-navy mb-4">
                Our Core Mission
              </h4>
              <p className="text-soft-slate mb-6 leading-relaxed text-xs md:text-base text-left">
                Our mission is simple yet profound: To make venue discovery
                seamless, joyful, and trustworthy for everyone — from couples
                planning a wedding to corporate teams organizing large-scale
                events.
              </p>
              <div className="space-y-4">
                <div className="text-xs font-bold text-primary-navy uppercase tracking-widest mb-2 opacity-70">
                  We stand for:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                  {[
                    {
                      title: "Transparency",
                      icon: ShieldCheck,
                      color: "text-blue-500",
                    },
                    {
                      title: "Diversity of choices",
                      icon: Globe,
                      color: "text-green-500",
                    },
                    {
                      title: "Ease of selection",
                      icon: Zap,
                      color: "text-yellow-500",
                    },
                    {
                      title: "Inspiration and insight",
                      icon: Target,
                      color: "text-purple-500",
                    },
                    {
                      title: "Trust and reliability",
                      icon: Heart,
                      color: "text-red-500",
                    },
                  ].map((val, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 group/item"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 ${val.color} group-hover/item:scale-110 transition-transform`}
                      >
                        <val.icon size={20} />
                      </div>
                      <span className="font-bold text-primary-navy text-sm md:text-base">
                        {val.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="flex items-center py-10 md:py-28 bg-primary-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-6 tracking-tight text-center">
              What We Do
            </h2>
            <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto text-center">
              At Eventibe, We empower users with tools, filters, insights, and
              inspiration so they can confidently choose the perfect venue for
              any occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="bg-white/5 border border-white/10 rounded-[10px] md:rounded-3xl p-8 md:p-12 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-corporate-blue rounded-2xl flex items-center justify-center mb-4 md:mb-8 shrink-0 mx-auto md:mx-0">
                <Search className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                Venue Discovery Simplified
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-8 leading-relaxed text-left">
                Our venue marketplace connects you with hundreds of verified
                venues across cities, including Banquet halls, Wedding lawns,
                Luxury resorts, and Conference centers, Corporate event spaces,
                Indoor and outdoor venues, Exclusive destination properties
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="space-y-3">
                  <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-2 text-left md:text-left">
                    Showcased with
                  </div>
                  {[
                    "High-resolution photo",
                    "Detailed descriptions",
                    "Capacity & layout",
                    "Pricing insights",
                    "Event-type suitability",
                    "Amenities and service features",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-2 text-sm text-gray-300 text-left"
                    >
                      <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" /> <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="text-xs font-bold text-accent-orange uppercase tracking-wider mb-2 text-left md:text-left">
                    Filter by
                  </div>
                  {[
                    "City & Event type (wedding, corporate, social)",
                    "Seating capacity",
                    "Venue type (indoor / outdoor / resort / farmhouse)",
                    "Budget range",
                    "Facilities & Extras",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-2 text-sm text-gray-300 text-left"
                    >
                      <CheckCircle2 size={14} className="text-blue-400 shrink-0 mt-0.5" /> <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[10px] md:rounded-3xl p-8 md:p-12 flex flex-col items-center text-center md:items-start md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent-orange rounded-2xl flex items-center justify-center mb-4 md:mb-8 shadow-lg shadow-orange-500/20 shrink-0 mx-auto md:mx-0">
                <Sparkles className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-center md:text-left">
                Inspiration for Every Celebration
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-8 leading-relaxed text-left">
                Beyond pure listings, Eventibe also inspires you with curated
                editorial content, trend guides, and success stories.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 text-left w-full">
                {[
                  "Editorial guides for choosing venues",
                  "Trend articles on decor and event design",
                  "Seasonal planning tips",
                  "Vendor recommendations and trends",
                  "Success stories and real events",
                ].map((item, idx) => (
                  <li
                    key={item}
                    className={`flex items-start gap-4 p-4 bg-white/5 rounded-[10px] md:rounded-xl border border-white/5 hover:border-white/20 transition-colors ${
                      idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-orange shrink-0 mt-2"></div>
                    <span className="font-medium text-xs sm:text-sm text-left">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-corporate-blue/20 border border-corporate-blue/30 rounded-[10px] md:rounded-xl text-xs sm:text-sm italic text-blue-200 text-left">
                "This editorial dimension sets Eventibe apart — we blend
                inspiration with discovery."
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="flex items-center py-10 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4 text-center lg:text-left">
                The Future
              </h2>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-navy mb-6 tracking-tight text-center lg:text-left">
                Our Vision – Where We’re Headed
              </h3>
              <p className="text-base lg:text-xl text-soft-slate leading-relaxed mb-8 font-semibold text-center lg:text-left">
                Our long-term vision includes:
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-4 p-4 rounded-[10px] md:rounded-2xl bg-light-bg border border-gray-100">
                  <div className="w-10 h-10 mt-1 rounded-lg bg-corporate-blue/10 flex items-center justify-center text-corporate-blue shrink-0">
                    <Globe size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-primary-navy">
                      Scalable Tech
                    </div>
                    <div className="text-sm text-soft-slate">
                      Built for performance and ease
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-[10px] md:rounded-2xl bg-light-bg border border-gray-100">
                  <div className="w-10 h-10 mt-1 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-primary-navy">
                      Human Centric
                    </div>
                    <div className="text-sm text-soft-slate">
                      Personalized support always
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[10px] md:rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-stretch text-left shadow-sm">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-navy mb-4 md:mb-6 border border-gray-100 shrink-0 mx-auto md:mx-0">
                  <Building2 className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
                  A Full Event Planning Ecosystem
                </h4>
                <p className="text-xs md:text-sm font-bold text-primary-navy mb-4 text-left">
                  We are building:
                </p>
                <ul className="space-y-3 text-left">
                  {[
                    "Vendor listings — Catering, Photography, Decor, Mehndi Artists, Entertainment, Lighting, Tenting, and more",
                    "City-specific curated experiences",
                    "Corporate event management tools",
                    "Custom inquiry insights and sales support",
                    "Advanced search by guest count, layout, and event style",
                  ].map((t) => (
                    <li
                      key={t}
                      className="text-xs md:text-sm text-soft-slate flex items-start gap-2 text-left"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-accent-orange shrink-0 mt-0.5"
                      />{" "}
                      <span className="text-left">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-8 rounded-[10px] md:rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-stretch text-left shadow-sm">
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-primary-navy mb-4 md:mb-6 border border-gray-100 shrink-0 mx-auto md:mx-0">
                  <Zap className="w-5 h-5 md:w-7 md:h-7" />
                </div>
                <h4 className="text-lg md:text-xl font-bold mb-4 text-center md:text-left">
                  Technology-Driven, Yet Human-Centric
                </h4>
                <p className="text-xs md:text-sm text-soft-slate mb-4 leading-relaxed font-medium text-left">
                  We believe technology should enhance human decisions, not
                  replace them.
                </p>
                <p className="text-xs md:text-sm font-bold text-primary-navy mb-4 text-left">
                  Our team blends:
                </p>
                <ul className="space-y-3 text-left">
                  {[
                    "User-centric design",
                    "Scalable technology",
                    "Personalized recommendations",
                    "Adaptive search intelligence",
                    "Local insights for every city",
                    "We are committed to staying ahead of industry trends and user expectations.",
                  ].map((t) => (
                    <li
                      key={t}
                      className="text-xs md:text-sm text-soft-slate flex items-start gap-2 text-left"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-corporate-blue shrink-0 mt-0.5"
                      />{" "}
                      <span className="text-left">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Support Section */}
      <section className="flex items-center py-10 md:py-28 bg-light-bg border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-navy mb-6 tracking-tight text-center">
              How Eventibe Supporting Different Users
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-[10px] md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-stretch text-left">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-4 md:mb-8 border border-pink-100 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-500 shrink-0 mx-auto md:mx-0">
                <Heart className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-primary-navy mb-6 text-center md:text-left">
                For Couples and Social Planners
              </h4>
              <p className="text-xs md:text-base text-soft-slate mb-8 leading-relaxed text-left">
                Wedding planning is emotional, detailed, and personal. Eventibe
                helps you visualize venues, compare options, and connect
                directly with managers.
              </p>
              <div className="space-y-4">
                {[
                  "Visualize venues before visiting",
                  "Compare multiple options at once",
                  "Shortlist based on real needs (guest size, venue vibe, budget)",
                  "Discover trends and inspiration",
                  "Direct inquiry with venue managers",
                  "We empower couples to make informed, confident decisions with our curated content and easy-to-use filtering.",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 font-medium text-primary-navy/80 text-left"
                  >
                    <div className="w-6 h-6 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 shrink-0 mt-0.5">
                      <ChevronRight size={14} />
                    </div>
                    <span className="text-xs md:text-base text-left">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-10 rounded-[10px] md:rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col items-stretch text-left">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-corporate-blue mb-4 md:mb-8 border border-blue-100 group-hover:bg-corporate-blue group-hover:text-white transition-colors duration-500 shrink-0 mx-auto md:mx-0">
                <Building2 className="w-5 h-5 md:w-8 md:h-8" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold text-primary-navy mb-6 text-center md:text-left">
                For Corporate and Business Events
              </h4>
              <p className="text-xs md:text-base text-soft-slate mb-8 leading-relaxed text-left">
                Professional events require structure and precision. We enable
                corporate planners to find venues that fit both logistics and
                brand identity.
              </p>
              <div className="space-y-4">
                {[
                  "Search layout (theatre, classroom, boardroom)",
                  "Find Locations with AV & technical support",
                  "Filter by seating capacity and facilities",
                  "Identify venues with lodging options",
                  "Verified corporate-standard partners",
                ].map((t) => (
                  <div
                    key={t}
                    className="flex items-start gap-3 font-medium text-primary-navy/80 text-left"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-corporate-blue shrink-0 mt-0.5">
                      <ChevronRight size={14} />
                    </div>
                    <span className="text-xs md:text-base text-left">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Eventibe */}
      <section className="flex items-center py-10 md:py-28 bg-white overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-primary-navy mb-4 tracking-tight text-center">
              Why Choose Eventibe
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {[
              {
                num: "1",
                title: "Curated Listings — Not Just Random Options",
                intro: "Every venue on Eventibe is:",
                points: [
                  "Verified for authenticity",
                  "Mapped to detailed event features",
                  "Shown with real photos and verified data",
                ],
                footer:
                  "This curation ensures quality and trust — no filler content, no spammy listings.",
                icon: ShieldCheck,
              },
              {
                num: "2",
                title: "Easy, Intuitive Discovery",
                intro: "With advanced filters and intuitive UI, you can:",
                points: [
                  "Narrow search quickly",
                  "View multiple venues side by side",
                  "Access capacity charts and amenities",
                  "Review detailed descriptions in one place",
                ],
                footer: "",
                icon: Search,
              },
              {
                num: "3",
                title: "SEO-Optimized Content Backed by Real Insights",
                intro:
                  "Unlike automated directory platforms, our site content is created with:",
                points: [
                  "Human editors",
                  "Real industry insight",
                  "SEO best practices",
                  "Locally relevant city landing pages",
                ],
                footer:
                  "This ensures that your searches lead to reliable and actionable content.",
                icon: Award,
              },
              {
                num: "4",
                title: "Responsive Support and Follow-Up",
                intro: "We provide:",
                points: [
                  "Dedicated assistance for inquiries",
                  "Follow-up support for venue outreach",
                  "Guidance for first-time planners",
                  "Tools to organize your shortlist",
                ],
                footer: "",
                icon: MessageSquare,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group p-8 rounded-[10px] md:rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-500 h-full flex flex-col items-stretch text-left"
              >
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center font-black text-sm text-accent-orange z-10 group-hover:bg-accent-orange group-hover:text-white transition-colors">
                  {item.num}
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-4 md:mb-6 group-hover:scale-110 transition-transform shrink-0 mx-auto md:mx-0">
                  <item.icon className="w-5 h-5 md:w-6.5 md:h-6.5" />
                </div>
                <h4 className="text-sm md:text-lg font-black text-primary-navy mb-5 leading-tight text-left">
                  {item.title}
                </h4>
                <div className="space-y-4 mb-6 flex-1 text-left">
                  <p className="text-[10px] font-bold text-soft-slate uppercase tracking-wider text-left">
                    {item.intro}
                  </p>
                  <ul className="space-y-2.5">
                    {item.points.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-soft-slate"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-accent-orange shrink-0 mt-0.5"
                        />
                        <span className="text-[13px] font-medium leading-tight">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                {item.footer && (
                  <p className="text-[11px] text-soft-slate italic bg-light-bg p-3 rounded-lg border border-gray-100 leading-snug mt-auto">
                    {item.footer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="flex items-center py-10 md:py-28 bg-primary-navy text-white relative overflow-hidden">
        {/* Decorative Background Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-corporate-blue/10 rounded-full blur-[120px] -ml-64 -mt-24"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-[120px] -mr-64 -mb-24"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-10 md:mb-20">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Our Team
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-6xl font-black mb-6 md:mb-8 tracking-tight text-center">
              Experts You Can Trust
            </h3>
            <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-center">
              Eventibe is built by a passionate team of professionals with
              diverse expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-10 rounded-[10px] md:rounded-[3rem] bg-white/5 border border-white/10 relative group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-stretch text-left">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-accent-orange mb-4 md:mb-8 group-hover:scale-110 transition-transform shrink-0 mx-auto md:mx-0">
                <Users className="w-5 h-5 md:w-10 md:h-10" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                Event Industry Veterans
              </h4>
              <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-4 text-left">
                Our advisors and content strategists have experience in:
              </p>
              <ul className="space-y-3 text-left">
                {[
                  "Weddings and social celebrations",
                  "Corporate event planning",
                  "Large-scale venue operations",
                  "Vendor partnerships",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-300 text-left"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-accent-orange shrink-0 mt-0.5"
                    />
                    <span className="text-xs md:text-sm font-medium text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 rounded-[10px] md:rounded-[3rem] bg-white/5 border border-white/10 relative group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-stretch text-left">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400 mb-4 md:mb-8 group-hover:scale-110 transition-transform shrink-0 mx-auto md:mx-0">
                <Zap className="w-5 h-5 md:w-10 md:h-10" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                Technology and Design Experts
              </h4>
              <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-4 text-left">
                Our tech team has crafted Eventibe with:
              </p>
              <ul className="space-y-3 text-left">
                {[
                  "Scalable architecture",
                  "Smooth UX workflows",
                  "Intuitive search and recommendation logic",
                  "Fast performance",
                  "Mobile-friendly design",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-300 text-left"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-blue-400 shrink-0 mt-0.5"
                    />
                    <span className="text-xs md:text-sm font-medium text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 rounded-[10px] md:rounded-[3rem] bg-white/5 border border-white/10 relative group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 flex flex-col items-stretch text-left">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-green-500 mb-4 md:mb-8 group-hover:scale-110 transition-transform shrink-0 mx-auto md:mx-0">
                <MapPin className="w-5 h-5 md:w-10 md:h-10" />
              </div>
              <h4 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
                Local Market Specialists
              </h4>
              <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider mb-4 text-left">
                Our local specialists ensure content is:
              </p>
              <ul className="space-y-3 text-left">
                {[
                  "Regionally relevant",
                  "SEO optimized",
                  "Contextually accurate",
                  "Social and corporate event friendly",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-gray-300 text-left"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-green-500 shrink-0 mt-0.5"
                    />
                    <span className="text-xs md:text-sm font-medium text-left">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics & Values */}
      <section className="flex items-center py-10 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-primary-navy mb-8 tracking-tight text-center lg:text-left">
                Ethical Standards and Community Commitment
              </h3>
              <p className="text-sm md:text-lg text-soft-slate mb-10 leading-relaxed text-center lg:text-left">
                We believe in responsible digital ecosystems. We are committed
                to uplifting small and medium venue owners, service providers,
                and independent vendors.
              </p>

              <div className="space-y-6">
                <div className="p-6 rounded-[10px] md:rounded-2xl bg-light-bg border border-gray-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 text-blue-500 mx-auto md:mx-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary-navy mb-1 text-center md:text-left">
                      Trust and Transparency
                    </h5>
                    <p className="text-xs md:text-sm text-soft-slate text-center md:text-left">
                      Real verification, transparent contacts, Respect for user
                      privacy, and data protection.
                    </p>
                  </div>
                </div>
                <div className="p-6 rounded-[10px] md:rounded-2xl bg-light-bg border border-gray-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-5">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 text-green-500 mx-auto md:mx-0">
                    <Heart size={24} />
                  </div>
                  <div>
                    <h5 className="font-bold text-primary-navy mb-1 text-center md:text-left">
                      Supporting Local Enterprises
                    </h5>
                    <p className="text-xs md:text-sm text-soft-slate text-center md:text-left">
                      Equal visibility and digital tools for local vendors and
                      lesser-known venues.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-navy p-10 md:p-14 rounded-[10px] md:rounded-[3rem] text-white">
              <h3 className="text-3xl font-bold mb-10 text-center">
                Our Values
              </h3>
              <div className="space-y-8">
                {[
                  {
                    t: "User First",
                    d: "Your experience matters – from search to shortlist.",
                  },
                  {
                    t: "Quality Over Quantity",
                    d: "We list with purpose, not for volume.",
                  },
                  {
                    t: "Integrity & Authenticity",
                    d: "Authentic descriptions, verified content only.",
                  },
                  {
                    t: "Innovation With Purpose",
                    d: "Tech that solves real planning problems.",
                  },
                  {
                    t: "Local Knowledge, Global Standards",
                    d: "We understand Indian realities with a global outlook.",
                  },
                ].map((v, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="text-accent-orange font-bold text-xl opacity-50 mt-1">
                      0{i + 1}
                    </div>
                    <div>
                      <h6 className="font-extrabold text-lg mb-2">{v.t}</h6>
                      <p className="text-gray-400 text-xs md:text-sm text-left">{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="flex items-center py-10 md:py-28 bg-light-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Feedback
            </h2>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary-navy mb-4 tracking-tight text-center">
              Testimonials – What Our Users Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "Eventibe helped us find our dream wedding venue within days — faster than we expected!",
                name: "Priya & Arjun",
                city: "Delhi",
              },
              {
                text: "For corporate conferences, filtering by capacity and amenities was a game changer.",
                name: "Rohan",
                city: "Event Manager, Bangalore",
                isCorporate: true,
              },
              {
                text: "The inspiration guides and trends helped us pick vendors with confidence.",
                name: "Neha",
                city: "Wedding Planner, Mumbai",
              },
            ].map((test, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[10px] md:rounded-[2rem] shadow-sm border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="mb-6 text-accent-orange opacity-40">
                  <Quote size={40} className="fill-current" />
                </div>
                <p className="text-primary-navy font-medium italic mb-8 leading-relaxed">
                  "{test.text}"
                </p>
                <div className="mt-auto">
                  <div className="font-extrabold text-primary-navy">
                    {test.name}
                  </div>
                  <div className="text-sm text-soft-slate">{test.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="flex items-center py-10 md:py-28 bg-primary-navy relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-corporate-blue/10 rounded-full blur-[150px] opacity-50"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 tracking-tight text-center">
              FAQs – <span className="text-accent-orange">About Eventibe</span>
            </h3>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto text-left sm:text-center">
              Everything you need to know about our marketplace and how to make
              the most of your event planning journey.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "What makes Eventibe different from other venue platforms?",
                  a: "We combine curated listings, editorial content, advanced filtering, and tailored search options — making Eventibe both a discovery and inspiration engine.",
                },
                {
                  q: "Can I contact venues directly?",
                  a: "Yes — once you submit an inquiry, venue representatives will engage with you based on your requirements.",
                },
                {
                  q: "Is Eventibe free to use?",
                  a: "Yes, browsing and inquiries are completely free for users.",
                },
                {
                  q: "Can I list my venue or service?",
                  a: "Absolutely — you can use our 'List Your Venue' or 'List Your Service' pages to register your business.",
                },
                {
                  q: "Do you provide corporate event planning support?",
                  a: "We provide venue discovery and recommendations — event execution support can be provided by our listed vendors.",
                },
              ].map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-white/10 rounded-[10px] md:rounded-[2.5rem] overflow-hidden bg-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.08] data-[state=open]:bg-white/10 [data-state=open]:border-accent-orange/30 group/item"
                >
                  <AccordionTrigger className="text-left font-bold text-white py-8 px-10 hover:no-underline hover:text-accent-orange transition-colors duration-300 [&[data-state=open]]:text-accent-orange">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-10 px-10 leading-relaxed text-sm md:text-lg border-t border-white/5 text-left">
                    <div className="pt-6">{faq.a}</div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Connect With Us / CTA */}
      <section className="flex items-center py-10 md:py-28 bg-light-bg relative overflow-hidden border-t border-gray-100">
        {/* Abstract Background Orbs using Theme Colors */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-corporate-blue/10 rounded-full blur-[120px] -mr-64 -mt-32 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[120px] -ml-64 -mb-32 animate-pulse-slow [animation-delay:2s]"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
            {/* Left Content: Branding (5 Cols) */}
            <div className="lg:col-span-5 space-y-8 lg:space-y-12 text-center lg:text-left text-primary-navy">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-corporate-blue text-xs font-black uppercase tracking-[0.2em]">
                  <Sparkles size={14} className="text-accent-orange" />
                  Let's Collaborate
                </div>
                <h3 className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight text-center lg:text-left">
                  Connect <br />
                  <span className="text-corporate-blue">With Eventibe</span>
                </h3>
                <p className="text-soft-slate text-sm md:text-xl leading-relaxed max-w-md mx-auto lg:mx-0 text-center lg:text-left">
                  Join India's most innovative event marketplace. Whether you're
                  a planner or a venue, we're here to grow with you.
                </p>
              </div>

              <div className="space-y-4 lg:space-y-8">
                <div className="grid grid-cols-1 gap-5">
                  <a
                    href="mailto:support@eventibe.com"
                    className="flex items-center gap-4 md:gap-6 p-4 rounded-[10px] md:rounded-2xl hover:bg-white transition-all group justify-start text-left max-w-[320px] mx-auto w-full lg:mx-0 lg:max-w-none"
                  >
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-corporate-blue/10 flex items-center justify-center shrink-0 text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white transition-all duration-300">
                      <Mail className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-soft-slate uppercase tracking-widest mb-1">
                        Direct Email
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold">
                        support@eventibe.com
                      </div>
                    </div>
                  </a>
                  <a
                    href="tel:+911234567890"
                    className="flex items-center gap-4 md:gap-6 p-4 rounded-[10px] md:rounded-2xl hover:bg-white transition-all group justify-start text-left max-w-[320px] mx-auto w-full lg:mx-0 lg:max-w-none"
                  >
                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-2xl bg-accent-orange/10 flex items-center justify-center shrink-0 text-accent-orange group-hover:bg-accent-orange group-hover:text-white transition-all duration-300">
                      <Phone className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-soft-slate uppercase tracking-widest mb-1">
                        Helpline Number
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold">
                        +91 (0) 123 456 7890
                      </div>
                    </div>
                  </a>
                </div>

                <div className="flex justify-center lg:justify-start gap-4 pt-4">
                  {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <Link
                      key={i}
                      href="#"
                      className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-primary-navy hover:text-corporate-blue hover:border-corporate-blue/30 transition-all font-bold"
                    >
                      <Icon size={18} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content: Action Hub Card (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[10px] md:rounded-[3rem] p-8 md:p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.08)] border border-gray-50 relative overflow-hidden group">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-corporate-blue/5 rounded-full -mt-16 -mr-16 transition-transform group-hover:scale-150 duration-700"></div>
 
                <h4 className="text-2xl md:text-3xl font-black text-primary-navy mb-6 md:mb-10 tracking-tight text-center md:text-left">
                  Quick <span className="text-accent-orange">Inquiries</span>
                </h4>
 
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5">
                  {[
                    {
                      label: "Contact Our Support Team",
                      href: "/contact-us",
                      icon: MessageSquare,
                      desc: "For general questions & support",
                      color: "bg-blue-50 text-corporate-blue",
                    },
                    {
                      label: "List Your Premium Venue",
                      href: "/list-your-venue",
                      icon: Layout,
                      desc: "Become a verified venue partner",
                      color: "bg-orange-50 text-accent-orange",
                    },
                    {
                      label: "Register Special Services",
                      href: "/list-your-service",
                      icon: Sparkles,
                      desc: "Vendors, catering, decor & more",
                      color: "bg-primary-navy/5 text-primary-navy",
                    },
                  ].map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className={`flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 p-6 rounded-[10px] md:rounded-[2rem] border border-gray-100 hover:border-corporate-blue/20 hover:bg-gray-50/50 transition-all group/item text-center md:text-left ${
                        idx === 2 ? "sm:col-span-2 lg:col-span-1" : ""
                      }`}
                    >
                      <div
                        className={`w-11 h-11 md:w-14 md:h-14 rounded-2xl ${item.color} flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform mx-auto md:mx-0`}
                      >
                        <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="text-base md:text-lg font-bold text-primary-navy group-hover/item:text-corporate-blue transition-colors">
                          {item.label}
                        </div>
                        <div className="text-xs md:text-sm text-soft-slate">
                          {item.desc}
                        </div>
                      </div>
                      <div className="hidden md:flex w-10 h-10 rounded-full bg-light-bg items-center justify-center text-primary-navy shrink-0 group-hover/item:bg-primary-navy group-hover/item:text-white transition-all font-bold">
                        <ChevronRight size={20} />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* CTA Footer inside card */}
                <div className="mt-8 md:mt-12 p-6 bg-light-bg rounded-[10px] md:rounded-3xl border border-dashed border-gray-300 text-center">
                  <p className="text-sm font-medium text-soft-slate mb-1">
                    Ready to transform your events?
                  </p>
                  <Link
                    href="/register"
                    className="text-corporate-blue font-black uppercase tracking-widest text-xs hover:underline"
                  >
                    Create Your Account Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
