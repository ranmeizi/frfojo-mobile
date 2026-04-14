import type { Metadata } from "next";
import { AppProviders } from "@/app/providers";
import { ViewTransitions } from "next-view-transitions";
import "./arco.css";
import "./style.css";
import { createStyles } from "@/lib/styles/create-styles";

/**
 * 首屏主题预初始化脚本（Pre-hydration Theme Init Script）
 *
 * 为什么放在 Root Layout 的 <head> 内联脚本里：
 * 1) 执行时机最早：在 React hydration 之前运行，能避免首屏主题闪烁（FOUC）。
 * 2) 影响范围全局：Root Layout 会包裹 app 下所有路由，主题初始化一次即可全站生效。
 * 3) 不能仅依赖 store：zustand/persist 的 rehydrate 属于客户端运行阶段，时机晚于首帧渲染。
 *
 * 这段脚本做了什么：
 * - 读取 localStorage 的主题值（key: frfojo-theme）
 * - 兼容两种历史存储格式：
 *   a) 旧格式：直接存 "light" / "dark"
 *   b) zustand persist 格式：{ state: { theme: "light" | "dark" }, ... }
 * - 若都不可用，回退到系统主题 prefers-color-scheme
 * - 立刻写入：
 *   - documentElement.dataset.theme（驱动 CSS 变量主题）
 *   - documentElement.style.colorScheme（优化浏览器内置控件配色）
 *
 * 注意：
 * - 这段脚本只负责“首帧正确主题”，后续主题切换与持久化仍由 theme-store + ThemeHydrator 负责。
 * - try/catch 是兜底，避免极端环境（隐私模式、storage 异常）影响页面可用性。
 */
const THEME_INIT_SCRIPT = `
(() => {
  try {
    const storageKey = "frfojo-theme";
    const raw = window.localStorage.getItem(storageKey);
    let storedTheme = null;
    if (raw === "light" || raw === "dark") {
      storedTheme = raw;
    } else if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const themeFromPersist = parsed?.state?.theme;
        if (themeFromPersist === "light" || themeFromPersist === "dark") {
          storedTheme = themeFromPersist;
        }
      } catch (_) {}
    }
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = storedTheme ?? (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    var cls = "arco-theme-dark";
    var enableDark = theme === "dark";
    document.documentElement.classList.toggle(cls, enableDark);
    document.body && document.body.classList.toggle(cls, enableDark);
  } catch (_) {}
})();
`;

/**
 * 首屏 rem 预初始化脚本（Pre-hydration REM Init Script）
 *
 * 目标：在 hydration 之前设置 <html> font-size，避免首屏布局跳动。
 * 说明：这是 flexible 的“最小实现”，不依赖 React 生命周期。
 */
const ROOT_PIXEL_INIT_SCRIPT = `
(() => {
  try {
    var baseFontSize = 50;
    var sketchWidth = 375;
    var maxFontSize = 64;

    function getDefaultFontSize() {
      var doc = document;
      doc.documentElement.style.fontSize = '';
      var temp = doc.createElement('div');
      temp.style.cssText = 'width:1rem;display:none';
      doc.head.appendChild(temp);
      var w = +window.getComputedStyle(temp, null).getPropertyValue('width').replace('px', '') || 16;
      doc.head.removeChild(temp);
      return w;
    }

    function setRootFontSize() {
      var docEl = document.documentElement;
      var clientWidth = window.innerWidth && docEl.clientWidth
        ? Math.min(window.innerWidth, docEl.clientWidth)
        : window.innerWidth || docEl.clientWidth || (document.body && document.body.clientWidth) || sketchWidth;
      var htmlFontSizePx = clientWidth / sketchWidth * baseFontSize;
      htmlFontSizePx = Math.min(htmlFontSizePx, maxFontSize);
      window.ROOT_FONT_SIZE = htmlFontSizePx;
      docEl.style.fontSize = (htmlFontSizePx / getDefaultFontSize() * 100) + '%';
    }

    if (window.isResponsive === false) {
      document.documentElement.style.fontSize = baseFontSize + 'px';
      return;
    }

    setRootFontSize();
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "Frfojo Mobile",
    template: "%s | Frfojo Mobile",
  },
  description: "Frfojo 移动端应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: ROOT_PIXEL_INIT_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"></meta>
        <style>
          {
            `body{
              height:100vh;
              height:100dvh;
            }`
          }
        </style>
      </head>
      <body>
        <ViewTransitions>
          <AppProviders>{children}</AppProviders>
        </ViewTransitions>
      </body>
    </html>
  );
}
