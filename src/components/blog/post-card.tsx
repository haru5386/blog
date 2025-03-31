import Link from 'next/link';
import type { BlogPost } from '@/types/blog';

interface PostCardProps {
  post: BlogPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md p-4 transition-colors">
      <Link href={`/blog/${post.category}/${post.slug}`}>
        <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors mb-2">
          {post.title}
        </h2>
        <div className="flex gap-4 text-sm text-muted-foreground mb-4">
          <time dateTime={post.date}>{post.date}</time>
        </div>
        <p className="text-muted-foreground">{post.abstract}</p>
        <div className="flex gap-2 mt-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-primary/10 text-primary rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
