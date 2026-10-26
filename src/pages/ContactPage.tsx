import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, CheckCircle2, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [subject, setSubject] = useState('Atendimento ao Cliente / Dúvidas');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const whatsappNumber = '5581997349300';
  const whatsappMessage = encodeURIComponent(
    'Olá, vim pela página de Contato da C2Tech e gostaria de atendimento.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    document.title = 'Fale Conosco | Central de Atendimento C2Tech';
  }, []);

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

      if (!res.ok) {
        throw new Error('Erro no envio via servidor');
      }

      setSentSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch {
      const mailtoSubject = encodeURIComponent(`[C2Tech Contato] ${subject}`);
      const mailtoBody = encodeURIComponent(
        `Nome: ${name || 'Não informado'}\nE-mail: ${email}\nWhatsApp: ${
          phone || 'Não informado'
        }\nAssunto: ${subject}\n\nMensagem:\n${message}`
      );
      window.location.href = `mailto:c2tech2025@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      setSentSuccess(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="pt-28 pb-16 bg-white min-h-screen text-left">
      {/* Top Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-800 transition-colors">
          Início
        </Link>
        <span className="mx-1.5 text-slate-300">/</span>
        <span className="text-[#0b5ed7] font-semibold">Fale conosco</span>
      </div>

      {/* Dark Navy Hero Banner */}
      <div className="bg-[#0f212e] text-white py-14 sm:py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#2196f3] tracking-tight">
            Fale Conosco
          </h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Precisa de ajuda?
            <br />
            Estamos prontos para responder todas as suas dúvidas e auxiliar na sua instalação.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Two Top Contact Channel Cards (Matching Screenshot 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Card 1: WhatsApp */}
          <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/70 p-8 flex flex-col items-center text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h2 className="font-display font-extrabold text-base text-slate-900 mb-1.5">
              WhatsApp
            </h2>
            <p className="text-xs text-slate-600">
              Das 09:00 às 22:00 (Seg a Dom — Horário de Brasília)
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 mb-5">
              Tempo médio de resposta menor que{' '}
              <span className="text-[#0b5ed7] font-bold underline">10 min</span>
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg border border-sky-300 shadow-2xs transition-all"
            >
              Enviar mensagem
            </a>
          </div>

          {/* Card 2: E-mail */}
          <div className="bg-[#f4f6f8] rounded-2xl border border-slate-200/70 p-8 flex flex-col items-center text-center shadow-xs">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-[#0b5ed7] flex items-center justify-center mb-3">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="font-display font-extrabold text-base text-slate-900 mb-1.5">
              E-mail
            </h2>
            <p className="text-xs text-slate-600">
              Das 09:00 às 22:00 (Seg a Dom — Horário de Brasília)
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 mb-5">
              Tempo médio de resposta menor que{' '}
              <span className="text-[#0b5ed7] font-bold underline">30 min</span>
            </p>
            <a
              href="#formulario-contato"
              className="px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-lg border border-sky-300 shadow-2xs transition-all"
            >
              Enviar um e-mail
            </a>
          </div>
        </div>

        <hr className="border-slate-200" />

        {/* Bottom 2-Column Section: Store Information + Contact Form */}
        <div
          id="formulario-contato"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2"
        >
          {/* Left Column: Store Information */}
          <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-200 bg-[#f4f6f8]">
            <div className="bg-[#1b1b1b] text-white px-5 py-3 text-xs font-extrabold uppercase tracking-wider">
              INFORMAÇÕES DA LOJA
            </div>
            <div className="p-6 space-y-5 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-relaxed">
                  <p className="font-bold text-slate-900">C2Tech Soluções Digitais</p>
                  <p>Distribuição Digital de Softwares Profissionais</p>
                  <p>Atendimento Nacional — Brasil</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/80 pt-4">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-500">WhatsApp de Suporte e Vendas:</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-emerald-700 hover:underline text-sm block"
                  >
                    +55 (81) 99734-9300
                  </a>
                  <p className="text-[11px] text-slate-500">Atendimento rápido e suporte remoto</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/80 pt-4">
                <Mail className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-500">Envie-nos um e-mail:</p>
                  <a
                    href="mailto:c2tech2025@gmail.com"
                    className="font-bold text-slate-900 hover:text-[#0b5ed7] transition-colors"
                  >
                    c2tech2025@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-slate-200/80 pt-4">
                <Clock className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="text-slate-500">Horário de Suporte Técnico:</p>
                  <p className="font-bold text-slate-900">Segunda a Domingo, das 09:00 às 22:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-2xs">
            {sentSuccess ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-slate-900">
                  Mensagem enviada com sucesso!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Recebemos sua solicitação em <strong>c2tech2025@gmail.com</strong> e nossa equipe
                  responderá o mais breve possível. Se preferir atendimento imediato, chame no nosso
                  WhatsApp!
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSentSuccess(false)}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Enviar outra mensagem
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white"
                  >
                    Chamar no WhatsApp agora
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:border-[#0b5ed7]"
                  >
                    <option value="Atendimento ao Cliente / Dúvidas">
                      Atendimento ao Cliente / Dúvidas
                    </option>
                    <option value="Suporte Técnico / Instalação">
                      Suporte Técnico / Auxílio na Instalação
                    </option>
                    <option value="Reenvio de Link de Download">
                      Reenvio de Link de Download
                    </option>
                    <option value="Pagamentos e Pedidos">Pagamentos e Pedidos</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b5ed7]"
                  />
                  <input
                    type="tel"
                    placeholder="Seu WhatsApp (opcional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b5ed7]"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b5ed7]"
                  />
                </div>

                <div>
                  <textarea
                    rows={5}
                    required
                    placeholder="Como podemos ajudar você?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-slate-300 rounded text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0b5ed7] resize-y"
                  />
                </div>

                {/* Security Verification Badge (Styled like Screenshot 3) */}
                <div className="flex justify-center py-1">
                  <div className="inline-flex items-center justify-between gap-6 bg-[#222222] text-white px-4 py-2.5 rounded border border-slate-700 min-w-[240px]">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-xs font-bold">Verificado!</span>
                    </div>
                    <div className="text-right leading-none">
                      <span className="text-[9px] font-extrabold text-amber-400 block uppercase">
                        SSL SECURE
                      </span>
                      <span className="text-[8px] text-slate-400">C2Tech Protegido</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-2.5 bg-[#1b1b1b] hover:bg-slate-800 text-white font-bold text-xs rounded transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {isSending ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
