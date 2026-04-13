"use client";

import type { ComponentProps } from "react";
import { NavStackPage } from "@/components/layout/NavStackPage";

type ExampleSubPageProps = ComponentProps<typeof NavStackPage>;

/** Example 深层子路由：顶栏 + 可滚动内容区（无 TabBar，由 (example-stack) 路由组承载） */
export function ExampleSubPage(props: ExampleSubPageProps) {
  return <NavStackPage {...props} />;
}
