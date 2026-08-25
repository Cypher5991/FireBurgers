import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function KineticMarquee() {
  const marqueeRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    let currentSkew = 0;
    const skewSetter = gsap.quickSetter(textRef.current, 'skewX', 'deg');
    const clamp = gsap.utils.clamp(-12, 12);

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        currentSkew = clamp(velocity / 300);
        skewSetter(currentSkew);
        
        // Return to 0 skew smoothly
        gsap.to(textRef.current, {
          skewX: 0,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div 
      ref={marqueeRef} 
      className="w-full overflow-hidden py-7 bg-brand-dark border-y border-white/10 select-none my-6 -rotate-[0.5deg] shadow-xl"
    >
      <div 
        ref={textRef} 
        className="flex whitespace-nowrap will-change-transform animate-marquee items-center gap-6"
      >
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center text-2xl sm:text-4xl lg:text-5xl font-black uppercase text-brand-canvas tracking-tighter font-syne shrink-0 gap-6"
          >
            <span>5:00 AM Japanese Milk Buns</span>
            <span className="text-brand-ember">★</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #F6F2EA' }}>
              300°C Binchotan Charcoal Sear
            </span>
            <span className="text-brand-ember">★</span>
            <span>6-Min Counter Rush</span>
            <span className="text-brand-ember">★</span>
            <span>Sector 8-B Flagship</span>
            <span className="text-brand-ember">★</span>
            <span className="text-brand-glaze">Molten Gouda Cores</span>
            <span className="text-brand-ember">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
