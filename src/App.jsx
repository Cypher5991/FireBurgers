import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import OrderPage from './pages/OrderPage';
import ComboBuilderPage from './pages/ComboBuilderPage';
import FlagshipPage from './pages/FlagshipPage';
import CartDrawer from './components/CartDrawer';
import OrderConfirmation from './components/OrderConfirmation';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <SmoothScrollProvider>
          <div className="min-h-screen text-brand-dark flex flex-col justify-between selection:bg-brand-ember selection:text-white font-sans">
            {/* Global Minimalist Navbar */}
            <Navbar />

            {/* Main Multi-Route Views */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/builder" element={<ComboBuilderPage />} />
                <Route path="/sector-8" element={<FlagshipPage />} />
                {/* Fallback route */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>

            {/* Global Omnichannel Cart Drawer */}
            <CartDrawer />

            {/* Live Kitchen Tracker Modal */}
            <OrderConfirmation />

            {/* Global Deep Slate Footer with GEO Citations */}
            <Footer />
          </div>
        </SmoothScrollProvider>
      </CartProvider>
    </Router>
  );
}
