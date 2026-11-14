import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, CreditCard, BookOpen, Mail, MonitorCheck, ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { useText } from '../hooks/useText';
import { StoreReviews } from '../components/StoreReviews';
import { TrustGuaranteesModal, TrustpilotStars, TrustpilotLogo } from '../components/TrustBadges';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const benefits = [
  { icon: MonitorCheck, title: 'A solução certa para seu computador', text: 'Versões e plataformas organizadas para você conferir a compatibilidade com Windows ou macOS antes de comprar.' },
  { icon: CreditCard, title: 'Pagamento com etapas claras', text: 'Pix e boleto pela Efí Bank, cartão pela Cakto. Você escolhe a forma de pagamento e acompanha as informações do pedido.' },
  { icon: Headphones, title: 'Gente de verdade para ajudar', text: 'Atendimento pelo WhatsApp e e-mail, de segunda a domingo, das 09:00 às 20:00, no horário de Brasília.' },
  { icon: BookOpen, title: 'Orientação do início à instalação', text: 'Instruções e tutoriais em vídeo para acompanhar cada etapa. E, quando surgir uma dúvida, você pode falar com a equipe.' },
  { icon: ShieldCheck, title: '30 dias de suporte técnico', text: 'Auxílio na instalação e configuração durante o período de suporte. Consulte as condições e o escopo do atendimento nos termos.' },
  { icon: Mail, title: 'Entrega digital no seu e-mail', text: 'Após a confirmação do pagamento, você recebe os arquivos ou as instruções de acesso conforme a modalidade escolhida.' },
];

function CommitmentSeal() {
  const text = useText();
  return <svg viewBox="0 0 280 310" role="img" aria-label="Compromisso C2Tech: clareza, orientação e suporte" className="w-[220px] sm:w-[270px] h-auto drop-shadow-xl">
    <defs><linearGradient id="about-gold" x2="1" y2="1"><stop stopColor="#f9e5a8"/><stop offset=".45" stopColor="#cda44c"/><stop offset="1" stopColor="#f6dda0"/></linearGradient><linearGradient id="about-blue" x2="1" y2="1"><stop stopColor="#153d68"/><stop offset="1" stopColor="#081a35"/></linearGradient></defs>
    <path d="M140 10 255 55v98c0 69-53 117-115 148C78 270 25 222 25 153V55Z" fill="url(#about-gold)"/>
    <path d="M140 22 243 64v89c0 60-45 105-103 135C82 258 37 213 37 153V64Z" fill="url(#about-blue)"/>
    <path d="M140 34 231 72v81c0 53-38 93-91 122-53-29-91-69-91-122V72Z" fill="none" stroke="#d5b974" strokeWidth="1" opacity=".6"/>
    <text x="140" y="77" textAnchor="middle" fill="#ead39a" fontSize="11" letterSpacing="3" fontFamily="Inter, sans-serif">{text("COMPROMISSO")}</text>
    <path d="m119 111 14 14 29-31" fill="none" stroke="#f3dda1" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="140" y="163" textAnchor="middle" fill="white" fontSize="31" fontWeight="700" fontFamily="Lato, Inter, sans-serif">C2Tech</text>
    <path d="M80 178h120" stroke="#d5b974" opacity=".7"/>
    <text x="140" y="201" textAnchor="middle" fill="#ead39a" fontSize="11" letterSpacing="2" fontFamily="Inter, sans-serif">{text("CLAREZA • ORIENTAÇÃO")}</text>
    <text x="140" y="222" textAnchor="middle" fill="#ead39a" fontSize="11" letterSpacing="3" fontFamily="Inter, sans-serif">{text("SUPORTE")}</text>
    <path d="m133 241 7 5 7-5-3 8 3 8-7-5-7 5 3-8Z" fill="#e5c879"/>
  </svg>;
}

export function AboutPage() {
  const localize = useText();
  const [reviewsOpen, setReviewsOpen] = useState(false);
  return <div className="about-page pt-28 xl:pt-36 pb-16 bg-white text-slate-900">
    <header className="bg-[#0f212e] px-5 py-12 sm:py-16 text-white">
      <div className="max-w-6xl mx-auto"><p className="text-xs font-semibold uppercase tracking-[.2em] text-sky-300">{localize('Conheça a C2Tech')}</p><h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">{localize('Sobre nós')}</h1><p className="mt-4 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-200">{localize('Solução digital com suporte humano. Do primeiro contato à instalação.')}</p></div>
    </header>
    <div className="max-w-6xl mx-auto px-5 sm:px-8">
      <section className="grid lg:grid-cols-[230px_minmax(0,1fr)] gap-10 lg:gap-16 py-12 sm:py-16 items-start">
        <aside className="lg:pt-2"><p className="text-xs uppercase tracking-[.16em] font-semibold text-slate-500 mb-8">{localize('Tecnologias que atendemos')}</p><div className="grid grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-9 items-center">{['microsoft-partner','autodesk-reseller','corel-partner','promob-reseller'].map((brand,i)=><img key={brand} src={'/images/'+brand+'-about.webp'} alt={['Microsoft','Autodesk','Corel','Promob'][i]} className="w-full max-w-[205px] h-14 object-contain object-left" width="205" height="56" />)}</div></aside>
        <div><p className="text-sm font-semibold text-action-primary">C2Tech Soluções Digitais</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{localize('Tecnologia para o seu trabalho. Uma equipe para apoiar você.')}</h2><div className="mt-6 space-y-5 text-base sm:text-lg leading-relaxed text-slate-600"><p>{localize('Somos uma distribuidora de serviços de suporte técnico com solução digital. Ajudamos profissionais, estudantes e escritórios a encontrar a solução adequada e a seguir com a instalação e configuração no computador.')}</p><p>{localize('Atendemos quem trabalha com engenharia, arquitetura, marcenaria, design e produtividade. Nossa proposta é simplificar a experiência: informação clara antes da compra, orientação para começar e um canal de atendimento quando você precisar.')}</p></div><ul className="mt-7 grid sm:grid-cols-2 gap-4">{['Informações claras sobre cada versão','Atendimento humano pelo WhatsApp','Orientação para instalar e configurar','Entrega e acesso de forma digital'].map(text=><li key={text} className="flex gap-3 items-start text-sm sm:text-base"><Check className="w-5 h-5 shrink-0 text-action-primary mt-0.5"/>{localize(text)}</li>)}</ul></div>
      </section>
      <section className="about-commitment relative overflow-hidden rounded-[28px] bg-[#0d2038] text-white px-7 sm:px-12 py-10 grid md:grid-cols-[280px_minmax(0,1fr)] items-center gap-9">
        <div className="flex justify-center"><CommitmentSeal /></div><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[#e6ca86]">{localize('Nosso compromisso com você')}</p><h2 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight leading-tight">{localize('Confiança se constrói em cada atendimento.')}</h2><p className="mt-5 text-base sm:text-lg leading-relaxed text-slate-300">{localize('Mais do que entregar uma solução digital, queremos que você saiba o que está adquirindo e como utilizar. Por isso, explicamos a plataforma, a versão, o tipo de acesso e as condições de suporte em cada produto.')}</p><p className="mt-4 text-sm leading-relaxed text-slate-300">{localize('Produtos vitalícios e assinaturas têm condições diferentes. Confira os detalhes da opção escolhida e fale com a equipe se precisar de orientação.')}</p><Link to="/contato" className="mt-7 inline-flex items-center gap-3 font-semibold text-white border-b border-sky-400 pb-2 hover:text-sky-300">{localize('Conheça nossos canais de atendimento')}<ArrowUpRight className="w-5 h-5"/></Link></div>
      </section>
      <section className="py-14 sm:py-20"><div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[.18em] text-action-primary">{localize('Uma experiência mais simples')}</p><h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">{localize('Por que escolher a C2Tech?')}</h2><p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">{localize('Cada detalhe foi pensado para você comprar com clareza e contar com apoio para começar.')}</p></div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">{benefits.map(({icon:Icon,title,text},i)=><article key={title} className="about-benefit rounded-3xl border border-slate-200 bg-[#f5f8fb] p-7 sm:p-8"><div className="relative w-20 h-20 mb-6"><div className="absolute inset-x-2 bottom-1 h-10 rounded-xl bg-blue-200/60 -rotate-12"/><div className="absolute inset-1 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-600/15 flex items-center justify-center border border-white/50"><Icon className="w-10 h-10 text-white" strokeWidth={1.5}/></div><span className="absolute -right-1 -top-1 rounded-full w-7 h-7 bg-white border border-blue-100 text-action-primary text-xs font-semibold flex items-center justify-center">0{i+1}</span></div><h3 className="text-xl font-semibold leading-snug">{localize(title)}</h3><p className="mt-4 text-[15px] text-slate-600 leading-relaxed">{localize(text)}</p></article>)}</div>
      </section>
      <section className="border-t border-slate-200 pt-10"><div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-[.16em] font-semibold text-feedback-success-strong">{localize('A experiência de quem já comprou')}</p><h2 className="mt-3 text-3xl font-semibold">{localize('O que nossos clientes dizem')}</h2></div><button onClick={()=>setReviewsOpen(true)} className="self-start flex items-center gap-3 rounded-xl border border-slate-200 px-5 py-3 hover:bg-slate-50"><TrustpilotLogo starSize="w-7 h-7" textSize="text-xl"/><ArrowUpRight className="h-5 w-5 text-slate-500"/></button></div><StoreReviews/><button onClick={()=>setReviewsOpen(true)} className="mx-auto flex flex-wrap justify-center items-center gap-3 text-sm text-slate-600 hover:text-action-primary"><TrustpilotStars size="w-5 h-5"/>{localize('Abrir avaliações e ver detalhes')}<ArrowUpRight className="w-4 h-4"/></button></section>
      <section className="mt-14 rounded-2xl bg-blue-50 px-7 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"><div><h2 className="text-2xl font-semibold">{localize('Vamos encontrar a melhor solução para você?')}</h2><p className="mt-2 text-slate-600">{localize('Nossa equipe atende todos os dias, das 09:00 às 20:00.')}</p></div><a href="https://wa.me/5581997349300" target="_blank" rel="noopener noreferrer" className="shrink-0 flex items-center gap-3 rounded-xl bg-action-primary hover:bg-action-primary-hover text-white px-6 py-3 font-semibold"><WhatsAppIcon className="w-5 h-5"/>WhatsApp</a></section>
    </div><TrustGuaranteesModal isOpen={reviewsOpen} onClose={()=>setReviewsOpen(false)}/>
  </div>;
}
