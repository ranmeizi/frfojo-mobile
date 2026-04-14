import { NavStackPage } from "@/components/layout/NavStackPage";
import MineMembership from "@/features/mine/membership";
import { Page } from "@/components/layout/Page";

export default function MineMembershipPage() {
  return (
    <Page>
    <NavStackPage title="会员中心">
      <MineMembership />
    </NavStackPage>
    </Page>
  );
}
