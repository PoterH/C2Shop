import { ChevronDown } from 'lucide-react';
import { useText } from '../hooks/useText';

const TINTS = ['#0066ff', '#0f766e', '#c2410c'];

/** "See all reviews" control: the next reviewers' initials, the remaining count and a turning chevron. */
export function ReviewsMoreButton({ open, count, initials, onToggle }: {
  open: boolean; count: number; initials: string[]; onToggle: () => void;
}) {
  const localize = useText();
  return (
    <div className="rv-more-wrap">
      <button
        type="button"
        className="rv-more"
        data-open={open ? 'true' : 'false'}
        aria-expanded={open}
        aria-controls="product-reviews-more"
        onClick={onToggle}
      >
        <span className="rv-more-faces" aria-hidden="true">
          {initials.map((c, i) => (
            <span key={i} className="rv-more-face" style={{ background: TINTS[i % TINTS.length], zIndex: 3 - i }}>{c}</span>
          ))}
          {count > initials.length && <span className="rv-more-face rv-more-face--count">+{count - initials.length}</span>}
        </span>
        <span className="rv-more-text">
          <span className="rv-more-title">
            {open ? localize('Mostrar menos avaliações') : localize('Ver todas as avaliações')}
          </span>
          <span className="rv-more-sub">
            {open ? localize('Voltar para as 5 mais recentes') : localize(count === 1 ? 'Mais {n} avaliação de cliente' : 'Mais {n} avaliações de clientes').replace('{n}', String(count))}
          </span>
        </span>
        <span className="rv-more-chevron" aria-hidden="true"><ChevronDown className="w-4 h-4" /></span>
      </button>
    </div>
  );
}
