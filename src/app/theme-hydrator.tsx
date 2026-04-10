"use client";

import { useEffect, useState } from "react";
import { useThemeStore } from "@/stores/theme-store";

const ARCO_DARK_CLASS = "arco-theme-dark";

export function ThemeHydrator() {
  const theme = useThemeStore((state) => state.theme);
  const [hydrated, setHydrated] = useState(useThemeStore.persist.hasHydrated());

  useEffect(() => {
    const unsubscribeHydrate = useThemeStore.persist.onHydrate(() => {
      setHydrated(false);
    });
    const unsubscribeFinish = useThemeStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });

    useThemeStore.persist.rehydrate();

    return () => {
      unsubscribeHydrate();
      unsubscribeFinish();
    };
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const enableDark = theme === "dark";
    document.documentElement.classList.toggle(ARCO_DARK_CLASS, enableDark);
    document.body?.classList.toggle(ARCO_DARK_CLASS, enableDark);
  }, [hydrated, theme]);

  return null;
}

