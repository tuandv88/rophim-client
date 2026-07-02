import { HeroBanner } from "../components/movie/HeroBanner";
import { MovieCarousel } from "../components/movie/MovieCarousel";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Seo } from "../components/seo/Seo";
import { useHomeMovies } from "../features/home/hooks/useHomeMovies";

export function HomePage() {
  const { data, isLoading } = useHomeMovies();
  const movies = data?.data.items ?? [];
  const cdnImage = data?.data.APP_DOMAIN_CDN_IMAGE;
  const trending = movies.slice(1, 11);
  const latest = movies.slice(11, 23);

  return (
    <>
      <Seo
        title={"Rophim - Xem phim online"}
        description={"Xem phim online mới nhất, phim bộ, phim lẻ, hoạt hình và TV Shows."}
      />
      <main>
        <HeroBanner movies={movies} cdnImage={cdnImage} />
        <div className="mx-auto max-w-7xl space-y-12 px-4 py-10 md:px-6 md:py-14">
          <MovieCarousel title="Phim nổi bật" movies={trending} cdnImage={cdnImage} />
          <MovieCarousel title="Phim mới cập nhật" movies={latest} cdnImage={cdnImage} />
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white md:text-2xl">Danh sách phim</h2>
            <MovieGrid movies={movies} cdnImage={cdnImage} isLoading={isLoading} />
          </section>
        </div>
      </main>
    </>
  );
}
