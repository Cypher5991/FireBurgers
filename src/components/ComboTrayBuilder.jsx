import React, { useState } from 'react';
import { MENU_ITEMS, DIP_WALL } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Utensils, Check, ShoppingBag, Sparkles } from 'lucide-react';

export default function ComboTrayBuilder() {
  const burgers = MENU_ITEMS.filter(i => i.category === 'burgers');
  const sides = MENU_ITEMS.filter(i => i.category === 'sides');
  const drinks = MENU_ITEMS.filter(i => i.category === 'shakes');

  const [selectedBurger, setSelectedBurger] = useState(burgers[0]);
  const [selectedSide, setSelectedSide] = useState(sides[3] || sides[0]);
  const [selectedDrink, setSelectedDrink] = useState(drinks[0]);
  const [selectedDip, setSelectedDip] = useState(DIP_WALL[0]);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  const individualSum = selectedBurger.price + selectedSide.price + selectedDrink.price + selectedDip.price;
  const comboDiscount = 99;
  const comboPrice = individualSum - comboDiscount;

  const handleAddComboToCart = () => {
    const comboProduct = {
      id: `custom-combo-${Date.now()}`,
      name: `Fire Master Tray: ${selectedBurger.name} Combo`,
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
    <section id="combo-builder" className="py-24 px-4 sm:px-6 relative bg-[#FDFCF7] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            Module 05 · Tactile 3D Combo Tray Builder
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
            CUSTOMIZE YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-brand-amber">
              SECTOR 8 FIRE TRAY
            </span>
          </h2>
          <p className="text-zinc-600 text-base sm:text-lg">
            Build your personal 4-piece culinary tray and unlock an instant flat ₹99 combo concession.
          </p>
        </div>

        {/* Builder Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selector Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Burger */}
            <div className="card-light p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  1. Pick Your Fire Burger
                </span>
                <span className="text-xs font-bold text-zinc-600">
                  {selectedBurger.name} (₹{selectedBurger.price})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {burgers.map(b => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBurger(b)}
                    className={`p-2.5 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                      selectedBurger.id === b.id
                        ? 'bg-orange-50 border-brand-orange text-brand-dark font-bold shadow-sm'
                        : 'bg-zinc-50 border-black/5 text-zinc-700 hover:border-black/20'
                    }`}
                  >
                    <span className="line-clamp-1">{b.name}</span>
                    <span className="text-brand-orange text-[11px] font-mono mt-1 font-bold">₹{b.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Select Side */}
            <div className="card-light p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  2. Pick Your Side & Crunch
                </span>
                <span className="text-xs font-bold text-zinc-600">
                  {selectedSide.name} (₹{selectedSide.price})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {sides.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSide(s)}
                    className={`p-2.5 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                      selectedSide.id === s.id
                        ? 'bg-orange-50 border-brand-orange text-brand-dark font-bold shadow-sm'
                        : 'bg-zinc-50 border-black/5 text-zinc-700 hover:border-black/20'
                    }`}
                  >
                    <span className="line-clamp-1">{s.name}</span>
                    <span className="text-brand-orange text-[11px] font-mono mt-1 font-bold">₹{s.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Select Drink */}
            <div className="card-light p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  3. Pick Your Artisanal Cooler / Shake
                </span>
                <span className="text-xs font-bold text-zinc-600">
                  {selectedDrink.name} (₹{selectedDrink.price})
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {drinks.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedDrink(d)}
                    className={`p-2.5 rounded-2xl text-left border transition text-xs flex flex-col justify-between ${
                      selectedDrink.id === d.id
                        ? 'bg-orange-50 border-brand-orange text-brand-dark font-bold shadow-sm'
                        : 'bg-zinc-50 border-black/5 text-zinc-700 hover:border-black/20'
                    }`}
                  >
                    <span className="line-clamp-1">{d.name}</span>
                    <span className="text-brand-orange text-[11px] font-mono mt-1 font-bold">₹{d.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Pick Dip */}
            <div className="card-light p-5 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-orange">
                  4. Pick 1 Dip Wall Sauce
                </span>
                <span className="text-xs font-bold text-zinc-600">
                  {selectedDip.name} (₹{selectedDip.price})
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {DIP_WALL.map(dip => (
                  <button
                    key={dip.id}
                    onClick={() => setSelectedDip(dip)}
                    className={`p-2 rounded-2xl text-left border transition text-xs flex items-center gap-2 ${
                      selectedDip.id === dip.id
                        ? 'bg-orange-50 border-brand-orange text-brand-dark font-bold shadow-sm'
                        : 'bg-zinc-50 border-black/5 text-zinc-700 hover:border-black/20'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dip.color }} />
                    <span className="truncate">{dip.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Visual Serving Tray & Pricing Checkout (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            
            {/* The Visual Heavy Metal Tray Simulation */}
            <div className="bg-gradient-to-b from-[#FAF8F2] to-[#EFECE1] p-6 sm:p-7 rounded-3xl border-2 border-zinc-300 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-brand-orange shadow-lg shadow-brand-orange" />
                  <span className="font-syne font-extrabold text-sm uppercase tracking-wider text-brand-dark">
                    Heavy Cast Serving Tray
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500 font-bold">SECTOR 8 #07</span>
              </div>

              {/* 4 Item Visual Grid on Tray */}
              <div className="grid grid-cols-2 gap-3">
                {/* Burger Slot */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
                  <span className="text-2xl">🍔</span>
                  <div>
                    <div className="text-[10px] uppercase font-extrabold text-brand-orange">Burger</div>
                    <div className="font-syne font-bold text-xs text-brand-dark line-clamp-1">{selectedBurger.name}</div>
                  </div>
                </div>

                {/* Side Slot */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
                  <span className="text-2xl">🍟</span>
                  <div>
                    <div className="text-[10px] uppercase font-extrabold text-amber-600">Side</div>
                    <div className="font-syne font-bold text-xs text-brand-dark line-clamp-1">{selectedSide.name}</div>
                  </div>
                </div>

                {/* Drink Slot */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
                  <span className="text-2xl">🥤</span>
                  <div>
                    <div className="text-[10px] uppercase font-extrabold text-emerald-600">Beverage</div>
                    <div className="font-syne font-bold text-xs text-brand-dark line-clamp-1">{selectedDrink.name}</div>
                  </div>
                </div>

                {/* Dip Slot */}
                <div className="p-4 rounded-2xl bg-white border border-black/10 flex flex-col justify-between h-32 relative overflow-hidden shadow-sm">
                  <span className="text-2xl">🥫</span>
                  <div>
                    <div className="text-[10px] uppercase font-extrabold text-purple-600">House Dip</div>
                    <div className="font-syne font-bold text-xs text-brand-dark line-clamp-1">{selectedDip.name}</div>
                  </div>
                </div>
              </div>

              {/* Real-time Pricing calculation */}
              <div className="pt-3 space-y-2 text-xs border-t border-black/10">
                <div className="flex justify-between text-zinc-500">
                  <span>Individual Items Total</span>
                  <span className="line-through font-mono">₹{individualSum}</span>
                </div>
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Tray Bundle Concession</span>
                  <span className="font-mono">-₹{comboDiscount}</span>
                </div>
                <div className="flex justify-between text-base font-syne font-black text-brand-dark pt-2 border-t border-black/10">
                  <span>Combo Tray Price</span>
                  <span className="text-2xl text-brand-orange font-mono">
                    ₹{comboPrice}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddComboToCart}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/30 hover:scale-102 active:scale-98 transition"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 text-white" />
                    <span>Tray Added to Order!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add Custom Tray · ₹{comboPrice}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
