// Storefront and payment use one catalog to prevent missing products and stale editions.
import { products as catalogProducts } from '../src/data/products.js';
import { legacyCheckoutProducts } from './_legacyCheckoutProducts.js';
export type { Product, LicenseOption } from '../src/data/products.js';
export { getProductBySlug } from '../src/data/products.js';
export const products = [...catalogProducts, ...legacyCheckoutProducts];
