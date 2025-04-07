'use client';

import BlogPost from '@/components/Blog/BlogPost';

export default function TestBlogPost() {
  const testPost = {
    title: "Welcome to Our Blog",
    slug: "welcome-to-our-blog",
    image: "https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F61c4f304ac9448b1ad741b83de17e48a",
    date: new Date().toISOString(),
    content: `
      <div>
        <h2>Welcome to our blog!</h2>
        <p>This is a test blog post content. You can edit this in Builder.io!</p>
        <p>Some features of our blog:</p>
        <ul>
          <li>Fully customizable content</li>
          <li>Rich text editing</li>
          <li>Image support</li>
          <li>And much more!</li>
        </ul>
      </div>
    `,
    blurb: "A test blog post to demonstrate our new blog system",
    author: {
      name: "Test Author",
      avatar: "https://cdn.builder.io/api/v1/image/assets%2Fa87584e551b6472fa0f0a2eb10f2c0ff%2F0cde6f8ddd9d482fad53266f8ee0f3ce",
      role: "Content Writer"
    },
    language: "en"
  };

  return (
    <div className="min-h-screen bg-white">
      <BlogPost {...testPost} />
    </div>
  );
} 