'use client'
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { X, User, Phone, Mail, Users, Utensils, FileText, Calendar, Building2, Sparkles, Loader2, ArrowRight } from 'lucide-react'
import { fetchEventTypes, fetchVenuesList, addEventEnquiry } from '@/lib/api/eventsEndpoints'
import PremiumSelect from '@/components/ui/PremiumSelect'
import PremiumDatePicker from '@/components/ui/PremiumDatePicker'
import { useSearchParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const eventEnquirySchema = z.object({
  guest_name: z.string().min(2, "Name is too short"),
  guest_mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit mobile number"),
  guest_email: z.string().email("Invalid email address"),
  no_of_guests: z.coerce.number().min(1, "Guests required"),
  meal_preference: z.string().optional(),
  message: z.string().optional(),
  event_type: z.object({ 
    value: z.number(), 
    label: z.string() 
  }).nullable().refine(v => v !== null, "Select event type"),
  date_range: z.tuple([z.date().nullable(), z.date().nullable()]).refine((dates) => dates[0] !== null, "Select date(s)"),
})

type FormValues = {
  guest_name: string
  guest_mobile: string
  guest_email: string
  no_of_guests: number
  meal_preference?: string
  message?: string
  event_type: { value: number; label: string } | null
  date_range: [Date | null, Date | null]
}

interface Props { isOpen: boolean; onClose: () => void; initialVenueId?: number }

export function EventQuoteModal({ isOpen, onClose, initialVenueId }: Props) {
  const [done, setDone] = useState(false)
  
  const { 
    register, 
    handleSubmit, 
    control, 
    reset, 
    setValue,
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(eventEnquirySchema),
    defaultValues: {
      guest_name: '',
      guest_mobile: '',
      guest_email: '',
      no_of_guests: 0,
      meal_preference: '',
      message: '',
      event_type: null,
      date_range: [null, null],
    }
  })

  // Fetch Data for Dropdowns
  const { data: eventTypesData } = useQuery({ 
    queryKey: ['eventTypes'], 
    queryFn: () => fetchEventTypes(),
    enabled: isOpen 
  })

  const eventOptions = eventTypesData?.records?.map(r => ({ value: r.id, label: r.name })) || []

  // No need to pre-select venue in form state as it's passed directly

  const mutation = useMutation({
    mutationFn: addEventEnquiry,
    onSuccess: () => {
      setDone(true)
      reset()
      setTimeout(() => {
        setDone(false)
        onClose()
      }, 3000)
    },
    onError: (error: any) => {
      alert(error.message || 'Something went wrong.')
    }
  })

  if (!isOpen) return null

  const onSubmit = (data: FormValues) => {
    const payload = {
      guest_name: data.guest_name,
      guest_mobile: data.guest_mobile,
      guest_email: data.guest_email,
      no_of_guests: data.no_of_guests,
      meal_preference: data.meal_preference || '',
      message: data.message || '',
      venue: initialVenueId ? [Number(initialVenueId)] : [],
      event_type: data.event_type!.value,
      event_start_date: data.date_range[0]!.toISOString().split('T')[0],
      event_end_date: (data.date_range[1] || data.date_range[0])!.toISOString().split('T')[0],
      page_url: typeof window !== 'undefined' ? window.location.href : '',
    }
    mutation.mutate(payload)
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-t-[2rem] sm:rounded-[2rem] border border-gray-100 shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-5 sm:zoom-in duration-300" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sm:px-8 py-5 sm:py-7 pb-0 border-b border-gray-50">
          <div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-gray-900 tracking-tight leading-none">Send Enquiry</h3>
            <p className="text-[11px] sm:text-[13px] text-gray-500 font-medium mt-1.5 sm:mt-2">Direct enquiry to venue management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-all group">
            <X className="w-5 h-5 text-gray-400 group-hover:text-gray-900" />
          </button>
        </div>

        {done ? (
          <div className="p-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100/50">
              <Sparkles className="w-10 h-10 text-green-500" />
            </div>
            <h4 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Request Shared!</h4>
            <p className="text-gray-500 font-medium max-w-[280px] mx-auto mb-8 text-[15px] leading-relaxed">
              We've sent your requirements. Our event specialist will reach out to you within 30 minutes.
            </p>
            <button onClick={onClose} className="bg-gray-900 hover:bg-black text-white px-12 py-3.5 rounded-xl font-bold text-sm tracking-widest transition-all shadow-xl shadow-gray-200">
              Done
            </button>
          </div>
        ) : (
          <form className="p-6 sm:p-8 space-y-6 sm:space-y-8" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Primary Configuration */}
            <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#FF9530]/20 transition-all shadow-sm">
              <Controller
                name="event_type"
                control={control}
                render={({ field }) => (
                  <PremiumSelect
                    {...field}
                    label="Event Type"
                    icon={<Sparkles className="w-5 h-5 text-[#FF9530]" />}
                    options={eventOptions}
                    placeholder="Occasion?"
                    className="bg-transparent"
                  />
                )}
              />
              {errors.event_type && <p className="text-[10px] text-red-500 font-bold mt-1 px-1 uppercase tracking-wider">{errors.event_type.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#FF9530]/20 transition-all shadow-sm">
                <Controller
                  name="date_range"
                  control={control}
                  render={({ field }) => (
                    <PremiumDatePicker
                      label="Event Date(s)"
                      selectsRange
                      startDate={field.value[0]}
                      endDate={field.value[1]}
                      onChange={(update: any) => field.onChange(update)}
                      className="bg-transparent"
                      monthsShown={1}
                    />
                  )}
                />
                {errors.date_range && <p className="text-[10px] text-red-500 font-bold mt-1 px-1 uppercase tracking-wider">{errors.date_range.message}</p>}
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 hover:border-[#FF9530]/20 transition-all shadow-sm">
                <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1">Number of Guests</p>
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-[#FF9530] mr-3 shrink-0" />
                  <input
                    type="number"
                    {...register('no_of_guests')}
                    placeholder="e.g. 250"
                    className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none placeholder:text-gray-300 placeholder:font-normal"
                  />
                </div>
                {errors.no_of_guests && <p className="text-[10px] text-red-500 font-bold mt-1 px-1 uppercase tracking-wider">{errors.no_of_guests.message}</p>}
              </div>
            </div>

            {/* Contact & Preferences Grid */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] flex-1 bg-gray-50" />
                <h5 className="text-[11px] sm:text-[13px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-gray-400 whitespace-nowrap">Guest Information</h5>
                <div className="h-[1px] flex-1 bg-gray-50" />
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 group focus-within:border-[#FF9530]/30 transition-all shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</p>
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-[#FF9530] mr-2.5" />
                    <input
                      type="text"
                      {...register('guest_name')}
                      placeholder="Ex: John Doe"
                      className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-300"
                    />
                  </div>
                  {errors.guest_name && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.guest_name.message}</p>}
                </div>

                {/* Email Address */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 group focus-within:border-[#FF9530]/30 transition-all shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</p>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-[#FF9530] mr-2.5" />
                    <input
                      type="email"
                      {...register('guest_email')}
                      placeholder="john@example.com"
                      className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-300"
                    />
                  </div>
                  {errors.guest_email && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.guest_email.message}</p>}
                </div>

                {/* Mobile No */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 group focus-within:border-[#FF9530]/30 transition-all shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Mobile No</p>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-[#FF9530] mr-2.5" />
                    <input
                      type="tel"
                      {...register('guest_mobile')}
                      placeholder="8888888888"
                      className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-300"
                    />
                  </div>
                  {errors.guest_mobile && <p className="text-[10px] text-red-500 font-bold mt-1 uppercase tracking-wider">{errors.guest_mobile.message}</p>}
                </div>

                {/* Meal Preference */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 group focus-within:border-[#FF9530]/30 transition-all shadow-sm">
                  <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 pl-1">Meal Preference</p>
                  <div className="flex items-center">
                    <Utensils className="w-5 h-5 text-[#FF9530] mr-3" />
                    <input
                      type="text"
                      {...register('meal_preference')}
                      placeholder="Veg / Non-Veg / Special Requirements"
                      className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none placeholder:font-normal placeholder:text-gray-300"
                    />
                  </div>
                </div>

                {/* Special Message - Full Width */}
                <div className="sm:col-span-2 bg-white rounded-xl border border-gray-100 p-4 group focus-within:border-[#FF9530]/30 transition-all shadow-sm">
                   <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-2 pl-1">Special Message</p>
                   <div className="flex items-start h-full">
                      <FileText className="w-5 h-5 text-[#FF9530] mr-3 mt-1 shrink-0" />
                      <textarea
                        {...register('message')}
                        rows={3}
                        placeholder="Any specific decor or timing needs..."
                        className="w-full bg-transparent p-0 text-[15px] font-bold text-gray-900 outline-none resize-none placeholder:font-normal placeholder:text-gray-300 min-h-[80px]"
                      />
                   </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-50 gap-6 sm:gap-0">
              <p className="text-[9px] text-gray-300 max-w-[200px] leading-relaxed font-bold uppercase tracking-wider text-center sm:text-left">
                Trusted by 500+ venues nationwide <br/>
                <span className="text-orange-400/50">Verified Spodia Enquiry</span>
              </p>
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <button type="button" onClick={onClose} className="hidden sm:block font-black text-xs text-gray-400 hover:text-gray-900 transition-all uppercase tracking-widest">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={mutation.isPending}
                  className={`flex-1 sm:flex-none sm:min-w-[180px] bg-[#FF9530] hover:bg-[#FF8000] text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 ${mutation.isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
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
      </div>
    </div>
  )
}
