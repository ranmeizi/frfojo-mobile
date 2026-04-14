"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PullToRefresh, ScrollView, View, VirtualList } from "@/components/adapt";
import type { ListProps } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";

const ITEM_HEIGHT = 92;
const LIST_HEIGHT = 520;
const TOTAL_COUNT = 2000;
const PAGE_SIZE = 30;

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
    display: "flex",
    flexDirection: "column",
  },
  body: {
    padding: t.space16,
    paddingBottom: t.space32,
    background: t.colorPageBg,
    color: t.colorText,
  },
  hint: {
    marginBottom: t.space12,
    fontSize: t.fontSizeSm,
    color: t.colorTextSecondary,
    lineHeight: t.lineHeightLoose,
  },
  listViewport: {
    height: LIST_HEIGHT,
    borderRadius: t.radiusLg,
    border: `1px solid ${t.colorBorder}`,
    background: t.colorCard,
    overflow: "auto",
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
  const hasMore = messages.length < TOTAL_COUNT;
  const initializedRef = useRef(false);

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
      <ScrollView scrollY style={{ height: "100%" }}>
        <View className={styles.body}>
          <View className={styles.hint}>
            下拉刷新仅作用于列表区域；初始不预塞大数据，全部由 loadMoreRows 分批加载。
          </View>
          <PullToRefresh
            onRefresh={async () => {
              await new Promise((r) => setTimeout(r, 350));
              setMessages([]);
              await loadMoreRows(0, PAGE_SIZE - 1);
            }}
          >
            <View className={styles.listViewport}>
              <VirtualList<MessageItem>
                rows={messages}
                rowCount={messages.length + (hasMore ? 1 : 0)}
                isRowLoaded={isRowLoaded}
                loadMoreRows={loadMoreRows}
                RowComponent={RowComponent}
                height={LIST_HEIGHT}
                rowHeight={ITEM_HEIGHT}
                loading={loadingMore}
                endReachedThreshold={10}
                emptyMessage={loadingMore ? "加载中..." : "暂无消息，下拉刷新或下滑触发加载"}
              />
            </View>
          </PullToRefresh>
        </View>
      </ScrollView>
    </View>
  );
}
