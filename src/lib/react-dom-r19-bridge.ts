/**
 * React 19：`react-dom` 主入口不再导出 `createRoot`（仅在 `react-dom/client`）。
 * `@arco-design/mobile-react` 的 `_helpers/react-dom.js` 仍从 `react-dom` 读取 `createRoot`，
 * 在 R19 下会得到 `undefined` 并导致 Notify/Toast/Dialog 等命令式 API 报错。
 * 通过合并导出 + resolve alias，无需在每个调用点传 context。
 *
 * @see https://github.com/arco-design/mobile-react — GlobalContextParams.createRoot
 */
export * from "react-dom";
export { createRoot, hydrateRoot } from "react-dom/client";
