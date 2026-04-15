"use client";

import { useThemeStore } from "@/stores/theme-store";
import { type Tokens } from "./theme-tokens";
import { css } from "./emotion-css";
import { getResolvedThemeTokens, useThemeTokenOverridesStore } from "@/stores/theme-token-overrides-store";

export type { Tokens } from "./theme-tokens";

type StylesRecord = Record<string, Parameters<typeof css>[0]>;

export function createStyles<T extends StylesRecord>(
  factory: (t: Tokens) => T,
) {
  return function useStyles(): { [K in keyof T]: string } {
    const theme = useThemeStore((state) => state.theme);
    const overrides = useThemeTokenOverridesStore((state) => state.overridesByTheme[theme] ?? {});
    const styles = factory(getResolvedThemeTokens(theme, overrides));
    const result = {} as { [K in keyof T]: string };
    (Object.keys(styles) as (keyof T)[]).forEach((key) => {
      result[key] = css(styles[key]);
    });
    return result;
  };
}

export function useTokens(): Tokens {
  const theme = useThemeStore((state) => state.theme);
  const overrides = useThemeTokenOverridesStore((state) => state.overridesByTheme[theme] ?? {});
  return getResolvedThemeTokens(theme, overrides);
}

