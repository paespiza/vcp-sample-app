import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";
import Link from "next/link";
import type { BuilderContent } from "@builder.io/sdk";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface PageProps {
  params: {};
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function BlogPage(props: PageProps) {
  const builderModelName = "blog-post";
  
  // Get main blog page content if it exists
  const pageContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/blog"
      }
    })
    .toPromise();
  
  // Get all blog posts - use a different approach for getAll
  const blogPostsResponse = await builder
    .getAll(builderModelName, {
      options: {
        enrich: true
      },
      // Optional: You can add filtering, ordering, pagination here as needed
      // query: {
      //   'data.category': 'technology'
      // }
    });
     
  // The response is already a Promise<BuilderContent[]>
  const blogPosts = await blogPostsResponse;

  return (
    <>
      {/* Render the main blog page content from Builder if it exists */}
      {pageContent && (
        <RenderBuilderContent content={pageContent as any} model="page" options={{ enrich: true }} />
      )}
      
      {/* If no Builder content exists for the blog index page, show a default blog listing */}
      {!pageContent && (
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts?.map((post: BuilderContent, index: number) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                {post.data?.featuredImage && (
                  <img 
                    src={post.data.featuredImage} 
                    alt={post.data.title || "Blog post"} 
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{post.data?.title}</h2>
                  {post.data?.publishedDate && (
                    <div className="text-gray-500 text-sm mb-2">
                      {new Date(post.data.publishedDate).toLocaleDateString()}
                    </div>
                  )}
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.data?.description}</p>
                  <Link 
                    href={`/blog/${post.data?.slug || post.id}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {blogPosts?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
} 