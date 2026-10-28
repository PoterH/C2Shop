export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  compatibility: 'Windows' | 'macOS' | 'Windows e macOS';
  description: string;
  longDescription: string;
  price: number;
  originalPrice: number;
  checkoutUrl: string;
  version: string;
  requirements: {
    os: string;
    cpu: string;
    ram: string;
    gpu?: string;
    storage: string;
  };
  features: string[];
  notes?: string;
  imageUrl?: string;
  unavailable?: boolean;
  appmaxSku?: string;
  isSubscription?: boolean;
  recurrencePrice?: number;
  billingPeriod?: 'mensal' | 'anual';
  selectedSubOption?: 'recurrent' | 'avulso';
  recurrenceCheckoutUrl?: string;
  licenseOptions?: LicenseOption[];
  selectedLicenseOption?: LicenseOption;
  deviceCount?: number;
  reviews?: any[];
  keywords?: string[];
  isRecommended?: boolean;
  ean13?: string;
  mpn?: string;
  gallery?: string[];
  driveUrl?: string;
  internationalCheckoutUrl?: string;
}

export interface LicenseOption {
  quantity: number;
  label: string;
  price: number;
  originalPrice?: number;
  checkoutUrl: string;
  internationalCheckoutUrl?: string;
  platform?: 'Windows' | 'macOS';
  year?: string;
  downloadSlug?: string;
  imageUrl?: string;
  gallery?: string[];
  driveUrl?: string;
}


export const CATEGORIES = [
  'Todos',
  'Engenharia e Arquitetura',
  'Design e Criatividade',
  'Escritório e Produtividade',
  'Marcenaria e Móveis Planejados',
  'Projetos Elétricos e Eletrônicos',
  'Odontologia e CAD Dental'
] as const;

export const products: Product[] = [
  {
    id: 'geo5_2024_win',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim'],
    slug: 'geo5-2024-windows',
    name: 'GEO5 2024 (Todos os Módulos)',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2024',
    description: 'Software completo para geotecnia com todos os módulos inclusos.',
    longDescription: 'O GEO5 2024 é um conjunto de software avançado e intuitivo projetado para resolver uma ampla gama de problemas geotécnicos. Esta versão inclui todos os módulos disponíveis, fornecendo soluções integradas para projeto de escavações, muros de arrimo, fundações, estabilidade de taludes, entre outros.',
    price: 227.90,
    originalPrice: 369.00,
    checkoutUrl: 'https://pay.cakto.com.br/kcsubty_850603',
    imageUrl: '/images/products/geo5-2024.png',
    notes: 'Nota: O acesso para download será enviado instantaneamente no seu e-mail após a compra.',
    features: [
      'Versão 2024 completa com todos os módulos inclusos',
      'Análise de estabilidade de taludes e muros de arrimo',
      'Projeto de fundações rasas e profundas',
      'Análise de recalques e consolidação',
      'Integração e importação de dados geológicos',
      'Acesso vitalício para uso ilimitado'
    ],
    requirements: {
      os: 'Windows 10, 11 (64-bits)',
      cpu: 'Processador de 2 GHz ou superior',
      ram: '8 GB ou mais',
      storage: '20 GB de espaço livre',
      gpu: 'Placa de vídeo compatível com DirectX 11 ou superior'
    },
    reviews: [
      {
        id: 'geo5_rev1',
        userId: 'geo_u1',
        userName: 'Eng. Marcelo',
        rating: 5,
        comment: 'Todos os módulos liberados conforme anunciado. Já estou usando nos projetos de contenção do escritório. Sensacional.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'geo5_rev2',
        userId: 'geo_u2',
        userName: 'Ricardo Silva',
        rating: 5,
        comment: 'O suporte remoto deles é nota 10. Tive uma dúvida na instalação e resolveram em 5 minutos.',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]
  },

  {
    id: 'autocad_2027_win',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim', 'macos', 'windows', '2019', '2024', '2025', '2026', '2027'],
    slug: 'autocad-2027-windows',
    name: 'Autodesk AutoCAD',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows e macOS',
    version: '2019 a 2027 (64-bits)',
    description: 'Ferramenta profissional líder para desenhos técnicos, projetos 2D e modelagem 3D no Windows e macOS com licença vitalícia.',
    longDescription: 'O Autodesk AutoCAD é o software de desenho técnico auxiliado por computador (CAD) líder absoluto no mercado mundial. Esta versão completa e funcional com acesso vitalício oferece precisão milimétrica, ferramentas avançadas de documentação 2D, modelagem 3D realista, automação inteligente de blocos e camadas, além de uma interface fluida projetada para acelerar seu fluxo de trabalho em arquitetura, engenharia civil, mecânica e elétrica.',
    price: 67.90,
    originalPrice: 129.90,
    checkoutUrl: 'https://pay.cakto.com.br/e76zoav',
    imageUrl: '/images/products/autocad-cover.png',
    ean13: '8388917939753',
    mpn: '001N1-WW8644-T480',
    licenseOptions: [
      {
        quantity: 20191,
        platform: 'Windows',
        year: '2019',
        label: 'Windows - 2019',
        price: 67.90,
        originalPrice: 129.90,
        checkoutUrl: 'https://pay.cakto.com.br/e76zoav',
        driveUrl: 'https://drive.google.com/drive/folders/1dxBJGU_lQAdXzSNg2SKlZWDxaLPbtq8e?usp=drive_link',
        downloadSlug: 'autocad-2019-windows',
        imageUrl: '/images/products/autocad-2019-windows.png',
        gallery: ['/images/products/autocad-2019-windows.png']
      },
      {
        quantity: 20241,
        platform: 'Windows',
        year: '2024',
        label: 'Windows - 2024',
        price: 117.90,
        originalPrice: 189.90,
        checkoutUrl: 'https://pay.cakto.com.br/89pnrua',
        driveUrl: 'https://drive.google.com/drive/folders/1Tyq7yNlz5jIzZGP-l6p8CYO9nxIsH1bS?usp=drive_link',
        downloadSlug: 'autocad-2024-windows',
        imageUrl: '/images/products/autocad-2024-windows.png',
        gallery: ['/images/products/autocad-2024-windows.png']
      },
      {
        quantity: 20251,
        platform: 'Windows',
        year: '2025',
        label: 'Windows - 2025',
        price: 127.90,
        originalPrice: 209.00,
        checkoutUrl: 'https://pay.cakto.com.br/5d9i7rx',
        driveUrl: 'https://drive.google.com/drive/folders/1wSjViIX_14R6SbCGP7f_2vPxXbttFi_S?usp=drive_link',
        downloadSlug: 'autocad-2025-windows',
        imageUrl: '/images/products/autocad-2025-windows.png',
        gallery: ['/images/products/autocad-2025-windows.png']
      },
      {
        quantity: 20261,
        platform: 'Windows',
        year: '2026',
        label: 'Windows - 2026',
        price: 137.90,
        originalPrice: 224.90,
        checkoutUrl: 'https://pay.cakto.com.br/t38dbcv',
        driveUrl: 'https://drive.google.com/drive/folders/1dPfNigOwUAm9HzpQJopKDrB-dLKhirt6?usp=drive_link',
        downloadSlug: 'autocad-2026-windows',
        imageUrl: '/images/products/autocad-2026-windows.png',
        gallery: ['/images/products/autocad-2026-windows.png']
      },
      {
        quantity: 20271,
        platform: 'Windows',
        year: '2027',
        label: 'Windows - 2027',
        price: 147.90,
        originalPrice: 245.00,
        checkoutUrl: 'https://pay.cakto.com.br/3agirjy_453939',
        downloadSlug: 'autocad-2027-windows',
        imageUrl: '/images/products/autocad-2027-windows.png',
        gallery: ['/images/products/autocad-2027-windows.png']
      },
      {
        quantity: 20242,
        platform: 'macOS',
        year: '2024',
        label: 'macOS - 2024',
        price: 147.90,
        originalPrice: 239.90,
        checkoutUrl: 'https://pay.cakto.com.br/35oxts5',
        downloadSlug: 'autocad-2024-macos',
        imageUrl: '/images/products/autocad-2024-macos.png',
        gallery: ['/images/products/autocad-2024-macos.png']
      },
      {
        quantity: 20272,
        platform: 'macOS',
        year: '2027',
        label: 'macOS - 2027',
        price: 167.90,
        originalPrice: 269.90,
        checkoutUrl: 'https://pay.cakto.com.br/fw49xt3',
        downloadSlug: 'autocad-2027-macos',
        imageUrl: '/images/products/autocad-2027-macos.png',
        gallery: ['/images/products/autocad-2027-macos.png']
      }
    ],
    features: [
      'Versão completa e funcional sem restrições',
      'Acesso vitalício permanente (sem mensalidades)',
      'Instruções detalhadas em vídeo passo a passo',
      'Link de download enviado diretamente por e-mail',
      'Suporte técnico remoto quando necessário',
      'Pronto para uso imediato em Windows ou Mac'
    ],
    requirements: {
      os: 'WINDOWS: Windows 11 e Windows 10 (64-bits) versão 1809 ou superior | MAC: macOS Sequoia v15, Sonoma v14, Ventura v13 ou Monterey v12',
      cpu: 'WINDOWS: Básico 2.5–2.9 GHz (Recomendado: 3+ GHz base, 4+ GHz turbo) | MAC: Apple Silicon (Série M1, M2, M3, M4 nativo) ou Intel 64-bits',
      ram: 'WINDOWS: Básico 8 GB (Recomendado: 16 GB a 32 GB) | MAC: Mínimo 8 GB (Recomendado: 16 GB ou superior)',
      gpu: 'WINDOWS: Básico 2 GB GPU com DirectX 11 (Recomendado: 8 GB GPU compatível com DirectX 12) | MAC: Placa gráfica nativa compatível com Metal (Display Retina 2880 x 1800 suportado)',
      storage: 'WINDOWS: 10 GB de espaço livre em disco (SSD recomendado) | MAC: 8 GB de espaço livre em disco para download e instalação'
    }
  },
  {
    id: 'revit_2027',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim', 'revit', '2024', '2025', '2026', '2027'],
    slug: 'revit-2027',
    name: 'Autodesk Revit',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2024, 2025, 2026 e 2027 (64-bits)',
    description: 'Software profissional para projetos BIM, arquitetura, engenharia e construção. Escolha sua versão: 2024, 2025, 2026 ou 2027.',
    longDescription: 'O Autodesk Revit é o principal software focado na metodologia BIM (Building Information Modeling). Ele permite criar projetos de arquitetura, estrutura e instalações elétricas e hidráulicas de forma totalmente integrada. Com esta versão completa e funcional, você gera plantas, cortes, elevações e renderizações realistas a partir de um único modelo 3D unificado. Escolha a versão ideal para o seu fluxo de trabalho (2024, 2025, 2026 ou 2027) com ativação vitalícia e instalação assistida.',
    price: 137.90,
    originalPrice: 229.90,
    checkoutUrl: 'https://pay.cakto.com.br/5tysfn4',
    imageUrl: '/images/products/revit-cover.png',
    gallery: [
      '/images/products/revit-cover.png',
      '/images/products/revit-2027.png',
      '/images/products/revit-2026.png',
      '/images/products/revit-2025.png',
      '/images/products/revit-2024.png'
    ],
    licenseOptions: [
      {
        quantity: 2024,
        platform: 'Windows',
        year: '2024',
        label: 'Windows - 2024',
        price: 137.90,
        originalPrice: 229.90,
        checkoutUrl: 'https://pay.cakto.com.br/5tysfn4',
        downloadSlug: 'revit-2024',
        imageUrl: '/images/products/revit-2024.png',
        gallery: ['/images/products/revit-2024.png']
      },
      {
        quantity: 2025,
        platform: 'Windows',
        year: '2025',
        label: 'Windows - 2025',
        price: 147.90,
        originalPrice: 239.90,
        checkoutUrl: 'https://pay.cakto.com.br/3bmarsh',
        downloadSlug: 'revit-2025',
        imageUrl: '/images/products/revit-2025.png',
        gallery: ['/images/products/revit-2025.png']
      },
      {
        quantity: 2026,
        platform: 'Windows',
        year: '2026',
        label: 'Windows - 2026',
        price: 157.90,
        originalPrice: 249.90,
        checkoutUrl: 'https://pay.cakto.com.br/ggozfmn',
        driveUrl: 'https://drive.google.com/drive/folders/1hzQCGH3TmzdqJm7ySN_aptZNAd86ehzQ?usp=drive_link',
        downloadSlug: 'revit-2026',
        imageUrl: '/images/products/revit-2026.png',
        gallery: ['/images/products/revit-2026.png']
      },
      {
        quantity: 2027,
        platform: 'Windows',
        year: '2027',
        label: 'Windows - 2027',
        price: 167.90,
        originalPrice: 269.90,
        checkoutUrl: 'https://pay.cakto.com.br/33xszru_453977',
        downloadSlug: 'revit-2027',
        imageUrl: '/images/products/revit-2027.png',
        gallery: ['/images/products/revit-2027.png']
      }
    ],
    features: [
      'Versão completa e funcional sem restrições',
      'Metodologia BIM integrada (Arquitetura, Estrutura e MEP)',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel i-Series de múltiplos núcleos ou AMD equivalente',
      ram: '8 GB (Recomendável: 16 GB ou mais)',
      gpu: 'Placa dedicada compatível com DirectX 11 ou posterior',
      storage: '30 GB de espaço livre'
    }
  },
  {
    id: '3ds_max_2027',
    keywords: [
      '3ds max',
      '3ds',
      '3dsmax',
      'autodesk 3ds max',
      'autodesk 3ds',
      '3ds max 2027',
      'autodesk',
      '3d',
      'modelagem',
      'render',
      'renderizacao',
      'animacao',
      'vray',
      'coronarender',
      'design',
      'arquitetura',
      '2027'
    ],
    slug: 'autodesk-3ds-max-2027',
    name: 'Autodesk 3ds Max 2027',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2027 (64-bits)',
    description: 'Software profissional líder mundial para modelagem 3D, animação, efeitos visuais e renderização de maquetes eletrônicas.',
    longDescription: 'O Autodesk 3ds Max 2027 é a ferramenta padrão da indústria global para modelagem tridimensional, renderização fotorrealista e visualização arquitetônica (ArchViz). Com recursos de última geração para iluminação avançada, texturização PBR, simulações físicas e compatibilidade nativa com os motores V-Ray, Corona Renderer e Arnold, você eleva a qualidade de seus projetos e maquetes ao nível máximo.',
    price: 167.90,
    originalPrice: 289.90,
    checkoutUrl: 'https://pay.cakto.com.br/mz6wwv6',
    driveUrl: 'https://drive.google.com/drive/folders/1HcPHfbBfsBrf3pjgPAgMuTPSd1ML2QY5?usp=drive_link',
    imageUrl: '/images/products/3ds-max-2027.png',
    gallery: [
      '/images/products/3ds-max-2027.png'
    ],
    features: [
      'Versão completa e funcional sem restrições',
      'Ativação permanente (vitalícia sem mensalidades)',
      'Suporte aos principais renderizadores (V-Ray, Corona, Arnold)',
      'Acompanha vídeo tutorial passo a passo de instalação',
      'Entrega imediata no e-mail e WhatsApp após a confirmação',
      'Suporte técnico remoto incluso'
    ],
    requirements: {
      os: 'Windows 11 ou Windows 10 (64-bits) versão 1809 ou superior',
      cpu: 'Processador Intel Core i5/i7/i9 ou AMD Ryzen 5/7/9 multi-core 64-bits',
      ram: 'Mínimo 8 GB de RAM (Recomendado: 16 GB a 32 GB)',
      gpu: 'Placa gráfica dedicada de 4 GB VRAM ou superior compatível com DirectX 12',
      storage: '10 GB de espaço livre em disco para download e instalação (SSD recomendado)'
    }
  },
  {
    id: 'inventor_pro_2027',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim'],
    slug: 'inventor-professional-2027',
    name: 'Inventor Professional 2027',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2027 (64-bits)',
    description: 'Modelagem 3D, simulação mecânica e desenvolvimento de produtos profissionais.',
    longDescription: 'O Inventor Professional 2027 oferece ferramentas profissionais de engenharia para projetos mecânicos 3D, simulação de produtos, criação de ferramentas e comunicação de projetos. Esta versão completa e funcional permite otimizar o fluxo de trabalho de fabricação digital com precisão extrema.',
    price: 167.90,
    originalPrice: 279.00,
    checkoutUrl: 'https://pay.cakto.com.br/pth7gb9_453983',
    imageUrl: '/images/products/inventor-professional-2027.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '2.5 GHz ou superior (Recomendado: 3.0 GHz+)',
      ram: '8 GB (Recomendado: 16 GB ou 32 GB para grandes montagens)',
      gpu: '1 GB VRAM (Recomendado: 4 GB VRAM dedicada com suporte a DirectX 12)',
      storage: '40 GB de espaço livre'
    }
  },
  {
    id: 'civil3d_2027',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim'],
    slug: 'civil-3d-2027',
    name: 'Civil 3D 2027',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2027 (64-bits)',
    description: 'Desenho e documentação para projetos de infraestrutura civil e transportes.',
    longDescription: 'O Civil 3D 2027 é a solução padrão para engenharia civil, infraestrutura urbana e modelagem de terrenos. Esta versão completa e funcional suporta fluxos de trabalho BIM avançados para projetos de estradas, drenagens, topografia e terraplenagem com geração automatizada de perfis e relatórios técnicos.',
    price: 147.90,
    originalPrice: 258.00,
    checkoutUrl: 'https://pay.cakto.com.br/p8io5d6',
    imageUrl: '/images/products/civil-3d-2027.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '2.5 GHz ou superior (Recomendável: 3.0 GHz+)',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: '1 GB compatível com DirectX 11 (Recomendável: 4 GB compatível com DirectX 12)',
      storage: '20 GB de espaço livre'
    }
  },
  {
    id: 'navisworks_2027',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim'],
    slug: 'navisworks-manage-2027',
    name: 'Navisworks Manage 2027',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2027 (64-bits)',
    description: 'Análise, simulação e coordenação de projetos BIM para detecção de interferências.',
    longDescription: 'O Navisworks Manage 2027 é o software essencial para a revisão de projetos em 3D, permitindo que profissionais de engenharia e construção combinem modelos de diversas disciplinas para identificar erros e incompatibilidades antes da execução da obra. Esta versão completa e funcional oferece ferramentas avançadas de clash detection, simulação 4D de cronogramas e quantificação.',
    price: 187.90,
    originalPrice: 314.90,
    checkoutUrl: 'https://pay.cakto.com.br/i7yjqej',
    imageUrl: '/images/products/navisworks-manage-2027.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel ou AMD de múltiplos núcleos',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'Placa de vídeo compatível com Direct3D 9 e Shader Model 3.0',
      storage: '15 GB de espaço livre'
    }
  },
  {
    id: 'sketchup_2026_win',
    slug: 'sketchup-pro-2026-windows',
    name: 'SketchUp Pro',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows e macOS',
    version: '2021 a 2026 (64-bits)',
    description: 'Modelagem 3D intuitiva para arquitetura, interiores, marcenaria e documentação 2D com LayOut no Windows e macOS.',
    longDescription: 'O SketchUp Pro é a ferramenta definitiva e mais intuitiva do mundo para modelagem 3D arquitetônica, design de interiores, marcenaria, paisagismo e maquetes eletrônicas. Esta versão completa e vitalícia inclui o modelador 3D SketchUp Pro Desktop, o LayOut (para pranchas técnicas, cotas e detalhamento executivo 2D) e o Style Builder, com total compatibilidade com os principais renderizadores do mercado (V-Ray, Enscape, Lumion e D5 Render) tanto em computadores Windows quanto em Mac (Intel e Apple Silicon M1/M2/M3/M4).',
    price: 87.90,
    originalPrice: 152.90,
    checkoutUrl: 'https://pay.cakto.com.br/887oxn6',
    imageUrl: '/images/products/sketchup-pro-cover.png',
    ean13: '8388917941206',
    mpn: 'SKP-PRO-WW2026-C2',
    licenseOptions: [
      {
        quantity: 20211,
        label: 'Windows - 2021',
        platform: 'Windows',
        year: '2021',
        price: 87.90,
        originalPrice: 152.90,
        checkoutUrl: 'https://pay.cakto.com.br/887oxn6',
        downloadSlug: 'sketchup-pro-2021-windows',
        imageUrl: '/images/products/sketchup-pro-2021-windows.png'
      },
      {
        quantity: 20241,
        label: 'Windows - 2024',
        platform: 'Windows',
        year: '2024',
        price: 137.90,
        originalPrice: 224.00,
        checkoutUrl: 'https://pay.cakto.com.br/343guqe',
        downloadSlug: 'sketchup-pro-2024-windows',
        imageUrl: '/images/products/sketchup-pro-2024-windows.png'
      },
      {
        quantity: 20251,
        label: 'Windows - 2025',
        platform: 'Windows',
        year: '2025',
        price: 147.90,
        originalPrice: 239.90,
        checkoutUrl: 'https://pay.cakto.com.br/y9tcw6z',
        downloadSlug: 'sketchup-pro-2025-windows',
        imageUrl: '/images/products/sketchup-pro-2025-windows.png'
      },
      {
        quantity: 20261,
        label: 'Windows - 2026',
        platform: 'Windows',
        year: '2026',
        price: 157.90,
        originalPrice: 258.90,
        checkoutUrl: 'https://pay.cakto.com.br/37xdw4p_847334',
        downloadSlug: 'sketchup-pro-2026-windows',
        imageUrl: '/images/products/sketchup-pro-2026-windows.png'
      },
      {
        quantity: 20242,
        label: 'macOS - 2024',
        platform: 'macOS',
        year: '2024',
        price: 157.90,
        originalPrice: 254.00,
        checkoutUrl: 'https://pay.cakto.com.br/m3bn96a',
        downloadSlug: 'sketchup-pro-2024-macos',
        imageUrl: '/images/products/sketchup-pro-2024-macos.png'
      },
      {
        quantity: 20262,
        label: 'macOS - 2026',
        platform: 'macOS',
        year: '2026',
        price: 177.90,
        originalPrice: 284.90,
        checkoutUrl: 'https://pay.cakto.com.br/xogsm9p',
        downloadSlug: 'sketchup-pro-2026-macos',
        imageUrl: '/images/products/sketchup-pro-2026-macos.png'
      }
    ],
    features: [
      'Versão completa e vitalícia (Sem mensalidades ou anuidades)',
      'Inclui SketchUp Pro 3D, LayOut 2D e Style Builder completos',
      'Edições 2021, 2024, 2025 e 2026 para Windows e macOS (Intel e Apple M1/M2/M3/M4)',
      'Totalmente compatível com V-Ray, Enscape, Lumion e plugins Ruby',
      'Acompanha instruções passo a passo em vídeo para instalação rápida',
      'Link de download enviado imediatamente no seu e-mail após a compra',
      'Suporte técnico remoto via WhatsApp incluso (30 dias de garantia de suporte)'
    ],
    requirements: {
      os: 'WINDOWS: Windows 11 ou Windows 10 (64-bits) / MAC: macOS Sequoia 15, Sonoma 14, Ventura 13 ou Monterey 12',
      cpu: 'WINDOWS: Processador Intel/AMD de 2.1+ GHz (Recomendado: 3.0+ GHz) / MAC: Apple Silicon (M1, M2, M3, M4) ou Intel Core i5/i7 multi-core',
      ram: 'WINDOWS: Mínimo 8 GB (Recomendado: 16 GB ou superior) / MAC: Mínimo 8 GB (Recomendado: 16 GB de memória unificada)',
      gpu: 'WINDOWS: Placa de vídeo 3D com mínimo 1 GB de VRAM e suporte a OpenGL 3.1 / DirectX 12 (Recomendado: 4 GB+ VRAM dedicada) / MAC: GPU integrada ou dedicada com suporte nativo a Apple Metal',
      storage: 'WINDOWS: 4 GB de espaço livre em disco (SSD recomendado) / MAC: 4 GB de espaço livre em disco'
    }
  },
  {
    id: 'eberick_builder_2025',
    slug: 'eberick-builder-2025',
    name: 'AltoQi Eberick + Builder',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2024.12 Plena, 2025.04 e 2026.05 Infinity',
    description: 'Solução nacional integrada para cálculo estrutural e projetos de instalações BIM. Disponível nas versões Plena 2024.12, Infinity 2025.04 e a nova Infinity 2026.05.',
    longDescription: 'O AltoQi Eberick + Builder é o combo definitivo de ferramentas para engenharia civil no Brasil. O Eberick realiza análise estrutural e detalhamento (Concreto Armado, Alvenaria Estrutural, Pré-moldados, Perfis metálicos e Concreto protendido). O Builder cuida das instalações prediais (Elétrico, Hidráulico, Sanitário, SPDA, Incêndio, Gás e Climatização). Escolha entre a versão Plena 2024.12, Infinity 2025.04 ou a nova Infinity 2026.05 com Construtor de Armadura incluso.',
    price: 227.90,
    originalPrice: 449.00,
    checkoutUrl: 'https://pay.cakto.com.br/33tbjgj',
    imageUrl: '/images/products/eberick-builder-2026-infinity.png',
    gallery: [
      '/images/products/eberick-builder-2026-infinity.png',
      '/images/products/eberick-builder-2025-infinity.png',
      '/images/products/eberick-builder-2024-plena.png'
    ],
    licenseOptions: [
      {
        quantity: 2024,
        label: 'Versão Plena 2024.12',
        price: 227.90,
        originalPrice: 449.00,
        checkoutUrl: 'https://pay.cakto.com.br/33tbjgj',
        driveUrl: 'https://drive.google.com/drive/folders/1AOD3jP7Qkyk5eqx65uBEQMyCYdI1dfNn?usp=drive_link',
        downloadSlug: 'eberick-builder-2024-plena',
        imageUrl: '/images/products/eberick-builder-2024-plena.png'
      },
      {
        quantity: 2025,
        label: 'Versão Infinity 2025.04',
        price: 367.90,
        originalPrice: 549.00,
        checkoutUrl: 'https://pay.cakto.com.br/7jw8eyi_847943',
        downloadSlug: 'eberick-builder-2025',
        imageUrl: '/images/products/eberick-builder-2025-infinity.png'
      },
      {
        quantity: 2026,
        label: 'Versão Infinity 2026.05',
        price: 627.90,
        originalPrice: 949.00,
        checkoutUrl: 'https://pay.cakto.com.br/8x4fckr',
        driveUrl: 'https://drive.google.com/drive/folders/1Agg7qd7JFCAKsfFdgsoEUnGDMgDnZ_B0?usp=drive_link',
        downloadSlug: 'eberick-builder-2026-infinity',
        imageUrl: '/images/products/eberick-builder-2026-infinity.png'
      }
    ],
    features: [
      'Eberick: Concreto, Alvenaria, Pré-moldados, Metálicos e Protendido',
      'Builder: Elétrico, Hidráulico, Sanitário, SPDA, Incêndio, Gás e Clima',
      'Opção Plena 2024.12 ou Infinity 2025.04 com Construtor de armadura',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 / AMD Ryzen 5 ou superior (Recomendado i7/Ryzen 7)',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'Placa dedicada com suporte a OpenGL 3.3',
      storage: '10 GB de espaço disponível em SSD'
    }
  },
  {
    id: 'altoqi_visus_2026',
    keywords: ['visus', 'altoqi', 'visus 2026', 'visus 2026-06', '2026-06', '2026.06', 'altoqi visus 2026-06', 'eberick', 'builder', 'orcamento', 'planejamento', 'bim', '4d', '5d', 'engenharia', '2026'],
    slug: 'altoqi-visus-2026',
    name: 'AltoQi Visus 2026-06',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2026-06 (64-bits)',
    description: 'Plataforma BIM completa da AltoQi (Versão 2026-06) para planejamento, quantitativos e orçamentação integrada com Eberick e modelos IFC.',
    longDescription: 'O AltoQi Visus 2026 (Versão 2026-06) é a solução avançada da AltoQi para gestão, planejamento e orçamentação BIM (4D e 5D). Conectado nativamente aos projetos do Eberick e Builder ou arquivos IFC de qualquer plataforma BIM, o Visus automatiza a extração precisa de quantitativos, custos de obra, cronogramas físico-financeiros e simulação de avanço construtivo com precisão profissional.',
    price: 267.90,
    originalPrice: 429.90,
    checkoutUrl: 'https://pay.cakto.com.br/3f5thmj',
    driveUrl: 'https://drive.google.com/drive/folders/1iB-8pJlcggopLS6QUQvee9Ef_SKgrvM2?usp=drive_link',
    imageUrl: '/images/products/altoqi-visus-2026.png',
    gallery: [
      '/images/products/altoqi-visus-2026.png'
    ],
    features: [
      'Versão completa e funcional da edição 2026-06',
      'Integração direta com AltoQi Eberick, Builder e modelos IFC',
      'Planejamento 4D e orçamentação 5D automatizada',
      'Acompanha vídeo tutorial passo a passo de instalação',
      'Ativação permanente para uso ilimitado sem mensalidades',
      'Entrega digital imediata via e-mail e WhatsApp',
      'Suporte técnico remoto incluso'
    ],
    requirements: {
      os: 'Windows 11 ou Windows 10 (64-bits)',
      cpu: 'Intel Core i5 / AMD Ryzen 5 ou superior (Recomendado i7/Ryzen 7)',
      ram: '8 GB de memória RAM (Recomendado: 16 GB)',
      gpu: 'Placa gráfica dedicada compatível com OpenGL 3.3 e DirectX 11/12',
      storage: '8 GB de espaço livre em disco (SSD recomendado)'
    }
  },

  {
    id: 'archicad_30',
    keywords: ['archicad', '28', '29', '30', 'bra', 'arquitetura', 'bim', 'graphisoft', 'cad'],
    slug: 'archicad-30-bra',
    name: 'Graphisoft ArchiCAD BRA',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '28, 29 e 30 (Português Brasil)',
    description: 'Software de autoria BIM líder mundial para arquitetura, documentação 2D/3D e modelagem construtiva.',
    longDescription: 'O Graphisoft ArchiCAD BRA é a referência máxima em modelagem arquitetônica e engenharia BIM. Desenvolvido por e para arquitetos, entrega modelagem precisa de volumes, automação de pranchas e cortes a partir do modelo 3D tridimensional, além de coordenação Open BIM completa. Disponível nas edições completas e vitalícias 28, 29 e 30 em Português do Brasil.',
    price: 127.90,
    originalPrice: 209.00,
    checkoutUrl: 'https://pay.cakto.com.br/e6wi689',
    imageUrl: '/images/products/archicad-30-bra.png',
    ean13: '8388917951203',
    mpn: 'ACAD-BRA-WW2026-C2',
    licenseOptions: [
      {
        quantity: 281,
        label: 'Windows - 28 BRA',
        platform: 'Windows',
        year: '28',
        price: 127.90,
        originalPrice: 209.00,
        checkoutUrl: 'https://pay.cakto.com.br/e6wi689',
        downloadSlug: 'archicad-28-bra',
        imageUrl: '/images/products/archicad-28-bra.png'
      },
      {
        quantity: 291,
        label: 'Windows - 29 BRA',
        platform: 'Windows',
        year: '29',
        price: 137.90,
        originalPrice: 219.00,
        checkoutUrl: 'https://pay.cakto.com.br/3fgpwfj_848451',
        downloadSlug: 'archicad-29-bra',
        imageUrl: '/images/products/archicad-29-bra.png'
      },
      {
        quantity: 301,
        label: 'Windows - 30 BRA',
        platform: 'Windows',
        year: '30',
        price: 157.90,
        originalPrice: 254.90,
        checkoutUrl: 'https://pay.cakto.com.br/khwk5iz',
        downloadSlug: 'archicad-30-bra',
        imageUrl: '/images/products/archicad-30-bra.png'
      }
    ],
    features: [
      'Versões completas e funcionais em Português Brasil (BRA)',
      'Edições 28, 29 e 30 para Windows 10 e 11 (64-bits)',
      'Acesso vitalício sem mensalidades ou anuidades',
      'Instalação assistida e tutorial passo a passo em vídeo inclusos',
      'Entrega imediata por e-mail após a confirmação do pagamento',
      'Suporte técnico dedicado via WhatsApp com garantia de 30 dias'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 ou AMD Ryzen equivalente (Recomendado i7/Ryzen 7)',
      ram: '8 GB (Recomendável: 16 GB ou mais)',
      gpu: 'Placa com 2 GB VRAM dedicada com suporte a OpenGL 4.5 (Recomendado 4 GB+)',
      storage: '5 GB de espaço livre para instalação (SSD recomendado)'
    }
  },
  {
    id: 'cype_2026',
    keywords: ['cype', 'cypecad', 'cype 2027', 'cype3d', 'cypetherm', 'arquimedes', 'engenharia', 'arquitetura', 'estrutural', 'bim'],
    slug: 'cypecad-2026',
    name: 'CYPE (Completo)',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2025.d, 2026.a e 2027.a (64-bits)',
    description: 'Suíte completa com CYPECAD, CYPE 3D, CYPETHERM, Arquimedes e mais para cálculo estrutural e instalações.',
    longDescription: 'O pacote CYPE Completo reúne em uma única instalação todos os módulos consagrados da CYPE Ingenieros, incluindo CYPECAD, CYPE 3D, CYPETHERM, Arquimedes, Gerador de Preços e projetos de instalações prediais compatíveis com as normas brasileiras (ABNT NBR). Disponível nas versões 2025.d (todos os idiomas), 2026.a (Português Brasil) e a nova versão 2027.a.',
    price: 247.90,
    originalPrice: 378.90,
    checkoutUrl: 'https://pay.cakto.com.br/xzemgyx',
    imageUrl: '/images/products/cype-2027.png',
    ean13: '8388917943811',
    mpn: 'CYP-FULL-BR2026-C2',
    gallery: [
      '/images/products/cype-2027.png',
      '/images/products/cypecad-2026.png',
      '/images/products/cypecad-2025.png'
    ],
    licenseOptions: [
      {
        quantity: 20251,
        label: 'Windows - 2025.d (Todos os Idiomas)',
        platform: 'Windows',
        year: '2025.d',
        price: 247.90,
        originalPrice: 378.90,
        checkoutUrl: 'https://pay.cakto.com.br/xzemgyx',
        downloadSlug: 'cypecad-2025',
        imageUrl: '/images/products/cypecad-2025.png',
        gallery: ['/images/products/cypecad-2025.png']
      },
      {
        quantity: 20261,
        label: 'Windows - 2026.a (Português Brasil)',
        platform: 'Windows',
        year: '2026.a',
        price: 307.90,
        originalPrice: 469.00,
        checkoutUrl: 'https://pay.cakto.com.br/nyooujd_454658',
        downloadSlug: 'cypecad-2026',
        imageUrl: '/images/products/cypecad-2026.png',
        gallery: ['/images/products/cypecad-2026.png']
      },
      {
        quantity: 20271,
        label: 'Windows - 2027.a',
        platform: 'Windows',
        year: '2027.a',
        price: 527.90,
        originalPrice: 799.00,
        checkoutUrl: 'https://pay.cakto.com.br/qksobr6',
        driveUrl: 'https://drive.google.com/drive/folders/1wp0tXGCwPnHHyX2n9oGhvsenjqJwwfgN?usp=drive_link',
        downloadSlug: 'cypecad-2027',
        imageUrl: '/images/products/cype-2027.png',
        gallery: ['/images/products/cype-2027.png']
      }
    ],
    features: [
      'Inclui CYPECAD, CYPE 3D, CYPETHERM, Arquimedes, Gerador de Preços entre outros',
      'Todos os módulos ativos (concreto armado, protendido, estruturas metálicas, fundações e instalações)',
      'Versão 2026.a exclusivamente em Português Brasil (PT-BR) | Versão 2025.d em todos os idiomas',
      'Ativação vitalícia para uso ilimitado sem mensalidades',
      'Acompanha instruções em vídeo passo a passo para instalação',
      'Entrega automática no e-mail logo após a confirmação do pagamento',
      'Suporte técnico remoto incluso (30 dias de garantia de suporte)'
    ],
    requirements: {
      os: 'Windows 11 ou Windows 10 (64-bits)',
      cpu: 'Processador Intel Core i5 / i7 ou AMD Ryzen 5 / 7 multi-core (2.5+ GHz)',
      ram: 'Mínimo 8 GB de RAM (Recomendado: 16 GB ou mais para edifícios de múltiplos pavimentos)',
      gpu: 'Placa gráfica dedicada ou integrada compatível com OpenGL 3.3 e DirectX 11/12',
      storage: '15 GB de espaço livre em disco (SSD NVMe recomendado)'
    }
  },
  {
    id: 'solidworks_2026',
    keywords: ['solidworks', '2025', '2026', 'cad', 'engenharia', 'mecanica', '3d', 'simulacao'],
    slug: 'solidworks-2026',
    name: 'SolidWorks Premium',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2025 e 2026 Premium (64-bits)',
    description: 'Modelagem mecânica 3D, conjuntos complexos e simulações físicas avançadas. Versões 2025 e 2026 Premium.',
    longDescription: 'O SolidWorks Premium é o padrão global da indústria mecânica para modelagem tridimensional de peças, conjuntos de grande porte, testes de resistência (FEA) e detalhamento de chapas metálicas. Essencial para projetistas industriais e engenheiros que exigem precisão paramétrica absoluta. Disponível nas edições completas 2025 e 2026 Premium.',
    price: 167.90,
    originalPrice: 298.00,
    checkoutUrl: 'https://pay.cakto.com.br/7hh4cvt_847441',
    imageUrl: '/images/products/solidworks-2026.jpg',
    licenseOptions: [
      {
        quantity: 2025,
        label: 'SolidWorks 2025 Premium',
        platform: 'Windows',
        year: '2025',
        price: 167.90,
        originalPrice: 268.00,
        checkoutUrl: 'https://pay.cakto.com.br/37dp6zs',
        downloadSlug: 'solidworks-2025',
        imageUrl: '/images/products/solidworks-2025.png'
      },
      {
        quantity: 2026,
        label: 'SolidWorks 2026 Premium',
        platform: 'Windows',
        year: '2026',
        price: 187.90,
        originalPrice: 298.00,
        checkoutUrl: 'https://pay.cakto.com.br/7hh4cvt_847441',
        downloadSlug: 'solidworks-2026',
        imageUrl: '/images/products/solidworks-2026.jpg'
      }
    ],
    features: [
      'Versão completa e funcional',
      'Edições 2025 e 2026 Premium inclusas',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '3.3 GHz ou superior (Intel i7/i9 ou Ryzen equivalente)',
      ram: '16 GB (Recomendado: 32 GB)',
      gpu: 'Placa certificada com no mínimo 4 GB VRAM (GeForce / RTX ou Quadro)',
      storage: '25 GB de espaço livre em SSD'
    }
  },
  {
    id: 'sisdea_2025',
    slug: 'sisdea-2025',
    name: 'SisDEA 2025',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2025 (64-bits)',
    description: 'Software de engenharia de avaliações de imóveis por regressão linear e redes neurais.',
    longDescription: 'O SisDEA 2025 é o software líder para engenheiros de avaliações e peritos judiciais realizarem avaliações mercadológicas de imóveis urbanos e rurais de acordo com as normas da ABNT NBR 14653. Esta versão completa e funcional realiza tratamentos estatísticos avançados, regressões lineares múltiplas e análises por redes neurais artificiais.',
    price: 197.90,
    originalPrice: 329.90,
    checkoutUrl: 'https://pay.cakto.com.br/3cg7y55',
    imageUrl: '/images/products/sisdea-2025.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i3 / AMD Ryzen 3 ou superior',
      ram: '4 GB RAM (Recomendável: 8 GB)',
      gpu: 'Sem requisitos dedicados específicos',
      storage: '1 GB de espaço livre'
    }
  },
  {
    id: 'rhinoceros_8',
    slug: 'rhinoceros-8',
    name: 'Rhinoceros 8 (Rhino 3D)',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows e macOS',
    version: '8 Commercial (Windows e macOS)',
    description: 'Modelador 3D matemático avançado baseado em curvas NURBS para superfícies complexas.',
    longDescription: 'O Rhinoceros 8 (Rhino 3D) é amplamente utilizado por designers de produtos, engenheiros navais, joalheiros e arquitetos devido ao seu incrível motor matemático baseado em curvas NURBS. Permite criar formas curvas orgânicas com máxima precisão geométrica, além de incluir o Grasshopper integrado para modelagem paramétrica algorítmica.',
    price: 167.90,
    originalPrice: 268.00,
    checkoutUrl: 'https://pay.cakto.com.br/owkfuvv_850623',
    imageUrl: '/images/products/rhinoceros-8.png',
    licenseOptions: [
      {
        quantity: 1,
        label: 'Windows',
        platform: 'Windows',
        year: 'Windows',
        price: 167.90,
        originalPrice: 268.00,
        checkoutUrl: 'https://pay.cakto.com.br/owkfuvv_850623',
        downloadSlug: 'rhinoceros-8',
        imageUrl: '/images/products/rhinoceros-8.png'
      },
      {
        quantity: 2,
        label: 'macOS',
        platform: 'macOS',
        year: 'macOS',
        price: 197.90,
        originalPrice: 319.00,
        checkoutUrl: 'https://pay.cakto.com.br/ew26je8',
        downloadSlug: 'rhinoceros-8-mac',
        imageUrl: '/images/products/rhinoceros-8-mac.png'
      }
    ],
    features: [
      'Versão completa e funcional com Grasshopper incluso',
      'Opções nativas para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS 12.4 (Monterey) ou mais recente',
      cpu: 'WINDOWS: Intel ou AMD de múltiplos núcleos / MAC: Apple Silicon ou Intel',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'WINDOWS: OpenGL 4.1 / MAC: Apple Silicon ou AMD',
      storage: '5 GB de espaço livre'
    }
  },
  {
    id: 'zwcad_2026',
    slug: 'zwcad-professional-2026',
    name: 'ZWCAD 2026 Professional',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2026 (64-bits)',
    description: 'Alternativa CAD rápida e leve, 100% compatível com arquivos DWG e interface clássica.',
    longDescription: 'O ZWCAD Professional 2026 é uma excelente alternativa ao AutoCAD, mantendo a compatibilidade de comandos (LISP) e arquivos DWG nativos. Por ser extremamente leve, roda com excelente desempenho mesmo em computadores ou notebooks antigos, sendo a escolha ideal para o dia a dia de escritórios técnicos.',
    price: 137.90,
    originalPrice: 214.90,
    checkoutUrl: 'https://pay.cakto.com.br/ecx56mf',
    imageUrl: '/images/products/zwcad-2026.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core 2 Duo ou AMD equivalente',
      ram: '4 GB (Recomendável: 8 GB)',
      gpu: '1 GB VRAM ou superior',
      storage: '4 GB de espaço livre'
    }
  },
  {
    id: 'tekla_2026',
    keywords: ['autodesk', 'engenharia', 'arquitetura', 'cad', 'bim'],
    slug: 'tekla-structures-2026',
    name: 'Tekla Structures 2026',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows',
    version: '2026 SP2 (64-bits)',
    description: 'Detalhamento de estruturas metálicas e concreto para grandes projetos de engenharia.',
    longDescription: 'O Tekla Structures 2026 é o software BIM líder mundial para detalhamento estrutural de aço e estruturas pré-moldadas de concreto. Ele permite criar modelos construtivos 3D ricos em informações físicas, gerando desenhos de fabricação, listas de materiais automáticas e conexões CNC diretamente do modelo tridimensional de forma estável.',
    price: 237.90,
    originalPrice: 379.00,
    checkoutUrl: 'https://pay.cakto.com.br/p5j6qsj',
    imageUrl: '/images/products/tekla-structures-2025.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 / AMD Ryzen 5 ou superior (Recomendado i7/Ryzen 7)',
      ram: '16 GB RAM (Recomendável: 32 GB)',
      gpu: 'Placa de vídeo dedicada de 4 GB VRAM dedicada (NVIDIA GeForce/RTX ou Quadro)',
      storage: '10 GB de espaço livre (SSD)'
    }
  },
  {
    id: 'office_25_win',
    keywords: ['microsoft', 'office', 'windows', 'design', 'video', 'word', 'excel', 'powerpoint', 'mac'],
    slug: 'office-2024-professional-plus',
    name: 'Microsoft Office 2024 Professional',
    category: 'Escritório e Produtividade',
    compatibility: 'Windows e macOS',
    version: '2024 Professional (Windows e macOS)',
    description: 'Pacote de produtividade com Word, Excel, PowerPoint, Access e Outlook para Windows e Mac.',
    longDescription: 'O Office 2024 Professional é o conjunto clássico de aplicativos de escritório locais da Microsoft. Contém as aplicações em suas versões completas instaladas diretamente na máquina, com compatibilidade nativa tanto para Windows quanto para macOS (processadores Apple Silicon M1/M2/M3/M4 e Intel), eliminando a dependência de assinaturas de nuvem.',
    price: 127.90,
    originalPrice: 199.90,
    checkoutUrl: 'https://pay.cakto.com.br/g2h5czk_443849',
    imageUrl: '/images/products/office-2024-professional-plus.jpg',
    notes: 'Nota: A licença é local e não inclui espaço de armazenamento em nuvem no OneDrive.',
    licenseOptions: [
      {
        quantity: 1,
        label: 'Windows',
        platform: 'Windows',
        year: 'Windows',
        price: 127.90,
        originalPrice: 199.90,
        checkoutUrl: 'https://pay.cakto.com.br/g2h5czk_443849',
        downloadSlug: 'office-2024-professional-plus',
        imageUrl: '/images/products/office-2024-professional-plus.jpg'
      },
      {
        quantity: 2,
        label: 'macOS',
        platform: 'macOS',
        year: 'macOS',
        price: 187.90,
        originalPrice: 289.90,
        checkoutUrl: 'https://pay.cakto.com.br/363brvw',
        downloadSlug: 'office-2024-professional-mac',
        imageUrl: '/images/products/office-2024-professional-mac.png'
      }
    ],
    features: [
      'Versão completa e funcional (Word, Excel, PowerPoint, Outlook)',
      'Edições dedicadas para Windows e macOS (Apple Silicon nativo)',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'WINDOWS: Intel ou AMD de 1.6 GHz / MAC: Apple Silicon (M1/M2/M3/M4) ou Intel Core',
      ram: 'WINDOWS: 4 GB RAM / MAC: 4 GB RAM (Recomendado: 8 GB)',
      gpu: 'Placa de vídeo compatível com DirectX 9 ou superior',
      storage: '4 GB a 10 GB de espaço livre em disco'
    }
  },
  {
    id: 'vray_7',
    keywords: ['adobe', 'corel', 'design', 'render', '3d', 'vray', 'sketchup', 'revit', 'rhino'],
    slug: 'vray-7-windows',
    name: 'Chaos V-Ray 7',
    category: 'Design e Criatividade',
    compatibility: 'Windows',
    version: 'v7.0 Professional (SketchUp, Revit, Rhino)',
    description: 'Motor de renderização fotorrealista de alta fidelidade para SketchUp, Revit e Rhinoceros.',
    longDescription: 'O Chaos V-Ray 7 é a ferramenta de renderização fotorrealista mais renomada na arquitetura e efeitos visuais. Disponível com opções para SketchUp, Revit e Rhinoceros, esta versão completa e funcional permite criar imagens e animações em nível cinematográfico utilizando aceleração por GPU de forma nativa e local.',
    price: 87.90,
    originalPrice: 149.90,
    checkoutUrl: 'https://pay.cakto.com.br/t5qr5by_847341',
    imageUrl: '/images/products/vray-7-windows.png',
    licenseOptions: [
      {
        quantity: 1,
        label: 'V-Ray 7 para SketchUp',
        platform: 'Windows',
        year: 'SketchUp',
        price: 87.90,
        originalPrice: 149.90,
        checkoutUrl: 'https://pay.cakto.com.br/t5qr5by_847341',
        imageUrl: '/images/products/vray-7-windows.png'
      },
      {
        quantity: 2,
        label: 'V-Ray 7 para Revit',
        platform: 'Windows',
        year: 'Revit',
        price: 87.90,
        originalPrice: 149.90,
        checkoutUrl: 'https://pay.cakto.com.br/t5qr5by_847341',
        imageUrl: '/images/products/vray-7-windows.png'
      },
      {
        quantity: 3,
        label: 'V-Ray 7 para Rhinoceros',
        platform: 'Windows',
        year: 'Rhinoceros',
        price: 87.90,
        originalPrice: 149.90,
        checkoutUrl: 'https://pay.cakto.com.br/t5qr5by_847341',
        imageUrl: '/images/products/vray-7-windows.png'
      }
    ],
    features: [
      'Versão completa e funcional',
      'Opções dedicadas para SketchUp, Revit ou Rhinoceros',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel ou AMD de 64 bits com suporte a SSE4.2',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'Placa dedicada compatível com CUDA e DirectX 12 (NVIDIA GeForce/RTX recomendada)',
      storage: '2 GB de espaço livre'
    }
  },
  {
    id: 'enscape',
    keywords: ['adobe', 'corel', 'design', 'render', '3d'],
    slug: 'chaos-enscape-windows',
    name: 'Chaos Enscape (Windows)',
    category: 'Design e Criatividade',
    compatibility: 'Windows',
    version: '4.x Professional',
    description: 'Renderizador em tempo real e realidade virtual integrado para SketchUp, Revit e Rhino.',
    longDescription: 'O Chaos Enscape é o renderizador em tempo real favorito de arquitetos que necessitam visualizar seus projetos de modelagem 3D instantaneamente enquanto desenham. Ele se integra como uma aba dentro de softwares como SketchUp e Revit, gerando renders de interiores e exteriores em segundos com iluminação global realista.',
    price: 97.90,
    originalPrice: 164.90,
    checkoutUrl: 'https://pay.cakto.com.br/u9uowmi_847345',
    imageUrl: '/images/products/chaos-enscape-windows.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel ou AMD de múltiplos núcleos',
      ram: '8 GB (Recomendado 16 GB)',
      gpu: 'Mínimo de 2 GB VRAM dedicada com suporte a Ray Tracing (NVIDIA GTX/RTX ou AMD Radeon)',
      storage: '2 GB de espaço livre'
    }
  },
  {
    id: 'promob_professional_2025',
    keywords: ['promob', 'marcenaria', 'moveis', 'planejados', 'cut pro', 'real scene', 'interiores', '2024', '2025'],
    slug: 'promob-plus-professional-2025',
    name: 'Promob Plus',
    category: 'Marcenaria e Móveis Planejados',
    compatibility: 'Windows',
    version: '2024 Enterprise & 2025 Professional',
    description: 'Modulação avançada de móveis planejados, planos de corte com Cut Pro e renderização Real Scene.',
    longDescription: 'O Promob Plus é a solução profissional definitiva para marcenarias, projetistas de móveis planejados e designers de interiores. Disponível nas edições 2024 Enterprise (com Cut Pro e Real Scene 1.0) e 2025 Professional (com Cut Pro, Revest, Real Scene 2.0 e biblioteca atualizada), oferece modulação 3D completa, detalhamento técnico e geração de planos de corte com ativação vitalícia.',
    price: 137.90,
    originalPrice: 234.90,
    checkoutUrl: 'https://pay.cakto.com.br/fvvtpwg',
    imageUrl: '/images/products/promob-plus-professional-2025.png',
    ean13: '8388917966100',
    mpn: 'PRMB-PLUS-WW2025-C2',
    licenseOptions: [
      {
        quantity: 20241,
        label: 'Windows - 2024 Enterprise',
        platform: 'Windows',
        year: '2024 Enterprise',
        price: 137.90,
        originalPrice: 234.90,
        checkoutUrl: 'https://pay.cakto.com.br/fvvtpwg',
        downloadSlug: 'promob-plus-enterprise-2024',
        imageUrl: '/images/products/promob-enterprise-2024.png'
      },
      {
        quantity: 20251,
        label: 'Windows - 2025 Professional',
        platform: 'Windows',
        year: '2025 Professional',
        price: 307.90,
        originalPrice: 458.00,
        checkoutUrl: 'https://pay.cakto.com.br/i5whsbp_853381',
        downloadSlug: 'promob-plus-professional-2025',
        imageUrl: '/images/products/promob-plus-professional-2025.png'
      }
    ],
    notes: 'Nota: A ativação é válida para uso vitalício local.',
    features: [
      'Disponível nas versões 2024 Enterprise (Real Scene 1.0) e 2025 Professional (Real Scene 2.0 + Revest)',
      'Ferramenta Cut Pro inclusa para planos de corte de chapas',
      'Biblioteca de modulação 3D completa para marcenaria e interiores',
      'Acesso vitalício sem mensalidades',
      'Vídeo passo a passo de instalação incluso',
      'Entrega automática no e-mail após o pagamento',
      'Suporte técnico garantido por 30 dias'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 / AMD Ryzen 5 ou superior',
      ram: '8 GB (Recomendado: 16 GB)',
      gpu: 'Placa dedicada com suporte a OpenGL (NVIDIA GeForce de 2 GB VRAM ou superior)',
      storage: '5 GB de espaço livre'
    }
  },
  {
    id: 'vectric_aspire_12_5',
    keywords: [
      'vectric',
      'aspire',
      'vectric aspire',
      'aspire 12.5',
      'aspire 12',
      'aspire pro',
      'cnc',
      'router',
      'router cnc',
      'marcenaria',
      'entalhe',
      'corte 2d',
      'usinagem 3d',
      'g-code',
      'moveis',
      'relevo',
      'vector art'
    ],
    slug: 'vectric-aspire-pro-12-5',
    name: 'Vectric Aspire Pro 12.5',
    category: 'Marcenaria e Móveis Planejados',
    compatibility: 'Windows',
    version: '12.5 Pro (64-bits)',
    description: 'Solução líder mundial para design 2D/3D, usinagem, entalhes ornamentais e geração de percursos para máquinas Router CNC.',
    longDescription: 'O Vectric Aspire Pro 12.5 é o software definitivo para marceneiros, projetistas de móveis e operadores de Router CNC que buscam precisão e agilidade. Com ferramentas completas de desenho vetorial 2D, modelagem e entalhe tridimensional (relevos 3D), simulação de percurso de ferramenta hiper-realista e nesting automático de chapas (MDF, madeira maciça e acrílico), o software gera com facilidade os arquivos G-code prontos para executar em qualquer controladora CNC do mercado.',
    price: 187.90,
    originalPrice: 319.90,
    checkoutUrl: 'https://pay.cakto.com.br/qtaehri',
    driveUrl: 'https://drive.google.com/drive/folders/15Bs5e9ozDlJxJ3ynBCKtgeUxVspn2aLK?usp=drive_link',
    imageUrl: '/images/products/vectric-aspire-12-5-pro.png',
    gallery: [
      '/images/products/vectric-aspire-12-5-pro.png'
    ],
    ean13: '8388917978202',
    mpn: 'VASP-PRO-WW125-C2',
    features: [
      'Versão 12.5 Pro completa e vitalícia para Windows',
      'Modelagem 3D avançada para entalhes, relevos e molduras',
      'Criação e edição vetorial 2D com conversão de imagens para vetores',
      'Simulação precisa de percursos de usinagem (corte, furação, v-carve e acabamento 3D)',
      'Otimização inteligente de chapas (Nesting) para economia de materiais',
      'Compatível com Mach3, GRBL, RichAuto, Syntec e centenas de pós-processadores',
      'Acompanha vídeo tutorial passo a passo de instalação',
      'Entrega 100% automática no e-mail e WhatsApp logo após a confirmação',
      'Garantia de 30 dias e suporte técnico com acesso remoto incluso'
    ],
    requirements: {
      os: 'Windows 11 ou Windows 10 (64-bits)',
      cpu: 'Processador Intel Core i5 / AMD Ryzen 5 de 2 GHz ou superior',
      ram: '8 GB de memória RAM (Recomendado: 16 GB)',
      gpu: 'Placa gráfica compatível com OpenGL 3.3 ou superior (dedicada recomendada)',
      storage: '5 GB de espaço livre em disco para instalação'
    }
  },
  {
    id: 'coreldraw_2026',
    keywords: ['corel', 'coreldraw', 'vetor', 'design', 'grafico', 'sublimacao', 'grafica', 'x7', 'macos', 'windows'],
    slug: 'coreldraw-graphics-suite-2026',
    name: 'CorelDRAW Graphics Suite',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: 'X7 a 2026 (64-bits)',
    description: 'Suíte profissional completa para design gráfico, ilustração vetorial, gráficas, sublimação e diagramação no Windows e macOS.',
    longDescription: 'O CorelDRAW Graphics Suite é o software definitivo e mais consagrado do mercado para criação de artes vetoriais, identidades visuais, comunicação visual, serigrafia, sublimação, corte a laser/plotter e edição de imagens com o Corel PHOTO-PAINT. Esta versão completa e vitalícia inclui o CorelDRAW, Corel PHOTO-PAINT, Corel Font Manager e PowerTRACE, funcionando localmente com altíssimo desempenho tanto em computadores Windows quanto em Mac (Intel e Apple Silicon M1/M2/M3/M4).',
    price: 47.90,
    originalPrice: 89.90,
    checkoutUrl: 'https://pay.cakto.com.br/os323a8',
    imageUrl: '/images/products/coreldraw-cover.png',
    ean13: '8388917945198',
    mpn: 'CDGS-PRO-WW2026-C2',
    licenseOptions: [
      {
        quantity: 20141,
        label: 'Windows - X7',
        platform: 'Windows',
        year: 'X7',
        price: 47.90,
        originalPrice: 89.90,
        checkoutUrl: 'https://pay.cakto.com.br/os323a8',
        downloadSlug: 'coreldraw-x7-windows',
        imageUrl: '/images/products/coreldraw-x7-windows.png'
      },
      {
        quantity: 20221,
        label: 'Windows - 2022',
        platform: 'Windows',
        year: '2022',
        price: 57.90,
        originalPrice: 108.90,
        checkoutUrl: 'https://pay.cakto.com.br/3cwhgqy',
        driveUrl: 'https://drive.google.com/drive/folders/1EZTYmNQQMRlPtidtKx3IQxpK5DU3KfRw?usp=drive_link',
        downloadSlug: 'coreldraw-2022-windows',
        imageUrl: '/images/products/coreldraw-2022-windows.png'
      },
      {
        quantity: 20231,
        label: 'Windows - 2023',
        platform: 'Windows',
        year: '2023',
        price: 67.90,
        originalPrice: 121.00,
        checkoutUrl: 'https://pay.cakto.com.br/oai5wem',
        driveUrl: 'https://drive.google.com/drive/folders/1YcJLz4ICNlyukNyPTZy_-oSSlgNkB8YW?usp=drive_link',
        downloadSlug: 'coreldraw-2023-windows',
        imageUrl: '/images/products/coreldraw-2023-windows.png'
      },
      {
        quantity: 20241,
        label: 'Windows - 2024',
        platform: 'Windows',
        year: '2024',
        price: 77.90,
        originalPrice: 138.90,
        checkoutUrl: 'https://pay.cakto.com.br/3422jba',
        driveUrl: 'https://drive.google.com/drive/folders/1h0NRYIH_-d66gOEFEORTsuji6Gcy-rer?usp=drive_link',
        downloadSlug: 'coreldraw-2024-windows',
        imageUrl: '/images/products/coreldraw-2024-windows.png'
      },
      {
        quantity: 20251,
        label: 'Windows - 2025',
        platform: 'Windows',
        year: '2025',
        price: 87.90,
        originalPrice: 154.00,
        checkoutUrl: 'https://pay.cakto.com.br/p5h4svu',
        downloadSlug: 'coreldraw-2025-windows',
        imageUrl: '/images/products/coreldraw-2025-windows.png'
      },
      {
        quantity: 20261,
        label: 'Windows - 2026',
        platform: 'Windows',
        year: '2026',
        price: 97.90,
        originalPrice: 169.90,
        checkoutUrl: 'https://pay.cakto.com.br/35jm335_853466',
        downloadSlug: 'coreldraw-graphics-suite-2026',
        imageUrl: '/images/products/coreldraw-graphics-suite-2026.png'
      },
      {
        quantity: 20222,
        label: 'macOS - 2022',
        platform: 'macOS',
        year: '2022',
        price: 97.90,
        originalPrice: 168.00,
        checkoutUrl: 'https://pay.cakto.com.br/349jgmy',
        downloadSlug: 'coreldraw-2022-macos',
        imageUrl: '/images/products/coreldraw-2022-macos.png'
      },
      {
        quantity: 20242,
        label: 'macOS - 2024',
        platform: 'macOS',
        year: '2024',
        price: 127.90,
        originalPrice: 214.90,
        checkoutUrl: 'https://pay.cakto.com.br/ni9z85j',
        downloadSlug: 'coreldraw-2024-macos',
        imageUrl: '/images/products/coreldraw-2024-macos.png'
      },
      {
        quantity: 20252,
        label: 'macOS - 2025',
        platform: 'macOS',
        year: '2025',
        price: 137.90,
        originalPrice: 229.00,
        checkoutUrl: 'https://pay.cakto.com.br/3ccw87u',
        downloadSlug: 'coreldraw-2025-macos',
        imageUrl: '/images/products/coreldraw-2025-macos.png'
      },
      {
        quantity: 20262,
        label: 'macOS - 2026',
        platform: 'macOS',
        year: '2026',
        price: 147.90,
        originalPrice: 244.90,
        checkoutUrl: 'https://pay.cakto.com.br/jnap84i',
        downloadSlug: 'coreldraw-graphics-suite-2026-macos',
        imageUrl: '/images/products/coreldraw-graphics-suite-2026-macos.png'
      }
    ],
    features: [
      'Suíte completa e vitalícia (Sem mensalidades ou bloqueios de conta)',
      'Inclui CorelDRAW, Corel PHOTO-PAINT, PowerTRACE e Font Manager',
      'Edições X7, 2022, 2023, 2024, 2025 e 2026 para Windows e macOS (Intel e Apple Silicon)',
      'Acompanha instruções passo a passo em vídeo para instalação rápida e definitiva',
      'Link de download enviado imediatamente no seu e-mail após o pagamento',
      'Suporte técnico remoto via WhatsApp incluso (30 dias de garantia de suporte)'
    ],
    requirements: {
      os: 'WINDOWS: Windows 11, Windows 10 ou Windows 7/8 (para X7) 64-bits / MAC: macOS Sequoia 15, Sonoma 14, Ventura 13 ou Monterey 12',
      cpu: 'WINDOWS: Intel Core i3/i5/i7/i9 ou AMD Ryzen 3/5/7/9 / MAC: Apple Silicon (M1, M2, M3, M4) nativo ou Intel Core multi-core',
      ram: 'WINDOWS: Mínimo 4 GB para X7 / 8 GB para 2022–2026 (Recomendado: 16 GB) / MAC: 8 GB de RAM (Recomendado: 16 GB)',
      gpu: 'WINDOWS: Placa de vídeo compatível com OpenCL 1.2 / DirectX 11 ou superior (resolução 1280 x 720 ou Full HD) / MAC: GPU com suporte nativo a Apple Metal e telas Retina',
      storage: 'WINDOWS: 5.5 GB de espaço livre em disco (SSD recomendado) / MAC: 4 GB de espaço livre em disco'
    }
  },
  {
    id: 'photoshop_2026',
    keywords: ['adobe', 'photoshop', 'ps', 'design', 'foto', 'imagem', 'mac'],
    slug: 'adobe-photoshop-2026',
    name: 'Adobe Photoshop',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'Edição, retoque fotorrealista e criação de imagens raster profissional para Windows e Mac.',
    longDescription: 'O Adobe Photoshop é o software padrão de ouro mundial para processamento de fotos digitais, fotomontagens complexas com camadas e ilustrações artísticas. Esta versão completa e funcional oferece alto rendimento local para fotógrafos e designers gráficos, disponível para Windows e macOS.',
    price: 77.90,
    originalPrice: 179.00,
    checkoutUrl: 'https://pay.cakto.com.br/uso8h4c',
    imageUrl: '/images/products/adobe-photoshop-2026.png',
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 77.90, originalPrice: 149.90, checkoutUrl: 'https://pay.cakto.com.br/uso8h4c', imageUrl: '/images/products/adobe-photoshop-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 87.90, originalPrice: 169.90, checkoutUrl: 'https://pay.cakto.com.br/uso8h4c', imageUrl: '/images/products/adobe-photoshop-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 97.90, originalPrice: 179.90, checkoutUrl: 'https://pay.cakto.com.br/uso8h4c', imageUrl: '/images/products/adobe-photoshop-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 137.90, originalPrice: 229.00, checkoutUrl: 'https://pay.cakto.com.br/uso8h4c', imageUrl: '/images/products/adobe-photoshop-2026-macos.png' }
    ],
    features: [
      'Versão completa e funcional',
      'Edições disponíveis para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10/11 64-bits / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Intel ou AMD com suporte a 64 bits (2 GHz ou mais) / Apple Silicon (M1/M2/M3/M4)',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'Compatível com DirectX 12 / Metal com no mínimo 2 GB VRAM',
      storage: '20 GB de espaço livre (SSD recomendado)'
    }
  },
  {
    id: 'illustrator_2026',
    keywords: ['adobe', 'illustrator', 'ai', 'vetor', 'design', 'mac'],
    slug: 'adobe-illustrator-2026',
    name: 'Adobe Illustrator',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'Criação e edição de gráficos vetoriais, logotipos, ilustrações e layouts de página profissionais.',
    longDescription: 'O Adobe Illustrator é o software de design de gráficos vetoriais padrão do setor, permitindo criar logotipos, ícones, desenhos, tipografia e ilustrações complexas para qualquer mídia. Esta versão completa e funcional oferece excelente rendimento local com aceleração de hardware em Windows e macOS.',
    price: 77.90,
    originalPrice: 162.90,
    checkoutUrl: 'https://pay.cakto.com.br/ebyhwkz',
    imageUrl: '/images/products/adobe-illustrator-2026.png',
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 77.90, originalPrice: 149.90, checkoutUrl: 'https://pay.cakto.com.br/ebyhwkz', imageUrl: '/images/products/adobe-illustrator-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 87.90, originalPrice: 169.90, checkoutUrl: 'https://pay.cakto.com.br/ebyhwkz', imageUrl: '/images/products/adobe-illustrator-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 97.90, originalPrice: 179.90, checkoutUrl: 'https://pay.cakto.com.br/ebyhwkz', imageUrl: '/images/products/adobe-illustrator-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 137.90, originalPrice: 229.00, checkoutUrl: 'https://pay.cakto.com.br/ebyhwkz', imageUrl: '/images/products/adobe-illustrator-2026-macos.png' }
    ],
    features: [
      'Versão completa e funcional',
      'Edições disponíveis para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Processador Intel ou AMD de múltiplos núcleos / Apple Silicon (M1/M2/M3/M4)',
      ram: '8 GB (Recomendável: 16 GB)',
      gpu: 'Compatível com OpenGL 4.x / DirectX 12 com no mínimo 2 GB VRAM',
      storage: '4 GB de espaço livre (SSD recomendado)'
    }
  },
  {
    id: 'premiere_2026',
    slug: 'adobe-premiere-pro-2026',
    name: 'Adobe Premiere Pro',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'Edição de vídeo profissional para cinema, TV e web com linha do tempo intuitiva e IA integrada.',
    longDescription: 'O Adobe Premiere Pro é o software líder para edição de vídeo de alto nível em computadores Windows e Mac, oferecendo ferramentas criativas robustas, integração com outros apps e uma engine potente de renderização em tempo real local.',
    price: 77.90,
    originalPrice: 184.90,
    checkoutUrl: 'https://pay.cakto.com.br/y98ydjt',
    imageUrl: '/images/products/adobe-premiere-pro-2026.png',
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 77.90, originalPrice: 149.90, checkoutUrl: 'https://pay.cakto.com.br/y98ydjt', imageUrl: '/images/products/adobe-premiere-pro-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 87.90, originalPrice: 169.90, checkoutUrl: 'https://pay.cakto.com.br/y98ydjt', imageUrl: '/images/products/adobe-premiere-pro-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 97.90, originalPrice: 179.90, checkoutUrl: 'https://pay.cakto.com.br/y98ydjt', imageUrl: '/images/products/adobe-premiere-pro-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 137.90, originalPrice: 229.00, checkoutUrl: 'https://pay.cakto.com.br/y98ydjt', imageUrl: '/images/products/adobe-premiere-pro-2026-macos.png' }
    ],
    features: [
      'Versão completa e funcional',
      'Edições disponíveis para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Intel Core i5 / AMD Ryzen 5 / Apple Silicon (M1/M2/M3/M4)',
      ram: '8 GB (Recomendado: 16 GB ou mais)',
      gpu: 'Placa dedicada com suporte a DirectX 12 / Metal e mínimo de 2 GB VRAM',
      storage: '8 GB de espaço livre (SSD recomendado)'
    }
  },
  {
    id: 'after_effects_2026',
    slug: 'adobe-after-effects-2026',
    name: 'Adobe After Effects',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'Criação de efeitos visuais cinematográficos, motion graphics e composições digitais.',
    longDescription: 'O Adobe After Effects é o padrão da indústria para animações e efeitos visuais digitais. Crie introduções profissionais, transições animadas e composições fotorrealistas de forma estável no Windows e Mac.',
    price: 77.90,
    originalPrice: 174.00,
    checkoutUrl: 'https://pay.cakto.com.br/bm6mauf',
    imageUrl: '/images/products/adobe-after-effects-2026.png',
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 77.90, originalPrice: 149.90, checkoutUrl: 'https://pay.cakto.com.br/bm6mauf', imageUrl: '/images/products/adobe-after-effects-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 87.90, originalPrice: 169.90, checkoutUrl: 'https://pay.cakto.com.br/bm6mauf', imageUrl: '/images/products/adobe-after-effects-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 97.90, originalPrice: 179.90, checkoutUrl: 'https://pay.cakto.com.br/bm6mauf', imageUrl: '/images/products/adobe-after-effects-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 137.90, originalPrice: 229.00, checkoutUrl: 'https://pay.cakto.com.br/bm6mauf', imageUrl: '/images/products/adobe-after-effects-2026-macos.png' }
    ],
    features: [
      'Versão completa e funcional',
      'Edições disponíveis para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Processador Intel ou AMD de múltiplos núcleos / Apple Silicon (M1/M2/M3/M4)',
      ram: '16 GB (Recomendado: 32 GB)',
      gpu: 'Placa de vídeo dedicada de no mínimo 2 GB VRAM com suporte a DirectX 12 / Metal',
      storage: '15 GB de espaço livre (SSD recomendado)'
    }
  },
  {
    id: 'lightroom_classic_2026',
    slug: 'adobe-lightroom-classic-2026',
    name: 'Adobe Lightroom Classic',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'Organização, revelação rápida e edição profissional de fotografias e arquivos RAW.',
    longDescription: 'O Adobe Lightroom Classic oferece ferramentas avançadas de tratamento e revelação de fotos, com fluxos eficientes locais para organizar e processar arquivos fotográficos pesados com total precisão em Windows e Mac.',
    price: 77.90,
    originalPrice: 158.90,
    checkoutUrl: 'https://pay.cakto.com.br/je5uy6x',
    imageUrl: '/images/products/adobe-lightroom-classic-2026.png',
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 77.90, originalPrice: 149.90, checkoutUrl: 'https://pay.cakto.com.br/je5uy6x', imageUrl: '/images/products/adobe-lightroom-classic-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 87.90, originalPrice: 169.90, checkoutUrl: 'https://pay.cakto.com.br/je5uy6x', imageUrl: '/images/products/adobe-lightroom-classic-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 97.90, originalPrice: 179.90, checkoutUrl: 'https://pay.cakto.com.br/je5uy6x', imageUrl: '/images/products/adobe-lightroom-classic-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 137.90, originalPrice: 229.00, checkoutUrl: 'https://pay.cakto.com.br/je5uy6x', imageUrl: '/images/products/adobe-lightroom-classic-2026-macos.png' }
    ],
    features: [
      'Versão completa e funcional',
      'Edições disponíveis para Windows e macOS',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Intel ou AMD de múltiplos núcleos / Apple Silicon (M1/M2/M3/M4)',
      ram: '8 GB (Recomendado: 16 GB)',
      gpu: 'Placa dedicada com suporte a DirectX 12 / Metal e mínimo de 2 GB VRAM',
      storage: '4 GB de espaço livre'
    }
  },
  {
    id: 'proteus_9',
    slug: 'proteus-9-professional',
    name: 'Proteus 9 Professional Design Suite',
    category: 'Projetos Elétricos e Eletrônicos',
    compatibility: 'Windows',
    version: '9.x Professional',
    description: 'Simulação SPICE de circuitos eletrônicos e projeto automatizado de placas PCI (ARES).',
    longDescription: 'O Proteus 9 Design Suite combina a captura de esquemáticos eletrônicos robustos com simulação avançada SPICE de microcontroladores (Arduino, PIC, ARM) e design automatizado de placas de circuito impresso (ARES). Excelente para engenheiros eletrônicos e de automação.',
    price: 97.00,
    originalPrice: 167.00,
    checkoutUrl: 'https://pay.cakto.com.br/xsxm4u5_853714',
    imageUrl: '/images/products/proteus-9.jpg',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '2.0 GHz Intel ou equivalente',
      ram: '4 GB (Recomendável: 8 GB)',
      gpu: 'Compatível com OpenGL 2.0 ou DirectX 9',
      storage: '2 GB de espaço livre'
    }
  },
  {
    id: 'exocad_31',
    slug: 'exocad-dentalcad-31-rijeka',
    name: 'ExoCAD DentalCAD 3.1 Rijeka',
    category: 'Odontologia e CAD Dental',
    compatibility: 'Windows',
    version: '3.1 Rijeka (64-bits)',
    description: 'Solução CAD de odontologia e prótese dentária com módulos clínicos integrados.',
    longDescription: 'O ExoCAD DentalCAD 3.1 Rijeka é a plataforma líder absoluta para laboratórios de prótese dentária e clínicas odontológicas digitais. Esta versão completa e funcional permite o design digital de coroas, pontes, facetas, inlays, implantes e próteses sobre implantes com alta fidelidade tridimensional e suporte local completo.',
    price: 350.00,
    originalPrice: 529.00,
    checkoutUrl: '[LINK_CHECKOUT_EXOCAD]',
    imageUrl: '/images/products/exocad-dentalcad-31.jpg',
    features: [
      'Versão completa e funcional com módulos clínicos integrados',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 / AMD Ryzen 5 ou superior (Recomendado i7/Ryzen 7)',
      ram: '8 GB (Recomendado: 16 GB ou mais)',
      gpu: 'Placa dedicada com suporte a DirectX 11 ou superior (NVIDIA GeForce de 4 GB VRAM recomendada)',
      storage: '5 GB de espaço livre'
    }
  },
  {
    id: 'parallels_desktop_26',
    slug: 'parallels-desktop-26',
    name: 'Parallels Desktop 26',
    category: 'Escritório e Produtividade',
    compatibility: 'macOS',
    version: 'v26.0 para Mac',
    description: 'Execute Windows e outras aplicações de PC diretamente no seu Mac sem reiniciar.',
    longDescription: 'O Parallels Desktop 26 para Mac é a solução de virtualização líder de mercado, permitindo que você execute aplicativos do Windows lado a lado com seus aplicativos favoritos do macOS. Compatível nativamente com processadores Apple Silicon (M1/M2/M3/M4) e Intel, esta versão completa oferece desempenho gráfico aprimorado, suporte para DirectX 12 e integração fluida entre sistemas operacionais.',
    price: 247.90,
    originalPrice: 389.90,
    checkoutUrl: 'https://pay.cakto.com.br/iqu3oi2',
    imageUrl: '/images/products/parallels-desktop-26.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'macOS 12 (Monterey) ou superior',
      cpu: 'Apple Silicon (M1/M2/M3/M4) ou Intel de múltiplos núcleos',
      ram: '8 GB (Recomendável: 16 GB ou mais)',
      gpu: 'Suporte nativo a Metal da Apple',
      storage: '600 MB para instalação do Parallels + espaço para máquina virtual (SSD recomendado)'
    }
  },
  {
    id: 'camtasia_2026',
    slug: 'camtasia-2026',
    name: 'Camtasia 2026',
    category: 'Design e Criatividade',
    compatibility: 'Windows',
    version: '2026.1.2',
    description: 'Editor de vídeo e gravador de tela profissional tudo-em-um para criação de conteúdo de alta qualidade.',
    longDescription: 'O TechSmith Camtasia 2026 é o software líder de mercado para gravação de tela e edição de vídeo voltado para a criação de tutoriais, demonstrações de produtos, aulas online e vídeos de treinamento. Esta versão completa e funcional oferece gravação em alta definição, edição multitrilha intuitiva, efeitos visuais modernos, legendagem automática por IA e biblioteca rica em recursos prontos, tudo com acesso vitalício e sem taxas de assinatura mensal.',
    price: 127.90,
    originalPrice: 208.90,
    checkoutUrl: 'https://pay.cakto.com.br/kxd76qu',
    imageUrl: '/images/products/camtasia-2026.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: 'Intel Core i5 de 12ª geração / AMD Ryzen 5 ou superior',
      ram: '8 GB (Recomendável: 16 GB ou mais)',
      gpu: 'Placa dedicada com 2 GB VRAM ou superior com suporte a DirectX 12',
      storage: '4 GB de espaço livre (SSD recomendado)'
    }
  },
  {
    id: 'pdfelement_12',
    slug: 'pdfelement-12',
    name: 'Wondershare PDFelement Professional 12',
    category: 'Escritório e Produtividade',
    compatibility: 'Windows',
    version: '12.0.2',
    description: 'Editor de PDF completo e profissional para editar, converter, assinar e ler arquivos PDF.',
    longDescription: 'O Wondershare PDFelement Professional 12 para Windows é a solução definitiva de PDF tudo-em-um. Com uma interface moderna e intuitiva, ele permite editar textos e imagens em PDFs com a mesma facilidade de um processador de texto, converter arquivos de e para múltiplos formatos (Word, Excel, PowerPoint, imagens), criar formulários preenchíveis, assinar digitalmente e aplicar tecnologia OCR avançada para digitalizar e pesquisar textos em documentos escaneados.',
    price: 137.90,
    originalPrice: 218.00,
    checkoutUrl: 'https://pay.cakto.com.br/gcgjq3d',
    imageUrl: '/images/products/pdfelement-12.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '1 GHz ou superior',
      ram: '4 GB RAM (Recomendável: 8 GB)',
      gpu: 'Placa de vídeo compatível com DirectX 9 ou superior',
      storage: '2 GB de espaço livre'
    }
  },
  {
    id: 'wondershare_recoverit_13',
    slug: 'wondershare-recoverit-13',
    name: 'Wondershare Recoverit 13',
    category: 'Escritório e Produtividade',
    compatibility: 'Windows',
    version: '13.0.0',
    description: 'Software profissional de recuperação de dados e restauração de arquivos excluídos.',
    longDescription: 'O Wondershare Recoverit 13 para Windows é um software profissional de recuperação de dados líder de mercado. Ele possui uma taxa de recuperação de 95% e suporta a restauração de mais de 1000 formatos de arquivos (incluindo fotos, vídeos, documentos e e-mails) de quase todos os tipos de dispositivos de armazenamento: discos rígidos (HDD/SSD), pen drives, cartões de memória, além de sistemas de arquivos danificados ou formatados de forma acidental.',
    price: 127.90,
    originalPrice: 194.90,
    checkoutUrl: 'https://pay.cakto.com.br/3dqe23f',
    imageUrl: '/images/products/wondershare-recoverit-13.png',
    features: [
      'Versão completa e funcional',
      'Acesso vitalício para uso ilimitado',
      'Instalação assistida inclusa',
      'Entrega automática no e-mail após o pagamento',
      'Suporte remoto quando necessário',
      'Pronto para uso imediato'
    ],
    requirements: {
      os: 'Windows 10 ou 11 (64-bits)',
      cpu: '1 GHz ou superior',
      ram: '4 GB RAM (Recomendável: 8 GB)',
      gpu: 'Placa de vídeo padrão',
      storage: '2 GB de espaço livre'
    }
  },
  {
    id: 'autodesk_all_apps',
    keywords: ['autocad', 'revit', 'maya', 'fusion 360', '3ds max', 'advanced steel', 'inventor', 'autodesk', 'bim', 'cad'],
    slug: 'autodesk-all-apps',
    name: 'Autodesk Todos os Aplicativos',
    category: 'Engenharia e Arquitetura',
    compatibility: 'Windows e macOS',
    version: '2024/2025/2026/2027',
    description: 'Acesso oficial Autodesk Todos os Aplicativos. Você recebe login e senha para entrar em uma conta oficial da Autodesk e utilizar mais de 80 softwares.',
    longDescription: 'O plano Autodesk Todos os Aplicativos oferece acesso oficial completo a mais de 80 softwares da Autodesk (incluindo AutoCAD, Revit, Inventor, Maya, 3ds Max e muito mais). O cliente recebe login e senha exclusivos para entrar em uma conta oficial diretamente no portal da Autodesk (manage.autodesk.com). Você poderá baixar e instalar os softwares oficiais diretamente pela sua conta, recebendo todas as atualizações e suporte C2Tech via WhatsApp.',
    price: 89.90,
    originalPrice: 148.90,
    checkoutUrl: 'https://pay.cakto.com.br/6ek2ybh',
    imageUrl: '/images/products/autodesk-all-apps.png',
    isSubscription: true,
    billingPeriod: 'mensal',
    licenseOptions: [
      { quantity: 1, label: 'Mensal', price: 89.90, checkoutUrl: 'https://pay.cakto.com.br/6ek2ybh' },
      { quantity: 12, label: '1 Ano', price: 397.90, checkoutUrl: 'https://pay.cakto.com.br/sweaaho_448678' },
      { quantity: 24, label: '2 Anos', price: 597.90, checkoutUrl: 'https://pay.cakto.com.br/3ci8dh3' },
      { quantity: 36, label: '3 Anos', price: 737.90, checkoutUrl: 'https://pay.cakto.com.br/sjhwfte' }
    ],
    features: [
      'Você recebe login e senha de conta oficial da Autodesk',
      'Acesso direto no portal oficial manage.autodesk.com',
      'Mais de 80 softwares Autodesk inclusos (AutoCAD, Revit, 3ds Max, Maya, etc.)',
      'Download e instalação oficial pelo aplicativo Autodesk Desktop',
      'Compatível com Windows e macOS',
      'Atualizações oficiais e suporte prioritário via WhatsApp'
    ],
    requirements: {
      os: 'Windows 10/11 ou macOS atualizado',
      cpu: 'Processador Intel ou AMD Dual-core básico',
      ram: '4 GB de memória RAM',
      gpu: 'Placa de vídeo básica integrada',
      storage: 'Espaço livre variável de acordo com a instalação'
    }
  },
  {
    id: 'windows_11_pro',
    keywords: ['microsoft', 'office', 'windows', 'design', 'video'],
    slug: 'windows-11-pro',
    name: 'Windows 11 Pro',
    category: 'Chaves de Ativação',
    compatibility: 'Windows',
    version: 'Pro (25 dígitos)',
    description: 'Chave de ativação original de 25 dígitos para Windows 11 Professional. Licença vitalícia e permanente.',
    longDescription: 'Adquira a sua chave de ativação original (25 dígitos) do Windows 11 Pro e ative o seu sistema operacional de forma oficial e permanente. Esta licença é vitalícia, vinculada diretamente à sua conta Microsoft e hardware do seu PC. O Windows 11 Pro oferece os melhores recursos de produtividade, segurança avançada com BitLocker, área de trabalho remota e integração perfeita para ambientes profissionais. A chave será enviada diretamente pelo WhatsApp imediatamente após a confirmação do pagamento.',
    price: 89.90,
    originalPrice: 159.90,
    checkoutUrl: 'https://pay.cakto.com.br/mzrcqje_917458',
    imageUrl: '/images/products/windows-11-pro.png',
    isSubscription: false,
    features: [
      'Chave original de 25 dígitos',
      'Licença vitalícia e permanente',
      'Suporte a BitLocker e Área de Trabalho Remota',
      'Ativação online oficial da Microsoft',
      'Envio imediato via WhatsApp'
    ],
    requirements: {
      os: 'Computador sem sistema ou com Windows 11',
      cpu: 'Processador de 1 GHz ou superior (Compatível com Windows 11)',
      ram: '4 GB RAM ou superior',
      gpu: 'Gráficos compatíveis com DirectX 12',
      storage: '64 GB de espaço livre'
    },
    reviews: [
      {
        id: 'w11_rev1',
        userId: 'w11_u1',
        userName: 'Carlos Eduardo',
        rating: 5,
        comment: 'Chave enviada na mesma hora pelo WhatsApp, ativei meu PC novo que tinha acabado de montar. Tudo perfeito!',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'w11_rev2',
        userId: 'w11_u2',
        userName: 'Fernando Silva',
        rating: 5,
        comment: 'Ativação funcionou de primeira. Reconheceu como licença digital vinculada a minha conta Microsoft. Excelente.',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'w11_rev3',
        userId: 'w11_u3',
        userName: 'Amanda Oliveira',
        rating: 5,
        comment: 'Muito prático, o preço está ótimo e a entrega foi super rápida. Instalei no notebook do meu trabalho e economizei muito.',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]
  },
  {
    id: 'windows_10_pro',
    keywords: ['microsoft', 'office', 'windows', 'design', 'video'],
    slug: 'windows-10-pro',
    name: 'Windows 10 Pro',
    category: 'Chaves de Ativação',
    compatibility: 'Windows',
    version: 'Pro (25 dígitos)',
    description: 'Chave de ativação original de 25 dígitos para Windows 10 Professional. Licença vitalícia e definitiva.',
    longDescription: 'Adquira a sua chave de ativação original (25 dígitos) do Windows 10 Pro. Ative o sistema operacional mais estável e utilizado do mundo de forma oficial. A licença é vitalícia e conta com todos os recursos premium da versão Pro, como BitLocker, Área de Trabalho Remota e Hyper-V. A chave será entregue para você rapidamente através do WhatsApp logo após a aprovação do pagamento.',
    price: 79.90,
    originalPrice: 139.90,
    checkoutUrl: 'https://pay.cakto.com.br/ihir3na',
    imageUrl: '/images/products/windows-10-pro.png',
    isSubscription: false,
    features: [
      'Chave original de 25 dígitos',
      'Licença permanente',
      'Ativação online oficial da Microsoft',
      'Acesso a recursos Pro (BitLocker, Hyper-V)',
      'Entrega rápida via WhatsApp'
    ],
    requirements: {
      os: 'Computador sem sistema ou com Windows 10',
      cpu: 'Processador de 1 GHz ou superior',
      ram: '2 GB RAM ou superior',
      gpu: 'Gráficos compatíveis com DirectX 9',
      storage: '20 GB de espaço livre'
    },
    reviews: [
      {
        id: 'w10_rev1',
        userId: 'w10_u1',
        userName: 'Roberto Mendes',
        rating: 5,
        comment: 'Estava precisando de uma chave para o PC do escritório, ativou rápido e removeu aquela marca d\'água chata da tela. Recomendo.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'w10_rev2',
        userId: 'w10_u2',
        userName: 'Marcos Vinícius',
        rating: 5,
        comment: 'O suporte respondeu na hora no Whats. Me mandaram a key e em menos de 1 minuto meu Windows estava ativado como original. Show!',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]
  },
  {
    id: 'adobe_acrobat_pro_2026',
    keywords: ['adobe', 'acrobat', 'pro', 'dc', 'pdf', 'editor', 'leitor', 'mac', '2024', '2025', '2026'],
    slug: 'adobe-acrobat-pro-dc-2026',
    name: 'Adobe Acrobat Pro DC',
    category: 'Design e Criatividade',
    compatibility: 'Windows e macOS',
    version: '2024, 2025 e 2026 (Windows e macOS)',
    description: 'A solução completa em PDF. Crie, edite, converta e assine documentos com a ferramenta oficial da Adobe para Windows e Mac. Versões 2024, 2025 e 2026.',
    longDescription: 'O Adobe Acrobat Pro DC oferece as melhores ferramentas para trabalhar com PDFs. Edite textos e imagens diretamente no PDF, converta documentos, crie formulários preenchíveis, e adicione assinaturas digitais com facilidade e segurança. Uma licença vitalícia completa para turbinar a sua produtividade no Windows e Mac.',
    price: 127.90,
    originalPrice: 219.00,
    checkoutUrl: 'https://pay.cakto.com.br/gm7y7qs',
    imageUrl: '/images/products/adobe-acrobat-pro.png',
    isSubscription: false,
    licenseOptions: [
      { quantity: 2024, label: 'Windows - 2024', platform: 'Windows', year: '2024', price: 127.90, originalPrice: 219.00, checkoutUrl: 'https://pay.cakto.com.br/gm7y7qs', imageUrl: '/images/products/adobe-acrobat-pro-dc-2024-windows.png' },
      { quantity: 2025, label: 'Windows - 2025', platform: 'Windows', year: '2025', price: 147.90, originalPrice: 239.00, checkoutUrl: 'https://pay.cakto.com.br/gm7y7qs', imageUrl: '/images/products/adobe-acrobat-pro-dc-2025-windows.png' },
      { quantity: 2026, label: 'Windows - 2026', platform: 'Windows', year: '2026', price: 167.90, originalPrice: 269.00, checkoutUrl: 'https://pay.cakto.com.br/gm7y7qs', imageUrl: '/images/products/adobe-acrobat-pro-dc-2026-windows.png' },
      { quantity: 20262, label: 'macOS - 2026', platform: 'macOS', year: '2026', price: 189.90, originalPrice: 299.00, checkoutUrl: 'https://pay.cakto.com.br/gm7y7qs', imageUrl: '/images/products/adobe-acrobat-pro-dc-2026-macos.png' }
    ],
    features: [
      'Acesso vitalício',
      'Edições 2024, 2025 e 2026 disponíveis para Windows e macOS',
      'Edição avançada de PDFs',
      'Conversão de arquivos',
      'Assinaturas digitais',
      'Proteção por senha'
    ],
    requirements: {
      os: 'WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS Monterey, Ventura, Sonoma ou Sequoia',
      cpu: 'Processador de 1.5 GHz ou superior / Apple Silicon',
      ram: '2 GB de RAM (Recomendável: 4 GB)',
      gpu: 'Placa de vídeo básica',
      storage: '4.5 GB de espaço disponível em disco'
    }
  },
  {
    id: 'fl_studio_2025',
    keywords: ['fl', 'studio', 'producer', 'edition', '2025', 'audio', 'plugins', 'addons', 'musica', 'daw'],
    slug: 'fl-studio-2025-producer-edition',
    name: 'FL Studio 2025 Producer Edition + All Plugins',
    category: 'Design e Criatividade',
    compatibility: 'Windows',
    version: '2025 (All Plugins + Addons)',
    description: 'A estação de trabalho de áudio digital definitiva. Crie, grave, edite e mixe suas músicas com plugins premium.',
    longDescription: 'O FL Studio 2025 Producer Edition traz tudo o que você precisa para a produção musical profissional. Esta versão inclui todos os plugins e addons (All Plugins Edition), oferecendo sintetizadores avançados, efeitos de mixagem e ferramentas de masterização em uma interface intuitiva. Licença vitalícia completa e permanente para Windows.',
    price: 127.90,
    originalPrice: 219.90,
    checkoutUrl: 'https://pay.cakto.com.br/x6cwjnu',
    imageUrl: '/images/products/fl-studio-2025.png',
    isSubscription: false,
    features: [
      'Acesso vitalício',
      'Inclui todos os plugins e addons',
      'Gravação de áudio multipista',
      'Sequenciador de última geração',
      'Mixagem e masterização profissional'
    ],
    requirements: {
      os: 'Windows 10 ou Windows 11 (64-bits)',
      cpu: 'Processador Intel ou AMD de 2.0 GHz ou superior',
      ram: '4 GB de RAM (8 GB recomendado)',
      gpu: 'Compatível com Direct3D',
      storage: '4 GB de espaço disponível'
    },
    reviews: [
      {
        id: 'fl25_rev1',
        userId: 'fl25_u1',
        userName: 'DJ Marcos',
        rating: 5,
        comment: 'Versão completassa, veio com todos os plugins que eu precisava. Beatmaking subiu de nível.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'fl25_rev2',
        userId: 'fl25_u2',
        userName: 'Lucas Beats',
        rating: 5,
        comment: 'Muito bom, link direto do Drive sem enrolação.',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'fl25_rev3',
        userId: 'fl25_u3',
        userName: 'Ana Prod',
        rating: 5,
        comment: 'Melhor investimento, funcionando 100%. Recomendo.',
        date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'fl25_rev4',
        userId: 'fl25_u4',
        userName: 'Pedro Henrique',
        rating: 4,
        comment: 'Instalação tranquila. Obrigado C2Tech.',
        date: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]
  },
  {
    id: 'filmora_15',
    keywords: ['filmora', '15', 'wondershare', 'video', 'editor', 'edicao'],
    slug: 'filmora-15',
    name: 'Filmora 15',
    category: 'Design e Criatividade',
    compatibility: 'Windows',
    version: '15',
    description: 'Um dos editores de vídeo mais populares e fáceis de usar do mercado, com recursos avançados de IA.',
    longDescription: 'O Wondershare Filmora 15 traz uma revolução na edição de vídeo com novas ferramentas alimentadas por inteligência artificial. Crie vídeos incríveis de forma rápida, com efeitos, transições e edição de áudio profissional, tudo em uma interface intuitiva. Licença vitalícia completa para Windows.',
    price: 127.90,
    originalPrice: 198.00,
    checkoutUrl: 'https://pay.cakto.com.br/32u8f6d',
    imageUrl: '/images/products/filmora-15.png',
    isSubscription: false,
    features: [
      'Acesso vitalício',
      'Edição de vídeo com IA',
      'Efeitos e transições premium',
      'Edição de áudio avançada',
      'Exportação em 4K'
    ],
    requirements: {
      os: 'Windows 10 ou Windows 11 (64-bits)',
      cpu: 'Intel i3 ou superior, 2GHz ou superior',
      ram: '8 GB de RAM',
      gpu: 'Placa de vídeo compatível',
      storage: '10 GB de espaço disponível em disco'
    },
    reviews: [
      {
        id: 'filmora_rev1',
        userId: 'f15_u1',
        userName: 'Carlos Eduardo',
        rating: 5,
        comment: 'Excelente programa para edição, uso no meu canal do YouTube e os novos recursos de IA economizam muito tempo. Recomendo demais!',
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'filmora_rev2',
        userId: 'f15_u2',
        userName: 'Fernanda Lima',
        rating: 5,
        comment: 'A instalação foi super fácil. Recebi o link logo após o pagamento via Pix. Tudo funcionando perfeitamente.',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      },
      {
        id: 'filmora_rev3',
        userId: 'f15_u3',
        userName: 'Roberto Santos',
        rating: 4,
        comment: 'Software muito bom e leve. Chegou tudo certinho no email.',
        date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        verified: true
      }
    ]
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  if (slug === 'vectric-aspire' || slug === 'vectric-aspire-pro' || slug === 'aspire' || slug === 'vectric' || slug === 'aspire-12-5' || slug === 'aspire-12-5-pro' || slug === 'vectric-aspire-12-5-pro') {
    return products.find(p => p.slug === 'vectric-aspire-pro-12-5');
  }
  if (slug === '3ds-max' || slug === '3ds-max-2027' || slug === 'autodesk-3ds-max' || slug === '3dsmax') {
    return products.find(p => p.slug === 'autodesk-3ds-max-2027');
  }
  if (slug === 'visus' || slug === 'altoqi-visus' || slug === 'visus-2026') {
    return products.find(p => p.slug === 'altoqi-visus-2026');
  }
  if (slug === 'cypecad-2027' || slug === 'cype-2027') {
    return products.find(p => p.slug === 'cypecad-2026');
  }
  if (slug === 'revit' || slug === 'autodesk-revit' || slug === 'revit-2026' || slug === 'revit-2025' || slug === 'revit-2024') {
    return products.find(p => p.slug === 'revit-2027');
  }
  if (slug === 'autocad-2027-macos' || slug === 'autodesk-autocad' || slug === 'autocad') {
    return products.find(p => p.slug === 'autocad-2027-windows');
  }
  if (slug === 'sketchup-pro-2026-macos' || slug === 'sketchup-pro' || slug === 'sketchup') {
    return products.find(p => p.slug === 'sketchup-pro-2026-windows');
  }
  if (slug === 'coreldraw-graphics-suite-2026-macos' || slug === 'coreldraw-graphics-suite' || slug === 'coreldraw') {
    return products.find(p => p.slug === 'coreldraw-graphics-suite-2026');
  }
  if (slug === 'promob-plus-enterprise-2024' || slug === 'promob-plus' || slug === 'promob') {
    return products.find(p => p.slug === 'promob-plus-professional-2025');
  }
  if (slug === 'archicad-29-bra' || slug === 'archicad-28-bra' || slug === 'archicad' || slug === 'graphisoft-archicad') {
    return products.find(p => p.slug === 'archicad-30-bra');
  }
  if (slug === 'rhinoceros-8-mac' || slug === 'rhino-8-mac' || slug === 'rhino-8' || slug === 'rhinoceros') {
    return products.find(p => p.slug === 'rhinoceros-8');
  }
  if (slug === 'office-2024-professional-mac' || slug === 'office-2024-mac' || slug === 'office-2024') {
    return products.find(p => p.slug === 'office-2024-professional-plus');
  }
  if (slug === 'solidworks-2025' || slug === 'solidworks') {
    return products.find(p => p.slug === 'solidworks-2026');
  }
  if (slug === 'vray-7' || slug === 'vray' || slug === 'chaos-vray') {
    return products.find(p => p.slug === 'vray-7-windows');
  }
  return products.find(p => p.slug === slug);
}
