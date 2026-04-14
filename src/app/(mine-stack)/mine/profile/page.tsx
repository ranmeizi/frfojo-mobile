import { NavStackPage } from "@/components/layout/NavStackPage";
import MineProfile from "@/features/mine/profile";
import { Page } from "@/components/layout/Page";

export default function MineProfilePage() {
  return (
    <Page>
    <NavStackPage title="个人资料">
      <MineProfile />
    </NavStackPage>
    </Page>
  );
}
