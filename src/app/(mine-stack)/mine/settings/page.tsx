import { NavStackPage } from "@/components/layout/NavStackPage";
import MineSettings from "@/features/mine/settings";
import { Page } from "@/components/layout/Page";

export default function MineSettingsPage() {
  return (
    <Page>
    <NavStackPage title="设置">
      <MineSettings />
    </NavStackPage>
    </Page>
  );
}
