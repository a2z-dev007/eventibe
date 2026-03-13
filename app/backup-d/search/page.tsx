import { Metadata } from 'next'
import VenueSearchClient from './VenueSearchClient'

export const metadata: Metadata = {
  title: 'Search Event Venues | Spodia',
  description: 'Compare verified banquet halls, lawns, resorts, and corporate venues. Filter by location, capacity, price, and event type to book with confidence.',
}

import { Suspense } from 'react'

export default function VenueSearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 animate-pulse" />}>
      <VenueSearchClient />
    </Suspense>
  )
}
