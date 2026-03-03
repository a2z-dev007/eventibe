import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileText,
  Clock,
  Globe,
  Mail,
  Phone,
  Info,
  Database,
  Zap,
  Share2,
  ExternalLink,
  UserX,
  UserCheck,
  Briefcase,
  RefreshCw,
  CheckCircle2,
  MapPin,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Eventibe - Your Privacy Matters",
  description:
    "Review Eventibe's Privacy Policy to understand how we collect, use, and protect your information when using our event and venue discovery platform.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white scroll-smooth">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 flex items-center overflow-hidden bg-primary-navy">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
            alt="Privacy and Security"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-navy via-primary-navy/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/50"></div>

          {/* Subtle Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors text-sm font-medium group"
            >
              <ArrowLeft
                size={16}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-2 ml-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-xs md:text-sm font-bold mb-6 animate-fade-in shadow-xl backdrop-blur-sm">
              <ShieldCheck size={14} />
              <span>Trust & Transparency</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight animate-fade-in tracking-tight">
              Privacy{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-orange-300">
                Policy
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl animate-fade-in [animation-delay:200ms] font-medium">
              At Eventibe, your privacy is our priority. We are committed to
              protecting your data and being transparent about how we handle
              your information.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Meta Info */}
      <section className="bg-light-bg py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 px-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-corporate-blue/10 flex items-center justify-center text-corporate-blue">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-slate uppercase tracking-wider font-bold">
                  Effective Date
                </p>
                <p className="text-sm font-black text-primary-navy">
                  [Insert Date]
                </p>
              </div>
            </div>

            <div className="w-px h-8 bg-gray-100 hidden md:block"></div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                <RefreshCw size={20} />
              </div>
              <div>
                <p className="text-xs text-soft-slate uppercase tracking-wider font-bold">
                  Last Updated
                </p>
                <p className="text-sm font-black text-primary-navy">
                  [Insert Date]
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-soft-slate text-sm font-medium italic">
              <FileText size={16} className="text-corporate-blue" />
              This policy applies to Eventibe.com & VenueForEvent.com
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="pt-16 pb-8 md:py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Table of Contents - Desktop Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 self-start space-y-4">
              <div className="bg-light-bg p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h3 className="text-primary-navy font-black text-lg mb-6 border-b border-gray-200 pb-4">
                  Quick Links
                </h3>
                <nav className="space-y-3">
                  {[
                    { id: "about", label: "1. About Us" },
                    { id: "collect", label: "2. Information We Collect" },
                    { id: "use", label: "3. How We Use Information" },
                    { id: "share", label: "4. Sharing Information" },
                    { id: "retention", label: "5. Data Retention" },
                    { id: "security", label: "6. Data Security" },
                    { id: "links", label: "7. Third-Party Links" },
                    { id: "children", label: "8. Children's Privacy" },
                    { id: "rights", label: "9. Your Rights" },
                    {
                      id: "international",
                      label: "10. International Transfers",
                    },
                    { id: "business", label: "11. Business Transfers" },
                    { id: "changes", label: "12. Changes to Policy" },
                    { id: "contact", label: "13. Contact Information" },
                    { id: "consent", label: "14. Consent" },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-2 text-soft-slate hover:text-accent-orange font-bold text-sm transition-colors group py-1"
                    >
                      <ChevronRight
                        size={14}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-primary-navy text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-corporate-blue/20 rounded-full -mt-12 -mr-12"></div>
                <h4 className="text-xl font-bold mb-4 relative z-10">
                  Need help?
                </h4>
                <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed">
                  Have questions about your privacy or data protection?
                </p>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 bg-accent-orange text-white px-6 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-all"
                >
                  Contact Support <Mail size={16} />
                </Link>
              </div>
            </aside>

            {/* Content Column */}
            <main className="lg:col-span-8 space-y-12 md:space-y-16">
              {/* Introduction */}
              <div className="bg-light-bg p-6 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                <div className="space-y-4 text-soft-slate text-sm md:text-base leading-relaxed font-medium">
                  <p>
                    Eventibe.com and VenueForEvent.com (collectively referred to
                    as “Platform”, “Website”, “We”, “Us”, or “Our”).
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, store,
                    process, disclose, and protect your information when you use
                    our websites, submit inquiries, list venues or services, or
                    interact with us in any manner.
                  </p>
                  <p className="border-l-4 border-accent-orange pl-4 text-primary-navy font-extrabold italic bg-white/50 py-2 rounded-r-lg">
                    By accessing or using our websites, you agree to the terms
                    outlined in this Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Section 1: ABOUT US */}
              <div id="about" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Info size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    1. ABOUT US
                  </h2>
                </div>
                <p className="text-soft-slate text-base md:text-lg mb-6 leading-relaxed">
                  Eventibe.com and VenueForEvent.com operate as online event
                  venue and vendor marketplaces that connect:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    "Event hosts",
                    "Wedding planners",
                    "Corporate organizers",
                    "Venue owners",
                    "Event service providers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-corporate-blue/20 transition-all font-bold text-primary-navy text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-accent-orange flex-shrink-0 mt-1.5"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-soft-slate text-base leading-relaxed bg-corporate-blue/5 p-6 rounded-2xl border border-corporate-blue/10 italic font-medium">
                  We facilitate discovery and inquiries. We do not directly
                  organize, manage, or execute events unless explicitly stated
                  under a separate agreement.
                </p>
              </div>

              {/* Section 2: INFORMATION WE COLLECT */}
              <div id="collect" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Database size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    2. INFORMATION WE COLLECT
                  </h2>
                </div>
                <p className="text-soft-slate text-base md:text-lg mb-8">
                  We collect information to provide better services, improve
                  user experience, and facilitate venue/vendor inquiries.
                </p>

                <div className="space-y-8">
                  {/* 2.1 */}
                  <div>
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-accent-orange/10 text-accent-orange text-xs flex items-center justify-center font-black">
                        2.1
                      </span>
                      Information You Provide Directly
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          A. When You Submit an Inquiry
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Full Name",
                            "Email Address",
                            "Phone Number",
                            "Event Type",
                            "Event Date",
                            "Guest Count",
                            "Budget (if provided)",
                            "Message/Requirements",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          B. When You List Your Venue
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Venue Name",
                            "Business Address",
                            "Contact Person",
                            "Contact Details",
                            "Pricing Information",
                            "Capacity Details",
                            "Venue Description",
                            "Images",
                            "Legal/Business Information (if required)",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          C. When You List Your Service
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Vendor Name",
                            "Category",
                            "Service Area",
                            "Pricing Range",
                            "Portfolio Images",
                            "Contact Information",
                          ].map((item) => (
                            <li
                              key={item}
                              className="text-soft-slate text-sm font-medium flex items-center gap-2"
                            >
                              <CheckCircle2
                                size={14}
                                className="text-accent-orange"
                              />{" "}
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="font-extrabold text-corporate-blue text-xs uppercase tracking-widest mb-4">
                          D. When You Contact Us
                        </p>
                        <ul className="space-y-2">
                          {["Name", "Email", "Phone", "Message Content"].map(
                            (item) => (
                              <li
                                key={item}
                                className="text-soft-slate text-sm font-medium flex items-start gap-2"
                              >
                                <CheckCircle2
                                  size={14}
                                  className="text-accent-orange flex-shrink-0 mt-0.5"
                                />{" "}
                                {item}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 2.2 */}
                  <div className="bg-light-bg p-8 rounded-[2.5rem] border border-gray-100">
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-accent-orange/10 text-accent-orange text-xs flex items-center justify-center font-black">
                        2.2
                      </span>
                      Automatically Collected Information
                    </h3>
                    <p className="text-soft-slate text-sm mb-6 font-medium">
                      When you use our websites, we may collect:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {[
                        "IP address",
                        "Device type",
                        "Browser type",
                        "Operating system",
                        "Pages visited",
                        "Time spent on pages",
                        "Referring URL",
                        "Cookies and tracking identifiers",
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-white rounded-full border border-gray-100 text-xs font-bold text-primary-navy shadow-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 2.3 */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-accent-orange/20 shadow-sm">
                    <h3 className="text-xl font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-accent-orange/10 text-accent-orange text-xs flex items-center justify-center font-black">
                        2.3
                      </span>
                      Cookies & Tracking Technologies
                    </h3>
                    <p className="text-soft-slate text-sm mb-4 font-medium">
                      We use cookies to:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {[
                        "Improve performance",
                        "Remember preferences",
                        "Analyze traffic",
                        "Enhance user experience",
                        "Support marketing campaigns",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm font-bold text-soft-slate"
                        >
                          <Zap
                            size={16}
                            className="text-accent-orange flex-shrink-0 mt-0.5"
                          />{" "}
                          {item}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-soft-slate italic bg-gray-50 p-4 rounded-xl border border-gray-100 leading-relaxed">
                      You may disable cookies via your browser settings.
                      However, certain features may not function properly
                      without them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: HOW WE USE YOUR INFORMATION */}
              <div id="use" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Zap size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    3. HOW WE USE YOUR INFORMATION
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      <span className="text-accent-orange flex-shrink-0">
                        3.1
                      </span>{" "}
                      To Facilitate Inquiries
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Your details may be shared with relevant venue owners or vendors.",
                        "We may contact you to clarify your requirements.",
                        "We may track inquiry performance for quality improvement.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      <span className="text-accent-orange flex-shrink-0">
                        3.2
                      </span>{" "}
                      To Operate the Platform
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Display venue and vendor listings.",
                        "Improve search and filtering.",
                        "Optimize SEO performance.",
                        "Enhance platform functionality.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      <span className="text-accent-orange flex-shrink-0">
                        3.3
                      </span>{" "}
                      Communication
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Respond to inquiries.",
                        "Send service updates.",
                        "Share important notifications.",
                        "Provide support.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100">
                    <p className="font-bold text-primary-navy mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                      <span className="text-accent-orange flex-shrink-0">
                        3.4
                      </span>{" "}
                      Marketing & Promotions
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Event planning tips.",
                        "Vendor recommendations.",
                        "Promotional campaigns.",
                        "Newsletter updates.",
                      ].map((item) => (
                        <li
                          key={item}
                          className="text-sm font-medium text-soft-slate flex items-start gap-3"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-corporate-blue shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                      <li className="text-xs text-soft-slate italic pt-2 border-t border-gray-200 mt-2 font-bold uppercase tracking-widest">
                        You may unsubscribe at any time.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-8 rounded-[2rem] bg-primary-navy text-white">
                  <p className="font-bold mb-4 flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-2 uppercase tracking-widest text-xs leading-tight">
                    <span className="text-accent-orange flex-shrink-0">
                      3.5
                    </span>{" "}
                    Legal & Compliance
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Prevent fraud.",
                      "Enforce terms.",
                      "Comply with legal obligations.",
                      "Resolve disputes.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 text-sm font-medium text-gray-300"
                      >
                        <ShieldCheck
                          size={16}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 4: HOW WE SHARE INFORMATION */}
              <div id="share" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Share2 size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    4. HOW WE SHARE INFORMATION
                  </h2>
                </div>
                <p className="text-base md:text-lg text-primary-navy font-black mb-8 p-6 bg-accent-orange/5 border-l-4 border-accent-orange rounded-r-2xl">
                  We do not sell personal information.
                </p>

                <div className="space-y-6">
                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-primary-navy mb-4 text-lg flex items-center gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-corporate-blue/10 text-corporate-blue text-xs flex items-center justify-center font-black">
                        4.1
                      </span>
                      With Venue Owners & Vendors
                    </h3>
                    <p className="text-soft-slate text-sm font-medium leading-relaxed">
                      When you submit an inquiry, your details are shared with
                      relevant partners to respond to your request.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-primary-navy mb-4 text-lg flex items-center gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-corporate-blue/10 text-corporate-blue text-xs flex items-center justify-center font-black">
                        4.2
                      </span>
                      With Service Providers
                    </h3>
                    <p className="text-soft-slate text-sm font-medium mb-4">
                      We may use third-party service providers for:
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {[
                        "Hosting services",
                        "Email communication",
                        "Analytics",
                        "CRM management",
                        "Payment processing (future integrations)",
                      ].map((item) => (
                        <span
                          key={item}
                          className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-corporate-blue border border-gray-100"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-soft-slate font-bold uppercase tracking-widest border-t border-gray-100 pt-4">
                      These providers are obligated to protect your data.
                    </p>
                  </div>

                  <div className="bg-white border border-red-100 p-8 rounded-[2rem] shadow-sm">
                    <h3 className="font-bold text-red-600 mb-4 text-lg flex items-center gap-3 leading-tight">
                      <span className="w-8 h-8 flex-shrink-0 rounded-lg bg-red-100 text-red-600 text-xs flex items-center justify-center font-black">
                        4.3
                      </span>
                      Legal Disclosure
                    </h3>
                    <p className="text-soft-slate text-sm font-medium mb-4 leading-relaxed">
                      We may disclose information if required:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        "By law",
                        "By court order",
                        "For fraud investigation",
                        "To protect rights or safety",
                      ].map((item) => (
                        <div
                          key={item}
                          className="p-3 bg-red-50 rounded-xl text-[10px] font-black text-red-700 text-center uppercase tracking-wider"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid for shorter sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Section 5 & 6 */}
                <div
                  id="retention"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <Clock size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    5. DATA RETENTION
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 flex-grow leading-relaxed font-medium">
                    We retain personal data only as long as necessary for
                    inquiry management, legal compliance, business operations,
                    and record-keeping.
                  </p>
                  <p className="text-xs text-primary-navy font-extrabold italic bg-white p-4 rounded-xl border border-gray-200">
                    You may request deletion of your data subject to legal and
                    contractual limitations.
                  </p>
                </div>

                <div
                  id="security"
                  className="scroll-mt-32 p-8 bg-primary-navy text-white rounded-[2.5rem] flex flex-col items-center text-center md:items-start md:text-left h-full shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-corporate-blue/20 rounded-full -mt-10 -mr-10"></div>
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform">
                    <Lock size={24} />
                  </div>
                  <h2 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight">
                    6. DATA SECURITY
                  </h2>
                  <p className="text-sm text-gray-400 mb-6 leading-relaxed font-medium">
                    We implement reasonable technical and organizational
                    measures including:
                  </p>
                  <ul className="space-y-2 mb-6 text-sm font-bold">
                    {[
                      "Secure hosting environments",
                      "HTTPS encryption",
                      "Access controls",
                      "Administrative safeguards",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-gray-300"
                      >
                        <ShieldCheck
                          size={14}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />{" "}
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-400 italic pt-4 border-t border-white/10">
                    However, no internet transmission is 100% secure. Users are
                    advised to exercise caution when sharing sensitive
                    information.
                  </p>
                </div>

                {/* Section 7 & 8 */}
                <div
                  id="links"
                  className="scroll-mt-32 p-8 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-gray-50 flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100 shadow-inner">
                    <ExternalLink size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    7. THIRD-PARTY LINKS
                  </h2>
                  <p className="text-sm text-soft-slate mb-4 leading-relaxed font-medium">
                    Our websites may contain links to external venue and vendor
                    websites, and social media platforms.
                  </p>
                  <p className="text-xs text-soft-slate leading-relaxed bg-gray-50 p-6 rounded-2xl border border-dotted border-gray-300 italic font-medium">
                    We are not responsible for the privacy practices of
                    third-party websites. Users are encouraged to review their
                    respective privacy policies.
                  </p>
                </div>

                <div
                  id="children"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-accent-orange mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <UserX size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    8. CHILDREN’S PRIVACY
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 font-bold uppercase tracking-widest text-corporate-blue">
                    Our platforms are not intended for individuals under the age
                    of 18.
                  </p>
                  <p className="text-sm text-soft-slate leading-relaxed font-medium">
                    We do not knowingly collect personal information from
                    minors. If we become aware of such collection, we will
                    delete it promptly.
                  </p>
                </div>
              </div>

              {/* Section 9: YOUR RIGHTS */}
              <div id="rights" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <UserCheck size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    9. YOUR RIGHTS
                  </h2>
                </div>
                <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-orange/5 rounded-full -mb-32 -mr-32"></div>
                  <p className="text-soft-slate text-sm md:text-base mb-8 leading-relaxed font-medium relative z-10">
                    Depending on applicable laws, you may have the right to:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                    {[
                      "Access your personal data",
                      "Request correction",
                      "Request deletion",
                      "Withdraw consent",
                      "Object to processing",
                      "Request data portability",
                    ].map((right) => (
                      <div
                        key={right}
                        className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-corporate-blue/20 transition-all font-bold text-primary-navy text-sm shadow-sm"
                      >
                        <CheckCircle2
                          size={16}
                          className="text-accent-orange flex-shrink-0 mt-0.5"
                        />{" "}
                        {right}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-8 border-t border-gray-100 relative z-10">
                    <p className="text-sm text-soft-slate font-extrabold italic text-center">
                      To exercise your rights, please contact us at the email
                      listed below.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 10 & 11 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                  id="international"
                  className="scroll-mt-32 p-8 bg-corporate-blue text-white rounded-[2.5rem] flex flex-col items-center text-center md:items-start md:text-left h-full shadow-lg group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    <Globe size={24} />
                  </div>
                  <h2 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight">
                    10. INTERNATIONAL TRANSFER
                  </h2>
                  <p className="text-sm text-blue-100 mb-6 leading-relaxed font-medium">
                    If you access our platform from outside India, your
                    information may be transferred to and processed in India or
                    other jurisdictions where our service providers operate.
                  </p>
                  <p className="text-xs text-blue-200 font-bold uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/10">
                    By using our services, you consent to such transfer.
                  </p>
                </div>

                <div
                  id="business"
                  className="scroll-mt-32 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex flex-col items-center text-center md:items-start md:text-left h-full shadow-sm group"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-corporate-blue mb-6 group-hover:scale-110 transition-transform border border-gray-100">
                    <Briefcase size={24} />
                  </div>
                  <h2 className="text-xl font-black text-primary-navy mb-4 uppercase tracking-tight leading-tight">
                    11. BUSINESS TRANSFERS
                  </h2>
                  <p className="text-sm text-soft-slate mb-6 leading-relaxed font-bold uppercase tracking-widest">
                    In the event of:
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      "Merger",
                      "Acquisition",
                      "Restructuring",
                      "Asset sale",
                    ].map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-black text-primary-navy flex items-start gap-2"
                      >
                        <ChevronRight
                          size={12}
                          className="text-accent-orange flex-shrink-0 mt-1"
                        />{" "}
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-soft-slate font-medium text-center pb-4 border-b border-gray-200">
                    User information may be transferred as part of the
                    transaction.
                  </p>
                </div>
              </div>

              {/* Section 12: CHANGES TO THIS POLICY */}
              <div id="changes" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <RefreshCw size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    12. CHANGES TO THIS POLICY
                  </h2>
                </div>
                <div className="bg-light-bg rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
                  <div className="space-y-4 flex-grow">
                    <p className="text-soft-slate text-sm md:text-base font-medium leading-relaxed">
                      We may update this Privacy Policy periodically. Updates
                      will be posted on this page with a revised “Last Updated”
                      date.
                    </p>
                    <p className="p-4 bg-white rounded-2xl border border-corporate-blue/20 text-corporate-blue text-sm font-black text-center shadow-sm">
                      Continued use of the platform after changes indicates
                      acceptance.
                    </p>
                  </div>
                  <div className="w-24 h-24 bg-corporate-blue/10 rounded-full flex items-center justify-center text-corporate-blue group-hover:rotate-180 transition-transform duration-1000 shrink-0">
                    <RefreshCw size={40} />
                  </div>
                </div>
              </div>

              {/* Section 13: CONTACT INFORMATION */}
              <div id="contact" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    13. CONTACT INFORMATION
                  </h2>
                </div>
                <div className="bg-primary-navy text-white rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 rounded-full blur-[80px] -mt-32 -mr-32"></div>
                  <p className="text-gray-300 text-sm md:text-base mb-10 font-medium relative z-10 max-w-lg">
                    If you have questions regarding this Privacy Policy, please
                    contact our data protection team:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Building2 size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Company
                          </p>
                          <p className="font-bold">
                            Eventibe.com / VenueForEvent.com
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Mail size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Email
                          </p>
                          <p className="font-bold">[Insert Official Email]</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <Phone size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Phone
                          </p>
                          <p className="font-bold">[Insert Contact Number]</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4">
                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-white/5 flex items-center justify-center text-accent-orange border border-white/10">
                          <MapPin size={24} />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-1">
                            Office Address
                          </p>
                          <p className="font-bold">
                            [Insert Registered Office Address]
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 pt-10 border-t border-white/10 relative z-10 text-center">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center gap-2 text-accent-orange font-black hover:text-white transition-colors group"
                    >
                      Visit Our Contact Us Page{" "}
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Section 14: CONSENT */}
              <div id="consent" className="scroll-mt-32 group">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-corporate-blue group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-primary-navy leading-tight">
                    14. CONSENT
                  </h2>
                </div>
                <div className="bg-light-bg rounded-[2.5rem] p-8 md:p-10 border-2 border-dashed border-gray-200 shadow-inner flex flex-col md:flex-row items-center gap-8">
                  <p className="text-soft-slate text-sm md:text-lg font-black text-center md:text-left leading-relaxed">
                    By using Eventibe.com or VenueForEvent.com, submitting
                    forms, or listing your venue or services, you consent to the
                    collection and use of information in accordance with this
                    Privacy Policy.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-white border-2 border-red-50 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
                <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <ShieldCheck size={24} />
                  </div>
                  <h3 className="text-xl font-black text-red-600 uppercase tracking-tight">
                    DISCLAIMER
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-soft-slate leading-relaxed font-bold italic">
                  This Privacy Policy is a general template aligned with
                  marketplace and inquiry-based platform operations. For full
                  legal compliance under applicable laws (including India IT
                  Act, DPDP Act, GDPR if applicable), consultation with a
                  qualified legal professional is recommended.
                </p>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Footer CTA (Subtle) */}
      <section className="py-8 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-black text-primary-navy mb-4">
            Any Doubts?
          </h2>
          <p className="text-soft-slate max-w-xl mx-auto mb-8 font-medium">
            Our team is here to help you understand how we protect your data.
            Feel free to reach out anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/contact-us"
              className="bg-cta-gradient text-white px-8 py-4 rounded-2xl font-bold hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
            >
              Contact Us Now <Mail size={20} />
            </Link>
            <Link
              href="/"
              className="bg-white border border-gray-200 text-primary-navy px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              Return to Home <ArrowLeft size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Additional Lucide Icon not in standard set but used above
function Building2({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
      <path d="M10 6h4" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
      <path d="M10 18h4" />
    </svg>
  );
}

function ArrowRight({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
