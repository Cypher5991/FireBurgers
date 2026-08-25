import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Thermometer, Flame, Zap, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { MENU_ITEMS } from '../../data/menuData';

export default function CrossSectionSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const { addToCart } = useCart();
  const volcanoItem = MENU_ITEMS.find(i => i.id === 'volcano-burger') || MENU_ITEMS[0];

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="sensory-reveal" className="py-16 sm:py-24 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12">
      
      {/* Realigned H2 SEO & AEO Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Sparkles className="w-3.5 h-3.5 text-brand-ember" />
          <span>SENSORY REVEAL · 断面カット</span>
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight text-brand-dark">
          Japanese <span className="text-brand-ember">Robata Fire Grilling</span> Meets Pâtisserie Craft
        </h2>
        <p className="text-zinc-600 text-xs sm:text-base font-sans leading-relaxed">
          Drag the hardware-accelerated slider to expose the interior: a pressurized core of molten smoked gouda erupting through 4-hour mirin caramelized onions and 300°C charcoal-seared prime beef.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
        
        {/* Main Split Slider (8 cols) with Touch & Pointer Event Support */}
        <div className="lg:col-span-8 flex flex-col items-center w-full">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
            style={{ touchAction: 'none' }}
            className="relative w-full h-[320px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden cursor-ew-resize select-none editorial-border shadow-2xl group bg-[#141416]"
          >
            {/* Layer 1: Exterior Hard Flame Sear (Underneath) */}
            <div className="absolute inset-0 w-full h-full bg-[#141416] flex items-center justify-center pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
                alt="Flame seared crust exterior"
                className="w-full h-full object-cover filter contrast-125 brightness-95"
              />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#141416]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-brand-ember/30 shadow-lg">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-brand-ember font-mono font-bold">
                  Exterior: 300°C Sear
                </p>
              </div>
            </div>

            {/* Layer 2: Molten Core Pour (Clipped on top) */}
            <div
              className="absolute inset-0 w-full h-full bg-[#141416] pointer-events-none"
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80"
                alt="Molten cheese lava core pour"
                className="w-full h-full object-cover filter contrast-125 saturate-125"
              />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-[#141416]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-brand-ember/30 shadow-lg">
                <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-white font-mono font-bold bg-brand-ember px-2 py-0.5 rounded">
                  Interior: 88°C Lava
                </p>
              </div>
            </div>

            {/* Custom Analog Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-brand-ember shadow-[0_0_20px_#E23A0B] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-11 sm:h-11 bg-brand-dark border-2 border-brand-ember rounded-full flex items-center justify-center shadow-2xl">
                <div className="flex gap-1">
                  <div className="w-0.5 h-3 sm:h-3.5 bg-brand-ember rounded" />
                  <div className="w-0.5 h-3 sm:h-3.5 bg-brand-ember rounded" />
                </div>
              </div>
            </div>

            {/* Bottom Instructions */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-brand-dark/90 text-white backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold pointer-events-none flex items-center gap-1.5 border border-brand-ember/30 whitespace-nowrap">
              <span className="text-brand-ember">◀</span>
              <span>SLIDE CUT & POUR</span>
              <span className="text-brand-ember">▶</span>
            </div>
          </div>

          {/* Quick Slider Ratio Shortcuts */}
          <div className="flex items-center gap-2 mt-3.5 font-mono">
            <button
              onClick={() => setSliderPosition(20)}
              className={`text-xs px-3 py-2 min-h-[40px] rounded-lg border font-bold transition ${
                sliderPosition < 35 ? 'bg-brand-ember text-white border-brand-ember shadow-sm' : 'bg-white text-zinc-600 editorial-border-light hover:text-black hover:border-brand-ember'
              }`}
            >
              80% In
            </button>
            <button
              onClick={() => setSliderPosition(50)}
              className={`text-xs px-3 py-2 min-h-[40px] rounded-lg border font-bold transition ${
                sliderPosition >= 35 && sliderPosition <= 65 ? 'bg-brand-ember text-white border-brand-ember shadow-sm' : 'bg-white text-zinc-600 editorial-border-light hover:text-black hover:border-brand-ember'
              }`}
            >
              50/50 Split
            </button>
            <button
              onClick={() => setSliderPosition(80)}
              className={`text-xs px-3 py-2 min-h-[40px] rounded-lg border font-bold transition ${
                sliderPosition > 65 ? 'bg-brand-ember text-white border-brand-ember shadow-sm' : 'bg-white text-zinc-600 editorial-border-light hover:text-black hover:border-brand-ember'
              }`}
            >
              80% Out
            </button>
          </div>
        </div>

        {/* Telemetry & Specs HUD (4 cols) */}
        <div className="lg:col-span-4 space-y-4 w-full">
          <div className="deep-slate-panel p-5 sm:p-7 rounded-3xl space-y-5 sm:space-y-6 border-brand-ember/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-ember">
                THERMAL TELEMETRY · 遠隔測定
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-ember animate-pulse" />
            </div>

            <div className="space-y-3.5 sm:space-y-4 font-mono text-xs">
              {/* Metric 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Thermometer className="w-3.5 h-3.5 text-brand-ember" />
                    Core Molten Flow Temp
                  </span>
                  <span className="font-bold text-brand-ember">88.4°C</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-ember w-[88%]" />
                </div>
              </div>

              {/* Metric 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-brand-ember" />
                    Binchotan Charcoal Sear
                  </span>
                  <span className="font-bold text-brand-ember">300°C</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-ember w-[96%]" />
                </div>
              </div>

              {/* Metric 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-brand-ember" />
                    Umami Density Index
                  </span>
                  <span className="font-bold text-brand-ember">99.4 / 100</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-ember w-[99%]" />
                </div>
              </div>
            </div>

            {/* Japanese Technique Note */}
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
              <div className="text-[10px] font-mono font-bold text-brand-ember uppercase tracking-wider">
                The Japanese Fire Technique
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                The aged smoked gouda core is blast-chilled before encasement in prime ground chuck. High-heat Binchotan coals liquefy the core precisely at the 6-minute counter mark.
              </p>
            </div>

            {/* Action Button (48px Touch Target) */}
            <button
              onClick={() => addToCart(volcanoItem, 1)}
              className="w-full py-3.5 sm:py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 hover:brightness-105 transition min-h-[48px]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Volcano Burger · ₹399</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
