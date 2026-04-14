import { NavStackPage } from "@/components/layout/NavStackPage";
import MineAppearance from "@/features/mine/appearance";
import { Page } from "@/components/layout/Page";

export default function MineAppearancePage() {
  return (
    <Page>
    <NavStackPage title="外观与显示">
      <MineAppearance />
    </NavStackPage>
    </Page>
  );
}
