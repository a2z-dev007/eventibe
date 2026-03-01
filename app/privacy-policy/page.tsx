export const metadata = {
  title: 'Privacy Policy | Eventibe',
  description: 'Privacy policy for the Eventibe platform.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-primary-navy mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none text-soft-slate">
          <p className="mb-4">Last updated: October 2025</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">1. Information We Collect</h2>
          <p className="mb-4">We collect information you provide directly to us when you fill out an inquiry form, create an account, or contact us for support. This may include your name, email address, phone number, company name, and event details.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">2. How We Use Your Information</h2>
          <p className="mb-4">We use the information we collect to facilitate your inquiries with venues and vendors, improve our platform, and communicate with you about our services.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">3. Sharing of Information</h2>
          <p className="mb-4">When you submit an inquiry for a specific venue or service, we share your contact information and event details with that specific vendor so they can respond to your request.</p>
          
          <h2 className="text-2xl font-bold text-primary-navy mt-8 mb-4">4. Data Security</h2>
          <p className="mb-4">We implement appropriate technical and organizational measures to protect the security of your personal information.</p>
        </div>
      </div>
    </div>
  );
}
