"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Mail,
  BookOpen,
} from "lucide-react";
import { TiltCard, MagneticButton } from "@/components/micro-interactions";
import { Blog } from "@/types/blog";
import { getBlogs } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const POSTS_PER_PAGE = 6;
const BLOG_API_APPLICABLE_FOR = "https://spodia.com";
const DEFAULT_BLOG_IMAGE = "/assets/images/placeholder.png";
const DEFAULT_AUTHOR_AVATAR = "/assets/images/placeholder.png";

type BlogListItem = {
  id: number;
  title: string;
  href: string;
  desc: string;
  featuredImage: string;
  date: string;
  readingTime: number;
  categories: { id: number; name: string }[];
  author: { avatar: string; displayName: string; jobName: string };
};

function mapBlogToListItem(blog: Blog): BlogListItem {
  const plainText = blog.content?.replace(/<[^>]+>/g, "") || "";
  const excerpt = (blog.meta_description?.trim() || plainText.trim()).slice(0, 140);
  const readingTime = Math.max(3, Math.ceil((plainText.split(" ").length || 200) / 200));
  const category = blog.category_detail
    ? { id: blog.category_detail.id, name: blog.category_detail.name }
    : { id: 0, name: "General" };

  const authorName = blog.blog_writer || "Eventibe Insights";

  return {
    id: blog.id,
    title: blog.title,
    href: `/blogs/${blog.slug}`,
    desc: excerpt,
    featuredImage: blog.file || `https://placehold.co/600x400/e2e8f0/1e293b?text=Eventibe`,
    date: blog.published_date || blog.created || "",
    readingTime,
    categories: [category],
    author: {
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=F1F5F9&color=0B1F3A`,
      displayName: authorName,
      jobName: blog.category_detail?.name || "Featured Article",
    },
  };
}

const DOTS = "DOTS" as const;

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => start + idx);
}

function getPaginationRange(currentPage: number, totalPages: number, siblingCount = 1) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, DOTS, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, DOTS, ...rightRange];
  }

  // both sides have dots
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, DOTS, ...middleRange, DOTS, totalPages];
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: blogsData, isLoading, isError } = useQuery<Blog[]>({
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

  const posts = useMemo<BlogListItem[]>(
    () => (blogsData || []).map(mapBlogToListItem),
    [blogsData],
  );

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    return posts.slice(startIndex, startIndex + POSTS_PER_PAGE);
  }, [posts, currentPage]);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FAFBFD] text-[#334155] min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ================= HERO HEADER ================= */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#2563EB]/10 text-[#2563EB] mb-4">
            <BookOpen size={13} />
            Eventibe Insights
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1F3A] tracking-tight mb-4 sm:mb-6 leading-tight">
            Planning, Trends & Strategies{" "}
            <br className="hidden sm:inline" />
            for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">
              Corporate Excellence
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#334155]/90 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Delve into professional event curation, expert columns, master
            planning tools, and corporate venue strategies.
          </p>
        </div>

        {/* ================= LATEST ARTICLES GRID ================= */}
        <div>
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1F3A] tracking-tight">
              Latest Articles
            </h2>
            <span className="text-xs font-semibold text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-full">
              {posts.length} {posts.length === 1 ? "article" : "articles"}
            </span>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-full rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col overflow-hidden animate-pulse">
                  <div className="h-56 w-full bg-slate-200" />
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex gap-4 mb-3">
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                    <div className="h-5 w-full bg-slate-200 rounded mb-2" />
                    <div className="h-5 w-3/4 bg-slate-200 rounded mb-4" />
                    <div className="h-3 w-full bg-slate-200 rounded mb-1" />
                    <div className="h-3 w-full bg-slate-200 rounded mb-1" />
                    <div className="h-3 w-4/5 bg-slate-200 rounded mb-6" />
                    <div className="w-full h-px bg-slate-100 mt-auto mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-200" />
                        <div className="h-3 w-24 bg-slate-200 rounded" />
                      </div>
                      <div className="h-3 w-20 bg-slate-200 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-red-200 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-red-600 mb-1">
                Failed to load articles
              </h3>
              <p className="text-sm text-slate-400 px-6">
                There was a problem loading the articles. Please try again later.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
              <h3 className="text-lg font-bold text-[#0B1F3A] mb-1">
                No articles found
              </h3>
              <p className="text-sm text-slate-400 px-6">
                No articles are available at the moment. Please check back later.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {paginatedPosts.map((post) => (
                  <TiltCard key={post.id} className="h-full rounded-2xl">
                    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-500 flex flex-col h-full z-20 relative">
                      {/* Featured Image */}
                      <div className="relative h-56 w-full overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/45 via-transparent to-transparent"></div>

                        {/* Tags / Categories */}
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                          {post.categories.map((cat) => (
                            <span
                              key={cat.id}
                              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-white text-[#0B1F3A] shadow-sm"
                            >
                              {cat.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content details */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Meta items */}
                        <div className="flex items-center gap-4 text-[11px] font-semibold text-slate-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={13} className="text-[#2563EB]" />
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={13} className="text-[#2563EB]" />
                            <span>{post.readingTime} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#0B1F3A] mb-3 line-clamp-2 group-hover:text-[#2563EB] transition-colors duration-300">
                          <Link href={post.href}>{post.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-slate-500 text-xs sm:text-sm mb-6 line-clamp-3 leading-relaxed">
                          {post.desc}
                        </p>

                        {/* Divider */}
                        <div className="w-full h-px bg-slate-100 mt-auto mb-4"></div>

                        {/* Author info & Read Article link */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.author.avatar}
                              alt={post.author.displayName}
                              className="w-7 h-7 rounded-full object-cover border border-[#2563EB]/10"
                            />
                            <span className="text-[11px] font-bold text-[#0B1F3A]">
                              {post.author.displayName}
                            </span>
                          </div>

                          <Link
                            href={post.href}
                            className="text-xs font-bold text-[#2563EB] group-hover:text-[#F97316] flex items-center gap-1 transition-colors duration-300"
                          >
                            Read Article
                            <ArrowRight
                              size={13}
                              className="group-hover:translate-x-0.5 transition-transform duration-300"
                            />
                          </Link>
                        </div>
                      </div>
                    </article>
                  </TiltCard>
                ))}
              </div>

              {/* ================= PAGINATION ================= */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 mb-20">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {getPaginationRange(currentPage, totalPages).map((p, idx) =>
                    p === DOTS ? (
                      <span key={`dot-${idx}`} className="w-10 h-10 flex items-center justify-center text-xs text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => handlePageChange(Number(p))}
                        className={`w-10 h-10 rounded-full text-xs font-bold transition-all duration-300 ${
                          currentPage === p
                            ? "bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/25"
                            : "bg-white border border-slate-200 hover:bg-slate-50 text-slate-600"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* ================= NEWSLETTER SUBSCRIPTION WIDGET ================= */}
        <div className="relative bg-[#0B1F3A] rounded-2xl sm:rounded-3xl overflow-hidden px-6 py-10 sm:px-12 sm:py-16 text-center shadow-2xl border border-white/5 mt-10 sm:mt-0">
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#2563EB] opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#F97316] opacity-15 blur-3xl"></div>

          <div className="relative max-w-2xl mx-auto z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-3">
              <Mail size={12} />
              Stay Ahead of the Curve
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4">
              Subscribe to the Eventibe Letter
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 sm:mb-8 max-w-lg mx-auto">
              Get handpicked event trends, tech innovations, and strategy
              checklists delivered to your inbox bi-weekly.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="flex flex-col gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="w-full bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-[#0B1F3A] border border-white/10 focus:border-[#2563EB] px-5 py-3.5 rounded-full text-sm font-medium focus:outline-none placeholder-slate-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full px-7 py-3.5 bg-[#F97316] hover:bg-[#EA580C] active:scale-95 text-white text-sm font-bold uppercase tracking-wider rounded-full shadow-lg shadow-[#F97316]/20 transition-all duration-300"
              >
                Join Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
