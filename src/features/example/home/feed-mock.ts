import type { FeedVideoItem } from "./types";

/** 演示数据：多段短样例 MP4，便于验证纵向虚拟滑动 */
const SAMPLE_MP4 = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
] as const;

function pickSrc(index: number): string {
  return SAMPLE_MP4[index % SAMPLE_MP4.length];
}

export function createMockFeed(count = 40): FeedVideoItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `v-${i}`,
    src: pickSrc(i),
    title: `示例视频 ${i + 1} · 上下滑动切换`,
    author: `@demo_user_${(i % 9) + 1}`,
  }));
}
