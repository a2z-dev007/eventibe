'use client'

import React from 'react'
import { Users, Utensils, ShieldCheck } from 'lucide-react'

interface PackageDetail {
  id: string
  name: string
  price: number | string
  file: string | null
  type?: string
  suitable_for?: string
}

interface EventPricingCardProps {
  packagePrice: number
  packageDetails: PackageDetail[]
  getImageUrl: (path: string | null | undefined) => string
  setQuoteOpen: (open: boolean) => void
}

export function EventPricingCard({ packagePrice, packageDetails, getImageUrl, setQuoteOpen }: EventPricingCardProps) {
  return (
    <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-700">
      <p className="text-gray-400 font-black text-[11px] uppercase tracking-widest mb-3">Package Start Rate</p>
      <div className="flex items-baseline gap-2 mb-10">
        <span className="text-5xl font-black text-gray-900 tracking-tight">₹{packagePrice.toLocaleString()}</span>
        <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">/ Per Plate</span>
      </div>
      
      <div className="space-y-5 mb-10 border-t border-gray-50 pt-10">
        {[
          { icon: <Users className="w-5 h-5 text-[#FF9530]" />, text: "Custom Guest Capacity" },
          { icon: <Utensils className="w-5 h-5 text-[#FF9530]" />, text: "Gourmet Catering Sync" }
        ].map((it, i) => (
          <div key={i} className="flex items-center gap-5 text-gray-800 font-bold text-sm tracking-tight">
            <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] flex items-center justify-center shrink-0 border border-gray-100">
              {it.icon}
            </div>
            {it.text}
          </div>
        ))}
      </div>
      
      {packageDetails && packageDetails.length > 0 && (
        <div className="mb-10 space-y-4">
          <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">Packages Starting At</h4>
          {packageDetails.map((pkg) => (
            <div key={pkg.id} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex gap-4 hover:border-orange-200 transition-colors cursor-default group">
              <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm shrink-0">
                <img src={getImageUrl(pkg.file)} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col justify-center overflow-hidden">
                <p className="font-black text-[13px] text-gray-900 leading-tight truncate">{pkg.name}</p>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1 truncate">{pkg.type || pkg.suitable_for}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button 
        onClick={() => setQuoteOpen(true)} 
        className="w-full bg-gradient-to-br from-[#FF9530] to-[#FF8000] text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-orange-500/30 active:scale-95 transition-all outline-none"
      >
        Get a Quote
      </button>
      <p className="text-center mt-8 text-[10px] text-gray-300 font-black uppercase tracking-widest flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4" /> Spodia Elite Certified
      </p>
    </div>
  )
}
