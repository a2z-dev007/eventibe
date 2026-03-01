export const metadata = {
  title: 'Terms and Conditions | Eventibe',
  description: 'Terms and conditions for using the Eventibe platform.',
};

export default function TermsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-primary-navy mb-8">Terms and Conditions</h1>
        
        <div className="prose prose-slate max-w-none text-soft-slate">
          <p className="mb-4">Last updated: October 2025</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">1. Introduction</h2>
          <p className="mb-4">Welcome to Eventibe. These terms and conditions outline the rules and regulations for the use of Eventibe&apos;s Website, located at eventibe.com.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">2. Platform Role</h2>
          <p className="mb-4">Eventibe acts as a marketplace connecting corporate event organizers with venues and service providers. We do not own or manage any of the venues or services listed on our platform.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">3. Inquiries and Bookings</h2>
          <p className="mb-4">Any inquiries made through Eventibe are sent directly to the respective venue or vendor. Eventibe is not responsible for the fulfillment of any bookings, contracts, or agreements made between the user and the vendor.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">4. Accuracy of Information</h2>
          <p className="mb-4">While we strive to ensure that the information provided by venues and vendors is accurate, we do not guarantee the completeness or accuracy of the listings. Users are advised to verify all details directly with the vendor before making a booking.</p>
        </div>
      </div>
    </div>
  );
}
