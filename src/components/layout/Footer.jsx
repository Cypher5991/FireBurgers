import React from 'react';
import { UMAMI_BRAND_INFO } from '../../data/umamiMenuData';
import { Flame, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-zinc-400 border-t border-white/10 pt-16 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 relative text-sm font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-brand-ember flex items-center justify-center text-white shadow-lg shadow-brand-ember/25">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-syne font-black text-2xl tracking-tight text-white">
                UMAMI
              </span>
              <span className="text-xs font-japanese font-bold text-brand-ember">旨味</span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed font-sans">
              Japanese fire-grilled burgers on Hokkaido milk buns baked in-house daily. 
              A counter kitchen in Sector 8B, Chandigarh. Opening 1 October 2026.
            </p>

            <div className="space-y-1 pt-1 font-mono text-xs text-zinc-300">
              <div className="text-brand-ember font-bold">Canonical Location:</div>
              <div>Booth No. 7, Inner Market, Sector 8B</div>
              <div>Chandigarh 160018, India</div>
              <div className="text-zinc-500 pt-1">Operated by {UMAMI_BRAND_INFO.entity}</div>
            </div>
          </div>

          {/* Canonical Local Geo Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-syne font-bold text-white text-base">Visit the Counter</h4>
            <div className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed">
              <p>
                We are a counter kitchen, not a dining room. Order at the counter, watch the fire, take it with you. Parking is along the Inner Market row.
              </p>
              <div className="pt-2">
                <Link
                  to="/visit"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-ember hover:underline font-bold font-mono"
                >
                  <span>Directions from Sector 8/9 Roundabout</span>
                  <span>↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-syne font-bold text-white text-base">Explore Directory</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400">
              <li><Link to="/" className="hover:text-brand-ember transition">Brand Showcase</Link></li>
              <li><Link to="/story" className="hover:text-brand-ember transition">The 15-Year Story</Link></li>
              <li><Link to="/menu" className="hover:text-brand-ember transition">The Menu</Link></li>
              <li><Link to="/visit" className="hover:text-brand-ember transition">Visit Us (Sector 8B)</Link></li>
              <li><Link to="/journal" className="hover:text-brand-ember transition">Editorial Journal</Link></li>
              <li><Link to="/order" className="hover:text-brand-ember transition">Launch VIP Order</Link></li>
              <li><Link to="/contact" className="hover:text-brand-ember transition">Contact & Operations</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & Entity notice */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} UMAMI. Operated by Nimantrit Foods. Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018.
          </div>
          <div className="text-zinc-400 flex items-center gap-4">
            <Link to="/privacy" className="hover:text-brand-ember">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-brand-ember">Terms</Link>
            <span>·</span>
            <span className="text-brand-ember font-bold">5:00 AM Hokkaido Milk Buns</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
