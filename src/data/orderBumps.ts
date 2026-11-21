import { products, type LicenseOption, type Product } from './products.js';

// Checkout order bump: one-click add-ons at 10% off, shown next to the payment step.
// The same rule is enforced by api/checkout.ts so the charged total always matches.
export const ORDER_BUMP_DISCOUNT_PERCENT = 10;
export const MAX_ORDER_BUMPS = 2;

export const orderBumpPrice = (price: number) => Math.round(price * (100 - ORDER_BUMP_DISCOUNT_PERCENT)) / 100;

type Platform = 'Windows' | 'macOS';

// Specific complements: the tool people most often buy together with each product.
const COMPLEMENTS: Record<string, string[]> = {
  sketchup_2026_win: ['vray_7'],
  rhinoceros_8: ['vray_7'],
  '3ds_max_2027': ['vray_7'],
  revit_2027: ['enscape'],
  archicad_30: ['enscape'],
  parallels_desktop_26: ['windows_11_pro'],
  adobe_acrobat_pro_2026: ['office_25_win'],
  office_25_win: ['project_pro_2024'],
  office_2021_win: ['project_pro_2024'],
  office_2019_win: ['project_pro_2024'],
  office_2016_win: ['project_pro_2024'],
};

// Complements that only run on Windows are never offered to a macOS edition.
const WINDOWS_ONLY = new Set(['vray_7', 'enscape', 'project_pro_2024', 'windows_11_pro', 'windows_10_pro', 'office_25_win']);

const OFFICE_IDS = new Set(['office_25_win', 'office_2024_mac', 'office_2021_win', 'office_2021_mac', 'office_2019_win', 'office_2019_mac', 'office_2016_win', 'combo_acrobat_office_2024', 'combo_windows11_office_2024']);
const WINDOWS_KEY_IDS = new Set(['windows_11_pro', 'windows_10_pro', 'combo_windows11_office_2024']);

const itemPlatform = (item: Product): Platform =>
  item.selectedLicenseOption?.platform || (item.compatibility === 'macOS' ? 'macOS' : 'Windows');

/** The edition a bump adds: the cheapest Windows edition (or the product itself when it has none). */
export const orderBumpOption = (product: Product): LicenseOption | undefined =>
  product.licenseOptions
    ?.filter(option => !option.platform || option.platform === 'Windows')
    .reduce<LicenseOption | undefined>((cheapest, option) => (!cheapest || option.price < cheapest.price ? option : cheapest), undefined);

export const orderBumpBasePrice = (product: Product) => orderBumpOption(product)?.price ?? product.price;

export function getOrderBumpOffers(cartItems: Product[]): Product[] {
  const mainItems = cartItems.filter(item => !item.orderBump);
  if (!mainItems.length) return [];

  const inCart = new Set(cartItems.map(item => item.id));
  const hasOffice = cartItems.some(item => OFFICE_IDS.has(item.id));
  const hasWindowsKey = cartItems.some(item => WINDOWS_KEY_IDS.has(item.id));
  const hasWindows = mainItems.some(item => itemPlatform(item) === 'Windows');
  const hasMac = mainItems.some(item => itemPlatform(item) === 'macOS');

  const candidates: string[] = [];
  for (const item of mainItems) {
    for (const id of COMPLEMENTS[item.id] || []) {
      if (itemPlatform(item) === 'macOS' && WINDOWS_ONLY.has(id) && item.id !== 'parallels_desktop_26') continue;
      candidates.push(id);
    }
  }
  // Preferred defaults: Office 2024 for the buyer's platform, then a Windows key.
  if (!hasOffice) candidates.push(hasWindows || !hasMac ? 'office_25_win' : 'office_2024_mac');
  if (hasWindows && !hasWindowsKey) candidates.push('windows_11_pro');
  if (hasMac && !hasOffice) candidates.push('office_2024_mac');

  const offers: Product[] = [];
  for (const id of candidates) {
    if (offers.length >= MAX_ORDER_BUMPS) break;
    if (inCart.has(id) || offers.some(offer => offer.id === id)) continue;
    if (OFFICE_IDS.has(id) && (hasOffice || offers.some(offer => OFFICE_IDS.has(offer.id)))) continue;
    if (WINDOWS_KEY_IDS.has(id) && hasWindowsKey) continue;
    const product = products.find(candidate => candidate.id === id && !candidate.unavailable);
    if (product) offers.push(product);
  }
  return offers;
}
