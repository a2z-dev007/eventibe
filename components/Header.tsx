'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Menu, X, ChevronDown,
  Home, Info, Lightbulb, BookOpen, Phone,
  Building2, Heart, Briefcase, Handshake, ListPlus,
  LogIn, MapPin, ArrowUpRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '@/assets/images/logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const close = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Home',         href: '/',             icon: Home },
    { name: 'About',        href: '/about-us',     icon: Info },
    { name: 'How It Works', href: '/how-it-works', icon: Lightbulb },
    { name: 'Blog',         href: '/blog',         icon: BookOpen },
    { name: 'Our Story',    href: '/our-story',    icon: Building2 },
    { name: 'Contact',      href: '/contact-us',   icon: Phone },
  ];

  const venueLinks = [
    { name: 'All Venues',       href: '/venues',                 icon: MapPin,    color: 'bg-orange-500/15 text-orange-400' },
    { name: 'Wedding Venues',   href: '/wedding-venues',         icon: Heart,     color: 'bg-rose-500/15 text-rose-400' },
    { name: 'Corporate Venues', href: '/corporate-event-venues', icon: Briefcase, color: 'bg-blue-500/15 text-blue-400' },
  ];

  const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, x: 28 },
    show:   {
      opacity: 1,
      x: 0,
      transition: { type: 'spring' as const, damping: 22, stiffness: 260 },
    },
  };

  const navTextClass = (extra = '') =>
    `relative py-1 text-[15px] font-semibold transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
      isHome && !isScrolled
        ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white'
        : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'
    } ${extra}`;

  return (
    <header
      className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-3 backdrop-blur-md bg-opacity-95'
          : isHome ? 'bg-transparent md:py-5 py-3' : 'bg-white shadow-sm md:py-5 py-3'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={logoImg}
            alt="Eventibe Logo"
            className={`h-10 md:h-16 w-auto object-contain transition-all duration-300 ${
              isHome && !isScrolled ? 'brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : ''
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link key={link.name} href={link.href} className={navTextClass()}>
              {link.name}
            </Link>
          ))}

          {/* Venues Dropdown */}
          <div className="relative group h-full flex items-center py-2 cursor-pointer">
            <button className={navTextClass('flex items-center gap-1')}>
              Venues <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-0 z-50">
              <div className="w-48 bg-white shadow-xl rounded-xl p-2 flex flex-col border border-gray-100">
                {venueLinks.map((vlink) => (
                  <Link key={vlink.name} href={vlink.href} className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">
                    {vlink.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link key={link.name} href={link.href} className={navTextClass()}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="relative group h-full flex items-center py-2 cursor-pointer">
            <button className={navTextClass('flex items-center gap-1')}>
              Partners <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-0 z-50">
              <div className="w-48 bg-white shadow-xl rounded-xl p-2 flex flex-col border border-gray-100">
                <Link href="/partner-with-us" className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">Partner With Us</Link>
                <Link href="/list-your-service" className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">List Service</Link>
              </div>
            </div>
          </div>
          <Link href="/login" className={navTextClass()}>Login</Link>
          <Link href="/list-your-venue" className="bg-cta-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-transform shadow-sm">
            List Your Venue
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`lg:hidden p-2 transition-colors ${isHome && !isScrolled ? 'text-white hover:text-gray-200' : 'text-primary-navy hover:text-corporate-blue'}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu strokeWidth={2.5} size={28} />
        </button>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-[6px] z-[90] lg:hidden"
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 35, stiffness: 300, mass: 1 }}
              className="fixed top-0 right-0 w-[88%] max-w-[350px] h-[100dvh] z-[100] flex flex-col lg:hidden overflow-y-auto bg-white shadow-2xl"
              data-lenis-prevent="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-50">
                <Image src={logoImg} alt="Eventibe" className="h-9 w-auto object-contain" />
                <button
                  onClick={close}
                  className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all border border-slate-100"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Nav links — staggered */}
              <motion.div
                className="flex flex-col px-4 pt-5 pb-2"
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={close}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl mb-1.5 transition-all ${
                          active
                            ? 'bg-orange-50 text-orange-600'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${active ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          <Icon size={16} strokeWidth={2.5} />
                        </span>
                        <span className="text-[15px] font-bold tracking-tight">{link.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-600" />}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Venues */}
              <motion.div
                className="px-4 pt-2 pb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.45 }}
              >
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Explore Venues</p>
                <div className="flex flex-col gap-2.5">
                  {venueLinks.map((vlink) => {
                    const Icon = vlink.icon;
                    return (
                      <Link
                        key={vlink.name}
                        href={vlink.href}
                        onClick={close}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group"
                      >
                        <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${vlink.color.replace('text-orange-400', 'text-orange-600').replace('text-rose-400', 'text-rose-600').replace('text-blue-400', 'text-blue-600').replace('bg-orange-500/15', 'bg-orange-100').replace('bg-rose-500/15', 'bg-rose-100').replace('bg-blue-500/15', 'bg-blue-100')}`}>
                          <Icon size={15} strokeWidth={2.5} />
                        </span>
                        <span className="text-[14px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors flex-1">{vlink.name}</span>
                        <ArrowUpRight size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              {/* Partner links */}
              <motion.div
                className="px-4 pb-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
              >
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-4">Our Partners</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { name: 'Partner With Us', href: '/partner-with-us',   icon: Handshake },
                    { name: 'List Service',    href: '/list-your-service', icon: ListPlus },
                  ].map((p) => {
                    const Icon = p.icon;
                    return (
                      <Link
                        key={p.name}
                        href={p.href}
                        onClick={close}
                        className="flex flex-col items-center gap-3 px-3 py-5 rounded-2xl bg-slate-50/50 hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all group text-center"
                      >
                        <span className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                          <Icon size={17} strokeWidth={2} />
                        </span>
                        <span className="text-[12px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors leading-tight">{p.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              {/* Bottom CTAs */}
              <motion.div
                className="mt-auto px-4 pb-8 pt-5 border-t border-slate-100 flex flex-col gap-3.5 bg-slate-50/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45 }}
              >
                <Link
                  href="/login"
                  onClick={close}
                  className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-[14px] transition-all shadow-sm"
                >
                  <LogIn size={18} strokeWidth={2.5} className="text-slate-400" />
                  Login to Account
                </Link>
                <Link
                  href="/list-your-venue"
                  onClick={close}
                  className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-cta-gradient hover:opacity-90 text-white font-bold text-[14px] shadow-lg shadow-orange-500/20 transition-all"
                >
                  <Building2 size={18} strokeWidth={2.5} />
                  List Your Venue
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
