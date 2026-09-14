import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import it from './translations/it.json';
import en from './translations/en.json';

type Language = 'it' | 'en';
type Translations = typeof it; // updated

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = { it, en };

const getNestedValue = (obj: unknown, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Return key if not found
    }
  }
  
  return typeof current === 'string' ? current : path;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('heylucy-language');
      return (saved === 'en' ? 'en' : 'it') as Language;
    }
    return 'it';
  });

  useEffect(() => {
    localStorage.setItem('heylucy-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const timer = useRef<number[]>([]);

  /**
   * Il cambio lingua non e' un salto secco: la pagina si dissolve a onde, il
   * testo viene sostituito **mentre e' sfocata** e poi si rimaterializza.
   *
   * Qui c'e' solo la regia dei tempi; l'animazione sta in `index.css`, agganciata
   * a `data-lingua-fase` sull'elemento radice.
   *
   * ⚠️ Tre casi in cui si salta l'effetto e si cambia e basta:
   *  - stessa lingua, non c'e' niente da cambiare
   *  - `prefers-reduced-motion`: una pagina intera che si sfoca e trema e'
   *    esattamente cio' che quella preferenza chiede di evitare
   *  - sotto i 1024px: su un telefono l'effetto costa caro in resa e si vede
   *    poco, e comunque li' lo switch sta dentro il menu a tutto schermo
   */
  const setLanguage = (lang: Language) => {
    if (lang === language) return;

    const salta =
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia('(max-width: 1023px)').matches;

    if (salta) {
      setLanguageState(lang);
      return;
    }

    timer.current.forEach((id) => window.clearTimeout(id));
    timer.current = [];

    const radice = document.documentElement;
    radice.dataset.linguaFase = 'uscita';

    timer.current.push(
      window.setTimeout(() => {
        setLanguageState(lang);
        radice.dataset.linguaFase = 'entrata';
        timer.current.push(
          window.setTimeout(() => {
            delete radice.dataset.linguaFase;
          }, 620),
        );
      }, 420),
    );
  };

  useEffect(
    () => () => {
      timer.current.forEach((id) => window.clearTimeout(id));
      delete document.documentElement.dataset.linguaFase;
    },
    [],
  );

  const t = (key: string): string => {
    return getNestedValue(translations[language], key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
