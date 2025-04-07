import Image from 'next/image';
import { format } from 'date-fns';

interface BlogPostProps {
  title: string;
  slug: string;
  image: string;
  date: string;
  content: string;
  blurb: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  language: string;
}

export default function BlogPost({
  title,
  image,
  date,
  content,
  blurb,
  author,
}: BlogPostProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{author.name}</p>
            <p className="text-sm text-gray-600">{author.role}</p>
          </div>
          <time className="text-sm text-gray-600 ml-auto">
            {format(new Date(date), 'MMMM d, yyyy')}
          </time>
        </div>
        <div className="relative w-full h-[400px] mb-6">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <p className="text-xl text-gray-700">{blurb}</p>
      </header>

      {/* Content Section */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
} 