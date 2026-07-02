import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../../services/movieService";

interface UseSearchMoviesOptions {
  keyword: string;
  page: number;
  limit: number;
}

export function useSearchMovies({ keyword, page, limit }: UseSearchMoviesOptions) {
  return useQuery({
    queryKey: ["search-movies", keyword, page, limit],
    queryFn: () => movieService.searchMovies({ keyword, page, limit }),
    enabled: keyword.trim().length > 0,
  });
}
