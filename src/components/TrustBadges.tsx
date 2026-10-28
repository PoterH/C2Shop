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
    <span className={`font-display font-extrabold tracking-tight text-slate-900 ${textSize}`}>
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
    <div className={`inline-flex items-center gap-0.5 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= count;
        const imgSrc = isActive
          ? isFourStar
            ? '/images/trustpilot-star-4.png'
            : '/images/trustpilot-star-5.png'
          : '/images/trustpilot-star-inactive.png';

        return (
          <img
            key={star}
            src={imgSrc}
            alt={isActive ? `${count} estrelas` : 'estrela vazia'}
            className={`${size} rounded-[2px] object-cover shrink-0 select-none shadow-2xs`}
            loading="eager"
          />
        );
      })}
    </div>
  );
};

// Horizontal Trustpilot Rating Badge for Page Headers
export const TrustpilotRatingHorizontal: React.FC<{
  onOpenModal?: () => void;
  className?: string;
}> = ({ onOpenModal, className = '' }) => {
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={onOpenModal}
      className={`group inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-slate-800 transition-colors cursor-pointer text-left py-1 select-none focus:outline-none ${className}`}
      title={t('trustpilot_reviews_modal_title')}
    >
      <span className="font-semibold text-slate-900">{t('trustpilot_excellent')}</span>
      <TrustpilotStars count={5} size="w-3.5 h-3.5 sm:w-4 sm:h-4" starSize="w-2.5 h-2.5 sm:w-2.5 sm:h-2.5" />
      <span className="underline underline-offset-2 decoration-slate-400 hover:decoration-slate-800 text-slate-600 font-medium whitespace-nowrap">
        {t('trustpilot_reviews_count')} no
      </span>
      <TrustpilotLogo starSize="w-3.5 h-3.5 sm:w-4 sm:h-4" textSize="text-xs sm:text-sm font-extrabold" />
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
      className={`inline-flex flex-col sm:flex-row items-start sm:items-center bg-white border border-slate-200/90 rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 shadow-2xs hover:border-slate-300 transition-all cursor-pointer group gap-2.5 sm:gap-3.5 lg:gap-4.5 ${className}`}
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
          <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_lifetime')}</p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
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
          <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_guaranteed')}</p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
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
          <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-tight">{t('badge_digital_delivery')}</p>
          <p className="text-[9.5px] sm:text-[10px] text-slate-500 leading-snug mt-0.5 whitespace-nowrap">
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
        className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <TrustpilotStarIcon className="w-8 h-8 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-slate-900 text-lg">Trustpilot</span>
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#08ad88]/15 text-[#067a5f] px-2 py-0.5 rounded-full">
                  {language === 'en' ? 'Verified Reviews' : language === 'es' ? 'Opiniones Verificadas' : 'Avaliações Verificadas'}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <TrustpilotStars count={5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                <span className="text-xs font-extrabold text-slate-800">4.8 / 5</span>
                <span className="text-xs text-slate-500 font-medium">
                  {language === 'en' ? '(1,782 satisfied customers)' : language === 'es' ? '(1.782 clientes satisfechos)' : '(1.782 clientes satisfeitos)'}
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
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'es'
                  ? 'Sin suscripciones ni cobros recurrentes. Pagas una única vez.'
                  : 'Sem assinaturas ou cobranças recorrentes. Você paga uma única vez.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                <CloudDownload className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{language === 'en' ? 'Instant Delivery' : language === 'es' ? 'Envío Inmediato' : 'Envio Imediato'}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'es'
                  ? 'Recibe el enlace de Google Drive en tu correo y WhatsApp en minutos.'
                  : 'Receba o link do Google Drive no seu e-mail e WhatsApp em minutos.'}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{language === 'en' ? '7-Day Guarantee' : language === 'es' ? '7 Días de Garantía' : '7 Dias de Garantia'}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {language === 'es'
                  ? 'Si no funciona como se promete, devolvemos el 100% de tu dinero.'
                  : 'Se não funcionar como prometido, devolvemos 100% do seu valor.'}
              </p>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              {language === 'es'
                ? 'Últimas Opiniones de Clientes Verificados en Trustpilot'
                : 'Últimos Depoimentos de Clientes Verificados no Trustpilot'}
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
                        <p className="text-[10px] text-slate-500 mt-0.5">{rev.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <TrustpilotStars count={rev.rating} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                      <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                    </div>
                  </div>

                  <p className="text-xs font-extrabold text-slate-900">{rev.title}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                  <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-[#067a5f]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08ad88]" />
                    <span>
                      {language === 'es'
                        ? 'Compra Verificada vía Trustpilot'
                        : 'Compra Verificada via Trustpilot'}
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
              {language === 'es' ? 'Ambiente Seguro y Protegido' : 'Ambiente Seguro e Protegido'}
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
