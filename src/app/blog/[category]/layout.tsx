
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type Params = Promise<{
  category: string;
}>

export default async function Blog({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params:Params
}>) {
  const { category } = await params;


  return (
    <div className="grid gap-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/blog/${category}`} className="text-[20px] font-bold text-black dark:text-gray-400 dark:hover:text-white">{category}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {children}
      </div>
  );
}
