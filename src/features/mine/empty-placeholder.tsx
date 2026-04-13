"use client";

import { View } from "@/components/adapt";
import { useMineSubStyles } from "@/features/mine/sub-styles";

type EmptyPlaceholderProps = {
  title: string;
  hint?: string;
};

export function EmptyPlaceholder({ title, hint = "功能开发中，敬请期待" }: EmptyPlaceholderProps) {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <View className={sub.emptyWrap}>
        <View className={sub.emptyTitle}>{title}</View>
        <View className={sub.emptyDesc}>{hint}</View>
      </View>
    </View>
  );
}
