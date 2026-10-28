import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductDetail } from './pages/ProductDetail';
import { DeliveryPaymentPage } from './pages/DeliveryPaymentPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ThankYouPage } from './pages/ThankYouPage';

import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { CartDrawer } from './components/CartDrawer';
import { trackPageView } from './utils/pixel';
import { Analytics } from '@vercel/analytics/react';

// Scroll to top automatically when navigating to a new route & track SPA PageViews
function ScrollToTop() {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView();
  }, [pathname]);

  return null;
}

function App() {
  // Set default page title
  useEffect(() => {
    document.title = 'C2Tech | Softwares Profissionais com Acesso Vitalício';
  }, []);

  return (
    <CurrencyProvider>
      <LanguageProvider>
        <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-accent-blue/10 selection:text-accent-blue">
            {/* Sticky Header */}
            <Header />
            
            {/* Main Content Area */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/produto/:slug" element={<ProductDetail />} />
                <Route path="/entrega-e-pagamento" element={<DeliveryPaymentPage />} />
                <Route path="/como-funciona" element={<DeliveryPaymentPage />} />
                <Route path="/contato" element={<ContactPage />} />
                <Route path="/suporte" element={<ContactPage />} />
                <Route path="/sobre-nos" element={<AboutPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/termos" element={<TermsPage />} />
                <Route path="/privacidade" element={<PrivacyPage />} />
                <Route path="/obrigado" element={<ThankYouPage />} />
                
                {/* Fallback route - redirect to home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
            
            {/* Footer */}
            <Footer />

            {/* Cart Drawer */}
            <CartDrawer />
            <Analytics />
          </div>
        </BrowserRouter>
      </CartProvider>
      </LanguageProvider>
    </CurrencyProvider>
  );
}

export default App;
