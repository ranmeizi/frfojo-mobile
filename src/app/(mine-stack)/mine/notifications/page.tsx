import { NavStackPage } from "@/components/layout/NavStackPage";
import MineNotifications from "@/features/mine/notifications";
import { Page } from "@/components/layout/Page";

export default function MineNotificationsPage() {
  return (
    <Page>
    <NavStackPage title="通知设置">
      <MineNotifications />
    </NavStackPage>
    </Page>
  );
}
