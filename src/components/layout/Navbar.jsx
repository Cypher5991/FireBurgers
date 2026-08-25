import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Flame, MapPin, Clock, Car } from 'lucide-react';
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

  // Removed numbering from links per user request
  const navLinks = [
    { to: '/', label: 'SHOWCASE' },
    { to: '/order', label: 'MENU & ORDER' },
    { to: '/builder', label: 'TRAY BUILDER', promo: true },
    { to: '/sector-8', label: 'FLAGSHIP & HOP' },
  ];

  return (
    <>
      {/* Top Swiss Editorial Micro-Bar with Red Accents */}
      <div className="bg-brand-dark text-xs py-1.5 px-4 text-zinc-300 border-b border-white/10 font-mono">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-brand-ember font-medium">
              <span className="w-2 h-2 rounded-full bg-brand-ember animate-ping" />
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
              className="flex items-center gap-1 text-brand-ember hover:text-white transition font-bold"
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
            ? 'bg-white/95 backdrop-blur-md border-b editorial-border-light shadow-md py-3'
            : 'bg-white/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand Name with Red Accents */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-brand-ember flex items-center justify-center text-white shadow-lg shadow-brand-ember/30 group-hover:scale-105 transition transform">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-syne font-black text-2xl tracking-tight text-brand-dark group-hover:text-brand-ember transition">
                  TASTY
                </span>
                <span className="text-[10px] font-japanese font-bold text-brand-ember hidden sm:inline">
                  美味しい
                </span>
                <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-dark text-white border border-brand-ember/30">
                  CHD · 08
                </span>
              </div>
              <p className="text-[9px] text-brand-muted tracking-wider uppercase font-mono hidden sm:block">
                Japanese Fire Grill · 5:00 AM Milk Buns
              </p>
            </div>
          </Link>

          {/* Navigation Links WITHOUT Numbering */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-mono font-bold text-brand-dark/80">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition flex items-center gap-1.5 py-1 px-2.5 rounded-lg ${
                    isActive
                      ? 'text-white bg-brand-ember shadow-sm font-extrabold'
                      : 'hover:text-brand-ember text-brand-dark/80 hover:bg-red-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.promo && (
                    <span className={`text-[8px] px-1.5 py-0.2 rounded font-mono ${
                      isActive ? 'bg-white text-brand-ember' : 'bg-brand-ember text-white'
                    }`}>
                      SAVE ₹99
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Active Order Badge + Red Cart Trigger */}
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
              className="relative flex items-center gap-2.5 bg-brand-ember hover:bg-red-700 text-white font-syne font-bold px-4 sm:px-5 py-2.5 rounded-xl shadow-lg shadow-brand-ember/25 hover:shadow-brand-ember/40 transition transform active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-xs sm:text-sm font-bold tracking-wide">ORDER TRAY</span>
              {totalItemsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-dark text-white text-xs flex items-center justify-center font-mono font-bold border border-white/20">
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
