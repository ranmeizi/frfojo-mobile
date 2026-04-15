"use client";

import { View } from "@/components/adapt";
import { NavStackPage } from "@/components/layout/NavStackPage";
import ThemePalette from "@/components/widgets/theme-palette/ThemePalette";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: {
    padding: t.space16,
    background: t.colorPageBg,
    minHeight: "100%",
    boxSizing: "border-box",
  },
}));

export default function TestingPalettePageContent() {
  const styles = useStyles();

  return (
    <NavStackPage title="主题调色板">
      <View className={styles.root}>
        <ThemePalette />
      </View>
    </NavStackPage>
  );
}
