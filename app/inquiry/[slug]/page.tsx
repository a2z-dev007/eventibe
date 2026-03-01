import { getVenueBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);
  
  if (!venue) return { title: 'Not Found' };
  
  return {
    title: `Inquire: ${venue.name} | Eventibe`,
  };
}

export default async function VenueInquiryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = await getVenueBySlug(slug);

  if (!venue) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <Link href={`/venue/${venue.slug}`} className="inline-flex items-center gap-2 text-corporate-blue hover:text-primary-navy transition-colors mb-8 font-medium">
          <ArrowLeft size={16} />
          Back to Venue
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="mb-8 border-b border-gray-100 pb-8">
            <h1 className="text-3xl font-bold text-primary-navy mb-2">Request a Quote</h1>
            <p className="text-soft-slate">You are inquiring about <span className="font-semibold text-primary-navy">{venue.name}</span> in {venue.city}.</p>
          </div>

          <form className="space-y-6">
            <input type="hidden" name="source" value="Eventibe" />
            <input type="hidden" name="type" value="Corporate" />
            <input type="hidden" name="venue_slug" value={venue.slug} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Full Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Company Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Work Email</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Phone Number</label>
                <input type="tel" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Event Type</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required>
                  <option value="">Select Type</option>
                  <option value="conference">Conference</option>
                  <option value="meeting">Meeting</option>
                  <option value="training">Training</option>
                  <option value="party">Corporate Party</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Attendees</label>
                <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Event Date</label>
                <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none text-soft-slate" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-navy mb-2">Estimated Budget (Optional)</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" placeholder="e.g. ₹50,000" />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-navy mb-2">Additional Requirements</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none resize-none" placeholder="Tell us about seating arrangements, AV needs, catering, etc."></textarea>
            </div>

            <button type="button" className="w-full bg-cta-gradient text-white font-bold rounded-xl px-4 py-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30 text-lg">
              Submit Inquiry
            </button>
            <p className="text-center text-sm text-soft-slate mt-4">
              The venue&apos;s event team will contact you shortly with a quote.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
