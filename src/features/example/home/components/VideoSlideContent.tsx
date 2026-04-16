"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  IconEdit,
  IconLikeCircle,
  IconPlay,
  IconUpload,
} from "@arco-design/mobile-react/esm/icon";
import { View } from "@/components/adapt";
import type { FeedVideoItem } from "../types";
import { TikTokProgressScrub } from "./TikTokProgressScrub";

export type VideoSlideContentProps = {
  item: FeedVideoItem;
  active: boolean;
  style?: CSSProperties;
};

const slideBox: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
  background: "#000",
  overflow: "hidden",
};

const videoStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

/**
 * 底部统一渐变：中间压暗保证文案/进度条可读，最底端收束到全透明，
 * 与透明 Tab 下的纯视频画面衔接，避免一条「色差带」。
 */
const bottomOverlay: CSSProperties = {
  position: "absolute",
  left: 0,
  right: 0,
  bottom: 0,
  paddingBottom: "calc(1.02rem + var(--safe-area-bottom))",
  pointerEvents: "none",
  display: "flex",
  flexDirection: "column-reverse",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.14) 26%, rgba(0,0,0,0.38) 62%, rgba(0,0,0,0.22) 82%, rgba(0,0,0,0) 100%)",
};

const metaBlock: CSSProperties = {
  padding: "0.12rem 0.28rem 0.18rem",
  background: "transparent",
  color: "#fff",
};

const rightRail: CSSProperties = {
  position: "absolute",
  right: "0.16rem",
  bottom: "calc(1.02rem + var(--safe-area-bottom) + 0.92rem)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.42rem",
  color: "#fff",
  pointerEvents: "auto",
  zIndex: 4,
};

const railBtn: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.1rem",
  padding: "0.08rem 0.04rem",
  margin: 0,
  border: "none",
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  fontSize: "0.56rem",
  lineHeight: 1,
  textShadow: "0 1px 3px rgba(0,0,0,0.65)",
};

const railCap: CSSProperties = {
  fontSize: "0.24rem",
  opacity: 0.92,
  textShadow: "0 1px 2px rgba(0,0,0,0.6)",
};

/**
 * 单条全屏视频：TikTok 式底部细进度条（触摸展开）；点击画面暂停/播放。
 */
export function VideoSlideContent({ item, active, style }: VideoSlideContentProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [seeking, setSeeking] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }
    if (!active) {
      el.pause();
      el.currentTime = 0;
      setUserPaused(false);
      setCurrentTime(0);
      return;
    }
    if (!userPaused) {
      void el.play().catch(() => {
        el.muted = true;
        void el.play().catch(() => {});
      });
    } else {
      el.pause();
    }
  }, [active, item.src, userPaused]);

  const onTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || seeking) {
      return;
    }
    setCurrentTime(el.currentTime);
  }, [seeking]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !active || userPaused || seeking) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }
    const tick = () => {
      // 短视频在 timeupdate 事件频率下会有“颗粒感”，用 rAF 连续读 currentTime 平滑位移。
      const now = el.currentTime;
      setCurrentTime((prev) => (Math.abs(prev - now) < 0.008 ? prev : now));
      rafIdRef.current = requestAnimationFrame(tick);
    };
    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [active, userPaused, seeking, item.src]);

  const onLoadedMeta = useCallback(() => {
    const el = videoRef.current;
    if (!el) {
      return;
    }
    setDuration(el.duration || 0);
  }, []);

  const togglePlayPause = useCallback(() => {
    setUserPaused((p) => !p);
  }, []);

  const seekTo = useCallback(
    (next: number) => {
      const el = videoRef.current;
      if (!el || !Number.isFinite(next)) {
        return;
      }
      const d = el.duration || duration || 1;
      const clamped = Math.min(d, Math.max(0, next));
      el.currentTime = clamped;
      setCurrentTime(clamped);
    },
    [duration]
  );

  return (
    <View style={{ ...slideBox, ...style }}>
      <video
        ref={videoRef}
        style={videoStyle}
        src={item.src}
        playsInline
        loop
        muted
        preload="metadata"
        controls={false}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMeta}
        onDurationChange={onLoadedMeta}
        onClick={(e) => {
          e.stopPropagation();
          togglePlayPause();
        }}
      />

      {active && userPaused ? (
        <button
          type="button"
          aria-label="播放"
          onClick={(e) => {
            e.stopPropagation();
            setUserPaused(false);
          }}
          style={{
            position: "absolute",
            left: "50%",
            top: "42%",
            transform: "translate(-50%, -50%)",
            width: "1.2rem",
            height: "1.2rem",
            borderRadius: "999px",
            border: "none",
            background: "rgba(0,0,0,0.45)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.56rem",
            cursor: "pointer",
            zIndex: 3,
            pointerEvents: "auto",
          }}
        >
          <IconPlay />
        </button>
      ) : null}

      <View style={rightRail}>
        <button type="button" style={railBtn} aria-label="点赞">
          <IconLikeCircle />
          <span style={railCap}>12.4万</span>
        </button>
        <button type="button" style={railBtn} aria-label="评论">
          <IconEdit />
          <span style={railCap}>3281</span>
        </button>
        <button type="button" style={railBtn} aria-label="分享">
          <IconUpload />
          <span style={railCap}>分享</span>
        </button>
      </View>

      <View style={bottomOverlay}>
        <TikTokProgressScrub
          duration={duration}
          currentTime={currentTime}
          seeking={seeking}
          onSeekingChange={setSeeking}
          seekTo={seekTo}
        />
        <View style={metaBlock}>
          <div
            style={{
              fontWeight: 600,
              fontSize: "0.3rem",
              marginBottom: "0.08rem",
              textShadow: "0 1px 4px rgba(0,0,0,0.55)",
            }}
          >
            {item.author}
          </div>
          <div
            style={{
              fontSize: "0.26rem",
              opacity: 0.94,
              lineHeight: 1.35,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            {item.title}
          </div>
        </View>
      </View>
    </View>
  );
}
