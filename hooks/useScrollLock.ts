import { useEffect } from 'react'

export function useScrollLock(isOpen: boolean) {
  useEffect(() => {
    if (!isOpen) return

    // Store original body and html styles
    const originalOverflow = document.body.style.overflow
    const originalHeight = document.body.style.height
    
    const htmlEl = document.documentElement
    const originalHtmlOverflow = htmlEl.style.overflow
    const originalHtmlHeight = htmlEl.style.height

    // Prevent default browser scrolling on page container
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100%'
    htmlEl.style.overflow = 'hidden'
    htmlEl.style.height = '100%'

    return () => {
      // Restore original styles on unmount/close
      document.body.style.overflow = originalOverflow
      document.body.style.height = originalHeight
      htmlEl.style.overflow = originalHtmlOverflow
      htmlEl.style.height = originalHtmlHeight
    }
  }, [isOpen])
}
