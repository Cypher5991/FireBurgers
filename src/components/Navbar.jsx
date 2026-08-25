import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Flame, MapPin, Clock, Car } from 'lucide-react';
import { BRAND_INFO } from '../data/menuData';

export default function Navbar() {
  const { totalItemsCount, setIsCartOpen, activeOrder, setIsOrderModalOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [queueCount, setQueueCount] = useState(4);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Swiss Editorial Micro-Bar */}
      <div className="bg-[#12141A] text-xs py-1.5 px-4 text-zinc-300 border-b border-white/10 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-brand-amber font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping" />
              LIVE KITCHEN: {queueCount} IN QUEUE
            </span>
            <span className="hidden sm:inline text-zinc-600">/</span>
            <span className="hidden sm:flex items-center gap-1 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              6-MIN COUNTER-TO-HAND
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              SECTOR 8, CHANDIGARH
            </span>
            <a 
              href="#curbside" 
              className="flex items-center gap-1 text-brand-amber hover:text-white transition font-bold"
            >
              <Car className="w-3.5 h-3.5" />
              CURBSIDE HOP
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FBF9F5]/95 backdrop-blur-md border-b border-brand-dark/10 shadow-lg py-3'
            : 'bg-[#FBF9F5]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Name with Japanese Accent */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center shadow-lg border border-white/10 group-hover:bg-brand-orange transition transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne font-black text-2xl tracking-tight text-brand-dark group-hover:text-brand-orange transition">
                  TASTY
                </span>
                <span className="text-[10px] font-japanese font-bold text-brand-dark/50 hidden sm:inline">
                  美味しい
                </span>
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-dark text-white">
                  CHD · 08
                </span>
              </div>
              <p className="text-[9px] text-zinc-500 tracking-wider uppercase font-mono hidden sm:block">
                Japanese Fire Grill · Hokkaido Milk Buns
              </p>
            </div>
          </a>

          {/* Navigation Links with Swiss Editorial Indexing */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-bold text-brand-dark/80">
            <a href="#exploded-view" className="hover:text-brand-orange transition flex items-center gap-1">
              <span className="text-zinc-400">01/</span>
              <span>DECONSTRUCT</span>
            </a>
            <a href="#volcano-pour" className="hover:text-brand-orange transition flex items-center gap-1">
              <span className="text-zinc-400">02/</span>
              <span>VOLCANO CORE</span>
            </a>
            <a href="#menu" className="hover:text-brand-orange transition flex items-center gap-1">
              <span className="text-zinc-400">03/</span>
              <span>ROBATA MENU</span>
            </a>
            <a href="#dip-wall" className="hover:text-brand-orange transition flex items-center gap-1">
              <span className="text-zinc-400">04/</span>
              <span>THE 7 DIPS</span>
            </a>
            <a href="#combo-builder" className="hover:text-brand-orange transition flex items-center gap-1 text-brand-orange">
              <span className="text-brand-orange/60">05/</span>
              <span>TRAY BUILDER</span>
              <span className="text-[9px] bg-brand-orange text-white px-1.5 py-0.2 rounded font-mono">SAVE</span>
            </a>
            <a href="#story" className="hover:text-brand-orange transition flex items-center gap-1">
              <span className="text-zinc-400">06/</span>
              <span>CRAFT</span>
            </a>
          </nav>

          {/* Actions: Active Order Badge + Deep Slate Cart Trigger */}
          <div className="flex items-center gap-3">
            {activeOrder && (
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center gap-2 bg-brand-orange/15 hover:bg-brand-orange/25 border border-brand-orange/40 text-brand-orange px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition animate-pulse"
              >
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>#{activeOrder.orderId}</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-brand-dark text-white hover:bg-brand-orange font-syne font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg border border-white/10 hover:border-brand-orange transition transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-brand-amber" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">ORDER TRAY</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-orange text-white text-xs flex items-center justify-center font-mono font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

