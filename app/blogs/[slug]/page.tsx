import BlogPostDetailClient from './BlogPostDetailClient';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostDetailClient slug={params.slug} />;
}
