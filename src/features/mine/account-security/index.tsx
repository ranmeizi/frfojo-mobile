"use client";

import { Cell } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider, MineSectionLabel } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

export default function MineAccountSecurity() {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <MineSectionLabel first>账号信息</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Cell label="登录密码" desc="定期修改更安全" text="已设置" showArrow bordered={false} />
        <MineDivider />
        <Cell label="手机号" desc="用于登录与找回" text="未绑定" showArrow bordered={false} />
        <MineDivider />
        <Cell label="邮箱" text="未绑定" showArrow bordered={false} />
        <MineDivider />
        <Cell label="第三方账号" desc="微信 · Apple" showArrow bordered={false} />
      </Cell.Group>

      <MineSectionLabel>安全与设备</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Cell label="登录设备管理" desc="查看最近登录" showArrow bordered={false} />
        <MineDivider />
        <Cell label="账号注销" desc="永久删除数据" showArrow bordered={false} />
      </Cell.Group>

      <View className={sub.hint}>敏感操作将二次确认；当前为静态展示。</View>
    </View>
  );
}
