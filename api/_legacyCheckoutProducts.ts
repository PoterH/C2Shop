import type { Product } from '../src/data/products.js';

// Retain the exact editions and prices for carts saved before catalog renames.
export const legacyCheckoutProducts: Product[] = [
  {
    "id": "rhinoceros_8",
    "slug": "rhinoceros-8",
    "name": "Rhinoceros",
    "category": "Engenharia e Arquitetura",
    "compatibility": "Windows e macOS",
    "version": "8 Commercial (Windows e macOS)",
    "description": "Modelador 3D matemático avançado baseado em curvas NURBS para superfícies complexas.",
    "longDescription": "O Rhinoceros 8 (Rhino 3D) é amplamente utilizado por designers de produtos, engenheiros navais, joalheiros e arquitetos devido ao seu incrível motor matemático baseado em curvas NURBS. Permite criar formas curvas orgânicas com máxima precisão geométrica, além de incluir o Grasshopper integrado para modelagem paramétrica algorítmica.",
    "price": 167.9,
    "originalPrice": 268,
    "checkoutUrl": "https://pay.cakto.com.br/owkfuvv_850623",
    "imageUrl": "/images/products/rhinoceros_8-card-60-20261111.webp",
    "licenseOptions": [
      {
        "quantity": 1,
        "label": "Windows",
        "platform": "Windows",
        "year": "Windows",
        "price": 167.9,
        "originalPrice": 268,
        "checkoutUrl": "https://pay.cakto.com.br/owkfuvv_850623",
        "downloadSlug": "rhinoceros-8",
        "imageUrl": "/images/products/rhinoceros-8.png"
      },
      {
        "quantity": 2,
        "label": "macOS",
        "platform": "macOS",
        "year": "macOS",
        "price": 197.9,
        "originalPrice": 319,
        "checkoutUrl": "https://pay.cakto.com.br/ew26je8",
        "downloadSlug": "rhinoceros-8-mac",
        "imageUrl": "/images/products/rhinoceros_8-card-63-20261111.webp"
      }
    ],
    "features": [
      "Versão completa e funcional com Grasshopper incluso",
      "Opções nativas para Windows e macOS",
      "Acesso vitalício para uso ilimitado",
      "Instalação assistida inclusa",
      "Entrega automática no e-mail após o pagamento",
      "Suporte remoto quando necessário",
      "Pronto para uso imediato"
    ],
    "requirements": {
      "os": "WINDOWS: Windows 10 ou 11 (64-bits) / MAC: macOS 12.4 (Monterey) ou mais recente",
      "cpu": "WINDOWS: Intel ou AMD de múltiplos núcleos / MAC: Apple Silicon ou Intel",
      "ram": "8 GB (Recomendável: 16 GB)",
      "gpu": "WINDOWS: OpenGL 4.1 / MAC: Apple Silicon ou AMD",
      "storage": "5 GB de espaço livre"
    }
  },
  {
    "id": "promob_professional_2025",
    "slug": "promob-plus-professional-2025",
    "name": "Promob Plus",
    "category": "Marcenaria e Móveis Planejados",
    "compatibility": "Windows",
    "version": "2024 Enterprise & 2025 Professional",
    "description": "Modulação avançada de móveis planejados, planos de corte com Cut Pro e renderização Real Scene.",
    "longDescription": "O Promob Plus é a solução profissional definitiva para marcenarias, projetistas de móveis planejados e designers de interiores.",
    "price": 137.9,
    "originalPrice": 234.9,
    "checkoutUrl": "https://pay.cakto.com.br/fvvtpwg",
    "imageUrl": "/images/products/promob-card-5-20261111.webp",
    "licenseOptions": [
      {
        "quantity": 20241,
        "label": "Windows - 2024 Enterprise",
        "platform": "Windows",
        "year": "2024 Enterprise",
        "price": 137.9,
        "originalPrice": 234.9,
        "checkoutUrl": "https://pay.cakto.com.br/fvvtpwg",
        "downloadSlug": "promob-plus-enterprise-2024",
        "imageUrl": "/images/products/promob-card-6-20261111.webp"
      },
      {
        "quantity": 20251,
        "label": "Windows - 2025 Professional",
        "platform": "Windows",
        "year": "2025 Professional",
        "price": 307.9,
        "originalPrice": 458,
        "checkoutUrl": "https://pay.cakto.com.br/i5whsbp_853381",
        "downloadSlug": "promob-plus-professional-2025",
        "imageUrl": "/images/products/promob-plus-professional-2025.png"
      }
    ],
    "notes": "Nota: A ativação é válida para uso vitalício local.",
    "features": [
      "Versão completa e funcional com Cut Pro e Real Scene",
      "Acesso vitalício para uso ilimitado",
      "Entrega automática no e-mail após o pagamento"
    ],
    "requirements": {
      "os": "Windows 10 ou 11 (64-bits)",
      "cpu": "Intel Core i5 / AMD Ryzen 5 ou superior",
      "ram": "8 GB (Recomendado: 16 GB)",
      "gpu": "Placa dedicada com suporte a OpenGL (NVIDIA GeForce de 2 GB VRAM ou superior)",
      "storage": "5 GB de espaço livre"
    }
  }
];
