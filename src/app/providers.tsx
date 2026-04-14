"use client";

import { useEffect, type ReactNode } from "react";
import { EmotionProvider } from "@/lib/styles/EmotionProvider";
import { ThemeHydrator } from "./theme-hydrator";
import setRootPixel from "@arco-design/mobile-react/tools/flexible";
import { ArcoThemeProvider } from "./arco-theme-provider";
import { View } from "@/components/adapt";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
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
          {children}
        </View>
      </ArcoThemeProvider>
    </EmotionProvider>
  );
}
