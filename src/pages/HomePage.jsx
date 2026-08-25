import React from 'react';
import BurgerHeroCanvas from '../components/home/BurgerHeroCanvas';
import KineticMarquee from '../components/home/KineticMarquee';
import CrossSectionSlider from '../components/home/CrossSectionSlider';
import DipRadarVisualizer from '../components/home/DipRadarVisualizer';
import FAQSection from '../components/home/FAQSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Clock, Car, MapPin, Award, Sparkles, Utensils } from 'lucide-react';
import { TOP_FEATURED_BURGERS } from '../data/menuData';

export default function HomePage() {
  return (
    <div className="space-y-4">
      {/* 1. 3D Exploded Burger Hero & Spec Inspector */}
      <BurgerHeroCanvas />

      {/* 2. Kinetic Velocity Marquee */}
      <KineticMarquee />

      {/* 3. Sensory Reveal: Volcano Cut & Pour Split Slider */}
      <CrossSectionSlider />

      {/* 4. The 7 Dip Wall Flavor Dynamics Radar */}
      <DipRadarVisualizer />

      {/* 5. Minimalist Luxury Pillars (Editorial Breadth) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="deep-slate-panel p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-brand-glaze text-2xl font-mono">
              🍞
            </div>
            <div className="text-xs font-mono font-bold text-brand-glaze uppercase tracking-widest">
              PILLAR 01 · 5:00 AM BAKE
            </div>
            <h3 className="font-syne font-black text-2xl text-white">
              Hokkaido Yudane Milk Buns
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Every bun is hand-rolled daily at 5:00 AM using the traditional Japanese Yudane water-roux method, then toasted with clarified butter.
            </p>
          </div>

          <div className="deep-slate-panel p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-brand-ember text-2xl font-mono">
              🔥
            </div>
            <div className="text-xs font-mono font-bold text-brand-ember uppercase tracking-widest">
              PILLAR 02 · 300°C SEAR
            </div>
            <h3 className="font-syne font-black text-2xl text-white">
              Binchotan Robatayaki Fire
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              Kishu Binchotan white oak coals produce far-infrared heat for an intense crust while preserving juicy marbling inside.
            </p>
          </div>

          <div className="deep-slate-panel p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-brand-umami text-2xl font-mono">
              ⚡
            </div>
            <div className="text-xs font-mono font-bold text-brand-umami uppercase tracking-widest">
              PILLAR 03 · 6-MIN TIMING
            </div>
            <h3 className="font-syne font-black text-2xl text-white">
              Strict Counter-to-Hand
            </h3>
            <p className="text-sm text-zinc-300 font-sans leading-relaxed">
              A synchronized 360-second kitchen sprint ensures the molten cheese core and crispy panko arrive at your hand at peak temperature.
            </p>
          </div>

        </div>

        {/* Quick App Route Callout Card */}
        <div className="mt-12 p-8 sm:p-12 rounded-3xl bg-white editorial-border shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-ember">
              CHANDIGARH D2C APP
            </span>
            <h3 className="text-3xl sm:text-4xl font-black font-syne text-brand-dark">
              Order Online or Build Your Custom Metal Fire Tray
            </h3>
            <p className="text-sm text-zinc-600 font-sans leading-relaxed">
              Frictionless takeaway express, Sector 8 in-car curbside hop, and doorstep delivery across Chandigarh, Mohali, and Panchkula.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <Link
              to="/order"
              className="flex-1 md:flex-initial px-8 py-4.5 rounded-2xl bg-brand-dark text-brand-canvas font-syne font-extrabold text-sm hover:bg-brand-ember transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Utensils className="w-4 h-4 text-brand-glaze" />
              <span>Open Online Menu</span>
            </Link>

            <Link
              to="/builder"
              className="flex-1 md:flex-initial px-8 py-4.5 rounded-2xl bg-gradient-to-r from-brand-ember to-brand-glaze text-white font-syne font-extrabold text-sm hover:brightness-105 transition flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/25"
            >
              <span>Launch Tray Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. AEO FAQ Section */}
      <FAQSection />
    </div>
  );
}
