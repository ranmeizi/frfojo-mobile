"use client";

import { useState } from "react";
import { Avatar, Button, Cell, Divider, Input } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { MineDivider } from "@/features/mine/ui";
import { mineCellGroupClass, useMineSubStyles } from "@/features/mine/sub-styles";
import { createStyles } from "@/lib/styles/create-styles";

const DEMO_AVATAR =
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg";

const useStyles = createStyles((t) => ({
  avatarCard: {
    marginTop: 0,
    background: `linear-gradient(160deg, ${t.colorCard} 0%, ${t.colorBgTertiary} 100%)`,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusXl,
    overflow: "hidden",
    boxShadow: t.shadow1,
  },
  avatarRing: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: t.radiusRound,
    background: `linear-gradient(135deg, ${t.colorBorder} 0%, ${t.colorBgTertiary} 100%)`,
    lineHeight: 0,
    boxSizing: "content-box",
  },
  avatarBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${t.space24} ${t.space16} ${t.space20}`,
  },
  avatarHint: {
    marginTop: t.space12,
    fontSize: t.fontSizeSm,
    lineHeight: 1.55,
    color: t.colorTextSecondary,
  },
  actions: {
    marginTop: t.space24,
    width: "100%",
  },
}));

export default function MineProfile() {
  const sub = useMineSubStyles();
  const styles = useStyles();
  const [nickname, setNickname] = useState("未登录用户");
  const [bio, setBio] = useState("这个人很懒，什么都没写");

  return (
    <View className={sub.pageRoot}>
      <View className={styles.avatarCard}>
        <View className={styles.avatarBlock}>
          <View className={styles.avatarRing}>
            <Avatar size="large" src={DEMO_AVATAR} />
          </View>
          <View className={styles.avatarHint}>点击更换头像（演示）</View>
        </View>
      </View>

      <Cell.Group className={mineCellGroupClass(sub.card)} bordered={false}>
        <Cell label="昵称">
          <Input
            value={nickname}
            onChange={(_, v) => setNickname(v)}
            placeholder="请输入昵称"
            maxLength={20}
          />
        </Cell>
        <MineDivider />
        <Cell label="用户 ID" text="10086" bordered={false} />
        <MineDivider />
        <Cell label="手机号" text="未绑定" showArrow bordered={false} />
        <MineDivider />
        <Cell label="个性签名" bordered={false}>
          <Input
            value={bio}
            onChange={(_, v) => setBio(v)}
            placeholder="一句话介绍自己"
            maxLength={40}
          />
        </Cell>
      </Cell.Group>

      <View className={styles.actions}>
        <Button type="primary" size="large" style={{ width: "100%" }} onClick={() => {}}>
          保存资料（演示）
        </Button>
      </View>
      <View className={sub.hint}>以上为本地演示数据，未接入真实账号体系。</View>
    </View>
  );
}
