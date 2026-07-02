import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/HomePage";
import { MovieDetailPage } from "../pages/MovieDetailPage";
import { MovieListPage } from "../pages/MovieListPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SearchPage } from "../pages/SearchPage";
import { TaxonomyIndexPage } from "../pages/TaxonomyIndexPage";
import { TaxonomyMoviePage } from "../pages/TaxonomyMoviePage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/phim/:slug" element={<MovieDetailPage />} />
        <Route path="/danh-sach/:slug" element={<MovieListPage />} />
        <Route path="/the-loai" element={<TaxonomyIndexPage kind="category" />} />
        <Route path="/the-loai/:slug" element={<TaxonomyMoviePage kind="category" />} />
        <Route path="/quoc-gia" element={<TaxonomyIndexPage kind="country" />} />
        <Route path="/quoc-gia/:slug" element={<TaxonomyMoviePage kind="country" />} />
        <Route path="/nam-phat-hanh" element={<TaxonomyIndexPage kind="year" />} />
        <Route path="/nam-phat-hanh/:year" element={<TaxonomyMoviePage kind="year" />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
