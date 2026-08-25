import React, { useState, useRef } from 'react';
import { Flame, Sparkles, Thermometer, Zap, Eye, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { MENU_ITEMS } from '../data/menuData';

export default function VolcanoCutPour() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);
  const { addToCart } = useCart();
  const volcanoItem = MENU_ITEMS.find(i => i.id === 'volcano-burger') || MENU_ITEMS[0];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  const handleTouchMove = (e) => {
    if (!containerRef.current || !e.touches[0]) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section id="volcano-pour" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#F9F8F2] border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>INDEX 02 · 断面カット · DUAL-VIEW CUT & POUR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
            THE VOLCANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">"CUT & POUR"</span> SLIDER
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base font-sans leading-relaxed">
            Drag the split-slider to reveal the core: a pressurized volcano of molten smoked gouda erupting through 4-hour mirin & soy caramelized onions.
          </p>
        </div>

        {/* Interactive Comparison Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visualizer (8 cols) */}
          <div className="lg:col-span-8 flex flex-col items-center">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden cursor-ew-resize border border-brand-dark/10 select-none shadow-2xl group bg-black"
            >
              {/* Layer 1: Flame-Seared Exterior Crust */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
                  alt="Binchotan Charcoal Seared Exterior Crust"
                  className="w-full h-full object-cover filter contrast-125 brightness-95"
                />
                <div className="absolute top-6 left-6 slate-card px-4 py-2 rounded-xl text-left border-white/10 pointer-events-none shadow-xl text-white">
                  <div className="text-[10px] uppercase font-mono text-zinc-400">EXTERIOR VIEW</div>
                  <div className="font-syne font-bold text-sm text-white">300°C Binchotan Charcoal Crust</div>
                </div>
              </div>

              {/* Layer 2: Molten Volcano Core Cross-Section */}
              <div
                className="absolute inset-0 overflow-hidden flex items-center justify-center transition-all"
                style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
              >
                <img
                  src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1200&q=80"
                  alt="Molten Cheese Lava Interior"
                  className="w-full h-full object-cover filter contrast-125 saturate-125"
                />
                <div className="absolute top-6 right-6 deep-slate-panel px-4 py-2 rounded-xl text-right pointer-events-none shadow-xl border-brand-orange/40">
                  <div className="text-[10px] uppercase font-mono font-bold text-brand-orange">CROSS SECTION</div>
                  <div className="font-syne font-bold text-sm text-brand-amber">88°C Molten Gouda Volcano</div>
                </div>
              </div>

              {/* Slider Handle Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-orange shadow-[0_0_20px_#FF5500] pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-10 h-10 -ml-[19px] rounded-full bg-brand-dark border-2 border-brand-orange shadow-2xl flex items-center justify-center text-white">
                  <Eye className="w-4 h-4 text-brand-orange" />
                </div>
              </div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-brand-dark/90 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-bold pointer-events-none flex items-center gap-2 shadow-md border border-white/10">
                <span>◀ DRAG TO INSPECT MOLTEN CORE ▶</span>
              </div>
            </div>

            {/* Quick Slider Shortcuts */}
            <div className="flex items-center gap-2 mt-4 font-mono">
              <button
                onClick={() => setSliderPos(20)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                  sliderPos < 35 ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-zinc-600 border-brand-dark/10 hover:text-black'
                }`}
              >
                80% Interior
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                  sliderPos >= 35 && sliderPos <= 65 ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-zinc-600 border-brand-dark/10 hover:text-black'
                }`}
              >
                50/50 Split
              </button>
              <button
                onClick={() => setSliderPos(80)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-bold transition ${
                  sliderPos > 65 ? 'bg-brand-dark text-white border-brand-dark shadow-md' : 'bg-white text-zinc-600 border-brand-dark/10 hover:text-black'
                }`}
              >
                80% Exterior
              </button>
            </div>
          </div>

          {/* Telemetry & Specs HUD (4 cols) - Deep Slate Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="deep-slate-panel p-6 sm:p-7 rounded-3xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-orange">
                  THERMAL TELEMETRY · 遠隔測定
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
              </div>

              <div className="space-y-4 font-mono text-xs">
                {/* Metric 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-brand-orange" />
                      Core Molten Flow Temp
                    </span>
                    <span className="font-bold text-brand-amber">88.4°C</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-orange to-brand-amber w-[88%]" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-brand-orange" />
                      Binchotan Charcoal Sear
                    </span>
                    <span className="font-bold text-brand-orange">300°C</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-brand-orange w-[96%]" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-zinc-300">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-brand-mint" />
                      Umami Density Score
                    </span>
                    <span className="font-bold text-brand-mint">99.4 / 100</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-mint w-[99%]" />
                  </div>
                </div>
              </div>

              {/* Japanese Technique Note */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                <div className="text-[10px] font-mono font-bold text-brand-amber uppercase tracking-wider">
                  The Japanese Fire Technique
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                  We freeze the smoked gouda core before encasing it in prime ground beef. Searing over Kishu Binchotan charcoal liquefies the center precisely at the 6-minute mark.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => addToCart(volcanoItem, 1)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/25 hover:brightness-105 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Volcano Burger · ₹399</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
