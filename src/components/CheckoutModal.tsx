import { useText } from '../hooks/useText';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Lock,
  ExternalLink,
  Copy,
  Loader2,
  User,
  Mail,
  Phone,
  FileText,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  CreditCard
} from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { getEffectiveCheckoutUrl } from '../data/internationalCheckouts';
import { trackEvent } from '../utils/pixel';

interface CheckoutModalProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  initialSubOption?: 'recurrent' | 'avulso';
}

type Step = 'info' | 'payment' | 'pix_waiting' | 'boleto_waiting' | 'success';
type PaymentMethod = 'pix' | 'card' | 'boleto';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, isOpen, onClose, initialSubOption }) => {
  const localize = useText();
  const navigate = useNavigate();
  const { cartItems, total, discountAmount, couponCode, clearCart } = useCart();
  const { isInternational, language } = useLanguage();
  const activeProduct = product || cartItems[0];
  const isDirectProductCheckout = Boolean(product && cartItems.length === 0);

  const initialPlan: 'recurrent' | 'avulso' = activeProduct?.selectedLicenseOption ? 'avulso' : activeProduct?.isSubscription ? activeProduct.selectedSubOption || initialSubOption || 'recurrent' : 'avulso';

  // Steps & Tabs
  const [currentStep, setCurrentStep] = useState<Step>('info');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(initialPlan === 'recurrent' ? 'card' : 'pix');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Boleto State
  const [boletoBarcode, setBoletoBarcode] = useState('');
  const [boletoUrl, setBoletoUrl] = useState('');
  const [copiedBarcode, setCopiedBarcode] = useState(false);

  // Success message states
  const [successTitle, setSuccessTitle] = useState('Pagamento Confirmado!');
  const [successDescription, setSuccessDescription] = useState('Sua transação foi processada com sucesso. Estamos gerando sua licença e enviando os arquivos de acesso para o seu e-mail.');

  // Form State: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [phone, setPhone] = useState('');
  const [subOption, setSubOption] = useState<'recurrent' | 'avulso'>(initialPlan);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const shakeInvalidField = (fieldId: string) => {
    requestAnimationFrame(() => {
      const field = document.getElementById(fieldId);
      if (!field) return;
      field.classList.remove('is-shaking');
      void field.offsetWidth;
      field.classList.add('is-shaking');
      field.addEventListener('animationend', () => field.classList.remove('is-shaking'), { once: true });
      const focusTarget = field.matches('input,button,select,textarea') ? field : field.querySelector<HTMLElement>('input,button,select,textarea');
      focusTarget?.focus({ preventScroll: true });
    });
  };
  const showInfoError = (message: string, fieldId: string) => {
    setErrorMessage(message);
    shakeInvalidField(fieldId);
  };

  // Pix Payment Data from API
  const [pixCopyPaste, setPixCopyPaste] = useState('');
  const [pixQrCode, setPixQrCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Polling ref
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Pix countdown state
  const [timeLeft, setTimeLeft] = useState<number>(600);

  // Clean polling on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  // Timer countdown for Pix
  useEffect(() => {
    let timerInterval: any = null;
    if (currentStep === 'pix_waiting') {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            if (pollingIntervalRef.current) {
              clearInterval(pollingIntervalRef.current);
              pollingIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Format Helper Masks
  const formatCPFOrCNPJ = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length <= 11) {
      // CPF: 000.000.000-00
      return raw
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ: 00.000.000/0000-00
      return raw
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  };

  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, '');
    if (raw.length <= 10) {
      // (00) 0000-0000
      return raw
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d{1,4})$/, '$1-$2');
    } else {
      // (00) 00000-0000
      return raw
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{1,4})$/, '$1-$2');
    }
  };





  // Helper functions for mathematical CPF/CNPJ verification
  const isValidCPF = (cpf: string): boolean => {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(clean)) return false; // Sequence of same digits

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(clean.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(clean.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(clean.charAt(10))) return false;

    return true;
  };

  const isValidCNPJ = (cnpj: string): boolean => {
    const clean = cnpj.replace(/\D/g, '');
    if (clean.length !== 14) return false;
    if (/^(\d)\1{13}$/.test(clean)) return false; // Sequence of same digits

    let size = clean.length - 2;
    let numbers = clean.substring(0, size);
    const digits = clean.substring(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = clean.substring(0, size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  };

  // Step Validations
  const validateInfoStep = () => {
    if (!termsAccepted) {
      showInfoError('Por favor, leia e aceite os Termos e Condições para prosseguir.', 'checkout-terms');
      return false;
    }
    if (fullName.trim().split(' ').length < 2) {
      showInfoError('Por favor, informe seu nome completo.', 'checkout-name');
      return false;
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showInfoError('Por favor, insira um e-mail válido.', 'checkout-email');
      return false;
    }
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    if (cleanCpfCnpj.length > 0) {
      if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
        showInfoError('Por favor, insira um CPF ou CNPJ válido ou deixe o campo em branco.', 'checkout-document');
        return false;
      }

      // Validação matemática do documento apenas se preenchido
      if (cleanCpfCnpj.length === 11 && !isValidCPF(cleanCpfCnpj)) {
        showInfoError('CPF inválido. Por favor, verifique os números digitados ou deixe em branco.', 'checkout-document');
        return false;
      }
      if (cleanCpfCnpj.length === 14 && !isValidCNPJ(cleanCpfCnpj)) {
        showInfoError('CNPJ inválido. Por favor, verifique os números digitados ou deixe em branco.', 'checkout-document');
        return false;
      }
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length > 0 && (cleanPhone.length < 10 || cleanPhone.length > 11)) {
      showInfoError('Por favor, insira um telefone válido com DDD ou deixe o campo em branco.', 'checkout-phone');
      return false;
    }
    setErrorMessage(null);
    return true;
  };



  // Initiate checkout
  const handleProceedToPayment = () => {
    if (validateInfoStep()) {
      if (activeProduct?.isSubscription && !activeProduct?.selectedLicenseOption && subOption === 'recurrent') {
        setPaymentMethod('card');
      }
      setCurrentStep('payment');

      // Track InitiateCheckout on Facebook Pixel
      const currentVal = activeProduct?.selectedLicenseOption
        ? activeProduct.selectedLicenseOption.price
        : (activeProduct?.isSubscription
            ? (subOption === 'recurrent' ? (activeProduct.recurrencePrice || activeProduct.price) : activeProduct.price)
            : total);
      trackEvent('InitiateCheckout', {
        content_ids: cartItems.map(item => item.slug),
        content_name: cartItems.map(item => item.name).join(', '),
        content_type: 'product',
        num_items: cartItems.length || 1,
        value: currentVal,
        currency: 'BRL',
      });
    }
  };

  // Submit Pix Order
  const handlePixCheckout = async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: (isDirectProductCheckout && product ? [product] : cartItems).map(item => ({
            slug: item.slug,
            licenseQuantity: item.selectedLicenseOption?.quantity
          })),
          coupon: couponCode || null,
          subOption: activeProduct?.isSubscription && !activeProduct?.selectedLicenseOption ? subOption : undefined,
          buyer: {
            name: fullName,
            email: email,
            cpf: cpfCnpj,
            phone: phone
          },
          paymentMethod: 'pix'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao gerar cobrança Pix.');
      }

      setPixCopyPaste(data.copyPaste);
      setPixQrCode(data.qrCodeBase64);
      setTimeLeft(600);
      setCurrentStep('pix_waiting');

      // Track AddPaymentInfo when Pix QR Code is generated
      const currentVal = activeProduct?.selectedLicenseOption
        ? activeProduct.selectedLicenseOption.price
        : (activeProduct?.isSubscription
            ? (subOption === 'recurrent' ? (activeProduct.recurrencePrice || activeProduct.price) : activeProduct.price)
            : total * 0.98);
      trackEvent('AddPaymentInfo', {
        content_ids: cartItems.map(item => item.slug),
        content_type: 'product',
        value: Number(currentVal.toFixed(2)),
        currency: 'BRL',
      }, `pix_info_${data.txid}`);

      // Start status polling
      startPolling(data.txid, Date.now());
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Houve um erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Start polling checkout status
  const startPolling = (txid: string, creationTime: number) => {
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

    pollingIntervalRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/checkout-status?txid=${txid}&created=${creationTime}`);
        const data = await res.json();

        if (data.success && data.status === 'CONCLUIDA') {
          if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);

          const finalPaidVal = activeProduct?.selectedLicenseOption
            ? activeProduct.selectedLicenseOption.price
            : (activeProduct?.isSubscription
                ? (subOption === 'recurrent' ? (activeProduct.recurrencePrice || activeProduct.price) : activeProduct.price)
                : total * 0.98);

          // Track Purchase on Browser Pixel (deduplicated with Server CAPI via eventID = txid)
          trackEvent('Purchase', {
            content_ids: cartItems.map(item => item.slug),
            content_name: cartItems.map(item => item.name).join(', '),
            content_type: 'product',
            num_items: cartItems.length || 1,
            value: Number(finalPaidVal.toFixed(2)),
            currency: 'BRL',
          }, String(txid));

          // Dispara o envio de e-mail de confirmação no backend
          try {
            await fetch('/api/send-email', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                txid,
                products: (isDirectProductCheckout && product ? [product] : cartItems).map(item => ({
                  slug: item.selectedLicenseOption?.downloadSlug || item.slug,
                  name: item.selectedLicenseOption ? `${item.name} (${item.selectedLicenseOption.label})` : item.name,
                  price: item.selectedLicenseOption?.price || item.price
                })),
                subOption: activeProduct?.isSubscription && !activeProduct?.selectedLicenseOption ? subOption : undefined,
                buyer: {
                  name: fullName,
                  email,
                  phone
                }
              })
            });
          } catch (emailErr) {
            console.error('Erro ao chamar api/send-email:', emailErr);
          }

          setSuccessTitle('Pagamento Confirmado!');
          setSuccessDescription('Sua transação Pix foi processada com sucesso via Efí Bank. Estamos gerando sua licença e enviando os arquivos de acesso para o seu e-mail.');
          setCurrentStep('success');
          clearCart(); // Limpa o carrinho

          // Redirect to thank you page after 3 seconds of success screen
          setTimeout(() => {
            onClose();
            navigate('/obrigado');
          }, 3000);
        }
      } catch (error) {
        console.error('Erro na verificação de status do pagamento:', error);
      }
    }, 3000);
  };


  // Copy Pix code to clipboard
  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCopyPaste);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Boleto Order
  const handleBoletoCheckout = async () => {
    const cleanCpfCnpj = cpfCnpj.replace(/\D/g, '');
    if (cleanCpfCnpj.length !== 11 && cleanCpfCnpj.length !== 14) {
      showInfoError('Para emissão de Boleto Bancário, o Banco Central exige informar um CPF ou CNPJ válido.', 'checkout-boleto-document');
      return;
    }
    if (cleanCpfCnpj.length === 11 && !isValidCPF(cleanCpfCnpj)) {
      showInfoError('CPF inválido para emissão do boleto. Verifique os números digitados.', 'checkout-boleto-document');
      return;
    }
    if (cleanCpfCnpj.length === 14 && !isValidCNPJ(cleanCpfCnpj)) {
      showInfoError('CNPJ inválido para emissão do boleto. Verifique os números digitados.', 'checkout-boleto-document');
      return;
    }

    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: (isDirectProductCheckout && product ? [product] : cartItems).map(item => ({
            slug: item.slug,
            licenseQuantity: item.selectedLicenseOption?.quantity
          })),
          coupon: couponCode || null,
          buyer: {
            name: fullName,
            email: email,
            cpf: cpfCnpj,
            phone: phone
          },
          paymentMethod: 'boleto'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Erro ao gerar boleto bancário.');
      }

      setBoletoBarcode(data.barcode);
      setBoletoUrl(data.ticketUrl);
      setCurrentStep('boleto_waiting');

      // Track AddPaymentInfo when Boleto is generated
      trackEvent('AddPaymentInfo', {
        content_ids: cartItems.map(item => item.slug),
        content_type: 'product',
        value: Number(total.toFixed(2)),
        currency: 'BRL',
      });

      clearCart();
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Houve um erro ao gerar o boleto. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Pricing math
  const getCheckoutTotal = () => {
    if (isDirectProductCheckout && product) {
      if (product.selectedLicenseOption) {
        return product.selectedLicenseOption.price;
      }
      if (product.isSubscription) {
        return subOption === 'recurrent' ? (product.recurrencePrice || product.price) : product.price;
      }
      return product.price;
    }
    return total;
  };
  const checkoutTotal = getCheckoutTotal();
  const formattedPrice = checkoutTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const getPixPrice = () => {
    if (isDirectProductCheckout && product?.isSubscription) {
      return checkoutTotal; // Subscriptions have set net prices
    }
    return checkoutTotal * 0.98;
  };
  const pixDiscountPrice = getPixPrice();
  const formattedPixPrice = pixDiscountPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });



  return (
    <>
      {/* Backdrop Blur Overlay - click-through enabled */}
      <div className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-[2px] pointer-events-none transition-all duration-300" />

      {/* Floating Modal Wrapper */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg p-4 pointer-events-none">

        {/* Modal Container */}
        <div className="relative w-full bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col max-h-[90dvh] pointer-events-auto">

        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-action-primary uppercase tracking-widest bg-action-primary/10 px-2 py-0.5 rounded">
              {localize("Checkout Seguro")}</span>
            <h3 className="font-display font-bold text-slate-900 text-lg mt-1 truncate max-w-full">
              {localize(cartItems.length === 1 ? activeProduct?.name : `${cartItems.length} Softwares`)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label={localize("Fechar")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Error Banner */}
          {errorMessage && (
            <div role="alert" className="p-4 bg-red-50 text-red-800 text-xs font-semibold rounded-2xl border border-red-100 flex flex-col gap-3">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-left leading-normal">{localize(errorMessage)}</p>
              </div>
            </div>
          )}

          {/* STEP 1: Seus Dados */}
          {currentStep === 'info' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-display font-bold text-slate-800 text-sm">
                  {localize("1. Identificação do Comprador")}</h4>
                <p className="text-slate-500 text-xs">
                  {localize("Os dados abaixo são necessários para emissão da licença e nota fiscal.")}</p>
              </div>

              {/* List of items in checkout */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{localize("Resumo do pedido")}</span>
                {activeProduct?.isSubscription && !activeProduct?.selectedLicenseOption ? (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700">{localize(activeProduct.name)}</span>
                      <span className="font-bold text-slate-900">
                        {localize(checkoutTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
                        {subOption === 'recurrent' && <span className="text-[10px] text-slate-500 font-normal"> {localize(" /mês")}</span>}
                      </span>
                    </div>

                    {/* Compact toggle buttons for plan */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSubOption('recurrent');
                          setPaymentMethod('card');
                        }}
                        className={`py-2 px-3 text-center rounded-xl border text-[10px] font-bold transition-all ${
                          subOption === 'recurrent'
                            ? 'border-feedback-success bg-feedback-success/10 text-emerald-800'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {localize("Assinatura Mensal (")}{activeProduct.recurrencePrice?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubOption('avulso');
                          setPaymentMethod('pix');
                        }}
                        className={`py-2 px-3 text-center rounded-xl border text-[10px] font-bold transition-all ${
                          subOption === 'avulso'
                            ? 'border-action-primary bg-action-primary/10 text-action-primary-hover'
                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {localize("Pagamento Único (")}{localize((activeProduct.selectedLicenseOption?.price || activeProduct.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))})
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                      {subOption === 'recurrent' ? (
                        <span>{localize("👉 Cobrança recorrente mensal no cartão de crédito via Mercado Pago. Cancele a qualquer momento.")}</span>
                      ) : (
                        <span>{localize("👉 Licença com pagamento único. Sem mensalidade ou recorrência futura.")}</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700">{localize(item.name)} {localize(item.selectedLicenseOption ? `(${item.selectedLicenseOption.label})` : '')}</span>
                        <span className="font-bold text-slate-900">
                          {localize((item.selectedLicenseOption?.price || item.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}
                          {item.selectedLicenseOption?.label.includes('Mensal') && <span className="text-[10px] text-slate-500 font-normal"> {localize(" /mês")}</span>}
                        </span>
                      </div>
                    ))}
                    {discountAmount > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-600 font-semibold pt-2 border-t border-slate-200/60">
                        <span>{localize("Desconto (10% OFF10)")}</span>
                        <span>-{localize(discountAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))}</span>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-3.5">
                {/* Nome Completo */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{localize("Nome Completo")}</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="checkout-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={localize("Ex: João Silva Santos")}
                      className="t-input w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-action-primary focus:ring-1 focus:ring-action-primary rounded-xl text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">{localize("E-mail para entrega")}</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      id="checkout-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={localize("Ex: joao@exemplo.com")}
                      className="t-input w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-action-primary focus:ring-1 focus:ring-action-primary rounded-xl text-sm transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">{localize("Certifique-se de digitar o e-mail correto para receber os links de acesso instantaneamente.")}</p>
                </div>

                {/* Grid CPF e Celular */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {localize("CPF ou CNPJ ")}<span className="text-[10px] font-normal text-slate-400 lowercase">{localize("(opcional)")}</span>
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="checkout-document"
                        type="text"
                        value={cpfCnpj}
                        onChange={(e) => setCpfCnpj(formatCPFOrCNPJ(e.target.value))}
                        placeholder={localize("Opcional")}
                        maxLength={18}
                        className="t-input w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-action-primary focus:ring-1 focus:ring-action-primary rounded-xl text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      {localize("WhatsApp / Celular ")}<span className="text-[10px] font-normal text-slate-400 lowercase">{localize("(opcional)")}</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        id="checkout-phone"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        placeholder={localize("Opcional")}
                        maxLength={15}
                        className="t-input w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-action-primary focus:ring-1 focus:ring-action-primary rounded-xl text-sm transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Termos e Condições */}
              <div className="pt-4">
                <label className="flex items-start gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                    <input
                      id="checkout-terms"
                      type="checkbox"
                      className="t-input peer appearance-none w-4 h-4 border-2 border-slate-300 rounded bg-white checked:bg-action-primary checked:border-action-primary transition-all cursor-pointer"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <CheckCircle2 className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  <span className="text-[11px] text-slate-500 leading-snug">
                    {localize("Li e concordo com os ")}<a href="/termos" target="_blank" rel="noopener noreferrer" className="text-action-primary hover:underline font-semibold" onClick={(e) => e.stopPropagation()}>{localize("Termos e Condições")}</a> {localize(" de compra, uso e suporte.")}</span>
                </label>
              </div>

              {/* Total display & continue */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">{localize("Valor total")}</span>
                  <span className="text-xl font-display font-black text-slate-900">{localize(formattedPrice)}</span>
                </div>
                <button
                  onClick={handleProceedToPayment}
                  className="px-6 py-3 bg-action-primary hover:bg-action-primary-hover text-white font-bold rounded-2xl text-sm transition-all shadow-md cursor-pointer"
                >
                  {localize("Ir para Pagamento")}</button>
              </div>
            </div>
          )}

          {/* STEP 2: Pagamento */}
          {currentStep === 'payment' && (
            <div className="space-y-6">

              {/* Back to Info Button */}
              <button
                onClick={() => setCurrentStep('info')}
                className="flex items-center text-xs text-slate-500 hover:text-slate-700 font-semibold"
              >
                <ChevronLeft className="w-4 h-4 mr-0.5" />
                {localize("Alterar dados pessoais")}</button>

              <div className="space-y-4">
                <h4 className="font-display font-bold text-slate-800 text-sm">
                  {localize(isInternational ? (language === 'es' ? '2. Pago Internacional Cakto' : '2. Pagamento Internacional Cakto') : '2. Escolha como pagar')}
                </h4>

                {isInternational ? (
                  <div className="space-y-4 pt-1">
                    <div className="p-5 bg-sky-50/70 rounded-2xl border border-sky-100 flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-xs text-sky-600">
                        <Lock className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 mb-1">
                        {localize(language === 'es' ? 'Checkout Internacional Seguro (Cakto)' : 'Checkout Internacional Seguro (Cakto)')}
                      </h4>
                      <p className="text-[11px] text-slate-600 mb-4 px-2 leading-relaxed">
                        {localize(language === 'es'
                          ? 'Conversión automática a tu moneda local. Acepta tarjetas internacionales (Visa, Mastercard, Amex), Apple Pay y Google Pay con entrega inmediata por correo.'
                          : 'Conversão automática de moeda pela Cakto. Aceita cartões internacionais, Apple Pay e Google Pay com entrega imediata por e-mail.')}
                      </p>

                      {cartItems.map((item) => {
                        const itemUrl = getEffectiveCheckoutUrl(item, item.selectedLicenseOption, true);
                        const versionLabel = item.selectedLicenseOption?.label || item.version;
                        return (
                          <a
                            key={item.id}
                            href={itemUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-3.5 mb-2.5 bg-[#0b5ed7] hover:bg-[#0a53be] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:no-underline"
                          >
                            <span>{localize(language === 'es' ? `Pagar ${item.name} (${versionLabel})` : `Pagar ${item.name} (${versionLabel})`)}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>

                 {/* Method selector cards */}
                 {(!activeProduct?.isSubscription || subOption === 'avulso' || !!activeProduct?.selectedLicenseOption) ? (
                   <div className="grid grid-cols-3 gap-3 pb-2">
                     {/* Pix Card */}
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('pix')}
                       className={`relative flex flex-col justify-between items-start p-4 h-24 text-left w-full cursor-pointer transition-all rounded-2xl border-2 ${
                         paymentMethod === 'pix'
                           ? 'border-feedback-success bg-slate-50/50 shadow-sm'
                           : 'border-slate-200/80 bg-slate-50/20 hover:bg-slate-50'
                       }`}
                     >
                       {/* Pix Icon */}
                       <img src="/images/payments/pix.svg" alt="" className="h-5 w-5 object-contain" width="20" height="20" />

                       <span className="text-xs font-bold text-slate-800">Pix</span>

                       {/* 2% OFF Badge */}
                       <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-feedback-success text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm z-10 whitespace-nowrap">
                         2% OFF
                       </div>
                     </button>

                     {/* Credit Card Card */}
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('card')}
                       className={`flex flex-col justify-between items-start p-4 h-24 text-left w-full cursor-pointer transition-all rounded-2xl border-2 ${
                         paymentMethod === 'card'
                           ? 'border-sky-500 bg-slate-50/50 shadow-sm'
                           : 'border-slate-200/80 bg-slate-50/20 hover:bg-slate-50'
                       }`}
                     >
                       {/* Credit Card Icon */}
                       <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-sky-500' : 'text-slate-400'}`} />

                       <span className="text-xs font-bold text-slate-800">{localize("Cartão")}</span>
                     </button>

                     {/* Boleto Card */}
                     <button
                       type="button"
                       onClick={() => setPaymentMethod('boleto')}
                       className={`flex flex-col justify-between items-start p-4 h-24 text-left w-full cursor-pointer transition-all rounded-2xl border-2 ${
                         paymentMethod === 'boleto'
                           ? 'border-amber-500 bg-slate-50/50 shadow-sm'
                           : 'border-slate-200/80 bg-slate-50/20 hover:bg-slate-50'
                       }`}
                     >
                       {/* Boleto Icon (FileText) */}
                       <FileText className={`w-5 h-5 ${paymentMethod === 'boleto' ? 'text-amber-500' : 'text-slate-400'}`} />

                       <span className="text-xs font-bold text-slate-800">{localize("Boleto")}</span>
                     </button>
                   </div>
                 ) : (
                   <div className="p-3.5 bg-sky-500/10 text-sky-800 text-xs font-bold rounded-2xl border border-sky-500/20 text-center flex items-center justify-center gap-1.5">
                     <span>{localize("⚡ Assinatura Recorrente via Cartão de Crédito")}</span>
                   </div>
                 )}

                {/* Pix Area */}
                {paymentMethod === 'pix' && (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-slate-700 leading-relaxed space-y-1">
                      <p className="font-bold text-emerald-800 flex items-center">
                        {localize(activeProduct?.isSubscription ? '⚡ Assinatura Pix Automática' : '⚡ Desconto Exclusivo Pix')}
                      </p>
                      <p>
                        {localize(activeProduct?.isSubscription
                          ? `A ativação do seu plano ${activeProduct.name} será realizada imediatamente após a confirmação do pagamento Pix.`
                          : 'Ganhe 2% de desconto exclusivo pagando via Pix! O pagamento é aprovado imediatamente e o acesso será enviado ao seu e-mail em segundos.')}
                      </p>
                    </div>

                    <button
                      onClick={handlePixCheckout}
                      disabled={loading}
                      className="w-full py-4 bg-feedback-success hover:bg-emerald-600 text-white font-bold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{localize("Gerando Pix Seguro...")}</span>
                        </>
                      ) : (
                        <span>{localize("Gerar QR Code Pix de ")}{localize(formattedPixPrice)}</span>
                      )}
                    </button>
                  </div>
                )}

                {/* Boleto Area */}
                {paymentMethod === 'boleto' && (
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 text-[11px] text-slate-700 leading-relaxed space-y-1">
                      <p className="font-bold text-amber-800 flex items-center">
                        {localize("📄 Pagamento via Boleto Bancário")}</p>
                      <p>
                        {localize("O boleto será gerado com vencimento em até 3 dias úteis. A compensação bancária ocorre de 1 a 2 dias úteis após o pagamento. Seus arquivos de acesso serão enviados automaticamente para o seu e-mail assim que o pagamento for confirmado.")}</p>
                    </div>

                    {cpfCnpj.replace(/\D/g, '').length !== 11 && cpfCnpj.replace(/\D/g, '').length !== 14 && (
                      <div className="space-y-1 text-left">
                        <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                          {localize("Informe seu CPF ou CNPJ (obrigatório apenas para Boleto)")}</label>
                        <div className="relative">
                          <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            id="checkout-boleto-document"
                            type="text"
                            value={cpfCnpj}
                            onChange={(e) => setCpfCnpj(formatCPFOrCNPJ(e.target.value))}
                            placeholder="000.000.000-00"
                            maxLength={18}
                            className="t-input w-full pl-10 pr-4 py-3 border border-slate-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl text-sm transition-all"
                          />
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleBoletoCheckout}
                      disabled={loading}
                      className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-sm transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{localize("Gerando Boleto Seguro...")}</span>
                        </>
                      ) : (
                        <span>{localize("Gerar Boleto de ")}{localize(formattedPrice)}</span>
                      )}
                    </button>
                  </div>
                )}

                {/* Credit Card Area */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    {cartItems.length === 1 ? (
                      <div className="p-5 bg-sky-50 rounded-2xl border border-sky-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-sky-500">
                          <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">
                          {localize("Pagamento Seguro via Cartão")}</h4>
                        <p className="text-[11px] text-slate-500 mb-4 px-2 leading-relaxed">
                          {localize("Para sua total segurança, o pagamento via cartão de crédito é processado diretamente em nossa plataforma blindada externa.")}</p>
                        <a
                          href={activeProduct?.selectedLicenseOption?.checkoutUrl ? activeProduct.selectedLicenseOption.checkoutUrl : ((activeProduct?.isSubscription && subOption === 'recurrent') ? (activeProduct?.recurrenceCheckoutUrl || activeProduct?.checkoutUrl || '#') : (activeProduct?.checkoutUrl || '#'))}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            trackEvent('AddPaymentInfo', {
                              content_ids: cartItems.map(item => item.slug),
                              content_type: 'product',
                              value: Number(checkoutTotal.toFixed(2)),
                              currency: 'BRL',
                            });
                          }}
                          className="w-full py-3.5 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center cursor-pointer hover:no-underline"
                        >
                          {localize("Ir para Plataforma de Pagamento Seguro")}</a>
                      </div>
                    ) : (
                      <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm text-feedback-success">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 mb-1">
                          {localize("Desconto Especial Liberado! 🎉")}</h4>
                        <p className="text-[11px] text-slate-600 mb-4 px-2 leading-relaxed">
                          {localize("Notamos que você selecionou múltiplos softwares! Pagando no cartão de crédito via nosso WhatsApp de vendas, você ganha ")}<strong>{localize("10% de desconto adicional")}</strong> {localize(" em toda a compra.")}</p>
                        <a
                          href={`https://wa.me/5581997349300?text=${encodeURIComponent(`Olá! Quero finalizar o pagamento via Cartão de Crédito dos ${cartItems.length} softwares que estão no meu carrinho e garantir os 10% de desconto adicional!`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center cursor-pointer hover:no-underline"
                        >
                          {localize("Finalizar com Desconto no WhatsApp")}</a>
                      </div>
                    )}
                  </div>
                )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: Pix Waiting Area */}
          {currentStep === 'pix_waiting' && (
            <div className="space-y-6 text-center py-4">
              {timeLeft === 0 ? (
                <div className="space-y-4 py-6">
                  <div className="mx-auto w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center border border-red-100">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-display font-bold text-slate-800 text-sm">{localize("O tempo para pagamento expirou")}</h5>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto">{localize("Não se preocupe! Você pode voltar e gerar um novo código ou escolher pagar com cartão.")}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer border-none"
                  >
                    {localize("Gerar novo pagamento")}</button>
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <span className="bg-feedback-success/10 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-feedback-success/10 inline-flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-feedback-success mr-2 animate-pulse"></span>
                      {localize("Aguardando Pagamento Pix")}</span>
                    <h4 className="font-display font-extrabold text-slate-900 text-lg">
                      {localize("Escaneie o QR Code ou Copie o código")}</h4>
                  </div>

                  {/* Timer display */}
                  <div className="space-y-1 bg-slate-50 border border-slate-100 p-3 rounded-2xl max-w-[200px] mx-auto">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{localize("O QR Code expira em")}</p>
                    <p className="text-lg font-mono font-bold text-emerald-600">
                      {localize(formatTime(timeLeft))}
                    </p>
                  </div>

                  {/* QR Code Container */}
                  <div className="mx-auto w-48 h-48 bg-slate-50 border border-slate-100 rounded-3xl p-3 shadow-inner flex items-center justify-center">
                    {pixQrCode ? (
                      <img
                        src={pixQrCode.startsWith('data:') || pixQrCode.startsWith('http') ? pixQrCode : `data:image/png;base64,${pixQrCode}`}
                        alt={localize("QR Code Pix")}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Loader2 className="w-8 h-8 text-feedback-success animate-spin" />
                    )}
                  </div>

                  {/* Copy Paste Code */}
                  <div className="space-y-2">
                    <p className="text-slate-500 text-xs max-w-sm mx-auto">
                      {localize("Você também pode pagar copiando e colando a chave abaixo no aplicativo do seu banco.")}</p>
                    <div className="flex items-center space-x-2 max-w-sm mx-auto bg-slate-50 border border-slate-200/60 p-2 rounded-2xl">
                      <input
                        type="text"
                        readOnly
                        value={pixCopyPaste}
                        className="flex-1 bg-transparent text-xs text-slate-600 outline-none select-all truncate pl-1 border-none focus:ring-0"
                      />
                      <button
                        onClick={handleCopyPix}
                        className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-action-primary rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                        title={localize("Copiar Pix")}
                      >
                        {copied ? (
                          <span className="text-[10px] font-bold text-emerald-600 px-1">{localize("Copiado!")}</span>
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Safety badge */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm mx-auto flex items-center justify-center space-x-2 text-[11px] text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-feedback-success shrink-0" />
                    <span>{localize("Transação Monitorada pelo Banco Central")}</span>
                  </div>

                  {/* Back/Change method button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (pollingIntervalRef.current) {
                          clearInterval(pollingIntervalRef.current);
                          pollingIntervalRef.current = null;
                        }
                        setCurrentStep('payment');
                      }}
                      className="text-slate-500 hover:text-slate-700 text-xs font-semibold underline cursor-pointer border-none bg-transparent"
                    >
                      {localize("Voltar e escolher outra forma de pagamento")}</button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3B: Boleto Waiting Area */}
          {currentStep === 'boleto_waiting' && (
            <div className="space-y-6 text-center py-4">
              <div className="space-y-2">
                <span className="bg-amber-500/10 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-amber-500/10 inline-flex items-center">
                  {localize("Boleto Gerado com Sucesso")}</span>
                <h4 className="font-display font-extrabold text-slate-900 text-lg">
                  {localize("Copie o código de barras ou imprima o boleto")}</h4>
              </div>

              {/* PDF Ticket Redirection Button */}
              {boletoUrl && (
                <div className="space-y-2 max-w-sm mx-auto">
                  <a
                    href={boletoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl text-xs transition-all shadow-md gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    {localize("Visualizar / Imprimir Boleto")}</a>
                </div>
              )}

              {/* Barcode Copy display */}
              {boletoBarcode && (
                <div className="space-y-2">
                  <p className="text-slate-555 text-slate-500 text-xs max-w-sm mx-auto">
                    {localize("Você também pode pagar utilizando o código de barras no aplicativo do seu banco:")}</p>
                  <div className="flex items-center space-x-2 max-w-sm mx-auto bg-slate-50 border border-slate-200/60 p-2 rounded-2xl">
                    <input
                      type="text"
                      readOnly
                      value={boletoBarcode}
                      className="flex-1 bg-transparent text-xs text-slate-650 outline-none select-all truncate pl-1 border-none focus:ring-0"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(boletoBarcode);
                        setCopiedBarcode(true);
                        setTimeout(() => setCopiedBarcode(false), 2000);
                      }}
                      className="p-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-action-primary rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer shadow-sm"
                      title={localize("Copiar Código de Barras")}
                    >
                      {copiedBarcode ? (
                        <span className="text-[10px] font-bold text-emerald-600 px-1">{localize("Copiado!")}</span>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Instructions */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm mx-auto text-[11px] text-slate-500 text-left space-y-1.5">
                <p className="font-bold text-slate-700">{localize("Informações Importantes:")}</p>
                <p>{localize("• O boleto foi enviado para o seu e-mail: ")}<strong className="text-slate-700">{localize(email)}</strong>.</p>
                <p>{localize("• Prazo de compensação: de 1 a 2 dias úteis após o pagamento.")}</p>
                <p>{localize("• Assim que compensado, os links de acesso serão enviados automaticamente para o seu e-mail.")}</p>
              </div>

              {/* Close and Return Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    navigate('/obrigado');
                  }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all cursor-pointer border-none"
                >
                  {localize("Concluir e Ir para Obrigado")}</button>
              </div>
            </div>
          )}

          {/* STEP 4: Success State */}
          {currentStep === 'success' && (
            <div className="text-center py-10 space-y-6 animate-scale-in">
              <div className="mx-auto w-20 h-20 bg-feedback-success/10 text-feedback-success rounded-full flex items-center justify-center border border-feedback-success/20 shadow-lg">
                <CheckCircle2 className="w-12 h-12 animate-soft-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="font-display font-extrabold text-slate-900 text-2xl">
                  {localize(successTitle)}
                </h4>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  {localize(successDescription)}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm mx-auto text-xs text-slate-500">
                {localize("Redirecionando em instantes...")}</div>
            </div>
          )}

        </div>

        {/* Footer info badge */}
        {currentStep !== 'success' && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-center space-x-2 text-[10px] text-slate-450 text-slate-400">
            <Lock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span>{localize("Processado de forma 100% segura e confidencial")}</span>
          </div>
        )}

      </div>
    </div>
  </>
);
};
