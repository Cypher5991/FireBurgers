import React from 'react';
import { Flame, Clock, Compass } from 'lucide-react';

export default function StorySection() {
  const pillars = [
    {
      icon: "🍞",
      title: "5:00 AM Hokkaido Shokupan",
      desc: "Every single milk bun is hand-crafted daily at 5:00 AM using the traditional Japanese Yudane water-roux method for unparalleled pillowy softness."
    },
    {
      icon: "🔥",
      title: "300°C Binchotan Robata Sear",
      desc: "Our prime steak-cut patties hit Japanese Kishu Binchotan charcoal grills to lock in intense smokiness and a crisp caramelized crust."
    },
    {
      icon: "⚡",
      title: "6-Min Counter-to-Hand Rule",
      desc: "From the moment your ticket hits our line, our kitchen operates on a synchronized 360-second timer to ensure molten temperature precision."
    },
    {
      icon: "🚗",
      title: "Sector 8 Curbside Hop",
      desc: "Tailored specifically for Chandigarh's vibrant car-hop dining culture. Pull into Sector 8 inner market and dine in comfort right from your car."
    }
  ];

  return (
    <section id="story" className="py-24 px-4 sm:px-6 relative bg-[#F9F8F2] overflow-hidden border-t border-b border-black/5">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/25 text-brand-orange text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              The Sector 8 Heritage & Philosophy
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark leading-[1.1]">
              JAPANESE ROBATAYAKI CRAFT. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-red-500 to-brand-amber">
                CHANDIGARH STREET FIRE.
              </span>
            </h2>

            <p className="text-zinc-700 text-base sm:text-lg leading-relaxed">
              We started <strong>Tasty</strong> in Chandigarh with one radical conviction: fast casual food doesn't have to compromise on culinary pedigree. We treat our burger buns with the master discipline of Japanese Shokupan bakers, and our flame sear with centuries-old Binchotan Robatayaki precision.
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel-glow p-8 rounded-3xl space-y-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                <Clock className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h4 className="font-syne font-black text-xl text-brand-dark">The 6-Minute Standard</h4>
                <p className="text-xs text-brand-orange font-bold">Counter-to-Hand Commitment</p>
              </div>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed">
              If your burger takes longer than 6 minutes from order placement during standard dine-in or takeaway, your next artisanal cooler or shake is on the house.
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="card-light p-6 sm:p-7 rounded-3xl border border-black/5 hover:border-brand-orange/40 hover:-translate-y-1 transition-all duration-300 space-y-4"
            >
              <div className="text-3xl p-3 w-14 h-14 rounded-2xl bg-orange-50/80 border border-orange-200/50 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-syne font-bold text-lg text-brand-dark">
                {pillar.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
