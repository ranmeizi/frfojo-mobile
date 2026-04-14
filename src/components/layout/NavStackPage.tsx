"use client";

import type { PropsWithChildren } from "react";
import { ScrollView, View } from "@/components/adapt";
import { AppNavBar } from "@/components/layout/AppNavBar";
import { useTransitionRouter } from "next-view-transitions";

export type NavStackPageProps = PropsWithChildren<{
  title: string;
  /** 为 false 时不包外层 ScrollView，子树自管滚动（如 PullRefresh + ScrollView） */
  scroll?: boolean;
}>;

/** 无底部 Tab 的二级栈页：顶栏返回 + 可滚动内容（与 Example 子栈一致） */
export function NavStackPage({ title, children, scroll = true }: NavStackPageProps) {
  const router = useTransitionRouter();

  return (
    <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <AppNavBar title={title} onClickLeft={() => router.back()} />
      {scroll ? (
        <ScrollView scrollY style={{ flex: 1, height: 0 }}>
          {children}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            height: 0,
            minHeight: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
