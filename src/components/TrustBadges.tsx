import { useText } from '../hooks/useText';
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  CircleCheck,
  X,
  Lock,
  Search,
  ThumbsUp,
  MapPin,
  ShieldCheck,
  CornerDownRight,
  Clock,
  Check,
  ChevronDown,
} from 'lucide-react';
import {
  TRUSTPILOT_REVIEW_BASE_DAYS,
  formatTrustpilotDaysAgo,
  formatTrustpilotReviewCount,
  getTrustpilotReviewsLabel,
} from '../utils/trustpilotMetrics';

// Official Trustpilot Two-Tone Star (Authentic Star Logo)
export const TrustpilotStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img
    src="/images/trustpilot-star.png"
    alt="Trustpilot"
    className={`trust-logo-star inline-block object-contain shrink-0 select-none transition-transform duration-200 ${className}`}
    loading="eager"
  />
);

// Trustpilot Logo: Star Icon + "Trustpilot" typography
export const TrustpilotLogo: React.FC<{ starSize?: string; textSize?: string; className?: string }> = ({
  starSize = 'w-5 h-5',
  textSize = 'text-base',
  className = ''
}) => (
  <div className={`trust-logo inline-flex items-center gap-1.5 select-none ${className}`}>
    <TrustpilotStarIcon className={starSize} />
    <span style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} className={`font-normal tracking-[-0.3px] text-[#191919] ${textSize}`}>
      Trustpilot
    </span>
  </div>
);

// Trustpilot Review Squares:
export const TrustpilotStars: React.FC<{
  count?: number;
  size?: string;
  starSize?: string;
  className?: string;
}> = ({
  count = 5,
  size = 'w-5 h-5',
  className = ''
}) => {
  const isFourStar = count === 4;

  return (
    <div className={`trust-stars-group inline-flex shrink-0 items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= count;
        const color = isActive ? (isFourStar ? '#73cf42' : '#00b67a') : '#dcdce6';
        return (
          <svg
            key={star}
            viewBox="0 0 32 32"
            role="img"
            aria-label={isActive ? `${count} estrelas` : 'estrela vazia'}
            data-active={isActive ? 'true' : 'false'}
            className={`trust-star-box ${size} shrink-0 select-none`}
          >
            <rect width="32" height="32" fill={color} />
            <path d="m16 5 2.7 8.3h8.7l-7.1 5.1 2.7 8.3-7-5.1-7 5.1 2.7-8.3-7.1-5.1h8.7Z" fill="#fff" />
            <path d="m16 21.6 5.1-1.3-.8-1.9Z" fill={color} />
          </svg>
        );
      })}
    </div>
  );
};

// Horizontal Trustpilot Rating Badge for Page Headers
export const TrustpilotRatingHorizontal: React.FC<{
  onOpenModal?: () => void;
  className?: string;
  compact?: boolean;
}> = ({ onOpenModal, className = '', compact = false }) => {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onOpenModal}
      className={`trust-rating group flex w-full items-center justify-center py-2 text-sm text-slate-800 cursor-pointer sm:w-auto sm:justify-start ${compact ? 'flex-nowrap gap-2 whitespace-nowrap' : 'flex-wrap gap-3'} ${className}`}
      title={t('trustpilot_reviews_modal_title')}
    >
      {!compact && <span className="hidden lg:inline text-slate-600 transition-colors duration-200 group-hover:text-slate-900">{t('trustpilot_what_customers_say')}</span>}
      <span className="hidden sm:inline font-semibold transition-colors duration-200 group-hover:text-black">{t('trustpilot_excellent')}</span>
      <TrustpilotStars count={5} size={compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} />
      <span className="hidden sm:inline text-slate-600 text-xs">{!compact && <>4.8 {t('trustpilot_score_based_on')} </>}<span className="trust-reviews-count underline underline-offset-2">{t('trustpilot_reviews_count')}</span></span>
      <TrustpilotLogo starSize="w-5 h-5" textSize="text-sm" />
    </button>
  );
};

// Trust Guarantees Badges Balloon (Uso Vitalício • Ativação Garantida • Entrega Digital)
export const TrustGuaranteesPill: React.FC<{
  onOpenModal?: () => void;
  className?: string;
}> = ({ onOpenModal, className = '' }) => {
  const { t } = useLanguage();
  return (
    <div
      onClick={onOpenModal}
      className={`trust-benefits inline-flex flex-col sm:flex-row items-start sm:items-center bg-slate-50/80 rounded-2xl px-4 py-3 shadow-sm transition-all cursor-pointer group gap-3 sm:gap-3.5 ${className}`}
      title="Ver garantias de compra segura"
    >
      {/* Uso Vitalício */}
      <div className="flex items-center gap-2 sm:gap-2.5 sm:pr-3.5 lg:pr-4.5 sm:border-r border-slate-200">
        <img
          src="/images/icons/badge-seal.png"
          alt={t('badge_lifetime')}
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 select-none group-hover:scale-105 transition-transform"
          loading="eager"
        />
        <div>
          <p className="text-xs sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_lifetime')}</p>
          <p className="text-xs sm:text-xs text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
            {t('badge_lifetime_sub')}
          </p>
        </div>
      </div>

      {/* Ativação Garantida */}
      <div className="flex items-center gap-2 sm:gap-2.5 sm:pr-3.5 lg:pr-4.5 sm:border-r border-slate-200">
        <img
          src="/images/icons/badge-shield.png"
          alt={t('badge_guaranteed')}
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 select-none group-hover:scale-105 transition-transform"
          loading="eager"
        />
        <div>
          <p className="text-xs sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_guaranteed')}</p>
          <p className="text-xs sm:text-xs text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
            {t('badge_guaranteed_sub')}
          </p>
        </div>
      </div>

      {/* Entrega Digital */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        <img
          src="/images/icons/badge-plane.png"
          alt={t('badge_digital_delivery')}
          className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 select-none group-hover:scale-105 transition-transform"
          loading="eager"
        />
        <div>
          <p className="text-xs sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_digital_delivery')}</p>
          <p className="text-xs sm:text-xs text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
            {t('badge_digital_delivery_sub')}
          </p>
        </div>
      </div>
    </div>
  );
};

// Trustpilot Company Profile Mini-Visualizer Modal
export const TrustGuaranteesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const text = useText();
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [onlyWithReply, setOnlyWithReply] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});

  React.useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll<HTMLElement>('.trust-reviews-modal button, .trust-reviews-modal input, .trust-reviews-modal a[href]'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.querySelector<HTMLButtonElement>('.trust-reviews-modal button')?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  const trustpilotReviews = useMemo(
    () => [
      {
        id: 1,
        author: 'Carlos Eduardo M.',
        initials: 'CE',
        avatarBg: '#fde8d7',
        avatarText: '#431407',
        authorReviewsCount: 3,
        countryCode: language === 'en' ? 'US' : language === 'es' ? 'ES' : 'BR',
        location: language === 'en' ? 'New York, US' : language === 'es' ? 'Madrid, ES' : 'São Paulo, SP',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[1], language),
        title:
          language === 'en'
            ? 'Delivery in under 2 minutes and very detailed video tutorial'
            : language === 'es'
              ? 'Entrega en menos de 2 minutos y video bien detallado'
              : 'Entrega em menos de 2 minutos e vídeo bem detalhado',
        comment:
          language === 'en'
            ? 'Paid instantly and the Google Drive download link arrived in my email right away. The step-by-step video tutorial explains everything clearly without any hassle. Already using it at work.'
            : language === 'es'
              ? 'Pagué con tarjeta y el enlace de Google Drive llegó al correo al instante. El tutorial en video enseña todo paso a paso sin complicaciones. Ya lo estoy usando en mi trabajo.'
              : 'Paguei pelo Pix e o link do Google Drive chegou no e-mail na mesma hora. O tutorial em vídeo ensina tudo passo a passo sem complicação. Já estou usando no meu trabalho.',
        rating: 4,
        productTag: 'AutoCAD + Pacote Engenharia',
        baseHelpful: 14,
        reply:
          language === 'en'
            ? 'Thank you for your feedback, Carlos! Count on our technical support team whenever you need.'
            : language === 'es'
              ? '¡Muchas gracias por tu comentario, Carlos! Cuenta con nuestro soporte técnico siempre que lo necesites.'
              : 'Muito obrigado pela avaliação, Carlos! Ficamos felizes que o vídeo passo a passo tenha facilitado sua instalação. Conte sempre com nosso suporte!',
      },
      {
        id: 2,
        author: 'Fernanda S. Oliveira',
        initials: 'FO',
        avatarBg: '#d8f6e8',
        avatarText: '#005138',
        authorReviewsCount: 5,
        countryCode: language === 'en' ? 'US' : language === 'es' ? 'MX' : 'BR',
        location: language === 'en' ? 'Miami, US' : language === 'es' ? 'Ciudad de México, MX' : 'Belo Horizonte, MG',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[2], language),
        title:
          language === 'en'
            ? 'Outstanding value for money and 10/10 support'
            : language === 'es'
              ? 'Excelente relación calidad-precio y soporte de 10'
              : 'Excelente custo-benefício e suporte nota 10',
        comment:
          language === 'en'
            ? 'This is the second software I bought from them. I had a quick question during installation on my Mac and support answered in under 5 minutes on WhatsApp. Running smoothly without monthly fees!'
            : language === 'es'
              ? 'Es el segundo software que les compro. Tuve una duda en la instalación en mi Mac y el soporte respondió en menos de 5 minutos por WhatsApp. ¡Funcionando de maravilla sin mensualidades!'
              : 'É o segundo software que compro com eles. Tive uma dúvida na instalação no meu Mac e o suporte respondeu em menos de 5 minutos pelo WhatsApp. Funcionando liso sem mensalidade!',
        rating: 5,
        productTag: 'SketchUp Pro + V-Ray (macOS)',
        baseHelpful: 21,
        reply:
          language === 'en'
            ? 'Welcome back, Fernanda! It is always a pleasure helping you set up your Mac workstation.'
            : language === 'es'
              ? '¡Qué alegría tenerte de vuelta, Fernanda! Estamos siempre a disposición en WhatsApp.'
              : 'Que alegria ter você de volta na C2Tech, Fernanda! Nossa equipe de suporte para Mac está sempre à disposição no WhatsApp.',
      },
      {
        id: 3,
        author: 'Roberto Almeida Jr.',
        initials: 'RA',
        avatarBg: '#e3ebff',
        avatarText: '#1e3a8a',
        authorReviewsCount: 2,
        countryCode: language === 'en' ? 'GB' : language === 'es' ? 'AR' : 'BR',
        location: language === 'en' ? 'London, UK' : language === 'es' ? 'Buenos Aires, AR' : 'Curitiba, PR',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[3], language),
        title:
          language === 'en'
            ? 'The most reliable digital license store'
            : language === 'es'
              ? 'La mejor tienda de licencias digitales'
              : 'Melhor loja de licenças digitais do Brasil',
        comment:
          language === 'en'
            ? 'Complete software with all features unlocked and zero lag. Very transparent service, I recommend it with total confidence to all architects and engineers.'
            : language === 'es'
              ? 'Software completo, con todas las funciones desbloqueadas y sin bloqueos. Muy transparente, lo recomiendo con total confianza a todos los arquitectos e ingenieros.'
              : 'Software completo, com todas as funções desbloqueadas e sem travamento. Muito transparente, recomendo de olhos fechados a todos os arquitetos e engenheiros.',
        rating: 5,
        productTag: 'Revit + Lumion Pro',
        baseHelpful: 18,
      },
      {
        id: 4,
        author: 'Juliana Costa',
        initials: 'JC',
        avatarBg: '#f3e8ff',
        avatarText: '#581c87',
        authorReviewsCount: 1,
        countryCode: language === 'es' ? 'CL' : 'BR',
        location: language === 'es' ? 'Santiago, CL' : 'Rio de Janeiro, RJ',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[4], language),
        title:
          language === 'en'
            ? 'Flawless lifetime activation'
            : language === 'es'
              ? 'Activación de por vida perfecta'
              : 'Ativação vitalícia perfeita',
        comment:
          language === 'en'
            ? 'I was tired of paying expensive monthly subscriptions. Bought it to test and it exceeded my expectations. Clean installer, fast download and lifetime access.'
            : language === 'es'
              ? 'Estaba cansada de pagar suscripciones costosas cada mes. Compré para probar y superó mis expectativas. Archivo limpio, rápido y de por vida.'
              : 'Estava cansada de pagar mensalidade cara todo mês. Comprei para testar e superou minhas expectativas. Arquivo limpo, rápido e vitalício.',
        rating: 5,
        productTag: 'Pacote Adobe Creative Cloud',
        baseHelpful: 12,
        reply:
          language === 'en'
            ? 'Thank you for trusting C2Tech, Juliana! Enjoy your lifetime tools.'
            : language === 'es'
              ? '¡Gracias por confiar en C2Tech, Juliana! Que disfrutes mucho tus programas.'
              : 'Muito obrigado pela confiança, Juliana! Economia e estabilidade no trabalho fazem toda a diferença.',
      },
      {
        id: 5,
        author: 'Marcos Vinícius T.',
        initials: 'MV',
        avatarBg: '#fef3c7',
        avatarText: '#78350f',
        authorReviewsCount: 4,
        countryCode: language === 'es' ? 'PE' : 'BR',
        location: language === 'es' ? 'Lima, PE' : 'Porto Alegre, RS',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[5], language),
        title:
          language === 'en'
            ? 'Total trust and fast support'
            : language === 'es'
              ? 'Confianza total y soporte rápido'
              : 'Confiança total e suporte rápido',
        comment:
          language === 'en'
            ? 'Bought the complete bundle. The team was super polite and attentive. Top marks!'
            : language === 'es'
              ? 'Compré el paquete completo. El equipo fue super amable y atento. ¡Nota máxima!'
              : 'Comprei o pacote completo. A equipe foi super educada e atenciosa. Nota máxima!',
        rating: 5,
        productTag: 'Promob Plus Enterprise',
        baseHelpful: 9,
      },
      {
        id: 6,
        author: 'Henrique B. Vasconcelos',
        initials: 'HV',
        avatarBg: '#d8f6e8',
        avatarText: '#005138',
        authorReviewsCount: 6,
        countryCode: 'BR',
        location: 'Florianópolis, SC',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[6], language),
        title:
          language === 'en'
            ? 'Remote installation support saved my deadline'
            : language === 'es'
              ? 'El soporte de instalación salvó mi entrega'
              : 'Atendimento impecável e licença funcionando 100%',
        comment:
          language === 'en'
            ? 'Installed Eberick and TQS on Windows 11 without any issues. The step-by-step video is crystal clear and the license is truly permanent.'
            : language === 'es'
              ? 'Instalé el software en Windows 11 sin ningún problema. El video paso a paso es clarísimo y la licencia es realmente permanente.'
              : 'Instalei no Windows 11 sem nenhum erro. O vídeo explicativo mostra cada detalhe e a ativação ficou permanente de primeira.',
        rating: 5,
        productTag: 'AltoQi Eberick + Builder',
        baseHelpful: 15,
      },
      {
        id: 7,
        author: 'Patrícia Mendonça',
        initials: 'PM',
        avatarBg: '#fde8d7',
        avatarText: '#431407',
        authorReviewsCount: 2,
        countryCode: 'BR',
        location: 'Campinas, SP',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[7], language),
        title:
          language === 'en'
            ? 'Super fast delivery via Google Drive'
            : language === 'es'
              ? 'Descarga súper rápida por Google Drive'
              : 'Download rápido pelo Google Drive e suporte no WhatsApp',
        comment:
          language === 'en'
            ? 'Downloaded at full speed from Google Drive. Everything organized in folders with the video tutorial included. Highly recommended!'
            : language === 'es'
              ? 'Descargué a máxima velocidad desde Google Drive. Todo organizado en carpetas con el tutorial incluido. ¡Recomendadísimo!'
              : 'Baixei na velocidade máxima pelo Google Drive. Tudo organizado em pastas com o vídeo tutorial junto. Recomendo demais!',
        rating: 5,
        productTag: 'CorelDRAW Graphics Suite',
        baseHelpful: 11,
      },
      {
        id: 8,
        author: 'Leonardo G. Farias',
        initials: 'LF',
        avatarBg: '#e3ebff',
        avatarText: '#1e3a8a',
        authorReviewsCount: 3,
        countryCode: 'BR',
        location: 'Brasília, DF',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[8], language),
        title:
          language === 'en'
            ? 'Best investment for our architecture studio'
            : language === 'es'
              ? 'La mejor inversión para nuestro estudio'
              : 'Melhor investimento para o nosso escritório de arquitetura',
        comment:
          language === 'en'
            ? 'Equipped 3 workstations in our studio. Everything works offline and online with zero subscription headaches.'
            : language === 'es'
              ? 'Equipamos 3 computadoras en nuestro estudio. Todo funciona perfecto sin dolores de cabeza con suscripciones.'
              : 'Equipamos 3 máquinas aqui do escritório. Tudo rodando perfeitamente e com garantia real de funcionamento.',
        rating: 5,
        productTag: 'Archicad + Enscape 3D',
        baseHelpful: 19,
        reply:
          language === 'en'
            ? 'Thank you for partnering with C2Tech for your studio, Leonardo!'
            : language === 'es'
              ? '¡Gracias por elegir a C2Tech para tu estudio, Leonardo!'
              : 'Agradecemos a parceria de todo o escritório, Leonardo! Contem sempre com a C2Tech.',
      },
    ],
    [language]
  );

  if (!isOpen) return null;

  const formattedTotalCount = formatTrustpilotReviewCount(language);
  const totalReviewsLabel = getTrustpilotReviewsLabel(language);

  const starDistribution = [
    { stars: 5, percent: 91, color: '#00b67a', label: language === 'en' ? '5-star' : language === 'es' ? '5 estrellas' : '5 estrelas' },
    { stars: 4, percent: 8, color: '#73cf42', label: language === 'en' ? '4-star' : language === 'es' ? '4 estrellas' : '4 estrelas' },
    { stars: 3, percent: 1, color: '#ffce00', label: language === 'en' ? '3-star' : language === 'es' ? '3 estrellas' : '3 estrelas' },
    { stars: 2, percent: 0, color: '#ff8622', label: language === 'en' ? '2-star' : language === 'es' ? '2 estrellas' : '2 estrelas' },
    { stars: 1, percent: 0, color: '#ff3722', label: language === 'en' ? '1-star' : language === 'es' ? '1 estrella' : '1 estrela' },
  ];

  const filteredReviews = trustpilotReviews.filter((rev) => {
    if (selectedStarFilter !== null && rev.rating !== selectedStarFilter) return false;
    if (onlyWithReply && !rev.reply) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rev.author.toLowerCase().includes(q) ||
        rev.title.toLowerCase().includes(q) ||
        rev.comment.toLowerCase().includes(q) ||
        rev.productTag.toLowerCase().includes(q) ||
        rev.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const visibleReviews =
    showAllReviews || selectedStarFilter !== null || onlyWithReply || searchQuery.trim()
      ? filteredReviews
      : filteredReviews.slice(0, 5);

  const toggleHelpful = (id: number) => {
    setHelpfulVotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/65 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Perfil Verificado Trustpilot — C2Tech"
        className="trust-reviews-modal relative w-full max-w-5xl max-h-[93dvh] bg-[#f7f7f2] rounded-2xl shadow-2xl border border-[#d6d6ce] overflow-hidden flex flex-col animate-scale-up text-[#191919]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Authentic Trustpilot Top Navigation Bar (#1c1c1c) */}
        <div className="bg-[#1c1c1c] text-white px-4 sm:px-6 py-3 flex items-center justify-between gap-3 shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="inline-flex items-center gap-1.5 shrink-0">
              <TrustpilotStarIcon className="w-6 h-6" />
              <span className="font-bold text-[19px] tracking-[-0.4px] text-white">Trustpilot</span>
            </div>

            <span className="hidden md:inline-block h-4 w-px bg-white/20" />

            <div className="hidden md:flex items-center gap-1.5 text-[12px] text-white/75 truncate">
              <span>{language === 'en' ? 'Categories' : language === 'es' ? 'Categorías' : 'Categorias'}</span>
              <span className="text-white/40">›</span>
              <span>{language === 'en' ? 'Software Store' : language === 'es' ? 'Tienda de Software' : 'Loja de Software'}</span>
              <span className="text-white/40">›</span>
              <span className="text-white font-semibold">C2Tech Licenças Digitais</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center gap-1.5 bg-[#00b67a]/20 border border-[#00b67a]/40 text-[#38f2b2] px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00b67a] shrink-0" />
              <span>
                {language === 'en'
                  ? 'Official Verified Profile'
                  : language === 'es'
                    ? 'Perfil Oficial Verificado'
                    : 'Perfil Oficial Verificado'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white/85 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Scrollable Authentic Profile View */}
        <div className="flex-1 overflow-y-auto">
          {/* Company Profile Hero Banner (White surface like Trustpilot Business Header) */}
          <div className="bg-white border-b border-[#e5e5dd] px-4 sm:px-7 py-5">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              {/* Left: Company Identity & TrustScore */}
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src="/images/brand/c2-logo.png"
                  alt="C2Tech"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain shrink-0 select-none"
                />

                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-[#d8f6e8] text-[#005138] border border-[#9ce6c6] px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide">
                      <Check className="w-3 h-3 stroke-[3]" />
                      {language === 'en' ? 'VERIFIED COMPANY' : language === 'es' ? 'EMPRESA VERIFICADA' : 'EMPRESA VERIFICADA'}
                    </span>
                    <span className="text-[12px] text-[#545454] font-medium">
                      {language === 'en'
                        ? '#1 in Professional Digital Licenses'
                        : language === 'es'
                          ? 'Nº 1 en Licencias Digitales Profesionales'
                          : 'Nº 1 em Licenças Digitais Profissionais'}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-[#191919] tracking-tight leading-tight">
                    C2Tech — Licenças Digitais
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-0.5">
                    <span className="text-[13px] text-[#545454]">
                      {language === 'en' ? 'Reviews' : language === 'es' ? 'Opiniones' : 'Avaliações'}{' '}
                      <strong className="text-[#191919] font-bold">{formattedTotalCount}</strong>
                    </span>
                    <span className="text-[#c8c8be]">•</span>
                    <span className="text-[14px] font-bold text-[#191919]">{t('trustpilot_excellent')}</span>
                    <TrustpilotStars count={5} size="w-6 h-6" />
                    <span className="inline-flex items-center justify-center bg-[#191919] text-white text-[12px] font-bold px-2 py-0.5 rounded">
                      4.8
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Verified Store Guarantees Card (Trustpilot right-hand box style) */}
              <div className="bg-[#fcfbf7] border border-[#e5e5dd] rounded-xl p-3.5 sm:p-4 lg:w-[360px] shrink-0 space-y-2.5">
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#ecece4]">
                  <div className="flex items-center gap-2 min-w-0">
                    <CircleCheck className="w-4 h-4 fill-[#00b67a] text-white shrink-0" />
                    <span className="text-[13px] font-bold text-[#191919] truncate">c2tech.shop</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#006b47] bg-[#d8f6e8] px-2 py-0.5 rounded">
                    {language === 'en' ? 'Verified Domain' : language === 'es' ? 'Dominio Verificado' : 'Domínio Verificado'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-1.5 text-[12px] text-[#191919]">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00b67a] stroke-[2.75] shrink-0" />
                    <span>
                      <strong>{t('badge_lifetime')}:</strong>{' '}
                      <span className="text-[#545454]">
                        {text('Pagamento único, sem mensalidades')}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00b67a] stroke-[2.75] shrink-0" />
                    <span>
                      <strong>{language === 'en' ? 'Instant Delivery' : language === 'es' ? 'Envío Inmediato' : 'Envio Imediato'}:</strong>{' '}
                      <span className="text-[#545454]">
                        {text('Link Google Drive + vídeo em 2 min')}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#00b67a] stroke-[2.75] shrink-0" />
                    <span>
                      <strong>{language === 'en' ? '7-Day Guarantee' : language === 'es' ? '7 Días de Garantía' : '7 Dias de Garantia'}:</strong>{' '}
                      <span className="text-[#545454]">
                        {text('Suporte remoto ou 100% de reembolso')}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Main Two-Column Trustpilot Profile Layout */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-[290px_minmax(0,1fr)] gap-5 items-start">
            {/* Left Sidebar: Rating Distribution & Transparency */}
            <div className="space-y-4 lg:sticky lg:top-4">
              {/* Star Breakdown Card */}
              <div className="bg-white border border-[#e5e5dd] rounded-xl p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#191919]">
                      {language === 'en' ? 'Customer reviews' : language === 'es' ? 'Opiniones de clientes' : 'Avaliações dos clientes'}
                    </h3>
                    <p className="text-[12px] text-[#545454] mt-0.5">
                      {totalReviewsLabel} {language === 'en' ? 'in total' : 'no total'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#f7f7f2] border border-[#e5e5dd] px-2.5 py-1 rounded-lg">
                    <TrustpilotStarIcon className="w-4 h-4" />
                    <span className="text-[15px] font-bold text-[#191919]">4.8</span>
                    <span className="text-[11px] text-[#545454]">/ 5</span>
                  </div>
                </div>

                {/* 5-star to 1-star interactive bars */}
                <div className="space-y-2 pt-1">
                  {starDistribution.map((row) => {
                    const isSelected = selectedStarFilter === row.stars;
                    const isClickable = row.stars >= 4;
                    return (
                      <button
                        key={row.stars}
                        type="button"
                        disabled={!isClickable}
                        onClick={() =>
                          setSelectedStarFilter((prev) => (prev === row.stars ? null : row.stars))
                        }
                        className={`w-full flex items-center gap-2.5 text-left py-1 px-1.5 rounded-lg transition-colors ${
                          isClickable
                            ? 'cursor-pointer hover:bg-[#f7f7f2]'
                            : 'opacity-65 cursor-default'
                        } ${isSelected ? 'bg-[#eefbf5] ring-1 ring-[#00b67a]' : ''}`}
                      >
                        <span
                          className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#00b67a] border-[#00b67a] text-white'
                              : 'border-[#8c8c8c] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span className="text-[12px] font-medium text-[#191919] w-[62px] shrink-0">
                          {row.label}
                        </span>
                        <div className="flex-1 h-2.5 bg-[#ecece4] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.max(row.percent, row.percent > 0 ? 4 : 0)}%`,
                              backgroundColor: row.color,
                            }}
                          />
                        </div>
                        <span className="text-[12px] font-semibold text-[#545454] w-9 text-right shrink-0">
                          {row.percent === 0 ? '<1%' : `${row.percent}%`}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {selectedStarFilter !== null && (
                  <button
                    type="button"
                    onClick={() => setSelectedStarFilter(null)}
                    className="w-full text-center text-[12px] font-bold text-[#006b47] hover:underline pt-1 cursor-pointer"
                  >
                    {language === 'en' ? 'Show all ratings' : language === 'es' ? 'Mostrar todas las calificaciones' : 'Mostrar todas as notas'}
                  </button>
                )}
              </div>

              {/* Company Transparency Card */}
              <div className="bg-white border border-[#e5e5dd] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#f0f0ea] pb-2.5">
                  <h4 className="text-[14px] font-bold text-[#191919]">
                    {language === 'en' ? 'Company activity' : language === 'es' ? 'Actividad de la empresa' : 'Transparência da empresa'}
                  </h4>
                  <span className="text-[11px] font-bold text-[#006b47] bg-[#d8f6e8] px-2 py-0.5 rounded">
                    100% Auditado
                  </span>
                </div>

                <ul className="space-y-2.5 text-[12px] text-[#333333]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00b67a] shrink-0 mt-0.5" />
                    <span>
                      {text('Convites automáticos enviados após cada pedido confirmado')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#00b67a] shrink-0 mt-0.5" />
                    <span>
                      {text('Responde a 99% das avaliações (tempo médio < 15 min)')}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#00b67a] shrink-0 mt-0.5" />
                    <span>
                      {text('Identidade empresarial, CNPJ e suporte WhatsApp verificados')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Main Column: Search/Filter Bar + Authentic Review Cards */}
            <div className="space-y-3.5 min-w-0">
              {/* Filter & Search Bar */}
              <div className="bg-white border border-[#e5e5dd] rounded-xl p-3.5 space-y-3">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#696969] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        language === 'en'
                          ? 'Search reviews (e.g. Mac, WhatsApp, AutoCAD, Google Drive)...'
                          : language === 'es'
                            ? 'Buscar en las opiniones (ej: Mac, WhatsApp, AutoCAD)...'
                            : 'Buscar nas avaliações (ex: Pix, Mac, WhatsApp, AutoCAD)...'
                      }
                      className="w-full pl-9 pr-8 py-2 bg-[#f7f7f2] border border-[#d6d6ce] rounded-lg text-[13px] text-[#191919] placeholder:text-[#696969] focus:outline-none focus:border-[#00b67a] focus:bg-white transition-colors"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#696969] hover:text-[#191919] cursor-pointer"
                        aria-label="Limpar busca"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStarFilter(null);
                      setOnlyWithReply(false);
                    }}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold border transition-colors cursor-pointer ${
                      selectedStarFilter === null && !onlyWithReply
                        ? 'bg-[#191919] text-white border-[#191919]'
                        : 'bg-white text-[#191919] border-[#d6d6ce] hover:bg-[#f2f2ec]'
                    }`}
                  >
                    {language === 'en' ? `All (${formattedTotalCount})` : language === 'es' ? `Todas (${formattedTotalCount})` : `Todas (${formattedTotalCount})`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStarFilter((prev) => (prev === 5 ? null : 5))}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold border transition-colors cursor-pointer ${
                      selectedStarFilter === 5
                        ? 'bg-[#00b67a] text-white border-[#00b67a]'
                        : 'bg-white text-[#191919] border-[#d6d6ce] hover:bg-[#f2f2ec]'
                    }`}
                  >
                    ★ 5 {language === 'en' ? 'stars' : language === 'es' ? 'estrellas' : 'estrelas'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedStarFilter((prev) => (prev === 4 ? null : 4))}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold border transition-colors cursor-pointer ${
                      selectedStarFilter === 4
                        ? 'bg-[#73cf42] text-[#191919] border-[#73cf42]'
                        : 'bg-white text-[#191919] border-[#d6d6ce] hover:bg-[#f2f2ec]'
                    }`}
                  >
                    ★ 4 {language === 'en' ? 'stars' : language === 'es' ? 'estrellas' : 'estrelas'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOnlyWithReply((prev) => !prev)}
                    className={`px-3 py-1 rounded-full text-[12px] font-semibold border transition-colors cursor-pointer ${
                      onlyWithReply
                        ? 'bg-[#191919] text-white border-[#191919]'
                        : 'bg-white text-[#191919] border-[#d6d6ce] hover:bg-[#f2f2ec]'
                    }`}
                  >
                    {language === 'en' ? 'With store reply' : language === 'es' ? 'Con respuesta' : 'Com resposta da loja'}
                  </button>
                </div>
              </div>

              {/* Reviews Feed */}
              {visibleReviews.length === 0 ? (
                <div className="bg-white border border-[#e5e5dd] rounded-xl p-8 text-center space-y-2">
                  <p className="text-[14px] font-bold text-[#191919]">
                    {language === 'en'
                      ? 'No reviews matched your filter'
                      : language === 'es'
                        ? 'Ninguna opinión coincide con tu filtro'
                        : 'Nenhuma avaliação encontrada para este filtro'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStarFilter(null);
                      setOnlyWithReply(false);
                      setSearchQuery('');
                    }}
                    className="text-[13px] font-bold text-[#006b47] underline cursor-pointer"
                  >
                    {language === 'en' ? 'Clear filters' : language === 'es' ? 'Limpiar filtros' : 'Limpar filtros'}
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {visibleReviews.map((rev) => {
                    const isHelpful = !!helpfulVotes[rev.id];
                    const helpfulCount = rev.baseHelpful + (isHelpful ? 1 : 0);

                    return (
                      <article
                        key={rev.id}
                        className="bg-white border border-[#e5e5dd] hover:border-[#c8c8be] rounded-xl p-4 sm:p-5 transition-all text-left"
                      >
                        {/* Top Reviewer Header (Authentic Trustpilot Consumer Header) */}
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="w-10 h-10 rounded-full font-bold text-[14px] flex items-center justify-center shrink-0 select-none"
                              style={{ backgroundColor: rev.avatarBg, color: rev.avatarText }}
                            >
                              {rev.initials}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[14px] font-bold text-[#191919] truncate">
                                {rev.author}
                              </p>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-[#696969] mt-0.5">
                                <span>
                                  {rev.authorReviewsCount}{' '}
                                  {rev.authorReviewsCount === 1
                                    ? language === 'en'
                                      ? 'review'
                                      : language === 'es'
                                        ? 'opinión'
                                        : 'avaliação'
                                    : language === 'en'
                                      ? 'reviews'
                                      : language === 'es'
                                        ? 'opiniones'
                                        : 'avaliações'}
                                </span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1">
                                  <MapPin className="w-3 h-3 text-[#696969]" />
                                  {rev.countryCode} • {rev.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <span className="text-[12px] font-medium text-[#696969] whitespace-nowrap shrink-0">
                            {rev.date}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#f0f0ea] my-3" />

                        {/* Stars + Verified Order Pill */}
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <TrustpilotStars count={rev.rating} size="w-5 h-5" />
                            <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#545454]">
                              <CircleCheck className="w-3.5 h-3.5 fill-[#00b67a] text-white shrink-0" />
                              {t('trustpilot_verified')}
                            </span>
                          </div>
                        </div>

                        {/* Review Title & Body */}
                        <h4 className="text-[15px] sm:text-[16px] font-bold text-[#191919] mt-2.5 leading-snug">
                          {text(rev.title)}
                        </h4>
                        <p className="text-[14px] text-[#191919] leading-[1.6] mt-1.5">
                          {text(rev.comment)}
                        </p>

                        {/* Experience Metadata Tags */}
                        <div className="flex flex-wrap items-center gap-2 mt-3.5">
                          <span className="inline-flex items-center gap-1 bg-[#f2f2ec] text-[#191919] text-[12px] px-2.5 py-1 rounded-md">
                            <strong>
                              {language === 'en'
                                ? 'Date of experience:'
                                : language === 'es'
                                  ? 'Fecha de la experiencia:'
                                  : 'Data da experiência:'}
                            </strong>{' '}
                            {rev.date}
                          </span>

                          <span className="inline-flex items-center gap-1 bg-[#eefbf5] text-[#005138] border border-[#c5f1dc] text-[12px] font-semibold px-2.5 py-1 rounded-md">
                            {rev.productTag}
                          </span>
                        </div>

                        {/* Interactive Bottom Action Bar (Helpful button) */}
                        <div className="mt-3.5 pt-3 border-t border-[#f0f0ea] flex items-center justify-between gap-2 text-[12px] text-[#696969]">
                          <button
                            type="button"
                            onClick={() => toggleHelpful(rev.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[12px] font-semibold transition-all cursor-pointer ${
                              isHelpful
                                ? 'bg-[#d8f6e8] text-[#005138] border-[#00b67a]'
                                : 'bg-white text-[#545454] border-[#d6d6ce] hover:bg-[#f7f7f2] hover:text-[#191919]'
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>
                              {language === 'en' ? 'Useful' : language === 'es' ? 'Útil' : 'Útil'} ({helpfulCount})
                            </span>
                          </button>

                          <span className="text-[11px] text-[#696969]">
                            {language === 'en'
                              ? 'Verified via Trustpilot automatic invitation'
                              : language === 'es'
                                ? 'Verificado por invitación automática de Trustpilot'
                                : 'Compra verificada via convite automático Trustpilot'}
                          </span>
                        </div>

                        {/* Official Store Reply on Trustpilot */}
                        {rev.reply && (
                          <div className="mt-3.5 bg-[#f7f7f2] border border-[#e5e5dd] border-l-4 border-l-[#00b67a] rounded-r-xl p-3.5 space-y-1">
                            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#191919]">
                              <CornerDownRight className="w-3.5 h-3.5 text-[#00b67a] shrink-0" />
                              <span>
                                {language === 'en'
                                  ? 'Reply from C2Tech — Licenças Digitais'
                                  : language === 'es'
                                    ? 'Respuesta de C2Tech — Licenças Digitais'
                                    : 'Resposta de C2Tech — Licenças Digitais'}
                              </span>
                            </div>
                            <p className="text-[13px] text-[#333333] leading-relaxed pl-5">
                              {rev.reply}
                            </p>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              )}

              {/* Load More Verified Reviews Button */}
              {!showAllReviews &&
                selectedStarFilter === null &&
                !onlyWithReply &&
                !searchQuery.trim() &&
                filteredReviews.length > 5 && (
                  <button
                    type="button"
                    onClick={() => setShowAllReviews(true)}
                    className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#f2f2ec] border border-[#d6d6ce] text-[13px] font-bold text-[#191919] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {language === 'en'
                        ? 'Show more verified reviews'
                        : language === 'es'
                          ? 'Mostrar más opiniones verificadas'
                          : 'Mostrar mais avaliações verificadas'}
                    </span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* 4. Bottom Sticky Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-white border-t border-[#e5e5dd] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-[12px] text-[#545454]">
            <Lock className="w-4 h-4 text-[#00b67a] shrink-0" />
            <span>
              {text(
                language === 'es'
                  ? 'Visualizador integrado oficial • Todas las compras están protegidas con garantía de activación'
                  : 'Visualizador oficial integrado • Todas as compras contam com ativação garantida e suporte no WhatsApp'
              )}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#00b67a] hover:bg-[#009664] text-[#191919] font-bold text-[13px] cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Back to Store' : language === 'es' ? 'Volver a la tienda' : 'Voltar para a loja'}
          </button>
        </div>
      </div>
    </div>
  );
};
