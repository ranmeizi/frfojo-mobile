"use client";

import { useState } from "react";
import { Cell, Switch } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

export default function MineNotifications() {
  const sub = useMineSubStyles();
  const [push, setPush] = useState(true);
  const [marketing, setMarketing] = useState(false);
  const [sound, setSound] = useState(true);

  return (
    <View className={sub.pageRoot}>
      <View className={sub.intro}>选择接收的通知类型；以下为演示开关，刷新后重置。</View>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Cell label="系统通知" desc="订单、安全等重要消息" bordered={false}>
          <Switch platform="ios" checked={push} onClick={(e) => e.stopPropagation()} onChange={setPush} />
        </Cell>
        <MineDivider />
        <Cell label="营销与活动" desc="优惠与活动推荐" bordered={false}>
          <Switch
            platform="ios"
            checked={marketing}
            onClick={(e) => e.stopPropagation()}
            onChange={setMarketing}
          />
        </Cell>
        <MineDivider />
        <Cell label="声音与振动" bordered={false}>
          <Switch platform="ios" checked={sound} onClick={(e) => e.stopPropagation()} onChange={setSound} />
        </Cell>
      </Cell.Group>
    </View>
  );
}
