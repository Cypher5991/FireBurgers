import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function FlagshipDuoFeature() {
  return (
    <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b editorial-border-light pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-vert text-brand-creme text-xs font-mono font-bold uppercase mb-1 border border-brand-gold/30">
            <Flame className="w-3.5 h-3.5 text-brand-ember" />
            <span>THE PINNACLE DUO · 二大名物</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black font-sans text-brand-vert">
            Two Pillars of the Grill
          </h2>

          <div className="font-script text-2xl sm:text-3xl text-brand-ember pt-0.5">
            "The crispy firebird vs the molten volcano"
          </div>
        </div>

        <Link
          to="/menu"
          className="text-xs font-mono font-bold text-brand-ember hover:underline self-start sm:self-auto flex items-center gap-1"
        >
          <span>Explore All 19 Menu Items</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Duo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        
        {/* Card 1: The Firebird */}
        <div className="bg-brand-creme-2 rounded-3xl overflow-hidden editorial-border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="relative h-64 sm:h-80 overflow-hidden bg-brand-creme-3">
              <img
                src="/web/firebird.webp"
                alt="The Firebird Japanese Fried Chicken Burger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-brand-nonveg text-white shadow-sm">
                  🥩 Non-Veg Flagship
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-vert-d text-brand-gold border border-brand-gold/40">
                  300°C Fire Glaze
                </span>
              </div>
              <div className="font-script text-2xl text-brand-gold">
                "Potato starch shatter & fermented chili glaze"
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-brand-vert">
                The Firebird
              </h3>
              <p className="text-xs sm:text-sm text-brand-char leading-relaxed font-sans">
                A thick cut of boneless chicken thigh, soaked in aromatics, coated in starch for a glass-like crisp, and lacquered with our charred Japanese fire emulsion on a morning-baked Hokkaido milk bun.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0">
            <Link
              to="/order"
              className="w-full flex items-center justify-center gap-2 bg-brand-vert hover:bg-brand-vert-d text-brand-creme font-sans font-bold py-3 px-4 rounded-2xl transition min-h-[44px] text-xs border border-brand-gold/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-ember" />
              <span>ORDER VIP PASS FOR THE FIREBIRD</span>
            </Link>
          </div>
        </div>

        {/* Card 2: The Volcano */}
        <div className="bg-brand-creme-2 rounded-3xl overflow-hidden editorial-border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="relative h-64 sm:h-80 overflow-hidden bg-brand-creme-3">
              <img
                src="/web/volcano.webp"
                alt="The Volcano Molten Core Burger"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-brand-nonveg text-white shadow-sm">
                  🥩 Molten Center
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full bg-brand-vert-d text-brand-gold border border-brand-gold/40">
                  Aged Gouda Lava
                </span>
              </div>
              <div className="font-script text-2xl text-brand-gold">
                "Molten Gouda core pours when sliced"
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-sans text-brand-vert">
                The Volcano
              </h3>
              <p className="text-xs sm:text-sm text-brand-char leading-relaxed font-sans">
                Double fire-grilled mutton patties encasing a pocket of molten Gouda and smoked cheese that erupts with every cut. Finished with bone marrow glaze and charred scallions.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0">
            <Link
              to="/order"
              className="w-full flex items-center justify-center gap-2 bg-brand-vert hover:bg-brand-vert-d text-brand-creme font-sans font-bold py-3 px-4 rounded-2xl transition min-h-[44px] text-xs border border-brand-gold/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-ember" />
              <span>ORDER VIP PASS FOR THE VOLCANO</span>
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
}
