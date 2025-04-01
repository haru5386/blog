import Link from 'next/link';
import { getPostsByCategory, getAllCategories } from '@/lib/blog-utils';
import { PostCard } from '@/components/blog/post-card';
import PaginationWrapper from '@/components/custom/pagination/paginationWrapper';
import type { BlogPost } from '@/types/blog';


type Params = Promise<{
  category: string;
  page?: string[];
}>

const POSTS_PER_PAGE = 10;

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((category) => ({
    category: category.name,
  }));
}

export default async function CategoryPage(  
  { params }: { params: Params }
) {
  const { category, page } = await params;
  const posts = await getPostsByCategory(category);

  const currentPage = page?.[0] ? parseInt(page[0]) : 1;
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice(startIndex, endIndex);

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
        <h1 className="text-2xl font-bold">{category}</h1>
      </div>

      <div className="grid gap-8">
        {paginatedPosts.map((post: BlogPost) => (
          <PostCard key={post.slug} post={post} />
        ))}
          <PaginationWrapper  currentPage={currentPage} totalPages={totalPages} path={`/blog/${category}`} />

      </div>
    </div>
  );
}
