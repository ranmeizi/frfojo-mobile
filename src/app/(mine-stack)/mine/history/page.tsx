import { NavStackPage } from "@/components/layout/NavStackPage";
import { EmptyPlaceholder } from "@/features/mine/empty-placeholder";
import { Page } from "@/components/layout/Page";

export default function MineHistoryPage() {
  return (
    <Page>
    <NavStackPage title="浏览足迹">
      <EmptyPlaceholder title="暂无浏览记录" hint="开启后在此查看最近浏览" />
    </NavStackPage>
    </Page>
  );
}
