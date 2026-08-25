import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Flame, Clock, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { UMAMI_BRAND_INFO } from '../data/umamiMenuData';

export default function StoryPage() {
  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">The Story</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b editorial-border-light pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Compass className="w-3.5 h-3.5 text-brand-ember" />
          <span>THE ORIGIN & CRAFT · 由来</span>
        </div>
        
        {/* H1 as specified in Content Pack */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne tracking-tight text-brand-dark leading-[1.08]">
          We named it after the taste.
        </h1>

        <p className="text-sm sm:text-base font-mono text-brand-ember font-bold">
          UMAMI · Booth No. 7, Inner Market, Sector 8B, Chandigarh
        </p>
      </div>

      {/* Story Narrative */}
      <div className="space-y-10 text-zinc-800 font-sans leading-relaxed text-base">
        
        {/* Opening section */}
        <div className="space-y-4 text-base sm:text-lg">
          <p className="font-medium text-brand-dark">
            There's a fifth taste. The Japanese named it umami in 1908, and it is the deep savoury note underneath everything you crave. It is also, as it happens, the exact thing a great burger has been chasing for a hundred years.
          </p>
          <p className="text-zinc-600">
            Our founder spent fifteen years chasing it. Every recipe cooked, tested and argued over on the line until the burger was right. So we named the place after the taste, and then we had to earn the name.
          </p>
        </div>

        {/* Feature Image */}
        <div className="rounded-3xl overflow-hidden editorial-border shadow-xl bg-zinc-900 my-8">
          <img
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80"
            alt="UMAMI Japanese Fire Grill Craft in Sector 8B Chandigarh"
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>

        {/* Pillar 1: The Bun */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white editorial-border space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-brand-ember uppercase">
            <span className="w-2 h-2 rounded-full bg-brand-ember" />
            <span>01 · TANGZHONG METHOD</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark">
            The bun
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
            A Hokkaido milk bun, baked here at dawn. It is softer than a burger bun has any right to be, and strong enough to hold a thick patty and everything on it without falling apart in your hands. Getting that balance right took longer than anything else on the menu.
          </p>
        </div>

        {/* Pillar 2: The Fire */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-dark text-white border border-brand-ember/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-brand-ember uppercase">
            <Flame className="w-3.5 h-3.5" />
            <span>02 · 300°C LIVE CHARCOAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-syne text-white">
            The fire
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Live fire, hard char, thick patty. Fire does something to meat that a flat top cannot, and it is the reason our burgers taste the way they do. You can watch it happen at the counter.
          </p>
        </div>

        {/* Pillar 3: The Discipline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white editorial-border space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-brand-ember uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>03 · 144 SQ FT DISCIPLINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark">
            The discipline
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
            Every patty is the same weight. Every cook is the same cook. Most of the judgment happens before service, in the prep, so that when the fire is going the line is executing, not deciding. That is the least romantic part of the story and the reason your burger is the same on a Tuesday as it was on a Saturday.
          </p>
        </div>

        {/* Pillar 4: Chandigarh */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white editorial-border space-y-3 shadow-sm">
          <div className="flex items-center gap-2.5 text-xs font-mono font-bold text-brand-ember uppercase">
            <MapPin className="w-3.5 h-3.5 text-brand-ember" />
            <span>04 · THE SECTOR 8 CIRCUIT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark">
            Chandigarh
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
            We built this for here. For this city's appetite, for Sector 8, for the evening on the route. Not a concept imported wholesale, a burger built for the people eating it.
          </p>
        </div>

        {/* Closing takeaway */}
        <div className="pt-6 border-t editorial-border-light text-center space-y-4">
          <p className="font-syne font-black text-xl sm:text-2xl text-brand-dark">
            We named it after the taste. Then we built the burger to earn it.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2">
            <Link
              to="/menu"
              className="px-8 py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm shadow-xl shadow-brand-ember/30 transition flex items-center gap-2 min-h-[48px]"
            >
              <span>Explore the menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
