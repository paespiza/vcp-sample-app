"use client";

import { BuilderComponent, builder } from "@builder.io/react";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// We can't use generateMetadata in a client component, so we'll set the title dynamically
export default function BlogPost({ params }: { params: { slug: string } }) {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await builder.get("blog-posts", { url: `/blog/${params?.slug}` }).promise();
        if (!data) {
          notFound();
        }
        setContent(data);

        // Dynamically set the page title
        document.title = data.data?.title || "Blog post not found";
      } catch (error) {
        console.error("Error fetching Builder.io content:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, [params?.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!content) {
    return null; // notFound() will already be called if content is null
  }

  return <BuilderComponent model="blog-posts" content={content} />;
}