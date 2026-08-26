import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, Search, X, Clock, ArrowRight, Utensils, Compass, ZoomIn, Eye, ShieldCheck, MapPin } from 'lucide-react';
import { UMAMI_MENU_SECTIONS, UMAMI_DIP_WALL, UMAMI_BRAND_INFO } from '../data/umamiMenuData';
import { useSanityMenu } from '../hooks/useSanityData';

export default function MenuPage() {
  const { items: menuItems } = useSanityMenu();
  const [selectedSection, setSelectedSection] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState(null);

  const filteredItems = menuItems.filter(item => {
    const matchesSection = selectedSection === 'all' || item.sectionId === selectedSection;
    const matchesDietary = dietaryFilter === 'all' || item.dietary === dietaryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSection && matchesDietary && matchesSearch;
  });

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Breadcrumbs */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">The Menu</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b editorial-border-light pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-vert text-brand-creme text-xs font-mono font-bold uppercase mb-2 border border-brand-gold/30">
            <Flame className="w-3.5 h-3.5 text-brand-ember" />
            <span>GASTRONOMY ARCHIVE · 献立表</span>
          </div>
          
          {/* H1 as specified in Content Pack */}
          <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-brand-vert">
            The Menu
          </h1>
          <div className="font-script text-2xl sm:text-3xl text-brand-gold pt-1">
            "There's a fifth taste. We named the place after it."
          </div>
          <p className="text-brand-char-soft text-xs sm:text-sm font-sans mt-1">
            Thick patties, live binchotan charcoal fire, and Hokkaido milk buns baked in-house daily.
          </p>
        </div>

        {/* Pre-launch Notification Badge */}
        <div className="bg-brand-creme-2 border border-brand-gold/30 p-4 rounded-2xl space-y-1 max-w-sm shadow-sm">
          <div className="text-[11px] font-mono font-bold uppercase text-brand-ember flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Launch Costing Mode</span>
          </div>
          <p className="text-xs text-brand-char font-sans leading-relaxed">
            Menu pricing is in final costing. Official prices unlock at our counter opening on <strong className="text-brand-vert">1 October 2026</strong>.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, bombs, fries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white pl-10 pr-4 py-3 rounded-2xl border editorial-border text-xs sm:text-sm font-sans focus:outline-none focus:border-brand-ember shadow-sm min-h-[44px]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-brand-ember text-xs p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border editorial-border self-start md:self-auto shadow-sm font-mono text-xs">
            <button
              onClick={() => setDietaryFilter('all')}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl font-bold transition ${
                dietaryFilter === 'all' ? 'bg-brand-dark text-white shadow-sm' : 'text-zinc-500 hover:text-brand-ember'
              }`}
            >
              ALL ITEMS
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'veg' ? 'bg-[#2D5A27] text-white shadow-sm' : 'text-zinc-600 hover:text-[#2D5A27]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              PURE VEG
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`px-3.5 py-2 min-h-[40px] rounded-xl font-bold transition flex items-center gap-1.5 ${
                dietaryFilter === 'non-veg' ? 'bg-[#7A1C16] text-white shadow-sm' : 'text-zinc-600 hover:text-[#7A1C16]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white" />
              NON-VEG
            </button>
          </div>

        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-syne font-bold whitespace-nowrap transition-all border min-h-[44px] ${
              selectedSection === 'all'
                ? 'bg-brand-ember text-white border-brand-ember shadow-md shadow-brand-ember/25'
                : 'bg-white text-zinc-700 editorial-border-light hover:border-brand-ember'
            }`}
          >
            All Sections
          </button>
          {UMAMI_MENU_SECTIONS.map(section => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-syne font-bold whitespace-nowrap transition-all border min-h-[44px] ${
                selectedSection === section.id
                  ? 'bg-brand-ember text-white border-brand-ember shadow-md shadow-brand-ember/25'
                  : 'bg-white text-zinc-700 editorial-border-light hover:border-brand-ember'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

      </div>

      {/* Menu Grid Organized by Sections */}
      <div className="space-y-12">
        {UMAMI_MENU_SECTIONS.map(section => {
          const itemsInSection = filteredItems.filter(i => i.sectionId === section.id);
          if (itemsInSection.length === 0 && section.id !== 'dips') return null;

          return (
            <div key={section.id} id={section.id} className="space-y-6 scroll-mt-28">
              
              {/* Section Title Banner */}
              <div className="border-b-2 border-brand-dark pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-syne text-brand-dark uppercase tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-zinc-600">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-xs font-mono text-brand-ember font-bold">
                  {itemsInSection.length} items
                </span>
              </div>

              {/* Special rendering for Dips vs Food Items */}
              {section.id === 'dips' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {UMAMI_DIP_WALL.map(dip => (
                    <div
                      key={dip.id}
                      className="bg-white p-5 rounded-3xl editorial-border shadow-sm space-y-2 hover:border-brand-ember transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase text-brand-ember">{dip.subtitle}</span>
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                          dip.dietary === 'veg' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {dip.dietary === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                      <h3 className="font-syne font-bold text-base text-brand-dark">{dip.name}</h3>
                      <p className="text-xs text-zinc-600 font-sans leading-relaxed">{dip.notes}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {itemsInSection.map((item) => (
                    <div
                      key={item.id}
                      id={`item-${item.id}`}
                      onClick={() => setActiveModalItem(item)}
                      className="bg-white rounded-3xl overflow-hidden editorial-border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        {/* Offset Framing for Clear Dish Visibility */}
                        <div className="p-3 bg-brand-creme-3 border-b editorial-border-light relative overflow-hidden">
                          <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden shadow-inner border border-brand-gold/20 bg-brand-creme-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                              loading="lazy"
                            />
                            
                            {/* Tap/Click to Expand Prompt Overlay */}
                            <div className="absolute inset-0 bg-brand-vert-d/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px] flex flex-col items-center justify-center text-brand-creme space-y-1 font-mono text-xs font-bold">
                              <ZoomIn className="w-6 h-6 text-brand-ember animate-bounce" />
                              <span>Click for Enlarged Popout View</span>
                            </div>

                            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full backdrop-blur-md shadow-md ${
                                item.dietary === 'veg' 
                                  ? 'bg-brand-veg text-white' 
                                  : 'bg-brand-nonveg text-white'
                              }`}>
                                {item.dietary === 'veg' ? '🌿 Pure Veg' : '🥩 Non-Veg'}
                              </span>

                              {item.badge && (
                                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-ember text-white shadow-lg shadow-brand-ember/30">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 sm:p-6 space-y-3">
                          <div>
                            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-ember mb-0.5">
                              {item.protein} · {item.tagline}
                            </div>
                            <h3 className="font-sans font-bold text-xl text-brand-vert tracking-tight group-hover:text-brand-ember transition">
                              {item.name}
                            </h3>
                          </div>

                          <p className="text-xs text-brand-char-soft font-sans leading-relaxed">
                            {item.description}
                          </p>

                          {/* Ingredient Tags */}
                          {item.ingredients && (
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {item.ingredients.map((ing, i) => (
                                <span 
                                  key={i} 
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand-creme-3 border border-brand-gold/20 text-brand-vert"
                                >
                                  {ing}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Dip Recommendation */}
                          {item.pairWith && (
                            <div className="pt-1 text-[11px] text-brand-char-soft font-sans flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-brand-ember shrink-0" />
                              <span>Pair with: <strong className="text-brand-vert">{item.pairWith}</strong></span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer: Pre-launch Price Notice */}
                      <div className="p-5 sm:p-6 pt-0">
                        <div className="p-3 rounded-2xl bg-brand-creme-2 border border-brand-gold/25 flex items-center justify-between text-xs font-mono">
                          <span className="text-brand-char-soft">Official Price</span>
                          <span className="font-bold text-brand-ember flex items-center gap-1">
                            <span>Reveals 1 Oct</span>
                            <Eye className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Pre-launch Bottom Callout */}
      <div className="bg-brand-vert-d text-brand-creme p-6 sm:p-10 rounded-3xl border border-brand-gold/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-gold">
            COUNTER SERVICE · BOOTH NO. 7 SECTOR 8B
          </span>
          <h3 className="font-sans font-black text-2xl sm:text-3xl text-brand-creme">
            Opening 1 October 2026
          </h3>
          <p className="text-xs sm:text-sm text-brand-creme/80 font-sans leading-relaxed">
            We are a counter kitchen with an open fire grill. Order at the counter, watch the fire, take it with you, or order for direct delivery.
          </p>
        </div>

        <Link
          to="/order"
          className="px-8 py-4 rounded-2xl bg-brand-ember hover:bg-brand-ember-d text-white font-sans font-bold text-sm shadow-xl shadow-brand-ember/30 transition flex items-center gap-2 shrink-0 min-h-[48px]"
        >
          <span>Get Launch VIP Pass</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Lightbox Popout Modal for Enlarged Dish Picture */}
      {activeModalItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveModalItem(null)}
        >
          <div 
            className="bg-brand-creme-2 text-brand-char rounded-3xl max-w-2xl w-full border editorial-border shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalItem(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-brand-vert-d/90 text-brand-creme flex items-center justify-center hover:bg-brand-ember transition border border-brand-gold/40 shadow-lg min-h-[40px] min-w-[40px]"
              aria-label="Close Enlarged View"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Full-Resolution High-Impact Image */}
              <div className="relative rounded-2xl overflow-hidden bg-brand-creme-3 border border-brand-gold/30 shadow-xl max-h-[380px]">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.name}
                  className="w-full h-full object-cover max-h-[380px] filter brightness-95"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full shadow-md ${
                    activeModalItem.dietary === 'veg' ? 'bg-brand-veg text-white' : 'bg-brand-nonveg text-white'
                  }`}>
                    {activeModalItem.dietary === 'veg' ? '🌿 Pure Vegetarian' : '🥩 Non-Veg Selection'}
                  </span>
                </div>
              </div>

              {/* Item Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-brand-ember tracking-widest">
                    {activeModalItem.protein || 'Signature Dish'} · {activeModalItem.tagline || 'Japanese Fire Kitchen'}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-gold">
                    Opening 1 Oct 2026
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black font-sans text-brand-vert tracking-tight">
                  {activeModalItem.name}
                </h3>

                <p className="text-xs sm:text-sm text-brand-char leading-relaxed font-sans">
                  {activeModalItem.description}
                </p>

                {activeModalItem.ingredients && (
                  <div className="space-y-1 pt-2">
                    <div className="text-xs font-mono font-bold text-brand-vert uppercase">Ingredients & Glazes:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeModalItem.ingredients.map((ing, i) => (
                        <span key={i} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-brand-creme-3 border border-brand-gold/25 text-brand-vert font-semibold">
                          ✓ {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalItem.pairWith && (
                  <div className="p-3.5 rounded-xl bg-brand-creme-3 border border-brand-gold/25 font-mono text-xs text-brand-vert flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-ember shrink-0" />
                    <span>Chef's Pairing: <strong className="text-brand-ember">{activeModalItem.pairWith}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/order"
                  onClick={() => setActiveModalItem(null)}
                  className="w-full flex items-center justify-center gap-2 bg-brand-ember hover:bg-brand-ember-d text-white font-sans font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-brand-ember/30 transition text-sm min-h-[48px]"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>CLAIM PRE-LAUNCH VIP PASS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
