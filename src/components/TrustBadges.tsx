import { useText } from '../hooks/useText';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle2, X, Lock, Award, CloudDownload, RefreshCw } from 'lucide-react';

// Official Trustpilot Two-Tone Star (Authentic Star Logo)
export const TrustpilotStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <img
    src="/images/trustpilot-star.png"
    alt="Trustpilot"
    className={`inline-block object-contain shrink-0 select-none ${className}`}
    loading="eager"
  />
);

// Trustpilot Logo: Star Icon + "Trustpilot" typography
export const TrustpilotLogo: React.FC<{ starSize?: string; textSize?: string; className?: string }> = ({
  starSize = 'w-5 h-5',
  textSize = 'text-base',
  className = ''
}) => (
  <div className={`inline-flex items-center gap-1.5 select-none ${className}`}>
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
    <div className={`inline-flex shrink-0 items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= count;
        const color = isActive ? (isFourStar ? '#73cf42' : '#00b67a') : '#dcdce6';
        return (
          <svg
            key={star}
            viewBox="0 0 32 32"
            role="img"
            aria-label={isActive ? `${count} estrelas` : 'estrela vazia'}
            className={`${size} shrink-0 select-none`}
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
      {!compact && <span className="hidden lg:inline text-slate-600">{t('trustpilot_what_customers_say')}</span>}
      <span className="hidden sm:inline font-semibold">{t('trustpilot_excellent')}</span>
      <TrustpilotStars count={5} size={compact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5'} />
      <span className="hidden sm:inline text-slate-600 text-xs">{!compact && <>4.8 {t('trustpilot_score_based_on')} </>}<span className="underline underline-offset-2">{t('trustpilot_reviews_count')}</span></span>
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

// Trust & Guarantees Modal with Verified Reviews
export const TrustGuaranteesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { language, t } = useLanguage();
  const text = useText();
  React.useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const controls = Array.from(document.querySelectorAll<HTMLElement>('.trust-reviews-modal button, .trust-reviews-modal a[href]'));
        const first = controls[0]; const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.querySelector<HTMLButtonElement>('.trust-reviews-modal button')?.focus();
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); previousFocus?.focus(); };
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  const trustpilotReviews = [
    {
      id: 1,
      author: 'Carlos Eduardo M.',
      location: language === 'en' ? 'New York, US' : language === 'es' ? 'Madrid, ES' : 'São Paulo, SP',
      date: language === 'es' ? 'Hace 2 días' : 'Há 2 dias',
      title: language === 'es' ? 'Entrega en menos de 2 minutos y video bien detallado' : 'Entrega em menos de 2 minutos e vídeo bem detalhado',
      comment: language === 'es'
        ? 'Pagué con tarjeta y el enlace de Google Drive llegó al correo al instante. El tutorial en video enseña todo paso a paso sin complicaciones. Ya lo estoy usando en mi trabajo.'
        : 'Paguei pelo Pix e o link do Google Drive chegou no e-mail na mesma hora. O tutorial em vídeo ensina tudo passo a passo sem complicação. Já estou usando no meu trabalho.',
      rating: 4,
    },
    {
      id: 2,
      author: 'Fernanda S. Oliveira',
      location: language === 'en' ? 'Miami, US' : language === 'es' ? 'Ciudad de México, MX' : 'Belo Horizonte, MG',
      date: language === 'es' ? 'Hace 4 días' : 'Há 4 dias',
      title: language === 'es' ? 'Excelente relación calidad-precio y soporte de 10' : 'Excelente custo-benefício e suporte nota 10',
      comment: language === 'es'
        ? 'Es el segundo software que les compro. Tuve una duda en la instalación en mi Mac y el soporte respondió en menos de 5 minutos por WhatsApp. ¡Funcionando de maravilla sin mensualidades!'
        : 'É o segundo software que compro com eles. Tive uma dúvida na instalação no meu Mac e o suporte respondeu em menos de 5 minutos pelo WhatsApp. Funcionando liso sem mensalidade!',
      rating: 5,
    },
    {
      id: 3,
      author: 'Roberto Almeida Jr.',
      location: language === 'en' ? 'London, UK' : language === 'es' ? 'Buenos Aires, AR' : 'Curitiba, PR',
      date: language === 'es' ? 'Hace 1 semana' : 'Há 1 semana',
      title: language === 'es' ? 'La mejor tienda de licencias digitales' : 'Melhor loja de licenças digitais do Brasil',
      comment: language === 'es'
        ? 'Software completo, con todas las funciones desbloqueadas y sin bloqueos. Muy transparente, lo recomiendo con total confianza a todos los arquitectos e ingenieros.'
        : 'Software completo, com todas as funções desbloqueadas e sem travamento. Muito transparente, recomendo de olhos fechados a todos os arquitetos e engenheiros.',
      rating: 5,
    },
    {
      id: 4,
      author: 'Juliana Costa',
      location: language === 'es' ? 'Santiago, CL' : 'Rio de Janeiro, RJ',
      date: language === 'es' ? 'Hace 1 semana' : 'Há 1 semana',
      title: language === 'es' ? 'Activación de por vida perfecta' : 'Ativação vitalícia perfeita',
      comment: language === 'es'
        ? 'Estaba cansada de pagar suscripciones costosas cada mes. Compré para probar y superó mis expectativas. Archivo limpio, rápido y de por vida.'
        : 'Estava cansada de pagar mensalidade cara todo mês. Comprei para testar e superou minhas expectativas. Arquivo limpo, rápido e vitalício.',
      rating: 5,
    },
    {
      id: 5,
      author: 'Marcos Vinícius T.',
      location: language === 'es' ? 'Lima, PE' : 'Porto Alegre, RS',
      date: language === 'es' ? 'Hace 2 semanas' : 'Há 2 semanas',
      title: language === 'es' ? 'Confianza total y soporte rápido' : 'Confiança total e suporte rápido',
      comment: language === 'es'
        ? 'Compré el paquete completo. El equipo fue super amable y atento. ¡Nota máxima!'
        : 'Comprei o pacote completo. A equipe foi super educada e atenciosa. Nota máxima!',
      rating: 5,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        role="dialog" aria-modal="true" aria-label="Avaliações e garantias" className="trust-reviews-modal relative w-full max-w-4xl max-h-[92dvh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <TrustpilotStarIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-normal text-slate-900 text-2xl">Trustpilot</span>
                <span className="text-xs font-black uppercase tracking-wider bg-[#08ad88]/15 text-[#067a5f] px-2 py-0.5 rounded-full">
                  {language === 'en' ? 'Verified Reviews' : language === 'es' ? 'Opiniones Verificadas' : 'Avaliações Verificadas'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <TrustpilotStars count={5} size="w-5 h-5" />
                <span className="text-xs font-extrabold text-slate-800">4.8 / 5</span>
                <span className="text-xs text-slate-500 font-medium">
                  {language === 'en' ? '(1,785 satisfied customers)' : language === 'es' ? '(1.785 clientes satisfechos)' : '(1.785 clientes satisfeitos)'}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs">
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('badge_lifetime')}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {text(language === 'es'
                  ? 'Sin suscripciones ni cobros recurrentes. Pagas una única vez.'
                  : 'Sem assinaturas ou cobranças recorrentes. Você paga uma única vez.')}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                <CloudDownload className="w-4 h-4 text-action-primary shrink-0" />
                <span>{language === 'en' ? 'Instant Delivery' : language === 'es' ? 'Envío Inmediato' : 'Envio Imediato'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {text(language === 'es'
                  ? 'Recibe el enlace de Google Drive en tu correo y WhatsApp en minutos.'
                  : 'Receba o link do Google Drive no seu e-mail e WhatsApp em minutos.')}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{language === 'en' ? '7-Day Guarantee' : language === 'es' ? '7 Días de Garantía' : '7 Dias de Garantia'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {text(language === 'es'
                  ? 'Si no funciona como se promete, devolvemos el 100% de tu dinero.'
                  : 'Se não funcionar como prometido, devolvemos 100% do seu valor.')}
              </p>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              {text(language === 'es'
                ? 'Últimas Opiniones de Clientes Verificados en Trustpilot'
                : 'Últimos Depoimentos de Clientes Verificados no Trustpilot')}
            </h4>

            <div className="space-y-3">
              {trustpilotReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-left"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#08ad88] text-white font-bold text-xs flex items-center justify-center">
                        {rev.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-none">
                          {rev.author}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{rev.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrustpilotStars count={rev.rating} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                      <span className="text-xs text-slate-400 font-medium">{text(rev.date)}</span>
                    </div>
                  </div>

                  <p className="text-xs font-extrabold text-slate-900">{text(rev.title)}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{text(rev.comment)}</p>

                  <div className="pt-1 flex items-center gap-1 text-xs font-bold text-[#067a5f]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08ad88]" />
                    <span>
                      {text(language === 'es'
                        ? 'Compra Verificada vía Trustpilot'
                        : 'Compra Verificada via Trustpilot')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-700">
              {text(language === 'es' ? 'Ambiente Seguro y Protegido' : 'Ambiente Seguro e Protegido')}
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
          >
            {language === 'en' ? 'Got it' : language === 'es' ? 'Entendido' : 'Entendi'}
          </button>
        </div>
      </div>
    </div>
  );
};
