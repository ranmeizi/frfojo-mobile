import type { Metadata } from "next";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { ContentShareCard } from "@/features/example/example/share/content-share-card";

const coverUrl = "https://picsum.photos/seed/frfojo-story-b/1200/630";

export const metadata: Metadata = {
  title: "咖啡地图精选",
  description: "通勤、办公、社交三类咖啡店推荐，附带出片角度和安静指数。",
  openGraph: {
    title: "咖啡地图精选：城市 9 家必去店",
    description: "按使用场景分组，快速找到适合独处、开会和拍照打卡的店。",
    type: "article",
    url: "/example/share/story-b",
    siteName: "Frfojo Mobile",
    images: [
      {
        url: coverUrl,
        width: 1200,
        height: 630,
        alt: "一杯拉花咖啡与木质桌面",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "咖啡地图精选：城市 9 家必去店",
    description: "这页故意使用 summary 卡片，方便对比 summary_large_image 的呈现差异。",
    images: [coverUrl],
  },
};

export default function ShareStoryBPage() {
  return (
    <ExampleSubPage title="内容页 B">
      <ContentShareCard
        title="咖啡地图精选"
        summary="按照通勤 / 办公 / 社交三种场景整理，减少选店成本。"
        imageUrl={coverUrl}
        imageAlt="一杯拉花咖啡与木质桌面"
        body={[
          "早高峰选择出杯稳定且打包友好的门店，节省通勤时间。",
          "长时间办公建议优先找插座充足、音乐音量较低的空间。",
          "周末社交则可挑采光好的店，拍照氛围与聊天舒适度更平衡。",
        ]}
      />
    </ExampleSubPage>
  );
}
