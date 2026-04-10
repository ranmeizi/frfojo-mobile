"use client";

import { PropsWithChildren } from "react";
import { ContextProvider } from "@arco-design/mobile-react";
import { useThemeStore } from "@/stores/theme-store";
import type { ThemeMode } from "@/stores/theme-store";

const ARCO_THEME_MAP: Record<ThemeMode, Record<string, string>> = {
  light: {
    "primary-color": "#2563eb",
    "success-color": "#16a34a",
    "warning-color": "#d97706",
    "danger-color": "#dc2626",
    "link-color": "#2563eb",
    "text-color": "#111827",
    "text-color-1": "#111827",
    "text-color-2": "#4b5563",
    "text-color-3": "#9ca3af",
    "line-color": "#e5e7eb",
    "line-color-2": "#d1d5db",
    "fill-color-1": "#ffffff",
    "fill-color-2": "#f9fafb",
    "bg-color": "#f3f4f6",
    "mask-bg": "rgba(17, 24, 39, 0.45)",
    "font-size-body": "14px",
    "radius-medium": "10px",
    "radius-large": "14px",
  },
  dark: {
    "primary-color": "#60a5fa",
    "success-color": "#4ade80",
    "warning-color": "#fbbf24",
    "danger-color": "#f87171",
    "link-color": "#93c5fd",
    "text-color": "#f3f4f6",
    "text-color-1": "#f3f4f6",
    "text-color-2": "#d1d5db",
    "text-color-3": "#9ca3af",
    "line-color": "#273449",
    "line-color-2": "#334155",
    "fill-color-1": "#111827",
    "fill-color-2": "#1a2438",
    "bg-color": "#0b1020",
    "mask-bg": "rgba(2, 6, 23, 0.65)",
    "font-size-body": "14px",
    "radius-medium": "10px",
    "radius-large": "14px",
  },
};

export function ArcoThemeProvider({ children }: PropsWithChildren) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ContextProvider
      system="ios"
      isDarkMode={theme === "dark"}
      darkModeSelector="arco-theme-dark"
      theme={ARCO_THEME_MAP[theme]}
    >
      {children}
    </ContextProvider>
  );
}
