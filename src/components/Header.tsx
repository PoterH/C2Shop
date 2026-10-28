import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  MessageCircle,
  Search,
  Home as HomeIcon,
  ChevronDown,
  ChevronRight,
  CloudDownload,
  Lock,
  User,
  ShoppingCart,
  Compass,
  Video,
  Wrench,
  LayoutGrid,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency, CURRENCIES, type CurrencyCode } from '../context/CurrencyContext';
import { products } from '../data/products';

/* ============================================================================
 * INLINE SVG FLAGS (Brazil | Merged MX+AR+CL+PE | Merged PT+MZ)
 * ========================================================================== */
const FlagBrazil: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 28 20"
    className={`inline-block rounded-[2px] shadow-2xs shrink-0 ${className}`}
    aria-label="Brasil"
  >
    <rect width="28" height="20" fill="#009b3a" />
    <polygon points="14,2.2 25.5,10 14,17.8 2.5,10" fill="#fedf00" />
    <circle cx="14" cy="10" r="4.2" fill="#002776" />
    <path
      d="M10.1,9.2 C12.4,8.2 15.6,8.6 17.9,10.5"
      stroke="#ffffff"
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

/** Merged 4-Country Flag: Mexico (top-left), Argentina (top-right), Chile (bottom-left), Peru (bottom-right) */
const FlagLatamMerged: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 28 20"
    className={`inline-block rounded-[2px] shadow-2xs shrink-0 overflow-hidden ${className}`}
    aria-label="México, Argentina, Chile e Peru"
  >
    {/* Top-Left: Mexico (Green, White, Red vertical) */}
    <g>
      <rect x="0" y="0" width="4.6" height="10" fill="#006847" />
      <rect x="4.6" y="0" width="4.7" height="10" fill="#ffffff" />
      <rect x="9.3" y="0" width="4.7" height="10" fill="#ce1126" />
      <circle cx="7" cy="5" r="1.1" fill="#8c6239" />
    </g>
    {/* Top-Right: Argentina (Sky blue, White with sun, Sky blue horizontal) */}
    <g>
      <rect x="14" y="0" width="14" height="3.3" fill="#74acdf" />
      <rect x="14" y="3.3" width="14" height="3.4" fill="#ffffff" />
      <rect x="14" y="6.7" width="14" height="3.3" fill="#74acdf" />
      <circle cx="21" cy="5" r="1.2" fill="#f6b40e" />
    </g>
    {/* Bottom-Left: Chile (Blue canton + White top, Red bottom) */}
    <g>
      <rect x="0" y="10" width="5" height="5" fill="#0039a6" />
      <rect x="5" y="10" width="9" height="5" fill="#ffffff" />
      <rect x="0" y="15" width="14" height="5" fill="#d52b1e" />
      <circle cx="2.5" cy="12.5" r="1" fill="#ffffff" />
    </g>
    {/* Bottom-Right: Peru (Red, White, Red vertical) */}
    <g>
      <rect x="14" y="10" width="4.6" height="10" fill="#d91023" />
      <rect x="18.6" y="10" width="4.8" height="10" fill="#ffffff" />
      <rect x="23.4" y="10" width="4.6" height="10" fill="#d91023" />
    </g>
    {/* Subtle dividing cross */}
    <line x1="14" y1="0" x2="14" y2="20" stroke="#0f172a" strokeWidth="0.6" />
    <line x1="0" y1="10" x2="28" y2="10" stroke="#0f172a" strokeWidth="0.6" />
  </svg>
);

/** Merged 2-Country Flag: Portugal (left half) + Mozambique (right half) */
const FlagPtMzMerged: React.FC<{ className?: string }> = ({ className = 'w-5 h-3.5' }) => (
  <svg
    viewBox="0 0 28 20"
    className={`inline-block rounded-[2px] shadow-2xs shrink-0 overflow-hidden ${className}`}
    aria-label="Portugal e Moçambique"
  >
    {/* Left half: Portugal (Green + Red + Gold sphere) */}
    <g>
      <rect x="0" y="0" width="5.5" height="20" fill="#006600" />
      <rect x="5.5" y="0" width="8.5" height="20" fill="#ff0000" />
      <circle cx="5.5" cy="10" r="2.3" fill="#ffcc00" />
    </g>
    {/* Right half: Mozambique (Teal, Black, Yellow stripes + Red triangle) */}
    <g>
      <rect x="14" y="0" width="14" height="6.2" fill="#007168" />
      <rect x="14" y="6.2" width="14" height="1" fill="#ffffff" />
      <rect x="14" y="7.2" width="14" height="5.6" fill="#000000" />
      <rect x="14" y="12.8" width="14" height="1" fill="#ffffff" />
      <rect x="14" y="13.8" width="14" height="6.2" fill="#fce100" />
      <polygon points="14,0 20.5,10 14,20" fill="#d21034" />
      <circle cx="16.2" cy="10" r="1.3" fill="#fce100" />
    </g>
    <line x1="14" y1="0" x2="14" y2="20" stroke="#0f172a" strokeWidth="0.7" />
  </svg>
);

interface MegaMenuCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  categoryFilter: string;
  columns: {
    title: string;
    seeAllLink: string;
    items: { name: string; slug: string }[];
  }[];
  featuredSlugs: string[];
}

const MEGA_MENU_CATEGORIES: MegaMenuCategory[] = [
  {
    id: 'microsoft-utilitarios',
    label: 'Microsoft',
    icon: <LayoutGrid className="w-4 h-4 text-slate-700 shrink-0" />,
    categoryFilter: 'Escritório e Produtividade',
    columns: [
      {
        title: 'Microsoft Office & Windows',
        seeAllLink: '/catalogo?categoria=Escrit%C3%B3rio+e+Produtividade',
        items: [
          { name: 'Office 2024 Professional Plus (Win)', slug: 'office-2024-professional-plus' },
          { name: 'Office 2024 LTSC Professional (Mac)', slug: 'office-2024-professional-mac' },
          { name: 'Windows 11 Pro (Chave Original)', slug: 'windows-11-pro' },
          { name: 'Windows 10 Pro (Chave Original)', slug: 'windows-10-pro' },
        ],
      },
      {
        title: 'PDF, Virtualização & Dados',
        seeAllLink: '/catalogo?categoria=Escrit%C3%B3rio+e+Produtividade',
        items: [
          { name: 'Adobe Acrobat Pro DC 2026', slug: 'adobe-acrobat-pro-dc-2026' },
          { name: 'Parallels Desktop 26 (macOS)', slug: 'parallels-desktop-26' },
          { name: 'Wondershare PDFelement 12', slug: 'pdfelement-12' },
          { name: 'Wondershare Recoverit 13', slug: 'wondershare-recoverit-13' },
        ],
      },
    ],
    featuredSlugs: ['office-2024-professional-plus', 'windows-11-pro', 'parallels-desktop-26'],
  },
  {
    id: 'multimidia-design',
    label: 'Multimídia',
    icon: <Video className="w-4 h-4 text-slate-700 shrink-0" />,
    categoryFilter: 'Design e Criatividade',
    columns: [
      {
        title: 'Design Gráfico & Vetor',
        seeAllLink: '/catalogo?categoria=Design+e+Criatividade',
        items: [
          { name: 'CorelDRAW Graphics Suite (X7 a 2026)', slug: 'coreldraw-graphics-suite-2026' },
          { name: 'Adobe Photoshop 2026', slug: 'adobe-photoshop-2026' },
          { name: 'Adobe Illustrator 2026', slug: 'adobe-illustrator-2026' },
          { name: 'Adobe Lightroom Classic 2026', slug: 'adobe-lightroom-classic-2026' },
        ],
      },
      {
        title: 'Edição de Vídeo & Áudio',
        seeAllLink: '/catalogo?categoria=Design+e+Criatividade',
        items: [
          { name: 'Adobe Premiere Pro 2026', slug: 'adobe-premiere-pro-2026' },
          { name: 'Adobe After Effects 2026', slug: 'adobe-after-effects-2026' },
          { name: 'Wondershare Filmora 15', slug: 'filmora-15' },
          { name: 'TechSmith Camtasia 2026', slug: 'camtasia-2026' },
          { name: 'FL Studio Producer Edition 2025', slug: 'fl-studio-2025' },
        ],
      },
    ],
    featuredSlugs: [
      'coreldraw-graphics-suite-2026',
      'adobe-photoshop-2026',
      'adobe-illustrator-2026',
    ],
  },
  {
    id: 'marcenaria-especializados',
    label: 'Marcenaria',
    icon: <Wrench className="w-4 h-4 text-slate-700 shrink-0" />,
    categoryFilter: 'Marcenaria e Móveis Planejados',
    columns: [
      {
        title: 'Marcenaria & Móveis Planejados',
        seeAllLink: '/catalogo?categoria=Marcenaria+e+M%C3%B3veis+Planejados',
        items: [
          { name: 'Promob Plus (2024 Enterprise e 2025 Pro)', slug: 'promob-plus-professional-2025' },
          { name: 'Vectric Aspire Pro 12.5 (CNC Router)', slug: 'vectric-aspire-pro-12-5' },
          { name: 'Rhinoceros 8 3D', slug: 'rhinoceros-8' },
          { name: 'SketchUp Pro (2021 a 2026)', slug: 'sketchup-pro-2026-windows' },
        ],
      },
      {
        title: 'Elétrica, Odonto & Engenharia',
        seeAllLink: '/catalogo',
        items: [
          { name: 'Proteus 9 Professional Design Suite', slug: 'proteus-9-professional' },
          { name: 'ExoCAD DentalCAD 3.1 Rijeka', slug: 'exocad-dentalcad-31-rijeka' },
          { name: 'SisDEA 2025 (Avaliação de Imóveis)', slug: 'sisdea-2025' },
          { name: 'GEO5 2024 (Geotecnia Completo)', slug: 'geo5-2024-windows' },
          { name: 'Autodesk Inventor Pro 2027', slug: 'inventor-professional-2027' },
          { name: 'Autodesk Navisworks Manage 2027', slug: 'navisworks-manage-2027' },
        ],
      },
    ],
    featuredSlugs: [
      'promob-plus-professional-2025',
      'rhinoceros-8',
      'proteus-9-professional',
    ],
  },
  {
    id: 'arquitetura-cad',
    label: 'Arquitetura - CAD 3D',
    icon: <Compass className="w-4 h-4 text-slate-700 shrink-0" />,
    categoryFilter: 'Engenharia e Arquitetura',
    columns: [
      {
        title: 'Modelagem CAD & BIM',
        seeAllLink: '/catalogo?categoria=Engenharia+e+Arquitetura',
        items: [
          { name: 'Autodesk AutoCAD (2019 a 2027)', slug: 'autocad-2027-windows' },
          { name: 'Autodesk Revit (2024 a 2027)', slug: 'revit-2027' },
          { name: 'SketchUp Pro (2021 a 2026)', slug: 'sketchup-pro-2026-windows' },
          { name: 'Graphisoft ArchiCAD (28, 29 e 30 BRA)', slug: 'archicad-30-bra' },
          { name: 'Autodesk Civil 3D 2027', slug: 'civil-3d-2027' },
          { name: 'ZWCAD Professional 2026', slug: 'zwcad-professional-2026' },
        ],
      },
      {
        title: 'Cálculo, Estruturas & Render',
        seeAllLink: '/catalogo?categoria=Engenharia+e+Arquitetura',
        items: [
          { name: 'AltoQi Eberick + Builder 2025', slug: 'eberick-builder-2025' },
          { name: 'CYPE Completo (2025.d e 2026.a)', slug: 'cypecad-2026' },
          { name: 'SolidWorks 2026 Premium', slug: 'solidworks-2026' },
          { name: 'Tekla Structures 2026', slug: 'tekla-structures-2026' },
          { name: 'V-Ray 7 para SketchUp/3ds Max', slug: 'vray-7-windows' },
          { name: 'Chaos Enscape 3D Real-Time', slug: 'chaos-enscape-windows' },
          { name: 'Autodesk Todos os Apps (Assinatura)', slug: 'autodesk-all-apps' },
        ],
      },
    ],
    featuredSlugs: ['autocad-2027-windows', 'sketchup-pro-2026-windows', 'cypecad-2026'],
  },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  // Mega-menu active category ID
  const [activeMegaId, setActiveMegaId] = useState<string | null>(null);
  const megaCloseTimeoutRef = useRef<number | null>(null);

  // Top bar dropdowns
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isFlagOpen, setIsFlagOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, setIsCartOpen } = useCart();
  const { currency, setCurrency, currencyInfo, formatPrice } = useCurrency();

  const whatsappNumber = '5581997349300';
  const whatsappMessage = encodeURIComponent(
    'Olá, tenho interesse em um software da C2Tech e gostaria de tirar uma dúvida.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
      setIsMobileSearchActive(false);
      setIsDesktopSearchOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    setIsMobileSearchActive(false);
    setActiveMegaId(null);
    setIsCurrencyOpen(false);
    setIsFlagOpen(false);
  }, [location.pathname, location.search]);

  const handleMegaEnter = (id: string) => {
    if (megaCloseTimeoutRef.current) {
      window.clearTimeout(megaCloseTimeoutRef.current);
      megaCloseTimeoutRef.current = null;
    }
    setActiveMegaId(id);
  };

  const handleMegaLeave = () => {
    megaCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveMegaId(null);
    }, 160);
  };

  const activeCategoryData = MEGA_MENU_CATEGORIES.find((c) => c.id === activeMegaId);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-xs border-b border-slate-200/80">
      {/* ===================================================================== */}
      {/* 1. TOP DARK STRIP ("TARJA")                                           */}
      {/* ===================================================================== */}
      <div className="bg-[#0f172a] text-slate-200 text-[11px] sm:text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-8.5 flex items-center justify-between gap-4">
          {/* Left: Sobre nós | Fale conosco */}
          <div className="flex items-center gap-2.5 font-medium whitespace-nowrap shrink-0">
            <Link to="/sobre-nos" className="hover:text-white transition-colors">
              Sobre nós
            </Link>
            <span className="text-slate-600">|</span>
            <Link to="/contato" className="hover:text-white transition-colors">
              Fale conosco
            </Link>
          </div>

          {/* Center: WhatsApp + Entrega Imediata + Pagamento Seguro */}
          <div className="hidden md:flex items-center gap-6 whitespace-nowrap shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>+55 81 99734-9300</span>
            </a>

            <Link
              to="/entrega-e-pagamento"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <CloudDownload className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Entrega Imediata</span>
            </Link>

            <Link
              to="/entrega-e-pagamento"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Pagamento Seguro</span>
            </Link>
          </div>

          {/* Right: Currency Converter + Flag / Region Switcher */}
          <div className="flex items-center gap-3.5 whitespace-nowrap shrink-0">
            {/* Currency Switcher */}
            <div
              className="relative"
              onMouseEnter={() => setIsCurrencyOpen(true)}
              onMouseLeave={() => setIsCurrencyOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsCurrencyOpen((v) => !v)}
                className="flex items-center gap-1 text-slate-200 hover:text-white font-bold py-1 cursor-pointer whitespace-nowrap"
                title="Converter moeda de exibição"
              >
                <span>{currencyInfo.symbol}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              <div
                className={`absolute right-0 top-full pt-1 w-56 z-50 transition-all duration-200 origin-top-right ${
                  isCurrencyOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 overflow-hidden">
                  <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Conversão em Tempo Real
                  </div>
                  {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => {
                    const info = CURRENCIES[code];
                    const isSelected = currency === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer ${
                          isSelected ? 'bg-blue-50/70 font-bold text-[#0b5ed7]' : 'text-slate-700'
                        }`}
                      >
                        <span>
                          {info.country} ({info.code})
                        </span>
                        <span className="font-extrabold text-slate-900">{info.symbol}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Flag / Region Switcher */}
            <div
              className="relative"
              onMouseEnter={() => setIsFlagOpen(true)}
              onMouseLeave={() => setIsFlagOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsFlagOpen((v) => !v)}
                className="flex items-center gap-1.5 py-1 cursor-pointer"
                title="Região e Idioma"
              >
                <FlagBrazil />
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <div
                className={`absolute right-0 top-full pt-1 w-80 z-50 transition-all duration-200 origin-top-right ${
                  isFlagOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-1 pointer-events-none'
                }`}
              >
                <div className="bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 py-1.5 overflow-hidden">
                  <div className="px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    Idioma e Região
                  </div>

                  {/* 1. Brasil (Ativo) */}
                  <div className="px-3.5 py-2.5 flex items-center justify-between gap-3 bg-blue-50/50 border-b border-slate-100">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlagBrazil className="w-6 h-4 shrink-0" />
                      <div>
                        <p className="text-xs font-extrabold text-slate-900 leading-none">
                          Português (Brasil)
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">Brasil</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full shrink-0">
                      Ativo
                    </span>
                  </div>

                  {/* 2. México, Argentina, Chile e Peru (Em breve em Espanhol -> En breve) */}
                  <div
                    className="px-3.5 py-2.5 flex items-center justify-between gap-3 opacity-75 cursor-not-allowed select-none border-b border-slate-100"
                    title="Disponível em breve para América Latina"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlagLatamMerged className="w-6 h-4 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">
                          Español
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          México • Argentina • Chile • Peru
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full shrink-0">
                      En breve
                    </span>
                  </div>

                  {/* 3. Portugal e Moçambique (Em breve em Português) */}
                  <div
                    className="px-3.5 py-2.5 flex items-center justify-between gap-3 opacity-75 cursor-not-allowed select-none"
                    title="Disponível em breve para Portugal e Moçambique"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlagPtMzMerged className="w-6 h-4 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-slate-800 leading-none">
                          Português
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Portugal • Moçambique
                        </p>
                      </div>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-700 bg-slate-200 px-2.5 py-0.5 rounded-full shrink-0">
                      Em breve
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN HEADER BAR & MEGA-MENU POPUP                                  */}
      {/* ===================================================================== */}
      <div className="relative bg-white" onMouseLeave={handleMegaLeave}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {isMobileSearchActive ? (
            /* Active Mobile Search Bar State */
            <div className="flex items-center w-full animate-fade-in">
              <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Pesquisar softwares..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 border-none rounded-xl text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
                />
              </form>
              <button
                onClick={() => setIsMobileSearchActive(false)}
                className="ml-3 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <>
              {/* Left: Brand Logo + Name (Proportioned & aligned like PrimeLicense) */}
              <Link to="/" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
                <img
                  src="/images/logo.png"
                  alt="Logo C2Tech"
                  className="w-9 h-9 rounded-xl object-cover shadow-2xs transition-transform duration-300 group-hover:scale-105 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="font-display font-black text-[21px] text-slate-900 tracking-tight leading-none">
                    C2Tech
                  </span>
                  <span className="text-[10.5px] font-medium text-slate-500 tracking-tight leading-none mt-1">
                    Licenças Digitais
                  </span>
                </div>
              </Link>

              {/* Center: Pill Navigation Bar with Single-Line Items */}
              <nav className="hidden lg:flex items-center bg-[#f4f6f8] rounded-full px-3.5 py-1.5 border border-slate-200/50 gap-1 shrink-0">
                <Link
                  to="/"
                  onMouseEnter={() => setActiveMegaId(null)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
                    location.pathname === '/'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                  }`}
                >
                  <HomeIcon className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                  <span>Início</span>
                </Link>

                {MEGA_MENU_CATEGORIES.map((cat) => {
                  const isCatOpen = activeMegaId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onMouseEnter={() => handleMegaEnter(cat.id)}
                      className="relative shrink-0"
                    >
                      <Link
                        to={`/catalogo?categoria=${encodeURIComponent(cat.categoryFilter)}`}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all ${
                          isCatOpen
                            ? 'bg-white text-[#0b5ed7] shadow-2xs'
                            : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                        }`}
                      >
                        {cat.icon}
                        <span>{cat.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                            isCatOpen ? 'rotate-180 text-[#0b5ed7]' : 'text-slate-500'
                          }`}
                        />
                      </Link>
                    </div>
                  );
                })}
              </nav>

              {/* Right: Search, Contact Icon & Shopping Cart `( 0 )` */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap">
                {/* Desktop Search Form / Toggle */}
                <div className="hidden md:flex items-center">
                  {isDesktopSearchOpen ? (
                    <form onSubmit={handleSearch} className="relative flex items-center">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Buscar software..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => {
                          if (!searchQuery.trim()) setIsDesktopSearchOpen(false);
                        }}
                        className="w-40 lg:w-44 pl-3 pr-8 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-full text-slate-800 focus:outline-none focus:border-[#0b5ed7] focus:bg-white transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-2.5 text-slate-500 hover:text-slate-800 cursor-pointer"
                        aria-label="Pesquisar"
                      >
                        <Search className="w-3.5 h-3.5" />
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsDesktopSearchOpen(true)}
                      className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                      aria-label="Pesquisar"
                      title="Pesquisar softwares"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Mobile Search Button */}
                <button
                  type="button"
                  onClick={() => setIsMobileSearchActive(true)}
                  className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                  aria-label="Pesquisar"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Support / Contact Icon */}
                <Link
                  to="/contato"
                  className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                  title="Central de Atendimento e Suporte"
                >
                  <User className="w-4 h-4" />
                </Link>

                {/* Cart Button `( 0 )` on a single unbroken line */}
                <button
                  type="button"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-full transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  aria-label="Carrinho de compras"
                >
                  <ShoppingCart className="w-4 h-4 shrink-0" />
                  <span className="text-[13px] font-medium text-slate-600 whitespace-nowrap leading-none">
                    ( {cartItems.length} )
                  </span>
                </button>

                {/* Mobile Hamburger Menu Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  aria-label="Menu principal"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* =================================================================== */}
        {/* SMOOTH MEGA-MENU POPUP (Matching Screenshot 1)                      */}
        {/* =================================================================== */}
        <div
          onMouseEnter={() => {
            if (megaCloseTimeoutRef.current) {
              window.clearTimeout(megaCloseTimeoutRef.current);
              megaCloseTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMegaLeave}
          className={`hidden lg:block absolute left-0 right-0 top-full z-50 transition-all duration-250 ease-out origin-top ${
            activeCategoryData
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-1 pb-4">
            {activeCategoryData && (
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-7 grid grid-cols-12 gap-8 text-left">
                {/* Left 6 Columns: Subcategory Lists + "Ver todos >" */}
                <div className="col-span-6 grid grid-cols-2 gap-6 border-r border-slate-100 pr-6">
                  {activeCategoryData.columns.map((col, idx) => (
                    <div key={idx} className="flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-display font-extrabold text-sm text-slate-900">
                          {col.title}
                        </h4>
                        <ul className="space-y-2">
                          {col.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/produto/${item.slug}`}
                                onClick={() => setActiveMegaId(null)}
                                className="text-xs text-slate-600 hover:text-[#0b5ed7] hover:translate-x-0.5 inline-block transition-all font-medium"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-1">
                        <Link
                          to={col.seeAllLink}
                          onClick={() => setActiveMegaId(null)}
                          className="inline-flex items-center gap-0.5 text-xs font-bold text-[#0b5ed7] hover:underline"
                        >
                          <span>Ver todos</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right 6 Columns: 3 Featured Product Boxes with "Economize" badge */}
                <div className="col-span-6 grid grid-cols-3 gap-4 items-start">
                  {activeCategoryData.featuredSlugs.map((slug) => {
                    const prod = products.find((p) => p.slug === slug);
                    if (!prod) return null;
                    const savings = Math.max(0, prod.originalPrice - prod.price);
                    return (
                      <Link
                        key={prod.id}
                        to={`/produto/${prod.slug}`}
                        onClick={() => setActiveMegaId(null)}
                        className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-slate-50 transition-all"
                      >
                        <div className="w-28 h-32 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                          {prod.imageUrl ? (
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-20 h-28 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-xs p-2">
                              {prod.name}
                            </div>
                          )}
                        </div>

                        {savings > 0 && (
                          <span className="inline-block bg-[#d1f4e0] text-[#0f763c] text-[11px] font-extrabold px-2.5 py-1 rounded-md mb-1.5">
                            Economize -{formatPrice(savings)}
                          </span>
                        )}

                        <p className="text-xs font-bold text-slate-800 group-hover:text-[#0b5ed7] transition-colors line-clamp-2 leading-snug">
                          {prod.name}
                        </p>
                        <span className="text-[11px] font-extrabold text-[#0b5ed7] mt-0.5">
                          A partir de {formatPrice(prod.price)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MOBILE DRAWER                                                         */}
      {/* ===================================================================== */}
      <div
        className={`fixed inset-0 top-[100px] z-30 lg:hidden bg-slate-900/30 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 w-4/5 max-w-sm h-[calc(100vh-100px)] bg-white shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-out transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="flex flex-col space-y-3 text-left">
            {/* Drawer Top Header with Logo and Close Button */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img src="/images/logo.png" alt="C2Tech" className="w-7 h-7 rounded-lg object-cover" />
                <span className="font-display font-black text-slate-900 text-lg">C2Tech</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Link
              to="/"
              className="py-2 text-base font-bold text-slate-900 border-b border-slate-100"
            >
              Início
            </Link>
            <Link
              to="/catalogo"
              className="py-2 text-base font-bold text-[#0b5ed7] border-b border-slate-100"
            >
              Ver Todo o Catálogo
            </Link>

            <div className="pt-2 space-y-2">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Categorias
              </p>
              {MEGA_MENU_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/catalogo?categoria=${encodeURIComponent(cat.categoryFilter)}`}
                  className="flex items-center justify-between py-2 text-sm font-semibold text-slate-700 hover:text-[#0b5ed7] border-b border-slate-50"
                >
                  <span className="flex items-center gap-2">
                    {cat.icon}
                    {cat.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              ))}
            </div>

            <div className="pt-3 space-y-2 border-t border-slate-100">
              <Link
                to="/entrega-e-pagamento"
                className="block py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Entrega Imediata & Pagamentos
              </Link>
              <Link
                to="/sobre-nos"
                className="block py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Sobre Nós
              </Link>
              <Link
                to="/contato"
                className="block py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Fale Conosco / Suporte
              </Link>
              <Link
                to="/faq"
                className="block py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                Perguntas Frequentes (FAQ)
              </Link>
            </div>

            <div className="pt-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full py-3 px-4 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp: +55 81 99734-9300
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
