"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Heart,
  Briefcase,
  PartyPopper,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Layout,
  Award,
  Star,
  Zap,
  CreditCard,
  Globe,
  Settings,
  Rocket,
  PlusCircle,
  Building2,
  ChevronRight,
  Target,
  BarChart3,
  Globe2,
} from "lucide-react";
import { TiltCard } from "@/components/micro-interactions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const venueFormSchema = z.object({
  venueName: z.string().min(1, "Venue name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),

  venueAddress: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  venueType: z.string().min(1, "Please select a venue type"),
  indoorCapacity: z.string().min(1, "Required"),
  outdoorCapacity: z.string().min(1, "Required"),

  hallsCount: z.string().min(1, "Required"),
  parkingCapacity: z.string().min(1, "Required"),
  guestRooms: z.string().min(1, "Required"),

  price: z.string().min(1, "Required"),
  catering: z.string().min(1, "Required"),
  decor: z.string().min(1, "Required"),
  imagesLink: z.string().url("Please provide a valid URL"),
  aboutVenue: z.string().min(10, "Please provide more details"),
  listingModel: z.string().min(1, "Select a model"),
});

type VenueFormValues = z.infer<typeof venueFormSchema>;

export default function ListYourVenuePage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    mode: "onTouched",
    defaultValues: {
      venueType: "Banquet Hall",
      catering: "Yes (Mandatory)",
      decor: "In-house only",
      listingModel: "Free Basic Listing",
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: any = [];
    if (currentStep === 1) {
      fieldsToValidate = ["venueName", "contactPerson", "phone", "email"];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "venueAddress",
        "city",
        "venueType",
        "indoorCapacity",
        "outdoorCapacity",
        "hallsCount",
        "parkingCapacity",
        "guestRooms",
      ];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = (data: VenueFormValues) => {
    console.log(data);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO SECTION (Project Theme Aligned) ────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Dark navy base with overlays as per HowItWorksPage style */}
        <div className="absolute inset-0 bg-primary-navy z-0" />
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-accent-orange/15 blur-[160px] rounded-full -translate-y-1/3 translate-x-1/4 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-corporate-blue/25 blur-[120px] rounded-full translate-y-1/3 -translate-x-1/4" />
        </div>

        {/* Content */}
        <div className="container mx-auto relative z-10 px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 uppercase tracking-widest backdrop-blur-md shadow-xl">
              <PlusCircle size={14} className="text-accent-orange" />
              <span>Partner with India's Elite Marketplace</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.15] md:leading-[1.1] max-w-5xl">
              List Your Venue{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
                on Eventibe
              </span>
            </h1>

            <p className="text-base md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-3xl font-medium">
              Every venue has potential. Some become fully booked destinations.
              Some struggle with inconsistent inquiries. The difference is
              visibility, positioning, and the right audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <div
                onClick={() =>
                  document
                    .getElementById("submission-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-cta-gradient text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 text-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 group w-full sm:w-auto"
              >
                List Your Venue Now{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
              <div
                onClick={() =>
                  document
                    .getElementById("why-eventibe")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                Learn More <ChevronRight size={18} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRUST STRIP / STATS ────────────────────────────────────────────── */}
      <section className="py-12 bg-white relative z-10 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                label: "Target Inquiry Flow",
                value: "High Intent",
                icon: <Target className="w-6 h-6" />,
                color: "from-blue-50 to-blue-100/50",
              },
              {
                label: "City Visibility",
                value: "Structured",
                icon: <MapPin className="w-6 h-6" />,
                color: "from-orange-50 to-orange-100/50",
              },
              {
                label: "Market Presence",
                value: "SEO Focused",
                icon: <Globe2 className="w-6 h-6" />,
                color: "from-emerald-50 to-emerald-100/50",
              },
              {
                label: "Operational Depth",
                value: "Verified",
                icon: <BarChart3 className="w-6 h-6" />,
                color: "from-yellow-50 to-yellow-100/50",
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group relative flex flex-col md:flex-row items-center gap-4 p-6 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 border border-transparent hover:border-gray-100"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
                />
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-primary-navy group-hover:bg-primary-navy group-hover:text-white transition-all duration-500 shadow-sm">
                  {stat.icon}
                </div>
                <div className="text-center md:text-left">
                  <p className="text-xl md:text-2xl font-black text-primary-navy tracking-tight leading-none mb-1 group-hover:scale-105 transition-transform duration-300 origin-left">
                    {stat.value}
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-soft-slate uppercase tracking-widest whitespace-nowrap">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EVENTIBE (Bento Grid) ────────────────────────────────────── */}
      <section
        id="why-eventibe"
        className="py-12 md:py-24 bg-light-bg overflow-hidden relative"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div {...fadeInUp}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-10 h-[2px] bg-accent-orange" />
                <span className="text-[11px] font-black text-accent-orange uppercase tracking-[0.25em]">
                  Advantage
                </span>
                <div className="w-10 h-[2px] bg-accent-orange" />
              </div>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">
                Not Just a Listing. <br />
                <span className="text-corporate-blue">
                  A Strategic Platform.
                </span>
              </h3>
              <p className="text-soft-slate text-sm md:text-base leading-relaxed">
                We bridge the gap between high-intent event hosts and premium
                event spaces through a curated, inquiry-driven marketplace.
              </p>
            </motion.div>
          </div>

          {/* Bento Grid – 3 cols, content-driven rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Row 1 */}
            {/* Navy Feature Card – spans 2 cols */}
            <div className="md:col-span-2 bg-primary-navy rounded-3xl p-8 relative overflow-hidden group shadow-md">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-corporate-blue/20 rounded-full blur-[100px] group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
              <div className="relative z-10 flex flex-col gap-5">
                {/* Icon */}
                <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-blue-300">
                  <Rocket size={20} />
                </div>
                {/* Content */}
                <div>
                  <h4 className="text-2xl font-black text-white mb-2 leading-snug">
                    Not Just a Hotel OTA
                  </h4>
                  <p className="text-blue-100/60 text-sm leading-relaxed max-w-sm">
                    Eventibe is not a hotel OTA. It is an inquiry-driven event
                    marketplace focused exclusively on event venues and related
                    services.
                  </p>
                </div>
                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["SEO Driven", "Inquiry Focused", "Verified Leads"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/8 rounded-full border border-white/10 text-blue-200"
                      >
                        {tag}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Direct Inquiry Card – 1 col */}
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-md flex flex-col gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-accent-orange group-hover:scale-105 transition-transform">
                <MessageSquare size={20} />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-primary-navy mb-1">
                  Direct Inquiry
                </h4>
                <p className="text-sm text-soft-slate leading-relaxed">
                  Visitors searching for venues in your city can view your
                  profile and send direct inquiries. No unnecessary middle
                  layers.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            {/* Performance Card – 1 col */}
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-md flex flex-col gap-4 group">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-corporate-blue group-hover:scale-105 transition-transform">
                <BarChart3 size={20} />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-primary-navy mb-1">
                  City-Level Visibility
                </h4>
                <p className="text-sm text-soft-slate leading-relaxed">
                  Your venue appears on city landing pages, wedding venue pages,
                  corporate venue pages, and filtered search results.
                </p>
              </div>
            </div>

            {/* Elite Verification Card – spans 2 cols */}
            <div className="md:col-span-2 bg-gradient-to-br from-emerald-50 to-white rounded-3xl p-8 border border-emerald-100 shadow-md flex items-center gap-7 group overflow-hidden">
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:rotate-6 transition-transform duration-500">
                <ShieldCheck size={28} />
              </div>
              <div>
                <h4 className="text-xl font-black text-primary-navy mb-1.5">
                  Elite Verification
                </h4>
                <p className="text-sm text-soft-slate leading-relaxed max-w-md">
                  We maintain high standards. Every listing is reviewed for
                  image quality, capacity authenticity, and professional
                  responsiveness. Low response or inaccurate data may affect
                  ranking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES EVENTIBE DIFFERENT ─────────────────────────────── */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-3">
                Our Difference
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">
                What Makes Eventibe Different?
              </h3>
              <p className="text-soft-slate text-sm md:text-base leading-relaxed">
                We are building an event-first digital marketplace focused
                exclusively on structured, high-intent event venue discovery.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="bg-red-50/60 rounded-3xl p-8 border border-red-100"
            >
              <h4 className="text-lg font-black text-red-600 mb-4">
                Most Platforms Either:
              </h4>
              <ul className="space-y-3">
                {[
                  "Focus only on hotels",
                  "Provide basic listings",
                  "Lack SEO structure",
                  "Do not categorize properly",
                  "Mix unrelated inventory",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-soft-slate"
                  >
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-red-400 shrink-0 font-black text-xs">
                      ✕
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="bg-emerald-50/60 rounded-3xl p-8 border border-emerald-100"
            >
              <h4 className="text-lg font-black text-emerald-700 mb-4">
                Eventibe Focuses On:
              </h4>
              <ul className="space-y-3">
                {[
                  "Event-specific targeting",
                  "Structured city-level pages",
                  "Category-based SEO",
                  "Wedding & corporate segmentation",
                  "Vendor ecosystem integration",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-soft-slate"
                  >
                    <CheckCircle2
                      size={16}
                      className="text-emerald-500 shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS OF LISTING YOUR VENUE ───────────────────────────── */}
      <section className="py-12 md:py-24 bg-light-bg relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-3">
                Benefits
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">
                Benefits of Listing Your Venue
              </h3>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                icon: <Users size={22} />,
                color: "blue",
                title: "Qualified Event Inquiries",
                desc: "Visitors on Eventibe are specifically searching for wedding venues, corporate event venues, banquet halls, farmhouses, and conference halls. This means better lead intent.",
                tags: ["Wedding venues", "Corporate venues", "Banquet halls"],
              },
              {
                num: "02",
                icon: <MapPin size={22} />,
                color: "orange",
                title: "City-Level Visibility",
                desc: "Your venue will appear on city landing pages, wedding venue pages, corporate venue pages, venue-type pages, and filtered search results. Structured exposure increases discoverability.",
                tags: ["City pages", "SEO targeted", "Filtered results"],
              },
              {
                num: "03",
                icon: <Layout size={22} />,
                color: "blue",
                title: "Professional Profile Presentation",
                desc: "Your venue profile includes optimized description, gallery section, capacity details, indoor & outdoor breakdown, amenities list, starting pricing, location map, inquiry form, and event suitability tags.",
                tags: ["Gallery", "Capacity", "Inquiry form"],
              },
              {
                num: "04",
                icon: <Globe2 size={22} />,
                color: "orange",
                title: "SEO-Focused Positioning",
                desc: "We create structured, keyword-targeted profiles to ensure strong Google indexing, local search visibility, category-based ranking, and long-term organic presence. Unlike temporary ads, SEO works long-term.",
                tags: ["Google indexing", "Local search", "Organic"],
              },
              {
                num: "05",
                icon: <Star size={22} />,
                color: "blue",
                title: "Vendor Ecosystem Advantage",
                desc: "Eventibe integrates vendors such as Catering, Decor, Photography, Lighting, Sound, and Event Planners. This creates a complete event ecosystem — increasing your venue's relevance.",
                tags: ["Catering", "Photography", "Decor"],
              },
            ].map((b, idx) => {
              const isOrange = b.color === "orange";
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.08 }}
                  className={`group relative bg-white border rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
                    isOrange
                      ? "border-orange-100 hover:border-accent-orange/30 hover:shadow-orange-500/10"
                      : "border-blue-100 hover:border-corporate-blue/30 hover:shadow-corporate-blue/10"
                  }`}
                >
                  <div
                    className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${isOrange ? "bg-accent-orange" : "bg-corporate-blue"}`}
                  />
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOrange
                        ? "bg-orange-50 text-accent-orange group-hover:bg-accent-orange group-hover:text-white"
                        : "bg-blue-50 text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white"
                    }`}
                  >
                    {b.icon}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-[10px] font-black mb-1 ${isOrange ? "text-accent-orange" : "text-corporate-blue"}`}
                    >
                      {b.num}
                    </p>
                    <h4 className="text-base font-black text-primary-navy mb-2">
                      {b.title}
                    </h4>
                    <p className="text-soft-slate text-sm leading-relaxed mb-3">
                      {b.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {b.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                            isOrange
                              ? "bg-orange-50 text-accent-orange border-orange-100"
                              : "bg-blue-50 text-corporate-blue border-blue-100"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── VENUE CATEGORIES ─────────────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center md:flex md:flex-row md:justify-between md:items-end mb-10 gap-6">
            <div className="max-w-2xl mx-auto md:mx-0">
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-3">
                Categories
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">
                Who Can List Their Venue?
              </h3>
            </div>
            <p className="text-soft-slate text-base max-w-sm mx-auto md:mx-0 mt-3 md:mt-0">
              If your venue can host structured events — you belong on Eventibe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Wedding & Social",
                icon: <Heart size={36} />,
                color: "white",
                borderColor: "border-pink-100",
                accent: "text-pink-500",
                bgAccent: "bg-pink-50",
                items: [
                  "Banquet Halls",
                  "Marriage Gardens",
                  "Farmhouses",
                  "Luxury Resorts",
                  "Heritage Properties",
                  "Palace Venues",
                  "Destination Wedding Resorts",
                ],
              },
              {
                title: "Corporate Event Venues",
                icon: <Briefcase size={36} />,
                color: "primary-navy",
                borderColor: "border-blue-900",
                textColor: "text-white",
                accent: "text-blue-400",
                bgAccent: "bg-blue-900/40",
                items: [
                  "Conference Halls",
                  "Business Hotels",
                  "Convention Centers",
                  "Exhibition Grounds",
                  "Boardrooms",
                  "Training Facilities",
                  "Product Launch Venues",
                  "Meeting Spaces",
                ],
              },
              {
                title: "Social & Private Events",
                icon: <PartyPopper size={36} />,
                color: "white",
                borderColor: "border-orange-100",
                accent: "text-accent-orange",
                bgAccent: "bg-orange-50",
                items: [
                  "Birthday Party Halls",
                  "Anniversary Venues",
                  "Rooftop Event Spaces",
                  "Clubhouses",
                  "Community Halls",
                  "Private Party Lawns",
                ],
              },
            ].map((cat, i) => (
              <TiltCard key={i} className="h-full">
                <div
                  className={`${cat.color === "primary-navy" ? "bg-primary-navy" : "bg-white"} rounded-[3rem] p-10 h-full border ${cat.borderColor} shadow-lg relative overflow-hidden flex flex-col group`}
                >
                  <div
                    className={`w-20 h-20 ${cat.bgAccent} rounded-[2rem] flex items-center justify-center mb-6 ${cat.accent} shadow-sm group-hover:rotate-3 transition-transform mx-auto md:mx-0`}
                  >
                    {cat.icon}
                  </div>
                  <h4
                    className={`text-2xl font-black mb-4 text-center md:text-left ${cat.textColor || "text-primary-navy"}`}
                  >
                    {cat.title}
                  </h4>
                  <ul className="space-y-4 mb-8 flex-1">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <CheckCircle2 size={16} className={cat.accent} />
                        <span
                          className={`text-sm ${cat.textColor ? "text-blue-100/70" : "text-soft-slate"}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div
                    className={`pt-4 border-t ${cat.color === "primary-navy" ? "border-white/10" : "border-gray-100"} flex items-center gap-2 font-bold text-sm ${cat.accent} cursor-pointer`}
                  >
                    Learn more positioning <ArrowRight size={16} />
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONBOARDING PROCESS (Roadmap) ────────────────────────────────────────── */}
      <section
        id="onboarding"
        className="py-12 md:py-24 bg-light-bg overflow-hidden relative"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
                The Journey
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">
                Simple Steps to Go Live
              </h3>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
            {[
              {
                id: "01",
                title: "Submit Venue Details",
                icon: <Layout />,
                desc: "Fill the form with Venue Name, Location, Event types supported, Capacity, and Pricing range.",
              },
              {
                id: "02",
                title: "Verification & Quality Check",
                icon: <ShieldCheck />,
                desc: "We review venue authenticity, contact accuracy, image quality, and category alignment.",
              },
              {
                id: "03",
                title: "Profile Creation & Optimization",
                icon: <TrendingUp />,
                desc: "Our team prepares SEO-optimized content, structured category mapping, city tagging, and image layout.",
              },
              {
                id: "04",
                title: "Activation & Go Live",
                icon: <Rocket />,
                desc: "Your venue becomes visible to event planners, wedding hosts, and corporate decision-makers.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="group relative p-8 bg-white rounded-[2.5rem] border border-gray-100 shadow-md overflow-hidden flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="text-6xl font-black text-primary-navy/5 absolute top-4 right-6 group-hover:text-corporate-blue/10 transition-colors">
                  {step.id}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-corporate-blue mb-5 group-hover:bg-corporate-blue group-hover:text-white transition-all">
                  {React.cloneElement(step.icon as React.ReactElement, {
                    size: 22,
                  })}
                </div>
                <h4 className="text-lg font-black text-primary-navy mb-2 text-center md:text-left">
                  {step.title}
                </h4>
                <p className="text-sm text-soft-slate leading-relaxed text-center md:text-left">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT INFO TO PREPARE + ADVANCED SECTIONS ─────────────────────────────── */}
      <section className="py-12 md:py-24 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <motion.div {...fadeInUp}>
              <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-3">
                Checklist
              </h2>
              <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">
                What Information Should You Prepare?
              </h3>
              <p className="text-soft-slate text-sm md:text-base leading-relaxed">
                To create a strong listing, keep the following ready:
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MapPin size={20} />,
                color: "blue",
                title: "Basic Venue Details",
                items: [
                  "Legal name",
                  "Address",
                  "Google map location",
                  "Contact person",
                  "Phone number",
                  "Email",
                ],
              },
              {
                icon: <Users size={20} />,
                color: "orange",
                title: "Capacity Details",
                items: [
                  "Maximum floating capacity",
                  "Seating capacity",
                  "Number of halls",
                  "Lawn capacity",
                  "Breakout room availability",
                ],
              },
              {
                icon: <Star size={20} />,
                color: "blue",
                title: "Pricing Information",
                items: [
                  "Starting price per plate",
                  "Rental charges (if applicable)",
                  "Package pricing",
                  "Corporate day package",
                ],
                note: "Transparent pricing improves conversions.",
              },
              {
                icon: <ShieldCheck size={20} />,
                color: "orange",
                title: "Amenities",
                items: [
                  "In-house catering",
                  "Decor flexibility",
                  "Parking space",
                  "Power backup",
                  "Bridal room",
                  "Stage setup",
                  "AC / Non-AC halls",
                  "Guest rooms",
                  "Valet service",
                  "AV equipment",
                ],
              },
              {
                icon: <Layout size={20} />,
                color: "blue",
                title: "Event Suitability",
                items: [
                  "Wedding ceremony",
                  "Reception",
                  "Engagement",
                  "Sangeet",
                  "Corporate conference",
                  "Product launch",
                  "Award night",
                  "Exhibition",
                ],
                note: "Proper tagging increases relevance.",
              },
            ].map((card, idx) => {
              const isOrange = card.color === "orange";
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.07 }}
                  className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all ${isOrange ? "border-orange-100" : "border-blue-100"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${isOrange ? "bg-orange-50 text-accent-orange" : "bg-blue-50 text-corporate-blue"}`}
                  >
                    {card.icon}
                  </div>
                  <h4 className="text-base font-black text-primary-navy mb-3">
                    {card.title}
                  </h4>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-soft-slate"
                      >
                        <CheckCircle2
                          size={13}
                          className={
                            isOrange
                              ? "text-accent-orange shrink-0"
                              : "text-corporate-blue shrink-0"
                          }
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {card.note && (
                    <p
                      className={`text-xs font-bold mt-3 ${isOrange ? "text-accent-orange" : "text-corporate-blue"}`}
                    >
                      {card.note}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Sub-sections: Multi-Venue, Destination, Corporate Ready, Featured, Lead, Revenue, Quality, Early, Future, Long-Term */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <Globe2 size={20} />,
                color: "blue",
                title: "Multi-Venue Operators",
                intro: "If you operate multiple venues:",
                items: [
                  "Each property can have separate listing",
                  "City-specific optimization",
                  "Capacity-specific targeting",
                  "Brand grouping possible",
                ],
                note: "Ideal for hospitality groups and chains.",
              },
              {
                icon: <Heart size={20} />,
                color: "orange",
                title: "Destination Wedding Venues",
                intro:
                  "If your venue is located in hill stations, beach destinations, heritage towns, or resort clusters — you can be featured under destination categories.",
                items: [
                  "Hill stations",
                  "Beach destinations",
                  "Heritage towns",
                  "Resort clusters",
                ],
                note: "Destination weddings are high-value inquiries.",
              },
              {
                icon: <Briefcase size={20} />,
                color: "blue",
                title: "Corporate Ready Venues",
                intro:
                  "If you provide the following, mention them clearly to attract corporate planners:",
                items: [
                  "Projectors",
                  "LED screens",
                  "High-speed internet",
                  "Breakout rooms",
                  "Business catering",
                  "Conference seating formats",
                ],
              },
              {
                icon: <Sparkles size={20} />,
                color: "orange",
                title: "Featured Venue Program",
                intro:
                  "Premium venues may apply for featured placement. Benefits include:",
                items: [
                  "Homepage visibility",
                  "Category spotlight",
                  "City-page priority",
                  "Social media promotion",
                  "Blog feature coverage",
                ],
                note: "Ideal for venues seeking premium exposure.",
              },
              {
                icon: <MessageSquare size={20} />,
                color: "blue",
                title: "Lead Management",
                intro: "All inquiries are:",
                items: [
                  "Tagged as Eventibe source",
                  "Categorized (Wedding / Corporate / Social)",
                  "Delivered directly",
                  "Trackable",
                ],
                note: "You maintain direct communication with clients.",
              },
              {
                icon: <TrendingUp size={20} />,
                color: "orange",
                title: "Revenue & Listing Model",
                intro: "Eventibe may operate under:",
                items: [
                  "Free basic listing",
                  "Featured subscription",
                  "Commission-based model",
                  "Hybrid model",
                ],
                note: "Terms are transparent and discussed before activation.",
              },
              {
                icon: <ShieldCheck size={20} />,
                color: "blue",
                title: "Quality Standards",
                intro: "To maintain marketplace integrity:",
                items: [
                  "Use genuine venue images",
                  "Avoid misleading capacity claims",
                  "Maintain updated pricing",
                  "Respond to inquiries promptly",
                  "Provide professional communication",
                ],
                note: "Low response or inaccurate data may affect ranking.",
              },
              {
                icon: <Zap size={20} />,
                color: "orange",
                title: "Early Listing Advantage",
                intro: "Founding venues benefit from:",
                items: [
                  "Stronger SEO positioning",
                  "Better internal linking",
                  "Priority category placement",
                  "Long-term ranking advantage",
                  "Higher early visibility",
                ],
                note: "Early presence builds authority.",
              },
              {
                icon: <Rocket size={20} />,
                color: "blue",
                title: "Future Vendor Integration",
                intro: "Eventibe is building:",
                items: [
                  "Vendor modules",
                  "Corporate RFP systems",
                  "Featured event showcases",
                  "Subscription visibility tools",
                ],
                note: "Your venue will benefit as the ecosystem expands.",
              },
              {
                icon: <BarChart3 size={20} />,
                color: "orange",
                title: "Why Eventibe is Built for Long-Term Growth",
                intro:
                  "We are not building a short-term listing portal. We are building:",
                items: [
                  "Structured category architecture",
                  "SEO-driven city pages",
                  "Corporate segmentation",
                  "Wedding-focused storytelling",
                  "Vendor ecosystem integration",
                ],
                note: "The objective is national scalability.",
              },
            ].map((card, idx) => {
              const isOrange = card.color === "orange";
              return (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-white rounded-2xl border p-6 hover:shadow-lg transition-all flex gap-4 ${isOrange ? "border-orange-100" : "border-blue-100"}`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isOrange ? "bg-orange-50 text-accent-orange" : "bg-blue-50 text-corporate-blue"}`}
                  >
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-black text-primary-navy mb-2">
                      {card.title}
                    </h4>
                    <p className="text-sm text-soft-slate mb-3">{card.intro}</p>
                    <ul className="space-y-1.5 mb-3">
                      {card.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-soft-slate"
                        >
                          <CheckCircle2
                            size={13}
                            className={
                              isOrange
                                ? "text-accent-orange shrink-0"
                                : "text-corporate-blue shrink-0"
                            }
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                    {card.note && (
                      <p
                        className={`text-xs font-bold ${isOrange ? "text-accent-orange" : "text-corporate-blue"}`}
                      >
                        {card.note}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUBMISSION FORM (High-Contrast Elite Theme) ─────────────────────────────── */}
      <section
        id="submission-form"
        className="py-12 md:py-20 bg-primary-navy relative overflow-hidden min-h-screen flex flex-col justify-center"
      >
        {/* Atmosphere Overlays */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/10 blur-[140px] rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-corporate-blue/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-[4rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(0,0,0,0.1)] border border-white/10"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-primary-navy mb-3 tracking-tight">
                  Become an Eventibe{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-blue-600">
                    Venue Partner
                  </span>
                </h2>
                <p className="text-soft-slate text-sm md:text-base max-w-2xl mx-auto">
                  Join the curated marketplace serving India's most high-intent
                  event inquiries.
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="mb-12 max-w-3xl mx-auto">
                <div className="flex justify-between mb-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] ${currentStep >= step ? "text-accent-orange" : "text-slate-300"}`}
                    >
                      Step 0{step}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden shadow-inner">
                  <div
                    className="h-full bg-cta-gradient transition-all duration-1000 ease-[0.22, 1, 0.36, 1] shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-accent-orange shadow-sm">
                          <MapPin size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">
                          Basic Identification
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Legal Venue Name
                          </label>
                          <input
                            {...register("venueName")}
                            placeholder="e.g. Grand Emerald Banquet"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-slate-300 placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.venueName && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.venueName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Primary Contact Person
                          </label>
                          <input
                            {...register("contactPerson")}
                            placeholder="Name of Key Representative"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-slate-300 placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.contactPerson && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.contactPerson.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Direct Contact Phone
                          </label>
                          <input
                            {...register("phone")}
                            placeholder="+91 XXX XXX XXXX"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-slate-300 placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.phone && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Business Email
                          </label>
                          <input
                            {...register("email")}
                            placeholder="official-listing@venue.com"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-slate-300 placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.email && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-corporate-blue shadow-sm">
                          <Settings size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">
                          Property Specifications
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Display City / Region
                          </label>
                          <input
                            {...register("city")}
                            placeholder="e.g. Udaipur, Rajasthan"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.city && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Primary Venue Category
                          </label>
                          <select
                            {...register("venueType")}
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy appearance-none shadow-inner cursor-pointer text-base"
                          >
                            <option>Banquet Hall</option>
                            <option>Resort / Hotel</option>
                            <option>Marriage Garden / Farmhouse</option>
                            <option>Conference Hub</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                          Exact Geo-Coordinate / Full Address
                        </label>
                        <input
                          {...register("venueAddress")}
                          placeholder="Please provide complete physical location details for mapping"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                        />
                        {errors.venueAddress && (
                          <p className="text-xs text-red-500 font-bold ml-1">
                            {errors.venueAddress.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Total Indoor Capacity (Pax)
                          </label>
                          <input
                            {...register("indoorCapacity")}
                            placeholder="Maximum seating/floating"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Total Outdoor Capacity (Pax)
                          </label>
                          <input
                            {...register("outdoorCapacity")}
                            placeholder="Area / Capacity ratio"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      className="space-y-10"
                    >
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm">
                          <BarChart3 size={24} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">
                          Performance Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Hall Units
                          </label>
                          <input
                            {...register("hallsCount")}
                            placeholder="e.g. 3"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                        </div>
                        <div className="space-y-4 md:col-span-2">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Gallery Verification Link
                          </label>
                          <input
                            {...register("imagesLink")}
                            placeholder="Drive, Dropbox or Portfolio Website URL"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                          {errors.imagesLink && (
                            <p className="text-xs text-red-500 font-bold ml-1">
                              {errors.imagesLink.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                          Strategic Narrative (USP)
                        </label>
                        <textarea
                          {...register("aboutVenue")}
                          rows={4}
                          placeholder="What makes your venue provide elite level corporate or social experiences?"
                          className="w-full bg-slate-50 border-2 border-slate-50 rounded-[2rem] p-6 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner resize-none text-base"
                        />
                        {errors.aboutVenue && (
                          <p className="text-xs text-red-500 font-bold ml-1">
                            {errors.aboutVenue.message}
                          </p>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Activation Model
                          </label>
                          <select
                            {...register("listingModel")}
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy appearance-none shadow-inner cursor-pointer text-base"
                          >
                            <option>Free Basic Selection</option>
                            <option>Premium Spotlight Placement</option>
                            <option>Strategic Performance Partnership</option>
                          </select>
                        </div>
                        <div className="space-y-4">
                          <label className="text-[10px] md:text-xs font-black text-soft-slate uppercase tracking-widest ml-1">
                            Beginning Quotation (INR)
                          </label>
                          <input
                            {...register("price")}
                            placeholder="Starting package / Plate cost"
                            className="w-full bg-slate-50 border-2 border-slate-50 rounded-[1.5rem] p-4 focus:bg-white focus:border-accent-orange outline-none transition-all font-bold text-primary-navy placeholder:text-sm shadow-inner text-base"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Unified CTA Logic */}
                <div className="flex flex-col gap-3 pt-8 border-t border-slate-100">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((p) => p - 1)}
                      className="w-full bg-slate-50 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-100 transition-all text-sm border border-slate-200"
                    >
                      ← Previous Step
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full bg-primary-navy text-white font-bold py-4 rounded-2xl hover:bg-corporate-blue transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-95"
                    >
                      Authenticate and Continue <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full bg-cta-gradient text-white font-bold py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-orange-500/30 text-sm"
                    >
                      Finalize Listing Application
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FINAL ONBOARDING CTA (Light theme aligned to project flow) ───────────────────────────────────────────── */}
      <section className="py-12 md:py-24 bg-light-bg overflow-hidden relative border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Final Note
            </h2>
            <h3 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-primary-navy tracking-tight">
              Your Venue Is More Than{" "}
              <span className="text-corporate-blue">a Physical Space</span>
            </h3>
            <p className="text-soft-slate text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              If you are ready to increase your visibility, improve inquiry
              flow, and build long-term digital positioning —
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
              {[
                {
                  icon: <Heart size={20} className="text-pink-500" />,
                  label: "Couples begin new journeys",
                  bg: "bg-pink-50",
                },
                {
                  icon: <Briefcase size={20} className="text-corporate-blue" />,
                  label: "Companies launch ideas",
                  bg: "bg-blue-50",
                },
                {
                  icon: <Users size={20} className="text-emerald-500" />,
                  label: "Families celebrate milestones",
                  bg: "bg-emerald-50",
                },
                {
                  icon: <Star size={20} className="text-accent-orange" />,
                  label: "Brands create impact",
                  bg: "bg-orange-50",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fadeInUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}
                  >
                    {item.icon}
                  </div>
                  <p className="text-xs font-bold text-primary-navy text-center">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div className="flex items-center gap-4 group cursor-pointer bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-accent-orange">
                  <MessageSquare size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-primary-navy">24/7 Support</p>
                  <p className="text-xs text-soft-slate">
                    Dedicated Onboarding Team
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 hover:scale-105 transition-transform">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-corporate-blue">
                  <Star size={24} />
                </div>
                <div className="text-left">
                  <p className="font-black text-primary-navy">Elite Status</p>
                  <p className="text-xs text-soft-slate">
                    Join 1200+ Top Venues
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
