"use client";

import {
  Avatar,
  Badge,
  Cell,
  Collapse,
  Divider,
  Progress,
  Skeleton,
  TabBar,
  Tabs,
  Tag,
} from "@arco-design/mobile-react";
import { IconHome, IconSetting, IconUser } from "@arco-design/mobile-react/esm/icon";
import { View } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";

/** Arco 官网 Badge + Avatar 示例图 */
const DEMO_AVATAR_SRC =
  "https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_static_/small_image_5.jpg";

/** 官网红点示例对徽标的微调（仅 dot 尺寸与默认负 margin 组合时常用） */
const BADGE_DOT_FINE_TUNE = { marginLeft: -8, marginTop: 4 } as const;

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  block: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  row: { display: "flex", gap: t.space8, alignItems: "center", flexWrap: "wrap" },
  /** 官网 .rem(padding, 30)；flex 子项勿被拉伸占满一行 */
  badgeDemoAvatarWrap: {
    alignSelf: "flex-start",
  },
  /**
   * 官网 position:relative + inline-block。
   * `left:100%` 相对本盒宽度；flex 行内若盒被撑得很宽，红点会飞到最右侧，故收紧为内容宽。
   */
  badgeDemoAvatarBox: {
    position: "relative",
    display: "inline-block",
    width: "fit-content",
    lineHeight: 0,
  },
}));

export default function ExampleDataDisplay() {
  const styles = useStyles();

  return (
    <View className={styles.root}>
      <View className={styles.block}>
        <View className={styles.row}>
          <View className={styles.badgeDemoAvatarWrap}>
            <View className={styles.badgeDemoAvatarBox}>
              <Avatar size="small" src={DEMO_AVATAR_SRC} />
              <Badge text={8} absolute bordered />
            </View>
          </View>
          <View className={styles.badgeDemoAvatarWrap}>
            <View className={styles.badgeDemoAvatarBox}>
              <Avatar size="small">B</Avatar>
              <Badge dot absolute bordered style={BADGE_DOT_FINE_TUNE} />
            </View>
          </View>
          <Tag>Default</Tag>
          <Tag color="primary">Primary</Tag>
        </View>
      </View>

      <View className={styles.block}>
        <Cell.Group bordered={false}>
          <Cell label="Cell Title" desc="Cell description" showArrow />
          <Cell label="Another Cell" text="Right Text" bordered={false} />
        </Cell.Group>
        <Divider />
        <Progress percentage={66} />
      </View>

      <View className={styles.block}>
        <Tabs
          defaultActiveTab={0}
          tabs={[{ title: "Tab A" }, { title: "Tab B" }]}
        >
          <View>Tab A content</View>
          <View>Tab B content</View>
        </Tabs>
        <Divider />
        <Collapse.Group
          defaultActiveItems={["1"]}
          items={[
            { value: "1", header: "Collapse #1", content: "Collapse content 1" },
            { value: "2", header: "Collapse #2", content: "Collapse content 2" },
          ]}
        />
      </View>

      <View className={styles.block}>
        <Skeleton title paragraph={{ rows: 2 }} />
        <Divider />
        <TabBar activeIndex={1} fixed={false}>
          <TabBar.Item icon={<IconHome />} title="Home" />
          <TabBar.Item icon={<IconSetting />} title="Example" />
          <TabBar.Item icon={<IconUser />} title="Mine" />
        </TabBar>
      </View>
    </View>
  );
}
