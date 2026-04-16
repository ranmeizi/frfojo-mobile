"use client";

import { PropsWithChildren } from "react";
import { createRoot } from "react-dom/client";
import { ContextProvider } from "@arco-design/mobile-react";
import { useThemeStore } from "@/stores/theme-store";
import type { ThemeMode } from "@/stores/theme-store";

const ARCO_THEME_TOKEN_BRIDGE: Record<string, string> = {
  "primary-color": "var(--token-color-primary)",
  "success-color": "var(--token-color-success)",
  "warning-color": "var(--token-color-warning)",
  "danger-color": "var(--token-color-danger)",
  "link-color": "var(--token-color-link)",
  "text-color": "var(--token-color-text)",
  "text-color-1": "var(--token-color-text)",
  "text-color-2": "var(--token-color-text-secondary)",
  "text-color-3": "var(--token-color-text-tertiary)",
  "line-color": "var(--token-color-border)",
  "line-color-2": "var(--token-color-border-strong)",
  "fill-color-1": "var(--token-color-card)",
  "fill-color-2": "var(--token-color-bg-tertiary)",
  "bg-color": "var(--token-color-bg)",
  "mask-bg": "var(--token-color-mask)",
  "font-size-body": "0.28rem",
  "radius-medium": "0.2rem",
  "radius-large": "0.28rem",
};

const ARCO_THEME_MAP: Record<ThemeMode, Record<string, string>> = {
  light: ARCO_THEME_TOKEN_BRIDGE,
  dark: ARCO_THEME_TOKEN_BRIDGE,
};

export function ArcoThemeProvider({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ContextProvider
      system="ios"
      isDarkMode={theme === "dark"}
      darkModeSelector="arco-theme-dark"
      theme={ARCO_THEME_MAP[theme]}
      createRoot={createRoot}
    >
      {children}
    </ContextProvider>
  );
}
