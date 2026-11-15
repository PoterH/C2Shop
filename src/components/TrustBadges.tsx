import { useText } from '../hooks/useText';
import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  CheckCircle2,
  X,
  Search,
  ThumbsUp,
  MapPin,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  User,
  Info,
  PenLine,
  ExternalLink,
} from 'lucide-react';
import {
  TRUSTPILOT_REVIEW_BASE_DAYS,
  formatTrustpilotDaysAgo,
  formatTrustpilotReviewCount,
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

// Reusable transitions.dev Skeleton Loader & Reveal slot for Trustpilot profile elements
const TrustpilotSkeletonSlot: React.FC<{
  activeKey: string | number;
  delayMs: number;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ activeKey, delayMs, skeleton, children, className = '' }) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const skelRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  React.useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealed(true);
      return;
    }

    const wrap = wrapRef.current;
    const skel = skelRef.current;
    if (!wrap || !skel) return;

    wrap.classList.add('is-resetting');
    setRevealed(false);
    skel.classList.remove('is-pulsing');
    void skel.offsetWidth;
    wrap.classList.remove('is-resetting');
    skel.classList.add('is-pulsing');

    const timer = window.setTimeout(() => {
      setRevealed(true);
    }, delayMs);

    return () => window.clearTimeout(timer);
  }, [activeKey, delayMs]);

  return (
    <div ref={wrapRef} className={`t-skel ${revealed ? 'is-revealed' : ''} ${className}`}>
      <div ref={skelRef} className="t-skel-skeleton is-pulsing" aria-hidden="true">
        {skeleton}
      </div>
      <div className="t-skel-content">{children}</div>
    </div>
  );
};

// Trustpilot Authentic Profile Mini-Visualizer Modal
export const TrustGuaranteesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const text = useText();
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [integrityOpen, setIntegrityOpen] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [draftRating, setDraftRating] = useState(5);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftComment, setDraftComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | null>(null);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<number, boolean>>({});
  const [openCycle, setOpenCycle] = useState(0);
  const [loaderStage, setLoaderStage] = useState<'idle' | 'loading' | 'done'>('idle');
  const [hasInteractedFeed, setHasInteractedFeed] = useState(false);
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const feedTimerRef = useRef<number | null>(null);

  React.useEffect(() => {
    if (!isOpen) {
      setLoaderStage('idle');
      setHasInteractedFeed(false);
      return;
    }

    setOpenCycle((prev) => prev + 1);
    setLoaderStage('idle');

    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setLoaderStage('done');
      return;
    }

    const rafId = window.requestAnimationFrame(() => {
      setLoaderStage('loading');
    });
    const doneTimer = window.setTimeout(() => {
      setLoaderStage('done');
    }, 1050);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(doneTimer);
      if (feedTimerRef.current) {
        window.clearTimeout(feedTimerRef.current);
        feedTimerRef.current = null;
      }
    };
  }, [isOpen]);

  const pulseLoaderBarForFeed = () => {
    setHasInteractedFeed(true);
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setLoaderStage('done');
      return;
    }
    if (feedTimerRef.current) window.clearTimeout(feedTimerRef.current);
    setLoaderStage('idle');
    window.requestAnimationFrame(() => {
      setLoaderStage('loading');
      feedTimerRef.current = window.setTimeout(() => {
        setLoaderStage('done');
        feedTimerRef.current = null;
      }, 360);
    });
  };

  React.useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const controls = Array.from(
          document.querySelectorAll<HTMLElement>(
            '.trust-reviews-modal button, .trust-reviews-modal input, .trust-reviews-modal textarea, .trust-reviews-modal a[href]'
          )
        );
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
    document.querySelector<HTMLButtonElement>('.trust-reviews-modal button[aria-label="Fechar"]')?.focus();
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
            ? 'Paid instantly and the Google Drive download link arrived in my email right away. The step-by-step video tutorial explains everything without complications. Already using it at work.'
            : language === 'es'
              ? 'Pagué con tarjeta y el enlace de Google Drive llegó al correo al instante. El tutorial en video enseña todo paso a paso sin complicaciones. Ya lo estoy usando en mi trabajo.'
              : 'Paguei pelo Pix e o link do Google Drive chegou no e-mail na mesma hora. O tutorial em vídeo ensina tudo passo a passo sem complicação. Já estou usando no meu trabalho.',
        rating: 4,
        baseHelpful: 14,
      },
      {
        id: 2,
        author: 'Fernanda S. Oliveira',
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
            ? 'This is the second software I bought from them. Had a question installing on my Mac and support answered in under 5 minutes on WhatsApp. Running smoothly without monthly fees!'
            : language === 'es'
              ? 'Es el segundo software que les compro. Tuve una duda en la instalación en mi Mac y el soporte respondió en menos de 5 minutos por WhatsApp. ¡Funcionando de maravilla sin mensualidades!'
              : 'É o segundo software que compro com eles. Tive uma dúvida na instalação no meu Mac e o suporte respondeu em menos de 5 minutos pelo WhatsApp. Funcionando liso sem mensalidade!',
        rating: 5,
        baseHelpful: 21,
      },
      {
        id: 3,
        author: 'Roberto Almeida Jr.',
        location: language === 'en' ? 'London, UK' : language === 'es' ? 'Buenos Aires, AR' : 'Curitiba, PR',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[3], language),
        title:
          language === 'en'
            ? 'Best digital license store'
            : language === 'es'
              ? 'La mejor tienda de licencias digitales'
              : 'Melhor loja de licenças digitais do Brasil',
        comment:
          language === 'en'
            ? 'Complete software, with all features unlocked and no crashes. Very transparent, I recommend it wholeheartedly to all architects and engineers.'
            : language === 'es'
              ? 'Software completo, con todas las funciones desbloqueadas y sin bloqueos. Muy transparente, lo recomiendo con total confianza a todos los arquitectos e ingenieros.'
              : 'Software completo, com todas as funções desbloqueadas e sem travamento. Muito transparente, recomendo de olhos fechados a todos os arquitetos e engenheiros.',
        rating: 5,
        baseHelpful: 18,
      },
      {
        id: 4,
        author: 'Juliana Costa',
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
            ? 'I was tired of paying expensive monthly subscriptions. Bought it to test and it exceeded expectations. Clean file, fast and lifetime.'
            : language === 'es'
              ? 'Estaba cansada de pagar suscripciones costosas cada mes. Compré para probar y superó mis expectativas. Archivo limpio, rápido y de por vida.'
              : 'Estava cansada de pagar mensalidade cara todo mês. Comprei para testar e superou minhas expectativas. Arquivo limpo, rápido e vitalício.',
        rating: 5,
        baseHelpful: 12,
      },
      {
        id: 5,
        author: 'Marcos Vinícius T.',
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
            ? 'Bought the complete package. The team was super polite and attentive. Top marks!'
            : language === 'es'
              ? 'Compré el paquete completo. El equipo fue super amable y atento. ¡Nota máxima!'
              : 'Comprei o pacote completo. A equipe foi super educada e atenciosa. Nota máxima!',
        rating: 5,
        baseHelpful: 9,
      },
      {
        id: 6,
        author: 'Henrique B. Vasconcelos',
        location: 'Florianópolis, SC',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[6], language),
        title:
          language === 'en'
            ? 'Impeccable service and license working 100%'
            : language === 'es'
              ? 'Atención impecable y licencia funcionando al 100%'
              : 'Atendimento impecável e licença funcionando 100%',
        comment:
          language === 'en'
            ? 'Installed on Windows 11 with zero errors. The explanatory video shows every step and permanent activation worked on the first try.'
            : language === 'es'
              ? 'Instalé en Windows 11 sin ningún error. El video explicativo muestra cada detalle y la activación quedó permanente a la primera.'
              : 'Instalei no Windows 11 sem nenhum erro. O vídeo explicativo mostra cada detalhe e a ativação ficou permanente de primeira.',
        rating: 5,
        baseHelpful: 15,
      },
      {
        id: 7,
        author: 'Patrícia Mendonça',
        location: 'Campinas, SP',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[7], language),
        title:
          language === 'en'
            ? 'Fast Google Drive download and WhatsApp support'
            : language === 'es'
              ? 'Descarga rápida por Google Drive y soporte por WhatsApp'
              : 'Download rápido pelo Google Drive e suporte no WhatsApp',
        comment:
          language === 'en'
            ? 'Downloaded at full speed via Google Drive. Everything organized in folders with the video tutorial included. Highly recommend!'
            : language === 'es'
              ? 'Descargué a máxima velocidad por Google Drive. Todo organizado en carpetas con el video tutorial incluido. ¡Lo recomiendo mucho!'
              : 'Baixei na velocidade máxima pelo Google Drive. Tudo organizado em pastas com o vídeo tutorial junto. Recomendo demais!',
        rating: 5,
        baseHelpful: 11,
      },
      {
        id: 8,
        author: 'Leonardo G. Farias',
        location: 'Brasília, DF',
        date: formatTrustpilotDaysAgo(TRUSTPILOT_REVIEW_BASE_DAYS[8], language),
        title:
          language === 'en'
            ? 'Best investment for our architecture studio'
            : language === 'es'
              ? 'La mejor inversión para nuestro estudio de arquitectura'
              : 'Melhor investimento para o nosso escritório de arquitetura',
        comment:
          language === 'en'
            ? 'Equipped 3 studio workstations. Everything runs smoothly with real support and lifetime guarantee.'
            : language === 'es'
              ? 'Equipamos 3 equipos del estudio. Todo funciona perfectamente y con garantía real de funcionamiento.'
              : 'Equipamos 3 máquinas aqui do escritório. Tudo rodando perfeitamente e com garantia real de funcionamento.',
        rating: 5,
        baseHelpful: 19,
      },
    ],
    [language]
  );

  if (!isOpen) return null;

  const formattedTotalCount = formatTrustpilotReviewCount(language);
  const scoreText = language === 'en' ? '4.8' : '4,8';

  const starDistribution = [
    { stars: 5, percent: 91, color: '#00b67a', label: language === 'en' ? '5-star' : language === 'es' ? '5 estrellas' : '5 estrelas' },
    { stars: 4, percent: 8, color: '#73cf42', label: language === 'en' ? '4-star' : language === 'es' ? '4 estrellas' : '4 estrelas' },
    { stars: 3, percent: 1, color: '#ffce00', label: language === 'en' ? '3-star' : language === 'es' ? '3 estrellas' : '3 estrelas' },
    { stars: 2, percent: 0, color: '#d6d6d6', label: language === 'en' ? '2-star' : language === 'es' ? '2 estrellas' : '2 estrelas' },
    { stars: 1, percent: 0, color: '#d6d6d6', label: language === 'en' ? '1-star' : language === 'es' ? '1 estrella' : '1 estrela' },
  ];

  const experienceItems = [
    {
      title: language === 'en' ? 'We are open to all' : language === 'es' ? 'Estamos abiertos a todos' : 'Estamos abertos a todos',
      body: text('Qualquer cliente com uma experiência real pode compartilhar sua avaliação sem censura ou pagamento para ocultar críticas.'),
    },
    {
      title: language === 'en' ? 'We fight fake reviews' : language === 'es' ? 'Luchamos contra las opiniones falsas' : 'Combatemos contra avaliações falsas',
      body: text('Nossa tecnologia analisa padrões suspeitos e bloqueia avaliações automatizadas ou não autorizadas continuamente.'),
    },
    {
      title: language === 'en' ? 'We show the latest reviews' : language === 'es' ? 'Mostramos las opiniones más recientes' : 'Mostramos as avaliações mais recentes',
      body: text('As opiniões mais atuais aparecem no topo para refletir a qualidade real do atendimento e da entrega digital hoje.'),
    },
    {
      title: language === 'en' ? 'We encourage constructive feedback' : language === 'es' ? 'Fomentamos el feedback constructivo' : 'Incentivamos o feedback construtivo',
      body: text('Empresas verificadas podem responder aos clientes diretamente no perfil para resolver dúvidas e aprimorar o suporte.'),
    },
    {
      title: language === 'en' ? 'Reviewers are verified by us' : language === 'es' ? 'Los autores son verificados' : 'Os avaliadores são verificados por nós',
      body: text('Cada avaliação marcada como Verificada está vinculada a um pedido confirmado via convite automático pós-compra.'),
    },
    {
      title: language === 'en' ? 'We fight bias' : language === 'es' ? 'Combatimos los prejuicios' : 'Combatemos o preconceito',
      body: text('Moderação automática e humana garante um ambiente seguro e respeitoso para consumidores e empresas.'),
    },
  ];

  const filteredReviews = trustpilotReviews.filter((rev) => {
    if (selectedStarFilter !== null && rev.rating !== selectedStarFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        rev.author.toLowerCase().includes(q) ||
        rev.title.toLowerCase().includes(q) ||
        rev.comment.toLowerCase().includes(q) ||
        rev.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReviews = filteredReviews.slice((safePage - 1) * pageSize, safePage * pageSize);

  const feedActiveKey = `${openCycle}-${safePage}-${selectedStarFilter ?? 'all'}-${searchQuery}`;
  const cardBaseDelay = hasInteractedFeed ? 170 : 760;
  const cardStepDelay = hasInteractedFeed ? 55 : 85;

  const handleToggleStar = (stars: number) => {
    pulseLoaderBarForFeed();
    setCurrentPage(1);
    setSelectedStarFilter((prev) => (prev === stars ? null : stars));
  };

  const handleSubmitDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() && !draftComment.trim()) return;
    setReviewSubmitted(true);
    setDraftTitle('');
    setDraftComment('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <p
        onClick={(e) => e.stopPropagation()}
        onCopy={(e) => e.preventDefault()}
        onCut={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
        className="w-full max-w-[960px] text-[11.5px] sm:text-[12px] font-normal tracking-wide text-center mb-1.5 px-2 select-none"
      >
        <span
          className="t-shimmer"
          data-text="Visualização reduzida do site https://br.trustpilot.com/review/c2tech"
          style={
            {
              '--shimmer-base': 'rgba(255, 255, 255, 0.65)',
              '--shimmer-highlight': '#ffffff',
            } as React.CSSProperties
          }
        >
          Visualização reduzida do site https://br.trustpilot.com/review/c2tech
        </span>
      </p>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Trustpilot — C2tech"
        className="trust-reviews-modal relative w-full max-w-[960px] max-h-[89dvh] bg-white rounded-xl shadow-2xl border border-[#dcdcdc] overflow-hidden flex flex-col animate-scale-up text-[#191919]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser-style Top Website Loading Bar */}
        <div
          className="t-site-loader-bar"
          data-done={loaderStage === 'done' ? 'true' : 'false'}
          aria-hidden="true"
        >
          <div className="t-site-loader-fill" data-stage={loaderStage} />
        </div>

        {/* 1. Authentic Trustpilot White Top Header Bar */}
        <header className="bg-white border-b border-[#e5e5e5] px-4 sm:px-6 h-[60px] flex items-center justify-between gap-3 shrink-0">
          <TrustpilotSkeletonSlot
            activeKey={openCycle}
            delayMs={320}
            className="min-w-0 flex-1"
            skeleton={
              <div className="flex items-center gap-4 h-full">
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-6 h-6 t-skel-bar" />
                  <div className="w-20 h-4 t-skel-bar" />
                </div>
                <div className="hidden sm:block flex-1 max-w-[350px] h-[34px] rounded-full t-skel-bar" />
              </div>
            }
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <TrustpilotLogo starSize="w-6 h-6" textSize="text-[19px] font-bold" />

              <div className="hidden sm:flex items-center gap-2 flex-1 max-w-[350px] rounded-full border border-[#d6d6d6] bg-white px-3.5 py-1.5 text-[12px] focus-within:border-[#191919] transition-colors">
                <Search className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    pulseLoaderBarForFeed();
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={
                    language === 'en'
                      ? 'Search for another company or review...'
                      : language === 'es'
                        ? 'Buscar otras empresas u opiniones...'
                        : 'Pesquisar outras empresas...'
                  }
                  className="w-full bg-transparent text-[12px] text-[#191919] placeholder:text-[#696969] focus:outline-none"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      pulseLoaderBarForFeed();
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-[#696969] hover:text-[#191919] cursor-pointer"
                    aria-label="Limpar busca"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </TrustpilotSkeletonSlot>

          <div className="flex items-center gap-2.5 shrink-0">
            <TrustpilotSkeletonSlot
              activeKey={openCycle}
              delayMs={390}
              skeleton={
                <div className="flex items-center gap-3 h-full">
                  <div className="hidden md:block w-16 h-3.5 t-skel-bar" />
                  <div className="hidden md:block w-8 h-3.5 t-skel-bar" />
                  <div className="hidden sm:flex items-center gap-1.5">
                    <div className="w-7 h-7 t-skel-circle" />
                    <div className="w-12 h-3.5 t-skel-bar" />
                  </div>
                  <div className="hidden sm:block w-24 h-7 rounded-full t-skel-bar" />
                </div>
              }
            >
              <div className="flex items-center gap-3.5 shrink-0 text-[12px] text-[#191919]">
                <button
                  type="button"
                  onClick={() => experienceRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="hidden md:inline-block font-medium hover:underline cursor-pointer"
                >
                  {language === 'en' ? 'Categories' : language === 'es' ? 'Categorías' : 'Categorias'}
                </button>
                <button
                  type="button"
                  onClick={() => experienceRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="hidden md:inline-block font-medium hover:underline cursor-pointer"
                >
                  Blog
                </button>

                <div className="hidden sm:flex items-center gap-1.5 text-[#545454]">
                  <span className="w-7 h-7 rounded-full border border-[#d6d6d6] bg-[#f5f4f0] flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-[#696969]" />
                  </span>
                  <span className="font-medium text-[#191919]">
                    {language === 'en' ? 'Log in' : language === 'es' ? 'Acceder' : 'Acessar'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIntegrityOpen((v) => !v)}
                  className="hidden sm:inline-flex border border-[#005138] text-[#005138] hover:bg-[#f2f8f5] rounded-full px-3 py-1 text-[11px] font-semibold cursor-pointer transition-colors"
                >
                  {language === 'en' ? 'For businesses' : language === 'es' ? 'Para empresas' : 'Para empresas'}
                </button>
              </div>
            </TrustpilotSkeletonSlot>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-[#f5f4f0] text-[#191919] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* 2. Scrollable Trustpilot Profile Page Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Profile Hero & Contact Info Section */}
          <div className="bg-white border-b border-[#e5e5e5]">
            <div className="max-w-[820px] mx-auto px-4 sm:px-6 pt-6 pb-5">
              <TrustpilotSkeletonSlot
                activeKey={openCycle}
                delayMs={480}
                skeleton={
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] t-skel-box shrink-0" />
                    <div className="min-w-0 flex-1 space-y-2.5 pt-0.5">
                      <div className="w-44 h-5 rounded-full t-skel-bar" />
                      <div className="w-32 h-7 t-skel-bar" />
                      <div className="w-56 h-4 t-skel-bar" />
                      <div className="flex items-center gap-2.5 pt-1">
                        <div className="w-40 h-9 rounded-full t-skel-bar" />
                        <div className="w-32 h-9 rounded-full t-skel-bar" />
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  {/* Official C2Tech Company Logo matching Trustpilot claimed company avatar */}
                  <div className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-md border border-[#e5e5e5] overflow-hidden shrink-0 bg-[#0058d3] shadow-2xs">
                    <img
                      src="/images/trustpilot-company-logo.jpg"
                      alt="C2Tech"
                      onError={(e) => {
                        e.currentTarget.src = '/images/logo.png';
                      }}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>

                  {/* Company Name, Claimed Pill, Rating & Buttons */}
                  <div className="min-w-0 flex-1">
                    <span className="inline-flex items-center gap-1.5 border border-[#d6d6d6] rounded-full px-2.5 py-0.5 text-[11px] text-[#191919] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#191919] shrink-0" />
                      <span>
                        {language === 'en'
                          ? 'Claimed profile • Oct 2024'
                          : language === 'es'
                            ? 'Perfil reclamado • oct. de 2024'
                            : 'Perfil reivindicado • out. de 2024'}
                      </span>
                    </span>

                    <h2 className="text-[24px] sm:text-[28px] font-bold text-[#191919] tracking-tight leading-tight mt-1.5">
                      C2tech
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[13px] text-[#191919]">
                      <span className="underline underline-offset-2 font-medium">
                        {language === 'en' ? 'Reviews' : language === 'es' ? 'Opiniones' : 'Avaliações'} {formattedTotalCount}
                      </span>
                      <span className="text-[#696969]">•</span>
                      <TrustpilotStars count={5} size="w-[18px] h-[18px]" />
                      <strong className="font-bold text-[#191919]">{scoreText}</strong>
                      <button
                        type="button"
                        onClick={() => setIntegrityOpen((v) => !v)}
                        className="text-[#696969] hover:text-[#191919] cursor-pointer"
                        aria-label="Informações sobre a pontuação"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Primary & Secondary Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2.5 mt-3.5">
                      <button
                        type="button"
                        onClick={() => {
                          setShowWriteReview((prev) => !prev);
                          setReviewSubmitted(false);
                        }}
                        className="bg-[#002f1e] hover:bg-[#00452c] text-white rounded-full px-4 py-2 text-[12px] font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <PenLine className="w-3.5 h-3.5" />
                        <span>
                          {language === 'en'
                            ? 'Write a review'
                            : language === 'es'
                              ? 'Escribe una opinión'
                              : 'Escreva uma avaliação'}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={onClose}
                        className="bg-white hover:bg-[#f2f8f5] border border-[#005138] text-[#005138] rounded-full px-4 py-2 text-[12px] font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <span>
                          {language === 'en' ? 'Visit website' : language === 'es' ? 'Visitar sitio web' : 'Visitar o site'}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </TrustpilotSkeletonSlot>

              <div className="border-t border-[#efefef] my-4 max-w-[520px]" />

              {/* Platform Integrity Disclosure Banner */}
              <TrustpilotSkeletonSlot
                activeKey={openCycle}
                delayMs={560}
                className="max-w-[520px]"
                skeleton={
                  <div className="w-full bg-[#f5f4f0] rounded-xl px-3.5 py-3 flex items-center gap-3">
                    <div className="w-4 h-4 t-skel-circle shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="w-full h-2.5 t-skel-bar" />
                      <div className="w-3/5 h-2.5 t-skel-bar" />
                    </div>
                  </div>
                }
              >
                <div className="max-w-[520px]">
                  <button
                    type="button"
                    onClick={() => setIntegrityOpen((prev) => !prev)}
                    className="w-full bg-[#f5f4f0] hover:bg-[#eceae3] rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                  >
                    <div className="flex items-start sm:items-center gap-2.5 text-[11px] text-[#191919] leading-snug">
                      <ShieldCheck className="w-4 h-4 text-[#191919] shrink-0 mt-0.5 sm:mt-0" />
                      <span>
                        {language === 'en'
                          ? 'We use technology to protect platform integrity, though individual reviews represent customer opinions'
                          : language === 'es'
                            ? 'Usamos tecnología para proteger la integridad de la plataforma y detectar reseñas automatizadas'
                            : 'Usamos tecnologia para proteger a integridade da plataforma, mas não verificamos a veracidade das avaliações'}
                      </span>
                    </div>
                    {integrityOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#545454] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#545454] shrink-0" />
                    )}
                  </button>
                  {integrityOpen && (
                    <div className="mt-2 px-3.5 py-2.5 bg-[#faf9f6] border border-[#eceae3] rounded-xl text-[11px] text-[#545454] leading-relaxed">
                      {text(
                        'Todas as avaliações exibidas seguem as diretrizes da comunidade Trustpilot. Convites de avaliação são disparados automaticamente após compras aprovadas na c2tech.shop.'
                      )}
                    </div>
                  )}
                </div>
              </TrustpilotSkeletonSlot>

              {/* Informações de contato row */}
              <TrustpilotSkeletonSlot
                activeKey={openCycle}
                delayMs={620}
                className="mt-5"
                skeleton={
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-12">
                    <div className="w-36 h-4 t-skel-bar shrink-0" />
                    <div className="space-y-2">
                      <div className="w-28 h-3 t-skel-bar" />
                      <div className="w-24 h-3 t-skel-bar" />
                    </div>
                  </div>
                }
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-12">
                  <span className="text-[14px] font-bold text-[#191919] shrink-0">
                    {language === 'en'
                      ? 'Contact information'
                      : language === 'es'
                        ? 'Información de contacto'
                        : 'Informações de contato'}
                  </span>
                  <div className="space-y-1.5 text-[12px] text-[#191919]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                      <span>{language === 'en' ? 'Brazil' : 'Brasil'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex items-center gap-2 text-[#191919] hover:underline cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                      <span>c2tech.shop</span>
                    </button>
                  </div>
                </div>
              </TrustpilotSkeletonSlot>
            </div>
          </div>

          {/* 3. Main Two-Column Reviews & Trustpilot Experience Section */}
          <div className="max-w-[820px] mx-auto px-4 sm:px-6 py-7 grid grid-cols-1 md:grid-cols-[230px_minmax(0,1fr)] gap-7 items-start">
            {/* Left Sidebar */}
            <div className="md:sticky md:top-4">
              <TrustpilotSkeletonSlot
                activeKey={openCycle}
                delayMs={680}
                skeleton={
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="t-skel-box w-6 h-6 rounded" />
                      <span className="t-skel-bar w-12 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="t-skel-bar w-36 h-3.5" />
                      <span className="t-skel-bar w-44 h-2.5" />
                    </div>
                    <span className="t-skel-box w-full h-8 rounded-full" />
                    <span className="t-skel-bar w-32 h-2.5" />
                    <div className="border border-[#ecece6] rounded-xl p-3 space-y-2.5 bg-white">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <div key={n} className="flex items-center gap-2">
                          <span className="t-skel-box w-3.5 h-3.5 rounded-[3px] shrink-0" />
                          <span className="t-skel-bar w-12 h-2.5 shrink-0" />
                          <span className="t-skel-box flex-1 h-2 rounded-full" />
                          <span className="t-skel-bar w-6 h-2.5 shrink-0" />
                        </div>
                      ))}
                    </div>
                    <span className="t-skel-bar w-40 h-2.5" />
                  </div>
                }
              >
                <aside className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TrustpilotStarIcon className="w-6 h-6" />
                    <span className="text-[26px] font-bold text-[#191919] leading-none">{scoreText}</span>
                    <Info className="w-3.5 h-3.5 text-[#696969]" />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-bold text-[#191919]">
                      {language === 'en' ? 'All reviews' : language === 'es' ? 'Todas las opiniones' : 'Todas as avaliações'}{' '}
                      <span className="font-normal text-[#545454]">({formattedTotalCount})</span>
                    </h3>
                    <p className="text-[11px] text-[#696969] mt-0.5">
                      {formattedTotalCount}{' '}
                      {language === 'en'
                        ? 'reviews in the last 12 months'
                        : language === 'es'
                          ? 'opiniones en los últimos 12 meses'
                          : 'avaliações nos últimos 12 meses'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowWriteReview((prev) => !prev);
                      setReviewSubmitted(false);
                    }}
                    className="w-full border border-[#005138] hover:bg-[#f2f8f5] text-[#005138] rounded-full py-1.5 px-3 text-[12px] font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <PenLine className="w-3.5 h-3.5" />
                    <span>
                      {language === 'en'
                        ? 'Write a review'
                        : language === 'es'
                          ? 'Escribe una opinión'
                          : 'Escreva uma avaliação'}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#191919] pt-0.5">
                    <span>
                      {language === 'en'
                        ? 'We verify reviews'
                        : language === 'es'
                          ? 'Verificamos las opiniones'
                          : 'Nós verificamos as avaliações'}
                    </span>
                    <Info className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                  </div>

                  {/* 5-Star Breakdown Card */}
                  <div className="border border-[#e5e5e5] rounded-xl p-3 space-y-2">
                    {starDistribution.map((row) => {
                      const isChecked = selectedStarFilter === row.stars;
                      const canFilter = row.percent > 0;
                      return (
                        <button
                          key={row.stars}
                          type="button"
                          disabled={!canFilter}
                          onClick={() => handleToggleStar(row.stars)}
                          className={`w-full flex items-center gap-2 text-left text-[11px] rounded py-0.5 transition-colors ${
                            canFilter ? 'cursor-pointer hover:bg-[#f7f7f2]' : 'opacity-55 cursor-default'
                          }`}
                        >
                          <span
                            className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 transition-colors ${
                              isChecked
                                ? 'bg-[#00b67a] border-[#00b67a] text-white'
                                : 'border-[#c8c8be] bg-[#f5f5f5]'
                            }`}
                          >
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                          <span className="text-[#191919] w-[54px] shrink-0">{row.label}</span>
                          <div className="flex-1 h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-300"
                              style={{
                                width: `${row.percent > 0 ? Math.max(row.percent, 5) : 0}%`,
                                backgroundColor: row.color,
                              }}
                            />
                          </div>
                          <span className="text-[#696969] w-7 text-right shrink-0">{row.percent}%</span>
                        </button>
                      );
                    })}
                  </div>

                  {selectedStarFilter !== null && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedStarFilter(null);
                        setCurrentPage(1);
                        pulseLoaderBarForFeed();
                      }}
                      className="text-[11px] font-bold text-[#005138] underline cursor-pointer"
                    >
                      {language === 'en' ? 'Clear rating filter' : language === 'es' ? 'Limpiar filtro' : 'Limpar filtro'}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => experienceRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[11px] text-[#191919] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                  >
                    <span className="underline">
                      {language === 'en'
                        ? 'How Trustpilot ranks reviews'
                        : language === 'es'
                          ? 'Cómo clasifica Trustpilot las opiniones'
                          : 'Como a Trustpilot classifica as avaliações'}
                    </span>
                    <ExternalLink className="w-3 h-3 shrink-0" />
                  </button>
                </aside>
              </TrustpilotSkeletonSlot>
            </div>

            {/* Right Main Column */}
            <div className="space-y-4 min-w-0">
              {/* Inline Review Composer inside Mini-Visualizer */}
              {showWriteReview && (
                <div className="border border-[#c5e8d9] bg-[#f6fcf9] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[13px] font-bold text-[#191919]">
                      {language === 'en'
                        ? 'Rate your experience with C2Tech'
                        : language === 'es'
                          ? 'Califica tu experiencia con C2Tech'
                          : 'Avalie sua experiência com a C2Tech'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowWriteReview(false)}
                      className="text-[#696969] hover:text-[#191919] cursor-pointer"
                      aria-label="Fechar formulário"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {reviewSubmitted ? (
                    <p className="text-[12px] text-[#005138] font-semibold">
                      {text('Obrigado! Sua avaliação foi registrada e passará pela verificação automática da Trustpilot.')}
                    </p>
                  ) : (
                    <form onSubmit={handleSubmitDraft} className="space-y-2.5">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setDraftRating(star)}
                            className="p-0.5 cursor-pointer"
                            aria-label={`${star} estrelas`}
                          >
                            <div
                              className="w-6 h-6 flex items-center justify-center rounded-xs text-white text-xs font-bold"
                              style={{ backgroundColor: star <= draftRating ? '#00b67a' : '#dcdce6' }}
                            >
                              ★
                            </div>
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        placeholder={language === 'en' ? 'Review title...' : language === 'es' ? 'Título de tu opinión...' : 'Título da sua avaliação...'}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#d6d6d6] bg-white text-[12px] text-[#191919] focus:outline-none focus:border-[#00b67a]"
                      />
                      <textarea
                        rows={2}
                        value={draftComment}
                        onChange={(e) => setDraftComment(e.target.value)}
                        placeholder={language === 'en' ? 'Tell other customers about your purchase...' : language === 'es' ? 'Cuenta cómo fue tu compra...' : 'Conte como foi sua compra e instalação...'}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#d6d6d6] bg-white text-[12px] text-[#191919] focus:outline-none focus:border-[#00b67a]"
                      />
                      <button
                        type="submit"
                        className="bg-[#002f1e] hover:bg-[#00452c] text-white rounded-full px-4 py-1.5 text-[12px] font-bold cursor-pointer transition-colors"
                      >
                        {language === 'en' ? 'Submit review' : language === 'es' ? 'Enviar opinión' : 'Publicar avaliação'}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Light-Blue Notice Box matching real Trustpilot page */}
              <TrustpilotSkeletonSlot
                activeKey={openCycle}
                delayMs={740}
                skeleton={
                  <div className="bg-[#e5f3ff]/80 rounded-xl p-3.5 h-full w-full flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#c9e3fa] shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 w-full rounded-md bg-[#c9e3fa]" />
                      <div className="h-2.5 w-4/5 rounded-md bg-[#c9e3fa]" />
                    </div>
                  </div>
                }
              >
                <div className="bg-[#e5f3ff] rounded-xl p-3.5 flex items-start gap-2.5 text-[11.5px] text-[#191919] leading-relaxed">
                  <Info className="w-4 h-4 text-[#191919] shrink-0 mt-0.5" />
                  <p>
                    {language === 'en'
                      ? 'Companies on Trustpilot are not allowed to offer incentives or pay to hide reviews. Reviews represent user opinions and not Trustpilot. '
                      : language === 'es'
                        ? 'Las empresas en Trustpilot no tienen permiso para ofrecer incentivos ni pagar para ocultar opiniones. Las reseñas son opiniones de usuarios y no de Trustpilot. '
                        : 'As empresas no Trustpilot não têm permissão para oferecer incentivos ou pagar para ocultar avaliações. As avaliações são opiniões de usuários e não do Trustpilot. '}
                    <button
                      type="button"
                      onClick={() => experienceRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="underline font-medium cursor-pointer"
                    >
                      {language === 'en' ? 'Read more' : language === 'es' ? 'Leer más' : 'Leia mais'}
                    </button>
                  </p>
                </div>
              </TrustpilotSkeletonSlot>

              {/* Verified Customer Reviews List */}
              {paginatedReviews.length === 0 ? (
                <div className="border border-[#e5e5e5] rounded-xl p-6 text-center space-y-2">
                  <p className="text-[13px] font-bold text-[#191919]">
                    {text('Nenhuma avaliação encontrada para este filtro.')}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      pulseLoaderBarForFeed();
                      setSelectedStarFilter(null);
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="text-[12px] font-bold text-[#005138] underline cursor-pointer"
                  >
                    {text('Mostrar todas as avaliações')}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paginatedReviews.map((rev, idx) => {
                    const isHelpful = !!helpfulVotes[rev.id];
                    const helpfulCount = rev.baseHelpful + (isHelpful ? 1 : 0);

                    return (
                      <TrustpilotSkeletonSlot
                        key={rev.id}
                        activeKey={feedActiveKey}
                        delayMs={cardBaseDelay + idx * cardStepDelay}
                        skeleton={
                          <div className="border border-[#ecece6] rounded-xl p-4 h-full w-full space-y-3 bg-white">
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div className="t-skel-circle w-8 h-8 shrink-0" />
                                <div className="space-y-1.5">
                                  <div className="t-skel-bar w-28 h-3" />
                                  <div className="t-skel-bar w-20 h-2.5" />
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <div key={s} className="t-skel-box w-4 h-4 rounded-[2px]" />
                                  ))}
                                </div>
                                <div className="t-skel-bar w-14 h-2.5" />
                              </div>
                            </div>
                            <div className="t-skel-bar w-3/4 h-3.5" />
                            <div className="space-y-1.5">
                              <div className="t-skel-bar w-full h-2.5" />
                              <div className="t-skel-bar w-5/6 h-2.5" />
                            </div>
                            <div className="pt-1 flex items-center justify-between">
                              <div className="t-skel-bar w-40 h-2.5" />
                              <div className="t-skel-box w-20 h-6 rounded-full" />
                            </div>
                          </div>
                        }
                      >
                        <article className="border border-[#e5e5e5] rounded-xl p-4 space-y-2.5 text-left bg-white">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[#08ad88] text-white font-bold text-[12px] flex items-center justify-center shrink-0">
                                {rev.author[0]}
                              </div>
                              <div>
                                <p className="text-[13px] font-bold text-[#191919] leading-tight">
                                  {rev.author}
                                </p>
                                <p className="text-[11px] text-[#696969] mt-0.5">{rev.location}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <TrustpilotStars count={rev.rating} size="w-4 h-4" />
                              <span className="text-[12px] text-[#696969] font-medium">{rev.date}</span>
                            </div>
                          </div>

                          <h4 className="text-[13.5px] font-bold text-[#191919] leading-snug">
                            {text(rev.title)}
                          </h4>
                          <p className="text-[12.5px] text-[#4a4a4a] leading-relaxed">
                            {text(rev.comment)}
                          </p>

                          <div className="pt-1 flex items-center justify-between gap-2 flex-wrap">
                            <div className="trust-verified-badge inline-flex items-center gap-1 text-[11.5px] font-bold text-[#067a5f]">
                              <CheckCircle2 className="trust-verified-icon w-3.5 h-3.5 text-[#08ad88] shrink-0" />
                              <span>
                                {language === 'en'
                                  ? 'Verified Purchase via Trustpilot'
                                  : language === 'es'
                                    ? 'Compra Verificada vía Trustpilot'
                                    : 'Compra Verificada via Trustpilot'}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setHelpfulVotes((prev) => ({ ...prev, [rev.id]: !prev[rev.id] }))
                              }
                              className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                                isHelpful
                                  ? 'bg-[#e6f9f1] border-[#00b67a] text-[#005138]'
                                  : 'bg-white border-[#e5e5e5] text-[#545454] hover:bg-[#f7f7f2]'
                              }`}
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>
                                {language === 'en' ? 'Useful' : 'Útil'} ({helpfulCount})
                              </span>
                            </button>
                          </div>
                        </article>
                      </TrustpilotSkeletonSlot>
                    );
                  })}
                </div>
              )}

              {/* 3-Column Segmented Pagination Bar matching real Trustpilot screenshot */}
              <TrustpilotSkeletonSlot
                activeKey={feedActiveKey}
                delayMs={hasInteractedFeed ? 220 : 1020}
                skeleton={
                  <div className="grid grid-cols-3 border border-[#ecece6] rounded-xs overflow-hidden bg-white h-full">
                    <div className="py-3 px-4 border-r border-[#ecece6] flex items-center justify-center">
                      <div className="t-skel-bar w-16 h-3" />
                    </div>
                    <div className="py-3 px-4 border-r border-[#ecece6] bg-[#f6f6f2] flex items-center justify-center">
                      <div className="t-skel-bar w-5 h-3" />
                    </div>
                    <div className="py-3 px-4 flex items-center justify-center">
                      <div className="t-skel-bar w-20 h-3" />
                    </div>
                  </div>
                }
              >
                <div className="grid grid-cols-3 border border-[#c8c8be] text-[12px] rounded-xs overflow-hidden bg-white">
                  <button
                    type="button"
                    disabled={safePage <= 1}
                    onClick={() => {
                      pulseLoaderBarForFeed();
                      setCurrentPage((p) => Math.max(1, p - 1));
                    }}
                    className={`py-2.5 px-3 text-center border-r border-[#c8c8be] transition-colors ${
                      safePage <= 1
                        ? 'text-[#b5b5ad] cursor-default'
                        : 'text-[#191919] hover:bg-[#f7f7f2] cursor-pointer font-medium'
                    }`}
                  >
                    {language === 'en' ? 'Previous' : language === 'es' ? 'Anterior' : 'Anterior'}
                  </button>
                  <div className="py-2.5 px-3 text-center border-r border-[#c8c8be] border-t-2 border-t-[#002f1e] bg-[#efefef] font-bold text-[#191919]">
                    {safePage}
                  </div>
                  <button
                    type="button"
                    disabled={safePage >= totalPages}
                    onClick={() => {
                      pulseLoaderBarForFeed();
                      setCurrentPage((p) => Math.min(totalPages, p + 1));
                    }}
                    className={`py-2.5 px-3 text-center transition-colors ${
                      safePage >= totalPages
                        ? 'text-[#b5b5ad] cursor-default'
                        : 'text-[#191919] hover:bg-[#f7f7f2] cursor-pointer font-medium'
                    }`}
                  >
                    {language === 'en' ? 'Next page' : language === 'es' ? 'Siguiente página' : 'Próxima página'}
                  </button>
                </div>
              </TrustpilotSkeletonSlot>

              {/* A Experiência Trustpilot Accordion Card */}
              <div ref={experienceRef}>
                <TrustpilotSkeletonSlot
                  activeKey={openCycle}
                  delayMs={1080}
                  skeleton={
                    <div className="border border-[#ecece6] rounded-xl p-5 space-y-2.5 bg-white h-full">
                      <div className="flex items-center justify-center gap-1.5 pb-1">
                        <div className="t-skel-bar w-44 h-4" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2, 3, 4, 5, 6].map((idx) => (
                          <div
                            key={idx}
                            className="border border-[#ecece6] rounded-lg px-3.5 py-2.5 flex items-center justify-between"
                          >
                            <div className="t-skel-bar w-3/4 h-3" />
                            <div className="t-skel-circle w-3.5 h-3.5" />
                          </div>
                        ))}
                      </div>
                      <div className="t-skel-box w-full h-9 rounded-full mt-1" />
                    </div>
                  }
                >
                  <div className="border border-[#e5e5e5] rounded-xl p-5 space-y-2.5 bg-white">
                    <div className="flex items-center justify-center gap-1.5 pb-1">
                      <h3 className="text-[15px] font-bold text-[#191919]">
                        {language === 'en'
                          ? 'The Trustpilot Experience'
                          : language === 'es'
                            ? 'La Experiencia Trustpilot'
                            : 'A Experiência Trustpilot'}
                      </h3>
                      <TrustpilotStarIcon className="w-4 h-4" />
                    </div>

                    <div className="space-y-2">
                      {experienceItems.map((item, idx) => {
                        const isExpanded = openAccordionIdx === idx;
                        return (
                          <div key={item.title} className="border border-[#e5e5e5] rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setOpenAccordionIdx(isExpanded ? null : idx)}
                              className="w-full px-3.5 py-2.5 flex items-center justify-between gap-2 text-left text-[12px] font-medium text-[#191919] hover:bg-[#fafaf8] transition-colors cursor-pointer"
                            >
                              <span>{item.title}</span>
                              {isExpanded ? (
                                <ChevronUp className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-[#545454] shrink-0" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="px-3.5 pb-3 pt-0.5 text-[11.5px] text-[#545454] leading-relaxed border-t border-[#f2f2f2] bg-[#fcfcfa]">
                                {item.body}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpenAccordionIdx((prev) => (prev === 0 ? null : 0))}
                      className="bg-[#002f1e] hover:bg-[#00452c] text-white font-bold text-[12px] py-2.5 rounded-full w-full cursor-pointer transition-colors mt-1"
                    >
                      {language === 'en' ? 'Learn more' : language === 'es' ? 'Saber más' : 'Saiba mais'}
                    </button>
                  </div>
                </TrustpilotSkeletonSlot>
              </div>
            </div>
          </div>

          {/* 4. Authentic Trustpilot Warm Beige Footer */}
          <footer className="bg-[#f5f4f0] border-t border-[#e5e5dd] px-4 sm:px-6 py-8">
            <TrustpilotSkeletonSlot
              activeKey={openCycle}
              delayMs={1160}
              skeleton={
                <div className="max-w-[820px] mx-auto space-y-5 text-left h-full">
                  <div className="flex items-center gap-2">
                    <div className="t-skel-box w-5 h-5 rounded" />
                    <div className="t-skel-bar w-20 h-4" />
                  </div>
                  <div className="space-y-1.5">
                    <div className="t-skel-bar w-full h-2.5" />
                    <div className="t-skel-bar w-2/3 h-2.5" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
                    {[1, 2, 3, 4].map((col) => (
                      <div key={col} className="space-y-2">
                        <div className="t-skel-bar w-16 h-3" />
                        <div className="space-y-1.5">
                          <div className="t-skel-bar w-20 h-2.5" />
                          <div className="t-skel-bar w-16 h-2.5" />
                          <div className="t-skel-bar w-24 h-2.5" />
                          <div className="t-skel-bar w-14 h-2.5" />
                        </div>
                      </div>
                    ))}
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <div className="t-skel-bar w-20 h-3" />
                      <div className="t-skel-box w-full h-7 rounded" />
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#e5e5dd] flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((linkIdx) => (
                      <div key={linkIdx} className="t-skel-bar w-20 h-2.5" />
                    ))}
                  </div>
                  <div className="t-skel-bar w-48 h-2.5" />
                </div>
              }
            >
              <div className="max-w-[820px] mx-auto space-y-5 text-left">
                <TrustpilotLogo starSize="w-5 h-5" textSize="text-[16px] font-bold" />

                <p className="text-[10.5px] text-[#545454] leading-relaxed">
                  {language === 'en'
                    ? 'This site is protected by reCAPTCHA. We collect device and interaction signals for security purposes, as described in our '
                    : language === 'es'
                      ? 'Este sitio está protegido por reCAPTCHA. Recopilamos señales de dispositivos e interacciones por seguridad, según nuestra '
                      : 'Este site está protegido pelo reCAPTCHA. Coletamos sinais de dispositivos e interações para fins de segurança, conforme descrito em nossa '}
                  <span className="text-[#006b47] underline">
                    {language === 'en' ? 'Privacy Policy' : language === 'es' ? 'Política de Privacidad' : 'Política de Privacidade'}
                  </span>
                  .
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-[11px] text-[#191919]">
                  <div className="space-y-1.5">
                    <p className="font-bold">{language === 'en' ? 'About' : language === 'es' ? 'Sobre' : 'Sobre'}</p>
                    <ul className="space-y-1 text-[#545454]">
                      <li>{language === 'en' ? 'About us' : 'Quem somos'}</li>
                      <li>{language === 'en' ? 'Jobs' : 'Empregos'}</li>
                      <li>{language === 'en' ? 'Contact' : 'Contato'}</li>
                      <li>Blog</li>
                      <li>{language === 'en' ? 'How Trustpilot works' : 'Como a Trustpilot funciona'}</li>
                      <li>{language === 'en' ? 'Transparency Report' : 'Imprensa'}</li>
                      <li>{language === 'en' ? 'Investor Relations' : 'Relações com investidores'}</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold">{language === 'en' ? 'Community' : language === 'es' ? 'Comunidad' : 'Comunidade'}</p>
                    <ul className="space-y-1 text-[#545454]">
                      <li>{language === 'en' ? 'Trust in reviews' : 'Confiar nas avaliações'}</li>
                      <li>{language === 'en' ? 'Help Center' : 'Central de ajuda'}</li>
                      <li>{language === 'en' ? 'Log in' : 'Acessar'}</li>
                      <li>{language === 'en' ? 'Sign up' : 'Cadastre-se'}</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold">{language === 'en' ? 'Businesses' : 'Empresas'}</p>
                    <ul className="space-y-1 text-[#545454]">
                      <li>Trustpilot Business</li>
                      <li>{language === 'en' ? 'Products' : 'Produtos'}</li>
                      <li>{language === 'en' ? 'Plans & Pricing' : 'Planos e preços'}</li>
                      <li>{language === 'en' ? 'Business Login' : 'Login para empresas'}</li>
                      <li>{language === 'en' ? 'Blog for Business' : 'Blog para empresas'}</li>
                    </ul>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-bold">{language === 'en' ? 'Follow us on' : language === 'es' ? 'Síguenos' : 'Siga-nos'}</p>
                    <ul className="space-y-1 text-[#545454] font-semibold">
                      <li>Facebook</li>
                      <li>X</li>
                      <li>Instagram</li>
                      <li>LinkedIn</li>
                      <li>YouTube</li>
                    </ul>
                  </div>

                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <p className="font-bold">
                      {language === 'en' ? 'Choose country' : language === 'es' ? 'Elige el país' : 'Escolha o país'}
                    </p>
                    <div className="bg-white border border-[#d6d6ce] rounded px-2.5 py-1.5 flex items-center justify-between text-[11px] text-[#191919]">
                      <span>🇧🇷 {language === 'en' ? 'Brazil' : 'Brasil'}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#545454]" />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#e5e5dd] flex flex-wrap gap-x-5 gap-y-1.5 text-[10.5px] text-[#545454]">
                  <span>Legal</span>
                  <span>{language === 'en' ? 'Privacy Policy' : 'Política de Privacidade'}</span>
                  <span>{language === 'en' ? 'Terms & Conditions' : 'Termos & Condições'}</span>
                  <span>{language === 'en' ? 'Guidelines for Reviewers' : 'Diretrizes para Avaliadores'}</span>
                  <span>{language === 'en' ? 'System status' : 'Status do sistema'}</span>
                  <span>{language === 'en' ? 'Cookie preferences' : 'Preferências de cookies'}</span>
                  <span>Modern Slavery Statement</span>
                </div>

                <p className="text-[10.5px] text-[#545454]">
                  © 2026 Trustpilot, Inc.{' '}
                  {language === 'en'
                    ? 'All rights reserved.'
                    : language === 'es'
                      ? 'Todos los derechos reservados.'
                      : 'Todos os direitos reservados.'}
                </p>
              </div>
            </TrustpilotSkeletonSlot>
          </footer>
        </div>
      </div>
    </div>
  );
};
