"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Users,
  Search,
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
  Star,
  Zap,
  MapPin,
  CreditCard,
  Globe,
  Award,
} from "lucide-react";
import { TiltCard } from "@/components/micro-interactions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const serviceFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email("Valid email required"),

  category: z.string().min(1, "Please select a service category"),
  subCategory: z.string().min(1, "Sub-category is required"),
  citiesServed: z.string().min(1, "Cities are required"),
  experience: z.string().min(1, "Experience is required"),
  price: z.string().min(1, "Required"),

  website: z.string().url("Please provide a valid URL"),
  portfolio: z.string().optional(),
  aboutService: z.string().min(10, "Please provide more details"),
  messageToHost: z.string().optional(),
  partnershipModel: z.string().min(1, "Select a model"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ListYourServicePage() {
  const fadeInUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    mode: "onTouched",
    defaultValues: {
      category: "Photography/Videography",
      partnershipModel: "Free Basic Listing",
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: any = [];
    if (currentStep === 1) {
      fieldsToValidate = ["businessName", "contactPerson", "phone", "email"];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "category",
        "subCategory",
        "citiesServed",
        "experience",
        "price",
      ];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const onSubmit = (data: ServiceFormValues) => {
    console.log(data);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ── HERO SECTION ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-32 flex items-center overflow-hidden bg-primary-navy min-h-[85vh]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop"
            alt="Event Service Background"
            fill
            className="object-cover opacity-25"
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
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
            <motion.div
              {...fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 shadow-xl backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-accent-orange" />
              <span>Grow Your Event Business with Eventibe</span>
            </motion.div>

            <motion.h1
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.15] md:leading-[1.1] tracking-tight drop-shadow-md"
            >
              List Your Service
            </motion.h1>

            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-3xl font-medium space-y-4"
            >
              <span className="block mb-2">
                The event industry is evolving rapidly.
              </span>
              <span className="block mb-2">
                Today, event hosts search online before finalizing vendors.
                Whether it’s a wedding, corporate conference, product launch, or
                social celebration — clients want verified, visible, and
                reliable service providers.
              </span>
              <span className="block mb-2">
                Eventibe is building a powerful event marketplace that connects
                event hosts directly with professional service providers across
                cities.
              </span>
              <span className="block text-accent-orange font-bold">
                If you offer event-related services, this is your opportunity to
                expand your reach, increase inquiries, and grow your business.
              </span>
            </motion.p>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div
                onClick={() =>
                  document
                    .getElementById("submission-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-cta-gradient text-white px-8 py-4 rounded-[1rem] font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 w-fit"
              >
                List Your Service Today <ArrowRight size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY LIST ON EVENTIBE ──────────────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white overflow-hidden relative">
        {/* Subtle grid bg */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1e3a8a 1px, transparent 1px), linear-gradient(90deg, #1e3a8a 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[140px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">
            {/* ── LEFT: Sticky Headline ── */}
            <div className="lg:sticky lg:top-28 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-corporate-blue/8 border border-corporate-blue/15 text-corporate-blue text-[10px] font-black uppercase tracking-widest mb-4">
                <Zap size={11} />
                <span>Why List Your Service on Eventibe?</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-primary-navy leading-tight tracking-tight mb-4">
                Eventibe is not just{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-corporate-blue to-accent-orange">
                    a directory.
                  </span>
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-corporate-blue to-accent-orange rounded-full" />
                </span>
              </h2>

              <p className="text-soft-slate leading-relaxed mb-6 text-sm md:text-base max-w-sm mx-auto lg:mx-0">
                It is a structured, inquiry-driven event marketplace designed to
                generate{" "}
                <span className="font-bold text-corporate-blue">
                  relevant leads
                </span>{" "}
                and help vendors{" "}
                <span className="font-bold text-accent-orange">
                  grow sustainably.
                </span>
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { val: "500+", label: "Service Providers" },
                  { val: "0%", label: "Commission" },
                  { val: "Free", label: "Basic Listing" },
                  { val: "24h", label: "Turnaround" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-xl p-3 text-center"
                  >
                    <div className="text-xl font-black text-primary-navy">
                      {s.val}
                    </div>
                    <div className="text-[11px] text-soft-slate font-medium mt-0.5">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById("submission-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 bg-cta-gradient text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 text-sm"
              >
                List Your Service <ArrowRight size={16} />
              </button>
            </div>

            {/* ── RIGHT: Benefit Cards ── */}
            <div className="space-y-3">
              {[
                {
                  num: "01",
                  icon: MessageSquare,
                  color: "blue",
                  title: "Get Direct Inquiries",
                  desc: "Event hosts searching for services in your city can view your profile, explore your portfolio, understand your offerings, and send direct inquiries. No unnecessary middle layers.",
                  tag: "Zero Middlemen",
                },
                {
                  num: "02",
                  icon: TrendingUp,
                  color: "orange",
                  title: "Increase Digital Visibility",
                  desc: "Eventibe helps you establish online presence, rank on city-specific service pages, appear in category searches, and build structured digital credibility beyond word-of-mouth.",
                  tag: "SEO Optimised",
                },
                {
                  num: "03",
                  icon: Layout,
                  color: "blue",
                  title: "Showcase Your Portfolio Professionally",
                  desc: "Your listing includes service description, gallery images, starting pricing, service coverage area, event types handled, contact info, and an inquiry form — your digital business card.",
                  tag: "Digital Profile",
                },
                {
                  num: "04",
                  icon: Users,
                  color: "orange",
                  title: "Expand Beyond Your Network",
                  desc: "Connect with wedding clients, corporate clients, destination planners, venue managers, and multi-city coordinators — far beyond your existing referral network.",
                  tag: "Pan-India Reach",
                },
                {
                  num: "05",
                  icon: MapPin,
                  color: "blue",
                  title: "Category & City-Level Targeting",
                  desc: "Your service appears on category landing pages, city-specific pages, vendor listing pages, and filtered search results. Structured, guaranteed visibility.",
                  tag: "Geo-Targeted",
                },
              ].map((b, idx) => {
                const Icon = b.icon;
                const isOrange = b.color === "orange";
                return (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.08 }}
                    className={`group relative bg-white border rounded-2xl p-4 md:p-5 flex gap-4 transition-all duration-300 overflow-hidden cursor-default
                      hover:shadow-xl hover:-translate-y-0.5
                      ${isOrange ? "border-orange-100 hover:border-accent-orange/30 hover:shadow-orange-500/10" : "border-blue-100 hover:border-corporate-blue/30 hover:shadow-corporate-blue/10"}
                    `}
                  >
                    {/* Hover glow */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none
                        ${isOrange ? "bg-gradient-to-br from-accent-orange/4 to-transparent" : "bg-gradient-to-br from-corporate-blue/4 to-transparent"}
                      `}
                    />
                    {/* Large Background Number */}
                    <div className="hidden md:block absolute -right-2 -bottom-4 text-7xl font-black text-gray-400/10 select-none group-hover:text-corporate-blue/5 transition-colors pointer-events-none">
                      {b.num}
                    </div>
                    {/* Left accent bar */}
                    <div
                      className={`absolute left-0 top-6 bottom-6 w-1 rounded-r-full opacity-0 group-hover:opacity-100 transition-all duration-300
                        ${isOrange ? "bg-accent-orange" : "bg-corporate-blue"}
                      `}
                    />

                    {/* Icon Box */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                        ${isOrange ? "bg-orange-50 text-accent-orange group-hover:bg-accent-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-200" : "bg-blue-50 text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-200"}
                      `}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 relative z-10">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <h4 className="text-base font-black text-primary-navy leading-snug">
                          {b.title}
                        </h4>
                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                          <span
                            className={`text-[10px] font-black px-2.5 py-1 rounded-full border border-current opacity-80
                              ${isOrange ? "bg-orange-50 text-accent-orange border-orange-100" : "bg-blue-50 text-corporate-blue border-blue-100"}
                            `}
                          >
                            {b.tag}
                          </span>
                        </div>
                      </div>
                      <p className="text-soft-slate text-sm leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN LIST ON EVENTIBE (CATEGORIES) ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Service Categories
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">
              Who Can List on Eventibe?
            </h3>
            <p className="text-soft-slate text-lg">
              We welcome professional service providers across all event
              categories. If your service supports events — you belong on
              Eventibe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding Services */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <TiltCard className="group h-full">
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-pink-100 shadow-xl shadow-pink-500/5 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-100/50 rounded-full blur-[80px] group-hover:bg-pink-200/50 transition-colors" />
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-8 text-pink-500 shadow-sm border border-pink-100 mx-auto md:mx-0">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4 text-center md:text-left">
                    Wedding Services
                  </h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {[
                      "Wedding Planners",
                      "Bridal Consultants",
                      "Destination Wedding Specialists",
                      "Mehndi Artists",
                      "Makeup Artists",
                      "Decor & Theme Designers",
                      "Wedding Photographers",
                      "Wedding Cinematographers",
                      "Band, Ghodi & Baraat Services",
                      "Invitation Designers",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center text-pink-500 shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>

            {/* Corporate Services */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <TiltCard className="group h-full">
                <div className="bg-primary-navy rounded-[2.5rem] p-10 h-full border border-blue-900 shadow-xl shadow-blue-950/20 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-corporate-blue/20 rounded-full blur-[80px]" />
                  <div className="w-16 h-16 bg-blue-900/40 rounded-2xl flex items-center justify-center mb-8 text-blue-400 shadow-sm border border-blue-800 mx-auto md:mx-0">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 text-center md:text-left">
                    Corporate Event Services
                  </h3>
                  <ul className="space-y-4 text-blue-100/70 mb-8 flex-1">
                    {[
                      "Corporate Event Managers",
                      "Conference Organizers",
                      "Exhibition Setup Teams",
                      "AV & Sound Specialists",
                      "Stage & Lighting Experts",
                      "Corporate Catering",
                      "Training & Seminar Setup Teams",
                      "Brand Activation Agencies",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>

            {/* General Services */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <TiltCard className="group h-full">
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-orange/10 rounded-full blur-[80px]" />
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 text-accent-orange shadow-sm border border-orange-100 mx-auto md:mx-0">
                    <PartyPopper size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4 text-center md:text-left">
                    General Event Services
                  </h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {[
                      "Catering Services",
                      "Tent & Fabrication",
                      "Floral Decor",
                      "Event Furniture Rental",
                      "LED Walls & Screens",
                      "DJs & Live Bands",
                      "Anchors & Hosts",
                      "Entertainment Artists",
                      "Security & Staffing Services",
                      "Logistics & Transportation",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-accent-orange shrink-0">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────────── */}
      <section
        id="how-it-works"
        className="py-20 md:py-32 bg-slate-50 border-y border-gray-100"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Process
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">
              How It Works
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "Step 1",
                title: "Submit Your Service Details",
                desc: "Fill out the “List Your Service” form with company name, category, cities served, experience details, portfolio links, and basic pricing range.",
                icon: Layout,
              },
              {
                step: "Step 2",
                title: "Verification & Review",
                desc: "Our team reviews service authenticity, category alignment, brand presentation, and portfolio quality. We may contact you for clarification.",
                icon: ShieldCheck,
              },
              {
                step: "Step 3",
                title: "Profile Creation",
                desc: "Once approved, we create your vendor profile including SEO-optimized content, category tagging, city mapping, gallery structure, and inquiry integration.",
                icon: TrendingUp,
              },
              {
                step: "Step 4",
                title: "Go Live",
                desc: "Your service becomes visible to event hosts searching on Eventibe. You start receiving inquiries directly.",
                icon: MessageSquare,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative group p-8 rounded-[2rem] bg-white border border-gray-100 hover:shadow-xl hover:border-corporate-blue/20 transition-all flex flex-col h-full"
              >
                <div className="text-3xl font-black text-corporate-blue/20 mb-6 transition-colors text-center md:text-left">
                  {item.step}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary-navy mb-3 text-center md:text-left">
                    {item.title}
                  </h4>
                  <p className="text-soft-slate text-sm leading-relaxed text-center md:text-left">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO PREPARE ─────────────────────────────────────────────────── */}
      <section className="flex items-center py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-primary-navy mb-6 tracking-tight">
              What Information Should You Prepare?
            </h3>
            <p className="text-soft-slate text-lg">
              To ensure strong profile performance, keep the following ready:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200 text-center md:text-left">
                Business Information
              </h4>
              <ul className="space-y-3 text-soft-slate text-sm flex flex-col items-center md:items-start text-center md:text-left">
                <li>• Legal business name</li>
                <li>• Contact number</li>
                <li>• Official email</li>
                <li>• Website or social media page</li>
              </ul>
            </div>
            <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200 text-center md:text-left">
                Service Details
              </h4>
              <ul className="space-y-3 text-soft-slate text-sm flex flex-col items-center md:items-start text-center md:text-left">
                <li>• What services you provide</li>
                <li>• Types of events handled</li>
                <li>• Service process explanation</li>
                <li>• Unique selling points</li>
              </ul>
            </div>
            <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200 text-center md:text-left">
                Pricing Structure
              </h4>
              <p className="text-xs text-corporate-blue font-bold mb-3 text-center md:text-left">
                Transparency builds trust.
              </p>
              <ul className="space-y-3 text-soft-slate text-sm flex flex-col items-center md:items-start text-center md:text-left">
                <li>• Starting price</li>
                <li>• Per plate rate (for catering)</li>
                <li>• Package pricing</li>
                <li>• Custom pricing note</li>
              </ul>
            </div>
            <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
              <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200 text-center md:text-left">
                Portfolio
              </h4>
              <p className="text-xs text-corporate-blue font-bold mb-3 text-center md:text-left">
                Strong visuals improve inquiry conversion.
              </p>
              <ul className="space-y-3 text-soft-slate text-sm flex flex-col items-center md:items-start text-center md:text-left">
                <li>• High-quality images</li>
                <li>• Past event photos</li>
                <li>• Setup visuals</li>
                <li>• Client testimonials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADDITIONAL ADVANTAGES ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-corporate-blue/20 rounded-full blur-[100px] pointer-events-none opacity-50 -mt-32 -mr-32"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                  <Award className="text-accent-orange" /> Featured Vendor
                  Program
                </h3>
                <p className="text-blue-100/70 mb-4">
                  Premium vendors can apply for Featured Placement. This is
                  ideal for high-quality, premium service providers. Benefits
                  include:
                </p>
                <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                  <li>Homepage visibility</li>
                  <li>Category spotlight</li>
                  <li>Priority listing</li>
                  <li>Social media mention</li>
                  <li>Blog feature opportunity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                  <MapPin className="text-accent-orange" /> Multi-City Vendors
                </h3>
                <p className="text-blue-100/70 mb-4">
                  We support regional and national service providers. If you
                  operate in multiple cities, you can:
                </p>
                <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                  <li>List city-wise coverage</li>
                  <li>Appear on multiple city pages</li>
                  <li>Expand inquiry reach</li>
                </ul>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                  <Globe className="text-accent-orange" /> Destination Event
                  Vendors
                </h3>
                <p className="text-blue-100/70 mb-4">
                  You can tag destination coverage and attract outstation
                  inquiries if you manage:
                </p>
                <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                  <li>Destination weddings</li>
                  <li>Beach weddings</li>
                  <li>Hill station events</li>
                  <li>Resort events</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                  <Briefcase className="text-accent-orange" /> Corporate Vendor
                  Advantage
                </h3>
                <p className="text-blue-100/70 mb-4">
                  Corporate clients often look for structured professionalism.
                  If you specialize in corporate events:
                </p>
                <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                  <li>Mention corporate experience</li>
                  <li>Add client brand logos</li>
                  <li>Highlight compliance certifications</li>
                  <li>Showcase large-scale setups</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUIDELINES & QUESTIONS ─────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-corporate-blue via-accent-orange to-corporate-blue opacity-20"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-corporate-blue/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* LEFT COLUMN: Guidelines & Dashboard */}
            <div className="lg:col-span-12 xl:col-span-5 space-y-16">
              <div>
                <motion.div {...fadeInUp}>
                  <h3 className="text-3xl md:text-4xl font-black text-primary-navy mb-6 tracking-tight flex items-center gap-3">
                    <span className="w-1.5 h-10 bg-corporate-blue rounded-full"></span>
                    Quality Guidelines
                  </h3>
                  <p className="text-soft-slate text-lg mb-8 max-w-xl">
                    Eventibe focuses on professional and serious service
                    providers. To maintain platform integrity:
                  </p>
                </motion.div>

                <div className="space-y-4">
                  {[
                    {
                      text: "Use real images effectively",
                      desc: "Avoid stock photos or watermarked content.",
                    },
                    {
                      text: "Strict Price Transparency",
                      desc: "Maintain honest and updated pricing lists.",
                    },
                    {
                      text: "24h Response Standard",
                      desc: "Maintain a high inquiry-to-response ratio.",
                    },
                    {
                      text: "Professional Communication",
                      desc: "Ensure polite and structured client interactions.",
                    },
                  ].map((g, i) => (
                    <motion.div
                      key={i}
                      {...fadeInUp}
                      transition={{ delay: i * 0.1 }}
                      className="group flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 hover:border-corporate-blue/30 hover:shadow-md transition-all cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-corporate-blue/5 flex items-center justify-center text-corporate-blue group-hover:bg-corporate-blue group-hover:text-white transition-colors shrink-0">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-navy">
                          {g.text}
                        </h4>
                        <p className="text-xs text-soft-slate mt-1">{g.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 border border-orange-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-red-500 shadow-sm shrink-0">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <div>
                    <h5 className="font-bold text-red-600 text-sm mb-1 uppercase tracking-wider">
                      High Priority Note
                    </h5>
                    <p className="text-xs font-medium text-orange-900/80 leading-relaxed">
                      Vendors not maintaining response quality may be
                      deprioritized. We strictly avoid unverified or
                      non-event-related businesses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vendor Dashboard Preview */}
              <motion.div
                {...fadeInUp}
                className="bg-primary-navy rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-corporate-blue/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest mb-4">
                    <Layout size={12} />
                    <span>Future Ready</span>
                  </div>
                  <h3 className="text-3xl font-black mb-4">
                    Advanced Vendor Dashboard
                  </h3>
                  <p className="text-blue-100/60 text-sm mb-8 leading-relaxed">
                    We are building a powerful command center for your business
                    growth. Planned features include:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Real-time Inquiry Tracking",
                      "Rich Performance Analytics",
                      "Dynamic Profile Editor",
                      "Lead Management System",
                      "Subscription Center",
                    ].map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3 hover:bg-white/10 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-corporate-blue shadow-[0_0_8px_rgba(30,58,138,0.8)]"></div>
                        <span className="text-xs font-semibold text-white/90">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: FAQ & Advantage */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-12">
              <motion.div {...fadeInUp}>
                <h3 className="text-3xl md:text-4xl font-black text-primary-navy mb-8 tracking-tight text-center lg:text-left">
                  Frequently Asked Questions
                </h3>

                <div className="grid gap-4">
                  {[
                    {
                      q: "Is listing my service free?",
                      a: "Basic listing is currently free for early partners. Premium placements or featured spotlights may involve a transparent subscription or lead-based model discussed prior to activation.",
                    },
                    {
                      q: "Do I get guaranteed leads regularly?",
                      a: "While we generate traffic across categories, lead volume depends on market demand, your city competition, and the quality of your profile presentation on Eventibe.",
                    },
                    {
                      q: "Can I update my portfolio later?",
                      a: "Absolutely. You can request profile updates anytime via our partner support or manage it directly through your dashboard once your listing is active.",
                    },
                    {
                      q: "How quickly will my profile go live?",
                      a: "After verification and content review (usually 2-3 business days), we coordinate your 'Launch Day' to ensure all category tags are SEO optimized correctly.",
                    },
                  ].map((faq, i) => (
                    <motion.div
                      key={i}
                      {...fadeInUp}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-6 md:p-8 rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-corporate-blue/20 transition-all group"
                    >
                      <h4 className="font-bold text-xl text-primary-navy mb-4 group-hover:text-corporate-blue transition-colors flex justify-between items-center">
                        {faq.q}
                        <ArrowRight
                          size={18}
                          className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-corporate-blue"
                        />
                      </h4>
                      <p className="text-soft-slate text-sm leading-relaxed md:text-base opacity-80 group-hover:opacity-100 transition-opacity">
                        {faq.a}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Founding Partner Card */}
              <motion.div
                {...fadeInUp}
                className="bg-gradient-to-br from-white to-slate-50 border border-corporate-blue/10 rounded-[2.5rem] p-10 md:p-14 shadow-xl border-t-4 border-t-corporate-blue"
              >
                <div className="flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                    <h3 className="text-3xl font-black text-primary-navy mb-6">
                      Founding Partner Advantage
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Top-Tier Category Visibility",
                        "Founding Vendor Recognition",
                        "Early SEO Ranking Dominance",
                        "Priority Lead Routing",
                        "Direct Input on Features",
                      ].map((benefit) => (
                        <div key={benefit} className="flex items-center gap-3">
                          <Star
                            size={16}
                            className="text-accent-orange"
                            fill="currentColor"
                          />
                          <span className="text-sm font-bold text-soft-slate">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0">
                    <div className="w-32 h-32 rounded-full bg-corporate-blue/5 border-2 border-dashed border-corporate-blue/20 flex items-center justify-center p-2">
                      <div className="w-full h-full rounded-full bg-cta-gradient flex items-center justify-center text-white shadow-xl">
                        <Award size={40} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BOX ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-cta-gradient rounded-[3rem] p-12 md:p-16 text-center text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Ready to Grow Your Event Business?
              </h2>
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                Eventibe is building a structured marketplace where quality
                service providers connect with serious event hosts. If you
                deliver professional service, value long-term growth, want
                structured digital presence, and aim to expand city-wise — Then
                this platform is built for you.
              </p>
              <div
                onClick={() =>
                  document
                    .getElementById("submission-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-accent-orange px-10 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all duration-300 inline-block cursor-pointer shadow-xl cursor-pointer"
              >
                Join Us Today
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBMISSION FORM ─────────────────────────────────────────────────────── */}
      <section
        id="submission-form"
        className="py-20 md:py-32 bg-white border-t border-gray-100 relative overflow-hidden"
      >
        {/* Decorative Background Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-corporate-blue/5 rounded-full blur-[120px] -ml-64 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] -mr-64 -mb-24 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            {...fadeInUp}
            className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-gray-100"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">
                Become a Verified Service Partner
              </h2>
              <p className="text-soft-slate text-lg">
                Eventibe is an evolving marketplace designed to create
                structured visibility, meaningful inquiries, and sustainable
                vendor growth.
              </p>
            </div>

            {/* Multistep Progress Bar */}
            <div className="mb-10">
              <div className="flex justify-between mb-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`text-xs font-bold uppercase tracking-widest ${currentStep >= step ? "text-accent-orange" : "text-gray-400"}`}
                  >
                    Step {step}
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cta-gradient transition-all duration-500 ease-in-out"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* STEP 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-primary-navy mb-6">
                    1. General Info
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Business Name
                      </label>
                      <input
                        {...register("businessName")}
                        type="text"
                        placeholder="Legal Business Name"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.businessName && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.businessName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Contact Person
                      </label>
                      <input
                        {...register("contactPerson")}
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.contactPerson && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.contactPerson.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Phone Number
                      </label>
                      <input
                        {...register("phone")}
                        type="text"
                        placeholder="WhatsApp Number preferred"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="official@business.com"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Service Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-primary-navy mb-6">
                    2. Service Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Service Category
                      </label>
                      <div className="relative">
                        <select
                          {...register("category")}
                          className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none"
                        >
                          <option>Catering</option>
                          <option>Photography/Videography</option>
                          <option>Event Planning/Manager</option>
                          <option>Decor & Theme</option>
                          <option>Sound & DJ</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Sub-Category
                      </label>
                      <input
                        {...register("subCategory")}
                        type="text"
                        placeholder="e.g. Mehndi Artist"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.subCategory && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.subCategory.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Cities Served
                      </label>
                      <input
                        {...register("citiesServed")}
                        type="text"
                        placeholder="e.g. Jaipur, Delhi"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.citiesServed && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.citiesServed.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Years of Experience
                      </label>
                      <input
                        {...register("experience")}
                        type="text"
                        placeholder="e.g. 5 Years"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.experience && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.experience.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Starting Price (INR)
                      </label>
                      <input
                        {...register("price")}
                        type="text"
                        placeholder="e.g. 50,000"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.price && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Online Presence & Partnership */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-black text-primary-navy mb-6">
                    3. Verification & Description
                  </h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                      Website / Social Media
                    </label>
                    <input
                      {...register("website")}
                      type="text"
                      placeholder="https://..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                    />
                    {errors.website && (
                      <p className="text-xs text-red-500 pl-2">
                        {errors.website.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                      Portfolio Upload Link (Optional)
                    </label>
                    <input
                      {...register("portfolio")}
                      type="text"
                      placeholder="Link to Drive/Dropbox gallery..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        About Your Service
                      </label>
                      <textarea
                        {...register("aboutService")}
                        rows={4}
                        placeholder="Summarize your offerings..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none placeholder:text-gray-400 text-primary-navy"
                      />
                      {errors.aboutService && (
                        <p className="text-xs text-red-500 pl-2">
                          {errors.aboutService.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                        Message to Event Hosts
                      </label>
                      <textarea
                        {...register("messageToHost")}
                        rows={4}
                        placeholder="What makes your service unique?"
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none placeholder:text-gray-400 text-primary-navy"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">
                      Preferred Partnership Model
                    </label>
                    <div className="relative">
                      <select
                        {...register("partnershipModel")}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none"
                      >
                        <option>Free Basic Listing</option>
                        <option>Featured Listing Subscription</option>
                        <option>Lead-Based/Hybrid</option>
                        <option>Let's Discuss</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="pt-8 flex gap-4">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="flex-1 bg-white border-2 border-gray-100 text-soft-slate py-4 rounded-xl font-bold text-lg hover:border-corporate-blue hover:text-corporate-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Back
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex-[2] bg-cta-gradient text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Continue to Step {currentStep + 1}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex-[2] w-full bg-cta-gradient text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-center"
                  >
                    Submit
                  </button>
                )}
              </div>

              {currentStep === totalSteps && (
                <p className="text-center text-xs text-soft-slate mt-5 font-medium leading-relaxed">
                  Eventibe is not just another listing website. <br />
                  If you are ready to scale your service professionally — List
                  your service today and grow with Eventibe.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
