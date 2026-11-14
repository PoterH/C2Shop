import { useState } from 'react';
import { ChevronLeft, ChevronRight, CircleCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { TrustpilotStars, TrustpilotLogo, TrustGuaranteesModal } from './TrustBadges';
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


export function StoreReviews({ summaryOnly = false }: { summaryOnly?: boolean }) {
 const { language, t } = useLanguage();
 const [trustpilotSlideIndex, setTrustpilotSlideIndex] = useState(0);
 const [isGuaranteesModalOpen, setIsGuaranteesModalOpen] = useState(false);
 const activeTrustpilotReviews = language === 'en' ? TRUSTPILOT_REVIEWS_EN : language === 'es' ? TRUSTPILOT_REVIEWS_ES : language === 'pt-PT' ? TRUSTPILOT_REVIEWS_PT : TRUSTPILOT_REVIEWS;
 return <section aria-label={t('trustpilot_reviews_modal_title')}>
        <div className="trust-review-strip my-10 py-6">
          <div className={summaryOnly ? "flex justify-center" : "grid grid-cols-1 lg:grid-cols-[180px_minmax(0,1fr)] gap-6 items-start"}>
            {/* Left Summary: Trustpilot Official Card */}
            <div className="trust-review-summary flex flex-col items-center text-center pb-4 lg:pb-0">
              <button
                type="button"
                onClick={() => setIsGuaranteesModalOpen(true)}
                className="space-y-2 cursor-pointer group text-center"
              >
                <p className="font-normal text-2xl text-[#191919]">{t('trustpilot_excellent')}</p>
                <div className="flex items-center justify-center gap-1">
                  <TrustpilotStars count={5} size="w-[30px] h-[30px]" />
                </div>
                <p className="text-xs text-[#191919]">
                  {t('trustpilot_based_on_bar')} <span className="underline font-semibold text-slate-900">{t('trustpilot_bar_reviews')}</span>
                </p>
                <div className="pt-1 flex items-center justify-center">
                  <TrustpilotLogo starSize="w-6 h-6" textSize="text-lg" />
                </div>
              </button>
            </div>

            {/* Right Carousel of Store Reviews */}
            {!summaryOnly && <div className="min-w-0 relative flex items-center">
              <button
                type="button"
                onClick={() =>
                  setTrustpilotSlideIndex((prev) =>
                    prev === 0 ? activeTrustpilotReviews.length - 1 : prev - 1
                  )
                }
                className="w-6 h-6 rounded-full border border-[#545454] bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0 mr-2 cursor-pointer shadow-2xs"
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
                      className="min-w-0 text-left space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <TrustpilotStars count={item.rating ?? 5} size="w-[18px] h-[18px]" />
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-[#545454]">
                          <CircleCheck className="w-3.5 h-3.5 fill-[#545454] text-white" strokeWidth={2.5} />
                          <span className="underline underline-offset-2">{t('trustpilot_verified')}</span>
                        </span>
                      </div>
                      <p className="trust-review-author text-xs text-[#545454]">
                        <span className="font-semibold text-[#545454]">{item.author}</span>, {item.timeAgo}
                      </p>
                      <p className="text-sm font-bold text-[#191919]">{item.title}</p>
                      <p className="text-[13px] text-[#191919] leading-snug">{item.comment}</p>

                    </div>
                  );
                })()}
              </div>

              {/* Tablet & Desktop (4 cards per slide) */}
              <div className="hidden sm:grid sm:grid-cols-2 xl:grid-cols-4 gap-3.5 min-w-0 flex-1">
                {[0, 1, 2, 3].map((offset) => {
                  const item =
                    activeTrustpilotReviews[(trustpilotSlideIndex + offset) % activeTrustpilotReviews.length];
                  return (
                    <div
                      key={item.id}
                      className="min-w-0 text-left space-y-1.5"
                    >
                      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                        <TrustpilotStars count={item.rating ?? 5} size="w-[18px] h-[18px]" />
                        <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-[#545454]">
                          <CircleCheck className="w-3.5 h-3.5 fill-[#545454] text-white" strokeWidth={2.5} />
                          <span className="underline underline-offset-2">{t('trustpilot_verified')}</span>
                        </span>
                      </div>

                      <p className="trust-review-author text-xs text-[#545454]">
                        <span className="font-semibold text-[#545454]">{item.author}</span>,{' '}
                        {item.timeAgo}
                      </p>
                      <p className="text-sm font-bold text-[#191919] line-clamp-1">{item.title}</p>
                      <p className="text-[13px] text-[#191919] line-clamp-2 leading-snug">
                        {item.comment}
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
                className="w-6 h-6 rounded-full border border-[#545454] bg-white text-slate-700 hover:bg-slate-100 flex items-center justify-center shrink-0 ml-2 cursor-pointer shadow-2xs"
                aria-label="Próxima avaliação"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>}
          </div>

          <div className={summaryOnly ? "mt-3 text-center" : "mt-4 pt-1 text-center lg:text-left lg:pl-[236px]"}>
            <button
              type="button"
              onClick={() => setIsGuaranteesModalOpen(true)}
              className={summaryOnly ? "text-sm text-[#191919] underline underline-offset-2 cursor-pointer" : "text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium"}
            >
              {summaryOnly ? 'Trustpilot checks reviews' : t('trustpilot_showing_high_ratings')}
            </button>
          </div>
        </div>

 <TrustGuaranteesModal isOpen={isGuaranteesModalOpen} onClose={() => setIsGuaranteesModalOpen(false)} />
 </section>;
}
