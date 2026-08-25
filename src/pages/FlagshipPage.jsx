import React, { useState } from 'react';
import { MapPin, Clock, Phone, Car, Compass, Check, ArrowRight, Flame } from 'lucide-react';
import { BRAND_INFO } from '../data/menuData';

export default function FlagshipPage() {
  const [carModel, setCarModel] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [bayNumber, setBayNumber] = useState('Bay 03 (Near Fountain)');
  const [registered, setRegistered] = useState(false);

  const handleRegisterCurbside = (e) => {
    e.preventDefault();
    if (!carModel || !plateNumber) return;
    setRegistered(true);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold tracking-widest uppercase border border-brand-ember/30">
          <Compass className="w-3.5 h-3.5 text-brand-ember" />
          <span>LOCAL FLAGSHIP HUB · 旗艦店</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-syne tracking-tight text-brand-dark">
          Sector 8-B <span className="text-brand-ember">Flagship & Curbside Hop</span>
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base font-sans leading-relaxed">
          Located in the heart of Chandigarh's iconic Sector 8 food corridor, just off Madhya Marg. Experience open-flame Robatayaki grilling, in-car curbside dining, and quick counter pickups.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Flagship Specs & Map Directions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white p-7 sm:p-8 rounded-3xl editorial-border shadow-sm space-y-6">
            <h2 className="font-syne font-black text-2xl text-brand-dark">
              Visit Our Sector 8-B Counter | Chandigarh Delivery & Curbside Hop
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-zinc-50 editorial-border space-y-1.5 hover:border-brand-ember transition">
                <div className="flex items-center gap-2 text-brand-ember font-mono font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>ADDRESS & LOCATION</span>
                </div>
                <p className="text-zinc-800 font-semibold">
                  #7, Inner Market, Sector 8-B, Chandigarh, 160009
                </p>
                <p className="text-zinc-500 text-[11px]">
                  (Just off Madhya Marg, adjacent to Sector 8 Fountain Plaza)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 editorial-border space-y-1.5 hover:border-brand-ember transition">
                <div className="flex items-center gap-2 text-brand-ember font-mono font-bold">
                  <Clock className="w-4 h-4" />
                  <span>HOURS OF OPERATION</span>
                </div>
                <p className="text-zinc-800 font-semibold">
                  11:00 AM – 11:00 PM Daily
                </p>
                <p className="text-zinc-500 text-[11px]">
                  (Robata charcoal grill fires open until 10:45 PM)
                </p>
              </div>
            </div>

            {/* Direct Google Maps Action */}
            <div className="p-5 rounded-2xl bg-brand-dark text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-ember/30">
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="font-syne font-bold text-sm text-white">Navigate via Google Maps</div>
                <div className="text-xs text-zinc-400 font-sans">Direct GPS routing to Sector 8-B Inner Market parking</div>
              </div>

              <a
                href="https://maps.google.com/?q=Sector+8+Chandigarh"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-brand-ember hover:bg-red-700 text-white font-syne font-bold text-xs transition shrink-0 flex items-center gap-1.5 shadow-md shadow-brand-ember/30"
              >
                <span>Open Directions</span>
                <span>↗</span>
              </a>
            </div>

            {/* Regional Tricity Context */}
            <div className="space-y-2 text-xs font-sans text-zinc-600 leading-relaxed border-t editorial-border-light pt-4">
              <span className="font-mono font-bold text-brand-dark uppercase block">TRICITY SERVICE AREA:</span>
              <p>
                Serving the entire Tricity corridor: Chandigarh (Sectors 1 to 49), Panchkula (Sectors 7, 8, 9, MDC), and Mohali (Phases 3B2, 7, 8, Aerocity). Doorstep thermal delivery guaranteed under 35 minutes.
              </p>
            </div>
          </div>

          {/* Social Proof with Location Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white editorial-border shadow-sm space-y-2 hover:border-brand-ember transition">
              <div className="flex items-center gap-1 text-brand-ember text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-zinc-700 font-sans italic">
                "The Volcano burger cheese pour is real. Best gourmet burger experience in the Tricity by far."
              </p>
              <div className="text-[10px] font-mono text-brand-ember font-bold">
                — Kabir S., Sector 9 Resident
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white editorial-border shadow-sm space-y-2 hover:border-brand-ember transition">
              <div className="flex items-center gap-1 text-brand-ember text-xs">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-zinc-700 font-sans italic">
                "Sector 8 curbside car-hop is unbeatable. Softest Hokkaido buns you will ever eat in India."
              </p>
              <div className="text-[10px] font-mono text-brand-ember font-bold">
                — Priya M., Sector 8 Regular
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: In-Car Curbside Hop Registration Form (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="deep-slate-panel p-6 sm:p-8 rounded-3xl shadow-2xl space-y-5 border-brand-ember/30">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-brand-ember" />
                <h3 className="font-syne font-black text-xl text-white">
                  Curbside Car-Hop
                </h3>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-brand-ember animate-ping" />
            </div>

            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Park in Sector 8-B inner market. Register your car details and our server will bring your piping-hot tray directly to your vehicle window.
            </p>

            {registered ? (
              <div className="p-5 rounded-2xl bg-brand-ember/15 border border-brand-ember/40 text-brand-ember space-y-2 animate-fade-in text-center">
                <Check className="w-8 h-8 mx-auto text-brand-ember" />
                <div className="font-syne font-bold text-base text-white">Car Registered!</div>
                <p className="text-xs text-zinc-300 font-sans">
                  Spot: <strong>{bayNumber}</strong> · Vehicle: <strong>{carModel} ({plateNumber})</strong>. Our runner has your ticket.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterCurbside} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="text-zinc-400 font-mono block mb-1 uppercase text-[10px]">
                    Vehicle Make & Model
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. White Fortuner / Thar"
                    value={carModel}
                    onChange={(e) => setCarModel(e.target.value)}
                    className="w-full bg-white/10 text-white border border-white/15 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-brand-ember"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono block mb-1 uppercase text-[10px]">
                    License Plate (Last 4 Digits)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CH01-AB-1234"
                    value={plateNumber}
                    onChange={(e) => setPlateNumber(e.target.value)}
                    className="w-full bg-white/10 text-white border border-white/15 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-brand-ember"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono block mb-1 uppercase text-[10px]">
                    Parking Zone in Sector 8
                  </label>
                  <select
                    value={bayNumber}
                    onChange={(e) => setBayNumber(e.target.value)}
                    className="w-full bg-[#1C1D21] text-white border border-white/15 px-3.5 py-2.5 rounded-xl focus:outline-none focus:border-brand-ember"
                  >
                    <option value="Bay 01 (Market Entrance)">Bay 01 (Market Entrance)</option>
                    <option value="Bay 02 (Central Parking)">Bay 02 (Central Parking)</option>
                    <option value="Bay 03 (Near Fountain)">Bay 03 (Near Fountain Plaza)</option>
                    <option value="Bay 04 (Rear Alley)">Bay 04 (Rear Alley)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-brand-ember hover:bg-red-700 text-white font-syne font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-ember/30 transition"
                >
                  <Car className="w-4 h-4" />
                  <span>Confirm In-Car Hop Service</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
