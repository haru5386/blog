import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
    h1: (props) => <h1 className="text-[2rem] leading-tight font-black my-6" {...props} />,
    h2: (props) => <h2 className="text-[1.75rem] leading-16 font-bold my-6" {...props} />,
    h3: (props) => <h3 className="text-[1.5rem] leading-tight font-bold my-5" {...props} />,
    h4: (props) => <h4 className="text-[1.25rem] leading-10 font-bold my-4" {...props} />,
    h5: (props) => <h5 className="text-[1.125rem] leading-10 font-bold my-4" {...props} />,
    h6: (props) => <h6 className="text-[1.125rem] leading-tight font-bold my-3" {...props} />,

    p: (props) => <p className="text-[1rem] leading-normal font-normal my-4" {...props} />,
    blockquote: (props) => (
    <blockquote className="border-l-4 border-muted pl-4 italic text-muted-foreground my-6" {...props} />
    ),
    ul: (props) => <ul className="list-disc pl-6 my-4 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal pl-6 my-4 space-y-2" {...props} />,
    li: (props) => <li className="ml-2" {...props} />,
    hr: () => <hr className="my-8 border-border" />,
    a: (props) => (
    <Link
    className="text-primary underline hover:text-primary/80 transition-colors"
    {...props}
    href={props.href || "#"}
    >
    {props.children}
    </Link>
    ),
    pre: ({ children, ...props }) => (
      <pre
        className="overflow-x-auto rounded-lg p-4 my-4 bg-gray-100 text-[#e6edf3]"
        {...props}
      >
          {children}
      </pre>
    ),
    code: ({ children, ...props }) => (
      <code
        className="rounded bg-gray-100 px-1.5 py-0.5 text-[0.9em] font-mono text-[#032F62]"
        {...props}
      >
        {children}
      </code>
    ),
  }