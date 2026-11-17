import { Search, Check, Lock, Download, ShieldCheck } from 'lucide-react';
import { useText } from '../hooks/useText';

type Step = {
  title: string;
  desc: string;
  tag: string;
  Visual: () => React.JSX.Element;
};

/* ---------- Mini UI fragments: each step shows the real moment, not a drawn icon ---------- */

function ChooseVisual() {
  const localize = useText();
  const items = [
    { src: '/images/products/autocad-2026-windows.webp', name: 'AutoCAD 2026' },
    { src: '/images/products/adobe-photoshop-2026.webp', name: 'Photoshop 2026' },
    { src: '/images/products/office-2024-professional-plus.webp', name: 'Office 2024' },
  ];
  return (
    <div className="hiw-frame flex flex-col gap-3">
      <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-slate-200 shadow-sm text-[13px] text-slate-800">
        <Search size={14} className="text-slate-400 shrink-0" aria-hidden="true" />
        <span className="hiw-typed font-semibold">AutoCAD</span>
        <span className="hiw-caret" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div
            key={item.name}
            className={`hiw-tile relative rounded-lg bg-white border overflow-hidden ${i === 0 ? 'hiw-tile--on border-action-primary' : 'border-slate-200'}`}
          >
            <img src={item.src} alt="" loading="lazy" className="w-full aspect-square object-cover" />
            {i === 0 && (
              <span className="absolute top-1 right-1 grid place-items-center w-4 h-4 rounded-full bg-action-primary text-white">
                <Check size={10} strokeWidth={3} aria-hidden="true" />
              </span>
            )}
          </div>
        ))}
      </div>
      <span className="sr-only">{localize('Catálogo com AutoCAD, Photoshop e Office')}</span>
    </div>
  );
}

function CheckoutVisual() {
  const localize = useText();
  const methods = [
    { src: '/images/payments/pix.svg', alt: 'Pix' },
    { src: '/images/payments/visa.svg', alt: 'Visa' },
    { src: '/images/payments/mastercard.svg', alt: 'Mastercard' },
    { src: '/images/payments/elo.svg', alt: 'Elo' },
    { src: '/images/payments/boleto.svg', alt: 'Boleto' },
  ];
  return (
    <div className="hiw-frame flex flex-col gap-3">
      <div className="rounded-lg bg-white border border-slate-200 shadow-sm px-3 py-2.5 flex items-center justify-between">
        <span className="text-[12px] text-slate-500">{localize('Total')}</span>
        <span className="font-display font-extrabold text-[15px] text-slate-900">R$ 147,90</span>
      </div>
      <div className="flex items-center gap-1.5">
        {methods.map((m) => (
          <span key={m.alt} className="flex-1 h-8 grid place-items-center rounded-md bg-white border border-slate-200">
            <img src={m.src} alt={m.alt} loading="lazy" className="max-h-4 max-w-[80%] object-contain" />
          </span>
        ))}
      </div>
      <div className="hiw-pay relative overflow-hidden h-9 rounded-lg bg-action-primary text-white text-[12px] font-bold flex items-center justify-center gap-1.5">
        <Lock size={12} aria-hidden="true" />
        {localize('Pagamento seguro')}
      </div>
    </div>
  );
}

function DeliveryVisual() {
  const localize = useText();
  return (
    <div className="hiw-frame flex flex-col gap-2.5">
      <div className="hiw-note hiw-note--1 flex items-start gap-2.5 rounded-lg bg-white border border-slate-200 shadow-sm p-2.5">
        <img src="/images/logo.webp" alt="" className="w-8 h-8 rounded-md object-contain shrink-0" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] font-bold text-slate-900 truncate">C2Tech</span>
            <span className="text-[10px] text-slate-400 shrink-0">{localize('agora')}</span>
          </div>
          <p className="text-[11px] text-slate-600 truncate">{localize('Seu software chegou')}</p>
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-blue-50 text-action-primary text-[10px] font-bold px-1.5 py-0.5">
            <Download size={10} aria-hidden="true" />
            {localize('Link de download')}
          </span>
        </div>
      </div>
      <div className="hiw-note hiw-note--2 flex items-center gap-2.5 rounded-lg bg-white border border-slate-200 shadow-sm p-2.5">
        <img src="/images/whatsapp-icon.png" alt="" className="w-8 h-8 object-contain shrink-0" />
        <div className="min-w-0 flex-1">
          <span className="block text-[12px] font-bold text-slate-900">WhatsApp</span>
          <p className="text-[11px] text-slate-600 truncate">{localize('Pedido entregue com instruções')}</p>
        </div>
        <Check size={14} className="text-feedback-success shrink-0" strokeWidth={3} aria-hidden="true" />
      </div>
    </div>
  );
}

function InstallVisual() {
  const localize = useText();
  return (
    <div className="hiw-frame flex flex-col gap-2.5">
      <div className="rounded-lg bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-1 px-2.5 h-6 border-b border-slate-100 bg-slate-50">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        </div>
        <div className="p-2.5 flex items-center gap-2.5">
          <img src="/images/products/autocad-2026-windows.webp" alt="" loading="lazy" className="w-9 h-9 rounded-md object-cover scale-110 shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-900 truncate">{localize('Instalando AutoCAD')}</span>
              <ShieldCheck size={12} className="text-feedback-success shrink-0" aria-hidden="true" />
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="hiw-progress h-full rounded-full bg-action-primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2.5 rounded-lg bg-white border border-slate-200 shadow-sm p-2.5">
        <span className="relative shrink-0">
          <img src="/images/chat-mascot.webp" alt="" className="w-8 h-8 rounded-full object-cover bg-slate-900" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-feedback-success ring-2 ring-white" />
        </span>
        <div className="min-w-0">
          <span className="block text-[12px] font-bold text-slate-900">{localize('Suporte C2Tech')}</span>
          <p className="text-[11px] text-slate-600 truncate">{localize('Tutorial passo a passo enviado')}</p>
        </div>
      </div>
    </div>
  );
}

const steps: Step[] = [
  {
    title: 'Escolha o software',
    desc: 'Selecione o produto ideal para seu uso profissional em nosso catálogo.',
    tag: 'Windows e macOS',
    Visual: ChooseVisual,
  },
  {
    title: 'Finalize o pedido',
    desc: 'Pagamento rápido e seguro em nosso checkout criptografado.',
    tag: 'Pix, cartão ou boleto',
    Visual: CheckoutVisual,
  },
  {
    title: 'Receba no e-mail',
    desc: 'O link com os arquivos e instruções é enviado segundos após o pagamento.',
    tag: 'E-mail e WhatsApp',
    Visual: DeliveryVisual,
  },
  {
    title: 'Instale com orientação',
    desc: 'Siga o tutorial detalhado ou solicite auxílio do suporte remoto se necessário.',
    tag: '30 dias de suporte técnico',
    Visual: InstallVisual,
  },
];

export function HowItWorks() {
  const localize = useText();

  return (
    <section className="hiw py-16 md:py-24 bg-white" aria-labelledby="hiw-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 md:mb-16">
          <span className="text-[11px] font-extrabold text-action-primary uppercase tracking-wider">
            {localize('Praticidade')}
          </span>
          <h2 id="hiw-title" className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {localize('Como funciona o processo de compra?')}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            {localize('Da escolha do software ao uso pleno, sem complicação e com agilidade absoluta.')}
          </p>
        </div>

        {/* Desktop rail: four numbered stops joined by one line with a travelling pulse */}
        <div className="hiw-rail hidden lg:grid grid-cols-4 gap-6 mb-6" aria-hidden="true">
          {steps.map((_, i) => (
            <div key={i} className="relative flex items-center">
              <span className="hiw-node relative z-10">{String(i + 1).padStart(2, '0')}</span>
              {i < steps.length - 1 && <span className="hiw-line" />}
            </div>
          ))}
        </div>

        <ol className="hiw-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {steps.map(({ title, desc, tag, Visual }, i) => (
            <li key={title} className="hiw-step relative">
              {/* Mobile and tablet: number beside the card, on a vertical rail */}
              <span className="hiw-node hiw-node--side lg:hidden" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <article className="hiw-card group h-full flex flex-col rounded-2xl bg-white border border-slate-200 p-2 transition-[transform,box-shadow,border-color] duration-300">
                <div className="hiw-visual rounded-xl bg-slate-50 border border-slate-100 p-4 h-[188px] flex flex-col justify-center overflow-hidden">
                  <Visual />
                </div>
                <div className="px-3 pt-4 pb-3 flex flex-col gap-2 flex-1">
                  <h3 className="font-display font-bold text-[17px] text-slate-900">
                    <span className="sr-only">{i + 1}. </span>
                    {localize(title)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{localize(desc)}</p>
                  <span className="mt-auto pt-2 inline-flex items-center gap-1.5 text-[12px] font-bold text-slate-700">
                    <Check size={14} className="text-feedback-success" strokeWidth={3} aria-hidden="true" />
                    {localize(tag)}
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
