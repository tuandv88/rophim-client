import type { MovieKeyword } from "../../../types/movie";

interface KeywordListProps {
  keywords: MovieKeyword[];
}

export function KeywordList({ keywords }: KeywordListProps) {
  if (keywords.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white md:text-2xl">Từ khóa</h2>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span key={keyword.tmdb_keyword_id} className="rounded-full border border-line bg-white/[0.04] px-3 py-1.5 text-sm text-white/72">
            {keyword.name_vn || keyword.name}
          </span>
        ))}
      </div>
    </section>
  );
}
