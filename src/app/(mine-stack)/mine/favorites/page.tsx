import { NavStackPage } from "@/components/layout/NavStackPage";
import { EmptyPlaceholder } from "@/features/mine/empty-placeholder";

export default function MineFavoritesPage() {
  return (
    
    <NavStackPage title="我的收藏">
      <EmptyPlaceholder title="暂无收藏" hint="去逛逛，把喜欢的内容收进来" />
    </NavStackPage>
    
  );
}
