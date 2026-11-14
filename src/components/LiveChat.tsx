import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

type TawkApi = {
  onBeforeLoad?: () => void;
  onLoad?: () => void;
  onStatusChange?: (status: string) => void;
  onChatMaximized?: () => void;
  onChatMinimized?: () => void;
  onChatMessageAgent?: () => void;
  hideWidget?: () => void;
  showWidget?: () => void;
  maximize?: () => void;
  getStatus?: () => string;
};
declare global {
  interface Window { Tawk_API?: TawkApi; Tawk_LoadStart?: Date; }
}

export function LiveChat() {
  const { language } = useLanguage();
  const [ready, setReady] = useState(false);
  const [opening, setOpening] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState('offline');
  const [unread, setUnread] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const requestedOpen = useRef(false);
  const expandedRef = useRef(false);
  const en = language === 'en';
  const es = language === 'es';
  const label = en ? 'Chat with C2Tech' : es ? 'Habla con C2Tech' : 'Converse com a C2Tech';

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    let loadTimer: ReturnType<typeof setTimeout> | undefined;
    let failureTimer: ReturnType<typeof setTimeout> | undefined;
    let alive = true;
    const api = window.Tawk_API = window.Tawk_API || {};
    const open = () => { api.showWidget?.(); api.maximize?.(); };
    api.onBeforeLoad = () => api.hideWidget?.();
    api.onLoad = () => {
      if (!alive) return;
      clearTimeout(failureTimer);
      setReady(true);
      setOpening(false);
      setFailed(false);
      setStatus(api.getStatus?.() || 'offline');
      api.hideWidget?.();
      if (requestedOpen.current && desktop.matches) open();
    };
    api.onStatusChange = value => { if (alive) setStatus(value); };
    api.onChatMaximized = () => {
      expandedRef.current = true;
      if (alive) { setExpanded(true); setUnread(false); }
    };
    api.onChatMinimized = () => {
      expandedRef.current = false;
      requestedOpen.current = false;
      api.hideWidget?.();
      if (alive) setExpanded(false);
    };
    api.onChatMessageAgent = () => { if (alive && !expandedRef.current) setUnread(true); };
    const load = () => {
      if (!desktop.matches || document.getElementById('c2tech-tawk-script')) return;
      window.Tawk_LoadStart = new Date();
      const script = document.createElement('script');
      script.id = 'c2tech-tawk-script';
      script.async = true;
      script.src = 'https://embed.tawk.to/6af60e6507d0823c4006708c/1k78igfq1';
      script.charset = 'UTF-8';

      script.onerror = () => { if (alive) setFailed(true); };
      document.head.appendChild(script);
      failureTimer = setTimeout(() => { if (alive && !api.maximize) setFailed(true); }, 15000);
    };
    const resize = () => {
      if (desktop.matches) load();
      else { api.hideWidget?.(); expandedRef.current = false; setExpanded(false); }
    };
    if (api.maximize) { setReady(true); setStatus(api.getStatus?.() || 'offline'); }
    loadTimer = setTimeout(load, 1200);
    desktop.addEventListener('change', resize);
    return () => { api.hideWidget?.(); alive = false; clearTimeout(loadTimer); clearTimeout(failureTimer); desktop.removeEventListener('change', resize); };
  }, [attempt]);

  const openChat = () => {
    requestedOpen.current = true;
    setOpening(!ready);
    if (ready) { window.Tawk_API?.showWidget?.(); window.Tawk_API?.maximize?.(); }
    else if (failed) {
      document.getElementById('c2tech-tawk-script')?.remove();
      setFailed(false);
      setAttempt(value => value + 1);
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-30 hidden lg:flex items-center gap-3 ${expanded ? 'invisible pointer-events-none' : ''}`}>
      <div className="rounded-2xl rounded-br-sm bg-white px-4 py-3 shadow-lg border border-blue-100 max-w-56" aria-live="polite">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          {failed ? (en ? 'Click to retry' : es ? 'Haz clic para reintentar' : 'Clique para tentar novamente')
            : opening && !ready ? (en ? 'Loading chat…' : es ? 'Cargando chat…' : 'Carregando atendimento…')
            : unread ? (en ? 'New message' : es ? 'Nuevo mensaje' : 'Você tem uma nova mensagem')
            : status === 'online' ? (en ? 'Our team is online' : es ? 'Nuestro equipo está en línea' : 'Nossa equipe está online')
            : (en ? 'How can we help?' : es ? '¿Cómo podemos ayudarte?' : 'Como podemos ajudar?')}
        </p>
      </div>
      <button type="button" onClick={openChat} aria-label={label} aria-expanded={expanded}
        className="relative w-[76px] h-[76px] rounded-full border-2 border-sky-400 bg-[#05152e] p-0.5 shadow-[0_5px_24px_rgba(0,102,255,0.3)] hover:shadow-[0_7px_30px_rgba(0,102,255,0.45)] hover:-translate-y-1 transition-all motion-reduce:transform-none focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-action-primary cursor-pointer">
        <img src="/images/chat-mascot.webp" alt="" width="192" height="192" className="w-full h-full rounded-full object-cover" />
        {unread ? <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white" />
          : status === 'online' && <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-feedback-success border-2 border-white" />}
      </button>
    </div>
  );
}
