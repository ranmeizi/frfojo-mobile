import type { Metadata } from "next";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { ContentShareCard } from "@/features/example/example/share/content-share-card";

const coverUrl = "https://picsum.photos/seed/frfojo-story-c/1200/630";

export const metadata: Metadata = {
  title: "夜跑路线推荐",
  description: "三条城市夜跑路线，从新手 3km 到进阶 10km，附补给点建议。",
  openGraph: {
    title: "夜跑路线推荐：3km / 5km / 10km",
    description: "适合下班后快速开跑的路线合集，包含坡度、照明和人流信息。",
    type: "article",
    url: "/example/share/story-c",
    siteName: "Frfojo Mobile",
    images: [
      {
        url: coverUrl,
        width: 1200,
        height: 630,
        alt: "夜晚城市道路上的跑者",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "夜跑路线推荐：3km / 5km / 10km",
    description: "强调路线信息密度和安全提示，适合运动类内容分享。",
    images: [coverUrl],
  },
};

export default function ShareStoryCPage() {
  return (
    <ExampleSubPage title="内容页 C">
      <ContentShareCard
        title="夜跑路线推荐"
        summary="从轻松恢复跑到节奏跑，按体能和时间选择最合适的路线。"
        imageUrl={coverUrl}
        imageAlt="夜晚城市道路上的跑者"
        body={[
          "3km 入门线：全程平路，照明充足，适合下班后放松。",
          "5km 进阶线：有两段缓坡，建议配速稳定在可对话区间。",
          "10km 挑战线：沿河往返路线，注意补水与反光装备。",
        ]}
      />
    </ExampleSubPage>
  );
}
