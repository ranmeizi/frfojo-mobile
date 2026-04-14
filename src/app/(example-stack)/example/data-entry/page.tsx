import ExampleDataEntry from "@/features/example/example/data-entry";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { Page } from "@/components/layout/Page";

export default function ExampleDataEntryPage() {
  return (
    <Page>
    <ExampleSubPage title="Data Entry">
      <ExampleDataEntry />
    </ExampleSubPage>
    </Page>
  );
}
