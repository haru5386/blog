import { getAllPosts } from '@/lib/blog-utils';
import { PostCard } from '@/components/blog/post-card';
import PaginationWrapper from '@/components/ui/pagination/paginationWrapper';


const POSTS_PER_PAGE = 10;

export default async function Blog({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const posts = await getAllPosts();
  const { page } = await searchParams

  const currentPage = page?.[0] ? parseInt(page[0]) : 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(startIndex, endIndex);

  return (
    <main className="flex-1 max-w-4xl">
    <h1 className="text-3xl font-bold mb-8">Latest Posts</h1>

    <div className="grid gap-8">
      {paginatedPosts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
      <PaginationWrapper  currentPage={currentPage} totalPages={totalPages} path="/blog" />
    </div>
  </main>
  );
}
