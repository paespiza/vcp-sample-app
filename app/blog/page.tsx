import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import Link from "next/link";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPost {
  id: string;
  data: {
    title: string;
    slug: string;
    publishedDate?: string;
    description?: string;
    image?: string;
  };
}

export default async function BlogPage() {
  const blogPosts = await builder
    .getAll("blog-post", {
      fields: "data.title,data.slug,data.publishedDate,data.description,data.image",
      sort: { publishedDate: -1 },
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(blogPosts as unknown as BlogPost[])?.map((post: BlogPost) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.data.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {post.data.image && (
              <div className="aspect-video relative">
                <img
                  src={post.data.image}
                  alt={post.data.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
              {post.data.publishedDate && (
                <p className="text-gray-500 text-sm mb-2">
                  {new Date(post.data.publishedDate).toLocaleDateString()}
                </p>
              )}
              {post.data.description && (
                <p className="text-gray-600">{post.data.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 