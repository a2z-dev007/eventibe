import type { Metadata } from "next"
import Script from "next/script"
import LoginForm from "@/components/auth/LoginForm"
import RedirectIfAuthenticated from "@/components/auth/RedirectIfAuthenticated"

export const metadata: Metadata = {
  title: "Eventibe Login | Secure Access for Partners & Users | Sign in to Your Account",
  description: "Log in securely to Eventibe to manage event venues, service bookings, payments, and customer accounts. Access your partner dashboard or user account with advanced protection.",
  keywords: "Eventibe login, venue login portal, partner login, Eventibe account access, sign in Eventibe, secure login system, manage event bookings, dashboard login",
  openGraph: {
    title: "Eventibe Login | Secure Access for Partners & Users",
    description: "Sign in securely to manage bookings, venues, payments, and event details on Eventibe.",
    url: "https://eventibe.com/login",
    siteName: "Eventibe",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventibe Login | Secure Venue & Event Access",
    description: "Log in to access your Eventibe dashboard and manage event operations seamlessly.",
  },
  alternates: {
    canonical: "https://eventibe.com/login",
  },
}

export default function LoginPage() {
  return (
    <>
      <RedirectIfAuthenticated>
        <main className="relative flex items-center justify-center min-h-screen pt-24 pb-16 overflow-hidden">
          {/* Premium Event Photographic Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1920"
              alt="Luxury Event Venue Background"
              className="w-full h-full object-cover object-center scale-105"
              draggable="false"
            />
            {/* Tinted dark overlay matching Eventibe's primary-navy (#0B1F3A) color */}
            <div className="absolute inset-0 bg-primary-navy/85" />
            <div className="absolute inset-0 backdrop-blur-[3px]" />
          </div>

          <div className="relative z-10 w-full flex items-center justify-center py-12 px-4 mt-6 sm:mt-12">
            <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-700">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-[32px] p-6 sm:p-10 w-full transition-all duration-500">
                <LoginForm />
              </div>
            </div>
          </div>
        </main>
      </RedirectIfAuthenticated>
      <Script
        id="login-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Eventibe Login",
            url: "https://eventibe.com/login",
            description: "Secure login page for partners and users to access Eventibe dashboard.",
            publisher: {
              "@type": "Organization",
              name: "Eventibe",
              url: "https://eventibe.com",
              logo: "https://eventibe.com/logo.png",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  email: "support@eventibe.com",
                  telephone: "+91-8800842084",
                  contactType: "Customer Support",
                },
              ],
            },
          }),
        }}
      />
    </>
  )
}
