import React, { useState } from 'react';
import { DIP_WALL } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Sparkles, Plus, Check, Award, Zap } from 'lucide-react';

export default function DipWallRadar() {
  const [activeDip, setActiveDip] = useState(DIP_WALL[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddDip = () => {
    addToCart({
      id: `dip-${activeDip.id}`,
      name: `${activeDip.name} (House Dip)`,
      price: activeDip.price,
      dietary: 'veg',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
      category: 'dips'
    }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const renderRadarPolygon = (radar) => {
    const center = 150;
    const radius = 100;
    const axes = [
      { key: 'umami', angle: -Math.PI / 2 },
      { key: 'heat', angle: -Math.PI / 2 + (2 * Math.PI / 5) },
      { key: 'acidity', angle: -Math.PI / 2 + (4 * Math.PI / 5) },
      { key: 'sweetness', angle: -Math.PI / 2 + (6 * Math.PI / 5) },
      { key: 'smoke', angle: -Math.PI / 2 + (8 * Math.PI / 5) }
    ];

    const points = axes.map(axis => {
      const val = (radar[axis.key] || 50) / 100;
      const x = center + radius * val * Math.cos(axis.angle);
      const y = center + radius * val * Math.sin(axis.angle);
      return `${x},${y}`;
    }).join(' ');

    return points;
  };

  return (
    <section id="dip-wall" className="py-24 px-4 sm:px-6 relative bg-[#F9F8F2] border-t border-b border-black/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-orange-200/40 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Module 04 · The 7 Dip Wall & Flavor Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
            THE 7 HOUSE DIPS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-brand-amber">
              TASTING RADAR
            </span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Every dip is whipped fresh in-house from scratch. Select a sauce to view its 5-dimensional sensory balance and pairing profile.
          </p>
        </div>

        {/* Interactive Dip Carousel / Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {DIP_WALL.map(dip => {
            const isSelected = activeDip.id === dip.id;
            return (
              <button
                key={dip.id}
                onClick={() => setActiveDip(dip)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-white border-brand-orange shadow-xl shadow-brand-orange/15 scale-[1.03] ring-2 ring-brand-orange'
                    : 'bg-white/80 border-black/5 hover:border-black/20 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-md"
                    style={{ backgroundColor: dip.color }}
                  />
                  <span className="font-mono text-xs font-bold text-zinc-500">
                    ₹{dip.price}
                  </span>
                </div>

                <div>
                  <h4 className={`font-syne font-bold text-sm leading-tight transition ${
                    isSelected ? 'text-brand-dark' : 'text-zinc-700 group-hover:text-brand-dark'
                  }`}>
                    {dip.name}
                  </h4>
                  <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                    {dip.tag}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Dip Details & Dynamic Radar HUD */}
        <div className="glass-panel-glow rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Info Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full shadow"
                style={{ backgroundColor: activeDip.color }}
              />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                {activeDip.tag}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-black font-syne text-brand-dark">
                {activeDip.name}
              </h3>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed">
                {activeDip.description}
              </p>
            </div>

            {/* Recommended Pairings */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-brand-orange" />
                Recommended Burger & Side Pairings:
              </div>
              <div className="flex flex-wrap gap-2">
                {activeDip.pairings.map((pair, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 border border-black/5 font-semibold"
                  >
                    🔥 {pair}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Add Dip CTA */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={handleAddDip}
                className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-bold text-sm shadow-xl shadow-brand-orange/20 flex items-center gap-2 hover:scale-102 transition"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added {activeDip.name}!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {activeDip.name} (₹{activeDip.price})</span>
                  </>
                )}
              </button>

              <span className="text-xs text-zinc-500 font-medium">
                Freshly portioned in 60ml recyclable dip jars.
              </span>
            </div>
          </div>

          {/* Right SVG Radar Chart Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#FAF8F2] rounded-3xl border border-black/5 shadow-inner">
            <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-brand-orange" />
              5-Axis Flavor Profile Matrix
            </div>

            <svg viewBox="0 0 300 300" className="w-64 h-64 sm:w-72 sm:h-72">
              {/* Radar Grid Web */}
              {[0.25, 0.5, 0.75, 1.0].map((level, i) => {
                const r = 100 * level;
                const pts = [0, 1, 2, 3, 4].map(idx => {
                  const angle = -Math.PI / 2 + (idx * 2 * Math.PI / 5);
                  return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
                }).join(' ');
                return (
                  <polygon
                    key={i}
                    points={pts}
                    fill="none"
                    stroke="#D6D3C8"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Axis Spoke Lines */}
              {[0, 1, 2, 3, 4].map(idx => {
                const angle = -Math.PI / 2 + (idx * 2 * Math.PI / 5);
                const x2 = 150 + 100 * Math.cos(angle);
                const y2 = 150 + 100 * Math.sin(angle);
                return (
                  <line
                    key={idx}
                    x1="150"
                    y1="150"
                    x2={x2}
                    y2={y2}
                    stroke="#D6D3C8"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Active Dip Filled Polygon */}
              <polygon
                points={renderRadarPolygon(activeDip.radar)}
                fill="rgba(255, 85, 0, 0.28)"
                stroke="#FF5500"
                strokeWidth="3"
                className="transition-all duration-500 ease-out"
              />

              {/* Axis Labels */}
              <text x="150" y="24" textAnchor="middle" fill="#D97706" fontSize="11" fontWeight="bold" fontFamily="Inter">UMAMI ({activeDip.radar.umami})</text>
              <text x="268" y="115" textAnchor="start" fill="#EA580C" fontSize="11" fontWeight="bold" fontFamily="Inter">HEAT ({activeDip.radar.heat})</text>
              <text x="228" y="275" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold" fontFamily="Inter">ACIDITY ({activeDip.radar.acidity})</text>
              <text x="72" y="275" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="bold" fontFamily="Inter">SWEET ({activeDip.radar.sweetness})</text>
              <text x="32" y="115" textAnchor="end" fill="#B45309" fontSize="11" fontWeight="bold" fontFamily="Inter">SMOKE ({activeDip.radar.smoke})</text>
            </svg>

            {/* Quick Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] text-zinc-600 mt-2 font-medium">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Umami</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-orange" /> Heat</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> Acidity</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-600" /> Sweetness</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
