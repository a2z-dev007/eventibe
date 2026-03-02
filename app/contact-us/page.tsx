"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants, AnimatePresence } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Pin,
  Youtube,
  Send,
  CheckCircle2,
  HelpCircle,
  Building2,
  Clock,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";
import { TiltCard, MagneticButton } from "@/components/micro-interactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Contact Us Page - Eventibe
 * Built with premium modern UI/UX, fully responsive and animated.
 * Uses exact content provided.
 */
export default function ContactUsPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowFab(true);
      } else {
        setShowFab(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Animation Variants
  // Animation Sub-Variants
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const heroReveal: Variants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const staggerContainer: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
    whileInView: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const offices = [
    {
      city: "Delhi Head Office",
      address:
        "Samta Enclave, Near Mother Dairy, Qutub Vihar, Phase 1, Sector 19, Dwarka, New Delhi – 110071, India",
    },
    {
      city: "Bengaluru Office",
      address:
        "#590-10/1, 1st Cross, BEML Layout, Tubarahalli, Whitefield, Bengaluru, Karnataka – 560066, India",
    },
    {
      city: "North East Office",
      address:
        "Purna Saikia Complex, NH-37, Sonapur, Guwahati, Kamrup (Metro), Assam – 782402, India",
    },
    {
      city: "Kolkata Office",
      address:
        "Panchanantala, Panchpara, LP-494/55, Howrah, West Bengal – 711317, India",
    },
  ];

  const contactMethods = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "📞 Phone Support",
      details: [
        "Phone (India): +91-8800842084",
        "Alternate Number: +91-7399-666688",
        "(Available Monday – Friday, 9:00 AM – 7:00 PM IST)",
      ],
      description:
        "Our support team is available to help with inquiries related to Venue discovery and selection guidance, Vendor suggestions and contact process, Technical assistance, and Feedback and general questions.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "📱 WhatsApp Support",
      details: [
        "WhatsApp: +91-8800842084 / +91-7399-666888",
        "(24/7 support available)",
      ],
      description:
        "Need quick help or need to ask a short question? Message us on WhatsApp for fast responses from our support team.",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "📧 Email Support",
      details: [
        "General Support: support@eventibe.com",
        "Feedback & Suggestions: feedback@eventibe.com",
        "Vendor & Partnership Queries: partners@eventibe.com",
      ],
      description:
        "Prefer to share your inquiries in writing or attach details/documents? Email us — and our team will respond with personalized assistance.",
    },
  ];

  const faqs = [
    {
      q: "Q: Is Eventibe free to contact?",
      a: "Yes — you can contact us directly at no cost. Our inquiry services are free and designed to help you make confident decisions.",
    },
    {
      q: "Q: Can I request help for multiple venues?",
      a: "Absolutely. You can mention multiple venues in your inquiry and our team will assist you in comparison and next steps.",
    },
    {
      q: "Q: Will someone call me back?",
      a: "Yes — based on your preferred contact method (phone, email, WhatsApp), our team will reach out as soon as possible.",
    },
  ];

  return (
    <main className="bg-white min-h-screen font-sans selection:bg-accent-orange/30 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative  md:pb-16 md:pt-18 flex items-start md:items-center overflow-hidden bg-primary-navy py-8 ">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
            alt="Corporate Environment"
            fill
            className="object-cover opacity-25"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 z-[1]">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/50" />

          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Animated Glows */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-orange/20 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: [0.4, 0, 0.2, 1],
              delay: 1,
            }}
            className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-corporate-blue/20 rounded-full blur-[150px]"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={heroReveal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] md:text-xs font-bold mb-4 md:mb-6 backdrop-blur-md shadow-xl"
            >
              <Sparkles size={12} className="text-accent-orange" />
              <span>Dedicated Support for Your Events</span>
            </motion.div>

            <motion.h1
              variants={heroReveal}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 md:mb-6 tracking-tighter leading-[1.1] drop-shadow-2xl px-2"
            >
              Contact Us – <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-400">
                We’re Here to Help
              </span>
            </motion.h1>

            <motion.p
              variants={heroReveal}
              className="text-sm md:text-lg lg:text-xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto mb-8 md:mb-10"
            >
              Thank you for visiting Eventibe, your trusted destination for
              discovering the perfect venues and services for weddings,
              corporate events, and social celebrations.
            </motion.p>

            <motion.div
              variants={heroReveal}
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 px-4 w-full"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("contact-form")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto bg-cta-gradient text-white px-8 py-4.5 md:py-4 rounded-2xl font-black text-base md:text-base shadow-2xl shadow-orange-500/40 transition-all flex items-center justify-center gap-3"
              >
                Send a Message <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  document
                    .getElementById("reach-us")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full sm:w-auto bg-white/10 backdrop-blur-xl text-white border border-white/20 px-8 py-4.5 md:py-4 rounded-2xl font-black text-base md:text-base hover:bg-white/20 transition-all font-sans"
              >
                Ways to Reach Us
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro Context Banner */}
      <section className="py-10 md:py-16 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-soft-slate text-sm md:text-lg leading-relaxed font-medium">
              We’re here to make your event planning journey smooth, inspiring,
              and efficient. Whether you have questions about a venue, need help
              finding vendors, or want to share feedback — you can reach out to
              us anytime. Our dedicated team is ready to assist you with expert
              guidance, quick responses, and personalized support.
            </p>
          </div>
        </div>
      </section>

      {/* How to Reach Us Section */}
      <section id="reach-us" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16 px-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-6 tracking-tight">
              How to Reach Us
            </h2>
            <p className="text-soft-slate text-base md:text-lg max-w-2xl mx-auto font-medium">
              We offer multiple ways to connect with us — whatever is easiest
              for you. Choose from email, phone, WhatsApp, or by visiting us in
              person at one of our regional offices.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10"
          >
            {contactMethods.map((method, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group">
                <TiltCard className="h-full bg-white rounded-[32px] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="w-16 h-16 bg-corporate-blue/5 rounded-2xl flex items-center justify-center text-corporate-blue mb-8 group-hover:bg-corporate-blue group-hover:text-white transition-all duration-500">
                    {method.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-primary-navy mb-4">
                    {method.title}
                  </h3>
                  <p className="text-soft-slate text-sm md:text-base mb-8 leading-relaxed">
                    {method.description}
                  </p>
                  <div className="space-y-4 pt-6 border-t border-slate-50 w-full">
                    {method.details.map((detail, dIdx) => (
                      <p
                        key={dIdx}
                        className={`text-primary-navy font-bold line-clamp-2 ${detail.includes("IST") || detail.includes("support available") ? "text-xs text-soft-slate font-medium" : "text-sm md:text-base"}`}
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Regional Offices Section */}
      <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left"
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-6 tracking-tight">
                Visit Our Office – <br className="hidden md:block" /> Regional
                Presence
              </h2>
              <p className="text-soft-slate text-base md:text-lg lg:pr-10">
                Eventibe is part of the growing event discovery ecosystem. Our
                regional offices support local partnerships, venue onboarding,
                and corporate collaborations. You are welcome to visit during
                working hours.
              </p>
            </div>
            <div className="md:shrink-0">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-xs md:text-sm font-bold text-primary-navy">
                <Clock className="w-4 h-4 text-accent-orange" />
                Working Hours: 9:00 AM – 7:00 PM
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offices.map((office, idx) => (
              <motion.div
                key={idx}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[32px] p-8 border border-slate-200 hover:border-accent-orange/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 group-hover:bg-accent-orange/5 transition-all">
                  <MapPin className="w-7 h-7" />
                </div>
                <h4 className="text-lg md:text-xl font-black text-primary-navy mb-4">
                  {office.city}
                </h4>
                <p className="text-soft-slate text-sm leading-relaxed mb-8 flex-1">
                  {office.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-corporate-blue font-black text-xs md:text-sm inline-flex items-center gap-2 group/link hover:text-accent-orange transition-colors"
                >
                  View on Map
                  <div className="w-6 h-6 rounded-full bg-corporate-blue/5 flex items-center justify-center group-hover/link:bg-accent-orange group-hover/link:text-white transition-all">
                    <Send className="w-3 h-3" />
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
            {/* Left Side: Info */}
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-2/5 text-center lg:text-left"
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-8 tracking-tight">
                Start a Conversation
              </h2>
              <p className="text-soft-slate text-base md:text-lg mb-10 leading-relaxed font-medium">
                We make it easy to reach out directly through our website.
                Please fill in the form below with your details and message, and
                one of our team members will get back to you promptly — usually
                within a few business hours.
              </p>

              <div className="space-y-6 pt-10 border-t border-slate-100 flex flex-col items-center lg:items-start text-left max-w-md mx-auto lg:mx-0">
                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-black text-primary-navy mb-1">
                      Privacy Guaranteed
                    </h5>
                    <p className="text-soft-slate text-xs md:text-sm font-medium">
                      We respect your privacy. Your information will never be
                      shared and is used only to respond to your inquiry.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 group">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-black text-primary-navy mb-1">
                      Fast Response
                    </h5>
                    <p className="text-soft-slate text-xs md:text-sm font-medium">
                      Our typical response time is within 3-4 business hours
                      during working days.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-3/5 w-full bg-slate-50/50 border border-slate-200 rounded-[30px] md:rounded-[40px] p-6 lg:p-12 shadow-2xl shadow-slate-200/50 backdrop-blur-sm"
            >
              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-primary-navy ml-2">
                      Full Name*
                    </label>
                    <Input
                      placeholder="E.g. Shweta Singh"
                      className="bg-white border-slate-200 rounded-2xl h-14 md:h-16 px-6 font-medium focus:ring-accent-orange/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-primary-navy ml-2">
                      Email Address*
                    </label>
                    <Input
                      type="email"
                      placeholder="shweta@example.com"
                      className="bg-white border-slate-200 rounded-2xl h-14 md:h-16 px-6 font-medium focus:ring-accent-orange/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-black text-primary-navy ml-2">
                      Phone Number*
                    </label>
                    <Input
                      placeholder="+91 XXXX-XXXXXX"
                      className="bg-white border-slate-200 rounded-2xl h-14 md:h-16 px-6 font-medium focus:ring-accent-orange/20"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-black text-primary-navy ml-2">
                      City / Location
                    </label>
                    <Input
                      placeholder="Delhi, Mumbai, etc."
                      className="bg-white border-slate-200 rounded-2xl h-14 md:h-16 px-6 font-medium focus:ring-accent-orange/20"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-primary-navy ml-2">
                    Subject / Topic
                  </label>
                  <Input
                    placeholder="How can we help you?"
                    className="bg-white border-slate-200 rounded-2xl h-14 md:h-16 px-6 font-medium focus:ring-accent-orange/20"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-black text-primary-navy ml-2">
                    Message*
                  </label>
                  <Textarea
                    placeholder="Tell us more about your event or inquiry..."
                    className="bg-white border-slate-200 rounded-[24px] min-h-[160px] p-6 font-medium resize-none focus:ring-accent-orange/20"
                  />
                </div>

                <div className="space-y-5">
                  <label className="text-sm font-black text-primary-navy ml-2 block">
                    Preferred Contact Method
                  </label>
                  <div className="flex flex-wrap gap-4">
                    {["Call", "Email", "WhatsApp"].map((method) => (
                      <label
                        key={method}
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-3 bg-white border border-slate-200 px-4 py-4 rounded-xl cursor-pointer hover:border-accent-orange hover:bg-orange-50/30 transition-all group"
                      >
                        <input
                          type="radio"
                          name="contact_method"
                          className="w-4 h-4 accent-accent-orange"
                        />
                        <span className="text-sm font-black text-primary-navy group-hover:text-accent-orange">
                          {method}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-cta-gradient text-white py-6 rounded-2xl font-black text-lg md:text-xl shadow-xl shadow-orange-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-4 group"
                >
                  Send Message
                  <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </motion.button>

                <p className="text-center text-xs text-soft-slate italic">
                  ✉️ We respect your privacy. Your information is used only to
                  respond to your inquiry.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* When Should You Contact Us Section */}
      <section className="py-16 md:py-32 bg-primary-navy relative overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              When Should You Contact Us?
            </h2>
            <p className="text-white/60 text-lg md:text-xl font-medium">
              If you’re unsure where to begin, here’s a quick guide:
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {[
              {
                icon: <Building2 className="w-8 h-8" />,
                title: "Planning a Wedding?",
                text: "Let us help you find venues that match your vision, guest count, budget, and event style.",
              },
              {
                icon: <Send className="w-8 h-8" />,
                title: "Corporate Event Search?",
                text: "We support professionals in identifying spaces with the right capacity, facilities, and ambience.",
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Vendor Support",
                text: "If you are a vendor looking to list services, we’ll guide you through the process.",
              },
              {
                icon: <HelpCircle className="w-8 h-8" />,
                title: "General Support",
                text: "Questions about the platform, features, new ideas — we want to hear them.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-7 md:p-10 rounded-[30px] md:rounded-[40px] hover:bg-white/10 transition-all duration-300 group flex flex-col items-center text-center h-full"
              >
                <div className="text-accent-orange mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm md:text-base font-medium">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-16 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:items-center">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <div className="inline-block px-5 py-2 bg-orange-100 text-accent-orange rounded-full text-xs font-black mb-8 tracking-widest uppercase">
                OUR VALUES
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-8 tracking-tighter leading-tight">
                Our Commitment <br className="hidden md:block" /> to You
              </h2>
              <p className="text-soft-slate text-base md:text-xl mb-10 leading-relaxed font-medium">
                At Eventibe, we value service and responsiveness. When you reach
                out, you can expect:
              </p>
              <div className="space-y-6">
                {[
                  "Clear and friendly communication",
                  "Helpful advice tailored to your needs",
                  "Rapid response within business hours",
                  "Personalised support for complex queries",
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-5 items-center group">
                    <div className="shrink-0 w-8 h-8 bg-accent-orange rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-black text-primary-navy text-base md:text-lg">
                      {text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-14 p-8 border-l-8 border-accent-orange bg-white rounded-r-[32px] shadow-xl shadow-slate-200/50">
                <p className="text-lg md:text-xl text-primary-navy italic font-black">
                  &ldquo;We are not just a platform — we are your partner in
                  crafting unforgettable events.&rdquo;
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] bg-white rounded-[40px] md:rounded-[80px] p-4 shadow-2xl shadow-slate-300/40 relative z-10 overflow-hidden group">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                  alt="Commitment"
                  fill
                  className="object-cover rounded-[30px] md:rounded-[70px] group-hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* Floating Status Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-corporate-blue text-white p-6 md:p-10 rounded-[30px] md:rounded-[50px] shadow-2xl z-20"
              >
                <div className="text-3xl md:text-5xl font-black mb-1">24/7</div>
                <div className="text-[10px] md:text-sm font-bold opacity-80 uppercase tracking-widest text-center">
                  Support Active
                </div>
              </motion.div>

              {/* Abstract Shape Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent-orange/10 rounded-full blur-[100px] -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 md:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-8 tracking-tight">
              Connect on Social
            </h2>
            <p className="text-soft-slate text-base md:text-lg max-w-2xl mx-auto font-medium">
              Stay inspired with visual stories, featured venues, trends in
              event planning, tips from experts, and updates from Eventibe.
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="flex flex-wrap justify-center gap-6 md:gap-14"
          >
            {[
              {
                icon: <Facebook className="w-8 h-8" />,
                name: "Facebook",
                color: "bg-[#1877F2]",
              },
              {
                icon: <Instagram className="w-8 h-8" />,
                name: "Instagram",
                color: "bg-[#E4405F]",
              },
              {
                icon: <Linkedin className="w-8 h-8" />,
                name: "LinkedIn",
                color: "bg-[#0A66C2]",
              },
              {
                icon: <Pin className="w-8 h-8" />,
                name: "Pinterest",
                color: "bg-[#BD081C]",
              },
              {
                icon: <Youtube className="w-8 h-8" />,
                name: "YouTube",
                color: "bg-[#FF0000]",
              },
            ].map((social, idx) => (
              <MagneticButton key={idx}>
                <motion.div
                  variants={fadeInUp}
                  className="flex flex-col items-center gap-4 group cursor-pointer"
                >
                  <div
                    className={`w-20 h-20 ${social.color} text-white rounded-[24px] flex items-center justify-center shadow-2xl group-hover:scale-115 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {social.icon}
                  </div>
                  <span className="font-black text-primary-navy text-sm tracking-wide">
                    {social.name}
                  </span>
                </motion.div>
              </MagneticButton>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-20"
            >
              <div className="inline-block px-4 py-1 bg-blue-100 text-corporate-blue rounded-full text-[10px] font-black tracking-widest uppercase mb-4">
                FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-primary-navy mb-6 tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-soft-slate text-base md:text-lg font-medium">
                Quick answers to common inquiries about reaching out. Dynamic
                FAQs from Eventibe.
              </p>
            </motion.div>

            <Accordion type="single" collapsible className="space-y-5">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="bg-white border-none rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 group"
                >
                  <AccordionTrigger className="text-base md:text-xl font-black text-primary-navy hover:no-underline px-8 py-7 lg:px-10 group-data-[state=open]:text-accent-orange transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-soft-slate text-sm md:text-lg leading-relaxed px-8 pb-8 lg:px-10 font-medium">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Floating Action Button (Quick Contact) */}
      <AnimatePresence>
        {showFab && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] flex flex-col items-center gap-4"
          >
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.8 }}
                  className="flex flex-col gap-4 mb-2 cursor-pointer"
                >
                  {[
                    {
                      icon: <Phone size={22} />,
                      label: "Call Us",
                      href: "tel:+918800842084",
                      color: "bg-blue-600",
                    },
                    {
                      icon: <MessageCircle size={22} />,
                      label: "WhatsApp",
                      href: "https://wa.me/918800842084",
                      color: "bg-green-500",
                    },
                    {
                      icon: <Mail size={22} />,
                      label: "Email",
                      href: "mailto:support@eventibe.com",
                      color: "bg-accent-orange",
                    },
                  ].map((item, idx) => (
                    <motion.a
                      key={idx}
                      href={item.href}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`${item.color} text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-2xl relative group`}
                      title={item.label}
                    >
                      {item.icon}
                      <span className="absolute right-full mr-4 px-3 py-1 bg-primary-navy text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
                        {item.label}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative  cursor-pointer">
              {/* Pulse Glow Effect */}
              {!isExpanded && (
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1.8],
                    opacity: [0.5, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute inset-0 bg-accent-orange rounded-full -z-10"
                />
              )}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all  cursor-pointer duration-300 ${isExpanded ? "bg-primary-navy rotate-[135deg]" : "bg-accent-orange shadow-orange-500/40"}`}
              >
                {isExpanded ? (
                  <X className="text-white w-7 h-7" />
                ) : (
                  <MessageCircle className="text-white w-8 h-8" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
