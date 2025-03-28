import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog-utils';

export default async function Blog() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <aside className="lg:w-64 flex-shrink-0 space-y-6">
        <div className="sticky top-24 lg:block hidden">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <nav className="space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/blog/${category.name}`}
                className="block px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
              >
                {category.name}
                <span className="ml-2 text-muted-foreground">({category.count})</span>
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>

        <div className="grid gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md p-4 transition-colors">
              <Link href={`/blog/${post.category}/${post.slug}`}>
                <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors mb-2">
                  {post.title}
                </h2>
                <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                  <time dateTime={post.date}>{post.date}</time>
                  <span>·</span>
                  <span>{post.category}</span>
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
      </main>
    </div>
  );
}
