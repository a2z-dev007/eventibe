import type { Metadata } from "next"
import Script from "next/script"
import SignupForm from "@/components/auth/SignupForm"
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated"

export const metadata: Metadata = {
  title: "Eventibe Signup | Create Your Account – Partner & User Registration",
  description: "Register your Eventibe account today — whether you're a user booking event venues or a partner listing your property or service. Start now and access premium booking tools.",
  keywords: "Eventibe signup, create account Eventibe, user account venue booking, partner registration Eventibe, list service account, user registration Eventibe, venue owner signup, guest booking account",
  openGraph: {
    title: "Eventibe Signup | Create Your Account",
    description: "Sign up for Eventibe as a partner or user and enjoy simplified venue bookings & service listings.",
    url: "https://eventibe.com/signup",
    siteName: "Eventibe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventibe Signup | Partner & User Accounts",
    description: "Register with Eventibe – for corporate/wedding venue bookings or listing your services.",
  },
  alternates: {
    canonical: "https://eventibe.com/signup",
  },
}

export default function SignupPage() {
  return (
    <>
      {/* Load Google reCAPTCHA v2 Script */}
      <Script
        src="https://www.google.com/recaptcha/api.js"
        strategy="afterInteractive"
      />
      
      <RedirectIfAuthenticated>
        <main className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden">
          {/* Premium Photographic Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1920"
              alt="Luxury Event Celebration Background"
              className="w-full h-full object-cover object-center scale-105"
              draggable="false"
            />
            {/* Tinted navy mask overlay for brand consistency */}
            <div className="absolute inset-0 bg-primary-navy/85" />
            <div className="absolute inset-0 backdrop-blur-[3px]" />
          </div>

          <div className="relative z-10 w-full flex items-center justify-center px-4 mt-6 sm:mt-12">
            <div className="w-full max-w-2xl animate-in zoom-in-95 duration-500">
              <SignupForm />
            </div>
          </div>
        </main>
      </RedirectIfAuthenticated>

      <Script
        id="signup-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Eventibe Signup",
            url: "https://eventibe.com/signup",
            description: "Page where partners and users can sign up for an Eventibe account to access bookings or list event venues and services.",
            publisher: {
              "@type": "Organization",
              name: "Eventibe",
              url: "https://eventibe.com",
              logo: "https://eventibe.com/logo.png",
            }
          }),
        }}
      />
    </>
  )
}
