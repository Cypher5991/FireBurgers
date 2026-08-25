import React from 'react';
import { BRAND_INFO } from '../data/menuData';
import { Flame, Star } from 'lucide-react';

export default function MarqueeBanner() {
  const mantras = [...BRAND_INFO.marqueeMantras, ...BRAND_INFO.marqueeMantras];

  return (
    <div className="relative py-6 bg-gradient-to-r from-brand-orange via-[#FF3B00] to-brand-amber text-brand-darker font-syne font-black overflow-hidden -rotate-1 shadow-2xl z-20 select-none my-6">
      {/* Track 1: Moving left */}
      <div className="flex whitespace-nowrap animate-marquee items-center gap-8">
        {mantras.map((mantra, idx) => (
          <div key={idx} className="flex items-center gap-8 text-lg sm:text-2xl uppercase tracking-tighter">
            <span>{mantra}</span>
            <Flame className="w-5 h-5 fill-current text-white/90 drop-shadow animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
