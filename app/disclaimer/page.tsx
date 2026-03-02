'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, Info, AlertTriangle, CheckCircle2, 
  Settings, CreditCard, AlertCircle, FileText, 
  MessageSquare, HelpCircle, MapPin, Edit3, Mail,
  ListX, RefreshCcw, Scale, CheckSquare, Search,
  Zap, FileSignature, BookOpen, ThumbsUp
} from 'lucide-react';

const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-36 bg-primary-navy overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#ffffff 2px, transparent 2px), linear-gradient(90deg, #ffffff 2px, transparent 2px)", backgroundSize: "40px 40px" }} />
        <div className="absolute w-[600px] h-[600px] rounded-full bg-corporate-blue/40 blur-[150px] top-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/10 shadow-2xl">
              <ShieldAlert className="text-accent-orange" size={36} />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight">
              Legal <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-amber-400">Disclaimer</span>
            </h1>
            <p className="text-gray-300 md:text-xl max-w-2xl mx-auto font-medium mb-4 leading-relaxed">
              Please read this disclaimer carefully before using our platforms and services.
            </p>
            <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-5 text-xs md:text-sm text-gray-300 uppercase tracking-[0.2em] font-bold mt-8 bg-white/5 py-3 px-6 md:px-8 rounded-full border border-white/10 backdrop-blur-sm">
              <span>Effective: [Insert Date]</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-accent-orange" />
              <span>Updated: [Insert Date]</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT SECTION ── */}
      <section className="py-12 md:py-20 relative z-20 -mt-16 md:-mt-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
           <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/50">
            
            <motion.div {...fadeInUp} className="mb-16">
              <div className="bg-blue-50/50 p-6 md:p-8 rounded-2xl border border-corporate-blue/10">
                <p className="text-soft-slate text-lg font-medium mb-3">This Disclaimer applies to:</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-4">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <CheckCircle2 size={18} className="text-corporate-blue" />
                    <span className="font-bold text-primary-navy">Eventibe.com</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                    <CheckCircle2 size={18} className="text-corporate-blue" />
                    <span className="font-bold text-primary-navy">VenueForEvent.com</span>
                  </div>
                </div>
                <p className="text-soft-slate text-sm font-medium leading-relaxed mt-4">
                  (collectively referred to as the “Platform”, “Website”, “We”, “Us”, or “Our”).<br /><br />
                  <span className="text-primary-navy font-bold">By accessing or using this Platform, you acknowledge that you have read, understood, and agreed to the terms outlined in this Disclaimer.</span>
                </p>
              </div>
            </motion.div>

            <div className="space-y-16 md:space-y-20">
              
              {/* SECTION 1 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Settings className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">1. ROLE OF THE PLATFORM</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-6 font-medium text-primary-navy">Eventibe.com and VenueForEvent.com operate as online event discovery and marketplace platforms.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="font-black text-primary-navy mb-4 flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={20}/> We:</h3>
                      <ul className="space-y-3">
                        {['Provide venue listings.', 'Display event-related services.', 'Facilitate inquiry submissions.', 'Connect users with venue owners and vendors.'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                      <h3 className="font-black text-primary-navy mb-4 flex items-center gap-2"><ListX className="text-red-500" size={20}/> We do not:</h3>
                      <ul className="space-y-3">
                        {['Own most listed venues.', 'Operate listed venues.', 'Control vendor execution.', 'Guarantee service delivery.', 'Act as event planners unless explicitly mentioned.'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm"><span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 shrink-0" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-orange-50/50 rounded-xl border-l-4 border-accent-orange text-primary-navy font-bold">
                    The Platform serves as an intermediary only.
                  </div>
                </div>
              </motion.div>

              {/* SECTION 2 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">2. NO BOOKING GUARANTEE</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-4">Submission of an inquiry does not:</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['Confirm availability.', 'Confirm pricing.', 'Guarantee booking.', 'Create a contractual obligation.'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-gray-50 py-2 px-4 rounded-lg border border-gray-100 text-sm md:text-base">
                        <span className="w-2 h-2 rounded-full bg-accent-orange" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="mb-3 font-medium text-primary-navy">All final agreements are strictly between:</p>
                  <ul className="list-none space-y-2">
                    <li className="flex items-center gap-3 font-bold text-primary-navy bg-white border border-gray-200 shadow-sm p-3 rounded-xl"><div className="w-8 h-8 rounded-full bg-corporate-blue/10 flex items-center justify-center"><CheckCircle2 size={16} className="text-corporate-blue"/></div> The user (event host/organizer)</li>
                    <li className="flex items-center gap-3 font-bold text-primary-navy bg-white border border-gray-200 shadow-sm p-3 rounded-xl"><div className="w-8 h-8 rounded-full bg-corporate-blue/10 flex items-center justify-center"><CheckCircle2 size={16} className="text-corporate-blue"/></div> The venue owner or vendor.</li>
                  </ul>
                </div>
              </motion.div>

              {/* SECTION 3 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Search className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">3. INFORMATION ACCURACY DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-4 font-medium text-primary-navy">While we strive to ensure accuracy:</p>
                  <ul className="space-y-2 mb-6 ml-2">
                    {['Pricing may change without notice.', 'Availability may change.', 'Venue policies may be updated by owners.', 'Images may be representative.'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> {item}</li>
                    ))}
                  </ul>
                  <p className="mb-4 font-medium text-primary-navy">We do not guarantee that:</p>
                  <ul className="space-y-2 mb-6 ml-2">
                    {['All listings are error-free.', 'All descriptions are complete.', 'All venue data is up to date at all times.'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> {item}</li>
                    ))}
                  </ul>
                  <div className="bg-corporate-blue/5 p-4 md:p-5 rounded-2xl border border-corporate-blue/10 text-primary-navy">
                    <div className="flex items-start gap-3">
                      <AlertTriangle size={20} className="text-corporate-blue shrink-0 mt-0.5" />
                      <p className="font-bold text-sm md:text-base">Users are advised to verify all details directly with the venue or vendor before making decisions.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 4 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Zap className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">4. VENDOR PERFORMANCE DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-5 font-medium text-primary-navy">The Platform is not responsible for:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {['Quality of catering.', 'Decoration execution.', 'Photography results.', 'Service delays.', 'Staff behavior.', 'Event mismanagement.', 'Venue maintenance issues.', 'Technical failures at venues.'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm">
                        <span className="w-2 h-2 rounded-full bg-red-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-bold text-primary-navy bg-orange-50 p-4 rounded-xl border border-accent-orange/20">
                    Any dispute regarding performance must be resolved directly between the parties involved.
                  </p>
                </div>
              </motion.div>

              {/* SECTION 5 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <Scale className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">5. THIRD-PARTY CONTENT & LINKS</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                    <div>
                      <p className="mb-3 font-bold text-primary-navy">The Platform may contain:</p>
                      <ul className="space-y-2 ml-2">
                        {['Links to third-party websites.', 'Social media links.', 'External vendor pages.'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 font-bold text-primary-navy">We are not responsible for:</p>
                      <ul className="space-y-2 ml-2">
                        {['Third-party policies.', 'Third-party content.', 'Third-party privacy practices.', 'External website accuracy.'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm"><span className="w-1.5 h-1.5 bg-red-400 rounded-full" /> {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="font-medium bg-gray-50 p-3 rounded-lg border border-gray-100 italic inline-block text-sm">
                    Visiting external links is at your own discretion.
                  </p>
                </div>
              </motion.div>

              {/* SECTION 6 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <CreditCard className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">6. PAYMENT DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                    <p className="mb-4 font-black text-primary-navy">If payments are processed outside the Platform:</p>
                    <ul className="space-y-3">
                      {['We are not responsible for transaction security.', 'We are not responsible for refund disputes.', 'We do not guarantee payment recovery.'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-medium"><span className="w-2 h-2 bg-accent-orange rounded-full" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 rounded-2xl bg-white border border-gray-200">
                    <p className="mb-3 font-black text-primary-navy">If payment systems are integrated in the future:</p>
                    <p className="text-sm font-medium flex items-center gap-2">
                      <FileSignature size={18} className="text-corporate-blue" />
                      Terms will be governed by separate policies.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 7 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">7. EVENT RISKS DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-5 font-bold text-primary-navy">Event planning involves inherent risks, including:</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {['Weather conditions.', 'Vendor cancellations.', 'Government restrictions.', 'Permit issues.', 'Technical failures.', 'Public safety risks.'].map((item, i) => (
                      <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider">{item}</span>
                    ))}
                  </div>
                  
                  <p className="mb-5 font-bold text-primary-navy">The Platform is not liable for:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                    {['Event cancellation.', 'Financial losses.', 'Emotional distress.', 'Business interruption.', 'Reputation damage.'].map((item, i) => (
                       <li key={i} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-lg text-sm"><span className="text-red-500 font-bold">×</span> {item}</li>
                    ))}
                  </ul>
                  <p className="font-black text-primary-navy text-xl border-l-4 border-corporate-blue pl-4 py-1">
                    Users assume full responsibility for due diligence.
                  </p>
                </div>
              </motion.div>

              {/* SECTION 8 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <BookOpen className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">8. PROFESSIONAL ADVICE DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-4">Information on the Platform, including blog articles, guides, or recommendations:</p>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6">
                    <ul className="space-y-3 font-medium text-sm">
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" /> Is for informational purposes only.</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" /> Does not constitute legal advice.</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" /> Does not constitute financial advice.</li>
                      <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 bg-corporate-blue rounded-full mt-1.5 shrink-0" /> Does not constitute event planning guarantees.</li>
                    </ul>
                  </div>
                  <div className="flex items-start gap-4 p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                    <Info size={24} className="text-corporate-blue shrink-0" />
                    <p className="font-bold text-primary-navy text-sm md:text-base">Users should consult professionals for legal, financial, and contractual matters.</p>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 9 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <ThumbsUp className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">9. TESTIMONIALS & REVIEWS DISCLAIMER</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-4">Reviews and testimonials displayed on the Platform:</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Reflect personal experiences.', 'May not represent typical outcomes.', 'Are submitted by users or vendors.', 'We do not independently verify all reviews.'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium"><span className="w-2 h-2 bg-gray-300 rounded-full" /> {item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* SECTION 10 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <ListX className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">10. NO WARRANTIES</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-6 text-xl">The Platform is provided on an <span className="font-black text-primary-navy bg-gray-100 px-2 rounded">“AS IS”</span> and <span className="font-black text-primary-navy bg-gray-100 px-2 rounded">“AS AVAILABLE”</span> basis.</p>
                  <div className="p-6 md:p-8 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="mb-5 font-bold text-primary-navy">We make no warranties, express or implied, regarding:</p>
                    <ul className="space-y-3 text-sm md:text-base">
                      {['Continuous availability.', 'Uninterrupted service.', 'Error-free performance.', 'Data security guarantees.'].map((item, i) => (
                        <li key={i} className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-gray-400 rounded-full" /> {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 11 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <AlertCircle className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">11. LIMITATION OF LIABILITY</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-5 font-medium">To the maximum extent permitted by law, Eventibe.com and VenueForEvent.com shall not be liable for:</p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {['Direct damages.', 'Indirect damages.', 'Incidental damages.', 'Consequential damages.', 'Loss of revenue.', 'Loss of event opportunity.', 'Loss of goodwill.'].map((item, i) => (
                      <span key={i} className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg shadow-sm">{item}</span>
                    ))}
                  </div>
                  <p className="font-black text-white bg-primary-navy p-4 rounded-xl text-center shadow-lg uppercase tracking-wider text-sm mt-8">
                    Your use of the Platform is at your sole risk.
                  </p>
                </div>
              </motion.div>

              {/* SECTION 12 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <CheckSquare className="text-corporate-blue" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">12. USER RESPONSIBILITY</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-5 font-bold text-primary-navy">Users are responsible for:</p>
                  <ul className="space-y-3 mb-8">
                    {['Verifying venue licenses.', 'Checking safety compliance.', 'Reviewing vendor contracts.', 'Understanding cancellation policies.', 'Negotiating terms independently.'].map((item, i) => (
                      <li key={i} className="flex items-start gap-3"><span className="w-5 h-5 rounded-md bg-corporate-blue/10 flex items-center justify-center text-corporate-blue font-bold text-xs shrink-0 mt-0.5">{i+1}</span> <span className="font-medium">{item}</span></li>
                    ))}
                  </ul>
                  <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center gap-3">
                    <Info className="text-accent-orange shrink-0" size={20} />
                    <p className="font-bold text-primary-navy text-sm md:text-base">The Platform does not replace independent verification.</p>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 13 */}
              <motion.div {...fadeInUp}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-accent-orange" size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">13. FORCE MAJEURE</h2>
                </div>
                <div className="text-soft-slate text-base md:text-lg leading-relaxed pl-0 md:pl-16">
                  <p className="mb-5 font-medium">We are not responsible for delays or failures due to:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Natural disasters.', 'Pandemic restrictions.', 'Government orders.', 'Internet outages.', 'Cyberattacks.', 'Civil unrest.'].map((item, i) => (
                      <div key={i} className="bg-gray-50 border border-gray-100 p-3 rounded-lg flex items-center gap-2 text-sm justify-center text-center font-medium">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* SECTION 14 & 15 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div {...fadeInUp}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <MapPin className="text-corporate-blue" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-primary-navy tracking-tight">14. JURISDICTION</h2>
                  </div>
                  <div className="text-soft-slate leading-relaxed pl-0 md:pl-16">
                    <p className="mb-3 font-medium">This Disclaimer is governed by the laws of India.</p>
                    <p className="text-sm">Any disputes shall be subject to the exclusive jurisdiction of courts located in <span className="font-bold text-primary-navy inline-block bg-gray-100 px-2 py-0.5 rounded border border-gray-200">[Insert City]</span>.</p>
                  </div>
                </motion.div>

                <motion.div {...fadeInUp}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <RefreshCcw className="text-accent-orange" size={24} />
                    </div>
                    <h2 className="text-2xl font-black text-primary-navy tracking-tight">15. CHANGES</h2>
                  </div>
                  <div className="text-soft-slate leading-relaxed pl-0 md:pl-16 space-y-3">
                    <p className="text-sm">We may update this Disclaimer at any time. Changes will be reflected with a revised <span className="font-bold text-primary-navy">“Last Updated”</span> date.</p>
                    <p className="text-sm italic border-l-2 border-gray-300 pl-3">Continued use of the Platform signifies acceptance of updated terms.</p>
                  </div>
                </motion.div>
              </div>

              {/* SECTION 16 */}
              <motion.div {...fadeInUp}>
                <div className="p-8 md:p-10 bg-gray-50 rounded-3xl border border-gray-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <Mail className="text-corporate-blue" size={24} />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight">16. CONTACT</h2>
                  </div>
                  <p className="text-soft-slate mb-6">For questions regarding this Disclaimer:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Entity</p>
                      <p className="font-black text-primary-navy">Eventibe.com / VenueForEvent.com</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</p>
                      <a href="mailto:contact@eventibe.com" className="font-bold text-corporate-blue hover:text-accent-orange transition-colors">[Insert Email Address]</a>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Phone</p>
                      <p className="font-medium text-soft-slate">[Insert Phone Number]</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Registered Address</p>
                      <p className="font-medium text-soft-slate">[Insert Office Address]</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* FINAL NOTE */}
              <motion.div {...fadeInUp}>
                <div className="relative p-8 md:p-12 lg:p-16 bg-gradient-to-br from-primary-navy to-[#0f2847] text-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                  {/* Decorative Elements */}
                  <div className="absolute w-64 h-64 rounded-full bg-accent-orange/10 blur-[60px] top-0 right-0 pointer-events-none" />
                  <div className="absolute w-64 h-64 rounded-full bg-corporate-blue/20 blur-[60px] bottom-0 left-0 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">FINAL NOTE</h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-8 font-medium">By using Eventibe.com or VenueForEvent.com, you acknowledge that:</p>
                    
                    <div className="space-y-6">
                      {[
                        "You understand the Platform’s role as an intermediary.",
                        "You accept the inherent risks of event planning.",
                        "You agree to independently verify all venue and vendor information."
                      ].map((text, i) => (
                        <div key={i} className="flex items-start gap-4">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                            <span className="text-accent-orange font-black text-sm md:text-base">{i + 1}</span>
                          </div>
                          <p className="text-base md:text-lg font-bold pt-1">{text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
