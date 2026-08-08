'use client'

import { X, Star, Wifi, Coffee, Utensils, Phone, Car } from 'lucide-react'
import { IMAGE_BASE_URL } from '@/lib/api/apiClient'
import { useScrollLock, modalScrollAreaProps, preventModalBackdropScroll } from '@/hooks/useScrollLock'
import type { FacilityDetail } from './types'

interface VenueAmenitiesModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  items: FacilityDetail[]
}

function getAmenityIcon(facility: FacilityDetail) {
  if (facility.image) {
    return (
      <img
        src={`${IMAGE_BASE_URL}${facility.image.startsWith('/') ? '' : '/'}${facility.image}`}
        alt={facility.name}
        className="w-4 h-4 object-contain flex-shrink-0"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }

  const name = facility.name?.toLowerCase() || ''
  if (name.includes('wifi') || name.includes('internet')) return <Wifi className="w-4 h-4 text-gray-500 flex-shrink-0" />
  if (name.includes('coffee') || name.includes('tea')) return <Coffee className="w-4 h-4 text-gray-500 flex-shrink-0" />
  if (name.includes('restaurant') || name.includes('dining') || name.includes('cuisine'))
    return <Utensils className="w-4 h-4 text-gray-500 flex-shrink-0" />
  if (name.includes('phone') || name.includes('telephone')) return <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
  if (name.includes('parking') || name.includes('car')) return <Car className="w-4 h-4 text-gray-500 flex-shrink-0" />
  return <Star className="w-4 h-4 text-gray-500 flex-shrink-0" />
}

export function VenueAmenitiesModal({ isOpen, onClose, title, items }: VenueAmenitiesModalProps) {
  useScrollLock(isOpen)

  if (!isOpen || items.length === 0) return null

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
      onWheel={preventModalBackdropScroll}
      onTouchMove={preventModalBackdropScroll}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div
          {...modalScrollAreaProps}
          className={`p-5 overflow-y-auto max-h-[calc(80vh-60px)] ${modalScrollAreaProps.className}`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-lg">
                {getAmenityIcon(item)}
                <div className="min-w-0">
                  <span className="text-sm font-medium text-gray-900 block truncate">{item.name}</span>
                  {item.name_hindi && (
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{item.name_hindi}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
