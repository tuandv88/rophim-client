import { Link } from "react-router-dom";
import { EmptyState } from "../components/feedback/EmptyState";
import { LoadingSkeleton } from "../components/feedback/LoadingSkeleton";
import { Seo } from "../components/seo/Seo";
import { useCategories, useCountries, useYears } from "../features/movies/hooks/useTaxonomies";
import type { TaxonomyItem } from "../types/movie";

type TaxonomyKind = "category" | "country" | "year";

interface TaxonomyIndexPageProps {
  kind: TaxonomyKind;
}

const config = {
  category: {
    title: "Thể loại phim",
    description: "Danh sách thể loại phim cập nhật mới nhất trên Rophim.",
    routePrefix: "/the-loai",
  },
  country: {
    title: "Quốc gia",
    description: "Danh sách phim theo quốc gia trên Rophim.",
    routePrefix: "/quoc-gia",
  },
  year: {
    title: "Năm phát hành",
    description: "Danh sách phim theo năm phát hành trên Rophim.",
    routePrefix: "/nam-phat-hanh",
  },
} as const;

export function TaxonomyIndexPage({ kind }: TaxonomyIndexPageProps) {
  const categoriesQuery = useCategories();
  const countriesQuery = useCountries();
  const yearsQuery = useYears();
  const activeConfig = config[kind];
  const query = kind === "category" ? categoriesQuery : kind === "country" ? countriesQuery : yearsQuery;
  const items = query.data?.data ?? [];

  return (
    <>
      <Seo title={`${activeConfig.title} - Rophim`} description={activeConfig.description} />
      <main className="mx-auto max-w-7xl px-4 pb-14 pt-24 md:px-6">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase text-brand">Rophim</p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{activeConfig.title}</h1>
        </div>
        {query.isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 16 }, (_, index) => (
              <LoadingSkeleton key={index} className="h-14 rounded-lg" />
            ))}
          </div>
        ) : (
          <TaxonomyGrid items={items} routePrefix={activeConfig.routePrefix} />
        )}
      </main>
    </>
  );
}

interface TaxonomyGridProps {
  items: TaxonomyItem[];
  routePrefix: string;
}

function TaxonomyGrid({ items, routePrefix }: TaxonomyGridProps) {
  if (items.length === 0) {
    return <EmptyState title="Không có dữ liệu" description="Danh sách này hiện chưa có dữ liệu." />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item._id || item.slug}
          to={`${routePrefix}/${item.slug}`}
          className="rounded-lg border border-line bg-white/[0.04] px-4 py-4 text-sm font-semibold text-white transition hover:border-brand hover:bg-brand"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
