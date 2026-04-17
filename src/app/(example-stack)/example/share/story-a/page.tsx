import type { Metadata } from "next";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { ContentShareCard } from "@/features/example/example/share/content-share-card";

const coverUrl = "https://picsum.photos/seed/frfojo-story-a/1200/630";

export const metadata: Metadata = {
  title: "城市周末指南",
  description: "48 小时城市周末玩法：早午餐、展览、夜景路线一站式推荐。",
  openGraph: {
    title: "城市周末指南：48 小时轻松玩",
    description: "把城市周末拆成 6 个时间段，直接照着走就能拍到好看的照片。",
    type: "article",
    url: "/example/share/story-a",
    siteName: "Frfojo Mobile",
    images: [
      {
        url: coverUrl,
        width: 1200,
        height: 630,
        alt: "城市天际线夜景",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "城市周末指南：48 小时轻松玩",
    description: "时间线式路线模板，适合直接转发给朋友约局。",
    images: [coverUrl],
  },
};

export default function ShareStoryAPage() {
  return (
    <ExampleSubPage title="内容页 A">
      <ContentShareCard
        title="城市周末指南"
        summary="48 小时城市轻旅行模板，适合和朋友直接复制行程。"
        imageUrl={coverUrl}
        imageAlt="城市天际线夜景"
        body={[
          "周六上午建议从社区咖啡店开始，避开核心商圈排队高峰。",
          "下午安排一场展览或书店巡游，晚上再去河岸步道看夜景。",
          "周日留给慢节奏体验：早午餐 + 公园散步 + 本地市集。",
        ]}
      />
    </ExampleSubPage>
  );
}
