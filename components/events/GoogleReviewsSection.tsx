'use client'

import { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import Stars from './Stars'
import { getInternalReviews } from '@/services/api'

interface ReviewRecord {
  id: number
  name: string
  rating: number
  review_text: string
  applicable_for: string
  show_on_homepage: boolean
  created_at: string
  updated_at: string
}

export default function GoogleReviewsSection() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getInternalReviews({
          show_on_homepage: true,
          applicable_for: 'venue'
        })
        if (response.data?.status === 'success') {
          setReviews(response.data.records)
        }
      } catch (error) {
        console.error('Failed to fetch reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  const getInitials = (name: string) => {
    if (!name) return 'S'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString)
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date)
    } catch (e) {
      return ''
    }
  }

  if (loading) {
    return (
      <section className="py-24 bg-gray-50/50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative text-center">
          <p className="text-gray-500 animate-pulse">Loading reviews...</p>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) return null

  return (
    <section className="py-24 bg-gray-50/50 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none inter-grid" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <SectionHeader
            eyebrow="Real Stories"
            title="Trusted by Event Hosts"
            subtitle="Read what our satisfied clients and professional planners have to say about their experience with Spodia."
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-6 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-2 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-sm font-black text-[#FF9530] group-hover:bg-[#FF9530] group-hover:text-white transition-all duration-500 shadow-sm">
                  {getInitials(r.name)}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-extrabold text-gray-900 truncate tracking-tight">{r.name}</h4>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Host</p>
                </div>
              </div>
              
              <div className="mb-4">
                <Stars count={r.rating} />
              </div>

              <p className="text-gray-600 text-sm leading-relaxed font-medium mb-6 flex-grow">
                "{r.review_text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{formatDate(r.created_at)}</span>
                <div className="w-4 h-4 text-gray-200">
                  <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01701C7.91244 16 7.01701 16.8954 7.01701 18V21H5.01701V18C5.01701 15.7909 6.80787 14 9.01701 14H12.017C14.2261 14 16.017 15.7909 16.017 18V21H14.017Z" /><path d="M12.017 12C13.6739 12 15.017 10.6569 15.017 9C15.017 7.34315 13.6739 6 12.017 6C10.3602 6 9.01701 7.34315 9.01701 9C9.01701 10.6569 10.3602 12 12.017 12Z" /></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .inter-grid {
          background-image: radial-gradient(#FF9530 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
      `}</style>
    </section>
  )
}
