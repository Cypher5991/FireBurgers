import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ShieldCheck, Compass } from 'lucide-react';
import { UMAMI_BRAND_INFO } from '../data/umamiMenuData';

export default function ContactPage() {
  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">Contact</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b editorial-border-light pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase border border-brand-ember/30">
          <Mail className="w-3.5 h-3.5 text-brand-ember" />
          <span>CONTACT & DIRECTORY</span>
        </div>
        
        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
          Contact UMAMI
        </h1>

        <p className="text-sm sm:text-base font-sans text-zinc-600">
          Operating details, press inquiries, and counter location in Sector 8B, Chandigarh.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* General & Orders */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl editorial-border space-y-4 shadow-sm">
          <h2 className="font-syne font-bold text-xl text-brand-dark">General & Orders</h2>
          <div className="space-y-2 text-xs sm:text-sm font-mono text-zinc-700">
            <div><strong>Email:</strong> {UMAMI_BRAND_INFO.email}</div>
            <div><strong>Phone:</strong> {UMAMI_BRAND_INFO.phone}</div>
            <div><strong>Opening:</strong> 1 October 2026</div>
          </div>
        </div>

        {/* Press & Partnerships */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl editorial-border space-y-4 shadow-sm">
          <h2 className="font-syne font-bold text-xl text-brand-dark">Press & Collaborations</h2>
          <div className="space-y-2 text-xs sm:text-sm font-mono text-zinc-700">
            <div><strong>Press Email:</strong> {UMAMI_BRAND_INFO.pressEmail}</div>
            <div><strong>Entity:</strong> {UMAMI_BRAND_INFO.entity}</div>
          </div>
        </div>

      </div>

      {/* Canonical Location Notice */}
      <div className="deep-slate-panel p-6 sm:p-8 rounded-3xl border-brand-ember/20 shadow-xl space-y-3 font-mono text-xs text-zinc-300">
        <div className="text-brand-ember font-bold text-sm font-syne uppercase">CANONICAL PHYSICAL LOCATION</div>
        <div className="text-white text-base font-syne font-bold">UMAMI · Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018</div>
        <div>Operated by Nimantrit Foods.</div>
        <div className="pt-2">
          <Link to="/visit" className="text-brand-ember hover:underline font-bold">
            Directions from Sector 8/9 roundabout →
          </Link>
        </div>
      </div>

    </div>
  );
}
