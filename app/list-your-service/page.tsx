'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Award
} from 'lucide-react';
import { TiltCard } from '@/components/micro-interactions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const serviceFormSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  
  category: z.string().min(1, 'Please select a service category'),
  subCategory: z.string().min(1, 'Sub-category is required'),
  citiesServed: z.string().min(1, 'Cities are required'),
  experience: z.string().min(1, 'Experience is required'),
  price: z.string().min(1, 'Required'),
  
  website: z.string().url('Please provide a valid URL'),
  portfolio: z.string().optional(),
  aboutService: z.string().min(10, 'Please provide more details'),
  messageToHost: z.string().optional(),
  partnershipModel: z.string().min(1, 'Select a model')
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ListYourServicePage() {
  const fadeInUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    mode: 'onTouched',
    defaultValues: {
      category: 'Photography/Videography',
      partnershipModel: 'Free Basic Listing'
    }
  });

  const handleNext = async () => {
    let fieldsToValidate: any = [];
    if (currentStep === 1) {
      fieldsToValidate = ['businessName', 'contactPerson', 'phone', 'email'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['category', 'subCategory', 'citiesServed', 'experience', 'price'];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const onSubmit = (data: ServiceFormValues) => {
    console.log(data);
    alert('Application Submitted Successfully!');
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
              backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl text-left">
            <motion.div 
               {...fadeInUp} 
               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 shadow-xl backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-accent-orange" />
              <span>Grow Your Event Business with Eventibe</span>
            </motion.div>
            
            <motion.h1 
              {...fadeInUp} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.15] md:leading-[1.1] tracking-tight drop-shadow-md"
            >
              List Your Service
            </motion.h1>
            
            <motion.p 
               {...fadeInUp} transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-3xl font-medium space-y-4"
            >
              <span className="block mb-2">The event industry is evolving rapidly.</span>
              <span className="block mb-2">Today, event hosts search online before finalizing vendors. Whether it’s a wedding, corporate conference, product launch, or social celebration — clients want verified, visible, and reliable service providers.</span>
              <span className="block mb-2">Eventibe is building a powerful event marketplace that connects event hosts directly with professional service providers across cities.</span>
              <span className="block text-accent-orange font-bold">If you offer event-related services, this is your opportunity to expand your reach, increase inquiries, and grow your business.</span>
            </motion.p>

            <motion.div 
              {...fadeInUp} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div 
                onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cta-gradient text-white px-8 py-4 rounded-[1rem] font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 w-fit"
              >
                List Your Service Today <ArrowRight size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY LIST ON EVENTIBE ──────────────────────────────────────────────────────── */}
      <section className="flex items-center py-20 md:py-28 bg-light-bg overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Text Column */}
            <div className="space-y-6 md:space-y-10 lg:col-span-12 order-1">
              <motion.div {...fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-corporate-blue/5 border border-corporate-blue/10 text-corporate-blue text-xs font-bold uppercase tracking-widest mb-6">
                  Why List Your Service on Eventibe?
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-primary-navy leading-tight tracking-tight mb-6">
                  Eventibe is not just <br />
                  <span className="text-corporate-blue">a directory.</span>
                </h2>
                <p className="text-lg text-soft-slate leading-relaxed mb-10 max-w-4xl">
                  It is a structured, inquiry-driven event marketplace designed to generate relevant leads and help vendors grow sustainably.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "1. Get Direct Inquiries", 
                      desc: "Event hosts searching for services in your city can view your profile, explore your portfolio, understand your offerings, and send direct inquiries. No unnecessary middle layers.", 
                      icon: MessageSquare 
                    },
                    { 
                      title: "2. Increase Digital Visibility", 
                      desc: "Many excellent service providers operate offline or through word-of-mouth. Eventibe helps you establish online presence, rank on city-specific service pages, appear in category searches, and build structured digital credibility.", 
                      icon: TrendingUp 
                    },
                    { 
                      title: "3. Showcase Your Portfolio Professionally", 
                      desc: "Your listing will include service description, gallery images, starting pricing, service coverage area, event types handled, contact information, and an inquiry form. Your profile becomes your digital business card.", 
                      icon: Layout 
                    },
                     { 
                      title: "4. Expand Beyond Your Network", 
                      desc: "Eventibe connects you to wedding clients, corporate clients, destination event planners, venue managers, and multi-city event coordinators. You are not limited to your existing referral network.", 
                      icon: Users 
                    },
                     { 
                      title: "5. Category & City-Level Targeting", 
                      desc: "Your service will appear on category landing pages, city-specific pages, vendor listing pages, and filtered search results. This ensures structured visibility.", 
                      icon: MapPin 
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-4 items-start bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-corporate-blue shrink-0">
                        <benefit.icon size={26} />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary-navy text-xl mb-3">{benefit.title}</h4>
                        <p className="text-soft-slate text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO CAN LIST ON EVENTIBE (CATEGORIES) ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">Service Categories</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">Who Can List on Eventibe?</h3>
            <p className="text-soft-slate text-lg">We welcome professional service providers across all event categories. If your service supports events — you belong on Eventibe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding Services */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <TiltCard className="group h-full">
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-pink-100 shadow-xl shadow-pink-500/5 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-100/50 rounded-full blur-[80px] group-hover:bg-pink-200/50 transition-colors" />
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-8 text-pink-500 shadow-sm border border-pink-100">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4">Wedding Services</h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {['Wedding Planners', 'Bridal Consultants', 'Destination Wedding Specialists', 'Mehndi Artists', 'Makeup Artists', 'Decor & Theme Designers', 'Wedding Photographers', 'Wedding Cinematographers', 'Band, Ghodi & Baraat Services', 'Invitation Designers'].map((item) => (
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
                  <div className="w-16 h-16 bg-blue-900/40 rounded-2xl flex items-center justify-center mb-8 text-blue-400 shadow-sm border border-blue-800">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Corporate Event Services</h3>
                  <ul className="space-y-4 text-blue-100/70 mb-8 flex-1">
                    {['Corporate Event Managers', 'Conference Organizers', 'Exhibition Setup Teams', 'AV & Sound Specialists', 'Stage & Lighting Experts', 'Corporate Catering', 'Training & Seminar Setup Teams', 'Brand Activation Agencies'].map((item) => (
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
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 text-accent-orange shadow-sm border border-orange-100">
                    <PartyPopper size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4">General Event Services</h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {['Catering Services', 'Tent & Fabrication', 'Floral Decor', 'Event Furniture Rental', 'LED Walls & Screens', 'DJs & Live Bands', 'Anchors & Hosts', 'Entertainment Artists', 'Security & Staffing Services', 'Logistics & Transportation'].map((item) => (
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
      <section id="how-it-works" className="py-20 md:py-32 bg-slate-50 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">Process</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 'Step 1', title: 'Submit Your Service Details', desc: 'Fill out the “List Your Service” form with company name, category, cities served, experience details, portfolio links, and basic pricing range.', icon: Layout },
              { step: 'Step 2', title: 'Verification & Review', desc: 'Our team reviews service authenticity, category alignment, brand presentation, and portfolio quality. We may contact you for clarification.', icon: ShieldCheck },
              { step: 'Step 3', title: 'Profile Creation', desc: 'Once approved, we create your vendor profile including SEO-optimized content, category tagging, city mapping, gallery structure, and inquiry integration.', icon: TrendingUp },
              { step: 'Step 4', title: 'Go Live', desc: 'Your service becomes visible to event hosts searching on Eventibe. You start receiving inquiries directly.', icon: MessageSquare },
            ].map((item, idx) => (
              <div key={idx} className="relative group p-8 rounded-[2rem] bg-white border border-gray-100 hover:shadow-xl hover:border-corporate-blue/20 transition-all flex flex-col h-full">
                <div className="text-3xl font-black text- корпоратив-blue text-corporate-blue/20 mb-6 transition-colors">{item.step}</div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-primary-navy mb-3">{item.title}</h4>
                  <p className="text-soft-slate text-sm leading-relaxed">{item.desc}</p>
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
            <h3 className="text-3xl md:text-4xl font-black text-primary-navy mb-6 tracking-tight">What Information Should You Prepare?</h3>
            <p className="text-soft-slate text-lg">To ensure strong profile performance, keep the following ready:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Business Information</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Legal business name</li>
                  <li>• Contact number</li>
                  <li>• Official email</li>
                  <li>• Website or social media page</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Service Details</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• What services you provide</li>
                  <li>• Types of events handled</li>
                  <li>• Service process explanation</li>
                  <li>• Unique selling points</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Pricing Structure</h4>
                <p className="text-xs text-corporate-blue font-bold mb-3">Transparency builds trust.</p>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Starting price</li>
                  <li>• Per plate rate (for catering)</li>
                  <li>• Package pricing</li>
                  <li>• Custom pricing note</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-8 border border-gray-100">
                <h4 className="text-xl font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Portfolio</h4>
                <p className="text-xs text-corporate-blue font-bold mb-3">Strong visuals improve inquiry conversion.</p>
                <ul className="space-y-3 text-soft-slate text-sm">
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
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Award className="text-accent-orange" /> Featured Vendor Program</h3>
                  <p className="text-blue-100/70 mb-4">Premium vendors can apply for Featured Placement. This is ideal for high-quality, premium service providers. Benefits include:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Homepage visibility</li>
                    <li>Category spotlight</li>
                    <li>Priority listing</li>
                    <li>Social media mention</li>
                    <li>Blog feature opportunity</li>
                  </ul>
               </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><MapPin className="text-accent-orange" /> Multi-City Vendors</h3>
                  <p className="text-blue-100/70 mb-4">We support regional and national service providers. If you operate in multiple cities, you can:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>List city-wise coverage</li>
                    <li>Appear on multiple city pages</li>
                    <li>Expand inquiry reach</li>
                  </ul>
               </div>
            </div>

             <div className="space-y-12">
               <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Globe className="text-accent-orange" /> Destination Event Vendors</h3>
                  <p className="text-blue-100/70 mb-4">You can tag destination coverage and attract outstation inquiries if you manage:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Destination weddings</li>
                    <li>Beach weddings</li>
                    <li>Hill station events</li>
                    <li>Resort events</li>
                  </ul>
               </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Briefcase className="text-accent-orange" /> Corporate Vendor Advantage</h3>
                  <p className="text-blue-100/70 mb-4">Corporate clients often look for structured professionalism. If you specialize in corporate events:</p>
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
       <section className="flex items-center py-20 md:py-28 bg-light-bg overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
               <h3 className="text-3xl font-black text-primary-navy mb-8 tracking-tight">Quality Guidelines</h3>
               <p className="text-soft-slate mb-6">Eventibe focuses on professional and serious service providers. To maintain platform integrity:</p>
               <ul className="space-y-4">
                  {[
                    "Use real images only",
                    "Avoid misleading pricing",
                    "Respond to inquiries promptly",
                    "Maintain professional communication"
                  ].map((g, i) => (
                    <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                       <CheckCircle2 className="text-corporate-blue" size={20} />
                       <span className="font-medium text-primary-navy">{g}</span>
                    </li>
                  ))}
               </ul>
               <p className="text-xs font-bold text-red-500 mt-6 bg-red-50 p-4 rounded-xl border border-red-100">
                 Vendors not maintaining response quality may be deprioritized. We avoid incomplete profiles, unverified providers, irrelevant businesses, and non-event-related services.
               </p>

               <h3 className="text-3xl font-black text-primary-navy mb-8 mt-16 tracking-tight">Vendor Dashboard <span className="text-lg text-soft-slate font-medium">(Future Ready)</span></h3>
               <p className="text-soft-slate mb-6">We are building for long-term scalability. Planned features include:</p>
                <div className="flex flex-wrap gap-3">
                  {["Inquiry tracking", "Lead status updates", "Performance analytics", "Profile editing", "Subscription management"].map(tag => (
                    <span key={tag} className="bg-corporate-blue/10 text-corporate-blue px-4 py-2 rounded-full text-sm font-bold">{tag}</span>
                  ))}
                </div>
            </div>

            <div>
               <h3 className="text-3xl font-black text-primary-navy mb-8 tracking-tight">Common Questions</h3>
               <div className="space-y-6">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-primary-navy mb-2">Is listing free?</h4>
                    <p className="text-soft-slate text-sm">Basic listing may be free. Featured placement or premium exposure may involve subscription or commission. All terms are transparent and discussed before activation.</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-primary-navy mb-2">Do I get guaranteed leads?</h4>
                    <p className="text-soft-slate text-sm">Lead volume depends on category demand, city competition, and profile quality. Eventibe operates under various models (Free Basic, Featured, Lead-Based/Hybrid).</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-primary-navy mb-2">Can I edit my profile later?</h4>
                    <p className="text-soft-slate text-sm">Yes, profile updates can be requested or managed via dashboard (future feature).</p>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold text-lg text-primary-navy mb-2">How quickly will I go live?</h4>
                    <p className="text-soft-slate text-sm">After verification and content review, activation timelines are communicated individually.</p>
                 </div>
               </div>

               <h3 className="text-3xl font-black text-primary-navy mb-8 mt-16 tracking-tight">Why Join Early?</h3>
               <p className="text-soft-slate mb-6">Early positioning often leads to long-term benefits. Early service providers receive:</p>
               <ul className="space-y-2 text-sm font-medium text-primary-navy list-disc pl-6">
                 <li>Stronger category visibility</li>
                 <li>Founding vendor recognition</li>
                 <li>Early SEO advantage</li>
                 <li>Higher ranking opportunities</li>
                 <li>Direct input into platform improvements</li>
               </ul>
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
               <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to Grow Your Event Business?</h2>
               <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
                 Eventibe is building a structured marketplace where quality service providers connect with serious event hosts. If you deliver professional service, value long-term growth, want structured digital presence, and aim to expand city-wise — Then this platform is built for you.
               </p>
               <div 
                  onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white text-accent-orange px-10 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all duration-300 inline-block cursor-pointer shadow-xl cursor-pointer"
                >
                  Join Us Today
                </div>
             </div>
          </div>
        </div>
      </section>


      {/* ── SUBMISSION FORM ─────────────────────────────────────────────────────── */}
      <section id="submission-form" className="py-20 md:py-32 bg-white border-t border-gray-100 relative overflow-hidden">
        {/* Decorative Background Orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-corporate-blue/5 rounded-full blur-[120px] -ml-64 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] -mr-64 -mb-24 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              {...fadeInUp}
              className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-gray-100"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">Become a Verified Service Partner</h2>
                <p className="text-soft-slate text-lg">Eventibe is an evolving marketplace designed to create structured visibility, meaningful inquiries, and sustainable vendor growth.</p>
              </div>

              {/* Multistep Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3].map((step) => (
                    <div 
                      key={step} 
                      className={`text-xs font-bold uppercase tracking-widest ${currentStep >= step ? 'text-accent-orange' : 'text-gray-400'}`}
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
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black text-primary-navy mb-6">1. General Info</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Business Name</label>
                      <input {...register('businessName')} type="text" placeholder="Legal Business Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.businessName && <p className="text-xs text-red-500 pl-2">{errors.businessName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Contact Person</label>
                      <input {...register('contactPerson')} type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.contactPerson && <p className="text-xs text-red-500 pl-2">{errors.contactPerson.message}</p>}
                    </div>
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Phone Number</label>
                      <input {...register('phone')} type="text" placeholder="WhatsApp Number preferred" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.phone && <p className="text-xs text-red-500 pl-2">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Email Address</label>
                      <input {...register('email')} type="email" placeholder="official@business.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.email && <p className="text-xs text-red-500 pl-2">{errors.email.message}</p>}
                    </div>
                  </div>
                  </motion.div>
                )}

                {/* STEP 2: Service Details */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black text-primary-navy mb-6">2. Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Service Category</label>
                      <div className="relative">
                        <select {...register('category')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
                          <option>Catering</option>
                          <option>Photography/Videography</option>
                          <option>Event Planning/Manager</option>
                          <option>Decor & Theme</option>
                          <option>Sound & DJ</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Sub-Category</label>
                      <input {...register('subCategory')} type="text" placeholder="e.g. Mehndi Artist" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.subCategory && <p className="text-xs text-red-500 pl-2">{errors.subCategory.message}</p>}
                    </div>
                     <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Cities Served</label>
                      <input {...register('citiesServed')} type="text" placeholder="e.g. Jaipur, Delhi" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.citiesServed && <p className="text-xs text-red-500 pl-2">{errors.citiesServed.message}</p>}
                    </div>
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Years of Experience</label>
                      <input {...register('experience')} type="text" placeholder="e.g. 5 Years" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.experience && <p className="text-xs text-red-500 pl-2">{errors.experience.message}</p>}
                    </div>
                     <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Starting Price (INR)</label>
                      <input {...register('price')} type="text" placeholder="e.g. 50,000" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.price && <p className="text-xs text-red-500 pl-2">{errors.price.message}</p>}
                    </div>
                  </div>
                  </motion.div>
                )}

                {/* STEP 3: Online Presence & Partnership */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black text-primary-navy mb-6">3. Verification & Description</h3>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Website / Social Media</label>
                    <input {...register('website')} type="text" placeholder="https://..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                    {errors.website && <p className="text-xs text-red-500 pl-2">{errors.website.message}</p>}
                  </div>
  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Portfolio Upload Link (Optional)</label>
                    <input {...register('portfolio')} type="text" placeholder="Link to Drive/Dropbox gallery..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                  </div>
  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">About Your Service</label>
                      <textarea {...register('aboutService')} rows={4} placeholder="Summarize your offerings..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none placeholder:text-gray-400 text-primary-navy" />
                      {errors.aboutService && <p className="text-xs text-red-500 pl-2">{errors.aboutService.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Message to Event Hosts</label>
                      <textarea {...register('messageToHost')} rows={4} placeholder="What makes your service unique?" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none placeholder:text-gray-400 text-primary-navy" />
                    </div>
                  </div>
  
                  <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Preferred Partnership Model</label>
                      <div className="relative">
                        <select {...register('partnershipModel')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
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
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      className="flex-1 bg-white border-2 border-gray-100 text-soft-slate py-4 rounded-xl font-bold text-lg hover:border-corporate-blue hover:text-corporate-blue hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      Back
                    </button>
                  )}
                  {currentStep < totalSteps ? (
                    <button 
                      type="button"
                      onClick={handleNext}
                      className="flex-[2] bg-corporate-blue text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                    If you are ready to scale your service professionally — List your service today and grow with Eventibe.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
