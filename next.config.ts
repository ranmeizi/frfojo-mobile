import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));
/** Turbopack 需要项目内相对路径，不能用绝对路径作 alias 目标 */
const reactDomR19Bridge = "./src/lib/react-dom-r19-bridge.ts";
const reactDomR19BridgeAbs = path.join(configDir, "src/lib/react-dom-r19-bridge.ts");
const isGithubPages = process.env.GITHUB_PAGES === "1";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repoName.endsWith(".github.io");
const basePath =
  isGithubPages && repoName && !isUserSiteRepo ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  outputFileTracingRoot: configDir,
  // 只替换 `from "react-dom"` 主入口；勿映射 `react-dom/client`，否则会解析成 bridge 文件 + `/client` 而报错
  turbopack: {
    resolveAlias: {
      "react-dom$": reactDomR19Bridge,
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "react-dom$": reactDomR19BridgeAbs,
    };
    return config;
  },
  allowedDevOrigins: [
    "192.168.240.230",
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
  ],
  ...(isGithubPages
    ? {
        output: "export",
        images: { unoptimized: true },
        trailingSlash: true,
        basePath,
        assetPrefix: basePath || undefined,
      }
    : {}),
};

export default nextConfig;
