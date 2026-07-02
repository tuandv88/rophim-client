export const API_BASE_URL = "https://ophim1.com";

export const endpoints = {
  home: "/v1/api/home",
  movieList: (slug: string) => `/v1/api/danh-sach/${slug}`,
  movieDetail: (slug: string) => `/v1/api/phim/${slug}`,
  movieImages: (slug: string) => `/v1/api/phim/${slug}/images`,
  moviePeoples: (slug: string) => `/v1/api/phim/${slug}/peoples`,
  movieKeywords: (slug: string) => `/v1/api/phim/${slug}/keywords`,
  categories: "/v1/api/the-loai",
  categoryMovies: (slug: string) => `/v1/api/the-loai/${slug}`,
  countries: "/v1/api/quoc-gia",
  countryMovies: (slug: string) => `/v1/api/quoc-gia/${slug}`,
  years: "/v1/api/nam-phat-hanh",
  yearMovies: (year: string) => `/v1/api/nam-phat-hanh/${year}`,
  search: "/v1/api/tim-kiem",
} as const;
