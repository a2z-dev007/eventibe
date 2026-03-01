import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Future of Hybrid Corporate Events in 2025',
    content: `
      <p class="mb-4">As we move further into 2025, the corporate event landscape continues to evolve. The hybrid model—combining in-person and virtual elements—is no longer just a fallback option; it's the standard.</p>
      <h3 class="text-2xl font-bold text-primary-navy mt-8 mb-4">Why Hybrid is Here to Stay</h3>
      <p class="mb-4">Companies have realized the immense benefits of hybrid events. They offer unparalleled reach, allowing global teams and international clients to participate without the constraints of travel. Moreover, they provide valuable data analytics on attendee engagement that purely physical events struggle to capture.</p>
      <h3 class="text-2xl font-bold text-primary-navy mt-8 mb-4">Key Technologies Driving the Change</h3>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li><strong>Advanced AV Integration:</strong> Seamless streaming requires robust audiovisual setups that ensure remote participants feel as involved as those in the room.</li>
        <li><strong>Interactive Platforms:</strong> Tools that allow real-time Q&A, live polling, and virtual networking lounges are essential.</li>
        <li><strong>AI-Powered Networking:</strong> Algorithms that match in-person and virtual attendees based on shared interests to foster meaningful connections.</li>
      </ul>
      <p class="mb-4">When planning your next corporate event, consider how you can leverage these technologies to create an inclusive and engaging experience for all attendees, regardless of their physical location.</p>
    `,
    date: 'Oct 15, 2025',
    author: 'Sarah Jenkins',
    image: 'https://picsum.photos/seed/blog1/1920/1080',
    slug: 'future-of-hybrid-corporate-events-2025'
  },
  {
    id: 2,
    title: 'Top 10 Team Building Activities for Executive Offsites',
    content: '<p>Content for team building activities...</p>',
    date: 'Sep 28, 2025',
    author: 'Michael Chen',
    image: 'https://picsum.photos/seed/blog2/1920/1080',
    slug: 'top-10-team-building-activities-executive-offsites'
  },
  {
    id: 3,
    title: 'How to Choose the Perfect Conference Venue',
    content: '<p>Content for choosing a venue...</p>',
    date: 'Sep 12, 2025',
    author: 'Priya Patel',
    image: 'https://picsum.photos/seed/blog3/1920/1080',
    slug: 'how-to-choose-perfect-conference-venue'
  }
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | Eventibe Insights`,
    description: `Read about ${post.title} on the Eventibe blog.`,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-light-bg min-h-screen pb-20">
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-primary-navy">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-60"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto max-w-4xl">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 text-sm font-medium">
              <ArrowLeft size={16} />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-300 text-sm font-medium">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-accent-orange" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={16} className="text-accent-orange" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-12">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div 
            className="prose prose-lg prose-slate max-w-none text-soft-slate"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </div>
  );
}
