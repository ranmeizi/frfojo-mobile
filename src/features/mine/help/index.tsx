"use client";

import { Cell } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

const faqs = [
  { q: "如何修改登录密码？", a: "设置 → 账号与安全 → 登录密码。" },
  { q: "收不到验证码？", a: "检查短信拦截、号码是否正确，或稍后再试。" },
  { q: "如何联系人工客服？", a: "工作日 9:00–18:00 在线，入口即将开放。" },
];

export default function MineHelp() {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Cell label="常见问题" desc="快速自查" showArrow bordered={false} />
        <MineDivider />
        <Cell label="在线客服" desc="即将接入" showArrow bordered={false} />
        <MineDivider />
        <Cell label="服务进度" desc="工单与反馈记录" showArrow bordered={false} />
      </Cell.Group>

      <View className={sub.sectionHeading}>热门问题</View>
      {faqs.map((item) => (
        <View key={item.q} className={sub.faqCard}>
          <View className={sub.faqQ}>{item.q}</View>
          <View className={sub.faqA}>{item.a}</View>
        </View>
      ))}
    </View>
  );
}
