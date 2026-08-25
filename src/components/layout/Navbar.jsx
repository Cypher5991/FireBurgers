import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Flame, MapPin, Clock, Car, Utensils } from 'lucide-react';
import { BRAND_INFO } from '../../data/menuData';

export default function Navbar() {
  const { totalItemsCount, setIsCartOpen, activeOrder, setIsOrderModalOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'SHOWCASE', num: '01' },
    { to: '/order', label: 'MENU & D2C', num: '02' },
    { to: '/builder', label: 'TRAY BUILDER', num: '03', promo: true },
    { to: '/sector-8', label: 'FLAGSHIP & HOP', num: '04' },
  ];

  return (
    <>
      {/* Top Swiss Editorial Micro-Bar */}
      <div className="bg-brand-dark text-xs py-1.5 px-4 text-zinc-300 border-b border-white/10 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-brand-glaze font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE KITCHEN: 4 ORDERS IN SPRINT
            </span>
            <span className="hidden sm:inline text-zinc-600">/</span>
            <span className="hidden sm:flex items-center gap-1 text-zinc-300">
              <Clock className="w-3.5 h-3.5 text-brand-ember" />
              6-MIN COUNTER-TO-HAND COMMITMENT
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-300">
            <span className="flex items-center gap-1 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-brand-ember" />
              SECTOR 8-B, MADHYA MARG, CHANDIGARH
            </span>
            <Link 
              to="/sector-8" 
              className="flex items-center gap-1 text-brand-glaze hover:text-white transition font-bold"
            >
              <Car className="w-3.5 h-3.5" />
              CURBSIDE HOP
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-canvas/95 backdrop-blur-md border-b editorial-border-light shadow-lg py-3'
            : 'bg-brand-canvas/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name with Japanese Accent */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-dark flex items-center justify-center text-white border border-white/10 group-hover:bg-brand-ember transition transform">
              <Flame className="w-5 h-5 text-brand-ember group-hover:text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne font-black text-2xl tracking-tight text-brand-dark group-hover:text-brand-ember transition">
                  TASTY
                </span>
                <span className="text-[10px] font-japanese font-bold text-brand-dark/50 hidden sm:inline">
                  美味しい
                </span>
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-dark text-white">
                  CHD · 08
                </span>
              </div>
              <p className="text-[9px] text-brand-muted tracking-wider uppercase font-mono hidden sm:block">
                Japanese Fire Grill · 5:00 AM Milk Buns
              </p>
            </div>
          </Link>

          {/* Navigation Links with Active States */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono font-bold text-brand-dark/80">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition flex items-center gap-1.5 py-1 px-2 rounded-lg ${
                    isActive
                      ? 'text-brand-ember bg-brand-ember/10 border border-brand-ember/20'
                      : 'hover:text-brand-ember text-brand-dark/70'
                  }`}
                >
                  <span className="text-zinc-400 text-[10px]">{link.num}/</span>
                  <span>{link.label}</span>
                  {link.promo && (
                    <span className="text-[8px] bg-brand-ember text-white px-1.5 py-0.2 rounded font-mono">
                      SAVE
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Active Order Badge + Deep Slate Cart Trigger */}
          <div className="flex items-center gap-3">
            {activeOrder && (
              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center gap-2 bg-brand-ember/15 hover:bg-brand-ember/25 border border-brand-ember/40 text-brand-ember px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition animate-pulse"
              >
                <Flame className="w-3.5 h-3.5 animate-bounce" />
                <span>#{activeOrder.orderId}</span>
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-brand-dark text-brand-canvas hover:bg-brand-ember font-syne font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg border border-white/10 hover:border-brand-ember transition transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-brand-glaze" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">ORDER TRAY</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-ember text-white text-xs flex items-center justify-center font-mono font-bold">
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
