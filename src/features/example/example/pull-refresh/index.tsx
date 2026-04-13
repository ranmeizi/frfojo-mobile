"use client";

import { Cell } from "@arco-design/mobile-react";
import { PullToRefresh, ScrollView, View } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";

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
}));

export default function ExamplePullRefresh() {
  const styles = useStyles();

  return (
    <View className={styles.fill}>
      <PullToRefresh
        onRefresh={async () => {
          await new Promise((r) => setTimeout(r, 400));
        }}
      >
        <ScrollView scrollY style={{ height: "100%" }}>
          <View className={styles.body}>
            <View className={styles.hint}>在顶部下拉触发刷新；onRefresh 为占位（短延迟），可换真实请求。</View>
            <Cell.Group bordered={false}>
              {Array.from({ length: 12 }, (_, i) => (
                <Cell key={i} label={`列表项 ${i + 1}`} bordered={i < 11} />
              ))}
            </Cell.Group>
          </View>
        </ScrollView>
      </PullToRefresh>
    </View>
  );
}
