import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../../services/movieService";

export function useMovieDetail(slug: string) {
  return useQuery({
    queryKey: ["movie-detail", slug],
    queryFn: () => movieService.getMovieDetail(slug),
    enabled: Boolean(slug),
  });
}

export function useMovieImages(slug: string) {
  return useQuery({
    queryKey: ["movie-images", slug],
    queryFn: () => movieService.getMovieImages(slug),
    enabled: Boolean(slug),
  });
}

export function useMoviePeoples(slug: string) {
  return useQuery({
    queryKey: ["movie-peoples", slug],
    queryFn: () => movieService.getMoviePeoples(slug),
    enabled: Boolean(slug),
  });
}

export function useMovieKeywords(slug: string) {
  return useQuery({
    queryKey: ["movie-keywords", slug],
    queryFn: () => movieService.getMovieKeywords(slug),
    enabled: Boolean(slug),
  });
}
