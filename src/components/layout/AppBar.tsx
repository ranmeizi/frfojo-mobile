"use client";

import type { ReactNode } from "react";
import { createStyles } from "@/lib/styles/create-styles";
import { View } from "@/components/adapt";

type AppBarProps = {
  title: string;
  rightSlot?: ReactNode;
};

const useStyles = createStyles((t) => ({
  root: {
    height: "44px",
    padding: `0 ${t.space16}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: t.colorNavBarBg,
    color: t.colorText,
    borderBottom: `1px solid ${t.colorBorder}`,
  },
  title: {
    fontSize: t.fontSizeLg,
  },
}));

export function AppBar({ title, rightSlot }: AppBarProps) {
  const styles = useStyles();

  return (
    <View className={styles.root}>
      <strong className={styles.title}>{title}</strong>
      <View>{rightSlot}</View>
    </View>
  );
}
