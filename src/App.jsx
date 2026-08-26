import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScrollProvider from './components/layout/SmoothScrollProvider';
import ScrollToTop from './components/layout/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import MenuPage from './pages/MenuPage';
import OrderPage from './pages/OrderPage';
import VisitPage from './pages/VisitPage';
import JournalIndexPage from './pages/JournalIndexPage';
import JournalPostPage from './pages/JournalPostPage';
import ContactPage from './pages/ContactPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <SmoothScrollProvider>
        <div className="min-h-screen text-brand-dark flex flex-col justify-between selection:bg-brand-ember selection:text-white font-sans">
          
          {/* Global Minimalist Navbar */}
          <Navbar />

          <div className="flex-grow flex flex-col overflow-x-hidden w-full">
            {/* Main Canonical Multi-Route Views */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/story" element={<StoryPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/visit" element={<VisitPage />} />
                <Route path="/journal" element={<JournalIndexPage />} />
                <Route path="/journal/:slug" element={<JournalPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<LegalPage />} />
                <Route path="/terms" element={<LegalPage />} />
                
                {/* Fallback routes */}
                <Route path="/builder" element={<MenuPage />} />
                <Route path="/sector-8" element={<VisitPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            {/* Global Deep Slate Footer with Canonical NAP */}
            <Footer />
          </div>
        </div>
      </SmoothScrollProvider>
    </Router>
  );
}
