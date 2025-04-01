
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)

const PaginationContent = ({ className, ...props }:React.ComponentProps<"ul">) => (
  <ul
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem =({ className, ...props }:React.ComponentProps<"div">) => (
  <div className={cn("hover:cursor-pointer", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean;
  disabled?: boolean;
} & Pick<VariantProps<typeof buttonVariants> , "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled = false,
  ...props
}: PaginationLinkProps) => (
  <PaginationItem>
    <a
      aria-current={isActive ? "page" : undefined}
      role="link"
      aria-disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "ghost",
          size,
        }),
        disabled && "cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    />
  </PaginationItem>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Previous</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}