import { Calendar, Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { getImageUrl } from "../../utils/image";

interface MovieCardProps {
  movie: Movie;
  cdnImage?: string;
}

export function MovieCard({ movie, cdnImage }: MovieCardProps) {
  const image = getImageUrl(movie.thumb_url || movie.poster_url, cdnImage);
  const categories = movie.category.slice(0, 2).map((item) => item.name).join(", ");

  function translateMovieType(type: string) {
    const types: Record<string, string> = {
      series: "Phim bộ",
      single: "Phim lẻ",
      hoathinh: "Hoạt hình",
      tvshows: "TV Shows",
    };
    return types[type] || type;
  }

  return (
    <Link
      to={`/phim/${movie.slug}`}
      className="group block min-w-0 transition-all duration-300 hover:-translate-y-1.5"
      aria-label={`Xem chi tiết phim ${movie.name}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/5 bg-white/5 shadow-md transition-all duration-300 group-hover:border-brand/30 group-hover:shadow-[0_8px_30px_rgba(229,9,20,0.22)]">
        <img
          src={image}
          alt={movie.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Soft dark vignette gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 group-hover:opacity-95" />
        
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="rounded-lg bg-black/60 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-md border border-white/10 uppercase">
            {translateMovieType(movie.type)}
          </span>
          <span className="grid h-9.5 w-9.5 shrink-0 place-items-center rounded-full bg-brand text-white opacity-0 scale-75 shadow-[0_4px_12px_rgba(229,9,20,0.4)] transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
            <Play className="h-4 w-4 fill-current ml-0.5" aria-hidden="true" />
          </span>
        </div>
      </div>
      <h3 className="mt-3.5 truncate text-sm font-bold text-white transition-colors duration-200 group-hover:text-brand md:text-base">
        {movie.name}
      </h3>
      <p className="mt-1 truncate text-xs font-semibold text-white/40">{movie.origin_name}</p>
      <div className="mt-2 flex items-center gap-2 text-[11px] font-medium text-white/40">
        <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{movie.year || "N/A"}</span>
        {categories ? <span className="truncate border-l border-white/10 pl-2">{categories}</span> : null}
      </div>
    </Link>
  );
}
