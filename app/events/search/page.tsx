import { Metadata } from 'next'
import VenueSearchClient from './VenueSearchClient'

export const metadata: Metadata = {
  title: 'Search Event Venues | Eventibe',
  description: 'Search and compare event venues. Filter by location, venue type, event type, capacity and more.',
}

export default function VenueSearchPage() {
  return (
    <div className="min-h-screen bg-white">
      <VenueSearchClient />
    </div>
  )
}
