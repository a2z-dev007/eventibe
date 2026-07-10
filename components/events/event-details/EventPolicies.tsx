'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ShieldCheck, X, FileText, ChevronRight, Info, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Expandable text — shows 2 lines then "Show more / Show less" ──────────────
function ExpandableText({ text, className = '' }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false)
  const [clamped, setClamped] = useState(false)
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // If scroll height > client height the text overflows → needs toggle
    setClamped(el.scrollHeight > el.clientHeight + 1)
  }, [text])

  if (!text) return null

  return (
    <div>
      <p
        ref={ref}
        className={`text-[13px] text-gray-500 font-medium leading-relaxed ${className} ${!expanded ? 'line-clamp-2' : ''}`}
      >
        {text}
      </p>
      {(clamped || expanded) && (
        <button
          onClick={() => setExpanded(v => !v)}
          className="mt-1 flex items-center gap-1 text-[11px] font-black text-[#FF9530] hover:text-orange-600 uppercase tracking-wider transition-colors"
        >
          {expanded ? (
            <><ChevronUp className="w-3 h-3" /> Show less</>
          ) : (
            <><ChevronDown className="w-3 h-3" /> Show more</>
          )}
        </button>
      )}
    </div>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TermCondition {
  id: string | number
  name: string
  description?: string | null | undefined
}

interface EventPoliciesProps {
  policies: TermCondition[]
  setQuoteOpen: (open: boolean) => void
  venueTitle: string
  venueLoc: string
}

// ── Main component ─────────────────────────────────────────────────────────────
export function EventPolicies({ policies, setQuoteOpen, venueTitle, venueLoc }: EventPoliciesProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset'
    return () => { document.body.style.overflow = 'unset' }
  }, [isModalOpen])

  if (!policies || policies.length === 0) return null

  const preview = policies.slice(0, 4)

  return (
    <section id="policies" className="scroll-mt-[142px] py-10 md:py-14 border-t border-gray-100">

      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-[2px] w-8 bg-[#FF9530] rounded-full" />
          <p className="text-[11px] font-black text-[#FF9530] uppercase tracking-[0.35em]">
            Protocol &amp; Guidelines
          </p>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight leading-snug">
          Terms &amp; Policies
        </h2>
      </div>

      {/* Policy cards — page */}
      <div className="rounded-2xl border border-gray-100 bg-gray-50/50 divide-y divide-gray-100 overflow-hidden">
        {preview.map((t) => {
          const text = t.description?.replace(/<[^>]*>?/gm, '').trim() || ''
          return (
            <div key={t.id} className="flex items-start gap-4 p-4 md:p-5">
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#FF9530]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-black text-gray-900 mb-1 leading-snug">{t.name}</p>
                <ExpandableText text={text} />
              </div>
            </div>
          )
        })}
      </div>

      {/* View all + CTA row */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {policies.length > 4 && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 text-[11px] font-black text-[#FF9530] hover:text-orange-600 uppercase tracking-widest transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            View All {policies.length} Policies
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => setQuoteOpen(true)}
          className="flex items-center gap-2 text-[11px] font-black text-gray-500 hover:text-gray-900 uppercase tracking-widest transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
          Need clarification? Send an enquiry
        </button>
      </div>

      {/* Slide-over drawer */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1100] flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative bg-white w-full sm:max-w-md h-full shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Drawer header */}
              <div className="shrink-0 flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div>
                  <p className="text-[10px] font-black text-[#FF9530] uppercase tracking-[0.3em] mb-0.5">
                    Protocol &amp; Guidelines
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 tracking-tight">All Policies</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3" data-lenis-prevent="true">
                {policies.map((t) => {
                  const text = t.description?.replace(/<[^>]*>?/gm, '').trim() || ''
                  return (
                    <div key={t.id} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-6 h-6 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#FF9530]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-black text-gray-900 mb-1 uppercase tracking-wide leading-snug">
                            {t.name}
                          </p>
                          <ExpandableText text={text} />
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
