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

export type ThemePreference = "light" | "dark" | "system";

const CYCLE: ThemePreference[] = ["system", "light", "dark"];

type ThemeState = {
  preference: ThemePreference;
  isDark: boolean;
};

type ThemeAction =
  | { type: "HYDRATE"; preference: ThemePreference; isDark: boolean }
  | { type: "SET_RESOLVED"; isDark: boolean }
  | { type: "CYCLE" };

type ThemeContextType = {
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  toggleTheme: () => void;
};

const initialState: ThemeState = {
  preference: "system",
  isDark: true,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function resolveDark(preference: ThemePreference): boolean {
  if (preference === "dark") return true;
  if (preference === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function parsePreference(value: string | undefined): ThemePreference {
  if (value === "light" || value === "dark" || value === "system") return value;
  return "system";
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case "HYDRATE":
      return { preference: action.preference, isDark: action.isDark };
    case "SET_RESOLVED":
      return { ...state, isDark: action.isDark };
    case "CYCLE": {
      const i = CYCLE.indexOf(state.preference);
      const preference = CYCLE[(i + 1) % CYCLE.length]!;
      Cookies.set(THEME_COOKIE_NAME, preference, { expires: 365 });
      return { preference, isDark: resolveDark(preference) };
    }
    default:
      return state;
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  useEffect(() => {
    const preference = parsePreference(Cookies.get(THEME_COOKIE_NAME));
    dispatch({
      type: "HYDRATE",
      preference,
      isDark: resolveDark(preference),
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.isDark);
  }, [state.isDark]);

  useEffect(() => {
    if (state.preference !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () =>
      dispatch({ type: "SET_RESOLVED", isDark: mq.matches });
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [state.preference]);

  const toggleTheme = () => {
    dispatch({ type: "CYCLE" });
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
