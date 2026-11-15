import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { HomeTrustpilot } from '../components/HomeTrustpilot';
import { HeroBenefitsStack } from '../components/HeroBenefitsStack';
import { LearnMoreChevron } from '../components/LearnMoreChevron';
import { useText } from '../hooks/useText';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { GridMotion, type GridMotionItem } from '../components/GridMotion';
import LogoLoop, { type LogoLoopImage } from '../components/LogoLoop';
import { useLanguage } from '../context/LanguageContext';

const HOME_PRODUCT_FILTERS = [
  { id: 'microsoft', label: 'Microsoft' },
  { id: 'adobe', label: 'Adobe' },
  { id: '3d-cad', label: '3D-CAD' },
  { id: 'macos', label: 'macOS' },
  { id: 'woodworking', label: 'Marcenaria' },
] as const;

const heroGridCards: GridMotionItem[] = [
  1, 2, 5, 7, 17, 20, 28, 38, 41, 44, 48, 52, 53, 55, 59, 65, 67, 71, 78, 93, 96, 98,
].map((number) => ({ src: `/images/grid-cards/trimmed/card-${String(number).padStart(2, '0')}.png` }));

const softwareBrandLogos: LogoLoopImage[] = [
  { src: '/images/company-logos/brand-01.png', alt: '', hoverColor: '#ed1c24' },
  { src: '/images/company-logos/brand-02.png', alt: '', hoverColor: '#0696d7' },
  { src: '/images/company-logos/brand-03.png', alt: '', hoverColor: '#006699' },
  { src: '/images/company-logos/brand-04.png', alt: '', hoverColor: '#5146e5' },
  { src: '/images/company-logos/brand-05.png', alt: '', hoverColor: '#7d7d7d' },
  { src: '/images/company-logos/brand-06.png', alt: '', hoverColor: '#00a4ef' },
  { src: '/images/company-logos/brand-07.png', alt: '', hoverColor: '#0b70a8' },
  { src: '/images/company-logos/brand-08.png', alt: '', hoverColor: '#f26522' },
  { src: '/images/company-logos/brand-09.png', alt: '', hoverColor: '#3264d8' },
  { src: '/images/company-logos/brand-10.png', alt: '', hoverColor: '#41b883' },
];

export const Home: React.FC = () => {
  const localize = useText();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter products for the landing page grid (show max 16 of active category)
  const filteredProducts = useMemo(() => products
    .filter((product) => {
      if (product.isSubscription) return false;
      if (activeCategory === 'all') return true;
      const name = product.name.toLocaleLowerCase('pt-BR');
      if (activeCategory === 'microsoft') return /microsoft|windows|office/.test(name);
      if (activeCategory === 'adobe') return name.includes('adobe');
      if (activeCategory === 'macos') return product.compatibility === 'macOS' || product.compatibility === 'Windows e macOS';
      if (activeCategory === 'woodworking') return product.category === 'Marcenaria e Móveis Planejados';
      if (activeCategory === '3d-cad') {
        return /cad|3d|bim|archicad|revit|sketchup|rhino|solidworks|inventor|cype|tqs|enscape|marcenaria|dental/.test(name)
          || /Engenharia e Arquitetura|Marcenaria e Móveis Planejados|Odontologia e CAD Dental|Projetos Elétricos e Eletrônicos/.test(product.category);
      }
      return false;
    })
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .slice(0, 16), [activeCategory]);


  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setPrefersReducedMotion(motionPreference.matches);
    motionPreference.addEventListener('change', updateMotionPreference);
    return () => motionPreference.removeEventListener('change', updateMotionPreference);
  }, []);

  // Reset scroll to 0 when category changes
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [activeCategory]);

  // Auto scroll effect for carousel
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      if (document.hidden) return;
      const el = carouselRef.current;
      if (el) {
        const scrollAmount = (el.firstElementChild?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(el).columnGap);
        const currentScroll = el.scrollLeft;
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (currentScroll >= maxScroll - 10) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          el.scrollTo({ left: currentScroll + scrollAmount, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, filteredProducts]);

  const scrollLeft = () => {
    const el = carouselRef.current;
    if (el) {
      const scrollAmount = (el.firstElementChild?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(el).columnGap);
      el.scrollTo({ left: el.scrollLeft - scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const el = carouselRef.current;
    if (el) {
      const scrollAmount = (el.firstElementChild?.getBoundingClientRect().width ?? 0) + parseFloat(getComputedStyle(el).columnGap);
      el.scrollTo({ left: el.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };


  const steps = [
    {
      icon: '/images/step-choose.png',
      title: 'Escolha o software',
      desc: 'Selecione o produto ideal para seu uso profissional em nosso catálogo.'
    },
    {
      icon: '/images/step-purchase.png',
      title: 'Finalize o pedido',
      desc: 'Pagamento rápido e seguro em nosso checkout criptografado.'
    },
    {
      icon: '/images/step-email.png',
      title: 'Receba no e-mail',
      desc: 'O link com os arquivos e instruções é enviado segundos após o pagamento.'
    },
    {
      icon: '/images/step-support.png',
      title: 'Instale com orientação',
      desc: 'Siga o tutorial detalhado ou solicite auxílio do suporte remoto se necessário.'
    }
  ];


  const faqItems = [
    {
      q: 'Como recebo meu produto?',
      a: 'Após a confirmação do pagamento, os detalhes de acesso e os links de download são enviados de forma 100% automática para o e-mail que você informou no checkout. Verifique também suas pastas de Spam e Promoções.'
    },
    {
      q: 'O acesso é vitalício?',
      a: 'Sim, o acesso é vitalício para a versão que você adquiriu. Não existem assinaturas recorrentes, taxas anuais ou mensalidades. Você paga apenas uma vez e utiliza sem limitações de tempo.'
    },
    {
      q: 'As atualizações estão inclusas?',
      a: 'Não. O produto adquirido corresponde à versão informada na página do software. Atualizações para novas versões lançadas no futuro não estão inclusas.'
    },
    {
      q: 'Vocês ajudam na instalação?',
      a: 'Sim. Todos os softwares acompanham um guia de instalação passo a passo muito simples de seguir. Caso encontre dificuldades, nossa equipe técnica oferece suporte de instalação assistida e remoto via WhatsApp.'
    },
    {
      q: 'Funciona em Mac?',
      a: 'Apenas os softwares descritos explicitamente como compatíveis com macOS (por exemplo, "Office 2024 para Mac"). A maioria dos softwares de engenharia é compatível apenas com o sistema operacional Windows.'
    },
    {
      q: 'Recebo nota fiscal?',
      a: 'Configurações de emissão de documento fiscal e dados de faturamento podem ser alteradas e visualizadas em sua conta ou solicitadas por meio dos nossos canais de suporte técnico (Espaço reservado para configuração do lojista).'
    },
    {
      q: 'Posso comprar ou tirar dúvidas pelo WhatsApp?',
      a: 'Sim, com certeza! Se preferir falar com um atendente humano para sanar dúvidas sobre compatibilidade ou pagamentos antes de finalizar sua compra, basta clicar em qualquer botão do WhatsApp no site.'
    }
  ];

  const whatsappNumber = '5581997349300'; // Substitua pelo seu número real do WhatsApp
  const whatsappMessage = encodeURIComponent(localize('Olá, tenho interesse em um software da C2Tech e gostaria de tirar uma dúvida.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="pt-0">
      {/* 1. HERO SECTION */}
      <section className="home-hero relative bg-brand-navy pt-14 pb-3 sm:pt-16 md:pt-14 sm:pb-4 overflow-hidden text-center z-0">

        {/* Background Layers Wrapper (z-0 sits above section's bg color but behind relative z-10 content) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* A quiet technical grid gives the hero structure without decorative glow layers. */}
          <div className="absolute inset-0 bg-grid-tech opacity-40"></div>
        </div>

        <div className="home-hero-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-3 sm:gap-3 md:gap-4">
          <div className="home-hero-showcase">
            <div className="home-hero-customer-proof t-avatar-group" aria-label={language === 'en' ? '+1,000 customers' : language === 'es' ? '+1000 clientes' : '+1000 clientes'}>
              <div className="home-hero-avatars" aria-hidden="true">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=64&h=64&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=64&h=64&q=80" alt="" />
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=64&h=64&q=80" alt="" />
              </div>
              <span>{language === 'en' ? '+1,000 customers' : language === 'es' ? '+1000 clientes' : '+1000 clientes'}</span>
            </div>
            <GridMotion
              items={heroGridCards}
              className="home-hero-gridmotion"
              rows={3}
              aspectRatio={0.68}
              gap={18}
              radius={0}
              angle={-8}
              tilt={0}
              speed={22}
              direction="alternate"
              parallax={0.5}
              spotlight={0.62}
              dim={0.28}
              fade={0.38}
              fit="contain"
              borderless
              tileColor="transparent"
            />
            {/* Hero catalog search */}
            <div className="home-hero-search w-full max-w-2xl relative z-20">
            <form
              role="search"
              aria-label={localize('Pesquisar softwares')}
              onSubmit={(event) => {
                event.preventDefault();
                const query = heroSearch.trim();
                navigate(query ? `/catalogo?q=${encodeURIComponent(query)}` : '/catalogo');
              }}
              className="flex items-center gap-2 rounded-control bg-white p-2 pl-4 sm:pl-5 border border-sky-200/80 shadow-[0_4px_16px_rgba(15,23,42,0.12)] focus-within:ring-4 focus-within:ring-action-primary/25 focus-within:border-action-primary transition-shadow"
            >
              <Search className="w-5 h-5 text-action-primary shrink-0" aria-hidden="true" />
              <label htmlFor="hero-software-search" className="sr-only">{localize('Qual software você procura?')}</label>
              <input
                id="hero-software-search"
                type="search"
                value={heroSearch}
                onChange={(event) => setHeroSearch(event.target.value)}
                placeholder={localize(language === 'en' ? 'Find your software…' : language === 'es' ? 'Encuentra tu software…' : 'Qual software você procura?')}
                className="w-full min-w-0 bg-transparent py-3 text-base text-slate-900 placeholder:text-slate-400 outline-none"
              />
              <button type="submit" className="shrink-0 rounded-xl bg-action-primary hover:bg-action-primary-hover px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary">
                {localize(language === 'en' ? 'Search' : language === 'es' ? 'Buscar' : 'Buscar')}
              </button>
            </form>
            </div>
            <HeroBenefitsStack />
          </div>

        </div>

      </section>

      <HomeTrustpilot />

      {/* 3. CATALOG SECTION */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="text-[11px] font-extrabold text-action-primary uppercase tracking-wider">
              {localize(language === 'en' ? 'Complete Store' : language === 'es' ? 'Tienda Completa' : 'Loja Completa')}
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {localize(language === 'en' ? 'Find the ideal software for your project' : language === 'es' ? 'Encuentra el software ideal para tu proyecto' : 'Encontre o software ideal para o seu projeto')}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {localize(language === 'en'
                ? 'Explore our selection of high-performance professional tools with lifetime access and one-time payment.'
                : language === 'es'
                ? 'Explora nuestra selección de herramientas profesionales de alto rendimiento con licencia permanente y pago único.'
                : 'Explore nossa seleção de ferramentas profissionais de alta performance com licença alternativa e pagamento único.')}
            </p>
          </div>

          <div className="mb-5 mt-1 sm:mb-6">
            <LogoLoop
              logos={softwareBrandLogos}
              speed={46}
              direction="left"
              logoHeight={32}
              gap={44}
              hoverSpeed={0}
              fadeOut
              fadeOutWidth={0.1}
              draggable
              scaleOnHover={false}
              intro={false}
              ariaLabel={localize('Marcas dos softwares disponíveis')}
              className="home-software-logo-loop"
              renderItem={(item) => {
                if (!('src' in item)) return item.node;
                return (
                  <span
                    aria-hidden="true"
                    className="home-software-logo-mark"
                    style={{
                      WebkitMaskImage: `url("${item.src}")`,
                      maskImage: `url("${item.src}")`,
                    }}
                  />
                );
              }}
            />
          </div>

          {/* Categories Slider/Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 px-1 pb-4">
            {HOME_PRODUCT_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                aria-pressed={activeCategory === filter.id}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 border ${
                  activeCategory === filter.id
                    ? 'bg-slate-900 border-slate-900 text-white'
                    : 'bg-white border-slate-200 hover:border-slate-400 text-slate-600'
                }`}
              >
                {localize(filter.label)}
              </button>
            ))}
          </div>

          {/* Products Carousel */}
          {filteredProducts.length > 0 ? (
            <div className="relative group/carousel w-full">
              {/* Left Navigation Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
                aria-label={localize("Anterior")}
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={carouselRef}
                className="home-product-carousel flex overflow-x-auto pb-6 pt-2 scroll-smooth scrollbar-none snap-x snap-mandatory"
              >
                {filteredProducts.map((product) => (
                  <div key={product.id} className="home-carousel-item shrink-0 snap-start flex flex-col">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>

              {/* Right Navigation Arrow */}
              <button
                onClick={scrollRight}
                className="t-learn absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100 text-slate-700"
                aria-label={localize("Próximo")}
              >
                <LearnMoreChevron className="ml-0" size={20} />
              </button>
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-500 text-sm font-medium">{localize("Nenhum software cadastrado nesta categoria no momento.")}</p>
            </div>
          )}

          {/* View Catalog Button */}
          <div className="text-center mt-12">
            <Link
              to="/catalogo"
              className="t-learn inline-flex items-center justify-center px-6 py-3 rounded-control bg-white border border-slate-200 hover:border-slate-300 text-sm font-bold text-slate-800 hover:text-slate-900 transition-colors duration-200"
            >
              <span>{localize("Ver catálogo de softwares completo")}</span>
              <LearnMoreChevron className="ml-2 text-slate-500" size={16} />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-[11px] font-extrabold text-action-primary uppercase tracking-wider">
              {localize("Praticidade")}</span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {localize("Como funciona o processo de compra?")}</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {localize("Da escolha do software ao uso pleno, sem complicação e com agilidade absoluta.")}</p>
          </div>

          {/* Steps Grid */}
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-slate-200 pt-6">

            {steps.map((step, index) => (
              <li key={index} className="flex flex-col items-center text-center md:items-start md:text-left space-y-3">
                <img src={step.icon} alt="" aria-hidden="true" className="h-10 w-10 object-contain mx-auto md:mx-0" />
                <h3 className="font-display font-bold text-base text-slate-900">{localize(step.title)}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs md:max-w-none">{localize(step.desc)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5. SUPPORT BANNER */}
      <section className="relative bg-slate-900 text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-5">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              {localize("Precisa de ajuda com a instalação?")}</h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              {localize("Nossa equipe dedicada oferece orientação especializada para a correta instalação e configuração dos produtos adquiridos na C2Tech.")}</p>

            <div className="max-w-md mx-auto space-y-1 border-y border-slate-700 py-3 text-slate-300 text-xs sm:text-sm">
              <p>🕒 <strong>{localize("Atendimento de suporte:")}</strong> {localize(" Segunda a Domingo, das 09:00 às 20:00.")}</p>
              <p className="text-slate-400 text-[11px]">{localize("Nota: Suporte exclusivo para clientes C2Tech. Poderá ser solicitado o e-mail informado na compra para localização do pedido.")}</p>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-feedback-success hover:bg-feedback-success-strong text-white font-bold rounded-control transition-colors"
              >
                <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
                {localize("Falar com suporte no WhatsApp")}</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
              {localize("Dúvidas frequentes de nossos clientes")}</h2>
          </div>

          {/* Accordion FAQ */}
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="t-acc overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-slate-300"
                data-open={openFaqIndex === idx ? 'true' : 'false'}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="t-acc-head flex w-full items-center justify-between gap-4 p-5 text-left font-display font-bold text-slate-900 transition-colors hover:text-action-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-action-primary"
                  aria-expanded={openFaqIndex === idx}
                  aria-controls={`home-faq-answer-${idx}`}
                >
                  <span className="text-sm sm:text-base pr-4">{localize(item.q)}</span>
                  <ChevronDown className="t-acc-chevron h-5 w-5 shrink-0 text-slate-500" aria-hidden="true" />
                </button>

                <div className="t-acc-panel" id={`home-faq-answer-${idx}`} aria-hidden={openFaqIndex !== idx}>
                  <div className="t-acc-panel-inner">
                    <div className="border-t border-slate-100 px-5 py-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    {localize(item.a)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
