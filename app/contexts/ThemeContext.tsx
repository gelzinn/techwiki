'use client';

import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import { theme as themeConfig } from '../config/theme';

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

  const toggleTheme = useCallback(
    (t?: ThemeType) => {
      if (typeof window === 'undefined') return defaultTheme;

      const html = document.documentElement;

      const newTheme: ThemeType = t || (theme === 'dark' ? 'light' : 'dark');
      const oldTheme: ThemeType = t ? (t === 'dark' ? 'light' : 'dark') : theme;

      setTheme(newTheme);
      setOppositeTheme(oldTheme);

      localStorage.setItem('theme', newTheme);
      html.classList.replace(oldTheme, newTheme);

      return newTheme;
    },
    [theme],
  );

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    const html = document.documentElement;
    const localTheme = localStorage.getItem('theme') as ThemeType;

    if (localTheme) {
      setTheme(localTheme);
      toggleTheme(localTheme);
    } else {
      const osTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

      setTheme(osTheme);
      setOppositeTheme(osTheme === 'dark' ? 'light' : 'dark');

      localStorage.setItem('theme', osTheme);

      toggleTheme(osTheme);
    }

    if (html.classList.contains('light') || html.classList.contains('dark'))
      return;

    html.classList.add(theme);
  }, [theme, toggleTheme]);

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
