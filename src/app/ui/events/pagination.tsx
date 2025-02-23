"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname } from "next/navigation";

import { PaginationType } from "../../services/fetchEvents";

export function CustomPagination(props: { pagination: PaginationType }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalPages = Math.ceil(
    props.pagination.resultCount / props.pagination.pageCount,
  );

  const buildRoute = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(newPage));
    params.delete("category");
    params.delete("isFree");
    params.delete("location");
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={props.pagination.page === 1}
            href={buildRoute(Math.max(props.pagination.page - 1, 1))}
          />
        </PaginationItem>
        {props.pagination.page > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="#">{props.pagination.page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={props.pagination.page === totalPages}
            href={buildRoute(Math.min(props.pagination.page + 1, totalPages))}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
