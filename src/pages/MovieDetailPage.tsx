import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { EmptyState } from "../components/feedback/EmptyState";
import { LoadingSkeleton } from "../components/feedback/LoadingSkeleton";
import { Seo } from "../components/seo/Seo";
import { EpisodeList } from "../features/movies/components/EpisodeList";
import { ImageGallery } from "../features/movies/components/ImageGallery";
import { KeywordList } from "../features/movies/components/KeywordList";
import { MovieDetailHero } from "../features/movies/components/MovieDetailHero";
import { PeopleCarousel } from "../features/movies/components/PeopleCarousel";
import { WatchPlayer } from "../features/movies/components/WatchPlayer";
import { useMovieDetail, useMovieImages, useMovieKeywords, useMoviePeoples } from "../features/movies/hooks/useMovieDetail";
import type { EpisodeSource } from "../types/movie";

export function MovieDetailPage() {
  const { slug = "" } = useParams();
  const detailQuery = useMovieDetail(slug);
  const imagesQuery = useMovieImages(slug);
  const peoplesQuery = useMoviePeoples(slug);
  const keywordsQuery = useMovieKeywords(slug);

  const movie = detailQuery.data?.data.item;
  const images = imagesQuery.data?.data.images ?? [];
  const peoples = peoplesQuery.data?.data.peoples ?? [];
  const keywords = keywordsQuery.data?.data.keywords ?? [];
  const allEpisodes = useMemo(() => movie?.episodes.flatMap((server) => server.server_data) ?? [], [movie]);
  const [selectedEpisode, setSelectedEpisode] = useState<EpisodeSource | undefined>();
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  useEffect(() => {
    setSelectedEpisode(allEpisodes[0]);
  }, [allEpisodes]);

  // Reset theater mode when changing movie
  useEffect(() => {
    setIsTheaterMode(false);
  }, [slug]);

  if (detailQuery.isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <LoadingSkeleton className="aspect-[2/3] rounded-lg" />
          <div className="space-y-4 md:col-span-2">
            <LoadingSkeleton className="h-12 w-3/4" />
            <LoadingSkeleton className="aspect-video w-full" />
            <LoadingSkeleton className="h-32 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <EmptyState title="Không tìm thấy phim" description="Phim này không tồn tại hoặc dữ liệu chưa sẵn sàng." />
      </main>
    );
  }

  return (
    <>
      <Seo
        title={detailQuery.data?.data.seoOnPage.titleHead ?? `${movie.name} - Rophim`}
        description={detailQuery.data?.data.seoOnPage.descriptionHead ?? `Xem thông tin phim ${movie.name} trên Rophim.`}
      />
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6 transition-all duration-350 w-full max-w-full overflow-hidden md:overflow-visible">
        {isTheaterMode ? (
          <div className="space-y-8 w-full min-w-0">
            <WatchPlayer
              movie={movie}
              episode={selectedEpisode}
              isTheaterMode={isTheaterMode}
              onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
            />
            <div className="grid gap-6 md:grid-cols-3 w-full min-w-0">
              <div className="w-full min-w-0">
                <MovieDetailHero movie={movie} />
              </div>
              <div className="space-y-10 md:col-span-2 w-full min-w-0">
                <EpisodeList episodes={movie.episodes} selectedEpisode={selectedEpisode} onSelectEpisode={setSelectedEpisode} />
                <PeopleCarousel peoples={peoples} />
                <ImageGallery images={images} />
                <KeywordList keywords={keywords} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3 w-full min-w-0">
            <div className="w-full min-w-0">
              <MovieDetailHero movie={movie} />
            </div>
            <div className="space-y-10 md:col-span-2 w-full min-w-0">
              <WatchPlayer
                movie={movie}
                episode={selectedEpisode}
                isTheaterMode={isTheaterMode}
                onToggleTheater={() => setIsTheaterMode(!isTheaterMode)}
              />
              <EpisodeList episodes={movie.episodes} selectedEpisode={selectedEpisode} onSelectEpisode={setSelectedEpisode} />
              <PeopleCarousel peoples={peoples} />
              <ImageGallery images={images} />
              <KeywordList keywords={keywords} />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
