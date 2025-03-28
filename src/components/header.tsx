"use client"

import Link from "next/link"
import { Icon } from "@iconify/react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icon icon="solar:pen-new-square-bold" className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              WindsurfPro
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1">
          <ul className="flex items-center">
            {navigation.map((item) => (
              <li key={item.name}>
                <Button variant="ghost" asChild>
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Icon icon="solar:hamburger-menu-linear" className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="justify-start"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.name}</Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Icon
              icon={theme === "light" ? "solar:moon-bold" : "solar:sun-bold"}
              className="h-5 w-5"
            />
          </Button>
        </div>
      </div>
    </header>
  )
}
