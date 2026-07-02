import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../../services/movieService";
import type { MovieListParams } from "../../../types/api";

export function useMovieList(slug: string, params: MovieListParams) {
  return useQuery({
    queryKey: ["movie-list", slug, params],
    queryFn: () => movieService.getMovieList(slug, params),
    enabled: Boolean(slug),
  });
}
