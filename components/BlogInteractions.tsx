'use client';

import React, { useState } from 'react';
import { Heart, Share2, MessageSquare, Twitter, Facebook, Linkedin, Link, Check, Send, User } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

export default function BlogInteractions({
  initialLikes = 142,
  initialComments = [],
  postTitle = '',
  likes: externalLikes,
  hasLiked: externalHasLiked,
  onLike: externalOnLike,
  onCommentsCountChange
}: {
  initialLikes?: number;
  initialComments?: Comment[];
  postTitle?: string;
  likes?: number;
  hasLiked?: boolean;
  onLike?: () => void;
  onCommentsCountChange?: (count: number) => void;
}) {
  const [localLikes, setLocalLikes] = useState(initialLikes);
  const [localHasLiked, setLocalHasLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  const likes = externalLikes !== undefined ? externalLikes : localLikes;
  const hasLiked = externalHasLiked !== undefined ? externalHasLiked : localHasLiked;

  React.useEffect(() => {
    if (onCommentsCountChange) {
      onCommentsCountChange(comments.length);
    }
  }, [comments, onCommentsCountChange]);

  const handleLike = () => {
    if (externalOnLike) {
      externalOnLike();
    } else {
      if (localHasLiked) {
        setLocalLikes(localLikes - 1);
        setLocalHasLiked(false);
      } else {
        setLocalLikes(localLikes + 1);
        setLocalHasLiked(true);
      }
    }
  };

  const handleShareCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleShareSocial = (platform: string) => {
    if (typeof window === 'undefined') return;
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(postTitle);
    let shareUrl = '';
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    else if (platform === 'linkedin') shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: String(Date.now()),
      author: newCommentName.trim(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(newCommentName.trim())}`,
      date: 'Just now',
      content: newCommentText.trim()
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="mt-16 pt-10 border-t border-slate-100">
      
      {/* Dynamic Likes & Share Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-slate-50 rounded-2xl border border-slate-100 mb-12">
        <div className="flex items-center gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 text-sm font-bold transition-all duration-300 ${
              hasLiked ? 'text-[#F97316] scale-105' : 'text-slate-500 hover:text-[#F97316]'
            }`}
          >
            <Heart size={20} className={hasLiked ? 'fill-[#F97316] animate-pulse' : ''} />
            <span>{likes} Recommended</span>
          </button>
          {/* <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold">
            <MessageSquare size={18} />
            <span>{comments.length} Comments</span>
          </div> */}
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Share2 size={13} /> Share:
          </span>
          <button
            onClick={() => handleShareSocial('twitter')}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#2563EB]/5 hover:text-[#2563EB] flex items-center justify-center transition-colors duration-300"
          >
            <Twitter size={14} />
          </button>
          <button
            onClick={() => handleShareSocial('facebook')}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#2563EB]/5 hover:text-[#2563EB] flex items-center justify-center transition-colors duration-300"
          >
            <Facebook size={14} />
          </button>
          <button
            onClick={() => handleShareSocial('linkedin')}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#2563EB]/5 hover:text-[#2563EB] flex items-center justify-center transition-colors duration-300"
          >
            <Linkedin size={14} />
          </button>
          <button
            onClick={handleShareCopy}
            className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-[#F97316]/5 hover:text-[#F97316] flex items-center gap-1.5 text-xs font-bold transition-all duration-300"
          >
            {copiedShare ? (
              <>
                <Check size={12} className="text-emerald-500" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Link size={12} />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <h3 className="text-xl font-bold text-[#0B1F3A] mb-8">
          Discussion ({comments.length})
        </h3>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-10">
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                placeholder="e.g. Cynthia Roberts"
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#2563EB] focus:bg-white text-[#0B1F3A] px-4 py-3 min-h-[48px] rounded-xl text-sm font-medium focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Comment Content
              </label>
              <textarea
                required
                rows={4}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="Share your thoughts or ask a planning question..."
                className="w-full bg-slate-50 border border-slate-200 focus:border-[#2563EB] focus:bg-white text-[#0B1F3A] px-4 py-4 min-h-[120px] rounded-xl text-sm font-medium focus:outline-none transition-all duration-300 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 min-h-[48px] bg-[#0B1F3A] hover:bg-[#F97316] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 active:scale-95 shadow-sm"
            >
              Post Comment
              <Send size={12} />
            </button>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:border-slate-200 transition-colors duration-300">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 object-cover flex-shrink-0"
              />
              <div className="flex-grow">
                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <span className="text-sm font-bold text-[#0B1F3A]">
                    {comment.author}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {comment.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#334155]/90 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
