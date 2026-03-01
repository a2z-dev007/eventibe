import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getVenueBySlug, getVenues } from '@/lib/api';
import { MapPin, Users, Wifi, Star, CheckCircle2, Building2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  if (!venue) return { title: 'Venue Not Found' };
  
  return {
    title: `${venue.name} | Eventibe`,
    description: venue.description,
  };
}

export default async function VenueDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  const similarVenues = await getVenues({ city: venue.city });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: venue.name,
    description: venue.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: venue.city,
      addressCountry: 'IN'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviews
    }
  };

  return (
    <div className="bg-light-bg min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Image Gallery */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-primary-navy">
        <Image
          src={venue.images[0] || 'https://picsum.photos/seed/placeholder/1920/1080'}
          alt={venue.name}
          fill
          className="object-cover opacity-80"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium mb-4">
              <Building2 size={16} />
              <span className="capitalize">{venue.type.replace('-', ' ')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {venue.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-accent-orange" />
                <span className="capitalize text-lg">{venue.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-accent-orange fill-accent-orange" />
                <span className="text-lg font-medium">{venue.rating || '4.5'} ({venue.reviews || 0} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-wrap gap-8 justify-between items-center">
              <div>
                <p className="text-soft-slate text-sm font-medium mb-1 uppercase tracking-wider">Max Capacity</p>
                <div className="flex items-center gap-2 text-2xl font-bold text-primary-navy">
                  <Users size={24} className="text-corporate-blue" />
                  {venue.capacity} Pax
                </div>
              </div>
              <div className="w-px h-12 bg-gray-200 hidden md:block"></div>
              <div>
                <p className="text-soft-slate text-sm font-medium mb-1 uppercase tracking-wider">Price Range</p>
                <div className="text-2xl font-bold text-primary-navy">
                  {venue.price_range}
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-primary-navy mb-6 tracking-tight">About this venue</h2>
              <p className="text-lg text-soft-slate leading-relaxed">
                {venue.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold text-primary-navy mb-6 tracking-tight">Facilities & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {venue.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-soft-slate bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle2 size={20} className="text-corporate-blue shrink-0" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-navy mb-2">Interested?</h3>
              <p className="text-soft-slate mb-8">Send an inquiry to get a custom quote and check availability.</p>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-1">Full Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-1">Company Name</label>
                  <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="Acme Corp" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-1">Work Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="john@acme.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-1">Event Date</label>
                  <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors text-soft-slate" />
                </div>
                <button type="button" className="w-full bg-cta-gradient text-white font-bold rounded-xl px-4 py-4 mt-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
                  Send Inquiry
                </button>
              </form>
              <p className="text-xs text-center text-gray-400 mt-4">
                By sending an inquiry, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
