"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Sparkles, Home as HomeIcon, Users } from 'lucide-react';
import PremiumLocationSelect from '@/components/ui/PremiumLocationSelect';
import PremiumSelect from '@/components/ui/PremiumSelect';
import PremiumDatePicker from '@/components/ui/PremiumDatePicker';

interface HeroSearchProps {
  venueTypes: any[];
  eventTypes: any[];
}

export default function HeroSearch({ venueTypes, eventTypes }: HeroSearchProps) {
  const router = useRouter();
  const [location, setLocation] = useState<any>(null);
  const [venueType, setVenueType] = useState<any>(null);
  const [eventType, setEventType] = useState<any>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState<any>(null);

  const eventOptions = eventTypes?.map((et: any) => ({ value: et.id, label: et.name })) || [];
  const venueOptions = venueTypes?.map((vt: any) => ({ value: vt.id, label: vt.name })) || [];
  const guestOptions = [
    { value: '100', label: '0-100' },
    { value: '300', label: '100-300' },
    { value: '600', label: '300-600' },
    { value: '601', label: '600+' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location?.value) {
      params.set('city', location.value.toString()); 
    }
    if (venueType?.value) params.set('venue_type', venueType.value.toString());
    if (eventType?.value) params.set('event_type', eventType.value.toString());
    
    if (date) {
        // format date properly like YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];
        params.set('date', formattedDate);
    }
    
    if (guests?.value) params.set('guests', guests.value.toString());
    
    // assuming eventibe has a /search page or /venues page for generic search
    router.push(`/venues${params.toString() ? '?' + params.toString() : ''}`);
  };

  return (
    <div className="relative w-full lg:max-w-6xl mx-auto z-40 animate-fade-in-up [animation-delay:600ms] mt-4 shadow-[0_30px_60px_rgba(0,0,0,0.25)] rounded-[31px] lg:rounded-full">
      <div className="bg-black/50 backdrop-blur-2xl border border-white/15 rounded-[31px] lg:rounded-full lg:bg-black/50 lg:backdrop-blur-xl lg:border-white/20 p-2 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center divide-y lg:divide-y-0 lg:divide-x divide-white/20">
          {/* Location */}
          <div className="flex-[1.5] py-2.5 lg:py-0 hover:bg-white/5 transition-colors group lg:rounded-l-[31px]">
            <PremiumLocationSelect
              value={location}
              onChange={setLocation}
              className="w-full"
              containerClassName="px-4 lg:px-5 py-1.5 lg:py-0"
              variant="glass"
            />
          </div>

          {/* Event Type */}
          <PremiumSelect
            label="Event Type"
            icon={<Sparkles className="w-5 h-5 text-accent-orange" />}
            options={eventOptions}
            value={eventType}
            onChange={setEventType}
            placeholder="Any Event"
            className="flex-1 hover:bg-white/5 transition-colors group"
            containerClassName="px-4 lg:px-4 py-2.5 lg:py-2"
            variant="glass"
          />

          {/* Venue Type */}
          <PremiumSelect
            label="Venue Type"
            icon={<HomeIcon className="w-5 h-5 text-accent-orange" />}
            options={venueOptions}
            value={venueType}
            onChange={setVenueType}
            placeholder="Any Type"
            className="flex-1 hover:bg-white/5 transition-colors group"
            containerClassName="px-4 lg:px-4 py-2.5 lg:py-2"
            variant="glass"
          />

          {/* Date */}
          <div className="flex-1 flex items-center hover:bg-white/5 transition-colors group relative">
            <PremiumDatePicker
              selected={date}
              onChange={(d: Date | null) => setDate(d)}
              placeholder="Select Date"
              label="Date"
              containerClassName="px-4 lg:px-4 py-2.5 lg:py-2"
              variant="glass"
            />
          </div>

          {/* Guests */}
          <PremiumSelect
            label="Guests"
            icon={<Users className="w-5 h-5 text-accent-orange" />}
            options={guestOptions}
            value={guests}
            onChange={setGuests}
            placeholder="Guest Count"
            className="flex-1 hover:bg-white/5 transition-colors group"
            containerClassName="px-4 lg:px-4 py-2.5 lg:py-2"
            variant="glass"
          />

          {/* Search Button */}
          <div className="p-2 lg:p-1.5 lg:pl-2">
            <button 
              onClick={handleSearch}
              className="w-full lg:w-[60px] lg:h-[60px] bg-cta-gradient hover:opacity-90 text-white rounded-2xl lg:rounded-full px-8 lg:px-0 py-3 lg:py-0 flex items-center justify-center gap-2 font-bold transition-all duration-300 hover:scale-[1.01] lg:hover:scale-110 active:scale-95 shadow-lg shadow-orange-500/20 group/btn"
            >
              <Search className="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-500 group-hover/btn:rotate-12" strokeWidth={3} />
              <span className="lg:hidden tracking-tight font-bold">Find Spaces</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
