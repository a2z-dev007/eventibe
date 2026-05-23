'use client'

import React from 'react'
import { Phone, Mail } from 'lucide-react'

interface ContactDetail {
  id: string | number
  name: string
  mobile: string
  email: string | null
  contact_type?: string
}

interface EventConciergeProps {
  contacts: ContactDetail[]
}

export function EventConcierge({ contacts }: EventConciergeProps) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden relative group">
      <div className="absolute h-40 w-40 bg-orange-500/5 blur-[80px] -top-10 -right-10 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-6 bg-[#FF9530] rounded-full" />
        <h4 className="font-black text-gray-900 text-lg tracking-tight">VIP Concierge</h4>
      </div>

      <div className="space-y-4">
        {(contacts || []).slice(0, 2).map((c, i) => (
          <div key={i} className="flex flex-col gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 w-[calc(100%-48px)]">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center font-black text-lg border-2 border-white shadow-sm relative shrink-0 uppercase">
                  {c.name ? c.name.charAt(0) : 'C'}
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#039c4d] border-2 border-white rounded-full" />
                </div>
                <div className="overflow-hidden w-full pr-2">
                  <p className="text-[13px] md:text-[14px] font-black text-gray-900 leading-none mb-1.5 truncate">{c.name}</p>
                  <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">{c.contact_type || 'Account Lead'}</p>
                </div>
              </div>
              <a href={`tel:${c.mobile}`} className="w-10 h-10 shrink-0 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-[#FF9530] hover:text-white transition-all shadow-md border border-gray-100 active:scale-90 touch-none">
                <Phone className="w-4 h-4" />
              </a>
            </div>
            {c.email && (
              <div className="flex items-center gap-2 pt-3 mt-1 border-t border-gray-100/50">
                <div className="w-6 h-6 rounded-full bg-orange-50/50 flex items-center justify-center shrink-0">
                  <Mail className="w-3 h-3 text-[#FF9530]" />
                </div>
                <a href={`mailto:${c.email}`} className="text-[11px] font-bold text-gray-500 hover:text-[#FF9530] transition-colors truncate mb-0.5">
                  {c.email}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-50 flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 shadow-sm shrink-0">
          <Mail className="w-5 h-5 text-[#FF9530]" />
        </div>
        <div>
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Global Support</p>
          <p className="text-[13px] font-bold text-gray-700">concierge@spodia.com</p>
        </div>
      </div>
    </div>
  )
}
