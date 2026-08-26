import React, { useState } from 'react';
import { Flame } from 'lucide-react';

export default function AnimatedBrandLogo({ 
  size = 'md', 
  className = '', 
  showIconOverlay = true 
}) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`relative overflow-hidden shrink-0 bg-brand-dark flex items-center justify-center border border-brand-ember/40 shadow-lg shadow-brand-ember/30 group-hover:scale-105 group-hover:border-brand-ember transition transform duration-300 ${selectedSize} ${className}`}
    >
      {/* Fallback & Poster */}
      <img
        src="/videos/umami-fire-poster.jpg"
        alt="UMAMI Live Fire Logo"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          hasLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Looping Live Flame Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setHasLoaded(true)}
        className={`w-full h-full object-cover filter brightness-110 contrast-125 transition-opacity duration-500 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <source src="/videos/umami-fire-optimized.mp4" type="video/mp4" />
        <source src="/videos/umami-fire.webm" type="video/webm" />
      </video>

      {/* Subtle Ember Flare & Flame Silhouette Overlay */}
      {showIconOverlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 flex items-center justify-center pointer-events-none">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90 group-hover:scale-110 transition-transform" />
        </div>
      )}

      {/* Inner Rim Glow */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/20 pointer-events-none" />
    </div>
  );
}
