import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
const titles: Record<string, [string, string, string]> = {
  '/': ['Softwares Profissionais com Acesso Vitalício', 'Professional Software with Lifetime Access', 'Software Profesional con Acceso de por Vida'],
  '/catalogo': ['Catálogo de Softwares', 'Software Catalog', 'Catálogo de Software'],
  '/sobre-nos': ['Sobre Nós', 'About Us', 'Sobre Nosotros'],
  '/contato': ['Fale Conosco', 'Contact Us', 'Contáctanos'],
  '/suporte': ['Suporte Técnico', 'Technical Support', 'Soporte Técnico'],
  '/faq': ['Perguntas Frequentes', 'Frequently Asked Questions', 'Preguntas Frecuentes'],
  '/entrega-e-pagamento': ['Entrega e Pagamento', 'Delivery and Payment', 'Entrega y Pago'],
  '/como-funciona': ['Como Funciona', 'How It Works', 'Cómo Funciona'],
  '/termos': ['Termos de Uso', 'Terms of Use', 'Términos de Uso'],
  '/privacidade': ['Política de Privacidade', 'Privacy Policy', 'Política de Privacidad'],
  '/obrigado': ['Pedido Confirmado', 'Order Confirmed', 'Pedido Confirmado'],
};
export function PageMetadata() {
  const {pathname} = useLocation();
  const {language} = useLanguage();
  useEffect(() => {
    if (pathname.startsWith('/produto/')) return;
    const title = titles[pathname] || titles['/'];
    document.title = `${title[language === 'en' ? 1 : language === 'es' ? 2 : 0]} | C2Tech`;
    const description = language === 'en'
      ? 'Professional software with digital delivery and assisted installation support at C2Tech.'
      : language === 'es' ? 'Software profesional con entrega digital y soporte de instalación asistida en C2Tech.'
      : 'Softwares profissionais com entrega digital e suporte de instalação assistida na C2Tech.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [pathname, language]);
  return null;
}
