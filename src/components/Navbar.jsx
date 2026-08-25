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
      {/* Top micro-bar */}
      <div className="bg-[#18181B] text-xs py-1.5 px-4 text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-brand-amber font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-mint animate-ping" />
              Live Kitchen: {queueCount} orders in queue
            </span>
            <span className="hidden sm:inline text-zinc-600">|</span>
            <span className="hidden sm:flex items-center gap-1 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-brand-orange" />
              6-Min Counter-to-Hand Commitment
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-brand-orange" />
              Sector 8, Chandigarh
            </span>
            <a 
              href="#curbside" 
              className="flex items-center gap-1 text-brand-amber hover:text-white transition font-semibold"
            >
              <Car className="w-3.5 h-3.5" />
              Curbside Car-Hop
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFCF7]/95 backdrop-blur-md border-b border-black/10 shadow-lg py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-brand-amber flex items-center justify-center shadow-lg shadow-brand-orange/30 group-hover:scale-105 transition transform">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-syne font-black text-2xl tracking-tight text-brand-dark group-hover:text-brand-orange transition">
                  TASTY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-orange/15 text-brand-orange border border-brand-orange/30">
                  CHANDIGARH
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 tracking-wider uppercase font-semibold hidden sm:block">
                Japanese Fire Grill & Burger House
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-zinc-700">
            <a href="#exploded-view" className="hover:text-brand-orange transition">
              Hero & 3D Inspector
            </a>
            <a href="#volcano-pour" className="hover:text-brand-orange transition">
              Volcano Core
            </a>
            <a href="#menu" className="hover:text-brand-orange transition">
              Robata Menu
            </a>
            <a href="#dip-wall" className="hover:text-brand-orange transition">
              The 7 Dips
            </a>
            <a href="#combo-builder" className="hover:text-brand-orange transition flex items-center gap-1 text-brand-orange">
              <span>Tray Builder</span>
              <span className="text-[10px] bg-brand-orange/15 text-brand-orange px-1.5 py-0.5 rounded font-extrabold">PROMO</span>
            </a>
            <a href="#story" className="hover:text-brand-orange transition">
              Japanese Craft
            </a>
          </nav>

          {/* Actions: Active Order Badge + Cart Trigger */}
          <div className="flex items-center gap-3">
            {activeOrder && (
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center gap-2 bg-brand-orange/15 hover:bg-brand-orange/25 border border-brand-orange/40 text-brand-orange px-3.5 py-1.5 rounded-full text-xs font-bold transition animate-pulse"
              >
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>Track #{activeOrder.orderId}</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-amber text-white font-syne font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-brand-orange/25 hover:shadow-brand-orange/40 hover:scale-[1.02] active:scale-[0.98] transition"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline">Order Now</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-bold border border-white/20">
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
