import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UMAMI_BRAND_INFO } from '../data/umamiMenuData';

export default function LegalPage() {
  const location = useLocation();
  const isTerms = location.pathname.includes('terms');
  const pageTitle = isTerms ? 'Terms of Service' : 'Privacy Policy';

  return (
    <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 font-sans">
      <nav className="text-xs font-mono text-zinc-500 flex items-center gap-2">
        <Link to="/" className="hover:text-brand-ember">Home</Link>
        <span>/</span>
        <span className="text-brand-dark font-bold">{pageTitle}</span>
      </nav>

      <header className="space-y-2 border-b editorial-border-light pb-6">
        <h1 className="text-3xl sm:text-4xl font-black font-syne text-brand-dark">
          {pageTitle}
        </h1>
        <p className="text-xs font-mono text-zinc-500">
          Last updated: 1 October 2026 · UMAMI (Operated by Nimantrit Foods)
        </p>
      </header>

      <div className="space-y-6 text-sm text-zinc-700 leading-relaxed">
        <p>
          UMAMI is operated by Nimantrit Foods, located at Booth No. 7, Inner Market, Sector 8B, Chandigarh 160018, India.
        </p>

        {isTerms ? (
          <>
            <h2 className="font-syne font-bold text-lg text-brand-dark">1. Service Overview</h2>
            <p>
              UMAMI operates a food takeaway, curbside car-hop, and direct delivery counter. Orders placed through our site or authorized aggregator partners are subject to standard kitchen prep and service guidelines.
            </p>

            <h2 className="font-syne font-bold text-lg text-brand-dark">2. Pricing & Costing</h2>
            <p>
              Pre-launch menu items reflect recipe specifications. Official prices are effective from opening day on 1 October 2026.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-syne font-bold text-lg text-brand-dark">1. Information Collection</h2>
            <p>
              We collect information provided directly by users for launch notifications, VIP passes, and order fulfillment. We do not sell your personal contact details to third parties.
            </p>

            <h2 className="font-syne font-bold text-lg text-brand-dark">2. Communications</h2>
            <p>
              If you register for our launch VIP pass, we will notify you with opening dates, queue passes, and tasting invitations. You may opt out at any time.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
