import { AlertCircle, Check, Moon, Play, SkipForward, Tv, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { EpisodeSource, MovieDetail } from "../../../types/movie";
import { getImageUrl } from "../../../utils/image";
import { cn } from "../../../utils/cn";

interface WatchPlayerProps {
  movie: MovieDetail;
  episode?: EpisodeSource;
  isTheaterMode?: boolean;
  onToggleTheater?: () => void;
}

export function WatchPlayer({ movie, episode, isTheaterMode = false, onToggleTheater }: WatchPlayerProps) {
  const playerUrl = episode?.link_embed || episode?.link_m3u8 || "";
  const backdrop = getImageUrl(movie.poster_url || movie.thumb_url);
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false);

  // Persistence settings
  const [autoPlay, setAutoPlay] = useState(() => localStorage.getItem("rophim_auto_play") === "true");
  const [autoNext, setAutoNext] = useState(() => localStorage.getItem("rophim_auto_next") === "true");
  const [autoSkip, setAutoSkip] = useState(() => localStorage.getItem("rophim_auto_skip") === "true");

  useEffect(() => {
    setIsPlayerLoaded(false);
  }, [playerUrl]);

  // Handle auto-load if Auto Play is active
  useEffect(() => {
    if (autoPlay && playerUrl) {
      setIsPlayerLoaded(true);
    }
  }, [playerUrl, autoPlay]);

  const toggleSetting = (key: string, currentValue: boolean, setter: (val: boolean) => void) => {
    const newValue = !currentValue;
    setter(newValue);
    localStorage.setItem(key, String(newValue));
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-white/5 bg-black shadow-2xl w-full min-w-0">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        {playerUrl && isPlayerLoaded ? (
          <iframe
            key={playerUrl}
            src={withAutoplayEnabled(playerUrl)}
            title={`${movie.name} - ${episode?.name ?? "Tập"}`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : playerUrl ? (
          <>
            <img src={backdrop} alt={movie.name} className="h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-102" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />
            <button
              type="button"
              onClick={() => setIsPlayerLoaded(true)}
              className="absolute inset-0 grid place-items-center group/play text-white"
              aria-label={`Phát ${movie.name}`}
            >
              <div className="relative">
                {/* Pulsing Ripple Rings */}
                <span className="absolute -inset-4 rounded-full bg-brand/30 blur-md opacity-60 transition-all duration-500 scale-90 group-hover/play:scale-110 group-hover/play:opacity-85" />
                <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-tr from-brand to-red-600 text-white shadow-[0_0_30px_rgba(229,9,20,0.5)] transition-all duration-300 transform group-hover/play:scale-110 active:scale-95">
                  <Play className="h-9 w-9 fill-current ml-1" aria-hidden="true" />
                </span>
              </div>
            </button>
          </>
        ) : (
          <>
            <img src={backdrop} alt={movie.name} className="h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 grid place-items-center bg-black/45 px-4 text-center">
              <div>
                <AlertCircle className="mx-auto mb-3 h-10 w-10 text-brand" aria-hidden="true" />
                <h1 className="text-xl font-bold text-white">Chưa có nguồn phát</h1>
                <p className="mt-2 text-sm text-white/60">Phim này hiện chưa có link xem trực tiếp.</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Player Settings Panel */}
      <div className="border-t border-white/5 bg-[#080808] w-full min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-5 py-4 text-xs font-semibold text-white w-full min-w-0">
          {/* Reactive Toggles */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3.5">
            <PlayerToggle
              icon={<Play className="h-4 w-4" />}
              label="Tự động phát"
              isActive={autoPlay}
              onToggle={() => toggleSetting("rophim_auto_play", autoPlay, setAutoPlay)}
            />
            <PlayerToggle
              icon={<SkipForward className="h-4 w-4" />}
              label="Tập tiếp theo"
              isActive={autoNext}
              onToggle={() => toggleSetting("rophim_auto_next", autoNext, setAutoNext)}
            />
            <PlayerToggle
              icon={<Volume2 className="h-4 w-4" />}
              label="Bỏ qua giới thiệu"
              isActive={autoSkip}
              onToggle={() => toggleSetting("rophim_auto_skip", autoSkip, setAutoSkip)}
            />
            {onToggleTheater && (
              <PlayerToggle
                icon={<Moon className="h-4 w-4" />}
                label="Rạp phim"
                isActive={isTheaterMode}
                onToggle={onToggleTheater}
              />
            )}
          </div>
          
          {/* Metadata Badges */}
          <div className="flex items-center gap-3 border-t border-white/5 pt-3 sm:border-0 sm:pt-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white/80">
              <Tv className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
              {episode?.name ?? movie.episode_current}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 border border-brand/20 px-3 py-1 text-brand">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              {movie.quality} {movie.lang}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function withAutoplayEnabled(url: string) {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set("autoplay", "1");
    parsedUrl.searchParams.set("autoPlay", "1");
    return parsedUrl.toString();
  } catch {
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}autoplay=1`;
  }
}

interface PlayerToggleProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onToggle: () => void;
}

function PlayerToggle({ icon, label, isActive, onToggle }: PlayerToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-2 group/toggle select-none"
    >
      <span className={cn("transition", isActive ? "text-brand" : "text-white/35 group-hover/toggle:text-white/60")}>
        {icon}
      </span>
      <span className="text-white/60 transition group-hover/toggle:text-white">{label}</span>
      <span
        className={cn(
          "relative inline-flex h-4.5 w-8.5 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
          isActive ? "bg-brand" : "bg-white/10"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out",
            isActive ? "translate-x-4" : "translate-x-0"
          )}
        />
      </span>
    </button>
  );
}
