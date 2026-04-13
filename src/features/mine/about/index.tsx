"use client";

import { Cell } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { APP_DISPLAY_VERSION } from "@/features/mine/constants";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

export default function MineAbout() {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <View className={sub.aboutHero}>
        <View className={sub.aboutTitle}>Frfojo Mobile</View>
        <View className={sub.aboutVersion}>版本 {APP_DISPLAY_VERSION}</View>
      </View>

      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Cell label="检查更新" text="已是最新" showArrow bordered={false} />
        <MineDivider />
        <Cell label="开源许可" showArrow bordered={false} />
        <MineDivider />
        <Cell label="资质与备案" showArrow bordered={false} />
      </Cell.Group>

      <View className={sub.footerCaption}>© {new Date().getFullYear()} Frfojo. All rights reserved.</View>
    </View>
  );
}
