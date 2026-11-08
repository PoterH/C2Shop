import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useText } from '../hooks/useText';

export function ReviewComment({value, country}: {value: string; country?: string}) {
  const localize = useText();
  const {language} = useLanguage();
  const [showOriginal, setShowOriginal] = useState(false);
  const translated = localize(value);
  const hasTranslation = translated !== value;
  const originalLanguage = country === 'US' ? 'en' : ['ES','MX','AR','CO','CL'].includes(country || '') ? 'es' : country === 'PT' ? 'pt-PT' : 'pt-BR';
  return <>
    <span lang={showOriginal || !hasTranslation ? originalLanguage : language}>{showOriginal ? value : translated}</span>
    {hasTranslation && <button type="button" className="block mt-2 text-[10px] text-slate-500 underline underline-offset-2 hover:text-blue-700" onClick={() => setShowOriginal(current => !current)}>
      {language === 'en' ? (showOriginal ? 'Show translation' : 'Translated · Show original') : language === 'es' ? (showOriginal ? 'Ver traducción' : 'Traducción · Ver original') : (showOriginal ? 'Ver tradução' : 'Tradução · Ver original')}
    </button>}
  </>;
}
