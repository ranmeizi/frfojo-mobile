import { NavStackPage } from "@/components/layout/NavStackPage";
import MineProfile from "@/features/mine/profile";

export default function MineProfilePage() {
  return (
    <NavStackPage title="个人资料">
      <MineProfile />
    </NavStackPage>
  );
}
