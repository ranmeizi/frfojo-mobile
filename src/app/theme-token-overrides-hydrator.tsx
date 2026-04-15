"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/theme-store";
import { useThemeTokenOverridesStore, type TokenOverrides } from "@/stores/theme-token-overrides-store";

const CSS_VAR_MAP: Partial<Record<keyof TokenOverrides, string>> = {
  colorPrimary: "--token-color-primary",
  colorPrimaryHover: "--token-color-primary-hover",
  colorPrimaryActive: "--token-color-primary-active",
  colorSuccess: "--token-color-success",
  colorWarning: "--token-color-warning",
  colorDanger: "--token-color-danger",
  colorLink: "--token-color-link",
  colorText: "--token-color-text",
  colorTextSecondary: "--token-color-text-secondary",
  colorTextTertiary: "--token-color-text-tertiary",
  colorTextInverse: "--token-color-text-inverse",
  colorBg: "--token-color-bg",
  colorBgSecondary: "--token-color-bg-secondary",
  colorBgTertiary: "--token-color-bg-tertiary",
  colorCard: "--token-color-card",
  colorMask: "--token-color-mask",
  colorBorder: "--token-color-border",
  colorBorderStrong: "--token-color-border-strong",
  colorNavBarBg: "--token-color-navbar-bg",
  colorTabBarBg: "--token-color-tabbar-bg",
  colorPageBg: "--token-color-page-bg",
  shadow1: "--token-shadow-1",
  shadow2: "--token-shadow-2",
};

export function ThemeTokenOverridesHydrator() {
  const theme = useThemeStore((state) => state.theme);
  const overrides = useThemeTokenOverridesStore((state) => state.overridesByTheme[theme] ?? {});

  useEffect(() => {
    const rootStyle = document.documentElement.style;

    Object.values(CSS_VAR_MAP).forEach((cssVar) => {
      if (!cssVar) {
        return;
      }
      rootStyle.removeProperty(cssVar);
    });

    (Object.keys(overrides) as (keyof TokenOverrides)[]).forEach((tokenKey) => {
      const cssVar = CSS_VAR_MAP[tokenKey];
      const tokenValue = overrides[tokenKey];
      if (!cssVar || !tokenValue) {
        return;
      }
      rootStyle.setProperty(cssVar, tokenValue);
    });
  }, [overrides]);

  return null;
}
