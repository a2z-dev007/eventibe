'use client'

import { useEffect } from 'react'
import { useLenis } from 'lenis/react'

/** Locks page scroll (and Lenis) while a modal/drawer is open. */
export function useScrollLock(isOpen: boolean) {
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return

    const htmlEl = document.documentElement
    const body = document.body

    const prev = {
      bodyOverflow: body.style.overflow,
      bodyHeight: body.style.height,
      htmlOverflow: htmlEl.style.overflow,
      htmlHeight: htmlEl.style.height,
    }

    htmlEl.style.setProperty('overflow', 'hidden', 'important')
    htmlEl.style.setProperty('height', '100%', 'important')
    body.style.setProperty('overflow', 'hidden', 'important')
    body.style.setProperty('height', '100%', 'important')

    lenis?.stop()

    return () => {
      body.style.overflow = prev.bodyOverflow
      body.style.height = prev.bodyHeight
      htmlEl.style.overflow = prev.htmlOverflow
      htmlEl.style.height = prev.htmlHeight
      lenis?.start()
    }
  }, [isOpen, lenis])
}

/** Props for scrollable modal panels — keeps scroll inside the modal. */
export const modalScrollAreaProps = {
  'data-lenis-prevent': true,
  className: 'overscroll-contain',
  style: { overscrollBehavior: 'contain' as const },
}

/** Prevent wheel/touch scroll from reaching the page behind a modal overlay. */
export function preventModalBackdropScroll(e: React.WheelEvent | React.TouchEvent) {
  e.stopPropagation()
}
