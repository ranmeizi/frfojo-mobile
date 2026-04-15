"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { AnimatePresence, motion } from "motion/react";
import type { PullToRefreshProps } from "./PullToRefresh";
import { PullToRefresh } from "./PullToRefresh";
import { View } from "./View";

export type RowComponentProps<T> = {
  index: number;
  row: T | undefined;
  isLoaded: boolean;
  style: CSSProperties;
};

export interface ListProps<T> {
  rowComponent: (props: RowComponentProps<T>) => ReactNode;
}

export interface VirtualListProps<T> {
  rows: T[];
  rowCount: number;
  isRowLoaded: (index: number) => boolean;
  loadMoreRows: (startIndex: number, stopIndex: number) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RowComponent: ListProps<any>["rowComponent"];
  height?: number | string;
  rowHeight?: number;
  loading?: boolean;
  endReachedThreshold?: number;
  emptyMessage?: string;
  /** 滚动超过该值后显示回顶按钮 */
  backToTopShowThreshold?: number;
  /** 滚动回到该值以下后隐藏回顶按钮（用于防抖） */
  backToTopHideThreshold?: number;
  /**
   * 传入则在 VirtualList 内包裹 `PullToRefresh`，并根据真实滚动容器的 scrollTop 自动合并 `disabled`
   *（修复 Arco PullRefresh 只检测自身根节点、无法感知内部虚拟列表滚动的问题）。
   */
  pullToRefresh?: Omit<PullToRefreshProps, "children">;
  /** 判定「在顶部」的像素容差（配合 pullToRefresh） */
  atTopEpsilon?: number;
}

export function VirtualList<T>({
  rows,
  rowCount,
  isRowLoaded,
  loadMoreRows,
  RowComponent,
  height = 520,
  rowHeight = 92,
  loading = false,
  endReachedThreshold = 8,
  emptyMessage = "暂无数据",
  backToTopShowThreshold = 520,
  backToTopHideThreshold = 320,
  pullToRefresh,
  atTopEpsilon = 1,
}: VirtualListProps<T>) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const pendingRef = useRef(false);
  const pendingRangeRef = useRef<string | null>(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const [scrollAtTop, setScrollAtTop] = useState(true);

  const count = Math.max(0, rowCount);
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 6,
  });

  const virtualItems = virtualizer.getVirtualItems();

  useEffect(() => {
    const el = parentRef.current;
    if (!el) {
      return;
    }
    const maybeLoadMore = () => {
      if (loading || pendingRef.current || count === 0 || virtualItems.length === 0) {
        return;
      }
      // 仅在容器可滚动时才做“接近底部”判断，避免高度链异常导致持续触发。
      if (el.scrollHeight <= el.clientHeight + 1) {
        return;
      }
      const distanceToBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
      const thresholdPx = rowHeight * endReachedThreshold;
      if (distanceToBottom > thresholdPx) {
        return;
      }

      const start = virtualItems[0].index;
      const end = Math.min(count - 1, virtualItems[virtualItems.length - 1].index + endReachedThreshold);
      let loadStart = -1;
      let loadStop = -1;
      for (let i = start; i <= end; i += 1) {
        if (!isRowLoaded(i)) {
          if (loadStart === -1) {
            loadStart = i;
          }
          loadStop = i;
        }
      }
      if (loadStart === -1) {
        return;
      }
      const rangeKey = `${loadStart}:${loadStop}`;
      if (pendingRangeRef.current === rangeKey) {
        return;
      }
      pendingRef.current = true;
      pendingRangeRef.current = rangeKey;
      void loadMoreRows(loadStart, loadStop).finally(() => {
        pendingRef.current = false;
      });
    };

    maybeLoadMore();
    el.addEventListener("scroll", maybeLoadMore, { passive: true });
    return () => {
      el.removeEventListener("scroll", maybeLoadMore);
    };
  }, [count, endReachedThreshold, isRowLoaded, loadMoreRows, loading, rowHeight, virtualItems]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) {
      return;
    }
    const onScroll = () => {
      setShowBackTop((prev) => {
        const top = el.scrollTop;
        if (!prev && top >= backToTopShowThreshold) {
          return true;
        }
        if (prev && top <= backToTopHideThreshold) {
          return false;
        }
        return prev;
      });
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
    };
  }, [backToTopHideThreshold, backToTopShowThreshold]);

  useEffect(() => {
    if (!pullToRefresh) {
      return;
    }
    if (count === 0) {
      setScrollAtTop(true);
      return;
    }
    const el = parentRef.current;
    if (!el) {
      return;
    }
    const sync = () => {
      const atTop = el.scrollTop <= atTopEpsilon;
      setScrollAtTop((prev) => (prev === atTop ? prev : atTop));
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    return () => {
      el.removeEventListener("scroll", sync);
    };
  }, [atTopEpsilon, count, pullToRefresh]);

  const empty = (
    <View
      style={{
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--token-color-text-tertiary)",
        fontSize: 13,
        minHeight: 0,
      }}
    >
      {emptyMessage}
    </View>
  );

  const list = (
    <View style={{ position: "relative", height, minHeight: 0 }}>
      <div ref={parentRef} style={{ height: "100%", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <View style={{ height: virtualizer.getTotalSize(), position: "relative", width: "100%" }}>
          {virtualItems.map((virtualItem) => {
            const index = virtualItem.index;
            const loaded = isRowLoaded(index);
            const row = rows[index];
            return (
              <RowComponent
                key={index}
                index={index}
                row={row}
                isLoaded={loaded}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: virtualItem.start,
                  height: virtualItem.size,
                }}
              />
            );
          })}
        </View>
      </div>
      <AnimatePresence>
        {showBackTop ? (
          <motion.button
            type="button"
            onClick={() => parentRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              right: 12,
              bottom: 12,
              zIndex: 10,
              border: "1px solid var(--token-color-border)",
              background: "var(--token-color-card)",
              color: "var(--token-color-text)",
              borderRadius: 999,
              padding: "6px 10px",
              fontSize: 12,
              lineHeight: 1,
              boxShadow: "var(--token-shadow-1)",
              cursor: "pointer",
            }}
            aria-label="回到顶部"
          >
            回到顶部
          </motion.button>
        ) : null}
      </AnimatePresence>
    </View>
  );

  const body = count === 0 ? empty : list;

  if (!pullToRefresh) {
    return body;
  }

  const { disabled: prDisabled, allowPullWhenNotTop: prAllowNotTop, style: prStyle, ...prRest } = pullToRefresh;
  return (
    <PullToRefresh
      {...prRest}
      disabled={prDisabled !== undefined ? prDisabled : !scrollAtTop}
      allowPullWhenNotTop={prAllowNotTop !== undefined ? prAllowNotTop : false}
      style={{ minHeight: 0, height, ...prStyle }}
    >
      {body}
    </PullToRefresh>
  );
}

