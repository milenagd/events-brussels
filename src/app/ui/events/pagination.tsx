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
            href={buildRoute(Math.max(props.pagination.page - 1, 1))}
            aria-disabled={props.pagination.page === 1}
            tabIndex={props.pagination.page === 1 ? -1 : 0}
            className={
              props.pagination.page === 1
                ? "pointer-events-none opacity-50"
                : undefined
            }
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
            href={buildRoute(Math.min(props.pagination.page + 1, totalPages))}
            aria-disabled={props.pagination.page === totalPages}
            tabIndex={props.pagination.page === totalPages ? -1 : undefined}
            className={
              props.pagination.page === totalPages
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
