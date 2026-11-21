import { LifetimeSeal } from '../components/LifetimeSeal';
import { ProductDescription } from '../components/ProductDescription';
import { ReviewsMoreButton } from '../components/ReviewsMoreButton';

const REVIEWS_PREVIEW = 5;
import { AnimatedPrice } from '../components/AnimatedPrice';
import { JellyRadio } from '../components/JellyRadio';
import { LearnMoreChevron } from '../components/LearnMoreChevron';
import { galleryImageSource } from '../data/galleryImages';
import { getTutorialVideoId } from '../data/tutorialVideos';
import { YouTubeTutorial } from '../components/YouTubeTutorial';
import { StoreReviews } from '../components/StoreReviews';
import { ReviewComment } from '../components/ReviewComment';
import { useText } from '../hooks/useText';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  TrustpilotRatingHorizontal,
  TrustGuaranteesModal,
} from '../components/TrustBadges';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
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
  Play,
  Award,
  Edit3,
  MessageSquare,
  X,
  CheckCircle2,
  Sparkles,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react';
import { reviewsData } from '../data/reviews';
import { translateCategory, translateCompatibility } from '../utils/i18n';
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

const ReviewFlagIcon: React.FC<{ country?: string; className?: string }> = ({
  country = 'BR',
  className = 'w-4 h-3',
}) => {
  switch (country) {
    case 'US':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="United States">
          <title>United States</title>
          <rect width="28" height="20" fill="#b22234" />
          <rect y="1.54" width="28" height="1.54" fill="#ffffff" />
          <rect y="4.62" width="28" height="1.54" fill="#ffffff" />
          <rect y="7.7" width="28" height="1.54" fill="#ffffff" />
          <rect y="10.78" width="28" height="1.54" fill="#ffffff" />
          <rect y="13.86" width="28" height="1.54" fill="#ffffff" />
          <rect y="16.94" width="28" height="1.54" fill="#ffffff" />
          <rect width="11.2" height="10.8" fill="#3c3b6e" />
          <circle cx="2.8" cy="2.7" r="0.8" fill="#ffffff" />
          <circle cx="5.6" cy="2.7" r="0.8" fill="#ffffff" />
          <circle cx="8.4" cy="2.7" r="0.8" fill="#ffffff" />
          <circle cx="4.2" cy="5.4" r="0.8" fill="#ffffff" />
          <circle cx="7.0" cy="5.4" r="0.8" fill="#ffffff" />
          <circle cx="2.8" cy="8.1" r="0.8" fill="#ffffff" />
          <circle cx="5.6" cy="8.1" r="0.8" fill="#ffffff" />
          <circle cx="8.4" cy="8.1" r="0.8" fill="#ffffff" />
        </svg>
      );
    case 'ES':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="España">
          <title>España</title>
          <rect width="28" height="5" fill="#AA151B" />
          <rect y="5" width="28" height="10" fill="#F1BF00" />
          <rect y="15" width="28" height="5" fill="#AA151B" />
          <circle cx="7" cy="10" r="2.2" fill="#AA151B" />
        </svg>
      );
    case 'PT':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="Portugal">
          <title>Portugal</title>
          <rect width="11" height="20" fill="#006600" />
          <rect x="11" width="17" height="20" fill="#FF0000" />
          <circle cx="11" cy="10" r="3.2" fill="#FFCC00" />
          <circle cx="11" cy="10" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'MX':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="México">
          <title>México</title>
          <rect width="9.3" height="20" fill="#006847" />
          <rect x="9.3" width="9.4" height="20" fill="#FFFFFF" />
          <rect x="18.7" width="9.3" height="20" fill="#CE1126" />
          <circle cx="14" cy="10" r="2.2" fill="#8C6239" />
        </svg>
      );
    case 'AR':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="Argentina">
          <title>Argentina</title>
          <rect width="28" height="6.6" fill="#74ACDF" />
          <rect y="6.6" width="28" height="6.8" fill="#FFFFFF" />
          <rect y="13.4" width="28" height="6.6" fill="#74ACDF" />
          <circle cx="14" cy="10" r="2" fill="#F6B40E" />
        </svg>
      );
    case 'CO':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="Colombia">
          <title>Colombia</title>
          <rect width="28" height="10" fill="#FCD116" />
          <rect y="10" width="28" height="5" fill="#003893" />
          <rect y="15" width="28" height="5" fill="#CE1126" />
        </svg>
      );
    case 'CL':
      return (
        <svg viewBox="0 0 28 20" className={`inline-block rounded-[2px] shadow-[0_0_1px_rgba(0,0,0,0.3)] shrink-0 overflow-hidden ${className}`} aria-label="Chile">
          <title>Chile</title>
          <rect width="10" height="10" fill="#0039A6" />
          <rect x="10" width="18" height="10" fill="#FFFFFF" />
          <rect y="10" width="28" height="10" fill="#D52B1E" />
          <circle cx="5" cy="5" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'BR':
    default:
      return <BrazilFlagIcon className={className} />;
  }
};

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



const ProductDetailContent: React.FC = () => {
  const navigate = useNavigate();
  const localize = useText();
  const { slug } = useParams<{ slug: string }>();
  const [isGuaranteesModalOpen, setIsGuaranteesModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedPlan, setSelectedPlan] = useState<'recurrent' | 'avulso'>('recurrent');
  const [selectedLicenseOption, setSelectedLicenseOption] = useState<LicenseOption | undefined>(() => {
    const options = getProductBySlug(slug || '')?.licenseOptions;
    return options?.reduce<LicenseOption | undefined>((cheapest, option) => !cheapest || option.price < cheapest.price ? option : cheapest, undefined);
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [mobileInfoOpen, setMobileInfoOpen] = useState<'description' | 'specs' | 'activation' | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'activation'>('description');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);

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

  const { addToCart, setIsCartOpen } = useCart();
  const { language, isInternational, t } = useLanguage();
  const { formatPrice } = useCurrency();
  const hasProcessedCheckoutRef = useRef(false);
  const relatedCarouselRef = useRef<HTMLDivElement>(null);

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
    const options = product?.licenseOptions;
    const cheapest = options?.reduce<LicenseOption | undefined>(
      (acc, option) => (!acc || option.price < acc.price ? option : acc),
      undefined
    );
    setSelectedLicenseOption(cheapest);
    setQuantity(1);
    setActiveThumbIndex(0);
    setShowAllReviews(false);
  }, [product]);

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
  }, [product]);

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

  useEffect(() => {
    if (!product) return;
    const typeLabel = product.isSubscription ? t('subscription') : t('lifetime');
    document.title = localize(product.name) + ' — ' + typeLabel + ' | C2Tech';
    document.querySelector('meta[name="description"]')?.setAttribute('content', localize(product.description));
  }, [product, language, localize, t]);

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

  if (!product) {
    return (
      <div className="pt-24 pb-16 min-h-[70vh] flex items-center justify-center bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200/80 shadow-md p-8 text-center space-y-4">
          <h2 className="font-display font-extrabold text-2xl text-slate-900">
            {localize("Software não encontrado")}</h2>
          <p className="text-slate-500 text-sm">
            {localize("O produto solicitado não foi encontrado no catálogo da C2Tech ou foi removido.")}</p>
          <div className="pt-2">
            <Link
              to="/catalogo"
              className="inline-flex items-center px-5 py-2.5 bg-action-primary text-white font-semibold rounded-xl text-sm shadow hover:bg-action-primary-hover transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {localize("Voltar ao catálogo")}</Link>
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
      label: product.id === 'autodesk_all_apps' ? 'Conta Privada Autodesk' : 'Software Vitalício',
      badge: product.id === 'autodesk_all_apps' ? 'CONTA' : t('thumb_lifetime'),
    },
  ];

  const activeThumb = thumbnails[activeThumbIndex] || thumbnails[0];
  const tutorialVideoId = getTutorialVideoId(product.id, selectedPlatform);
  const tutorialTitle = `Tutorial de instalação ${product.name}${hasPlatformYearMatrix ? ` (${selectedPlatform})` : ''}`;

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen text-left font-sans">
      {/* Inject Schema Markup */}
      <script type="application/ld+json">{localize(JSON.stringify(schemaMarkup))}</script>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb + Top Rating Strip */}
        <div className="flex flex-col gap-2 pb-3 mb-4 border-b border-slate-100">
          <nav
            className="flex items-center flex-wrap gap-1.5 text-xs text-slate-500 min-w-0"
            aria-label={localize("Breadcrumb")}
          >
            <Link to="/" className="hover:text-action-primary transition-colors">
              {localize(t('breadcrumb_home'))}
            </Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-action-primary transition-colors">
              {localize(t('breadcrumb_all_products'))}
            </Link>
            <span>/</span>
            <Link
              to={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
              className="hover:text-action-primary transition-colors"
            >
              {localize(translateCategory(product.category, language))}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">{localize(product.name)}</span>
          </nav>

          {/* Trustpilot Official Header Rating Bar */}
          <TrustpilotRatingHorizontal className="self-center" onOpenModal={() => setIsGuaranteesModalOpen(true)} />
        </div>

        {/* =================================================================== */}
        {/* HERO SECTION (Left: Box Preview + Thumbnails | Right: Configurator) */}
        {/* =================================================================== */}
        <div className="product-hero grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-10">
          {/* LEFT COLUMN: Product Box Image & Thumbnails */}
          <div className="product-gallery lg:col-span-6 min-w-0 flex flex-col items-center">
            <div className="product-gallery-stage relative w-full flex flex-col items-center justify-center pt-14 pb-3 min-h-[350px] sm:min-h-[440px]">
              {/* Main Visual Slides based on activeThumb */}
              {activeThumb?.type === 'image' ? (
                <div className="relative flex flex-col items-center justify-center w-full my-auto">
                  {activeThumb.imageUrl ? (
                    <div className="product-cover">
                      <img
                        src={galleryImageSource(activeThumb.imageUrl)}
                        alt={`${product.name} - ${selectedVersionBadge}`}
                        className="product-gallery-image"
                        fetchPriority="high"
                        decoding="async"
                      />
                      {savingsAmount > 0 && <div className="product-cover-overlay product-savings">{localize(t('save'))} {localize(formattedSavings)}</div>}
                      <div className="product-cover-overlay product-lifetime"><LifetimeSeal subscription={!!product.isSubscription} /></div>
                    </div>
                  ) : (
                    <div className="w-56 h-72 bg-gradient-to-b from-slate-100 to-slate-200 rounded-xl shadow-xl border border-slate-300 flex flex-col justify-between p-5 text-left relative">
                      <div className="flex justify-between items-center border-b border-slate-300 pb-2">
                        <span className="font-display font-black text-slate-800 text-sm">
                          C2TECH
                        </span>
                        <span className="text-xs font-bold bg-action-primary text-white px-2 py-0.5 rounded">
                          {localize(selectedPlatform)}
                        </span>
                      </div>
                      <div className="my-auto text-center space-y-2">
                        <div className="w-16 h-16 mx-auto rounded-xl bg-rose-600 text-white font-display font-black text-2xl flex items-center justify-center shadow-md">
                          {localize(product.name.substring(0, 1))}
                        </div>
                        <p className="font-display font-extrabold text-slate-900 text-base leading-snug">
                          {localize(product.name)}
                        </p>
                        <p className="text-xs font-semibold text-slate-500">
                          {localize(selectedVersionBadge)}
                        </p>
                      </div>
                      <div className="border-t border-slate-300 pt-2 flex items-center justify-between text-xs font-bold text-slate-600">
                        <span>{localize("LICENÇA VITALÍCIA")}</span>
                        <span className="text-emerald-600">{localize("COMPLETO")}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : activeThumb?.type === 'video' && tutorialVideoId ? (
                <div className="w-full max-w-[560px] my-auto">
                  <YouTubeTutorial videoId={tutorialVideoId} title={tutorialTitle} className="shadow-xl" />
                </div>
              ) : activeThumb?.type === 'video' ? (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-action-primary/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Instruções de Acesso Oficial'
                      : 'Instruções em Vídeo Passo a Passo')}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Você recebe um guia passo a passo ensinando a realizar o login na sua conta oficial da Autodesk e baixar qualquer um dos mais de 86 aplicativos.'
                      : 'Junto com os arquivos de instalação, você recebe um vídeo tutorial gravado pela nossa equipe mostrando cada clique da instalação e ativação definitiva.')}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-feedback-success/10 px-3 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" /> {localize(" Fácil, rápido e sem complicação")}</div>
                </div>
              ) : activeThumb?.type === 'email' ? (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-feedback-success/20 border border-feedback-success/30 text-emerald-400 flex items-center justify-center mx-auto">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Login e Senha da Conta Privada'
                      : 'Link de Download Direto no E-mail')}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Assim que seu pagamento via Pix ou Cartão é confirmado, enviamos as credenciais da conta privada (login e senha) diretamente no seu e-mail e WhatsApp.'
                      : 'Assim que seu pagamento via Pix ou Cartão é confirmado, nosso sistema envia automaticamente o link exclusivo do Google Drive diretamente para o seu e-mail.')}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    <CloudDownload className="w-3.5 h-3.5" /> {localize(" Entrega Rápida e Privada")}</div>
                </div>
              ) : (
                <div className="w-full max-w-[340px] bg-slate-900 text-white rounded-2xl p-6 shadow-xl space-y-4 text-center my-auto">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-display font-bold text-lg">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Conta Privada Autodesk'
                      : 'Funcionamento Vitalício do Software')}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {localize(product.id === 'autodesk_all_apps'
                      ? 'Conta privada com acesso a todos os softwares da Autodesk (AutoCAD, Revit, Maya, 3ds Max, etc.) no portal manage.autodesk.com.'
                      : 'O software tem ativação definitiva para funcionar de forma vitalícia, sem mensalidades ou renovações. Além disso, você conta com 30 dias de garantia de suporte técnico para instalação e ativação.')}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full">
                    <Award className="w-3.5 h-3.5" /> {localize(product.id === 'autodesk_all_apps' ? 'Conta Oficial Autodesk' : 'Uso Vitalício • 30 Dias de Suporte')}
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip Below Main Box */}
            <div className="product-thumbnails flex w-full items-center justify-start sm:justify-center gap-2 mt-3 overflow-x-auto pb-2">
              {thumbnails.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  type="button"
                  onClick={() => setActiveThumbIndex(idx)}
                  className={`shrink-0 w-20 h-20 rounded-md border p-1 flex flex-col items-center justify-between transition-all cursor-pointer bg-white ${
                    activeThumbIndex === idx
                      ? 'border-action-primary ring-1 ring-action-primary'
                      : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                  }`}
                  title={thumb.label}
                >
                  {thumb.type === 'image' && thumb.imageUrl ? (
                    <img
                      src={galleryImageSource(thumb.imageUrl)}
                      alt={thumb.label}
                      className="w-full h-11 object-contain"
                    />
                  ) : thumb.type === 'video' && tutorialVideoId ? (
                    <div className="relative w-full h-11 rounded overflow-hidden bg-slate-900">
                      <img
                        src={`https://i.ytimg.com/vi/${tutorialVideoId}/mqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-5 w-7 items-center justify-center rounded-md bg-red-600 text-white">
                          <Play className="h-3 w-3 fill-current" />
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-11 rounded bg-slate-50 text-slate-700 flex items-center justify-center text-xs font-black">
                      {thumb.type === 'video' ? (
                        <PlayCircle className="w-4 h-4 text-blue-400" />
                      ) : thumb.type === 'email' ? (
                        <Mail className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                  )}
                  <span className="text-xs font-medium text-slate-700 uppercase tracking-tight truncate w-full text-center">
                    {localize(thumb.badge)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Product Title, Price, Trust Badges, Selectors & CTAs */}
          <div className="product-purchase lg:col-span-6 min-w-0 space-y-4 [&_button]:min-h-10">
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
                {localize(product.name)}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {localize(hasPlatformYearMatrix
                  ? `${t('selected_label')}: ${selectedLicenseOption?.label || 'Windows 2027'} • ${t('full_lifetime_version')}`
                  : `${product.version} • ${t('compatible_with')} ${translateCompatibility(product.compatibility, language)}`)}
              </p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline gap-3">
              <AnimatedPrice
                value={displayPrice}
                formatted={localize(formattedPrice)}
                className="font-display font-black text-3xl sm:text-4xl text-action-primary"
                announce
              />
              {displayOriginalPrice > displayPrice && (
                <AnimatedPrice
                  value={displayOriginalPrice}
                  formatted={localize(formattedOriginalPrice)}
                  className="text-base sm:text-lg text-slate-400 line-through font-semibold"
                />
              )}
              {product.isSubscription && (
                <span className="text-xs font-bold text-slate-500">
                  {localize((selectedLicenseOption?.quantity || 1) >= 12 ? '/plano' : '/mês')}
                </span>
              )}
            </div>

            {/* 3 Horizontal Trust Badges (Mobile Responsive) */}
            <div className="grid grid-cols-1 sm:flex sm:justify-between gap-2.5 sm:gap-3 py-3.5 border-y border-slate-200 text-left bg-slate-50/60 sm:bg-transparent rounded-xl sm:rounded-none px-3.5 sm:px-0">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/icons/badge-seal.webp"
                  alt={localize(product.id === 'autodesk_all_apps' ? "Acesso por Assinatura" : "Uso Vitalício")}
                  className="w-7 h-7 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate">{localize(product.id === 'autodesk_all_apps' ? 'Acesso por Assinatura' : t('badge_lifetime'))}</p>
                  <p className="text-[11.5px] text-slate-500 leading-tight mt-0.5 truncate">
                    {localize(product.id === 'autodesk_all_apps' ? 'Pelo período escolhido' : 'Sem mensalidade')}
                  </p>
                </div>
              </div>

              <span className="hidden sm:block w-px self-stretch bg-slate-200" aria-hidden="true" />
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/icons/badge-shield.webp"
                  alt={localize("Ativação Garantida")}
                  className="w-7 h-7 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate">
                    {localize(product.isSubscription ? (language === 'es' ? 'Acceso Oficial' : 'Acesso Oficial') : t('badge_guaranteed'))}
                  </p>
                  <p className="text-[11.5px] text-slate-500 leading-tight mt-0.5 truncate">
                    {localize(product.isSubscription ? (language === 'es' ? 'Cuenta verificada' : 'Conta verificada') : '30 dias de suporte')}
                  </p>
                </div>
              </div>

              <span className="hidden sm:block w-px self-stretch bg-slate-200" aria-hidden="true" />
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="/images/icons/badge-plane.webp"
                  alt={localize(product.id === 'autodesk_all_apps' ? "Conta Privada" : "Entrega Digital")}
                  className="w-7 h-7 object-contain shrink-0 select-none"
                  loading="eager"
                />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-tight truncate">{localize(product.id === 'autodesk_all_apps' ? 'Conta Privada' : t('badge_digital_delivery'))}</p>
                  <p className="text-[11.5px] text-slate-500 leading-tight mt-0.5 truncate">
                    {localize(product.id === 'autodesk_all_apps' ? 'Login após a compra' : 'E-mail e WhatsApp')}
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
                  <label className="block text-xs font-semibold text-slate-700">{localize(t('platform'))}</label>
                  <JellyRadio
                    ariaLabel={localize(t('platform'))}
                    value={selectedPlatform}
                    items={availablePlatforms.map((plat) => ({ value: plat, label: localize(plat) }))}
                    onChange={(platform) => handleSelectPlatform(platform as 'Windows' | 'macOS')}
                  />
                </div>

                {/* Validade */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">{localize(t('validity'))}</label>
                  <JellyRadio
                    ariaLabel={localize(t('validity'))}
                    value="lifetime"
                    items={[{ value: 'lifetime', label: localize(t('lifetime')) }]}
                    onChange={() => {}}
                  />
                </div>

                {/* Ano / Versão */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">{localize(t('year'))}</label>
                  <JellyRadio
                    ariaLabel={localize(t('year'))}
                    value={String(selectedLicenseOption?.quantity ?? availableYearsForPlatform[0]?.quantity ?? '')}
                    items={availableYearsForPlatform.map((opt) => ({
                      value: String(opt.quantity),
                      label: opt.year,
                    }))}
                    onChange={(_, index) => {
                      const option = availableYearsForPlatform[index];
                      if (option) handleSelectYearOption(option);
                    }}
                  />
                </div>
              </div>
            ) : (
              /* Non-matrix products (keep their exact versions & prices while matching the visual layout) */
              <div className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">{localize(t('platform'))}</label>
                    <JellyRadio
                      ariaLabel={localize(t('platform'))}
                      value={product.compatibility}
                      items={[{ value: product.compatibility, label: localize(product.compatibility) }]}
                      onChange={() => {}}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">{localize(t('validity'))}</label>
                    <JellyRadio
                      ariaLabel={localize(t('validity'))}
                      value="validity"
                      items={[
                        {
                          value: 'validity',
                          label: localize(product.isSubscription ? t('subscription') : t('lifetime')),
                        },
                      ]}
                      onChange={() => {}}
                    />
                  </div>
                </div>

                {/* Standard licenseOptions if present (e.g. Eberick + Builder, Autodesk All Apps plans) or single version */}
                {product.licenseOptions && product.licenseOptions.length > 0 ? (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {localize(product.isSubscription
                        ? 'Escolha a duração da assinatura'
                        : product.id === 'eberick_builder_2025'
                        ? 'Escolha a versão'
                        : t('choose_license'))}
                    </label>
                    <JellyRadio
                      ariaLabel={localize(
                        product.isSubscription
                          ? 'Escolha a duração da assinatura'
                          : product.id === 'eberick_builder_2025'
                          ? 'Escolha a versão'
                          : t('choose_license')
                      )}
                      value={String(selectedLicenseOption?.quantity ?? product.licenseOptions[0]?.quantity ?? '')}
                      items={product.licenseOptions.map((opt) => ({
                        value: String(opt.quantity),
                        label: localize(
                          product.id === 'autodesk_all_apps' ||
                            product.id === 'eberick_builder_2025' ||
                            opt.label.startsWith('Versão')
                            ? opt.label
                            : `${opt.label} — ${formatPrice(opt.price)}`
                        ),
                      }))}
                      onChange={(_, index) => {
                        const opt = product.licenseOptions?.[index];
                        if (opt) {
                          setSelectedLicenseOption(opt);
                          setActiveThumbIndex(0);
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">{localize('Versão')}</label>
                    <JellyRadio
                      ariaLabel={localize('Versão')}
                      value={product.version}
                      items={[{ value: product.version, label: localize(product.version) }]}
                      onChange={() => {}}
                    />
                  </div>
                )}

                {/* Subscription Recurrent vs Avulso selector */}
                {product.isSubscription && product.recurrencePrice && !product.licenseOptions && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      {localize("Modalidade de Pagamento")}</label>
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
                        <span className="block text-xs font-bold text-slate-800">
                          {localize("Recorrente Mensal")}</span>
                        <span className="text-sm font-black text-[#0b5ed7]">
                          {formattedRecurrencePrice}{localize("/mês")}</span>
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
                        <span className="block text-xs font-bold text-slate-800">
                          {localize("Pagamento Único")}</span>
                        <span className="text-sm font-black text-slate-900">
                          {localize(formatPrice(product.price))}
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
                  {localize("Temporariamente Indisponível")}</button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                {/* Label above the [- 1 +] Device Selector */}
                {product.id !== 'autodesk_all_apps' && (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-[#0b5ed7] shrink-0" />
                    <span>{localize(t('device_support_label'))}</span>
                  </label>
                  <span className="text-xs font-bold text-[#0b5ed7] bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded-full shrink-0">
                    {localize(quantity === 1 ? t('single_device') : `${quantity} ${t('multiple_devices')}`)}
                  </span>
                </div>
                )}

                <div className="flex items-stretch gap-3">
                  {/* Quantity / Devices Counter (- 1 +) */}
                  {product.id !== 'autodesk_all_apps' && (
                  <div
                    className="flex items-center border border-slate-300 rounded-md bg-white overflow-hidden shrink-0"
                    title={localize("Quantidade de dispositivos com suporte")}
                  >
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      aria-label={localize("Diminuir número de dispositivos")}
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
                      aria-label={localize("Aumentar número de dispositivos")}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  )}

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
                    className="specular-press flex-1 bg-[#0b5ed7] hover:bg-[#0a53be] text-white font-bold text-sm py-3 px-6 rounded-md shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{localize(t('add_to_cart'))}</span>
                  </button>
                </div>

                {/* Dark "Comprar agora" Button */}
                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, selectedLicenseOption ? 'avulso' : selectedPlan, selectedLicenseOption, quantity);
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  id={`detail-buy-now-${product.id}`}
                  className="specular-press w-full bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm py-3.5 px-6 rounded-md shadow-md transition-all cursor-pointer flex items-center justify-center text-center"
                >
                  <span>{localize(isInternational ? t('buy_now') : 'Comprar agora')}</span>
                </button>
                {isInternational && (
                  <p className="text-xs text-slate-500 text-center leading-relaxed pt-1">
                    {localize(t('intl_checkout_hint'))}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* TRUSTPILOT OFFICIAL REVIEWS BAR                                     */}
        {/* =================================================================== */}
        <StoreReviews />

        {/* 3-TABBED INFORMATION CONTAINER (DESCRIÇÃO | ESPECIFICAÇÕES | ATIVAÇÃO) */}
        {/* =================================================================== */}
        <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/80 p-5 sm:p-8 mb-14">
          {/* Tabs Navigation Bar */}
          <div className="hidden sm:flex flex-wrap items-center gap-8 border-b border-slate-300 pb-0 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={`flex items-center gap-2 pb-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'description'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>{localize(t('tab_description'))}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-2 pb-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'specs'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-4 h-4" />
              <span>{localize(t('tab_specs'))}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('activation')}
              className={`flex items-center gap-2 pb-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider border-b-2 transition-all cursor-pointer -mb-[1px] ${
                activeTab === 'activation'
                  ? 'border-slate-900 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{localize(t('tab_activation'))}</span>
            </button>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* TAB 1: DESCRIÇÃO                                                  */}
          {/* ----------------------------------------------------------------- */}
          <button type="button" aria-expanded={mobileInfoOpen === 'description'} aria-controls="product-info-description" onClick={() => setMobileInfoOpen(current => current === 'description' ? null : 'description')} className="sm:hidden flex w-full items-center gap-3 py-4 text-left text-sm font-bold border-b border-slate-200 text-slate-900"><Info className="w-5 h-5 shrink-0"/><span className="flex-1">{localize(t('tab_description'))}</span><ChevronRight className={`w-5 h-5 transition-transform ${mobileInfoOpen === 'description' ? 'rotate-90' : ''}`}/></button>
          {(
            <div id="product-info-description" className={`${mobileInfoOpen === 'description' ? 'block py-5' : 'hidden'} ${activeTab === 'description' ? 'sm:block' : 'sm:hidden'} sm:py-0`}>
              <ProductDescription product={product} />
              {tutorialVideoId && (
                <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6" aria-labelledby="product-tutorial-heading">
                  <div className="flex items-center gap-2 mb-1">
                    <PlayCircle className="w-5 h-5 text-red-600 shrink-0" />
                    <h3 id="product-tutorial-heading" className="font-display font-bold text-lg text-slate-900">
                      {localize('Vídeo tutorial de instalação')}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    {localize(hasPlatformYearMatrix
                      ? `Veja passo a passo como instalar e ativar o ${product.name} no ${selectedPlatform}.`
                      : `Veja passo a passo como instalar e ativar o ${product.name}.`)}
                  </p>
                  <YouTubeTutorial videoId={tutorialVideoId} title={tutorialTitle} />
                </section>
              )}
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 2: ESPECIFICAÇÕES DO SISTEMA                                  */}
          {/* ----------------------------------------------------------------- */}
          <button type="button" aria-expanded={mobileInfoOpen === 'specs'} aria-controls="product-info-specs" onClick={() => setMobileInfoOpen(current => current === 'specs' ? null : 'specs')} className="sm:hidden flex w-full items-center gap-3 py-4 text-left text-sm font-bold border-b border-slate-200 text-slate-900"><List className="w-5 h-5 shrink-0"/><span className="flex-1">{localize(t('tab_specs'))}</span><ChevronRight className={`w-5 h-5 transition-transform ${mobileInfoOpen === 'specs' ? 'rotate-90' : ''}`}/></button>
          {(
            <div id="product-info-specs" className={`${mobileInfoOpen === 'specs' ? 'block py-5' : 'hidden'} ${activeTab === 'specs' ? 'sm:block' : 'sm:hidden'} sm:py-0 space-y-6`}>
              <div className="overflow-hidden rounded-lg border border-slate-200/80">
                <table className="w-full text-left border-collapse text-sm sm:text-base">
                  <tbody>
                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 w-1/3 sm:w-1/4 align-top">
                        {localize(t('spec_platform'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700">
                        {product.id === 'autocad_2027_win' ||
                        product.id === 'sketchup_2026_win' ||
                        product.id === 'coreldraw_2026' ? (
                          <>
                            <span className="block">{localize("Windows (64 bits)")}</span>
                            <span className="block">{localize("macOS (Intel e Apple Silicon série M)")}</span>
                          </>
                        ) : (
                          product.compatibility
                        )}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_gpu'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Mínimo 2 GB de VRAM com suporte a DirectX 11 (Recomendado: 8 GB de VRAM DirectX 12 para 3D e telas 4K até 3840 x 2160) / MAC: Tela de 1280 x 800 (Recomendado: Retina 2880 x 1800 com placa gráfica nativa Apple Metal).'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Placa de vídeo 3D com no mínimo 1 GB de VRAM compatível com OpenGL 3.1 e DirectX 12 (Recomendado: 4 GB a 8 GB de VRAM dedicada NVIDIA GTX/RTX ou AMD Radeon para cenas complexas) / MAC: Placa gráfica nativa compatível com Apple Metal (Apple M1/M2/M3/M4/M5 ou Radeon Pro).'
                          : product.requirements.gpu ||
                            'Placa gráfica compatível com DirectX 11/12 ou superior (resolução mínima 1920 x 1080).')}
                      </td>
                    </tr>

                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_cpu'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Processador 64 bits de 2.5–2.9 GHz (base). Recomendado: 3+ GHz (base) ou 4+ GHz (turbo) / MAC: Apple Silicon (M1, M2, M3, M4, M5 Pro/Max) ou Intel Core i7 64 bits.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Processador Intel ou AMD 64 bits de 2.1+ GHz (Recomendado: 2.8+ GHz ou superior multi-core) / MAC: Apple Silicon (M1, M2, M3, M4, M5) nativo ou Intel Core i5/i7 de 2.1+ GHz.'
                          : product.requirements.cpu)}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_storage'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(product.id === 'autocad_2027_win'
                          ? 'WINDOWS: 10 GB de espaço livre em disco (SSD NVMe recomendado) / MAC: 6 GB a 8 GB de espaço livre em disco para download e instalação.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Mínimo de 4 GB de espaço livre em disco (SSD recomendado para carregamento rápido de blocos e texturas) / MAC: 4 GB de espaço livre em disco.'
                          : product.requirements.storage)}
                      </td>
                    </tr>

                    <tr className="bg-white border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_ram'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Requisito básico: 8 GB (2019–2025) / 16 GB (2026–2027) — Recomendado: 16 GB a 32 GB; MAC: Requisito mínimo: 8 GB — Recomendado: 16 GB ou superior.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Mínimo 8 GB de RAM (4 GB para edição 2021) — Recomendado: 16 GB ou mais para maquetes grandes / MAC: Mínimo 8 GB de RAM — Recomendado: 16 GB de memória unificada.'
                          : product.requirements.ram)}
                      </td>
                    </tr>

                    <tr className="bg-[#f4f6f8] border-b border-slate-200/70">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_os'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(product.id === 'autocad_2027_win'
                          ? 'WINDOWS: Windows 11 (64-bit) e Windows 10 (64-bit versão 1809 ou superior) / MAC: macOS Sequoia v15, Sonoma v14, Ventura v13 ou Monterey v12.'
                          : product.id === 'sketchup_2026_win'
                          ? 'WINDOWS: Windows 11 (64-bit) e Windows 10 (64-bit) / MAC: macOS Sequoia v15, Sonoma v14, Ventura v13 ou Monterey v12.'
                          : product.requirements.os)}
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <th className="py-3.5 px-4 font-bold text-slate-900 align-top">
                        {localize(t('spec_other'))}
                      </th>
                      <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                        {localize(t('spec_other_desc'))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Generic EAN13 and MPN as requested */}
              <div className="pt-2 space-y-1 text-xs text-slate-800">
                <p>
                  <strong className="font-extrabold">EAN13</strong>{localize(' ')}
                  {localize(product.ean13 || '8388917939753')}
                </p>
                <p>
                  <strong className="font-extrabold">MPN</strong>{localize(' ')}
                  {localize(product.mpn || '001N1-WW8644-T480')}
                </p>
              </div>
            </div>
          )}

          {/* ----------------------------------------------------------------- */}
          {/* TAB 3: ATIVAÇÃO                                                   */}
          {/* ----------------------------------------------------------------- */}
          <button type="button" aria-expanded={mobileInfoOpen === 'activation'} aria-controls="product-info-activation" onClick={() => setMobileInfoOpen(current => current === 'activation' ? null : 'activation')} className="sm:hidden flex w-full items-center gap-3 py-4 text-left text-sm font-bold border-b border-slate-200 text-slate-900"><FileCheck className="w-5 h-5 shrink-0"/><span className="flex-1">{localize(t('tab_activation'))}</span><ChevronRight className={`w-5 h-5 transition-transform ${mobileInfoOpen === 'activation' ? 'rotate-90' : ''}`}/></button>
          {(
            <div id="product-info-activation" className={`${mobileInfoOpen === 'activation' ? 'block py-5' : 'hidden'} ${activeTab === 'activation' ? 'sm:block' : 'sm:hidden'} sm:py-0 space-y-5 text-slate-800 text-sm leading-relaxed py-2`}>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-950">
                {localize(product.id === 'autodesk_all_apps'
                  ? 'Como acessar sua conta oficial da Autodesk em três passos simples'
                  : 'Como instalar e ativar seu software em três passos simples')}
              </h3>
              <p className="text-sm sm:text-base text-slate-700">
                {localize(product.id === 'autodesk_all_apps'
                  ? 'Adquirir o plano Pacote Autodesk 86+ Apps Originais na C2Shop garante acesso oficial a mais de 86 aplicativos. Você recebe suas credenciais exclusivas (login e senha) e acessa diretamente pelo portal oficial seguindo os passos abaixo:'
                  : 'Adquirir seu software na C2Tech oferece muito mais do que economia financeira; além de garantir a versão completa e vitalícia sem mensalidades, você realiza a instalação e ativação de forma rápida e guiada seguindo os passos abaixo:')}
              </p>

              {product.id === 'autodesk_all_apps' ? (
                <ol className="space-y-3 text-sm sm:text-base text-slate-800 pl-1">
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">1.</span>
                    <span>
                      <strong>{localize("Receba login e senha:")}</strong> {localize(" Assim que a compra é confirmada, você recebe imediatamente no seu e-mail e WhatsApp os dados de login e senha exclusivos da sua conta oficial da Autodesk.")}</span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">2.</span>
                    <span>
                      <strong>{localize("Acesse o portal oficial:")}</strong> {localize(" Entre diretamente no site oficial da Autodesk em ")}<strong>manage.autodesk.com</strong> {localize(" utilizando as credenciais recebidas.")}</span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">3.</span>
                    <span>
                      <strong>{localize("Instale e utilize todos os aplicativos:")}</strong> {localize(" Escolha qualquer um dos mais de 86 aplicativos Autodesk (AutoCAD, Revit, Maya, Inventor, 3ds Max, etc.) e instale diretamente no seu computador com todas as ferramentas e atualizações oficiais liberadas!")}</span>
                  </li>
                </ol>
              ) : (
                <ol className="space-y-3 text-sm sm:text-base text-slate-800 pl-1">
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">1.</span>
                    <span>
                      <strong>{localize("Compre")}</strong> {localize(" seu software na C2Tech e receba imediatamente no seu e-mail o link de acesso exclusivo ao Google Drive contendo o instalador completo e todos os arquivos necessários.")}</span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">2.</span>
                    <span>
                      <strong>{localize("Baixe")}</strong> {localize(" os arquivos para o seu computador e abra o")}{localize(' ')}
                      <strong>{localize("vídeo de instruções passo a passo")}</strong> {localize(" incluso na pasta, que mostra na tela exatamente como instalar o programa sem erros.")}</span>
                  </li>
                  <li className="flex items-baseline gap-2.5">
                    <span className="font-display font-extrabold text-base text-slate-950">3.</span>
                    <span>
                      <strong>{localize("Ative")}</strong> {localize(" sua licença vitalícia seguindo o vídeo tutorial para liberar todas as ferramentas permanentemente — e, caso precise de qualquer ajuda, nosso suporte técnico no WhatsApp está pronto para auxiliar você!")}</span>
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
                {localize(t('in_same_category'))}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollRelated('left')}
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  aria-label={localize("Anterior")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRelated('right')}
                  className="t-learn w-8 h-8 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
                  aria-label={localize("Próximo")}
                >
                  <LearnMoreChevron className="ml-0" size={16} />
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
                const relReviews = reviewsData[rel.id] || [];
                const relRating = relReviews.length ? relReviews.reduce((sum, review) => sum + review.rating, 0) / relReviews.length : 0;
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
                            src={galleryImageSource(rel.imageUrl)}
                            alt={rel.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full p-2 object-contain hover:scale-[1.03] transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-24 h-32 bg-slate-900 text-white rounded-lg p-2.5 flex flex-col justify-between text-left">
                            <span className="text-xs font-bold text-blue-400">
                              {localize(rel.compatibility)}
                            </span>
                            <span className="text-xs font-extrabold leading-tight line-clamp-2">
                              {localize(rel.name)}
                            </span>
                            <span className="text-xs text-emerald-400 font-bold uppercase">
                              {localize("Vitalício")}</span>
                          </div>
                        )}
                      </Link>

                      {relSavings > 0 && (
                        <span className="inline-block bg-[#18b259] text-white text-xs font-extrabold px-2 py-0.5 rounded mb-2">
                          {localize(t('save'))} {localize(formatPrice(relSavings))}
                        </span>
                      )}

                      <Link to={`/produto/${rel.slug}`}>
                        <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 hover:text-action-primary transition-colors line-clamp-2 min-h-[36px]">
                          {localize(rel.name)}
                        </h3>
                      </Link>

                      {relReviews.length > 0 && <div className="flex items-center gap-1 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-3 h-3 ${s <= Math.round(relRating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">
                          ({relReviews.length})
                        </span>
                      </div>}
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-black text-sm text-[#0b5ed7]">
                          {localize(formatPrice(rel.price))}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          {localize(formatPrice(rel.originalPrice))}
                        </span>
                      </div>

                      <Link
                        to={`/produto/${rel.slug}`}
                        className="t-learn flex items-center justify-center w-full py-2 text-center bg-blue-50 hover:bg-[#0b5ed7] text-[#0b5ed7] hover:text-white font-bold text-xs rounded-md transition-colors"
                      >
                        <span>{localize("Detalhes")}</span>
                        <LearnMoreChevron className="ml-1" size={14} />
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
            {localize(t('product_reviews_title'))} ({productReviews.length})
          </h2>

          {/* Top Summary & Progress Bar Box + 2 Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-6 border-b border-slate-200">
            {/* Average Score Box */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center p-5 border border-slate-200 rounded-xl bg-slate-50/50 text-center">
              <span className="text-xs text-slate-500 font-semibold">{localize(t('average_rating_label'))}</span>
              <span className="font-display font-black text-4xl sm:text-5xl text-slate-900 my-1">
                {localize(averageRating)}
              </span>
              <div className="flex items-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">
                ({productReviews.length} {localize(" avaliações)")}</span>
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
                  <span className="w-16 text-right text-xs text-slate-600 font-medium shrink-0">
                    {localize(row.label)}
                  </span>
                  <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                  <span className="w-6 text-left text-xs font-bold text-slate-700 shrink-0">
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
                <span>{localize(t('write_review_btn'))}</span>
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
                <span>{localize(t('ask_question_btn'))}</span>
              </button>
            </div>
          </div>

          {/* Filter Pills Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-md bg-amber-400 text-slate-950 font-bold text-xs shadow-2xs">
                {localize("Avaliações (")}{productReviews.length})
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuestionSentSuccess(false);
                  setIsQuestionModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {localize("Perguntas e Respostas")}</button>
            </div>

            <div className="text-xs text-slate-500 font-medium border border-slate-200 rounded-md px-3 py-1.5 bg-slate-50">
              {localize("Ordenar por: ")}<strong className="text-slate-800">{localize("Mais recentes")}</strong>
            </div>
          </div>

          {/* Customer Reviews List */}
          {(() => {
            const renderReview = (review: (typeof productReviews)[number], idx: number) => {
              const avatarColor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const initial = review.author.trim().charAt(0).toUpperCase();

              return (
                <div key={idx} className="py-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 flex-1">
                    {/* Colored circular initial avatar (no photo) */}
                    <div
                      className={`w-10 h-10 rounded-full font-display font-bold text-base flex items-center justify-center shrink-0 select-none shadow-xs ${avatarColor}`}
                    >
                      {localize(initial)}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-sm text-slate-900">
                            {localize(review.author)}
                          </span>
                          <ReviewFlagIcon country={review.country} />
                        </div>
                        <p className="text-xs font-bold text-emerald-600">
                          {localize(language === 'en' ? 'Verified purchase' : language === 'es' ? 'Compra verificada' : 'Compra verificada')}
                        </p>
                      </div>

                      <div className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1"><ReviewComment value={review.comment} country={review.country} /></div>
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
                    <span className="text-xs text-slate-400 font-medium">
                      {localize(review.date)}
                    </span>
                  </div>
                </div>
              );
            };
            const extra = productReviews.slice(REVIEWS_PREVIEW);
            return (
              <>
                <div className="divide-y divide-slate-200">
                  {productReviews.slice(0, REVIEWS_PREVIEW).map((r, i) => renderReview(r, i))}
                </div>
                {extra.length > 0 && (
                  <div className="t-acc" data-open={showAllReviews ? 'true' : 'false'}>
                    <div className="t-acc-panel" id="product-reviews-more" aria-hidden={!showAllReviews}>
                      <div className="t-acc-panel-inner">
                        <div className="divide-y divide-slate-200 border-t border-slate-200">
                          {extra.map((r, i) => renderReview(r, i + REVIEWS_PREVIEW))}
                        </div>
                      </div>
                    </div>
                    <ReviewsMoreButton
                      open={showAllReviews}
                      count={extra.length}
                      initials={extra.slice(0, 3).map((r) => r.author.trim().charAt(0).toUpperCase())}
                      onToggle={() => {
                const closing = showAllReviews;
                setShowAllReviews(!closing);
                if (closing) window.setTimeout(() => document.querySelector('.rv-more')?.scrollIntoView({ block: 'center', behavior: 'smooth' }), 60);
              }}
                    />
                  </div>
                )}
              </>
            );
          })()}
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
              aria-label={localize("Fechar")}
            >
              <X className="w-5 h-5" />
            </button>

            {questionSentSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  {localize("Pergunta enviada com sucesso!")}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {localize("Sua dúvida foi encaminhada diretamente para nossa equipe em")}{localize(' ')}
                  <strong>c2tech2025@gmail.com</strong>{localize(". Responderemos no seu e-mail o mais rápido possível!")}</p>
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-6 py-2.5 bg-action-primary hover:bg-action-primary-hover text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  {localize("Fechar janela")}</button>
              </div>
            ) : (
              <form onSubmit={handleQuestionSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    {localize("Faça uma pergunta")}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {localize("Tem alguma dúvida sobre o ")}<strong>{localize(product.name)}</strong>{localize("? Envie abaixo e responderemos diretamente no seu e-mail.")}</p>
                </div>

                {questionError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                    {localize(questionError)}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {localize("Seu nome *")}</label>
                  <input
                    type="text"
                    required
                    value={questionName}
                    onChange={(e) => setQuestionName(e.target.value)}
                    placeholder={localize("Ex: João Silva")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {localize("Seu e-mail *")}</label>
                  <input
                    type="email"
                    required
                    value={questionEmail}
                    onChange={(e) => setQuestionEmail(e.target.value)}
                    placeholder={localize("seuemail@exemplo.com")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {localize("WhatsApp (opcional)")}</label>
                  <input
                    type="tel"
                    value={questionPhone}
                    onChange={(e) => setQuestionPhone(e.target.value)}
                    placeholder="(11) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {localize("Sua pergunta *")}</label>
                  <textarea
                    rows={4}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder={localize("Digite sua dúvida sobre instalação, compatibilidade ou funcionamento...")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary resize-none"
                  />
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsQuestionModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    {localize("Cancelar")}</button>
                  <button
                    type="submit"
                    disabled={isSendingQuestion}
                    className="px-5 py-2.5 rounded-lg bg-[#0b5ed7] hover:bg-[#0a53be] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    <CloudDownload className="w-3.5 h-3.5" />
                    <span>{localize(isSendingQuestion ? 'Enviando...' : 'Enviar pergunta')}</span>
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
              aria-label={localize("Fechar")}
            >
              <X className="w-5 h-5" />
            </button>

            {fakeReviewSubmitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  {localize("Avaliação recebida para moderação!")}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {localize("Obrigado pelo seu feedback! Após a validação do número do pedido em nosso sistema, sua avaliação será publicada nesta página.")}</p>
                <button
                  type="button"
                  onClick={() => setIsFakeReviewModalOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  {localize("Concluir")}</button>
              </div>
            ) : (
              <form onSubmit={handleFakeReviewSubmit} className="space-y-4 text-left">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-slate-900">
                    {localize("Escreva sua avaliação")}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {localize("Compartilhe sua experiência com o ")}<strong>{localize(product.name)}</strong>.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {localize("Sua nota *")}</label>
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
                    {localize("Seu nome *")}</label>
                  <input
                    type="text"
                    required
                    value={fakeReviewName}
                    onChange={(e) => setFakeReviewName(e.target.value)}
                    placeholder={localize("Seu nome completo")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {localize("Seu comentário *")}</label>
                  <textarea
                    rows={3}
                    required
                    value={fakeReviewComment}
                    onChange={(e) => setFakeReviewComment(e.target.value)}
                    placeholder={localize("Conte como foi a entrega e instalação do software...")}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm sm:text-base focus:outline-none focus:border-action-primary resize-none"
                  />
                </div>

                <div className="pt-1 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFakeReviewModalOpen(false)}
                    className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    {localize("Cancelar")}</button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                  >
                    {localize("Enviar avaliação")}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <TrustGuaranteesModal isOpen={isGuaranteesModalOpen} onClose={() => setIsGuaranteesModalOpen(false)} />



      {/* Sticky Mobile Purchase Bar (Optimized for iPhone / Mobile) */}
      <div className="product-mobile-buybar fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate leading-tight">
            {localize(product.name)}
          </p>
          <div className="flex items-baseline gap-1.5 mt-0.5">
            <AnimatedPrice
              value={displayPrice}
              formatted={localize(formattedPrice)}
              className="font-black text-base text-action-primary leading-none"
              announce
            />
            {displayOriginalPrice > displayPrice && (
              <AnimatedPrice
                value={displayOriginalPrice}
                formatted={localize(formattedOriginalPrice)}
                className="text-xs text-slate-400 line-through"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product, selectedLicenseOption ? 'avulso' : selectedPlan, selectedLicenseOption, quantity);
            setIsCartOpen(false);
            navigate('/checkout');
          }}
          className="shrink-0 bg-feedback-success hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{localize(isInternational ? t('buy_now') : 'Comprar')}</span>
        </button>
      </div>
    </div>
  );
};

// A route change creates fresh product state in one render.
export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <ProductDetailContent key={slug} />;
};
