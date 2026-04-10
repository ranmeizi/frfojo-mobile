"use client";

import Link from "next/link";
import { Cell } from "@arco-design/mobile-react";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: {
    padding: t.space16,
    color: t.colorText,
    background: t.colorPageBg,
  },
  title: {
    margin: 0,
    fontSize: t.fontSizeXl,
  },
  desc: {
    marginTop: t.space8,
    marginBottom: t.space16,
    color: t.colorTextSecondary,
    fontSize: t.fontSizeSm,
  },
  list: {
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    overflow: "hidden",
  },
  itemDesc: {
    lineHeight: t.lineHeightLoose,
    fontSize: t.fontSizeSm,
  },
}));

export default function Example() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Arco Example Center</h1>
      <p className={styles.desc}>按功能拆分子路由，便于全面检查主题适配效果</p>

      <Cell.Group className={styles.list} bordered={false}>
        <Link href="/example/data-entry">
          <Cell
            label="Data Entry"
            desc={<span className={styles.itemDesc}>Input, SearchBar, Textarea, Slider, Stepper, Rate, Checkbox, Radio, Switch</span>}
            style={{ minHeight: 68 }}
            showArrow
          />
        </Link>
        <Link href="/example/data-display">
          <Cell
            label="Data Display"
            desc={<span className={styles.itemDesc}>Avatar, Badge, Tag, Cell, Collapse, Tabs, Progress, Skeleton</span>}
            style={{ minHeight: 68 }}
            showArrow
          />
        </Link>
        <Link href="/example/feedback">
          <Cell
            label="Feedback & Overlay"
            desc={<span className={styles.itemDesc}>Toast, Notify, Dialog, Popup, ActionSheet, Loading, NoticeBar</span>}
            style={{ minHeight: 68 }}
            showArrow
          />
        </Link>
        <Link href="/example/navigation">
          <Cell
            label="Navigation"
            desc={<span className={styles.itemDesc}>NavBar, TabBar, Divider, Button（导航相关主题验证）</span>}
            style={{ minHeight: 68 }}
            bordered={false}
            showArrow
          />
        </Link>
      </Cell.Group>
    </div>
  );
}
