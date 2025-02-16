'use client';

import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import Cookies from 'js-cookie';

const THEME_COOKIE_NAME = 'preferred-theme';

type ThemeState = {
  isDark: boolean;
  isSystemTheme: boolean;
};

type ThemeAction =
  | { type: 'SET_DARK_MODE'; payload: boolean }
  | { type: 'SET_SYSTEM_THEME'; payload: boolean }
  | { type: 'TOGGLE_THEME' };

type ThemeContextType = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  isDark: false,
  isSystemTheme: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_DARK_MODE':
      return {
        ...state,
        isDark: action.payload,
        isSystemTheme: false,
      };
    case 'SET_SYSTEM_THEME':
      return {
        ...state,
        isSystemTheme: action.payload,
      };
    case 'TOGGLE_THEME':
      const newIsDark = !state.isDark;
      Cookies.set(THEME_COOKIE_NAME, newIsDark ? 'dark' : 'light', { expires: 365 });
      return {
        isDark: newIsDark,
        isSystemTheme: false,
      };
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Initialize theme from cookie or system preference
  useEffect(() => {
    const storedTheme = Cookies.get(THEME_COOKIE_NAME);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
      dispatch({ type: 'SET_DARK_MODE', payload: storedTheme === 'dark' });
      dispatch({ type: 'SET_SYSTEM_THEME', payload: false });
    } else {
      dispatch({ type: 'SET_DARK_MODE', payload: systemPrefersDark });
      dispatch({ type: 'SET_SYSTEM_THEME', payload: true });
    }
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (state.isSystemTheme) {
        dispatch({ type: 'SET_DARK_MODE', payload: e.matches });
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [state.isSystemTheme]);

  // Update document class when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.isDark);
  }, [state.isDark]);

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  return (
    <ThemeContext.Provider value={{ state, dispatch, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function withTheme<P extends object>(
  WrappedComponent: React.ComponentType<P & { isDark: boolean; toggleTheme: () => void }>
) {
  return function WithThemeComponent(props: P) {
    const { state: { isDark }, toggleTheme } = useTheme();

    return <WrappedComponent {...props} isDark={isDark} toggleTheme={toggleTheme} />;
  };
}