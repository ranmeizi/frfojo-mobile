# Frfojo Mobile 开发约定（精简）

## 布局与适配

- 页面/组件里**能用 `View` 就不用 `div`**；滚动用 `ScrollView`。例外：仅 `adapt/View.tsx`、`ScrollView.tsx` 内部实现可保留 `div`。
- **下拉刷新**：用 `adapt` 的 **`PullToRefresh`** + 内层 **`ScrollView`**；栈页上 **`NavStackPage` / `ExampleSubPage` 设 `scroll={false}`**，避免与外层滚动套两层。
- 二级栈页（无 TabBar）：用 `NavStackPage`（`AppNavBar` + `ScrollView`），路由放在 `(mine-stack)` / `(example-stack)` 等与 `(tab-views)` 平级的组。

## Arco Mobile

- 项目启用了 **`setRootPixel`（rem）**，新增页面/组件样式默认使用 **rem**（优先复用 token），避免直接写死 px。
- 仅在第三方组件适配缺陷、1px hairline、或历史兼容场景下允许用 **px**，并限制在局部 scope，禁止到处 `!important`。
- 命令式 `Toast` / `Dialog` 等需传 **`arcoImperativeContext`**（见 `arco-imperative-context.ts`）。

## 样式

- 主题色与间距优先 **`createStyles` + `theme-tokens`**，少写死 hex。
- 大段主题说明不必重复写进本文件；Next 破坏性变更见 `AGENTS.md` / `node_modules/next/dist/docs/`。
