import { builder } from "@builder.io/sdk";
import { notFound } from "next/navigation";
import BlogPostContent from "../../../components/BlogPost/BlogPostContent";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage(props: PageProps) {
  const { slug } = props.params;
  const builderModelName = "blog-post";

  // First try to get the post by slug
  let content = await builder
    .get(builderModelName, {
      userAttributes: {
        urlPath: `/blog/${slug}`
      },
      query: {
        'data.slug': slug
      },
      options: {
        enrich: true
      }
    })
    .toPromise();

  // If not found by slug, try getting by ID (for cases where slug isn't set)
  if (!content) {
    content = await builder
      .get(builderModelName, {
        query: {
          'id': slug
        },
        options: {
          enrich: true
        }
      })
      .toPromise();
  }

  // If no content found, show 404
  if (!content) {
    return notFound();
  }

  return <BlogPostContent content={content} />;
} 