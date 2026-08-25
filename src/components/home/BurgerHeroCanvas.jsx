import React, { useState, useEffect, useRef } from 'react';
import { TOP_FEATURED_BURGERS } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Layers, 
  ShoppingBag, 
  Check, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Utensils
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BurgerHeroCanvas() {
  const [activeBurgerIndex, setActiveBurgerIndex] = useState(0);
  const [viewMode, setViewMode] = useState('exploded'); // 'exploded' | 'assembled'
  const [explosion, setExplosion] = useState(65);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const sectionRef = useRef(null);

  const currentBurger = TOP_FEATURED_BURGERS[activeBurgerIndex];
  const currentLayers = currentBurger.layers;
  const activeLayer = currentLayers[selectedLayerIndex] || currentLayers[0];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        onUpdate: (self) => {
          // Dynamic slight explosion adjustment on scroll
          const dynamicExp = Math.round(40 + self.progress * 45);
          if (viewMode === 'exploded') {
            setExplosion(dynamicExp);
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [viewMode]);

  const handlePrevBurger = () => {
    setActiveBurgerIndex((prev) => (prev === 0 ? TOP_FEATURED_BURGERS.length - 1 : prev - 1));
    setSelectedLayerIndex(2);
  };

  const handleNextBurger = () => {
    setActiveBurgerIndex((prev) => (prev === TOP_FEATURED_BURGERS.length - 1 ? 0 : prev + 1));
    setSelectedLayerIndex(2);
  };

  const handleSelectBurger = (index) => {
    setActiveBurgerIndex(index);
    setSelectedLayerIndex(2);
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: currentBurger.id,
        name: currentBurger.name,
        price: currentBurger.price,
        dietary: currentBurger.dietary,
        image: currentBurger.heroImage,
        description: currentBurger.description,
        badge: currentBurger.badge
      },
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section 
      ref={sectionRef}
      id="hero-canvas" 
      className="relative min-h-[95vh] pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center bg-brand-canvas"
    >
      {/* Subtle Japanese Minimalist Background Kanji Watermark */}
      <div className="absolute right-4 top-16 text-[180px] lg:text-[280px] font-japanese text-[#141416]/[0.03] select-none pointer-events-none leading-none z-0">
        {currentBurger.kanji}
      </div>

      {/* Light Ambient Warmth Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#F5A623]/10 via-[#E23A0B]/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Swiss Editorial Top Grid Bar */}
      <div className="max-w-7xl mx-auto w-full mb-6 relative z-10 border-b editorial-border-light pb-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono tracking-wider">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 bg-brand-dark text-brand-canvas font-bold rounded">
            SPEC ARCHIVE
          </span>
          <span className="text-brand-dark/70 font-semibold hidden sm:inline">
            CHANDIGARH SECTOR 8-B · 3D ROBATAYAKI DECONSTRUCTION
          </span>
        </div>

        {/* Carousel Burger Selectors */}
        <div className="flex items-center gap-2">
          <span className="text-brand-muted text-[11px] hidden sm:inline">SIGNATURE ROTATION:</span>
          <div className="flex items-center gap-1 bg-white border border-brand-dark/10 p-1 rounded-xl shadow-sm">
            {TOP_FEATURED_BURGERS.map((burger, idx) => (
              <button
                key={burger.id}
                onClick={() => handleSelectBurger(idx)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold font-syne transition ${
                  activeBurgerIndex === idx
                    ? 'bg-brand-dark text-brand-canvas shadow-sm'
                    : 'text-zinc-600 hover:text-brand-dark hover:bg-zinc-100'
                }`}
              >
                {burger.specIndex}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Realigned H1 SEO Header, Swiss Spec Sheet & Action */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Index & Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-brand-canvas text-xs font-mono font-bold tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5 text-brand-ember" />
              <span>{currentBurger.specIndex} · {currentBurger.kanji}</span>
            </div>
            
            <div className="text-xs font-mono font-bold text-brand-ember bg-brand-ember/10 px-2.5 py-1 rounded-full border border-brand-ember/20">
              {currentBurger.badge}
            </div>
          </div>

          {/* Realigned H1 SEO Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight leading-[1.08] text-brand-dark">
              Gourmet Fire-Grilled Burgers & 5AM Milk Buns in Sector 8, Chandigarh
            </h1>
            <p className="text-sm sm:text-base font-bold text-brand-ember tracking-wide uppercase mt-2 font-mono flex items-center gap-2">
              <span>{currentBurger.name}</span>
              <span className="text-zinc-400">/</span>
              <span className="text-brand-glaze font-medium">{currentBurger.tagline}</span>
            </p>
          </div>

          <p className="text-zinc-700 text-sm sm:text-base leading-relaxed font-sans">
            {currentBurger.description}
          </p>

          {/* Deep Slate Editorial Spec Matrix */}
          <div className="deep-slate-panel rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] font-mono text-zinc-400">
              <span className="uppercase tracking-wider">GASTRONOMY ARCHITECTURE</span>
              <span className="text-brand-glaze font-bold">{currentBurger.calories}</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-xs">
              {currentBurger.specs.map((spec, i) => (
                <div key={i} className="bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                  <div className="text-[10px] text-zinc-400 font-mono">{spec.label}</div>
                  <div className="font-syne font-bold text-white mt-0.5">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order & Navigation Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-ember to-brand-glaze text-white font-syne font-extrabold text-base px-6 py-4 rounded-2xl shadow-xl shadow-brand-ember/25 hover:scale-[1.02] active:scale-[0.98] transition"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Order {currentBurger.name} · ₹{currentBurger.price}</span>
                  </>
                )}
              </button>

              <Link
                to="/order"
                className="px-5 py-4 rounded-2xl border editorial-border-light hover:border-brand-ember bg-white text-brand-dark font-syne font-bold text-sm transition hover:shadow-md flex items-center gap-1.5"
              >
                <span>Full Menu</span>
                <ArrowRight className="w-4 h-4 text-brand-ember" />
              </Link>
            </div>

            {/* Prev / Next Burger Carousel Buttons */}
            <div className="flex items-center justify-between pt-1 text-xs font-mono text-zinc-600">
              <button
                onClick={handlePrevBurger}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border editorial-border-light hover:border-brand-dark text-brand-dark font-bold transition shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>PREV SPEC</span>
              </button>

              <div className="flex items-center gap-1 font-bold text-brand-dark font-mono">
                <span>0{activeBurgerIndex + 1}</span>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-400">0{TOP_FEATURED_BURGERS.length}</span>
              </div>

              <button
                onClick={handleNextBurger}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border editorial-border-light hover:border-brand-dark text-brand-dark font-bold transition shadow-sm"
              >
                <span>NEXT SPEC</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Deconstructed Layer Canvas / Rotating Showcase */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Top Control Bar: View Toggle & Deconstruction Slider */}
          <div className="w-full bg-white/95 backdrop-blur-md border editorial-border-light p-3 rounded-2xl mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setViewMode('exploded')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold font-syne transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'exploded'
                    ? 'bg-brand-dark text-brand-canvas shadow'
                    : 'text-zinc-600 hover:text-brand-dark'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-brand-ember" />
                <span>3D Exploded Layers</span>
              </button>

              <button
                onClick={() => setViewMode('assembled')}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold font-syne transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'assembled'
                    ? 'bg-brand-dark text-brand-canvas shadow'
                    : 'text-zinc-600 hover:text-brand-dark'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-brand-glaze" />
                <span>Studio View</span>
              </button>
            </div>

            {/* Deconstruction Intensity Slider */}
            {viewMode === 'exploded' && (
              <div className="flex items-center gap-2.5 w-full sm:w-60 bg-zinc-50 px-3 py-1.5 rounded-xl border border-black/5">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Explode</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={explosion}
                  onChange={(e) => setExplosion(Number(e.target.value))}
                  className="w-full h-1.5 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-brand-ember"
                />
                <span className="text-xs font-mono font-bold text-brand-ember min-w-[32px] text-right">
                  {explosion}%
                </span>
              </div>
            )}
          </div>

          {/* Interactive Visual Stage Canvas */}
          <div className="w-full h-[490px] sm:h-[530px] rounded-3xl relative flex items-center justify-center overflow-hidden border editorial-border-light bg-gradient-to-b from-[#FFFDF9] via-[#F6F2EA] to-[#ECE7DC] shadow-2xl">
            
            {/* Studio Chiaroscuro Rim Flare */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,58,11,0.12)_0%,transparent_65%)] pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Corner Editorial Marks */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-brand-muted uppercase tracking-widest">
              POS: 30° AXONOMETRIC · LAYER TELEMETRY
            </div>
            <div className="absolute top-4 right-4 font-mono text-[10px] text-brand-ember font-bold">
              {currentBurger.kanji}
            </div>

            {viewMode === 'assembled' ? (
              /* High-End Studio Photography Mode */
              <div className="relative w-full h-full flex items-center justify-center p-6 animate-fade-in">
                <div className="relative group max-w-md">
                  <img
                    src={currentBurger.heroImage}
                    alt={currentBurger.name}
                    className="w-80 sm:w-96 h-80 sm:h-96 object-cover rounded-3xl shadow-2xl ring-4 ring-white rim-light transition duration-500 group-hover:scale-105"
                  />

                  {/* Studio Spec Tags */}
                  <div className="absolute -top-3 -left-3 slate-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl text-white">
                    <span className="text-xl">🔥</span>
                    <div>
                      <div className="text-[9px] uppercase font-mono text-zinc-400">Sear Standard</div>
                      <div className="text-xs font-syne font-bold text-brand-glaze">{currentBurger.searTemp}</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-3 -right-3 slate-card px-3.5 py-2 rounded-2xl flex items-center gap-2.5 shadow-xl text-white">
                    <span className="text-xl">🍞</span>
                    <div>
                      <div className="text-[9px] uppercase font-mono text-zinc-400">Bake Protocol</div>
                      <div className="text-xs font-syne font-bold text-white">{currentBurger.bakeTime}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Snapshot Card */}
                <div className="absolute bottom-4 left-6 right-6 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border editorial-border-light flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-brand-ember font-bold block">
                      {currentBurger.specIndex} Assembled Profile
                    </span>
                    <span className="font-syne font-bold text-sm text-brand-dark">
                      {currentBurger.name} · ₹{currentBurger.price}
                    </span>
                  </div>

                  <button
                    onClick={() => setViewMode('exploded')}
                    className="text-xs px-3.5 py-2 rounded-xl bg-brand-dark text-brand-canvas font-syne font-bold hover:bg-brand-ember transition flex items-center gap-1.5"
                  >
                    <Layers className="w-3.5 h-3.5 text-brand-ember" />
                    <span>Deconstruct Layers</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 3D Deconstructed Layer Stack */
              <div 
                className="relative w-full h-full flex flex-col items-center justify-center p-4"
                style={{ perspective: '1200px' }}
              >
                {/* 3D Rotated Stack */}
                <div 
                  className="relative w-80 sm:w-96 h-96 flex flex-col items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    transform: 'rotateX(14deg) rotateY(-10deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {currentLayers.map((layer, index) => {
                    const isSelected = selectedLayerIndex === index;
                    const separationFactor = (explosion / 50);
                    const translateY = (layer.offset * separationFactor * -1.05);

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerIndex(index)}
                        className={`absolute cursor-pointer transition-all duration-300 group ${
                          isSelected ? 'z-30 scale-105' : 'z-10 hover:scale-102'
                        }`}
                        style={{
                          transform: `translateY(${translateY}px) translateZ(${index * 24}px)`,
                        }}
                      >
                        <div className={`relative px-4 sm:px-5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-brand-dark text-brand-canvas shadow-2xl ring-2 ring-brand-ember shadow-brand-dark/50'
                            : 'bg-white/95 hover:bg-white border editorial-border-light text-brand-dark shadow-md'
                        }`}>
                          <span className="text-2xl filter drop-shadow-sm">{layer.icon}</span>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-syne font-bold text-xs sm:text-sm tracking-tight">
                                {layer.name}
                              </span>
                              <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                                isSelected ? 'bg-brand-ember text-white' : 'bg-brand-ember/15 text-brand-ember'
                              }`}>
                                {layer.highlight}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-mono ${
                                isSelected ? 'text-zinc-300' : 'text-zinc-500'
                              }`}>
                                {layer.sub}
                              </span>
                              <span className="text-zinc-400 text-[10px]">·</span>
                              <span className={`text-[10px] font-mono font-semibold ${
                                isSelected ? 'text-brand-glaze' : 'text-brand-ember'
                              }`}>
                                {layer.temp}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Layer Inspector Detail Drawer (Bottom Overlay) */}
                <div className="absolute bottom-3 left-4 right-4 bg-brand-dark/95 text-brand-canvas backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl p-2 bg-white/10 rounded-xl">{activeLayer.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-brand-ember font-bold uppercase">
                          LAYER 0{selectedLayerIndex + 1} / 0{currentLayers.length}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-white/10 rounded text-zinc-300 font-mono">
                          {activeLayer.temp}
                        </span>
                      </div>
                      <div className="font-syne font-bold text-xs sm:text-sm text-white">
                        {activeLayer.name}
                      </div>
                      <p className="text-[11px] text-zinc-300 line-clamp-1 max-w-sm sm:max-w-md mt-0.5 font-sans">
                        {activeLayer.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {currentLayers.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedLayerIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition ${
                          selectedLayerIndex === i ? 'bg-brand-ember scale-125' : 'bg-white/30 hover:bg-white/60'
                        }`}
                        title={`Layer ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Bottom Thumbnails Strip for Quick Burger Switch */}
          <div className="w-full mt-3 grid grid-cols-4 gap-2">
            {TOP_FEATURED_BURGERS.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => handleSelectBurger(idx)}
                className={`p-2 rounded-xl text-left border transition flex items-center gap-2 ${
                  activeBurgerIndex === idx
                    ? 'bg-white border-brand-ember ring-2 ring-brand-ember/30 shadow-md'
                    : 'bg-white/60 hover:bg-white editorial-border-light opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={b.heroImage}
                  alt={b.name}
                  className="w-8 h-8 rounded-lg object-cover shrink-0"
                />
                <div className="overflow-hidden hidden sm:block">
                  <div className="text-[9px] font-mono font-bold text-brand-ember truncate">{b.specIndex}</div>
                  <div className="text-[11px] font-syne font-bold text-brand-dark truncate">{b.name}</div>
                </div>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
