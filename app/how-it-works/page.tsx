export const metadata = {
  title: 'How It Works | Eventibe',
  description: 'Learn how Eventibe simplifies corporate event planning.',
};

export default function HowItWorksPage() {
  return (
    <div className="bg-light-bg min-h-screen py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6 text-center tracking-tight">How It Works</h1>
        <p className="text-xl text-soft-slate text-center mb-16 max-w-2xl mx-auto">
          Whether you&apos;re planning an event, managing a venue, or providing event services, Eventibe simplifies the entire process.
        </p>
        
        <div className="space-y-24">
          {/* For Event Hosts Section */}
          <section>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-primary-navy mb-4 inline-block relative">
                For Event Hosts
                <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-corporate-blue rounded-full"></div>
              </h2>
              <p className="text-soft-slate text-lg max-w-3xl mx-auto">Your journey to the perfect event starts here. Follow these simple steps.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Search & Discover', desc: 'Browse our curated selection of premium wedding & corporate venues and top vendors. Filter by your specific needs.' },
                { step: '2', title: 'Compare Options', desc: 'Review detailed profiles, high-quality images, capacity charts, and compare them side-by-side.' },
                { step: '3', title: 'Send Inquiries', desc: 'Fill out a single inquiry form with your event details to request quotes and check availability.' },
                { step: '4', title: 'Book Securely', desc: 'Finalize your bookings securely and focus on delivering an outstanding event experience.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-corporate-blue/10 text-corporate-blue rounded-full flex items-center justify-center text-xl font-bold mb-4 group-hover:bg-corporate-blue group-hover:text-white transition-colors">{item.step}</div>
                  <h3 className="text-xl font-bold text-primary-navy mb-3">{item.title}</h3>
                  <p className="text-soft-slate">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* For Venues Section */}
          <section>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-primary-navy mb-4 inline-block relative">
                For Venues
                <div className="absolute -bottom-2 right-0 w-1/2 h-1 bg-accent-orange rounded-full"></div>
              </h2>
              <p className="text-soft-slate text-lg max-w-3xl mx-auto">Maximize your bookings and streamline your lead management.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Create Your Profile', desc: 'Sign up and list your venue with high-quality photos, detailed amenities, capacity info, and pricing structure.' },
                { title: 'Receive Qualified Leads', desc: 'Get direct inquiries from event hosts who have already reviewed your profile and match your target audience.' },
                { title: 'Manage & Convert', desc: 'Use our dashboard to respond to inquiries, send custom proposals, and easily convert leads into confirmed bookings.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-primary-navy mb-3">{idx + 1}. {item.title}</h3>
                  <p className="text-soft-slate">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* For Vendors Section */}
          <section>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold text-primary-navy mb-4 inline-block relative">
                For Vendors
                <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-green-500 rounded-full"></div>
              </h2>
              <p className="text-soft-slate text-lg max-w-3xl mx-auto">Grow your event service business by connecting with the right clients.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Showcase Services', desc: 'List your catering, photography, decor, or planning services with portfolio items and service packages.' },
                { title: 'Direct Inquiries', desc: 'Receive detailed event requirements directly from hosts planning weddings and corporate events.' },
                { title: 'Grow Business', desc: 'Build your reputation through our platform, get verified reviews, and secure consistent event bookings.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <h3 className="text-xl font-bold text-primary-navy mb-3">{idx + 1}. {item.title}</h3>
                  <p className="text-soft-slate">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
