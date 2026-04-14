import { NavStackPage } from "@/components/layout/NavStackPage";
import MinePrivacy from "@/features/mine/privacy";
import { Page } from "@/components/layout/Page";

export default function MinePrivacyPage() {
  return (
    <Page>
    <NavStackPage title="隐私">
      <MinePrivacy />
    </NavStackPage>
    </Page>
  );
}
