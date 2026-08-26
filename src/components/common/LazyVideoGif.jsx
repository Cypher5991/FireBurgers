import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyVideoGif Component
 * High-performance, battery-friendly, zero-bandwidth-waste replacement for heavy GIFs.
 * Utilizes IntersectionObserver for lazy loading and auto-pause when scrolled out of view.
 */
export default function LazyVideoGif({
  mp4Src = '/videos/umami-fire-optimized.mp4',
  webmSrc = '/videos/umami-fire.webm',
  posterSrc = '/videos/umami-fire-poster.jpg',
  alt = 'Umami Live Fire Grill Charring',
  className = '',
  aspectRatio = '16/9',
}) {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        rootMargin: '250px 0px', // Load 250px before entering viewport
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-zinc-900 ${className}`}
      style={{ aspectRatio }}
    >
      {/* Poster Image (shown immediately with blur transition) */}
      <img
        src={posterSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        loading="lazy"
      />

      {/* Lazy Loaded Looping Silent Video (Acts as ultra-efficient GIF) */}
      {isInView && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          onCanPlay={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          aria-label={alt}
        >
          {webmSrc && <source src={webmSrc} type="video/webm" />}
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Subtle Analog Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/20" />
    </div>
  );
}
