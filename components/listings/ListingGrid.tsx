import type { ReactNode } from 'react';

interface ListingGridProps {
  children: ReactNode;
  className?: string;
  /** Max columns on large screens — default 3 */
  columns?: 3 | 4;
}

/** Responsive listing grid: 1 → 2 → 3 (or 4) columns */
export default function ListingGrid({ children, className = '', columns = 3 }: ListingGridProps) {
  const colClass =
    columns === 4
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${colClass} gap-4 md:gap-5 ${className}`}>
      {children}
    </div>
  );
}

/** Mobile horizontal snap carousel for listing sections */
export function ListingCarousel({ children, className = '' }: ListingGridProps) {
  return (
    <div
      className={`flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 md:hidden ${className}`}
      style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function ListingCarouselItem({ children }: { children: ReactNode }) {
  return (
    <div className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-auto sm:max-w-none sm:shrink">
      {children}
    </div>
  );
}
