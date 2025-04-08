import { getAllPosts } from '@/lib/blog-utils';
import { HeaderClient } from './header-client';

export async function Header() {
  const posts = await getAllPosts();

  return <HeaderClient posts={posts} />;
}
