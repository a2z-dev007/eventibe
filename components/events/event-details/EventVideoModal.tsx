'use client'

import React, { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { getNormalizedVideoUrl, isVideoFile } from '@/utils/videoUtils'

interface EventVideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string | null
}

const EventVideoModalComponent = ({ isOpen, onClose, videoUrl }: EventVideoModalProps) => {
  const normalizedSource = useMemo(() => {
    return getNormalizedVideoUrl(videoUrl, { autoplay: true })
  }, [videoUrl])

  const isDirectFile = isVideoFile(normalizedSource)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full h-full sm:h-auto sm:max-w-5xl flex flex-col"
          >
            {/* Header / Close button area */}
            <div className="flex items-center justify-between p-4 sm:p-0 sm:mb-6">
               <div className="hidden sm:block">
                  <h3 className="text-white font-black text-2xl tracking-tighter">Elite Venue Tour</h3>
               </div>
               <button 
                onClick={onClose} 
                className="ml-auto w-10 h-10 sm:w-12 sm:h-12 bg-white/10 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all group backdrop-blur-md"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Video Container */}
            <div className="flex-1 sm:flex-none aspect-video sm:rounded-3xl overflow-hidden bg-black shadow-2xl relative">
              {normalizedSource ? (
                isDirectFile ? (
                  <video 
                    src={normalizedSource} 
                    className="w-full h-full" 
                    controls 
                    autoPlay 
                    playsInline 
                  />
                ) : (
                  <iframe
                    src={normalizedSource}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-white">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                    <X className="w-8 h-8 text-gray-500" />
                  </div>
                  <p className="font-bold text-gray-400">Video source unavailable</p>
                </div>
              )}
            </div>
            
            <div className="p-8 sm:p-0 sm:mt-8 space-y-4">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <p className="text-[#FF9530] text-[10px] font-black uppercase tracking-[0.2em] mb-1">Cinematic Virtual Walkthrough</p>
                    <p className="text-white/60 text-xs sm:text-sm font-medium max-w-xl leading-relaxed italic">
                      Experience the luxury and scale of our premium banquet halls and outdoor venues in stunning detail.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest">4K Content</div>
                     <div className="px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/40 text-[9px] font-black uppercase tracking-widest">Protocol Verified</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export const EventVideoModal = React.memo(EventVideoModalComponent)
