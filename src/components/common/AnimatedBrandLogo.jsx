import React, { useState } from 'react';

export default function AnimatedBrandLogo({ 
  size = 'md', 
  className = '', 
}) {
  const [hasLoaded, setHasLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl',
    md: 'w-13 h-13 sm:w-16 sm:h-16 rounded-2xl',
    lg: 'w-20 h-20 rounded-3xl',
    xl: 'w-24 h-24 rounded-3xl',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`relative overflow-hidden shrink-0 bg-brand-dark flex items-center justify-center border-2 border-brand-ember/50 shadow-xl shadow-brand-ember/25 group-hover:scale-105 group-hover:border-brand-ember transition transform duration-300 ${selectedSize} ${className}`}
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
        className={`w-full h-full object-cover filter brightness-105 contrast-115 transition-opacity duration-500 ${
          hasLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      >
        <source src="/videos/umami-fire-optimized.mp4" type="video/mp4" />
        <source src="/videos/umami-fire.webm" type="video/webm" />
      </video>

      {/* Clean Edge Rim Accent */}
      <div className="absolute inset-0 rounded-[inherit] border border-white/20 pointer-events-none" />
    </div>
  );
}
