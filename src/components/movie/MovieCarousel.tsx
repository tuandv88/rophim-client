import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Movie } from "../../types/movie";
import { MovieCard } from "./MovieCard";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  cdnImage?: string;
}

export function MovieCarousel({ title, movies, cdnImage }: MovieCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      // Run once on load and when movies change
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [movies]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="group/carousel relative space-y-4">
      <div className="flex items-end justify-between px-1">
        <h2 className="text-xl font-bold tracking-tight text-white md:text-2xl">{title}</h2>
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-[40%] z-20 -translate-y-1/2 flex h-12 w-10 items-center justify-center rounded-r-xl border-y border-r border-white/10 bg-[#050505]/85 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-brand hover:border-brand hover:scale-105 active:scale-95 group-hover/carousel:opacity-100 shadow-[4px_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Cuộn sang trái"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex w-full gap-5 overflow-x-auto scroll-smooth pb-4 px-1 no-scrollbar select-none"
        >
          {movies.map((movie) => (
            <div key={movie._id} className="w-[145px] sm:w-[175px] md:w-[195px] shrink-0">
              <MovieCard movie={movie} cdnImage={cdnImage} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-[40%] z-20 -translate-y-1/2 flex h-12 w-10 items-center justify-center rounded-l-xl border-y border-l border-white/10 bg-[#050505]/85 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-brand hover:border-brand hover:scale-105 active:scale-95 group-hover/carousel:opacity-100 shadow-[-4px_0_15px_rgba(0,0,0,0.5)]"
            aria-label="Cuộn sang phải"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
    </section>
  );
}
