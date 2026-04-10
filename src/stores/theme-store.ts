"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "frfojo-theme";
const ARCO_DARK_CLASS = "arco-theme-dark";

/** 无 window / localStorage 时（Node 预渲染、静态导出）仍须返回可用 storage，否则 persist 中间件不会挂载 `api.persist`，会拖垮 ThemeHydrator 等。 */
function getThemePersistStorage(): Storage {
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

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }
  const fromDom = document.documentElement.dataset.theme;
  if (fromDom === "dark" || fromDom === "light") {
    return fromDom;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: ThemeMode) {
  if (typeof window === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const enableDark = theme === "dark";
  document.documentElement.classList.toggle(ARCO_DARK_CLASS, enableDark);
  document.body?.classList.toggle(ARCO_DARK_CLASS, enableDark);
}

type ThemeStore = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === "light" ? "dark" : "light";
        applyTheme(next);
        set({ theme: next });
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(getThemePersistStorage),
      partialize: (state) => ({ theme: state.theme }),
      skipHydration: true,
    },
  ),
);

