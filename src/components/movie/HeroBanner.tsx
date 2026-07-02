import { Play, Info, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { getImageUrl } from "../../utils/image";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

interface HeroBannerProps {
  movies?: Movie[];
  cdnImage?: string;
}

export function HeroBanner({ movies = [], cdnImage }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  // We select the top 5 movies to slide
  const featuredMovies = movies.slice(0, 5);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % featuredMovies.length);
        setIsFading(false);
      }, 400); // Match transition duration
    }, 7000); // Change slides every 7 seconds

    return () => clearInterval(interval);
  }, [featuredMovies.length, currentIndex]);

  const selectSlide = (index: number) => {
    if (index === currentIndex || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsFading(false);
    }, 400);
  };

  if (featuredMovies.length === 0) {
    return (
      <section className="h-[75vh] min-h-[520px] animate-pulse bg-gradient-to-b from-white/5 to-transparent" aria-label="Đang tải phim nổi bật" />
    );
  }

  const movie = featuredMovies[currentIndex]!;
  
  // Get landscape image (poster_url in OPhim is landscape, thumb_url is portrait)
  const getHeroImage = (movie: Movie) => {
    if (movie.poster_url) {
      return getImageUrl(movie.poster_url, cdnImage);
    }
    if (movie.thumb_url) {
      // Derive poster_url from thumb_url by replacing "-thumb" with "-poster"
      const derivedPoster = movie.thumb_url.replace("-thumb.", "-poster.");
      return getImageUrl(derivedPoster, cdnImage);
    }
    return getImageUrl(movie.poster_url || movie.thumb_url, cdnImage);
  };

  const image = getHeroImage(movie);
  const meta = [movie.year, movie.country[0]?.name, movie.category[0]?.name].filter(Boolean).join(" • ");

  return (
    <section className="relative h-[70vh] min-h-[560px] w-full overflow-hidden md:h-[80vh] md:min-h-[700px] group/hero">
      
      {/* Background Poster wrapper with transition */}
      <div className={cn("absolute inset-0 transition-opacity duration-500 bg-ink", isFading ? "opacity-0" : "opacity-100")}>
        <img
          src={image}
          alt={movie.name}
          className="absolute inset-0 h-full w-full object-cover object-center select-none pointer-events-none"
        />
        {/* Dark Overlays for readability and edge blending */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-black/30" />
      </div>
      
      {/* Slide Content wrapper with fade and translate */}
      <div className={cn(
        "relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-20 pt-28 md:px-6 md:pb-24 transition-all duration-500",
        isFading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
      )}>
        <div className="max-w-3xl">
          {/* Pulsating Spotlight badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            <Sparkles className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
            Phim nổi bật hôm nay
          </div>
          
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white drop-shadow-md md:text-6xl lg:text-7xl">
            {movie.name}
          </h1>
          <p className="mt-3 text-lg font-bold text-white/70 drop-shadow md:text-xl">
            {movie.origin_name}
          </p>
          <p className="mt-3 text-sm font-semibold text-white/50">{meta}</p>
          
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={`/phim/${movie.slug}`}>
              <Button className="h-12 px-6 bg-gradient-to-r from-brand to-red-700 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(229,9,20,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_25px_rgba(229,9,20,0.5)] active:scale-95">
                <Play className="h-4.5 w-4.5 fill-current mr-1" aria-hidden="true" />
                Xem ngay
              </Button>
            </Link>
            <Link to={`/phim/${movie.slug}`}>
              <Button variant="outline" className="h-12 px-6 border-white/15 bg-white/5 text-white font-semibold rounded-xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:scale-105 active:scale-95">
                <Info className="h-4.5 w-4.5 mr-1" aria-hidden="true" />
                Chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Slide Dot Indicators */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2.5 md:left-auto md:right-8 md:bottom-8 md:translate-x-0">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => selectSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "w-6 bg-brand shadow-[0_0_8px_rgba(229,9,20,0.6)]" : "w-2 bg-white/30 hover:bg-white/50"
              )}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
