import { Metadata } from 'next'
import EventVenuesClient from './EventVenuesClient'

export const metadata: Metadata = {
  title: 'Spodia Events | Find Your Perfect Event Venue',
  description: 'Book standout venues for weddings, parties, and corporate events. Compare verified spaces, transparent pricing, and real photos.',
}

import { Suspense } from 'react'

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EventVenuesClient />
    </Suspense>
  )
}
