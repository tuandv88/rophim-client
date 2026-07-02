import { Calendar, Clock, Eye, Star } from "lucide-react";
import type { ReactNode } from "react";
import type { MovieDetail } from "../../../types/movie";
import { getImageUrl } from "../../../utils/image";
import { formatNumber, getFakeViewCount, htmlToText } from "../../../utils/text";
import { Button } from "../../../components/ui/Button";

interface MovieDetailHeroProps {
  movie: MovieDetail;
}

export function MovieDetailHero({ movie }: MovieDetailHeroProps) {
  const poster = getImageUrl(movie.thumb_url || movie.poster_url);
  const categories = movie.category.map((item) => item.name).join(", ");
  const countries = movie.country.map((item) => item.name).join(", ");
  const fakeViews = getFakeViewCount(movie._id || movie.slug);

  return (
    <aside className="md:sticky md:top-24 md:self-start w-full min-w-0">
      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:p-0 md:bg-transparent md:border-0 md:rounded-none">
        
        {/* Main info container: Flex row on mobile, flex col on tablet/desktop */}
        <div className="flex flex-row gap-4 sm:gap-6 md:flex-col md:gap-0 md:border md:border-white/5 md:bg-[#080808]/40 md:rounded-2xl md:overflow-hidden">
          
          {/* Poster: Small card on mobile, full width on tablet/desktop */}
          <div className="w-24 sm:w-36 md:w-full shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-white/5 md:rounded-none md:shadow-none md:border-0">
            <img src={poster} alt={movie.name} className="h-full w-full object-cover" />
          </div>
          
          {/* Text details */}
          <div className="flex-1 min-w-0 space-y-3.5 md:space-y-5 md:p-5">
            <div className="flex flex-wrap gap-1.5">
              <span className="rounded-lg bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">{movie.quality}</span>
              <span className="rounded-lg bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white">{movie.lang}</span>
              <span className="rounded-lg bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white">{movie.episode_current}</span>
            </div>

            <div>
              <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black leading-tight text-white line-clamp-2">{movie.name}</h1>
              <p className="mt-1 text-xs font-semibold text-white/50 truncate">{movie.origin_name}</p>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs text-white/60 md:grid-cols-1 md:gap-2">
              <MetaItem icon={<Calendar className="h-3.5 w-3.5 text-brand" />} value={String(movie.year)} />
              <MetaItem icon={<Clock className="h-3.5 w-3.5 text-brand" />} value={movie.time} />
              <MetaItem icon={<Eye className="h-3.5 w-3.5 text-brand" />} value={`${formatNumber(fakeViews)} lượt xem`} />
              <MetaItem icon={<Star className="h-3.5 w-3.5 fill-brand text-brand" />} value={`TMDB ${movie.tmdb.vote_average || "N/A"}`} />
            </div>

            {movie.trailer_url ? (
              <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="hidden sm:inline-flex md:hidden w-full pt-1.5">
                <Button variant="outline" className="w-full h-9 text-xs rounded-lg font-semibold">
                  Xem Trailer
                </Button>
              </a>
            ) : null}
          </div>
        </div>

        {/* Content & detailed metadata below the fold on mobile, inside sidebar on tablet/desktop */}
        <div className="mt-4 space-y-4 border-t border-white/5 pt-4 md:border-t-0 md:pt-0 md:mt-5 md:p-5 md:bg-[#080808]/40 md:border md:border-white/5 md:rounded-2xl w-full min-w-0">
          {movie.trailer_url ? (
            <a href={movie.trailer_url} target="_blank" rel="noreferrer" className="inline-flex sm:hidden md:inline-flex w-full">
              <Button variant="outline" className="w-full h-10 text-xs sm:text-sm rounded-xl font-bold">
                Xem Trailer
              </Button>
            </a>
          ) : null}

          <p className="line-clamp-6 whitespace-pre-line text-xs sm:text-sm leading-6 text-white/55">
            {htmlToText(movie.content) || "Chưa có mô tả cho phim này."}
          </p>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/5 pt-4 text-xs sm:text-sm md:grid-cols-1 md:space-y-3.5 md:gap-0 md:pt-0 md:border-0 w-full min-w-0">
            <InfoRow label="Thể loại" value={categories} />
            <InfoRow label="Quốc gia" value={countries} />
            <InfoRow label="Đạo diễn" value={movie.director.join(", ")} />
            <InfoRow label="Diễn viên" value={movie.actor.slice(0, 8).join(", ")} />
            <InfoRow label="Trạng thái" value={movie.status} />
            <InfoRow label="Số tập" value={`${movie.episode_current}/${movie.episode_total}`} />
          </dl>
        </div>

      </div>
    </aside>
  );
}

interface MetaItemProps {
  icon: ReactNode;
  value: string;
}

function MetaItem({ icon, value }: MetaItemProps) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      {value}
    </span>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  if (!value) {
    return null;
  }

  return (
    <div className="min-w-0">
      <dt className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/35">{label}</dt>
      <dd className="mt-1 leading-5 text-white/85 truncate">{value}</dd>
    </div>
  );
}
