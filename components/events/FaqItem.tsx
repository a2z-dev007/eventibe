'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface FaqItemProps {
  q: string
  a: string
}

export default function FaqItem({ q, a }: FaqItemProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`group bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        open 
          ? 'border-orange-200 bg-orange-50/5' 
          : 'border-slate-100 hover:border-slate-200'
      }`}
    >
      <div
        onClick={() => setOpen(o => !o)}
        className="w-full cursor-pointer flex items-center justify-between text-left px-5 py-4 gap-4 outline-none"
        aria-expanded={open}
      >
        <span className={`font-bold text-sm sm:text-base tracking-tight transition-colors duration-300 ${open ? 'text-slate-900' : 'text-slate-700'}`}>
          {q}
        </span>

        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            open
              ? 'bg-orange-600 text-white rotate-180'
              : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'
          }`}
        >
          <ChevronDown className="w-4 h-4" strokeWidth={2.5} />
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              height: { type: 'spring', damping: 30, stiffness: 200 },
              opacity: { duration: 0.2 }
            }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-slate-500 text-sm leading-relaxed font-medium pl-14">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
