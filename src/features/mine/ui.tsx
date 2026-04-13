"use client";

import type { ReactNode } from "react";
import { Divider } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { useMineSubStyles } from "@/features/mine/sub-styles";

/** 样式见 `style.css` 中 `.mine-cell-scope .mine-cell-divider`（覆盖 Arco rem padding） */
export function MineDivider() {
  return <Divider className="mine-cell-divider" />;
}

export function MineSectionLabel({ children, first }: { children: ReactNode; first?: boolean }) {
  const s = useMineSubStyles();
  return (
    <View className={first ? `${s.sectionLabel} ${s.sectionLabelFirst}` : s.sectionLabel}>{children}</View>
  );
}

export function MineListIconSlot({ children }: { children: ReactNode }) {
  const s = useMineSubStyles();
  return <View className={s.listIconWrap}>{children}</View>;
}
