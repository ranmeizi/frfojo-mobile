"use client";

import type { ComponentProps, ReactNode } from "react";
import { PullRefresh } from "@arco-design/mobile-react";
import { View } from "./View";

type ArcoPullRefreshProps = ComponentProps<typeof PullRefresh>;

export type PullToRefreshProps = Omit<ArcoPullRefreshProps, "children"> & {
  children: ReactNode;
};

/**
 * Arco `PullRefresh` 封装：下拉刷新由本组件实现，外层页面仍用常规 `ScrollView` 即可。
 * 子节点放在 `PullRefresh` 内容区（内部包一层 `View`）。
 */
export function PullToRefresh({ children, type = "android", ...rest }: PullToRefreshProps) {
  return (
    <PullRefresh type={type} {...rest}>
      <View style={{ height: "100%" }}>{children}</View>
    </PullRefresh>
  );
}
