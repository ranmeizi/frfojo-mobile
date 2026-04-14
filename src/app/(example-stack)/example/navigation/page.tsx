import ExampleNavigation from "@/features/example/example/navigation";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { Page } from "@/components/layout/Page";

export default function ExampleNavigationPage() {
  return (
    <Page>
    <ExampleSubPage title="Navigation">
      <ExampleNavigation />
    </ExampleSubPage>
    </Page>
  );
}
