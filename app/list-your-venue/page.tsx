'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
  Rocket
} from 'lucide-react';
import { TiltCard } from '@/components/micro-interactions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const venueFormSchema = z.object({
  venueName: z.string().min(1, 'Venue name is required'),
  contactPerson: z.string().min(1, 'Contact person is required'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email required'),
  
  venueAddress: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  venueType: z.string().min(1, 'Please select a venue type'),
  indoorCapacity: z.string().min(1, 'Required'),
  outdoorCapacity: z.string().min(1, 'Required'),
  hallsCount: z.string().min(1, 'Required'),
  parkingCapacity: z.string().min(1, 'Required'),
  guestRooms: z.string().min(1, 'Required'),
  
  price: z.string().min(1, 'Required'),
  catering: z.string().min(1, 'Required'),
  decor: z.string().min(1, 'Required'),
  imagesLink: z.string().url('Please provide a valid URL'),
  aboutVenue: z.string().min(10, 'Please provide more details'),
  listingModel: z.string().min(1, 'Select a model')
});

type VenueFormValues = z.infer<typeof venueFormSchema>;

export default function ListYourVenuePage() {
  const fadeInUp: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<VenueFormValues>({
    resolver: zodResolver(venueFormSchema),
    mode: 'onTouched',
    defaultValues: {
      venueType: 'Banquet Hall',
      catering: 'Yes (Mandatory)',
      decor: 'In-house only',
      listingModel: 'Free Basic Listing'
    }
  });

  const handleNext = async () => {
    let fieldsToValidate: any = [];
    if (currentStep === 1) {
      fieldsToValidate = ['venueName', 'contactPerson', 'phone', 'email'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['venueAddress', 'city', 'venueType', 'indoorCapacity', 'outdoorCapacity', 'hallsCount', 'parkingCapacity', 'guestRooms'];
    }
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const onSubmit = (data: VenueFormValues) => {
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
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
            alt="Event Venue Background"
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
              <span>Turn Your Venue Into a High-Performing Event Destination</span>
            </motion.div>
            
            <motion.h1 
              {...fadeInUp} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.15] md:leading-[1.1] tracking-tight drop-shadow-md"
            >
              List Your Venue <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300 italic">
                on Eventibe
              </span>
            </motion.h1>
            
            <motion.p 
               {...fadeInUp} transition={{ delay: 0.2 }}
              className="text-base md:text-xl text-gray-300/90 leading-relaxed mb-10 max-w-3xl font-medium space-y-4"
            >
              <span className="block mb-2">Every venue has potential. Some become fully booked destinations. Some struggle with inconsistent inquiries. The difference is visibility, positioning, and the right audience.</span>
              <span className="block mb-2">Eventibe is building a curated event venue marketplace designed specifically for weddings, social celebrations, and corporate events.</span>
              <span className="block text-accent-orange font-bold">If you own, manage, or represent a venue — this is your opportunity to increase qualified inquiries and build long-term brand visibility.</span>
            </motion.p>

            <motion.div 
              {...fadeInUp} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div 
                onClick={() => document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-cta-gradient text-white px-8 py-4 rounded-[1rem] font-bold shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 text-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 w-fit"
              >
                List Your Venue Today <ArrowRight size={20} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── INTRO CONTEXT ──────────────────────────────────────────────────────── */}
      <section className="flex items-center py-20 md:py-28 bg-light-bg overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Text Column */}
            <div className="space-y-6 md:space-y-10 lg:col-span-1">
              <motion.div {...fadeInUp}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-corporate-blue/5 border border-corporate-blue/10 text-corporate-blue text-xs font-bold uppercase tracking-widest mb-6">
                  Why List Your Venue
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-primary-navy leading-tight tracking-tight mb-6">
                  Eventibe is not <br />
                  <span className="text-corporate-blue">a hotel OTA.</span>
                </h2>
                <p className="text-lg text-soft-slate leading-relaxed mb-10">
                  It is an inquiry-driven event marketplace focused exclusively on event venues and related services.
                </p>
                
                <h3 className="font-bold text-lg mb-4 text-primary-navy">We position venues based on:</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {['Event type suitability', 'Capacity strength', 'Location advantage', 'Visual appeal', 'Corporate readiness', 'Wedding positioning'].map((val, i) => (
                    <div key={i} className="flex gap-2 items-center text-sm font-medium text-soft-slate">
                      <CheckCircle2 className="text-accent-orange shrink-0" size={16} />
                      {val}
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-corporate-blue/5 border border-corporate-blue/10 rounded-2xl relative overflow-hidden">
                  <p className="font-black text-primary-navy text-lg relative z-10 italic">
                    "Your venue is not just 'listed.'<br/>It is strategically presented."
                  </p>
                  <Sparkles className="absolute right-6 top-6 text-corporate-blue/20 rotate-12 z-0" size={48} />
                </div>
              </motion.div>
            </div>

             {/* What Makes Eventibe Different */}
            <div className="space-y-6 md:space-y-10 lg:col-span-1">
               <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-orange/5 border border-accent-orange/10 text-accent-orange text-xs font-bold uppercase tracking-widest mb-6">
                  What Makes Us Different?
                </div>
                
                <div className="space-y-8">
                   <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                     <h4 className="font-bold text-red-900 mb-4 flex items-center gap-2"><Settings size={20} className="text-red-500" /> Most platforms either:</h4>
                     <ul className="space-y-2 text-sm text-red-800">
                       <li>• Focus only on hotels</li>
                       <li>• Provide basic listings</li>
                       <li>• Lack SEO structure</li>
                       <li>• Do not categorize properly</li>
                       <li>• Mix unrelated inventory</li>
                     </ul>
                   </div>

                   <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                     <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2"><Rocket size={20} className="text-emerald-500" /> Eventibe focuses on:</h4>
                     <ul className="space-y-2 text-sm text-emerald-800">
                       <li>• Event-specific targeting</li>
                       <li>• Structured city-level pages</li>
                       <li>• Category-based SEO</li>
                       <li>• Wedding & corporate segmentation</li>
                       <li>• Vendor ecosystem integration</li>
                     </ul>
                   </div>
                   <p className="text-soft-slate italic font-medium">We are building an event-first digital marketplace.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS SECTION ──────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
             <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">Value Proposition</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">Benefits of Listing Your Venue</h3>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "1. Qualified Event Inquiries", 
                      desc: "Visitors on Eventibe are specifically searching for: Wedding venues, Corporate event venues, Banquet halls, Farmhouses, Conference halls. This means better lead intent.", 
                      icon: Users 
                    },
                    { 
                      title: "2. City-Level Visibility", 
                      desc: "Your venue will appear on: City landing pages, Wedding venue pages, Corporate venue pages, Venue-type pages, and Filtered search results. (e.g. Jaipur banquet halls). Structured exposure increases discoverability.", 
                      icon: MapPin 
                    },
                    { 
                      title: "3. Professional Profile", 
                      desc: "Your venue profile includes: Optimized description, Gallery section, Capacity details, Indoor & outdoor breakdown, Amenities list, Starting pricing, Location map, Inquiry form, and Event suitability tags. This builds trust.", 
                      icon: Layout 
                    },
                     { 
                      title: "4. SEO-Focused Positioning", 
                      desc: "We create structured, keyword-targeted profiles to ensure: Strong Google indexing, Local search visibility, Category-based ranking, and Long-term organic presence. Unlike temporary ads, SEO works long-term.", 
                      icon: TrendingUp 
                    },
                     { 
                      title: "5. Vendor Ecosystem Advantage", 
                      desc: "Eventibe integrates vendors such as: Catering, Decor, Photography, Lighting, Sound, and Event Planners. This creates a complete event ecosystem — increasing your venue’s relevance.", 
                      icon: PartyPopper 
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-4 items-start bg-light-bg p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
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
        </div>
      </section>

      {/* ── WHO CAN LIST ON EVENTIBE (CATEGORIES) ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-slate-50 relative overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">Venue Types</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">Who Can List Their Venue?</h3>
            <p className="text-soft-slate text-lg">We welcome all professionally operated event venues, including: If your venue can host structured events — you belong on Eventibe.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Wedding Venues */}
            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <TiltCard className="group h-full">
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-pink-100 shadow-xl shadow-pink-500/5 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-100/50 rounded-full blur-[80px] group-hover:bg-pink-200/50 transition-colors" />
                  <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-8 text-pink-500 shadow-sm border border-pink-100">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4">Wedding Venues</h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {['Banquet Halls', 'Marriage Gardens', 'Farmhouses', 'Luxury Resorts', 'Heritage Properties', 'Palace Venues', 'Beach Venues', 'Hill Station Venues', 'Destination Wedding Resorts'].map((item) => (
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

            {/* Corporate Venues */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <TiltCard className="group h-full">
                <div className="bg-primary-navy rounded-[2.5rem] p-10 h-full border border-blue-900 shadow-xl shadow-blue-950/20 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-corporate-blue/20 rounded-full blur-[80px]" />
                  <div className="w-16 h-16 bg-blue-900/40 rounded-2xl flex items-center justify-center mb-8 text-blue-400 shadow-sm border border-blue-800">
                    <Briefcase size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4">Corporate Event Venues</h3>
                  <ul className="space-y-4 text-blue-100/70 mb-8 flex-1">
                    {['Conference Halls', 'Business Hotels', 'Convention Centers', 'Exhibition Grounds', 'Boardrooms', 'Training Facilities', 'Product Launch Venues', 'Meeting Spaces'].map((item) => (
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

            {/* Social Venues */}
            <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
              <TiltCard className="group h-full">
                <div className="bg-white rounded-[2.5rem] p-10 h-full border border-orange-100 shadow-xl shadow-orange-500/5 relative overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-orange/10 rounded-full blur-[80px]" />
                  <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-8 text-accent-orange shadow-sm border border-orange-100">
                    <PartyPopper size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-primary-navy mb-4">Social & Private Venues</h3>
                  <ul className="space-y-4 text-soft-slate mb-8 flex-1">
                    {['Birthday Party Halls', 'Anniversary Venues', 'Rooftop Event Spaces', 'Clubhouses', 'Community Halls', 'Private Party Lawns'].map((item) => (
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
      <section id="how-it-works" className="py-20 md:py-32 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-accent-orange font-bold uppercase tracking-[0.2em] text-sm mb-4">Process</h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-navy mb-6 tracking-tight">How It Works</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 'Step 1', title: 'Submit Your Venue Details', desc: 'Fill out the “List Your Venue” form with: Venue Name, Location, Contact details, Event types supported, Capacity, Pricing range, Indoor/outdoor options, Basic amenities.', icon: Layout },
              { step: 'Step 2', title: 'Verification & Quality Check', desc: 'We review: Venue authenticity, Contact accuracy, Image quality, Category alignment. We may contact you for additional clarification.', icon: ShieldCheck },
              { step: 'Step 3', title: 'Profile Creation & Optimization', desc: 'Our team prepares: SEO-optimized content, Structured category mapping, City tagging, Amenity tagging, Image layout optimization.', icon: TrendingUp },
              { step: 'Step 4', title: 'Activation & Go Live', desc: 'Your venue becomes visible to event planners, wedding hosts, and corporate decision-makers. You start receiving inquiries directly.', icon: MessageSquare },
            ].map((item, idx) => (
              <div key={idx} className="relative group p-8 rounded-[2rem] bg-light-bg border border-gray-100 hover:shadow-xl hover:border-corporate-blue/20 transition-all flex flex-col h-full">
                <div className="text-3xl font-black text-corporate-blue/20 mb-6 transition-colors">{item.step}</div>
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
       <section className="flex items-center py-20 md:py-28 bg-white overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
         <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-black text-primary-navy mb-6 tracking-tight">What Information Should You Prepare?</h3>
            <p className="text-soft-slate text-lg">To create a strong listing, keep the following ready:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
             <div className="bg-light-bg rounded-3xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Basic Venue Details</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Legal name</li>
                  <li>• Address</li>
                  <li>• Google map location</li>
                  <li>• Contact person</li>
                  <li>• Phone number & Email</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Capacity Details</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Max floating capacity</li>
                  <li>• Seating capacity</li>
                  <li>• Number of halls</li>
                  <li>• Lawn capacity</li>
                  <li>• Breakout room availability</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Pricing Info</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Starting price per plate</li>
                  <li>• Rental charges (if applicable)</li>
                  <li>• Package pricing</li>
                  <li>• Corporate day package</li>
                </ul>
             </div>
             <div className="bg-light-bg rounded-3xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Amenities</h4>
                <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• In-house catering</li>
                  <li>• Decor flexibility</li>
                  <li>• Parking / Power backup</li>
                  <li>• AC / Rooms / AV</li>
                </ul>
             </div>
              <div className="bg-light-bg rounded-3xl p-6 border border-gray-100">
                <h4 className="text-lg font-bold text-primary-navy mb-4 border-b pb-4 border-gray-200">Event Suitability</h4>
                 <ul className="space-y-3 text-soft-slate text-sm">
                  <li>• Wedding ceremony</li>
                  <li>• Reception / Sangeet</li>
                  <li>• Corp. conference</li>
                  <li>• Product launch</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* ── VENUE TYPES & ADVANTAGES ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-corporate-blue/20 rounded-full blur-[100px] pointer-events-none opacity-50 -mt-32 -mr-32"></div>
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-orange/10 rounded-full blur-[100px] pointer-events-none opacity-50 -mb-32 -ml-32"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="space-y-12">
               <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><MapPin className="text-accent-orange" /> Multi-Venue Operators</h3>
                  <p className="text-blue-100/70 mb-4">Ideal for hospitality groups and chains. If you operate multiple venues:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Each property can have separate listing</li>
                    <li>City-specific optimization</li>
                    <li>Capacity-specific targeting</li>
                    <li>Brand grouping possible</li>
                  </ul>
               </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Globe className="text-accent-orange" /> Destination Wedding Venues</h3>
                  <p className="text-blue-100/70 mb-4">Destination weddings are high-value inquiries. You can be featured under destination categories if located in:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Hill stations</li>
                    <li>Beach destinations</li>
                    <li>Heritage towns</li>
                    <li>Resort clusters</li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Briefcase className="text-accent-orange" /> Corporate Ready Venues</h3>
                  <p className="text-blue-100/70 mb-4">Mention these clearly to attract corporate planners if you provide:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Projectors & LED screens</li>
                    <li>High-speed internet</li>
                    <li>Breakout rooms</li>
                    <li>Business catering & Conference seating</li>
                  </ul>
               </div>
            </div>

             <div className="space-y-12">
                 <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Award className="text-accent-orange" /> Featured Venue Program</h3>
                  <p className="text-blue-100/70 mb-4">Premium venues may apply for featured placement. Ideal for venues seeking premium exposure. Benefits include:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Homepage visibility</li>
                    <li>Category spotlight & City-page priority</li>
                    <li>Social media promotion</li>
                    <li>Blog feature coverage</li>
                  </ul>
               </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><MessageSquare className="text-accent-orange" /> Lead Management</h3>
                  <p className="text-blue-100/70 mb-4">You maintain direct communication with clients. All inquiries are:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Tagged as Eventibe source</li>
                    <li>Categorized (Wedding / Corporate / Social)</li>
                    <li>Delivered directly</li>
                    <li>Trackable</li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-3"><Rocket className="text-accent-orange" /> Revenue & Listing Model</h3>
                  <p className="text-blue-100/70 mb-4">Terms are transparent and discussed before activation. Eventibe may operate under:</p>
                  <ul className="space-y-2 text-sm text-blue-100/90 pl-10 list-disc opacity-90">
                    <li>Free basic listing</li>
                    <li>Featured subscription</li>
                    <li>Commission-based model</li>
                    <li>Hybrid model</li>
                  </ul>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── GUIDELINES & LONG TERM GROWTH ────────────────────────────────────────────── */}
       <section className="flex items-center py-20 md:py-28 bg-light-bg overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <div>
               <h3 className="text-3xl font-black text-primary-navy mb-8 tracking-tight">Quality Standards</h3>
               <p className="text-soft-slate mb-6">To maintain marketplace integrity:</p>
               <ul className="space-y-4">
                  {[
                    "Use genuine venue images",
                    "Avoid misleading capacity claims",
                    "Maintain updated pricing",
                    "Respond to inquiries promptly",
                    "Provide professional communication"
                  ].map((g, i) => (
                    <li key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                       <CheckCircle2 className="text-corporate-blue" size={20} />
                       <span className="font-medium text-primary-navy">{g}</span>
                    </li>
                  ))}
               </ul>
               <p className="text-xs font-bold text-red-500 mt-6 bg-red-50 p-4 rounded-xl border border-red-100">
                 Low response or inaccurate data may affect ranking.
               </p>

               <h3 className="text-3xl font-black text-primary-navy mb-8 mt-16 tracking-tight">Early Listing Advantage</h3>
               <p className="text-soft-slate mb-6">Early presence builds authority. Founding venues benefit from:</p>
                <div className="flex flex-wrap gap-3">
                  {["Stronger SEO positioning", "Better internal linking", "Priority category placement", "Long-term ranking advantage", "Higher early visibility"].map(tag => (
                    <span key={tag} className="bg-corporate-blue/10 text-corporate-blue px-4 py-2 rounded-full text-sm font-bold">{tag}</span>
                  ))}
                </div>
            </div>

            <div>
               <h3 className="text-3xl font-black text-primary-navy mb-8 tracking-tight">Future Vendor Integration Advantage</h3>
               <p className="text-soft-slate mb-6">Your venue will benefit as the ecosystem expands. Eventibe is building:</p>
               <div className="space-y-6">
                  <ul className="space-y-2 text-sm font-medium text-primary-navy list-disc pl-6 mb-8">
                    <li>Vendor modules</li>
                    <li>Corporate RFP systems</li>
                    <li>Featured event showcases</li>
                    <li>Subscription visibility tools</li>
                  </ul>
               </div>

               <h3 className="text-3xl font-black text-primary-navy mb-8 mt-16 tracking-tight">Why Eventibe is Built for Long-Term Growth</h3>
               <p className="text-soft-slate mb-6 font-bold">We are not building a short-term listing portal. The objective is national scalability. We are building:</p>
               <ul className="space-y-2 text-sm font-medium text-primary-navy list-disc pl-6">
                 <li>Structured category architecture</li>
                 <li>SEO-driven city pages</li>
                 <li>Corporate segmentation</li>
                 <li>Wedding-focused storytelling</li>
                 <li>Vendor ecosystem integration</li>
               </ul>
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
                <h2 className="text-3xl md:text-5xl font-black text-primary-navy mb-4 tracking-tight">Become an Eventibe Venue Partner</h2>
                <p className="text-soft-slate text-lg">List your venue on Eventibe today to increase visibility and improve inquiry flow.</p>
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
                    <h3 className="text-2xl font-black text-primary-navy mb-6">1. Basic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Venue Name</label>
                        <input {...register('venueName')} type="text" placeholder="Legal Property Name" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.venueName && <p className="text-xs text-red-500 pl-2">{errors.venueName.message}</p>}
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
                        <input {...register('email')} type="email" placeholder="official@venue.com" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.email && <p className="text-xs text-red-500 pl-2">{errors.email.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Venue Details */}
                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black text-primary-navy mb-6">2. Venue Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2 col-span-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Venue Address</label>
                        <input {...register('venueAddress')} type="text" placeholder="Full Location Address" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.venueAddress && <p className="text-xs text-red-500 pl-2">{errors.venueAddress.message}</p>}
                      </div>
                       <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">City</label>
                        <input {...register('city')} type="text" placeholder="e.g. Jaipur, Delhi" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.city && <p className="text-xs text-red-500 pl-2">{errors.city.message}</p>}
                      </div>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Venue Type</label>
                        <div className="relative">
                          <select {...register('venueType')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
                            <option>Banquet Hall</option>
                            <option>Resort / Hotel</option>
                            <option>Marriage Garden / Farmhouse</option>
                            <option>Conference / Business</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                       <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Indoor Capacity</label>
                        <input {...register('indoorCapacity')} type="text" placeholder="e.g. 500 Pax" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.indoorCapacity && <p className="text-xs text-red-500 pl-2">{errors.indoorCapacity.message}</p>}
                      </div>
                       <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Outdoor Capacity</label>
                        <input {...register('outdoorCapacity')} type="text" placeholder="e.g. 1000 Pax" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.outdoorCapacity && <p className="text-xs text-red-500 pl-2">{errors.outdoorCapacity.message}</p>}
                      </div>
                    </div>
    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Number of Halls</label>
                        <input {...register('hallsCount')} type="text" placeholder="e.g. 2" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.hallsCount && <p className="text-xs text-red-500 pl-2">{errors.hallsCount.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Parking Capacity</label>
                        <input {...register('parkingCapacity')} type="text" placeholder="e.g. 100 Cars" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.parkingCapacity && <p className="text-xs text-red-500 pl-2">{errors.parkingCapacity.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Guest Rooms Avail.</label>
                        <input {...register('guestRooms')} type="text" placeholder="e.g. 50 Rooms" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.guestRooms && <p className="text-xs text-red-500 pl-2">{errors.guestRooms.message}</p>}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Features & Partnership */}
                {currentStep === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <h3 className="text-2xl font-black text-primary-navy mb-6">3. Features & Partnership</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                       <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Starting Price / Plate (INR)</label>
                        <input {...register('price')} type="text" placeholder="e.g. 1,500" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                        {errors.price && <p className="text-xs text-red-500 pl-2">{errors.price.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">In-house Catering</label>
                        <div className="relative">
                          <select {...register('catering')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
                            <option>Yes (Mandatory)</option>
                            <option>Yes (Optional)</option>
                            <option>No (Outside allowed)</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Decor Flexibility</label>
                         <div className="relative">
                          <select {...register('decor')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
                            <option>In-house only</option>
                            <option>Panel Decorators only</option>
                            <option>Outside allowed</option>
                          </select>
                        </div>
                      </div>
                    </div>
    
                     <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Upload Images (Link)</label>
                      <input {...register('imagesLink')} type="text" placeholder="Link to Drive/Dropbox folder with Venue Photos..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all placeholder:text-gray-400 text-primary-navy" />
                      {errors.imagesLink && <p className="text-xs text-red-500 pl-2">{errors.imagesLink.message}</p>}
                    </div>
    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">About Your Venue</label>
                      <textarea {...register('aboutVenue')} rows={4} placeholder="Summarize your USP, capacity details, and event suitability..." className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all resize-none placeholder:text-gray-400 text-primary-navy" />
                      {errors.aboutVenue && <p className="text-xs text-red-500 pl-2">{errors.aboutVenue.message}</p>}
                    </div>
    
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-soft-slate uppercase tracking-widest pl-2">Preferred Listing Model</label>
                        <div className="relative">
                          <select {...register('listingModel')} className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 focus:ring-2 focus:ring-accent-orange outline-none transition-all cursor-pointer text-primary-navy appearance-none">
                            <option>Free Basic Listing</option>
                            <option>Featured Subscription</option>
                            <option>Commission-based model</option>
                            <option>Hybrid model</option>
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
                      Submit Venue Application
                    </button>
                  )}
                </div>

                {currentStep === totalSteps && (
                  <div className="bg-light-bg mt-5 p-6 rounded-2xl border border-gray-100 text-center space-y-3">
                     <p className="font-bold text-primary-navy text-lg italic">"Your venue is more than just a physical space."</p>
                     <p className="text-sm text-soft-slate">It is where Couples begin new journeys, Companies launch ideas, Families celebrate milestones, and Brands create impact.</p>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
