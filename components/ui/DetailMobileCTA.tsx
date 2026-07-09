'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface DetailMobileCTAProps {
  price?: string;
  targetId: string; // The HTML element ID to scroll to (e.g. "inquiry-form")
  buttonText?: string;
}

export default function DetailMobileCTA({ price, targetId, buttonText = "Inquire Now" }: DetailMobileCTAProps) {
  const handleScroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the first input field after scrolling completes
      const firstInput = element.querySelector('input, textarea') as HTMLInputElement | HTMLTextAreaElement | null;
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 600);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] px-5 py-3 flex items-center justify-between pb-[calc(12px+env(safe-area-inset-bottom))] animate-slide-up">
      <div className="flex flex-col">
        <span className="text-[10px] font-bold text-soft-slate uppercase tracking-wider">Starting Price</span>
        <span className="text-lg font-black text-primary-navy tracking-tight">
          {price && price !== 'Custom Quote' && !price.includes('NaN') ? price : 'Custom Quote'}
        </span>
      </div>

      <button
        onClick={handleScroll}
        className="flex items-center gap-2 bg-cta-gradient text-white text-sm font-bold px-6 py-3.5 rounded-2xl shadow-md shadow-orange-500/20 active:scale-[0.97] transition-all cursor-pointer"
      >
        <Sparkles size={14} className="animate-pulse" />
        {buttonText}
      </button>
    </div>
  );
}
