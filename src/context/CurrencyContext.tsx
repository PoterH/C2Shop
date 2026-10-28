import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'BRL' | 'USD';

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  name: string;
  country: string;
  locale: string;
  decimals: number;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    name: 'Real Brasileiro',
    country: 'Brasil (R$)',
    locale: 'pt-BR',
    decimals: 2,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'Dólar Americano',
    country: 'Global / US ($)',
    locale: 'en-US',
    decimals: 2,
  },
};

// Fallback exchange rate (1 BRL = ~0.18 USD)
const DEFAULT_RATES_FROM_BRL: Record<CurrencyCode, number> = {
  BRL: 1,
  USD: 0.18,
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  currencyInfo: CurrencyInfo;
  rates: Record<CurrencyCode, number>;
  convertFromBRL: (amountBRL: number) => number;
  formatPrice: (amountBRL: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem('c2tech_currency') as CurrencyCode | null;
      if (saved && CURRENCIES[saved]) return saved;
    } catch {}
    return 'BRL';
  });

  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_RATES_FROM_BRL);

  useEffect(() => {
    let isMounted = true;
    // Live BRL -> USD exchange rate from free API
    fetch('https://open.er-api.com/v6/latest/BRL')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.rates && data.rates.USD) {
          const usdRate = Number(data.rates.USD) || 0.18;
          setRates({
            BRL: 1,
            USD: usdRate,
          });
        }
      })
      .catch(() => {
        // Keep fallback rate
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem('c2tech_currency', code);
    } catch {}
  };

  const convertFromBRL = (amountBRL: number): number => {
    const rate = rates[currency] || (currency === 'USD' ? 0.18 : 1);
    return amountBRL * rate;
  };

  const formatPrice = (amountBRL: number): string => {
    if (currency === 'BRL') {
      return amountBRL.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    const rate = rates.USD || 0.18;
    const convertedUSD = amountBRL * rate;
    const formatted = convertedUSD.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return `$ ${formatted}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyInfo: CURRENCIES[currency] || CURRENCIES.BRL,
        rates,
        convertFromBRL,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return ctx;
};
