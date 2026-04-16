import ExampleForm from "@/features/example/example/form";
import { ExampleSubPage } from "@/features/example/example/example-sub-page";

export default function ExampleFormPage() {
  return (
    <ExampleSubPage title="Form">
      <ExampleForm />
    </ExampleSubPage>
  );
}
