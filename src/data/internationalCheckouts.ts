import type { Product, LicenseOption } from './products';

// Mapping for products that have a single global/Windows version
export const INTERNATIONAL_PRODUCT_CHECKOUTS: Record<string, string> = {
  geo5_2024_win: 'https://pay.cakto.com.br/wnwwtv3',
  inventor_pro_2027: 'https://pay.cakto.com.br/37735sw',
  civil3d_2027: 'https://pay.cakto.com.br/8scpmou',
  navisworks_2027: 'https://pay.cakto.com.br/3ecwbop',
  sisdea_2025: 'https://pay.cakto.com.br/3ak3wq5',
  zwcad_2026: 'https://pay.cakto.com.br/r325a7y',
  tekla_2026: 'https://pay.cakto.com.br/exknqny',
  vray_7: 'https://pay.cakto.com.br/e82qig9',
  enscape: 'https://pay.cakto.com.br/gh579x5',
  proteus_9: 'https://pay.cakto.com.br/83ewp67',
  exocad_31: 'https://pay.cakto.com.br/ingnn23',
  parallels_desktop_26: 'https://pay.cakto.com.br/33d45v8',
  camtasia_2026: 'https://pay.cakto.com.br/f7sm4s6',
  pdfelement_12: 'https://pay.cakto.com.br/msedvrd',
  wondershare_recoverit_13: 'https://pay.cakto.com.br/36sg8ge',
  fl_studio_2025: 'https://pay.cakto.com.br/kuqjs4e',
  filmora_15: 'https://pay.cakto.com.br/3fq3yv4',
};

// Mapping for multi-version products by productId_optionQuantity
export const INTERNATIONAL_OPTION_CHECKOUTS: Record<string, string> = {
  // AutoCAD
  autocad_2027_win_2019: 'https://pay.cakto.com.br/w2y6f75_1247182',
  autocad_2027_win_2024: 'https://pay.cakto.com.br/yibwpho',
  autocad_2027_win_2025: 'https://pay.cakto.com.br/sdujqqx',
  autocad_2027_win_2026: 'https://pay.cakto.com.br/3ezmyhu',
  autocad_2027_win_2027: 'https://pay.cakto.com.br/3aoufpv',
  autocad_2027_win_20242: 'https://pay.cakto.com.br/oaey56p',
  autocad_2027_win_20272: 'https://pay.cakto.com.br/ac2i5bw',

  // Revit
  revit_2027_2024: 'https://pay.cakto.com.br/rg3wz8b',
  revit_2027_2025: 'https://pay.cakto.com.br/3babtb2',
  revit_2027_2026: 'https://pay.cakto.com.br/37bwbt8',
  revit_2027_2027: 'https://pay.cakto.com.br/v2cr8ee',

  // SketchUp Pro
  sketchup_2026_win_2021: 'https://pay.cakto.com.br/39i3zxa',
  sketchup_2026_win_2024: 'https://pay.cakto.com.br/v2zmw9g',
  sketchup_2026_win_2025: 'https://pay.cakto.com.br/46uu52z',
  sketchup_2026_win_2026: 'https://pay.cakto.com.br/9oqb6x2',
  sketchup_2026_win_20242: 'https://pay.cakto.com.br/32b7cbx',
  sketchup_2026_win_20262: 'https://pay.cakto.com.br/72fhxtn',

  // SolidWorks Premium
  solidworks_2026_2025: 'https://pay.cakto.com.br/wfidgca',
  solidworks_2026_2026: 'https://pay.cakto.com.br/aypd6zo',

  // AltoQi Eberick + Builder
  eberick_builder_2025_2024: 'https://pay.cakto.com.br/cgxe9xf',
  eberick_builder_2025_2025: 'https://pay.cakto.com.br/38q782i',
  eberick_builder_2025_2026: 'https://pay.cakto.com.br/3a4vxmt',

  // CYPE
  cype_2026_20251: 'https://pay.cakto.com.br/3672xji',
  cype_2026_20261: 'https://pay.cakto.com.br/3cpy9f8',
  cype_2026_20271: 'https://pay.cakto.com.br/qz48nkg',

  // ArchiCAD BRA
  archicad_30_281: 'https://pay.cakto.com.br/mgm7azd',
  archicad_30_291: 'https://pay.cakto.com.br/oidqniy',
  archicad_30_301: 'https://pay.cakto.com.br/bqytmz2',

  // CorelDRAW Graphics Suite
  coreldraw_2026_20141: 'https://pay.cakto.com.br/pbr3xer',
  coreldraw_2026_20221: 'https://pay.cakto.com.br/37sbqb4',
  coreldraw_2026_20231: 'https://pay.cakto.com.br/uyuo4zb',
  coreldraw_2026_20241: 'https://pay.cakto.com.br/7rmgu2m',
  coreldraw_2026_20251: 'https://pay.cakto.com.br/3dz6mwp',
  coreldraw_2026_20261: 'https://pay.cakto.com.br/cn2ymyn',
  coreldraw_2026_20262: 'https://pay.cakto.com.br/g29y9hc',

  // Promob Plus
  promob_professional_2025_20241: 'https://pay.cakto.com.br/m2hsa5x',
  promob_professional_2025_20251: 'https://pay.cakto.com.br/3f4gqjz',

  // Rhinoceros 8
  rhinoceros_8_1: 'https://pay.cakto.com.br/dgr2xz8',
  rhinoceros_8_2: 'https://pay.cakto.com.br/am2bfot',

  // Microsoft Office 2024 Pro
  office_25_win_1: 'https://pay.cakto.com.br/9k74men',
  office_25_win_2: 'https://pay.cakto.com.br/78abdwy',
};

// Secondary lookup by downloadSlug (extra safety)
export const INTERNATIONAL_SLUG_CHECKOUTS: Record<string, string> = {
  'autocad-2019-windows': 'https://pay.cakto.com.br/w2y6f75_1247182',
  'autocad-2024-windows': 'https://pay.cakto.com.br/yibwpho',
  'autocad-2025-windows': 'https://pay.cakto.com.br/sdujqqx',
  'autocad-2026-windows': 'https://pay.cakto.com.br/3ezmyhu',
  'autocad-2027-windows': 'https://pay.cakto.com.br/3aoufpv',
  'autocad-2024-macos': 'https://pay.cakto.com.br/oaey56p',
  'autocad-2027-macos': 'https://pay.cakto.com.br/ac2i5bw',

  'revit-2024': 'https://pay.cakto.com.br/rg3wz8b',
  'revit-2025': 'https://pay.cakto.com.br/3babtb2',
  'revit-2026': 'https://pay.cakto.com.br/37bwbt8',
  'revit-2027': 'https://pay.cakto.com.br/v2cr8ee',

  'sketchup-pro-2021-windows': 'https://pay.cakto.com.br/39i3zxa',
  'sketchup-pro-2024-windows': 'https://pay.cakto.com.br/v2zmw9g',
  'sketchup-pro-2025-windows': 'https://pay.cakto.com.br/46uu52z',
  'sketchup-pro-2026-windows': 'https://pay.cakto.com.br/9oqb6x2',
  'sketchup-pro-2024-macos': 'https://pay.cakto.com.br/32b7cbx',
  'sketchup-pro-2026-macos': 'https://pay.cakto.com.br/72fhxtn',

  'solidworks-2025': 'https://pay.cakto.com.br/wfidgca',
  'solidworks-2026': 'https://pay.cakto.com.br/aypd6zo',

  'eberick-builder-2024-plena': 'https://pay.cakto.com.br/cgxe9xf',
  'eberick-builder-2025': 'https://pay.cakto.com.br/38q782i',
  'eberick-builder-2026-infinity': 'https://pay.cakto.com.br/3a4vxmt',

  'cypecad-2025': 'https://pay.cakto.com.br/3672xji',
  'cypecad-2026': 'https://pay.cakto.com.br/3cpy9f8',
  'cypecad-2027': 'https://pay.cakto.com.br/qz48nkg',

  'archicad-28-bra': 'https://pay.cakto.com.br/mgm7azd',
  'archicad-29-bra': 'https://pay.cakto.com.br/oidqniy',
  'archicad-30-bra': 'https://pay.cakto.com.br/bqytmz2',

  'coreldraw-x7-windows': 'https://pay.cakto.com.br/pbr3xer',
  'coreldraw-2022-windows': 'https://pay.cakto.com.br/37sbqb4',
  'coreldraw-2023-windows': 'https://pay.cakto.com.br/uyuo4zb',
  'coreldraw-2024-windows': 'https://pay.cakto.com.br/7rmgu2m',
  'coreldraw-2025-windows': 'https://pay.cakto.com.br/3dz6mwp',
  'coreldraw-graphics-suite-2026': 'https://pay.cakto.com.br/cn2ymyn',
  'coreldraw-graphics-suite-2026-macos': 'https://pay.cakto.com.br/g29y9hc',

  'promob-plus-enterprise-2024': 'https://pay.cakto.com.br/m2hsa5x',
  'promob-plus-professional-2025': 'https://pay.cakto.com.br/3f4gqjz',

  'rhinoceros-8': 'https://pay.cakto.com.br/dgr2xz8',
  'rhinoceros-8-mac': 'https://pay.cakto.com.br/am2bfot',

  'office-2024-professional-plus': 'https://pay.cakto.com.br/9k74men',
  'office-2024-professional-mac': 'https://pay.cakto.com.br/78abdwy',
};

/**
 * Returns the international checkout URL for a product option if one exists.
 */
export function getInternationalCheckoutUrl(
  productId: string,
  optionQuantity?: number,
  downloadSlug?: string
): string | undefined {
  if (optionQuantity !== undefined) {
    const key = `${productId}_${optionQuantity}`;
    if (INTERNATIONAL_OPTION_CHECKOUTS[key]) {
      return INTERNATIONAL_OPTION_CHECKOUTS[key];
    }
  }

  if (downloadSlug && INTERNATIONAL_SLUG_CHECKOUTS[downloadSlug]) {
    return INTERNATIONAL_SLUG_CHECKOUTS[downloadSlug];
  }

  if (INTERNATIONAL_PRODUCT_CHECKOUTS[productId]) {
    return INTERNATIONAL_PRODUCT_CHECKOUTS[productId];
  }

  return undefined;
}

/**
 * Returns the effective checkout URL based on whether international mode is active.
 */
export function getEffectiveCheckoutUrl(
  product: Product | { id: string; checkoutUrl: string; internationalCheckoutUrl?: string },
  option?: LicenseOption | { quantity?: number; downloadSlug?: string; checkoutUrl?: string; internationalCheckoutUrl?: string },
  isInternational?: boolean
): string {
  if (isInternational) {
    // 1. Direct explicit property on option
    if (option && 'internationalCheckoutUrl' in option && option.internationalCheckoutUrl) {
      return option.internationalCheckoutUrl;
    }

    // 2. Lookup table by option / product
    const mapped = getInternationalCheckoutUrl(
      product.id,
      option?.quantity,
      option?.downloadSlug
    );
    if (mapped) return mapped;

    // 3. Direct explicit property on product
    if ('internationalCheckoutUrl' in product && product.internationalCheckoutUrl) {
      return product.internationalCheckoutUrl;
    }
  }

  // Fallback to standard checkout URL
  return option?.checkoutUrl || product.checkoutUrl;
}
