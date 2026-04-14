"use client";

import { useEffect, type ReactNode } from "react";
import { EmotionProvider } from "@/lib/styles/EmotionProvider";
import { ThemeHydrator } from "./theme-hydrator";
import setRootPixel from "@arco-design/mobile-react/tools/flexible";
import { ArcoThemeProvider } from "./arco-theme-provider";
import { View } from "@/components/adapt";
import { KeepAliveProvider } from "@/lib/keepalive/KeepAliveProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  /** KeepAlive 在内部时不会因缓存卸载本层，flexible 可安全挂在此处 */
  useEffect(() => {
    const remove = setRootPixel();
    return remove;
  }, []);

  return (
    <EmotionProvider>
      <ArcoThemeProvider>
        <ThemeHydrator />
        <View
          style={{
            flex: 1,
            height: "100dvh",
            width: "100vw",
            overflow: "hidden",
            zIndex: "300",
          }}
        >
          <KeepAliveProvider>{children}</KeepAliveProvider>
        </View>
      </ArcoThemeProvider>
    </EmotionProvider>
  );
}
