import React, { createContext, useContext, useState } from 'react';
import { useCurrency, type CurrencyCode } from './CurrencyContext';

export type LanguageCode = 'pt-BR' | 'es' | 'en' | 'pt-PT';

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
    region: 'Brasil • R$',
    defaultCurrency: 'BRL',
  },
  'en': {
    code: 'en',
    name: 'English',
    region: 'United States • Global ($)',
    defaultCurrency: 'USD',
  },
  'es': {
    code: 'es',
    name: 'Español',
    region: 'Hispanoamérica • España ($)',
    defaultCurrency: 'USD',
  },
  'pt-PT': {
    code: 'pt-PT',
    name: 'Português (Portugal)',
    region: 'Portugal • Europa ($)',
    defaultCurrency: 'USD',
  },
};

const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  'pt-BR': {
    top_about_us: 'Sobre nós',
    top_contact: 'Fale conosco',
    top_instant_delivery: 'Entrega Imediata',
    top_secure_payment: 'Pagamento Seguro',
    brand_subtitle: 'Licenças Digitais',
    real_time_conversion: 'Moeda da Loja',
    currency_switch_title: 'Converter moeda (R$ / $ USD)',
    region_switch_title: 'Região e Idioma',
    region_title: 'Idioma e Região',
    active_badge: 'Ativo',
    switch_badge: 'Mudar',

    nav_home: 'Início',
    nav_all: 'Todos os Softwares',
    nav_search: 'Buscar software, ferramenta 3D ou engenharia...',
    nav_search_short: 'Buscar software...',
    nav_search_cancel: 'Cancelar',
    nav_support: 'Suporte',
    nav_cart: 'Carrinho',
    nav_see_all: 'Ver todos os softwares em',
    nav_featured: 'Destaques Recomendados',
    nav_marcenaria: 'Marcenaria',
    nav_engenharia: 'Engenharia & Arquitetura',
    nav_design: 'Design & Criatividade',
    nav_escritorio: 'Escritório & Produtividade',
    nav_catalog: 'Catálogo',

    breadcrumb_home: 'Início',
    breadcrumb_all_products: 'Todos os Produtos',
    trustpilot_what_customers_say: 'O que nossos clientes dizem',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: 'de 5 baseado em',
    trustpilot_reviews_count: '1.785 avaliações',
    trustpilot_reviews_modal_title: 'Ver avaliações verificadas no Trustpilot',

    save: 'Economize',
    badge_software: 'SOFTWARE',
    badge_lifetime_gold: 'VITALÍCIO',
    thumb_cover: 'Capa Principal',
    thumb_photo: 'Foto',
    thumb_video: 'VÍDEO',
    thumb_email: 'E-MAIL',
    thumb_lifetime: 'VITALÍCIO',
    video_badge_title: 'Instruções em Vídeo Passo a Passo',
    email_badge_title: 'Link de Download Direto no E-mail',
    warranty_badge_title: 'Funcionamento Vitalício do Software',

    selected_label: 'Selecionado',
    edition_label: 'Edição',
    full_lifetime_version: 'Versão Completa Vitalícia',
    compatible_with: 'Compatível com',
    badge_lifetime: 'Uso Vitalício',
    badge_lifetime_sub: 'Sem mensalidades recorrentes',
    badge_guaranteed: 'Ativação Garantida',
    badge_guaranteed_sub: '30 dias de suporte técnico',
    badge_digital_delivery: 'Entrega Digital',
    badge_digital_delivery_sub: 'Link no seu e-mail e WhatsApp',

    platform: 'Plataforma',
    validity: 'Validade',
    year: 'Ano',
    lifetime: 'Vitalício',
    subscription: 'Assinatura',
    choose_version: 'Escolha a versão',
    choose_license: 'Escolha a opção de licença',
    original_price: 'De',
    for_price: 'Por',

    device_support_label: 'Suporte para quantos dispositivos:',
    single_device: '1 Dispositivo',
    multiple_devices: 'Dispositivos',
    add_to_cart: 'Adicionar ao carrinho',
    buy_now: 'Comprar agora',
    buy_now_badge: 'PIX • CARTÃO',
    want_this: 'Quero levar',
    temporarily_unavailable: 'Temporariamente Indisponível',

    trustpilot_based_on_bar: 'Com base em',
    trustpilot_bar_reviews: '1.782 avaliações',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'Exibindo nossas avaliações de 4 & 5 estrelas',

    tab_description: 'DESCRIÇÃO',
    tab_specs: 'ESPECIFICAÇÕES DO SISTEMA',
    tab_activation: 'ATIVAÇÃO',
    product_details_heading: 'Detalhes do produto',
    product_receive_3_steps: 'Receba seu software em 3 passos simples',
    faq_heading: 'Perguntas Frequentes (FAQ)',

    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Processador',
    spec_storage: 'Espaço em Disco',
    spec_ram: 'Memória RAM',
    spec_os: 'Sistema Operacional',
    spec_other: 'Outros Requisitos',
    spec_other_desc: 'Conexão com a internet para realizar o download dos arquivos de instalação e assistir ao vídeo tutorial enviado por e-mail. Após instalado e ativado, o software funciona 100% offline.',

    in_same_category: 'Na mesma categoria',
    product_reviews_title: 'AVALIAÇÕES DO PRODUTO',
    average_rating_label: 'Classificação média',
    write_review_btn: 'Escreva sua avaliação',
    ask_question_btn: 'Faça uma pergunta',
    details_btn: 'Detalhes',

    cart_title: 'Seu Carrinho',
    cart_empty: 'Seu carrinho está vazio',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este item agora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pagamento individual seguro com conversão em dólar pela Cakto (Cartões Globais, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir para Pagamento Seguro Cakto ($ USD)',
    intl_modal_desc: 'Você será redirecionado para a plataforma blindada da Cakto Internacional, faturado em Dólares ($ USD).',
    contact_support: 'Falar com suporte',
    back_home: 'Voltar ao Início',
    faq_title: 'Dúvidas Frequentes',
  },
  'en': {
    top_about_us: 'About Us',
    top_contact: 'Contact Us',
    top_instant_delivery: 'Instant Delivery',
    top_secure_payment: 'Secure Payment',
    brand_subtitle: 'Digital Licenses',
    real_time_conversion: 'Store Currency',
    currency_switch_title: 'Switch currency (R$ / $ USD)',
    region_switch_title: 'Region and Language',
    region_title: 'Language & Region',
    active_badge: 'Active',
    switch_badge: 'Switch',

    nav_home: 'Home',
    nav_all: 'All Software',
    nav_search: 'Search software, 3D tools or engineering...',
    nav_search_short: 'Search software...',
    nav_search_cancel: 'Cancel',
    nav_support: 'Support',
    nav_cart: 'Cart',
    nav_see_all: 'View all software in',
    nav_featured: 'Featured Recommendations',
    nav_marcenaria: 'Woodworking & CAD',
    nav_engenharia: 'Engineering & Architecture',
    nav_design: 'Design & Creativity',
    nav_escritorio: 'Office & Productivity',
    nav_catalog: 'Catalog',

    breadcrumb_home: 'Home',
    breadcrumb_all_products: 'All Products',
    trustpilot_what_customers_say: 'What our customers say',
    trustpilot_excellent: 'Excellent',
    trustpilot_score_based_on: 'out of 5 based on',
    trustpilot_reviews_count: '1,785 reviews',
    trustpilot_reviews_modal_title: 'View verified reviews on Trustpilot',

    save: 'Save',
    badge_software: 'SOFTWARE',
    badge_lifetime_gold: 'LIFETIME',
    thumb_cover: 'Main Cover',
    thumb_photo: 'Photo',
    thumb_video: 'VIDEO',
    thumb_email: 'EMAIL',
    thumb_lifetime: 'LIFETIME',
    video_badge_title: 'Step-by-Step Video Instructions',
    email_badge_title: 'Direct Download Link in Email',
    warranty_badge_title: 'Lifetime Software Functionality',

    selected_label: 'Selected',
    edition_label: 'Edition',
    full_lifetime_version: 'Full Lifetime Version',
    compatible_with: 'Compatible with',
    badge_lifetime: 'Lifetime Use',
    badge_lifetime_sub: 'No recurring monthly fees',
    badge_guaranteed: 'Guaranteed Activation',
    badge_guaranteed_sub: '30-day technical support',
    badge_digital_delivery: 'Digital Delivery',
    badge_digital_delivery_sub: 'Link sent to email & WhatsApp',

    platform: 'Platform',
    validity: 'Validity',
    year: 'Year',
    lifetime: 'Lifetime',
    subscription: 'Subscription',
    choose_version: 'Choose version',
    choose_license: 'Choose license option',
    original_price: 'Was',
    for_price: 'Now',

    device_support_label: 'Support for how many devices:',
    single_device: '1 Device',
    multiple_devices: 'Devices',
    add_to_cart: 'Add to Cart',
    buy_now: 'Buy Now',
    buy_now_badge: 'SECURE PAY • CARDS & PAY',
    want_this: 'Buy Now',
    temporarily_unavailable: 'Temporarily Unavailable',

    trustpilot_based_on_bar: 'Based on',
    trustpilot_bar_reviews: '1,782 reviews',
    trustpilot_verified: 'Verified',
    trustpilot_showing_high_ratings: 'Showing our 4 & 5 star reviews',

    tab_description: 'DESCRIPTION',
    tab_specs: 'SYSTEM SPECIFICATIONS',
    tab_activation: 'ACTIVATION',
    product_details_heading: 'Product Details',
    product_receive_3_steps: 'Receive your software in 3 simple steps',
    faq_heading: 'Frequently Asked Questions (FAQ)',

    spec_platform: 'Platform',
    spec_gpu: 'Graphics / GPU',
    spec_cpu: 'Processor',
    spec_storage: 'Disk Space',
    spec_ram: 'RAM Memory',
    spec_os: 'Operating System',
    spec_other: 'Other Requirements',
    spec_other_desc: 'Internet connection required to download the installation files and watch the video tutorial sent via email. Once installed and activated, the software works 100% offline.',

    in_same_category: 'In the same category',
    product_reviews_title: 'PRODUCT REVIEWS',
    average_rating_label: 'Average rating',
    write_review_btn: 'Write a review',
    ask_question_btn: 'Ask a question',
    details_btn: 'Details',

    cart_title: 'Your Cart',
    cart_empty: 'Your cart is empty',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Proceed to Checkout',
    cart_pay_now: 'Pay for this item now',
    intl_checkout_badge: 'INTERNATIONAL CHECKOUT',
    intl_checkout_hint: 'Standardized USD payment via Cakto (Global Cards, Apple Pay, Google Pay).',
    intl_modal_title: 'Secure International Checkout',
    intl_modal_btn: 'Go to Cakto Secure Checkout ($ USD)',
    intl_modal_desc: 'You will be redirected to the secure Cakto International gateway, billed in US Dollars ($ USD).',
    contact_support: 'Contact support',
    back_home: 'Back to Home',
    faq_title: 'Frequently Asked Questions',
  },
  'es': {
    top_about_us: 'Sobre nosotros',
    top_contact: 'Contáctanos',
    top_instant_delivery: 'Entrega Inmediata',
    top_secure_payment: 'Pago Seguro',
    brand_subtitle: 'Licencias Digitales',
    real_time_conversion: 'Moneda de la Tienda',
    currency_switch_title: 'Cambiar moneda (R$ / $ USD)',
    region_switch_title: 'Región e Idioma',
    region_title: 'Idioma y Región',
    active_badge: 'Activo',
    switch_badge: 'Cambiar',

    nav_home: 'Inicio',
    nav_all: 'Todos los Softwares',
    nav_search: 'Buscar software, herramienta 3D o ingeniería...',
    nav_search_short: 'Buscar software...',
    nav_search_cancel: 'Cancelar',
    nav_support: 'Soporte',
    nav_cart: 'Carrito',
    nav_see_all: 'Ver todos los softwares en',
    nav_featured: 'Destacados Recomendados',
    nav_marcenaria: 'Carpintería y Muebles',
    nav_engenharia: 'Ingeniería y Arquitectura',
    nav_design: 'Diseño y Creatividad',
    nav_escritorio: 'Oficina y Productividad',
    nav_catalog: 'Catálogo',

    breadcrumb_home: 'Inicio',
    breadcrumb_all_products: 'Todos los Productos',
    trustpilot_what_customers_say: 'Lo que dicen nuestros clientes',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: 'de 5 basado en',
    trustpilot_reviews_count: '1.785 opiniones',
    trustpilot_reviews_modal_title: 'Ver opiniones verificadas en Trustpilot',

    save: 'Ahorra',
    badge_software: 'SOFTWARE',
    badge_lifetime_gold: 'DE POR VIDA',
    thumb_cover: 'Portada Principal',
    thumb_photo: 'Foto',
    thumb_video: 'VIDEO',
    thumb_email: 'CORREO',
    thumb_lifetime: 'DE POR VIDA',
    video_badge_title: 'Instrucciones en Video Paso a Paso',
    email_badge_title: 'Enlace de Descarga Directa en el Correo',
    warranty_badge_title: 'Funcionamiento de por Vida del Software',

    selected_label: 'Seleccionado',
    edition_label: 'Edición',
    full_lifetime_version: 'Versión Completa de Por Vida',
    compatible_with: 'Compatible con',
    badge_lifetime: 'Uso de Por Vida',
    badge_lifetime_sub: 'Sin mensualidades recurrentes',
    badge_guaranteed: 'Activación Garantizada',
    badge_guaranteed_sub: '30 días de soporte técnico',
    badge_digital_delivery: 'Entrega Digital',
    badge_digital_delivery_sub: 'Enlace a tu correo y WhatsApp',

    platform: 'Plataforma',
    validity: 'Validez',
    year: 'Año',
    lifetime: 'De por vida',
    subscription: 'Suscripción',
    choose_version: 'Elige la versión',
    choose_license: 'Elige la opción de licencia',
    original_price: 'Antes',
    for_price: 'Ahora',

    device_support_label: 'Soporte para cuántos dispositivos:',
    single_device: '1 Dispositivo',
    multiple_devices: 'Dispositivos',
    add_to_cart: 'Añadir al carrito',
    buy_now: 'Comprar ahora',
    buy_now_badge: 'PAGO SEGURO • TARJETAS & PAY',
    want_this: 'Comprar ahora',
    temporarily_unavailable: 'Temporalmente No Disponible',

    trustpilot_based_on_bar: 'Con base en',
    trustpilot_bar_reviews: '1.782 opiniones',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'Mostrando nuestras valoraciones de 4 y 5 estrellas',

    tab_description: 'DESCRIPCIÓN',
    tab_specs: 'ESPECIFICACIONES DEL SISTEMA',
    tab_activation: 'ACTIVACIÓN',
    product_details_heading: 'Detalles del producto',
    product_receive_3_steps: 'Recibe tu software en 3 sencillos pasos',
    faq_heading: 'Preguntas Frecuentes (FAQ)',

    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Procesador',
    spec_storage: 'Espacio en Disco',
    spec_ram: 'Memoria RAM',
    spec_os: 'Sistema Operativo',
    spec_other: 'Otros Requisitos',
    spec_other_desc: 'Conexión a internet para descargar los archivos de instalación y ver el video tutorial enviado por correo. Tras ser instalado y activado, el software funciona 100% sin conexión (offline).',

    in_same_category: 'En la misma categoría',
    product_reviews_title: 'OPINIONES DEL PRODUCTO',
    average_rating_label: 'Calificación promedio',
    write_review_btn: 'Escribe tu opinión',
    ask_question_btn: 'Haz una pregunta',
    details_btn: 'Detalles',

    cart_title: 'Tu Carrito',
    cart_empty: 'Tu carrito está vacío',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este producto ahora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pago estandarizado en dólares ($ USD) por Cakto (Tarjetas Internacionales, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir al Pago Seguro en Cakto ($ USD)',
    intl_modal_desc: 'Serás redirigido a la pasarela blindada de Cakto Internacional facturado en Dólares ($ USD).',
    contact_support: 'Contactar soporte',
    back_home: 'Volver al Inicio',
    faq_title: 'Preguntas Frecuentes',
  },
  'pt-PT': {
    top_about_us: 'Sobre nós',
    top_contact: 'Fale connosco',
    top_instant_delivery: 'Entrega Imediata',
    top_secure_payment: 'Pagamento Seguro',
    brand_subtitle: 'Licenças Digitais',
    real_time_conversion: 'Moeda da Loja',
    currency_switch_title: 'Mudar moeda (R$ / $ USD)',
    region_switch_title: 'Região e Idioma',
    region_title: 'Idioma e Região',
    active_badge: 'Ativo',
    switch_badge: 'Mudar',

    nav_home: 'Início',
    nav_all: 'Todos os Softwares',
    nav_search: 'Pesquisar software, ferramentas 3D ou engenharia...',
    nav_search_short: 'Pesquisar software...',
    nav_search_cancel: 'Cancelar',
    nav_support: 'Apoio ao Cliente',
    nav_cart: 'Cesto',
    nav_see_all: 'Ver todos os softwares em',
    nav_featured: 'Destaques Recomendados',
    nav_marcenaria: 'Marcenaria & Mobiliário',
    nav_engenharia: 'Engenharia & Arquitetura',
    nav_design: 'Design & Criatividade',
    nav_escritorio: 'Escritório & Produtividade',
    nav_catalog: 'Catálogo',

    breadcrumb_home: 'Início',
    breadcrumb_all_products: 'Todos os Produtos',
    trustpilot_what_customers_say: 'O que dizem os nossos clientes',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: 'de 5 baseado em',
    trustpilot_reviews_count: '1.785 avaliações',
    trustpilot_reviews_modal_title: 'Ver avaliações verificadas no Trustpilot',

    save: 'Poupe',
    badge_software: 'SOFTWARE',
    badge_lifetime_gold: 'VITALÍCIO',
    thumb_cover: 'Capa Principal',
    thumb_photo: 'Foto',
    thumb_video: 'VÍDEO',
    thumb_email: 'E-MAIL',
    thumb_lifetime: 'VITALÍCIO',
    video_badge_title: 'Instruções em Vídeo Passo a Passo',
    email_badge_title: 'Link de Transferência Direta no E-mail',
    warranty_badge_title: 'Funcionamento Vitalício do Software',

    selected_label: 'Selecionado',
    edition_label: 'Edição',
    full_lifetime_version: 'Versão Completa Vitalícia',
    compatible_with: 'Compatível com',
    badge_lifetime: 'Uso Vitalício',
    badge_lifetime_sub: 'Sem mensalidades recorrentes',
    badge_guaranteed: 'Ativação Garantida',
    badge_guaranteed_sub: '30 dias de apoio técnico',
    badge_digital_delivery: 'Entrega Digital',
    badge_digital_delivery_sub: 'Link no seu e-mail e WhatsApp',

    platform: 'Plataforma',
    validity: 'Validade',
    year: 'Ano',
    lifetime: 'Vitalício',
    subscription: 'Subscrição',
    choose_version: 'Escolha a versão',
    choose_license: 'Escolha a opção de licença',
    original_price: 'De',
    for_price: 'Por',

    device_support_label: 'Apoio para quantos dispositivos:',
    single_device: '1 Dispositivo',
    multiple_devices: 'Dispositivos',
    add_to_cart: 'Adicionar ao cesto',
    buy_now: 'Comprar agora',
    buy_now_badge: 'PAGAMENTO SEGURO • CARTÕES & PAY',
    want_this: 'Comprar agora',
    temporarily_unavailable: 'Temporariamente Indisponível',

    trustpilot_based_on_bar: 'Com base em',
    trustpilot_bar_reviews: '1.782 avaliações',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'A apresentar as nossas avaliações de 4 e 5 estrelas',

    tab_description: 'DESCRIÇÃO',
    tab_specs: 'ESPECIFICAÇÕES DO SISTEMA',
    tab_activation: 'ATIVAÇÃO',
    product_details_heading: 'Detalhes do produto',
    product_receive_3_steps: 'Receba o seu software em 3 passos simples',
    faq_heading: 'Perguntas Frequentes (FAQ)',

    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Processador',
    spec_storage: 'Espaço em Disco',
    spec_ram: 'Memória RAM',
    spec_os: 'Sistema Operativo',
    spec_other: 'Outros Requisitos',
    spec_other_desc: 'Ligação à internet para transferir os ficheiros de instalação e assistir ao vídeo tutorial enviado por e-mail. Após instalado e ativado, o software funciona 100% offline.',

    in_same_category: 'Na mesma categoria',
    product_reviews_title: 'AVALIAÇÕES DO PRODUTO',
    average_rating_label: 'Classificação média',
    write_review_btn: 'Escreva a sua avaliação',
    ask_question_btn: 'Faça uma pergunta',
    details_btn: 'Detalhes',

    cart_title: 'O Seu Cesto',
    cart_empty: 'O seu cesto está vazio',
    cart_total: 'Total',
    cart_subtotal: 'Subtotal',
    cart_checkout: 'Finalizar Compra',
    cart_pay_now: 'Pagar este software agora',
    intl_checkout_badge: 'CHECKOUT INTERNACIONAL',
    intl_checkout_hint: 'Pagamento padronizado em Dólar ($ USD) pela Cakto (Cartões Globais, Apple Pay, Google Pay).',
    intl_modal_title: 'Checkout Internacional Seguro',
    intl_modal_btn: 'Ir para o Pagamento Seguro na Cakto ($ USD)',
    intl_modal_desc: 'Será redirecionado para a plataforma blindada da Cakto Internacional, com faturação em Dólares ($ USD).',
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
        if (navLang.startsWith('en')) return 'en';
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

    // When international (en, es, pt-PT), standardize currency to USD ($)
    if (lang === 'pt-BR') {
      setCurrency('BRL');
    } else {
      setCurrency('USD');
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
