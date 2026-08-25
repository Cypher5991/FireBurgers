import React from 'react';
import { BRAND_INFO } from '../../data/menuData';
import { Flame, MapPin, Clock, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-zinc-400 border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative text-sm font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-ember flex items-center justify-center text-white shadow-lg shadow-brand-ember/25">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-syne font-black text-2xl tracking-tight text-white">
                TASTY <span className="text-brand-ember">CHANDIGARH</span>
              </span>
              <span className="text-xs font-japanese font-bold text-brand-ember">美味しい</span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-sans">
              Minimalist Luxury Gourmet Burgers & Japanese Robata Fire Grill. 5:00 AM Hokkaido Yudane milk buns, Kishu Binchotan flame sears, and molten smoked gouda volcano cores.
            </p>

            <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
              Located at #7 Inner Market, Sector 8-B, just off Madhya Marg, serving the entire Tricity region (Chandigarh, Panchkula, and Mohali).
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp.replace('+', '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/10 hover:bg-brand-ember hover:text-white transition text-zinc-300"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/10 hover:bg-brand-ember hover:text-white transition text-zinc-300 flex items-center justify-center"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="p-3 rounded-xl bg-white/10 hover:bg-brand-ember hover:text-white transition text-zinc-300"
                title="Call Store"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Location & Hours (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-syne font-bold text-white text-base">Flagship Location & Service</h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-brand-ember flex-shrink-0 mt-0.5" />
                <span>#7, Inner Market, Sector 8-B, Chandigarh, 160009</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-brand-ember flex-shrink-0" />
                <span>11:00 AM – 11:00 PM Daily (Binchotan kitchen open till 10:45 PM)</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-brand-ember flex-shrink-0" />
                <span>{BRAND_INFO.phone}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/sector-8"
                className="inline-flex items-center gap-1.5 text-xs text-brand-ember hover:underline font-bold"
              >
                <span>Curbside Car-Hop Details & Map Directions</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          {/* Site Architecture Links (3 cols) - Clean Links without numbers */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-syne font-bold text-white text-base">Explore Navigation</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li><Link to="/" className="hover:text-brand-ember transition">Brand Showcase</Link></li>
              <li><Link to="/order" className="hover:text-brand-ember transition">Online Menu & D2C</Link></li>
              <li><Link to="/builder" className="hover:text-brand-ember transition">Combo Tray Builder</Link></li>
              <li><Link to="/sector-8" className="hover:text-brand-ember transition">Sector 8-B Flagship</Link></li>
              <li><a href="#faq-aeo" className="hover:text-brand-ember transition">AEO FAQ Blueprint</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & SEO tag bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} Tasty Chandigarh. Handcrafted in Sector 8-B, Madhya Marg.
          </div>
          <div className="text-zinc-400 flex items-center gap-4">
            <span className="text-brand-ember font-bold">Fast Casual Gastronomy</span>
            <span>·</span>
            <span>6-Minute Rule</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
