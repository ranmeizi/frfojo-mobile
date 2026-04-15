import TabViewsLayoutClient from "./tab-views-layout-client";

export default function TabViewsLayout({ children }: { children: React.ReactNode }) {
  return <TabViewsLayoutClient>{children}</TabViewsLayoutClient>;
}
