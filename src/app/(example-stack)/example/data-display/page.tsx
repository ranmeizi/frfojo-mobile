import ExampleDataDisplay from "@/features/example/example/data-display";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { Page } from "@/components/layout/Page";

export default function ExampleDataDisplayPage() {
  return (
    <Page>
    <ExampleSubPage title="Data Display">
      <ExampleDataDisplay />
    </ExampleSubPage>
    </Page>
  );
}
