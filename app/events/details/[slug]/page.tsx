import { Metadata } from 'next'
import EventDetailsClient from './EventDetailsClient'

export const metadata: Metadata = {
  title: 'Event Venue Details | Spodia',
  description: 'Full venue details — pricing, capacity, photos, reviews, FAQs and booking for your perfect event.',
}

import { Suspense } from 'react'

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <EventDetailsClient />
    </Suspense>
  )
}
