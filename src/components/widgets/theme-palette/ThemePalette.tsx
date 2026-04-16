"use client";

import { Button } from "@arco-design/mobile-react";
import { useEffect, useRef, useState } from "react";
import { createStyles, useTokens } from "@/lib/styles/create-styles";
import { useThemeStore } from "@/stores/theme-store";
import { useThemeTokenOverridesStore } from "@/stores/theme-token-overrides-store";
import { View } from "@/components/adapt";

type NumericTokenKey = "radiusMd" | "radiusLg" | "space12" | "space16" | "fontSizeMd" | "fontSizeLg";
type ColorTokenKey =
  | "colorPrimary"
  | "colorSuccess"
  | "colorWarning"
  | "colorDanger"
  | "colorText"
  | "colorBg";

type BaseColorState = Record<ColorTokenKey, string>;
type BaseColorCssVarMap = Record<ColorTokenKey, string>;

const useStyles = createStyles((t) => ({
  root: {
    marginTop: t.space16,
    background: t.colorCard,
    borderRadius: t.radiusLg,
    border: `1px solid ${t.colorBorder}`,
    boxShadow: t.shadow1,
    overflow: "hidden",
  },
  section: {
    padding: t.space16,
    borderTop: `1px solid ${t.colorBorder}`,
  },
  sectionFirst: {
    padding: t.space16,
  },
  title: {
    margin: 0,
    fontSize: t.fontSizeLg,
    color: t.colorText,
  },
  subTitle: {
    marginTop: t.space8,
    marginBottom: t.space12,
    fontSize: t.fontSizeSm,
    color: t.colorTextSecondary,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1.8rem 1fr auto",
    alignItems: "center",
    gap: t.space8,
    marginBottom: t.space8,
  },
  rowLabel: {
    fontSize: t.fontSizeSm,
    color: t.colorText,
  },
  colorInput: {
    width: "100%",
    height: "0.56rem",
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusMd,
    background: "transparent",
    padding: 0,
  },
  valueText: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
    fontSize: t.fontSizeXs,
    color: t.colorTextSecondary,
    minWidth: 72,
    textAlign: "right",
  },
  rangeInput: {
    width: "100%",
    accentColor: t.colorPrimary,
  },
  swatch: {
    width: "0.4rem",
    height: "0.4rem",
    borderRadius: 999,
    border: `1px solid ${t.colorBorder}`,
  },
  derivedRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: t.space8,
    marginBottom: t.space8,
  },
  derivedValueWrap: {
    display: "flex",
    alignItems: "center",
    gap: t.space8,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: t.space8,
  },
  hint: {
    margin: 0,
    fontSize: t.fontSizeXs,
    color: t.colorTextTertiary,
  },
}));

const NUMERIC_SLIDERS: Array<{
  key: NumericTokenKey;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  { key: "radiusMd", label: "中圆角", min: 6, max: 20, step: 1 },
  { key: "radiusLg", label: "大圆角", min: 8, max: 28, step: 1 },
  { key: "space12", label: "间距 12", min: 8, max: 24, step: 1 },
  { key: "space16", label: "间距 16", min: 10, max: 30, step: 1 },
  { key: "fontSizeMd", label: "字号 Md", min: 12, max: 20, step: 1 },
  { key: "fontSizeLg", label: "字号 Lg", min: 13, max: 24, step: 1 },
];

const BASE_COLOR_CSS_VAR_MAP: BaseColorCssVarMap = {
  colorPrimary: "--token-color-primary",
  colorSuccess: "--token-color-success",
  colorWarning: "--token-color-warning",
  colorDanger: "--token-color-danger",
  colorText: "--token-color-text",
  colorBg: "--token-color-bg",
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "").trim();
  if (normalized.length !== 3 && normalized.length !== 6) {
    return null;
  }
  const full = normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized;
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) {
    return null;
  }
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function mixHex(a: string, b: string, ratio: number) {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  if (!c1 || !c2) {
    return a;
  }
  const p = clamp(ratio, 0, 1);
  return rgbToHex(c1.r + (c2.r - c1.r) * p, c1.g + (c2.g - c1.g) * p, c1.b + (c2.b - c1.b) * p);
}

function withAlpha(hex: string, alpha: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return `rgba(0, 0, 0, ${alpha})`;
  }
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${clamp(alpha, 0, 1).toFixed(2)})`;
}

function tokenLengthToPx(raw: string, fallback: number) {
  const normalized = raw.trim();
  if (normalized.endsWith("rem")) {
    const rem = Number.parseFloat(normalized.slice(0, -3));
    return Number.isFinite(rem) ? rem * 50 : fallback;
  }
  if (normalized.endsWith("px")) {
    const px = Number.parseFloat(normalized.slice(0, -2));
    return Number.isFinite(px) ? px : fallback;
  }
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function pxToRem(px: number) {
  return `${(px / 50).toFixed(4).replace(/\.?0+$/, "")}rem`;
}

function lineHeightToNumber(raw: string, fallback: number) {
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function resolveCssVarValue(cssVarName: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }
  const raw = window.getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  return raw || fallback;
}

function buildDerivedColors(baseColors: BaseColorState, theme: "light" | "dark") {
  const onDark = theme === "dark";
  const primaryHover = mixHex(baseColors.colorPrimary, "#ffffff", onDark ? 0.24 : 0.08);
  const primaryActive = mixHex(baseColors.colorPrimary, onDark ? "#000000" : "#111827", onDark ? 0.22 : 0.18);
  const link = mixHex(baseColors.colorPrimary, "#ffffff", onDark ? 0.2 : 0);
  const textSecondary = mixHex(baseColors.colorText, baseColors.colorBg, onDark ? 0.22 : 0.36);
  const textTertiary = mixHex(baseColors.colorText, baseColors.colorBg, onDark ? 0.45 : 0.6);
  const textInverse = onDark ? "#111111" : "#ffffff";
  const bgSecondary = mixHex(baseColors.colorBg, onDark ? "#ffffff" : "#ffffff", onDark ? 0.06 : 0.8);
  const bgTertiary = mixHex(baseColors.colorBg, onDark ? "#ffffff" : "#111827", onDark ? 0.1 : 0.04);
  const card = mixHex(baseColors.colorBg, onDark ? "#ffffff" : "#ffffff", onDark ? 0.08 : 0.95);
  const border = mixHex(baseColors.colorBg, baseColors.colorText, onDark ? 0.24 : 0.12);
  const borderStrong = mixHex(baseColors.colorBg, baseColors.colorText, onDark ? 0.32 : 0.2);
  const mask = withAlpha(baseColors.colorText, onDark ? 0.56 : 0.28);
  const navBarBg = card;
  const tabBarBg = withAlpha(card, 0.92);
  const pageBg = baseColors.colorBg;
  return {
    colorPrimaryHover: primaryHover,
    colorPrimaryActive: primaryActive,
    colorLink: link,
    colorTextSecondary: textSecondary,
    colorTextTertiary: textTertiary,
    colorTextInverse: textInverse,
    colorBgSecondary: bgSecondary,
    colorBgTertiary: bgTertiary,
    colorCard: card,
    colorMask: mask,
    colorBorder: border,
    colorBorderStrong: borderStrong,
    colorNavBarBg: navBarBg,
    colorTabBarBg: tabBarBg,
    colorPageBg: pageBg,
  };
}

export default function ThemePalette() {
  const styles = useStyles();
  const tokens = useTokens();
  const theme = useThemeStore((s) => s.theme);
  const patchThemeOverrides = useThemeTokenOverridesStore((s) => s.patchThemeOverrides);
  const clearThemeOverrides = useThemeTokenOverridesStore((s) => s.clearThemeOverrides);

  const readBaseColors = (): BaseColorState => ({
    colorPrimary: tokens.colorPrimary,
    colorSuccess: tokens.colorSuccess,
    colorWarning: tokens.colorWarning,
    colorDanger: tokens.colorDanger,
    colorText: tokens.colorText,
    colorBg: tokens.colorBg,
  });

  const readNumericValues = (): Record<NumericTokenKey, number> => ({
    radiusMd: tokenLengthToPx(tokens.radiusMd, 10),
    radiusLg: tokenLengthToPx(tokens.radiusLg, 14),
    space12: tokenLengthToPx(tokens.space12, 12),
    space16: tokenLengthToPx(tokens.space16, 16),
    fontSizeMd: tokenLengthToPx(tokens.fontSizeMd, 14),
    fontSizeLg: tokenLengthToPx(tokens.fontSizeLg, 16),
  });

  const [baseColors, setBaseColors] = useState<BaseColorState>(() => readBaseColors());
  const [numericValues, setNumericValues] = useState<Record<NumericTokenKey, number>>(() => readNumericValues());

  const derivedColors = buildDerivedColors(baseColors, theme);
  const debounceTimerRef = useRef<number | null>(null);

  const scheduleCommitOverrides = (nextBase: BaseColorState, nextNumeric: Record<NumericTokenKey, number>) => {
    if (debounceTimerRef.current) {
      window.clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      patchThemeOverrides(theme, {
        ...nextBase,
        ...buildDerivedColors(nextBase, theme),
        radiusMd: pxToRem(nextNumeric.radiusMd),
        radiusLg: pxToRem(nextNumeric.radiusLg),
        space12: pxToRem(nextNumeric.space12),
        space16: pxToRem(nextNumeric.space16),
        fontSizeMd: pxToRem(nextNumeric.fontSizeMd),
        fontSizeLg: pxToRem(nextNumeric.fontSizeLg),
        lineHeightTight: String(lineHeightToNumber(tokens.lineHeightTight, 1.3)),
        lineHeightNormal: String(lineHeightToNumber(tokens.lineHeightNormal, 1.5)),
        lineHeightLoose: String(lineHeightToNumber(tokens.lineHeightLoose, 1.7)),
      });
    }, 100);
  };

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      const latestOverrides = useThemeTokenOverridesStore.getState().overridesByTheme[theme] ?? {};
      setBaseColors({
        colorPrimary:
          latestOverrides.colorPrimary ??
          resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorPrimary, tokens.colorPrimary),
        colorSuccess:
          latestOverrides.colorSuccess ??
          resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorSuccess, tokens.colorSuccess),
        colorWarning:
          latestOverrides.colorWarning ??
          resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorWarning, tokens.colorWarning),
        colorDanger:
          latestOverrides.colorDanger ??
          resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorDanger, tokens.colorDanger),
        colorText:
          latestOverrides.colorText ??
          resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorText, tokens.colorText),
        colorBg: latestOverrides.colorBg ?? resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorBg, tokens.colorBg),
      });
      setNumericValues({
        radiusMd: tokenLengthToPx(latestOverrides.radiusMd ?? tokens.radiusMd, 10),
        radiusLg: tokenLengthToPx(latestOverrides.radiusLg ?? tokens.radiusLg, 14),
        space12: tokenLengthToPx(latestOverrides.space12 ?? tokens.space12, 12),
        space16: tokenLengthToPx(latestOverrides.space16 ?? tokens.space16, 16),
        fontSizeMd: tokenLengthToPx(latestOverrides.fontSizeMd ?? tokens.fontSizeMd, 14),
        fontSizeLg: tokenLengthToPx(latestOverrides.fontSizeLg ?? tokens.fontSizeLg, 16),
      });
    }, 0);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [
    theme,
    tokens.colorPrimary,
    tokens.colorSuccess,
    tokens.colorWarning,
    tokens.colorDanger,
    tokens.colorText,
    tokens.colorBg,
    tokens.radiusMd,
    tokens.radiusLg,
    tokens.space12,
    tokens.space16,
    tokens.fontSizeMd,
    tokens.fontSizeLg,
  ]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        window.clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <View className={styles.root}>
      <View className={styles.sectionFirst}>
        <h3 className={styles.title}>主题调色板</h3>
        <p className={styles.subTitle}>基础色可手动修改；其余衍生色自动推导，避免逐个调参。</p>
        {(
          [
            ["colorPrimary", "主色"],
            ["colorSuccess", "成功色"],
            ["colorWarning", "警告色"],
            ["colorDanger", "危险色"],
            ["colorText", "正文色"],
            ["colorBg", "背景色"],
          ] as Array<[ColorTokenKey, string]>
        ).map(([key, label]) => (
          <label className={styles.row} key={key}>
            <span className={styles.rowLabel}>{label}</span>
            <input
              className={styles.colorInput}
              type="color"
              value={baseColors[key]}
              onChange={(e) => {
                const nextBase = { ...baseColors, [key]: e.target.value };
                setBaseColors(nextBase);
                scheduleCommitOverrides(nextBase, numericValues);
              }}
            />
            <span className={styles.valueText}>{baseColors[key]}</span>
          </label>
        ))}
      </View>

      <View className={styles.section}>
        <p className={styles.subTitle}>自动推导色值（只读）</p>
        {(Object.entries(derivedColors) as Array<[string, string]>).map(([key, value]) => (
          <View className={styles.derivedRow} key={key}>
            <span className={styles.rowLabel}>{key}</span>
            <View className={styles.derivedValueWrap}>
              <span className={styles.swatch} style={{ background: value }} />
              <span className={styles.valueText}>{value}</span>
            </View>
          </View>
        ))}
      </View>

      <View className={styles.section}>
        <p className={styles.subTitle}>数值类 token（Slider）</p>
        {NUMERIC_SLIDERS.map((item) => (
          <label className={styles.row} key={item.key}>
            <span className={styles.rowLabel}>{item.label}</span>
            <input
              className={styles.rangeInput}
              type="range"
              min={item.min}
              max={item.max}
              step={item.step}
              value={numericValues[item.key]}
              onChange={(e) => {
                const nextNumeric = {
                  ...numericValues,
                  [item.key]: Number.parseFloat(e.target.value),
                };
                setNumericValues(nextNumeric);
                scheduleCommitOverrides(baseColors, nextNumeric);
              }}
            />
            <span className={styles.valueText}>{numericValues[item.key]}px</span>
          </label>
        ))}
      </View>

      <View className={styles.section}>
        <View className={styles.footer}>
          <p className={styles.hint}>当前仅覆盖 {theme} 主题；切换 light/dark 可分别调参。</p>
          <Button
            size="small"
            onClick={() => {
              clearThemeOverrides(theme);
              window.setTimeout(() => {
                setBaseColors({
                  colorPrimary: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorPrimary, tokens.colorPrimary),
                  colorSuccess: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorSuccess, tokens.colorSuccess),
                  colorWarning: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorWarning, tokens.colorWarning),
                  colorDanger: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorDanger, tokens.colorDanger),
                  colorText: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorText, tokens.colorText),
                  colorBg: resolveCssVarValue(BASE_COLOR_CSS_VAR_MAP.colorBg, tokens.colorBg),
                });
                setNumericValues({
                  radiusMd: tokenLengthToPx(tokens.radiusMd, 10),
                  radiusLg: tokenLengthToPx(tokens.radiusLg, 14),
                  space12: tokenLengthToPx(tokens.space12, 12),
                  space16: tokenLengthToPx(tokens.space16, 16),
                  fontSizeMd: tokenLengthToPx(tokens.fontSizeMd, 14),
                  fontSizeLg: tokenLengthToPx(tokens.fontSizeLg, 16),
                });
              }, 0);
            }}
          >
            重置当前主题
          </Button>
        </View>
      </View>
    </View>
  );
}
