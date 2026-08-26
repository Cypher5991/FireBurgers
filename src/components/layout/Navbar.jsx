import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, MapPin, Clock, Menu, X, BookOpen, Compass, Utensils, Sparkles, ShoppingBag } from 'lucide-react';
import { UMAMI_BRAND_INFO } from '../../data/umamiMenuData';
import AnimatedBrandLogo from '../common/AnimatedBrandLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/story', label: 'THE STORY', icon: <Compass className="w-4 h-4" /> },
    { to: '/menu', label: 'THE MENU', icon: <Utensils className="w-4 h-4" /> },
    { to: '/visit', label: 'VISIT US', icon: <MapPin className="w-4 h-4" /> },
    { to: '/journal', label: 'JOURNAL', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/order', label: 'ORDER', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Top Swiss Editorial Micro-Bar */}
      <div className="bg-brand-dark text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-zinc-300 border-b border-white/10 font-mono w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="w-2 h-2 rounded-full bg-brand-ember animate-ping shrink-0" />
            <span className="text-brand-ember font-bold truncate">OPENING 1 OCT 2026</span>
            <span className="hidden md:inline text-zinc-600">/</span>
            <span className="hidden md:flex items-center gap-1 text-zinc-300 truncate">
              5:00 AM HOKKAIDO BAKING · LIVE CHAR
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-zinc-300">
            <span className="hidden sm:flex items-center gap-1 text-zinc-300 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-brand-ember" />
              BOOTH 7, SEC 8B
            </span>
            <Link 
              to="/visit" 
              className="flex items-center gap-1 text-brand-ember hover:text-white transition font-bold text-[11px] sm:text-xs"
            >
              <span>FIND THE FIRE</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 w-full ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md border-b editorial-border-light shadow-md py-2'
            : 'bg-white/95 backdrop-blur-sm py-2.5 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Logo & Brand Name */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-h-[44px] shrink-0">
            <AnimatedBrandLogo size="md" className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl" />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-syne font-black text-xl sm:text-2xl md:text-3xl tracking-tight text-brand-dark group-hover:text-brand-ember transition leading-none">
                  UMAMI
                </span>
                <span className="text-xs sm:text-sm font-japanese font-bold text-brand-ember">
                  旨味
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-brand-dark text-white border border-brand-ember/30">
                  SEC 8B · CHD
                </span>
              </div>
              <p className="text-[9px] text-zinc-500 tracking-wider uppercase font-mono hidden sm:block mt-0.5">
                Japanese Fire-Grilled Burgers
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-mono font-bold text-brand-dark/80">
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition flex items-center gap-1.5 py-2 px-3 rounded-xl min-h-[44px] ${
                    isActive
                      ? 'text-white bg-brand-ember shadow-sm font-extrabold'
                      : 'hover:text-brand-ember text-brand-dark/80 hover:bg-red-50'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action Area */}
          <div className="flex items-center gap-2">
            {/* VIP Pass Button - Desktop & Tablet */}
            <Link
              to="/order"
              className="hidden sm:flex items-center gap-2 bg-brand-ember hover:bg-red-700 text-white font-syne font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-ember/25 hover:shadow-brand-ember/40 transition transform active:scale-98 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-xs font-bold tracking-wide">LAUNCH VIP PASS</span>
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-brand-dark border editorial-border-light min-h-[44px] min-w-[44px] flex items-center justify-center transition active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-brand-ember" />
              ) : (
                <Menu className="w-5 h-5 text-brand-dark" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t editorial-border-light bg-white/98 backdrop-blur-xl px-4 py-4 space-y-2 animate-fade-in shadow-2xl">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-2 pb-1">
              NAVIGATION DIRECTORY
            </div>
            <Link
              to="/"
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-syne font-bold transition min-h-[48px] ${
                location.pathname === '/'
                  ? 'bg-brand-ember text-white shadow-md shadow-brand-ember/25'
                  : 'bg-zinc-50 hover:bg-red-50 text-brand-dark hover:text-brand-ember'
              }`}
            >
              <div className="flex items-center gap-3">
                <Flame className={location.pathname === '/' ? 'text-white w-4 h-4' : 'text-brand-ember w-4 h-4'} />
                <span>HOME SHOWCASE</span>
              </div>
            </Link>
            {navLinks.map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center justify-between p-3 rounded-2xl text-sm font-syne font-bold transition min-h-[48px] ${
                    isActive
                      ? 'bg-brand-ember text-white shadow-md shadow-brand-ember/25'
                      : 'bg-zinc-50 hover:bg-red-50 text-brand-dark hover:text-brand-ember'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white' : 'text-brand-ember'}>{link.icon}</span>
                    <span>{link.label}</span>
                  </div>
                </Link>
              );
            })}

            <div className="pt-2 border-t editorial-border-light">
              <Link
                to="/order"
                className="w-full flex items-center justify-center gap-2 bg-brand-ember text-white font-syne font-bold p-3.5 rounded-2xl shadow-lg shadow-brand-ember/30 text-sm min-h-[48px]"
              >
                <Sparkles className="w-4 h-4" />
                <span>CLAIM LAUNCH VIP PASS</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Mobile App Bottom Tab Bar (lg:hidden) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-t editorial-border-light shadow-2xl flex items-center justify-around py-1 px-1 safe-area-pb w-full">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/' ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/' ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <Flame className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">Home</span>
        </Link>
        <Link
          to="/story"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/story' ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/story' ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <Compass className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">Story</span>
        </Link>
        <Link
          to="/menu"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/menu' ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/menu' ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <Utensils className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">Menu</span>
        </Link>
        <Link
          to="/visit"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/visit' ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/visit' ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">Visit</span>
        </Link>
        <Link
          to="/journal"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/journal' || location.pathname.startsWith('/journal/') ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/journal' || location.pathname.startsWith('/journal/') ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">Journal</span>
        </Link>
        <Link
          to="/order"
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[50px] min-h-[44px] ${
            location.pathname === '/order' ? 'text-brand-ember font-extrabold' : 'text-zinc-500 hover:text-brand-dark'
          }`}
        >
          <div className={`p-1 rounded-lg transition ${location.pathname === '/order' ? 'bg-brand-ember/15 text-brand-ember' : ''}`}>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono font-bold tracking-tight mt-0.5">VIP Pass</span>
        </Link>
      </nav>
    </>
  );
}
