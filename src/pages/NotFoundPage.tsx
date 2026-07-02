import { Link } from "react-router-dom";
import { Seo } from "../components/seo/Seo";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <>
      <Seo title="Không tìm thấy trang - Rophim" description="Trang bạn đang truy cập không tồn tại." />
      <main className="grid min-h-screen place-items-center px-4 pt-16 text-center">
        <section>
          <p className="text-sm font-semibold uppercase text-brand">404</p>
          <h1 className="mt-3 text-4xl font-black text-white">Không tìm thấy trang</h1>
          <p className="mt-3 text-white/60">Đường dẫn này không tồn tại hoặc đã được di chuyển.</p>
          <Link to="/" className="mt-6 inline-flex">
            <Button>Về trang chủ</Button>
          </Link>
        </section>
      </main>
    </>
  );
}
