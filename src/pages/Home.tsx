import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { HomeTrustpilot } from '../components/HomeTrustpilot';
import { useText } from '../hooks/useText';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Zap,
  Settings,
  ShieldCheck,
  Infinity as InfinityIcon,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { translateCategory } from '../utils/i18n';
import { SnowEffect, HolidayHeroDecor } from '../components/ChristmasDecorations';

export const Home: React.FC = () => {
  const localize = useText();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Filter products for the landing page grid (show max 16 of active category)
  const filteredProducts = useMemo(() => products
    .filter(p => !p.isSubscription && (activeCategory === 'Todos' || p.category === activeCategory))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    .slice(0, 16), [activeCategory]);


  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [isPlaying, setIsPlaying] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    if (!isPlaying || prefersReducedMotion) return;
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
  }, [isPlaying, prefersReducedMotion, filteredProducts]);

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


  const trustBadges = [
    {
      icon: <Zap className="w-6 h-6 text-sky-500" />,
      title: language === 'en' ? 'Immediate delivery' : language === 'es' ? 'Entrega inmediata' : 'Entrega imediata',
      desc: language === 'en' ? 'Access automatically sent to your email right after purchase.' : language === 'es' ? 'Acceso enviado automáticamente a tu correo tras la compra.' : 'Acesso enviado automaticamente para o seu e-mail após a compra.'
    },
    {
      icon: <Settings className="w-6 h-6 text-feedback-success" />,
      title: language === 'en' ? 'Assisted installation' : language === 'es' ? 'Instalación asistida' : 'Instalação assistida',
      desc: language === 'en' ? 'Step-by-step guide and dedicated remote support if needed.' : language === 'es' ? 'Paso a paso detallado y soporte remoto dedicado si lo necesitas.' : 'Passo a passo detalhado e suporte remoto dedicado caso precise.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sky-500" />,
      title: language === 'en' ? 'Protected purchase' : language === 'es' ? 'Compra protegida' : 'Compra protegida',
      desc: language === 'en' ? 'Encrypted transactions and secure checkout.' : language === 'es' ? 'Transacciones cifradas y checkout seguro.' : 'Transações criptografadas e checkout seguro.'
    },
    {
      icon: <InfinityIcon className="w-6 h-6 text-feedback-success" />,
      title: language === 'en' ? 'Lifetime access' : language === 'es' ? 'Acceso vitalicio' : 'Acesso vitalício',
      desc: language === 'en' ? 'Pay only once and use the software without subscriptions.' : language === 'es' ? 'Paga solo una vez y usa el software sin mensualidades.' : 'Pague apenas uma vez e utilize o software sem mensalidades.'
    }
  ];

  const steps = [
    {
      number: '1',
      title: 'Escolha o software',
      desc: 'Selecione o produto ideal para seu uso profissional em nosso catálogo.'
    },
    {
      number: '2',
      title: 'Finalize o pedido',
      desc: 'Pagamento rápido e seguro em nosso checkout criptografado.'
    },
    {
      number: '3',
      title: 'Receba no e-mail',
      desc: 'O link com os arquivos e instruções é enviado segundos após o pagamento.'
    },
    {
      number: '4',
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
      <section className="home-hero relative bg-brand-navy pt-28 pb-6 sm:pt-32 md:pt-36 sm:pb-8 overflow-hidden text-center z-0">

        {/* Background Layers Wrapper (z-0 sits above section's bg color but behind relative z-10 content) */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
          {/* A quiet technical grid gives the hero structure without decorative glow layers. */}
          <div className="absolute inset-0 bg-grid-tech opacity-40"></div>
        </div>

        {/* Efeito Natalino: Flocos de Neve Caindo no Hero */}
        <SnowEffect />
        <HolidayHeroDecor />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3.5 sm:space-y-4 md:space-y-5 flex flex-col items-center">
          {/* 2. Headline */}
          <div className="space-y-2 md:space-y-3 max-w-5xl text-center">
            <h1 className="font-display text-white tracking-tight leading-[1.08] text-balance">
              <span className="font-light text-2xl sm:text-[34px] md:text-[40px] lg:text-[44px] xl:text-[48px] block text-white/90">
                {localize(language === 'en'
                  ? 'You focus on the project.'
                  : language === 'es'
                  ? 'Tú te enfocas en el proyecto.'
                  : 'Você só foca no projeto.')}
              </span>
              <span className="font-black text-3xl sm:text-[50px] md:text-[62px] lg:text-[70px] xl:text-[74px] block mt-1 sm:mt-1.5">
                {language === 'en' ? (
                  <>
                    <span className="text-cyan-300">C2Tech</span> handles the rest.
                  </>
                ) : language === 'es' ? (
                  <>
                    <span className="text-cyan-300">C2Tech</span> cuida del resto.
                  </>
                ) : (
                  <>
                    A <span className="text-cyan-300">C2Tech</span> {localize(" cuida do resto.")}</>
                )}
              </span>
            </h1>


          </div>

          {/* Hero catalog search */}
          <div className="w-full max-w-2xl pt-2 relative z-20">
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
            <p className="mt-3 text-xs sm:text-sm text-slate-400 text-center">
              {localize(language === 'en' ? 'Find by name: AutoCAD, Office, SketchUp and more.' : language === 'es' ? 'Busca por nombre: AutoCAD, Office, SketchUp y más.' : 'Busque pelo nome: AutoCAD, Office, SketchUp e muito mais.')}
            </p>
          </div>

          {/* Trust Carousel (Below Buttons on all devices) */}
          <div className="flex flex-col items-center justify-center w-full max-w-6xl mt-5 sm:mt-7 mb-1 overflow-hidden relative z-20">
            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-bold mb-3 sm:mb-4 font-sans">
              {localize(language === 'en'
                ? 'Authorized Reseller & Official Partner'
                : language === 'es'
                ? 'Distribuidor Autorizado y Socio Oficial'
                : 'Revendedor Autorizado e Parceiro Oficial')}
            </p>

            <div
              className="flex w-full overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)'
              }}
            >
              <div className="flex shrink-0 min-w-full justify-around items-center animate-marquee gap-10 sm:gap-14 md:gap-16 px-4 md:px-6">
                {['/images/microsoft-partner.webp', '/images/autodesk-reseller.webp', '/images/corel-partner.webp', '/images/promob-reseller.webp', '/images/microsoft-partner.webp', '/images/autodesk-reseller.webp', '/images/corel-partner.webp', '/images/promob-reseller.webp'].map((logo, i) => (
                  <img key={i} src={logo} alt="Partner" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain invert grayscale brightness-125 contrast-125 opacity-90 hover:opacity-100 transition-all duration-300" />
                ))}
              </div>
              <div className="flex shrink-0 min-w-full justify-around items-center animate-marquee gap-10 sm:gap-14 md:gap-16 px-4 md:px-6" aria-hidden="true">
                {['/images/microsoft-partner.webp', '/images/autodesk-reseller.webp', '/images/corel-partner.webp', '/images/promob-reseller.webp', '/images/microsoft-partner.webp', '/images/autodesk-reseller.webp', '/images/corel-partner.webp', '/images/promob-reseller.webp'].map((logo, i) => (
                  <img key={`dup-${i}`} src={logo} alt="Partner" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain invert grayscale brightness-125 contrast-125 opacity-90 hover:opacity-100 transition-all duration-300" />
                ))}
              </div>
            </div>
          </div>

          {/* 5. Laptop AutoCAD Mockup (Stretched Wide & Pulled Higher Up) */}
          <div
            className="w-full max-w-[640px] lg:max-w-[800px] mt-0 mb-0 transition-all duration-500 relative z-10"
          >
            <img
              src="/images/laptop_autocad-focused.webp" width={728} height={550}
              alt={localize("Mockup do software AutoCAD em um notebook de alta performance")}
              className="w-full h-auto select-none pointer-events-none block border-0 drop-shadow-[0_20px_35px_rgba(7,212,243,0.12)]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>

      </section>

      <HomeTrustpilot />

      {/* 2. CONFIDENCE SECTION */}
      <section id="confidence-section" className="py-12 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {trustBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-3 py-4 sm:px-5 sm:py-2 text-left"
              >
                <div className="shrink-0">
                  {badge.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-sm text-slate-950">{localize(badge.title)}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{localize(badge.desc)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

          {/* Dynamic Catalog Notice Banner */}
          <p className="max-w-4xl mx-auto mb-6 text-center text-sm text-slate-600">
            <span className="font-semibold text-slate-800">
              {localize(language === 'en' ? 'A few highlights:' : language === 'es' ? 'Algunos destacados:' : 'Alguns destaques:')}{' '}
            </span>
            <span>
              {localize(language === 'en'
                ? 'This is a rotating showcase. We have dozens of other professional software available in our full catalog!'
                : language === 'es'
                ? 'Este es un escaparate rotativo. ¡Tenemos docenas de otros programas profesionales disponibles en nuestro catálogo completo!'
                : 'Esta é uma vitrine rotativa. Temos dezenas de outros softwares profissionais disponíveis em nosso catálogo completo!')}
            </span>
          </p>

          {/* Categories Slider/Tabs */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-none justify-start -mx-4 px-4 gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 border ${
                  activeCategory === category
                    ? 'bg-slate-900 border-slate-900 text-white shadow'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                {localize(translateCategory(category, language))}
              </button>
            ))}
          </div>

          {/* Products Carousel */}
          {filteredProducts.length > 0 ? (
            <div className="relative group/carousel w-full">
              <div className="mb-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsPlaying((playing) => !playing)}
                  disabled={prefersReducedMotion}
                  aria-pressed={isPlaying && !prefersReducedMotion}
                  className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-primary-hover disabled:cursor-not-allowed disabled:text-slate-500"
                >
                  {isPlaying && !prefersReducedMotion ? (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  )}
                  {localize(prefersReducedMotion
                    ? (language === 'en' ? 'Automatic movement off' : language === 'es' ? 'Movimiento automático desactivado' : 'Movimento automático desativado')
                    : isPlaying
                    ? (language === 'en' ? 'Pause rotation' : language === 'es' ? 'Pausar rotación' : 'Pausar rotação')
                    : (language === 'en' ? 'Resume rotation' : language === 'es' ? 'Reanudar rotación' : 'Retomar rotação'))}
                </button>
              </div>

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
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 z-30 w-11 h-11 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 cursor-pointer focus:outline-none opacity-0 group-hover/carousel:opacity-100 focus-visible:opacity-100"
                aria-label={localize("Próximo")}
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
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
              className="inline-flex items-center justify-center px-6 py-3 rounded-control bg-white border border-slate-200 hover:border-slate-300 text-sm font-bold text-slate-800 hover:text-slate-900 transition-colors duration-200"
            >
              <span>{localize("Ver catálogo de softwares completo")}</span>
              <ArrowRight className="w-4 h-4 ml-2 text-slate-500" />
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
              <li key={index} className="space-y-2">
                <span className="font-display text-sm font-bold tabular-nums text-action-primary">0{localize(step.number)}</span>
                <h3 className="font-display font-bold text-base text-slate-900">{localize(step.title)}</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{localize(step.desc)}</p>
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
          <div className="divide-y divide-slate-200 border-y border-slate-200">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-slate-900 hover:text-action-primary transition-colors focus:outline-none"
                  aria-expanded={openFaqIndex === idx}
                >
                  <span className="text-sm sm:text-base pr-4">{localize(item.q)}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* Toggleable answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === idx ? 'max-h-64 border-t border-slate-50' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {localize(item.a)}
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
