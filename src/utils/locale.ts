export type LanguageCode = 'pt-BR' | 'es' | 'en' | 'pt-PT';

export function isLanguageCode(value: string | null): value is LanguageCode {
  return value === 'pt-BR' || value === 'en' || value === 'es' || value === 'pt-PT';
}

export function detectLanguage(): LanguageCode {
  try {
    const saved = localStorage.getItem('c2tech_language');
    if (isLanguageCode(saved)) return saved;
  } catch { /* Browser preferences still work when storage is unavailable. */ }

  if (typeof navigator !== 'undefined') {
    for (const preference of navigator.languages?.length ? navigator.languages : [navigator.language]) {
      const language = preference.toLowerCase();
      if (language === 'en' || language.startsWith('en-')) return 'en';
      if (language === 'es' || language.startsWith('es-')) return 'es';
      if (language === 'pt-pt' || language.startsWith('pt-pt-')) return 'pt-PT';
      if (language === 'pt' || language.startsWith('pt-')) return 'pt-BR';
    }
  }
  return 'pt-BR';
}
