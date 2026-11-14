import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { useText } from '../hooks/useText';
import React from 'react';
import { BadgeCheck, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ThankYouPage: React.FC = () => {
  const localize = useText();
  const whatsappNumber = '5581997349300'; // Substitua pelo seu número real do WhatsApp
  const whatsappMessage = encodeURIComponent(localize('Olá! Fiz uma compra na C2Tech e gostaria de solicitar suporte de instalação / confirmar meu pedido.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen flex items-center justify-center text-left">
      <div className="max-w-xl w-full px-4">

        {/* Main Card */}
        <div className="bg-white rounded-3xl border border-slate-150 shadow-xl p-8 sm:p-10 text-center space-y-6">

          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-feedback-success/10 border border-feedback-success/20 text-feedback-success flex items-center justify-center mx-auto">
            <BadgeCheck className="w-10 h-10" />
          </div>

          {/* Title & Main Text */}
          <div className="space-y-2">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {localize("Pedido Confirmado!")}</h1>
            <p className="text-slate-600 text-sm sm:text-base">
              {localize("Obrigado pela compra. O acesso ao seu software será enviado de forma ")}<strong>{localize("100% automática")}</strong> {localize(" para o e-mail informado no checkout em instantes.")}</p>
          </div>

          {/* Verification folders list */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-3">
            <p className="text-xs font-bold text-slate-700 flex items-center">
              <Mail className="w-4 h-4 text-sky-500 mr-2 shrink-0" />
              {localize("Verifique as seguintes pastas em seu e-mail:")}</p>
            <ul className="grid grid-cols-2 gap-2 text-xs text-slate-600 font-medium pl-6 list-disc">
              <li>{localize("Caixa de Entrada")}</li>
              <li>{localize("Spam / Lixo Eletrônico")}</li>
              <li>{localize("Aba de Promoções")}</li>
              <li>{localize("Outros / Filtros")}</li>
            </ul>
          </div>

          {/* If not found information */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-left flex items-start space-x-3 text-xs text-slate-655 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-slate-800">{localize("Não localizou o e-mail de acesso?")}</p>
              <p>
                {localize("Não se preocupe! Entre em contato imediato com nosso suporte técnico informando os seguintes dados para localizarmos seu pedido:")}</p>
              <ul className="list-disc pl-4 mt-1 font-semibold text-slate-700">
                <li>{localize("Nome completo")}</li>
                <li>{localize("E-mail utilizado na compra")}</li>
                <li>{localize("Comprovante de pagamento")}</li>
              </ul>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-3 bg-feedback-success hover:bg-emerald-600 text-white font-bold rounded-2xl text-sm transition-all shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              {localize("Falar com suporte")}</a>
            <Link
              to="/"
              className="flex-1 flex items-center justify-center py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-sm transition-all"
            >
              {localize("Voltar ao Início")}<ArrowRight className="w-4 h-4 ml-2 text-slate-500" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
