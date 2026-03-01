export const metadata = {
  title: 'Partner With Us | Eventibe',
  description: 'Explore partnership opportunities with Eventibe.',
};

export default function PartnerWithUsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4">Partner With Us</h1>
          <p className="text-xl text-soft-slate">Join the leading corporate event marketplace and grow your business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-navy mb-4">Venue Partners</h3>
            <p className="text-soft-slate mb-6">Maximize your venue&apos;s occupancy by connecting with corporate clients looking for conference halls, meeting rooms, and retreat spaces.</p>
            <ul className="space-y-3 text-soft-slate mb-8">
              <li className="flex items-center gap-2">✓ Dedicated venue profile</li>
              <li className="flex items-center gap-2">✓ Direct corporate inquiries</li>
              <li className="flex items-center gap-2">✓ Marketing support</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-navy mb-4">Service Partners</h3>
            <p className="text-soft-slate mb-6">Showcase your catering, AV, or event planning services to businesses organizing high-budget corporate events.</p>
            <ul className="space-y-3 text-soft-slate mb-8">
              <li className="flex items-center gap-2">✓ Highlight past corporate work</li>
              <li className="flex items-center gap-2">✓ Receive qualified leads</li>
              <li className="flex items-center gap-2">✓ Build industry connections</li>
            </ul>
          </div>
        </div>

        <div className="bg-primary-navy text-white rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">Contact our partnerships team to discuss how we can work together to deliver exceptional corporate events.</p>
          <a href="mailto:partnerships@eventibe.com" className="inline-block bg-cta-gradient text-white font-bold rounded-xl px-8 py-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
            Email Partnerships Team
          </a>
        </div>
      </div>
    </div>
  );
}
