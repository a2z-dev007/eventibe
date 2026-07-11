"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LucideIcon,
  Building2,
  Briefcase,
  Heart,
  Users,
  MapPin,
  Sparkles,
  BookOpen,
  Zap,
  PlusCircle,
  ShieldCheck,
  Search,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  building2: Building2,
  briefcase: Briefcase,
  heart: Heart,
  users: Users,
  mappin: MapPin,
  sparkles: Sparkles,
  bookopen: BookOpen,
  zap: Zap,
  pluscircle: PlusCircle,
  shieldcheck: ShieldCheck,
  search: Search,
};

interface CommonHeroProps {
  titleMain: string | React.ReactNode;
  titleHighlight?: string;
  titleSuffix?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  badgeText?: string;
  badgeIcon?: LucideIcon | string;
  bgSrc: string;
  bgType?: "image" | "video";
  children?: React.ReactNode;
  alignment?: "center" | "left";
}

export default function CommonHero({
  titleMain,
  titleHighlight,
  titleSuffix,
  subtitle,
  badgeText,
  badgeIcon,
  bgSrc,
  bgType = "image",
  children,
  alignment = "center",
}: CommonHeroProps) {
  const isLeft = alignment === "left";

  const BadgeIcon =
    typeof badgeIcon === "string"
      ? iconMap[badgeIcon.toLowerCase()]
      : badgeIcon;

  return (
    <section className="relative z-20 w-full h-[100dvh] min-h-[550px] flex items-center justify-center text-white overflow-hidden">
      {/* Background Media Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
        <AnimatePresence mode="wait">
          {bgType === "video" ? (
            <motion.div
              key={bgSrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <video
                src={bgSrc}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-full object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              key={bgSrc}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{
                opacity: { duration: 1.5, ease: "easeInOut" },
                scale: { duration: 10, ease: "linear" },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={bgSrc}
                alt="Hero Background"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Layered Overlays for Contrast and Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/45 to-black/85 pointer-events-none" />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Subtle grid pattern for added tech/modern depth */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content Container */}
      <div
        className={`container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:mt-0 ${
          isLeft ? "items-start text-left" : "items-center text-center"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`flex flex-col ${isLeft ? "items-start" : "items-center"} w-full`}
        >
          {/* {badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/15 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-bold mb-6 backdrop-blur-sm shadow-xl animate-fade-in">
              {BadgeIcon && (
                <BadgeIcon size={14} className="text-accent-orange" />
              )}
              <span className="uppercase tracking-widest">{badgeText}</span>
            </div>
          )} */}

          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 md:mb-6 max-w-5xl leading-tight drop-shadow-xl">
            {titleMain}
            {titleHighlight && (
              <>
                {" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">
                  {titleHighlight}
                </span>
              </>
            )}
            {titleSuffix && <> {titleSuffix}</>}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-white/95 mb-4 sm:mb-6 md:mb-10 max-w-3xl font-medium drop-shadow-md leading-relaxed text-left sm:text-center">
              {subtitle}
            </p>
          )}

          {children && <div className="w-full">{children}</div>}
        </motion.div>
      </div>

      {/* Bounce scroll indicator - Hidden on mobile/tablet to save screen estate */}
      <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
