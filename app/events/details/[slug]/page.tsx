import { Metadata } from 'next'
import EventDetailsClient from './EventDetailsClient'
import { fetchVenueBySlug } from '@/lib/api/eventsEndpoints'
import { Suspense } from 'react'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params
    const data = await fetchVenueBySlug(slug)
    const venue = data?.records?.[0]
    
    if (!venue) {
      return {
        title: 'Venue Not Found | Eventibe',
        description: 'The requested event venue could not be found.'
      }
    }

    const title = venue.meta_title || `${venue.name} | Eventibe`
    const description = venue.meta_description || (venue.description ? venue.description.replace(/<[^>]*>?/gm, '').slice(0, 160) : 'Full venue details — pricing, capacity, photos, reviews, FAQs and booking for your perfect event.')
    const keywords = venue.meta_keywords || `${venue.name}, ${venue.city_name}`
    const mainImage = venue.images?.find(img => img.cover_photo)?.file || venue.images?.[0]?.file || '/assets/spodia-og-banner.jpg'

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        url: `https://www.eventibe.com/events/details/${slug}`,
        siteName: 'Eventibe',
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
            alt: venue.name,
          },
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [mainImage],
      },
      alternates: {
        canonical: `https://www.eventibe.com/events/details/${slug}`,
      },
      other: {
        'venue-id': String(venue.id),
        'venue-city': venue.city_name || '',
      }
    }
  } catch (error) {
    console.error('Metadata generation error:', error)
    return {
      title: 'Event Venue Details | Eventibe',
      description: 'Explore premium event venues on Eventibe.'
    }
  }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let venue = null
  try {
    const data = await fetchVenueBySlug(slug)
    venue = data?.records?.[0]
  } catch (error) {
    console.error('Data fetch for schema error:', error)
  }

  const jsonLd = venue ? {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    "name": venue.name,
    "description": venue.meta_description || venue.description?.replace(/<[^>]*>?/gm, '').slice(0, 160),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": venue.address,
      "addressLocality": venue.city_name,
      "addressRegion": venue.state_name,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": venue.lat,
      "longitude": venue.lon
    },
    "image": venue.images?.map(img => img.file) || [],
    "url": `https://www.eventibe.com/events/details/${slug}`
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <EventDetailsClient />
      </Suspense>
    </>
  )
}
