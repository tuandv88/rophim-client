import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Pagination } from "../components/movie/Pagination";
import { Seo } from "../components/seo/Seo";
import { TaxonomyFilterSidebar, type TaxonomyFilterValues } from "../features/movies/components/TaxonomyFilterSidebar";
import { useCategories, useCategoryMovies, useCountries, useCountryMovies, useYearMovies } from "../features/movies/hooks/useTaxonomies";
import type { MovieListParams } from "../types/api";
import { getTotalPages } from "../utils/pagination";

type TaxonomyMovieKind = "category" | "country" | "year";

interface TaxonomyMoviePageProps {
  kind: TaxonomyMovieKind;
}

const defaultFilters: TaxonomyFilterValues = {
  category: [],
  country: [],
  year: "",
  sortField: "modified.time",
  sortType: "desc",
};

export function TaxonomyMoviePage({ kind }: TaxonomyMoviePageProps) {
  const params = useParams();
  const slug = params.slug ?? params.year ?? "";
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "24");

  const categoriesQuery = useCategories();
  const countriesQuery = useCountries();
  const categories = categoriesQuery.data?.data ?? [];
  const countries = countriesQuery.data?.data ?? [];

  const filters: TaxonomyFilterValues = useMemo(
    () => ({
      category: splitCommaParam(searchParams.get("category")),
      country: splitCommaParam(searchParams.get("country")),
      year: searchParams.get("year") ?? "",
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
    category: kind === "year" && filters.category.length > 0 ? filters.category.join(",") : undefined,
    country: kind !== "country" && filters.country.length > 0 ? filters.country.join(",") : undefined,
    year: kind !== "year" && filters.year ? filters.year : undefined,
  };

  const categoryQuery = useCategoryMovies(kind === "category" ? slug : "", queryParams);
  const countryQuery = useCountryMovies(kind === "country" ? slug : "", queryParams);
  const yearQuery = useYearMovies(kind === "year" ? slug : "", queryParams);
  const activeQuery = kind === "category" ? categoryQuery : kind === "country" ? countryQuery : yearQuery;

  const movies = activeQuery.data?.data.items ?? [];
  const pagination = activeQuery.data?.data.params.pagination;
  const totalPages = getTotalPages(pagination);

  function updateParams(nextFilters: TaxonomyFilterValues, nextPage = 1) {
    const nextParams = new URLSearchParams();
    nextParams.set("page", String(nextPage));
    nextParams.set("limit", String(limit));
    nextParams.set("sort_field", nextFilters.sortField);
    nextParams.set("sort_type", nextFilters.sortType);
    if (kind === "year" && nextFilters.category.length > 0) nextParams.set("category", nextFilters.category.join(","));
    if (kind !== "country" && nextFilters.country.length > 0) nextParams.set("country", nextFilters.country.join(","));
    if (kind !== "year" && nextFilters.year) nextParams.set("year", nextFilters.year);
    setSearchParams(nextParams);
  }

  return (
    <>
      <Seo
        title={activeQuery.data?.data.seoOnPage.titleHead ?? "Danh sách phim - Rophim"}
        description={activeQuery.data?.data.seoOnPage.descriptionHead ?? "Danh sách phim được cập nhật trên Rophim."}
      />
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase text-brand">Rophim</p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{activeQuery.data?.data.titlePage ?? "Danh sách phim"}</h1>
        </div>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <TaxonomyFilterSidebar
            values={filters}
            categories={categories}
            countries={countries}
            showCategory={kind === "year"}
            showCountry={kind !== "country"}
            showYear={kind !== "year"}
            onApply={(values) => updateParams(values)}
            onReset={() => updateParams(defaultFilters)}
          />
          <section>
            <MovieGrid movies={movies} isLoading={activeQuery.isLoading} />
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

function toSortField(value: string | null): TaxonomyFilterValues["sortField"] {
  if (value === "year" || value === "_id") {
    return value;
  }

  return "modified.time";
}
