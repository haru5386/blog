import Link from 'next/link';
import { getAllPosts, getAllCategories } from '@/lib/blog-utils';
import { PostCard } from '@/components/blog/post-card';
import PaginationWrapper from '@/components/custom/pagination/paginationWrapper';


const POSTS_PER_PAGE = 10;

export default async function Blog({ searchParams }: { searchParams: { page?: string } }) {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  const currentPage = searchParams.page?.[0] ? parseInt(searchParams.page[0]) : 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(startIndex, endIndex);

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
          {paginatedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
          <PaginationWrapper  currentPage={currentPage} totalPages={totalPages} path="/blog" />
        </div>
      </main>
    </div>
  );
}
