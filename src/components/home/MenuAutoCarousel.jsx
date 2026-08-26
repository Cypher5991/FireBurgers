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
      className="relative rounded-3xl overflow-hidden editorial-border shadow-2xl bg-brand-dark group select-none cursor-pointer flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => onSelectImage && onSelectImage(current)}
    >
      {/* High-Resolution Item Image with Cross-Fade */}
      <div className="relative h-[300px] sm:h-[400px] w-full overflow-hidden bg-brand-creme-3 shrink-0">
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
      </div>

      {/* Bottom Caption Card & Slide Progress (Normal Flow) */}
      <div className="p-4 sm:p-5 bg-brand-vert-d text-brand-creme space-y-3 z-30">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                current.dietary === 'veg' ? 'bg-brand-veg text-white' : 'bg-brand-nonveg text-white'
              }`}>
                {current.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
              </span>
              <span className="text-[10px] font-mono uppercase text-brand-gold font-bold tracking-widest">
                {current.categoryName || 'Menu Selection'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-japanese font-bold text-brand-ember">
                旨味 · SEC 8B
              </span>
              <span className="text-[10px] font-mono text-brand-gold font-bold">
                {currentIndex + 1} / {featuredItems.length}
              </span>
            </div>
          </div>
          <div className="font-sans font-bold text-base sm:text-lg text-brand-creme leading-tight">
            {current.name}
          </div>
          <div className="text-xs sm:text-sm text-brand-creme/70 font-sans line-clamp-1 sm:line-clamp-2">
            {current.tagline || current.description}
          </div>
        </div>

        {/* Progress Bars */}
        <div className="flex items-center gap-1.5 pt-1">
          {featuredItems.map((_, idx) => (
            <div
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentIndex ? 'bg-brand-ember w-8' : 'bg-white/20 hover:bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
