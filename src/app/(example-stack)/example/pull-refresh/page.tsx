import ExamplePullRefresh from "@/features/example/example/pull-refresh";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";

export default function ExamplePullRefreshPage() {
  return (
    <ExampleSubPage title="Pull Refresh" scroll={false}>
      <ExamplePullRefresh />
    </ExampleSubPage>
  );
}
