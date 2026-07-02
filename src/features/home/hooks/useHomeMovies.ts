import { useQuery } from "@tanstack/react-query";
import { movieService } from "../../../services/movieService";

export function useHomeMovies() {
  return useQuery({
    queryKey: ["home-movies"],
    queryFn: movieService.getHome,
  });
}
