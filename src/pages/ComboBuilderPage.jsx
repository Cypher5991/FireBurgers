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
    const customCombo = {
      id: `custom-combo-${Date.now()}`,
      name: `Metal Tray: ${selectedBurger.name} + ${selectedSide.name}`,
      price: comboPrice,
      dietary: selectedBurger.dietary,
      image: selectedBurger.image,
      category: 'combo',
      description: `Includes ${selectedBurger.name}, ${selectedSide.name}, ${selectedDrink.name}, and ${selectedDip.name} (Bundled ₹99 off).`
    };

    addToCart(customCombo, 1, {
      burger: selectedBurger.name,
      side: selectedSide.name,
      drink: selectedDrink.name,
      dip: selectedDip.name
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="py-8 sm:py-10 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-12 pb-36 lg:pb-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Flame className="w-3.5 h-3.5 text-brand-ember" />
          <span>COMBO ARCHITECTURE · セット組み立て</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-syne tracking-tight text-brand-dark">
          Build Your <span className="text-brand-ember">Custom Metal Fire Tray</span>
        </h1>
        <p className="text-zinc-600 text-xs sm:text-base font-sans leading-relaxed">
          Assemble a complete Japanese robata feast: choose your prime burger, seasoned crispy side, artisan beverage, and house emulsion dip. Save flat ₹99 instantly on every full tray.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Step-by-Step Architecture Pickers (8 cols) */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          
          {/* STEP 1: Burger Selection */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border editorial-border space-y-3 sm:space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white font-mono font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <h2 className="font-syne font-bold text-base sm:text-lg text-brand-dark">
                  Select Prime Gourmet Burger
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden xs:inline">Required Step</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {burgers.map((b) => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBurger(b)}
                  className={`p-3 sm:p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 min-h-[56px] ${
                    selectedBurger.id === b.id
                      ? 'bg-red-50/70 border-brand-ember shadow-md ring-1 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border-light hover:border-brand-ember'
                  }`}
                >
                  <img src={b.image} alt={b.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-xs sm:text-sm text-brand-dark truncate">{b.name}</span>
                      <span className="font-mono text-xs font-bold text-brand-ember">₹{b.price}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{b.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 2: Side Selection */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border editorial-border space-y-3 sm:space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white font-mono font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <h2 className="font-syne font-bold text-base sm:text-lg text-brand-dark">
                  Select Seasoned Crunch Side
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden xs:inline">Included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {sides.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSide(s)}
                  className={`p-3 sm:p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 min-h-[56px] ${
                    selectedSide.id === s.id
                      ? 'bg-red-50/70 border-brand-ember shadow-md ring-1 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border-light hover:border-brand-ember'
                  }`}
                >
                  <img src={s.image} alt={s.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-xs sm:text-sm text-brand-dark truncate">{s.name}</span>
                      <span className="font-mono text-xs font-bold text-brand-ember">₹{s.price}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 3: Drink Selection */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border editorial-border space-y-3 sm:space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white font-mono font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <h2 className="font-syne font-bold text-base sm:text-lg text-brand-dark">
                  Select Shakes & Craft Drinks
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden xs:inline">Included</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {drinks.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDrink(d)}
                  className={`p-3 sm:p-4 rounded-2xl border cursor-pointer transition flex items-center gap-3 min-h-[56px] ${
                    selectedDrink.id === d.id
                      ? 'bg-red-50/70 border-brand-ember shadow-md ring-1 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border-light hover:border-brand-ember'
                  }`}
                >
                  <img src={d.image} alt={d.name} className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="font-syne font-bold text-xs sm:text-sm text-brand-dark truncate">{d.name}</span>
                      <span className="font-mono text-xs font-bold text-brand-ember">₹{d.price}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">{d.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 4: Dip Selection */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border editorial-border space-y-3 sm:space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b editorial-border-light pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-brand-ember text-white font-mono font-bold text-xs flex items-center justify-center">
                  04
                </span>
                <h2 className="font-syne font-bold text-base sm:text-lg text-brand-dark">
                  Select House Emulsion Dip
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-500 hidden xs:inline">Included</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {DIP_OPTIONS.map((dip) => (
                <div
                  key={dip.id}
                  onClick={() => setSelectedDip(dip)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex flex-col items-center justify-center text-center gap-1.5 min-h-[72px] ${
                    selectedDip.id === dip.id
                      ? 'bg-red-50/70 border-brand-ember shadow-md ring-1 ring-brand-ember'
                      : 'bg-zinc-50 editorial-border-light hover:border-brand-ember'
                  }`}
                >
                  <span className="text-2xl">{dip.icon}</span>
                  <div className="font-syne font-bold text-xs text-brand-dark leading-tight">{dip.name}</div>
                  <span className="font-mono text-[10px] text-brand-ember font-bold">₹{dip.price}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Live Blueprint Tray Spec (4 cols) */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="deep-slate-panel p-5 sm:p-7 rounded-3xl space-y-5 sm:space-y-6 border-brand-ember/20 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-ember">
                  TRAY BLUEPRINT SPEC
                </span>
                <h3 className="font-syne font-black text-xl text-white">Custom Metal Combo</h3>
              </div>
              <span className="text-[10px] font-mono font-bold bg-brand-ember text-white px-2 py-1 rounded-full shadow-sm">
                SAVE ₹99
              </span>
            </div>

            {/* Selected Components Recap */}
            <div className="space-y-2.5 text-xs">
              
              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍔</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">BURGER</div>
                    <div className="font-syne font-bold text-sm text-white truncate max-w-[150px]">{selectedBurger.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedBurger.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🍟</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">SIDE</div>
                    <div className="font-syne font-bold text-sm text-white truncate max-w-[150px]">{selectedSide.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedSide.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">🥤</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">DRINK</div>
                    <div className="font-syne font-bold text-sm text-white truncate max-w-[150px]">{selectedDrink.name}</div>
                  </div>
                </div>
                <span className="font-mono text-brand-ember font-bold">₹{selectedDrink.price}</span>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{selectedDip.icon}</span>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase">EMULSION DIP</div>
                    <div className="font-syne font-bold text-sm text-white truncate max-w-[150px]">{selectedDip.name}</div>
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
              className="w-full py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 hover:brightness-105 transition active:scale-98 min-h-[48px]"
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

      {/* Floating Mobile Summary Bar (Sticky above bottom nav bar on mobile) */}
      <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-3 animate-fade-in">
        <div className="bg-brand-dark text-white p-3.5 rounded-3xl border border-brand-ember/40 shadow-2xl flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Combo Total (Save ₹99)</div>
            <div className="font-syne font-black text-lg text-brand-ember">₹{comboPrice}</div>
          </div>

          <button
            onClick={handleAddComboToCart}
            className="px-5 py-3 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-xs flex items-center gap-2 shadow-lg shadow-brand-ember/30 transition min-h-[44px]"
          >
            {added ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add Tray · ₹{comboPrice}</span>
              </>
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
