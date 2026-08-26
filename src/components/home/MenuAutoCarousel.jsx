import React, { useState, useEffect } from 'react';
import { UMAMI_MENU_ITEMS } from '../../data/umamiMenuData';
import { ChevronLeft, ChevronRight, Sparkles, Flame } from 'lucide-react';

export default function MenuAutoCarousel({ onSelectImage }) {
  const featuredItems = UMAMI_MENU_ITEMS.slice(0, 10); // Top 10 items across burgers, sides, drinks, desserts
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isPaused, featuredItems.length]);

  const current = featuredItems[currentIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  return (
    <div 
      className="relative rounded-3xl overflow-hidden editorial-border shadow-2xl bg-brand-dark group select-none cursor-pointer"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onSelectImage && onSelectImage(current)}
    >
      {/* High-Resolution Item Image with Cross-Fade */}
      <div className="relative h-[360px] sm:h-[460px] w-full overflow-hidden bg-brand-creme-3">
        {featuredItems.map((item, idx) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-95 transform ${
              idx === currentIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
            }`}
          />
        ))}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 z-20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30 pointer-events-none">
          <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md ${
            current.dietary === 'veg' ? 'bg-brand-veg text-white' : 'bg-brand-nonveg text-white'
          }`}>
            {current.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
          </span>
          <span className="text-xs font-japanese font-bold text-brand-ember bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-brand-gold/30">
            旨味 · SEC 8B
          </span>
        </div>

        {/* Navigation Arrows (Visible on Hover) */}
        <button
          onClick={handlePrev}
          aria-label="Previous menu item slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-ember text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition active:scale-95 border border-white/20"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next menu item slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-brand-ember text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition active:scale-95 border border-white/20"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Bottom Caption Card & Slide Progress */}
        <div className="absolute bottom-4 left-4 right-4 z-30 space-y-2">
          
          <div className="p-4 rounded-2xl bg-brand-vert-d/95 text-brand-creme backdrop-blur-md border border-brand-gold/30 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-brand-gold font-bold tracking-widest">
                {current.categoryName || 'Menu Selection'}
              </span>
              <span className="text-[10px] font-mono text-brand-ember font-bold">
                {currentIndex + 1} / {featuredItems.length}
              </span>
            </div>
            <div className="font-sans font-bold text-base text-brand-creme leading-tight">
              {current.name}
            </div>
            <div className="text-xs text-brand-creme/70 font-sans line-clamp-1">
              {current.tagline || current.description}
            </div>
          </div>

          {/* Progress Bars */}
          <div className="flex items-center gap-1.5 px-1">
            {featuredItems.map((_, idx) => (
              <div
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentIndex ? 'bg-brand-ember w-8' : 'bg-white/40 hover:bg-white/70 w-2'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
