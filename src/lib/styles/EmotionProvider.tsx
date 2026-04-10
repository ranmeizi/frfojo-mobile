"use client";

import { Fragment, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { emotionCache } from "./emotion-css";

type EmotionProviderProps = {
  children: ReactNode;
};

export function EmotionProvider({ children }: EmotionProviderProps) {
  useServerInsertedHTML(() => {
    const entries = Object.entries(emotionCache.inserted).filter(
      ([, value]) => typeof value === "string",
    );
    if (entries.length === 0) {
      return null;
    }

    const names = entries.map(([name]) => name).join(" ");
    const styles = entries.map(([, value]) => value as string).join("");

    return (
      <style
        data-emotion={`${emotionCache.key} ${names}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    );
  });

  return <Fragment>{children}</Fragment>;
}

