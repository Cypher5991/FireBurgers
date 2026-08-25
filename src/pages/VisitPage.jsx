import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Compass, Phone, ChevronDown, Sparkles, Car, ShieldCheck, ArrowRight } from 'lucide-react';
import { UMAMI_BRAND_INFO, UMAMI_FAQS } from '../data/umamiMenuData';

export default function VisitPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Breadcrumb */}
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">Visit Us</span>
      </nav>

      {/* Header */}
      <div className="space-y-4 border-b editorial-border-light pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase border border-brand-ember/30">
          <MapPin className="w-3.5 h-3.5 text-brand-ember" />
          <span>LOCAL FLAGSHIP HUB · 所在地</span>
        </div>
        
        {/* H1 as specified in Content Pack */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-syne tracking-tight text-brand-dark leading-[1.08]">
          Visit UMAMI, Sector 8B Chandigarh
        </h1>
        <p className="text-zinc-600 text-sm sm:text-base font-sans">
          Counter kitchen with an open live fire grill. Opening 1 October 2026.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Canonical Address, Format, and Directions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Location & Format Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl editorial-border shadow-sm space-y-4">
            <h2 className="font-syne font-black text-2xl text-brand-dark">
              Booth No. 7, Inner Market
            </h2>
            <div className="font-mono text-sm text-zinc-700 space-y-1">
              <div>Sector 8B, Chandigarh 160018</div>
              <div className="text-brand-ember font-bold">Opening 1 October 2026</div>
              <div className="text-xs text-zinc-500 pt-1">Operated by {UMAMI_BRAND_INFO.entity}</div>
            </div>

            <p className="text-sm text-zinc-700 font-sans leading-relaxed pt-2 border-t editorial-border-light">
              We are a counter kitchen, not a dining room. Order at the counter, watch the fire, take it with you. Parking is along the Inner Market row.
            </p>
          </div>

          {/* Finding Us Directions */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl editorial-border shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-ember uppercase">
              <Compass className="w-4 h-4" />
              <span>FINDING US</span>
            </div>
            <h3 className="font-syne font-bold text-xl text-brand-dark">
              Directions & Sector Grid Navigation
            </h3>
            <p className="text-sm text-zinc-700 font-sans leading-relaxed">
              Sector 8B Inner Market is the row behind the main Sector 8 market frontage. We are at Booth No. 7. If you are coming from the Sector 8 and 9 roundabout on Madhya Marg, the row runs along the inner market side.
            </p>
          </div>

          {/* Parking & Curbside Tips */}
          <div className="deep-slate-panel p-6 sm:p-8 rounded-3xl border-brand-ember/20 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-brand-ember uppercase">
              <Car className="w-4 h-4" />
              <span>PARKING & EVENING CIRCUIT</span>
            </div>
            <h3 className="font-syne font-bold text-xl text-white">
              The Evening Rhythm in Sector 8
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
              Parking along the market row fills rapidly after 7:00 PM as locals drive the evening food circuit. Arriving slightly earlier makes parking effortless. Takeaway orders can be collected directly from the counter.
            </p>
          </div>

        </div>

        {/* Right Column: Interactive Map & Counter Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Map Card */}
          <div className="bg-white p-6 rounded-3xl editorial-border shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-brand-dark">Interactive Map</span>
              <span className="text-[10px] font-mono bg-brand-dark text-white px-2 py-0.5 rounded">Sector 8B</span>
            </div>

            <div className="w-full h-64 bg-zinc-100 rounded-2xl overflow-hidden editorial-border relative flex items-center justify-center">
              <iframe
                title="UMAMI Sector 8B Chandigarh Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.589886364132!2d76.793284!3d30.742354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed10a30b42f1%3A0x6b876483584826b5!2sSector%208B%2C%20Sector%208%2C%20Chandigarh%2C%20160009!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 filter contrast-125"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <a
              href="https://maps.google.com/?q=Sector+8B+Inner+Market+Chandigarh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-brand-dark hover:bg-brand-ember text-white font-syne font-bold text-xs flex items-center justify-center gap-2 transition min-h-[44px]"
            >
              <span>Open in Google Maps</span>
              <span>↗</span>
            </a>
          </div>

          {/* Quick Contact & Entity Card */}
          <div className="bg-zinc-50 p-6 rounded-3xl border editorial-border-light space-y-3 font-mono text-xs">
            <div className="text-zinc-500 uppercase font-bold text-[10px]">OPERATIONS</div>
            <div className="text-zinc-800 space-y-1">
              <div><strong>Brand:</strong> UMAMI (旨味)</div>
              <div><strong>Operating Entity:</strong> Nimantrit Foods</div>
              <div><strong>Launch Date:</strong> 1 October 2026</div>
              <div><strong>Hours:</strong> 11:00 AM – 11:00 PM Daily</div>
            </div>
          </div>

        </div>

      </div>

      {/* 9-Question FAQ Block with FAQPage Schema Alignment */}
      <section id="faq-section" className="space-y-6 pt-6 border-t editorial-border-light">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-white text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-brand-ember" />
            <span>FAQ & CULINARY BLUEPRINT · よくある質問</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black font-syne text-brand-dark">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
            Direct, self-contained answers about our Sector 8B counter kitchen, Hokkaido buns, live fire char, and delivery.
          </p>
        </div>

        <div className="space-y-3">
          {UMAMI_FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-brand-dark shadow-md' 
                    : 'bg-white/70 editorial-border-light hover:border-brand-dark/40'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none min-h-[48px]"
                >
                  <span className="font-syne font-bold text-sm sm:text-base text-brand-dark">
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-brand-ember transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-700 font-sans leading-relaxed border-t border-black/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
