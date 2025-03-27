import { builder, BuilderComponent } from '@builder.io/react';

builder.init('f154bf67d18c42acae68604617b93b4b');

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  const slug = params.slug;

  const content = await builder
    .get('blog-posts', {
      userAttributes: {
        urlPath: `/blog/${slug}`,
      },
      options: { includeRefs: true, noTargeting: true },
    })
    .toPromise();

  if (!content) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Page not found</h1>
      </div>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{content.data?.title || 'Untitled Blog Post'}</h1>
      <p>
        <strong>By:</strong> {content.data?.author || 'Unknown'} |{' '}
        <strong>Date:</strong> {content.data?.date || 'N/A'}
      </p>
      <BuilderComponent model="blog-posts" content={content} />
    </main>
  );
}
