export type TextDictionary = Record<string, string>;
const pending: Partial<Record<'en' | 'es', Promise<TextDictionary>>> = {};
export function loadTextDictionary(language: 'en' | 'es'): Promise<TextDictionary> {
  if (!pending[language]) {
    pending[language] = (language === 'en' ? import('../locales/en.json') : import('../locales/es.json'))
      .then(module => module.default)
      .catch(error => { delete pending[language]; throw error; });
  }
  return pending[language]!;
}
