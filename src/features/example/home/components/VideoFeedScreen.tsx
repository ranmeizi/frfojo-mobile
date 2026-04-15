"use client";

import { useMemo } from "react";
import { View } from "@/components/adapt";
import { createMockFeed } from "../feed-mock";
import { VideoFeedSwiper } from "./VideoFeedSwiper";

/**
 * Home 视频流页面：负责演示数据与全屏容器；滑动与单条 UI 分别在 VideoFeedSwiper / VideoSlideContent。
 */
export function VideoFeedScreen() {
  const items = useMemo(() => createMockFeed(60), []);

  return (
    <View
      className="home-feed-immersive home-feed-swiper-host"
      style={{
        height: "100%",
        width: "100%",
        minHeight: 0,
        background: "#000",
      }}
    >
      <VideoFeedSwiper items={items} />
    </View>
  );
}
