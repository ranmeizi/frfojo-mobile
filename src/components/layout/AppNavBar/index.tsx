"use client";

import { NavBar } from "@arco-design/mobile-react";
import type { NavBarProps } from "@arco-design/mobile-react/cjs/nav-bar";
import { PropsWithChildren } from "react";
import { createStyles } from "@/lib/styles/create-styles";
import { View } from "@/components/adapt";


type AppNavBarProps = NavBarProps & {

};

const useStyles = createStyles((t) => ({
    root: {
        background: t.colorNavBarBg,
        color: t.colorText,
        borderBottom: `1px solid ${t.colorBorder}`,
        paddingTop: "var(--safe-area-top)",
    },
}));

/**
 * 目前没想好在这里做什么，但先需要一个这个组件，目前先传递所有参数
 */
export function AppNavBar({ children, ...props }: PropsWithChildren<AppNavBarProps>) {
    const styles = useStyles();

    return (
        <View className={styles.root}>
            <NavBar {...props}>{children}</NavBar>
        </View>
    );
}