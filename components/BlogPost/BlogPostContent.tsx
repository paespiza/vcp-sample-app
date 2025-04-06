"use client";

import { BuilderContent } from "@builder.io/sdk";
import { RenderBuilderContent } from "../builder";
import { useEffect, useState } from "react";

interface BlogPostContentProps {
  content: BuilderContent | null;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!content) {
    return <div>Post not found</div>;
  }

  return (
    <div className="blog-post-container">
      {/* Optional: Add blog-specific header */}
      {content.data?.title && (
        <div className="blog-post-header py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            {content.data?.publishedDate && (
              <div className="text-gray-500 mb-2">
                {new Date(content.data.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
            <h1 className="text-4xl font-bold mb-4">{content.data.title}</h1>
            {content.data?.description && (
              <p className="text-xl text-gray-700">{content.data.description}</p>
            )}
            {content.data?.author && (
              <div className="mt-4 flex items-center">
                {content.data.authorImage && (
                  <img 
                    src={content.data.authorImage} 
                    alt={content.data.author} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                )}
                <span className="font-medium">{content.data.author}</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Builder content rendering */}
      <div className="blog-post-content container mx-auto px-4 py-8">
        <RenderBuilderContent content={content as any} model="blog-post" options={{ enrich: true }} />
      </div>
      
      {/* Optional: Add blog-specific footer like tags, related posts, etc */}
      {content.data?.tags && content.data.tags.length > 0 && (
        <div className="blog-post-footer container mx-auto px-4 py-8 border-t">
          <div className="flex flex-wrap gap-2">
            {content.data.tags.map((tag: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 