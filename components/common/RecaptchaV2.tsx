"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"

interface UseRecaptchaOptions {
  containerId: string
}

export function useRecaptcha({ containerId }: UseRecaptchaOptions) {
  const [recaptchaVerified, setRecaptchaVerified] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState("")
  const [recaptchaLoading, setRecaptchaLoading] = useState(false)
  const [containerReady, setContainerReady] = useState(false)

  // Wait for container to be available in DOM
  useEffect(() => {
    const checkContainer = () => {
      const container = document.getElementById(containerId)
      if (container) {
        setContainerReady(true)
      } else {
        setTimeout(checkContainer, 100)
      }
    }
    checkContainer()
  }, [containerId])

  useEffect(() => {
    if (!containerReady) return

    const initRecaptcha = () => {
      if (typeof window === "undefined" || !(window as any).grecaptcha || !(window as any).grecaptcha.render) {
        setTimeout(initRecaptcha, 100)
        return
      }

      // Check if container exists and is empty
      const container = document.getElementById(containerId)
      if (!container || container.children.length > 0) {
        // Container might not be ready yet, retry
        setTimeout(initRecaptcha, 100)
        return
      }

      ;(window as any).grecaptcha.ready(() => {
        try {
          ;(window as any).grecaptcha.render(containerId, {
            sitekey: "6LemmzYqAAAAALr8V77DYbKH3z8RJosQDILW7pQO",
            callback: (token: string) => {
              setRecaptchaToken(token)
              setRecaptchaVerified(true)
              setRecaptchaLoading(false)
            },
            "expired-callback": () => {
              setRecaptchaVerified(false)
              setRecaptchaToken("")
              toast.warning("Captcha expired. Please verify again.")
            },
            "error-callback": () => {
              setRecaptchaVerified(false)
              setRecaptchaToken("")
              toast.error("Captcha error. Please try again.")
            }
          })
        } catch (error) {
          console.error("Failed to render reCAPTCHA:", error)
        }
      })
    }

    initRecaptcha()
  }, [containerId, containerReady])

  const resetRecaptcha = () => {
    setRecaptchaVerified(false)
    setRecaptchaToken("")
  }

  return {
    recaptchaVerified,
    recaptchaToken,
    recaptchaLoading,
    setRecaptchaLoading,
    resetRecaptcha
  }
}

interface RecaptchaProps {
  containerId: string
}

export function RecaptchaV2({ containerId }: RecaptchaProps) {
  return (
    <div className="flex justify-center scale-90 origin-left">
      <div id={containerId} className="min-h-[78px]" />
    </div>
  )
}