import { Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Eventibe',
  description: 'Get in touch with the Eventibe team for support, partnerships, or inquiries.',
};

export default function ContactUsPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-navy mb-6 tracking-tight">Contact Us</h1>
            <p className="text-xl text-soft-slate">
              We&apos;re here to help you plan your next corporate event.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="bg-corporate-blue/10 p-4 rounded-full">
                  <Mail className="text-corporate-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">Email Us</h3>
                  <p className="text-soft-slate mb-1">For general inquiries:</p>
                  <a href="mailto:hello@eventibe.com" className="text-corporate-blue font-medium hover:underline">hello@eventibe.com</a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="bg-corporate-blue/10 p-4 rounded-full">
                  <Phone className="text-corporate-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">Call Us</h3>
                  <p className="text-soft-slate mb-1">Mon-Fri from 9am to 6pm IST</p>
                  <a href="tel:+919876543210" className="text-corporate-blue font-medium hover:underline">+91 98765 43210</a>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex items-start gap-6">
                <div className="bg-corporate-blue/10 p-4 rounded-full">
                  <MapPin className="text-corporate-blue" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary-navy mb-2">Headquarters</h3>
                  <p className="text-soft-slate leading-relaxed">
                    123 Eventibe Tower, Cyber City<br />
                    Gurugram, Haryana 122002<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-primary-navy mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">First Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-navy mb-2">Last Name</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-2">Work Email</label>
                  <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors" placeholder="john@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-2">Subject</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors text-primary-navy">
                    <option value="general">General Inquiry</option>
                    <option value="support">Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="billing">Billing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-navy mb-2">Message</label>
                  <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-corporate-blue focus:border-corporate-blue outline-none transition-colors text-soft-slate resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="button" className="w-full bg-cta-gradient text-white font-bold rounded-xl px-4 py-4 hover:scale-[1.02] transition-transform shadow-lg shadow-orange-500/30">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
