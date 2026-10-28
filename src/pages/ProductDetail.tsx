import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, Link, useSearchParams, useLocation } from 'react-router-dom';
import { CheckoutModal } from '../components/CheckoutModal';
import {
  TrustpilotStars,
  TrustpilotLogo,
  TrustGuaranteesModal,
} from '../components/TrustBadges';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getEffectiveCheckoutUrl } from '../data/internationalCheckouts';
import { useCurrency } from '../context/CurrencyContext';
import { getProductBySlug, products, type LicenseOption } from '../data/products';
import {
  Check,
  ShieldCheck,
  Monitor,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Star,
  Info,
  List,
  FileCheck,
  Mail,
  CloudDownload,
  PlayCircle,
  Award,
  Edit3,
  MessageSquare,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react';
import { reviewsData } from '../data/reviews';
import { translateCategory, translateCompatibility, translateFeature } from '../utils/i18n';
import { trackEvent } from '../utils/pixel';

const BrazilFlagIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-3' }) => (
  <svg
    viewBox="0 0 28 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] ${className}`}
    aria-label="Brasil"
  >
    <title>Brasil</title>
    <rect width="28" height="20" rx="2" fill="#009B3A" />
    <path d="M14 2.5L25.5 10L14 17.5L2.5 10L14 2.5Z" fill="#FEDF00" />
    <circle cx="14" cy="10" r="4.5" fill="#002776" />
    <path
      d="M10.2 8.8C12.5 8.1 15.6 8.5 17.9 10.2"
      stroke="#FFFFFF"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
  </svg>
);

const AVATAR_COLORS = [
  'bg-[#1f7a8c] text-white',
  'bg-[#52b788] text-white',
  'bg-[#1d3557] text-white',
  'bg-[#e63946] text-white',
  'bg-[#d4a373] text-white',
  'bg-[#6d597a] text-white',
  'bg-[#2a9d8f] text-white',
  'bg-[#457b9d] text-white',
];



const TRUSTPILOT_REVIEWS_EN = [
  {
    id: 1,
    author: 'Carlos Eduardo M.',
    timeAgo: '2 days ago',
    rating: 4,
    title: 'Super fast delivery and very clear video tutorial',
    comment:
      'Received the Google Drive download link in my email in less than 2 minutes. The step-by-step video made installation effortless.',
  },
  {
    id: 2,
    author: 'Fernanda S. Oliveira',
    timeAgo: '4 days ago',
    rating: 5,
    title: 'Complete software and top-tier support',
    comment:
      'This is the second software I bought from C2Tech. Runs smoothly without any monthly fees, team is very helpful.',
  },
  {
    id: 3,
    author: 'Roberto Almeida Jr.',
    timeAgo: '1 week ago',
    rating: 5,
    title: 'Outstanding value for money',
    comment:
      'Installed on my Mac and working like a charm. The video guide shows exactly how to activate without any headaches.',
  },
  {
    id: 4,
    author: 'Juliana Costa',
    timeAgo: '1 week ago',
    rating: 5,
    title: 'Very good, highly recommend this store',
    comment:
      'Took about 5 minutes to arrive in my email because it landed in promotions, but the software is 100% full and lifetime.',
  },
  {
    id: 5,
    author: 'Marcos Vinícius T.',
    timeAgo: '2 weeks ago',
    rating: 5,
    title: 'Best software store I have ever used',
    comment:
      'Guaranteed activation indeed! Had a quick question and they answered me on WhatsApp right away. 10/10.',
  },
];

const TRUSTPILOT_REVIEWS_ES = [
  {
    id: 1,
    author: 'Carlos Eduardo M.',
    timeAgo: 'Hace 2 días',
    rating: 4,
    title: 'Entrega súper rápida y video muy explicativo',
    comment:
      'Recibí el enlace en el correo en menos de 2 minutos tras el pago. El video paso a paso facilitó muchísimo la instalación.',
  },
  {
    id: 2,
    author: 'Fernanda S. Oliveira',
    timeAgo: 'Hace 4 días',
    rating: 5,
    title: 'Software completo y soporte de 10',
    comment:
      'Ya es el segundo programa que compro en C2Tech. Funciona a la perfección sin mensualidades, equipo muy atento.',
  },
  {
    id: 3,
    author: 'Roberto Almeida Jr.',
    timeAgo: 'Hace 1 semana',
    rating: 5,
    title: 'Excelente relación calidad-precio',
    comment:
      'Instalado en mi Mac y funcionando de maravilla. El tutorial en video muestra exactamente cómo activar sin ningún dolor de cabeza.',
  },
  {
    id: 4,
    author: 'Juliana Costa',
    timeAgo: 'Hace 1 semana',
    rating: 5,
    title: 'Muy bueno, recomiendo la tienda',
    comment:
      'Tardó unos 5 minutos en llegar a mi correo porque cayó en la pestaña promociones, pero el programa es completo y de por vida.',
  },
  {
    id: 5,
    author: 'Marcos Vinícius T.',
    timeAgo: 'Hace 2 semanas',
    rating: 5,
    title: 'La mejor tienda de software que he probado',
    comment:
      '¡Activación garantizada de verdad! Tuve una duda sencilla y me respondieron por WhatsApp enseguida. Nota diez.',
  },
];

const TRUSTPILOT_REVIEWS_PT = [
  {
    id: 1,
    author: 'Carlos Eduardo M.',
    timeAgo: 'Há 2 dias',
    rating: 4,
    title: 'Entrega super rápida e vídeo bem explicativo',
    comment:
      'Recebi o link no e-mail menos de 2 minutos após o pagamento. O vídeo passo a passo facilitou imenso a instalação.',
  },
  {
    id: 2,
    author: 'Fernanda S. Oliveira',
    timeAgo: 'Há 4 dias',
    rating: 5,
    title: 'Software completo e apoio nota 10',
    comment:
      'Já é o segundo programa que compro na C2Tech. Funciona na perfeição sem mensalidade, equipa muito atenciosa.',
  },
  {
    id: 3,
    author: 'Roberto Almeida Jr.',
    timeAgo: 'Há 1 semana',
    rating: 5,
    title: 'Excelente relação qualidade-preço',
    comment:
      'Instalado no meu Mac a funcionar sem falhas. O tutorial em vídeo mostra exatamente como ativar sem complicações.',
  },
  {
    id: 4,
    author: 'Juliana Costa',
    timeAgo: 'Há 1 semana',
    rating: 5,
    title: 'Muito bom, recomendo a loja',
    comment:
      'Demorou cerca de 5 minutos a chegar ao meu e-mail, mas o programa é completo e vitalício.',
  },
  {
    id: 5,
    author: 'Marcos Vinícius T.',
    timeAgo: 'Há 2 semanas',
    rating: 5,
    title: 'A melhor loja de software em que já comprei',
    comment:
      'Ativação garantida! Tive uma dúvida simples e responderam-me de imediato pelo WhatsApp. Excelente!',
  },
];

const TRUSTPILOT_REVIEWS = [
  {
    id: 1,
    author: 'Carlos Eduardo M.',
    timeAgo: 'Há 2 dias',
    rating: 4,
    title: 'Entrega super rápida e vídeo bem explicativo',
    comment:
      'Recebi o link no e-mail menos de 2 minutos depois do Pix. O vídeo passo a passo facilitou demais a instalação.',
  },
  {
    id: 2,
    author: 'Fernanda S. Oliveira',
    timeAgo: 'Há 4 dias',
    rating: 5,
    title: 'Software completo e suporte nota 10',
    comment:
      'Já é o segundo programa que compro na C2Tech. Funciona perfeitamente sem mensalidade, equipe muito atenciosa.',
  },
  {
    id: 3,
    author: 'Roberto Almeida Jr.',
    timeAgo: 'Há 1 semana',
    rating: 5,
    title: 'Excelente custo-benefício',
    comment:
      'Instalado no meu Mac e rodando liso. O tutorial em vídeo mostra exatamente como ativar sem nenhuma dor de cabeça.',
  },
  {
    id: 4,
    author: 'Juliana Costa',
    timeAgo: 'Há 1 semana',
    rating: 5,
    title: 'Muito bom, recomendo a loja',
    comment:
      'Demorou uns 5 minutinhos para chegar no meu e-mail porque caiu na aba promoções, mas o programa é completo e vitalício.',
  },
  {
    id: 5,
    author: 'Marcos Vinícius T.',
    timeAgo: 'Há 2 semanas',
    rating: 5,
    title: 'Melhor loja de softwares que já comprei',
    comment:
      'Ativação garantida mesmo! Tive uma dúvida boba e me responderam no WhatsApp na mesma hora. Nota mil.',
  },
];

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isGuaranteesModalOpen, setIsGuaranteesModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'recurrent' | 'avulso'>('recurrent');
  const [selectedLicenseOption, setSelectedLicenseOption] = useState<LicenseOption | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'activation'>('description');
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);
  const [trustpilotSlideIndex, setTrustpilotSlideIndex] = useState<number>(0);

  // Modals for "Faça uma pergunta" & "Escrever uma avaliação"
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [questionName, setQuestionName] = useState('');
  const [questionEmail, setQuestionEmail] = useState('');
  const [questionPhone, setQuestionPhone] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isSendingQuestion, setIsSendingQuestion] = useState(false);
  const [questionSentSuccess, setQuestionSentSuccess] = useState(false);
  const [questionError, setQuestionError] = useState('');

  const [isFakeReviewModalOpen, setIsFakeReviewModalOpen] = useState(false);
  const [fakeReviewSubmitted, setFakeReviewSubmitted] = useState(false);
  const [fakeReviewRating, setFakeReviewRating] = useState(5);
  const [fakeReviewName, setFakeReviewName] = useState('');
  const [fakeReviewComment, setFakeReviewComment] = useState('');

  const { addToCart } = useCart();
  const { language, isInternational, t } = useLanguage();
  const activeTrustpilotReviews = language === "en" ? TRUSTPILOT_REVIEWS_EN : language === "es" ? TRUSTPILOT_REVIEWS_ES : language === "pt-PT" ? TRUSTPILOT_REVIEWS_PT : TRUSTPILOT_REVIEWS;
  const { formatPrice } = useCurrency();
  const location = useLocation();
  const hasProcessedCheckoutRef = useRef(false);
  const relatedCarouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedPlan('recurrent');
    setSelectedLicenseOption(undefined);
    setQuantity(1);
    setActiveTab('description');
    setActiveThumbIndex(0);
  }, [slug]);

  useEffect(() => {
    hasProcessedCheckoutRef.current = false;
  }, [location.pathname]);

  const product = useMemo(() => {
    if (!slug) return undefined;
    return getProductBySlug(slug);
  }, [slug]);

  // Check if this product uses the new Platform + Year matrix (e.g. AutoCAD)
  const hasPlatformYearMatrix = useMemo(() => {
    return Boolean(
      product?.licenseOptions &&
        product.licenseOptions.length > 0 &&
        product.licenseOptions.some((opt) => opt.platform && opt.year)
    );
  }, [product]);

  useEffect(() => {
    if (product?.licenseOptions && product.licenseOptions.length > 0 && !selectedLicenseOption) {
      // Default to the cheapest option first (e.g. AutoCAD Windows 2019 at R$ 67,90)
      const cheapestOption = [...product.licenseOptions].sort((a, b) => a.price - b.price)[0];
      setSelectedLicenseOption(cheapestOption || product.licenseOptions[0]);
    }
  }, [product, selectedLicenseOption]);

  useEffect(() => {
    if (product) {
      trackEvent('ViewContent', {
        content_name: product.name,
        content_ids: [product.slug],
        content_type: 'product',
        value: product.price,
        currency: 'BRL',
      });
    }
  }, [product?.id]);

  const productReviews = useMemo(() => {
    if (!product) return [];
    return reviewsData[product.id] || [];
  }, [product]);

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return '0.0';
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / productReviews.length).toFixed(1);
  }, [productReviews]);

  const ratingBreakdown = useMemo(() => {
    const total = productReviews.length;
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    productReviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
      counts[star] += 1;
    });
    return [
      { stars: 5, label: 'Excelente', count: counts[5], pct: total > 0 ? (counts[5] / total) * 100 : 0 },
      { stars: 4, label: 'Bom', count: counts[4], pct: total > 0 ? (counts[4] / total) * 100 : 0 },
      { stars: 3, label: 'Médio', count: counts[3], pct: total > 0 ? (counts[3] / total) * 100 : 0 },
      { stars: 2, label: 'Ruim', count: counts[2], pct: total > 0 ? (counts[2] / total) * 100 : 0 },
      { stars: 1, label: 'Péssimo', count: counts[1], pct: total > 0 ? (counts[1] / total) * 100 : 0 },
    ];
  }, [productReviews]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const sameCategory = products.filter(
      (p) => p.category === product.category && p.id !== product.id && !p.unavailable
    );
    if (sameCategory.length >= 5) return sameCategory.slice(0, 8);
    const others = products.filter(
      (p) => p.category !== product.category && p.id !== product.id && !p.unavailable
    );
    return [...sameCategory, ...others].slice(0, 8);
  }, [product]);

  // Essential Plugins Recommendation Logic
  const [selectedVrayHost, setSelectedVrayHost] = useState<'SketchUp' | 'Revit' | 'Rhinoceros'>('SketchUp');

  // Pre-select default host for V-Ray based on current software
  useEffect(() => {
    if (!product) return;
    if (product.id === 'revit_2027' || product.slug.includes('revit')) {
      setSelectedVrayHost('Revit');
    } else if (product.id === 'rhinoceros_8' || product.slug.includes('rhino')) {
      setSelectedVrayHost('Rhinoceros');
    } else {
      setSelectedVrayHost('SketchUp');
    }
  }, [product]);

  const enscapeProduct = useMemo(() => products.find((p) => p.id === 'enscape'), []);
  const vrayProduct = useMemo(() => products.find((p) => p.id === 'vray_7'), []);

  const isHostSoftware = useMemo(() => {
    if (!product) return false;
    return (
      product.id === 'sketchup_2026_win' || product.slug.includes('sketchup') ||
      product.id === 'revit_2027' || product.slug.includes('revit') ||
      product.id === 'rhinoceros_8' || product.slug.includes('rhino') ||
      product.id === 'archicad_30' || product.slug.includes('archicad')
    );
  }, [product]);

  const supportsVray = useMemo(() => {
    if (!product) return false;
    return (
      product.id === 'sketchup_2026_win' || product.slug.includes('sketchup') ||
      product.id === 'revit_2027' || product.slug.includes('revit') ||
      product.id === 'rhinoceros_8' || product.slug.includes('rhino')
    );
  }, [product]);

  const hostName = useMemo(() => {
    if (!product) return 'Software';
    if (product.id === 'revit_2027' || product.slug.includes('revit')) return 'Revit';
    if (product.id === 'rhinoceros_8' || product.slug.includes('rhino')) return 'Rhinoceros';
    if (product.id === 'archicad_30' || product.slug.includes('archicad')) return 'ArchiCAD';
    return 'SketchUp';
  }, [product]);

  useEffect(() => {
    if (
      searchParams.get('checkout') === 'true' &&
      !product?.unavailable &&
      product &&
      !hasProcessedCheckoutRef.current
    ) {
      hasProcessedCheckoutRef.current = true;
      addToCart(product);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('checkout');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams, product, addToCart]);

  // Set document title for SEO
  useEffect(() => {
    if (product) {
      const typeLabel = product.isSubscription ? 'Pagamento Recorrente' : 'Acesso Vitalício';
      document.title = `${product.name} ${typeLabel} | C2Shop`;

      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const defaultDescription = product.isSubscription
          ? `Adquira a assinatura do ${product.name} na C2Shop com ativação rápida e suporte assistido. Garantia de funcionamento e atualizações.`
          : product.category === 'Chaves de Ativação'
          ? `Adquira a chave de ativação original do ${product.name} na C2Shop com licença permanente. Envio imediato via WhatsApp.`
          : `Adquira o ${product.name} completo e vitalício na C2Shop. Link de download direto por e-mail com instruções em vídeo passo a passo.`;
        metaDescription.setAttribute('content', defaultDescription);
      }
    }
  }, [product]);

  // Platform & Year selection helpers for products with platform/year matrix (like AutoCAD)
  const selectedPlatform: 'Windows' | 'macOS' =
    selectedLicenseOption?.platform || 'Windows';

  const availablePlatforms = useMemo(() => {
    if (!hasPlatformYearMatrix || !product?.licenseOptions) return [];
    const set = new Set<'Windows' | 'macOS'>();
    product.licenseOptions.forEach((opt) => {
      if (opt.platform) set.add(opt.platform);
    });
    return Array.from(set);
  }, [hasPlatformYearMatrix, product]);

  const availableYearsForPlatform = useMemo(() => {
    if (!hasPlatformYearMatrix || !product?.licenseOptions) return [];
    return product.licenseOptions
      .filter((opt) => opt.platform === selectedPlatform)
      .sort((a, b) => a.price - b.price);
  }, [hasPlatformYearMatrix, product, selectedPlatform]);

  const isWindowsActive = selectedPlatform === 'Windows' && product?.compatibility !== 'macOS';
  const showEssentialPlugins = isWindowsActive && isHostSoftware;

  const handleAddVrayFromBanner = () => {
    if (!vrayProduct) return;
    const targetOption = vrayProduct.licenseOptions?.find(
      (opt) => opt.year === selectedVrayHost || opt.label.toLowerCase().includes(selectedVrayHost.toLowerCase())
    ) || {
      quantity: selectedVrayHost === 'SketchUp' ? 1 : selectedVrayHost === 'Revit' ? 2 : 3,
      label: `V-Ray 7 para ${selectedVrayHost}`,
      platform: 'Windows' as const,
      year: selectedVrayHost,
      price: 87.90,
      originalPrice: 149.90,
      checkoutUrl: 'https://pay.cakto.com.br/t5qr5by_847341',
      imageUrl: '/images/products/vray-7-windows.png'
    };
    addToCart(vrayProduct, 'avulso', targetOption, 1);
  };

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-slate-900">
            Software não encontrado
          </h2>
          <p className="text-slate-500 text-sm">
            O produto solicitado não foi encontrado no catálogo da C2Tech ou foi removido.
          </p>
          <div className="pt-2">
            <Link
              to="/catalogo"
              className="inline-flex items-center px-5 py-2.5 bg-accent-blue text-white font-semibold rounded-xl text-sm shadow hover:bg-accent-blue-dark transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao catálogo
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSelectPlatform = (platform: 'Windows' | 'macOS') => {
    if (!product.licenseOptions) return;
    setActiveThumbIndex(0);
    // Pick the cheapest option available for that platform first
    const platformOptions = product.licenseOptions
      .filter((opt) => opt.platform === platform)
      .sort((a, b) => a.price - b.price);
    if (platformOptions.length > 0) {
      setSelectedLicenseOption(platformOptions[0]);
    }
  };

  const handleSelectYearOption = (opt: LicenseOption) => {
    setSelectedLicenseOption(opt);
    setActiveThumbIndex(0);
  };

  // Price calculations
  const unitPrice = selectedLicenseOption
    ? selectedLicenseOption.price
    : product.isSubscription && selectedPlan === 'recurrent'
    ? product.recurrencePrice || product.price
    : product.price;

  const displayPrice = unitPrice * quantity;
  const formattedPrice = formatPrice(displayPrice);

  const unitOriginalPrice = selectedLicenseOption?.originalPrice
    ? selectedLicenseOption.originalPrice
    : selectedLicenseOption && !selectedLicenseOption.platform
    ? selectedLicenseOption.quantity * product.originalPrice
    : product.originalPrice;

  const displayOriginalPrice = unitOriginalPrice * quantity;
  const formattedOriginalPrice = formatPrice(displayOriginalPrice);

  const savingsAmount = Math.max(0, displayOriginalPrice - displayPrice);
  const formattedSavings = formatPrice(savingsAmount);

  const formattedRecurrencePrice = product.recurrencePrice
    ? formatPrice(product.recurrencePrice)
    : undefined;

  // Submit question to c2tech2025@gmail.com
  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionName.trim() || !questionEmail.trim() || !questionText.trim()) {
      setQuestionError('Por favor, preencha seu nome, e-mail e sua dúvida.');
      return;
    }

    setIsSendingQuestion(true);
    setQuestionError('');

    const versionLabel = selectedLicenseOption?.label || product.version;

    try {
      const response = await fetch('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: questionName.trim(),
          email: questionEmail.trim(),
          phone: questionPhone.trim(),
          question: questionText.trim(),
          productName: `${product.name} (${versionLabel})`,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha no envio via servidor');
      }

      setQuestionSentSuccess(true);
      setQuestionName('');
      setQuestionEmail('');
      setQuestionPhone('');
      setQuestionText('');
    } catch {
      // Fallback: open mailto directly to c2tech2025@gmail.com if local dev has no Resend key configured
      const subject = encodeURIComponent(
        `Dúvida sobre ${product.name} (${versionLabel}) - ${questionName}`
      );
      const body = encodeURIComponent(
        `Nome: ${questionName}\nE-mail: ${questionEmail}\nWhatsApp: ${
          questionPhone || 'Não informado'
        }\nProduto: ${product.name} (${versionLabel})\n\nPergunta:\n${questionText}`
      );
      window.location.href = `mailto:c2tech2025@gmail.com?subject=${subject}&body=${body}`;
      setQuestionSentSuccess(true);
    } finally {
      setIsSendingQuestion(false);
    }
  };

  const handleFakeReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFakeReviewSubmitted(true);
  };

  const scrollRelated = (dir: 'left' | 'right') => {
    if (!relatedCarouselRef.current) return;
    const scrollAmount = 320;
    relatedCarouselRef.current.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Structured Data (JSON-LD Schema Markup) for Product SEO
  const schemaMarkup = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: product.mpn || '001N1-WW8644-T480',
    gtin13: product.ean13 || '8388917939753',
    brand: {
      '@type': 'Brand',
      name: 'C2Tech',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'BRL',
      price: unitPrice,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
    },
  };

  const selectedVersionBadge = hasPlatformYearMatrix
    ? `${selectedPlatform} • Edição ${selectedLicenseOption?.year || '2027'}`
    : `${product.compatibility} • ${product.version}`;

  const currentGalleryImages =
    selectedLicenseOption?.gallery && selectedLicenseOption.gallery.length > 0
      ? selectedLicenseOption.gallery
      : selectedLicenseOption?.imageUrl
      ? [selectedLicenseOption.imageUrl]
      : product.gallery && product.gallery.length > 0
      ? product.gallery
      : product.imageUrl
      ? [product.imageUrl]
      : [];

  const thumbnails = [
    ...currentGalleryImages.map((imgUrl, idx) => ({
      id: idx,
      type: 'image' as const,
      imageUrl: imgUrl,
      label: idx === 0 ? 'Capa Principal' : `Foto ${idx + 1}`,
      badge:
        idx === 0
          ? selectedLicenseOption?.year || 'CAPA'
          : `FOTO ${idx + 1}`,
    })),
    {
      id: 100,
      type: 'video' as const,
      imageUrl: undefined,
      label: 'Vídeo Tutorial',
      badge: t('thumb_video'),
    },
    {
      id: 101,
      type: 'email' as const,
      imageUrl: undefined,
      label: 'Envio por E-mail',
      badge: t('thumb_email'),
    },
    {
      id: 102,
      type: 'warranty' as const,
      imageUrl: undefined,
      label: 'Software Vitalício',
      badge: t('thumb_lifetime'),
    },
  ];

  const activeThumb = thumbnails[activeThumbIndex] || thumbnails[0];

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen text-left font-sans">
      {/* Inject Schema Markup */}
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb + Top Rating Strip */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
          <nav
            className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 min-w-0"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-blue-600 transition-colors">
              {t('breadcrumb_home')}
            </Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-blue-600 transition-colors">
              {t('breadcrumb_all_products')}
            </Link>
            <span>/</span>
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
              className="hover:text-blue-600 transition-colors"
            >
              {translateCategory(product.category, language)}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </nav>

          {/* Trustpilot Official Header Rating Bar */}
          <button
            type="button"
            onClick={() => setIsGuaranteesModalOpen(true)}
            className="inline-flex flex-nowrap items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-800 transition-all cursor-pointer shadow-2xs whitespace-nowrap shrink-0 overflow-x-auto scrollbar-none self-start md:self-auto max-w-full"
            title="Ver avaliações verificadas no Trustpilot"
          >
            <span className="text-slate-600 font-medium whitespace-nowrap">{t('trustpilot_what_customers_say')}</span>
            <span className="font-bold text-slate-900 whitespace-nowrap">{t('trustpilot_excellent')}</span>
            <div className="shrink-0 inline-flex items-center">
              <TrustpilotStars count={5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
            </div>
            <span className="text-slate-700 font-medium whitespace-nowrap">
              <strong className="text-slate-900 font-bold">4.8</strong> {t('trustpilot_score_based_on')}{' '}
              <span className="underline decoration-slate-400">{t('trustpilot_reviews_count')}</span>
            </span>
            <span className="text-slate-300 hidden sm:inline whitespace-nowrap">•</span>
            <div className="hidden sm:inline-flex shrink-0">
              <TrustpilotLogo starSize="w-3.5 h-3.5" textSize="text-xs" />
            </div>
          </button>
        </div>

        {/* =================================================================== */}
        {/* HERO SECTION (Left: Box Preview + Thumbnails | Right: Configurator) */}
        {/* =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-12">
          {/* LEFT COLUMN: Product Box Image & Thumbnails */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[460px] bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col items-center justify-center min-h-[360px] sm:min-h-[410px] shadow-sm">
              {/* Top-left Save Badge */}
              {savingsAmount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-[#18b259] text-white text-xs sm:text-sm font-extrabold px-3.5 py-1.5 rounded-md shadow-sm">
                  {t('save')} {formattedSavings}
                </div>
              )}

              {/* Top-right Gold Lifetime Software Badge */}
              <div
                className="absolute top-3 right-3 z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 p-1 shadow-md flex items-center justify-center text-center select-none border-2 border-amber-200"
                title="Software Vitalício"
              >
                <div className="w-full h-full rounded-full border border-dashed border-amber-900/40 flex flex-col items-center justify-center px-1">
                  {/* 3 Stars in a Mini Arch */}
                  <div className="flex items-end justify-center gap-0.5 mb-1">
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-950 text-amber-950 -rotate-18 translate-y-[1.5px]" />
                    <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-950 text-amber-950 -translate-y-[1.5px]" />
                    <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-950 text-amber-950 rotate-18 translate-y-[1.5px]" />
                  </div>
                  <span className="text-[7.5px] sm:text-[9px] font-black text-amber-950 uppercase leading-none tracking-tight">
                    {t('badge_software')}
                  </span>
                  <span className="text-[8.5px] sm:text-[10px] font-black text-amber-950 uppercase leading-tight mt-0.5 tracking-tight">
                    {t('badge_lifetime_gold')}
                  </span>
                </div>
              </div>

              {/* Main Visual Slides based on activeThumb */}
              {activeThumb?.type === 'image' ? (
                <div className="relative flex flex-col items-center justify-center w-full my-auto pt-4">
                  {activeThumb.imageUrl ? (
                    <div className="relative w-full max-w-[330px] rounded-2xl overflow-hidden shadow-xl border border-slate-200/70 bg-slate-900">
                      <img
                        src={activeThumb.imageUrl}
                        alt={`${product.name} - ${selectedVersionBadge}`}
                        className="w-full h-auto object-cover"
                      />
                      <div className="bg-slate-950/95 text-white px-4 py-2.5 flex items-center justify-between text-xs border-t border-white/10">
                        <span className="font-bold text-slate-200">{product.name}</span>
                        <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                          {selectedVersionBadge}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="w-56 h-72 bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl shadow-xl border border-slate-300 flex flex-col justify-between p-5 text-left relative">
                      <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                        <span className="font-display font-black text-slate-800 text-sm">
                          C2TECH
                        </span>
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                          {selectedPlatform}
                        </span>
                      </div>
                      <div className="my-auto text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-rose-600 text-white font-display font-black text-2xl flex items-center justify-center shadow-md">
                          {product.name.substring(0, 1)}
                        </div>
                        <p className="font-display font-extrabold text-slate-900 text-base leading-snug">
                          {product.name}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          {selectedVersionBadge}
                        </p>
                      </div>
                      <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-[10px] font-bold text-slate-600">
                        <span>LICENÇA VITALÍCIA</span>
                        <span className="text-emerald-600">COMPLETO</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeThumb?.type === 'video' ? (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {product.id === 'autodesk_all_apps'
                      ? 'Instruções de Acesso Oficial'
                      : 'Instruções em Vídeo Passo a Passo'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {product.id === 'autodesk_all_apps'
                      ? 'Você recebe um guia passo a passo ensinando a realizar o login na sua conta oficial da Autodesk e baixar qualquer um dos mais de 80 softwares.'
                      : 'Junto com os arquivos de instalação, você recebe um vídeo tutorial gravado pela nossa equipe mostrando cada clique da instalação e ativação definitiva.'}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" /> Fácil, rápido e sem complicação
                  </div>
                </div>
              ) : activeThumb?.type === 'email' ? (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {product.id === 'autodesk_all_apps'
                      ? 'Login e Senha Oficiais no E-mail'
                      : 'Link de Download Direto no E-mail'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {product.id === 'autodesk_all_apps'
                      ? 'Assim que seu pagamento via Pix ou Cartão é confirmado, enviamos as credenciais de acesso oficial (login e senha) diretamente no seu e-mail e WhatsApp.'
                      : 'Assim que seu pagamento via Pix ou Cartão é confirmado, nosso sistema envia automaticamente o link exclusivo do Google Drive diretamente para o seu e-mail.'}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    <CloudDownload className="w-3.5 h-3.5" /> Entrega Rápida e Privada
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {product.id === 'autodesk_all_apps'
                      ? 'Acesso Oficial Garantido'
                      : 'Funcionamento Vitalício do Software'}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {product.id === 'autodesk_all_apps'
                      ? 'Conta oficial com acesso irrestrito a todos os softwares da Autodesk (AutoCAD, Revit, Maya, 3ds Max, etc.) no portal manage.autodesk.com.'
                      : 'O software tem ativação definitiva para funcionar de forma vitalícia, sem mensalidades ou renovações. Além disso, você conta com 30 dias de garantia de suporte técnico para instalação e ativação.'}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5" /> {product.id === 'autodesk_all_apps' ? 'Conta Oficial Autodesk' : 'Uso Vitalício • 30 Dias de Suporte'}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip Below Main Box */}
            <div className="flex items-center justify-center gap-2.5 mt-4 flex-wrap">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveThumbIndex(idx)}
                  className={`w-14 h-16 sm:w-16 sm:h-18 rounded-lg border-2 p-1 flex flex-col items-center justify-between transition-all cursor-pointer bg-white ${
                    activeThumbIndex === idx
                      ? 'border-blue-600 shadow-sm scale-105'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                  title={thumb.label}
                >
                  {thumb.type === 'image' && thumb.imageUrl ? (
                    <img
                      src={thumb.imageUrl}
                      alt={thumb.label}
                      className="w-full h-9 object-cover rounded-[4px]"
                    />
                  ) : (
                    <div className="w-full h-9 rounded-[4px] bg-slate-900 text-white flex items-center justify-center text-[9px] font-black">
                      {thumb.type === 'video' ? (
                        <PlayCircle className="w-4 h-4 text-blue-400" />
                      ) : thumb.type === 'email' ? (
                        <Mail className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  )}
                  <span className="text-[8px] font-extrabold text-slate-700 uppercase tracking-tighter truncate w-full text-center">
                    {thumb.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Title, Price, Trust Badges, Selectors & CTAs */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {hasPlatformYearMatrix
                  ? `${t('selected_label')}: ${selectedLicenseOption?.label || 'Windows 2027'} • ${t('full_lifetime_version')}`
                  : `${product.version} • ${t('compatible_with')} ${translateCompatibility(product.compatibility, language)}`}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-black text-3xl sm:text-4xl text-[#0b5ed7]">
                {formattedPrice}
              </span>
              {displayOriginalPrice > displayPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                  {formattedOriginalPrice}
                </span>
              )}
              {product.isSubscription && (
                <span className="text-xs font-bold text-slate-500">
                  {selectedLicenseOption?.label.includes('Ano') ? '/plano' : '/mês'}
                </span>
              )}
            </div>

            {/* 3 Horizontal Trust Badges (Mobile Responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-2 py-3.5 border-y border-slate-200 text-left bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none px-3.5 sm:px-0">
              <div className="flex items-center gap-2 sm:gap-2.5 sm:pr-2 sm:border-r border-slate-200">
                <img
                  src="/images/icons/badge-seal.png"
                  alt="Uso Vitalício"
                  className="w-8 h-8 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{t('badge_lifetime')}</p>
                  <p className="text-[9.5px] text-slate-500 leading-snug mt-0.5">
                    {t('badge_lifetime_sub')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 sm:px-1 sm:border-r border-slate-200">
                <img
                  src="/images/icons/badge-shield.png"
                  alt="Ativação Garantida"
                  className="w-8 h-8 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">
                    {product.isSubscription ? (language === 'es' ? 'Acceso Oficial' : 'Acesso Oficial') : t('badge_guaranteed')}
                  </p>
                  <p className="text-[9.5px] text-slate-500 leading-snug mt-0.5">
                    {product.isSubscription ? (language === 'es' ? 'Cuenta verificada' : 'Conta verificada') : t('badge_guaranteed_sub')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 sm:pl-1">
                <img
                  src="/images/icons/badge-plane.png"
                  alt="Entrega Digital"
                  className="w-8 h-8 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">{t('badge_digital_delivery')}</p>
                  <p className="text-[9.5px] text-slate-500 leading-snug mt-0.5">
                    {t('badge_digital_delivery_sub')}
                  </p>
                </div>
              </div>
            </div>

            {/* =============================================================== */}
            {/* SELECTORS: Platform, Validity, Year (for AutoCAD) or Standard   */}
            {/* =============================================================== */}
            {hasPlatformYearMatrix ? (
              <div className="space-y-4 pt-1">
                {/* Plataforma */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">{t('platform')}</label>
                  <div className="flex flex-wrap gap-2">
                    {availablePlatforms.map((plat) => {
                      const isActive = selectedPlatform === plat;
                      return (
                        <button
                          key={plat}
                          type="button"
                          onClick={() => handleSelectPlatform(plat)}
                          className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                            isActive
                              ? 'border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40 shadow-xs'
                              : 'border-slate-300 text-slate-700 bg-white hover:border-slate-400'
                          }`}
                        >
                          {plat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Validade */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">{t('validity')}</label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-md text-xs font-bold border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40 shadow-xs cursor-default"
                    >
                      {t('lifetime')}
                    </button>
                  </div>
                </div>

                {/* Ano / Versão */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">{t('year')}</label>
                  <div className="flex flex-wrap gap-2">
                    {availableYearsForPlatform.map((opt) => {
                      const isSelected = selectedLicenseOption?.quantity === opt.quantity;
                      return (
                        <button
                          key={opt.quantity}
                          type="button"
                          onClick={() => handleSelectYearOption(opt)}
                          className={`px-4 py-2 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                            isSelected
                              ? 'border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40 shadow-xs'
                              : 'border-slate-300 text-slate-700 bg-white hover:border-slate-400'
                          }`}
                        >
                          {opt.year}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Non-matrix products (keep their exact versions & prices while matching the visual layout) */
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">{t('platform')}</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 rounded-md text-xs font-bold border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40">
                        {product.compatibility}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">{t('validity')}</label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 rounded-md text-xs font-bold border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40">
                        {product.isSubscription ? t('subscription') : t('lifetime')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Standard licenseOptions if present (e.g. Windows keys 1/2/3 PCs or Autodesk All Apps plans) */}
                {product.licenseOptions && product.licenseOptions.length > 0 && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {product.isSubscription
                        ? 'Escolha a duração da assinatura'
                        : product.id === 'eberick_builder_2025'
                        ? 'Escolha a versão'
                        : t('choose_license')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.licenseOptions.map((opt) => {
                        const isSelected = selectedLicenseOption?.quantity === opt.quantity;
                        return (
                          <button
                            key={opt.quantity}
                            type="button"
                            onClick={() => setSelectedLicenseOption(opt)}
                            className={`px-3.5 py-2 rounded-md text-xs font-bold transition-all cursor-pointer border ${
                              isSelected
                                ? 'border-2 border-[#0b5ed7] text-[#0b5ed7] bg-blue-50/40 shadow-xs'
                                : 'border-slate-300 text-slate-700 bg-white hover:border-slate-400'
                            }`}
                          >
                            {product.id === 'eberick_builder_2025' || opt.label.startsWith('Versão')
                              ? opt.label
                              : `${opt.label} — ${formatPrice(opt.price)}`}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Subscription Recurrent vs Avulso selector */}
                {product.isSubscription && product.recurrencePrice && !product.licenseOptions && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Modalidade de Pagamento
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('recurrent')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          selectedPlan === 'recurrent'
                            ? 'border-2 border-[#0b5ed7] bg-blue-50/40'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        <span className="block text-[11px] font-bold text-slate-800">
                          Recorrente Mensal
                        </span>
                        <span className="text-sm font-black text-[#0b5ed7]">
                          {formattedRecurrencePrice}/mês
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedPlan('avulso')}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          selectedPlan === 'avulso'
                            ? 'border-2 border-[#0b5ed7] bg-blue-50/40'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        <span className="block text-[11px] font-bold text-slate-800">
                          Pagamento Único
                        </span>
                        <span className="text-sm font-black text-slate-900">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity + Add to Cart + Buy It Now Buttons */}
            {product.unavailable ? (
              <div className="pt-2">
                <button
                  disabled
                  className="w-full py-3.5 bg-slate-200 text-slate-500 font-bold rounded-lg text-sm uppercase tracking-wider cursor-not-allowed"
                >
                  Temporariamente Indisponível
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {/* Label above the [- 1 +] Device Selector */}
                <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-[#0b5ed7] shrink-0" />
                    <span>{t('device_support_label')}</span>
                  </label>
                  <span className="text-[11px] font-bold text-[#0b5ed7] bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full shrink-0">
                    {quantity === 1 ? t('single_device') : `${quantity} ${t('multiple_devices')}`}
                  </span>
                </div>

                <div className="flex items-stretch gap-3">
                  {/* Quantity / Devices Counter (- 1 +) */}
                  <div
                    className="flex items-center border border-slate-300 rounded-md bg-white overflow-hidden shrink-0"
                    title="Quantidade de dispositivos com suporte"
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Diminuir número de dispositivos"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3.5 py-2 text-sm font-bold text-slate-900 min-w-[36px] text-center select-none">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label="Aumentar número de dispositivos"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Blue "Adicionar ao carrinho" Button */}
                  <button
                    type="button"
                    onClick={() => {
                      addToCart(
                        product,
                        selectedLicenseOption ? 'avulso' : selectedPlan,
                        selectedLicenseOption,
                        quantity
                      );
                    }}
                    id={`detail-add-to-cart-${product.id}`}
                    className="flex-1 bg-[#0b5ed7] hover:bg-[#0a53be] text-white font-bold text-sm py-3 px-6 rounded-md shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{t('add_to_cart')}</span>
                  </button>
                </div>

                {/* Dark "Comprar agora" Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (isInternational) {
                      const effectiveUrl = getEffectiveCheckoutUrl(product, selectedLicenseOption, true);
                      window.open(effectiveUrl, '_blank', 'noopener,noreferrer');
                    } else {
                      addToCart(
                        product,
                        selectedLicenseOption ? 'avulso' : selectedPlan,
                        selectedLicenseOption,
                        quantity
                      );
                    }
                  }}
                  id={`detail-buy-now-${product.id}`}
                  className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm py-3.5 px-6 rounded-md shadow-md transition-all cursor-pointer flex items-center justify-center gap-2.5"
                >
                  <span>{isInternational ? t('buy_now') : 'Comprar agora'}</span>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold bg-white/15 px-2 py-0.5 rounded text-emerald-300">
                    {isInternational ? t('buy_now_badge') : 'PIX • CARTÃO'}
                  </span>
                </button>
                {isInternational && (
                  <p className="text-[11px] text-slate-500 text-center leading-relaxed pt-1">
                    {t('intl_checkout_hint')}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* TRUSTPILOT OFFICIAL REVIEWS BAR                                     */}
        {/* =================================================================== */}
        <div className="my-10 py-6 px-4 sm:px-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Summary: Trustpilot Official Card */}
            <div className="lg:col-span-3 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-4">
              <button
                type="button"
                onClick={() => setIsGuaranteesModalOpen(true)}
                className="space-y-2 cursor-pointer group text-center"
              >
                <p className="font-display font-extrabold text-xl text-slate-900 tracking-tight">{t('trustpilot_excellent')}</p>
                <div className="flex items-center justify-center gap-1">
                  <TrustpilotStars count={5} size="w-6 h-6" starSize="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-600">
                  {t('trustpilot_based_on_bar')} <span className="underline font-semibold text-slate-900">{t('trustpilot_bar_reviews')}</span>
                </p>
                <div className="pt-1 flex items-center justify-center">
                  <TrustpilotLogo starSize="w-5 h-5" textSize="text-base" />
                </div>
              </button>
            </div>

            {/* Right Carousel of Store Reviews */}
            <div className="lg:col-span-9 relative flex items-center">
              <button
                type="button"
                onClick={() =>
                  setTrustpilotSlideIndex((prev) =>
                    prev === 0 ? activeTrustpilotReviews.length - 1 : prev - 1
                  )
                }
                className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0 mr-2 cursor-pointer shadow-2xs"
                aria-label="Avaliação anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Mobile (1 card per slide) */}
              <div className="block sm:hidden flex-1 overflow-hidden">
                {(() => {
                  const item = activeTrustpilotReviews[trustpilotSlideIndex % activeTrustpilotReviews.length];
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 text-left space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <TrustpilotStars count={item.rating ?? 5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                        <span className="text-[10px] text-slate-500 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#08ad88]" /> {t('trustpilot_verified')} no Trustpilot
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.comment}</p>
                      <p className="text-[10px] text-slate-400 font-medium pt-1">
                        <span className="font-semibold text-slate-700">{item.author}</span>, {item.timeAgo}
                      </p>
                    </div>
                  );
                })()}
              </div>

              {/* Tablet & Desktop (4 cards per slide) */}
              <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-4 gap-3.5 flex-1 overflow-hidden">
                {[0, 1, 2, 3].map((offset) => {
                  const item =
                    activeTrustpilotReviews[(trustpilotSlideIndex + offset) % activeTrustpilotReviews.length];
                  return (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-left space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <TrustpilotStars count={item.rating ?? 5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-[#08ad88]" /> {t('trustpilot_verified')}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {item.comment}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium pt-0.5">
                        <span className="font-semibold text-slate-600">{item.author}</span>,{' '}
                        {item.timeAgo}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setTrustpilotSlideIndex((prev) => (prev + 1) % activeTrustpilotReviews.length)
                }
                className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0 ml-2 cursor-pointer shadow-2xs"
                aria-label="Próxima avaliação"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-center lg:text-left lg:pl-[26%]">
            <button
              type="button"
              onClick={() => setIsGuaranteesModalOpen(true)}
              className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
            >
              {t('trustpilot_showing_high_ratings')}
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* ESSENTIAL PLUGINS RECOMMENDATION BANNER (Windows only)              */}
        {/* =================================================================== */}
        {showEssentialPlugins && (
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-[#0e1628] border border-blue-900/40 text-white shadow-xl relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-5">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Plugins Essenciais Recomendados (Windows)</span>
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">
                    Potencialize seu {hostName} com {supportsVray ? 'Renderizadores Profissionais' : 'Renderização em Tempo Real'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                    O {hostName} é indispensável para arquitetura e projetos 3D. Para transformar seus modelos em imagens e vídeos fotorrealistas de alto impacto para clientes, {supportsVray ? 'estes dois motores de render são indispensáveis:' : 'o plugin Chaos Enscape é indispensável:'}
                  </p>
                </div>
              </div>

              {/* Plugin Cards */}
              <div className={supportsVray ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "flex justify-center"}>
                {/* Chaos Enscape Card */}
                <div className={`p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/40 transition-all flex flex-col justify-between group ${
                  !supportsVray ? 'max-w-xl w-full' : ''
                }`}>
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <img
                        src="/images/products/chaos-enscape-windows.png"
                        alt="Chaos Enscape"
                        className="w-16 h-16 rounded-xl object-cover bg-slate-800 border border-white/10 shrink-0 shadow-sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded mb-1">
                          Tempo Real & VR
                        </div>
                        <h4 className="font-display font-bold text-base text-white group-hover:text-sky-300 transition-colors">
                          Chaos Enscape
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                          Renderize instantaneamente enquanto você desenha no {hostName}. Ideal para apresentações ao vivo e passeios virtuais interativos.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Licença Vitalícia</span>
                      <span className="font-display font-black text-lg text-emerald-400">R$ 97,90</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to="/produto/chaos-enscape-windows"
                        className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                      >
                        Ver Detalhes
                      </Link>
                      {enscapeProduct && (
                        <button
                          type="button"
                          onClick={() => addToCart(enscapeProduct)}
                          className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Chaos V-Ray 7 Card */}
                {supportsVray && (
                  <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between group">
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <img
                          src="/images/products/vray-7-windows.png"
                          alt="Chaos V-Ray 7"
                          className="w-16 h-16 rounded-xl object-cover bg-slate-800 border border-white/10 shrink-0 shadow-sm"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded mb-1">
                            Fotorrealismo Máximo
                          </div>
                          <h4 className="font-display font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                            Chaos V-Ray 7
                          </h4>
                          <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                            O padrão mundial da indústria de arquitetura. Iluminação física, materiais hiper-realistas e render cinematográfico de altíssima precisão.
                          </p>
                        </div>
                      </div>

                      {/* Host Software Selector (SketchUp, Revit, Rhinoceros) */}
                      <div className="pt-2 border-t border-white/10">
                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                          <span>Selecione a versão:</span>
                          <span className="text-amber-300 font-extrabold">{selectedVrayHost}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-1.5">
                          {(['SketchUp', 'Revit', 'Rhinoceros'] as const).map((host) => {
                            const isSelected = selectedVrayHost === host;
                            return (
                              <button
                                key={host}
                                type="button"
                                onClick={() => setSelectedVrayHost(host)}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center border cursor-pointer ${
                                  isSelected
                                    ? 'bg-amber-500/25 border-amber-400 text-amber-300 shadow-xs ring-1 ring-amber-400/30'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:text-white'
                                }`}
                              >
                                {host}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Licença Vitalícia</span>
                        <span className="font-display font-black text-lg text-emerald-400">R$ 87,90</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to="/produto/vray-7-windows"
                          className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                        >
                          Ver Detalhes
                        </Link>
                        {vrayProduct && (
                          <button
                            type="button"
                            onClick={handleAddVrayFromBanner}
                            className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Adicionar</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 3-TABBED INFORMATION CONTAINER (DESCRIÇÃO | ESPECIFICAÇÕES | ATIVAÇÃO) */}
        {/* =================================================================== */}
        <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/80 p-5 sm:p-8 mb-14">
          {/* Tabs Navigation Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-b border-slate-300 pb-0 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'description'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{t('tab_description')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'specs'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
              <span>{t('tab_specs')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('activation')}
              className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'activation'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{t('tab_activation')}</span>
            </button>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* TAB 1: DESCRIÇÃO                                                  */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'description' && (
            <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
              {/* Top Note */}
              <p className="text-xs sm:text-sm text-slate-800 bg-white/80 p-4 rounded-xl border border-slate-200/80">
                {product.id === 'autodesk_all_apps' ? (
                  <>
                    <strong>NOTA IMPORTANTE:</strong> O plano{' '}
                    <strong>Autodesk Todos os Aplicativos</strong> oferece acesso oficial completo a
                    mais de 80 softwares oficiais da Autodesk. Você receberá{' '}
                    <strong>login e senha para entrar em uma conta oficial da Autodesk</strong>{' '}
                    diretamente no portal oficial <strong>manage.autodesk.com</strong>, com download direto dos instaladores oficiais, atualizações contínuas e suporte prioritário via WhatsApp.
                  </>
                ) : (
                  <>
                    <strong>NOTA IMPORTANTE:</strong> Esta é uma versão{' '}
                    <strong>100% completa e vitalícia</strong> do {product.name}, oferecendo todos os
                    recursos profissionais sem mensalidades ou taxas ocultas. Após a confirmação da
                    compra, o <strong>link de download direto chega imediatamente no seu e-mail</strong>{' '}
                    acompanhado de <strong>instruções passo a passo em vídeo</strong> para uma
                    instalação rápida, segura e definitiva.
                  </>
                )}
              </p>

              {/* Detalhes do Produto */}
              <div className="space-y-3">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  {t('product_details_heading')}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                      <span>{translateFeature(feat, language)}</span>
                    </li>
                  ))}
                  {product.id !== 'autodesk_all_apps' && (
                    <>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                        <span>
                          <strong>Instruções em vídeo passo a passo:</strong> tutorial em vídeo claro e
                          detalhado ensinando a instalar e ativar sem complicação.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                        <span>
                          <strong>Garantia de 30 dias de suporte técnico</strong> gratuito via WhatsApp
                          para instalação e ativação (com funcionamento vitalício do software).
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Receba seu software em 3 passos simples */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  {product.id === 'autodesk_all_apps'
                    ? 'Acesse sua conta oficial em 3 passos simples'
                    : `Receba seu ${product.name} em 3 passos simples`}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl pt-2">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-800">
                      <Mail className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      {product.id === 'autodesk_all_apps' ? (
                        <>
                          Após a compra, receba o <strong>login e senha da conta oficial</strong> diretamente no seu{' '}
                          <strong>e-mail e WhatsApp</strong>
                        </>
                      ) : (
                        <>
                          Após a compra, receba o <strong>link de download</strong> diretamente no seu{' '}
                          <strong>e-mail</strong>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-800">
                      <CloudDownload className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      {product.id === 'autodesk_all_apps' ? (
                        <>
                          Faça login no portal oficial em{' '}
                          <strong>manage.autodesk.com</strong>
                        </>
                      ) : (
                        <>
                          Baixe o software completo junto com as{' '}
                          <strong>instruções em vídeo passo a passo</strong>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-800">
                      <PlayCircle className="w-6 h-6" />
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">
                      {product.id === 'autodesk_all_apps' ? (
                        <>
                          Baixe e utilize qualquer um dos <strong>mais de 80 softwares Autodesk</strong> oficiais
                        </>
                      ) : (
                        <>
                          Siga o vídeo tutorial e <strong>ative de forma vitalícia</strong> no seu
                          computador
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sobre / Diferença entre AutoCAD Completo e AutoCAD LT / SketchUp Pro Completo */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                {product.id === 'autocad_2027_win' ? (
                  <>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      A diferença entre o nosso AutoCAD Completo e o AutoCAD LT
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Ao adquirir na C2Tech, você recebe a edição <strong>AutoCAD Completa</strong>{' '}
                      (e não a versão limitada LT), garantindo máxima produtividade para projetos de
                      engenharia, arquitetura e design:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                      <li>
                        <strong>AutoCAD Completo (Nossa Versão):</strong> Ideal para profissionais e
                        estudantes que precisam tanto de desenho técnico 2D quanto de{' '}
                        <strong>modelagem 3D completa</strong>, renderização realista, nuvem de
                        pontos, automação com rotinas <strong>AutoLISP / LISP</strong>, APIs e
                        bibliotecas completas de arquitetura, mecânica e elétrica.
                      </li>
                      <li>
                        <strong>Compatibilidade Total DWG:</strong> Crie, edite e exporte arquivos
                        nativos `.DWG` e `.DXF` com total precisão, compatível com projetos de
                        qualquer escritório ou cliente.
                      </li>
                    </ul>
                  </>
                ) : product.id === 'sketchup_2026_win' ? (
                  <>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      Por que o nosso SketchUp Pro Desktop Completo supera a versão Web / Go?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Ao adquirir na C2Tech, você recebe a suíte <strong>SketchUp Pro Desktop Completa</strong>{' '}
                      (com <strong>LayOut</strong> e <strong>Style Builder</strong> inclusos), essencial para
                      arquitetos, designers de interiores, marceneiros e engenheiros:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                      <li>
                        <strong>Suporte Total a Plugins e Renderizadores:</strong> Ao contrário das
                        edições básicas ou web, o SketchUp Pro Desktop aceita todos os plugins Ruby
                        (`.rbz`) e funciona perfeitamente com <strong>V-Ray, Enscape, Lumion, D5 Render</strong>{' '}
                        e blocos dinâmicos.
                      </li>
                      <li>
                        <strong>LayOut 2D Profissional Incluso:</strong> Transforme seus modelos 3D
                        em pranchas técnicas executivas 2D com cotas, escalas, cortes, plantas baixas
                        e exportação direta para `.DWG`, `.DXF` e `.PDF` em alta resolução.
                      </li>
                    </ul>
                  </>
                ) : product.id === 'cype_2026' ? (
                  <>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      O que está incluso no pacote CYPE Completo (2025.d e 2026.a)?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Tanto na versão <strong>2025.d</strong> quanto na versão <strong>2026.a</strong>, você
                      recebe a suíte <strong>CYPE Completa</strong> com todos os módulos desbloqueados,
                      incluindo:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                      <li>
                        <strong>Programas Inclusos:</strong> <strong>CYPECAD</strong> (concreto armado,
                        protendido, lajes, vigas, pilares e fundações), <strong>CYPE 3D</strong>{' '}
                        (estruturas metálicas, galpões, madeira e alumínio),{' '}
                        <strong>CYPETHERM</strong> (análise térmica e energética),{' '}
                        <strong>Arquimedes</strong> (orçamentos e banco de preços), além de módulos
                        de instalações prediais, muros de arrimo e marcos, entre outros.
                      </li>
                      <li>
                        <strong>Atenção aos Idiomas de cada versão:</strong> A versão{' '}
                        <strong>CYPE 2026.a</strong> está disponível exclusivamente em{' '}
                        <strong>Português Brasil (PT-BR)</strong>, enquanto a versão{' '}
                        <strong>CYPE 2025.d</strong> possui suporte completo a{' '}
                        <strong>todas as linguagens</strong> (Português, Espanhol, Inglês, Francês,
                        Italiano, entre outras).
                      </li>
                    </ul>
                  </>
                ) : product.id === 'coreldraw_2026' ? (
                  <>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      O que está incluso no nosso CorelDRAW Graphics Suite Completo?
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      Ao adquirir na C2Tech, você recebe a suíte <strong>CorelDRAW Graphics Suite Completa</strong>{' '}
                      para uso local ilimitado (sem bloqueios de tela ou assinaturas mensais), ideal para
                      gráficas, agências, sublimação, corte a laser e comunicação visual:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                      <li>
                        <strong>Aplicativos Principais Inclusos:</strong> <strong>CorelDRAW</strong>{' '}
                        (ilustração vetorial e layout de página), <strong>Corel PHOTO-PAINT</strong>{' '}
                        (edição profissional de imagens e retoque), <strong>Corel PowerTRACE</strong>{' '}
                        (vetorização rápida de bitmaps por IA) e <strong>Corel Font Manager</strong>.
                      </li>
                      <li>
                        <strong>Pronto para Impressão e Produção:</strong> Suporte completo a cores
                        CMYK, Pantone, fechamento de arquivos `.CDR`, `.PDF`, `.EPS`, `.SVG`, `.AI`
                        e `.PSD` sem restrições de exportação ou salvamento.
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h3 className="font-display font-extrabold text-base text-slate-900">
                      Sobre o {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line">
                      {product.longDescription}
                    </p>
                  </>
                )}
              </div>

              {/* Compre pelo melhor preço em uma loja confiável */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Compre o {product.name} pelo melhor preço na C2Tech
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Na C2Tech você garante softwares profissionais completos por uma fração do custo
                  tradicional, com entrega imediata e suporte real. Veja por que milhares de
                  clientes confiam em nós:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>
                      <strong>Acesso Vitalício e Completo:</strong> Você paga uma única vez e
                      utiliza o software completo para sempre, sem cobranças mensais ou anuais
                      surpresas.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>
                      <strong>Instruções em Vídeo Inclusas:</strong> Não precisa ser técnico em
                      informática! Nosso vídeo tutorial mostra exatamente o passo a passo da
                      instalação do início ao fim.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>
                      <strong>Envio Automático por E-mail:</strong> Confirmou o pagamento no Pix ou
                      Cartão, o link de download chega direto na sua caixa de entrada.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>
                      <strong>Suporte Técnico de 30 Dias Incluso:</strong> Você conta com 30 dias de
                      garantia de suporte técnico especializado via WhatsApp para auxiliar na
                      instalação, enquanto o software tem funcionamento vitalício.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                    <span>
                      <strong>Reinstalação Garantida:</strong> O link enviado para o seu e-mail
                      permanece disponível caso você formate ou troque de computador no futuro.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Como escolher entre as edições (específico para AutoCAD ou SketchUp Pro) */}
              {product.id === 'autocad_2027_win' && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    Como escolher entre as edições do AutoCAD (2019, 2024, 2025, 2026 e 2027)
                  </h3>
                  <p className="text-xs font-bold text-slate-800">
                    Considere a compatibilidade do seu computador:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>AutoCAD 2019 (Windows):</strong> Excelente escolha para computadores
                      ou notebooks mais antigos (com 8 GB de RAM ou placas de vídeo integradas). É
                      extremamente leve, rápido e abre arquivos DWG perfeitamente.
                    </li>
                    <li>
                      <strong>AutoCAD 2024 e 2025 (Windows e macOS):</strong> O equilíbrio ideal
                      entre estabilidade comprovada em escritórios e recursos modernos de automação,
                      contagem automática de blocos (Count) e janelas flutuantes.
                    </li>
                    <li>
                      <strong>AutoCAD 2026 e 2027 (Windows e macOS):</strong> Recomendados para
                      máquinas atuais. Trazem o novo motor gráfico acelerado, Smart Blocks com
                      inteligência artificial, histórico de atividades aprimorado e suporte nativo
                      otimizado para Windows 11 e chips Apple Silicon (M1, M2, M3 e M4).
                    </li>
                  </ul>
                </div>
              )}

              {product.id === 'sketchup_2026_win' && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    Como escolher entre as edições do SketchUp Pro (2021, 2024, 2025 e 2026)
                  </h3>
                  <p className="text-xs font-bold text-slate-800">
                    Considere a configuração do seu computador e seus plugins favoritos:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>SketchUp Pro 2021 (Windows):</strong> Ideal para PCs ou notebooks mais
                      modestos (8 GB de RAM ou vídeo integrado) e para quem utiliza bibliotecas de
                      plugins clássicos. É super leve, estável e consome poucos recursos.
                    </li>
                    <li>
                      <strong>SketchUp Pro 2024 e 2025 (Windows e macOS):</strong> Trazem o novo
                      motor gráfico de alta performance (até 8x mais rápido na navegação de cenas
                      pesadas), Oclusão Ambiental (Ambient Occlusion) em tempo real e materiais
                      fotorrealistas PBR.
                    </li>
                    <li>
                      <strong>SketchUp Pro 2026 (Windows e macOS):</strong> A versão mais recente e
                      avançada, otimizada para Windows 11 e chips Apple Silicon (M1, M2, M3 e M4),
                      com melhorias de interoperabilidade BIM/IFC, LayOut acelerado e suporte aos
                      renderizadores mais novos (V-Ray 7 e Enscape).
                    </li>
                  </ul>
                </div>
              )}

              {product.id === 'cype_2026' && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    Como escolher entre o CYPE 2025.d e o CYPE 2026.a
                  </h3>
                  <p className="text-xs font-bold text-slate-800">
                    Ambas as versões incluem CYPECAD, CYPE 3D, CYPETHERM, Arquimedes e todos os módulos:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>CYPE 2025.d (Todos os Idiomas):</strong> Excelente custo-benefício e
                      disponível em <strong>todas as linguagens</strong> (Português, Espanhol,
                      Inglês, Francês, etc.), ideal tanto para projetos nacionais com normas ABNT NBR
                      quanto para engenheiros que trabalham com eurocódigos ou idiomas internacionais.
                    </li>
                    <li>
                      <strong>CYPE 2026.a (Português Brasil):</strong> A versão mais recente da suíte,
                      disponível exclusivamente em <strong>Português Brasil (PT-BR)</strong>, com as
                      últimas atualizações de dimensionamento estrutural, ligações metálicas e
                      detalhamento de armaduras segundo as normas brasileiras.
                    </li>
                  </ul>
                </div>
              )}

              {product.id === 'coreldraw_2026' && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h3 className="font-display font-extrabold text-base text-slate-900">
                    Como escolher entre as edições do CorelDRAW (X7, 2022, 2023, 2024, 2025 e 2026)
                  </h3>
                  <p className="text-xs font-bold text-slate-800">
                    Escolha a edição ideal para o seu fluxo de trabalho e computador:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li>
                      <strong>CorelDRAW X7 (Windows):</strong> O clássico favorito de gráficas rápidas,
                      estamparia, sublimação e máquinas de corte (Plotter / Laser). É extremamente
                      leve, abre instantaneamente até em notebooks básicos com 4 GB de RAM.
                    </li>
                    <li>
                      <strong>CorelDRAW 2022, 2023 e 2024 (Windows e macOS):</strong> Excelente
                      equilíbrio entre leveza e recursos modernos, incluindo exportação multipágina
                      rápida, visualização de páginas lado a lado, novos pincéis artísticos e suporte
                      nativo a macOS e Windows 10/11.
                    </li>
                    <li>
                      <strong>CorelDRAW 2025 e 2026 (Windows e macOS):</strong> As edições mais
                      recentes e completas, com aceleração gráfica avançada, vetorização PowerTRACE
                      aprimorada, catálogo Pantone atualizado e otimização total para Windows 11 e
                      Macs com processadores Apple Silicon (M1, M2, M3 e M4).
                    </li>
                  </ul>
                </div>
              )}

              {/* FAQ */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <h3 className="font-display font-extrabold text-base text-slate-900">
                  Perguntas Frequentes (FAQ)
                </h3>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <p className="font-bold text-slate-900">
                      Como recebo meu software após a compra?
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      Assim que o pagamento é aprovado (instantâneo via Pix ou Cartão de Crédito),
                      você recebe automaticamente um e-mail com o botão de download direto no Google
                      Drive contendo o instalador completo e o vídeo de instruções.
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      O software é realmente vitalício? Preciso pagar mensalidade depois?
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      {product.isSubscription
                        ? 'Este produto é um plano de assinatura com renovação conforme o período escolhido.'
                        : 'Sim, é 100% vitalício! Você realiza um único pagamento e utiliza o software completo por tempo indeterminado, sem nunca precisar pagar mensalidades ou anuidades.'}
                    </p>
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      O que fazer se eu tiver dificuldade para instalar ou ativar?
                    </p>
                    <p className="text-slate-600 mt-0.5">
                      Além do tutorial em vídeo super detalhado que acompanha o download, você conta
                      com nosso suporte técnico gratuito via WhatsApp. Nossa equipe auxilia você
                      passo a passo até o programa estar 100% pronto para uso.
                    </p>
                  </div>

                  {(product.id === 'autocad_2027_win' ||
                    product.id === 'sketchup_2026_win' ||
                    product.id === 'coreldraw_2026') && (
                    <div>
                      <p className="font-bold text-slate-900">
                        O {product.name} funciona em Mac (Apple M1/M2/M3/M4) e Windows?
                      </p>
                      <p className="text-slate-600 mt-0.5">
                        Sim! Basta selecionar no topo desta página a plataforma desejada (
                        <strong>Windows</strong> ou <strong>macOS</strong>) e o ano da versão antes
                        de clicar em comprar. Você receberá exatamente a edição compatível com o seu
                        sistema operacional.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 2: ESPECIFICAÇÕES DO SISTEMA                                  */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="overflow-hidden rounded-lg border border-slate-200/80">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <tbody>
                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 w-1/3 sm:w-1/4 align-top">
                        {t('spec_platform')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700">
                        {product.id === 'autocad_2027_win' ||
                        product.id === 'sketchup_2026_win' ||
                        product.id === 'coreldraw_2026' ? (
                          <>
                            <span className="block">Windows (64 bits)</span>
                            <span className="block">macOS (Intel e Apple Silicon série M)</span>
                          </>
                        ) : (
                          product.compatibility
                        )}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_gpu')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Mínimo 2 GB de VRAM com suporte a DirectX 11 (Recomendado: 8 GB de VRAM DirectX 12 para 3D e telas 4K até 3840 x 2160) / MAC: Tela de 1280 x 800 (Recomendado: Retina 2880 x 1800 com placa gráfica nativa Apple Metal).'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Placa de vídeo 3D com no mínimo 1 GB de VRAM compatível com OpenGL 3.1 e DirectX 12 (Recomendado: 4 GB a 8 GB de VRAM dedicada NVIDIA GTX/RTX ou AMD Radeon para cenas complexas) / MAC: Placa gráfica nativa compatível com Apple Metal (Apple M1/M2/M3/M4 ou Radeon Pro).'
                          : product.requirements.gpu ||
                            'Placa gráfica compatível com DirectX 11/12 ou superior (resolução mínima 1920 x 1080).'}
                      </td>
                    </tr>

                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_cpu')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Processador 64 bits de 2.5–2.9 GHz (base). Recomendado: 3+ GHz (base) ou 4+ GHz (turbo) / MAC: Apple Silicon (M1, M2, M3, M4 Pro/Max) ou Intel Core i7 64 bits.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Processador Intel ou AMD 64 bits de 2.1+ GHz (Recomendado: 2.8+ GHz ou superior multi-core) / MAC: Apple Silicon (M1, M2, M3, M4) nativo ou Intel Core i5/i7 de 2.1+ GHz.'
                          : product.requirements.cpu}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_storage')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {product.id === 'autocad_2027_win'
                          ? 'WINDOWS: 10 GB de espaço livre em disco (SSD NVMe recomendado) / MAC: 6 GB a 8 GB de espaço livre em disco para download e instalação.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Mínimo de 4 GB de espaço livre em disco (SSD recomendado para carregamento rápido de blocos e texturas) / MAC: 4 GB de espaço livre em disco.'
                          : product.requirements.storage}
                      </td>
                    </tr>

                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_ram')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Requisito básico: 8 GB (2019–2025) / 16 GB (2026–2027) — Recomendado: 16 GB a 32 GB; MAC: Requisito mínimo: 8 GB — Recomendado: 16 GB ou superior.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Mínimo 8 GB de RAM (4 GB para edição 2021) — Recomendado: 16 GB ou mais para maquetes grandes / MAC: Mínimo 8 GB de RAM — Recomendado: 16 GB de memória unificada.'
                          : product.requirements.ram}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_os')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Windows 11 (64-bit) e Windows 10 (64-bit versão 1809 ou superior) / MAC: macOS Sequoia v15, Sonoma v14, Ventura v13 ou Monterey v12.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Windows 11 (64-bit) e Windows 10 (64-bit) / MAC: macOS Sequoia v15, Sonoma v14, Ventura v13 ou Monterey v12.'
                          : product.requirements.os}
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {t('spec_other')}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {t('spec_other_desc')}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Generic EAN13 and MPN as requested */}
              <div className="pt-2 space-y-1 text-xs text-slate-800">
                <p>
                  <strong className="font-extrabold">EAN13</strong>{' '}
                  {product.ean13 || '8388917939753'}
                </p>
                <p>
                  <strong className="font-extrabold">MPN</strong>{' '}
                  {product.mpn || '001N1-WW8644-T480'}
                </p>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 3: ATIVAÇÃO                                                   */}
          {/* ----------------------------------------------------------------- */}
          {activeTab === 'activation' && (
            <div className="space-y-5 text-slate-800 text-sm leading-relaxed py-2">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-950">
                {product.id === 'autodesk_all_apps'
                  ? 'Como acessar sua conta oficial da Autodesk em três passos simples'
                  : 'Como instalar e ativar seu software em três passos simples'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700">
                {product.id === 'autodesk_all_apps'
                  ? 'Adquirir o plano Autodesk Todos os Aplicativos na C2Shop garante acesso oficial a mais de 80 softwares. Você recebe suas credenciais exclusivas (login e senha) e acessa diretamente pelo portal oficial seguindo os passos abaixo:'
                  : 'Adquirir seu software na C2Tech oferece muito mais do que economia financeira; além de garantir a versão completa e vitalícia sem mensalidades, você realiza a instalação e ativação de forma rápida e guiada seguindo os passos abaixo:'}
              </p>

              {product.id === 'autodesk_all_apps' ? (
                <ol className="space-y-3 text-xs sm:text-sm text-slate-800 pl-1">
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">1.</span>
                    <span>
                      <strong>Receba login e senha:</strong> Assim que a compra é confirmada, você recebe imediatamente no seu e-mail e WhatsApp os dados de login e senha exclusivos da sua conta oficial da Autodesk.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">2.</span>
                    <span>
                      <strong>Acesse o portal oficial:</strong> Entre diretamente no site oficial da Autodesk em <strong>manage.autodesk.com</strong> utilizando as credenciais recebidas.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">3.</span>
                    <span>
                      <strong>Instale e utilize todos os aplicativos:</strong> Escolha qualquer um dos mais de 80 softwares Autodesk (AutoCAD, Revit, Maya, Inventor, 3ds Max, etc.) e instale diretamente no seu computador com todas as ferramentas e atualizações oficiais liberadas!
                    </span>
                  </li>
                </ol>
              ) : (
                <ol className="space-y-3 text-xs sm:text-sm text-slate-800 pl-1">
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">1.</span>
                    <span>
                      <strong>Compre</strong> seu software na C2Tech e receba imediatamente no seu
                      e-mail o link de acesso exclusivo ao Google Drive contendo o instalador completo
                      e todos os arquivos necessários.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">2.</span>
                    <span>
                      <strong>Baixe</strong> os arquivos para o seu computador e abra o{' '}
                      <strong>vídeo de instruções passo a passo</strong> incluso na pasta, que mostra
                      na tela exatamente como instalar o programa sem erros.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">3.</span>
                    <span>
                      <strong>Ative</strong> sua licença vitalícia seguindo o vídeo tutorial para
                      liberar todas as ferramentas permanentemente — e, caso precise de qualquer
                      ajuda, nosso suporte técnico no WhatsApp está pronto para auxiliar você!
                    </span>
                  </li>
                </ol>
              )}
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* NA MESMA CATEGORIA (Related Products Carousel)                      */}
        {/* =================================================================== */}
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900">
                {t('in_same_category')}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRelated('left')}
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRelated('right')}
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  aria-label="Próximo"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={relatedCarouselRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedProducts.map((rel) => {
                const relSavings = Math.max(0, rel.originalPrice - rel.price);
                return (
                  <div
                    key={rel.id}
                    className="min-w-[210px] sm:min-w-[225px] max-w-[225px] bg-white rounded-xl border border-slate-200/90 p-4 flex flex-col justify-between shadow-xs hover:shadow-md transition-all snap-start shrink-0"
                  >
                    <div>
                      <Link
                        to={`/produto/${rel.slug}`}
                        className="block relative h-36 bg-slate-50 rounded-lg overflow-hidden mb-3 flex items-center justify-center border border-slate-100"
                      >
                        {rel.imageUrl ? (
                          <img
                            src={rel.imageUrl}
                            alt={rel.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-24 h-32 bg-slate-900 text-white rounded-lg p-2.5 flex flex-col justify-between text-left">
                            <span className="text-[9px] font-bold text-blue-400">
                              {rel.compatibility}
                            </span>
                            <span className="text-xs font-extrabold leading-tight line-clamp-2">
                              {rel.name}
                            </span>
                            <span className="text-[8px] text-emerald-400 font-bold uppercase">
                              Vitalício
                            </span>
                          </div>
                        )}
                      </Link>

                      {relSavings > 0 && (
                        <span className="inline-block bg-[#18b259] text-white text-[10px] font-extrabold px-2 py-0.5 rounded mb-2">
                          {t('save')} {formatPrice(relSavings)}
                        </span>
                      )}

                      <Link to={`/produto/${rel.slug}`}>
                        <h3 className="font-display font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition-colors line-clamp-2 min-h-[36px]">
                          {rel.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className="w-3 h-3 fill-amber-400 text-amber-400"
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-semibold">
                          ({(reviewsData[rel.id] || []).length || 9})
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-display font-black text-sm text-[#0b5ed7]">
                          {formatPrice(rel.price)}
                        </span>
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatPrice(rel.originalPrice)}
                        </span>
                      </div>

                      <Link
                        to={`/produto/${rel.slug}`}
                        className="block w-full py-2 text-center bg-blue-50 hover:bg-[#0b5ed7] text-[#0b5ed7] hover:text-white font-bold text-xs rounded-md transition-colors"
                      >
                        Detalhes
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* AVALIAÇÕES DO PRODUTO (Customer Reviews Section)                    */}
        {/* =================================================================== */}
        <div className="border border-slate-200 rounded-2xl p-6 sm:p-8 bg-white">
          <h2 className="font-display font-extrabold text-sm sm:text-base text-slate-900 uppercase tracking-wider mb-6">
            {t('product_reviews_title')} ({productReviews.length})
          </h2>

          {/* Top Summary & Progress Bar Box + 2 Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-200">
            {/* Average Score Box */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center p-5 border border-slate-200 rounded-xl bg-slate-50/50 text-center">
              <span className="text-xs text-slate-500 font-semibold">{t('average_rating_label')}</span>
              <span className="font-display font-black text-4xl sm:text-5xl text-slate-900 my-1">
                {averageRating}
              </span>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                ({productReviews.length} avaliações)
              </span>
            </div>

            {/* 5-Row Rating Progress Bars */}
            <div className="lg:col-span-6 space-y-2 px-0 sm:px-4">
              {ratingBreakdown.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-0.5 w-20 shrink-0">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3 h-3 ${
                          s <= row.stars
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-200 text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="w-16 text-right text-[11px] text-slate-600 font-medium shrink-0">
                    {row.label}
                  </span>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-left text-[11px] font-bold text-slate-700 shrink-0">
                    {row.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Action Buttons: Fake "Escrever uma avaliação" + Real "Faça uma pergunta" */}
            <div className="lg:col-span-3 flex flex-col gap-2.5 justify-center lg:items-end">
              <button
                type="button"
                onClick={() => {
                  setFakeReviewSubmitted(false);
                  setIsFakeReviewModalOpen(true);
                }}
                className="w-full sm:w-52 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{t('write_review_btn')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setQuestionSentSuccess(false);
                  setQuestionError('');
                  setIsQuestionModalOpen(true);
                }}
                className="w-full sm:w-52 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{t('ask_question_btn')}</span>
              </button>
            </div>
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-md bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs">
                Avaliações ({productReviews.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuestionSentSuccess(false);
                  setIsQuestionModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Perguntas e Respostas
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50">
              Ordenar por: <strong className="text-slate-800">Mais recentes</strong>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="divide-y divide-slate-200">
            {productReviews.map((review, idx) => {
              const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const initial = review.author.trim().charAt(0).toUpperCase();

              return (
                <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Colored circular initial avatar (no photo) */}
                    <div
                      className={`w-10 h-10 rounded-full font-display font-bold text-base flex items-center justify-center shrink-0 select-none shadow-xs ${avatarColor}`}
                    >
                      {initial}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">
                            {review.author}
                          </span>
                          <BrazilFlagIcon />
                        </div>
                        <p className="text-[11px] font-bold text-emerald-600">
                          Compra verificada
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                        {review.comment}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Stars + (5/5) + Date */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 shrink-0 pl-13 sm:pl-0">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${
                              s <= review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-slate-200 text-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        ({review.rating}/5)
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">
                      {review.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MODAL: FAÇA UMA PERGUNTA (Envia para c2tech2025@gmail.com)            */}
      {/* ===================================================================== */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsQuestionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {questionSentSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  Pergunta enviada com sucesso!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sua dúvida foi encaminhada diretamente para nossa equipe em{' '}
                  <strong>c2tech2025@gmail.com</strong>. Responderemos no seu e-mail o mais rápido
                  possível!
                </p>
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Fechar janela
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    Faça uma pergunta
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tem alguma dúvida sobre o <strong>{product.name}</strong>? Envie abaixo e
                    responderemos diretamente no seu e-mail.
                  </p>
                </div>

                {questionError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {questionError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={questionName}
                    onChange={(e) => setQuestionName(e.target.value)}
                    placeholder="Ex: João Silva"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu e-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={questionEmail}
                    onChange={(e) => setQuestionEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp (opcional)
                  </label>
                  <input
                    type="tel"
                    value={questionPhone}
                    onChange={(e) => setQuestionPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sua pergunta *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Digite sua dúvida sobre instalação, compatibilidade ou funcionamento..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSendingQuestion}
                    className="px-5 py-2.5 rounded-lg bg-[#0b5ed7] hover:bg-[#0a53be] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSendingQuestion ? 'Enviando...' : 'Enviar pergunta'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL ILUSTRATIVO: ESCREVA SUA AVALIAÇÃO                              */}
      {/* ===================================================================== */}
      {isFakeReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsFakeReviewModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {fakeReviewSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  Avaliação recebida para moderação!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Obrigado pelo seu feedback! Após a validação do número do pedido em nosso sistema,
                  sua avaliação será publicada nesta página.
                </p>
                <button
                  type="button"
                  onClick={() => setIsFakeReviewModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Concluir
                </button>
              </div>
            ) : (
              <form onSubmit={handleFakeReviewSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    Escreva sua avaliação
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Compartilhe sua experiência com o <strong>{product.name}</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Sua nota *
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFakeReviewRating(star)}
                        className="p-1 cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= fakeReviewRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-200 text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={fakeReviewName}
                    onChange={(e) => setFakeReviewName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Seu comentário *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={fakeReviewComment}
                    onChange={(e) => setFakeReviewComment(e.target.value)}
                    placeholder="Conte como foi a entrega e instalação do software..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFakeReviewModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    Enviar avaliação
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <TrustGuaranteesModal isOpen={isGuaranteesModalOpen} onClose={() => setIsGuaranteesModalOpen(false)} />

      <CheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        initialSubOption={selectedPlan}
      />

      {/* Sticky Mobile Purchase Bar (Optimized for iPhone / Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate leading-tight">
            {product.name}
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <span className="font-black text-base text-[#0b5ed7] leading-none">
              {formattedPrice}
            </span>
            {displayOriginalPrice > displayPrice && (
              <span className="text-[10px] text-slate-400 line-through">
                {formattedOriginalPrice}
              </span>
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isInternational) {
              const effectiveUrl = getEffectiveCheckoutUrl(product, selectedLicenseOption, true);
              window.open(effectiveUrl, '_blank', 'noopener,noreferrer');
            } else {
              addToCart(
                product,
                selectedLicenseOption ? 'avulso' : selectedPlan,
                selectedLicenseOption,
                quantity
              );
            }
          }}
          className="shrink-0 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isInternational ? t('buy_now') : 'Comprar'}</span>
        </button>
      </div>
    </div>
  );
};
