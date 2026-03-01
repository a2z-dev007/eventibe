import SectionHeader from './SectionHeader'
import FaqItem from './FaqItem'
import SeoRow from './SeoRow'
import { stories, faqs, seoRows } from './data'
import { MessageSquare, Quote, Sparkles, HelpCircle } from 'lucide-react'

// ── Client Stories ──────────────────────────────────────────────────────────
export function ClientStoriesSection() {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeader
            eyebrow="Success Stories"
            title="Moments That Matter"
            subtitle="Join thousands of happy hosts who found their dream venues through Spodia."
          />
          <button className="bg-[#FF9530] hover:bg-[#FF8000] text-white font-bold rounded-2xl px-8 py-4 transition-all hover:scale-105 shadow-xl shadow-orange-500/20 shrink-0 lg:mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Start Your Story
          </button>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((s, idx) => (
            <article
              key={s.author}
              className="group bg-gray-50/50 hover:bg-white rounded-[2.5rem] border border-transparent hover:border-gray-100 p-8 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 flex flex-col relative"
            >
              <div className="absolute top-8 right-8 text-gray-100 group-hover:text-orange-100 transition-colors">
                <Quote className="w-12 h-12" />
              </div>
              
              <div className="mb-6 relative">
                <span className="inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#FF9530] bg-orange-50 border border-orange-100">
                  {s.tag}
                </span>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8 relative">
                "{s.quote}"
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gray-100 to-gray-50 flex items-center justify-center text-gray-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-sm tracking-tight">{s.author}</h4>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-0.5">{s.sub}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── SEO Content Block ────────────────────────────────────────────────────────
export function SeoContentSection() {
  return (
    <section className="py-20 bg-gray-50/50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white rounded-[3rem] border border-gray-100/50 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 sm:p-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-[#FF9530] rounded-full" />
            <p className="text-[11px] font-black text-[#FF9530] uppercase tracking-[0.3em]">
              Premium Booking Platform
            </p>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
            Curating India's Finest <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9530] to-[#FFB770]">Celebration Spaces</span>
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <p className="text-gray-500 text-lg leading-relaxed font-medium">
              Spodia is more than just a booking engine. We are a bridge to unforgettable experiences, helping you discover and book premium wedding venues, banquet halls, resorts, and corporate hubs across India's most vibrant cities.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF9530]" />
                  Global Reach
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  Explore luxury banquet halls and scenic resorts in Delhi NCR, Mumbai, Jaipur, Udaipur, and Goa.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF9530]" />
                  Corporate Hubs
                </h3>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">
                  Verified conference spaces for annual meets and team offsites with transparent pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── FAQ Section ──────────────────────────────────────────────────────────────
export function FaqSection() {
  const midPoint = Math.ceil(faqs.length / 2)
  const leftFaqs = faqs.slice(0, midPoint)
  const rightFaqs = faqs.slice(midPoint)

  return (
    <section className="py-24 bg-[#F9FAFB] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF9530]/20 to-transparent" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 top-1/3 -translate-y-1/2 w-96 h-96 bg-blue-50/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="mb-20 animate-fade-in-up">
          <SectionHeader 
            eyebrow="Expert Guidance"
            title="Everything You Need to Know" 
            subtitle="Providing clarity and confidence for your venue booking journey. Can't find an answer? Our concierge is ready to assist."
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left Column (01-10) */}
          <div className="space-y-6">
            {leftFaqs.map((f, idx) => (
              <div key={`left-${idx}`} className="relative group animate-fade-in-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="absolute -left-4 top-6 w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 items-center justify-center text-[10px] font-black text-gray-300 group-hover:text-[#FF9530] group-hover:border-[#FF9530]/30 transition-all z-10 hidden xl:flex">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <FaqItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>

          {/* Right Column (11-20) */}
          <div className="space-y-6">
            {rightFaqs.map((f, idx) => (
              <div key={`right-${idx}`} className="relative group animate-fade-in-up" style={{ animationDelay: `${(idx + midPoint) * 100}ms` }}>
                <div className="absolute -left-4 top-6 w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 items-center justify-center text-[10px] font-black text-gray-300 group-hover:text-[#FF9530] group-hover:border-[#FF9530]/30 transition-all z-10 hidden xl:flex">
                  {(idx + midPoint + 1).toString().padStart(2, '0')}
                </div>
                <FaqItem q={f.q} a={f.a} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-24 p-12 bg-white rounded-[3rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col lg:flex-row items-center justify-between gap-12 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500 group animate-fade-in-up [animation-delay:1000ms]">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 rounded-[2rem] bg-gray-900 flex items-center justify-center text-[#FF9530] shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform shrink-0">
              <HelpCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="font-black text-gray-900 text-2xl tracking-tighter mb-2">Still have questions?</h4>
              <p className="text-gray-500 font-medium max-w-md leading-relaxed">Our dedicated venue concierge team is available 24/7 to help you find and shortlist the perfect space for your special event.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button className="bg-[#FF9530] hover:bg-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-200 group-hover:shadow-none">
              Chat With Support
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-900 px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:scale-105 active:scale-95">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── SEO Links Footer ─────────────────────────────────────────────────────────
export function SeoLinksSection() {
  return (
    <section className="pb-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-50 pt-16">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {seoRows.map(row => (
          <div key={row.title} className="hover:pl-4 transition-all duration-300">
            <SeoRow {...row} />
          </div>
        ))}
      </div>
    </section>
  )
}
