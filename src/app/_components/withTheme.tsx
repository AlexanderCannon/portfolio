"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";

const THEME_COOKIE_NAME = "preferred-theme";

type ThemeState = {
  isDark: boolean;
};

type ThemeAction =
  | { type: "SET_DARK_MODE"; payload: boolean }
  | { type: "TOGGLE_THEME" };

type ThemeContextType = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  isDark: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "SET_DARK_MODE":
      return { isDark: action.payload };
    case "TOGGLE_THEME": {
      const newIsDark = !state.isDark;
      Cookies.set(THEME_COOKIE_NAME, newIsDark ? "dark" : "light", {
        expires: 365,
      });
      return { isDark: newIsDark };
    }
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const storedTheme = Cookies.get(THEME_COOKIE_NAME);
    // Default dark when no preference is stored.
    dispatch({
      type: "SET_DARK_MODE",
      payload: storedTheme ? storedTheme === "dark" : true,
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.isDark);
  }, [state.isDark]);

  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
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
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
