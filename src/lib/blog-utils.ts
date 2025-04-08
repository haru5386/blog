import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { BlogPost, BlogCategory } from '@/types/blog';
import { type ComponentType } from 'react'

const postsDirectory = path.join(process.cwd(),'posts');

function getMDXFiles(dir:string) {
  return fs.readdirSync(dir).filter((file) => file.endsWith('.mdx'))
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return matter(rawContent)
}


function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles
    .map((fileName) => {

      const { data, content } = readMDXFile(path.join(postsDirectory, fileName));

      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title,
        date: format(new Date(data.date), 'yyyy-MM-dd'),
        category: data.category,
        abstract: data.abstract,
        content: content,
        tags: data.tags || [],
      } as BlogPost;
    });
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const allPostsData = getMDXData(postsDirectory)
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}


export async function getPostBySlug(category: string, slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const { data, content } = readMDXFile(fullPath);

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



// 將 kebab-case 轉換為 PascalCase，例如 "transfer-utf8" → "TransferUTF8"
function toPascalCase(str: string) {
  return str
    .replace(/(^\w|-\w)/g, (match) => match.replace('-', '').toUpperCase())
}

const componentsDir = path.join(process.cwd(), 'src/components/posts')

export async function getMDXPostComponents(): Promise<Record<string, ComponentType<unknown>>> {
  const files = fs.readdirSync(componentsDir)
  const components: Record<string, ComponentType<unknown>> = {}

  for (const file of files) {
    if (!file.endsWith('.tsx')) continue

    const baseName = file.replace(/\.tsx$/, '') // e.g. "transfer-utf8"
    const componentName = toPascalCase(baseName) // e.g. "TransferUTF8"

    const component = await import(`@/components/posts/${baseName}`)
    components[componentName] = component.default
  }

  return components
}
