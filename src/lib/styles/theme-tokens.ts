export type ThemeName = "light" | "dark";

export type Tokens = {
  // Brand & feedback
  colorPrimary: string;
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorSuccess: string;
  colorWarning: string;
  colorDanger: string;
  colorLink: string;

  // Text
  colorText: string;
  colorTextSecondary: string;
  colorTextTertiary: string;
  colorTextInverse: string;

  // Surface
  colorBg: string;
  colorBgSecondary: string;
  colorBgTertiary: string;
  colorCard: string;
  colorMask: string;

  // Border
  colorBorder: string;
  colorBorderStrong: string;

  // Layout specific
  colorNavBarBg: string;
  colorTabBarBg: string;
  colorPageBg: string;

  // Spacing (mobile-first 4pt scale)
  space2: string;
  space4: string;
  space8: string;
  space12: string;
  space16: string;
  space20: string;
  space24: string;
  space32: string;

  // Radius
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusRound: string;

  // Typography
  fontSizeXs: string;
  fontSizeSm: string;
  fontSizeMd: string;
  fontSizeLg: string;
  fontSizeXl: string;
  lineHeightTight: string;
  lineHeightNormal: string;
  lineHeightLoose: string;

  // Elevation
  shadow1: string;
  shadow2: string;
};

export const APP_THEME_TOKEN_MAP: Record<ThemeName, Tokens> = {
  light: {
    colorPrimary: "var(--token-color-primary)",
    colorPrimaryHover: "var(--token-color-primary-hover)",
    colorPrimaryActive: "var(--token-color-primary-active)",
    colorSuccess: "var(--token-color-success)",
    colorWarning: "var(--token-color-warning)",
    colorDanger: "var(--token-color-danger)",
    colorLink: "var(--token-color-link)",

    colorText: "var(--token-color-text)",
    colorTextSecondary: "var(--token-color-text-secondary)",
    colorTextTertiary: "var(--token-color-text-tertiary)",
    colorTextInverse: "var(--token-color-text-inverse)",

    colorBg: "var(--token-color-bg)",
    colorBgSecondary: "var(--token-color-bg-secondary)",
    colorBgTertiary: "var(--token-color-bg-tertiary)",
    colorCard: "var(--token-color-card)",
    colorMask: "var(--token-color-mask)",

    colorBorder: "var(--token-color-border)",
    colorBorderStrong: "var(--token-color-border-strong)",

    colorNavBarBg: "var(--token-color-navbar-bg)",
    colorTabBarBg: "var(--token-color-tabbar-bg)",
    colorPageBg: "var(--token-color-page-bg)",

    space2: "2px",
    space4: "4px",
    space8: "8px",
    space12: "12px",
    space16: "16px",
    space20: "20px",
    space24: "24px",
    space32: "32px",

    radiusSm: "6px",
    radiusMd: "10px",
    radiusLg: "14px",
    radiusXl: "18px",
    radiusRound: "999px",

    fontSizeXs: "12px",
    fontSizeSm: "13px",
    fontSizeMd: "14px",
    fontSizeLg: "16px",
    fontSizeXl: "18px",
    lineHeightTight: "1.3",
    lineHeightNormal: "1.5",
    lineHeightLoose: "1.7",

    shadow1: "var(--token-shadow-1)",
    shadow2: "var(--token-shadow-2)",
  },
  dark: {
    colorPrimary: "var(--token-color-primary)",
    colorPrimaryHover: "var(--token-color-primary-hover)",
    colorPrimaryActive: "var(--token-color-primary-active)",
    colorSuccess: "var(--token-color-success)",
    colorWarning: "var(--token-color-warning)",
    colorDanger: "var(--token-color-danger)",
    colorLink: "var(--token-color-link)",

    colorText: "var(--token-color-text)",
    colorTextSecondary: "var(--token-color-text-secondary)",
    colorTextTertiary: "var(--token-color-text-tertiary)",
    colorTextInverse: "var(--token-color-text-inverse)",

    colorBg: "var(--token-color-bg)",
    colorBgSecondary: "var(--token-color-bg-secondary)",
    colorBgTertiary: "var(--token-color-bg-tertiary)",
    colorCard: "var(--token-color-card)",
    colorMask: "var(--token-color-mask)",

    colorBorder: "var(--token-color-border)",
    colorBorderStrong: "var(--token-color-border-strong)",

    colorNavBarBg: "var(--token-color-navbar-bg)",
    colorTabBarBg: "var(--token-color-tabbar-bg)",
    colorPageBg: "var(--token-color-page-bg)",

    space2: "2px",
    space4: "4px",
    space8: "8px",
    space12: "12px",
    space16: "16px",
    space20: "20px",
    space24: "24px",
    space32: "32px",

    radiusSm: "6px",
    radiusMd: "10px",
    radiusLg: "14px",
    radiusXl: "18px",
    radiusRound: "999px",

    fontSizeXs: "12px",
    fontSizeSm: "13px",
    fontSizeMd: "14px",
    fontSizeLg: "16px",
    fontSizeXl: "18px",
    lineHeightTight: "1.3",
    lineHeightNormal: "1.5",
    lineHeightLoose: "1.7",

    shadow1: "var(--token-shadow-1)",
    shadow2: "var(--token-shadow-2)",
  },
};

export function getThemeTokens(theme: ThemeName): Tokens {
  return APP_THEME_TOKEN_MAP[theme];
}
