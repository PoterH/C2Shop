import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingCart, Menu, X, Search, ChevronRight, LayoutGrid, FileText, Monitor, PenTool, Clapperboard, Armchair, DraftingCompass, Calculator, Database, Headphones, ShieldCheck, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage, LANGUAGES, type LanguageCode } from '../context/LanguageContext';
import { useCurrency, type CurrencyCode } from '../context/CurrencyContext';
import { useText } from '../hooks/useText';
import { catalogLink } from '../data/catalogNavigation';
import { itemCount } from '../utils/cart';
import { WhatsAppIcon } from './WhatsAppIcon';
const groups = [
  { title:'Microsoft Office & Windows', icon:Monitor },
  { title:'PDF, Virtualização & Dados', icon:Database },
  { title:'Design Gráfico & Vetor', icon:PenTool },
  { title:'Edição de Vídeo & Áudio', icon:Clapperboard },
  { title:'Marcenaria & Móveis Planejados', icon:Armchair },
  { title:'Elétrica, Odonto & Engenharia', icon:Calculator },
  { title:'Modelagem CAD & BIM', icon:DraftingCompass },
  { title:'Cálculo, Estruturas & Render', icon:LayoutGrid },
];
export function MobileNavigation() {
  const [open,setOpen]=useState(false); const [query,setQuery]=useState('');
  const text=useText(); const {language,setLanguage}=useLanguage(); const {currency,setCurrency}=useCurrency();
  const {cartItems,cartAddVersion,setIsCartOpen}=useCart(); const location=useLocation();const navigate=useNavigate();
  const closeRef=useRef<HTMLButtonElement>(null);const menuRef=useRef<HTMLDivElement>(null);const triggerRef=useRef<HTMLButtonElement>(null);
  const count=cartItems.reduce((n,item)=>n+itemCount(item),0);
  const whatsapp='https://wa.me/5581997349300';
  useEffect(()=>{setOpen(false);},[location.pathname,location.search]);
  useEffect(()=>{
    if(!open)return;const overflow=document.body.style.overflow;document.body.style.overflow='hidden';closeRef.current?.focus();
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='Tab'){const els=menuRef.current?.querySelectorAll<HTMLElement>('a[href],button,input,select');if(!els?.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};
    const resize=()=>{if(innerWidth>=1280)setOpen(false);};window.addEventListener('keydown',key);window.addEventListener('resize',resize);
    return()=>{document.body.style.overflow=overflow;window.removeEventListener('keydown',key);window.removeEventListener('resize',resize);triggerRef.current?.focus();};
  },[open]);
  const search=(e:React.FormEvent)=>{e.preventDefault();navigate('/catalogo'+(query.trim()?'?q='+encodeURIComponent(query.trim()):''));setOpen(false);};
  const cart=()=>{setOpen(false);if(location.pathname==='/checkout'||location.pathname==='/carrinho')navigate('/carrinho');else setIsCartOpen(true);};
  const brand=<Link to="/" className="mobile-brand" aria-label="C2Tech"><span className="brand-logo relative"><img src="/images/santa-hat.png" alt="" className="brand-christmas-hat"/><img src="/images/logo.webp" alt="" className="relative z-10 w-9 h-9 rounded-xl"/></span><span><strong>C2Tech</strong><small>{text('Licenças Digitais')}</small></span></Link>;
  return <div className="mobile-navigation xl:hidden">
    <header className="mobile-site-header"><div className="mobile-assurance"><ShieldCheck size={14}/><span>{text('Pagamento seguro • 30 dias de garantia de suporte')}</span></div><div className="mobile-header-row">{brand}<form onSubmit={search} role="search" className="mobile-header-search"><input type="search" aria-label={text('Pesquisar softwares')} placeholder={text('Buscar')} value={query} onChange={e=>setQuery(e.target.value)}/><button aria-label={text('Pesquisar')}><Search size={18}/></button></form><button onClick={cart} aria-label={`${text('Seu carrinho')} (${count})`} className="mobile-header-cart"><span className="relative inline-flex"><ShoppingCart size={23} fill="currentColor" strokeWidth={1.6}/>{count>0&&<span key={cartAddVersion} className="t-badge" data-animate={cartAddVersion>0} aria-hidden="true"><span className="t-badge-dot">{count}</span></span>}</span></button></div></header>
    {open&&<div ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true" aria-label={text('Menu principal')} className="mobile-full-menu"><div className="mobile-menu-top">{brand}<button ref={closeRef} onClick={()=>setOpen(false)} aria-label={text('Fechar menu')}><X size={25}/></button></div><div className="mobile-menu-scroll"><div className="mobile-preferences"><label>{text('Idioma')}<select value={language} onChange={e=>setLanguage(e.target.value as LanguageCode)}>{Object.values(LANGUAGES).map(l=><option key={l.code} value={l.code}>{l.name}</option>)}</select></label><label>{text('Moeda')}<select value={currency} onChange={e=>setCurrency(e.target.value as CurrencyCode)}><option value="BRL">R$ BRL</option><option value="USD">$ USD</option></select></label></div><nav aria-label={text('Categorias')}><Link className="mobile-menu-link" to="/"><Home/><span>{text('Início')}</span><ChevronRight/></Link><Link className="mobile-menu-link" to="/catalogo"><LayoutGrid/><span>{text('Todos os softwares')}</span><ChevronRight/></Link>{groups.map(({title,icon:Icon})=><Link className="mobile-menu-link" key={title} to={catalogLink(title)}><Icon/><span>{text(title)}</span><ChevronRight/></Link>)}</nav><div className="mobile-menu-service"><Link to="/sobre-nos"><Info/>{text('Sobre nós')}</Link><Link to="/entrega-e-pagamento"><ShieldCheck/>{text('Entrega e pagamento')}</Link><Link to="/contato"><Headphones/>{text('Fale conosco')}</Link><Link to="/faq"><FileText/>{text('FAQ / Dúvidas')}</Link></div><a className="mobile-whatsapp-cta" href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon className="w-6 h-6"/><span>WhatsApp<strong>+55 (81) 99734-9300</strong></span><ChevronRight size={20}/></a><p className="mobile-support-hours">{text('Segunda a domingo, das 09:00 às 20:00')}</p></div></div>}
    <nav className="mobile-bottom-nav" aria-label={text('Navegação principal')}><Link to="/" aria-current={location.pathname==='/'?'page':undefined}><Home size={23} fill="currentColor" strokeWidth={1.5}/><span>{text('Início')}</span></Link><button onClick={cart} aria-label={`${text('Carrinho')} (${count})`}><span className="relative"><ShoppingCart size={24} fill="currentColor" strokeWidth={1.5}/>{count>0&&<span key={cartAddVersion} className="t-badge mobile-bottom-cart-badge" data-animate={cartAddVersion>0} aria-hidden="true"><span className="t-badge-dot">{count}</span></span>}</span><span>{text('Carrinho')}</span></button><button ref={triggerRef} onClick={()=>{setIsCartOpen(false);setOpen(!open);}} aria-expanded={open} aria-controls="mobile-menu" className={open?'active':''}><Menu size={25} strokeWidth={2.4}/><span>{text('Menu')}</span></button><a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mobile-whatsapp-link"><WhatsAppIcon className="w-6 h-6"/><span>WhatsApp</span></a></nav>
  </div>;
}
