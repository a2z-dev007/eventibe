'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Check, Utensils, X, ArrowRight, ChefHat, Heart, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from './SharedComponents'
import { motion, AnimatePresence } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'

interface Dish {
  id: string | number
  name: string
}

interface Package {
  id: string | number
  name: string
  type?: string
  suitable_for?: string
  description?: string
  file?: string | null
  venue_dish_details?: Dish[]
}

interface EventPackagesProps {
  packages: Package[]
  getImageUrl: (path: string | null | undefined) => string
  venueTitle: string
}

export function EventPackages({ packages, getImageUrl, venueTitle }: EventPackagesProps) {
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null)
  const [isSeeAllOpen, setIsSeeAllOpen] = useState(false)

  if (!packages || packages.length === 0) return null

  const hasMore = packages.length > 4

  useEffect(() => {
    if (selectedPkg || isSeeAllOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [selectedPkg, isSeeAllOpen])

  return (
    <section id="packages" className="scroll-mt-[100px] border-t border-gray-100">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <SectionHeading 
          title="Exclusive Event Packages" 
          subtitle={`Discover meticulously crafted experiences designed for every occasion at ${venueTitle}`}
        />
        
        <div className="flex items-center gap-4">
          {hasMore && (
            <button 
              onClick={() => setIsSeeAllOpen(true)}
              className="hidden md:flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-orange-50 text-gray-900 font-black text-[11px] uppercase tracking-widest rounded-2xl border border-gray-100 transition-all active:scale-95"
            >
              See All {packages.length} Packages
              <ArrowRight className="w-4 h-4 text-[#FF9530]" />
            </button>
          )}
          
          {/* Custom Navigation */}
          {packages.length > 3 && (
            <div className="hidden md:flex items-center gap-2">
              <button className="swiper-prev-packages w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF9530] hover:border-[#FF9530] hover:shadow-lg transition-all active:scale-90">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="swiper-next-packages w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-[#FF9530] hover:border-[#FF9530] hover:shadow-lg transition-all active:scale-90">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>

      {packages.length <= 3 ? (
        <div className={`grid grid-cols-1 sm:grid-cols-2 ${packages.length === 3 ? 'lg:grid-cols-3' : ''} gap-6`}>
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id}
              pkg={pkg} 
              getImageUrl={getImageUrl} 
              onClick={() => setSelectedPkg(pkg)} 
            />
          ))}
        </div>
      ) : (
        <div className="relative group/swiper">
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            grabCursor={true}
            spaceBetween={24}
            slidesPerView={1.2}
            freeMode={true}
            navigation={{
              prevEl: '.swiper-prev-packages',
              nextEl: '.swiper-next-packages',
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4 }
            }}
            className="packages-swiper !pb-12"
          >
            {packages.map((pkg) => (
              <SwiperSlide key={pkg.id} className="!h-auto">
                <PackageCard 
                  pkg={pkg} 
                  getImageUrl={getImageUrl} 
                  onClick={() => setSelectedPkg(pkg)} 
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {hasMore && (
        <div className="mt-4 md:hidden flex justify-center">
          <button 
            onClick={() => setIsSeeAllOpen(true)}
            className="flex items-center gap-2 px-8 py-4 bg-gray-50 text-gray-900 font-black text-[11px] uppercase tracking-widest rounded-2xl border border-gray-100"
          >
            See All Packages (+{packages.length - 4})
          </button>
        </div>
      )}

      {/* Full Screen Modal For Package Data */}
      <AnimatePresence>
        {selectedPkg && (
          <PackageDetailModal 
            pkg={selectedPkg} 
            onClose={() => setSelectedPkg(null)} 
            getImageUrl={getImageUrl} 
          />
        )}
      </AnimatePresence>

      {/* See All Modal */}
      <AnimatePresence>
        {isSeeAllOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overscroll-none"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-5xl max-h-[85vh] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 z-10">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">All Venue Packages</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Explore all {packages.length} options for your event</p>
                </div>
                <button 
                  onClick={() => setIsSeeAllOpen(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar bg-slate-50/50 flex-1 min-h-0 overscroll-contain">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <PackageCard 
                      key={pkg.id} 
                      pkg={pkg} 
                      getImageUrl={getImageUrl} 
                      onClick={() => {
                        setSelectedPkg(pkg);
                        setIsSeeAllOpen(false);
                      }} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .packages-swiper .swiper-slide {
          height: auto;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </section>
  )
}

function PackageCard({ pkg, getImageUrl, onClick }: { pkg: Package, getImageUrl: any, onClick: () => void }) {
  return (
    <div 
      className="group bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-44 overflow-hidden">
        <img 
          src={getImageUrl(pkg.file)} 
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/600x400/orange/white?text=Spodia+Package';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        <div className="absolute top-4 left-4">
          <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest rounded-lg border border-white/20">
            {pkg.type || 'Special'}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-base font-black text-gray-900 mb-2 leading-tight drop-shadow-sm group-hover:text-[#FF9530] transition-colors">
          {pkg.name}
        </h3>
        <p className="text-[11px] text-gray-500 font-bold leading-relaxed mb-4 line-clamp-2">
          {pkg.description?.replace(/<[^>]*>/g, '') || "Experience a celebration tailored to perfection."}
        </p>
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
            <Heart className="w-3 h-3 text-[#FF9530]" />
            <span className="truncate">{pkg.suitable_for || 'Multiple Occasions'}</span>
          </div>
          <button className="w-full py-3 rounded-xl bg-gray-50 group-hover:bg-[#FF9530] text-gray-900 group-hover:text-white font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm">
            Explore Details
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}


function PackageDetailModal({ pkg, onClose, getImageUrl }: { pkg: Package, onClose: () => void, getImageUrl: any }) {
  const [showMore, setShowMore] = React.useState(false)
  const description = pkg.description?.replace(/<[^>]*>/g, '') || 'A carefully curated package designed to make your event memorable.'
  const shouldTruncate = description.length > 150
  const displayText = showMore || !shouldTruncate ? description : description.slice(0, 150) + '...'

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header with Image */}
        <div className="relative h-48 shrink-0">
          <img 
            src={getImageUrl(pkg.file)} 
            alt={pkg.name}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2 py-1 bg-[#FF9530] rounded-md text-[10px] font-bold uppercase tracking-wide text-white">
              {pkg.type || 'Package'}
            </span>
            <h2 className="text-2xl font-black text-white mt-2">{pkg.name}</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quick Info */}
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <ChefHat className="w-4 h-4 text-[#FF9530]" />
              <span className="text-xs font-semibold text-gray-600">Customizable Menu</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-xs font-semibold text-gray-600">{pkg.suitable_for || 'All Events'}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">About this Package</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {displayText}
            </p>
            {shouldTruncate && (
              <button 
                onClick={() => setShowMore(!showMore)}
                className="text-[#FF9530] text-sm font-semibold mt-2 hover:underline"
              >
                {showMore ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>

          {/* Menu Items */}
          {pkg.venue_dish_details && pkg.venue_dish_details.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#FF9530]" />
                Menu Included ({pkg.venue_dish_details.length} items)
              </h4>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
                {pkg.venue_dish_details.map((dish) => (
                  <div key={dish.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                    <Check className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-xs font-medium text-gray-700">{dish.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button 
            onClick={() => {
              onClose();
              window.dispatchEvent(new CustomEvent('OPEN_QUOTE_MODAL'));
            }}
            className="w-full py-3 bg-[#FF9530] hover:bg-[#FF8000] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Get Quote for this Package
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
