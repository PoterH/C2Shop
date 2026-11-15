import type { LanguageCode } from './locale';

const MS_PER_DAY = 86_400_000;
const BASE_REVIEW_COUNT = 1785;

/**
 * Base elapsed days for each of the 5 Trustpilot store reviews on the anchor date (2026-11-14):
 * 1: Carlos Eduardo M. (2 days)
 * 2: Fernanda S. Oliveira (4 days)
 * 3: Roberto Almeida Jr. (7 days)
 * 4: Juliana Costa (9 days)
 * 5: Marcos Vinícius T. (14 days)
 */
export const TRUSTPILOT_REVIEW_BASE_DAYS: Record<number, number> = {
  1: 2,
  2: 4,
  3: 7,
  4: 9,
  5: 14,
};

/**
 * Computes full calendar days elapsed since the Trustpilot baseline anchor date (2026-11-14).
 * Uses local calendar midnight so the day counter increments naturally every day at 00:00.
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

  // Anchor date: November 14, 2026 (or same month/day-1 in visitor's clock year if clock < Nov 14, 2026)
  const anchor2026 = new Date(2026, 10, 14, 0, 0, 0, 0).getTime();

  if (currentDayMidnight >= anchor2026) {
    return Math.max(0, Math.round((currentDayMidnight - anchor2026) / MS_PER_DAY));
  }

  // Fallback if visitor device clock is set to an earlier date (e.g., 2025 or early 2026)
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
 * Formats the real elapsed day count for a Trustpilot review according to the active language.
 */
export function formatTrustpilotDaysAgo(
  baseDays: number,
  language: LanguageCode,
  now: Date = new Date()
): string {
  const days = getTrustpilotReviewDaysAgo(baseDays, now);

  if (language === 'en') {
    return days === 1 ? '1 day ago' : `${days} days ago`;
  }
  if (language === 'es') {
    return days === 1 ? 'Hace 1 día' : `Hace ${days} días`;
  }
  return days === 1 ? 'Há 1 dia' : `Há ${days} dias`;
}

/**
 * Calculates the total Trustpilot review count, growing deterministically by 1 to 2 reviews every day.
 */
export function getTrustpilotReviewCount(now: Date = new Date()): number {
  const elapsedDays = getTrustpilotElapsedDays(now);
  let total = BASE_REVIEW_COUNT;

  for (let day = 1; day <= elapsedDays; day++) {
    // Deterministic daily increment of 1 or 2 reviews per day
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
