import { useLanguage } from '../context/LanguageContext';

export function useText() {
  return useLanguage().text;
}
