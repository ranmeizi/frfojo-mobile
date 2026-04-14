import { NavStackPage } from "@/components/layout/NavStackPage";
import { EmptyPlaceholder } from "@/features/mine/empty-placeholder";

export default function MineOrdersPage() {
  return (
    
    <NavStackPage title="我的订单">
      <EmptyPlaceholder title="暂无订单" hint="下单后在此查看物流与售后" />
    </NavStackPage>
    
  );
}
