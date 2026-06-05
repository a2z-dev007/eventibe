'use client'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { X, User, Phone, Mail, Users, Utensils, FileText, Calendar, Building2, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { fetchEventTypes, addEventEnquiry } from '@/lib/api/eventsEndpoints'
import PremiumSelect from '@/components/ui/PremiumSelect'
import PremiumDatePicker from '@/components/ui/PremiumDatePicker'
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialVenueId?: number;
  venueName?: string;
  venueType?: string;
}

export function EventQuoteModal({ isOpen, onClose, initialVenueId, venueName, venueType }: Props) {
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { recaptchaVerified, recaptchaToken, resetRecaptcha } = useRecaptcha({
    containerId: "recaptcha-event-modal"
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const form = useForm<FormValues>({
    resolver: zodResolver(eventEnquirySchema) as any,
    defaultValues: {
      guest_name: '',
      guest_mobile: '',
      guest_email: '',
      no_of_guests: 1,
      meal_preference: '',
      message: '',
      event_type: null,
      event_date: '',
    }
  })

  const { register, handleSubmit, control, reset, formState: { errors } } = form

  // Fetch Data for Dropdowns
  const { data: eventTypesData } = useQuery({
    queryKey: ['eventTypes'],
    queryFn: () => fetchEventTypes(),
    enabled: isOpen
  })

  const eventOptions = eventTypesData?.records?.map((r: any) => ({ value: r.id, label: r.name })) || []

  const mutation = useMutation({
    mutationFn: addEventEnquiry,
    onSuccess: () => {
      setDone(true)
      reset()
      resetRecaptcha()
      setTimeout(() => {
        setDone(false)
        onClose()
      }, 3000)
    },
    onError: (error: any) => {
      alert(error.message || 'Something went wrong.')
    }
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
      venue: initialVenueId ? [Number(initialVenueId)] : [],
      event_type: data.event_type!.value,
      event_start_date: data.event_date,
      event_end_date: data.event_date,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      "g-recaptcha-response": recaptchaToken,
    }
    mutation.mutate(payload)
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.8 }}
            className="relative bg-white rounded-t-3xl sm:rounded-[3rem] border border-gray-100 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden mt-auto sm:mt-0"
            onClick={e => e.stopPropagation()}
          >

            {/* Header - Fixed to top */}
            <div className="shrink-0 z-10 bg-white flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 border-b border-gray-50">
              <div>
                <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">Send Enquiry</h3>
                <p className="text-[11px] sm:text-[13px] text-gray-500 font-medium mt-1.5 sm:mt-2">Direct enquiry to venue management</p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all group">
                <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
              </button>
            </div>

            {done ? (
              <div className="p-16 text-center overflow-y-auto">
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100/50">
                  <Sparkles className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Request Shared!</h4>
                <p className="text-gray-500 font-medium max-w-[280px] mx-auto mb-8 text-[15px] leading-relaxed">
                  We've sent your requirements. Our event specialist will reach out to you within 30 minutes.
                </p>
                <button type="button" onClick={onClose} className="bg-gray-900 hover:bg-black text-white px-12 py-3.5 rounded-xl font-bold text-sm tracking-widest transition-all shadow-xl shadow-gray-200">
                  Done
                </button>
              </div>
            ) : (
              <form className="flex flex-col min-h-0 flex-1" onSubmit={handleSubmit(onSubmit as any)}>
                <div
                  className="p-6 sm:p-10 space-y-8 md:space-y-12 overflow-y-auto flex-1 scrollbar-hide overscroll-contain"
                  data-lenis-prevent="true"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">

                    {/* Event Occasion */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Event Occasion <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Controller
                          name="event_type"
                          control={control}
                          render={({ field }) => (
                            <PremiumSelect
                              {...field}
                              label=""
                              icon={<Sparkles className="w-5 h-5 text-gray-400" />}
                              options={eventOptions}
                              placeholder="Select Occasion"
                              className="bg-transparent -ml-2.5 w-full"
                            />
                          )}
                        />
                      </div>
                      {errors.event_type && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.event_type.message}</p>}
                    </div>

                    {/* Event Dates */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Event Date <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                        <input
                          type="date"
                          {...register('event_date')}
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.event_date && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.event_date.message}</p>}
                    </div>

                    {/* Expected Guests */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Expected Guests <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Users className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                        <input
                          type="number"
                          min="1"
                          {...register('no_of_guests')}
                          placeholder="e.g. 250"
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.no_of_guests && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.no_of_guests.message}</p>}
                    </div>

                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <User className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="text"
                          {...register('guest_name')}
                          placeholder="Enter your full name"
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.guest_name && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_name.message}</p>}
                    </div>

                    {/* Mobile No */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Mobile No <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Phone className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="tel"
                          {...register('guest_mobile')}
                          placeholder="10-digit number"
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.guest_mobile && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_mobile.message}</p>}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Mail className="w-5 h-5 text-gray-400 mr-3" />
                        <input
                          type="email"
                          {...register('guest_email')}
                          placeholder="Enter email address"
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.guest_email && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.guest_email.message}</p>}
                    </div>

                    {/* Food Preference */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Food Preference <span className="text-red-500">*</span></label>
                      <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                        <Utensils className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
                        <input
                          type="text"
                          {...register('meal_preference')}
                          placeholder="E.g. Pure Veg, Jain Food"
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                      {errors.meal_preference && <p className="text-[10px] text-red-500 font-bold px-1 uppercase tracking-wider">{errors.meal_preference.message}</p>}
                    </div>

                    {/* Special Requests */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest pl-1">Special Requests</label>
                      <div className="flex items-start border border-gray-200 rounded-xl px-4 py-3 focus-within:border-[#FF9530] focus-within:ring-1 focus-within:ring-[#FF9530] transition-all bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-full min-h-[50px]">
                        <FileText className="w-5 h-5 text-gray-400 mr-3 mt-0.5 shrink-0" />
                        <textarea
                          {...register('message')}
                          rows={1}
                          placeholder="Any specific decor or timing needs..."
                          className="w-full bg-transparent p-0 text-[15px] font-semibold text-gray-900 outline-none resize-none placeholder:text-gray-400 placeholder:font-medium"
                        />
                      </div>
                    </div>

                    {/* Captcha */}
                    <div className="md:col-span-2">
                      <RecaptchaV2 containerId="recaptcha-event-modal" />
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-6 border-t border-gray-50 gap-6 sm:gap-0 bg-white">
                  <p className="text-[10px] text-gray-400 max-w-[200px] leading-relaxed font-bold uppercase tracking-wider text-center sm:text-left">
                    Trusted by venues nationwide <br />
                    <span className="text-[#FF9530]">Verified Spodia Enquiry</span>
                  </p>
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <button type="button" onClick={onClose} className="hidden sm:block font-black text-xs text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={mutation.isPending || !recaptchaVerified}
                      className={`flex-1 sm:flex-none sm:min-w-[200px] bg-[#FF9530] hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 ${mutation.isPending || !recaptchaVerified ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Request
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
