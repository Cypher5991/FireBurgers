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
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Module 02 · Interactive Dual-View Cut & Pour
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
            THE VOLCANO <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">"CUT & POUR"</span> SLIDER
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Drag the split-slider to reveal what lies inside: a pressurized core of molten smoked gouda erupting through 4-hour mirin & soy caramelized onions.
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
              className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden cursor-ew-resize border border-black/10 select-none shadow-xl group bg-black"
            >
              {/* Layer 1: Flame-Seared Exterior Crust */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=80"
                  alt="Binchotan Charcoal Seared Exterior Crust"
                  className="w-full h-full object-cover filter contrast-125 brightness-95"
                />
                <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-xl text-left border-black/5 pointer-events-none shadow-md">
                  <div className="text-[10px] uppercase font-bold text-zinc-500">Exterior View</div>
                  <div className="font-syne font-bold text-sm text-brand-dark">300°C Binchotan Robata Crust</div>
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
                <div className="absolute top-6 right-6 glass-panel-glow px-4 py-2 rounded-xl text-right pointer-events-none shadow-md">
                  <div className="text-[10px] uppercase font-bold text-brand-orange">Cross Section</div>
                  <div className="font-syne font-bold text-sm text-amber-600">88°C Molten Gouda Volcano</div>
                </div>
              </div>

              {/* Slider Handle Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-orange shadow-[0_0_20px_#FF5500] pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-10 h-10 -ml-[19px] rounded-full bg-brand-orange border-2 border-white shadow-2xl flex items-center justify-center text-white">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass-panel px-4 py-1.5 rounded-full text-xs text-zinc-800 font-semibold pointer-events-none flex items-center gap-2 shadow-md">
                <span>◀ Drag across to inspect molten core ▶</span>
              </div>
            </div>

            {/* Quick Slider Shortcuts */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setSliderPos(20)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition ${
                  sliderPos < 35 ? 'bg-brand-orange text-white border-brand-orange shadow-md' : 'glass-panel text-zinc-600 border-black/5 hover:text-black'
                }`}
              >
                Show 80% Interior
              </button>
              <button
                onClick={() => setSliderPos(50)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition ${
                  sliderPos >= 35 && sliderPos <= 65 ? 'bg-brand-orange text-white border-brand-orange shadow-md' : 'glass-panel text-zinc-600 border-black/5 hover:text-black'
                }`}
              >
                50/50 Split View
              </button>
              <button
                onClick={() => setSliderPos(80)}
                className={`text-xs px-3.5 py-1.5 rounded-xl border font-semibold transition ${
                  sliderPos > 65 ? 'bg-brand-orange text-white border-brand-orange shadow-md' : 'glass-panel text-zinc-600 border-black/5 hover:text-black'
                }`}
              >
                Show 80% Exterior
              </button>
            </div>
          </div>

          {/* Telemetry & Specs HUD (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                  Live Thermal Telemetry
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              <div className="space-y-4">
                {/* Metric 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-700 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-brand-orange" />
                      Core Molten Flow Temp
                    </span>
                    <span className="font-mono font-bold text-amber-600">88.4°C</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-orange to-brand-amber w-[88%]" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-700 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-brand-orange" />
                      Binchotan Charcoal Sear
                    </span>
                    <span className="font-mono font-bold text-brand-orange">300°C Robata</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-600 to-brand-orange w-[96%]" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-700 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                      Umami Density Score
                    </span>
                    <span className="font-mono font-bold text-emerald-600">99.4 / 100</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99%]" />
                  </div>
                </div>
              </div>

              {/* Japanese Technique Note */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/60 space-y-1">
                <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">
                  The Japanese Fire Technique
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed">
                  We freeze the smoked gouda core before encasing it in prime ground beef. Searing over Kishu Binchotan charcoal liquefies the center precisely at the 6-minute mark.
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => addToCart(volcanoItem, 1)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/25 hover:brightness-105 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                Add Volcano Burger (₹399)
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
