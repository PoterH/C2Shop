import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import {
  type User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string, turnstileToken?: string) => Promise<void>;
  signup: (name: string, email: string, password: string, turnstileToken?: string) => Promise<void>;
  resetPassword: (email: string, turnstileToken?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function mapFirebaseError(errorCode: string): string {
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-mail ou senha incorretos.';
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado. Tente entrar ou recupere sua senha.';
    case 'auth/invalid-email':
      return 'O formato do e-mail é inválido.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Escolha uma senha com pelo menos 6 caracteres.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas sem sucesso. Aguarde alguns instantes e tente novamente.';
    case 'auth/network-request-failed':
      return 'Erro de conexão. Verifique sua internet e tente novamente.';
    default:
      return 'Ocorreu um erro ao processar. Tente novamente.';
  }
}

async function verifyTurnstileToken(token: string, action: string): Promise<void> {
  try {
    const res = await fetch('/api/verify-turnstile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, action }),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      // If server returned error code, check if it's missing secret during development
      if (data.error && data.error.includes('TURNSTILE_SECRET')) {
        console.warn('[Turnstile Dev Note]', data.error);
        return; // Allow local dev proceed if server has not configured secret yet
      }
      throw new Error(data.error || 'Verificação anti-robô falhou. Tente novamente.');
    }
  } catch (err: any) {
    if (err.message && err.message.includes('anti-robô')) {
      throw err;
    }
    // Network or other issue
    console.error('Turnstile verification request error:', err);
    throw new Error('Falha ao validar verificação anti-robô. Verifique sua conexão.');
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, turnstileToken?: string) => {
    if (turnstileToken) {
      await verifyTurnstileToken(turnstileToken, 'login');
    }
    if (!isFirebaseConfigured) {
      throw new Error(
        'As chaves do Firebase Authentication ainda não foram configuradas no arquivo .env.local.'
      );
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      throw new Error(mapFirebaseError(err.code || ''));
    }
  };

  const signup = async (name: string, email: string, password: string, turnstileToken?: string) => {
    if (turnstileToken) {
      await verifyTurnstileToken(turnstileToken, 'signup');
    }
    if (!isFirebaseConfigured) {
      throw new Error(
        'As chaves do Firebase Authentication ainda não foram configuradas no arquivo .env.local.'
      );
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
      }
    } catch (err: any) {
      throw new Error(mapFirebaseError(err.code || ''));
    }
  };

  const resetPassword = async (email: string, turnstileToken?: string) => {
    if (turnstileToken) {
      await verifyTurnstileToken(turnstileToken, 'reset_password');
    }
    if (!isFirebaseConfigured) {
      throw new Error(
        'As chaves do Firebase Authentication ainda não foram configuradas no arquivo .env.local.'
      );
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      throw new Error(mapFirebaseError(err.code || ''));
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured,
      login,
      signup,
      resetPassword,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
