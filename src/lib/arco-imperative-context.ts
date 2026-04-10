import { createRoot } from "react-dom/client";

/**
 * React 19 下 Arco 命令式 API（Notify / Toast / Dialog.open 等）需在第二参数传入 `createRoot`，
 * 否则其内部仍从 `react-dom` 主包取 `createRoot` 会得到 undefined。
 * 与 ContextProvider 的 `createRoot`  prop 同源。
 */
export const arcoImperativeContext = { createRoot };
