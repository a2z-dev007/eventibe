import Link from 'next/link';
import Image from 'next/image';
import { fetchVenueTypes, fetchEventTypes } from '@/lib/api';
import HeroSearch from '@/components/HeroSearch';
import HighlightsSection from '@/components/HighlightsSection';
import FeaturedVenuesCarousel from '@/components/FeaturedVenuesCarousel';
import { Search, CalendarCheck, MessageSquare, Star, Quote } from 'lucide-react';

export default async function Home() {
  const venueTypesData = await fetchVenueTypes();
  const eventTypesData = await fetchEventTypes();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative z-20 w-full h-[100dvh] min-h-[550px] flex items-center justify-center text-white">
        {/* Background Video Content */}
        <video
          src="/assets/video/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Dark Overlay for clear reading visibility */}
        <div className="absolute inset-0 z-0 bg-black/40" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center mt-12 md:mt-16">
          <h1 className="text-2xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-2 md:mb-4 max-w-5xl leading-tight drop-shadow-xl animate-fade-in-up">
            Extraordinary Spaces for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange to-yellow-400">Corporate Excellence.</span>
          </h1>
          <p className="text-[15px] md:text-xl text-white/95  md:mb-10 max-w-2xl font-medium drop-shadow-md animate-fade-in-up [animation-delay:200ms]">
            The trusted marketplace to discover and book premium venues, offsites, and expert vendors for your next high-impact corporate event.
          </p>

          <div className="w-full">
            {/* Floating Search Bar with Animated Snake Border from event APIs */}
            <HeroSearch 
              venueTypes={venueTypesData?.records || []} 
              eventTypes={eventTypesData?.records || []} 
            />
          </div>
        </div>
      </section>

      {/* Featured Venues — Event Types Carousel */}
      <FeaturedVenuesCarousel />

      {/* Wedding Venue Highlights */}
      <HighlightsSection 
        subtitle="Wedding Signature"
        title="Wedding Venue Highlights"
        linkText="Browse all wedding venues"
        linkUrl="/wedding-venues"
        type="wedding-venue"
        theme="dark"
      />

      {/* Corporate Venue Highlights */}
      <HighlightsSection 
        subtitle="Corporate Elite"
        title="Corporate & Conference Picks"
        linkText="Browse all corporate venues"
        linkUrl="/corporate-event-venues"
        type="corporate-venue"
        theme="light"
      />

      {/* Vendor Highlights */}
      <HighlightsSection 
        subtitle="Top Rated"
        title="Featured Event Vendors"
        linkText="Browse all event vendors"
        linkUrl="/vendors"
        type="vendor"
        theme="dark"
      />

      {/* How It Works */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">How It Works</h2>
            <p className="text-soft-slate text-lg max-w-2xl mx-auto">Planning a corporate event has never been this simple.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gray-200 z-0"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-corporate-blue">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">1. Discover</h3>
              <p className="text-soft-slate max-w-xs">Browse our curated selection of premium venues and professional vendors.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-accent-orange">
                <MessageSquare size={40} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">2. Connect</h3>
              <p className="text-soft-slate max-w-xs">Send inquiries, request quotes, and communicate directly with partners.</p>
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white rounded-full border-4 border-gray-50 shadow-sm flex items-center justify-center mb-6 text-corporate-blue">
                <CalendarCheck size={40} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">3. Book & Host</h3>
              <p className="text-soft-slate max-w-xs">Secure your booking and host a memorable event for your team or clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-navy text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Trusted by Industry Leaders</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">See what event planners and corporate leaders are saying about Eventibe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 text-white/10" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-white mb-8 relative z-10 font-medium leading-relaxed">
                "Eventibe completely transformed how we organize our annual executive retreats. The quality of venues and seamless booking process saved us weeks of planning."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user1/100/100" alt="Sarah Jenkins" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-sm text-gray-400">VP of Operations, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 text-white/10" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-white mb-8 relative z-10 font-medium leading-relaxed">
                "Finding reliable AV and catering vendors in new cities used to be a nightmare. Now, we just use Eventibe and know we're getting top-tier professionals every time."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user2/100/100" alt="David Chen" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-white">David Chen</h4>
                  <p className="text-sm text-gray-400">Event Director, Global Media</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative">
              <Quote className="absolute top-6 right-6 text-white/10" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-white mb-8 relative z-10 font-medium leading-relaxed">
                "As a venue owner, partnering with Eventibe has significantly increased our corporate bookings. The platform connects us directly with serious, high-budget clients."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user3/100/100" alt="Elena Rodriguez" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-white">Elena Rodriguez</h4>
                  <p className="text-sm text-gray-400">General Manager, The Grand Hotel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-light-bg text-primary-navy relative overflow-hidden border-t border-gray-200">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-corporate-blue rounded-full blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent-orange rounded-full blur-3xl opacity-10"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-primary-navy">Ready to host an unforgettable event?</h2>
          <p className="text-xl text-soft-slate mb-10 max-w-2xl mx-auto">
            Join thousands of companies who trust Eventibe to find the perfect venue and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/venues" className="bg-cta-gradient text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
              Find a Venue
            </Link>
            <Link href="/list-your-venue" className="bg-white border text-primary-navy border-gray-200 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm">
              List Your Venue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
