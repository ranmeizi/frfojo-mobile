import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const isGithubPages = process.env.GITHUB_PAGES === "1";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSiteRepo = repoName.endsWith(".github.io");
const basePath =
  isGithubPages && repoName && !isUserSiteRepo ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  outputFileTracingRoot: configDir,
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
