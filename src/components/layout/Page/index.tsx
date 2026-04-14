"use client";

import { View } from "@/components/adapt";
import { KeepAlive } from "@/lib/keepalive/KeepAlive";
import type { PropsWithChildren } from "react";

export type PageProps = PropsWithChildren<{
  /** 是否启用 KeepAlive 缓存（默认关闭） */
  keepAlive?: boolean;
}>;

export function Page({ children, keepAlive = false }: PageProps) {
  return (
    <View className="ffj-page">
      {children}
    </View>
  );
}
