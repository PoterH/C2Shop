import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Send, CheckCircle2 } from 'lucide-react';

export const DeliveryPaymentPage: React.FC = () => {
  const whatsappNumber = '5581997349300';
  const whatsappMessage = encodeURIComponent(
    'Olá, gostaria de tirar uma dúvida sobre a entrega digital e formas de pagamento da C2Tech.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    document.title = 'Entrega Digital e Pagamento Seguro | C2Tech';
  }, []);

  return (
    <div className="pt-28 pb-16 bg-white min-h-screen text-left">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-800 transition-colors">
          Início
        </Link>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#0b5ed7] font-semibold">Entrega e Pagamento</span>
      </div>

      {/* Dark Navy Hero Banner */}
      <div className="bg-[#0f212e] text-white py-14 sm:py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2196f3] tracking-tight">
            Entrega Digital e Pagamento Seguro
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto">
            Na C2Tech entendemos que a rapidez na entrega e a segurança no pagamento são essenciais
            para a sua tranquilidade. Abaixo explicamos detalhadamente como funcionam nossas opções
            de envio imediato por e-mail e processamento criptografado de pagamentos.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Two Top Highlight Cards (Matching Screenshot 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Card 1: Pagamentos Seguros */}
          <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/70 p-7 flex flex-col items-center text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-[#0b5ed7] flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-display font-extrabold text-base text-slate-900 mb-1">
              Pagamentos Seguros
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Pagamento 100% protegido com
              <br />
              criptografia SSL de 256 bits
            </p>
            <p className="text-[11px] font-extrabold text-slate-800 mb-2">
              Satisfação garantida ou seu dinheiro de volta
              <br />
              <span className="font-semibold text-slate-600">Meios de pagamento disponíveis:</span>
            </p>
            <div className="bg-white border border-sky-200 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-center gap-2 shadow-2xs">
              <span className="text-xs font-black text-[#32BCAD] tracking-tight">PIX</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-black text-[#0E4595] italic">VISA</span>
              <span className="inline-flex items-center">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EB001B] inline-block" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] inline-block -ml-1.5" />
              </span>
              <span className="text-[10px] font-black bg-[#0077A6] text-white px-1.5 py-0.5 rounded">
                AMEX
              </span>
              <span className="text-[10px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded">
                ELO
              </span>
            </div>
          </div>

          {/* Card 2: Entrega Imediata */}
          <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/70 p-7 flex flex-col items-center text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-[#0b5ed7] flex items-center justify-center mb-3">
              <Send className="w-6 h-6" />
            </div>
            <h2 className="font-display font-extrabold text-base text-slate-900 mb-1">
              Entrega Imediata
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Envio automático em poucos minutos no seu e-mail
            </p>
            <p className="text-[11px] font-extrabold text-slate-800 leading-snug mb-4 max-w-xs">
              Entrega por e-mail do link exclusivo de download (Google Drive) e instruções passo a
              passo em vídeo
            </p>
            <div className="mt-auto flex items-center justify-center gap-2 text-[#2196f3]">
              <Send className="w-7 h-7 -rotate-12" />
              <span className="w-16 border-b-2 border-dashed border-sky-300" />
            </div>
          </div>
        </div>

        {/* Detailed Text Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Processamento de pagamento 100% seguro
            </h3>
            <p>
              Na <strong>C2Tech</strong>, levamos a segurança das suas informações financeiras muito
              a sério e implementamos medidas rigorosas para garantir que sua compra seja totalmente
              protegida do início ao fim. Veja por que você pode confiar em nossa plataforma:
            </p>
            <p>
              <strong>Transações criptografadas (SSL):</strong> Todas as informações transmitidas
              durante o checkout são criptografadas utilizando tecnologia padrão da indústria{' '}
              <strong>Secure Sockets Layer (SSL de 256 bits)</strong>. Isso significa que seus dados
              estão blindados e jamais podem ser interceptados por terceiros.
            </p>
            <p>
              <strong>Gateways Homologados (Efí Bank e Cakto):</strong> Nossos pagamentos via Pix são
              processados em tempo real diretamente pelo <strong>Efí Bank (antiga Gerencianet)</strong>,
              instituição de pagamento homologada pelo Banco Central do Brasil, e os pagamentos via
              Cartão de Crédito são processados pela <strong>Cakto</strong> com certificação{' '}
              <strong>PCI DSS Compliance</strong>.
            </p>
            <p>
              <strong>Nenhum armazenamento de dados de cartão:</strong> Nós não gravamos nem temos
              acesso aos dados do seu cartão de crédito em nossos servidores. Quando você realiza o
              pagamento, os dados são processados exclusivamente pela operadora autorizada, e nós
              recebemos apenas a confirmação de liberação do seu pedido para disparar o seu software.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Meios de Pagamento
            </h3>
            <p>
              Aceitamos os principais métodos de pagamento do Brasil para que você escolha a opção
              mais prática:
            </p>

            <div className="space-y-2.5 pt-1">
              <div>
                <h4 className="font-bold text-slate-900">Pix (Aprovação Instantânea)</h4>
                <p className="text-slate-600">
                  Ao escolher o Pix em nosso checkout transparente, um QR Code exclusivo e código
                  "Pix Copia e Cola" são gerados na hora. Assim que você confirma o pagamento no
                  aplicativo do seu banco, nosso sistema reconhece em poucos segundos e libera
                  automaticamente o envio do software para o seu e-mail.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  Cartão de Crédito (Visa, Mastercard, Elo, American Express e Hipercard)
                </h4>
                <p className="text-slate-600">
                  Aceitamos todas as principais bandeiras de cartão de crédito, com opção de
                  pagamento à vista ou parcelado em até 12x através do ambiente seguro da Cakto. A
                  aprovação costuma ocorrer em menos de 1 minuto e o envio no e-mail também é
                  totalmente automático.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Como funciona a Entrega Digital
            </h3>
            <p>
              Sabemos que você precisa do seu software funcionando o quanto antes para estudar ou
              trabalhar. Por isso, nossa entrega é <strong>100% digital e automatizada</strong>:
            </p>
            <ul className="space-y-2 pl-1">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Softwares Completos de Acesso Vitalício:</strong> Assim que o pagamento é
                  aprovado, você recebe um e-mail contendo o botão de acesso direto à nossa pasta
                  exclusiva no <strong>Google Drive de alta velocidade</strong>, com o instalador
                  completo da versão escolhida e um <strong>vídeo tutorial passo a passo</strong>{' '}
                  mostrando cada clique da instalação e ativação definitiva.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Chaves Originais e Planos de Assinatura:</strong> Para chaves de ativação
                  do Windows ou assinaturas oficiais (como Autodesk All Apps), o acesso e as credenciais
                  são entregues imediatamente por e-mail e WhatsApp com acompanhamento da nossa equipe.
                </span>
              </li>
            </ul>
            <p className="text-slate-600 pt-1">
              <em>Importante:</em> Em alguns casos, o provedor de e-mail pode filtrar mensagens
              automáticas na aba <strong>Spam</strong>, <strong>Lixo Eletrônico</strong> ou{' '}
              <strong>Promoções</strong>. Caso não localize o e-mail em até 5 minutos após a compra,
              basta chamar nosso{' '}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0b5ed7] font-bold hover:underline"
              >
                suporte no WhatsApp clicando aqui
              </a>{' '}
              que reenviamos seu link imediatamente.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pb-6 border-b border-slate-200">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Garantia de Suporte Técnico (30 Dias) e Reembolso
            </h3>
            <p>
              Todos os nossos softwares vitalícios possuem <strong>funcionamento vitalício</strong>{' '}
              sem mensalidades, acompanhados de <strong>30 dias de garantia de suporte técnico</strong>{' '}
              gratuito via WhatsApp e acesso remoto (AnyDesk/TeamViewer). Caso nossa equipe técnica
              comprove impossibilidade de instalação ou funcionamento no seu computador dentro do
              prazo de garantia, realizamos a substituição ou o reembolso integral. Para mais
              detalhes, consulte nossos{' '}
              <Link to="/termos" className="text-[#0b5ed7] font-bold hover:underline">
                Termos de Uso e Política de Garantia
              </Link>
              .
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900">
              Fale Conosco
            </h3>
            <p>
              Se você tiver qualquer dúvida sobre o envio digital, compatibilidade de versões ou
              formas de pagamento, nossa equipe de atendimento está disponível todos os dias pelo{' '}
              <strong>WhatsApp +55 (81) 99734-9300</strong> e pelo e-mail{' '}
              <strong>c2tech2025@gmail.com</strong>. Você também pode acessar nossa página de{' '}
              <Link to="/contato" className="text-[#0b5ed7] font-bold hover:underline">
                Atendimento ao Cliente aqui
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
