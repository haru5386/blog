"use client";

import * as React from "react";
import Link from "next/link";
import * as Sheet from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet.Root open={isOpen} onOpenChange={onOpenChange}>
      <Sheet.Trigger asChild>
        <button className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </button>
      </Sheet.Trigger>
      <Sheet.Portal>
        <Sheet.Overlay className="fixed inset-0 z-50 bg-black/50" />
        <Sheet.Content className="fixed inset-y-0 right-0 z-50 w-3/4 bg-background p-6 shadow-lg sm:max-w-sm">
        <Sheet.Title />
          <div className="flex items-center justify-between">
            <Sheet.Close asChild>
              <button className="rounded-sm opacity-70 hover:opacity-100">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </button>
            </Sheet.Close>
          </div>
          <nav className="mt-6 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg font-medium hover:text-foreground/80"
              onClick={() => onOpenChange(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium hover:text-foreground/80"
              onClick={() => onOpenChange(false)}
            >
              Blog
            </Link>
          </nav>
        </Sheet.Content>
      </Sheet.Portal>
    </Sheet.Root>
  );
}
