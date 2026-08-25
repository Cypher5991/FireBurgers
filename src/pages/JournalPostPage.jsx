import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BookOpen, ArrowLeft, ArrowRight, Clock, Calendar, Sparkles, Share2, Compass, Utensils } from 'lucide-react';
import { UMAMI_JOURNAL_POSTS } from '../data/umamiJournalData';

export default function JournalPostPage() {
  const { slug } = useParams();
  const post = UMAMI_JOURNAL_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/journal" replace />;
  }

  // Schema for BlogPosting
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'datePublished': post.datePublished,
    'image': [post.image],
    'author': {
      '@type': 'Organization',
      'name': 'UMAMI',
      'url': 'https://umamifire.com'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'UMAMI',
      'url': 'https://umamifire.com'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://umamifire.com/journal/${post.slug}`
    }
  };

  // Helper to parse content markdown into clean HTML sections
  const renderFormattedContent = (content) => {
    const sections = content.split('\n\n');
    return sections.map((sec, idx) => {
      const trimmed = sec.trim();
      
      // H2 Headings
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={idx} className="font-syne font-black text-2xl sm:text-3xl text-brand-dark pt-6 pb-2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      }

      // Bullet lists
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n');
        return (
          <ul key={idx} className="space-y-2 pl-4 list-disc marker:text-brand-ember text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
            {items.map((item, i) => {
              const cleanItem = item.replace('- ', '');
              return (
                <li key={i}>
                  {cleanItem.includes('**') ? (
                    <span>
                      {cleanItem.split('**').map((part, pIdx) => 
                        pIdx % 2 === 1 ? <strong key={pIdx} className="text-brand-dark font-bold">{part}</strong> : part
                      )}
                    </span>
                  ) : cleanItem}
                </li>
              );
            })}
          </ul>
        );
      }

      // Standard paragraphs with bolding and links
      return (
        <p key={idx} className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
          {trimmed.split('**').map((part, pIdx) => 
            pIdx % 2 === 1 ? <strong key={pIdx} className="text-brand-dark font-bold">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <article className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      
      {/* Inject JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <Link to="/journal" className="hover:text-brand-ember">Journal</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold truncate max-w-[200px] sm:max-w-none">{post.title}</span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b editorial-border-light pb-8">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <span className="px-3 py-1 rounded-full bg-brand-dark text-white font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-ember" />
              {post.datePublished}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-brand-ember" />
              {post.readingTime}
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark leading-[1.12]">
          {post.title}
        </h1>

        <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
          <span>Byline: <strong>UMAMI</strong></span>
          <span>·</span>
          <span>Booth No. 7, Sector 8B Chandigarh</span>
        </div>
      </header>

      {/* Prominent Quick Answer Box for AI Overviews & Search Extraction */}
      <div className="bg-red-50/70 border-2 border-brand-ember/40 rounded-3xl p-6 sm:p-8 space-y-2.5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-brand-ember">
          <Sparkles className="w-4 h-4" />
          <span>QUICK ANSWER · 要約</span>
        </div>
        <p className="text-sm sm:text-base font-sans font-medium text-brand-dark leading-relaxed">
          {post.quickAnswer}
        </p>
      </div>

      {/* Featured Cover Photography */}
      <div className="rounded-3xl overflow-hidden editorial-border shadow-xl bg-zinc-900">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-72 sm:h-[420px] object-cover"
        />
      </div>

      {/* Main Formatted Article Body */}
      <div className="space-y-6 pt-2">
        {renderFormattedContent(post.content)}
      </div>

      {/* Internal Links & Read Next Recommendation Footer */}
      <footer className="pt-10 border-t-2 border-brand-dark space-y-6">
        
        {/* Navigation CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/menu"
            className="p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border editorial-border-light flex items-center justify-between group transition"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-brand-ember font-bold">DISCOVER FLAVORS</div>
              <div className="font-syne font-bold text-sm text-brand-dark">See the full UMAMI Menu</div>
            </div>
            <Utensils className="w-5 h-5 text-brand-ember group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/visit"
            className="p-5 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border editorial-border-light flex items-center justify-between group transition"
          >
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase text-brand-ember font-bold">VISIT SECTOR 8B</div>
              <div className="font-syne font-bold text-sm text-brand-dark">Location & Counter Details</div>
            </div>
            <Compass className="w-5 h-5 text-brand-ember group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Read Next Sibling Post Link */}
        {post.readNext && (
          <div className="p-6 rounded-3xl bg-brand-dark text-white border border-brand-ember/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div>
              <div className="text-[10px] font-mono uppercase text-brand-ember font-bold">READ NEXT</div>
              <div className="font-syne font-bold text-base text-white mt-0.5">
                {post.readNext.title}
              </div>
            </div>
            <Link
              to={post.readNext.slug ? `/journal/${post.readNext.slug}` : (post.readNext.link || '/journal')}
              className="px-5 py-3 rounded-xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-1.5 transition self-start sm:self-auto min-h-[44px]"
            >
              <span>Continue Reading</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 text-xs font-mono text-zinc-500">
          <Link to="/journal" className="hover:text-brand-ember flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all Journal posts</span>
          </Link>

          <span>UMAMI Editorial · Sector 8B</span>
        </div>

      </footer>

    </article>
  );
}
