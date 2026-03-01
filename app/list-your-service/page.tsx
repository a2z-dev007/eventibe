export const metadata = {
  title: 'List Your Service | Eventibe',
  description: 'Showcase your corporate event services to a targeted audience of event planners.',
};

export default function ListYourServicePage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-navy mb-4">List Your Service</h1>
          <p className="text-xl text-soft-slate">Connect with corporate clients looking for premium event services.</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Company Name</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Service Category</label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required>
                  <option value="">Select Category</option>
                  <option value="catering">Catering</option>
                  <option value="av">AV Services</option>
                  <option value="production">Event Production</option>
                  <option value="planning">Event Planning</option>
                  <option value="photography">Photography</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Contact Person</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-navy mb-2">Work Email</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-navy mb-2">City/Operating Area</label>
              <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-navy mb-2">Service Description</label>
              <textarea rows={4} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue outline-none resize-none" placeholder="Describe your services and past corporate experience..."></textarea>
            </div>

            <button type="button" className="w-full bg-cta-gradient text-white font-bold rounded-xl px-4 py-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
              Submit Service Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
