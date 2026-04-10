export type BaseSeoData = {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
};

export async function getBaseSeoData(): Promise<BaseSeoData> {
  return {
    siteName: "Frfojo Mobile",
    siteDescription: "Frfojo 移动端应用",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  };
}
