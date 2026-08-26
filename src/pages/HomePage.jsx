import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, ArrowRight, Clock, MapPin, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';
import { UMAMI_BRAND_INFO, UMAMI_MENU_ITEMS, UMAMI_DIP_WALL } from '../data/umamiMenuData';
import { UMAMI_JOURNAL_POSTS } from '../data/umamiJournalData';
import KineticMarquee from '../components/home/KineticMarquee';
import LazyVideoGif from '../components/common/LazyVideoGif';
import BurgerShowcaseStage from '../components/home/BurgerShowcaseStage';
import FlagshipDuoFeature from '../components/home/FlagshipDuoFeature';
import MenuAutoCarousel from '../components/home/MenuAutoCarousel';

export default function HomePage() {
  const featuredBurgers = UMAMI_MENU_ITEMS.filter(i => i.sectionId === 'burgers');
  const recentArticles = UMAMI_JOURNAL_POSTS.filter(p => p.status === 'published').slice(0, 3);

  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. High-Impact Minimalist Swiss Editorial Photography Hero */}
      <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30 shadow-md">
              <Flame className="w-4 h-4 text-brand-ember" />
              <span>SECTOR 8B CHANDIGARH · 旨味 · OPENING 1 OCT 2026</span>
            </div>

            {/* H1 SEO Header as specified in Content Pack */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne tracking-tight text-brand-dark leading-[1.08]">
              Japanese <span className="text-brand-ember">fire-grilled</span> burgers.
            </h1>

            {/* Opening Block from UMAMI_Website_Content_Pack.md */}
            <div className="space-y-3.5 text-zinc-700 text-sm sm:text-base leading-relaxed font-sans">
              <p className="font-medium text-brand-dark">
                There's a fifth taste. Not sweet, sour, salt or bitter, but the deep savoury one underneath, the thing that makes you want the next bite before you've finished this one. A Japanese chemist named it in 1908. He called it umami.
              </p>
              <p>
                It's the exact taste a great burger has been chasing for a hundred years. So we named the place after it, and then we had to earn the name.
              </p>
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2 w-full">
              <Link
                to="/menu"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 hover:scale-[1.02] transition min-h-[48px]"
              >
                <span>See the full menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/story"
                className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white border editorial-border hover:border-brand-ember text-brand-dark font-syne font-bold text-sm transition min-h-[48px] hover:shadow-md flex items-center justify-center"
              >
                <span>Our 15-Year Story</span>
              </Link>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t editorial-border-light font-mono text-xs text-zinc-600">
              <div>
                <div className="font-bold text-brand-dark font-syne text-sm">5:00 AM</div>
                <div className="text-[11px] text-zinc-500">Hokkaido Milk Buns</div>
              </div>
              <div>
                <div className="font-bold text-brand-dark font-syne text-sm">300°C</div>
                <div className="text-[11px] text-zinc-500">Live Fire Char</div>
              </div>
              <div>
                <div className="font-bold text-brand-dark font-syne text-sm">Booth 7</div>
                <div className="text-[11px] text-zinc-500">Inner Market, Sec 8B</div>
              </div>
            </div>

          </div>

          {/* Right Hero Auto Carousel of Menu Items */}
          <div className="lg:col-span-5 relative">
            <MenuAutoCarousel />
          </div>

        </div>
      </section>

      {/* 2. Kinetic Velocity Marquee */}
      <KineticMarquee />

      {/* 3. Section: What we do */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="deep-slate-panel p-6 sm:p-12 rounded-3xl space-y-8 border-brand-ember/20 shadow-2xl">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] text-brand-ember text-xs font-mono font-bold uppercase border border-white/10">
              <Flame className="w-3.5 h-3.5" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-white tracking-tight">
              Thick, fire-grilled, on a bun we bake at dawn.
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base font-sans leading-relaxed">
              Every patty is grilled over live fire until the edges char. Every bun is a Hokkaido milk bun, baked in-house each morning, soft enough to press and strong enough to hold. Every sauce is built here, not squeezed from a bottle.
            </p>
            <p className="text-brand-ember font-syne font-bold text-base sm:text-lg">
              Not thin. Not pressed. Not an apology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="text-2xl">🍞</div>
              <h3 className="font-syne font-bold text-white text-base">Hokkaido Yudane Bun</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Baked at 5:00 AM using Japanese tangzhong water roux. Compresses easily without tearing or soaking through.
              </p>
            </div>

            <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="text-2xl">🔥</div>
              <h3 className="font-syne font-bold text-white text-base">300°C Live Fire Char</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Real flame searing that renders fat into aromatic smoke and creates striped Maillard crusts.
              </p>
            </div>

            <div className="bg-white/[0.04] p-5 rounded-2xl border border-white/5 space-y-2">
              <div className="text-2xl">⚖️</div>
              <h3 className="font-syne font-bold text-white text-base">The 144 Sq Ft Discipline</h3>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Upstream prep ensures the line executes without guesswork. Same weight, same cook, every single time.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Section: Two kitchens, one fire */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white p-6 sm:p-12 rounded-3xl editorial-border shadow-lg">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase">
              <Compass className="w-3.5 h-3.5 text-brand-ember" />
              <span>TWO KITCHENS, ONE FIRE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-brand-dark tracking-tight">
              Japan gives us the bun and the discipline. Chandigarh gives us the heart.
            </h2>
            <p className="text-zinc-700 text-sm sm:text-base font-sans leading-relaxed">
              Japan gives us the bun, the discipline and umami itself. Same weight, same cook, every time. Chandigarh gives us the heart and the reason. Fire is how the two meet.
            </p>
            <div className="pt-2">
              <Link
                to="/story"
                className="inline-flex items-center gap-2 text-brand-ember hover:text-brand-dark font-syne font-bold text-sm transition"
              >
                <span>Read the complete story behind UMAMI</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden editorial-border shadow-sm">
              <LazyVideoGif
                className="w-full h-56 sm:h-64 rounded-2xl"
                aspectRatio="auto"
                alt="UMAMI Live Fire Charcoal Grilling"
              />
            </div>
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
              alt="Sector 8B evening dining atmosphere"
              className="w-full h-56 sm:h-64 object-cover rounded-2xl editorial-border"
            />
          </div>

        </div>
      </section>

      {/* 5. Highlight Showcase: Flagship Burgers Interactive Stage */}
      <BurgerShowcaseStage />

      {/* 6. Highlight Showcase: The Pinnacle Duo (The Firebird & The Volcano) */}
      <FlagshipDuoFeature />

      {/* 7. Dip Wall Section */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="deep-slate-panel p-6 sm:p-8 rounded-3xl border-brand-gold/30 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono font-bold text-brand-gold uppercase tracking-widest">
                THE 7 DIP WALL · ディップ
              </span>
              <div className="font-script text-2xl text-brand-ember">
                "Big Brother & Little Brother flavor pairings"
              </div>
            </div>
            <span className="text-xs font-mono text-brand-creme/70">Pair any dip with your order</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {UMAMI_DIP_WALL.map(dip => (
              <div key={dip.id} className="bg-white/[0.06] p-3 rounded-2xl border border-brand-gold/20 hover:border-brand-ember transition">
                <div className="font-sans font-bold text-xs text-brand-creme truncate">{dip.name}</div>
                <div className="text-[10px] text-brand-gold font-mono pt-0.5">{dip.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Section: Recent Journal Articles (Posts 1-3) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b editorial-border-light pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase mb-1">
              <BookOpen className="w-3.5 h-3.5 text-brand-ember" />
              <span>THE UMAMI JOURNAL</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne text-brand-dark">
              Writing on taste, fire, and Chandigarh food
            </h2>
          </div>

          <Link
            to="/journal"
            className="text-xs font-mono font-bold text-brand-ember hover:underline self-start sm:self-auto"
          >
            <span>View all articles ↗</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map(post => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              className="bg-white rounded-3xl p-6 editorial-border hover:border-brand-ember shadow-sm hover:shadow-md transition flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="text-brand-ember font-bold">{post.category}</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="font-syne font-bold text-base sm:text-lg text-brand-dark group-hover:text-brand-ember transition leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-zinc-600 font-sans line-clamp-3 leading-relaxed">
                  {post.quickAnswer}
                </p>
              </div>

              <div className="pt-2 border-t editorial-border-light flex items-center gap-1 text-xs font-mono font-bold text-brand-dark group-hover:text-brand-ember">
                <span>Read article</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. Section: Find us (Booth No. 7) */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-6 sm:p-12 rounded-3xl editorial-border shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase">
              <MapPin className="w-3.5 h-3.5 text-brand-ember" />
              <span>FIND US</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black font-syne text-brand-dark">
              Booth No. 7, Inner Market, Sector 8B, Chandigarh.
            </h3>
            <p className="text-sm text-zinc-600 font-sans leading-relaxed">
              Counter kitchen with an open live fire grill. Opening 1 October 2026.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <Link
              to="/visit"
              className="flex-1 md:flex-initial px-6 py-4 rounded-2xl bg-brand-dark text-white font-syne font-bold text-sm hover:bg-brand-ember transition flex items-center justify-center gap-2 shadow-lg min-h-[48px]"
            >
              <MapPin className="w-4 h-4 text-brand-ember" />
              <span>Visit Us & Directions</span>
            </Link>

            <Link
              to="/order"
              className="flex-1 md:flex-initial px-6 py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm transition flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/25 min-h-[48px]"
            >
              <span>Get Launch VIP Pass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
