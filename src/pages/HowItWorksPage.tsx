import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useText } from '../hooks/useText';
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, CreditCard, Mail, Settings, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const localize = useText();
  const steps = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-sky-600" />,
      title: '1. Escolha o Produto',
      desc: 'Navegue pelo nosso catálogo completo contendo Licenças Vitalícias profissionais (engenharia, arquitetura, escritório) ou Planos de Assinatura Mensal (design, criatividade). Escolha a opção correspondente ao seu caso.'
    },
    {
      icon: <CreditCard className="w-8 h-8 text-emerald-600" />,
      title: '2. Finalize o Pedido',
      desc: 'Finalize a compra com segurança criptografada em nosso checkout. Você pode efetuar o pagamento via Pix ou Cartão de Crédito (nota: as assinaturas mensais recorrentes são processadas exclusivamente via Pix).'
    },
    {
      icon: <Mail className="w-8 h-8 text-sky-600" />,
      title: '3. Receba no E-mail',
      desc: 'Após a aprovação do pagamento, você recebe imediatamente as instruções no seu e-mail: links de download com tutoriais para licenças vitalícias, ou credenciais de login e senha oficiais para assinaturas mensais.'
    },
    {
      icon: <Settings className="w-8 h-8 text-emerald-600" />,
      title: '4. Instalação ou Login Oficial',
      desc: 'Baixe e instale o software localmente ou faça o login oficial na plataforma com os dados recebidos. Caso surja qualquer dúvida, nossa equipe de suporte assistido estará de prontidão no WhatsApp.'
    }
  ];

  const whatsappNumber = '5581997349300'; // Substitua pelo seu número real do WhatsApp
  const whatsappMessage = encodeURIComponent(localize('Olá, gostaria de saber mais sobre o funcionamento da entrega e do suporte da C2Tech.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="bg-feedback-success/10 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider inline-block">
            {localize("Processo Simples e Transparente")}</span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {localize("Como funciona a C2Tech?")}</h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto text-center">
            {localize("Entenda detalhadamente cada etapa da sua jornada, desde a escolha do software até a instalação no seu computador.")}</p>
        </div>

        {/* Steps Detailed Card List */}
        <div className="space-y-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start"
            >
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shrink-0">
                {step.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-slate-900">
                  {localize(step.title)}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {localize(step.desc)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action banner */}
        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
            {localize("Pronto para adquirir seu software profissional?")}</h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            {localize("Acesso vitalício, pagamento único e suporte de instalação dedicado ao seu dispor.")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              to="/catalogo"
              className="px-6 py-3.5 bg-action-primary hover:bg-action-primary-hover text-white font-bold rounded-2xl shadow hover:shadow-lg transition-all flex items-center justify-center"
            >
              {localize("Navegar no catálogo")}<ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-755 text-slate-200 hover:text-white font-bold rounded-2xl border border-slate-700 transition-all flex items-center justify-center"
            >
              <WhatsAppIcon className="w-5 h-5 text-feedback-success mr-2" />
              {localize("Tirar dúvidas no WhatsApp")}</a>
          </div>
        </div>

      </div>
    </div>
  );
};
