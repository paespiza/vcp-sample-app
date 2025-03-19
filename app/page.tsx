import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../components/builder";

// Directly use the public API key
builder.init("f154bf67d18c42acae68604617b93b4b");

export default async function Homepage() {
  const builderModelName = "page";

  const content = await builder
    .get(builderModelName, {
      userAttributes: { urlPath: "/", options: { enrich: true } },
    })
    .toPromise();

  return (
    <>
      <RenderBuilderContent content={content} model={builderModelName} options={{ enrich: true }} />
    </>
  );
}
