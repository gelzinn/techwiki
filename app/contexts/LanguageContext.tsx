'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';

import { supportedLanguages, defaultLanguage } from '@/config/language';
import { storage } from '@/config/storage';

const default_language = defaultLanguage;

type TLanguage = (typeof supportedLanguages)[number];

type LanguageContextType = {
  language: TLanguage;
  setLanguage: (language: TLanguage) => void;
};

export const LanguageContext = createContext({} as LanguageContextType);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<TLanguage>(default_language);

  const key = storage.keys.language;

  const setLanguageToLocalStorage = (selected_language: TLanguage) => {
    localStorage.setItem(key, JSON.stringify(selected_language));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    setLanguageToLocalStorage(language);
  }, [language]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const setUILanguage = () => {
      const localLanguage = JSON.parse(localStorage.getItem(key) || 'null');

      if (
        localLanguage &&
        supportedLanguages.includes(localLanguage as TLanguage)
      )
        return setLanguage(localLanguage as TLanguage);

      const osLanguage = navigator.language.split('-')[0];

      const newLanguage: TLanguage | undefined = supportedLanguages.find(
        (language) => {
          return language.locale.split('-')[0] === osLanguage;
        },
      );

      if (newLanguage) setLanguage(newLanguage);
      else setLanguage(default_language);
    };

    setUILanguage();

    window.addEventListener('storage', setUILanguage);
    return () => window.removeEventListener('storage', setUILanguage);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
