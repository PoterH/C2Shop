import { WhatsAppIcon } from './WhatsAppIcon';
import { useText } from '../hooks/useText';
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Shield, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const localize = useText();
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '5581997349300';
  const whatsappMessage = encodeURIComponent(localize('Olá, tenho interesse em um software da C2Tech e gostaria de tirar uma dúvida.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  const copy = (pt: string, en: string, es: string) => localize(language === 'en' ? en : language === 'es' ? es : pt);

  const linkClass = 'inline-flex min-h-8 items-center text-sm text-slate-300 transition-colors hover:text-white hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300';

  return (
    <footer className="relative overflow-x-clip border-t border-slate-800 bg-brand-navy pt-24 pb-8 text-slate-300">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-slate-700/80 pb-10 sm:grid-cols-2 lg:grid-cols-[1.45fr_0.8fr_0.95fr_1.1fr] lg:gap-12">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
              <img src="/images/logo.webp" alt="" width="40" height="40" className="h-10 w-10 rounded-xl object-cover" />
              <span>
                <span className="block font-display text-lg font-extrabold leading-tight text-white">C2Tech</span>
                <span className="block text-xs text-slate-300">{localize('Licenças Digitais')}</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-300">
              {copy(
                'Soluções digitais profissionais, entrega rápida e suporte de instalação. As condições de acesso variam conforme o produto e o plano.',
                'Professional digital solutions, fast delivery and installation support. Access terms vary by product and plan.',
                'Soluciones digitales profesionales, entrega rápida y soporte de instalación. Las condiciones de acceso varían según el producto y el plan.'
              )}
            </p>

            <nav aria-label={copy('Redes sociais', 'Social media', 'Redes sociales')}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                <li>
                  <a href="https://www.instagram.com/c2techoficial/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@C2Tech.Oficial" target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                    </svg>
                    YouTube
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <nav aria-labelledby="footer-shop-title">
            <h2 id="footer-shop-title" className="mb-3 font-display text-base font-bold text-white">
              {copy('Loja', 'Shop', 'Tienda')}
            </h2>
            <ul className="space-y-1">
              <li><Link to="/" className={linkClass}>{localize('Início')}</Link></li>
              <li><Link to="/catalogo" className={linkClass}>{localize('Catálogo de Softwares')}</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-help-title">
            <h2 id="footer-help-title" className="mb-3 font-display text-base font-bold text-white">
              {copy('Ajuda', 'Help', 'Ayuda')}
            </h2>
            <ul className="space-y-1">
              <li><Link to="/entrega-e-pagamento" className={linkClass}>{localize('Entrega e Pagamento Seguro')}</Link></li>
              <li><Link to="/contato" className={linkClass}>{localize('Fale Conosco / Suporte')}</Link></li>
              <li><Link to="/faq" className={linkClass}>{localize('FAQ / Dúvidas')}</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-company-title">
            <h2 id="footer-company-title" className="mb-3 font-display text-base font-bold text-white">
              {copy('Empresa e legal', 'Company & legal', 'Empresa y legal')}
            </h2>
            <ul className="space-y-1">
              <li><Link to="/sobre-nos" className={linkClass}>{localize('Sobre Nós')}</Link></li>
              <li>
                <Link to="/termos" className={linkClass}>
                  <FileText className="mr-2 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {localize('Termos de Uso')}
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className={linkClass}>
                  <Shield className="mr-2 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {localize('Política de Privacidade')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <section aria-labelledby="footer-contact-title" className="grid gap-5 border-b border-slate-700/80 py-7 lg:grid-cols-[1fr_auto_auto] lg:items-center lg:gap-8">
          <div>
            <h2 id="footer-contact-title" className="font-display text-base font-bold text-white">
              {copy('Precisa de ajuda?', 'Need help?', '¿Necesitas ayuda?')}
            </h2>
            <p className="mt-1 text-sm text-slate-300">
              {copy('Fale com a equipe C2Tech.', 'Contact the C2Tech team.', 'Habla con el equipo de C2Tech.')}
            </p>
          </div>

          <div>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 max-w-full flex-wrap items-center justify-center gap-2 rounded-lg bg-feedback-success-strong px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-emerald-300 sm:justify-start">
              <WhatsAppIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              {copy('Falar no WhatsApp', 'Chat on WhatsApp', 'Hablar por WhatsApp')}
              <span className="break-words font-normal text-emerald-50">+55 (81) 99734-9300</span>
            </a>
            <p className="mt-2 text-xs text-slate-300">
              {copy('Todos os dias, das 09h às 20h (horário de Brasília)', 'Daily, 9 am–8 pm (Brasília time)', 'Todos los días, de 09:00 a 20:00 (hora de Brasilia)')}
            </p>
          </div>

          <a href="mailto:c2tech2025@gmail.com" className="inline-flex min-h-10 items-center gap-2 text-sm text-slate-200 underline decoration-slate-500 underline-offset-4 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300">
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            c2tech2025@gmail.com
          </a>
        </section>

        <section aria-labelledby="footer-terms-title" className="border-b border-slate-700/80 py-7">
          <h2 id="footer-terms-title" className="font-display text-sm font-bold text-white">
            {copy('Licenças e prazos de acesso', 'Licenses and access terms', 'Licencias y plazos de acceso')}
          </h2>
          <p className="mt-2 max-w-[72ch] text-sm leading-relaxed text-slate-300">
            {copy(
              'Os produtos têm modalidades e prazos de acesso diferentes. Alguns oferecem acesso vitalício à versão adquirida; outros têm planos por prazo determinado. Antes da compra, confira as informações do produto sobre versão, compatibilidade, prazo e atualizações.',
              'Products have different license types and access periods. Some provide lifetime access to the purchased version; others have time-limited plans. Before buying, check the product information for version, compatibility, access period and updates.',
              'Los productos tienen diferentes modalidades de licencia y plazos de acceso. Algunos ofrecen acceso de por vida a la versión adquirida; otros tienen planes por tiempo limitado. Antes de comprar, consulta la información del producto sobre versión, compatibilidad, plazo y actualizaciones.'
            )}
          </p>
        </section>

        <div className="flex flex-col gap-2 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:pr-72">
          <p className="text-center sm:text-left">
            &copy; {currentYear} C2Tech. {copy('Todos os direitos reservados.', 'All rights reserved.', 'Todos los derechos reservados.')}
          </p>
          <p className="text-center sm:text-right">
            {copy('Foco no projeto, tecnologia ao seu alcance.', 'Focus on the project, technology within your reach.', 'Foco en el proyecto, tecnología a tu alcance.')}
          </p>
        </div>
      </div>
    </footer>
  );
};
