'use client';

import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  Users, 
  BarChart3, 
  Globe2, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Handshake,
  Award,
  TrendingUp,
  Briefcase,
  Heart,
  MessageSquare,
  Building2,
  Camera,
  Utensils,
  Sparkles,
  Search,
  Laptop,
  Settings,
  FileText,
  ClipboardCheck,
  UserPlus,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard, MagneticButton } from '@/components/micro-interactions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  designation: z.string().min(2, "Designation is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(2, "City/Cities are required"),
  category: z.string().min(1, "Please select a category"),
  experience: z.string().min(1, "Years of experience is required"),
  portfolio: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  about: z.string().min(10, "Brief description should be at least 10 characters"),
  model: z.string().min(2, "Expected model is required"),
});

type FormData = z.infer<typeof formSchema>;

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function PartnerWithUsPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    }
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    alert("Thank you for your interest! Our team will contact you soon.");
  };

  return (
    <div className="bg-white min-h-screen font-inter overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/partner-hero.png"
            alt="Partner with Eventibe"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/40 via-transparent to-white" />
        </div>

        <div className="container relative z-10 px-6 text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight"
          >
            Partner With Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-3xl font-medium max-w-3xl mx-auto mb-10 text-gray-200"
          >
            Let’s Build the Future of Events — Together
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <MagneticButton>
              <Button size="lg" className="bg-cta-gradient h-14 px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-orange-500/20 hover:scale-105 transition-transform">
                Explore Opportunity <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
           <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
              <div className="w-1 h-2 bg-white rounded-full" />
           </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 container px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            {...fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-corporate-blue text-sm font-bold mb-6"
          >
            <Sparkles className="w-4 h-4" /> OUR ECOSYSTEM
          </motion.div>
          <motion.p 
            {...fadeInUp}
            className="text-2xl md:text-4xl font-semibold text-primary-navy leading-tight mb-8"
          >
            At Eventibe, we are not just building a venue listing platform. We are building a structured, scalable, and intelligent event ecosystem.
          </motion.p>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-soft-slate mb-6"
          >
            From weddings and luxury celebrations to corporate conferences and large-scale exhibitions, Eventibe connects event hosts with venues and vendors through a refined inquiry-driven marketplace.
          </motion.p>
          <motion.p 
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-lg font-bold text-corporate-blue"
          >
            We believe meaningful growth happens through strategic partnerships.
          </motion.p>
          <motion.p 
             {...fadeInUp}
             transition={{ delay: 0.6 }}
             className="text-soft-slate mt-8 max-w-2xl mx-auto"
          >
            If you are an agency, corporate group, hospitality brand, wedding planner, event management company, media house, or technology provider — we invite you to partner with us.
          </motion.p>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy mb-4">Why Partner With Eventibe?</h2>
            <p className="text-xl text-soft-slate">The event industry is evolving.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              { title: "Transparency", icon: ShieldCheck },
              { title: "Faster response", icon: Zap },
              { title: "Verified options", icon: CheckCircle2 },
              { title: "Multiple comparisons", icon: Target },
              { title: "Professional vendor networks", icon: Users },
              { title: "Seamless communication", icon: MessageSquare }
            ].map((item, idx) => (
              <TiltCard key={idx} className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-corporate-blue">
                  <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-primary-navy mb-2">{item.title}</h3>
                <p className="text-soft-slate text-sm">Clients today expect {item.title.toLowerCase()} for their events.</p>
              </TiltCard>
            ))}
          </div>

          <div className="bg-primary-navy rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl -mr-32 -mt-32" />
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                <div>
                   <h3 className="text-2xl md:text-3xl font-bold mb-6">Eventibe is designed to become the bridge between event demand and event supply.</h3>
                   <p className="text-gray-300 text-base md:text-lg mb-8">By partnering with us, you gain access to:</p>
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "A growing network of venues across cities",
                        "Structured inquiry pipeline",
                        "Lead management ecosystem",
                        "Brand visibility in social & corporate segments",
                        "Long-term scalable collaboration"
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-200">
                          <CheckCircle2 className="w-5 h-5 text-accent-orange flex-shrink-0" />
                          <span className="text-sm md:text-base">{benefit}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="text-center lg:text-left border-t lg:border-t-0 lg:border-l border-white/10 pt-10 lg:pt-0 lg:pl-12">
                   <p className="text-xl md:text-2xl font-light italic mb-8">"We are creating a platform where collaboration is stronger than competition."</p>
                   <div className="w-16 h-1 bg-accent-orange mx-auto lg:mx-0" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Who Can Partner Section */}
      <section className="py-16 container px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy mb-4">Who Can Partner With Us?</h2>
          <p className="text-xl text-soft-slate mb-8">Eventibe partnership program is open to:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Category 1 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-600 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">1. Wedding Planning Companies</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">If you are a: Wedding planner, Luxury wedding curator, Destination wedding specialist, Bridal consultant.</p>
            <div className="space-y-2 mt-6">
               <p className="font-bold text-xs uppercase tracking-wider text-gray-400">Collaboration Focus:</p>
               <ul className="space-y-2">
                 {["Venue sourcing", "Vendor coordination", "Lead exchange", "Featured planner profile", "City-wise representation"].map(item => (
                   <li key={item} className="flex items-center gap-2 text-soft-slate text-sm">
                     <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </TiltCard>

          {/* Category 2 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">2. Corporate Event Management Companies</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">Managing: Conferences, Seminars, Product launches, Corporate training, Award functions, Exhibitions.</p>
            <div className="space-y-2 mt-6">
               <p className="font-bold text-xs uppercase tracking-wider text-gray-400">Our Support:</p>
               <ul className="space-y-2">
                 {["Verified venue database", "Quick proposal support", "Bulk venue sourcing", "Dedicated partnership structure"].map(item => (
                   <li key={item} className="flex items-center gap-2 text-soft-slate text-sm">
                     <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </TiltCard>

          {/* Category 3 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">3. Hospitality & Venue Aggregators</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">Managing: Banquet halls, Convention centers, Wedding resorts, Business hotels, Farmhouses, Luxury properties.</p>
            <p className="text-corporate-blue font-bold text-sm mt-6">Eventibe can become your digital demand partner.</p>
          </TiltCard>

          {/* Category 4 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Globe2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">4. Destination Management Companies (DMCs)</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">Handling: Destination weddings, Corporate offsites, MICE events, Group travel events.</p>
            <div className="space-y-2 mt-6">
               <p className="font-bold text-xs uppercase tracking-wider text-gray-400">We Provide:</p>
               <ul className="space-y-2">
                 {["Lead funnel", "Cross-city venue access", "Vendor discovery support", "Digital presence boost"].map(item => (
                   <li key={item} className="flex items-center gap-2 text-soft-slate text-sm">
                     <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </TiltCard>

          {/* Category 5 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">5. Event Vendors & Service Providers</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">Catering, Decor, Lighting, AV, Photography, Mehndi, Tent & theme setup companies.</p>
            <div className="space-y-2 mt-6">
               <p className="font-bold text-xs uppercase tracking-wider text-gray-400">We Enable:</p>
               <ul className="space-y-2">
                 {["Lead generation", "Marketplace listing", "Direct inquiry access", "Category visibility"].map(item => (
                   <li key={item} className="flex items-center gap-2 text-soft-slate text-sm">
                     <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </TiltCard>

          {/* Category 6 */}
          <TiltCard className="group p-8 rounded-[32px] border border-gray-100 bg-white hover:border-corporate-blue/20 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                <Laptop className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold">6. Media & Content Partners</h3>
            </div>
            <p className="text-soft-slate text-sm mb-4">Operating: Wedding blogs, Corporate magazines, Hospitality publications, Event social channels.</p>
            <div className="space-y-2 mt-6">
               <p className="font-bold text-xs uppercase tracking-wider text-gray-400">We Welcome:</p>
               <ul className="space-y-2">
                 {["Content collaborations", "Sponsored features", "Industry insights exchange"].map(item => (
                   <li key={item} className="flex items-center gap-2 text-soft-slate text-sm">
                     <span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </TiltCard>
        </div>
        
        <div className="mt-12 md:mt-16 bg-blue-50/50 p-8 md:p-10 rounded-[40px] border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-6">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                <Settings className="w-8 h-8 text-corporate-blue" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-primary-navy mb-1">7. Technology & SaaS Providers</h3>
                <p className="text-soft-slate text-sm md:text-base">CRM tools, Event software, Virtual platforms, Ticketing, Analytics.</p>
              </div>
           </div>
           <p className="text-lg md:text-xl font-bold text-corporate-blue text-center">Let’s integrate and build a smarter ecosystem.</p>
        </div>
      </section>

      {/* Partnership Models */}
      <section className="py-16 bg-primary-navy text-white">
        <div className="container px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Our Partnership Models</h2>
            <p className="text-xl text-gray-300">Eventibe believes in flexible and transparent partnership structures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                num: "1", title: "Strategic Alliance Partnership", 
                ideal: "Large event companies, Multi-city planners, Hospitality groups",
                features: ["Priority lead routing", "Joint branding", "Co-marketing initiatives", "Dedicated account manager"]
              },
              { 
                num: "2", title: "Lead Exchange Partnership", 
                ideal: "Event planners, Corporate event managers",
                features: ["We share venue leads", "You manage event execution", "Revenue model structured mutually"]
              },
              { 
                num: "3", title: "Featured Partner Program", 
                ideal: "Premium vendors, Luxury venues, High-end planners",
                features: ["Homepage visibility", "Category highlight", "SEO positioning", "Social media spotlight"]
              },
              { 
                num: "4", title: "City Representation Partner", 
                ideal: "Dominant players in a city's event market",
                features: ["You become city representative", "We route filtered inquiries", "You manage offline execution"]
              }
            ].map((model, idx) => (
              <div key={idx} className="group p-10 rounded-[40px] border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                <div className="text-accent-orange font-bold text-lg mb-4">Model 0{model.num}</div>
                <h3 className="text-2xl font-bold mb-6">{model.title}</h3>
                <div className="mb-8 p-4 rounded-2xl bg-white/5">
                   <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-2">Ideal for:</p>
                   <p className="text-gray-200">{model.ideal}</p>
                </div>
                <ul className="space-y-3">
                  {model.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent-orange" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy mb-8 leading-tight">What Makes Eventibe Different?</h2>
              <p className="text-xl text-soft-slate mb-8">Unlike booking portals that focus only on room inventory or standard packages, Eventibe is:</p>
              <div className="flex flex-wrap gap-4 mb-10">
                {["Inquiry-first", "Event-specialized", "Vendor-inclusive", "Social + Corporate balanced", "Category-driven", "City-optimized", "SEO structured"].map(tag => (
                  <span key={tag} className="px-6 py-3 rounded-full bg-blue-50 text-corporate-blue font-bold text-sm border border-blue-100">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-6">
                 <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <p className="text-xl font-bold text-primary-navy">We are not replacing planners.</p>
                    <p className="text-corporate-blue font-extrabold">We are empowering planners.</p>
                 </div>
                 <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <p className="text-xl font-bold text-primary-navy">We are not competing with agencies.</p>
                    <p className="text-corporate-blue font-extrabold">We are enabling agencies.</p>
                 </div>
              </div>
           </div>
           <div className="relative">
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
                 <Image src="/partner-hero.png" fill className="object-cover" alt="Differentiation" />
                 <div className="absolute inset-0 bg-blue-900/20" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[40px] shadow-xl border border-gray-100 max-w-xs">
                 <Award className="w-12 h-12 text-accent-orange mb-4" />
                 <h4 className="text-xl font-bold text-primary-navy mb-2">Premiere Portal</h4>
                 <p className="text-soft-slate text-sm">Building the future of events with industry leaders.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-navy mb-4">Partnership Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                title: "Brand Visibility", 
                icon: Globe2,
                desc: "Be visible across city pages, category pages, featured sections, and blog mentions."
              },
              { 
                title: "Qualified Leads", 
                icon: Target,
                desc: "Filters inquiries through event type, guest count, date, and budget intent. Receive more relevant leads."
              },
              { 
                title: "Digital Presence Growth", 
                icon: TrendingUp,
                desc: "Gain SEO presence and appear in search-based queries to increase inbound visibility."
              },
              { 
                title: "Multi-City Expansion", 
                icon: Globe2,
                desc: "Expand to new cities with our venue network supporting cross-city event management."
              },
              { 
                title: "Structured Data", 
                icon: BarChart3,
                desc: "Access event demand analytics, seasonal insights, price trends, and vendor reports."
              }
            ].map((item, i) => (
              <div key={i} className="group bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-corporate-blue mb-8 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-primary-navy mb-4">{item.title}</h3>
                <p className="text-soft-slate leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Partnership Process Works */}
      <section className="py-12 bg-white">
        <div className="container px-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-accent-orange text-[10px] font-black uppercase tracking-widest mb-4 border border-orange-100"
            >
              The Roadmap
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">How Partnership Process Works</h2>
            <p className="text-base text-soft-slate">A transparent and structured journey from inquiry to successful collaboration.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* The Main Gradient Path */}
            <div className="absolute left-[32px] md:left-1/2 top-10 bottom-10 w-[2px] bg-gradient-to-b from-corporate-blue via-accent-orange to-emerald-400 md:-translate-x-1/2 z-0 opacity-20" />
            
            <div className="space-y-10 relative z-10">
              {[
                { 
                  step: "01", 
                  title: "Submit Partnership Form", 
                  icon: <FileText className="w-6 h-6" />,
                  details: "Provide your company details, operational cities, and portfolio for initial vetting.",
                  badge: "Discovery",
                  color: "blue"
                },
                { 
                  step: "02", 
                  title: "Evaluation & Discussion", 
                  icon: <Search className="w-6 h-6" />,
                  details: "Our team conducts a high-level review of your brand alignment and service quality metrics.",
                  badge: "Vetting",
                  color: "orange"
                },
                { 
                  step: "03", 
                  title: "Agreement Structure", 
                  icon: <ClipboardCheck className="w-6 h-6" />,
                  details: "We finalize the most suitable collaboration model (Subscription, Commission, or Hybrid).",
                  badge: "Strategy",
                  color: "purple"
                },
                { 
                  step: "04", 
                  title: "Onboarding", 
                  icon: <UserPlus className="w-6 h-6" />,
                  details: "We map your profile to target categories and cities, ensuring high search visibility.",
                  badge: "Setup",
                  color: "emerald"
                },
                { 
                  step: "05", 
                  title: "Go Live", 
                  icon: <Rocket className="w-6 h-6" />,
                  details: "Your brand becomes active on the Eventibe marketplace, ready to receive qualified leads.",
                  badge: "Launch",
                  color: "rose"
                }
              ].map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-6 lg:gap-12 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Content Card Side */}
                  <div className="flex-1 w-full text-left">
                    <motion.div
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <TiltCard className="group">
                        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_5px_20px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 relative overflow-hidden h-full text-left">
                          {/* Inner Gradient Glow */}
                          <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none ${
                            item.color === 'blue' ? 'bg-blue-600' : 
                            item.color === 'orange' ? 'bg-orange-600' : 
                            item.color === 'purple' ? 'bg-purple-600' :
                            item.color === 'emerald' ? 'bg-emerald-600' : 'bg-rose-600'
                          }`} />
                          
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 border ${
                            item.color === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                            item.color === 'orange' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                            item.color === 'purple' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                            item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            {item.badge}
                          </div>
                          
                          <h3 className="text-xl md:text-2xl font-extrabold text-primary-navy mb-3 group-hover:text-corporate-blue transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-soft-slate text-base leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </TiltCard>
                    </motion.div>
                  </div>
                  
                  {/* Center Node */}
                  <div className="relative z-20 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-white shadow-xl relative transition-all duration-500 hover:scale-110 ${
                        item.color === 'blue' ? 'bg-blue-600' : 
                        item.color === 'orange' ? 'bg-orange-600' : 
                        item.color === 'purple' ? 'bg-purple-600' :
                        item.color === 'emerald' ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    >
                      <div className="text-white">
                        {item.icon}
                      </div>
                      {/* Floating Step Number Label */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] font-black text-primary-navy">
                        {item.step}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Spacer for Alternate layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Corporate & Marketing */}
      <section className="py-16 bg-primary-navy overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] -mr-[250px] -mt-[250px]" />
         <div className="container px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
               <div>
                  <h2 className="text-4xl font-extrabold text-white mb-10">Corporate Collaboration Program</h2>
                  <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
                     <p className="text-accent-orange font-bold mb-4">For corporations hosting frequent events:</p>
                     <ul className="space-y-4 mb-8">
                        {[
                          "Dedicated venue sourcing desk",
                          "Multi-city corporate pricing discussions",
                          "Pre-verified venue suggestions",
                          "Vendor alignment support"
                        ].map(item => (
                          <li key={item} className="flex items-center gap-3 text-gray-200">
                             <CheckCircle2 className="w-5 h-5 text-accent-orange" /> {item}
                          </li>
                        ))}
                     </ul>
                     <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">Ideal for:</p>
                     <p className="text-gray-300">Enterprises, Training companies, Product marketing teams, HR departments.</p>
                  </div>
               </div>
               <div>
                  <h2 className="text-4xl font-extrabold text-white mb-10">Co-Marketing & Brand Promotion</h2>
                  <p className="text-xl text-gray-300 mb-8">We believe in shared visibility.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {[
                       "Joint webinars",
                       "Industry reports",
                       "Social media campaigns",
                       "Wedding trend features",
                       "Corporate event insights blog",
                       "Newsletter features"
                     ].map(item => (
                       <div key={item} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 flex items-center gap-3">
                          <Zap className="w-4 h-4 text-accent-orange" /> {item}
                       </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Vision & Ethics */}
      <section className="py-16 container px-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
               <h2 className="text-4xl font-extrabold text-primary-navy mb-8">Our Vision for the Next 5 Years</h2>
               <p className="text-lg text-soft-slate mb-8">Eventibe aims to:</p>
               <ul className="space-y-4">
                  {[
                    "Become a leading event venue marketplace",
                    "Cover 100+ cities",
                    "List thousands of verified venues",
                    "Create a strong vendor ecosystem",
                    "Introduce smart inquiry automation",
                    "Enable event data analytics"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-primary-navy font-medium">
                       <TrendingUp className="w-5 h-5 text-corporate-blue" /> {item}
                    </li>
                  ))}
               </ul>
               <p className="mt-8 font-bold text-corporate-blue">Partnerships will be the foundation of this growth.</p>
            </div>
            <div className="bg-gray-50 p-12 rounded-[40px] border border-gray-100">
               <h2 className="text-4xl font-extrabold text-primary-navy mb-8">Ethical & Transparent Collaboration</h2>
               <div className="flex flex-wrap gap-4 mb-8">
                  {["Fair communication", "Transparent revenue", "Clear lead ownership", "Mutual growth", "Long-term sustainability"].map(item => (
                    <span key={item} className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-soft-slate">
                      {item}
                    </span>
                  ))}
               </div>
               <p className="text-soft-slate mb-6">We do not believe in aggressive short-term tactics. We believe in strategic, stable collaboration.</p>
               <div className="h-0.5 w-full bg-gray-200 my-8" />
               <h3 className="text-2xl font-bold text-primary-navy mb-4">Why Partner Early?</h3>
               <ul className="space-y-3">
                  {[
                    "Founding partner recognition",
                    "Higher category placement",
                    "Long-term commercial advantage",
                    "Strategic input access",
                    "Platform feature feedback opportunity"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-3 text-soft-slate">
                       <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {item}
                    </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>

      {/* Form Section */}
      <section id="partner-form" className="py-16 bg-blue-50/30">
        <div className="container px-6">
          <div className="max-w-5xl mx-auto rounded-[40px] md:rounded-[60px] bg-white shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
             <div className="md:w-1/3 bg-primary-navy p-8 md:p-12 text-white flex flex-col justify-between">
                <div>
                   <h2 className="text-3xl md:text-4xl font-extrabold mb-6 md:mb-8">Let’s Build Together</h2>
                   <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                     The event industry is experience-driven. Every event matters.
                   </p>
                   <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                     If you share the vision of building a structured event ecosystem — We would love to collaborate.
                   </p>
                </div>
                <div className="mt-8 md:mt-12">
                   <div className="flex -space-x-3 mb-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-primary-navy bg-gray-600" />
                      ))}
                   </div>
                   <p className="text-xs md:text-sm font-bold text-accent-orange">Join 200+ growing partners</p>
                </div>
             </div>
             
             <div className="flex-1 p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-primary-navy mb-2">Become a Partner</h3>
                  <p className="text-soft-slate text-sm">Fill out the form below and our team will get in touch.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="companyName" className="text-sm font-semibold">Company Name <span className="text-red-500">*</span></Label>
                        <Input 
                          id="companyName" 
                          {...register('companyName')} 
                          placeholder="Eventibe Solutions" 
                          className={`h-11 rounded-xl ${errors.companyName ? 'border-red-500' : ''}`} 
                        />
                        {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contactPerson" className="text-sm font-semibold">Contact Person <span className="text-red-500">*</span></Label>
                        <Input 
                          id="contactPerson" 
                          {...register('contactPerson')} 
                          placeholder="John Doe" 
                          className={`h-11 rounded-xl ${errors.contactPerson ? 'border-red-500' : ''}`} 
                        />
                        {errors.contactPerson && <p className="text-red-500 text-xs mt-1">{errors.contactPerson.message}</p>}
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="designation" className="text-sm font-semibold">Designation <span className="text-red-500">*</span></Label>
                        <Input 
                          id="designation" 
                          {...register('designation')} 
                          placeholder="CEO / MD" 
                          className={`h-11 rounded-xl ${errors.designation ? 'border-red-500' : ''}`} 
                        />
                        {errors.designation && <p className="text-red-500 text-xs mt-1">{errors.designation.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number <span className="text-red-500">*</span></Label>
                        <Input 
                          id="phone" 
                          {...register('phone')} 
                          placeholder="+91 00000 00000" 
                          className={`h-11 rounded-xl ${errors.phone ? 'border-red-500' : ''}`} 
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-sm font-semibold">Email <span className="text-red-500">*</span></Label>
                        <Input 
                          id="email" 
                          type="email" 
                          {...register('email')} 
                          placeholder="partner@yourcompany.com" 
                          className={`h-11 rounded-xl ${errors.email ? 'border-red-500' : ''}`} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="city" className="text-sm font-semibold">Cities Served <span className="text-red-500">*</span></Label>
                        <Input 
                          id="city" 
                          {...register('city')} 
                          placeholder="Delhi, Mumbai..." 
                          className={`h-11 rounded-xl ${errors.city ? 'border-red-500' : ''}`} 
                        />
                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                      </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      <div className="space-y-1.5">
                        <Label htmlFor="category" className="text-sm font-semibold">Category <span className="text-red-500">*</span></Label>
                        <Controller
                          name="category"
                          control={control}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger className={`h-11 rounded-xl ${errors.category ? 'border-red-500' : ''}`}>
                                <SelectValue placeholder="Select Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="wedding-planner">Wedding Planner</SelectItem>
                                <SelectItem value="corporate-manager">Corporate Event Manager</SelectItem>
                                <SelectItem value="venue-group">Venue Group</SelectItem>
                                <SelectItem value="catering">Catering Company</SelectItem>
                                <SelectItem value="decor">Decor Company</SelectItem>
                                <SelectItem value="photography">Photography</SelectItem>
                                <SelectItem value="dmc">DMC</SelectItem>
                                <SelectItem value="tech">Technology Provider</SelectItem>
                                <SelectItem value="media">Media Partner</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="experience" className="text-sm font-semibold">Years of Experience <span className="text-red-500">*</span></Label>
                        <Input 
                          id="experience" 
                          {...register('experience')} 
                          placeholder="e.g. 5+" 
                          className={`h-11 rounded-xl ${errors.experience ? 'border-red-500' : ''}`} 
                        />
                        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience.message}</p>}
                      </div>
                   </div>

                   <div className="space-y-1.5">
                      <Label htmlFor="portfolio" className="text-sm font-semibold">Portfolio / Website</Label>
                      <Input 
                        id="portfolio" 
                        {...register('portfolio')} 
                        placeholder="https://www.yourcompany.com" 
                        className={`h-11 rounded-xl ${errors.portfolio ? 'border-red-500' : ''}`} 
                      />
                      {errors.portfolio && <p className="text-red-500 text-xs mt-1">{errors.portfolio.message}</p>}
                   </div>

                   <div className="space-y-1.5">
                      <Label htmlFor="about" className="text-sm font-semibold">About Company <span className="text-red-500">*</span></Label>
                      <Textarea 
                        id="about" 
                        {...register('about')} 
                        placeholder="Tell us about your services..." 
                        className={`rounded-xl min-h-[80px] ${errors.about ? 'border-red-500' : ''}`} 
                      />
                      {errors.about && <p className="text-red-500 text-xs mt-1">{errors.about.message}</p>}
                   </div>

                   <div className="space-y-1.5">
                      <Label htmlFor="model" className="text-sm font-semibold">Expected Collaboration <span className="text-red-500">*</span></Label>
                      <Input 
                        id="model" 
                        {...register('model')} 
                        placeholder="Strategic / Lead Exchange" 
                        className={`h-11 rounded-xl ${errors.model ? 'border-red-500' : ''}`} 
                      />
                      {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model.message}</p>}
                   </div>

                   <div className="pt-2">
                       <Button type="submit" className="w-full bg-cta-gradient h-12 md:h-14 rounded-2xl text-base md:text-lg font-bold hover:opacity-90 active:scale-[0.98] transition-all shadow-lg">
                         Submit Partnership Inquiry
                       </Button>
                   </div>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 container px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-navy mb-8 text-center px-4 md:px-0">Frequently Asked Questions (Partnership)</h2>
          
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-gray-100 rounded-[28px] px-6 md:px-8 bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-bold text-primary-navy hover:no-underline py-5 md:py-6 text-left">
                Is there a cost to partner?
              </AccordionTrigger>
              <AccordionContent className="text-soft-slate pb-6">
                Cost structure depends on partnership model. Our team will discuss based on scale and category.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border border-gray-100 rounded-[28px] px-6 md:px-8 bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-bold text-primary-navy hover:no-underline py-5 md:py-6 text-left">
                Do you guarantee leads?
              </AccordionTrigger>
              <AccordionContent className="text-soft-slate pb-6">
                Lead volume depends on city demand, category strength, and profile quality. We focus on relevant lead distribution.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border border-gray-100 rounded-[28px] px-6 md:px-8 bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-bold text-primary-navy hover:no-underline py-5 md:py-6 text-left">
                Can I partner in multiple cities?
              </AccordionTrigger>
              <AccordionContent className="text-soft-slate pb-6">
                Yes, if you have operational presence.
              </AccordionContent>
            </AccordionItem>
 
            <AccordionItem value="item-4" className="border border-gray-100 rounded-[28px] px-6 md:px-8 bg-white overflow-hidden shadow-sm">
              <AccordionTrigger className="text-base md:text-lg font-bold text-primary-navy hover:no-underline py-5 md:py-6 text-left">
                Is there exclusivity?
              </AccordionTrigger>
              <AccordionContent className="text-soft-slate pb-6">
                Exclusivity can be discussed for strategic alliance partnerships.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final Note Section */}
      <section className="py-16 bg-primary-navy text-white text-center">
         <div className="container px-6">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8">Final Note</h2>
            <div className="max-w-3xl mx-auto">
               <p className="text-xl md:text-2xl font-light mb-8">Eventibe is not just a website. It is a growing event marketplace platform.</p>
               <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                 We are building with intention, structure, and long-term clarity. If you want to grow digitally, expand geographically, and align with a curated event ecosystem —
               </p>
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 className="inline-block"
               >
                 <h3 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400 mb-12">
                   Let’s partner.
                 </h3>
               </motion.div>
                <br />
                <Button size="lg" className="bg-white text-primary-navy h-14 md:h-16 px-10 md:px-12 text-lg md:text-xl font-bold rounded-2xl hover:bg-gray-100 active:scale-[0.98] transition-all">
                  Get Started Today
                </Button>
            </div>
         </div>
      </section>
    </div>
  );
}
