export interface NavigationItem {
  label: string;
  href: string;
}

export const navigationItems: NavigationItem[] = [
  { label: "Phim mới", href: "/danh-sach/phim-moi" },
  { label: "Phim bộ", href: "/danh-sach/phim-bo" },
  { label: "Phim lẻ", href: "/danh-sach/phim-le" },
  { label: "Hoạt hình", href: "/danh-sach/hoat-hinh" },
  { label: "TV Shows", href: "/danh-sach/tv-shows" },
  { label: "Chiếu rạp", href: "/danh-sach/phim-chieu-rap" },
  { label: "Thể loại", href: "/the-loai" },
  { label: "Quốc gia", href: "/quoc-gia" },
  { label: "Năm", href: "/nam-phat-hanh" },
];
