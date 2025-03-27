import React from "react";

export function BlogArticleTemplate({
  title,
  content,
}: {
  title?: string;
  content?: string;
}) {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content || "" }} />
    </article>
  );
}
