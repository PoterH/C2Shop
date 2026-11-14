import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useText } from '../hooks/useText';

export function MobileSearchEntry() {
 const navigate=useNavigate();const location=useLocation();
 useEffect(()=>{
  const open=(event:Event)=>{
   if(!window.matchMedia('(max-width:1279px)').matches||location.pathname==='/buscar')return;
   const target=event.target as Element;
   const field=target.closest('input[type="search"],form[role="search"],.mobile-header-search,.home-hero form,#hero-software-search');
   if(!field)return;
   event.preventDefault();
   const input=field instanceof HTMLInputElement?field:field.querySelector('input');
   (document.activeElement as HTMLElement)?.blur();
   navigate('/buscar',{state:{from:location.pathname+location.search,query:input?.value||''}});
  };
  document.addEventListener('pointerdown',open,true);document.addEventListener('focusin',open,true);
  return()=>{document.removeEventListener('pointerdown',open,true);document.removeEventListener('focusin',open,true);};
 },[navigate,location]);
 return null;
}
export function MobileSearchPage(){
 const text=useText();const navigate=useNavigate();const location=useLocation();const input=useRef<HTMLInputElement>(null);
 const [query,setQuery]=useState((location.state as {query?:string})?.query||'');
 const close=()=>navigate((location.state as {from?:string})?.from||'/',{replace:true});
 useEffect(()=>{input.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[]);
 return <section className="mobile-search-page" aria-label={text('Pesquisar softwares')}><div className="mobile-search-close-row"><button onClick={close} aria-label={text('Fechar pesquisa')}><X size={27}/></button></div><form role="search" onSubmit={e=>{e.preventDefault();navigate('/catalogo'+(query.trim()?'?q='+encodeURIComponent(query.trim()):''),{replace:true});}}><input ref={input} type="search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={text('Pesquisar no catálogo')} aria-label={text('Pesquisar softwares')} autoComplete="off" enterKeyHint="search"/><button type="submit" aria-label={text('Pesquisar')}><Search size={23}/></button></form></section>;
}
