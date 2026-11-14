import { products } from './_products.js';
import { getEfiChargesInstance } from './_efi.js';
import { sendConfirmationEmail } from './_email.js';
// Read only authenticated Efí charge data; never use a browser-provided recipient or item list.
export async function deliverBoleto(chargeId: number) {
  const efi = getEfiChargesInstance();
  const response = await efi.detailCharge({ id: chargeId });
  const charge = response.data;
  if (!['paid', 'settled'].includes(charge?.status)) return {paid:false};
  const delivered = (charge.items || []).map((item: any) => {
    const slug = /\[c2:([a-z0-9-]+)\]/.exec(item.name)?.[1];
    const product = products.find(p => p.slug === slug || p.licenseOptions?.some(option => option.downloadSlug === slug));
    if (!product || !slug) throw new Error('Produto do boleto não identificado.');
    const option = product.licenseOptions?.find(option => option.downloadSlug === slug);
    return {slug, name: `${product.name}${option ? ` — ${option.label}` : ''}`, price: item.value * item.amount / 100};
  });
  if (!delivered.length || !charge.customer?.email) throw new Error('Dados de entrega do boleto ausentes.');
  const result = await sendConfirmationEmail({buyerName:charge.customer.name || charge.customer.juridical_person?.corporate_name || 'Cliente',buyerEmail:charge.customer.email,products:delivered,orderId:`efi_boleto_${chargeId}`,paymentMethod:'boleto'});
  if (!result.success) throw new Error('Falha no envio da entrega do boleto.');
  return {paid:true};
}
