import { useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Pagination } from "../components/movie/Pagination";
import { Seo } from "../components/seo/Seo";
import { FilterSidebar, type FilterFormValues } from "../features/movies/components/FilterSidebar";
import { useMovieList } from "../features/movies/hooks/useMovieList";
import type { MovieListParams } from "../types/api";
import { getTotalPages } from "../utils/pagination";

const defaultFilters: FilterFormValues = {
  country: [],
  year: "",
  sortField: "modified.time",
  sortType: "desc",
};

export function MovieListPage() {
  const { slug = "phim-moi" } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "24");

  const filters: FilterFormValues = useMemo(
    () => ({
      country: splitCommaParam(searchParams.get("country")),
      year: searchParams.get("year") ?? defaultFilters.year,
      sortField: toSortField(searchParams.get("sort_field")),
      sortType: searchParams.get("sort_type") === "asc" ? "asc" : "desc",
    }),
    [searchParams],
  );

  const queryParams: MovieListParams = {
    page,
    limit,
    sort_field: filters.sortField,
    sort_type: filters.sortType,
    country: filters.country.length > 0 ? filters.country.join(",") : undefined,
    year: filters.year || undefined,
  };

  const { data, isLoading } = useMovieList(slug, queryParams);
  const movies = data?.data.items ?? [];
  const pagination = data?.data.params.pagination;
  const totalPages = getTotalPages(pagination);

  function updateParams(nextFilters: FilterFormValues, nextPage = 1) {
    const params = new URLSearchParams();
    params.set("page", String(nextPage));
    params.set("limit", String(limit));
    params.set("sort_field", nextFilters.sortField);
    params.set("sort_type", nextFilters.sortType);
    if (nextFilters.country.length > 0) params.set("country", nextFilters.country.join(","));
    if (nextFilters.year) params.set("year", nextFilters.year);
    setSearchParams(params);
  }

  return (
    <>
      <Seo
        title={data?.data.seoOnPage.titleHead ?? "Danh sách phim - Rophim"}
        description={data?.data.seoOnPage.descriptionHead ?? "Khám phá danh sách phim theo quốc gia và năm sản xuất."}
      />
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase text-brand">Rophim</p>
            <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{data?.data.titlePage ?? "Danh sách phim"}</h1>
          </div>
          <button className="text-left text-sm text-white/55 hover:text-white md:text-right" type="button" onClick={() => navigate("/")}>
            Quay lại trang chủ
          </button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <FilterSidebar values={filters} onApply={(values) => updateParams(values)} onReset={() => updateParams(defaultFilters)} />
          <section>
            <MovieGrid movies={movies} isLoading={isLoading} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={(nextPage) => updateParams(filters, nextPage)} />
          </section>
        </div>
      </main>
    </>
  );
}

function splitCommaParam(value: string | null) {
  return value?.split(",").map((item) => item.trim()).filter(Boolean) ?? [];
}

function toSortField(value: string | null): FilterFormValues["sortField"] {
  if (value === "year" || value === "_id") {
    return value;
  }

  return "modified.time";
}
