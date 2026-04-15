"use client";

import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { Mousewheel, Virtual } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import { View } from "@/components/adapt";
import type { FeedVideoItem } from "../types";
import { VideoSlideContent } from "./VideoSlideContent";

import "swiper/css";

export type VideoFeedSwiperProps = {
  items: FeedVideoItem[];
  className?: string;
};

const swiperShell: CSSProperties = {
  width: "100%",
  height: "100%",
  background: "#000",
};

/**
 * 纵向全屏 Swiper + Virtual：只挂载可视附近 slide，适合长列表。
 */
export function VideoFeedSwiper({ items, className = "home-feed-swiper-inner" }: VideoFeedSwiperProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const onSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  return (
    <View className={className} style={{ width: "100%", height: "100%", minHeight: 0 }}>
      <Swiper
        modules={[Virtual, Mousewheel]}
        direction="vertical"
        slidesPerView={1}
        speed={380}
        virtual={{ enabled: true, cache: true, addSlidesBefore: 2, addSlidesAfter: 3 }}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        onSlideChange={onSlideChange}
        style={swiperShell}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id} virtualIndex={index} style={{ height: "100%" }}>
            <VideoSlideContent item={item} active={index === activeIndex} />
          </SwiperSlide>
        ))}
      </Swiper>
    </View>
  );
}
