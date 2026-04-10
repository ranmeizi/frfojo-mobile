# Frfojo Mobile Design System

## 1) 视觉主题与氛围

- 关键词：清晰、轻量、稳重、触控友好。
- 设计密度：移动端优先，中等留白，信息层级明确。
- 交互原则：单手可达、状态可感知、反馈及时。

## 2) 颜色体系（语义化）

### 核心语义

- `colorPrimary`：品牌主色与主要 CTA。
- `colorSuccess` / `colorWarning` / `colorDanger`：成功、警告、危险。
- `colorText` / `colorTextSecondary` / `colorTextTertiary`：文字主次层级。
- `colorBg` / `colorBgSecondary` / `colorCard`：页面、分层、卡片背景。
- `colorBorder` / `colorBorderStrong`：边框层级。
- `colorMask`：弹层遮罩。

### 明暗模式

- Light 与 Dark 保持同一语义键，不允许组件直接写死十六进制。
- 组件必须通过 `t: Tokens` 获取颜色，禁止绕过 token map。

## 3) 字体与排版规则

- 字号：`12 / 13 / 14 / 16 / 18`，正文默认 `14`。
- 行高：`1.3 / 1.5 / 1.7`，正文默认 `1.5`。
- 语义建议：
  - 页面标题：`fontSizeXl`
  - 区块标题：`fontSizeLg`
  - 正文：`fontSizeMd`
  - 辅助说明：`fontSizeSm`

## 4) 间距、圆角、阴影（移动端）

- 间距采用 4pt 基础网格：`4 / 8 / 12 / 16 / 20 / 24 / 32`。
- 圆角语义：`radiusSm / Md / Lg / Xl / Round`。
- 阴影分级：
  - `shadow1`：轻量卡片
  - `shadow2`：弹层与悬浮控件

## 5) 组件规范

- 按钮：
  - 主按钮使用 `colorPrimary`，禁用态降低透明度，不更换语义色。
  - 文字按钮使用 `colorLink`，保持点击热区 >= 44px。
- 卡片：
  - 背景使用 `colorCard`，边框 `colorBorder`，优先使用 `radiusLg`。
- 导航：
  - 顶部导航背景 `colorNavBarBg`。
  - 底部 Tab 背景 `colorTabBarBg`，需兼容安全区。

## 6) 可访问性与触控

- 最小触控热区：`44x44 px`。
- 文字与背景对比度建议达到 WCAG AA。
- 不仅靠颜色表达状态，需辅以图标或文案。

## 7) 工程接入约束

- 统一来源：`src/lib/styles/theme-tokens.ts`。
- 统一入口：`createStyles((t: Tokens) => ({ ... }))`。
- 不允许在业务组件中定义主题色常量，所有视觉变量走 token。
- 新增主题字段时必须同时补充 `light/dark` 两套值。

## 8) 示例（组件写法）

```ts
const useStyles = createStyles((t) => ({
  root: {
    background: t.colorPageBg,
    color: t.colorText,
    padding: t.space16,
  },
  card: {
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    boxShadow: t.shadow1,
  },
}));
```
