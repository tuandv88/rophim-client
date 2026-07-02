import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
    const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    return start + index;
  });

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Phân trang">
      <Button variant="outline" className="h-10 w-10 p-0" disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "primary" : "outline"}
          className="h-10 w-10 p-0"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        className="h-10 w-10 p-0"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </nav>
  );
}
