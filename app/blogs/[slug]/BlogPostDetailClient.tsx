"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import BlogInteractions from "@/components/BlogInteractions";
import { TiltCard } from "@/components/micro-interactions";
import { getBlogDetails, getBlogs } from "@/services/api";
import { Blog } from "@/types/blog";

const BLOG_API_APPLICABLE_FOR = "https://spodia.com";
const DEFAULT_BLOG_IMAGE = "/assets/images/placeholder.png";
const DEFAULT_AUTHOR_AVATAR = "/assets/images/placeholder.png";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

type UiBlogPost = {
  id: number;
  title: string;
  slug: string;
  href: string;
  desc: string;
  featuredImage: string;
  date: string;
  readingTime: number;
  categories: { id: number; name: string }[];
  author: { avatar: string; displayName: string; jobName: string };
  content: string;
};

function mapBlogToUiPost(blog: Blog): UiBlogPost {
  const plainText = blog.content?.replace(/<[^>]+>/g, "") || "";
  const excerpt = (blog.meta_description?.trim() || plainText.trim()).slice(0, 140);
  const readingTime = Math.max(3, Math.ceil((plainText.split(" ").length || 200) / 200));
  const category = blog.category_detail
    ? { id: blog.category_detail.id ?? 0, name: blog.category_detail.name ?? "General" }
    : { id: 0, name: "General" };

  const authorName = blog.blog_writer || "Eventibe Insights";

  return {
    id: blog.id ?? 0,
    title: blog.title ?? "",
    slug: blog.slug ?? "",
    href: `/blogs/${blog.slug ?? ""}`,
    desc: excerpt,
    featuredImage: blog.file || `https://placehold.co/1200x600/0B1F3A/ffffff?text=Eventibe`,
    date: blog.published_date || blog.created || "",
    readingTime,
    categories: [category],
    author: {
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=F1F5F9&color=0B1F3A`,
      displayName: authorName,
      jobName: blog.category_detail?.name || "Featured Article",
    },
    content: blog.content || "",
  };
}


export default function BlogPostDetailClient({ slug }: { slug: string }) {
  const {
    data: blogData,
    isLoading: isBlogLoading,
    isError: isBlogError,
  } = useQuery<Blog | null>({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const response = await getBlogDetails(slug, BLOG_API_APPLICABLE_FOR);
      return response?.data?.records?.[0] ?? null;
    },
  });

  const { data: blogsData } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await getBlogs({
        applicable_for: BLOG_API_APPLICABLE_FOR,
        page_number: 1,
        number_of_records: 50,
      });
      return response?.data?.records || [];
    },
  });

  const post = useMemo<UiBlogPost | null>(() => {
    if (!blogData) return null;
    return mapBlogToUiPost(blogData);
  }, [blogData]);

  const relatedPosts = useMemo<UiBlogPost[]>(() => {
    if (!blogsData || !blogData) return [];

    const sameCategory = blogsData
      .filter((item) => item.id !== blogData.id)
      .filter((item) => item.category_detail?.id === blogData.category_detail?.id)
      .slice(0, 3)
      .map(mapBlogToUiPost);

    if (sameCategory.length === 3) return sameCategory;

    const fallbackExtras = blogsData
      .filter((item) => item.id !== blogData.id && !sameCategory.some((post) => post.id === item.id))
      .slice(0, 3 - sameCategory.length)
      .map(mapBlogToUiPost);

    return [...sameCategory, ...fallbackExtras];
  }, [blogsData, blogData]);

  if (isBlogLoading) {
    return (
      <div className="bg-[#FAFBFD] text-[#334155] min-h-screen pb-20 animate-pulse">
        {/* Hero Skeleton */}
        <div className="relative h-[40vh] md:h-[50vh] w-full bg-slate-200 overflow-hidden">
          <div className="absolute inset-x-0 top-6 md:top-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 mb-6">
                <div className="w-32 h-8 bg-slate-300 rounded-full" />
                <div className="w-48 h-8 bg-slate-300 rounded-full hidden sm:block" />
              </div>
              <div className="w-24 h-6 bg-slate-300 rounded-full mb-5" />
              <div className="w-3/4 h-12 sm:h-16 bg-slate-300 rounded-lg mb-4" />
              <div className="w-1/2 h-12 sm:h-16 bg-slate-300 rounded-lg mb-8" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-300 rounded-full" />
                <div className="flex flex-col gap-2">
                  <div className="w-32 h-4 bg-slate-300 rounded" />
                  <div className="w-24 h-3 bg-slate-300 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8">
          <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-slate-100 relative -mt-8 md:-mt-12 z-20">
            <div className="w-full h-6 bg-slate-200 rounded mb-4" />
            <div className="w-full h-6 bg-slate-200 rounded mb-4" />
            <div className="w-5/6 h-6 bg-slate-200 rounded mb-10" />

            <div className="w-2/3 h-10 bg-slate-200 rounded mb-6 mt-10" />
            <div className="w-full h-6 bg-slate-200 rounded mb-4" />
            <div className="w-full h-6 bg-slate-200 rounded mb-4" />
            <div className="w-3/4 h-6 bg-slate-200 rounded mb-8" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div className="h-28 bg-slate-200 rounded-xl" />
              <div className="h-28 bg-slate-200 rounded-xl" />
              <div className="h-28 bg-slate-200 rounded-xl" />
              <div className="h-28 bg-slate-200 rounded-xl" />
            </div>

            <div className="w-full h-6 bg-slate-200 rounded mb-4" />
            <div className="w-4/5 h-6 bg-slate-200 rounded mb-4" />
          </div>
        </div>
      </div>
    );
  }

  if (isBlogError || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 px-4">
        <div className="max-w-xl text-center bg-white rounded-3xl border border-slate-200 shadow-lg p-10">
          <h1 className="text-2xl font-bold text-[#0B1F3A] mb-4">Article not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            The requested insight could not be loaded from the Eventibe blog API.
          </p>
          <Link href="/blogs" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
            Back to Blog
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  const bodyContent = post.content?.trim() || "";

  return (
    <div className="bg-[#FAFBFD] text-[#334155] min-h-screen pb-20">
      <div className="relative h-[40vh] md:h-[50vh] w-full bg-[#0B1F3A] overflow-hidden">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAFBFD] via-[#0B1F3A]/70 to-[#0B1F3A]/40"></div>
        <div className="absolute -top-10 -left-10 w-60 h-60 rounded-full bg-[#2563EB] opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -right-12 w-60 h-60 rounded-full bg-[#F97316] opacity-10 blur-3xl"></div>
        <div className="absolute inset-x-0 top-6 md:top-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 active:scale-95"
              >
                <ArrowLeft size={13} />
                Back to Insights
              </Link>
              <div className="hidden sm:flex items-center gap-1 text-[11px] font-bold text-white/50 uppercase tracking-widest">
                <ChevronRight size={12} />
                <span>Blog</span>
                <ChevronRight size={12} />
                <span className="text-[#F97316] max-w-[200px] truncate">{post.title}</span>
              </div>
            </div>
            <div className="flex gap-2 mb-5">
              {post.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/20"
                >
                  {cat.name}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] lg:text-white mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-[#334155] sm:text-white/90 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-2.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.displayName}
                  className="w-9 h-9 rounded-full object-cover border border-white/20 shadow-sm"
                />
                <div>
                  <div className="font-bold text-[#0B1F3A] sm:text-white">{post.author.displayName}</div>
                  <div className="text-[10px] text-slate-500 sm:text-white/60">{post.author.jobName}</div>
                </div>
              </div>
              <div className="h-4 w-px bg-slate-300 sm:bg-white/20 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Calendar size={15} className="text-[#F97316]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="h-4 w-px bg-slate-300 sm:bg-white/20 hidden sm:block"></div>
              <div className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#F97316]" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-sm border border-slate-100 relative -mt-8 md:-mt-12 z-20">
          <style>{`
            .article-body {
              color: #475569; /* soft-slate */
              font-size: 1.125rem;
              line-height: 1.8;
            }
            .article-body::after {
              content: "";
              display: table;
              clear: both;
            }
            .article-body p {
              margin-bottom: 1.5rem;
              clear: none;
            }
            /* Full-width images */
            .article-body img {
              border-radius: 2rem;
              box-shadow: 0 32px 64px -16px rgba(0,0,0,0.15);
              width: 100%;
              max-height: 550px;
              object-fit: cover;
              margin: 2.5rem 0;
              display: block;
              clear: both;
            }
            @media (max-width: 768px) {
              .article-body img {
                float: none !important;
                margin: 2.5rem auto !important;
                max-width: 100%;
                border-radius: 1.5rem;
              }
            }
            .article-body h2 {
              margin-top: 4rem;
              margin-bottom: 1.5rem;
              font-size: 2.5rem;
              font-weight: 900;
              color: #0B1F3A; /* primary-navy */
              line-height: 1.2;
              letter-spacing: -0.025em;
              display: flex;
              align-items: center;
              gap: 1rem;
              clear: both;
            }
            .article-body h2::before {
              content: '';
              display: inline-block;
              width: 2rem;
              height: 2rem;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F97316' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 3L10.5 7.5L15 9L10.5 10.5L9 15L7.5 10.5L3 9L7.5 7.5L9 3Z'/%3E%3Cpath d='M18 14L18.75 16.25L21 17L18.75 17.75L18 20L17.25 17.75L15 17L17.25 16.25L18 14Z'/%3E%3C/svg%3E");
              background-size: contain;
              background-repeat: no-repeat;
              flex-shrink: 0;
            }
            .article-body h3 {
              margin-top: 3rem;
              margin-bottom: 1.25rem;
              font-size: 1.875rem;
              font-weight: 800;
              color: #0B1F3A; /* primary-navy */
              line-height: 1.3;
              display: flex;
              align-items: center;
              gap: 0.75rem;
              clear: both;
            }
            .article-body h3::before {
              content: '';
              display: inline-block;
              width: 1.5rem;
              height: 1.5rem;
              background-color: rgba(37, 99, 235, 0.1);
              border-radius: 0.5rem;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563EB' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
              background-size: 60%;
              background-position: center;
              background-repeat: no-repeat;
              flex-shrink: 0;
            }
            .article-body h4 {
              margin-top: 2.5rem;
              margin-bottom: 1rem;
              font-size: 1.5rem;
              font-weight: 700;
              color: #0B1F3A;
              clear: both;
            }
            .article-body blockquote {
              margin: 3rem 0;
              padding: 2rem 2.5rem;
              background-color: #F8FAFC;
              border-left: 6px solid #2563EB;
              border-radius: 0 1.5rem 1.5rem 0;
              font-style: italic;
              color: #475569;
              font-size: 1.35rem;
              clear: both;
              box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
            }
            .article-body ul, .article-body ol {
              margin: 2.5rem 0;
              padding: 0;
              list-style: none;
              clear: both;
            }
            .article-body li {
              position: relative;
              padding-left: 2.75rem;
              margin-bottom: 1rem;
              font-weight: 500;
            }
            .article-body li::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0.2rem;
              width: 1.75rem;
              height: 1.75rem;
              background-color: rgba(249, 115, 22, 0.15); /* accent-orange / 15 */
              border-radius: 50%;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F97316' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
              background-size: 50%;
              background-position: center;
              background-repeat: no-repeat;
            }
            .article-body strong {
              color: #0B1F3A;
              font-weight: 800;
            }
            .article-body a {
              color: #2563EB;
              text-decoration: underline;
              text-decoration-color: rgba(37, 99, 235, 0.3);
              text-underline-offset: 4px;
              transition: all 0.2s ease;
              font-weight: 600;
            }
            .article-body a:hover {
              text-decoration-color: #2563EB;
            }
          `}</style>
          <div
            className="article-body text-[#334155] font-normal text-base md:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />
          <BlogInteractions
            initialLikes={120}
            initialComments={[]}
            postTitle={post.title}
          />
        </div>
      </div>
      <div className="bg-slate-50 border-t border-slate-100 mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#2563EB] mb-2">
                <BookOpen size={12} />
                Deepen Your Knowledge
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                Recommended Insights
              </h2>
            </div>
            <Link
              href="/blogs"
              className="text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#F97316] flex items-center gap-1 transition-colors duration-300"
            >
              See All Articles
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <TiltCard key={relatedPost.id} className="h-full rounded-2xl">
                <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full z-20 relative">
                  <div className="relative h-52 w-full overflow-hidden">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/45 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4 flex flex-wrap gap-1">
                      {relatedPost.categories.map((cat) => (
                        <span
                          key={cat.id}
                          className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white text-[#0B1F3A] shadow-sm"
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#2563EB]" />
                        <span>{formatDate(relatedPost.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} className="text-[#2563EB]" />
                        <span>{relatedPost.readingTime} min read</span>
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-[#2563EB] transition-colors duration-300">
                      <Link href={relatedPost.href}>{relatedPost.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-xs mb-5 line-clamp-3 leading-relaxed">
                      {relatedPost.desc}
                    </p>
                    <div className="w-full h-px bg-slate-100 mt-auto mb-4"></div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={relatedPost.author.avatar}
                          alt={relatedPost.author.displayName}
                          className="w-6 h-6 rounded-full object-cover border border-[#2563EB]/10"
                        />
                        <span className="text-[10px] font-bold text-[#0B1F3A]">
                          {relatedPost.author.displayName}
                        </span>
                      </div>
                      <Link
                        href={relatedPost.href}
                        className="text-[10px] font-bold text-[#2563EB] group-hover:text-[#F97316] flex items-center gap-1 transition-colors duration-300"
                      >
                        Read
                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </article>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}