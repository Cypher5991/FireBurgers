import React, { useState } from 'react';
import { BURGER_LAYERS, MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Flame, Layers, ShoppingBag, Check, Eye } from 'lucide-react';

export default function HeroExplodedBurger() {
  const [viewMode, setViewMode] = useState('showcase'); // 'showcase' | 'exploded'
  const [explosion, setExplosion] = useState(65);
  const [selectedLayer, setSelectedLayer] = useState(BURGER_LAYERS[2]);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const volcanoBurgerItem = MENU_ITEMS.find(item => item.id === 'volcano-burger') || MENU_ITEMS[0];

  const handleAddToCart = () => {
    addToCart(volcanoBurgerItem, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="exploded-view" className="relative min-h-[90vh] pt-6 pb-20 px-4 sm:px-6 overflow-hidden flex flex-col justify-center bg-[#FDFCF7]">
      {/* Light Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-br from-amber-200/40 via-orange-100/30 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Brand Hero Text & Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4 animate-bounce text-brand-orange" />
            Japanese Fire Grill Craft · Binchotan Charcoal Soul
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-syne tracking-tight leading-[1.08] text-brand-dark">
            FORGED IN FIRE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-brand-amber">
              MOLTEN CHEESE
            </span> <br />
            VOLCANO CORES.
          </h1>

          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-lg">
            Hokkaido Shokupan milk buns baked daily at <strong className="text-brand-orange font-bold">5:00 AM</strong>, 
            thick prime patties seared over <strong className="text-brand-orange font-bold">300°C Binchotan charcoal</strong>, 
            and explosive molten cheese centers. Handcrafted in Sector 8, Chandigarh.
          </p>

          {/* Quick Badges */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="glass-panel p-3.5 rounded-2xl text-center border-black/5 shadow-sm">
              <div className="font-syne font-black text-xl text-brand-orange">5:00 AM</div>
              <div className="text-[11px] text-zinc-500 font-semibold">Hokkaido Buns</div>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl text-center border-black/5 shadow-sm">
              <div className="font-syne font-black text-xl text-brand-amber">300°C</div>
              <div className="text-[11px] text-zinc-500 font-semibold">Binchotan Robata</div>
            </div>
            <div className="glass-panel p-3.5 rounded-2xl text-center border-black/5 shadow-sm">
              <div className="font-syne font-black text-xl text-emerald-600">6-MIN</div>
              <div className="text-[11px] text-zinc-500 font-semibold">Counter-to-Hand</div>
            </div>
          </div>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-extrabold text-base px-7 py-4 rounded-2xl shadow-xl shadow-brand-orange/30 hover:scale-[1.03] active:scale-[0.98] transition"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Order The Volcano (₹399)</span>
                </>
              )}
            </button>
            <a
              href="#menu"
              className="px-6 py-4 rounded-2xl border border-black/10 hover:border-brand-orange/60 text-zinc-800 hover:text-brand-orange font-syne font-bold transition flex items-center gap-2 glass-panel"
            >
              Explore Menu
            </a>
          </div>
        </div>

        {/* Right Column: Hero Visualizer (Hero Burger Image + 3D Exploded Layer Mode) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Mode Switcher & Controls */}
          <div className="w-full glass-panel-glow p-3.5 rounded-2xl mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('showcase')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'showcase' 
                    ? 'bg-brand-orange text-white shadow-md' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Japanese Burger View</span>
              </button>

              <button
                onClick={() => setViewMode('exploded')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  viewMode === 'exploded' 
                    ? 'bg-brand-orange text-white shadow-md' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Exploded Layers</span>
              </button>
            </div>

            {viewMode === 'exploded' && (
              <div className="flex items-center gap-2 w-full sm:w-56">
                <span className="text-[10px] font-bold text-zinc-500">Deconstruct</span>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={explosion}
                  onChange={(e) => setExplosion(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                />
                <span className="text-[10px] font-bold text-brand-orange">{explosion}%</span>
              </div>
            )}
          </div>

          {/* Main Showcase Canvas / Image Container */}
          <div className="w-full h-[460px] sm:h-[520px] rounded-3xl relative flex items-center justify-center overflow-hidden border border-black/10 bg-gradient-to-b from-[#FFFDF9] to-[#F5F2E9] shadow-2xl">
            
            {/* Ambient Radial Flame */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,199,0,0.18)_0%,transparent_70%)] pointer-events-none" />

            {viewMode === 'showcase' ? (
              /* High-Quality Hero Burger Image Presentation */
              <div className="relative w-full h-full flex items-center justify-center p-6 animate-fade-in">
                {/* Hero Burger Image with Shadow & Flare */}
                <div className="relative group max-w-md">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
                    alt="The Volcano Burger Chandler Japanese Fire Grill"
                    className="w-80 sm:w-96 h-80 sm:h-96 object-cover rounded-3xl shadow-2xl ring-4 ring-white filter contrast-105 group-hover:scale-102 transition duration-500"
                  />
                  
                  {/* Floating Badges */}
                  <div className="absolute -top-3 -left-3 glass-panel-glow px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg animate-bounce">
                    <span className="text-xl">🔥</span>
                    <div>
                      <div className="text-[9px] uppercase font-extrabold text-brand-orange">Binchotan Sear</div>
                      <div className="text-xs font-syne font-black text-brand-dark">300°C Robata Fire</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-3 -right-3 glass-panel-glow px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
                    <span className="text-xl">🧀</span>
                    <div>
                      <div className="text-[9px] uppercase font-extrabold text-amber-600">Molten Core</div>
                      <div className="text-xs font-syne font-black text-brand-dark">Smoked Gouda Lava</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Card */}
                <div className="absolute bottom-4 left-6 right-6 glass-panel p-3.5 rounded-2xl flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-[10px] font-extrabold uppercase text-brand-orange">
                      Signature Japanese Fire Burger
                    </div>
                    <div className="font-syne font-bold text-sm text-brand-dark">
                      The Volcano Burger · ₹399
                    </div>
                  </div>

                  <button
                    onClick={() => setViewMode('exploded')}
                    className="text-xs px-3 py-1.5 rounded-xl bg-brand-orange/10 hover:bg-brand-orange text-brand-orange hover:text-white font-bold transition flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Inspect 5 Layers</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 3D Exploded Burger Layer Visualizer */
              <div 
                className="relative w-full h-full flex flex-col items-center justify-center p-4 animate-fade-in"
                style={{ perspective: '1000px' }}
              >
                <div 
                  className="relative w-80 sm:w-96 h-96 flex flex-col items-center justify-center transition-all duration-300 ease-out"
                  style={{
                    transform: 'rotateX(12deg) rotateY(-8deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {BURGER_LAYERS.map((layer, index) => {
                    const isSelected = selectedLayer?.id === layer.id;
                    const separationFactor = (explosion / 50);
                    const translateY = (layer.offset * separationFactor * -1.1);

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayer(layer)}
                        className={`absolute cursor-pointer transition-all duration-300 group ${
                          isSelected ? 'z-30 scale-105' : 'z-10 hover:scale-102'
                        }`}
                        style={{
                          transform: `translateY(${translateY}px) translateZ(${index * 20}px)`,
                        }}
                      >
                        <div className={`relative px-5 py-3.5 rounded-2xl flex items-center gap-3.5 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white shadow-2xl shadow-brand-orange/40 ring-2 ring-brand-orange'
                            : 'bg-white/95 hover:bg-white border border-black/10 text-zinc-800 shadow-md'
                        }`}>
                          <span className="text-2xl filter drop-shadow-sm">{layer.icon}</span>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-syne font-bold text-xs sm:text-sm tracking-tight">
                                {layer.name}
                              </span>
                              <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                isSelected ? 'bg-black/30 text-white' : 'bg-brand-orange/15 text-brand-orange'
                              }`}>
                                {layer.highlight}
                              </span>
                            </div>
                            <span className={`text-[10px] block font-mono font-medium ${
                              isSelected ? 'text-white/90' : 'text-zinc-500'
                            }`}>
                              {layer.temp}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected Layer Info HUD Box */}
                {selectedLayer && (
                  <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6 glass-panel-glow p-3.5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5 max-w-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-orange">
                          {selectedLayer.tag}
                        </span>
                        <span className="text-zinc-400">•</span>
                        <span className="text-[11px] font-mono text-amber-600 font-bold">
                          {selectedLayer.temp}
                        </span>
                      </div>
                      <h4 className="font-syne font-bold text-brand-dark text-sm">
                        {selectedLayer.name}
                      </h4>
                      <p className="text-xs text-zinc-600 leading-snug">
                        {selectedLayer.description}
                      </p>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xs font-syne font-bold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 whitespace-nowrap self-end sm:self-center"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add (₹399)
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
