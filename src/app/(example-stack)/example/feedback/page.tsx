import ExampleFeedback from "@/features/example/example/feedback";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { Page } from "@/components/layout/Page";

export default function ExampleFeedbackPage() {
  return (
    <Page>
    <ExampleSubPage title="Feedback & Overlay">
      <ExampleFeedback />
    </ExampleSubPage>
    </Page>
  );
}
