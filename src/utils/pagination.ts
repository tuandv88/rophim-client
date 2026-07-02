import type { Pagination } from "../types/movie";

export function getTotalPages(pagination?: Pagination) {
  if (!pagination) {
    return 1;
  }

  if (pagination.totalPages) {
    return pagination.totalPages;
  }

  return Math.max(1, Math.ceil(pagination.totalItems / pagination.totalItemsPerPage));
}
