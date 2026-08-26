import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { Flame, Clock, Plus, Check, SlidersHorizontal, Sparkles, X } from 'lucide-react';

export default function MenuShowcase() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { addToCart } = useCart();

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
    return matchesCategory && matchesDietary;
  });

  const availableAddons = [
    { id: 'extra-cheese', name: 'Extra Molten Gouda Core', price: 69 },
    { id: 'double-patty', name: 'Double Flame-Seared Patty', price: 129 },
    { id: 'truffle-dust', name: 'Black Truffle Umami Dust', price: 49 },
    { id: 'house-pickle-side', name: 'Extra 72-Hr Dill Pickles', price: 29 },
  ];

  const handleOpenCustomize = (item) => {
    setCustomizingItem(item);
    setSelectedAddons([]);
  };

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    const extraTotal = selectedAddons.reduce((acc, a) => acc + a.price, 0);
    const customizedProduct = {
      ...customizingItem,
      price: customizingItem.price + extraTotal,
      name: selectedAddons.length > 0 ? `${customizingItem.name} (Custom)` : customizingItem.name,
    };
    addToCart(customizedProduct, 1, { addons: selectedAddons.map(a => a.name) });
    setCustomizingItem(null);
  };

  return (
    <section id="menu" className="py-24 px-4 sm:px-6 relative bg-[#FDFCF7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              Module 03 · Fire Menu Matrix
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
              CRAFTED FOR CHANDIGARH'S <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">
                EPICUREAN PALATE
              </span>
            </h2>
          </div>

          {/* Dietary Filter Pill */}
          <div className="flex items-center gap-2 bg-zinc-100 p-1.5 rounded-2xl border border-black/5 self-start md:self-auto">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                dietaryFilter === 'all' ? 'bg-white text-brand-dark shadow-md' : 'text-zinc-500 hover:text-black'
              }`}
            >
              All Dishes
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'veg' ? 'bg-emerald-500 text-white shadow-md' : 'text-zinc-500 hover:text-emerald-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              Pure Veg
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'non-veg' ? 'bg-red-500 text-white shadow-md' : 'text-zinc-500 hover:text-red-600'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {MENU_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-syne font-bold whitespace-nowrap transition-all duration-200 border ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-white border-brand-orange shadow-lg shadow-brand-orange/25 scale-[1.02]'
                  : 'glass-panel text-zinc-700 border-black/5 hover:border-brand-orange/40 hover:text-brand-orange'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item, idx) => {
            const isBurger = item.category === 'burgers';
            return (
              <div
                key={item.id}
                className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                  isBurger && idx === 0
                    ? 'deep-slate-panel border-white/10 hover:border-brand-orange/50 shadow-2xl'
                    : 'bg-white border-brand-dark/10 hover:border-brand-orange/50 shadow-lg'
                }`}
              >
                <div>
                  {/* Product Image (Clean Canvas) */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-zinc-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.dietary === 'veg' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
                      </span>
                      {item.prepTime && (
                        <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-amber" />
                          <span>{item.prepTime}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange mb-0.5">
                          {item.tagline}
                        </div>
                        <h3 className={`font-syne font-bold text-xl tracking-tight transition ${
                          isBurger && idx === 0 ? 'text-white group-hover:text-brand-orange' : 'text-brand-dark group-hover:text-brand-orange'
                        }`}>
                          {item.name}
                        </h3>
                      </div>
                      <div className={`font-syne font-black text-2xl whitespace-nowrap ${
                        isBurger && idx === 0 ? 'text-brand-amber' : 'text-brand-dark'
                      }`}>
                        ₹{item.price}
                      </div>
                    </div>

                    <p className={`text-xs leading-relaxed line-clamp-2 ${
                      isBurger && idx === 0 ? 'text-zinc-300' : 'text-zinc-600'
                    }`}>
                      {item.description}
                    </p>

                    {/* Ingredient Spec Tags */}
                    {item.ingredients && item.ingredients.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.ingredients.slice(0, 3).map((ing, i) => (
                          <span 
                            key={i} 
                            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                              isBurger && idx === 0
                                ? 'bg-white/[0.06] border-white/10 text-zinc-300'
                                : 'bg-zinc-100 border-black/5 text-zinc-600'
                            }`}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pairing Recommendation */}
                    {item.pairWith && (
                      <div className="pt-2 flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <Sparkles className="w-3 h-3 text-brand-orange flex-shrink-0" />
                        <span className="truncate">Pair: <strong className={isBurger && idx === 0 ? 'text-zinc-200' : 'text-zinc-700'}>{item.pairWith}</strong></span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => handleOpenCustomize(item)}
                    className={`p-3 rounded-xl border transition ${
                      isBurger && idx === 0
                        ? 'bg-white/10 border-white/15 text-zinc-300 hover:text-white hover:border-brand-orange'
                        : 'bg-zinc-50 border-brand-dark/10 hover:border-brand-orange text-zinc-600 hover:text-brand-orange'
                    }`}
                    title="Customize Ingredients"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => addToCart(item, 1)}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber hover:brightness-105 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-orange/20 transition transform active:scale-98"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Order · ₹{item.price}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl border border-black/10">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-orange font-bold">Customize Item</span>
                <h3 className="font-syne font-black text-2xl text-brand-dark">{customizingItem.name}</h3>
                <p className="text-xs text-zinc-500">{customizingItem.tagline}</p>
              </div>
              <button 
                onClick={() => setCustomizingItem(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Addon checkboxes */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-zinc-700 uppercase tracking-wider">
                Select Upgrades & Extras:
              </div>
              {availableAddons.map(addon => {
                const isSelected = selectedAddons.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                      isSelected 
                        ? 'bg-orange-50 border-brand-orange text-brand-dark' 
                        : 'bg-zinc-50 border-black/5 text-zinc-700 hover:border-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-brand-orange border-brand-orange text-white' : 'border-zinc-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-semibold">{addon.name}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-brand-orange">+₹{addon.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-zinc-500 uppercase font-bold">Customized Total</div>
                <div className="font-syne font-black text-2xl text-brand-dark">
                  ₹{customizingItem.price + selectedAddons.reduce((acc, a) => acc + a.price, 0)}
                </div>
              </div>

              <button
                onClick={handleAddCustomizedToCart}
                className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-bold text-sm shadow-xl hover:brightness-105 transition"
              >
                Add Customized to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
