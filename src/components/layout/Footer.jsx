import React from 'react';
import { UMAMI_BRAND_INFO } from '../../data/umamiMenuData';
import { Flame, MapPin, Clock, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedBrandLogo from '../common/AnimatedBrandLogo';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-zinc-400 border-t border-white/10 pt-16 pb-24 lg:pb-12 px-4 sm:px-6 lg:px-8 relative text-sm font-sans">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <AnimatedBrandLogo size="md" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl" />
              <div>
                <span className="font-syne font-black text-2xl sm:text-3xl tracking-tight text-white block leading-none">
                  UMAMI
                </span>
                <span className="text-xs font-japanese font-bold text-brand-ember mt-1 block">旨味 · SECTOR 8B</span>
              </div>
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
              <div className="text-zinc-400 text-[11px] pt-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>FSSAI Lic. No: <strong className="text-zinc-200">{UMAMI_BRAND_INFO.fssaiLicense}</strong></span>
              </div>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex items-center gap-3 pt-2 font-mono text-xs">
              <a
                href={UMAMI_BRAND_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-ember hover:text-white transition text-zinc-300 border border-white/10"
              >
                <span>Instagram</span>
                <span>↗</span>
              </a>
              <a
                href={`tel:${UMAMI_BRAND_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-brand-ember hover:text-white transition text-zinc-300 border border-white/10"
              >
                <span>{UMAMI_BRAND_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Canonical Local Geo Column (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-syne font-bold text-white text-base">Visit the Counter</h4>
            <div className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed">
              <p>
                We are a counter kitchen, not a dining room. Order at the counter, watch the fire, take it with you. Parking is along the Inner Market row.
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <Link
                  to="/visit"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-ember hover:underline font-bold font-mono"
                >
                  <span>Directions from Sector 8/9 Roundabout</span>
                  <span>↗</span>
                </Link>
                <a
                  href={UMAMI_BRAND_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-brand-ember font-mono"
                >
                  <MapPin className="w-3.5 h-3.5 text-brand-ember" />
                  <span>Open in Google Maps ↗</span>
                </a>
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
            © {new Date().getFullYear()} UMAMI. Operated by {UMAMI_BRAND_INFO.entity}. Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018.
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
