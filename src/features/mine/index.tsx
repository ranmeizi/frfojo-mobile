"use client";

import type { ReactNode } from "react";
import { Link } from "next-view-transitions";
import { Avatar, Button, Cell, Dialog, Input, Toast } from "@arco-design/mobile-react";
import {
  IconArrowDown,
  IconEdit,
  IconFile,
  IconGift,
  IconHeart,
  IconQuestionCircle,
  IconRefresh,
  IconSetting,
  IconShopping,
  IconSmileFill,
  IconStarFill,
} from "@arco-design/mobile-react/esm/icon";
import { View } from "@/components/adapt";
import { MineDivider, MineListIconSlot, MineSectionLabel } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";
import { arcoImperativeContext } from "@/lib/arco-imperative-context";
import { createStyles } from "@/lib/styles/create-styles";

const DEMO_AVATAR =
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg";

/** 主页独有：顶栏、快捷宫格（字阶与 sub-styles 对齐） */
const useHomeStyles = createStyles((t) => ({
  headerCard: {
    display: "flex",
    alignItems: "center",
    padding: `${t.space16} ${t.space16}`,
  },
  avatarRing: {
    padding: 3,
    borderRadius: t.radiusRound,
    background: `linear-gradient(135deg, ${t.colorBorder} 0%, ${t.colorBgTertiary} 100%)`,
    flexShrink: 0,
  },
  headerMain: {
    flex: 1,
    minWidth: 0,
    marginLeft: t.space12,
  },
  headerName: {
    fontSize: t.fontSizeXl,
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
  },
  headerSub: {
    marginTop: t.space4,
    fontSize: t.fontSizeSm,
    color: t.colorTextSecondary,
    lineHeight: 1.55,
  },
  headerChevron: {
    color: t.colorTextTertiary,
    display: "flex",
    alignItems: "center",
    opacity: 0.85,
  },
  headerShell: {
    background: `linear-gradient(145deg, ${t.colorCard} 0%, ${t.colorBgTertiary} 55%, ${t.colorCard} 100%)`,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusXl,
    boxShadow: t.shadow2,
  },
  quickGrid: {
    display: "flex",
    gap: t.space8,
  },
  quickTile: {
    flex: 1,
    minWidth: 0,
    padding: `${t.space12} ${t.space4}`,
    textAlign: "center",
    textDecoration: "none",
    color: t.colorText,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    boxShadow: t.shadow1,
  },
  quickIconWell: {
    width: 44,
    height: 44,
    margin: `0 auto ${t.space8}`,
    borderRadius: t.radiusRound,
    background: t.colorBgTertiary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: t.colorTextSecondary,
  },
  quickIconGlyph: {
    fontSize: 20,
    lineHeight: 1,
  },
  quickLabel: {
    fontSize: t.fontSizeSm,
    fontWeight: 500,
    lineHeight: 1.35,
    color: t.colorText,
  },
  logoutWrap: {
    marginTop: t.space24,
  },
  footNote: {
    marginTop: t.space24,
    textAlign: "center",
  },
  footNoteInner: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: t.fontSizeXs,
    lineHeight: 1.45,
    color: t.colorTextTertiary,
    opacity: 0.92,
  },
}));

function ListIcon({ children }: { children: ReactNode }) {
  return <MineListIconSlot>{children}</MineListIconSlot>;
}

export default function Mine() {
  const sub = useMineSubStyles();
  const styles = useHomeStyles();

  const confirmLogout = () => {
    Dialog.confirm(
      {
        title: "退出登录",
        children: "确定要退出当前账号吗？",
        okText: "退出",
        cancelText: "取消",
        onOk: () => {
          Toast.success("已退出（演示）", arcoImperativeContext);
        },
      },
      arcoImperativeContext,
    );
  };

  return (
    <View className={sub.pageRoot}>
      <Link href="/mine/profile" style={{ textDecoration: "none", color: "inherit" }}>
        <View className={`${styles.headerShell}`}>
          <View className={styles.headerCard}>
            <View className={styles.avatarRing}>
              <Avatar size="large" src={DEMO_AVATAR} />
            </View>
            <View className={styles.headerMain}>
              <View className={styles.headerName}>未登录用户</View>
              <View className={styles.headerSub}>点击完善资料 · ID 10086</View>
            </View>
            <View className={styles.headerChevron} aria-hidden>
              <IconArrowDown style={{ transform: "rotate(-90deg)", fontSize: 14 }} />
            </View>
          </View>
        </View>
      </Link>
      <Input placeholder="请输入内容" />
      <MineSectionLabel first>快捷入口</MineSectionLabel>
      <View className={styles.quickGrid}>
        {[
          { href: "/mine/favorites", label: "收藏", icon: IconHeart },
          { href: "/mine/history", label: "足迹", icon: IconRefresh },
          { href: "/mine/orders", label: "订单", icon: IconShopping },
          { href: "/mine/coupons", label: "卡券", icon: IconGift },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={styles.quickTile}>
              <View className={styles.quickIconWell}>
                <Icon className={styles.quickIconGlyph} />
              </View>
              <View className={styles.quickLabel}>{item.label}</View>
            </Link>
          );
        })}
      </View>

      <MineSectionLabel>会员与订单</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Link href="/mine/membership" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="会员中心"
            icon={
              <ListIcon>
                <IconStarFill className={sub.listIconGlyph} />
              </ListIcon>
            }
            desc="查看权益与成长值"
            showArrow
            bordered={false}
          />
        </Link>
        <MineDivider />
        <Link href="/mine/orders" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="我的订单"
            icon={
              <ListIcon>
                <IconShopping className={sub.listIconGlyph} />
              </ListIcon>
            }
            desc="全部订单"
            showArrow
            bordered={false}
          />
        </Link>
      </Cell.Group>

      <MineSectionLabel>服务与支持</MineSectionLabel>
      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Link href="/mine/settings" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="设置"
            icon={
              <ListIcon>
                <IconSetting className={sub.listIconGlyph} />
              </ListIcon>
            }
            desc="账号、通知、隐私与外观"
            showArrow
            bordered={false}
          />
        </Link>
        <MineDivider />
        <Link href="/mine/help" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="帮助与客服"
            icon={
              <ListIcon>
                <IconQuestionCircle className={sub.listIconGlyph} />
              </ListIcon>
            }
            showArrow
            bordered={false}
          />
        </Link>
        <MineDivider />
        <Link href="/mine/feedback" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="意见反馈"
            icon={
              <ListIcon>
                <IconEdit className={sub.listIconGlyph} />
              </ListIcon>
            }
            showArrow
            bordered={false}
          />
        </Link>
        <MineDivider />
        <Link href="/mine/about" style={{ textDecoration: "none", color: "inherit" }}>
          <Cell
            label="关于"
            icon={
              <ListIcon>
                <IconFile className={sub.listIconGlyph} />
              </ListIcon>
            }
            showArrow
            bordered={false}
          />
        </Link>
      </Cell.Group>

      <View className={styles.logoutWrap}>
        <Button type="ghost" size="large" style={{ width: "100%" }} onClick={confirmLogout}>
          退出登录
        </Button>
      </View>

      <View className={styles.footNote}>
        <Link href="/mine/about" style={{ textDecoration: "none", color: "inherit" }}>
          <View className={styles.footNoteInner}>
            <IconSmileFill style={{ fontSize: 14, opacity: 0.85 }} />
            <span>安全合规 · 为你守护</span>
          </View>
        </Link>
      </View>
    </View>
  );
}
