import type { Product } from './products';
// Curated collections allow tools to appear in every relevant profession.
export const CATALOG_SECTIONS = [
  {
    "title": "Produtividade & Utilitários",
    "groups": [
      {
        "title": "Microsoft Office & Windows",
        "slugs": [
          "office-2024-professional-plus",
          "office-2024-professional-plus",
          "windows-11-pro",
          "windows-10-pro"
        ]
      },
      {
        "title": "PDF, Virtualização & Dados",
        "slugs": [
          "adobe-acrobat-pro-dc-2026",
          "parallels-desktop-27",
          "pdfelement-12",
          "wondershare-recoverit-13"
        ]
      }
    ]
  },
  {
    "title": "Multimídia",
    "groups": [
      {
        "title": "Design Gráfico & Vetor",
        "slugs": [
          "coreldraw-graphics-suite-2026",
          "adobe-photoshop-2026",
          "adobe-illustrator-2026",
          "adobe-lightroom-classic-2026"
        ]
      },
      {
        "title": "Edição de Vídeo & Áudio",
        "slugs": [
          "adobe-premiere-pro-2026",
          "adobe-after-effects-2026",
          "filmora-15",
          "camtasia-2026",
          "fl-studio-2025-producer-edition"
        ]
      }
    ]
  },
  {
    "title": "Projetos Técnicos",
    "groups": [
      {
        "title": "Marcenaria & Móveis Planejados",
        "slugs": [
          "promob-plus-professional-2026",
          "vectric-aspire-pro-12-5",
          "rhinoceros-9",
          "sketchup-pro-2026-windows"
        ]
      },
      {
        "title": "Elétrica, Odonto & Engenharia",
        "slugs": [
          "proteus-9-professional",
          "exocad-dentalcad-31-rijeka",
          "sisdea-2025",
          "geo5-2024-windows",
          "inventor-professional-2027",
          "navisworks-manage-2027"
        ]
      }
    ]
  },
  {
    "title": "Arquitetura - CAD 3D",
    "groups": [
      {
        "title": "Modelagem CAD & BIM",
        "slugs": [
          "autocad-2027-windows",
          "revit-2027",
          "sketchup-pro-2026-windows",
          "archicad-30-bra",
          "civil-3d-2027",
          "zwcad-professional-2026",
          "rhinoceros-9",
          "autodesk-3ds-max-2027",
          "inventor-professional-2027",
          "navisworks-manage-2027"
        ]
      },
      {
        "title": "Cálculo, Estruturas & Render",
        "slugs": [
          "tqs-24-7",
          "eberick-builder-2025",
          "cypecad-2026",
          "solidworks-2026",
          "tekla-structures-2026",
          "vray-7-windows",
          "chaos-enscape-windows",
          "autodesk-all-apps",
          "altoqi-visus-2026",
          "geo5-2024-windows",
          "sisdea-2025",
          "autodesk-3ds-max-2027"
        ]
      }
    ]
  }
];
export const catalogLink = (title: string) => '/catalogo?categoria=' + encodeURIComponent(title);
const CATEGORY_ALIASES: Record<string, string> = {
  Microsoft: 'Produtividade & Utilitários',
  Marcenaria: 'Projetos Técnicos',
};

export const resolveCatalogCategory = (title: string) => CATEGORY_ALIASES[title] ?? title;

export function matchesCatalogCategory(product: Product, title: string): boolean {
 const resolvedTitle = resolveCatalogCategory(title);
 if (resolvedTitle === 'Todos') return true;
 const section = CATALOG_SECTIONS.find(s => s.title === resolvedTitle);
 const groups = section?.groups ?? CATALOG_SECTIONS.flatMap(s => s.groups).filter(g => g.title === resolvedTitle);
 return groups.length ? groups.some(g => g.slugs.includes(product.slug)) : product.category === resolvedTitle;
}
