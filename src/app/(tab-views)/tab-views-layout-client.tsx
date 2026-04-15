"use client";

import { usePathname } from "next/navigation";
import { ScrollView, View } from "@/components/adapt";
import AppTabBar from "@/components/layout/AppTabBar";

const HOME_PREFIX = "/home";

function isHomeFeedPath(pathname: string | null): boolean {
  if (!pathname) {
    return false;
  }
  return pathname === HOME_PREFIX || pathname.startsWith(`${HOME_PREFIX}/`);
}

export default function TabViewsLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = isHomeFeedPath(pathname);

  if (immersive) {
    return (
      <View style={{ position: "relative", height: "100%", width: "100%" }}>
        <main style={{ height: "100%", overflow: "hidden" }}>
          <View style={{ height: "100%", minHeight: 0 }}>{children}</View>
        </main>
        <nav
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "1.02rem",
            zIndex: 3000,
            pointerEvents: "auto",
          }}
        >
          <AppTabBar immersive />
        </nav>
      </View>
    );
  }

  return (
    <View style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <main style={{ flex: 1, minHeight: 0, overflow: "hidden" }}>
        <ScrollView scrollY style={{ height: "100%" }}>
          {children}
        </ScrollView>
      </main>
      <nav style={{ height: "1.02rem", flexShrink: 0 }}>
        <AppTabBar />
      </nav>
    </View>
  );
}
