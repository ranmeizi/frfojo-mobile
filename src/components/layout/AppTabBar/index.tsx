"use client";

import { TabBar } from '@arco-design/mobile-react';
import { TabBarProps } from '@arco-design/mobile-react/cjs/tab-bar';
import { IconHome, IconKeyboard, IconSetting, IconUser } from '@arco-design/mobile-react/esm/icon';
import { usePathname, useRouter } from 'next/navigation';
import { createStyles } from "@/lib/styles/create-styles";
import { View } from "@/components/adapt";

type AppTabBarProps = {
  /** Home 全屏视频：透明底栏 + 白色图标/文案，叠在画面上方 */
  immersive?: boolean;
} & TabBarProps;

const tabs = [
    {
        title: 'Home',
        icon: <IconHome />,
        path: '/home'
    },
    {
        title: 'Testing',
        icon: <IconKeyboard />,
        path: '/testing'
    },
    {
        title: 'Example',
        icon: <IconSetting />,
        path: '/example'
    },
    {
        title: 'Mine',
        icon: <IconUser />,
        path: '/mine'
    }
]

const useStyles = createStyles((t) => ({
    root: {
        background: t.colorTabBarBg,
        borderTop: `1px solid ${t.colorBorder}`,
        paddingBottom: "var(--safe-area-bottom)",
        boxShadow: t.shadow1,
    },
    rootImmersive: {
        background: "transparent",
        borderTop: "none",
        boxShadow: "none",
        paddingBottom: "var(--safe-area-bottom)",
    },
}));

export default function AppTabBar(props: AppTabBarProps) {
    const { immersive = false, className: tabBarClassName, style: tabBarStyle, activeCustomStyle, ...tabBarRest } = props;
    const router = useRouter();
    const pathname = usePathname();
    const styles = useStyles();
    const activeIndex = tabs.findIndex((tab) => {
        if (tab.path === "/example") {
            return pathname === "/example";
        }
        return pathname === tab.path || pathname.startsWith(`${tab.path}/`);
    });
    const mergedActiveIndex = activeIndex >= 0 ? activeIndex : 0;

    return (
        <View className={immersive ? styles.rootImmersive : styles.root}>
            <TabBar
                {...tabBarRest}
                fixed={false}
                activeIndex={mergedActiveIndex}
                className={[immersive ? "app-tab-bar-immersive" : "", tabBarClassName].filter(Boolean).join(" ") || undefined}
                activeCustomStyle={immersive ? { color: "#ffffff", ...activeCustomStyle } : activeCustomStyle}
                style={{ zIndex: 3000, ...tabBarStyle }}
            >
                {tabs.map((tab, index) => (
                    <TabBar.Item title={tab.title} icon={tab.icon} key={index} onClick={() => router.replace(tab.path)} />
                ))}
            </TabBar>
        </View>
    );
}