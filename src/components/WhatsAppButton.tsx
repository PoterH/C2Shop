import { WhatsAppIcon } from './WhatsAppIcon';
import { useText } from '../hooks/useText';
import React from 'react';
import { trackEvent } from '../utils/pixel';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '5581997349300', // Substitua pelo seu número real do WhatsApp
  message = 'Olá, tenho interesse em um software da C2Tech e gostaria de tirar uma dúvida.'
}) => {
  const localize = useText();
  const encodedMessage = encodeURIComponent(localize(message));
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('Contact', { content_name: 'WhatsApp Flutuante' })}
      className="motion-press motion-hover-scale fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-feedback-success hover:bg-feedback-success-strong text-white rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 group"
      aria-label={localize("Falar no WhatsApp")}
      id="whatsapp-floating-btn"
    >
      {/* Icon */}
      <WhatsAppIcon className="w-8 h-8" />

      {/* Tooltip on hover */}
      <span className="motion-feedback absolute right-20 bg-slate-900 text-white text-sm font-medium py-2 px-3 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none border border-slate-700">
        {localize("Tire suas dúvidas")}</span>
    </a>
  );
};
