'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════════════════════
   Shared Micro-Interaction Components
   Reusable across any page (Home, Brand Story, etc.)
   ═══════════════════════════════════════════════════════════════════ */

/** 3D tilt card with cursor-following glow */
export function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -6;
    const rotateY = (x - centerX) / centerX * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(249,115,22,0.12) 0%, transparent 60%)`;
      glowEl.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    const glowEl = card.querySelector('.tilt-glow') as HTMLElement;
    if (glowEl) glowEl.style.opacity = '0';
  };

  return (
    <div
      ref={cardRef}
      className={`micro-tilt-card relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-glow absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 z-10" style={{ transition: 'opacity 0.3s' }} />
      {children}
    </div>
  );
}

/** Magnetic button that subtly follows cursor */
export function MagneticButton({ children, className = '', href }: { children: React.ReactNode; className?: string; href?: string }) {
  const btnRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0, 0)';
  };

  const wrapper = (
    <div
      ref={btnRef}
      className={`magnetic-btn inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)' }}
    >
      {children}
    </div>
  );

  return href ? <Link href={href}>{wrapper}</Link> : wrapper;
}
