"use client";

import { useState } from "react";
import { Button, Divider, NavBar, TabBar } from "@arco-design/mobile-react";
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
    overflow: "hidden",
  },
  inner: { padding: t.space12 },
}));

export default function ExampleNavigation() {
  const styles = useStyles();
  const [active, setActive] = useState(1);

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Navigation</h2>

      <div className={styles.block}>
        <NavBar title="NavBar Example" />
        <div className={styles.inner}>
          <Button type="primary" size="mini">
            Primary
          </Button>
          <Divider />
          <p>检查导航背景、分割线、文字对比度。</p>
        </div>
      </div>

      <div className={styles.block}>
        <TabBar activeIndex={active} onChange={setActive} fixed={false}>
          <TabBar.Item icon={<IconHome />} title="Home" />
          <TabBar.Item icon={<IconSetting />} title="Example" />
          <TabBar.Item icon={<IconUser />} title="Mine" />
        </TabBar>
      </div>
    </div>
  );
}
