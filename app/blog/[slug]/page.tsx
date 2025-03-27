import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init("f154bf67d18c42acae68604617b93b4b");

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  const slug = params.slug;

  const content = await builder
    .get("blog-posts", {
      userAttributes: {
        urlPath: `/blog/${slug}`,
      },
      options: { includeRefs: true, noTargeting: true },
    })
    .toPromise();

  if (!content) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Page not found</h1>
      </div>
    );
  }

  return (
    <RenderBuilderContent
      content={content}
      model="blog-posts"
    />
  );
}
