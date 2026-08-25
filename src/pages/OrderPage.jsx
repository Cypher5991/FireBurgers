import React, { useState } from 'react';
import { MENU_ITEMS, MENU_CATEGORIES } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { 
  Flame, 
  Clock, 
  Plus, 
  Check, 
  SlidersHorizontal, 
  Sparkles, 
  X, 
  Search,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [customizingItem, setCustomizingItem] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const { addToCart, setIsCartOpen, totalItemsCount, cartTotal } = useCart();

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDietary && matchesSearch;
  });

  const availableAddons = [
    { id: 'extra-cheese', name: 'Extra Molten Gouda Volcano Core', price: 69 },
    { id: 'double-patty', name: 'Double Binchotan-Seared Patty', price: 129 },
    { id: 'truffle-dust', name: 'Black Truffle Shoyu Glaze Drizzle', price: 49 },
    { id: 'house-pickle-side', name: '72-Hr Tsukemono Pickled Cucumbers', price: 29 },
    { id: 'garlic-aioli', name: 'Extra Lil Bro Aerated Garlic Toum', price: 39 },
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
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10 pb-32">
      
      {/* Top Header & Search Banner */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b editorial-border-light pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase mb-2 border border-brand-ember/30">
              <Flame className="w-3.5 h-3.5 text-brand-ember" />
              <span>ONLINE ORDERING · D2C KITCHEN</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
              Signature <span className="text-brand-ember">Flame-Seared</span> Burgers & Craft Dips
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base font-sans mt-1">
              Sector 8-B Flagship pickup, Curbside Hop, and Tricity doorstep delivery.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, sides, shakes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-3 rounded-2xl border editorial-border text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-ember shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-ember text-xs"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories & Dietary Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          
          {/* Category Tabs with Red Highlights */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-syne font-bold whitespace-nowrap transition-all duration-200 border ${
                  selectedCategory === cat.id
                    ? 'bg-brand-ember text-white border-brand-ember shadow-md shadow-brand-ember/25'
                    : 'bg-white text-zinc-700 editorial-border-light hover:border-brand-ember hover:text-brand-ember'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Dietary Filters Pill */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border editorial-border self-start lg:self-auto shadow-sm font-mono text-xs">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition ${
                dietaryFilter === 'all' ? 'bg-brand-dark text-white shadow-sm' : 'text-zinc-500 hover:text-brand-ember'
              }`}
            >
              ALL ITEMS
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'veg' ? 'bg-[#2D5A27] text-white shadow-sm' : 'text-zinc-600 hover:text-[#2D5A27]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              PURE VEG
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'non-veg' ? 'bg-[#7A1C16] text-white shadow-sm' : 'text-zinc-600 hover:text-[#7A1C16]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              NON-VEG
            </button>
          </div>
        </div>
      </div>

      {/* Menu Item Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item, idx) => {
          const isBurger = item.category === 'burgers';
          return (
            <div
              key={item.id}
              className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between ${
                isBurger && idx === 0
                  ? 'deep-slate-panel border-brand-ember/30 hover:border-brand-ember shadow-2xl'
                  : 'bg-white editorial-border hover:border-brand-ember shadow-lg'
              }`}
            >
              <div>
                {/* Product Image & Badges */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-md shadow-md ${
                      item.dietary === 'veg' 
                        ? 'bg-[#2D5A27]/95 text-white border border-[#2D5A27]' 
                        : 'bg-[#7A1C16]/95 text-white border border-[#7A1C16]'
                    }`}>
                      {item.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
                    </span>

                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-ember text-white shadow-lg shadow-brand-ember/30">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Prep Time & Calorie Tag */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15">
                      <Clock className="w-3.5 h-3.5 text-brand-ember" />
                      <span>{item.prepTime} ready</span>
                    </span>

                    {item.calories && (
                      <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/15 text-zinc-300">
                        {item.calories}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-ember mb-0.5">
                        {item.tagline}
                      </div>
                      <h3 className={`font-syne font-bold text-xl tracking-tight transition ${
                        isBurger && idx === 0 ? 'text-white group-hover:text-brand-ember' : 'text-brand-dark group-hover:text-brand-ember'
                      }`}>
                        {item.name}
                      </h3>
                    </div>
                    <div className={`font-syne font-black text-2xl whitespace-nowrap ${
                      isBurger && idx === 0 ? 'text-brand-ember' : 'text-brand-dark'
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
                      <Sparkles className="w-3 h-3 text-brand-ember flex-shrink-0" />
                      <span className="truncate font-sans">Pair: <strong className={isBurger && idx === 0 ? 'text-zinc-200' : 'text-zinc-700'}>{item.pairWith}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer with Red Highlight Buttons */}
              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => handleOpenCustomize(item)}
                  className={`p-3 rounded-xl border transition ${
                    isBurger && idx === 0
                      ? 'bg-white/10 border-white/15 text-zinc-300 hover:text-white hover:border-brand-ember'
                      : 'bg-zinc-50 editorial-border hover:border-brand-ember text-zinc-600 hover:text-brand-ember'
                  }`}
                  title="Customize Ingredients"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>

                <button
                  onClick={() => addToCart(item, 1)}
                  className="flex-1 py-3.5 px-4 rounded-xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-ember/25 transition transform active:scale-98"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order · ₹{item.price}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Cart Bar if items in cart */}
      {totalItemsCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-xl px-4 animate-fade-in">
          <div className="bg-brand-dark text-white p-4 rounded-3xl border border-brand-ember/40 shadow-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-ember flex items-center justify-center text-white font-mono font-bold">
                {totalItemsCount}
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-400 uppercase">Tray Subtotal</div>
                <div className="font-syne font-black text-xl text-white">₹{cartTotal}</div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="px-6 py-3 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-ember/30 transition"
            >
              <span>View Tray & Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Customization Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl editorial-border">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-brand-ember font-mono font-bold">CUSTOMIZE SPEC</span>
                <h3 className="font-syne font-black text-2xl text-brand-dark">{customizingItem.name}</h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">{customizingItem.tagline}</p>
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
              <div className="text-xs font-mono font-bold text-zinc-700 uppercase tracking-wider">
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
                        ? 'bg-red-50 border-brand-ember text-brand-dark' 
                        : 'bg-zinc-50 editorial-border text-zinc-700 hover:border-brand-ember'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                        isSelected ? 'bg-brand-ember border-brand-ember text-white' : 'border-zinc-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <span className="text-sm font-semibold">{addon.name}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-brand-ember">+₹{addon.price}</span>
                  </div>
                );
              })}
            </div>

            {/* Total & Submit */}
            <div className="pt-4 border-t border-black/10 flex items-center justify-between gap-4">
              <div>
                <div className="text-[11px] text-zinc-500 uppercase font-mono font-bold">Custom Total</div>
                <div className="font-syne font-black text-2xl text-brand-dark">
                  ₹{customizingItem.price + selectedAddons.reduce((acc, a) => acc + a.price, 0)}
                </div>
              </div>

              <button
                onClick={handleAddCustomizedToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm shadow-xl shadow-brand-ember/25 transition"
              >
                Add Customized to Tray
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
