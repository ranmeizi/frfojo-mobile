import { NavStackPage } from "@/components/layout/NavStackPage";
import MineHelp from "@/features/mine/help";
import { Page } from "@/components/layout/Page";

export default function MineHelpPage() {
  return (
    <Page>
    <NavStackPage title="帮助与客服">
      <MineHelp />
    </NavStackPage>
    </Page>
  );
}
