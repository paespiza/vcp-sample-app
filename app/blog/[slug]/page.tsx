"use client";

import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import { BuilderComponent } from "@builder.io/react";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <RenderBuilderContent 
      model="blog-post" 
      options={{ 
        enrich: true
      }}
    />
  );
} 