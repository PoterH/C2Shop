import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import {
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  LogOut,
  ShoppingBag,
  ArrowRight,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useText } from '../hooks/useText';

const TURNSTILE_SITE_KEY =
  import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAGD6rbDGimiJot84';

export const AuthPage: React.FC = () => {
  const { user, login, signup, resetPassword, logout, isConfigured } = useAuth();
  const text = useText();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('modo') === 'cadastro' ? 'signup' : 'login';

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const resetTurnstile = () => {
    setTurnstileToken(null);
    try {
      turnstileRef.current?.reset();
    } catch (e) {
      console.warn('Erro ao resetar Turnstile widget:', e);
    }
  };

  const handleModeChange = (newMode: 'login' | 'signup' | 'forgot') => {
    setMode(newMode);
    setErrorMessage('');
    setSuccessMessage('');
    resetTurnstile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (mode === 'signup' && password !== confirmPassword) {
      setErrorMessage('As senhas digitadas não coincidem.');
      return;
    }

    if (mode === 'signup' && password.length < 6) {
      setErrorMessage('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (!turnstileToken) {
      setErrorMessage('Por favor, aguarde a verificação de segurança anti-robô.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password, turnstileToken);
        navigate('/');
      } else if (mode === 'signup') {
        await signup(name, email, password, turnstileToken);
        setSuccessMessage('Conta criada com sucesso! Bem-vindo(a) à C2Tech.');
        setTimeout(() => navigate('/'), 1200);
      } else if (mode === 'forgot') {
        await resetPassword(email, turnstileToken);
        setSuccessMessage(
          'Enviamos as instruções de recuperação para seu e-mail. Verifique sua caixa de entrada e spam.'
        );
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Ocorreu um erro. Tente novamente.');
      resetTurnstile();
    } finally {
      setIsLoading(false);
    }
  };

  // If user is already authenticated, show the account dashboard
  if (user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
        <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-blue-50 text-action-primary flex items-center justify-center mx-auto text-2xl font-bold">
              {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0].toUpperCase()}
            </div>
            <h1 className="text-2xl font-display font-extrabold text-slate-900">
              {text('Minha Conta')}
            </h1>
            <p className="text-sm text-slate-500">
              {user.displayName ? `Olá, ${user.displayName}` : user.email}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-xs sm:text-sm text-slate-600 border border-slate-100">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-700">{text('E-mail cadastrado')}:</span>
              <span className="truncate max-w-[200px]">{user.email}</span>
            </div>
            {user.displayName && (
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="font-semibold text-slate-700">{text('Nome')}:</span>
                <span>{user.displayName}</span>
              </div>
            )}
            <div className="flex justify-between py-1">
              <span className="font-semibold text-slate-700">{text('Status de segurança')}:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ShieldCheck className="w-4 h-4" /> {text('Protegido')}
              </span>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              to="/catalogo"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-action-primary hover:bg-action-primary-hover text-white font-bold rounded-xl transition-colors text-sm shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              {text('Explorar Catálogo de Softwares')}
            </Link>

            <button
              type="button"
              onClick={() => logout()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl transition-colors text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4 text-slate-500" />
              {text('Sair da conta')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[82vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
        {/* Header Branding & Mode Tabs */}
        <div className="bg-[#0a0f1d] p-6 text-white text-center space-y-3 relative overflow-hidden">
          <div className="relative z-10 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center text-blue-400">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-display font-extrabold tracking-tight">
              {mode === 'login' && text('Acesse sua conta C2Tech')}
              {mode === 'signup' && text('Crie sua conta C2Tech')}
              {mode === 'forgot' && text('Recuperar sua senha')}
            </h1>
            <p className="text-xs text-slate-300">
              {mode === 'login' && text('Gerencie suas licenças e pedidos em um só lugar')}
              {mode === 'signup' && text('Cadastre-se para acesso rápido e histórico de compras')}
              {mode === 'forgot' && text('Informe seu e-mail para receber o link de redefinição')}
            </p>
          </div>

          {/* Subtle tech grid background effect */}
          <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />
        </div>

        {/* Tab switchers if not in forgot mode */}
        {mode !== 'forgot' && (
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50/80 text-sm font-semibold">
            <button
              type="button"
              onClick={() => handleModeChange('login')}
              className={`py-3.5 transition-colors border-b-2 cursor-pointer ${
                mode === 'login'
                  ? 'border-action-primary text-action-primary bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {text('Entrar')}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('signup')}
              className={`py-3.5 transition-colors border-b-2 cursor-pointer ${
                mode === 'signup'
                  ? 'border-action-primary text-action-primary bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {text('Criar conta')}
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-5">
          {!isConfigured && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3.5 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Configuração do Firebase</span>
              </div>
              <p className="leading-relaxed">
                As credenciais do Firebase Authentication ainda precisam ser preenchidas no seu arquivo{' '}
                <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[11px] font-mono">.env.local</code>.
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-3 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {text('Nome completo')}
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-action-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                {text('E-mail')}
              </label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@gmail.com"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-action-primary focus:bg-white transition-all"
                />
              </div>
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    {text('Senha')}
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => handleModeChange('forgot')}
                      className="text-xs text-action-primary hover:underline cursor-pointer"
                    >
                      {text('Esqueceu a senha?')}
                    </button>
                  )}
                </div>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-action-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  {text('Confirme sua senha')}
                </label>
                <div className="relative flex items-center">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/70 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-action-primary focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {/* Cloudflare Turnstile anti-bot verification widget */}
            <div className="pt-2 flex flex-col items-center justify-center">
              <Turnstile
                ref={turnstileRef}
                siteKey={TURNSTILE_SITE_KEY}
                onSuccess={(token) => setTurnstileToken(token)}
                onError={() => {
                  setErrorMessage('Erro ao carregar a verificação de segurança Cloudflare.');
                  setTurnstileToken(null);
                }}
                onExpire={() => {
                  setTurnstileToken(null);
                }}
                options={{
                  theme: 'light',
                  action: mode === 'signup' ? 'signup' : mode === 'forgot' ? 'reset_password' : 'login',
                }}
              />
              <span className="text-[10.5px] text-slate-400 flex items-center gap-1 mt-1.5">
                <ShieldCheck className="w-3 h-3 text-emerald-500" />
                {text('Proteção anti-robô verificada por Cloudflare')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-action-primary hover:bg-action-primary-hover text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {mode === 'login' && text('Entrar na conta')}
                    {mode === 'signup' && text('Concluir cadastro')}
                    {mode === 'forgot' && text('Enviar link de recuperação')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode === 'forgot' && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleModeChange('login')}
                className="text-xs text-action-primary font-semibold hover:underline cursor-pointer"
              >
                ← {text('Voltar para o login')}
              </button>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
            <Link to="/termos" className="hover:underline">
              {text('Termos de uso')}
            </Link>
            <span>•</span>
            <Link to="/privacidade" className="hover:underline">
              {text('Privacidade')}
            </Link>
            <span>•</span>
            <Link to="/contato" className="hover:underline flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              {text('Suporte')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
