'use client'

import { getNormalizedVideoUrl, isVideoFile } from '@/utils/videoUtils'
import React, { useMemo } from 'react'
// import { getNormalizedVideoUrl, isVideoFile } from ''

interface EventVideoTourProps {
  videoUrl: string | null
}

const EventVideoTourComponent = ({ videoUrl }: EventVideoTourProps) => {
  // Compute a stable, normalized video source using our utility
  const normalizedSource = useMemo(() => {
    return getNormalizedVideoUrl(videoUrl)
  }, [videoUrl])

  // If we couldn't resolve a valid video source, dont render the section at all
  if (!normalizedSource) return null

  const isDirectFile = isVideoFile(normalizedSource)

  return (
    <section key="stabilized-video-tour" className="mb-12 md:mb-16 lg:mb-24 px-4 sm:px-0 relative z-[20]">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-6 bg-[#FF9530] rounded-full" />
        <h4 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Virtual Venue Experience</h4>
      </div>
      
      <div className="w-full h-[250px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-black rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-4xl border-4 border-[#FF9530]/10 relative group flex items-center justify-center">
        {isDirectFile ? (
          <video 
            src={normalizedSource} 
            controls 
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe 
            src={normalizedSource}
            title="Venue Tour"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
    </section>
  )
}

// Wrap in React.memo to prevent re-renders unless the videoUrl truly changes
export const EventVideoTour = React.memo(EventVideoTourComponent)
