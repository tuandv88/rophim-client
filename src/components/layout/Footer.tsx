import { Link } from "react-router-dom";
import { navigationItems } from "../../constants/navigation";
import { Logo } from "../ui/Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-[#0b0b0b] to-black pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[2fr_1.2fr_1fr_1.2fr]">
          {/* Logo & About column */}
          <div className="space-y-4">
            <Link to="/">
              <Logo />
            </Link>
            <p className="text-sm leading-7 text-white/50 max-w-sm">
              Nền tảng xem phim trực tuyến miễn phí với trải nghiệm duyệt phim nhanh, tối ưu trên mọi thiết bị, dữ liệu cập nhật liên tục từ OPhim.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-brand hover:bg-brand hover:text-white" aria-label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-brand hover:bg-brand hover:text-white" aria-label="Instagram">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.008 3.74.052 1.455.067 2.45.297 3.19.585a5.91 5.91 0 012.18 1.42 5.86 5.86 0 011.42 2.18c.28.74.51 1.735.58 3.19.043.956.05 1.31.05 3.74v.63c0 2.43-.007 2.784-.05 3.74-.067 1.455-.297 2.45-.585 3.19a5.902 5.902 0 01-1.42 2.18 5.862 5.862 0 01-2.18 1.42c-.74.28-1.73.51-3.19.58-.956.043-1.31.05-3.74.05H12c-2.43 0-2.784-.007-3.74-.05-1.455-.067-2.45-.297-3.19-.585a5.91 5.91 0 01-2.18-1.42 5.86 5.86 0 01-1.42-2.18c-.28-.74-.51-1.735-.58-3.19C2.007 14.784 2 14.43 2 12c0-2.43.008-2.784.052-3.74.067-1.455.297-2.45.585-3.19a5.902 5.902 0 011.42-2.18A5.862 5.862 0 016.27 2.58c.74-.28 1.73-.51 3.19-.58.956-.043 1.31-.05 3.74-.05zm.485 19c2.4 0 2.687-.008 3.63-.05 1.353-.06 2.086-.28 2.573-.47.647-.25 1.11-.55 1.595-1.037.487-.487.787-.95 1.037-1.595.19-.487.41-1.22.47-2.573.042-.943.05-1.228.05-3.63v-.166c0-2.4-.008-2.687-.05-3.63-.06-1.352-.28-2.085-.47-2.572a3.916 3.916 0 00-1.037-1.596 3.916 3.916 0 00-1.595-1.037c-.487-.19-1.22-.41-2.573-.47-.942-.042-1.227-.05-3.63-.05H12c-2.4 0-2.687.008-3.63.05-1.352.06-2.085.28-2.572.47a3.916 3.916 0 00-1.596 1.037 3.916 3.916 0 00-1.037 1.595c-.19.487-.41 1.22-.47 2.573-.042.942-.05 1.227-.05 3.63v.167c0 2.4.008 2.688.05 3.63.06 1.352.28 2.085.47 2.572.25.647.55 1.11 1.037 1.596.487.487.95.787 1.595 1.037.487.19 1.22.41 2.573.47.943.042 1.228.05 3.63.05h.165zM12 5.837a6.163 6.163 0 100 12.326 6.163 6.163 0 000-12.326zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-brand hover:bg-brand hover:text-white" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick links column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Đường dẫn nhanh</h3>
            <ul className="grid gap-2.5 text-sm">
              {navigationItems.slice(0, 5).map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-white/55 transition hover:text-brand font-medium">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Thể loại</h3>
            <ul className="grid gap-2.5 text-sm">
              <li><Link to="/the-loai/hanh-dong" className="text-white/55 transition hover:text-brand font-medium">Hành động</Link></li>
              <li><Link to="/the-loai/tinh-cam" className="text-white/55 transition hover:text-brand font-medium">Tình cảm</Link></li>
              <li><Link to="/the-loai/hai-huoc" className="text-white/55 transition hover:text-brand font-medium">Hài hước</Link></li>
              <li><Link to="/the-loai/vien-tuong" className="text-white/55 transition hover:text-brand font-medium">Viễn tưởng</Link></li>
              <li><Link to="/the-loai/kinh-di" className="text-white/55 transition hover:text-brand font-medium">Kinh dị</Link></li>
            </ul>
          </div>

          {/* Support column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quốc gia</h3>
            <ul className="grid gap-2.5 text-sm">
              <li><Link to="/quoc-gia/viet-nam" className="text-white/55 transition hover:text-brand font-medium">Việt Nam</Link></li>
              <li><Link to="/quoc-gia/trung-quoc" className="text-white/55 transition hover:text-brand font-medium">Trung Quốc</Link></li>
              <li><Link to="/quoc-gia/han-quoc" className="text-white/55 transition hover:text-brand font-medium">Hàn Quốc</Link></li>
              <li><Link to="/quoc-gia/nhat-ban" className="text-white/55 transition hover:text-brand font-medium">Nhật Bản</Link></li>
              <li><Link to="/quoc-gia/au-my" className="text-white/55 transition hover:text-brand font-medium">Âu Mỹ</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} RoPhim. All rights reserved. Xem phim online HD phụ đề tiếng Việt.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Chính sách bảo mật</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
