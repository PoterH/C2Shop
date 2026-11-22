import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, Check, Headphones, ShieldCheck, MonitorCheck, ChevronDown } from 'lucide-react';
import { PaymentMethods } from '../components/PaymentMethods';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { LearnMoreChevron } from '../components/LearnMoreChevron';
import { useText } from '../hooks/useText';

function PixMethodIcon() {
  return (
    <img
      src="/images/payments/pix-symbol.png"
      alt=""
      aria-hidden="true"
      className="h-11 w-11 object-contain select-none"
    />
  );
}

function CardMethodIcon() {
  return (
    <svg viewBox="0 0 44 40" className="w-11 h-11" aria-hidden="true" fill="none">
      <rect x="2" y="6" width="40" height="28" rx="5" fill="#1D4ED8" />
      <rect x="2" y="11.5" width="40" height="5" fill="#1E3A8A" />
      <rect x="8" y="19.5" width="9" height="7" rx="1.5" fill="#FBBF24" />
      <path d="M8 23h9M12.5 19.5v7" stroke="#B45309" strokeWidth="0.9" opacity="0.65" />
      <path d="M21 21.3a2.6 2.6 0 0 1 0 3.2M23 20.1a4.4 4.4 0 0 1 0 5.6" stroke="#93C5FD" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="8" y="29" width="13" height="2" rx="1" fill="#BFDBFE" />
      <circle cx="32" cy="28" r="3.5" fill="#EB001B" />
      <circle cx="36.2" cy="28" r="3.5" fill="#F79E1B" fillOpacity="0.92" />
    </svg>
  );
}

function BoletoMethodIcon() {
  return (
    <img
      src="/images/payments/boleto.png"
      alt=""
      aria-hidden="true"
      className="h-10 w-auto object-contain select-none"
    />
  );
}

function InternationalMethodIcon() {
  return (
    <svg viewBox="0 0 44 40" className="w-11 h-11" aria-hidden="true" fill="none">
      <circle cx="19.5" cy="20" r="14" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.2" />
      <ellipse cx="19.5" cy="20" rx="6.5" ry="14" stroke="#0284C7" strokeWidth="1.8" />
      <path d="M6 16.5h27M6 23.5h27" stroke="#0284C7" strokeWidth="1.7" />
      <circle cx="32.5" cy="27.5" r="8" fill="#0284C7" stroke="white" strokeWidth="2" />
      <path
        d="M32.5 23v9M34.6 25.1c0-.9-.9-1.5-2.1-1.5s-2.1.6-2.1 1.5c0 1.9 4.2 1.2 4.2 3.2 0 .9-.9 1.5-2.1 1.5s-2.1-.6-2.1-1.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const paymentOptions = [
  {
    icon: PixMethodIcon,
    title: 'Pix',
    tagColor: 'text-feedback-success-strong',
    description: 'Pague no aplicativo do seu banco com o QR Code ou o código copia e cola gerado no checkout.',
    detail: 'A confirmação é automática e você garante desconto imediato no Pix. A entrega digital é liberada logo após o pagamento ser confirmado.',
    tag: 'Confirmação automática',
  },
  {
    icon: CardMethodIcon,
    title: 'Cartão de crédito',
    tagColor: 'text-blue-700',
    description: 'Finalize sua compra com as principais bandeiras de cartão de crédito em ambiente seguro. Confira o valor e as opções de parcelamento antes de concluir.',
    detail: 'Para vários itens ou combinações de versões, nosso atendimento prepara o pagamento com desconto pelo WhatsApp.',
    tag: 'Aprovação rápida',
  },
  {
    icon: BoletoMethodIcon,
    title: 'Boleto bancário',
    tagColor: 'text-slate-800',
    description: 'Gere o boleto no checkout e pague pelo aplicativo do seu banco, internet banking ou em qualquer local autorizado.',
    detail: 'CPF/CNPJ e endereço de cobrança são solicitados somente nesta opção. A entrega ocorre após a compensação bancária.',
    tag: 'Aguarde a compensação',
  },
  {
    icon: InternationalMethodIcon,
    title: 'Pagamento Internacional',
    tagColor: 'text-sky-700',
    description: 'Está fora do Brasil? Selecione a opção de pagamento internacional no checkout para pagar em moeda estrangeira com conversão automática.',
    detail: 'Aceita cartões internacionais com confirmação imediata e envio automático dos arquivos para o seu e-mail.',
    tag: 'Moeda internacional',
  },
];
const questions = [
  ['Paguei, mas ainda não recebi o e-mail. O que fazer?', 'Confira primeiro se o pagamento já foi confirmado. Depois, verifique as pastas Spam, Lixo eletrônico e Promoções. Se a mensagem não estiver lá, fale com a equipe e informe o número do pedido e o e-mail usado na compra.'],
  ['A entrega é igual para todos os produtos?', 'A entrega é digital, mas o conteúdo depende do produto. Softwares com instalação local incluem o acesso aos arquivos e às instruções disponíveis para a versão escolhida. Assinaturas e contas privadas têm instruções de acesso próprias e validade conforme o plano contratado.'],
  ['Posso comprar mais de um software no cartão?', 'Sim. Para reunir vários softwares em um pagamento no cartão, continue pelo WhatsApp indicado no checkout. Nosso atendimento prepara a compra e aplica 10% de desconto ao levar 2 softwares diferentes ou mais.'],
  ['Estou fora do Brasil. Como faço o pagamento?', 'No checkout, selecione a opção “Pagamento Internacional” para finalizar sua compra do exterior com cartão internacional. Para vários itens, fale com o atendimento pelo WhatsApp.'],
  ['Como funcionam o suporte e o reembolso?', 'O suporte técnico para instalação e configuração é oferecido durante 30 dias, conforme as condições do produto. Para consultar as regras de cancelamento, substituição e reembolso, acesse nossos Termos de Uso.'],
];

function DeliveryIllustration() {
  return <svg viewBox="0 0 430 300" className="w-full max-w-[430px] h-auto" role="img" aria-label="Pagamento confirmado e entrega por e-mail">
    <defs><linearGradient id="delivery-card" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#dcecff"/></linearGradient><linearGradient id="delivery-envelope" x2="1" y2="1"><stop stopColor="#42c7ff"/><stop offset="1" stopColor="#075fe9"/></linearGradient></defs>
    <circle cx="234" cy="151" r="125" fill="#388bcd" opacity=".12"/><circle cx="234" cy="151" r="100" fill="none" stroke="#78bded" opacity=".22" strokeDasharray="4 8"/>
    <g transform="rotate(-9 210 145)"><rect x="108" y="37" width="209" height="213" rx="22" fill="#020d21" opacity=".25"/><rect x="108" y="27" width="209" height="213" rx="22" fill="url(#delivery-card)"/><rect x="131" y="50" width="42" height="42" rx="12" fill="#0068fa"/><path d="m142 71 7 7 14-17" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/><rect x="187" y="57" width="102" height="8" rx="4" fill="#183f68"/><rect x="187" y="75" width="73" height="6" rx="3" fill="#90adc8"/><rect x="131" y="112" width="163" height="6" rx="3" fill="#bfd2e3"/><rect x="131" y="130" width="139" height="6" rx="3" fill="#bfd2e3"/><rect x="131" y="148" width="149" height="6" rx="3" fill="#bfd2e3"/></g>
    <rect x="169" y="154" width="183" height="121" rx="17" fill="#05152c" opacity=".2"/><rect x="169" y="147" width="183" height="121" rx="17" fill="url(#delivery-envelope)"/><path d="m172 155 79 64a15 15 0 0 0 19 0l79-64" fill="none" stroke="#abe7ff" strokeWidth="3"/><path d="m174 258 54-47m117 47-54-47" stroke="#76cfff" strokeWidth="2" opacity=".55"/>
    <circle cx="342" cy="137" r="27" fill="#31d6a3"/><path d="m329 137 9 9 17-19" fill="none" stroke="#073c3b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M49 203c4-37 52-35 62-12" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="5 6"/><path d="m103 176 12 19-23-2" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="72" cy="93" r="5" fill="#56c7ff"/><circle cx="372" cy="231" r="4" fill="#56c7ff"/>
  </svg>;
}

export function DeliveryPaymentPage() {
  const text = useText();
  const whatsapp = 'https://wa.me/5581997349300?text='+encodeURIComponent('Olá, tenho uma dúvida sobre entrega e pagamento na C2Tech.');
  return <div className="delivery-page pt-28 xl:pt-36 pb-16 bg-white text-slate-900">
    <header className="bg-[#0f212e] text-white px-5 py-12 sm:py-16"><div className="max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_.8fr] items-center gap-8"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-sky-300">{text('Da sua escolha ao primeiro acesso')}</p><h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">{text('Entrega e pagamento.')}<span className="block text-sky-300 mt-2">{text('Tudo no seu tempo, com clareza.')}</span></h1><p className="max-w-xl mt-5 text-base sm:text-lg leading-relaxed text-slate-200">{text('Saiba como pagar, o que acontece após a confirmação e onde encontrar os arquivos ou as instruções de acesso da sua compra.')}</p><div className="mt-7 flex flex-wrap gap-3"><a href="#pagamentos" className="t-learn inline-flex gap-2 items-center rounded-xl bg-action-primary hover:bg-blue-500 px-5 py-3 text-sm font-semibold">{text('Formas de pagamento')}<LearnMoreChevron className="ml-0"/></a><a href="#entrega" className="t-learn inline-flex gap-2 items-center rounded-xl border border-slate-500 hover:bg-white/10 px-5 py-3 text-sm font-semibold">{text('Como vou receber')}<LearnMoreChevron className="ml-0"/></a></div></div><div className="flex justify-center"><DeliveryIllustration/></div></div></header>
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <section className="py-12 sm:py-16"><div className="grid sm:grid-cols-3 gap-7">{[{icon:MonitorCheck,title:'Escolha sua versão',body:'Confira a plataforma, a versão e o tipo de acesso na página do produto.'},{icon:ShieldCheck,title:'Confirme o pagamento',body:'Finalize pela forma escolhida e aguarde a confirmação do pagamento.'},{icon:Mail,title:'Receba e comece',body:'Abra o e-mail da compra e siga as instruções correspondentes ao seu produto.'}].map(({icon:Icon,title,body},i)=><div key={title} className="flex gap-4"><Icon className="w-7 h-7 shrink-0 text-action-primary mt-0.5" strokeWidth={1.7}/><div><p className="text-xs text-action-primary font-semibold mb-2">0{i+1}</p><h2 className="text-xl font-semibold">{text(title)}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">{text(body)}</p></div></div>)}</div></section>
      <section id="pagamentos" className="scroll-mt-40 border-t border-slate-200 pt-12"><p className="text-xs font-semibold uppercase tracking-[.18em] text-action-primary">{text('Você escolhe como pagar')}</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{text('Quatro formas de seguir em frente.')}</h2><p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">{text('Cada forma de pagamento tem seu próprio processo de confirmação. Veja o que esperar em cada uma.')}</p>
        <div className="mt-9 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{paymentOptions.map(({icon:Icon,title,tagColor,description,detail,tag})=><article key={title} className="rounded-3xl border border-slate-200 bg-[#f5f8fb] p-6 sm:p-7 flex flex-col"><div className="h-11 flex items-center justify-start"><Icon/></div><h3 className="mt-5 text-2xl font-semibold">{text(title)}</h3><p className="mt-3 text-[15px] leading-relaxed text-slate-600">{text(description)}</p><p className="mt-3 text-[15px] leading-relaxed text-slate-600">{text(detail)}</p><div className="mt-auto pt-6"><span className={'inline-flex items-center gap-2 text-xs font-semibold '+tagColor}><Check className="w-4 h-4"/>{text(tag)}</span></div></article>)}</div>
        <div className="mt-6 flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between border border-slate-200 rounded-2xl p-5"><p className="text-sm text-slate-600">{text('As bandeiras e condições disponíveis são exibidas ao finalizar o pagamento.')}</p><div className="shrink-0"><PaymentMethods/></div></div>
        <div className="mt-6 rounded-2xl bg-blue-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"><p className="text-sm sm:text-base leading-relaxed text-slate-700"><strong className="block text-slate-900 mb-1">{text('Vai levar 2 softwares ou mais?')}</strong>{text('Para pagar vários softwares juntos no cartão ou pelo exterior, fale com a equipe e receba 10% de desconto na compra de 2 softwares diferentes ou mais.')}</p><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-2 text-blue-700 font-semibold text-sm"><WhatsAppIcon className="w-5 h-5"/>{text('Preparar minha compra')}<ArrowUpRight className="w-4 h-4"/></a></div>
      </section>
      <section id="entrega" className="scroll-mt-40 mt-14 sm:mt-20 rounded-[28px] bg-[#0d2038] text-white grid lg:grid-cols-2 gap-9 p-7 sm:p-12"><div><p className="text-xs uppercase tracking-[.18em] font-semibold text-sky-300">{text('Da confirmação ao seu e-mail')}</p><h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{text('Sua entrega é digital. Seu próximo passo fica claro.')}</h2><p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">{text('O envio é liberado após a confirmação do pagamento. No boleto, é necessário aguardar a compensação. Para contas e assinaturas, siga as orientações e os prazos informados no produto.')}</p><div className="mt-7 flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5"><Mail className="w-8 h-8 text-sky-300 shrink-0" strokeWidth={1.5}/><p className="text-sm text-slate-300 leading-relaxed">{text('Confira e repita seu e-mail no checkout. É por ele que você recebe as informações da compra.')}</p></div></div><div className="space-y-5">{[{title:'Instalação local',body:'Você recebe o acesso aos arquivos da versão escolhida e às instruções disponíveis, incluindo os tutoriais em vídeo do produto.'},{title:'Chaves, contas e assinaturas',body:'Você recebe as instruções de ativação ou acesso conforme o produto.'},{title:'Não encontrou a mensagem?',body:'Confira Spam, Lixo eletrônico e Promoções. Se ainda não localizar, envie o número do pedido e o e-mail da compra ao atendimento.'}].map(({title,body},i)=><div key={title} className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"><span className="text-sky-300 text-sm font-semibold pt-1">0{i+1}</span><div><h3 className="text-xl font-semibold">{text(title)}</h3><p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">{text(body)}</p></div></div>)}</div></section>
      <section className="grid md:grid-cols-2 gap-8 py-14 sm:py-16"><div className="border-l-2 border-action-primary pl-6"><ShieldCheck className="w-8 h-8 text-action-primary" strokeWidth={1.5}/><h2 className="mt-4 text-2xl font-semibold">{text('Dados do cartão ficam no pagamento.')}</h2><p className="mt-4 text-base text-slate-600 leading-relaxed">{text('O pagamento com cartão é realizado em ambiente de checkout seguro e criptografado. Você não precisa informar os dados do cartão à equipe da C2Tech por chat, e-mail ou WhatsApp.')}</p></div><div className="border-l-2 border-sky-300 pl-6"><Headphones className="w-8 h-8 text-action-primary" strokeWidth={1.5}/><h2 className="mt-4 text-2xl font-semibold">{text('Suporte para ajudar você a começar.')}</h2><p className="mt-4 text-base text-slate-600 leading-relaxed">{text('Conte com 30 dias de suporte técnico para instalação e configuração, conforme as condições do produto. Consulte também as regras de cancelamento e reembolso.')}</p><Link to="/termos" className="mt-4 inline-flex items-center gap-2 text-action-primary font-semibold text-sm hover:underline">{text('Consultar Termos de Uso')}<ArrowUpRight className="w-4 h-4"/></Link></div></section>
      <section className="border-t border-slate-200 pt-12"><h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{text('Respostas para seguir com tranquilidade.')}</h2><div className="mt-7 divide-y divide-slate-200">{questions.map(([title,answer])=><details key={title} className="group py-5"><summary className="flex gap-4 items-center justify-between cursor-pointer list-none text-base sm:text-lg font-semibold [&::-webkit-details-marker]:hidden">{text(title)}<ChevronDown className="w-5 h-5 shrink-0 text-action-primary transition-transform group-open:rotate-180"/></summary><p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">{text(answer)}</p></details>)}</div></section>
      <section className="mt-12 rounded-3xl bg-blue-50 p-7 sm:p-9 flex flex-col sm:flex-row sm:items-center justify-between gap-6"><div><h2 className="text-2xl font-semibold">{text('Ainda ficou alguma dúvida?')}</h2><p className="mt-2 text-slate-600">{text('Atendimento todos os dias, das 09:00 às 20:00, no horário de Brasília.')}</p></div><Link to="/contato" className="inline-flex shrink-0 self-start sm:self-auto items-center gap-3 bg-action-primary hover:bg-action-primary-hover text-white rounded-xl px-6 py-3 font-semibold">{text('Fale com a C2Tech')}<ArrowUpRight className="w-5 h-5"/></Link></section>
    </div>
  </div>;
}
