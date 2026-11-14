import { CardReturnPage } from './pages/CardReturnPage';
import { MobileSearchEntry, MobileSearchPage } from './components/MobileSearch';
import { PageMetadata } from './components/PageMetadata';
import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LiveChat } from './components/LiveChat';
const CartPage = lazy(() => import('./pages/CartPage').then(module => ({ default: module.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(module => ({ default: module.CheckoutPage })));
const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Catalog = lazy(() => import('./pages/Catalog').then(module => ({ default: module.Catalog })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(module => ({ default: module.ProductDetail })));
const DeliveryPaymentPage = lazy(() => import('./pages/DeliveryPaymentPage').then(module => ({ default: module.DeliveryPaymentPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(module => ({ default: module.FAQPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(module => ({ default: module.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(module => ({ default: module.PrivacyPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(module => ({ default: module.ThankYouPage })));

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
return (
    <CurrencyProvider>
      <LanguageProvider>
        <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MobileSearchEntry />
          <PageMetadata />
          <div className="flex flex-col min-h-screen bg-white text-slate-800 antialiased selection:bg-action-primary/10 selection:text-action-primary">
            {/* Sticky Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow xl:pt-8">
              <Suspense fallback={<div className="min-h-[60vh] pt-32 flex justify-center" role="status" aria-label="Loading"><span className="w-8 h-8 border-2 border-action-primary border-t-transparent rounded-full animate-spin" /></div>}>
              <Routes>
                <Route path="/buscar" element={<MobileSearchPage />} />
                <Route path="/carrinho" element={<CartPage />} />
                <Route path="/pagamento-cartao" element={<CardReturnPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
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
              </Suspense>
            </main>

            {/* Footer */}
            <Footer />
            <CartDrawer />
            <LiveChat />

            {/* Cart Drawer */}

            <Analytics />
          </div>
        </BrowserRouter>
      </CartProvider>
      </LanguageProvider>
    </CurrencyProvider>
  );
}

export default App;
