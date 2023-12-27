import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export const useTheme = () => {
  const { theme, setTheme, toggleTheme, oppositeTheme } =
    useContext(ThemeContext);

  return { theme, setTheme, toggleTheme, oppositeTheme };
};
