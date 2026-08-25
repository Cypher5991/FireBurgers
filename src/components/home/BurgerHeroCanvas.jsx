import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';

export default function BurgerHeroCanvas() {
  const [activeBurgerIndex, setActiveBurgerIndex] = useState(0);
  const [viewMode, setViewMode] = useState('exploded'); // 'exploded' | 'assembled'
  const [explosion, setExplosion] = useState(55);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(2);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const currentBurger = TOP_FEATURED_BURGERS[activeBurgerIndex];
  const currentLayers = currentBurger.layers;
  const activeLayer = currentLayers[selectedLayerIndex] || currentLayers[0];

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
      id="hero-canvas" 
      className="relative min-h-[90vh] pt-4 sm:pt-6 pb-16 sm:pb-20 px-3.5 sm:px-6 lg:px-8 overflow-hidden flex flex-col justify-center"
    >
      {/* Subtle Japanese Minimalist Background Kanji Watermark */}
      <div className="absolute right-2 top-16 text-[140px] sm:text-[220px] lg:text-[280px] font-japanese text-[#141416]/[0.03] select-none pointer-events-none leading-none z-0">
        {currentBurger.kanji}
      </div>

      {/* Red Ambient Warmth Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-gradient-to-br from-[#E23A0B]/10 via-[#E23A0B]/5 to-transparent rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* Swiss Editorial Top Grid Bar */}
      <div className="max-w-7xl mx-auto w-full mb-4 sm:mb-6 relative z-10 border-b editorial-border-light pb-3 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="px-2.5 py-1 bg-brand-ember text-white font-bold rounded shadow-sm">
            SPEC ARCHIVE
          </span>
          <span className="text-brand-dark/70 font-semibold text-[11px] sm:text-xs">
            CHANDIGARH SECTOR 8-B
          </span>
        </div>

        {/* Carousel Burger Selectors with Accessible Touch Targets (44px min height) */}
        <div className="flex items-center gap-2">
          <span className="text-brand-muted text-[11px] hidden sm:inline">ROTATION:</span>
          <div className="flex items-center gap-1 bg-white border editorial-border-light p-1 rounded-xl shadow-sm">
            {TOP_FEATURED_BURGERS.map((burger, idx) => (
              <button
                key={burger.id}
                onClick={() => handleSelectBurger(idx)}
                className={`px-3 py-2 min-h-[40px] rounded-lg text-xs font-bold font-syne transition flex items-center justify-center ${
                  activeBurgerIndex === idx
                    ? 'bg-brand-ember text-white shadow-sm'
                    : 'text-zinc-600 hover:text-brand-ember hover:bg-zinc-100'
                }`}
              >
                {burger.specIndex}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Realigned H1 SEO Header, Swiss Spec Sheet & Red Highlights */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-5">
          
          {/* Index & Red Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
              <Flame className="w-3.5 h-3.5 text-brand-ember animate-bounce" />
              <span>{currentBurger.specIndex} · {currentBurger.kanji}</span>
            </div>
            
            <div className="text-xs font-mono font-bold text-white bg-brand-ember px-3 py-1 rounded-full shadow-sm shadow-brand-ember/30">
              {currentBurger.badge}
            </div>
          </div>

          {/* Realigned H1 SEO Heading with Red Accents */}
          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight leading-[1.12] sm:leading-[1.08] text-brand-dark">
              Gourmet <span className="text-brand-ember">Fire-Grilled</span> Burgers & 5AM Milk Buns in Sector 8, Chandigarh
            </h1>
            <p className="text-xs sm:text-base font-bold text-brand-ember tracking-wide uppercase mt-2 font-mono flex items-center gap-2">
              <span className="bg-brand-ember/10 text-brand-ember px-2 py-0.5 rounded-md border border-brand-ember/20">
                {currentBurger.name}
              </span>
              <span className="text-zinc-400">/</span>
              <span className="text-brand-dark font-medium">{currentBurger.tagline}</span>
            </p>
          </div>

          <p className="text-zinc-700 text-xs sm:text-base leading-relaxed font-sans">
            {currentBurger.description}
          </p>

          {/* Deep Slate Editorial Spec Matrix with Red Borders */}
          <div className="deep-slate-panel rounded-2xl p-3.5 sm:p-4.5 space-y-2.5 sm:space-y-3 border-brand-ember/20 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] font-mono text-zinc-400">
              <span className="uppercase tracking-wider">GASTRONOMY SPEC</span>
              <span className="text-brand-ember font-bold bg-brand-ember/20 px-2 py-0.5 rounded text-white">{currentBurger.calories}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {currentBurger.specs.map((spec, i) => (
                <div key={i} className="bg-white/[0.04] p-2 sm:p-2.5 rounded-xl border border-white/5">
                  <div className="text-[9px] sm:text-[10px] text-zinc-400 font-mono">{spec.label}</div>
                  <div className="font-syne font-bold text-white mt-0.5 text-xs sm:text-sm">{spec.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Order & Navigation Actions with Accessible 48px Touch Targets */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm sm:text-base px-4 sm:px-6 py-3.5 sm:py-4 rounded-2xl shadow-xl shadow-brand-ember/30 hover:scale-[1.02] active:scale-[0.98] transition min-h-[48px]"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Order {currentBurger.name} · ₹{currentBurger.price}</span>
                  </>
                )}
              </button>

              <Link
                to="/order"
                className="px-4 sm:px-5 py-3.5 sm:py-4 rounded-2xl border editorial-border hover:border-brand-ember bg-white text-brand-dark font-syne font-bold text-xs sm:text-sm transition hover:shadow-md flex items-center gap-1.5 min-h-[48px]"
              >
                <span>Menu</span>
                <ArrowRight className="w-4 h-4 text-brand-ember" />
              </Link>
            </div>

            {/* Prev / Next Burger Carousel Buttons */}
            <div className="flex items-center justify-between pt-1 text-xs font-mono text-zinc-600">
              <button
                onClick={handlePrevBurger}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border editorial-border-light hover:border-brand-ember hover:text-brand-ember text-brand-dark font-bold transition shadow-sm min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4 text-brand-ember" />
                <span>PREV</span>
              </button>

              <div className="flex items-center gap-1 font-bold text-brand-dark font-mono">
                <span className="text-brand-ember">0{activeBurgerIndex + 1}</span>
                <span className="text-zinc-400">/</span>
                <span className="text-zinc-400">0{TOP_FEATURED_BURGERS.length}</span>
              </div>

              <button
                onClick={handleNextBurger}
                className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white border editorial-border-light hover:border-brand-ember hover:text-brand-ember text-brand-dark font-bold transition shadow-sm min-h-[44px]"
              >
                <span>NEXT</span>
                <ChevronRight className="w-4 h-4 text-brand-ember" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: 3D Deconstructed Layer Canvas (Responsive Scaling) */}
        <div className="lg:col-span-7 flex flex-col items-center w-full">
          
          {/* Top Control Bar: View Toggle & Deconstruction Slider */}
          <div className="w-full bg-white/95 backdrop-blur-md border editorial-border-light p-2.5 sm:p-3 rounded-2xl mb-3 sm:mb-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2.5">
            
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setViewMode('exploded')}
                className={`flex-1 sm:flex-initial px-3 py-2 min-h-[40px] rounded-lg text-xs font-bold font-syne transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'exploded'
                    ? 'bg-brand-ember text-white shadow'
                    : 'text-zinc-600 hover:text-brand-dark'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>3D Exploded Layers</span>
              </button>

              <button
                onClick={() => setViewMode('assembled')}
                className={`flex-1 sm:flex-initial px-3 py-2 min-h-[40px] rounded-lg text-xs font-bold font-syne transition flex items-center justify-center gap-1.5 ${
                  viewMode === 'assembled'
                    ? 'bg-brand-dark text-white shadow'
                    : 'text-zinc-600 hover:text-brand-dark'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-brand-ember" />
                <span>Studio View</span>
              </button>
            </div>

            {/* Deconstruction Intensity Slider */}
            {viewMode === 'exploded' && (
              <div className="flex items-center gap-2 w-full sm:w-56 bg-zinc-50 px-3 py-2 rounded-xl border border-black/5 min-h-[40px]">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Explode</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={explosion}
                  onChange={(e) => setExplosion(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-300 rounded-lg appearance-none cursor-pointer accent-brand-ember"
                />
                <span className="text-xs font-mono font-bold text-brand-ember min-w-[30px] text-right">
                  {explosion}%
                </span>
              </div>
            )}
          </div>

          {/* Interactive Visual Stage Canvas (Responsive Heights & Padding) */}
          <div className="w-full h-[420px] sm:h-[530px] rounded-3xl relative flex items-center justify-center overflow-hidden border editorial-border-light bg-gradient-to-b from-white via-zinc-50 to-zinc-100 shadow-2xl">
            
            {/* Studio Chiaroscuro Rim Flare */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(226,58,11,0.14)_0%,transparent_65%)] pointer-events-none" />

            {/* Corner Editorial Marks */}
            <div className="absolute top-3 left-3 font-mono text-[9px] sm:text-[10px] text-brand-muted uppercase tracking-widest">
              3D LAYER TELEMETRY
            </div>
            <div className="absolute top-3 right-3 font-mono text-[10px] text-brand-ember font-bold">
              {currentBurger.kanji}
            </div>

            {viewMode === 'assembled' ? (
              /* High-End Studio Photography Mode */
              <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-6 animate-fade-in">
                <div className="relative group max-w-xs sm:max-w-md">
                  <img
                    src={currentBurger.heroImage}
                    alt={currentBurger.name}
                    className="w-64 sm:w-96 h-64 sm:h-96 object-cover rounded-3xl shadow-2xl ring-4 ring-white rim-light transition duration-500 group-hover:scale-105"
                  />

                  {/* Studio Spec Tags with Red Accents */}
                  <div className="absolute -top-2 -left-2 slate-card px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 shadow-xl text-white border border-brand-ember/30">
                    <span className="text-base sm:text-xl">🔥</span>
                    <div>
                      <div className="text-[8px] sm:text-[9px] uppercase font-mono text-zinc-400">Sear Standard</div>
                      <div className="text-[11px] sm:text-xs font-syne font-bold text-brand-ember">{currentBurger.searTemp}</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 slate-card px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 shadow-xl text-white border border-brand-ember/30">
                    <span className="text-base sm:text-xl">🍞</span>
                    <div>
                      <div className="text-[8px] sm:text-[9px] uppercase font-mono text-zinc-400">Bake Protocol</div>
                      <div className="text-[11px] sm:text-xs font-syne font-bold text-white">{currentBurger.bakeTime}</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Snapshot Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border editorial-border-light flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase text-brand-ember font-bold block">
                      {currentBurger.specIndex} Assembled
                    </span>
                    <span className="font-syne font-bold text-xs sm:text-sm text-brand-dark">
                      {currentBurger.name} · ₹{currentBurger.price}
                    </span>
                  </div>

                  <button
                    onClick={() => setViewMode('exploded')}
                    className="text-xs px-3 py-2 rounded-xl bg-brand-ember text-white font-syne font-bold hover:bg-red-700 transition flex items-center gap-1 shadow-md shadow-brand-ember/25 min-h-[40px]"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Explode</span>
                  </button>
                </div>
              </div>
            ) : (
              /* 3D Deconstructed Layer Stack (Responsive Width on Mobile) */
              <div 
                className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-4"
                style={{ perspective: '1000px' }}
              >
                {/* 3D Rotated Stack */}
                <div 
                  className="relative w-72 sm:w-96 h-80 sm:h-96 flex flex-col items-center justify-center transition-all duration-300 ease-out"
                  style={{
                    transform: 'rotateX(12deg) rotateY(-8deg)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {currentLayers.map((layer, index) => {
                    const isSelected = selectedLayerIndex === index;
                    const separationFactor = (explosion / 50);
                    const translateY = (layer.offset * separationFactor * -0.9);

                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerIndex(index)}
                        className={`absolute cursor-pointer transition-all duration-300 group ${
                          isSelected ? 'z-30 scale-105' : 'z-10 hover:scale-102'
                        }`}
                        style={{
                          transform: `translate3d(0, ${translateY}px, ${index * 20}px)`,
                        }}
                      >
                        <div className={`relative px-3 sm:px-5 py-2.5 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 transition-all duration-300 ${
                          isSelected 
                            ? 'bg-brand-dark text-white shadow-2xl ring-2 ring-brand-ember shadow-brand-dark/50'
                            : 'bg-white/95 hover:bg-white border editorial-border-light text-brand-dark shadow-md'
                        }`}>
                          <span className="text-xl sm:text-2xl filter drop-shadow-sm">{layer.icon}</span>
                          
                          <div>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <span className="font-syne font-bold text-xs sm:text-sm tracking-tight truncate max-w-[140px] sm:max-w-none">
                                {layer.name}
                              </span>
                              <span className={`text-[8px] font-mono font-bold uppercase px-1.5 py-0.2 rounded ${
                                isSelected ? 'bg-brand-ember text-white' : 'bg-brand-ember/15 text-brand-ember font-bold'
                              }`}>
                                {layer.highlight}
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className={`text-[9px] sm:text-[10px] font-mono ${
                                isSelected ? 'text-zinc-300' : 'text-zinc-500'
                              }`}>
                                {layer.sub}
                              </span>
                              <span className="text-zinc-400 text-[10px]">·</span>
                              <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-brand-ember">
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
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-4 sm:right-4 bg-brand-dark/95 text-white backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl border border-brand-ember/30 shadow-2xl flex items-center justify-between gap-2 animate-fade-in">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-xl sm:text-2xl p-1.5 sm:p-2 bg-white/10 rounded-xl border border-white/10">{activeLayer.icon}</span>
                    <div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="text-[9px] sm:text-[10px] font-mono text-brand-ember font-bold uppercase">
                          0{selectedLayerIndex + 1}/0{currentLayers.length}
                        </span>
                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 bg-white/10 rounded text-zinc-300 font-mono">
                          {activeLayer.temp}
                        </span>
                      </div>
                      <div className="font-syne font-bold text-xs sm:text-sm text-white truncate max-w-[160px] sm:max-w-none">
                        {activeLayer.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                    {currentLayers.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedLayerIndex(i)}
                        className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition p-1 ${
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

          {/* Bottom Thumbnails Strip for Quick Burger Switch (Accessible 44px touch targets) */}
          <div className="w-full mt-2.5 sm:mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
            {TOP_FEATURED_BURGERS.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => handleSelectBurger(idx)}
                className={`p-1.5 sm:p-2 rounded-xl text-left border transition flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 min-h-[44px] ${
                  activeBurgerIndex === idx
                    ? 'bg-white border-brand-ember ring-2 ring-brand-ember/40 shadow-md'
                    : 'bg-white/60 hover:bg-white editorial-border-light opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={b.heroImage}
                  alt={b.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover shrink-0"
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
