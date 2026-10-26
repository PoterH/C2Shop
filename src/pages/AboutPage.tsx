import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TrustpilotStars,
  TrustpilotLogo,
  TrustGuaranteesModal,
} from '../components/TrustBadges';
import {
  Award,
  CreditCard,
  Headphones,
  FileCheck,
  ShieldCheck,
  Mail,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Scale,
} from 'lucide-react';

const TRUSTPILOT_REVIEWS = [
  {
    id: 1,
    author: 'Carlos Henrique M.',
    timeAgo: 'há 9 horas',
    rating: 4,
    title: 'Entrega super rápida e suporte nota 10',
    comment: 'Recebi o link no e-mail logo após o Pix e o vídeo explicativo ajudou demais.',
  },
  {
    id: 2,
    author: 'Arq. Fernanda Lima',
    timeAgo: 'há 1 dia',
    rating: 5,
    title: 'Software completo como prometido',
    comment: 'Funcionando perfeitamente no meu Mac M2. Economia gigante pro meu escritório.',
  },
  {
    id: 3,
    author: 'Eng. Marcos Vinícius',
    timeAgo: 'há 2 dias',
    rating: 5,
    title: 'Melhor loja de softwares técnicos',
    comment: 'Já comprei AutoCAD, Revit e Cype aqui. Todos ativaram de primeira sem dor de cabeça.',
  },
  {
    id: 4,
    author: 'Rodrigo S. Almeida',
    timeAgo: 'há 3 dias',
    rating: 5,
    title: 'Atendimento excelente no WhatsApp',
    comment: 'Tive uma dúvida na instalação e me responderam em 5 minutos resolvendo tudo.',
  },
  {
    id: 5,
    author: 'Juliana P. Costa',
    timeAgo: 'há 5 dias',
    rating: 5,
    title: 'Fácil de comprar e instalar',
    comment: 'Site muito fácil de usar, preços justos e o passo a passo em vídeo é super claro.',
  },
];

export const AboutPage: React.FC = () => {
  const [trustpilotSlideIndex, setTrustpilotSlideIndex] = useState(0);
  const [isGuaranteesModalOpen, setIsGuaranteesModalOpen] = useState(false);

  useEffect(() => {
    document.title = 'Sobre Nós | C2Tech Softwares Profissionais';
  }, []);

  return (
    <div className="pt-28 pb-16 bg-white min-h-screen text-left">
      {/* Top Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-800 transition-colors">
          Início
        </Link>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#0b5ed7] font-semibold">Sobre nós</span>
      </div>

      {/* Dark Navy Hero Banner */}
      <div className="bg-[#0f212e] text-white py-12 sm:py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2196f3] tracking-tight">
            Sobre Nós
          </h1>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        {/* Top 2-Column Section: Partner Badges (Left) + Story Copy (Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Left Column: Partner Logos & Seal */}
          <div className="md:col-span-4 flex flex-col items-center md:items-end pr-0 md:pr-6 space-y-6">
            <div className="flex flex-col items-center md:items-end space-y-4 w-full max-w-[200px]">
              <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-2xs h-16 overflow-hidden">
                <img
                  src="/images/microsoft-partner.png"
                  alt="Microsoft Partner"
                  className="h-12 object-contain scale-125"
                />
              </div>
              <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-2xs h-16 overflow-hidden">
                <img
                  src="/images/autodesk-reseller.png"
                  alt="Autodesk Partner"
                  className="h-11 object-contain"
                />
              </div>
              <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-2xs h-16 overflow-hidden">
                <img
                  src="/images/corel-partner.png"
                  alt="Corel Partner"
                  className="h-12 object-contain scale-125"
                />
              </div>
              <div className="w-full bg-white border border-slate-200 rounded-xl p-3 flex items-center justify-center shadow-2xs h-16 overflow-hidden">
                <img
                  src="/images/promob-reseller.png"
                  alt="Promob Partner"
                  className="h-11 object-contain"
                />
              </div>
            </div>

            {/* Gold Justice / Guarantee Seal matching Screenshot 4 */}
            <div className="pt-8 md:pt-20 flex justify-center md:justify-end w-full">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 p-1.5 shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-full border border-dashed border-amber-950/40 flex flex-col items-center justify-center text-amber-950">
                  <Scale className="w-8 h-8 mb-0.5 stroke-[2]" />
                  <span className="text-[8px] font-black uppercase tracking-wider">C2TECH</span>
                  <span className="text-[7px] font-bold uppercase">VERIFICADO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Main Copy */}
          <div className="md:col-span-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                Softwares completos. Preços acessíveis. Confiança real.
              </h2>
              <p>
                A <strong>C2Tech</strong> nasceu com uma missão clara: tornar{' '}
                <strong>
                  softwares profissionais de engenharia, arquitetura, design e produtividade
                  acessíveis para todos
                </strong>
                , sem mensalidades abusivas e sem surpresas desagradáveis.
              </p>
              <p>
                Observamos um mercado onde estudantes, engenheiros, arquitetos, marceneiros e
                designers muitas vezes precisam escolher entre pagar assinaturas anuais caríssimas
                ou arriscar seus computadores em sites inseguros. Por isso criamos uma alternativa
                sólida, baseada em valores claros:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 font-semibold text-slate-900">
                <li>Softwares 100% completos, testados e livres de vírus</li>
                <li>Funcionamento vitalício real (pagamento único, sem mensalidades)</li>
                <li>Preços justos e acessíveis para a realidade brasileira</li>
                <li>Suporte técnico humano, rápido e especializado via WhatsApp</li>
              </ul>
              <p>Esses princípios guiam cada decisão e cada atendimento que realizamos.</p>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                A confiança do cliente em primeiro lugar
              </h3>
              <p>
                Nossa credibilidade é comprovada por uma avaliação média de{' '}
                <strong>4.8/5 estrelas</strong>, conquistada através da satisfação de milhares de
                profissionais e escritórios atendidos em todo o Brasil.
              </p>
              <p>
                Com nosso catálogo especializado em soluções como{' '}
                <strong>
                  AutoCAD, Revit, SketchUp Pro, CYPE, Eberick + Builder, Promob, CorelDRAW, Pacote
                  Adobe e Microsoft Office
                </strong>
                , garantimos conhecimento técnico profundo e suporte qualificado para entregar a
                versão ideal para cada computador (Windows ou Mac).
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
                Por que nossos preços são tão competitivos?
              </h3>
              <p>
                Conseguimos oferecer valores altamente acessíveis graças ao nosso modelo de
                distribuição 100% digital e automatizado: você recebe diretamente no seu e-mail os
                arquivos de instalação completos hospedados em nossos servidores de alta velocidade
                no Google Drive, acompanhados de <strong>vídeo tutorial passo a passo</strong>{' '}
                gravado pela nossa própria equipe técnica.
              </p>
              <p>
                Sem custos de mídia física, frete ou intermediários comerciais, você adquire o
                software completo com desempenho integral, pronto para trabalhar offline e com{' '}
                <Link to="/entrega-e-pagamento" className="text-[#0b5ed7] font-bold hover:underline">
                  garantia de 30 dias de suporte técnico assistido
                </Link>
                .
              </p>
            </div>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Section: Why choose C2Tech? (6 Cards Grid matching Screenshot 4) */}
        <div className="space-y-8">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 text-center">
            Por que escolher a C2Tech?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0b5ed7] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Software Completo
                <br />e Vitalício
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nossos softwares são <strong>100% completos e vitalícios</strong>. Cada produto
                acompanha <strong>download direto no Google Drive</strong> e tutorial em vídeo,
                garantindo <strong>integridade, segurança</strong> e{' '}
                <strong>instalação descomplicada</strong>.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0b5ed7] flex items-center justify-center">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Pagamentos
                <br />
                Seguros
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Todas as <strong>transações</strong> são protegidas por{' '}
                <strong>criptografia SSL</strong> e processadas por plataformas líderes no Brasil
                como <strong>Efí Bank (Pix)</strong> e <strong>Cakto (Cartões de Crédito)</strong>.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0b5ed7] flex items-center justify-center">
                <Headphones className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Suporte Técnico
                <br />
                Gratuito
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nossa equipe de <strong>especialistas</strong> está disponível via{' '}
                <strong>WhatsApp, e-mail ou acesso remoto</strong> durante 30 dias para apoiar você
                em cada etapa — <strong>instalação, ativação</strong> ou{' '}
                <strong>configuração</strong>.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0b5ed7] flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Garantia de
                <br />
                30 Dias
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Você tem <strong>30 dias de garantia de suporte técnico</strong> para solicitar{' '}
                <strong>auxílio remoto, substituição</strong> ou <strong>reembolso</strong> caso o
                software não funcione no seu equipamento. Veja os detalhes em nossos{' '}
                <Link to="/termos" className="text-[#0b5ed7] font-bold hover:underline">
                  Termos e Garantia
                </Link>
                .
              </p>
            </div>

            {/* Card 5 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Proteção Total ao
                <br />
                Comprador
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada pedido conta com a <strong>Proteção ao Comprador C2Tech</strong>, assegurando a
                entrega imediata dos arquivos verificados e disponibilidade do link caso você
                precise reinstalar após formatar o PC.
              </p>
            </div>

            {/* Card 6 */}
            <div className="bg-[#f4f6f8] rounded-2xl p-7 text-center flex flex-col items-center space-y-3 border border-slate-200/60">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-[#0b5ed7] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                Entrega Imediata
                <br />
                no E-mail
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                O link de download é enviado <strong>automaticamente por e-mail 24h por dia</strong>
                , poucos segundos após a confirmação do pagamento. Sempre incluímos{' '}
                <strong>instruções passo a passo em vídeo</strong> para instalação rápida e fácil.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Trustpilot Reviews Bar */}
        <div className="my-10 py-6 px-4 sm:px-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-3 flex flex-col items-center text-center border-b lg:border-b-0 lg:border-r border-slate-200 pb-4 lg:pb-0 lg:pr-4">
              <a
                href="#trustpilot"
                onClick={(e) => {
                  e.preventDefault();
                  setIsGuaranteesModalOpen(true);
                }}
                className="space-y-2 cursor-pointer group"
              >
                <p className="font-display font-extrabold text-xl text-slate-900 tracking-tight">Excellent</p>
                <div className="flex items-center justify-center gap-1">
                  <TrustpilotStars count={5} size="w-6 h-6" starSize="w-3.5 h-3.5" />
                </div>
                <p className="text-xs text-slate-600">
                  Based on <span className="underline font-semibold text-slate-900">1,782 reviews</span>
                </p>
                <div className="pt-1 flex items-center justify-center">
                  <TrustpilotLogo starSize="w-5 h-5" textSize="text-base" />
                </div>
              </a>
            </div>

            <div className="lg:col-span-9 relative flex items-center">
              <button
                type="button"
                onClick={() =>
                  setTrustpilotSlideIndex((prev) =>
                    prev === 0 ? TRUSTPILOT_REVIEWS.length - 1 : prev - 1
                  )
                }
                className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center shrink-0 mr-2 cursor-pointer"
                aria-label="Avaliação anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 flex-1 overflow-hidden">
                {[0, 1, 2, 3].map((offset) => {
                  const item =
                    TRUSTPILOT_REVIEWS[
                      (trustpilotSlideIndex + offset) % TRUSTPILOT_REVIEWS.length
                    ];
                  return (
                    <div
                      key={item.id}
                      className="block p-3 rounded-xl bg-slate-50/70 border border-slate-100 text-left space-y-1.5"
                    >
                      <div className="flex items-center gap-1.5">
                        <TrustpilotStars count={item.rating ?? 5} size="w-3.5 h-3.5" starSize="w-2.5 h-2.5" />
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5 font-semibold">
                          <CheckCircle2 className="w-3 h-3 text-[#00b67a]" /> Verificado no Trustpilot
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</p>
                      <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                        {item.comment}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium pt-0.5">
                        <span className="font-semibold text-slate-600">{item.author}</span>,{' '}
                        {item.timeAgo}
                      </p>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() =>
                  setTrustpilotSlideIndex((prev) => (prev + 1) % TRUSTPILOT_REVIEWS.length)
                }
                className="w-7 h-7 rounded-full border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 flex items-center justify-center shrink-0 ml-2 cursor-pointer"
                aria-label="Próxima avaliação"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-center lg:text-left lg:pl-[26%]">
            <button
              type="button"
              onClick={() => setIsGuaranteesModalOpen(true)}
              className="text-[11px] text-slate-500 hover:text-slate-800 cursor-pointer font-medium"
            >
              Exibindo nossas avaliações de 4 & 5 estrelas
            </button>
          </div>
        </div>
      </div>
      <TrustGuaranteesModal isOpen={isGuaranteesModalOpen} onClose={() => setIsGuaranteesModalOpen(false)} />
    </div>
  );
};
