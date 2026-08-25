import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroExplodedBurger from './components/HeroExplodedBurger';
import MarqueeBanner from './components/MarqueeBanner';
import VolcanoCutPour from './components/VolcanoCutPour';
import MenuShowcase from './components/MenuShowcase';
import DipWallRadar from './components/DipWallRadar';
import ComboTrayBuilder from './components/ComboTrayBuilder';
import StorySection from './components/StorySection';
import CartDrawer from './components/CartDrawer';
import OrderConfirmation from './components/OrderConfirmation';
import Footer from './components/Footer';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FDFCF7] text-brand-dark selection:bg-brand-orange selection:text-white font-inter">
        {/* Navigation */}
        <Navbar />

        <main>
          {/* Hero Section with Signature Burger Image & 3D Exploded Layer Mode */}
          <HeroExplodedBurger />

          {/* Kinetic Marquee Ticker */}
          <MarqueeBanner />

          {/* Module 2: The Volcano Cut & Pour Split-View Slider */}
          <VolcanoCutPour />

          {/* Module 3: Full Category Menu Grid */}
          <MenuShowcase />

          {/* Module 4: The 7 Dip Wall & 5-Axis Tasting Radar */}
          <DipWallRadar />

          {/* Module 5: Tactile 3D Combo Tray Builder */}
          <ComboTrayBuilder />

          {/* Brand Craft, Sector 8 Curbside & 6-Minute Rule */}
          <StorySection />
        </main>

        {/* Omnichannel Cart & Curbside Drawer */}
        <CartDrawer />

        {/* Live Kitchen Tracker Modal */}
        <OrderConfirmation />

        {/* Global Footer */}
        <Footer />
      </div>
    </CartProvider>
  );
}
