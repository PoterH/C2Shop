import type { Product } from '../data/products';
import { getEffectiveCheckoutUrl, getInternationalCheckoutUrl } from '../data/internationalCheckouts.js';
export const cartItemKey = (item: Product) => `${item.id}:${item.selectedLicenseOption?.quantity ?? 'base'}:${item.selectedSubOption ?? 'avulso'}`;
export const itemUnitPrice = (item: Product) => item.selectedLicenseOption?.price ?? (item.isSubscription && item.selectedSubOption !== 'avulso' ? item.recurrencePrice ?? item.price : item.price);
export const itemCount = (item: Product) => Math.min(99, Math.max(1, Math.trunc(item.deviceCount || 1)));
export const itemTotal = (item: Product) => Math.round(itemUnitPrice(item) * itemCount(item) * 100) / 100;
export const itemVersion = (item: Product) => {
  const option = item.selectedLicenseOption;
  if (option?.year && !/^(windows|macos|mac)$/i.test(option.year.trim())) return option.year.trim();
  const version = option?.label || '';
  const selected = version.match(/(?:20\d{2}(?:\.\d+[a-z]?)?|\bX\d+\b|\d+(?:\.\d+)+(?:[a-z])?)/i)?.[0];
  return selected || item.version.match(/(?:20\d{2}(?:\.\d+[a-z]?)?|\bX\d+\b|\d+(?:\.\d+)*(?:[a-z])?)/i)?.[0] || item.version.replace(/Windows|macOS|[()]/gi, '').trim();
};
export const itemValidity = (item: Product) => item.isSubscription ? `Assinatura • ${item.selectedLicenseOption?.label || 'Mensal'}` : 'Licença vitalícia';
export const paymentUrl = (item: Product, international: boolean) => {
  const primary = getEffectiveCheckoutUrl(item, item.selectedLicenseOption, international);
  const url = /^https:\/\/pay\.cakto\.com\.br\//.test(primary || '') ? primary : getInternationalCheckoutUrl(item.id, item.selectedLicenseOption?.quantity, item.selectedLicenseOption?.downloadSlug);
  return /^https:\/\/pay\.cakto\.com\.br\//.test(url || '') ? url : undefined;
};
export const whatsappOrderUrl = (items: Product[], method: string) => {
  const details = items.map(item => `• ${item.name} — ${item.selectedLicenseOption?.label || item.version} — ${item.selectedLicenseOption?.platform || item.compatibility} — quantidade: ${itemCount(item)}`).join('\n');
  return `https://wa.me/5581997349300?text=${encodeURIComponent(`Olá! Quero finalizar meu pedido via ${method}:\n${details}${new Set(items.map(item => item.id)).size >= 2 ? '\nQuero aproveitar os 10% de desconto para 2 softwares ou mais.' : ''}`)}`;
};
