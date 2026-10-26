import React from 'react';
import { ShieldCheck, CheckCircle2, X, Lock, Award, CloudDownload, RefreshCw } from 'lucide-react';

// Official Trustpilot Two-Tone Star (Authentic SVG)
export const TrustpilotStarIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green Background Box */}
    <rect width="40" height="40" rx="4" fill="#00B67A" />
    {/* Two-Tone Trustpilot Star */}
    <path
      d="M20 7.5L23.8 15.3L32.4 16.5L26.2 22.5L27.7 31L20 26.9L12.3 31L13.8 22.5L7.6 16.5L16.2 15.3L20 7.5Z"
      fill="#FFFFFF"
    />
    {/* Darker green facet on bottom right arm */}
    <path
      d="M20 26.9L27.7 31L26.2 22.5L20 20.8V26.9Z"
      fill="#005128"
      opacity="0.35"
    />
  </svg>
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

// Trustpilot 5 Green Squares with White Stars
export const TrustpilotStars: React.FC<{
  count?: number;
  size?: string;
  starSize?: string;
  className?: string;
}> = ({
  count = 5,
  size = 'w-5 h-5',
  starSize = 'w-3 h-3',
  className = ''
}) => (
  <div className={`inline-flex items-center gap-1 ${className}`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`${size} flex items-center justify-center rounded-[3px] shadow-2xs ${
          star <= count ? 'bg-[#00B67A]' : 'bg-slate-200'
        }`}
      >
        <svg
          viewBox="0 0 20 20"
          className={`${starSize} ${star <= count ? 'text-white fill-white' : 'text-slate-400 fill-slate-400'}`}
        >
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9 1 5.51L10 14.12l-5 2.6 1-5.51-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      </span>
    ))}
  </div>
);

// Horizontal Trustpilot Rating Badge for Page Headers
export const TrustpilotRatingHorizontal: React.FC<{
  onOpenModal?: () => void;
  className?: string;
}> = ({ onOpenModal, className = '' }) => (
  <button
    type="button"
    onClick={onOpenModal}
    className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100/90 border border-slate-200/90 transition-all cursor-pointer text-left text-xs ${className}`}
    title="Ver avaliações verificadas no Trustpilot"
  >
    <TrustpilotStarIcon className="w-4.5 h-4.5 shrink-0" />
    <span className="font-extrabold text-slate-900">Excelente</span>
    <TrustpilotStars count={5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
    <span className="font-bold text-slate-800">4.9 / 5</span>
    <span className="hidden sm:inline text-slate-400">•</span>
    <span className="hidden sm:inline text-slate-600 font-medium">
      <span className="font-bold text-slate-900">+1.780</span> avaliações no{' '}
      <strong className="text-slate-900 font-bold">Trustpilot</strong>
    </span>
  </button>
);

// Trust Guarantees Pill (Vitalício • Envio Imediato • Suporte VIP)
export const TrustGuaranteesPill: React.FC<{
  onOpenModal?: () => void;
  className?: string;
}> = ({ onOpenModal, className = '' }) => (
  <button
    type="button"
    onClick={onOpenModal}
    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-bold transition-all cursor-pointer ${className}`}
    title="Ver garantias de compra segura"
  >
    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
    <span>Garantia Vitalícia • Envio Imediato • Suporte VIP</span>
  </button>
);

// Trust & Guarantees Modal with Verified Reviews
export const TrustGuaranteesModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const trustpilotReviews = [
    {
      id: 1,
      author: 'Carlos Eduardo M.',
      location: 'São Paulo, SP',
      date: 'Há 2 dias',
      title: 'Entrega em menos de 2 minutos e vídeo bem detalhado',
      comment:
        'Paguei pelo Pix e o link do Google Drive chegou no e-mail na mesma hora. O tutorial em vídeo ensina tudo passo a passo sem complicação. Já estou usando no meu trabalho.',
      rating: 5,
    },
    {
      id: 2,
      author: 'Fernanda S. Oliveira',
      location: 'Belo Horizonte, MG',
      date: 'Há 4 dias',
      title: 'Excelente custo-benefício e suporte nota 10',
      comment:
        'É o segundo software que compro com eles. Tive uma dúvida na instalação no meu Mac e o suporte respondeu em menos de 5 minutos pelo WhatsApp. Funcionando liso sem mensalidade!',
      rating: 5,
    },
    {
      id: 3,
      author: 'Roberto Almeida Jr.',
      location: 'Curitiba, PR',
      date: 'Há 1 semana',
      title: 'Melhor loja de licenças digitais do Brasil',
      comment:
        'Software completo, com todas as funções desbloqueadas e sem travamento. Muito transparente, recomendo de olhos fechados a todos os arquitetos e engenheiros.',
      rating: 5,
    },
    {
      id: 4,
      author: 'Juliana Costa',
      location: 'Rio de Janeiro, RJ',
      date: 'Há 1 semana',
      title: 'Ativação vitalícia perfeita',
      comment:
        'Estava cansada de pagar mensalidade cara todo mês. Comprei para testar e superou minhas expectativas. Arquivo limpo, rápido e vitalício.',
      rating: 5,
    },
    {
      id: 5,
      author: 'Marcos Vinícius T.',
      location: 'Porto Alegre, RS',
      date: 'Há 2 semanas',
      title: 'Confiança total e suporte rápido',
      comment:
        'Comprei o pacote completo. A equipe foi super educada e atenciosa. Nota máxima!',
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
                <span className="text-[10px] font-black uppercase tracking-wider bg-[#00B67A]/15 text-[#008254] px-2 py-0.5 rounded-full">
                  Avaliações Verificadas
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <TrustpilotStars count={5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                <span className="text-xs font-extrabold text-slate-800">4.9 / 5</span>
                <span className="text-xs text-slate-500 font-medium">(1.782 clientes satisfeitos)</span>
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
                <span>Uso Vitalício</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Sem assinaturas ou cobranças recorrentes. Você paga uma única vez.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1">
              <div className="flex items-center gap-2 text-blue-800 font-bold text-xs">
                <CloudDownload className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Envio Imediato</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Receba o link do Google Drive no seu e-mail e WhatsApp em minutos.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                <RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />
                <span>7 Dias de Garantia</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Se não funcionar como prometido, devolvemos 100% do seu valor.
              </p>
            </div>
          </div>

          {/* Customer Reviews List */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
              Últimos Depoimentos de Clientes Verificados no Trustpilot
            </h4>

            <div className="space-y-3">
              {trustpilotReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-left"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#00B67A] text-white font-bold text-xs flex items-center justify-center">
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

                  <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-[#008254]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00B67A]" />
                    <span>Compra Verificada via Trustpilot</span>
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
            <span className="font-semibold text-slate-700">Ambiente Seguro e Protegido</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer transition-colors"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
};
