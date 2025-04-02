import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import { getPostBySlug, getAllPosts } from '@/lib/blog-utils';

type Params = Promise<{
  category: string;
  slug: string;
}>

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export default async function PostPag(
  { params }: { params: Params }
){
  const { category, slug } = await params
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
    <main className="flex-1 max-w-4xl">
      <div className="max-w-4xl mx-auto w-full">

      <article>
        <h1>{post.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-12 border-b border-border pb-6">
          <time dateTime={post.date}>{post.date}</time>
          <div className="flex gap-2">
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
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              rehypePlugins: [
                [rehypePrettyCode, {
                  theme: 'github-dark',
                  keepBackground: true,
                }],
              ],
            },
          }}
          components={{
            pre: ({ children, ...props }) => (
              <pre
                className="overflow-x-auto rounded-lg p-4 my-4 bg-[#0d1117] text-[#e6edf3]"
                {...props}
              >
                {children}
              </pre>
            ),
            code: ({ children, ...props }) => (
              <code
                className="rounded bg-[#0d1117]/50 px-1.5 py-0.5 text-[0.9em] font-mono"
                {...props}
              >
                {children}
              </code>
            ),
          }}
        />
      </article>
      </div>
    </main>
  );
}
