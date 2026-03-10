'use client'

import React, { FC, Fragment, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Popover, Transition } from '@headlessui/react'
import DatePickerCustomHeaderTwoMonth from '../date-pickers/DatePickerCustomHeaderTwoMonth'
import DatePickerCustomDay from '../date-pickers/DatePickerCustomDay'

interface PremiumDatePickerProps {
  selected?: Date | null
  startDate?: Date | null
  endDate?: Date | null
  onChange: (date: any) => void
  selectsRange?: boolean
  placeholder?: string
  className?: string
  label?: string
  containerClassName?: string
  monthsShown?: number
  variant?: 'default' | 'glass'
  isOpen?: boolean
}

const PremiumDatePicker: FC<PremiumDatePickerProps> = ({
  selected,
  startDate,
  endDate,
  onChange,
  selectsRange = false,
  placeholder = 'Select Date',
  className = '',
  label = 'Date',
  containerClassName = '',
  monthsShown: customMonthsShown,
  variant = 'default',
  isOpen = false,
}) => {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Always show single month on all devices
  const effectiveMonthsShown = 1

  const displayValue = () => {
    if (selectsRange) {
      if (startDate && endDate) {
        return `${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
      } else if (startDate) {
        return `${startDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} - End`
      }
      return placeholder
    }
    return selected ? selected.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : placeholder
  }

  return (
    <div className={`premium-datepicker-wrapper flex w-full relative ${className} ${containerClassName}`}>
      <div className="relative flex w-full">
        {/* We no longer use Popover.Button because we want to control the state entirely from HeroSearch via 'isOpen' */}
        <div className="flex flex-1 items-center focus:outline-none group min-w-0 cursor-pointer">
          <Calendar className="w-5 h-5 text-[#FF9530] shrink-0 mr-2.5 transition-transform group-hover:scale-110" />
          <div className="flex-1 text-left">
            {label && <p className={`text-[12px] font-semibold capitalize mb-0.5 ${variant === 'glass' ? 'text-white/60' : 'text-gray-500'}`}>{label}</p>}
            <p className={`text-[15px] font-semibold p-0 cursor-pointer transition-colors whitespace-nowrap overflow-hidden text-ellipsis ${
                (selectsRange ? startDate : selected) 
                  ? (variant === 'glass' ? 'text-white' : 'text-gray-800')
                  : (variant === 'glass' ? 'text-white/60 font-medium' : 'text-gray-400 font-normal')
            }`}>
              {displayValue()}
            </p>
          </div>
          {(selected || startDate) && (
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                onChange(selectsRange ? [null, null] : null); 
              }}
              className="p-1.5 hover:bg-orange-50 rounded-full transition-all mr-2 group-hover:bg-orange-50/50"
            >
              <X className="w-4 h-4 text-[#FF9530]" />
            </button>
          )}
        </div>

        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 scale-95"
          enterTo="opacity-100 translate-y-0 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 scale-100"
          leaveTo="opacity-0 translate-y-4 scale-95"
        >
          <div
            className="absolute z-[9999] mt-2 top-full focus:outline-none"
            style={isMobile ? {
              position: 'fixed',
              top: 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100vw - 2rem)',
              maxWidth: '360px',
              marginTop: '0',
            } : {
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <div
              className={`overflow-hidden rounded-[1.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] transition-all duration-300 w-full ${
                variant === 'glass'
                  ? 'bg-white/82 backdrop-blur-2xl border border-white/40'
                  : 'bg-white border border-gray-100'
              }`}
            >
              {selectsRange ? (
                <DatePicker
                  startDate={startDate}
                  endDate={endDate}
                  onChange={onChange}
                  selectsRange={true}
                  monthsShown={effectiveMonthsShown}
                  showPopperArrow={false}
                  inline
                  minDate={today}
                  calendarClassName={`event-hero-datepicker ${effectiveMonthsShown === 1 ? "single-month" : "two-months"} ${variant === 'glass' ? "glass-datepicker" : ""}`}
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} monthsShown={effectiveMonthsShown} variant={variant} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              ) : (
                <DatePicker
                  selected={selected}
                  onChange={onChange}
                  monthsShown={effectiveMonthsShown}
                  showPopperArrow={false}
                  inline
                  minDate={today}
                  calendarClassName={`event-hero-datepicker ${effectiveMonthsShown === 1 ? "single-month" : "two-months"} ${variant === 'glass' ? "glass-datepicker" : ""}`}
                  renderCustomHeader={(p) => (
                    <DatePickerCustomHeaderTwoMonth {...p} monthsShown={effectiveMonthsShown} variant={variant} />
                  )}
                  renderDayContents={(day, date) => (
                    <DatePickerCustomDay dayOfMonth={day} date={date} />
                  )}
                />
              )}
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}

export default PremiumDatePicker
