import Testing from "@/features/example/testing";
import { sleep } from "@/utils";
import { Page } from "@/components/layout/Page";

export default async function TestingPage() {
    // await sleep(1000);
    return (
    <Page keepAlive>
      <Testing />
    </Page>
  );
}