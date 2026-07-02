import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../../services/movieService";
import type { MovieListParams } from "../../../types/api";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: movieService.getCategories,
  });
}

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: movieService.getCountries,
  });
}

export function useYears() {
  return useQuery({
    queryKey: ["years"],
    queryFn: movieService.getYears,
  });
}

export function useCategoryMovies(slug: string, params: MovieListParams) {
  return useQuery({
    queryKey: ["category-movies", slug, params],
    queryFn: () => movieService.getCategoryMovies(slug, params),
    enabled: Boolean(slug),
  });
}

export function useCountryMovies(slug: string, params: MovieListParams) {
  return useQuery({
    queryKey: ["country-movies", slug, params],
    queryFn: () => movieService.getCountryMovies(slug, params),
    enabled: Boolean(slug),
  });
}

export function useYearMovies(year: string, params: MovieListParams) {
  return useQuery({
    queryKey: ["year-movies", year, params],
    queryFn: () => movieService.getYearMovies(year, params),
    enabled: Boolean(year),
  });
}
