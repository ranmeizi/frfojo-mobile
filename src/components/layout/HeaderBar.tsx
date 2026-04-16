"use client";

import type { ReactNode } from "react";
import { createStyles } from "@/lib/styles/create-styles";
import { View } from "@/components/adapt";

type HeaderBarProps = {
  title: string;
  leftSlot?: ReactNode;
};

const useStyles = createStyles((t) => ({
  root: {
    height: "0.88rem",
    padding: `0 ${t.space16}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: t.colorNavBarBg,
    color: t.colorText,
    borderBottom: `1px solid ${t.colorBorder}`,
  },
  side: {
    minWidth: "0.88rem",
  },
  title: {
    fontSize: t.fontSizeLg,
  },
}));

export function HeaderBar({ title, leftSlot }: HeaderBarProps) {
  const styles = useStyles();

  return (
    <View className={styles.root}>
      <View className={styles.side}>{leftSlot}</View>
      <strong className={styles.title}>{title}</strong>
      <View className={styles.side} />
    </View>
  );
}
