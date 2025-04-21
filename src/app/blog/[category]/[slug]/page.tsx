import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog-utils";

import { CustomMDX } from "@/components/blog/mdx";
type Params = Promise<{
  category: string;
  slug: string;
}>;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function PostPag({ params }: { params: Params }) {
  const { category, slug } = await params;
  const post = await getPostBySlug(category, slug);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link
          href="/blog"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-1 md:max-w-4xl max-w-[calc(100vw-48px)] mb-10">
      <div className="md:max-w-4xl mx-auto max-w-[calc(100vw-48px)]">
        <article>
          <h1>{post.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4 mb-8 border-b border-border pb-6">
            <time dateTime={post.date}>{post.date}</time>
            <div className="flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-muted rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <CustomMDX source={post.content} />
        </article>
      </div>
    </main>
  );
}
