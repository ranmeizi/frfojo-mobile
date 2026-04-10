"use client";

import { useThemeStore } from "@/stores/theme-store";
import { getThemeTokens, type Tokens } from "./theme-tokens";
import { css } from "./emotion-css";

export type { Tokens } from "./theme-tokens";

type StylesRecord = Record<string, Parameters<typeof css>[0]>;

export function createStyles<T extends StylesRecord>(
  factory: (t: Tokens) => T,
) {
  return function useStyles(): { [K in keyof T]: string } {
    const theme = useThemeStore((state) => state.theme);
    const styles = factory(getThemeTokens(theme));
    const result = {} as { [K in keyof T]: string };
    (Object.keys(styles) as (keyof T)[]).forEach((key) => {
      result[key] = css(styles[key]);
    });
    return result;
  };
}

export function useTokens(): Tokens {
  const theme = useThemeStore((state) => state.theme);
  return getThemeTokens(theme);
}

