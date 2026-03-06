'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ASSETS = [
  { 
    id: 'video-main', 
    type: 'video', 
    src: '/assets/video/hero-video.mp4',
    title: { main: "Extraordinary Spaces for", highlight: "Corporate Excellence." },
    desc: "The trusted marketplace to discover and book premium venues, offsites, and expert vendors for your next high-impact corporate event."
  },
  { 
    id: 'img-corporate', 
    type: 'image', 
    src: '/assets/hero/corporate.jpg',
    title: { main: "Premium Venues for", highlight: "Business Meetings." },
    desc: "Find the perfect professional setting for your next conference, seminar, or board meeting with state-of-the-art facilities."
  },
  { 
    id: 'img-social', 
    type: 'image', 
    src: '/assets/hero/hero-social.jpg',
    title: { main: "Vibrant Spaces for", highlight: "Social Celebrations." },
    desc: "From birthdays to anniversaries, discover unique venues that set the perfect mood for your special moments with loved ones."
  },
  { 
    id: 'img-wedding', 
    type: 'image', 
    src: '/assets/hero/hero-wedding.jpg',
    title: { main: "Dreamy Destinations for", highlight: "Grand Weddings." },
    desc: "Make your big day truly magical with our curated selection of luxury banquet halls, scenic lawns, and palace retreats."
  },
];

interface DynamicHeroBackgroundProps {
  currentIndex?: number;
  onVideoEnd?: () => void;
}

export default function DynamicHeroBackground({ currentIndex: externalIndex, onVideoEnd }: DynamicHeroBackgroundProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use external index if provided, otherwise use internal state
  const currentIndex = externalIndex !== undefined ? externalIndex : internalIndex;
  const currentAsset = ASSETS[currentIndex];

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
    if (onVideoEnd) {
      onVideoEnd();
    } else {
      setInternalIndex(1);
    }
  };

  useEffect(() => {
    // Only start the image slideshow if the video has finished once AND no external index is provided
    if (externalIndex === undefined && (isVideoFinished || currentAsset.type === 'image')) {
      const timer = setInterval(() => {
        setInternalIndex((prev) => (prev + 1 >= ASSETS.length ? 1 : prev + 1));
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isVideoFinished, currentAsset.type, externalIndex]);

  // Preload next image logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nextIndex = currentIndex + 1 >= ASSETS.length ? 1 : currentIndex + 1;
      const nextAsset = ASSETS[nextIndex];
      if (nextAsset.type === 'image') {
        const img = new Image();
        img.src = nextAsset.src;
      }
    }
  }, [currentIndex]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence>
        {currentAsset.type === 'video' ? (
          <motion.div
            key={currentAsset.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              ref={videoRef}
              src={currentAsset.src}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            key={currentAsset.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1.15 }}
            transition={{ 
              opacity: { duration: 2, ease: "easeInOut" },
              scale: { duration: 7, ease: "linear" } 
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentAsset.src}
              alt="Hero Backdrop"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle overlay to ensure text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-[5] pointer-events-none" />
      <div className="absolute inset-0 bg-black/20 z-[5] pointer-events-none" />
    </div>
  );
}
