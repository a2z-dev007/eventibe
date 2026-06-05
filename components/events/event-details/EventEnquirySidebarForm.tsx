'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { User, Phone, Mail, Users, Utensils, FileText, Sparkles, Loader2, ArrowRight, Calendar } from 'lucide-react'
import { fetchEventTypes, addEventEnquiry } from '@/lib/api/eventsEndpoints'
import PremiumSelect from '@/components/ui/PremiumSelect'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import { useRecaptcha, RecaptchaV2 } from '@/components/common/RecaptchaV2'
import { toast } from 'sonner'

const eventEnquirySchema = z.object({
  guest_name: z.string().min(2, "Name is too short"),
  guest_mobile: z.string().regex(/^(?:\+91|91)?[6-9]\d{9}$/, "Invalid Indian mobile number"),
  guest_email: z.string().email("Invalid email address"),
  no_of_guests: z.coerce.number().min(1, "Guests required"),
  meal_preference: z.string().min(1, "Food preference is required"),
  message: z.string().optional(),
  event_type: z.any().refine(v => v !== null, "Select event type"),
  event_date: z.string().min(1, "Select date"),
})

interface FormValues {
  guest_name: string
  guest_mobile: string
  guest_email: string
  no_of_guests: number
  meal_preference: string
  message?: string
  event_type: { value: number; label: string } | null
  event_date: string
}

// ── Success Modal Portal ───────────────────────────────────────────────────────
function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true); return () => setMounted(false) }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }}
            className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm mx-auto p-10 flex flex-col items-center text-center overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FF9530]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.15 }}
              className="relative w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mb-6"
            >
              <Sparkles className="w-9 h-9 text-green-500" />
            </motion.div>

            <motion.h4
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-black text-gray-900 tracking-tight mb-2"
            >
              Request Shared!
            </motion.h4>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-gray-500 text-[14px] font-medium leading-relaxed mb-8 max-w-[220px]"
            >
              We've received your enquiry. Our event specialist will reach out you soon.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              type="button"
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-black text-white px-10 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-gray-200 active:scale-95"
            >
              Done
            </motion.button>

            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-4">
              Verified Spodia Enquiry · <span className="text-[#FF9530]">Trusted by venues</span>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}

// ── Main Sidebar Form ──────────────────────────────────────────────────────────
export function EventEnquirySidebarForm({ venueName, venueId }: { venueName?: string, venueId?: number }) {
  const [showSuccess, setShowSuccess] = useState(false)

  const { recaptchaVerified, recaptchaToken, resetRecaptcha } = useRecaptcha({
    containerId: "recaptcha-event-sidebar"
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(eventEnquirySchema) as any,
    defaultValues: {
      guest_name: '', guest_mobile: '', guest_email: '', no_of_guests: 1,
      meal_preference: '', message: '', event_type: null, event_date: '',
    }
  })

  const { register, handleSubmit, control, reset, formState: { errors } } = form

  const { data: eventTypesData } = useQuery({
    queryKey: ['eventTypes'],
    queryFn: () => fetchEventTypes(),
  })
  const eventOptions = eventTypesData?.records?.map((r: any) => ({ value: r.id, label: r.name })) || []

  const mutation = useMutation({
    mutationFn: addEventEnquiry,
    onSuccess: () => {
      reset()
      resetRecaptcha()
      setShowSuccess(true)
    },
    onError: (error: any) => alert(error.message || 'Something went wrong.')
  })

  const onSubmit = (data: FormValues) => {
    if (!recaptchaVerified) {
      toast.warning("Please verify captcha first")
      return
    }

    const payload = {
      guest_name: data.guest_name,
      guest_mobile: data.guest_mobile,
      guest_email: data.guest_email,
      no_of_guests: data.no_of_guests,
      meal_preference: data.meal_preference || '',
      message: data.message || '',
      venue: venueId ? [Number(venueId)] : [],
      event_type: data.event_type!.value,
      event_start_date: data.event_date,
      event_end_date: data.event_date,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      "g-recaptcha-response": recaptchaToken,
    }
    mutation.mutate(payload)
  }

  return (
    <>
      {/* Success Modal Portal */}
      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />

      {/* Sidebar Form — always stays visible */}
      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible flex flex-col">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-5 md:p-6 text-center shrink-0 rounded-t-[2rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF9530]/15 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-xl md:text-2xl font-black text-white relative z-10 tracking-tight">
            Send Enquiry
          </h3>
          <p className="text-[11px] text-gray-400 font-medium mt-1 relative z-10">Direct enquiry to venue management</p>
        </div>

        <form className="p-5 md:p-6 flex flex-col gap-4 relative z-10" onSubmit={handleSubmit(onSubmit as any)}>

          {/* Event Occasion */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Event Occasion <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Controller name="event_type" control={control} render={({ field }) => (
                <PremiumSelect {...field} label="" icon={<Sparkles className="w-4 h-4 text-gray-400" />} options={eventOptions} placeholder="Select Occasion" className="bg-transparent -ml-2.5 w-full" />
              )} />
            </div>
            {errors.event_type && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.event_type.message}</p>}
          </div>

          {/* Event Date */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Event Date <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Calendar className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <input type="date" {...register('event_date')} className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
            {errors.event_date && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.event_date.message}</p>}
          </div>

          {/* Expected Guests */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Expected Guests <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Users className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <input type="number" min="1" {...register('no_of_guests')} placeholder="e.g. 250" className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
            {errors.no_of_guests && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.no_of_guests.message}</p>}
          </div>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <User className="w-4 h-4 text-gray-400 mr-3" />
              <input type="text" {...register('guest_name')} placeholder="Enter your full name" className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
            {errors.guest_name && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_name.message}</p>}
          </div>

          {/* Mobile No */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Mobile No <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <input type="tel" {...register('guest_mobile')} placeholder="10-digit number" className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
            {errors.guest_mobile && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_mobile.message}</p>}
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <input type="email" {...register('guest_email')} placeholder="Enter email address" className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
            {errors.guest_email && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_email.message}</p>}
          </div>

          {/* Food Preference */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Food Preference <span className="text-red-500">*</span></label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <Utensils className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <input type="text" {...register('meal_preference')} placeholder="E.g. Pure Veg, Jain Food" className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none placeholder:text-gray-400" />
            </div>
          </div>

          {/* Special Requests */}
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Special Requests</label>
            <div className="flex items-start border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] min-h-[50px]">
              <FileText className="w-4 h-4 text-gray-400 mr-3 mt-0.5 shrink-0" />
              <textarea
                {...register('message')}
                rows={2}
                placeholder="Any specific decor or timing needs..."
                className="w-full bg-transparent p-0 text-[14px]  text-gray-900 outline-none resize-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Captcha */}
          <RecaptchaV2 containerId="recaptcha-event-sidebar" />

          <button
            type="submit"
            disabled={mutation.isPending || !recaptchaVerified}
            className={`w-full mt-1 bg-[#FF9530] hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 ${mutation.isPending || !recaptchaVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {mutation.isPending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <>Send Request <ArrowRight className="w-4 h-4" /></>}
          </button>

          <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-wider">
            Trusted by venues · <span className="text-[#FF9530]">Verified Spodia Enquiry</span>
          </p>
        </form>
      </div>
    </>
  )
}
