import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, MapPin, Clock, Menu, X, BookOpen, Compass, Utensils, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { UMAMI_BRAND_INFO } from '../../data/umamiMenuData';
import AnimatedBrandLogo from '../common/AnimatedBrandLogo';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // Lock body scroll when floating sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const navLinks = [
    { to: '/', label: 'HOME SHOWCASE', icon: <Flame className="w-4 h-4" /> },
    { to: '/story', label: 'THE STORY', icon: <Compass className="w-4 h-4" /> },
    { to: '/menu', label: 'THE MENU', icon: <Utensils className="w-4 h-4" /> },
    { to: '/visit', label: 'VISIT US', icon: <MapPin className="w-4 h-4" /> },
    { to: '/journal', label: 'JOURNAL', icon: <BookOpen className="w-4 h-4" /> },
    { to: '/order', label: 'ORDER VIP PASS', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Main Sticky Navbar Container */}
      <div className="sticky top-0 left-0 right-0 z-50 w-full flex flex-col transition-all duration-300 shadow-none">
      {/* Top Editorial Micro-Bar (Smoothly collapses on scroll) */}
      <div 
        className={`bg-brand-vert-d text-[11px] sm:text-xs text-brand-creme/80 font-mono w-full overflow-hidden transition-all duration-500 ease-in-out border-b border-brand-gold/20 ${
          isScrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-brand-creme truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse shrink-0" />
            <span className="font-bold tracking-wide uppercase text-[10px] sm:text-xs text-brand-gold-l">
              PRE-LAUNCH EDITION
            </span>
            <span className="hidden md:inline text-brand-creme/60">·</span>
            <span className="hidden md:inline text-brand-creme/80 truncate">
              Booth No. 7, Sector 8B, Chandigarh · Opening 1 Oct 2026
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0 font-bold">
            <span className="hidden sm:inline text-[10px] sm:text-xs text-brand-creme/70">
              5:00 AM Hokkaido Milk Buns
            </span>
            <Link 
              to="/visit" 
              className="flex items-center gap-1 text-brand-ember hover:text-brand-creme transition font-bold text-[11px] sm:text-xs"
            >
              <span>FIND THE FIRE</span>
              <span>↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar Container */}
      <header
        className={`transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-transparent border-transparent shadow-none py-2 sm:py-2.5 pointer-events-none'
            : 'bg-brand-creme/90 backdrop-blur-md border-b border-brand-gold/20 py-2.5 sm:py-3.5 pointer-events-auto'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          
          {/* Left: Animated Brand Logo & Typography */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group min-h-[44px] shrink-0 pointer-events-auto">
            <AnimatedBrandLogo 
              size={isScrolled ? 'sm' : 'md'} 
              className={`rounded-2xl shadow-md transition-all duration-300 border border-brand-gold/30 ${
                isScrolled ? 'w-10 h-10 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-14 sm:h-14'
              }`} 
            />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className={`font-syne font-black tracking-tight text-brand-vert group-hover:text-brand-ember transition-all leading-none ${
                  isScrolled ? 'text-xl sm:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'
                }`}>
                  UMAMI
                </span>
                <span className="text-xs sm:text-sm font-japanese font-bold text-brand-ember">
                  旨味
                </span>
                <span className={`hidden sm:inline-block text-[9px] font-mono uppercase font-bold tracking-widest rounded bg-brand-vert text-brand-creme border border-brand-gold/40 overflow-hidden transition-all duration-300 ${isScrolled ? 'max-w-0 opacity-0 px-0 py-0 border-transparent' : 'max-w-xs opacity-100 px-1.5 py-0.5'}`}>
                  SEC 8B · CHD
                </span>
              </div>
              <p className={`text-[9px] text-brand-char-soft tracking-wider uppercase font-mono hidden sm:block mt-0.5 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0 mt-0' : 'max-h-10 opacity-100'}`}>
                Japanese Fire-Grilled Burgers
              </p>
            </div>
          </Link>

          {/* Center-Right: Desktop Navigation Links (Smooth collapse) */}
          <nav className={`hidden lg:flex items-center font-mono font-bold text-brand-vert/90 transition-all duration-300 ease-in-out overflow-hidden pointer-events-auto ${isScrolled ? 'max-w-0 opacity-0 gap-0 scale-95' : 'max-w-[800px] opacity-100 gap-5 text-xs'}`}>
            {navLinks.slice(1).map(link => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition flex items-center gap-1.5 py-2 px-3 rounded-xl min-h-[44px] whitespace-nowrap ${
                    isActive
                      ? 'text-brand-creme bg-brand-vert shadow-sm font-extrabold'
                      : 'hover:text-brand-ember text-brand-vert hover:bg-brand-vert/5'
                  }`}
                >
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions Area */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {/* VIP Pass Button - Desktop & Tablet (Smooth collapse) */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${isScrolled ? 'max-w-0 opacity-0' : 'max-w-[200px] opacity-100'}`}>
              <Link
                to="/order"
                className="hidden sm:flex items-center gap-2 bg-brand-ember hover:bg-brand-ember-d text-white font-syne font-bold px-4 py-2.5 rounded-xl shadow-md shadow-brand-ember/25 transition transform active:scale-98 min-h-[44px] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-xs font-bold tracking-wide">LAUNCH VIP PASS</span>
              </Link>
            </div>

            {/* Side Menu Toggle Button:
                - Default View: Visible on mobile only (`lg:hidden`).
                - On Scrolling: Visible on ALL devices (`flex`).
            */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className={`p-2 sm:p-2.5 rounded-2xl bg-brand-vert hover:bg-brand-vert-d text-brand-creme border border-brand-gold/30 shadow-lg min-h-[44px] min-w-[44px] items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 group ${
                isScrolled ? 'flex opacity-100 scale-100 w-auto' : 'lg:hidden flex opacity-100 scale-100'
              }`}
              aria-label="Open Floating Navigation Sidebar"
            >
              <Menu className="w-5 h-5 text-brand-ember group-hover:text-brand-creme transition" />
              <span className="text-xs font-mono font-bold tracking-wider hidden xs:inline pr-1 text-brand-creme">
                MENU
              </span>
            </button>
          </div>

        </div>
      </header>
    </div>

      {/* Floating Responsive Sidebar Drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="absolute inset-0 bg-brand-vert-d/80 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
          />

          {/* Floating Sidebar Container (Slides in from the right) */}
          <div className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 max-w-[88vw] bg-brand-vert-d text-brand-creme border-l border-brand-gold/25 shadow-2xl p-6 sm:p-8 flex flex-col justify-between z-50 animate-slide-left overflow-y-auto">
            
            {/* Sidebar Top Header */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-brand-gold/20 pb-5">
                <div className="flex items-center gap-2.5">
                  <AnimatedBrandLogo size="sm" className="w-9 h-9 rounded-xl border border-brand-gold/30" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-syne font-black text-xl text-brand-creme">UMAMI</span>
                      <span className="text-xs font-japanese font-bold text-brand-ember">旨味</span>
                    </div>
                    <div className="text-[9px] font-mono text-brand-creme/60">Sector 8B · Chandigarh</div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-brand-ember text-white transition min-h-[40px] min-w-[40px] flex items-center justify-center active:scale-95"
                  aria-label="Close Sidebar"
                >
                  <X className="w-5 h-5 text-brand-creme" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-brand-gold font-bold tracking-widest px-2 pb-1">
                  EXPLORE ARCHIVE
                </div>
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl text-sm font-syne font-bold transition min-h-[48px] group ${
                        isActive
                          ? 'bg-brand-ember text-white shadow-lg shadow-brand-ember/30'
                          : 'bg-white/[0.06] hover:bg-white/[0.12] text-brand-creme/90 hover:text-white border border-brand-gold/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={isActive ? 'text-white' : 'text-brand-gold group-hover:scale-110 transition-transform'}>
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-white' : 'text-brand-creme/50 group-hover:translate-x-1'}`} />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Bottom Footer Info */}
            <div className="pt-6 border-t border-brand-gold/20 space-y-4">
              <div className="bg-white/[0.05] p-4 rounded-2xl border border-brand-gold/20 space-y-1.5 font-mono text-xs">
                <div className="text-brand-gold font-bold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-ember" />
                  <span>Booth No. 7, Inner Market</span>
                </div>
                <div className="text-brand-creme/70">Sector 8B, Chandigarh 160018</div>
                <div className="text-[10px] text-brand-creme/50 pt-1">Operated by Nimantrit Foods</div>
              </div>

              <Link
                to="/order"
                onClick={() => setIsSidebarOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-ember hover:bg-brand-ember-d text-white font-syne font-bold p-4 rounded-2xl shadow-xl shadow-brand-ember/30 text-sm min-h-[48px] transition active:scale-98"
              >
                <Sparkles className="w-4 h-4" />
                <span>CLAIM LAUNCH VIP PASS</span>
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Mobile Bottom Tab Dock (lg:hidden) */}
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
