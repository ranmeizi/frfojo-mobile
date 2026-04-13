"use client";

import Link from "next/link";
import { Cell } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

export default function MinePrivacy() {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <View className={sub.intro}>
        我们仅在提供服务所必需的范围内处理你的信息。以下为常见入口示意。
      </View>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Cell label="个人信息收集清单" showArrow bordered={false} />
        <MineDivider />
        <Cell label="第三方信息共享说明" showArrow bordered={false} />
        <MineDivider />
        <Link href="/mine/about" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell label="用户协议" showArrow bordered={false} />
        </Link>
        <MineDivider />
        <Link href="/mine/about" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell label="隐私政策" showArrow bordered={false} />
        </Link>
      </Cell.Group>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Cell label="广告与个性化推荐" desc="管理兴趣标签" showArrow bordered={false} />
        <MineDivider />
        <Cell label="授权管理" desc="相册、定位等" showArrow bordered={false} />
      </Cell.Group>
    </View>
  );
}
