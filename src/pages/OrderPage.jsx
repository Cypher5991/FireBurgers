import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Flame, Sparkles, Check, Car, Clock, ShieldCheck, ArrowRight, Bell } from 'lucide-react';
import { UMAMI_BRAND_INFO } from '../data/umamiMenuData';

export default function OrderPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredMode, setPreferredMode] = useState('takeaway');
  const [carDetails, setCarDetails] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleSubmitVipPass = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    setRegistered(true);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">Order Online</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b editorial-border-light pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase border border-brand-ember/30">
          <ShoppingBag className="w-3.5 h-3.5 text-brand-ember" />
          <span>ONLINE DISPATCH · 配達</span>
        </div>
        
        {/* H1 as specified in Content Pack */}
        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark leading-[1.08]">
          Order UMAMI
        </h1>

        <p className="text-sm sm:text-base font-sans text-zinc-700 leading-relaxed max-w-2xl">
          Fire-grilled burgers, delivered across Chandigarh. Our burgers are built to travel. The bun is baked to hold, the boxes are vented so the crust does not steam, and everything goes out the moment it comes off the fire.
        </p>
      </div>

      {/* Pre-launch VIP Pass Registration Box */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl editorial-border shadow-xl space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b editorial-border-light pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-brand-ember uppercase flex items-center gap-1.5">
              <Bell className="w-4 h-4" />
              <span>PRE-LAUNCH ACCESS</span>
            </div>
            <h2 className="font-syne font-black text-2xl text-brand-dark mt-0.5">
              Claim Your 1 Oct 2026 Opening VIP Pass
            </h2>
          </div>
          <span className="text-xs font-mono bg-brand-dark text-white px-3 py-1.5 rounded-full self-start sm:self-auto">
            Opening 1 October 2026
          </span>
        </div>

        {registered ? (
          <div className="p-8 rounded-2xl bg-red-50 border border-brand-ember text-center space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-brand-ember text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-ember/30">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-syne font-black text-2xl text-brand-dark">
              VIP Pass Confirmed, {name}!
            </h3>
            <p className="text-sm text-zinc-700 max-w-md mx-auto font-sans leading-relaxed">
              We've registered your contact <strong>{phone}</strong>. You'll receive our private launch day menu access and priority counter queue pass for 1 October 2026.
            </p>
            <div className="pt-2">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-ember hover:underline"
              >
                <span>Browse the full pre-launch menu specs →</span>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitVipPass} className="space-y-4 font-sans">
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Register now for early access counter notifications, opening day curbside car-hop priority, and launch tasting invites.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-zinc-50 border editorial-border-light rounded-xl p-3 text-sm focus:outline-none focus:border-brand-ember min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">WhatsApp / Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-zinc-50 border editorial-border-light rounded-xl p-3 text-sm focus:outline-none focus:border-brand-ember min-h-[44px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-50 border editorial-border-light rounded-xl p-3 text-sm focus:outline-none focus:border-brand-ember min-h-[44px]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1">Preferred Dining Mode</label>
                <select
                  value={preferredMode}
                  onChange={(e) => setPreferredMode(e.target.value)}
                  className="w-full bg-zinc-50 border editorial-border-light rounded-xl p-3 text-sm focus:outline-none focus:border-brand-ember min-h-[44px]"
                >
                  <option value="takeaway">Counter Takeaway (Sector 8B)</option>
                  <option value="curbside">In-Car Curbside Hop</option>
                  <option value="delivery">Doorstep Delivery (Chandigarh / Tricity)</option>
                </select>
              </div>
            </div>

            {preferredMode === 'curbside' && (
              <div className="p-4 rounded-xl bg-zinc-50 border editorial-border-light space-y-2">
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase">
                  Vehicle Model & Plate (Optional for Car-Hop)
                </label>
                <input
                  type="text"
                  placeholder="e.g. White Creta · CH01-AB-1234"
                  value={carDetails}
                  onChange={(e) => setCarDetails(e.target.value)}
                  className="w-full bg-white border editorial-border-light rounded-xl p-2.5 text-sm focus:outline-none focus:border-brand-ember"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-sm shadow-xl shadow-brand-ember/30 transition flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Claim Opening VIP Pass · 1 Oct 2026</span>
            </button>
          </form>
        )}

      </div>

      {/* Online Aggregators & Counter Pickup Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Delivery Aggregators Placeholder */}
        <div className="bg-zinc-50 p-6 rounded-3xl border editorial-border-light space-y-3">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
            DELIVERY APPS (OCTOBER 2026)
          </span>
          <h3 className="font-syne font-bold text-lg text-brand-dark">
            Zomato & Swiggy Integration
          </h3>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
            Direct ordering links on Zomato and Swiggy go live on opening day. Real-time kitchen dispatch ensures orders move off the fire with zero counter lag.
          </p>
          <div className="flex gap-2 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-white border editorial-border-light text-xs font-mono font-bold text-zinc-400">
              Zomato (Launching)
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white border editorial-border-light text-xs font-mono font-bold text-zinc-400">
              Swiggy (Launching)
            </span>
          </div>
        </div>

        {/* Counter Collection Guidelines */}
        <div className="bg-zinc-50 p-6 rounded-3xl border editorial-border-light space-y-3">
          <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
            COUNTER COLLECTION
          </span>
          <h3 className="font-syne font-bold text-lg text-brand-dark">
            Prefer to Collect?
          </h3>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
            Walk up to the counter at Booth No. 7, Inner Market, Sector 8B. You can watch the fire and the bun toast while you wait.
          </p>
          <div className="pt-2">
            <Link
              to="/visit"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand-ember hover:underline"
            >
              <span>View location and directions →</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
