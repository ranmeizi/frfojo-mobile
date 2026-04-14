import ExamplePullRefresh from "@/features/example/example/pull-refresh";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";
import { Page } from "@/components/layout/Page";

export default function ExamplePullRefreshPage() {
  return (
    <Page>
    <ExampleSubPage title="Pull Refresh" scroll={false}>
      <ExamplePullRefresh />
    </ExampleSubPage>
    </Page>
  );
}
