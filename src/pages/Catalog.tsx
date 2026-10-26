import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  TrustpilotRatingHorizontal,
  TrustGuaranteesPill,
  TrustGuaranteesModal
} from '../components/TrustBadges';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { 
  ChevronDown, 
  Check, 
  Search, 
  X 
} from 'lucide-react';

interface CategoryInfo {
  title: string;
  shortDesc: string;
  fullDesc: string;
}

const CATEGORY_INFO: Record<string, CategoryInfo> = {
  'Todos': {
    title: 'Softwares Profissionais',
    shortDesc: 'Compre softwares profissionais com ativação permanente e sem mensalidades recorrentes. Tenha acesso às principais ferramentas de engenharia, arquitetura, design gráfico, escritório, marcenaria e odontologia digital com entrega imediata e garantia de funcionamento vitalício.',
    fullDesc: 'Trabalhe com máxima produtividade e economia adquirindo licenças definitivas com ativação facilitada. Todos os programas acompanham instalador simplificado, entrega digital instantânea via e-mail e WhatsApp, e suporte técnico especializado pronto para auxiliar você em cada etapa de instalação e uso.'
  },
  'Engenharia e Arquitetura': {
    title: 'Engenharia e Arquitetura',
    shortDesc: 'Compre softwares de engenharia e arquitetura com ativação permanente e sem mensalidades. Tenha acesso às principais ferramentas do mercado como AutoCAD, Revit, SketchUp Pro, Lumion, V-Ray, SolidWorks e AltoQi Eberick com entrega imediata e garantia de funcionamento vitalício.',
    fullDesc: 'Desenvolva seus projetos civis, estruturais, elétricos, hidrossanitários e maquetes eletrônicas com o máximo de precisão e fluidez. Todos os programas acompanham instalador facilitado, compatibilidade com Windows e suporte técnico especializado para você focar no que realmente importa: seus projetos e clientes.'
  },
  'Design e Criatividade': {
    title: 'Design e Criatividade',
    shortDesc: 'Softwares profissionais para design gráfico, ilustração vetorial, edição e tratamento fotográfico, modelagem 3D e renderização de alto impacto. Crie artes, identidades visuais e projetos visuais impressionantes sem se preocupar com assinaturas caras.',
    fullDesc: 'Adquira soluções completas como CorelDRAW Graphics Suite, pacote Adobe completo, After Effects, Cinema 4D e Blender. Licenças com ativação permanente, desempenho fluido no seu computador e suporte técnico dedicado para instalação rápida e descomplicada.'
  },
  'Escritório e Produtividade': {
    title: 'Escritório e Produtividade',
    shortDesc: 'Soluções corporativas completas para edição de documentos, planilhas avançadas, gerenciamento de projetos e manipulação de arquivos PDF com ativação vitalícia e segurança total.',
    fullDesc: 'Maximize o rendimento do seu negócio, escritório ou home office com pacotes Office, Adobe Acrobat Pro, gerenciadores de arquivos e utilitários essenciais. Sem taxas ocultas, com ativação definitiva e suporte especializado para manter seus fluxos contínuos.'
  },
  'Marcenaria e Móveis Planejados': {
    title: 'Marcenaria e Móveis Planejados',
    shortDesc: 'Sistemas completos para projeto de interiores, modelagem de móveis sob medida, planos de corte inteligentes e geração de documentação técnica para marcenarias e indústrias moveleiras.',
    fullDesc: 'Ferramentas líderes como Promob Plus, Cut Pro, Real Scene e complementos para marcenaria. Reduza o desperdício de chapas de MDF, encante seus clientes com renderizações 3D realistas e acelere orçamentos e fabricação com suporte assistido.'
  },
  'Projetos Elétricos e Eletrônicos': {
    title: 'Projetos Elétricos e Eletrônicos',
    shortDesc: 'Ferramentas de ponta para esquemáticos elétricos, diagramas unifilares, cabeamento estruturado, automação industrial e simulação eletrônica com confiabilidade técnica rigorosa.',
    fullDesc: 'Projete quadros de distribuição, instalações prediais e industriais conforme as normas vigentes. Softwares robustos com bibliotecas completas de componentes, dimensionamento ágil e suporte técnico pronto para tirar suas dúvidas e auxiliar na ativação.'
  },
  'Odontologia e CAD Dental': {
    title: 'Odontologia e CAD Dental',
    shortDesc: 'Plataformas profissionais de design e escaneamento digital para laboratórios de prótese, clínicas odontológicas e especialistas em implantodontia, coroas e alinhadores.',
    fullDesc: 'Softwares de ponta como Exocad DentalCAD, Maestro 3D e soluções de diagnóstico tomográfico. Eleve o padrão dos seus tratamentos com modelagens anatômicas precisas, integração direta com fresadoras e impressoras 3D, e assistência técnica dedicada para instalação e calibração.'
  },
  'Chaves de Ativação': {
    title: 'Chaves de Ativação',
    shortDesc: 'Chaves de ativação originais (Product Keys) para sistemas operacionais Windows e pacotes de produtividade. Ativação online e direta junto aos servidores oficiais com garantia vitalícia.',
    fullDesc: 'Receba sua chave de licença genuína por e-mail e WhatsApp em minutos após a confirmação. Segurança total, garantia vitalícia de funcionamento e validação oficial para manter seus sistemas sempre atualizados e em conformidade.'
  }
};

type SortOption = 
  | 'sales_desc'
  | 'relevance'
  | 'name_asc'
  | 'name_desc'
  | 'price_asc'
  | 'price_desc'
  | 'ref_asc'
  | 'ref_desc';

interface SortItem {
  id: SortOption;
  label: string;
}

const SORT_OPTIONS: SortItem[] = [
  { id: 'sales_desc', label: 'Mais vendidos' },
  { id: 'relevance', label: 'Relevância' },
  { id: 'name_asc', label: 'Nome, A a Z' },
  { id: 'name_desc', label: 'Nome, Z a A' },
  { id: 'price_asc', label: 'Preço, menor para maior' },
  { id: 'price_desc', label: 'Preço, maior para menor' },
  { id: 'ref_asc', label: 'Referência, A a Z' },
  { id: 'ref_desc', label: 'Referência, Z a A' },
];

export const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('categoria') || 'Todos'
  );
  const [sortBy, setSortBy] = useState<SortOption>('sales_desc');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isGuaranteesModalOpen, setIsGuaranteesModalOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync URL search & category to local state if URL changes (e.g., from header mega-menu)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchTerm(q);
    } else {
      setSearchTerm('');
    }
    const cat = searchParams.get('categoria');
    if (cat !== null) {
      setSelectedCategory(cat);
    } else {
      setSelectedCategory('Todos');
    }
  }, [searchParams]);

  // Click outside listener for the sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle clearing search query
  const handleClearSearch = () => {
    setSearchTerm('');
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('q');
    setSearchParams(newParams, { replace: true });
  };

  // Get active category info
  const categoryInfo = CATEGORY_INFO[selectedCategory] || {
    title: selectedCategory,
    shortDesc: `Compre softwares de ${selectedCategory} com ativação permanente e sem mensalidades. Produtos originais com entrega imediata e suporte técnico especializado.`,
    fullDesc: 'Todos os programas acompanham instalador facilitado, entrega rápida e suporte dedicado para garantir o melhor desempenho dos seus projetos.'
  };

  // Filtered and sorted products
  const sortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // 1. Search term filter
      if (searchTerm.trim()) {
        const lowerSearch = searchTerm.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(lowerSearch) ||
          product.description.toLowerCase().includes(lowerSearch) ||
          product.category.toLowerCase().includes(lowerSearch) ||
          (product.keywords && product.keywords.some((k: string) => k.toLowerCase().includes(lowerSearch)));
        if (!matchesSearch) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'Todos' && product.category !== selectedCategory) {
        return false;
      }

      return true;
    });

    const list = [...filtered];

    switch (sortBy) {
      case 'sales_desc':
        return list.sort((a, b) => {
          const aScore = a.isRecommended ? 1 : 0;
          const bScore = b.isRecommended ? 1 : 0;
          if (aScore !== bScore) return bScore - aScore;
          if (a.id === 'autodesk_all_apps') return -1;
          if (b.id === 'autodesk_all_apps') return 1;
          return 0;
        });
      case 'relevance':
        return list;
      case 'name_asc':
        return list.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
      case 'name_desc':
        return list.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'));
      case 'price_asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return list.sort((a, b) => b.price - a.price);
      case 'ref_asc':
        return list.sort((a, b) => (a.mpn || a.id).localeCompare(b.mpn || b.id, 'pt-BR'));
      case 'ref_desc':
        return list.sort((a, b) => (b.mpn || b.id).localeCompare(a.mpn || a.id, 'pt-BR'));
      default:
        return list;
    }
  }, [searchTerm, selectedCategory, sortBy]);

  const currentSortItem = SORT_OPTIONS.find((opt) => opt.id === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="pt-28 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/catalogo"
            onClick={() => {
              setSelectedCategory('Todos');
              const newParams = new URLSearchParams(searchParams);
              newParams.delete('categoria');
              setSearchParams(newParams, { replace: true });
            }}
            className="hover:text-blue-600 transition-colors"
          >
            Catálogo
          </Link>
          {selectedCategory !== 'Todos' && (
            <>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{selectedCategory}</span>
            </>
          )}
        </nav>

        {/* Trust Header: Trustpilot Rating (Left) & Guarantees Pill (Right) */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 pb-5 border-b border-slate-200/80">
          <TrustpilotRatingHorizontal onOpenModal={() => setIsGuaranteesModalOpen(true)} />
          <TrustGuaranteesPill onOpenModal={() => setIsGuaranteesModalOpen(true)} />
        </div>

        {/* Category Header: Blue Title + Rich Description */}
        <div className="text-left mb-6">
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0066FF] tracking-tight">
            {categoryInfo.title}
          </h1>
          <div className="mt-3 text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-4xl">
            <p>
              {categoryInfo.shortDesc}
              {isDescriptionExpanded && (
                <span className="block mt-2 text-slate-600">
                  {categoryInfo.fullDesc}
                </span>
              )}
            </p>
            <button
              type="button"
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-[#0066FF] hover:text-blue-700 hover:underline mt-2 transition-colors focus:outline-none"
            >
              {isDescriptionExpanded ? 'Ler menos' : 'Ler mais...'}
            </button>
          </div>

          {/* Search Term active notification (if user searched via header) */}
          {searchTerm && (
            <div className="mt-4 flex items-center justify-between bg-blue-50 border border-blue-200/70 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-blue-900 max-w-4xl">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#0066FF] shrink-0" />
                <span>Resultados da busca por: <strong>"{searchTerm}"</strong></span>
              </div>
              <button
                type="button"
                onClick={handleClearSearch}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-900 bg-white border border-blue-200 px-2.5 py-1 rounded-lg transition-colors shadow-2xs"
              >
                <X className="w-3.5 h-3.5" />
                <span>Limpar busca</span>
              </button>
            </div>
          )}
        </div>

        {/* Sub-bar: Products Count (Left) & Sort Dropdown (Right) */}
        <div className="border-y border-slate-200/80 py-3.5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-xs sm:text-sm text-slate-500 font-medium">
            Exibindo <span className="font-bold text-slate-800">{sortedProducts.length}</span> {sortedProducts.length === 1 ? 'produto' : 'produtos'} na categoria
          </div>

          <div className="flex items-center gap-2 relative self-start sm:self-auto" ref={dropdownRef}>
            <span className="text-xs sm:text-sm text-slate-500 font-medium whitespace-nowrap">
              Ordenar por:
            </span>
            
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="inline-flex items-center justify-between gap-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs sm:text-sm font-medium px-3.5 py-2 rounded-xl shadow-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-w-[170px]"
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
            >
              <span className="truncate">{currentSortItem.label}</span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${isSortOpen ? 'rotate-180 text-[#0066FF]' : ''}`} />
            </button>

            {/* Dropdown Menu matching Screenshot 3 */}
            {isSortOpen && (
              <div 
                className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-30"
                role="listbox"
              >
                {SORT_OPTIONS.map((option) => {
                  const isSelected = option.id === sortBy;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setSortBy(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-[#0066FF] font-semibold'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-normal'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#0066FF] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="p-4 bg-slate-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto text-slate-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-base sm:text-lg">
              Nenhum software correspondente encontrado
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
              {searchTerm 
                ? `Não encontramos resultados para "${searchTerm}". Tente buscar por outro termo ou explore outras categorias.`
                : 'Não encontramos softwares para a seleção atual. Tente selecionar outra categoria ou fale com nosso suporte via WhatsApp.'}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  handleClearSearch();
                  setSelectedCategory('Todos');
                  const newParams = new URLSearchParams();
                  setSearchParams(newParams, { replace: true });
                }}
                className="px-5 py-2.5 bg-[#0066FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                Ver todos os softwares
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Guarantees Modal */}
      <TrustGuaranteesModal
        isOpen={isGuaranteesModalOpen}
        onClose={() => setIsGuaranteesModalOpen(false)}
      />
    </div>
  );
};
