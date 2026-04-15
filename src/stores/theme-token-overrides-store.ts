"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ThemeMode } from "./theme-store";
import { APP_THEME_TOKEN_MAP, type Tokens } from "@/lib/styles/theme-tokens";

const STORAGE_KEY = "frfojo-theme-token-overrides";

export type TokenOverrides = Partial<Tokens>;
type ThemeTokenOverrides = Record<ThemeMode, TokenOverrides>;

const EMPTY_OVERRIDES: ThemeTokenOverrides = {
  light: {},
  dark: {},
};

function getPersistStorage(): Storage {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: () => null,
      get length() {
        return 0;
      },
    } as Storage;
  }
  return window.localStorage;
}

type ThemeTokenOverridesStore = {
  overridesByTheme: ThemeTokenOverrides;
  patchThemeOverrides: (theme: ThemeMode, patch: TokenOverrides) => void;
  clearThemeOverrides: (theme: ThemeMode) => void;
};

export const useThemeTokenOverridesStore = create<ThemeTokenOverridesStore>()(
  persist(
    (set) => ({
      overridesByTheme: EMPTY_OVERRIDES,
      patchThemeOverrides: (theme, patch) =>
        set((state) => ({
          overridesByTheme: {
            ...state.overridesByTheme,
            [theme]: {
              ...state.overridesByTheme[theme],
              ...patch,
            },
          },
        })),
      clearThemeOverrides: (theme) =>
        set((state) => ({
          overridesByTheme: {
            ...state.overridesByTheme,
            [theme]: {},
          },
        })),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(getPersistStorage),
      partialize: (state) => ({ overridesByTheme: state.overridesByTheme }),
      skipHydration: true,
    },
  ),
);

export function getResolvedThemeTokens(theme: ThemeMode, overrides: TokenOverrides): Tokens {
  return {
    ...APP_THEME_TOKEN_MAP[theme],
    ...overrides,
  };
}
