import type { Metadata } from "next";
import type { BaseSeoData } from "@/lib/server/base-data";
import type { PageSeoInput } from "./types";

export function buildMetadata(base: BaseSeoData, page: PageSeoInput): Metadata {
  const title = `${page.title} | ${base.siteName}`;
  const url = new URL(page.path, base.siteUrl).toString();

  return {
    title,
    description: page.description,
    openGraph: {
      title,
      description: page.description,
      type: "website",
      url,
      siteName: base.siteName,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: page.description,
    },
  };
}
