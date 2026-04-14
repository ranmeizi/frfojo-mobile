import type { ReactNode } from "react";

/**
 * 「我的」子页栈：与 (tab-views) 分离，无底部 TabBar；各页用 NavStackPage + AppNavBar。
 */
export default function MineStackLayout({ children }: { children: ReactNode }) {
  return children;
}
