"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { View } from "@/components/adapt";

type TikTokProgressScrubProps = {
  duration: number;
  currentTime: number;
  seeking: boolean;
  onSeekingChange: (seeking: boolean) => void;
  seekTo: (seconds: number) => void;
};

function formatClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

/** 轨道左右贴屏；展开时时间行单独留边距 */
const wrapBase: CSSProperties = {
  width: "100%",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: "0.04rem",
  paddingBottom: "0.06rem",
  pointerEvents: "auto",
  touchAction: "none",
  boxSizing: "border-box",
};

/**
 * 命中热区（透明）：显著放大拖拽可触发面积，视觉不变。
 */
const hitAreaBase: CSSProperties = {
  width: "100%",
  height: "0.5rem",
  cursor: "pointer",
  position: "relative",
};

/**
 * TikTok 风格：默认极细进度条 + 端点小圆点；触摸/拖动时轨道加高加粗，并显示时间。
 */
export function TikTokProgressScrub({
  duration,
  currentTime,
  seeking,
  onSeekingChange,
  seekTo,
}: TikTokProgressScrubProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef(false);
  const [interacting, setInteracting] = useState(false);
  const expanded = interacting || seeking;

  const d = duration > 0 ? duration : 1;
  const pct = Math.min(100, Math.max(0, (currentTime / d) * 100));

  const applyClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) {
        return;
      }
      const rect = el.getBoundingClientRect();
      const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
      seekTo(ratio * (duration || d));
    },
    [duration, d, seekTo]
  );

  const canStartFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0) {
        return false;
      }
      const handleX = rect.left + rect.width * (pct / 100);
      const thresholdPx = 26; // 仅在 handle 附近热区触发拖拽
      return Math.abs(clientX - handleX) <= thresholdPx;
    },
    [pct]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      if (!canStartFromClientX(e.clientX)) {
        return;
      }
      dragRef.current = true;
      setInteracting(true);
      onSeekingChange(true);
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      applyClientX(e.clientX);
    },
    [applyClientX, canStartFromClientX, onSeekingChange]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragRef.current) {
        return;
      }
      e.stopPropagation();
      applyClientX(e.clientX);
    },
    [applyClientX]
  );

  const endGesture = useCallback(
    (e: React.PointerEvent) => {
      e.stopPropagation();
      dragRef.current = false;
      setInteracting(false);
      onSeekingChange(false);
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    },
    [onSeekingChange]
  );

  // 防止失焦或异常未抬起指针时卡住
  useEffect(() => {
    const cancel = () => {
      dragRef.current = false;
      setInteracting(false);
      onSeekingChange(false);
    };
    window.addEventListener("blur", cancel);
    return () => window.removeEventListener("blur", cancel);
  }, [onSeekingChange]);

  const trackH = expanded ? "0.14rem" : "0.012rem";
  // 默认态小球适当可见；交互态显著大于轨道厚度
  const dotSize = expanded ? "0.22rem" : "0.065rem";
  const trackBg = expanded ? "rgba(255,255,255,0.38)" : "rgba(255,255,255,0.08)";
  const playedBg = expanded ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.22)";

  return (
    <View style={wrapBase}>
      {expanded ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "0.22rem",
            fontVariantNumeric: "tabular-nums",
            color: "rgba(255,255,255,0.95)",
            marginBottom: "0.08rem",
            paddingLeft: "0.24rem",
            paddingRight: "0.24rem",
            textShadow: "0 1px 3px rgba(0,0,0,0.75)",
          }}
        >
          {formatClock(currentTime)} / {formatClock(duration)}
        </div>
      ) : null}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endGesture}
        onPointerCancel={endGesture}
        style={hitAreaBase}
      >
        <div
          ref={trackRef}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={duration}
          aria-valuenow={currentTime}
          aria-label="播放进度"
          tabIndex={0}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            borderRadius: "999px",
            transform: "translateY(-50%)",
            height: trackH,
            background: trackBg,
            transition: "height 0.22s cubic-bezier(0.25, 0.8, 0.25, 1)",
            overflow: "visible",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: `${pct}%`,
              borderRadius: "999px",
              background: playedBg,
              pointerEvents: "none",
              transition: expanded ? "none" : "width 0.08s linear",
            }}
          />
          {/* 端点小圆点（仿 TikTok 播放头） */}
          <div
            style={{
              position: "absolute",
              left: `${pct}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: dotSize,
              height: dotSize,
              borderRadius: "999px",
              background: "#fff",
              boxShadow: expanded ? "0 0 0 1px rgba(0,0,0,0.18)" : "none",
              opacity: expanded ? 1 : 0.78,
              pointerEvents: "none",
              willChange: "left",
              transition: expanded
                ? "left 0.04s linear, width 0.22s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.22s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.18s ease"
                : "left 0.24s cubic-bezier(0.22, 1, 0.36, 1), width 0.22s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.22s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.18s ease",
            }}
          />
        </div>
      </div>
    </View>
  );
}
