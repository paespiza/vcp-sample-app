import React from 'react';

interface BlogArticleTemplateProps {
  title?: string;
  content?: string;
}

export function BlogArticleTemplate({ title, content }: BlogArticleTemplateProps) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content || '' }} />
    </article>
  );
}
