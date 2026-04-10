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
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  title: { margin: 0, fontSize: t.fontSizeLg },
  block: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  row: { display: "flex", gap: t.space8, alignItems: "center", flexWrap: "wrap" },
}));

export default function ExampleDataDisplay() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Data Display</h2>

      <div className={styles.block}>
        <div className={styles.row}>
          <Badge text={8} absolute>
            <Avatar>A</Avatar>
          </Badge>
          <Badge dot absolute>
            <Avatar>B</Avatar>
          </Badge>
          <Tag>Default</Tag>
          <Tag color="primary">Primary</Tag>
        </div>
      </div>

      <div className={styles.block}>
        <Cell.Group bordered={false}>
          <Cell label="Cell Title" desc="Cell description" showArrow />
          <Cell label="Another Cell" text="Right Text" bordered={false} />
        </Cell.Group>
        <Divider />
        <Progress percentage={66} />
      </div>

      <div className={styles.block}>
        <Tabs
          defaultActiveTab={0}
          tabs={[{ title: "Tab A" }, { title: "Tab B" }]}
        >
          <div>Tab A content</div>
          <div>Tab B content</div>
        </Tabs>
        <Divider />
        <Collapse.Group
          defaultActiveItems={["1"]}
          items={[
            { value: "1", header: "Collapse #1", content: "Collapse content 1" },
            { value: "2", header: "Collapse #2", content: "Collapse content 2" },
          ]}
        />
      </div>

      <div className={styles.block}>
        <Skeleton title paragraph={{ rows: 2 }} />
        <Divider />
        <TabBar activeIndex={1} fixed={false}>
          <TabBar.Item icon={<IconHome />} title="Home" />
          <TabBar.Item icon={<IconSetting />} title="Example" />
          <TabBar.Item icon={<IconUser />} title="Mine" />
        </TabBar>
      </div>
    </div>
  );
}
