"use client";

import React, { useMemo, useState, useEffect } from "react";
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
  Bookmark,
  Heart,
  MessageSquare,
  Share2,
} from "lucide-react";
import BlogInteractions from "@/components/BlogInteractions";
import { TiltCard } from "@/components/micro-interactions";
import { getBlogDetails, getBlogs } from "@/services/api";
import { Blog } from "@/types/blog";
import CommonHero from "@/components/common/CommonHero";

const BLOG_API_APPLICABLE_FOR = "https://spodia.com";
const DEFAULT_BLOG_IMAGE = "/assets/images/placeholder.png";
const DEFAULT_AUTHOR_AVATAR = "/assets/images/placeholder.png";

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function removeNumberingFromHeadings(htmlContent?: string) {
  if (!htmlContent) return "";
  return htmlContent.replace(
    /(<h[1-6][^>]*>(?:<(?:strong|b|span)[^>]*>)?\s*)\d+(?:\.\d+)*[\.\s-]+\s*(?=[^<>\d\s])/gi,
    "$1"
  );
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

  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(120);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 240) {
        setShowStickyHeader(true);
      } else {
        setShowStickyHeader(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`bookmark_blog_${slug}`);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsBookmarked(!!saved);
    }
  }, [slug]);

  const toggleBookmark = () => {
    const nextVal = !isBookmarked;
    setIsBookmarked(nextVal);
    if (typeof window !== "undefined") {
      if (nextVal) {
        localStorage.setItem(`bookmark_blog_${slug}`, "true");
      } else {
        localStorage.removeItem(`bookmark_blog_${slug}`);
      }
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      if (navigator.share) {
        navigator.share({
          title: post?.title || "",
          text: post?.desc || "",
          url: window.location.href,
        }).catch(console.error);
      } else {
        navigator.clipboard.writeText(window.location.href);
        setShowCopiedToast(true);
        setTimeout(() => setShowCopiedToast(false), 2000);
      }
    }
  };

  const scrollToComments = () => {
    const element = document.getElementById("discussion-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bodyContent = useMemo(() => removeNumberingFromHeadings(post?.content?.trim()), [post?.content]);

  if (isBlogLoading) {
    return (
      <div className="bg-[#FAFBFD] text-[#334155] min-h-screen pb-20 animate-pulse">
        {/* Hero Skeleton */}
        <div className="relative w-full bg-slate-100 overflow-hidden pt-8 pb-16 sm:pb-24 md:pb-32">
          <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex gap-2 mb-6">
                <div className="w-32 h-8 bg-slate-200 rounded-full" />
                <div className="w-48 h-8 bg-slate-200 rounded-full hidden sm:block" />
              </div>
              <div className="w-24 h-6 bg-slate-200 rounded-full mb-5" />
              <div className="w-3/4 h-10 sm:h-14 bg-slate-200 rounded-lg mb-4" />
              <div className="w-1/2 h-10 sm:h-14 bg-slate-200 rounded-lg mb-8" />
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-200 rounded-full" />
                <div className="flex flex-col gap-2">
                  <div className="w-32 h-4 bg-slate-200 rounded" />
                  <div className="w-24 h-3 bg-slate-200 rounded" />
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

  return (
    <div className="bg-[#FAFBFD] text-[#334155] min-h-screen pb-20">
      
      {/* Sticky Mobile Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 py-3 px-4 flex items-center justify-between transition-all duration-300 md:hidden ${
        showStickyHeader ? 'translate-y-0 opacity-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)]' : '-translate-y-full opacity-0 pointer-events-none'
      }`}>
        <Link href="/blogs" className="p-1 text-[#0B1F3A] hover:bg-slate-100 rounded-full transition">
          <ArrowLeft size={20} />
        </Link>
        <span className="text-xs font-bold text-[#0B1F3A] truncate max-w-[60%] text-center">
          {post.title}
        </span>
        <div className="flex gap-2">
          <button onClick={toggleBookmark} className={`transition ${isBookmarked ? 'text-[#2563EB]' : 'text-slate-400'}`}>
            <Bookmark size={18} className={isBookmarked ? 'fill-[#2563EB]' : ''} />
          </button>
          <button onClick={handleShare} className="text-slate-400 transition hover:text-[#0B1F3A]">
            <Share2 size={18} />
          </button>
        </div>
      </div>

      {/* Copied Link Toast */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg z-[60] transition-all duration-300 pointer-events-none flex items-center gap-2 ${
        showCopiedToast ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}>
        Link copied to clipboard!
      </div>

      {/* === MOBILE COVER & TITLE SYSTEM (Hidden on Desktop) === */}
      <CommonHero
        badgeText={post.categories[0]?.name || "Insight"}
        badgeIcon="bookopen"
        titleMain={post.title}
        bgSrc={post.featuredImage}
        bgType="image"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center mt-6">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white/95 text-xs sm:text-sm font-semibold mb-6">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.displayName}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover border border-white/20 shadow-sm"
              />
              <div>
                <div className="font-bold text-white text-xs sm:text-sm">{post.author.displayName}</div>
                <div className="text-[10px] text-white/60 hidden sm:block">{post.author.jobName}</div>
              </div>
            </div>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#F97316]" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="h-4 w-px bg-white/20 hidden sm:block"></div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#F97316]" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>

          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider transition-all duration-300 active:scale-95"
          >
            <ArrowLeft size={13} />
            Back to Insights
          </Link>
        </div>
      </CommonHero>
      {/* === ARTICLE BODY === */}
      <div className="w-full md:px-6 lg:px-8 pt-0 md:pt-8 pb-8">
        <div className="max-w-7xl mx-auto bg-white md:rounded-2xl lg:rounded-3xl p-5 md:p-10 lg:p-16 shadow-none md:shadow-sm border-t md:border border-slate-100 relative mt-0 md:-mt-12 z-20">
          
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium overflow-x-auto whitespace-nowrap pb-1 hide-scrollbar">
            <Link href="/" className="hover:text-[#2563EB] transition-colors flex items-center gap-1">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <Link href="/blogs" className="hover:text-[#2563EB] transition-colors flex items-center gap-1">
              Blogs
            </Link>
            <ChevronRight size={14} className="text-slate-400 shrink-0" />
            <span className="text-[#0B1F3A] truncate max-w-[200px] sm:max-w-md md:max-w-xl font-bold">
              {post.title}
            </span>
          </nav>

          <style>{`
            .hero-heading {
              color: #ffffff !important;
            }
            .article-body {
              color: #334155;
              font-size: 0.95rem;
              line-height: 1.75;
            }
            @media (min-width: 640px) {
              .article-body { 
                font-size: 1.1rem; 
                line-height: 1.8;
                color: #475569;
              }
            }
            .article-body::after {
              content: "";
              display: table;
              clear: both;
            }
            .article-body p {
              margin-bottom: 1.25rem;
              clear: none;
            }
            @media (min-width: 640px) {
              .article-body p { margin-bottom: 1.5rem; }
            }
            /* Full-width responsive images */
            .article-body img {
              border-radius: 1rem;
              box-shadow: 0 10px 30px -8px rgba(0,0,0,0.12);
              max-width: 100% !important;
              height: auto !important;
              width: 100% !important;
              aspect-ratio: 16/10;
              object-fit: cover;
              margin: 1.5rem 0;
              display: block;
              clear: both;
            }
            @media (min-width: 640px) {
              .article-body img {
                border-radius: 1.5rem;
                box-shadow: 0 20px 40px -12px rgba(0,0,0,0.12);
                margin: 2.5rem 0;
              }
            }
            
            /* Responsive Content Headings */
            .article-body h1 {
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              font-size: 1.35rem !important;
              font-weight: 800;
              color: #0B1F3A;
              line-height: 1.3;
              letter-spacing: -0.01em;
              clear: both;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            @media (min-width: 640px) {
              .article-body h1 {
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                font-size: 2.15rem !important;
              }
            }
            
            .article-body h2 {
              margin-top: 1.5rem;
              margin-bottom: 0.5rem;
              font-size: 1.2rem !important;
              font-weight: 800;
              color: #0B1F3A;
              line-height: 1.3;
              letter-spacing: -0.01em;
              clear: both;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .article-body h2::before {
              content: '';
              display: inline-block;
              vertical-align: middle;
              margin-top: -0.15em;
              width: 1.1em;
              height: 1.1em;
              margin-right: 0.45em;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F97316' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M9 3L10.5 7.5L15 9L10.5 10.5L9 15L7.5 10.5L3 9L7.5 7.5L9 3Z'/%3E%3Cpath d='M18 14L18.75 16.25L21 17L18.75 17.75L18 20L17.25 17.75L15 17L17.25 16.25L18 14Z'/%3E%3C/svg%3E");
              background-size: contain;
              background-repeat: no-repeat;
            }
            @media (min-width: 640px) {
              .article-body h2 {
                margin-top: 3.5rem;
                margin-bottom: 1.25rem;
                font-size: 1.85rem !important;
              }
            }
            
            .article-body h3 {
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
              font-size: 1.05rem !important;
              font-weight: 700;
              color: #0B1F3A;
              line-height: 1.3;
              clear: both;
              overflow-wrap: break-word;
              word-break: break-word;
            }
            .article-body h3::before {
              content: '';
              display: inline-block;
              vertical-align: middle;
              margin-top: -0.15em;
              width: 1.1em;
              height: 1.1em;
              margin-right: 0.45em;
              background-color: rgba(37, 99, 235, 0.1);
              border-radius: 0.25em;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563EB' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='9 18 15 12 9 6'%3E%3C/polyline%3E%3C/svg%3E");
              background-size: 60%;
              background-position: center;
              background-repeat: no-repeat;
            }
            @media (min-width: 640px) {
              .article-body h3 {
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                font-size: 1.5rem !important;
              }
            }
            
            .article-body h4 {
              margin-top: 1.25rem;
              margin-bottom: 0.5rem;
              font-size: 0.95rem !important;
              font-weight: 700;
              color: #0B1F3A;
              clear: both;
            }
            @media (min-width: 640px) {
              .article-body h4 {
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                font-size: 1.25rem !important;
              }
            }
            
            .article-body blockquote {
              margin: 1.5rem 0;
              padding: 1rem 1.25rem;
              background-color: #F8FAFC;
              border-left: 4px solid #F97316;
              border-radius: 0 0.75rem 0.75rem 0;
              font-style: italic;
              color: #475569;
              font-size: 0.95rem;
              clear: both;
            }
            @media (min-width: 640px) {
              .article-body blockquote {
                margin: 3rem 0;
                padding: 2rem 2.5rem;
                border-left-width: 6px;
                border-radius: 0 1.5rem 1.5rem 0;
                font-size: 1.35rem;
                box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
              }
            }
            .article-body ul, .article-body ol {
              margin: 1.25rem 0;
              padding: 0;
              list-style: none;
              clear: both;
            }
            @media (min-width: 640px) {
              .article-body ul, .article-body ol { margin: 2.5rem 0; }
            }
            
            /* Responsive Bullet list items */
            .article-body li {
              position: relative;
              padding-left: 1.75em;
              margin-bottom: 0.75rem;
              font-weight: 500;
            }
            @media (min-width: 640px) {
              .article-body li { padding-left: 2em; margin-bottom: 1rem; }
            }
            .article-body li::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0.15em;
              width: 1.2em;
              height: 1.2em;
              background-color: rgba(249, 115, 22, 0.15);
              border-radius: 50%;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23F97316' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
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
            className="article-body"
            dangerouslySetInnerHTML={{ __html: bodyContent }}
          />
          <div id="discussion-section">
            <BlogInteractions
              likes={likes}
              hasLiked={hasLiked}
              onLike={handleLike}
              onCommentsCountChange={setCommentsCount}
              initialLikes={120}
              initialComments={[]}
              postTitle={post.title}
            />
          </div>
        </div>
      </div>
      {/* Mobile Floating Action Pill */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[340px] bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-full z-[50] py-3 px-6 flex items-center justify-between transition-all duration-300 md:hidden">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 transition-transform active:scale-90 ${
            hasLiked ? 'text-[#F97316]' : 'text-slate-500'
          }`}
        >
          <Heart size={22} className={hasLiked ? 'fill-[#F97316]' : ''} />
          <span className="text-[11px] font-bold">{likes}</span>
        </button>
        <button
          onClick={scrollToComments}
          className="flex items-center gap-1.5 text-slate-500 transition-transform active:scale-90 hover:text-[#0B1F3A]"
        >
          <MessageSquare size={22} />
          <span className="text-[11px] font-bold">{commentsCount}</span>
        </button>
        <button
          onClick={toggleBookmark}
          className={`flex items-center gap-1.5 transition-transform active:scale-90 ${
            isBookmarked ? 'text-[#2563EB]' : 'text-slate-500'
          }`}
        >
          <Bookmark size={22} className={isBookmarked ? 'fill-[#2563EB]' : ''} />
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-slate-500 transition-transform active:scale-90 hover:text-[#0B1F3A]"
        >
          <Share2 size={22} />
        </button>
      </div>

      {/* === RELATED POSTS — only render when there's data === */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 border-t border-slate-100 mt-12 md:mt-24 py-12 md:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 sm:mb-10">
              <div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#2563EB] mb-1 sm:mb-2">
                  <BookOpen size={12} />
                  Deepen Your Knowledge
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B1F3A] tracking-tight">
                  Recommended Insights
                </h2>
              </div>
              <Link
                href="/blogs"
                className="text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#F97316] flex items-center gap-1 transition-colors duration-300 self-start sm:self-auto"
              >
                See All Articles
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="w-[85%] min-w-[280px] md:w-auto shrink-0 snap-start snap-always">
                  <TiltCard className="h-full rounded-2xl">
                  <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full z-20 relative">
                    <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/45 via-transparent to-transparent"></div>
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                        {relatedPost.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-white text-[#0B1F3A] shadow-sm"
                          >
                            {cat.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar size={11} className="text-[#2563EB]" />
                          <span>{formatDate(relatedPost.date)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={11} className="text-[#2563EB]" />
                          <span>{relatedPost.readingTime} min read</span>
                        </div>
                      </div>
                      <h3 className="text-sm font-bold text-[#0B1F3A] mb-2 line-clamp-2 group-hover:text-[#2563EB] transition-colors duration-300">
                        <Link href={relatedPost.href}>{relatedPost.title}</Link>
                      </h3>
                      <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed">
                        {relatedPost.desc}
                      </p>
                      <div className="w-full h-px bg-slate-100 mt-auto mb-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={relatedPost.author.avatar}
                            alt={relatedPost.author.displayName}
                            className="w-6 h-6 rounded-full object-cover border border-[#2563EB]/10"
                          />
                          <span className="text-[10px] font-bold text-[#0B1F3A] truncate max-w-[90px]">
                            {relatedPost.author.displayName}
                          </span>
                        </div>
                        <Link
                          href={relatedPost.href}
                          className="text-[10px] font-bold text-[#2563EB] group-hover:text-[#F97316] flex items-center gap-1 transition-colors duration-300 shrink-0"
                        >
                          Read
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                        </Link>
                      </div>
                    </div>
                  </article>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}