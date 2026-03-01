'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '@/assets/images/logo.png';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-us' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact-us' },
  ];

  const venueLinks = [
    { name: 'All Venues', href: '/venues' },
    { name: 'Wedding Venues', href: '/wedding-venues' },
    { name: 'Corporate Venues', href: '/corporate-event-venues' },
  ];

  return (
    <header
      className={`${isHome ? 'fixed' : 'sticky'} top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3 backdrop-blur-md bg-opacity-95' : isHome ? 'bg-transparent py-5' : 'bg-white shadow-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={logoImg} 
            alt="Eventibe Logo" 
            className={`h-10 md:h-16 w-auto object-contain transition-all duration-300 ${isHome && !isScrolled ? 'brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : ''}`}
            priority
          />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-1 text-[15px] font-semibold transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
                isHome && !isScrolled 
                  ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white' 
                  : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Venues Dropdown */}
          <div className="relative group h-full flex items-center py-2 cursor-pointer">
            <button className={`relative flex items-center gap-1 text-[15px] font-semibold transition-colors py-1 after:content-[''] after:absolute after:bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
                  isHome && !isScrolled 
                    ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white' 
                    : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'
                }`}>
              Venues <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-0 z-50">
              <div className="w-48 bg-white shadow-xl rounded-xl p-2 flex flex-col border border-gray-100">
                 {venueLinks.map((vlink) => (
                    <Link href={vlink.href} key={vlink.name} className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">
                       {vlink.name}
                    </Link>
                 ))}
              </div>
            </div>
          </div>

          {navLinks.slice(3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative py-1 text-[15px] font-semibold transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
                isHome && !isScrolled 
                  ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white' 
                  : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Partners Dropdown */}
          <div className="relative group h-full flex items-center py-2 cursor-pointer">
            <button className={`relative flex items-center gap-1 text-[15px] font-semibold transition-colors py-1 after:content-[''] after:absolute after:bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${
                isHome && !isScrolled ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white' : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'
            }`}>
              Partners <ChevronDown className="w-4 h-4 ml-0.5 transition-transform duration-300 group-hover:-rotate-180" />
            </button>
            <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform origin-top translate-y-3 group-hover:translate-y-0 z-50">
              <div className="w-48 bg-white shadow-xl rounded-xl p-2 flex flex-col border border-gray-100">
                 <Link href="/partner-with-us" className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">Partner With Us</Link>
                 <Link href="/list-your-service" className="px-3 py-2 text-sm font-medium text-soft-slate hover:text-corporate-blue hover:bg-gray-50 rounded-lg transition-colors">List Service</Link>
              </div>
            </div>
          </div>
          
          <Link
            href="/login"
            className={`relative py-1 text-[15px] font-semibold transition-colors after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[2px] hover:after:w-full after:transition-all after:duration-300 ${isHome && !isScrolled ? 'text-white hover:text-gray-200 drop-shadow-md after:bg-white' : 'text-primary-navy hover:text-corporate-blue after:bg-corporate-blue'}`}
          >
            Login
          </Link>
          <Link
            href="/list-your-venue"
            className="bg-cta-gradient text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-transform shadow-sm"
          >
            List Your Venue
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 transition-colors ${isHome && !isScrolled ? 'text-white hover:text-gray-200' : 'text-primary-navy hover:text-corporate-blue'}`}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu strokeWidth={2.5} size={28} />
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-primary-navy/60 backdrop-blur-sm z-[90] lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-[85%] max-w-[360px] h-[100dvh] bg-white shadow-2xl z-[100] flex flex-col lg:hidden overflow-y-auto"
              data-lenis-prevent="true"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white sticky top-0 z-10">
                <Image 
                  src={logoImg} 
                  alt="Eventibe Logo" 
                  className="h-8 w-auto object-contain"
                />
                <button
                  className="p-2 text-gray-500 hover:text-accent-orange bg-gray-50 hover:bg-orange-50 rounded-full transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex flex-col p-5 flex-1 pb-10">
                <div className="flex flex-col space-y-1 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-lg font-bold text-primary-navy hover:text-accent-orange py-3 border-b border-gray-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="mb-8">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pl-1">Venues</p>
                  <div className="flex flex-col space-y-1">
                    {venueLinks.map((vlink) => (
                      <Link
                        key={vlink.name}
                        href={vlink.href}
                        className="text-[15px] font-semibold text-soft-slate hover:text-accent-orange py-2.5 pl-4 border-l-2 border-transparent hover:border-accent-orange transition-all bg-gray-50/50 hover:bg-orange-50/50 rounded-r-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {vlink.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <Link
                      href="/partner-with-us"
                      className="text-center text-sm font-semibold text-corporate-blue hover:text-white hover:bg-corporate-blue py-2.5 rounded-lg border border-corporate-blue/20 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Partner With Us
                    </Link>
                    <Link
                      href="/list-your-service"
                      className="text-center text-sm font-semibold text-corporate-blue hover:text-white hover:bg-corporate-blue py-2.5 rounded-lg border border-corporate-blue/20 transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      List Service
                    </Link>
                  </div>
                  <Link
                    href="/login"
                    className="text-center bg-gray-100 hover:bg-gray-200 text-primary-navy py-3.5 rounded-xl font-bold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login to Account
                  </Link>
                  <Link
                    href="/list-your-venue"
                    className="text-center bg-cta-gradient hover:opacity-90 text-white py-3.5 rounded-xl font-bold shadow-md shadow-orange-500/20 transition-all"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    List Your Venue
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
