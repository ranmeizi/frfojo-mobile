import { NavStackPage } from "@/components/layout/NavStackPage";
import MineAccountSecurity from "@/features/mine/account-security";

export default function MineAccountSecurityPage() {
  return (
    <NavStackPage title="账号与安全">
      <MineAccountSecurity />
    </NavStackPage>
  );
}
