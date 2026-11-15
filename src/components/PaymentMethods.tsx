const methods = [
  { name: 'American Express', file: 'amex.png', heightClass: 'h-8 sm:h-9' },
  { name: 'Visa', file: 'visa.png', heightClass: 'h-5 sm:h-6' },
  { name: 'Mastercard', file: 'mastercard.png', heightClass: 'h-8 sm:h-9' },
  { name: 'Elo', file: 'elo.png', heightClass: 'h-5 sm:h-6' },
  { name: 'Pix', file: 'pix.png', heightClass: 'h-6 sm:h-7' },
  { name: 'Boleto Bancário', file: 'boleto.png', heightClass: 'h-7 sm:h-8' },
];

export function PaymentMethods() {
  return (
    <div className="flex flex-wrap items-center justify-start sm:justify-end gap-4 sm:gap-5">
      {methods.map(method => (
        <img
          key={method.file}
          src={`/images/payments/${method.file}`}
          alt={method.name}
          title={method.name}
          className={`${method.heightClass} w-auto object-contain select-none`}
          loading="lazy"
        />
      ))}
    </div>
  );
}

export function DigitalDeliveryArt() {
  return (
    <svg viewBox="0 0 240 90" className="h-24 w-60 max-w-full" aria-hidden="true" fill="none">
      <path d="M67 46c28 41 52-25 96 4s-5 40-17 22c-14-22 32-43 66-19" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round" />
      <path d="M20 15 94 34 61 72 49 45Z" fill="#38bdf8" />
      <path d="m49 45 45-11-33 38 2-25-43-32Z" fill="#0284c7" />
      <path d="m20 15 43 32 31-13-45 11Z" fill="#7dd3fc" />
    </svg>
  );
}
