import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'Blog | Eventibe',
  description: 'Insights, trends, and tips for corporate event planning.',
};

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Hybrid Corporate Events in 2025',
    excerpt: 'Discover how technology is bridging the gap between in-person and virtual attendees for more engaging corporate gatherings.',
    date: 'Oct 15, 2025',
    author: 'Sarah Jenkins',
    image: 'https://picsum.photos/seed/blog1/800/600',
    slug: 'future-of-hybrid-corporate-events-2025'
  },
  {
    id: 2,
    title: 'Top 10 Team Building Activities for Executive Offsites',
    excerpt: 'Move beyond trust falls. Here are 10 meaningful activities that actually build stronger leadership teams.',
    date: 'Sep 28, 2025',
    author: 'Michael Chen',
    image: 'https://picsum.photos/seed/blog2/800/600',
    slug: 'top-10-team-building-activities-executive-offsites'
  },
  {
    id: 3,
    title: 'How to Choose the Perfect Conference Venue',
    excerpt: 'A comprehensive checklist for event planners to ensure your next conference venue meets all technical and logistical requirements.',
    date: 'Sep 12, 2025',
    author: 'Priya Patel',
    image: 'https://picsum.photos/seed/blog3/800/600',
    slug: 'how-to-choose-perfect-conference-venue'
  }
];

export default function BlogPage() {
  return (
    <div className="bg-light-bg min-h-screen py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-primary-navy mb-4 tracking-tight">Eventibe Insights</h1>
          <p className="text-lg text-soft-slate">
            Expert advice, industry trends, and practical tips for planning successful corporate events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full">
              <div className="relative h-56 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-soft-slate mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-corporate-blue" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={14} className="text-corporate-blue" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-primary-navy mb-3 line-clamp-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-corporate-blue transition-colors">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-soft-slate text-sm mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link href={`/blog/${post.slug}`} className="text-corporate-blue font-semibold text-sm hover:text-mid-blue transition-colors flex items-center gap-1">
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
