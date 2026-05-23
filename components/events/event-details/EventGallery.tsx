'use client'

import React from 'react'

interface EventGalleryProps {
  venueImagesList: string[]
  openLightbox: (images: string[], index: number) => void
}

export function EventGallery({ venueImagesList, openLightbox }: EventGalleryProps) {
  return (
    <section id="gallery" className="scroll-mt-32 mb-8 md:mb-12 lg:mb-16">
      <div className="grid grid-cols-4 lg:grid-cols-4 grid-rows-2 md:grid-rows-[repeat(3,minmax(0,1fr))] gap-1 h-[250px] sm:h-[350px] md:h-[500px] lg:h-[700px]">
        {venueImagesList.slice(0, 9).map((img, idx) => {
          const isFirst = idx === 0;
          const isLastMobile = idx === 4;
          const isLastDesktop = idx === 8 || idx === venueImagesList.length - 1;
          
          const extraCountMobile = venueImagesList.length - 5;
          const extraCountDesktop = venueImagesList.length - 9;
          
          // Mobile displays 5 images, Desktop displays 9
          const bentoClass = isFirst ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
          const displayClass = idx > 4 ? "hidden md:block" : "block";

          const isOverlayCard = isLastDesktop;
          const extraCount = venueImagesList.length - 9;

          return (
            <div 
              key={idx}
              onClick={() => openLightbox(venueImagesList, idx)}
              className={`relative group cursor-pointer overflow-hidden rounded-lg md:rounded-2xl transition-all duration-500 w-full h-full ${bentoClass} ${displayClass}`}
            >
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

              <>
                {/* Mobile Overlay (shown only on the 5th image on small screens) */}
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] flex-col items-center justify-center transition-all hover:bg-black/80 ${isLastMobile && extraCountMobile > 0 ? 'flex md:hidden' : 'hidden'}`}>
                  <span className="text-white text-xl sm:text-2xl font-black drop-shadow-lg">+{extraCountMobile}</span>
                  <span className="text-white text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-80 text-center leading-tight">Photos</span>
                </div>

                {/* Desktop Overlay */}
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex-col items-center justify-center transition-all hover:bg-black/80 ${isOverlayCard && extraCount > 0 ? 'hidden md:flex' : 'hidden'}`}>
                  <span className="text-white text-3xl md:text-5xl font-black drop-shadow-lg">+{extraCount}</span>
                  <span className="text-white text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-2 opacity-80 text-center">Photos</span>
                </div>
              </>
            </div>
          );
        })}
      </div>
    </section>
  )
}
