import { Outlet } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { useScrollToTop } from "../hooks/useScrollToTop";

export function MainLayout() {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-ink text-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
