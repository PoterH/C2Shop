import type { LanguageCode } from './locale';

const MS_PER_DAY = 86_400_000;
const BASE_REVIEW_COUNT = 1785;

/**
 * Base elapsed days for each Trustpilot store review on the anchor date (2026-11-14).
 * Reviews 1 and 2 are within the first week (<= 7 days); reviews 3..8 are older than 1 week
 * so they display their formatted calendar date per Trustpilot's real UI convention.
 */
export const TRUSTPILOT_REVIEW_BASE_DAYS: Record<number, number> = {
  1: 2,
  2: 4,
  3: 11,
  4: 23,
  5: 44,
  6: 79,
  7: 114,
  8: 149,
};

const PT_SHORT_MONTHS = [
  'jan.',
  'fev.',
  'mar.',
  'abr.',
  'mai.',
  'jun.',
  'jul.',
  'ago.',
  'set.',
  'out.',
  'nov.',
  'dez.',
];

const PT_LONG_MONTHS = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
];

const ES_SHORT_MONTHS = [
  'ene.',
  'feb.',
  'mar.',
  'abr.',
  'may.',
  'jun.',
  'jul.',
  'ago.',
  'sept.',
  'oct.',
  'nov.',
  'dic.',
];

const ES_LONG_MONTHS = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

const EN_SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const EN_LONG_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * Computes full calendar days elapsed since the Trustpilot baseline anchor date (2026-11-14).
 */
export function getTrustpilotElapsedDays(now: Date = new Date()): number {
  const currentDayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  ).getTime();

  const anchor2026 = new Date(2026, 10, 14, 0, 0, 0, 0).getTime();

  if (currentDayMidnight >= anchor2026) {
    return Math.max(0, Math.round((currentDayMidnight - anchor2026) / MS_PER_DAY));
  }

  const fallbackAnchor = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0).getTime();
  return Math.max(1, Math.round((currentDayMidnight - fallbackAnchor) / MS_PER_DAY));
}

/**
 * Returns the exact number of days ago for a Trustpilot review given its base offset.
 */
export function getTrustpilotReviewDaysAgo(baseDays: number, now: Date = new Date()): number {
  return Math.max(1, baseDays + getTrustpilotElapsedDays(now));
}

/**
 * Computes the calendar Date object for a review based on its `baseDays` offset from the anchor date.
 */
export function getTrustpilotReviewDate(baseDays: number, now: Date = new Date()): Date {
  const currentDayMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  ).getTime();
  const days = getTrustpilotReviewDaysAgo(baseDays, now);
  return new Date(currentDayMidnight - days * MS_PER_DAY);
}

/**
 * Formats the review header date:
 * - If <= 7 days (within 1 week): relative days ("Há 3 dias")
 * - If > 7 days (older than 1 week): short calendar date ("27 de ago. de 2026")
 */
export function formatTrustpilotDaysAgo(
  baseDays: number,
  language: LanguageCode,
  now: Date = new Date()
): string {
  const days = getTrustpilotReviewDaysAgo(baseDays, now);

  if (days <= 7) {
    if (language === 'en') {
      return days === 1 ? '1 day ago' : `${days} days ago`;
    }
    if (language === 'es') {
      return days === 1 ? 'Hace 1 día' : `Hace ${days} días`;
    }
    return days === 1 ? 'Há 1 dia' : `Há ${days} dias`;
  }

  const dateObj = getTrustpilotReviewDate(baseDays, now);
  const dayNum = dateObj.getDate();
  const monthIdx = dateObj.getMonth();
  const yearNum = dateObj.getFullYear();

  if (language === 'en') {
    return `${EN_SHORT_MONTHS[monthIdx]} ${dayNum}, ${yearNum}`;
  }
  if (language === 'es') {
    return `${dayNum} de ${ES_SHORT_MONTHS[monthIdx]} de ${yearNum}`;
  }
  return `${dayNum} de ${PT_SHORT_MONTHS[monthIdx]} de ${yearNum}`;
}

/**
 * Formats the full experience date shown inside the grey badge below the review text
 * (e.g. "27 de agosto de 2026" / "23 de julho de 2026").
 */
export function formatTrustpilotExperienceDate(
  baseDays: number,
  language: LanguageCode,
  now: Date = new Date()
): string {
  const dateObj = getTrustpilotReviewDate(baseDays, now);
  const dayNum = dateObj.getDate();
  const monthIdx = dateObj.getMonth();
  const yearNum = dateObj.getFullYear();

  if (language === 'en') {
    return `${EN_LONG_MONTHS[monthIdx]} ${dayNum}, ${yearNum}`;
  }
  if (language === 'es') {
    return `${dayNum} de ${ES_LONG_MONTHS[monthIdx]} de ${yearNum}`;
  }
  return `${dayNum} de ${PT_LONG_MONTHS[monthIdx]} de ${yearNum}`;
}

/**
 * Calculates the total Trustpilot review count, growing deterministically by 1 to 2 reviews every day.
 */
export function getTrustpilotReviewCount(now: Date = new Date()): number {
  const elapsedDays = getTrustpilotElapsedDays(now);
  let total = BASE_REVIEW_COUNT;

  for (let day = 1; day <= elapsedDays; day++) {
    const dailyIncrement = ((day * 5 + 1) % 2) + 1;
    total += dailyIncrement;
  }

  return total;
}

/**
 * Formats the Trustpilot review count with the appropriate thousands separator for the active language.
 */
export function formatTrustpilotReviewCount(
  language: LanguageCode,
  now: Date = new Date()
): string {
  const count = getTrustpilotReviewCount(now);
  if (language === 'en') {
    return count.toLocaleString('en-US');
  }
  return count.toLocaleString('pt-BR');
}

/**
 * Returns the localized "<count> avaliações / reviews / opiniones" string for Trustpilot badges.
 */
export function getTrustpilotReviewsLabel(
  language: LanguageCode,
  now: Date = new Date()
): string {
  const formattedCount = formatTrustpilotReviewCount(language, now);
  if (language === 'en') {
    return `${formattedCount} reviews`;
  }
  if (language === 'es') {
    return `${formattedCount} opiniones`;
  }
  return `${formattedCount} avaliações`;
}

/**
 * Returns the localized "(<count> clientes satisfeitos)" string for the Trustpilot modal header.
 */
export function getTrustpilotSatisfiedCustomersLabel(
  language: LanguageCode,
  now: Date = new Date()
): string {
  const formattedCount = formatTrustpilotReviewCount(language, now);
  if (language === 'en') {
    return `(${formattedCount} satisfied customers)`;
  }
  if (language === 'es') {
    return `(${formattedCount} clientes satisfechos)`;
  }
  return `(${formattedCount} clientes satisfeitos)`;
}
