import React, { createContext, useContext, useState } from 'react';
import { useCurrency, type CurrencyCode } from './CurrencyContext';

export type LanguageCode = 'pt-BR' | 'es' | 'pt-PT';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  region: string;
  defaultCurrency: CurrencyCode;
}

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  'pt-BR': {
    code: 'pt-BR',
    name: 'Português (Brasil)',
    region: 'Brasil',
    defaultCurrency: 'BRL',
  },
  'es': {
    code: 'es',
    name: 'Español',
    region: 'México • Argentina • Chile • Perú • España',
    defaultCurrency: 'MXN', // or USD
  },
  'pt-PT': {
    code: 'pt-PT',
    name: 'Português (Portugal)',
    region: 'Portugal • Europa • Moçambique',
    defaultCurrency: 'EUR',
  },
};

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  'pt-BR': {
    nav_all: 'Todos os Softwares',
    nav_search: 'Buscar software, ferramenta 3D ou engenharia...',
    nav_support: 'Suporte',
    nav_cart: 'Carrinho',
    nav_marcenaria: 'Marcenaria',
    nav_engenharia: 'Engenharia & Arquitetura',
    nav_design: 'Design & Criatividade',
    nav_escritorio: 'Escritório & Produtividade',
    nav_catalog: 'Catálogo',
    buy_now: 'Comprar agora',
    buy_now_badge: 'PIX • CARTÃO',
    add_to_cart: 'Adicionar ao carrinho',
    want_this: 'Quero levar',
    lifetime: 'Vitalício',
    subscription: 'Assinatura',
    platform: 'Plataforma',
    validity: 'Validade',
    choose_version: 'Escolha a versão',
    choose_license: 'Escolha a opção de licença',
    original_price: 'De',
    for_price: 'Por',
    save: 'Economia de',
    delivery_instant: 'Entrega Imediata',
    delivery_desc: 'Receba no e-mail logo após a confirmação',
    support_desc: 'Suporte técnico humanizado especializado',
    guarantee_desc: 'Garantia total de funcionamento ou seu dinheiro de volta',
    description: 'Descrição Geral',
    requirements: 'Requisitos do Sistema',
    features: 'Principais Recursos',
    reviews: 'Avaliações de Clientes',
    excellent: 'Excelente',
    verified_reviews: 'Avaliações verificadas no Trustpilot',
    cart_title: 'Seu Carrinho',
    cart_empty: 'Seu carrinho está vazio',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este item agora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pagamento individual seguro com conversão automática de moeda pela Cakto (Cartões Globais, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir para Pagamento Seguro Cakto',
    intl_modal_desc: 'Você será redirecionado para a plataforma blindada da Cakto Internacional, com cálculo automático na sua moeda local.',
    contact_support: 'Falar com suporte',
    back_home: 'Voltar ao Início',
    faq_title: 'Dúvidas Frequentes',
  },
  'es': {
    nav_all: 'Todos los Softwares',
    nav_search: 'Buscar software, herramienta 3D o ingeniería...',
    nav_support: 'Soporte',
    nav_cart: 'Carrito',
    nav_marcenaria: 'Carpintería y Muebles',
    nav_engenharia: 'Ingeniería y Arquitectura',
    nav_design: 'Diseño y Creatividad',
    nav_escritorio: 'Oficina y Productividad',
    nav_catalog: 'Catálogo',
    buy_now: 'Comprar ahora',
    buy_now_badge: 'PAGO SEGURO • TARJETAS & PAY',
    add_to_cart: 'Añadir al carrito',
    want_this: 'Comprar ahora',
    lifetime: 'De por vida',
    subscription: 'Suscripción',
    platform: 'Plataforma',
    validity: 'Validez',
    choose_version: 'Elige la versión',
    choose_license: 'Elige la opción de licencia',
    original_price: 'Antes',
    for_price: 'Ahora',
    save: 'Ahorro de',
    delivery_instant: 'Entrega Inmediata',
    delivery_desc: 'Recibe en tu correo electrónico al instante',
    support_desc: 'Soporte técnico especializado con asistencia remota',
    guarantee_desc: 'Garantía de funcionamiento o la devolución de tu dinero',
    description: 'Descripción General',
    requirements: 'Requisitos del Sistema',
    features: 'Características Principales',
    reviews: 'Opiniones de Clientes',
    excellent: 'Excelente',
    verified_reviews: 'Opiniones verificadas en Trustpilot',
    cart_title: 'Tu Carrito',
    cart_empty: 'Tu carrito está vacío',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este producto ahora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pago individual seguro con conversión automática de moneda por Cakto (Tarjetas Internacionales, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir al Pago Seguro en Cakto',
    intl_modal_desc: 'Serás redirigido a la pasarela blindada de Cakto Internacional con conversión automática a tu moneda local.',
    contact_support: 'Contactar soporte',
    back_home: 'Volver al Inicio',
    faq_title: 'Preguntas Frecuentes',
  },
  'pt-PT': {
    nav_all: 'Todos os Softwares',
    nav_search: 'Pesquisar software, ferramentas 3D ou engenharia...',
    nav_support: 'Apoio ao Cliente',
    nav_cart: 'Cesto',
    nav_marcenaria: 'Marcenaria & Mobiliário',
    nav_engenharia: 'Engenharia & Arquitetura',
    nav_design: 'Design & Criatividade',
    nav_escritorio: 'Escritório & Produtividade',
    nav_catalog: 'Catálogo',
    buy_now: 'Comprar agora',
    buy_now_badge: 'PAGAMENTO SEGURO • CARTÕES & PAY',
    add_to_cart: 'Adicionar ao cesto',
    want_this: 'Comprar agora',
    lifetime: 'Vitalício',
    subscription: 'Subscrição',
    platform: 'Plataforma',
    validity: 'Validade',
    choose_version: 'Escolha a versão',
    choose_license: 'Escolha a opção de licença',
    original_price: 'De',
    for_price: 'Por',
    save: 'Poupança de',
    delivery_instant: 'Entrega Imediata',
    delivery_desc: 'Receba no seu e-mail logo após a confirmação',
    support_desc: 'Apoio técnico especializado e acompanhamento remoto',
    guarantee_desc: 'Garantia total de funcionamento ou devolução do montante',
    description: 'Descrição Geral',
    requirements: 'Requisitos do Sistema',
    features: 'Principais Funcionalidades',
    reviews: 'Avaliações de Clientes',
    excellent: 'Excelente',
    verified_reviews: 'Avaliações verificadas no Trustpilot',
    cart_title: 'O Seu Cesto',
    cart_empty: 'O seu cesto está vazio',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este software agora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pagamento individual seguro com conversão automática de moeda pela Cakto (Cartões Globais, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir para o Pagamento Seguro na Cakto',
    intl_modal_desc: 'Será redirecionado para a plataforma blindada da Cakto Internacional, com faturação automática em Euros (€).',
    contact_support: 'Falar com o apoio ao cliente',
    back_home: 'Voltar ao Início',
    faq_title: 'Perguntas Frequentes',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  languageInfo: LanguageInfo;
  isInternational: boolean;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setCurrency } = useCurrency();

  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('c2tech_language') as LanguageCode | null;
      if (saved && LANGUAGES[saved]) return saved;

      // Auto-detect browser language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const navLang = navigator.language.toLowerCase();
        if (navLang.startsWith('es')) return 'es';
        if (navLang === 'pt-pt' || navLang.startsWith('pt-pt')) return 'pt-PT';
      }
    } catch {
      // fallback
    }
    return 'pt-BR';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('c2tech_language', lang);
    } catch {}

    // Automatically synchronize currency with selected region
    if (lang === 'es') {
      setCurrency('MXN'); // User can still choose USD, ARS, CLP, PEN in the currency selector
    } else if (lang === 'pt-PT') {
      setCurrency('EUR');
    } else {
      setCurrency('BRL');
    }
  };

  const isInternational = language !== 'pt-BR';

  const t = (key: string, fallback?: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS['pt-BR'];
    if (dict[key]) return dict[key];
    const defaultDict = TRANSLATIONS['pt-BR'];
    return defaultDict[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languageInfo: LANGUAGES[language] || LANGUAGES['pt-BR'],
        isInternational,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
