"use client";

import { Cell } from "@arco-design/mobile-react";
import { Link } from "next-view-transitions";
import { View } from "@/components/adapt";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  desc: {
    marginTop: 0,
    marginBottom: t.space12,
    color: t.colorTextSecondary,
    fontSize: t.fontSizeSm,
  },
  list: {
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    overflow: "hidden",
  },
}));

export default function ShareDemoIndexPage() {
  const styles = useStyles();

  return (
    <ExampleSubPage title="Share Meta Demo">
      <View className={styles.root}>
        <p className={styles.desc}>
          下面 3 个内容页分别设置了不同的 OG/Twitter 元信息，用于演示分享卡片优化效果。
        </p>
        <Cell.Group className={styles.list} bordered={false}>
          <Link href="/example/share/story-a">
            <Cell label="内容页 A：城市周末指南" showArrow />
          </Link>
          <Link href="/example/share/story-b">
            <Cell label="内容页 B：咖啡地图精选" showArrow />
          </Link>
          <Link href="/example/share/story-c">
            <Cell label="内容页 C：夜跑路线推荐" bordered={false} showArrow />
          </Link>
        </Cell.Group>
      </View>
    </ExampleSubPage>
  );
}
