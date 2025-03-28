import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/blog-utils';
import type { BlogPost } from '@/types/blog';

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export default async function CategoryPage({ params }: Props) {
  const posts = await getPostsByCategory(params.category);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Blog
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-2xl font-bold">{params.category}</h1>
      </div>

      <div className="grid gap-8 ">
        {posts.map((post: BlogPost) => (
          <article key={post.slug} className="group  hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md p-4 transition-colors">
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
                    className="text-xs px-2 py-1 bg-muted rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
