import Link from 'next/link';
import Image from 'next/image';
import { getVenues, getVendors, fetchVenueTypes, fetchEventTypes } from '@/lib/api';
import VenueCard from '@/components/VenueCard';
import VendorCard from '@/components/VendorCard';
import HeroSearch from '@/components/HeroSearch';
import { Search, Building2, Users, CheckCircle2, CalendarCheck, MessageSquare, Star, Quote, ShieldCheck, TrendingUp } from 'lucide-react';

export default async function Home() {
  const venues = await getVenues();
  const vendors = await getVendors();
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

      {/* Corporate Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">Why Choose Eventibe?</h2>
            <p className="text-soft-slate text-lg max-w-2xl mx-auto">The smart way to plan, book, and execute corporate events of any scale.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-corporate-blue/10 rounded-full flex items-center justify-center mb-6 text-corporate-blue">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">Vetted Partners</h3>
              <p className="text-soft-slate">Every venue and vendor on our platform is strictly vetted for corporate standards and reliability.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-accent-orange/10 rounded-full flex items-center justify-center mb-6 text-accent-orange">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">Cost Efficient</h3>
              <p className="text-soft-slate">Get transparent pricing and exclusive corporate rates without hidden fees or middlemen markups.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-corporate-blue/10 rounded-full flex items-center justify-center mb-6 text-corporate-blue">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary-navy mb-3">End-to-End Support</h3>
              <p className="text-soft-slate">From initial search to final execution, our dedicated support team ensures your event is flawless.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Corporate Venues */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">Featured Corporate Venues</h2>
              <p className="text-soft-slate text-lg">Professional spaces for meetings, conferences, and offsites.</p>
            </div>
            <Link href="/corporate-event-venues" className="hidden md:inline-flex text-corporate-blue font-semibold hover:text-mid-blue transition-colors items-center gap-1">
              View All Corporate Venues &rarr;
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venues.filter(v => v.type === 'corporate-event-venues' || v.type === 'resorts').slice(0, 3).map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/corporate-event-venues" className="inline-flex text-corporate-blue font-semibold hover:text-mid-blue transition-colors items-center gap-1">
              View All Corporate Venues &rarr;
            </Link>
          </div>
        </div>
      </section>

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

      {/* Top Vendor Categories */}
      <section className="py-20 bg-light-bg border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">Premium Event Services</h2>
            <p className="text-soft-slate text-lg max-w-2xl mx-auto">Everything you need to execute a flawless corporate event, from AV to catering.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.slice(0, 3).map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/vendors" className="inline-flex items-center justify-center px-8 py-3 border-2 border-corporate-blue text-corporate-blue font-bold rounded-xl hover:bg-corporate-blue hover:text-white transition-colors">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-4 tracking-tight">Trusted by Industry Leaders</h2>
            <p className="text-soft-slate text-lg max-w-2xl mx-auto">See what event planners and corporate leaders are saying about Eventibe.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-200" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-primary-navy mb-8 relative z-10 font-medium leading-relaxed">
                "Eventibe completely transformed how we organize our annual executive retreats. The quality of venues and seamless booking process saved us weeks of planning."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user1/100/100" alt="Sarah Jenkins" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy">Sarah Jenkins</h4>
                  <p className="text-sm text-soft-slate">VP of Operations, TechCorp</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-200" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-primary-navy mb-8 relative z-10 font-medium leading-relaxed">
                "Finding reliable AV and catering vendors in new cities used to be a nightmare. Now, we just use Eventibe and know we're getting top-tier professionals every time."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user2/100/100" alt="David Chen" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy">David Chen</h4>
                  <p className="text-sm text-soft-slate">Event Director, Global Media</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 relative">
              <Quote className="absolute top-6 right-6 text-gray-200" size={48} />
              <div className="flex gap-1 text-accent-orange mb-6">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-primary-navy mb-8 relative z-10 font-medium leading-relaxed">
                "As a venue owner, partnering with Eventibe has significantly increased our corporate bookings. The platform connects us directly with serious, high-budget clients."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden relative">
                  <Image src="https://picsum.photos/seed/user3/100/100" alt="Elena Rodriguez" fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h4 className="font-bold text-primary-navy">Elena Rodriguez</h4>
                  <p className="text-sm text-soft-slate">General Manager, The Grand Hotel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-corporate-blue rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-accent-orange rounded-full blur-3xl opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Ready to host an unforgettable event?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of companies who trust Eventibe to find the perfect venue and services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/venues" className="bg-cta-gradient text-white px-8 py-4 rounded-xl font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
              Find a Venue
            </Link>
            <Link href="/list-your-venue" className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors">
              List Your Venue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
