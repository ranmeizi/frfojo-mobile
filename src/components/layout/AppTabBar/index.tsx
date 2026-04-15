"use client";

import { TabBar } from '@arco-design/mobile-react';
import { TabBarProps } from '@arco-design/mobile-react/cjs/tab-bar';
import { IconHome, IconKeyboard, IconSetting, IconUser } from '@arco-design/mobile-react/esm/icon';
import { usePathname, useRouter } from 'next/navigation';
import { createStyles, useTokens } from "@/lib/styles/create-styles";
import { View } from "@/components/adapt";
import TabIconMotion from "@/components/widgets/tab/TabIconMotion";
import TabLabelMotion from "@/components/widgets/tab/TabLabelMotion";

type AppTabBarProps = {
  /** Home 全屏视频：透明底栏 + 白色图标/文案，叠在画面上方 */
  immersive?: boolean;
} & TabBarProps;

const tabs = [
    {
        title: 'Home',
        icon: IconHome,
        path: '/home'
    },
    {
        title: 'Testing',
        icon: IconKeyboard,
        path: '/testing'
    },
    {
        title: 'Example',
        icon: IconSetting,
        path: '/example'
    },
    {
        title: 'Mine',
        icon: IconUser,
        path: '/mine'
    }
]

function escapeRegex(source: string) {
    return source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchTabPath(pathname: string, tabPath: string, exact: boolean) {
    const tabSegment = tabPath.replace(/^\/+/, "");
    const safeSegment = escapeRegex(tabSegment);
    const pattern = exact
        ? new RegExp(`(?:^|\\/)${safeSegment}\\/?$`)
        : new RegExp(`(?:^|\\/)${safeSegment}(?:\\/|$)`);
    return pattern.test(pathname);
}

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
    const {
        immersive = false,
        className: tabBarClassName,
        style: tabBarStyle,
        activeCustomStyle,
        ...tabBarRest
    } = props;
    const router = useRouter();
    const pathname = usePathname();
    const styles = useStyles();
    const tokens = useTokens();
    const activeIndex = tabs.findIndex((tab) => {
        return matchTabPath(pathname, tab.path, tab.path === "/example");
    });
    const mergedActiveIndex = activeIndex >= 0 ? activeIndex : 0;
    const mergedActiveCustomStyle = immersive
        ? { color: "var(--token-color-text-inverse)", ...activeCustomStyle }
        : { color: tokens.colorPrimary, ...activeCustomStyle };

    return (
        <View className={immersive ? styles.rootImmersive : styles.root}>
            <TabBar
                {...tabBarRest}
                fixed={false}
                activeIndex={mergedActiveIndex}
                className={[immersive ? "app-tab-bar-immersive" : "app-tab-bar-default", tabBarClassName].filter(Boolean).join(" ") || undefined}
                activeCustomStyle={mergedActiveCustomStyle}
                style={{ zIndex: 3000, ...tabBarStyle }}
            >
                {tabs.map((tab, index) => {
                    const Icon = tab.icon;
                    const isActive = index === mergedActiveIndex;
                    return (
                        <TabBar.Item
                            title={<TabLabelMotion text={tab.title} active={isActive} immersive={immersive} />}
                            icon={<TabIconMotion icon={<Icon />} active={isActive} immersive={immersive} />}
                            key={index}
                            onClick={() => router.replace(tab.path)}
                        />
                    );
                })}
            </TabBar>
        </View>
    );
}