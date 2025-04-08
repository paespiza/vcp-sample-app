import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { notFound } from "next/navigation";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const content = await builder
    .get("blog-post", {
      userAttributes: {
        urlPath: `/blog/${params.slug}`
      },
      options: {
        enrich: true
      }
    })
    .toPromise();

  if (!content) {
    return notFound();
  }

  return (
    <RenderBuilderContent 
      model="blog-post" 
      content={content}
      options={{ 
        enrich: true
      }}
    />
  );
} 