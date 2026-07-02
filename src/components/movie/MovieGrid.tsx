import type { Movie } from "../../types/movie";
import { EmptyState } from "../feedback/EmptyState";
import { MovieCardSkeleton } from "../feedback/LoadingSkeleton";
import { MovieCard } from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  cdnImage?: string;
  isLoading?: boolean;
}

export function MovieGrid({ movies, cdnImage, isLoading }: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <EmptyState title="Không có phim" description="Không tìm thấy nội dung phù hợp với lựa chọn hiện tại." />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie._id} movie={movie} cdnImage={cdnImage} />
      ))}
    </div>
  );
}
