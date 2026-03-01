'use client'

// ─── Gallery Hero: media grid + inline lightbox ───────────────────────────────

import { IMAGES } from '@/assets/images'

function MediaTag({ label }: { label: string }) {
  return (
    <span className="absolute top-2.5 left-2.5 z-10 bg-black/65 text-white text-[10px] font-black tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
      {label}
    </span>
  )
}

interface Props {
  venueImages: any[]
  venueName: string
  onOpen: (src: string) => void
}

export function EventGallery({ venueImages, venueName, onOpen }: Props) {
  // Use first 5 images for the grid, or use placeholders if less than 5
  const displayImages = Array.from({ length: 5 }).map((_, i) => ({
    url: venueImages[i]?.file || IMAGES.placeholder.src,
    label: i === 0 ? 'Cover' : i === 1 ? 'Setup' : i === 2 ? 'Decor' : i === 3 ? 'Dining' : 'Stage'
  }))

  const areas = ['main', 'sub1', 'sub2', 'sub3', 'sub4'] as const

  return (
    <section className="mt-4 bg-white border border-gray-200 rounded-2xl p-3 sm:p-4 shadow-xl">
      {/* Desktop grid */}
      <div
        className="hidden md:grid gap-3 rounded-xl overflow-hidden"
        style={{
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gridTemplateAreas: '"main sub1 sub2 video" "main sub3 sub4 video"',
          minHeight: 380,
        }}
      >
        {/* Main + 4 sub images */}
        {displayImages.map((img, i) => (
          <button
            key={i}
            style={{ gridArea: areas[i] }}
            onClick={() => onOpen(img.url)}
            className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all w-full group"
          >
            <MediaTag label={img.label} />
            <img src={img.url} alt={`${venueName} - ${img.label}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
          </button>
        ))}

        {/* Video */}
        <div
          style={{ gridArea: 'video' }}
          className="relative rounded-xl overflow-hidden bg-[#0b1324] border border-gray-100 shadow-sm"
        >
          <MediaTag label="Virtual Tour" />
          <div className="w-full h-full flex items-center justify-center">
             <img src={displayImages[0].url} className="w-full h-full object-cover opacity-40 blur-[2px]" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                   <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Mobile: carousel-like feel */}
      <div className="md:hidden relative rounded-2xl overflow-hidden shadow-lg h-[280px]">
        <img src={displayImages[0].url} alt={venueName} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
           <div className="text-white">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Venue Gallery</p>
              <h3 className="text-lg font-bold">{venueName}</h3>
           </div>
           <button
            onClick={() => onOpen(displayImages[0].url)}
            className="bg-white/95 text-gray-900 font-bold text-xs px-4 py-2 rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  )
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
export function EventLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[125] bg-black/92 flex items-center justify-center p-4" onClick={onClose}>
      <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 w-10 h-10 rounded-full bg-black/70 border border-gray-600 text-white text-xl leading-none hover:bg-black/90 transition-colors flex items-center justify-center"
        >
          &times;
        </button>
        <img src={src} alt="Gallery preview" className="w-full max-h-[88vh] object-contain rounded-xl border border-gray-700" />
      </div>
    </div>
  )
}
