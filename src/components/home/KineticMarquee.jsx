import React from 'react';

export default function KineticMarquee() {
  return (
    <div 
      className="w-full max-w-full overflow-hidden overflow-x-clip py-4 sm:py-6 bg-brand-dark border-y border-white/10 select-none my-4 sm:my-6 shadow-xl"
    >
      <div 
        className="flex whitespace-nowrap will-change-transform animate-marquee items-center gap-4 sm:gap-6"
      >
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center text-xl sm:text-3xl lg:text-5xl font-black uppercase text-white tracking-tighter font-syne shrink-0 gap-4 sm:gap-6"
          >
            <span>5:00 AM Japanese Milk Buns</span>
            <span className="text-brand-ember animate-pulse">★</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #FFFFFF' }}>
              300°C Charcoal Sear
            </span>
            <span className="text-brand-ember">★</span>
            <span>6-Min Counter Rush</span>
            <span className="text-brand-ember">★</span>
            <span>Sector 8-B Flagship</span>
            <span className="text-brand-ember">★</span>
            <span className="text-brand-ember">Molten Gouda Cores</span>
            <span className="text-brand-ember">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
