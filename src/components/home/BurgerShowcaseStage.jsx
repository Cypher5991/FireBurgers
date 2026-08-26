import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, Eye, CheckCircle2, ChevronRight, Award, Compass } from 'lucide-react';

const SIGNATURE_BURGERS = [
  {
    id: 'firebird',
    name: 'The Firebird',
    japanese: '火の鳥',
    kanji: '火',
    eyebrow: 'Signature Flagship',
    scriptQuote: 'Crisp Japanese fire glaze & house dill pickle',
    dietary: 'non-veg',
    protein: 'Crisp Chicken Thigh',
    heat: 3,
    heroImage: '/web/firebird.webp',
    macroImage: '/web/firebird-macro.webp',
    description: 'Thick boneless chicken thigh dredged in potato starch, fried to glass-like shatter, and brushed with fermented Japanese chili fire glaze on a warm Hokkaido milk bun.',
    pairing: 'Midori Cooler & Toum Bombs',
    pillars: ['Tangzhong Bun', '300°C Glaze', 'House Pickles'],
  },
  {
    id: 'volcano',
    name: 'The Volcano',
    japanese: '火山',
    kanji: '山',
    eyebrow: 'Molten Core',
    scriptQuote: 'Molten gouda lava poured from the center',
    dietary: 'non-veg',
    protein: 'Double Fire-Grilled Mutton',
    heat: 2,
    heroImage: '/web/volcano.webp',
    macroImage: '/web/volcano.webp',
    description: 'Double fire-grilled mutton patties encasing a molten core of aged Gouda and smoked mozzarella that releases when sliced at the counter.',
    pairing: 'Dark Chocolate Shake & Steak Gravy Fries',
    pillars: ['Molten Gouda Core', 'Double Patty', 'Bone Marrow Glaze'],
  },
  {
    id: 'mutton-steak',
    name: 'The Mutton Steak',
    japanese: '羊肉',
    kanji: '羊',
    eyebrow: 'Binchotan Grilled',
    scriptQuote: 'Coarse-ground pasture mutton over white oak',
    dietary: 'non-veg',
    protein: 'Coarse Pasture Mutton',
    heat: 1,
    heroImage: '/web/mutton-steak.webp',
    macroImage: '/web/mutton-steak-macro.webp',
    description: '180g coarse hand-chopped mountain mutton patty seared directly over binchotan white oak charcoal with charred scallion emulsion and onion relish.',
    pairing: 'Burnt Lemonade & Truffle Cloud Fries',
    pillars: ['180g Hand-Chopped', 'Charred Scallion', 'Binchotan Oak'],
  },
  {
    id: 'magic-shroom',
    name: 'The Magic Shroom',
    japanese: '魔法茸',
    kanji: '茸',
    eyebrow: 'Pure Vegetarian Masterwork',
    scriptQuote: 'Herbed goat cheese stuffed portobello cap',
    dietary: 'veg',
    protein: 'Stuffed Portobello Cap',
    heat: 1,
    heroImage: '/web/magic-shroom.webp',
    macroImage: '/web/magic-shroom.webp',
    description: 'Whole roasted Portobello mushroom cap filled with herbed chèvre and parmesan crust, finished with black garlic miso glaze and crispy leeks.',
    pairing: 'Midori Cooler & Jalapeño Fries',
    pillars: ['Herbed Chèvre', 'Black Garlic Miso', 'Crispy Leeks'],
  },
  {
    id: 'smoked-harissa',
    name: 'The Smoked Harissa',
    japanese: '燻製',
    kanji: '燻',
    eyebrow: 'Fire Spiced',
    scriptQuote: 'Slow-smoked North African chili & whipped labneh',
    dietary: 'non-veg',
    protein: 'Flame-Seared Chicken',
    heat: 3,
    heroImage: '/web/smoked-harissa.webp',
    macroImage: '/web/smoked-harissa-macro.webp',
    description: 'Thick flame-seared patty lacquered with house-fermented harissa chili paste, tempered with cool whipped garlic labneh and pickled sumac onions.',
    pairing: 'Salted Caramel Shake & Char Wings',
    pillars: ['House Harissa', 'Whipped Labneh', 'Sumac Onions'],
  },
];

export default function BurgerShowcaseStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('hero'); // 'hero' | 'macro'

  const current = SIGNATURE_BURGERS[activeIndex];
  const activeImg = (viewMode === 'macro' && current.macroImage) ? current.macroImage : current.heroImage;

  return (
    <section id="burgers-showcase" className="relative py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      
      {/* Background Japanese Watermark Kanji */}
      <div 
        aria-hidden="true" 
        className="absolute right-4 sm:right-12 top-1/2 -translate-y-1/2 text-[180px] sm:text-[320px] lg:text-[420px] font-japanese text-brand-gold/10 select-none pointer-events-none leading-none z-0"
      >
        {current.kanji}
      </div>

      <div className="relative z-10 space-y-4 sm:space-y-6">
        
        {/* Section Header with Great Vibes Script Accent */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-vert text-brand-creme text-xs font-mono font-bold uppercase border border-brand-gold/30 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-brand-ember" />
            <span>FLAGSHIP SELECTION · 献立の主役</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-brand-vert">
            Fire-Grilled Burgers
          </h2>

          <div className="font-script text-3xl sm:text-4xl text-brand-ember pt-0.5">
            "Crafted with 5:00 AM Hokkaido milk buns and 300°C charcoal char"
          </div>

          <p className="text-brand-char-soft text-xs sm:text-sm font-sans max-w-xl mx-auto pt-0.5">
            Explore our 5 signature masterworks. Select any burger to inspect high-resolution presentation and grill-crust details.
          </p>
        </div>

        {/* 5-Item Interactive Stage Navigation Selector */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none">
          {SIGNATURE_BURGERS.map((burger, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={burger.id}
                data-burger-tab={burger.id}
                onClick={() => {
                  setActiveIndex(idx);
                  setViewMode('hero');
                }}
                className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-sans font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-300 min-h-[44px] border ${
                  isActive
                    ? 'bg-brand-vert text-brand-creme border-brand-gold shadow-lg shadow-brand-vert/30 scale-105'
                    : 'bg-brand-creme-2 text-brand-vert border-brand-gold/25 hover:border-brand-ember hover:bg-brand-creme-3'
                }`}
              >
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-brand-ember text-white' : 'bg-brand-gold/20 text-brand-vert'
                }`}>
                  0{idx + 1}
                </span>
                <span>{burger.name}</span>
                <span className="font-japanese text-xs opacity-75">{burger.japanese}</span>
              </button>
            );
          })}
        </div>

        {/* Main Stage Presentation Card (Tighter Margin) */}
        <div className="bg-brand-creme-2 rounded-3xl p-5 sm:p-8 lg:p-10 border editorial-border shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Col: High-Impact Photography Showcase (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-3xl overflow-hidden bg-brand-creme-3 border editorial-border shadow-2xl group flex flex-col">
              
              {/* Image Container (100% Clean Photography) */}
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[440px] shrink-0 overflow-hidden bg-brand-creme-3">
                <img
                  src={activeImg}
                  alt={`${current.name} - UMAMI Japanese Burger`}
                  className="w-full h-full object-cover transition-all duration-700 filter brightness-95 group-hover:scale-105"
                />
              </div>

              {/* Bottom Angle Switcher & Dietary Metadata (Normal Flow) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-brand-vert-d text-brand-creme z-10">
                <div className="flex items-center gap-2 pl-1 font-mono text-xs">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm ${
                    current.dietary === 'veg' ? 'bg-brand-veg text-white' : 'bg-brand-nonveg text-white'
                  }`}>
                    {current.dietary === 'veg' ? '🌿 Pure Vegetarian' : '🥩 Non-Veg Masterwork'}
                  </span>
                  <span className="text-xs font-japanese font-bold text-brand-ember hidden sm:inline">
                    {current.japanese}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs w-full sm:w-auto">
                  <span className="hidden md:inline text-brand-gold text-[11px] font-bold mr-1">View:</span>
                  <button
                    onClick={() => setViewMode('hero')}
                    className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl font-bold transition min-h-[40px] ${
                      viewMode === 'hero'
                        ? 'bg-brand-ember text-white shadow-sm'
                        : 'bg-white/10 text-brand-creme hover:bg-white/20'
                    }`}
                  >
                    Full View
                  </button>

                  <button
                    onClick={() => setViewMode('macro')}
                    className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl font-bold transition min-h-[40px] ${
                      viewMode === 'macro'
                        ? 'bg-brand-ember text-white shadow-sm'
                        : 'bg-white/10 text-brand-creme hover:bg-white/20'
                    }`}
                  >
                    Grill Macro Close-Up
                  </button>
                </div>
              </div>

            </div>

            {/* Micro Pillars Strip */}
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs text-brand-vert">
              {current.pillars.map((pillar, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-brand-creme-3 border border-brand-gold/25 font-bold">
                  ✓ {pillar}
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Editorial Specs & VIP Action (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-brand-ember tracking-widest">
                  {current.protein}
                </span>
                <div className="flex items-center gap-1 text-xs font-mono text-brand-gold-text">
                  <span>Heat:</span>
                  {[...Array(3)].map((_, idx) => (
                    <Flame
                      key={idx}
                      className={`w-3.5 h-3.5 ${
                        idx < current.heat ? 'text-brand-ember fill-brand-ember' : 'text-zinc-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black font-sans text-brand-vert tracking-tight leading-none">
                {current.name}
              </h3>

              <div className="font-script text-2xl sm:text-3xl text-brand-gold pt-0.5">
                "{current.scriptQuote}"
              </div>
            </div>

            <p className="text-brand-char text-xs sm:text-sm font-sans leading-relaxed">
              {current.description}
            </p>

            {/* Flavor & Craft Pairing Notes */}
            <div className="p-4 rounded-2xl bg-brand-creme-3 border border-brand-gold/25 space-y-2 font-mono text-xs">
              <div className="text-brand-vert font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-ember" />
                <span>Chef's Recommended Pairing:</span>
              </div>
              <div className="text-brand-char-soft pl-5">
                {current.pairing}
              </div>
            </div>

            {/* Pricing & Pre-Launch Action */}
            <div className="pt-2 space-y-3">
              <div className="p-3 rounded-2xl bg-white border border-brand-gold/30 text-xs font-mono flex items-center justify-between text-brand-char">
                <span className="text-brand-char-soft">Opening Date:</span>
                <span className="font-bold text-brand-ember">1 October 2026</span>
              </div>

              <Link
                to="/order"
                className="w-full flex items-center justify-center gap-2 bg-brand-ember hover:bg-brand-ember-d text-white font-sans font-bold py-3.5 sm:py-4 px-6 rounded-2xl shadow-xl shadow-brand-ember/30 hover:scale-[1.01] transition min-h-[48px] text-sm"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span>CLAIM VIP PASS FOR {current.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
