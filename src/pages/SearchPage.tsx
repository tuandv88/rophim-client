import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EmptyState } from "../components/feedback/EmptyState";
import { MovieGrid } from "../components/movie/MovieGrid";
import { Pagination } from "../components/movie/Pagination";
import { Seo } from "../components/seo/Seo";
import { useSearchMovies } from "../features/search/hooks/useSearchMovies";
import { useDebounce } from "../hooks/useDebounce";
import { getTotalPages } from "../utils/pagination";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page") ?? "1");
  const [keyword, setKeyword] = useState(initialKeyword);
  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading } = useSearchMovies({
    keyword: debouncedKeyword,
    page,
    limit: 24,
  });

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedKeyword.trim()) {
      params.set("q", debouncedKeyword.trim());
      params.set("page", "1");
    }
    setSearchParams(params, { replace: true });
  }, [debouncedKeyword, setSearchParams]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.target.value);
  }

  function handlePageChange(nextPage: number) {
    const params = new URLSearchParams();
    params.set("q", debouncedKeyword.trim());
    params.set("page", String(nextPage));
    setSearchParams(params);
  }

  const movies = data?.data.items ?? [];
  const totalPages = getTotalPages(data?.data.params.pagination);
  const hasKeyword = debouncedKeyword.trim().length > 0;

  return (
    <>
      <Seo
        title={data?.data.seoOnPage.titleHead ?? "Tìm kiếm phim - Rophim"}
        description={data?.data.seoOnPage.descriptionHead ?? "Tìm kiếm phim online theo tên phim hoặc tên gốc."}
      />
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <section className="mb-8">
          <p className="text-sm font-medium uppercase text-brand">Tìm kiếm</p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Tìm phim bạn muốn xem</h1>
          <div className="mt-6 flex max-w-2xl items-center gap-3 rounded-lg border border-line bg-white/10 px-4">
            <Search className="h-5 w-5 text-white/50" aria-hidden="true" />
            <input
              value={keyword}
              onChange={handleInputChange}
              className="h-14 min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-white/40"
              placeholder="Nhập tên phim..."
              type="search"
              autoFocus
            />
          </div>
        </section>
        {!hasKeyword ? (
          <EmptyState title="Nhập từ khóa" description="Kết quả tìm kiếm sẽ xuất hiện sau khi bạn nhập tên phim." />
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Kết quả cho “{debouncedKeyword.trim()}”</h2>
            </div>
            <MovieGrid movies={movies} isLoading={isLoading} />
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        )}
      </main>
    </>
  );
}
