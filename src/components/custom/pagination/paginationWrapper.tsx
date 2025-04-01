'use client';

import { useRouter } from 'next/navigation';
import QuickPagination from '@/components/custom/pagination/pagination';

export default function PaginationWrapper({ currentPage, totalPages, path }: { currentPage: number; totalPages: number; path: string}) {
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    const target = pageNumber === 1 ? path : `${path}?page=${pageNumber}`;
    router.push(target);
  };

  return <QuickPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} showPreviousNext />;
}