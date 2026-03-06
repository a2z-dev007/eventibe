'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Star } from 'lucide-react';

interface ReelTestimonial {
  id: number;
  videoUrl: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const TESTIMONIALS: ReelTestimonial[] = [
  {
    id: 1,
    videoUrl: 'https://www.youtube.com/shorts/o-yAByEf5m8',
    name: 'Sarah Jenkins',
    role: 'Event Director',
    company: 'TechGlobal',
    rating: 5
  },
  {
    id: 2,
    videoUrl: '/assets/video/testimonials/testimonial-1.mp4',
    name: 'Michael Chen',
    role: 'CEO',
    company: 'VibeEvents',
    rating: 5
  },
  {
    id: 3,
    videoUrl: 'https://www.youtube.com/shorts/o-yAByEf5m8',
    name: 'Elena Rodriguez',
    role: 'Operations Head',
    company: 'Lumina Group',
    rating: 5
  },
  {
    id: 4,
    videoUrl: '/assets/video/testimonials/testimonial-1.mp4',
    name: 'David Wilson',
    role: 'Marketing Manager',
    company: 'Nexus Corp',
    rating: 5
  },
  {
    id: 5,
    videoUrl: 'https://www.youtube.com/shorts/o-yAByEf5m8',
    name: 'Aisha Kahn',
    role: 'HR Lead',
    company: 'FutureSystems',
    rating: 5
  },
  {
    id: 6,
    videoUrl: '/assets/video/testimonials/testimonial-1.mp4',
    name: 'Marcus Thorne',
    role: 'Strategic Planner',
    company: 'Titan Logistics',
    rating: 5
  }
];

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const ReelCard = ({ testimonial }: { testimonial: ReelTestimonial }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const youtubeId = getYoutubeId(testimonial.videoUrl);
  const isYoutube = !!youtubeId;

  const postCommand = (func: string, args: any = "") => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func,
        args
      }), '*');
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isYoutube) {
      if (isPlaying) postCommand('pauseVideo');
      else postCommand('playVideo');
      setIsPlaying(!isPlaying);
    } else if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isYoutube) {
      if (isMuted) postCommand('unMute');
      else postCommand('mute');
      setIsMuted(!isMuted);
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (isYoutube) {
      postCommand('playVideo');
      postCommand('unMute');
      setIsMuted(false);
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (isYoutube) {
      postCommand('pauseVideo');
      postCommand('mute');
      setIsMuted(true);
      setIsPlaying(false);
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.muted = true;
      setIsMuted(true);
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      className="relative aspect-[9/16] rounded-[2rem] border border-white/10 bg-black shadow-2xl shrink-0 w-[280px] sm:w-[320px] overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Video Content */}
      <div className="absolute inset-0 pointer-events-none">
        {isYoutube ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1&autoplay=0&mute=1&controls=0&loop=1&playlist=${youtubeId}&modestbranding=1&rel=0&iv_load_policy=3&showinfo=0`}
            className="w-full h-[120%] -top-[10%] relative object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-125 md:scale-150"
            allow="autoplay; encrypted-media"
          />
        ) : (
          <video
            ref={videoRef}
            src={testimonial.videoUrl}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            loop
            muted
            playsInline
          />
        )}
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
      
      {/* Top Badge */}
      <div className="absolute top-6 left-6 z-20">
        <div className="flex gap-0.5 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={12} className="fill-[#FF9530] text-[#FF9530]" />
          ))}
        </div>
      </div>

      {/* Controls Overlay */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center gap-4"
          >
            <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110">
              {isPlaying ? <Pause size={28} /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-all">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Info */}
      <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl">
          <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <span className="h-0.5 w-6 bg-[#FF9530]" />
            <span className="text-[#FF9530] text-[10px] font-black uppercase tracking-[0.2em]">Verified Partner</span>
          </div>
          <h4 className="text-white text-xl font-bold mb-1 leading-tight">{testimonial.name}</h4>
          <p className="text-white/80 text-sm font-medium">
            {testimonial.role} <span className="text-white/30 mx-1">|</span> <span className="text-[#FF9530]">{testimonial.company}</span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 pointer-events-none">
        <motion.div 
          className="h-full bg-[#FF9530]" 
          initial={{ width: '0%' }}
          animate={isPlaying ? { width: '100%' } : { width: '0%' }}
          transition={isPlaying ? { duration: 15, ease: 'linear', repeat: Infinity } : { duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default function VideoReelTestimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const controls = useAnimation();

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % TESTIMONIALS.length;
        
        controls.start({
          x: -(nextIndex * 350), 
          transition: { 
            duration: nextIndex === 0 ? 0.8 : 1.2, 
            ease: nextIndex === 0 ? "easeInOut" : [0.32, 0.72, 0, 1] 
          }
        });
        
        return nextIndex;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, controls]);

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 backdrop-blur-md mb-6"
          >
           <span className="text-[#FF9530] text-xs font-black uppercase tracking-[0.3em]">Client Stories</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-primary-navy mb-6 uppercase tracking-tight">
            Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9530] to-[#FF6B00]">Real People</span>
          </h2>
          <p className="text-soft-slate text-lg max-w-2xl mx-auto font-medium">
            Hear directly from the high-performance teams who trust Eventibe.
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative group/carousel overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div 
            animate={controls}
            drag="x"
            dragConstraints={{ right: 0, left: -((TESTIMONIALS.length * 350) - 1200) }}
            className="flex gap-6 lg:gap-8 pb-8 px-4 lg:px-0 cursor-grab active:cursor-grabbing"
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => setIsPaused(false)}
          >
            {TESTIMONIALS.map((t) => (
              <ReelCard key={t.id} testimonial={t} />
            ))}
          </motion.div>
        </div>

        <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="text-primary-navy font-black text-2xl tracking-tighter">TECHCORP</div>
           <div className="text-primary-navy font-black text-2xl tracking-tighter">GLOBALVIBE</div>
           <div className="text-primary-navy font-black text-2xl tracking-tighter">NEXUS.CO</div>
           <div className="text-primary-navy font-black text-2xl tracking-tighter">LUMINA</div>
        </div>
      </div>
    </section>
  );
}
