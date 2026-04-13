import { NavStackPage } from "@/components/layout/NavStackPage";
import MineNotifications from "@/features/mine/notifications";

export default function MineNotificationsPage() {
  return (
    <NavStackPage title="通知设置">
      <MineNotifications />
    </NavStackPage>
  );
}
