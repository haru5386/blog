"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search } from '@/components/blog/search';
import { ModeToggle } from '@/components/mode-toggle';
import { MobileMenu } from './mobile-menu';
import { Icon } from '@iconify/react';
import type { BlogPost } from '@/types/blog';

interface HeaderClientProps {
  posts: BlogPost[];
}

export function HeaderClient({ posts }: HeaderClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/" className="flex items-center space-x-2">
              <Icon icon="carbon:blog" className="h-8 w-8" />
              <span className="font-bold text-xl hidden sm:inline-block">My Blog</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Search posts={posts} />
            <ModeToggle />
            <MobileMenu isOpen={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
          </div>
        </div>
      </div>
    </header>
  );
}
