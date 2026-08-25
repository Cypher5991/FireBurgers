import React, { useState } from 'react';
import { Sparkles, Plus, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const SAUCES = [
  { 
    id: 'big-bro', 
    name: 'Big Bro Yuzu Tare', 
    price: 49, 
    notes: 'Tangy, deeply savory smoked reduction infused with Japanese Kochi yuzu zest', 
    scores: { umami: 95, heat: 50, acid: 75, sweet: 40, smoke: 85 } 
  },
  { 
    id: 'lil-bro', 
    name: 'Lil Bro Toum Aioli', 
    price: 49, 
    notes: 'Creamy emulsified aerated garlic herb mayo with roasted sesame oil', 
    scores: { umami: 70, heat: 20, acid: 60, sweet: 55, smoke: 30 } 
  },
  { 
    id: 'ghost-mango', 
    name: 'Ghost Togarashi Mango', 
    price: 59, 
    notes: 'Bhut Jolokia ghost pepper heat cut with sweet Alphonso pulp and mirin', 
    scores: { umami: 45, heat: 98, acid: 80, sweet: 85, smoke: 40 } 
  },
  { 
    id: 'truffle-glaze', 
    name: 'Truffle Miso Emulsion', 
    price: 69, 
    notes: 'Italian black winter truffle, aged white miso & French butter glaze', 
    scores: { umami: 100, heat: 10, acid: 55, sweet: 35, smoke: 70 } 
  },
  { 
    id: 'sweet-beet', 
    name: 'Sweet Beet Balsamic', 
    price: 49, 
    notes: 'Fermented organic beetroot glaze, aged Modena balsamic reduction & honey', 
    scores: { umami: 60, heat: 15, acid: 85, sweet: 90, smoke: 25 } 
  },
  { 
    id: 'smoky-mustard', 
    name: 'Smoky Wasabi Mustard', 
    price: 49, 
    notes: 'Stone-ground Dijon mustard with freshly grated Shizuoka wasabi root & applewood smoke', 
    scores: { umami: 80, heat: 75, acid: 70, sweet: 30, smoke: 90 } 
  },
  { 
    id: 'herb-tahini', 
    name: 'Toasted Herb Tahini', 
    price: 49, 
    notes: 'Roasted white sesame paste with mint, sumac, clarified lemon and parsley oil', 
    scores: { umami: 85, heat: 25, acid: 65, sweet: 35, smoke: 45 } 
  },
];

export default function DipRadarVisualizer() {
  const [activeSauce, setActiveSauce] = useState(SAUCES[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // Convert 0-100 scores into 5-point radar polygon coordinates
  const getRadarPoints = (scores) => {
    const center = 150;
    const radius = 105;
    const keys = ['umami', 'heat', 'sweet', 'smoke', 'acid'];
    
    return keys.map((key, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const value = (scores[key] / 100) * radius;
      const x = center + value * Math.cos(angle);
      const y = center + value * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const handleAddDip = () => {
    addToCart({
      id: `dip-${activeSauce.id}`,
      name: `${activeSauce.name} (House Emulsion)`,
      price: activeSauce.price,
      dietary: 'veg',
      image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80',
      category: 'dips'
    }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section id="dip-radar" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Sparkles className="w-3.5 h-3.5 text-brand-ember" />
          <span>FLAVOR DYNAMICS · 7つの特製ソース</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
          The 7 <span className="text-brand-ember">Proprietary</span> House Emulsions
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base font-sans leading-relaxed">
          Every burger is engineered to pair with a specific sauce profile. Inspect our 5-axis tasting radar to discover your ideal balance of umami, heat, acid, sweetness, and wood smoke.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Radar SVG Panel (6 cols) */}
        <div className="lg:col-span-6 relative flex flex-col justify-center items-center bg-brand-dark p-8 sm:p-10 rounded-3xl border border-brand-ember/30 shadow-2xl overflow-hidden">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Concentric Reference Webs */}
              {[0.25, 0.5, 0.75, 1].map((r, idx) => (
                <polygon
                  key={idx}
                  points={getRadarPoints({ umami: r * 100, heat: r * 100, acid: r * 100, sweet: r * 100, smoke: r * 100 })}
                  fill="none"
                  stroke="#FFFFFF"
                  strokeOpacity={0.12}
                  strokeWidth="1.5"
                />
              ))}

              {/* Axis Spoke Lines */}
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                const x = 150 + 105 * Math.cos(angle);
                const y = 150 + 105 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1="150"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="#FFFFFF"
                    strokeOpacity={0.15}
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                );
              })}

              {/* Dynamic Value Polygon */}
              <polygon
                points={getRadarPoints(activeSauce.scores)}
                fill="#E23A0B"
                fillOpacity={0.45}
                stroke="#E23A0B"
                strokeWidth="2.5"
                className="transition-all duration-500 ease-out filter drop-shadow-[0_0_15px_rgba(226,58,11,0.6)]"
              />
            </svg>

            {/* Radar Metric Axis Labels */}
            <span className="absolute top-1 text-[11px] font-mono font-bold text-brand-ember">UMAMI</span>
            <span className="absolute right-1 top-1/3 text-[11px] font-mono font-bold text-brand-ember">HEAT</span>
            <span className="absolute right-6 bottom-3 text-[11px] font-mono font-bold text-zinc-300">SWEET</span>
            <span className="absolute left-6 bottom-3 text-[11px] font-mono font-bold text-brand-ember">SMOKE</span>
            <span className="absolute left-1 top-1/3 text-[11px] font-mono font-bold text-zinc-300">ACID</span>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 w-full flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>SELECTED: <strong className="text-white">{activeSauce.name}</strong></span>
            <span className="text-brand-ember font-bold bg-brand-ember/20 px-2 py-0.5 rounded text-white">₹{activeSauce.price}</span>
          </div>
        </div>

        {/* Sauce Selection List (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-ember">
              The Dip Matrix · 7 Flavors
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark">
              {activeSauce.name}
            </h3>
            <p className="text-sm text-zinc-700 font-sans leading-relaxed">
              {activeSauce.notes}
            </p>
          </div>

          {/* Grid of Sauce Selection Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5">
            {SAUCES.map((sauce) => (
              <button
                key={sauce.name}
                onClick={() => setActiveSauce(sauce)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  activeSauce.name === sauce.name
                    ? 'bg-brand-dark text-white border-brand-ember shadow-lg ring-2 ring-brand-ember'
                    : 'bg-white text-brand-dark editorial-border-light hover:border-brand-ember shadow-sm'
                }`}
              >
                <div className="font-syne font-bold text-xs sm:text-sm">{sauce.name}</div>
                <div className="flex items-center justify-between mt-2 font-mono text-[11px]">
                  <span className={activeSauce.name === sauce.name ? 'text-brand-ember font-bold' : 'text-zinc-500'}>
                    ₹{sauce.price}
                  </span>
                  <span className="text-[10px] opacity-80 text-brand-ember font-bold">
                    {sauce.scores.umami}% Umami
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Add Dip Button */}
          <div className="pt-2">
            <button
              onClick={handleAddDip}
              className="w-full py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/25 hover:brightness-105 transition"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Added {activeSauce.name} to Tray!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {activeSauce.name} to Order (₹{activeSauce.price})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
