import ExampleNavigation from "@/features/example/example/navigation";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";

export default function ExampleNavigationPage() {
  return (
    <ExampleSubPage title="Navigation">
      <ExampleNavigation />
    </ExampleSubPage>
  );
}
