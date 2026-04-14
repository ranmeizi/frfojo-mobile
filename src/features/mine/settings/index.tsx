"use client";

import { Link } from "next-view-transitions";
import { Cell } from "@arco-design/mobile-react";
import {
  IconCheckBold,
  IconEyeVisible,
  IconNotice,
  IconSetting,
} from "@arco-design/mobile-react/esm/icon";
import { View } from "@/components/adapt";
import { MineDivider, MineListIconSlot, MineSectionLabel } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";

export default function MineSettings() {
  const sub = useMineSubStyles();

  return (
    <View className={sub.pageRoot}>
      <MineSectionLabel first>账号与偏好</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false} style={{ marginTop: 0 }}>
        <Link href="/mine/account-security" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="账号与安全"
            desc="密码、手机、第三方账号"
            showArrow
            bordered={false}
            icon={
              <MineListIconSlot>
                <IconCheckBold className={sub.listIconGlyph} />
              </MineListIconSlot>
            }
          />
        </Link>
        <MineDivider />
        <Link href="/mine/notifications" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="通知设置"
            desc="推送与站内消息"
            showArrow
            bordered={false}
            icon={
              <MineListIconSlot>
                <IconNotice className={sub.listIconGlyph} />
              </MineListIconSlot>
            }
          />
        </Link>
        <MineDivider />
        <Link href="/mine/privacy" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="隐私"
            desc="授权与个人信息"
            showArrow
            bordered={false}
            icon={
              <MineListIconSlot>
                <IconEyeVisible className={sub.listIconGlyph} />
              </MineListIconSlot>
            }
          />
        </Link>
        <MineDivider />
        <Link href="/mine/appearance" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="外观与显示"
            desc="深色模式等"
            showArrow
            bordered={false}
            icon={
              <MineListIconSlot>
                <IconSetting className={sub.listIconGlyph} />
              </MineListIconSlot>
            }
          />
        </Link>
      </Cell.Group>

      <MineSectionLabel>帮助与支持</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Link href="/mine/help" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell label="帮助中心" showArrow bordered={false} />
        </Link>
        <MineDivider />
        <Link href="/mine/feedback" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell label="意见反馈" showArrow bordered={false} />
        </Link>
        <MineDivider />
        <Link href="/mine/about" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell label="关于" showArrow bordered={false} />
        </Link>
      </Cell.Group>

      <View className={sub.hint}>
        设置项为产品级导航骨架，后续可对接真实配置与权限。
      </View>
    </View>
  );
}
