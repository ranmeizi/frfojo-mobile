"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, VirtualList } from "@/components/adapt";
import type { ListProps } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";

const ITEM_HEIGHT = 92;
const TOTAL_COUNT = 2000;
const PAGE_SIZE = 30;
const FALLBACK_LIST_HEIGHT = 520;

type MessageItem = {
  id: string;
  title: string;
  preview: string;
  time: string;
  unread: boolean;
};

const useStyles = createStyles((t) => ({
  fill: {
    flex: 1,
    minHeight: 0,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    background: t.colorPageBg,
  },
  listViewport: {
    minHeight: 0,
    margin: t.space12,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    overflow: "hidden",
    background: t.colorCard,
  },
  listInner: {
    position: "relative",
    width: "100%",
  },
  messageCard: {
    position: "absolute",
    left: 0,
    right: 0,
    margin: `${t.space8} ${t.space12}`,
    padding: `${t.space8} ${t.space12}`,
    borderRadius: t.radiusMd,
    border: `1px solid ${t.colorBorder}`,
    background: t.colorBgSecondary,
    boxShadow: t.shadow1,
    boxSizing: "border-box",
  },
  messageTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: t.space4,
    gap: t.space8,
  },
  messageTitle: {
    fontSize: t.fontSizeMd,
    color: t.colorText,
    fontWeight: 600,
    lineHeight: 1.35,
  },
  messageTime: {
    fontSize: t.fontSizeXs,
    color: t.colorTextTertiary,
    whiteSpace: "nowrap",
  },
  messagePreview: {
    fontSize: t.fontSizeSm,
    color: t.colorTextSecondary,
    lineHeight: 1.45,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: t.colorPrimary,
    display: "inline-block",
    marginRight: t.space8,
    flexShrink: 0,
  },
  titleWrap: {
    display: "flex",
    alignItems: "center",
    minWidth: 0,
  },
}));

export default function ExamplePullRefresh() {
  const styles = useStyles();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [listHeight, setListHeight] = useState(FALLBACK_LIST_HEIGHT);
  const hasMore = messages.length < TOTAL_COUNT;
  const initializedRef = useRef(false);

  useEffect(() => {
    const updateListHeight = () => {
      const viewportHeight = window.innerHeight || FALLBACK_LIST_HEIGHT;
      const headerEl = document.querySelector(".arco-nav-bar-wrap, .arco-nav-bar") as HTMLElement | null;
      const headerHeight = headerEl?.getBoundingClientRect().height ?? 0;
      // 上下 margin 为 12 + 12
      const available = Math.floor(viewportHeight - headerHeight - 24);
      setListHeight(Math.max(240, available));
    };
    updateListHeight();
    window.addEventListener("resize", updateListHeight);
    window.addEventListener("orientationchange", updateListHeight);
    return () => {
      window.removeEventListener("resize", updateListHeight);
      window.removeEventListener("orientationchange", updateListHeight);
    };
  }, []);

  const isRowLoaded = (index: number) => !hasMore || index < messages.length;
  const loadMoreRows = useCallback(async (_startIndex: number, stopIndex: number) => {
    if (loadingMore || messages.length >= TOTAL_COUNT) {
      return;
    }
    setLoadingMore(true);
    try {
      await new Promise((r) => setTimeout(r, 260));
      setMessages((prev) => {
        const next = [...prev];
        const max = Math.min(TOTAL_COUNT, Math.max(stopIndex + 1, prev.length + PAGE_SIZE));
        for (let i = prev.length; i < max; i += 1) {
          next.push({
            id: `msg-${i + 1}`,
            title: `系统消息 #${i + 1}`,
            preview: `这是第 ${i + 1} 条消息内容预览，用于演示 PullToRefresh + 虚拟列表。`,
            time: `${(i % 23) + 1} 分钟前`,
            unread: i % 3 === 0,
          });
        }
        return next;
      });
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, messages.length]);
  useEffect(() => {
    if (initializedRef.current) {
      return;
    }
    initializedRef.current = true;
    void loadMoreRows(0, PAGE_SIZE - 1);
  }, [loadMoreRows]);

  const RowComponent = useMemo<ListProps<MessageItem>["rowComponent"]>(
    () => {
      const MessageRow: ListProps<MessageItem>["rowComponent"] = ({ index, row, isLoaded, style }) => {
        const cardStyle = {
          ...style,
          boxSizing: "border-box",
        } as CSSProperties;
        if (!isLoaded || !row) {
          return (
            <View className={styles.messageCard} style={cardStyle}>
              <View className={styles.messageTop}>
                <View className={styles.messageTitle}>加载中...</View>
                <View className={styles.messageTime}>...</View>
              </View>
              <View className={styles.messagePreview}>正在加载第 {index + 1} 条消息</View>
            </View>
          );
        }
        return (
          <View className={styles.messageCard} style={cardStyle}>
            <View className={styles.messageTop}>
              <View className={styles.titleWrap}>
                {row.unread ? <span className={styles.unreadDot} /> : null}
                <View className={styles.messageTitle}>{row.title}</View>
              </View>
              <View className={styles.messageTime}>{row.time}</View>
            </View>
            <View className={styles.messagePreview}>{row.preview}</View>
          </View>
        );
      };
      return MessageRow;
    },
    [styles],
  );

  return (
    <View className={styles.fill}>
      <View className={styles.listViewport} style={{ height: listHeight }}>
        <VirtualList<MessageItem>
          rows={messages}
          rowCount={messages.length + (hasMore ? 1 : 0)}
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          RowComponent={RowComponent}
          height={listHeight}
          rowHeight={ITEM_HEIGHT}
          loading={loadingMore}
          endReachedThreshold={10}
          emptyMessage={loadingMore ? "加载中..." : "暂无消息，下拉刷新或下滑触发加载"}
          pullToRefresh={{
            allowPullWhenNotTop: false,
            onRefresh: async () => {
              await new Promise((r) => setTimeout(r, 350));
              setMessages([]);
              await loadMoreRows(0, PAGE_SIZE - 1);
            },
          }}
        />
      </View>
    </View>
  );
}
