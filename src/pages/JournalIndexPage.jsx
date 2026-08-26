import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { UMAMI_JOURNAL_POSTS } from '../data/umamiJournalData';
import { useSanityJournal } from '../hooks/useSanityData';

export default function JournalIndexPage() {
  const { posts: journalPosts } = useSanityJournal();
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter published posts (Posts 1-5 for week 1 launch)
  const publishedPosts = journalPosts.filter(p => p.status === 'published');
  const categories = ['All', 'Taste & Science', 'Culinary Craft', 'Local Chandigarh'];

  const filteredPosts = selectedCategory === 'All'
    ? publishedPosts
    : publishedPosts.filter(p => p.category === selectedCategory);

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">Journal</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b editorial-border-light pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase border border-brand-ember/30">
          <BookOpen className="w-3.5 h-3.5 text-brand-ember" />
          <span>EDITORIAL JOURNAL · 記録</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
          The UMAMI Journal
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base font-sans max-w-2xl leading-relaxed">
          Writing on umami, fire cooking, Hokkaido milk buns and Chandigarh food culture. Built with direct, answer-first insights.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-syne font-bold whitespace-nowrap transition-all border min-h-[44px] ${
              selectedCategory === cat
                ? 'bg-brand-ember text-white border-brand-ember shadow-md shadow-brand-ember/25'
                : 'bg-white text-zinc-700 editorial-border-light hover:border-brand-ember'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Journal Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden editorial-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              {/* Image */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-zinc-900">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-dark/90 text-white backdrop-blur-md border border-white/10">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{post.datePublished}</span>
                  <span>{post.readingTime}</span>
                </div>

                <h2 className="font-syne font-bold text-lg sm:text-xl text-brand-dark group-hover:text-brand-ember transition leading-snug">
                  <Link to={`/journal/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-zinc-600 font-sans line-clamp-3 leading-relaxed">
                  {post.quickAnswer}
                </p>
              </div>
            </div>

            {/* Read Article Action */}
            <div className="p-6 pt-0">
              <Link
                to={`/journal/${post.slug}`}
                className="w-full py-3 rounded-xl bg-zinc-50 hover:bg-brand-ember hover:text-white border editorial-border-light text-brand-dark font-syne font-bold text-xs flex items-center justify-center gap-1.5 transition min-h-[44px]"
              >
                <span>Read Full Post</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
