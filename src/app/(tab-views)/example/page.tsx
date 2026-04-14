import Example from "@/features/example/example";
import { sleep } from "@/utils";
import { Page } from "@/components/layout/Page";

export default async function ExamplePage() {
  // await sleep(1000);
  return (
    <Page>
      <Example />
    </Page>
  );
}
