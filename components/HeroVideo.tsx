'use client';

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  /** Playback speed multiplier. Default is 0.5 (half-speed). */
  playbackRate?: number;
}

export default function HeroVideo({ playbackRate = 0.5 }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      src="/assets/video/hero-video.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-0"
    />
  );
}
