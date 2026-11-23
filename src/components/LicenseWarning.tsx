import { TriangleAlert } from 'lucide-react';
import { useText } from '../hooks/useText';

/** Amber notice for a license option the buyer should know about before paying. */
export function LicenseWarning({ text, compact = false }: { text: string; compact?: boolean }) {
  const localize = useText();
  return (
    <div
      role="note"
      className={`flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 ${
        compact ? 'mt-2 px-2.5 py-2 text-xs' : 'mt-2 px-3 py-2.5 text-xs sm:text-sm'
      }`}
    >
      <TriangleAlert aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
      <p className="leading-snug">
        <strong className="font-semibold">{localize('Atenção:')} </strong>
        {text}
      </p>
    </div>
  );
}
