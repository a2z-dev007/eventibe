import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | Eventibe',
  description: 'Learn more about Eventibe, the premier corporate venue and event service marketplace.',
};

export default function AboutUsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6 tracking-tight">About Eventibe</h1>
            <p className="text-xl text-soft-slate">
              We are transforming how companies discover, book, and manage corporate events.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 mb-16">
            <h2 className="text-3xl font-bold text-primary-navy mb-6">Our Mission</h2>
            <p className="text-lg text-soft-slate leading-relaxed mb-6">
              Eventibe was founded with a single goal: to simplify the complex process of organizing corporate events. We believe that finding the perfect venue and the right vendors shouldn&apos;t be a logistical nightmare.
            </p>
            <p className="text-lg text-soft-slate leading-relaxed">
              By bringing together premium venues, top-tier service providers, and corporate event planners onto a single, intuitive platform, we are building the future of enterprise event management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-primary-navy text-white rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-4">For Companies</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Save time and resources by browsing curated venues and vetted vendors. Send inquiries, compare quotes, and book with confidence.
              </p>
              <Link href="/corporate-event-venues" className="inline-flex text-accent-orange font-semibold hover:text-orange-400 transition-colors items-center gap-1">
                Explore Venues &rarr;
              </Link>
            </div>
            <div className="bg-corporate-blue text-white rounded-3xl p-8 md:p-10">
              <h3 className="text-2xl font-bold mb-4">For Partners</h3>
              <p className="text-gray-200 leading-relaxed mb-6">
                Showcase your venue or services to thousands of corporate clients actively looking to host their next big event.
              </p>
              <Link href="/partner-with-us" className="inline-flex text-white font-semibold hover:text-gray-200 transition-colors items-center gap-1 underline underline-offset-4">
                Partner With Us &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
