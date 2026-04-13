"use client";

import { Button } from "@arco-design/mobile-react";
import { IconStarFill } from "@arco-design/mobile-react/esm/icon";
import { View } from "@/components/adapt";
import { useMineSubStyles } from "@/features/mine/sub-styles";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  hero: {
    padding: t.space24,
    borderRadius: t.radiusXl,
    background: `linear-gradient(135deg, ${t.colorPrimary} 0%, ${t.colorPrimaryActive} 100%)`,
    color: t.colorTextInverse,
    boxShadow: t.shadow2,
  },
  heroRow: {
    display: "flex",
    alignItems: "center",
    gap: t.space12,
  },
  heroTitle: {
    fontSize: t.fontSizeXl,
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: 1.25,
  },
  heroSub: {
    marginTop: t.space8,
    fontSize: t.fontSizeSm,
    lineHeight: 1.55,
    opacity: 0.92,
  },
  heroIcon: {
    fontSize: 32,
    opacity: 0.95,
    flexShrink: 0,
  },
  cta: {
    marginTop: t.space20,
    width: "100%",
  },
}));

export default function MineMembership() {
  const sub = useMineSubStyles();
  const styles = useStyles();

  return (
    <View className={sub.pageRoot}>
      <View className={styles.hero}>
        <View className={styles.heroRow}>
          <IconStarFill className={styles.heroIcon} />
          <View style={{ minWidth: 0 }}>
            <View className={styles.heroTitle}>会员中心</View>
            <View className={styles.heroSub}>成长值 · 专属权益 · 每月礼包</View>
          </View>
        </View>
        <View className={styles.cta}>
          <Button
            type="primary"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.95)",
              color: "var(--token-color-primary)",
              border: "none",
            }}
            size="large"
            onClick={() => {}}
          >
            立即开通（演示）
          </Button>
        </View>
      </View>

      <View className={`${sub.card} ${sub.membershipBody}`}>
        <View className={sub.membershipSectionTitle}>会员特权预览</View>
        <View className={sub.membershipBullet}>
          · 每月赠送积分与优惠券
          <br />
          · 客服优先接入
          <br />· 新功能抢先体验
        </View>
      </View>
    </View>
  );
}
