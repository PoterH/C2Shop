import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, Trash2 } from 'lucide-react';

export const Catalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedOS, setSelectedOS] = useState<'Todos' | 'Windows' | 'macOS'>('Todos');
  const [searchParams, setSearchParams] = useSearchParams();
  
  const activeTab = searchParams.get('tab') === 'assinaturas' ? 'assinaturas' : 'vitalicios';
  const setActiveTab = (tab: 'vitalicios' | 'assinaturas') => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    setSearchParams(newParams, { replace: true });
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Todos');
    setSelectedOS('Todos');
  };

  // Total products in active tab
  const totalTabProducts = useMemo(() => {
    return products.filter(p => activeTab === 'assinaturas' ? !!p.isSubscription : !p.isSubscription).length;
  }, [activeTab]);

  // Filtered and searched products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 0. Filter by active tab (subscription vs lifetime)
      const matchesTab = activeTab === 'assinaturas' ? !!product.isSubscription : !product.isSubscription;
      if (!matchesTab) return false;

      // 1. Text search
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Category filter
      const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;

      // 3. OS compatibility filter
      const matchesOS = selectedOS === 'Todos' || 
                        product.compatibility === selectedOS || 
                        product.compatibility === 'Windows e macOS';

      return matchesSearch && matchesCategory && matchesOS;
    });
  }, [searchTerm, selectedCategory, selectedOS, activeTab]);

  return (
    <div className="pt-24 pb-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="text-left space-y-2 mb-8">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Catálogo de Softwares Profissionais
          </h1>
          <p className="text-slate-500 text-sm sm:text-base">
            Selecione e adquira os softwares essenciais para o seu desenvolvimento corporativo ou pessoal.
          </p>
        </div>

        {/* Tab Switcher (Vitalícios vs Assinaturas) */}
        <div className="flex justify-start mb-8">
          <div className="bg-white border border-slate-100 shadow-sm p-1.5 rounded-2xl flex gap-2">
            <button
              onClick={() => {
                setActiveTab('vitalicios');
                setSelectedCategory('Todos');
              }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'vitalicios'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Licenças Vitalícias</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('assinaturas');
                setSelectedCategory('Todos');
              }}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'assinaturas'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Assinaturas Mensais</span>
              <span className="bg-emerald-500/10 text-emerald-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                Novo
              </span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8 space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Search Input */}
            <div className="relative lg:col-span-2">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-slate-400" />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar software (ex: AutoCAD, Office, SketchUp...)"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all"
                id="search-input"
              />
            </div>

            {/* Compatibility Selector */}
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/80 rounded-2xl p-1">
              <span className="text-xs font-bold text-slate-500 pl-3 uppercase tracking-wider shrink-0">
                Sistema:
              </span>
              <div className="flex flex-1 gap-1">
                {(['Todos', 'Windows', 'macOS'] as const).map((os) => (
                  <button
                    key={os}
                    onClick={() => setSelectedOS(os)}
                    className={`flex-1 text-center py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedOS === os
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'hover:bg-slate-200/55 text-slate-600'
                    }`}
                  >
                    {os}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
                <SlidersHorizontal className="w-4 h-4 mr-1.5 text-slate-400" />
                Categorias
              </span>
              {(searchTerm || selectedCategory !== 'Todos' || selectedOS !== 'Todos') && (
                <button
                  onClick={handleClearFilters}
                  className="text-xs text-rose-500 font-semibold hover:text-rose-600 flex items-center transition-colors focus:outline-none"
                >
                  <Trash2 className="w-3.5 h-3.5 mr-1" />
                  Limpar filtros
                </button>
              )}
            </div>

            <div className="flex overflow-x-auto pb-2 scrollbar-none -mx-2 px-2 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedCategory === cat
                      ? 'bg-slate-900 border-slate-900 text-white'
                      : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Results Info */}
        <div className="mb-6 flex justify-between items-center text-xs text-slate-500">
          <p>
            Mostrando <strong>{filteredProducts.length}</strong> de {totalTabProducts} {activeTab === 'assinaturas' ? 'assinaturas' : 'softwares'} encontrados.
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
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
              Tente redefinir seus filtros, buscar por outro termo ou fale com nosso suporte via WhatsApp para verificar a disponibilidade de outras ferramentas.
            </p>
            <div className="pt-2">
              <button
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow hover:bg-slate-800 transition-all"
              >
                Limpar todos os filtros
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
