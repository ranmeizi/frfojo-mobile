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

    space2: "0.04rem",
    space4: "0.08rem",
    space8: "0.16rem",
    space12: "0.24rem",
    space16: "0.32rem",
    space20: "0.4rem",
    space24: "0.48rem",
    space32: "0.64rem",

    radiusSm: "0.12rem",
    radiusMd: "0.2rem",
    radiusLg: "0.28rem",
    radiusXl: "0.36rem",
    radiusRound: "19.98rem",

    fontSizeXs: "0.24rem",
    fontSizeSm: "0.26rem",
    fontSizeMd: "0.28rem",
    fontSizeLg: "0.32rem",
    fontSizeXl: "0.36rem",
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

    space2: "0.04rem",
    space4: "0.08rem",
    space8: "0.16rem",
    space12: "0.24rem",
    space16: "0.32rem",
    space20: "0.4rem",
    space24: "0.48rem",
    space32: "0.64rem",

    radiusSm: "0.12rem",
    radiusMd: "0.2rem",
    radiusLg: "0.28rem",
    radiusXl: "0.36rem",
    radiusRound: "19.98rem",

    fontSizeXs: "0.24rem",
    fontSizeSm: "0.26rem",
    fontSizeMd: "0.28rem",
    fontSizeLg: "0.32rem",
    fontSizeXl: "0.36rem",
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
