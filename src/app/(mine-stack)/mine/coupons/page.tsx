import { NavStackPage } from "@/components/layout/NavStackPage";
import { EmptyPlaceholder } from "@/features/mine/empty-placeholder";

export default function MineCouponsPage() {
  return (
    
    <NavStackPage title="卡券">
      <EmptyPlaceholder title="暂无可用卡券" hint="活动与会员权益将发放至此处" />
    </NavStackPage>
    
  );
}
