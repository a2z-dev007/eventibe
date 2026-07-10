import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type PaginationVariant = 'default' | 'wedding' | 'corporate' | 'orange' | 'dark'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  variant?: PaginationVariant
  className?: string
  siblingCount?: number
}

const DOTS = "..."

const getPaginationRange = (currentPage: number, totalPages: number, siblingCount = 1) => {
  const totalPageNumbers = siblingCount * 2 + 5

  if (totalPageNumbers >= totalPages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

  const showLeftDots = leftSiblingIndex > 2
  const showRightDots = rightSiblingIndex < totalPages - 2

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
    return [...leftRange, DOTS, totalPages]
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + 1 + i
    )
    return [1, DOTS, ...rightRange]
  }

  if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    )
    return [1, DOTS, ...middleRange, DOTS, totalPages]
  }

  return []
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = 'default',
  className,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const paginationRange = getPaginationRange(currentPage, totalPages, siblingCount)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const variantStyles = {
    default: {
      container: "bg-[#F1F5F9]/80 dark:bg-slate-800/80 border border-slate-200/30 dark:border-slate-700/30",
      prevBtn: "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 border border-slate-200/50 dark:border-slate-600/50 shadow-sm disabled:bg-slate-50/50 dark:disabled:bg-slate-800 disabled:text-slate-300 dark:disabled:text-slate-650",
      nextBtn: "bg-[#0B1F3A] hover:bg-[#0B1F3A]/90 dark:bg-slate-900 dark:hover:bg-slate-900/90 text-white shadow-md shadow-slate-900/10 disabled:bg-slate-350 dark:disabled:bg-slate-800",
      activeNum: "bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm font-bold scale-105",
      inactiveNum: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-slate-700/40",
      dots: "text-slate-400 dark:text-slate-500",
      mobileDisplay: "bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-200/20 dark:border-slate-700/20"
    },
    wedding: {
      container: "bg-rose-50/90 dark:bg-rose-950/20 border border-rose-100/50 dark:border-rose-900/20",
      prevBtn: "bg-white dark:bg-rose-950/60 text-slate-700 dark:text-rose-200 hover:bg-rose-100/30 dark:hover:bg-rose-900/40 border border-rose-100 dark:border-rose-900/30 disabled:opacity-40",
      nextBtn: "bg-rose-500 hover:bg-rose-600 text-white shadow-md shadow-rose-500/10 disabled:opacity-40",
      activeNum: "bg-white dark:bg-rose-900 text-rose-600 dark:text-rose-400 shadow-sm font-bold scale-105 border border-rose-100/50 dark:border-rose-900/30",
      inactiveNum: "text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-350 hover:bg-white/40 dark:hover:bg-rose-950/40",
      dots: "text-rose-300 dark:text-rose-700/50",
      mobileDisplay: "bg-white/50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-450 border border-rose-100/20"
    },
    corporate: {
      container: "bg-blue-50/90 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/20",
      prevBtn: "bg-white dark:bg-blue-950/60 text-slate-700 dark:text-blue-200 hover:bg-blue-100/30 dark:hover:bg-blue-900/40 border border-blue-100 dark:border-blue-900/30 disabled:opacity-40",
      nextBtn: "bg-corporate-blue hover:bg-mid-blue text-white shadow-md shadow-blue-600/10 disabled:opacity-40",
      activeNum: "bg-white dark:bg-blue-900 text-corporate-blue dark:text-blue-400 shadow-sm font-bold scale-105 border border-blue-100/50 dark:border-blue-900/30",
      inactiveNum: "text-slate-600 dark:text-slate-400 hover:text-corporate-blue dark:hover:text-blue-350 hover:bg-white/40 dark:hover:bg-blue-950/40",
      dots: "text-blue-300 dark:text-blue-700/50",
      mobileDisplay: "bg-white/50 dark:bg-blue-950/40 text-corporate-blue dark:text-blue-450 border border-blue-100/20"
    },
    orange: {
      container: "bg-[#FF9530]/5 dark:bg-[#FF9530]/5 border border-[#FF9530]/20 dark:border-[#FF9530]/15",
      prevBtn: "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 border border-[#FF9530]/30 disabled:opacity-40",
      nextBtn: "bg-[#FF9530] hover:bg-[#FF9530]/90 text-white shadow-md shadow-[#FF9530]/10 disabled:opacity-40",
      activeNum: "bg-white dark:bg-slate-800 text-[#FF9530] shadow-sm font-bold scale-105 border border-[#FF9530]/30",
      inactiveNum: "text-slate-600 dark:text-slate-400 hover:text-[#FF9530] dark:hover:text-[#FF9530] hover:bg-white/40 dark:hover:bg-slate-800/40",
      dots: "text-[#FF9530]/40",
      mobileDisplay: "bg-white/50 dark:bg-slate-800/40 text-[#FF9530] border border-[#FF9530]/20"
    },
    dark: {
      container: "bg-white/5 border border-white/10 backdrop-blur-md",
      prevBtn: "bg-white/10 hover:bg-white/20 text-white border border-white/10 disabled:opacity-30",
      nextBtn: "bg-accent-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 disabled:opacity-30",
      activeNum: "bg-white text-[#0B1F3A] font-bold shadow-md",
      inactiveNum: "text-white/40 hover:text-white hover:bg-white/10",
      dots: "text-white/20",
      mobileDisplay: "bg-white/10 text-white/80 border border-white/5"
    }
  }

  const s = variantStyles[variant]

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 sm:gap-4 p-1.5 rounded-full w-full sm:w-auto min-w-fit max-w-lg mx-auto shadow-md transition-all duration-300",
        s.container,
        className
      )}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase sm:capitalize tracking-wider sm:tracking-normal transition-all duration-300 disabled:cursor-not-allowed active:scale-95",
          s.prevBtn
        )}
      >
        <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Pages Container */}
      <div className="flex items-center gap-1">
        {/* Mobile Page Display */}
        <span className={cn("sm:hidden text-xs font-bold px-3 py-1 rounded-full select-none shadow-sm", s.mobileDisplay)}>
          Page {currentPage} of {totalPages}
        </span>

        {/* Desktop Page Numbers */}
        <div className="hidden sm:flex items-center gap-1.5">
          {paginationRange.map((page, idx) => {
            if (page === DOTS) {
              return (
                <span
                  key={`dots-${idx}`}
                  className={cn(
                    "w-9 h-9 flex items-center justify-center text-sm font-medium",
                    s.dots
                  )}
                >
                  &hellip;
                </span>
              )
            }

            const pageNum = Number(page)
            const isActive = pageNum === currentPage

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 active:scale-90",
                  isActive ? s.activeNum : s.inactiveNum
                )}
              >
                {pageNum}
              </button>
            )
          })}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center gap-1.5 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase sm:capitalize tracking-wider sm:tracking-normal transition-all duration-300 disabled:cursor-not-allowed active:scale-95",
          s.nextBtn
        )}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  )
}
