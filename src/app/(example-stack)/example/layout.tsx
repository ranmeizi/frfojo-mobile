import type { ReactNode } from "react";
import { Page } from "@/components/layout/Page";

/**
 * Example 子页栈：与 (tab-views) 分离，无底部 TabBar；二级页用 ExampleSubPage（内部为 NavStackPage + AppNavBar）。
 */
export default function ExampleStackLayout({ children }: { children: ReactNode }) {
  return <Page>{children}</Page>;
}
