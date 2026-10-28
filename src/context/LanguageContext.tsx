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
    // Top Bar & Header
    top_about_us: 'Sobre nós',
    top_contact: 'Fale conosco',
    top_instant_delivery: 'Entrega Imediata',
    top_secure_payment: 'Pagamento Seguro',
    brand_subtitle: 'Licenças Digitais',
    real_time_conversion: 'Conversão em Tempo Real',
    currency_switch_title: 'Converter moeda de exibição',
    region_switch_title: 'Região e Idioma',
    region_title: 'Idioma e Região',
    active_badge: 'Ativo',
    switch_badge: 'Mudar',

    // Mega-Menu & Nav
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

    // Product Page Breadcrumbs & Trustpilot Top
    breadcrumb_home: 'Início',
    breadcrumb_all_products: 'Todos os Produtos',
    trustpilot_what_customers_say: 'O que nossos clientes dizem',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: '4.8 de 5 baseado em',
    trustpilot_reviews_count: '1.785 avaliações',
    trustpilot_reviews_modal_title: 'Ver avaliações verificadas no Trustpilot',

    // Badges & Product Box
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

    // Product Info & Configurator
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

    // Trustpilot Carousel Bar
    trustpilot_based_on_bar: 'Com base em',
    trustpilot_bar_reviews: '1.782 avaliações',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'Exibindo nossas avaliações de 4 & 5 estrelas',

    // Tabs
    tab_description: 'DESCRIÇÃO',
    tab_specs: 'ESPECIFICAÇÕES DO SISTEMA',
    tab_activation: 'ATIVAÇÃO',
    product_details_heading: 'Detalhes do produto',
    product_receive_3_steps: 'Receba seu software em 3 passos simples',
    faq_heading: 'Perguntas Frequentes (FAQ)',

    // Specs Table
    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Processador',
    spec_storage: 'Espaço em Disco',
    spec_ram: 'Memória RAM',
    spec_os: 'Sistema Operacional',
    spec_other: 'Outros Requisitos',
    spec_other_desc: 'Conexão com a internet para realizar o download dos arquivos de instalação e assistir ao vídeo tutorial enviado por e-mail. Após instalado e ativado, o software funciona 100% offline.',

    // Related & Reviews Section
    in_same_category: 'Na mesma categoria',
    product_reviews_title: 'AVALIAÇÕES DO PRODUTO',
    average_rating_label: 'Classificação média',
    write_review_btn: 'Escreva sua avaliação',
    ask_question_btn: 'Faça uma pergunta',
    details_btn: 'Detalhes',

    // Cart & Modal
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
    // Top Bar & Header
    top_about_us: 'Sobre nosotros',
    top_contact: 'Contáctanos',
    top_instant_delivery: 'Entrega Inmediata',
    top_secure_payment: 'Pago Seguro',
    brand_subtitle: 'Licencias Digitales',
    real_time_conversion: 'Conversión en Tiempo Real',
    currency_switch_title: 'Convertir moneda de visualización',
    region_switch_title: 'Región e Idioma',
    region_title: 'Idioma y Región',
    active_badge: 'Activo',
    switch_badge: 'Cambiar',

    // Mega-Menu & Nav
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

    // Product Page Breadcrumbs & Trustpilot Top
    breadcrumb_home: 'Inicio',
    breadcrumb_all_products: 'Todos los Productos',
    trustpilot_what_customers_say: 'Lo que dicen nuestros clientes',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: '4.8 de 5 basado en',
    trustpilot_reviews_count: '1.785 opiniones',
    trustpilot_reviews_modal_title: 'Ver opiniones verificadas en Trustpilot',

    // Badges & Product Box
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

    // Product Info & Configurator
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

    // Trustpilot Carousel Bar
    trustpilot_based_on_bar: 'Con base en',
    trustpilot_bar_reviews: '1.782 opiniones',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'Mostrando nuestras valoraciones de 4 y 5 estrellas',

    // Tabs
    tab_description: 'DESCRIPCIÓN',
    tab_specs: 'ESPECIFICACIONES DEL SISTEMA',
    tab_activation: 'ACTIVACIÓN',
    product_details_heading: 'Detalles del producto',
    product_receive_3_steps: 'Recibe tu software en 3 sencillos pasos',
    faq_heading: 'Preguntas Frecuentes (FAQ)',

    // Specs Table
    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Procesador',
    spec_storage: 'Espacio en Disco',
    spec_ram: 'Memoria RAM',
    spec_os: 'Sistema Operativo',
    spec_other: 'Otros Requisitos',
    spec_other_desc: 'Conexión a internet para descargar los archivos de instalación y ver el video tutorial enviado por correo. Tras ser instalado y activado, el software funciona 100% sin conexión (offline).',

    // Related & Reviews Section
    in_same_category: 'En la misma categoría',
    product_reviews_title: 'OPINIONES DEL PRODUCTO',
    average_rating_label: 'Calificación promedio',
    write_review_btn: 'Escribe tu opinión',
    ask_question_btn: 'Haz una pregunta',
    details_btn: 'Detalles',

    // Cart & Modal
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
    // Top Bar & Header
    top_about_us: 'Sobre nós',
    top_contact: 'Fale connosco',
    top_instant_delivery: 'Entrega Imediata',
    top_secure_payment: 'Pagamento Seguro',
    brand_subtitle: 'Licenças Digitais',
    real_time_conversion: 'Conversão em Tempo Real',
    currency_switch_title: 'Converter moeda de visualização',
    region_switch_title: 'Região e Idioma',
    region_title: 'Idioma e Região',
    active_badge: 'Ativo',
    switch_badge: 'Mudar',

    // Mega-Menu & Nav
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

    // Product Page Breadcrumbs & Trustpilot Top
    breadcrumb_home: 'Início',
    breadcrumb_all_products: 'Todos os Produtos',
    trustpilot_what_customers_say: 'O que dizem os nossos clientes',
    trustpilot_excellent: 'Excelente',
    trustpilot_score_based_on: '4.8 de 5 baseado em',
    trustpilot_reviews_count: '1.785 avaliações',
    trustpilot_reviews_modal_title: 'Ver avaliações verificadas no Trustpilot',

    // Badges & Product Box
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

    // Product Info & Configurator
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

    // Trustpilot Carousel Bar
    trustpilot_based_on_bar: 'Com base em',
    trustpilot_bar_reviews: '1.782 avaliações',
    trustpilot_verified: 'Verificado',
    trustpilot_showing_high_ratings: 'A apresentar as nossas avaliações de 4 e 5 estrelas',

    // Tabs
    tab_description: 'DESCRIÇÃO',
    tab_specs: 'ESPECIFICAÇÕES DO SISTEMA',
    tab_activation: 'ATIVAÇÃO',
    product_details_heading: 'Detalhes do produto',
    product_receive_3_steps: 'Receba o seu software em 3 passos simples',
    faq_heading: 'Perguntas Frequentes (FAQ)',

    // Specs Table
    spec_platform: 'Plataforma',
    spec_gpu: 'Gráficos / GPU',
    spec_cpu: 'Processador',
    spec_storage: 'Espaço em Disco',
    spec_ram: 'Memória RAM',
    spec_os: 'Sistema Operativo',
    spec_other: 'Outros Requisitos',
    spec_other_desc: 'Ligação à internet para transferir os ficheiros de instalação e assistir ao vídeo tutorial enviado por e-mail. Após instalado e ativado, o software funciona 100% offline.',

    // Related & Reviews Section
    in_same_category: 'Na mesma categoria',
    product_reviews_title: 'AVALIAÇÕES DO PRODUTO',
    average_rating_label: 'Classificação média',
    write_review_btn: 'Escreva a sua avaliação',
    ask_question_btn: 'Faça uma pergunta',
    details_btn: 'Detalhes',

    // Cart & Modal
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
