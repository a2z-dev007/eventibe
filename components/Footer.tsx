import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold tracking-tight text-white">
                Eventibe<span className="text-accent-orange">.</span>
              </span>
            </Link>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Find. Book. Celebrate. The premier corporate venue & event service marketplace.
            </p>
            <ul className="space-y-3">
              <li>
                <Link href="/about-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/partner-with-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider">Venues</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/wedding-venues" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Wedding Venues
                </Link>
              </li>
              <li>
                <Link href="/corporate-event-venues" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Corporate Venues
                </Link>
              </li>
              <li>
                <Link href="/banquet-halls" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Banquet Halls
                </Link>
              </li>
              <li>
                <Link href="/resorts" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Resorts
                </Link>
              </li>
              <li>
                <Link href="/farmhouses" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Farmhouses
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider">Vendors</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/vendors/catering" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Catering
                </Link>
              </li>
              <li>
                <Link href="/vendors/photography" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link href="/vendors/mehndi" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Mehndi
                </Link>
              </li>
              <li>
                <Link href="/vendors/decor" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Decor
                </Link>
              </li>
              <li>
                <Link href="/vendors/lighting" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Lighting
                </Link>
              </li>
              <li>
                <Link href="/vendors/event-planners" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Event Planners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white uppercase tracking-wider">Support</h4>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/contact-us" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider">Newsletter</h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-corporate-blue/30 border border-corporate-blue/50 text-white text-sm rounded-lg focus:ring-accent-orange focus:border-accent-orange block w-full p-2.5 placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-accent-orange hover:bg-orange-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-corporate-blue/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Eventibe. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={20} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
