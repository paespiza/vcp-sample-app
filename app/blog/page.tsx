import { builder, BuilderContent } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPost {
  title: string;
  slug: string;
  image: string;
  date: string;
  blurb: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  language: string;
}

export default async function BlogPage() {
  // Fetch all published blog posts
  const blogPosts = await builder
    .getAll('blog-post', {
      fields: 'data.title,data.blurb,data.image,data.date,data.author,data.language,data.urlPath,name,lastUpdated',
      options: {
        noTargeting: true
      },
      limit: 100,
    });

  // Log the response to help debug
  console.log('Builder.io blog posts response:', blogPosts);

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
          <p className="text-center text-gray-600">No blog posts found. Create some posts in Builder.io first!</p>
        </div>
      </div>
    );
  }

  // Transform the blog posts data
  const posts: BlogPost[] = blogPosts.map((post: BuilderContent) => ({
    title: post.data?.title || 'Untitled Post',
    slug: post.data?.urlPath?.replace('/blog/', '') || post.name?.toLowerCase().replace(/\s+/g, '-') || '',
    image: post.data?.image || 'https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F0cde6f8ddd9d482fad53266f8ee0f3ce',
    date: post.data?.date || post.lastUpdated || new Date().toISOString(),
    blurb: post.data?.blurb || 'No description available',
    author: post.data?.author || {
      name: "Unknown Author",
      avatar: "https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F0cde6f8ddd9d482fad53266f8ee0f3ce",
      role: "Contributor"
    },
    language: post.data?.language || "en"
  }));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: BlogPost) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative aspect-[16/9] mb-4 overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                {post.title}
              </h2>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm text-gray-600">{post.author.name}</span>
              </div>
              <p className="text-gray-600 mb-3 line-clamp-2">{post.blurb}</p>
              <time className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
} 