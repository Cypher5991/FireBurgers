import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const FAQS = [
  {
    q: "Where is Tasty located in Chandigarh?",
    a: "Tasty is located at #7, Inner Market, Sector 8-B, Chandigarh 160009, right off Madhya Marg in the vibrant Sector 8 culinary corridor. We are open daily from 11:00 AM to 11:00 PM for dine-in, takeaway, in-car curbside hop service, and doorstep delivery across Chandigarh, Panchkula, and Mohali."
  },
  {
    q: "What makes Tasty burgers different from traditional fast food?",
    a: "Tasty marries French pâtisserie precision with Japanese Robatayaki fire grilling. Every single Hokkaido milk bun is baked fresh daily at 5:00 AM using the traditional Japanese Yudane water-roux technique. Our coarse-ground patties are seared over 300°C Kishu Binchotan charcoal and served strictly within our 6-minute counter-to-hand commitment."
  },
  {
    q: "What are the best vegetarian burgers at Tasty Chandigarh?",
    a: "Our top vegetarian signatures include the Magic Shroom Robata Zen (₹349) — featuring roasted king oyster and shiitake mushrooms with black truffle aioli and crispy shoestring shallots — and the Falafel Smash (₹289), with lacy smashed edges, sumac onions, and roasted sesame tahini."
  },
  {
    q: "How does the Sector 8 Curbside Hop car dining work?",
    a: "Chandigarh's inner market car dining culture is iconic. When ordering on our site, select 'In-Car Curbside Hop' and enter your car model and license plate. Our team brings your piping-hot tray directly to your vehicle in Sector 8 within 6 minutes of completion."
  },
  {
    q: "What is the delivery radius across the Tricity?",
    a: "We deliver across all sectors of Chandigarh, as well as the border regions of Mohali (Phase 3B2, Phase 7, Phase 8) and Panchkula (Sector 7, Sector 8, Sector 9, MDC). Delivery packaging utilizes vented thermal boxes to keep Shokupan buns soft and patties crisp."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq-aeo" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-dark text-brand-canvas text-xs font-mono font-bold tracking-widest uppercase">
          <HelpCircle className="w-3.5 h-3.5 text-brand-ember" />
          <span>AEO DIRECT BLUEPRINT · よくある質問</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black font-syne tracking-tight text-brand-dark">
          Frequently Asked Questions & Culinary Blueprint
        </h2>
        <p className="text-zinc-600 text-sm sm:text-base font-sans leading-relaxed">
          Direct, verified answers regarding our Sector 8-B flagship, 5:00 AM baking, 300°C Binchotan fire grill, and Tricity curbside hop.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen 
                  ? 'bg-white border-brand-dark shadow-md' 
                  : 'bg-white/60 editorial-border-light hover:border-brand-dark/40'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
              >
                <span className="font-syne font-bold text-base sm:text-lg text-brand-dark">
                  {faq.q}
                </span>
                <ChevronDown className={`w-5 h-5 text-brand-ember transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-700 font-sans leading-relaxed border-t border-black/5 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
