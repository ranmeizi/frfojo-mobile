"use client";

import { useEffect, useState } from "react";
import { Cell, Switch } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";
import { useThemeStore } from "@/stores/theme-store";
import { useTransitionRouter } from "next-view-transitions";

const useStyles = createStyles((t) => ({
    root: {
        padding: t.space16,
        color: t.colorText,
    },
    title: {
        margin: 0,
        fontSize: t.fontSizeXl,
        lineHeight: t.lineHeightTight,
    },
    desc: {
        marginTop: t.space8,
        marginBottom: t.space16,
        color: t.colorTextSecondary,
        fontSize: t.fontSizeSm,
    },
    list: {
        background: t.colorCard,
        borderRadius: t.radiusLg,
        overflow: "hidden",
        boxShadow: t.shadow1,
        border: `1px solid ${t.colorBorder}`,
    },
}));

export default function Testing() {
    const styles = useStyles();
    const router = useTransitionRouter();
    const theme = useThemeStore((s) => s.theme);
    const setTheme = useThemeStore((s) => s.setTheme);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const offHydrate = useThemeStore.persist.onHydrate(() => setHydrated(false));
        const offFinish = useThemeStore.persist.onFinishHydration(() => setHydrated(true));
        const timer = setTimeout(() => {
            if (useThemeStore.persist.hasHydrated()) {
                setHydrated(true);
            }
        }, 0);
        return () => {
            clearTimeout(timer);
            offHydrate();
            offFinish();
        };
    }, []);

    return (
        <View className={styles.root}>
            <h1 className={styles.title}>Testing</h1>
            <p className={styles.desc}>这里放所有测试功能入口</p>

            <Cell.Group className={styles.list} bordered={false}>
                <Cell
                    label="暗黑模式"
                    desc="切换 light / dark 主题"
                    bordered={false}
                >
                    {hydrated ? (
                        <Switch
                            platform="ios"
                            checked={theme === "dark"}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(next) => setTheme(next ? "dark" : "light")}
                        />
                    ) : (
                        <Switch platform="ios" checked={false} disabled />
                    )}
                </Cell>
                <Cell
                    label="主题调色板"
                    desc="进入二级路由页调整主题颜色与数值 token"
                    bordered={false}
                    showArrow
                    clickable
                    onClick={() => router.push("/testing/palette")}
                />
            </Cell.Group>
        </View>
    );
}