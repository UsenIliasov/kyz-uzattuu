import { useState, useCallback, useEffect } from 'react';

type Language = 'ru' | 'kg';

const STORAGE_KEY = 'wedding-lang';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as Language) || 'ru';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'ru' ? 'ru' : 'ky';
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ru' ? 'kg' : 'ru'));
  }, []);

  const t = useCallback(
    (ru: string, kg: string) => {
      return language === 'ru' ? ru : kg;
    },
    [language]
  );

  return { language, toggleLanguage, t };
}

export type { Language };
