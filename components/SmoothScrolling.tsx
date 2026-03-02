"use client";

import { ReactLenis } from 'lenis/react';
import React from 'react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        // Use native scroll instead of virtual (transform-based) scroll.
        // Virtual scroll applies transform on the root element which breaks
        // backdrop-filter (blur) on ALL descendants across the entire page.
        syncTouch: false,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      }}
    >
      {children}
    </ReactLenis>
  );
}
