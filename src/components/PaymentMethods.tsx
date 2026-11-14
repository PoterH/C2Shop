const methods = [
  { name: 'Pix', file: 'pix' },
  { name: 'Visa', file: 'visa' },
  { name: 'Mastercard', file: 'mastercard' },
  { name: 'American Express', file: 'american-express' },
  { name: 'Elo', file: 'elo' },
];

export function PaymentMethods() {
  return (
    <div className="grid w-full max-w-sm grid-cols-5 items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
      {methods.map(method => (
        <div key={method.file} className="flex h-9 min-w-0 items-center justify-center rounded-md bg-white">
          <img src={`/images/payments/${method.file}.svg`} alt={method.name} width="44" height="30" className="h-7 w-full object-contain" loading="lazy" />
        </div>
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
