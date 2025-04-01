---
title: Getting Started with Next.js and MDX
date: 2025-03-28
category: tutorials
abstract: Learn how to build a blog using Next.js and MDX with a beautiful, modern design.
tags: [nextjs, mdx, react, typescript]
---

# Getting Started with Next.js and MDX

Next.js is a powerful React framework that makes building web applications a breeze. In this post, we'll explore how to create a blog using Next.js and MDX.

## Why Next.js?

Next.js provides several benefits out of the box:

- Server-side rendering
- Static site generation
- API routes
- File-system based routing
- Built-in TypeScript support

## Project Setup

First, create a new Next.js project with TypeScript:

```bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
```

## Setting up MDX

MDX allows you to use React components directly in your markdown files. First, install the necessary dependencies:

```bash
npm install next-mdx-remote gray-matter
```

Then create a utility function to handle MDX files:

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from '@/types/blog';

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(process.cwd(), 'content/blog', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      content,
      tags: data.tags || [],
    };
  } catch {
    return null;
  }
}
```

## Creating Blog Posts

Now you can create blog posts using markdown with front matter:

```markdown
---
title: My First Blog Post
date: 2025-03-28
tags: [nextjs, react]
---

# Welcome to my blog!

This is my first blog post using **MDX**.

```

## Adding React Components

One of the best features of MDX is the ability to use React components in your markdown:

```jsx
import { Button } from '@/components/ui/button';

# Interactive Blog Post

<Button onClick={() => alert('Hello!')}>
  Click me!
</Button>

## Code Example

```typescript
function greeting(name: string): string {
  return `Hello, ${name}!`;
}
```

## Conclusion

Building a blog with Next.js and MDX is a great way to create content-driven websites. The combination of React's component model and markdown's simplicity makes for an excellent developer experience. With syntax highlighting and proper styling, your blog posts will look professional and be easy to read.
