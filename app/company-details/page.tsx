"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  Files,
  Eye,
  Target,
  Layout,
  Briefcase,
  CheckCircle2,
  CreditCard,
  Ship,
  Compass,
  Globe,
  BarChart3,
  ShieldCheck,
  Cpu,
  Lock,
  Flag,
  Heart,
  Zap,
  MapPin,
  PhoneCall,
  MessageSquare,
  Share2,
  ChevronRight,
  Sparkles,
  Search,
  Scale,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const sections = [
  {
    id: "overview",
    icon: <Building2 className="w-6 h-6" />,
    title: "Corporate Overview",
    content:
      "Homocation Asia Private Limited is an Indian hospitality technology and event marketplace company committed to building structured, scalable, and technology-driven platforms within the hospitality and event ecosystem. The company operates and manages two specialized digital brands:\n\nEventibe.com\nVenueForEvent.com\n\nBoth platforms are designed to simplify venue discovery, event planning, and vendor connectivity through a structured, inquiry-driven marketplace model.\n\nHomocation Asia Private Limited is legally incorporated under the Companies Act, 2013 (India) and operates with a long-term vision of creating integrated hospitality and event technology ecosystems across India and international markets.",
  },
  {
    id: "legal-info",
    icon: <Files className="w-6 h-6" />,
    title: "Legal & Registration Information",
    content:
      "Legal Name: Homocation Asia Private Limited\nCorporate Identification Number (CIN): U55101DL2024PTC435007\nDate of Incorporation: 05 August 2024\nRegistered Office:\nPlot No-18, D Block, Qutub Vihar Phase-1, Sector 19,\nSouth West Delhi, New Delhi – 110071, India\n\nThe company operates in compliance with Indian corporate laws and regulatory frameworks applicable to private limited entities.",
  },
  {
    id: "vision-background",
    icon: <Eye className="w-6 h-6" />,
    title: "Background & Foundational Vision",
    content:
      "While the legal incorporation took place in 2024, the conceptual foundation of the company dates back to 2012. The founders identified a persistent gap in the hospitality and event industry:\n\n- Event hosts struggled to find verified venues with structured information.\n- Venue owners lacked consistent digital exposure.\n- Vendors depended heavily on offline references.\n- Corporate planners faced inefficiencies in sourcing event infrastructure.\n\nThe vision was simple but powerful:\n\nTo create a structured digital marketplace that bridges venues, vendors, and event hosts through transparent discovery and inquiry-based engagement.\n\nThis philosophy forms the core of Homocation Asia Private Limited and all its brands.",
  },
  {
    id: "ecosystem",
    icon: <Layout className="w-6 h-6" />,
    title: "Brand Ecosystem",
    subsections: [
      {
        subtitle: "Eventibe.com",
        content:
          "Eventibe.com is positioned as a modern, premium event venue marketplace serving both social and corporate segments. It focuses on:\n\n- Wedding venues\n- Corporate conference venues\n- Banquet halls\n- Resorts\n- Farmhouses\n- Convention centers\n- Outdoor venues\n- Luxury event spaces\n\nEventibe operates primarily on an inquiry-based model rather than a direct booking model. The objective is to create meaningful conversations between venue owners and event planners.",
      },
      {
        subtitle: "VenueForEvent.com",
        content:
          "VenueForEvent.com operates under the same corporate structure but with tailored branding and positioning. It is designed to:\n\n- Strengthen search-driven venue discovery\n- Expand SEO reach\n- Serve broader city-level targeting\n- Create multi-brand digital dominance in the venue marketplace segment\n\nBoth brands are strategically aligned yet independently positioned for digital expansion.",
      },
    ],
  },
  {
    id: "positioning",
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Industry Positioning",
    content:
      "Homocation Asia Private Limited operates within three interconnected sectors:\n\n- Hospitality Technology\n- Event Marketplace Platforms\n- Digital Lead Generation for Venues & Vendors\n\nThe company’s platforms aim to:\n\n- Digitize venue inventory\n- Structure inquiry management\n- Improve lead quality\n- Provide scalable marketing infrastructure for hospitality businesses\n\nThe business model emphasizes:\n\n- Marketplace efficiency\n- Structured listing architecture\n- Scalable city-wise expansion\n- Vendor integration ecosystem\n- Long-term digital brand authority",
  },
  {
    id: "core-services",
    icon: <Briefcase className="w-6 h-6" />,
    title: "Core Services",
    subsections: [
      {
        subtitle: "Venue Marketplace Infrastructure",
        content:
          "The platforms offer structured listing frameworks including:\n- Venue name & branding\n- Location mapping\n- Capacity & seating formats\n- Event suitability categorization\n- Amenities & features\n- Image galleries\n- Inquiry forms with tracking",
      },
      {
        subtitle: "Vendor Marketplace (Expansion Module)",
        content:
          "Homocation Asia Private Limited is expanding into a full vendor ecosystem including:\n- Catering services\n- Photography & videography\n- Decor & theme styling\n- Lighting & sound\n- Mehndi artists\n- Event planners\n- DJ & entertainment services\n- Tenting & stage setup providers\n\nThis will create a 360-degree event ecosystem.",
      },
      {
        subtitle: "Technology & API Integration",
        content:
          "Venue data can be integrated through internal APIs, enabling:\n- Scalable content management\n- Independent brand positioning\n- SEO customization per platform\n- Structured data markup\n- Inquiry tracking segmentation",
      },
    ],
  },
  {
    id: "business-model",
    icon: <CreditCard className="w-6 h-6" />,
    title: "Business Model",
    content:
      "Homocation Asia Private Limited follows a hybrid revenue structure:\n\n- Listing subscriptions (future-ready)\n- Lead-based monetization\n- Premium visibility upgrades\n- Featured listing placement\n- Strategic partnerships\n- Vendor onboarding packages\n\nUnlike traditional OTA models, the primary focus is inquiry generation rather than instant booking transactions.",
  },
  {
    id: "vision",
    icon: <Compass className="w-6 h-6" />,
    title: "Vision Statement",
    content:
      "To become a leading hospitality and event marketplace technology company in Asia, enabling seamless discovery, connection, and growth for venues, vendors, and event organizers.",
  },
  {
    id: "mission",
    icon: <Target className="w-6 h-6" />,
    title: "Mission Statement",
    content:
      "Our mission is to:\n\n- Digitally empower venue owners.\n- Simplify event discovery.\n- Improve transparency in event planning.\n- Create structured digital infrastructure for hospitality businesses.\n- Build scalable platforms across India and international markets.",
  },
  {
    id: "values",
    icon: <Heart className="w-6 h-6" />,
    title: "Core Values",
    content:
      "**Innovation**\nWe continuously develop structured digital systems for venue discovery and inquiry management.\n\n**Transparency**\nClear listings, accurate descriptions, and structured communication channels.\n\n**Scalability**\nTechnology designed for multi-city and multi-country expansion.\n\n**Partner Empowerment**\nHelping venues and vendors increase visibility and growth.\n\n**Customer-Centric Design**\nUser experience focused on clarity, simplicity, and decision support.",
  },
  {
    id: "ops-structure",
    icon: <Ship className="w-6 h-6" />,
    title: "Operational Structure",
    content:
      "Homocation Asia Private Limited operates through:\n\n- Centralized corporate strategy\n- Brand-specific digital teams\n- Technology & development division\n- Content & SEO division\n- Partner onboarding team\n- Sales & relationship management\n\nThis structure allows independent brand positioning while maintaining centralized operational efficiency.",
  },
  {
    id: "tech-framework",
    icon: <Cpu className="w-6 h-6" />,
    title: "Technology Framework",
    content:
      "The company leverages modern web technologies and scalable backend systems to ensure:\n\n- Fast-loading pages\n- SEO-friendly URL structures\n- Dynamic city pages\n- Structured schema markup\n- Secure inquiry forms\n- Lead source tagging\n- Admin-level moderation\n\nThe architecture supports:\n\n- Slug-based routing\n- API-driven content\n- Independent meta management\n- Scalable CMS framework",
  },
  {
    id: "market-focus",
    icon: <Globe className="w-6 h-6" />,
    title: "Market Focus",
    content:
      "**Primary Markets:**\n- India\n- Nepal (planned expansion)\n- South Asia (long-term)\n\n**Event Segments:**\n- Weddings\n- Engagement ceremonies\n- Reception events\n- Corporate conferences\n- Product launches\n- Training workshops\n- Exhibitions\n- Private celebrations",
  },
  {
    id: "differentiation",
    icon: <Sparkles className="w-6 h-6" />,
    title: "Strategic Differentiation",
    content:
      "Homocation Asia Private Limited differentiates itself by:\n\n- Focusing on structured inquiry rather than transactional booking.\n- Creating SEO-rich city landing pages.\n- Providing dual-brand digital presence.\n- Designing platforms for long-term scalability.\n- Integrating vendors into venue ecosystems.",
  },
  {
    id: "governance",
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Corporate Governance",
    content:
      "The company follows standard corporate governance practices applicable to Indian private limited entities, including:\n\n- Board-level oversight\n- Regulatory compliance\n- Financial transparency\n- Contractual clarity\n- Vendor and partner agreements",
  },
  {
    id: "data-resp",
    icon: <Lock className="w-6 h-6" />,
    title: "Data Responsibility",
    content:
      "Homocation Asia Private Limited is committed to:\n\n- Data protection\n- Secure inquiry processing\n- Responsible partner onboarding\n- Controlled access to user information\n- Transparent privacy policies\n\nBoth Eventibe.com and VenueForEvent.com operate under unified privacy and compliance standards.",
  },
  {
    id: "roadmap",
    icon: <Flag className="w-6 h-6" />,
    title: "Long-Term Expansion Roadmap",
    content:
      "The strategic roadmap includes:\n\n- Vendor module launch\n- City-wise expansion\n- Corporate event specialization modules\n- International event venue categories\n- Event planning tools integration\n- CRM integration for venues\n- Structured analytics dashboards",
  },
  {
    id: "hospitality-growth",
    icon: <Zap className="w-6 h-6" />,
    title: "Commitment to Hospitality Growth",
    content:
      "Homocation Asia Private Limited is not just a listing platform operator. It is building digital infrastructure for hospitality growth.\n\nBy enabling:\n\n- Better visibility\n- Structured lead flow\n- Improved communication\n- Digital brand positioning\n\nThe company contributes directly to the modernization of the hospitality and event industry.",
  },
  {
    id: "spodia",
    icon: <Share2 className="w-6 h-6" />,
    title: "Relationship With Spodia Ecosystem",
    content:
      "The company also operates within a broader hospitality technology environment, including connections with platforms like Spodia.com, which focuses on hotel bookings.\n\nWhile Spodia operates as an OTA model, Eventibe and VenueForEvent operate as inquiry-based venue marketplaces. This creates a complementary ecosystem within the hospitality domain.",
  },
  {
    id: "ethical-standards",
    icon: <Scale className="w-6 h-6" />,
    title: "Ethical Standards",
    content:
      "Homocation Asia Private Limited commits to:\n\n- Fair business practices\n- Non-discriminatory listing policies\n- Transparent partner communication\n- Ethical marketing strategies\n- Respect for user privacy",
  },
  {
    id: "corp-resp",
    icon: <Users className="w-6 h-6" />,
    title: "Corporate Responsibility",
    content:
      "The company believes in:\n\n- Supporting small venue owners\n- Empowering local vendors\n- Encouraging digital transformation\n- Promoting organized event planning practices\n\nFuture initiatives may include:\n\n- Digital training for venue partners\n- Hospitality marketing workshops\n- Rural venue inclusion programs",
  },
  {
    id: "philosophy",
    icon: <Heart className="w-6 h-6" />,
    title: "Brand Philosophy",
    content:
      "At its core, Homocation Asia Private Limited believes:\n\nEvents are not transactions — they are experiences.\n\nVenues are not just physical spaces — they are environments where memories are created.\n\nVendors are not service providers — they are creative collaborators.\n\nThis philosophy shapes every brand decision, design structure, and expansion plan.",
  },
  {
    id: "contact",
    icon: <PhoneCall className="w-6 h-6" />,
    title: "Contact & Corporate Communication",
    content:
      "For corporate inquiries:\n\nCompany Name: Homocation Asia Private Limited\nRegistered Office: South West Delhi, New Delhi – 110071, India\n\nOfficial Websites:\nwww.eventibe.com\nwww.venueforevent.com\n\nCorporate communication may be directed through official website contact channels.",
  },
  {
    id: "closing",
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Closing Statement",
    content:
      "Homocation Asia Private Limited stands at the intersection of hospitality, technology, and event experiences. Through Eventibe.com and VenueForEvent.com, the company is building a scalable, inquiry-driven, and technology-enabled event marketplace designed for long-term growth.\n\nWith a structured foundation, a scalable architecture, and a clear vision, the company is positioned to become a strong digital player in the hospitality and event industry.",
  },
];

export default function CompanyDetailsPage() {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -45% 0px",
      threshold: [0, 0.1, 0.5, 1.0],
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      activeSection &&
      navItemsRef.current[activeSection] &&
      scrollContainerRef.current
    ) {
      const scrollContainer = scrollContainerRef.current;
      const navItem = navItemsRef.current[activeSection];

      const containerTop = scrollContainer.getBoundingClientRect().top;
      const navItemTop = navItem!.getBoundingClientRect().top;
      const relativeTop = navItemTop - containerTop;

      scrollContainer.scrollTo({
        top:
          scrollContainer.scrollTop +
          relativeTop -
          scrollContainer.clientHeight / 2 +
          navItem!.clientHeight / 2,
        behavior: "smooth",
      });
    }
  }, [activeSection]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative py-10 md:py-40 overflow-hidden bg-primary-navy">
        <div className="absolute inset-0 z-0 text-white">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop"
            alt="Corporate Office Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-primary-navy/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy via-transparent to-primary-navy/50"></div>

          {/* Subtle Geometric Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-white flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-orange/10 border border-accent-orange/30 text-accent-orange text-[10px] md:text-sm font-black mb-4 md:mb-6 animate-fade-in shadow-xl backdrop-blur-sm uppercase tracking-widest">
              <Sparkles size={14} className="text-accent-orange" />
              <span>Official Corporate Registry</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 md:mb-8 leading-[1.2] md:leading-[1.1] animate-fade-in tracking-tight drop-shadow-md break-words">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-100 to-orange-300">
                Company
              </span>{" "}
              Details
            </h1>
            <div className="space-y-3 md:space-y-4">
              <p className="text-lg md:text-xl text-white font-bold tracking-tight break-words">
                Homocation Asia Private Limited
              </p>
              <p className="text-sm md:text-base text-orange-200/90 font-bold border-t-4 border-orange-500 pt-3 py-2 bg-orange-500/5 backdrop-blur-sm rounded-xl max-w-sm mx-auto">
                Parent Company of Eventibe.com & VenueForEvent.com
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Navigation Side */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
      <section className="py-16 md:py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar Navigation - Sticky */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-28 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col max-h-[calc(100vh-140px)]">
                <div className="p-8 pb-6 border-b border-slate-50 shrink-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 rounded-lg bg-accent-orange/10 flex items-center justify-center text-accent-orange">
                      <Files size={14} />
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      DOCUMENT INDEX
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-primary-navy tracking-tight">
                    Quick Navigation
                  </h3>
                </div>

                <nav
                  ref={scrollContainerRef}
                  className="p-4 space-y-1 overflow-y-auto flex-1 custom-scrollbar scroll-smooth"
                >
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    return (
                      <Link
                        key={section.id}
                        href={`#${section.id}`}
                        ref={(el) => {
                          navItemsRef.current[section.id] = el;
                        }}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                          isActive
                            ? "bg-primary-navy/5 text-primary-navy shadow-[inset_0_0_0_1px_rgba(11,31,58,0.05)]"
                            : "text-slate-500 hover:text-primary-navy hover:bg-slate-50"
                        }`}
                      >
                        {/* Status Indicator */}
                        <div
                          className={`absolute left-0 w-1.5 bg-accent-orange rounded-r-full transition-all duration-300 ${
                            isActive
                              ? "h-6 opacity-100"
                              : "h-0 opacity-0 group-hover:h-2"
                          }`}
                        ></div>

                        <div
                          className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isActive
                              ? "bg-primary-navy text-white shadow-lg shadow-blue-900/20"
                              : "bg-slate-100 text-slate-400 group-hover:bg-white group-hover:text-primary-navy group-hover:shadow-sm"
                          }`}
                        >
                          <div className="scale-75 origin-center">
                            {section.icon}
                          </div>
                        </div>

                        <span
                          className={`text-[13px] font-bold truncate transition-all leading-snug flex-1 ${isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"}`}
                        >
                          {section.title}
                        </span>

                        {isActive && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute -right-1 w-1 h-1 rounded-full bg-accent-orange"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <div className="p-6 bg-slate-50/80 mt-auto border-t border-slate-100 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                    Official registry
                  </span>
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                </div>
              </div>
            </aside>

            {/* Content Cards */}
            <div className="lg:w-3/4 space-y-8 md:space-y-20">
              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-16 shadow-sm md:shadow-[0_40px_80px_-24px_rgba(0,0,0,0.03)] border border-slate-100 hover:shadow-md md:hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.06)] hover:border-corporate-blue/10 transition-all group overflow-hidden relative scroll-mt-28"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -top-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity transform group-hover:-translate-x-4 group-hover:translate-y-4 transition-transform duration-1000">
                    <div className="scale-[8]">{section.icon}</div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-slate-100 pb-8 md:pb-12 text-center md:text-left">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] bg-corporate-blue/5 border border-corporate-blue/10 flex items-center justify-center text-corporate-blue group-hover:bg-primary-navy group-hover:text-white transition-all duration-700 shadow-sm mx-auto md:mx-0">
                      {section.icon}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-primary-navy tracking-tight leading-tight uppercase break-words">
                      {section.title}
                    </h2>
                  </div>

                  <div className="prose prose-base md:prose-lg max-w-none text-soft-slate leading-[1.7] md:leading-[1.8]">
                    {section.content && (
                      <div className="whitespace-pre-line space-y-8">
                        {section.content.split("\n\n").map((para, i) => (
                          <div
                            key={i}
                            className={`relative ${para.startsWith("-") || para.startsWith("**") ? "bg-slate-50/50 p-6 md:p-10 rounded-[2.5rem] border border-slate-100" : ""}`}
                          >
                            {para.split("\n").map((line, j) => {
                              if (line.startsWith("- ")) {
                                return (
                                  <div
                                    key={j}
                                    className="flex items-start gap-4 mb-4 last:mb-0 group/line"
                                  >
                                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-accent-orange shrink-0 mt-1 transition-colors group-hover/line:bg-accent-orange group-hover/line:text-white">
                                      <CheckCircle2 size={14} />
                                    </div>
                                    <span className="font-bold text-primary-navy/80">
                                      {line.substring(2)}
                                    </span>
                                  </div>
                                );
                              }
                              if (
                                line.startsWith("**") &&
                                line.endsWith("**")
                              ) {
                                return (
                                  <h3
                                    key={j}
                                    className="text-xl font-black text-primary-navy mb-4 mt-8 first:mt-0 flex items-center gap-3 uppercase tracking-wider"
                                  >
                                    <div className="w-2 h-6 md:w-2 md:h-8 bg-accent-orange rounded-full"></div>
                                    {line.replace(/\*\*/g, "")}
                                  </h3>
                                );
                              }
                              return (
                                <p
                                  key={j}
                                  className={`mb-4 last:mb-0 ${line.startsWith("**") ? "font-black text-primary-navy inline-block mr-2" : ""}`}
                                >
                                  {line.includes("**") ? (
                                    <>
                                      <span className="font-black text-primary-navy">
                                        {line.split("**")[1]}
                                      </span>
                                      {line.split("**")[2]}
                                    </>
                                  ) : (
                                    line
                                  )}
                                </p>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    )}

                    {section.subsections && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
                        {section.subsections.map((sub, i) => (
                          <div
                            key={i}
                            className="p-6 md:p-12 rounded-2xl md:rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md md:hover:shadow-xl hover:border-corporate-blue/20 transition-all duration-500 group/sub h-full flex flex-col"
                          >
                            <h3 className="text-lg md:text-xl font-black text-primary-navy mb-6 md:mb-8 border-b-2 border-orange-200 pb-4 inline-block group-hover/sub:border-corporate-blue transition-colors break-words uppercase">
                              {sub.subtitle}
                            </h3>
                            <div className="whitespace-pre-line text-sm flex-1">
                              {sub.content.split("\n").map((line, j) => (
                                <div key={j} className="mb-3 last:mb-0">
                                  {line.startsWith("- ") ? (
                                    <div className="flex items-start gap-3">
                                      <div className="w-2 h-2 rounded-full bg-accent-orange mt-2.5 shrink-0"></div>
                                      <span className="font-bold text-soft-slate">
                                        {line.substring(2)}
                                      </span>
                                    </div>
                                  ) : (
                                    <p
                                      className={
                                        line.startsWith("Wedding") ||
                                        line.startsWith("Strengthen")
                                          ? "font-medium"
                                          : ""
                                      }
                                    >
                                      {line}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands Call to Action */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-100 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">
            <Link href="https://eventibe.com" target="_blank" className="group">
              <div className="p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-primary-navy text-white hover:scale-[1.02] transition-all duration-700 shadow-lg md:shadow-[0_40px_80px_-24px_rgba(0,31,58,0.2)] overflow-hidden relative border border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-corporate-blue/30 via-transparent to-transparent"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl group-hover:bg-accent-orange/20 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-6 transition-transform">
                    <Globe size={32} className="text-orange-400" />
                  </div>
                  <h4 className="text-sm font-bold text-orange-400 uppercase tracking-[0.3em] mb-4">
                    Core Digital Brand
                  </h4>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                    Eventibe.com
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mb-10 max-w-md leading-relaxed">
                    India's Premier Event & Venue Discovery Marketplace for
                    social and corporate segments.
                  </p>
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary-navy rounded-2xl font-black group-hover:gap-6 transition-all shadow-xl">
                    Visit Website <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
            <Link
              href="https://venueforevent.com"
              target="_blank"
              className="group"
            >
              <div className="p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-white border-2 border-slate-100 text-primary-navy hover:border-corporate-blue/20 hover:scale-[1.02] transition-all duration-700 shadow-sm hover:shadow-[0_48px_96px_-24px_rgba(0,0,0,0.1)] overflow-hidden relative h-full">
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all duration-700"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-corporate-blue/5 flex items-center justify-center mb-8 border border-corporate-blue/10 group-hover:-rotate-6 transition-transform">
                    <Search size={32} className="text-corporate-blue" />
                  </div>
                  <h4 className="text-sm font-bold text-corporate-blue uppercase tracking-[0.3em] mb-4">
                    Search Dominance
                  </h4>
                  <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight">
                    VenueForEvent.com
                  </h3>
                  <p className="text-soft-slate text-sm md:text-base mb-10 max-w-md leading-relaxed">
                    Search-driven venue discovery platform designed for
                    city-level targeting and digital expansion.
                  </p>
                  <div className="inline-flex items-center gap-3 px-8 py-4 bg-primary-navy text-white rounded-2xl font-black group-hover:gap-6 transition-all shadow-xl">
                    Visit Website <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Contact Info */}
      <section className="bg-slate-50 pt-16 pb-6 md:py-24 border-t border-slate-200 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side: Map View */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group h-[300px] md:h-[500px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border-2 md:border-4 border-white order-2 lg:order-1"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.463137684032!2d77.01419737549902!3d28.585868275691062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1af173d57d03%3A0x67a9d0124b81c62b!2sPhase%201%2C%20Qutub%20Vihar%20I%2C%20Qutub%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110071!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="transition-all duration-1000"
              ></iframe>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors pointer-events-none"></div>
              <Link
                href="https://www.google.com/maps/dir/?api=1&destination=Plot+No-18+D+Block+Qutub+Vihar+Phase-1+Sector+19+New+Delhi+110071"
                target="_blank"
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white text-primary-navy px-4 py-2 md:px-5 md:py-2.5 rounded-xl font-bold text-xs md:text-sm shadow-2xl flex items-center gap-2 transform translate-y-0 lg:translate-y-2 opacity-100 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-300 hover:bg-primary-navy hover:text-white"
              >
                <MapPin size={16} />
                Get Directions
                <ChevronRight size={14} />
              </Link>
            </motion.div>

            {/* Right Side: Content Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-accent-orange mb-6 md:mb-8 border border-slate-100 transform -rotate-6 lg:group-hover:rotate-0 transition-transform duration-500 mx-auto lg:mx-0">
                <MapPin size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-primary-navy mb-6 tracking-tight leading-tight uppercase">
                Corporate Office
              </h2>
              <div className="space-y-6 mb-10 md:mb-12">
                <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                  <div className="hidden lg:block w-1.5 h-16 md:h-20 bg-cta-gradient rounded-full shrink-0"></div>
                  <p className="text-soft-slate text-base md:text-lg font-bold leading-relaxed max-w-lg mx-auto lg:mx-0">
                    Plot No-18, D Block, Qutub Vihar Phase-1, Sector 19, South
                    West Delhi, New Delhi – 110071, India
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <div className="px-4 py-1.5 bg-slate-100 rounded-full text-xs font-black text-slate-500 uppercase tracking-widest">
                    HQ India
                  </div>
                  <div className="px-4 py-1.5 bg-orange-100 rounded-full text-xs font-black text-accent-orange uppercase tracking-widest">
                    Registered
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="mailto:contact@eventibe.com"
                  className="group flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-full font-black text-primary-navy hover:border-corporate-blue hover:text-corporate-blue hover:shadow-xl transition-all duration-500"
                >
                  <MailIcon className="w-5 h-5" />
                  Email Support
                </a>
                <Link
                  href="/contact-us"
                  className="group flex items-center justify-center gap-3 px-6 py-3 bg-cta-gradient text-white rounded-full font-black shadow-[0_24px_48px_-12px_rgba(249,115,22,0.4)] hover:scale-[1.05] hover:shadow-[0_32px_64px_-12px_rgba(249,115,22,0.5)] transition-all duration-500"
                >
                  <PhoneCall size={18} />
                  Contact Corporate Team
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
