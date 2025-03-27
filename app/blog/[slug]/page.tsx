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
    .get("blog-article", {
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

  const builderContent = content?.data?.builderContent;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{content.data?.title}</h1>
      <p>
        <strong>By:</strong> {content.data?.author} | <strong>Date:</strong> {content.data?.date}
      </p>
      {builderContent && (
        <RenderBuilderContent
          content={builderContent}
          model="blog-article-template"
        />
      )}
    </main>
  );
}
