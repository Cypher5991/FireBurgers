import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Utensils, MapPin, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center space-y-8">
      <div className="w-16 h-16 rounded-3xl bg-brand-dark text-brand-ember flex items-center justify-center mx-auto border border-brand-ember/30 shadow-xl">
        <Flame className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        <div className="text-xs font-mono font-bold text-brand-ember uppercase tracking-widest">
          404 · PAGE NOT FOUND
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-syne text-brand-dark">
          The fire is somewhere else.
        </h1>
        <p className="text-sm text-zinc-600 font-sans max-w-md mx-auto leading-relaxed">
          The page you are looking for does not exist. Explore our menu or find directions to our Sector 8B counter below.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/menu"
          className="px-6 py-3.5 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm shadow-xl shadow-brand-ember/30 transition flex items-center gap-2 min-h-[48px]"
        >
          <Utensils className="w-4 h-4" />
          <span>See The Menu</span>
        </Link>

        <Link
          to="/visit"
          className="px-6 py-3.5 rounded-2xl bg-white border editorial-border hover:border-brand-ember text-brand-dark font-syne font-bold text-sm transition flex items-center gap-2 min-h-[48px]"
        >
          <MapPin className="w-4 h-4 text-brand-ember" />
          <span>Visit Sector 8B</span>
        </Link>
      </div>
    </div>
  );
}
