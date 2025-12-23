"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) => (
        <span key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Button
              variant={currentPage === page ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              aria-label={`Page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          )}
        </span>
      ))}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
