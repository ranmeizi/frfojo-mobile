import { NavStackPage } from "@/components/layout/NavStackPage";
import MineAccountSecurity from "@/features/mine/account-security";
import { Page } from "@/components/layout/Page";

export default function MineAccountSecurityPage() {
  return (
    <Page>
    <NavStackPage title="账号与安全">
      <MineAccountSecurity />
    </NavStackPage>
    </Page>
  );
}
