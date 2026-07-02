import type { Category, Country } from "../types/movie";

export const categoryOptions: Category[] = [
  { id: "hanh-dong", name: "Hành động", slug: "hanh-dong" },
  { id: "tinh-cam", name: "Tình cảm", slug: "tinh-cam" },
  { id: "hai-huoc", name: "Hài hước", slug: "hai-huoc" },
  { id: "co-trang", name: "Cổ trang", slug: "co-trang" },
  { id: "tam-ly", name: "Tâm lý", slug: "tam-ly" },
  { id: "hinh-su", name: "Hình sự", slug: "hinh-su" },
  { id: "chien-tranh", name: "Chiến tranh", slug: "chien-tranh" },
  { id: "the-thao", name: "Thể thao", slug: "the-thao" },
  { id: "vo-thuat", name: "Võ thuật", slug: "vo-thuat" },
  { id: "vien-tuong", name: "Viễn tưởng", slug: "vien-tuong" },
  { id: "phieu-luu", name: "Phiêu lưu", slug: "phieu-luu" },
  { id: "khoa-hoc", name: "Khoa học", slug: "khoa-hoc" },
  { id: "kinh-di", name: "Kinh dị", slug: "kinh-di" },
  { id: "am-nhac", name: "Âm nhạc", slug: "am-nhac" },
  { id: "than-thoai", name: "Thần thoại", slug: "than-thoai" },
];

export const countryOptions: Country[] = [
  { id: "viet-nam", name: "Việt Nam", slug: "viet-nam" },
  { id: "trung-quoc", name: "Trung Quốc", slug: "trung-quoc" },
  { id: "han-quoc", name: "Hàn Quốc", slug: "han-quoc" },
  { id: "nhat-ban", name: "Nhật Bản", slug: "nhat-ban" },
  { id: "thai-lan", name: "Thái Lan", slug: "thai-lan" },
  { id: "au-my", name: "Âu Mỹ", slug: "au-my" },
  { id: "anh", name: "Anh", slug: "anh" },
  { id: "phap", name: "Pháp", slug: "phap" },
  { id: "duc", name: "Đức", slug: "duc" },
  { id: "an-do", name: "Ấn Độ", slug: "an-do" },
];

const currentYear = new Date().getFullYear();
export const yearOptions = Array.from({ length: 28 }, (_, index) => currentYear - index);

export const sortFieldOptions = [
  { label: "Mới cập nhật", value: "modified.time" },
  { label: "Năm sản xuất", value: "year" },
  { label: "Mới tạo", value: "_id" },
] as const;
