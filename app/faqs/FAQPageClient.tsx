'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, HelpCircle, BookOpen, ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TiltCard, MagneticButton } from '@/components/micro-interactions';
import Link from 'next/link';
import Image from 'next/image';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category_id: number;
  category_name?: string;
}

interface FAQCategory {
  id: number;
  name: string;
  file: string;
  key_name: string;
  is_active: boolean;
}


const STATIC_CATEGORIES: FAQCategory[] = [
  { id: 1, name: "General Questions", file: "", key_name: "general", is_active: true },
  { id: 2, name: "Booking & Cancellations", file: "", key_name: "booking", is_active: true },
  { id: 3, name: "Payments & Billing", file: "", key_name: "payments", is_active: true },
  { id: 4, name: "Listing a Property", file: "", key_name: "listing", is_active: true },
  { id: 5, name: "Safety & Support", file: "", key_name: "safety", is_active: true },
];

const STATIC_FAQS: { [key: number]: FAQ[] } = {
  1: [
    { id: 101, question: "What is Eventibe?", answer: "Eventibe is India's leading corporate venue and accommodation booking platform, specifically designed to connect businesses with high-quality spaces for events, meetings, and corporate stays.", category_id: 1 },
    { id: 102, question: "How do I search for a venue or stay?", answer: "Simply use our intelligent search bar on the homepage. You can filter results by city, date, guest count, and specific amenities like high-speed WiFi, conference facilities, or catering services.", category_id: 1 },
    { id: 103, question: "Are there any membership fees?", answer: "Basic access to the Eventibe platform is completely free. We also offer 'Eventibe Elite'—a premium corporate membership with exclusive corporate rates, priority support, and dedicated account management.", category_id: 1 },
  ],
  2: [
    { id: 201, question: "How do I make a reservation?", answer: "Select your preferred listing, enter the required dates and guest details, and click 'Book Now'. You'll be guided through a secure checkout process to confirm your reservation and receive instant confirmation.", category_id: 2 },
    { id: 202, question: "What is the cancellation policy?", answer: "Cancellation policies are determined by each individual venue or hotel. You can find the specific policy for any listing clearly displayed on its details page before you finalize your booking.", category_id: 2 },
    { id: 203, question: "Can I modify my booking after confirmation?", answer: "Yes, most bookings can be modified through your 'My Bookings' dashboard. Please note that modifications are subject to venue availability and may involve a price adjustment based on current rates.", category_id: 2 },
  ],
  3: [
    { id: 301, question: "Which payment methods are accepted?", answer: "We accept all major credit and debit cards (Visa, MasterCard, American Express), Net Banking, UPI, and Corporate Billing accounts for registered businesses.", category_id: 3 },
    { id: 302, question: "Is my payment information secure?", answer: "Absolutely. We use industry-standard SSL encryption and PCI-DSS compliant payment gateways to ensure your financial information is never stored and always protected.", category_id: 3 },
    { id: 303, question: "How do I get an invoice for my booking?", answer: "Digital invoices are automatically emailed to your registered address upon successful payment. You can also download them at any time from the 'History' section of your profile.", category_id: 3 },
  ],
  4: [
    { id: 401, question: "How can I list my hotel or venue?", answer: "Click on the 'Become a Host' button in the main navigation. Complete the registration form with your property details, and our verification team will contact you within 24-48 hours.", category_id: 4 },
    { id: 402, question: "What are the costs of listing on Eventibe?", answer: "It is free to list your property on Eventibe. We work on a transparent commission-based model, where a small percentage is deducted from each successful booking made through our platform.", category_id: 4 },
    { id: 403, question: "How do I manage my listing inventory?", answer: "Once approved, you'll gain access to a powerful Partner Dashboard. From there, you can update rates, manage room inventory, respond to inquiries, and track your property's performance.", category_id: 4 },
  ],
  5: [
    { id: 501, question: "How do you verify the listings on your platform?", answer: "Quality is our priority. Every listing goes through a comprehensive multi-step verification process, including physical inspections (where applicable) and documentation checks of all corporate partners.", category_id: 5 },
    { id: 502, question: "What should I do if I encounter an issue during my stay?", answer: "Our 24/7 Corporate Support team is always ready to help. You can reach out via the 'Support' section in the app, or call our direct emergency helpline listed in your booking confirmation.", category_id: 5 },
    { id: 503, question: "How do I report a security concern?", answer: "We take security very seriously. Please report any concerns immediately through our dedicated security portal or by emailing security@eventibe.com for an immediate investigation.", category_id: 5 },
  ],
};

export default function FAQPageClient() {
  const [categories] = useState<FAQCategory[]>(STATIC_CATEGORIES);
  const [allFaqs] = useState<{ [key: number]: FAQ[] }>(STATIC_FAQS);
  const [activeCategory, setActiveCategory] = useState<number | null>(STATIC_CATEGORIES[0].id);
  const [openFAQs, setOpenFAQs] = useState<{ [key: number]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: number]: HTMLAnchorElement | null }>({});

  // Intersection Observer for Scroll Spy
  useEffect(() => {
    if (categories.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = parseInt(entry.target.id.replace('cat-', ''));
          setActiveCategory(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    categories.forEach((category) => {
      const element = document.getElementById(`cat-${category.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [categories]);

  // Sidebar scrolling
  useEffect(() => {
    if (
      activeCategory &&
      navItemsRef.current[activeCategory] &&
      scrollContainerRef.current
    ) {
      const scrollContainer = scrollContainerRef.current;
      const navItem = navItemsRef.current[activeCategory];

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
  }, [activeCategory]);

  const toggleFAQ = (faqId: number) => {
    setOpenFAQs(prev => ({ ...prev, [faqId]: !prev[faqId] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar,
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        .hide-scrollbar,
        .scrollbar-hide {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }
      `,
        }}
      />

      {/* Hero Section */}
      <section className="relative py-20 md:py-40 overflow-hidden bg-primary-navy">
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?q=80&w=2070&auto=format&fit=crop"
            alt="FAQ Support Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/50"></div>
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
          
          <div className="absolute inset-0">
            <div className="absolute top-20 left-[10%] w-72 h-72 bg-accent-orange/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-40 right-[15%] w-96 h-96 bg-mid-blue/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white flex flex-col items-center md:items-start text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-6 animate-fade-in shadow-xl backdrop-blur-sm uppercase tracking-widest">
              <Sparkles size={14} className="text-accent-orange" />
              <span>Help Center & Knowledge Base</span>
            </div>
            <h1 className="text-3xl md:text-6xl lg:text-8xl font-black mb-8 leading-[1.2] md:leading-[1.1] animate-fade-in tracking-tight drop-shadow-md break-words">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
                Frequently Asked
              </span>{" "}
              Questions
            </h1>
            <p className="text-xl md:text-3xl text-orange-200/90 font-bold max-w-2xl leading-relaxed">
              Find clear and accurate answers to the most common questions about Eventibe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Navigation Sidebar */}
      <section className="py-16 md:py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sidebar Navigation - Sticky */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="p-8 pb-6 border-b border-slate-50 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                      <BookOpen size={14} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      CATEGORIES
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-primary-navy tracking-tight">
                    Topics Index
                  </h3>
                </div>

                <nav
                  ref={scrollContainerRef}
                  className="p-4 space-y-1 overflow-y-auto flex-1 hide-scrollbar scrollbar-hide overscroll-contain"
                >
                  {categories.map((category) => {
                    const isActive = activeCategory === category.id;
                    return (
                      <Link
                        key={category.id}
                        href={`#cat-${category.id}`}
                        ref={(el) => {
                          navItemsRef.current[category.id] = el;
                        }}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                          isActive
                            ? "bg-primary-navy/5 text-primary-navy shadow-[inset_0_0_0_1px_rgba(11,31,58,0.05)]"
                            : "text-slate-500 hover:text-primary-navy hover:bg-slate-50"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(`cat-${category.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }}
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
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-primary-navy text-white shadow-lg shadow-blue-900/20"
                              : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary-navy group-hover:shadow-sm"
                          }`}
                        >
                          <div className="scale-75 origin-center">
                            {category?.file && !imageErrors[category.id] ? (
                                <img 
                                    src={category.file} 
                                    alt={category.name} 
                                    className={`w-6 h-6 transition-all duration-500 ${
                                        isActive ? 'brightness-0 invert' : 'brightness-0 opacity-60 group-hover:opacity-100'
                                    }`}
                                    style={{ objectFit: 'contain' }}
                                    crossOrigin="anonymous"
                                    onError={() => {
                                        setImageErrors(prev => ({ ...prev, [category.id]: true }));
                                    }}
                                />
                            ) : (
                                <HelpCircle size={18} />
                            )}
                          </div>
                        </div>

                        <span
                          className={`text-[13px] font-bold truncate transition-all leading-snug flex-1 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                        >
                          {category.name}
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
                    Support Available 24/7
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                </div>
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:w-3/4 space-y-20">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  id={`cat-${category.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-hidden relative scroll-mt-24"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-2 transition-transform duration-1000">
                    {category?.file ? (
                        <img src={category.file} className="scale-[6] w-16 h-16 brightness-0" alt="" />
                    ) : (
                        <HelpCircle size={120} className="scale-[6]" />
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-5 mb-8 border-b border-slate-50 pb-8">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                      {category?.file && !imageErrors[category.id] ? (
                        <img 
                          src={category.file} 
                          alt={category.name} 
                          className="w-7 h-7 transition-all duration-500 group-hover:brightness-0 group-hover:invert"
                          style={{ objectFit: 'contain' }}
                          crossOrigin="anonymous"
                        />
                      ) : (
                        <HelpCircle size={20} />
                      )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                        {category.name}
                      </h2>
                      <p className="text-slate-400 mt-1 font-bold text-sm uppercase tracking-wider opacity-60">
                        {allFaqs[category.id]?.length || 0} Questions
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {allFaqs[category.id]?.map((faq, index) => {
                      const isOpen = openFAQs[faq.id];
                      return (
                        <div
                          key={faq.id}
                          className={`group/faq rounded-2xl overflow-hidden transition-all duration-300 border ${
                            isOpen 
                              ? 'border-orange-100 bg-orange-50/10' 
                              : 'border-slate-100 bg-white hover:border-slate-200'
                          }`}
                        >
                          <div
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full cursor-pointer flex items-center justify-between gap-4 p-5 md:p-6 text-left transition-all"
                          >
                            <div className="flex items-center gap-4 flex-1 text-slate-900">
                              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                                isOpen ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/10' : 'bg-slate-100 text-slate-400 group-hover/faq:bg-slate-200'
                              }`}>
                                <span className="text-sm font-bold">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                              </div>
                              <span className={`font-bold text-base md:text-xl transition-colors duration-300 leading-tight ${
                                isOpen ? 'text-slate-900' : 'text-slate-700'
                              }`}>
                                {faq.question}
                              </span>
                            </div>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                              isOpen ? 'bg-orange-600 text-white rotate-180' : 'bg-slate-100 text-slate-400'
                            }`}>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ 
                                  duration: 0.3,
                                  ease: "easeInOut"
                                }}
                                className="overflow-hidden"
                              >
                                <div className="px-5 md:px-6 pb-5 pt-0">
                                  <p className="text-slate-500 text-sm md:text-base leading-relaxed pl-14 md:pl-16">
                                    {faq.answer}
                                  </p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="bg-white border-t border-slate-100 overflow-hidden relative py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-primary-navy rounded-[3rem] md:rounded-[5rem] p-8 md:p-24 shadow-2xl shadow-blue-900/10 border border-white/5 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/30 via-transparent to-transparent"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/10 rounded-full blur-3xl -mr-[250px] -mt-[250px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-corporate-blue/10 rounded-full blur-3xl -ml-[250px] -mb-[250px]" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/10 mb-10 mx-auto lg:mx-0 transform -rotate-12">
                  <PhoneCall size={40} className="text-accent-orange" />
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[1.1]">
                  Still have <br /> unanswered questions?
                </h2>
                <p className="text-blue-100/70 text-xl font-bold max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Our dedicated corporate support team is here to help you navigate every aspect of the Eventibe ecosystem. Available 24/7.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 w-full lg:w-auto">
                <MagneticButton className="w-full">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-4 px-12 py-6 bg-cta-gradient text-white font-black rounded-3xl text-2xl transition-all shadow-2xl shadow-orange-500/40 hover:scale-[1.05] active:scale-95 group w-full"
                  >
                    Contact Support <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </MagneticButton>
                <Link
                  href="/customer-support"
                  className="flex items-center justify-center gap-4 px-12 py-6 bg-white/5 backdrop-blur-md text-white font-black rounded-3xl text-xl border border-white/10 hover:bg-white/10 transition-all active:scale-95 group w-full"
                >
                  Visit Help Center
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Info Footer Bar */}
      <div className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-30">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 rounded-full bg-accent-orange" />
             <span className="text-xs font-black uppercase tracking-widest text-primary-navy">Eventibe Official FAQ Repository</span>
          </div>
          <span className="text-xs font-black uppercase tracking-widest text-primary-navy">Last Updated: March 2026</span>
        </div>
      </div>
    </div>
  );
}
