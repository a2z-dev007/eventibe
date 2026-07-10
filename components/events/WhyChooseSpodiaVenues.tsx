'use client'

import { Award, Shield, Clock, Heart, Star, Headphones } from 'lucide-react'

const reasons = [
  { icon: Award, title: 'Verified Venues', desc: 'All venues are quality checked' },
  { icon: Shield, title: 'Secure Booking', desc: 'Safe & trusted payments' },
  { icon: Clock, title: 'Instant Confirmation', desc: 'Quick booking confirmation' },
  { icon: Heart, title: 'Best Prices', desc: 'Competitive pricing guaranteed' },
  { icon: Star, title: '5-Star Service', desc: 'Premium customer support' },
  { icon: Headphones, title: '24/7 Support', desc: 'Round-the-clock assistance' },
]

export default function WhyChooseSpodiaVenues() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Why Choose <span className="text-[#FF9530]">Eventibe</span> Event Venues?
          </h2>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            6 Reasons to Choose Event Venues from Eventibe
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {reasons.map((item, idx) => (
            <div key={idx} className="group text-center p-6 rounded-[2rem] hover:bg-[#F8FAFC] transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FF9530]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <item.icon className="w-8 h-8 text-[#FF9530]" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
