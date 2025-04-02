import Link from 'next/link';
import {  getAllCategories } from '@/lib/blog-utils';

export default async function Blog({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getAllCategories();

  return (
    <div className="flex flex-col lg:flex-row gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <aside className="lg:w-52 flex-shrink-0 space-y-6">
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
{children}
    </div>
  );
}
