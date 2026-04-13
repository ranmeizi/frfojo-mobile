"use client";

import { useEffect, useState } from "react";
import { Cell, Switch } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";
import { useThemeStore } from "@/stores/theme-store";

export default function MineAppearance() {
  const sub = useMineSubStyles();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const offHydrate = useThemeStore.persist.onHydrate(() => setHydrated(false));
    const offFinish = useThemeStore.persist.onFinishHydration(() => setHydrated(true));
    const timer = setTimeout(() => {
      if (useThemeStore.persist.hasHydrated()) setHydrated(true);
    }, 0);
    return () => {
      clearTimeout(timer);
      offHydrate();
      offFinish();
    };
  }, []);

  return (
    <View className={sub.pageRoot}>
      <View className={sub.intro}>调整显示方式；主题与 Testing 页共用持久化配置。</View>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Cell label="深色模式" desc="跟随系统或手动" bordered={false}>
          {hydrated ? (
            <Switch
              platform="ios"
              checked={theme === "dark"}
              onClick={(e) => e.stopPropagation()}
              onChange={(next) => setTheme(next ? "dark" : "light")}
            />
          ) : (
            <Switch platform="ios" checked={false} disabled />
          )}
        </Cell>
        <MineDivider />
        <Cell label="字体大小" desc="标准" text="标准" showArrow bordered={false} />
        <MineDivider />
        <Cell label="多语言" text="简体中文" showArrow bordered={false} />
      </Cell.Group>
    </View>
  );
}
