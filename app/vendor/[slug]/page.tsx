import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getVendorBySlug } from '@/lib/api';
import { MapPin, Star, CheckCircle2, Briefcase } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);
  if (!vendor) return { title: 'Vendor Not Found' };
  
  return {
    title: `${vendor.name} | Eventibe`,
    description: vendor.description,
  };
}

export default async function VendorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vendor = await getVendorBySlug(slug);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen pb-20">
      {/* Hero Image Gallery */}
      <div className="relative h-[40vh] md:h-[60vh] w-full bg-primary-navy">
        <Image
          src={vendor.images[0] || 'https://picsum.photos/seed/placeholder/1920/1080'}
          alt={vendor.name}
          fill
          className="object-cover opacity-80"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-sm font-medium mb-4">
              <Briefcase size={16} />
              <span className="uppercase tracking-wider">{vendor.category.replace('-', ' ')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
              {vendor.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-accent-orange" />
                <span className="capitalize text-lg">{vendor.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={18} className="text-accent-orange fill-accent-orange" />
                <span className="text-lg font-medium">{vendor.rating || '4.5'}</span>
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
                <p className="text-soft-slate text-sm font-medium mb-1 uppercase tracking-wider">Starting Price</p>
                <div className="text-2xl font-bold text-primary-navy">
                  {vendor.price_range || 'Custom Quotes'}
                </div>
              </div>
            </div>

            {/* About */}
            <section>
              <h2 className="text-2xl font-bold text-primary-navy mb-6 tracking-tight">About {vendor.name}</h2>
              <p className="text-lg text-soft-slate leading-relaxed">
                {vendor.description}
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-2xl font-bold text-primary-navy mb-6 tracking-tight">Services Offered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vendor.services.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 text-soft-slate bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <CheckCircle2 size={20} className="text-corporate-blue shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-navy mb-2">Request Quote</h3>
              <p className="text-soft-slate mb-8">Contact {vendor.name} to discuss your event requirements.</p>
              
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
                  <label className="block text-sm font-medium text-primary-navy mb-1">Message</label>
                  <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors text-soft-slate resize-none" placeholder="Tell us about your event..."></textarea>
                </div>
                <button type="button" className="w-full bg-cta-gradient text-white font-bold rounded-xl px-4 py-4 mt-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
