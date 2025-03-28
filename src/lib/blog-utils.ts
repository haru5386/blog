import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { BlogPost, BlogCategory } from '@/types/blog';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.md$/, ''),
        title: data.title,
        date: format(new Date(data.date), 'yyyy-MM-dd'),
        category: data.category,
        abstract: data.abstract,
        content: content,
        tags: data.tags || [],
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(category: string, slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    if (data.category !== category) {
      return null;
    }

    return {
      slug,
      title: data.title,
      date: format(new Date(data.date), 'yyyy-MM-dd'),
      category: data.category,
      abstract: data.abstract,
      content: content,
      tags: data.tags || [],
    };
  } catch {
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

export async function getAllCategories(): Promise<BlogCategory[]> {
  const posts = await getAllPosts();
  const categories = posts.reduce((acc, post) => {
    const category = acc.find((cat) => cat.name === post.category);
    if (category) {
      category.count += 1;
    } else {
      acc.push({ name: post.category, count: 1 });
    }
    return acc;
  }, [] as BlogCategory[]);

  return categories.sort((a, b) => b.count - a.count);
}
