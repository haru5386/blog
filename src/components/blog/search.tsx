"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import * as Popover from '@radix-ui/react-popover';
import { Search as SearchIcon } from 'lucide-react';
import type { BlogPost } from '@/types/blog';

interface SearchProps {
  posts: BlogPost[];
}

const POSTS_PER_PAGE = 5;

export function Search({ posts }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<BlogPost[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ['title', 'tags'],
        threshold: 0.3,
      }),
    [posts]
  );

  useEffect(() => {
    if (query) {
      const searchResults = fuse.search(query).map(result => result.item);
      setResults(searchResults);
      setVisiblePosts(POSTS_PER_PAGE);
    } else {
      setResults([]);
    }
  }, [query, fuse]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop <= clientHeight + 50) {
      setVisiblePosts(prev => Math.min(prev + POSTS_PER_PAGE, results.length));
    }
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md border border-input bg-background">
          <SearchIcon className="h-4 w-4" />
          <span>Search posts...</span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="w-[min(calc(100vw-2rem),32rem)] p-4 rounded-lg border bg-popover shadow-md"
          align="start"
          sideOffset={8}
        >
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-3 py-2 rounded-md border bg-background"
            autoFocus
          />

          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="mt-4 max-h-[60vh] overflow-y-auto space-y-4"
          >
            {results.slice(0, visiblePosts).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.category}/${post.slug}`}
                onClick={() => setOpen(false)}
                className="block p-3 rounded-lg hover:bg-muted transition-colors"
              >
                <h3 className="font-medium text-lg">{post.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {post.abstract}
                </p>
              </Link>
            ))}
            {results.length > visiblePosts && (
              <div className="text-center text-sm text-muted-foreground py-2">
                Scroll for more...
              </div>
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
