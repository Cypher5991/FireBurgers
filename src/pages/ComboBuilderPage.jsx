import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Utensils, Check, ShoppingBag, Sparkles, Flame, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const DIP_OPTIONS = [
  { id: 'big-bro', name: 'Big Bro Yuzu Tare', price: 49, icon: '🥫' },
  { id: 'lil-bro', name: 'Lil Bro Toum Aioli', price: 49, icon: '🧄' },
  { id: 'ghost-mango', name: 'Ghost Togarashi Mango', price: 59, icon: '🌶️' },
  { id: 'truffle-glaze', name: 'Truffle Miso Emulsion', price: 69, icon: '✨' },
];

export default function ComboBuilderPage() {
  const burgers = MENU_ITEMS.filter(i => i.category === 'burgers');
  const sides = MENU_ITEMS.filter(i => i.category === 'sides');
  const drinks = MENU_ITEMS.filter(i => i.category === 'shakes');

  const [selectedBurger, setSelectedBurger] = useState(burgers[0]);
  const [selectedSide, setSelectedSide] = useState(sides[3] || sides[0]);
  const [selectedDrink, setSelectedDrink] = useState(drinks[0]);
  const [selectedDip, setSelectedDip] = useState(DIP_OPTIONS[0]);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  const individualSum = selectedBurger.price + selectedSide.price + selectedDrink.price + selectedDip.price;
  const comboDiscount = 99;
  const comboPrice = individualSum - comboDiscount;

  const handleAddComboToCart = () => {
    const comboProduct = {
      id: `custom-combo-${Date.now()}`,
      name: `Fire Master Tray: ${selectedBurger.name} Bundle`,
      price: comboPrice,
      dietary: selectedBurger.dietary,
      image: selectedBurger.image,
      category: 'combos',
      description: `Includes: ${selectedBurger.name} + ${selectedSide.name} + ${selectedDrink.name} + ${selectedDip.name}`
    };

    addToCart(comboProduct, 1, {
      burger: selectedBurger.name,
      side: selectedSide.name,
      drink: selectedDrink.name,
      dip: selectedDip.name
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Utensils className="w-3.5 h-3.5 text-brand-ember" />
          <span>MEAL ARCHITECTURE · 3D TRAY BUILDER</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
          Engineered Sector 8 <span className="text-brand-ember">Fire Tray</span>
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base font-sans leading-relaxed">
          Curate your bespoke gastronomic meal tray: Select a Binchotan-seared burger, artisanal side, craft drink, and house emulsion. Bundle saves ₹{comboDiscount} instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Step Pickers (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: Burger Selection */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl editorial-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white text-xs font-mono font-bold flex items-center justify-center shadow-sm">
                  01
                </span>
                <h3 className="font-syne font-bold text-lg text-brand-dark">Select Your Fire Burger</h3>
              </div>
              <span className="text-xs font-mono font-bold text-brand-ember">REQUIRED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {burgers.map(b => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBurger(b)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    selectedBurger.id === b.id
                      ? 'bg-brand-dark text-white border-brand-ember shadow-md ring-2 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border hover:border-brand-ember'
                  }`}
                >
                  <img src={b.image} alt={b.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <div className="font-syne font-bold text-xs sm:text-sm truncate">{b.name}</div>
                    <div className="text-[11px] font-mono text-brand-ember font-bold mt-0.5">₹{b.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Side Selection */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl editorial-border shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white text-xs font-mono font-bold flex items-center justify-center shadow-sm">
                  02
                </span>
                <h3 className="font-syne font-bold text-lg text-brand-dark">Select Artisanal Side</h3>
              </div>
              <span className="text-xs font-mono font-bold text-brand-ember">REQUIRED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sides.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSide(s)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    selectedSide.id === s.id
                      ? 'bg-brand-dark text-white border-brand-ember shadow-md ring-2 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border hover:border-brand-ember'
                  }`}
                >
                  <img src={s.image} alt={s.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="overflow-hidden">
                    <div className="font-syne font-bold text-xs sm:text-sm truncate">{s.name}</div>
                    <div className="text-[11px] font-mono text-brand-ember font-bold mt-0.5">₹{s.price}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Drink & Dip Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Drink */}
            <div className="bg-white p-5 rounded-3xl editorial-border shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b editorial-border-light pb-2">
                <span className="w-6 h-6 rounded-lg bg-brand-ember text-white text-xs font-mono font-bold flex items-center justify-center">03</span>
                <h4 className="font-syne font-bold text-sm text-brand-dark">Craft Drink</h4>
              </div>
              <div className="space-y-2">
                {drinks.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDrink(d)}
                    className={`w-full p-2.5 rounded-xl border text-left transition text-xs font-syne font-bold flex items-center justify-between ${
                      selectedDrink.id === d.id
                        ? 'bg-brand-dark text-white border-brand-ember ring-1 ring-brand-ember'
                        : 'bg-zinc-50 editorial-border hover:border-brand-ember text-brand-dark'
                    }`}
                  >
                    <span className="truncate">{d.name}</span>
                    <span className="font-mono text-brand-ember font-bold shrink-0">₹{d.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Dip */}
            <div className="bg-white p-5 rounded-3xl editorial-border shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b editorial-border-light pb-2">
                <span className="w-6 h-6 rounded-lg bg-brand-ember text-white text-xs font-mono font-bold flex items-center justify-center">04</span>
                <h4 className="font-syne font-bold text-sm text-brand-dark">House Dip</h4>
              </div>
              <div className="space-y-2">
                {DIP_OPTIONS.map(dip => (
                  <button
                    key={dip.id}
                    onClick={() => setSelectedDip(dip)}
                    className={`w-full p-2.5 rounded-xl border text-left transition text-xs font-syne font-bold flex items-center justify-between ${
                      selectedDip.id === dip.id
                        ? 'bg-brand-dark text-white border-brand-ember ring-1 ring-brand-ember'
                        : 'bg-zinc-50 editorial-border hover:border-brand-ember text-brand-dark'
                    }`}
                  >
                    <span className="truncate flex items-center gap-1.5">
                      <span>{dip.icon}</span>
                      <span>{dip.name}</span>
                    </span>
                    <span className="font-mono text-brand-ember font-bold shrink-0">₹{dip.price}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: 3D Metal Tray Visualizer & Live Price Engine (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-5">
          <div className="deep-slate-panel p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 border-brand-ember/30">
            
            {/* Tray Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-brand-ember font-bold">
                  TRAY BLUEPRINT SPEC
                </span>
                <h3 className="font-syne font-black text-xl text-white">
                  Sector 8 Master Combo
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-white bg-brand-ember px-3 py-1 rounded-full shadow-md shadow-brand-ember/30">
                SAVE ₹{comboDiscount}
              </span>
            </div>

            {/* Tray Component Visual Stack */}
            <div className="space-y-3 font-sans text-xs">
              
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍔</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">BURGER</div>
                    <div className="font-syne font-bold text-sm text-white">{selectedBurger.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedBurger.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍟</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">SIDE</div>
                    <div className="font-syne font-bold text-sm text-white">{selectedSide.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedSide.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥤</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">DRINK</div>
                    <div className="font-syne font-bold text-sm text-white">{selectedDrink.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedDrink.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{selectedDip.icon}</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">EMULSION DIP</div>
                    <div className="font-syne font-bold text-sm text-white">{selectedDip.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedDip.price}</span>
              </div>

            </div>

            {/* Pricing Breakdown Engine */}
            <div className="pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-zinc-400">
              <div className="flex justify-between">
                <span>Individual Sum</span>
                <span>₹{individualSum}</span>
              </div>
              <div className="flex justify-between text-brand-ember font-bold">
                <span>Combo Bundle Savings</span>
                <span>-₹{comboDiscount}</span>
              </div>
              <div className="flex justify-between text-base font-syne font-black text-white pt-2 border-t border-white/10">
                <span>Combo Total</span>
                <span className="text-brand-ember">₹{comboPrice}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              onClick={handleAddComboToCart}
              className="w-full py-4.5 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 hover:brightness-105 transition active:scale-98"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 text-white" />
                  <span>Combo Added to Order!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add Master Tray to Order · ₹{comboPrice}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
