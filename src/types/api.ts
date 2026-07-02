import type { Breadcrumb, Movie, MovieDetail, MovieImage, MovieImageSizes, MovieKeyword, MoviePeople, Pagination, SeoOnPage, TaxonomyItem } from "./movie";

export interface HomeResponse {
  status: string;
  message: string;
  data: {
    seoOnPage: SeoOnPage;
    items: Movie[];
    params: {
      pagination: Pagination;
    };
    APP_DOMAIN_CDN_IMAGE: string;
    APP_DOMAIN_FRONTEND: string;
  };
}

export interface MovieListResponse {
  status: string;
  message: string;
  data: {
    seoOnPage: SeoOnPage;
    titlePage: string;
    breadCrumb: Breadcrumb[];
    items: Movie[];
    params: {
      pagination: Pagination;
    };
  };
}

export interface TaxonomyListResponse {
  status: string;
  data: TaxonomyItem[];
}

export interface RawTaxonomyListResponse {
  status: string;
  data?: RawTaxonomyItem[] | {
    items?: RawTaxonomyItem[];
  };
}

export type RawTaxonomyItem = TaxonomyItem | {
  year: number | string;
};

export interface SearchResponse {
  status: string;
  message: string;
  data: {
    seoOnPage: SeoOnPage;
    titlePage: string;
    breadCrumb: Breadcrumb[];
    items: Movie[];
    params: {
      keyword: string;
      pagination: Pagination;
    };
  };
}

export interface MovieDetailResponse {
  status: string;
  message: string;
  data: {
    item: MovieDetail;
    seoOnPage: SeoOnPage;
    breadCrumb: Breadcrumb[];
  };
}

export interface MovieImagesResponse {
  success: boolean;
  message: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    ophim_id: string;
    slug: string;
    imdb_id: string;
    image_sizes: MovieImageSizes;
    images: MovieImage[];
  };
}

export interface MoviePeoplesResponse {
  success: boolean;
  message: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    ophim_id: string;
    slug: string;
    imdb_id: string;
    profile_sizes: Record<string, string>;
    peoples: MoviePeople[];
  };
}

export interface MovieKeywordsResponse {
  success: boolean;
  message: string;
  data: {
    tmdb_id: number;
    tmdb_type: string;
    ophim_id: string;
    slug: string;
    imdb_id: string;
    keywords: MovieKeyword[];
  };
}

export interface MovieListParams {
  page?: number;
  limit?: number;
  sort_field?: "modified.time" | "year" | "_id";
  sort_type?: "asc" | "desc";
  category?: string;
  country?: string;
  year?: string;
}

export interface SearchParams {
  keyword: string;
  page?: number;
  limit?: number;
}
