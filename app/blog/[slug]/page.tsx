import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import BlogPost from "@/components/Blog/BlogPost";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  console.log('Fetching blog post with slug:', params.slug);
  
  const blogPost = await builder
    .get("blog-post", {
      query: {
        'data.urlPath': `/blog/${params.slug}`
      },
      options: {
        enrich: true,
      },
    })
    .toPromise();

  console.log('Builder.io response:', blogPost);

  if (!blogPost) {
    console.log('Not found by data.urlPath, trying legacy format...');
    
    // Try the old format that works for existing posts
    const altBlogPost = await builder
      .get("blog-post", {
        userAttributes: {
          urlPath: `/blog/${params.slug}`
        },
        options: {
          enrich: true,
        },
      })
      .toPromise();

    if (altBlogPost) {
      return (
        <div className="min-h-screen bg-white">
          <RenderBuilderContent content={altBlogPost} model="blog-post" />
        </div>
      );
    }
    
    return <div>Blog post not found</div>;
  }

  // Extract the data from the Builder.io response
  const postData = {
    title: blogPost.data?.title || 'Untitled Post',
    slug: params.slug,
    image: blogPost.data?.image || 'https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F0cde6f8ddd9d482fad53266f8ee0f3ce',
    date: blogPost.data?.date || new Date().toISOString(),
    content: blogPost.data?.content || '',
    blurb: blogPost.data?.blurb || 'No description available',
    author: blogPost.data?.author || {
      name: "Unknown Author",
      avatar: "https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F0cde6f8ddd9d482fad53266f8ee0f3ce",
      role: "Contributor"
    },
    language: blogPost.data?.language || "en"
  };

  console.log('Processed blog post data:', postData);

  return (
    <div className="min-h-screen bg-white">
      <RenderBuilderContent content={blogPost} model="blog-post" />
    </div>
  );
} 