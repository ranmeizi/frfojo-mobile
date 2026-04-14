import { NavStackPage } from "@/components/layout/NavStackPage";
import MineAbout from "@/features/mine/about";
import { Page } from "@/components/layout/Page";

export default function MineAboutPage() {
  return (
    <Page>
    <NavStackPage title="关于">
      <MineAbout />
    </NavStackPage>
    </Page>
  );
}
