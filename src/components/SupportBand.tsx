import { Check, Clock, CheckCheck } from 'lucide-react';
import { useText } from '../hooks/useText';
import { WhatsAppIcon } from './WhatsAppIcon';

type Props = { whatsappUrl: string };

const before = [
  'Compatibilidade com Windows ou macOS',
  'Qual versão atende ao seu projeto',
  'Formas de pagamento',
];

const after = [
  'Guia de instalação passo a passo',
  'Instalação assistida e remota',
  '30 dias de suporte técnico',
];

/* A WhatsApp thread showing the two moments the team covers: choosing, then installing */
const thread: { from: 'client' | 'team'; text: string; time: string }[] = [
  { from: 'client', text: 'O AutoCAD 2026 roda no meu notebook com Windows 11?', time: '10:02' },
  { from: 'team', text: 'Roda sim. Me manda a configuração do notebook que eu confirmo a versão ideal.', time: '10:03' },
  { from: 'client', text: 'Comprei agora. Pode me ajudar a instalar?', time: '10:21' },
  { from: 'team', text: 'Claro! Te enviei o guia passo a passo. Se preferir, fazemos a instalação remota.', time: '10:22' },
];

export function SupportBand({ whatsappUrl }: Props) {
  const localize = useText();

  return (
    <section className="sb relative bg-brand-navy text-white py-16 md:py-24 overflow-hidden" aria-labelledby="sb-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">
            <span className="sb-dot" aria-hidden="true" />
            {localize('Atendimento humano')}
          </span>
          <h2 id="sb-title" className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.1] tracking-tight text-white">
            {localize('Suporte no WhatsApp, da escolha do software à instalação')}
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed max-w-xl">
            {localize('Nossa equipe dedicada oferece orientação especializada para a correta instalação e configuração dos produtos adquiridos na C2Tech.')}
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 sm:gap-8 border-t border-white/10 pt-6">
            {[
              { label: 'Antes da compra', items: before },
              { label: 'Depois da compra', items: after },
            ].map((group) => (
              <div key={group.label}>
                <h3 className="text-[13px] font-bold text-white">{localize(group.label)}</h3>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check size={16} strokeWidth={3} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
                      {localize(item)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sb-cta inline-flex items-center justify-center min-h-12 px-6 bg-feedback-success hover:bg-feedback-success-strong text-white font-bold rounded-control"
            >
              <WhatsAppIcon className="w-5 h-5 mr-2 shrink-0" />
              {localize('Falar com um especialista')}
            </a>
            <p className="flex items-center gap-2 text-sm text-slate-400">
              <Clock size={16} className="shrink-0 text-slate-500" aria-hidden="true" />
              {localize('Segunda a domingo, das 09:00 às 20:00')}
            </p>
          </div>
          <p className="mt-4 text-xs text-slate-500 max-w-xl">
            {localize('Para suporte de instalação, informe o e-mail usado na compra para localizarmos seu pedido.')}
          </p>
        </div>

        {/* Conversation preview */}
        <div className="sb-chat w-full max-w-[460px] mx-auto lg:mr-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0b141a] shadow-2xl shadow-black/40" aria-hidden="true">
          <div className="flex items-center gap-3 px-4 py-3 bg-[#1f2c34]">
            <img src="/images/logo.webp" alt="" className="w-9 h-9 rounded-full object-contain bg-white p-1" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight">C2Tech Suporte</p>
              <p className="text-[11px] text-emerald-400 leading-tight">online</p>
            </div>
            <WhatsAppIcon className="w-5 h-5 ml-auto opacity-90" />
          </div>
          <div className="sb-thread flex flex-col gap-2 px-4 py-5 min-h-[300px]">
            {thread.map((m, i) => (
              <div
                key={i}
                className={`sb-msg max-w-[84%] rounded-xl px-3 py-2 text-[13px] leading-snug ${
                  m.from === 'client'
                    ? 'self-end bg-[#005c4b] text-white rounded-tr-sm'
                    : 'self-start bg-[#1f2c34] text-slate-100 rounded-tl-sm'
                }`}
              >
                {localize(m.text)}
                <span className="ml-2 inline-flex items-center gap-0.5 align-bottom text-[10px] text-white/50">
                  {m.time}
                  {m.from === 'client' && <CheckCheck size={12} className="text-sky-400" />}
                </span>
              </div>
            ))}
            <div className="sb-typing self-end flex items-center gap-1 rounded-xl rounded-tr-sm bg-[#005c4b] px-3 py-2.5">
              <span /><span /><span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
