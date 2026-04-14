import { NavStackPage } from "@/components/layout/NavStackPage";
import MineFeedback from "@/features/mine/feedback";
import { Page } from "@/components/layout/Page";

export default function MineFeedbackPage() {
  return (
    <Page>
    <NavStackPage title="意见反馈">
      <MineFeedback />
    </NavStackPage>
    </Page>
  );
}
