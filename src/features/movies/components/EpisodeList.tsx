import { PlayCircle } from "lucide-react";
import type { EpisodeServer, EpisodeSource } from "../../../types/movie";
import { cn } from "../../../utils/cn";

interface EpisodeListProps {
  episodes: EpisodeServer[];
  selectedEpisode?: EpisodeSource;
  onSelectEpisode: (episode: EpisodeSource) => void;
}

export function EpisodeList({ episodes, selectedEpisode, onSelectEpisode }: EpisodeListProps) {
  if (episodes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-5">
      <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">Danh sách tập phim</h2>
      <div className="space-y-6">
        {episodes.map((server) => (
          <div key={server.server_name} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 shadow-lg">
            <div className="mb-4 flex items-center gap-2.5">
              <PlayCircle className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider">{server.server_name}</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {server.server_data.map((episode) => {
                const isSelected =
                  selectedEpisode?.slug === episode.slug &&
                  selectedEpisode?.filename === episode.filename &&
                  selectedEpisode?.name === episode.name;

                return (
                  <button
                    key={`${server.server_name}-${episode.slug}-${episode.filename}`}
                    type="button"
                    onClick={() => onSelectEpisode(episode)}
                    className={cn(
                      "min-w-[48px] rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/70 transition-all duration-200 hover:border-brand hover:bg-brand/10 hover:text-white active:scale-95",
                      isSelected && "border-transparent bg-gradient-to-r from-brand to-red-700 text-white shadow-[0_4px_12px_rgba(229,9,20,0.35)] hover:from-brand hover:to-red-700",
                    )}
                  >
                    {episode.name}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
