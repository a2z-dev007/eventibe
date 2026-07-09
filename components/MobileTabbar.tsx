'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Building2, Briefcase, BookOpen, Menu } from 'lucide-react';
import { useMobileNav } from '@/contexts/MobileNavContext';
import { motion } from 'motion/react';

export default function MobileTabbar() {
  const pathname = usePathname();
  const { setIsMobileMenuOpen } = useMobileNav();

  // Hide the navigation tabbar on detail pages to prevent screen clutter
  const isDetailPage = pathname.includes('/venue/') || pathname.includes('/vendor/');
  if (isDetailPage) return null;

  const tabs = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
      isActive: pathname === '/',
    },
    {
      label: 'Venues',
      icon: Building2,
      href: '/venues',
      isActive: pathname.startsWith('/venues') || pathname.startsWith('/wedding-venues') || pathname.startsWith('/corporate-event-venues') || pathname.startsWith('/venue'),
    },
    {
      label: 'Vendors',
      icon: Briefcase,
      href: '/vendors',
      isActive: pathname.startsWith('/vendors') || pathname.startsWith('/vendor'),
    },
    {
      label: 'Blogs',
      icon: BookOpen,
      href: '/blogs',
      isActive: pathname.startsWith('/blogs'),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/80 backdrop-blur-lg border-t border-slate-100 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Link
              key={tab.label}
              href={tab.href}
              className={`relative flex flex-col items-center justify-center flex-1 h-full select-none cursor-pointer transition-colors duration-200 ${
                tab.isActive ? 'text-accent-orange font-bold' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className="relative p-1">
                <Icon size={20} className="transition-transform duration-300 active:scale-75" />
                {tab.isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-orange"
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{tab.label}</span>
            </Link>
          );
        })}
        {/* Menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center flex-1 h-full select-none cursor-pointer text-slate-400 hover:text-slate-600 border-none bg-transparent"
        >
          <div className="relative p-1">
            <Menu size={20} className="transition-transform duration-300 active:scale-75" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Menu</span>
        </button>
      </div>
    </div>
  );
}
