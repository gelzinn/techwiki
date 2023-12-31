'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';

import { theme as themeConfig } from '@/config/theme';
import { storage } from '@/config/storage';

const defaultTheme = themeConfig.defaultTheme as ThemeType;

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  setTheme: (t: ThemeType) => void;
  toggleTheme: (t?: ThemeType) => ThemeType;
  oppositeTheme: ThemeType;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as ThemeContextType);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);
  const [oppositeTheme, setOppositeTheme] = useState<ThemeType>(
    defaultTheme === 'dark' ? 'light' : 'dark',
  );

  const key = storage.keys.theme;

  const toggleTheme = useCallback(
    (t?: ThemeType) => {
      if (typeof window === 'undefined') return defaultTheme;

      const html = document.documentElement;

      const newTheme: ThemeType = t || (theme === 'dark' ? 'light' : 'dark');
      const oldTheme: ThemeType = t ? (t === 'dark' ? 'light' : 'dark') : theme;

      setTheme(newTheme);
      setOppositeTheme(oldTheme);

      localStorage.setItem(key, newTheme);
      html.classList.replace(oldTheme, newTheme);

      return newTheme;
    },
    [theme, key],
  );

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const localTheme = localStorage.getItem(key) as ThemeType;

    if (localTheme) {
      setTheme(localTheme);
      toggleTheme(localTheme);
    } else {
      const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      setTheme(osTheme);
      setOppositeTheme(osTheme === 'dark' ? 'light' : 'dark');

      localStorage.setItem(key, osTheme);

      toggleTheme(osTheme);
    }

    if (html.classList.contains('light') || html.classList.contains('dark'))
      return;

    html.classList.add(theme);
  }, [theme, toggleTheme, key]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        oppositeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
