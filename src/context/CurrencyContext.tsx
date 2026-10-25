import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyCode = 'BRL' | 'MXN' | 'ARS' | 'CLP' | 'PEN' | 'EUR' | 'MZN';

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
    country: 'Brasil',
    locale: 'pt-BR',
    decimals: 2,
  },
  MXN: {
    code: 'MXN',
    symbol: 'MX$',
    name: 'Peso Mexicano',
    country: 'México',
    locale: 'es-MX',
    decimals: 2,
  },
  ARS: {
    code: 'ARS',
    symbol: 'AR$',
    name: 'Peso Argentino',
    country: 'Argentina',
    locale: 'es-AR',
    decimals: 0,
  },
  CLP: {
    code: 'CLP',
    symbol: 'CLP$',
    name: 'Peso Chileno',
    country: 'Chile',
    locale: 'es-CL',
    decimals: 0,
  },
  PEN: {
    code: 'PEN',
    symbol: 'S/',
    name: 'Sol Peruano',
    country: 'Peru',
    locale: 'es-PE',
    decimals: 2,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    country: 'Portugal',
    locale: 'pt-PT',
    decimals: 2,
  },
  MZN: {
    code: 'MZN',
    symbol: 'MT',
    name: 'Metical Moçambicano',
    country: 'Moçambique',
    locale: 'pt-MZ',
    decimals: 2,
  },
};

// Fallback exchange rates relative to 1 BRL (updated automatically from live API)
const DEFAULT_RATES_FROM_BRL: Record<CurrencyCode, number> = {
  BRL: 1,
  MXN: 3.54,
  ARS: 196.5,
  CLP: 171.8,
  PEN: 0.66,
  EUR: 0.162,
  MZN: 11.15,
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
    const saved = localStorage.getItem('c2tech_currency') as CurrencyCode | null;
    return saved && CURRENCIES[saved] ? saved : 'BRL';
  });

  const [rates, setRates] = useState<Record<CurrencyCode, number>>(DEFAULT_RATES_FROM_BRL);

  useEffect(() => {
    let isMounted = true;
    // Fetch live BRL exchange rates from public open exchange rate API
    fetch('https://open.er-api.com/v6/latest/BRL')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && data.rates) {
          setRates((prev) => ({
            BRL: 1,
            MXN: Number(data.rates.MXN) || prev.MXN,
            ARS: Number(data.rates.ARS) || prev.ARS,
            CLP: Number(data.rates.CLP) || prev.CLP,
            PEN: Number(data.rates.PEN) || prev.PEN,
            EUR: Number(data.rates.EUR) || prev.EUR,
            MZN: Number(data.rates.MZN) || prev.MZN,
          }));
        }
      })
      .catch(() => {
        // Keep fallback rates if offline
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    localStorage.setItem('c2tech_currency', code);
  };

  const convertFromBRL = (amountBRL: number): number => {
    const rate = rates[currency] || 1;
    return amountBRL * rate;
  };

  const formatPrice = (amountBRL: number): string => {
    const info = CURRENCIES[currency] || CURRENCIES.BRL;
    const converted = convertFromBRL(amountBRL);

    if (currency === 'BRL') {
      return converted.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    }

    const formattedNumber = converted.toLocaleString(info.locale, {
      minimumFractionDigits: info.decimals,
      maximumFractionDigits: info.decimals,
    });

    return `${info.symbol} ${formattedNumber}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyInfo: CURRENCIES[currency],
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
