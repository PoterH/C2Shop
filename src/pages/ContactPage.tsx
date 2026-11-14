import { useText } from '../hooks/useText';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowUpRight, CheckCircle2, Clock, Headphones } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

export const ContactPage: React.FC = () => {
  const localize = useText();
  const [subject, setSubject] = useState('Atendimento ao Cliente / Dúvidas');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappNumber = '5581997349300';
  const whatsappMessage = encodeURIComponent(localize('Olá, vim pela página de Contato da C2Tech e gostaria de atendimento.'));
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) {
      setErrorMsg('Por favor, preencha seu e-mail e sua mensagem.');
      return;
    }

    setIsSending(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/ask-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Cliente (Página de Contato)',
          email: email.trim(),
          phone: phone.trim(),
          question: `[Assunto: ${subject}]\n\n${message.trim()}`,
          productName: `Contato Geral (${subject})`,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success || result.fallbackMailto) {
        throw new Error('Erro no envio via servidor');
      }

      setSentSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      setErrorMsg('Não foi possível enviar sua mensagem. Tente novamente ou fale conosco pelo WhatsApp ou e-mail abaixo.');
    } finally {
      setIsSending(false);
    }
  };


  const fieldClass = 'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-action-primary focus:ring-4 focus:ring-action-primary/20';
  return (
    <div className="pt-28 xl:pt-36 pb-20 bg-white text-slate-900">
      <section className="bg-[#0f212e] px-5 py-12 sm:py-16 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">C2Tech • {localize('Atendimento')}</p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold">{localize('Fale conosco')}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-slate-200">{localize('Conte com a gente para tirar dúvidas e receber suporte técnico. Escolha o melhor canal para você.')}</p>
      </section>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-6 md:grid-cols-2 py-10 sm:py-12">
          <article className="rounded-3xl bg-[#f5f8fa] border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
            <WhatsAppIcon className="mx-auto h-11 w-11 text-[#25b85a]" />
            <h2 className="mt-5 text-2xl font-semibold">WhatsApp</h2>
            <p className="mt-3 text-sm text-slate-600">{localize('Segunda a domingo, das 09:00 às 20:00')}</p>
            <p className="mt-1 text-sm text-slate-500">{localize('Horário de Brasília')}</p>
            <p className="mt-4 text-sm text-slate-600">{localize('Resposta em menos de')} <strong className="text-feedback-success-strong">15 {localize('minutos')}</strong></p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl bg-[#087c48] px-6 py-3 font-semibold text-white hover:bg-emerald-800 transition">{localize('Conversar no WhatsApp')}<ArrowUpRight className="h-4 w-4" /></a>
          </article>
          <article className="rounded-3xl bg-[#f5f8fa] border border-slate-200 p-8 sm:p-10 text-center shadow-sm">
            <Mail className="mx-auto h-11 w-11 text-sky-500" strokeWidth={1.5} />
            <h2 className="mt-5 text-2xl font-semibold">{localize('E-mail')}</h2>
            <p className="mt-3 text-sm text-slate-600">{localize('Segunda a domingo, das 09:00 às 20:00')}</p>
            <p className="mt-1 text-sm text-slate-500">{localize('Horário de Brasília')}</p>
            <p className="mt-4 text-sm text-slate-600">{localize('Resposta em cerca de')} <strong className="text-blue-700">40 {localize('minutos')}</strong></p>
            <a href="#formulario-contato" className="mt-6 inline-flex items-center justify-center gap-3 rounded-xl border border-action-primary px-6 py-3 font-semibold text-blue-700 hover:bg-blue-50 transition">{localize('Escrever uma mensagem')}<ArrowUpRight className="h-4 w-4" /></a>
          </article>
        </div>
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 sm:gap-12 border-t border-slate-200 pt-10">
          <aside>
            <div className="flex items-center gap-3 text-action-primary"><Headphones className="h-6 w-6" /><span className="text-sm font-semibold">{localize('Suporte com solução digital')}</span></div>
            <h2 className="mt-4 text-2xl font-display font-bold">C2Tech Soluções Digitais</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{localize('Distribuidora de serviços de suporte técnico com solução digital.')}</p>
            <p className="mt-2 text-sm text-slate-500">{localize('Atendimento remoto em todo o Brasil.')}</p>
            <div className="mt-7 space-y-5 border-t border-slate-200 pt-6 text-sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-feedback-success-strong"><WhatsAppIcon className="h-5 w-5 shrink-0 text-emerald-600" /><span>+55 (81) 99734-9300</span></a>
              <a href="mailto:c2tech2025@gmail.com" className="flex items-center gap-3 hover:text-action-primary break-all"><Mail className="h-5 w-5 shrink-0 text-action-primary" strokeWidth={1.5} />c2tech2025@gmail.com</a>
              <div className="flex items-start gap-3"><Clock className="h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.5} /><p>{localize('Segunda a domingo, das 09:00 às 20:00')}<span className="block mt-1 text-slate-500">{localize('Horário de Brasília')}</span></p></div>
            </div>
            <p className="mt-7 text-sm leading-relaxed text-slate-500">{localize('Se a dúvida for sobre uma compra, informe o número do pedido na mensagem para facilitar o atendimento.')}</p>
          </aside>
          <section id="formulario-contato" className="scroll-mt-40 rounded-2xl border border-slate-200 p-6 sm:p-8">
            {sentSuccess ? <div role="status" className="py-12 text-center"><CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" /><h2 className="mt-5 text-2xl font-semibold">{localize('Mensagem enviada!')}</h2><p className="mt-3 text-slate-600">{localize('Nossa equipe responderá pelo e-mail informado. Tempo médio de resposta: cerca de 40 minutos durante o atendimento.')}</p><button type="button" onClick={() => setSentSuccess(false)} className="mt-6 text-action-primary font-semibold">{localize('Enviar outra mensagem')}</button></div> :
            <form onSubmit={handleSubmit} className="space-y-5">
              <div><h2 className="text-2xl font-semibold">{localize('Como podemos ajudar?')}</h2><p className="mt-2 text-sm text-slate-500">{localize('Respondemos pelo e-mail que você informar abaixo.')}</p></div>
              <label className="block text-sm font-medium">{localize('Assunto')}<select value={subject} onChange={e=>setSubject(e.target.value)} className={fieldClass+' mt-2'}>{['Atendimento ao Cliente / Dúvidas','Suporte Técnico / Instalação','Reenvio de Link de Download','Pagamentos e Pedidos'].map(s=><option key={s} value={s}>{localize(s)}</option>)}</select></label>
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-sm font-medium">{localize('Seu nome (opcional)')}<input autoComplete="name" maxLength={120} value={name} onChange={e=>setName(e.target.value)} className={fieldClass+' mt-2'} /></label>
                <label className="block text-sm font-medium">{localize('WhatsApp (opcional)')}<input type="tel" autoComplete="tel" maxLength={30} value={phone} onChange={e=>setPhone(e.target.value)} className={fieldClass+' mt-2'} /></label>
              </div>
              <label className="block text-sm font-medium">{localize('Seu e-mail')}<input type="email" required autoComplete="email" maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} className={fieldClass+' mt-2'} /></label>
              <label className="block text-sm font-medium">{localize('Mensagem')}<textarea required rows={5} maxLength={6000} value={message} onChange={e=>setMessage(e.target.value)} placeholder={localize('Descreva sua dúvida ou o que aconteceu.')} className={fieldClass+' mt-2 resize-y'} /></label>
              {errorMsg && <p role="alert" className="rounded-xl bg-rose-50 p-4 text-sm text-rose-700">{localize(errorMsg)}</p>}
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between"><p className="text-xs text-slate-500 leading-relaxed">{localize('Usaremos seus dados para responder à sua solicitação.')} <Link to="/privacidade" className="underline">{localize('Privacidade')}</Link></p><button disabled={isSending} className="shrink-0 rounded-xl bg-action-primary px-6 py-3 text-sm font-semibold text-white hover:bg-action-primary-hover disabled:opacity-60">{localize(isSending?'Enviando...':'Enviar mensagem')}</button></div>
            </form>}
          </section>
        </div>
      </div>
    </div>
  );
};
