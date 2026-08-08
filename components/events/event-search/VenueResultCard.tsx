'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Star, Utensils, ArrowRight, Plus } from 'lucide-react'
import type { Venue, FacilityDetail, HighlightDetail } from './types'
import { toSlug } from '@/components/events/event-details/toSlug'
import { IMAGES } from '@/assets/images'
import { Lightbox, useLightbox } from '@/components/ui/Lightbox'
import { VenueAmenitiesModal } from './VenueAmenitiesModal'

type ModalState = { isOpen: boolean; title: string; items: FacilityDetail[] }

const emptyModal: ModalState = { isOpen: false, title: '', items: [] }

function highlightsToFacilityItems(highlights: HighlightDetail[]): FacilityDetail[] {
  return highlights.map((h) => ({
    id: h.id,
    name: h.name,
    name_hindi: '',
    parent: null,
    amenities_tags: [],
    image: '',
    created: h.created,
  }))
}

export function VenueResultCard({ venue, viewType = 'list' }: { venue: Venue; viewType?: 'grid' | 'list' }) {
  const [imgIdx, setImgIdx] = useState(0)
  const [modal, setModal] = useState<ModalState>(emptyModal)
  const { isOpen, images, currentIndex, openLightbox, closeLightbox, setIndex } = useLightbox()

  const allImages = venue.images?.map((img) => img.file) || []
  const mainImage =
    venue.images?.length > 0 ? venue.images[imgIdx % venue.images.length].file : IMAGES.placeholder.src

  const thumbnails = venue.images?.slice(0, 3) || []
  const hasMore = (venue.images?.length || 0) > 3

  const venueTitle = venue.name || 'Premium Venue'
  const venueLocation =
    [(venue as { area?: string }).area, venue.city_name, venue.state_name, venue.country_name]
      .filter((val) => val && val !== 'null')
      .join(', ') || 'No address found'
  const detailsHref = `/events/details/${venue.slug || toSlug(venueTitle)}`

  const rating = venue.rating || 0
  const reviews = venue.reviews || 0
  const packagePrice = venue.package_details?.[0]?.price ? Number(venue.package_details[0].price) : 0

  const highlights = venue.highlights_details?.slice(0, 2) || []
  const facilities = venue.facilities_details?.slice(0, 2) || []
  const cuisines = venue.cuisine_details?.slice(0, 2).map((c) => c.name).join(', ') || 'Global Cuisines'

  const openHighlightsModal = () => {
    setModal({
      isOpen: true,
      title: 'Venue Highlights & Services',
      items: highlightsToFacilityItems(venue.highlights_details || []),
    })
  }

  const openFacilitiesModal = () => {
    setModal({
      isOpen: true,
      title: 'All Amenities & Facilities',
      items: venue.facilities_details || [],
    })
  }

  const closeModal = () => setModal(emptyModal)

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (
      target.closest('button') ||
      target.closest('a') ||
      target.closest('.mini-thumb') ||
      target.closest('.image-container') ||
      target.closest('[data-modal]')
    ) {
      return
    }
    window.open(detailsHref, '_blank')
  }

  const isGrid = viewType === 'grid'

  return (
    <article
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FF9530]/30 transition-all duration-300 overflow-hidden h-full flex flex-col cursor-pointer"
    >
      <div className={`flex flex-col ${isGrid ? 'h-full' : 'md:flex-row md:min-h-[220px]'}`}>
        {/* Image */}
        <div
          className={`image-container relative shrink-0 ${
            isGrid ? 'aspect-[16/9]' : 'md:w-64 lg:w-72 aspect-[16/9] md:aspect-auto md:h-auto'
          }`}
        >
          <div
            className="relative w-full h-full min-h-[140px] md:min-h-[180px] overflow-hidden"
            onClick={() => openLightbox(allImages, imgIdx)}
          >
            <img
              src={mainImage}
              alt={venueTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50" />

            {venue.images?.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold rounded-full px-2 py-0.5">
                {imgIdx + 1} / {venue.images.length}
              </div>
            )}
          </div>

          <div className="absolute bottom-2 left-2 flex gap-1 z-10">
            {thumbnails.map((img, i) => (
              <button
                key={img.id}
                type="button"
                className={`mini-thumb w-8 h-8 rounded-md overflow-hidden border-2 transition-all ${
                  imgIdx === i ? 'border-[#FF9530] scale-105' : 'border-white/60 hover:border-white'
                }`}
                onMouseEnter={() => setImgIdx(i)}
                onClick={(e) => {
                  e.stopPropagation()
                  openLightbox(allImages, i)
                }}
              >
                <img src={img.file} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
            {hasMore && (
              <button
                type="button"
                className="w-8 h-8 rounded-md border-2 border-white/60 bg-black/40 backdrop-blur-md flex flex-col items-center justify-center hover:border-white transition-all"
                onClick={(e) => {
                  e.stopPropagation()
                  openLightbox(allImages, 3)
                }}
              >
                <Plus className="w-2.5 h-2.5 text-white" />
                <span className="text-[7px] text-white font-black leading-none">ALL</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 lg:p-4 justify-between min-w-0">
          <div className="space-y-2">
            <div className={`flex items-start justify-between gap-2 ${isGrid ? 'flex-col' : ''}`}>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center gap-1.5 text-gray-500 mb-0.5">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="text-[11px] font-medium line-clamp-1" title={venueLocation}>
                    {venueLocation}
                  </span>
                </div>
                <Link href={detailsHref} target="_blank" rel="noopener noreferrer" className="block group/title">
                  <h3
                    className={`font-bold text-gray-900 leading-snug group-hover/title:text-[#FF9530] transition-colors ${
                      isGrid ? 'text-sm line-clamp-1' : 'text-base sm:text-lg line-clamp-2'
                    }`}
                  >
                    {venueTitle}
                  </h3>
                </Link>
              </div>
              {reviews > 0 && (
                <div className="flex items-center gap-1 shrink-0">
                  <div className="flex items-center gap-1 bg-[#039c4d] text-white rounded-md px-2 py-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">{rating}</span>
                  </div>
                  {!isGrid && (
                    <span className="text-[9px] font-semibold text-gray-400 hidden sm:inline">
                      ({reviews})
                    </span>
                  )}
                </div>
              )}
            </div>

            {(highlights.length > 0 || (venue.highlights_details?.length || 0) > 2) && (
              <div className="flex flex-wrap items-center gap-1.5">
                {highlights.map((h) => (
                  <span
                    key={h.id}
                    className="bg-orange-50 text-[#FF9530] text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border border-orange-100"
                  >
                    {h.name}
                  </span>
                ))}
                {(venue.highlights_details?.length || 0) > 2 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openHighlightsModal()
                    }}
                    className="text-[#FF9530] text-[9px] font-bold uppercase hover:underline"
                  >
                    +{(venue.highlights_details?.length || 0) - 2} more
                  </button>
                )}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-gray-600">
              <Utensils className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[11px] font-medium truncate">{cuisines}</span>
            </div>

            {facilities.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                {facilities.map((f) => (
                  <span
                    key={f.id}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded-full truncate max-w-[120px]"
                  >
                    {f.name}
                  </span>
                ))}
                {(venue.facilities_details?.length || 0) > 2 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      openFacilitiesModal()
                    }}
                    className="text-[10px] text-[#FF9530] font-semibold hover:underline"
                  >
                    +{(venue.facilities_details?.length || 0) - 2} more
                  </button>
                )}
              </div>
            )}

            <div
              className="text-[11px] text-gray-500 leading-snug line-clamp-1 italic"
              dangerouslySetInnerHTML={{
                __html: venue.description || 'Indulge in a world-class event experience with our bespoke services.',
              }}
            />
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 mt-2 border-t border-gray-50">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider leading-none mb-0.5">
                Package Starts
              </p>
              <span className="text-base sm:text-lg font-black text-gray-900 leading-none">
                ₹{packagePrice.toLocaleString() || '0'}
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Link
                href={detailsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center whitespace-nowrap bg-white border border-[#FF9530] text-[#FF9530] font-bold py-2 px-3 rounded-lg hover:bg-orange-50 active:scale-95 transition-all text-[10px] uppercase tracking-wide"
              >
                Inquiry
              </Link>
              <Link
                href={detailsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1 whitespace-nowrap bg-gradient-to-r from-[#FF9530] to-[#FF8000] text-white font-bold py-2 px-3 rounded-lg shadow-sm hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-wide group/btn"
              >
                Details
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        images={images}
        isOpen={isOpen}
        currentIndex={currentIndex}
        onClose={closeLightbox}
        onIndexChange={setIndex}
        altText={venueTitle}
      />

      <div data-modal>
        <VenueAmenitiesModal
          isOpen={modal.isOpen}
          onClose={closeModal}
          title={modal.title}
          items={modal.items}
        />
      </div>
    </article>
  )
}
